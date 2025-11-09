<!-- subpkg/search/search.vue -->
<template>
	<view class="search-page">
		<!-- 搜索栏 -->
		<view class="search-header">
			<view class="search-input-container">
				<text class="search-icon">🔍</text>
				<input 
					class="search-input"
					v-model="searchKeyword"
					placeholder="搜索帖子内容..."
					confirm-type="search"
					@confirm="performSearch"
					@input="onInputChange"
					focus
				/>
				<text class="clear-btn" v-if="searchKeyword" @click="clearInput">✕</text>
			</view>
			<text class="cancel-btn" @click="goBack">取消</text>
		</view>
		
		<!-- 搜索建议 -->
		<view class="search-suggestions" v-if="showSuggestions && suggestions.length > 0">
			<view 
				class="suggestion-item"
				v-for="(item, index) in suggestions"
				:key="index"
				@click="selectSuggestion(item)"
			>
				<text class="suggestion-icon">🔍</text>
				<text class="suggestion-text">{{ item }}</text>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="search-history" v-if="showHistory && searchHistory.length > 0">
			<view class="history-header">
				<text class="history-title">搜索历史</text>
				<text class="clear-all-btn" @click="clearAllHistory">清空</text>
			</view>
			<view class="history-tags">
				<view 
					class="history-tag"
					v-for="(item, index) in searchHistory"
					:key="index"
					@click="selectHistory(item)"
				>
					<text class="history-text">{{ item }}</text>
					<text class="remove-btn" @click.stop="removeHistory(index)">✕</text>
				</view>
			</view>
		</view>
		
		<!-- 热门搜索 -->
		<view class="hot-search" v-if="showHotSearch && hotSearchList.length > 0">
			<view class="hot-header">
				<text class="hot-title">🔥 热门搜索</text>
			</view>
			<view class="hot-tags">
				<text 
					class="hot-tag"
					v-for="(item, index) in hotSearchList"
					:key="index"
					@click="selectHotSearch(item)"
				>
					{{ item }}
				</text>
			</view>
		</view>
		
		<!-- 搜索结果 -->
		<view class="search-results" v-if="showResults">
			<view class="results-header">
				<text class="results-title">搜索结果 ({{ searchResultTotal }})</text>
			</view>
			
			<scroll-view class="results-list" scroll-y @scrolltolower="loadMoreResults">
				<view class="post-item" v-for="(post, index) in searchResults" :key="post.id" @click="gotoPostDetail(post)">
					<!-- 用户信息和时间 -->
					<view class="post-header">
						<view class="user-info">
							<image class="avatar" :src="post.avatar || '/static/default-avatar.png'" mode="aspectFill"></image>
							<text class="nickname">{{ post.nickname }}</text>
						</view>
						<text class="post-time">{{ formatTime(post.created_at) }}</text>
					</view>

					<!-- 帖子内容 (高亮关键词) -->
					<view class="post-content">
						<rich-text class="content-text" :nodes="highlightKeyword(post.content)"></rich-text>
					</view>

					<!-- 帖子图片(如果有) -->
					<view class="post-images" v-if="post.images && post.images.length > 0">
						<image 
							v-for="(img, imgIndex) in post.images.slice(0, 3)" 
							:key="imgIndex"
							class="post-image"
							:src="img" 
							mode="aspectFill"
						></image>
						<view class="more-images" v-if="post.images.length > 3">
							<text>+{{ post.images.length - 3 }}</text>
						</view>
					</view>

					<!-- 帖子底部信息 -->
					<view class="post-footer">
						<view class="footer-left">
							<text class="tag">{{ post.properties }}</text>
							<text class="view-count">{{ post.view_count }}人浏览</text>
						</view>
						<view class="footer-right">
							<view class="action-item">
								<text class="iconfont like-icon">👍</text>
								<text class="action-count">{{ post.like_count }}</text>
							</view>
							<view class="action-item">
								<text class="iconfont comment-icon">💬</text>
								<text class="action-count">{{ post.comment_count }}</text>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 加载更多 -->
				<view class="load-more" v-if="hasMoreResults && searchResults.length > 0">
					<text class="load-text">加载中...</text>
				</view>
				<view class="no-more" v-else-if="searchResults.length > 0">
					<text class="no-more-text">没有更多了</text>
				</view>
				
				<!-- 空结果 -->
				<view class="empty-results" v-if="searchResults.length === 0 && !isSearching && hasSearched">
					<text class="empty-icon">🔍</text>
					<text class="empty-text">没有找到相关内容</text>
					<text class="empty-tip">试试其他关键词吧</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				searchKeyword: '',
				searchHistory: [],
				hotSearchList: ['新生指南', '二手教材', '校园生活', '考试复习', '社团活动'],
				suggestions: [],
				searchResults: [],
				searchResultTotal: 0,
				
				// 状态控制
				showSuggestions: false,
				showHistory: true,
				showHotSearch: true,
				showResults: false,
				hasSearched: false,
				isSearching: false,
				
				// 分页参数
				searchPage: 1,
				searchPageSize: 10,
				hasMoreResults: true,
				
				// 防抖定时器
				debounceTimer: null
			}
		},
		
		computed: {
			...mapState('m_user', ['openid', 'userBase'])
		},
		
		onLoad(options) {
			this.loadSearchHistory()
		},
		
		onUnload() {
			// 清理定时器
			if (this.debounceTimer) {
				clearTimeout(this.debounceTimer)
			}
		},
		
		methods: {
			// 输入变化
			onInputChange() {
				this.showResults = false
				this.showHistory = !this.searchKeyword
				this.showHotSearch = !this.searchKeyword
				this.hasSearched = false
				
				// 防抖获取搜索建议
				if (this.debounceTimer) {
					clearTimeout(this.debounceTimer)
				}
				
				if (this.searchKeyword.trim()) {
					this.debounceTimer = setTimeout(() => {
						this.getSuggestions()
					}, 300)
				} else {
					this.suggestions = []
					this.showSuggestions = false
				}
			},
			
			// 获取搜索建议
			async getSuggestions() {
				if (!this.searchKeyword.trim()) return
				
				try {
					const { data: res } = await uni.$http.get('/search/suggestions', {
						keyword: this.searchKeyword,
						limit: 5
					})
					
					if (res.meta.status === 200) {
						this.suggestions = res.message.list || []
						this.showSuggestions = this.suggestions.length > 0
					}
				} catch (error) {
					console.error('获取搜索建议失败:', error)
				}
			},
			
			async performSearch(eventOrKeyword = null) {
			            let searchText = '';
			            
			            // 判断参数类型
			            if (typeof eventOrKeyword === 'string') {
			                // 直接传入的字符串关键词
			                searchText = eventOrKeyword;
			            } else if (eventOrKeyword && eventOrKeyword.detail && eventOrKeyword.detail.value) {
			                // 事件对象，从 detail.value 中提取
			                searchText = eventOrKeyword.detail.value;
			            } else if (this.searchKeyword) {
			                // 使用当前输入框的值
			                searchText = this.searchKeyword.trim();
			            } else {
			                uni.showToast({
			                    title: '请输入搜索内容',
			                    icon: 'none'
			                });
			                return;
			            }
			            
			            // 确保搜索关键词是字符串且不为空
			            if (!searchText || typeof searchText !== 'string') {
			                uni.showToast({
			                    title: '请输入搜索内容',
			                    icon: 'none'
			                });
			                return;
			            }
			            
			            searchText = searchText.trim();
			            if (!searchText) {
			                uni.showToast({
			                    title: '请输入搜索内容',
			                    icon: 'none'
			                });
			                return;
			            }
			            
			            console.log('执行搜索，关键词:', searchText); // 调试日志
			            
			            this.searchKeyword = searchText;
			            this.isSearching = true;
			            this.showResults = true;
			            this.showHistory = false;
			            this.showHotSearch = false;
			            this.showSuggestions = false;
			            this.searchPage = 1;
			            this.searchResults = [];
			            this.hasMoreResults = true;
			            
			            // 保存搜索历史
			            this.saveSearchHistory(searchText);
			            
			            try {
			                const { data: res } = await uni.$http.get('/search/posts', {
			                    keyword: searchText,
			                    page: this.searchPage,
			                    pageSize: this.searchPageSize,
			                    openid: this.openid,
								department: this.userBase.major,
			                });
			                
			                if (res.meta.status === 200) {
			                    this.searchResults = res.message.list.map(post => ({
			                        ...post,
			                        images: this.processPostImages(post.images)
			                    }));
			                    this.searchResultTotal = res.message.total;
			                    this.hasMoreResults = res.message.hasMore;
			                    this.hasSearched = true;
			                } else {
			                    uni.showToast({
			                        title: res.meta.msg || '搜索失败',
			                        icon: 'none'
			                    });
			                }
			            } catch (error) {
			                console.error('搜索失败:', error);
			                uni.showToast({
			                    title: '搜索失败，请重试',
			                    icon: 'none'
			                });
			            } finally {
			                this.isSearching = false;
			            }
			        },
			
			// 加载更多搜索结果
			async loadMoreResults() {
				if (!this.hasMoreResults || this.isSearching) return
				
				this.isSearching = true
				this.searchPage++
				
				try {
					const { data: res } = await uni.$http.get('/search/posts', {
						keyword: this.searchKeyword,
						page: this.searchPage,
						pageSize: this.searchPageSize,
						openid: this.openid,
						department: this.userBase.major,
					})
					
					if (res.meta.status === 200) {
						const newResults = res.message.list.map(post => ({
							...post,
							images: this.processPostImages(post.images)
						}))
						this.searchResults = this.searchResults.concat(newResults)
						this.hasMoreResults = res.message.hasMore
					}
				} catch (error) {
					console.error('加载更多失败:', error)
				} finally {
					this.isSearching = false
				}
			},
			
			// 处理帖子图片
			processPostImages(images) {
				if (!images) return []
				
				let imageArray = []
				if (typeof images === 'string') {
					try {
						imageArray = JSON.parse(images)
					} catch (e) {
						return []
					}
				} else if (Array.isArray(images)) {
					imageArray = images
				}
				
				return imageArray
			},
			
			// 高亮关键词
			highlightKeyword(text) {
				if (!this.searchKeyword || !text) return text
				
				const keyword = this.searchKeyword.trim()
				const regex = new RegExp(`(${keyword})`, 'gi')
				
				return text.replace(regex, '<span style="color: #C00000; background-color: #fff2f0; padding: 2px 4px; border-radius: 4px;">$1</span>')
			},
			
			// 格式化时间
			formatTime(timestamp) {
				if (!timestamp) return '刚刚'
				
				const date = new Date(timestamp)
				const now = new Date()
				const diff = now - date
				
				if (diff < 60000) return '刚刚'
				if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
				if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
				if (diff < 2592000000) return Math.floor(diff / 86400000) + '天前'
				
				return `${date.getMonth() + 1}-${date.getDate()}`
			},
			
			// 选择搜索建议
			selectSuggestion(suggestion) {
			            this.performSearch(suggestion);
			        },
			
			// 选择搜索历史
			selectHistory(history) {
			            this.performSearch(history);
			        },
			
			// 选择热门搜索
			 selectHotSearch(hot) {
			            this.performSearch(hot);
			        },
			
			// 清空输入
			clearInput() {
				this.searchKeyword = ''
				this.showResults = false
				this.showHistory = true
				this.showHotSearch = true
				this.showSuggestions = false
				this.hasSearched = false
			},
			
			// 加载搜索历史
			loadSearchHistory() {
				try {
					const history = uni.getStorageSync('searchHistory') || []
					this.searchHistory = history
				} catch (error) {
					console.error('加载搜索历史失败:', error)
				}
			},
			
			// 保存搜索历史
			saveSearchHistory(keyword) {
				try {
					// 移除重复项
					this.searchHistory = this.searchHistory.filter(item => item !== keyword)
					// 添加到开头
					this.searchHistory.unshift(keyword)
					// 限制历史记录数量
					this.searchHistory = this.searchHistory.slice(0, 10)
					
					// 保存到本地存储
					uni.setStorageSync('searchHistory', this.searchHistory)
				} catch (error) {
					console.error('保存搜索历史失败:', error)
				}
			},
			
			// 移除单个历史记录
			removeHistory(index) {
				this.searchHistory.splice(index, 1)
				uni.setStorageSync('searchHistory', this.searchHistory)
			},
			
			// 清空所有历史记录
			clearAllHistory() {
				uni.showModal({
					title: '提示',
					content: '确定要清空所有搜索历史吗？',
					success: (res) => {
						if (res.confirm) {
							this.searchHistory = []
							uni.removeStorageSync('searchHistory')
						}
					}
				})
			},
			
			// 跳转到帖子详情
			gotoPostDetail(post) {
				if (post.images.length > 0) {
					uni.navigateTo({
						url: '/subpkg/topic-detail/topic-detail?id=' + post.id
					})
				}
				else {
					uni.navigateTo({
					url: '/subpkg/post-detail/post-detail?id=' + post.id
				})
				}
				
			},
			
			// 返回
			goBack() {
				uni.navigateBack()
			}
		}
	}
	</script>
	
	<style lang="scss">
	.search-page {
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	
	// 搜索头部
	.search-header {
		display: flex;
		align-items: center;
		padding: 16rpx 24rpx;
		background-color: #ffffff;
		border-bottom: 1rpx solid #f0f0f0;
		
		.search-input-container {
			flex: 1;
			display: flex;
			align-items: center;
			background-color: #f5f5f5;
			border-radius: 32rpx;
			padding: 16rpx 24rpx;
			margin-right: 24rpx;
			
			.search-icon {
				font-size: 28rpx;
				color: #999999;
				margin-right: 12rpx;
			}
			
			.search-input {
				flex: 1;
				font-size: 28rpx;
				color: #333333;
				background-color: transparent;
			}
			
			.clear-btn {
				font-size: 24rpx;
				color: #999999;
				padding: 8rpx;
				
				&:active {
					color: #666666;
				}
			}
		}
		
		.cancel-btn {
			font-size: 28rpx;
			color: #C00000;
			
			&:active {
				opacity: 0.7;
			}
		}
	}
	
	// 搜索建议
	.search-suggestions {
		background-color: #ffffff;
		border-bottom: 1rpx solid #f0f0f0;
		
		.suggestion-item {
			display: flex;
			align-items: center;
			padding: 24rpx 32rpx;
			border-bottom: 1rpx solid #f8f8f8;
			
			&:last-child {
				border-bottom: none;
			}
			
			&:active {
				background-color: #f8f8f8;
			}
			
			.suggestion-icon {
				font-size: 24rpx;
				color: #999999;
				margin-right: 16rpx;
			}
			
			.suggestion-text {
				font-size: 28rpx;
				color: #333333;
			}
		}
	}
	
	// 搜索历史
	.search-history {
		background-color: #ffffff;
		margin-top: 20rpx;
		padding: 32rpx;
		
		.history-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 24rpx;
			
			.history-title {
				font-size: 30rpx;
				color: #333333;
				font-weight: 500;
			}
			
			.clear-all-btn {
				font-size: 26rpx;
				color: #999999;
				
				&:active {
					color: #666666;
				}
			}
		}
		
		.history-tags {
			display: flex;
			flex-wrap: wrap;
			gap: 16rpx;
			
			.history-tag {
				display: flex;
				align-items: center;
				background-color: #f5f5f5;
				border-radius: 32rpx;
				padding: 12rpx 20rpx;
				gap: 12rpx;
				
				&:active {
					background-color: #e8e8e8;
				}
				
				.history-text {
					font-size: 26rpx;
					color: #666666;
				}
				
				.remove-btn {
					font-size: 20rpx;
					color: #999999;
					padding: 4rpx;
					
					&:active {
						color: #666666;
					}
				}
			}
		}
	}
	
	// 热门搜索
	.hot-search {
		background-color: #ffffff;
		margin-top: 20rpx;
		padding: 32rpx;
		
		.hot-header {
			margin-bottom: 24rpx;
			
			.hot-title {
				font-size: 30rpx;
				color: #333333;
				font-weight: 500;
			}
		}
		
		.hot-tags {
			display: flex;
			flex-wrap: wrap;
			gap: 16rpx;
			
			.hot-tag {
				background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
				border-radius: 32rpx;
				padding: 12rpx 24rpx;
				font-size: 26rpx;
				color: #333333;
				
				&:active {
					opacity: 0.8;
				}
			}
		}
	}
	
	// 搜索结果
	.search-results {
		margin-top: 20rpx;
		
		.results-header {
			background-color: #ffffff;
			padding: 24rpx 32rpx;
			border-bottom: 1rpx solid #f0f0f0;
			
			.results-title {
				font-size: 30rpx;
				color: #333333;
				font-weight: 500;
			}
		}
		
		.results-list {
			height: calc(100vh - 200rpx);
			
			.post-item {
				background-color: #ffffff;
				margin-bottom: 20rpx;
				padding: 32rpx;
				
				&:active {
					background-color: #f9f9f9;
				}
				
				.post-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24rpx;
					
					.user-info {
						display: flex;
						align-items: center;
						
						.avatar {
							width: 64rpx;
							height: 64rpx;
							border-radius: 50%;
							margin-right: 16rpx;
							background-color: #f0f0f0;
						}
						
						.nickname {
							font-size: 26rpx;
							color: #333333;
							font-weight: 500;
						}
					}
					
					.post-time {
						font-size: 22rpx;
						color: #999999;
					}
				}
				
				.post-content {
					margin-bottom: 24rpx;
					
					.content-text {
						font-size: 28rpx;
						color: #333333;
						line-height: 1.5;
						word-wrap: break-word;
					}
				}
				
				.post-images {
					display: flex;
					gap: 5px;
					margin-bottom: 10px;
					position: relative;
					
					.post-image {
						width: 100px;
						height: 100px;
						border-radius: 8px;
						background-color: #f5f5f5;
						
						&.single-image {
							width: 100%;
							height: 300rpx;
						}
						
						&.double-image {
							width: calc(50% - 6rpx);
							height: 200rpx;
						}
						
						&.triple-image {
							width: calc(33.333% - 8rpx);
							height: 160rpx;
						}
						
					}
					.more-images {
						position: absolute;
						right: 5px;
						bottom: 5px;
						background-color: rgba(0, 0, 0, 0.6);
						color: #fff;
						padding: 5px 10px;
						border-radius: 12px;
						font-size: 12px;
					}
				}
				
				.post-footer {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 16rpx;
					border-top: 1rpx solid #f0f0f0;
					
					.footer-left {
						display: flex;
						align-items: center;
						
						.tag {
							font-size: 22rpx;
							color: #C00000;
							background-color: #f0f2ff;
							padding: 6rpx 12rpx;
							border-radius: 4rpx;
							margin-right: 12rpx;
						}
						
						.view-count {
							font-size: 22rpx;
							color: #999999;
						}
					}
					
					.footer-right {
						display: flex;
						align-items: center;
						gap: 24rpx;
						
						.action-item {
							display: flex;
							align-items: center;
							gap: 6rpx;
							
							.iconfont {
								font-size: 28rpx;
							}
							
							.action-count {
								font-size: 22rpx;
								color: #666666;
							}
						}
					}
				}
			}
			
			.load-more,
			.no-more {
				padding: 40rpx 0;
				text-align: center;
				
				.load-text,
				.no-more-text {
					font-size: 26rpx;
					color: #999999;
				}
			}
			
			.empty-results {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 200rpx 0;
				
				.empty-icon {
					font-size: 100rpx;
					margin-bottom: 16rpx;
				}
				
				.empty-text {
					font-size: 28rpx;
					color: #666666;
					margin-bottom: 8rpx;
				}
				
				.empty-tip {
					font-size: 24rpx;
					color: #999999;
				}
			}
		}
	}
	</style>