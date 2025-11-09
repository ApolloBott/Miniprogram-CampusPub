<template>
	<view class="comment-message-page">

		
		<!-- 评论列表 -->
		<scroll-view class="comment-list" scroll-y>
			<!-- 空状态 -->
			<view v-if="commentList.length === 0" class="empty-state">
				<text class="empty-icon">💬</text>
				<text class="empty-text">暂无评论消息</text>
			</view>
			
			<!-- 评论项 -->
			<view 
				v-for="(comment, index) in commentList" 
				:key="index" 
				class="comment-item"
				@click="goToPostDetail(comment)"
			>
				<!-- 左侧头像 -->
				<image 
					class="avatar" 
					:src="comment.avatar || '/static/default-avatar.png'" 
					mode="aspectFill"
				></image>
				
				<!-- 右侧内容区域 -->
				<view class="comment-content">
					<!-- 用户昵称 -->
					<text class="nickname">{{ comment.nickname }}</text>
					
					<!-- 时间和类型 -->
					<view class="time-row">
						<text class="time">{{ formatTime(comment.created_at) }}</text>
						<text class="comment-type">
							{{ comment.comment_type === 'post' ? '评论了你的帖子' : '回复了你的评论' }}
						</text>
					</view>
					
					<!-- 评论内容 -->
					<view class="content-box">
						<text class="content-text">{{ comment.content }}</text>
					</view>
					
					<!-- 原帖子内容预览 -->
					<view class="post-preview" v-if="comment.post_content">
						<text class="preview-label">原帖子：</text>
						<text class="preview-text">{{ comment.post_content }}</text>
						<!-- 帖子图片预览 -->
						<image 
							v-if="getFirstImage(comment.post_images)" 
							class="preview-image" 
							:src="getFirstImage(comment.post_images)" 
							mode="aspectFill"
						></image>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				commentList: []
			};
		},
		
		computed: {
			...mapState('m_user', ['openid', 'token'])
		},
		
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack();
			},
			
			// 跳转到帖子详情页
			goToPostDetail(comment) {
				if (comment.post_images > 0) {
					uni.navigateTo({
						url: '/subpkg/topic-detail/topic-detail?id=' + comment.post_id
					});
				}
				else {
					uni.navigateTo({
						url: '/subpkg/post-detail/post-detail?id=' + comment.post_id
					})
				}
				
			},
			
			// 格式化时间
			formatTime(timeString) {
				const now = new Date();
				const time = new Date(timeString);
				const diff = Math.floor((now - time) / 1000); // 秒
				
				if (diff < 60) {
					return '刚刚';
				} else if (diff < 3600) {
					return Math.floor(diff / 60) + '分钟前';
				} else if (diff < 86400) {
					return Math.floor(diff / 3600) + '小时前';
				} else if (diff < 604800) {
					return Math.floor(diff / 86400) + '天前';
				} else {
					const year = time.getFullYear();
					const month = String(time.getMonth() + 1).padStart(2, '0');
					const day = String(time.getDate()).padStart(2, '0');
					return `${year}-${month}-${day}`;
				}
			},
			
			// 获取帖子第一张图片
			getFirstImage(imagesString) {
				if (!imagesString) return '';
				try {
					const images = JSON.parse(imagesString);
					return images && images.length > 0 ? images[0] : '';
				} catch (e) {
					return '';
				}
			},
			
			// 获取评论消息列表
			async getCommentMessages() {
				try {
					uni.showLoading({ title: '加载中...' });
					
					const { data: res } = await uni.$http.get('/users/comment-message', {
						openid: this.openid
					});
					
					uni.hideLoading();
					
					if (res.meta.status === 200) {
						this.commentList = res.message;
					} else {
						uni.showToast({
							title: res.meta.msg || '获取失败',
							icon: 'none'
						});
					}
				} catch (error) {
					uni.hideLoading();
					console.error('获取评论消息失败:', error);
					uni.showToast({
						title: '网络错误',
						icon: 'none'
					});
				}
			}
		},
		
		onLoad() {
			// 检查登录状态
			if (!this.token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				setTimeout(() => {
					uni.navigateBack();
				}, 1500);
				return;
			}
			
			// 获取评论消息
			this.getCommentMessages();
		}
	}
</script>

<style lang="scss">
.comment-message-page {
	min-height: 100vh;
	background-color: #f5f5f5;
}

/* 顶部导航栏 */
.header {
	position: sticky;
	top: 0;
	z-index: 100;
	display: flex;
	align-items: center;
	padding: 20rpx 32rpx;
	background-color: #ffffff;
	border-bottom: 1rpx solid #e5e5e5;
	
	.back-btn {
		margin-right: 20rpx;
		font-size: 36rpx;
		color: #333333;
	}
	
	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}
}

/* 评论列表 */
.comment-list {
	height: calc(100vh - 80rpx);
	padding: 20rpx 0;
}

/* 空状态 */
.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 200rpx 0;
	
	.empty-icon {
		font-size: 120rpx;
		margin-bottom: 20rpx;
	}
	
	.empty-text {
		font-size: 28rpx;
		color: #999999;
	}
}

/* 评论项 */
.comment-item {
	display: flex;
	padding: 24rpx 32rpx;
	background-color: #ffffff;
	margin-bottom: 20rpx;
	
	&:active {
		background-color: #f8f8f8;
	}
	
	/* 头像 */
	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 20rpx;
		flex-shrink: 0;
	}
	
	/* 右侧内容 */
	.comment-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		
		/* 昵称 */
		.nickname {
			font-size: 30rpx;
			font-weight: 500;
			color: #333333;
			margin-bottom: 8rpx;
		}
		
		/* 时间行 */
		.time-row {
			display: flex;
			align-items: center;
			margin-bottom: 16rpx;
			
			.time {
				font-size: 24rpx;
				color: #999999;
				margin-right: 16rpx;
			}
			
			.comment-type {
				font-size: 24rpx;
				color: #666666;
			}
		}
		
		/* 评论内容 */
		.content-box {
			padding: 20rpx;
			background-color: #f8f8f8;
			border-radius: 12rpx;
			margin-bottom: 16rpx;
			
			.content-text {
				font-size: 28rpx;
				color: #333333;
				line-height: 1.6;
			}
		}
		
		/* 原帖子预览 */
		.post-preview {
			display: flex;
			align-items: center;
			padding: 16rpx;
			background-color: #fafafa;
			border-radius: 8rpx;
			border-left: 4rpx solid #4facfe;
			
			.preview-label {
				font-size: 24rpx;
				color: #999999;
				margin-right: 8rpx;
				flex-shrink: 0;
			}
			
			.preview-text {
				flex: 1;
				font-size: 26rpx;
				color: #666666;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-right: 16rpx;
			}
			
			.preview-image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 6rpx;
				flex-shrink: 0;
			}
		}
	}
}
</style>
