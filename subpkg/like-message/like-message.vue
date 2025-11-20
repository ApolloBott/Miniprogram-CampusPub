<template>
	<view class="like-message-page">
		
		<!-- 点赞列表 -->
		<scroll-view class="like-list" scroll-y>
			<!-- 空状态 -->
			<view v-if="likeList.length === 0" class="empty-state">
				<text class="empty-icon">👍</text>
				<text class="empty-text">暂无点赞消息</text>
			</view>
			
			<!-- 点赞项 -->
			<view 
				v-for="(like, index) in likeList" 
				:key="index" 
				class="like-item"
				@click="goToPostDetail(like)"
			>
				<!-- 左侧头像 -->
				<image 
					class="avatar" 
					:src="like.avatar || '/static/default-avatar.png'" 
					mode="aspectFill"
				></image>
				
				<!-- 右侧内容区域 -->
				<view class="like-content">
					<!-- 用户昵称 -->
					<text class="nickname">{{ like.nickname }}</text>
					
					<!-- 时间和操作 -->
					<view class="time-row">
						<text class="time">{{ formatTime(like.created_at) }}</text>
						<text class="like-type">赞了你的帖子</text>
					</view>
					
					<!-- 原帖子内容预览 -->
					<view class="post-preview" v-if="like.post_content">
						<text class="preview-label">你的帖子：</text>
						<text class="preview-text">{{ like.post_content }}</text>
						<!-- 帖子图片预览 -->
						<image 
							v-if="getFirstImage(like.post_images)" 
							class="preview-image" 
							:src="getFirstImage(like.post_images)" 
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
				likeList: []
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
			goToPostDetail(like) {
				const images = this.parseImages(like.post_images);
				
				if (images && images.length > 0) {
					uni.navigateTo({
						url: '/subpkg/topic-detail/topic-detail?id=' + like.post_id
					});
				} else {
					uni.navigateTo({
						url: '/subpkg/post-detail/post-detail?id=' + like.post_id
					});
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
			
			// 解析图片 JSON
			parseImages(imagesString) {
				if (!imagesString) return [];
				try {
					return JSON.parse(imagesString);
				} catch (e) {
					return [];
				}
			},
			
			// 获取帖子第一张图片
			getFirstImage(imagesString) {
				const images = this.parseImages(imagesString);
				return images && images.length > 0 ? images[0] : '';
			},
			
			// 获取点赞消息列表
			async getLikeMessages() {
				try {
					uni.showLoading({ title: '加载中...' });
					
					const { data: res } = await uni.$http.get('/users/like-message', {
						openid: this.openid
					});
					
					uni.hideLoading();
					
					if (res.meta.status === 200) {
						this.likeList = res.message;
					} else {
						uni.showToast({
							title: res.meta.msg || '获取失败',
							icon: 'none'
						});
					}
				} catch (error) {
					uni.hideLoading();
					console.error('获取点赞消息失败:', error);
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
			
			// 获取点赞消息
			this.getLikeMessages();
		}
	}
</script>

<style lang="scss">
.like-message-page {
	min-height: 100vh;
	background-color: #f5f5f5;
}

/* 点赞列表 */
.like-list {
	height: 100vh;
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

/* 点赞项 */
.like-item {
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
	.like-content {
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
			
			.like-type {
				font-size: 24rpx;
				color: #ff6b6b;
				font-weight: 500;
			}
		}
		
		/* 原帖子预览 */
		.post-preview {
			display: flex;
			align-items: center;
			padding: 16rpx;
			background-color: #fafafa;
			border-radius: 8rpx;
			border-left: 4rpx solid #ff6b6b;
			
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