<template>
	<view class="container">
		<view class="header">
			<text class="title">校园小黑板</text>
			<text class="subtitle">记录每一份用心</text>
		</view>
		
		<!-- 日期选择栏 - 修改这部分 -->
		<view class="date-wrapper">
			<!-- 将 picker 包裹在外层 -->
			<picker
				mode="date"
				:value="selectedDate"
				@change="onDateChange"
				:start="startDate"
				:end="endDate"
			>
				<view class="date-box">
					<text class="calendar-icon">📅</text>
					<text class="date-text">{{ selectedDateText }}</text>
					<text class="arrow-icon">▼</text>
				</view>
			</picker>
			
			<view class="clear-date" v-if="selectedDate" @tap="clearDate">
				<text class="clear-text">清除</text>
			</view>
		</view>
		
		<!-- 加载状态 -->
		<view class="loading-state" v-if="loading">
			<text class="loading-icon">⏳</text>
			<text class="loading-text">加载中...</text>
		</view>
		
		<view class="works-list" v-else>
			<view 
				class="work-card" 
				v-for="(work, index) in worksList" 
				:key="work.id"
				:style="{ animationDelay: index * 0.1 + 's' }"
			>
				<view class="card-header">
					<view class="author-info">
						<text class="author-name">来自{{ work.penName }}:</text>
					</view>
					<view class="time">
						<text class="time-text">{{ work.date }}</text>
					</view>
				</view>
				
				<view class="image-wrapper">
					<image 
					        class="work-image" 
					        :src="work.imageUrl" 
					        mode="aspectFill"
					        lazy-load
					        @tap="previewImage(work.imageUrl)"
					    ></image>
				</view>
				
				<view class="card-footer">
					<view class="footer-content">
						<view class="description-area" v-if="work.description">
							<text class="description">——{{ work.description }}</text>
						</view>
						
						<view class="actions">
							<view 
								class="like-btn" 
								:class="{ 'liked': work.isLiked }"
								@tap="toggleLike(index)"
							>
								<text class="like-icon">{{ work.isLiked ? '❤️' : '🤍' }}</text>
								<text class="like-count">{{ work.likeCount }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty-state" v-if="!loading && worksList.length === 0">
			<text class="empty-icon">{{ selectedDate ? '🔍' : '✨' }}</text>
			<text class="empty-text">{{ selectedDate ? '该日期没有作品' : '今天还没有作品哦' }}</text>
		</view>
		
		<!-- 加载更多 -->
		<view class="load-more" v-if="!loading && hasMore && worksList.length > 0">
			<text class="load-more-text" @tap="loadMore">加载更多</text>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				selectedDate: '', // 选中的日期 格式: 2024-01-01
				worksList: [],
				loading: false,
				page: 1,
				pageSize: 10,
				total: 0,
				hasMore: true,
				startDate: '2020-01-01', // 可选择的最早日期
				endDate: '' // 可选择的最晚日期（今天）
			};
		},
		computed: {
			...mapState('m_user', ['openid']),
			selectedDateText() {
				if (this.selectedDate) {
					return this.selectedDate;
				}
				return '选择日期查看作品';
			}
		},
		onLoad() {
			// 设置结束日期为今天
			this.endDate = this.formatDate(new Date());
			this.getWorksList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.page = 1;
			this.worksList = [];
			this.hasMore = true;
			this.getWorksList().then(() => {
				uni.stopPullDownRefresh();
			});
		},
		// 上拉加载更多
		onReachBottom() {
			if (this.hasMore && !this.loading) {
				this.loadMore();
			}
		},
		methods: {
			// 删除 openDatePicker 方法，不再需要
			// 预览图片
			    previewImage(imageUrl) {
			        uni.previewImage({
			            urls: [imageUrl],
			            current: imageUrl,
			            longPressActions: {
			                itemList: ['保存图片'],
			                success: (data) => {
			                    if (data.tapIndex === 0) {
			                        this.saveImage(imageUrl);
			                    }
			                }
			            }
			        });
			    },
				
				   // 保存图片到相册（可选功能）
				    async saveImage(imageUrl) {
				        try {
				            // 先下载图片
				            const downloadResult = await uni.downloadFile({
				                url: imageUrl
				            });
				            
				            if (downloadResult[1].statusCode === 200) {
				                // 保存到相册
				                await uni.saveImageToPhotosAlbum({
				                    filePath: downloadResult[1].tempFilePath
				                });
				                
				                uni.showToast({
				                    title: '保存成功',
				                    icon: 'success'
				                });
				            }
				        } catch (error) {
				            console.error('保存图片失败:', error);
				            uni.showToast({
				                title: '保存失败',
				                icon: 'none'
				            });
				        }
				    },
				
				
			// 日期改变事件
			onDateChange(e) {
				this.selectedDate = e.detail.value;
				this.page = 1;
				this.worksList = [];
				this.hasMore = true;
				this.getWorksList();
			},
			
			// 清除日期
			clearDate() {
				this.selectedDate = '';
				this.page = 1;
				this.worksList = [];
				this.hasMore = true;
				this.getWorksList();
			},
			
			// 获取作品列表
			async getWorksList() {
				if (this.loading) return;
				
				this.loading = true;
				
				try {
					const queryObj = {
						page: this.page,
						pageSize: this.pageSize,
						openid: this.openid
					};
					
					// 如果选择了日期，添加日期参数
					if (this.selectedDate) {
						queryObj.date = this.selectedDate;
					}
					
					const { data: res } = await uni.$http.get('/board/list', queryObj);
					
					if (res.meta.status !== 200) {
						throw new Error(res.meta.msg || '获取数据失败');
					}
					
					const { list, total } = res.message;
					const formattedList = list.map(item => ({
						id: item.id,
						penName: item.author || '匿名用户',
						date: this.formatDate(item.created_at),
						imageUrl: item.image_url,
						description: item.description || '',
						content: item.content || '',
						likeCount: parseInt(item.like_count) || 0,
						isLiked: item.isLiked || false
					}));
					
					if (this.page === 1) {
						this.worksList = formattedList;
					} else {
						this.worksList = [...this.worksList, ...formattedList];
					}
					
					this.total = total;
					this.hasMore = this.worksList.length < total;
					
				} catch (error) {
					console.error('获取作品列表失败:', error);
					uni.showToast({
						title: error.message || '加载失败',
						icon: 'none',
						duration: 2000
					});
				} finally {
					this.loading = false;
				}
			},
			
			// 格式化日期
			formatDate(dateString) {
				const date = new Date(dateString);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				return `${year}-${month}-${day}`;
			},
			
			// 加载更多
			loadMore() {
				if (!this.hasMore || this.loading) return;
				this.page++;
				this.getWorksList();
			},
			
			// 切换点赞
			toggleLike(index) {
				const work = this.worksList[index];
				
				if (work.isLiked) {
					work.isLiked = false;
					work.likeCount--;
				} else {
					work.isLiked = true;
					work.likeCount++;
				}
				
				this.updateLikeStatus(work.id, work.isLiked);
			},
			
			// 更新点赞状态
			async updateLikeStatus(workId, isLiked) {
				try {
					const { data: res } = await uni.$http.post('/board/like', {
						id: workId,
						isLiked: isLiked,
						openid: this.openid
					});
				} catch (error) {
					console.error('更新点赞状态失败:', error);
					uni.showToast({
						title: '操作失败',
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(135deg, #FFF8E7 0%, #FFE4B5 100%);
		min-height: 100vh;
	}
	
	.container {
		padding: 40rpx 30rpx;
		min-height: 100vh;
	}
	
	.header {
		text-align: center;
		margin-bottom: 40rpx;
		animation: fadeInDown 0.8s ease-out;
		
		.title {
			display: block;
			font-size: 48rpx;
			font-weight: bold;
			color: #8B4513;
			margin-bottom: 16rpx;
			letter-spacing: 2rpx;
		}
		
		.subtitle {
			display: block;
			font-size: 28rpx;
			color: #A0826D;
			opacity: 0.8;
		}
	}
	
	// 日期选择栏样式
	.date-wrapper {
		display: flex;
		gap: 20rpx;
		margin-bottom: 40rpx;
		animation: fadeInDown 0.8s ease-out 0.2s backwards;
		
		// picker 组件占据 flex 空间
		picker {
			flex: 1;
		}
		
		.date-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #FFFFFF;
			border-radius: 50rpx;
			padding: 20rpx 30rpx;
			box-shadow: 0 4rpx 20rpx rgba(139, 69, 19, 0.06);
			transition: all 0.3s ease;
			
			&:active {
				box-shadow: 0 6rpx 30rpx rgba(139, 69, 19, 0.12);
				transform: translateY(-2rpx);
			}
			
			.calendar-icon {
				font-size: 32rpx;
				margin-right: 16rpx;
			}
			
			.date-text {
				flex: 1;
				font-size: 28rpx;
				color: #333333;
			}
			
			.arrow-icon {
				font-size: 20rpx;
				color: #999999;
				margin-left: 16rpx;
			}
		}
		
		.clear-date {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #FFE8E8;
			border-radius: 50rpx;
			padding: 20rpx 30rpx;
			transition: all 0.3s ease;
			
			.clear-text {
				font-size: 28rpx;
				color: #FF6B6B;
				font-weight: 600;
			}
			
			&:active {
				transform: scale(0.95);
				opacity: 0.8;
			}
		}
	}
	
	// 加载状态样式
	.loading-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 120rpx 0;
		animation: fadeIn 0.5s ease-out;
		
		.loading-icon {
			font-size: 80rpx;
			margin-bottom: 20rpx;
			animation: rotating 1.5s linear infinite;
		}
		
		.loading-text {
			font-size: 28rpx;
			color: #A0826D;
		}
	}
	
	.works-list {
		display: flex;
		flex-direction: column;
		gap: 40rpx;
	}
	
	.work-card {
		background: #FFFFFF;
		border-radius: 24rpx;
		overflow: hidden;
		box-shadow: 0 8rpx 32rpx rgba(139, 69, 19, 0.08);
		animation: fadeInUp 0.6s ease-out backwards;
		transition: all 0.3s ease;
		
		&:active {
			transform: scale(0.98);
		}
	}
	
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #F5F5F5;
	}
	
	.author-info {
		display: flex;
		align-items: center;
		gap: 20rpx;
		
		.author-name {
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;
		}
	}
	
	.time {
		display: flex;
		align-items: center;
		gap: 8rpx;
		
		.time-text {
			font-size: 28rpx;
			font-weight: 600;
			color: #666666;
		}
	}
	
	.image-wrapper {
		width: 100%;
		position: relative;
		background: #F8F8F8;
		
		.work-image {
			width: 100%;
			height: 500rpx;
			display: block;
		}
	}
	
	.card-footer {
		padding: 30rpx;
		
		.footer-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 20rpx;
			
			.description-area {
				flex: 1;
				
				.description {
					font-size: 28rpx;
					color: #666666;
					line-height: 1.6;
				}
			}
			
			.actions {
				flex-shrink: 0;
				
				.like-btn {
					display: flex;
					align-items: center;
					gap: 12rpx;
					padding: 12rpx 24rpx;
					border-radius: 40rpx;
					background: #FFF8F0;
					transition: all 0.3s ease;
					
					.like-icon {
						font-size: 32rpx;
						transition: transform 0.3s ease;
					}
					
					.like-count {
						font-size: 28rpx;
						color: #999999;
						font-weight: 600;
						min-width: 30rpx;
					}
					
					&.liked {
						background: #FFE8E8;
						
						.like-icon {
							animation: heartBeat 0.5s ease;
						}
						
						.like-count {
							color: #FF6B6B;
						}
					}
					
					&:active {
						transform: scale(0.95);
					}
				}
			}
		}
	}
	
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 120rpx 0;
		animation: fadeIn 1s ease-out;
		
		.empty-icon {
			font-size: 120rpx;
			margin-bottom: 30rpx;
		}
		
		.empty-text {
			font-size: 28rpx;
			color: #A0826D;
		}
	}
	
	.load-more {
		display: flex;
		justify-content: center;
		padding: 40rpx 0;
		
		.load-more-text {
			font-size: 28rpx;
			color: #A0826D;
			padding: 20rpx 40rpx;
			border-radius: 40rpx;
			background: #FFF8F0;
			transition: all 0.3s ease;
			
			&:active {
				transform: scale(0.95);
				opacity: 0.8;
			}
		}
	}
	
	// 动画定义
	@keyframes fadeInDown {
		from {
			opacity: 0;
			transform: translateY(-30rpx);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30rpx);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	@keyframes rotating {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	@keyframes heartBeat {
		0%, 100% {
			transform: scale(1);
		}
		25% {
			transform: scale(1.3);
		}
		50% {
			transform: scale(1.1);
		}
		75% {
			transform: scale(1.2);
		}
	}
	
	.work-card {
		&:hover {
			box-shadow: 0 12rpx 48rpx rgba(139, 69, 19, 0.12);
			transform: translateY(-4rpx);
		}
	}
</style>
