<!-- subpkg/my-post-comments/my-post-comments.vue -->
<template>
	<view class="my-comments-page">
		<scroll-view class="comments-list" scroll-y @scrolltolower="loadMore">
			<view 
				class="comment-item"
				v-for="comment in commentList"
				:key="comment.id"
				@click="gotoPostDetail(comment.post_id)"
			>
				<view class="comment-header">
					<text class="comment-time">{{ formatTime(comment.created_at) }}</text>
				</view>
				
				<view class="comment-body">
					<view class="comment-left">
						<view class="comment-content">
							<text class="my-comment">我：{{ comment.my_content }}</text>
						</view>
						
						<!-- 🔥 修改：将作者昵称移到内容前面 -->
						<view class="post-preview">
							<view class="post-header-info">
								<text class="post-author">@{{ comment.post_author }}</text>
							</view>
							<text class="post-content">{{ comment.post_content }}</text>
						</view>
					</view>
					
					<view class="comment-right" v-if="comment.first_image">
						<image 
							class="post-thumbnail" 
							:src="comment.first_image" 
							mode="aspectFill"
						></image>
					</view>
				</view>
			</view>
			
			<view class="load-more" v-if="hasMore">
				<text>加载中...</text>
			</view>
			<view class="no-more" v-else-if="commentList.length > 0">
				<text>没有更多了</text>
			</view>
			<view class="empty" v-if="commentList.length === 0 && !isLoading">
				<text class="empty-icon">💬</text>
				<text class="empty-text">还没有评价过帖子</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				commentList: [],
				page: 1,
				pageSize: 10,
				hasMore: true,
				isLoading: false,
				post: {},
			}
		},
		
		computed: {
			...mapState('m_user', ['openid'])
		},
		
		onLoad() {
			this.loadComments()
		},
		
		methods: {
			async loadComments() {
				if (this.isLoading || !this.hasMore) return
				
				this.isLoading = true
				
				try {
					const { data: res } = await uni.$http.get('/posts/my-comments', {
						openid: this.openid,
						page: this.page,
						pageSize: this.pageSize
					})
					
					if (res.meta.status === 200) {
						console.log('评论列表数据:', res.message.list)
						this.commentList = this.commentList.concat(res.message.list)
						this.hasMore = res.message.hasMore
					}
				} catch (error) {
					console.error('加载评论失败:', error)
					uni.showToast({
						title: '加载失败',
						icon: 'none'
					})
				} finally {
					this.isLoading = false
				}
			},
			
			loadMore() {
				if (!this.hasMore || this.isLoading) return
				
				this.page++
				this.loadComments()
			},
			
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
			
			async gotoPostDetail(postId) {
				const queryObj = {id: postId, openid: this.openid};
				const { data: res } = await uni.$http.get('/posts/detail', queryObj);
				if (res.meta.status === 200) {
					this.post = res.message
				}
				if (this.post.images.length > 0) {
					uni.navigateTo({
						url: `/subpkg/topic-detail/topic-detail?id=${postId}`
					})
				}
				else {
					uni.navigateTo({
						url: `/subpkg/post-detail/post-detail?id=${postId}`
					})
				}
			},
		}
	}
</script>

<style lang="scss">
.my-comments-page {
	min-height: 100vh;
	background-color: #f5f5f5;
}

.comments-list {
	height: 100vh;
	padding: 24rpx;
}

.comment-item {
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 24rpx;
	margin-bottom: 24rpx;
	
	.comment-header {
		margin-bottom: 16rpx;
		
		.comment-time {
			font-size: 24rpx;
			color: #999999;
		}
	}
	
	.comment-body {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 24rpx;
	}
	
	.comment-left {
		flex: 1;
		min-width: 0;
	}
	
	.comment-content {
		margin-bottom: 16rpx;
		
		.my-comment {
			font-size: 28rpx;
			color: #333333;
			line-height: 1.6;
			word-break: break-all;
		}
	}
	
	.post-preview {
		background-color: #f8f8f8;
		border-radius: 12rpx;
		padding: 16rpx;
		margin-bottom: 12rpx;
		
		// 🔥 新增：作者信息样式
		.post-header-info {
			margin-bottom: 8rpx;
			
			.post-author {
				font-size: 24rpx;
				color: #666666;
				font-weight: 500;
			}
		}
		
		.post-tag {
			display: inline-block;
			font-size: 22rpx;
			color: #C00000;
			background-color: #f0f2ff;
			padding: 4rpx 12rpx;
			border-radius: 4rpx;
			margin-bottom: 8rpx;
		}
		
		.post-content {
			display: block;
			font-size: 26rpx;
			color: #666666;
			line-height: 1.5;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			word-break: break-all;
		}
	}
	
	// 🔥 删除：原来的 comment-footer 样式
	// .comment-footer {
	// 	.post-author {
	// 		font-size: 24rpx;
	// 		color: #999999;
	// 	}
	// }
	
	.comment-right {
		flex-shrink: 0;
		
		.post-thumbnail {
			width: 160rpx;
			height: 160rpx;
			border-radius: 12rpx;
			overflow: hidden;
			background-color: #f0f0f0;
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
