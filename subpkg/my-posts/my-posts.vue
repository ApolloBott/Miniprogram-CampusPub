<template>
	<view class="my-posts-page">
		<!-- 帖子列表 - 添加下拉刷新配置 -->
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
				<view class="post-content" @click="gotoPostDetail(post)">
					<text class="content-text">{{ post.content }}</text>
				</view>
				
				<view class="post-images" v-if="post.images && post.images.length > 0" @click="gotoPostDetail(post)">
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
						<view class="stat-item" @click.stop="toggleLike(post)">
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
				<text class="empty-text">还没有发布帖子</text>
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
				refreshing: false, // 🔥 新增：下拉刷新状态
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
			// 🔥 新增：下拉刷新
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
					// 延迟关闭刷新状态，确保动画流畅
					setTimeout(() => {
						this.refreshing = false
					}, 300)
				}
			},
			
			// ✅ 点赞/取消点赞
			async toggleLike(post) {
				try {
					if (!this.openid) {
						uni.switchTab({ url: '/pages/my/my' })
						return
					}
					
					const { data: res } = await uni.$http.post('/posts/like', {
						post_id: post.id,
						openid: this.openid,
						is_like: !post.isLiked
					})
					
					if (res.meta.status === 200) {
						const index = this.postList.findIndex(p => p.id === post.id)
						if (index !== -1) {
							this.postList[index].isLiked = !this.postList[index].isLiked
							this.postList[index].like_count = res.message.like_count || 0
							this.$set(this.postList, index, {...this.postList[index]})
						}
					}
				} catch (error) {
					console.error('点赞失败:', error)
					this.showMessageToast('操作失败')
				}
			},
			
			// 加载帖子列表
			async loadPosts() {
				if (this.isLoading || !this.hasMore) return
				
				this.isLoading = true
				
				try {
					const { data: res } = await uni.$http.get('/posts/my-posts', {
						openid: this.openid,
						type: '', // 不筛选分类,获取全部
						page: this.page,
						pageSize: this.pageSize
					})
					
					if (res.meta.status === 200) {
						const newPosts = res.message.list.map(post => ({
							...post,
							images: post.images ? JSON.parse(post.images) : [],
							isLiked: post.isLiked || false,
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
			
			// 跳转到帖子详情
			gotoPostDetail(post) {
				if (post.images.length > 0) {
					uni.navigateTo({
						url: `/subpkg/topic-detail/topic-detail?id=${post.id}`
					})
				}
				else {
					uni.navigateTo({
						url: `/subpkg/post-detail/post-detail?id=${post.id}`
					})
				}	
			}
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
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 24rpx;
	margin-bottom: 24rpx;
	
	.post-content {
		margin-bottom: 16rpx;
		
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
			
			.post-tag {
				font-size: 24rpx;
				color: #C00000;
				background-color: #f0f2ff;
				padding: 6rpx 16rpx;
				border-radius: 6rpx;
			}
			
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
				font-size: 24rpx;
				color: #999999;
				
				.stat-icon-img {
					width: 32rpx;
					height: 32rpx;
				}
				
				.stat-count {
					font-size: 24rpx;
					color: #999999;
				}
				
				.icon {
					font-size: 28rpx;
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
