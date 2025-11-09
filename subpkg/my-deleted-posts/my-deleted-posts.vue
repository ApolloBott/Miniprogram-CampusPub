<!-- subpkg/my-posts/my-posts.vue -->
<template>
	<view class="my-posts-page">
		<!-- 帖子列表 - 添加下拉刷新 -->
		<scroll-view 
			class="posts-list" 
			scroll-y 
			@scrolltolower="loadMore"
			refresher-enabled
			:refresher-triggered="refreshing"
			@refresherrefresh="onRefresh"
			refresher-background="#f5f5f5"
		>
			<view 
				class="post-item"
				v-for="post in postList"
				:key="post.id"
			>
				<!-- 🔥 恢复按钮 -->
				<view class="restore-btn" @click="restorePost(post)">
					<image 
						class="restore-icon" 
						src="https://img.xinshi00.com/label/restore.png" 
						mode="aspectFit"
					></image>
					<text class="restore-text">恢复</text>
				</view>
				
				<view class="post-content">
					<text class="content-text">{{ post.content }}</text>
				</view>
				
				<view class="post-images" v-if="post.images && post.images.length > 0">
					<image
						v-for="(img, index) in post.images.slice(0, 3)"
						:key="index"
						:src="img"
						mode="widthFix"
						class="post-image"
					></image>
				</view>
				
				<view class="post-footer">
					<view class="left-info">
						<text class="post-time">{{ formatTime(post.created_at) }}</text>
					</view>
					<view class="post-stats">
						<!-- 点赞数 -->
						<view class="stat-item">
							<image 
								class="stat-icon-img" 
								:src="post.isLiked ? iconLikedUrl : iconLikeUrl" 
								mode="aspectFit"
							></image>
							<text class="stat-count">{{ post.like_count }}</text>
						</view>
						
						<!-- 评论数 -->
						<view class="stat-item">
							<image 
								class="stat-icon-img" 
								:src="iconCommentUrl" 
								mode="aspectFit"
							></image>
							<text class="stat-count">{{ post.comment_count }}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="load-more" v-if="hasMore">
				<text>加载中...</text>
			</view>
			<view class="no-more" v-else-if="postList.length > 0">
				<text>没有更多了</text>
			</view>
			<view class="empty" v-if="postList.length === 0 && !isLoading">
				<text class="empty-icon">📭</text>
				<text class="empty-text">暂无已删除的帖子</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				postList: [],
				page: 1,
				pageSize: 10,
				hasMore: true,
				isLoading: false,
				refreshing: false, // 🔥 下拉刷新状态
				iconLikeUrl: 'https://img.xinshi00.com/label/like.png',
				iconLikedUrl: 'https://img.xinshi00.com/label/liked.png',
				iconCommentUrl: 'https://img.xinshi00.com/label/chat.png',
			}
		},
		
		computed: {
			...mapState('m_user', ['openid'])
		},
		
		onLoad() {
			this.loadPosts()
		},
		
		methods: {
			// 🔥 下拉刷新
			async onRefresh() {
				this.refreshing = true
				
				try {
					// 重置数据
					this.page = 1
					this.postList = []
					this.hasMore = true
					
					// 加载第一页数据
					await this.loadPosts()
					
					uni.showToast({
						title: '刷新成功',
						icon: 'success',
						duration: 1500
					})
				} catch (error) {
					console.error('刷新失败:', error)
					uni.showToast({
						title: '刷新失败',
						icon: 'none'
					})
				} finally {
					setTimeout(() => {
						this.refreshing = false
					}, 300)
				}
			},
			
			// 🔥 恢复帖子
			async restorePost(post) {
				try {
					// 弹出确认框
					const [error, confirmRes] = await uni.showModal({
						title: '确认恢复',
						content: '确定要恢复这条帖子吗?',
						confirmText: '恢复',
						confirmColor: '#C00000'
					})
					
					if (confirmRes && confirmRes.confirm) {
						// 显示加载提示
						uni.showLoading({
							title: '恢复中...',
							mask: true
						})
						
						// 调用恢复接口
						const { data: res } = await uni.$http.post('/posts/restore', {
							post_id: post.id,
							openid: this.openid
						})
						
						uni.hideLoading()
						
						if (res.meta.status === 200) {
							// 从列表中移除已恢复的帖子
							const index = this.postList.findIndex(p => p.id === post.id)
							if (index !== -1) {
								this.postList.splice(index, 1)
							}
							
							uni.showToast({
								title: '恢复成功',
								icon: 'success',
								duration: 2000
							})
						} else {
							uni.showToast({
								title: res.meta.msg || '恢复失败',
								icon: 'none'
							})
						}
					}
				} catch (error) {
					uni.hideLoading()
					console.error('恢复帖子失败:', error)
					uni.showToast({
						title: '操作失败',
						icon: 'none'
					})
				}
			},
			
			// 加载帖子列表
			async loadPosts() {
				if (this.isLoading || !this.hasMore) return
				
				this.isLoading = true
				
				try {
					const { data: res } = await uni.$http.get('/posts/my-deleted-posts', {
						openid: this.openid,
						type: '',
						page: this.page,
						pageSize: this.pageSize
					})
					
					if (res.meta.status === 200) {
						const newPosts = res.message.list.map(post => ({
							...post,
							images: post.images ? JSON.parse(post.images) : []
						}))
						
						this.postList = this.postList.concat(newPosts)
						this.hasMore = res.message.hasMore
					}
				} catch (error) {
					console.error('加载帖子失败:', error)
					uni.showToast({
						title: '加载失败',
						icon: 'none'
					})
				} finally {
					this.isLoading = false
				}
			},
			
			// 加载更多
			loadMore() {
				if (!this.hasMore || this.isLoading) return
				
				this.page++
				this.loadPosts()
			},
			
			// 格式化时间
			formatTime(timestamp) {
				const date = new Date(timestamp)
				const now = new Date()
				const diff = now - date
				
				if (diff < 60000) return '刚刚'
				if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
				if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
				if (diff < 2592000000) return Math.floor(diff / 86400000) + '天前'
				
				return `${date.getMonth() + 1}-${date.getDate()}`
			},
		}
	}
</script>

<style lang="scss">
.my-posts-page {
	min-height: 100vh;
	background-color: #f5f5f5;
}

.posts-list {
	height: 100vh;
	padding: 24rpx;
}

.post-item {
	position: relative; // 🔥 为恢复按钮定位
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 24rpx;
	margin-bottom: 24rpx;
	
	// 🔥 恢复按钮样式
	.restore-btn {
		position: absolute;
		top: 16rpx;
		right: 16rpx;
		display: flex;
		align-items: center;
		gap: 6rpx;
		padding: 8rpx 16rpx;
		background: linear-gradient(135deg, #666 0%, #666 100%);
		border-radius: 20rpx;
		box-shadow: 0 4rpx 12rpx rgba(102, 126, 234, 0.3);
		z-index: 10;
		
		.restore-icon {
			width: 28rpx;
			height: 28rpx;
		}
		
		.restore-text {
			font-size: 24rpx;
			color: #ffffff;
			font-weight: 500;
		}
	}
	
	.post-content {
		margin-bottom: 16rpx;
		padding-right: 100rpx; // 🔥 为恢复按钮留出空间
		
		.content-text {
			font-size: 28rpx;
			color: #333333;
			line-height: 1.6;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			overflow: hidden;
		}
	}
	
	.post-images {
		display: flex;
		gap: 12rpx;
		margin-bottom: 16rpx;
		
		.post-image {
			width: 200rpx;
			height: 200rpx;
			border-radius: 12rpx;
			background-color: #f0f0f0;
		}
	}
	
	.post-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 16rpx;
		border-top: 1rpx solid #f0f0f0;
		
		.left-info {
			display: flex;
			align-items: center;
			gap: 16rpx;
			
			.post-time {
				font-size: 24rpx;
				color: #999999;
			}
		}
		
		.post-stats {
			display: flex;
			gap: 32rpx;
			
			.stat-item {
				display: flex;
				align-items: center;
				gap: 8rpx;
				
				.stat-icon-img {
					width: 32rpx;
					height: 32rpx;
				}
				
				.stat-count {
					font-size: 24rpx;
					color: #999999;
				}
			}
		}
	}
}

.load-more,
.no-more {
	text-align: center;
	padding: 40rpx 0;
	font-size: 26rpx;
	color: #999999;
}

.empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 200rpx 0;
	
	.empty-icon {
		font-size: 120rpx;
		margin-bottom: 24rpx;
	}
	
	.empty-text {
		font-size: 28rpx;
		color: #999999;
	}
}
</style>
