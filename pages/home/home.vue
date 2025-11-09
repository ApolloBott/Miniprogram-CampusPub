<template>
	<view class="index-page">
		
		<!-- 🔥 修改：公告栏 - 整个区域都可点击 -->
		<button class="notice-bar-wrapper" open-type="contact">
			<view class="notice-bar">
				<view class="notice-icon">📢</view>
				<view class="notice-content">
					<text class="notice-text">请点击此处跳转到客服反馈，向我们反馈问题</text>
				</view>
				<view class="notice-arrow">›</view>
			</view>
		</button>
		
		<!-- ✅ 一级导航栏（发现/最新）- 添加动态 class -->
		<view 
			class="primary-nav"
			:class="{ 'is-fixed': isNavFixed }"
			:style="{ top: navTop + 'px' }"
		>
			<view class="nav-left">
				<view 
					class="nav-tab"
					:class="{ active: sortMode === 'discover' }"
					@click="selectSortMode('discover')"
				>
					<text class="nav-text">发现</text>
					<view class="nav-indicator" v-if="sortMode === 'discover'"></view>
				</view>
				
				<view 
					class="nav-tab"
					:class="{ active: sortMode === 'latest' }"
					@click="selectSortMode('latest')"
				>
					<text class="nav-text">最新</text>
					<view class="nav-indicator" v-if="sortMode === 'latest'"></view>
				</view>
			</view>
			
			<!-- ✅ 搜索图标 -->
			<view class="nav-right" @click="gotoSearch">
				<text class="search-icon">🔍</text>
			</view>
		</view>
		
		<!-- ✅ 二级分类导航栏（仅在"发现"模式下显示） -->
		<view class="category-nav" v-if="sortMode === 'discover'">
			<scroll-view class="category-scroll" scroll-x>
				<view class="category-list">
					<view 
						class="category-item"
						:class="{ active: categoryMode === 'recommend' }"
						@click="selectCategory('recommend')"
					>
						<text class="category-text">推荐</text>
					</view>
					
					<view 
						class="category-item"
						:class="{ active: categoryMode === 'daily' }"
						@click="selectCategory('daily')"
					>
						<text class="category-text">日常</text>
					</view>
					
					<view 
						class="category-item"
						:class="{ active: categoryMode === 'friend' }"
						@click="selectCategory('friend')"
					>
						<text class="category-text">交友</text>
					</view>
					
					<view 
						class="category-item"
						:class="{ active: categoryMode === 'complaint' }"
						@click="selectCategory('complaint')"
					>
						<text class="category-text">吐槽</text>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- ✅ 内容区域 -->
		<view class="content-section">
			<!-- 加载状态 -->
			<view class="loading-container" v-if="isLoading && page === 1">
				<text class="loading-text">加载中...</text>
			</view>
			
			<!-- ✅ 双列瀑布流布局 -->
			<view class="waterfall-container" v-else-if="postList.length > 0">
				<!-- 左列 -->
				<view class="waterfall-column">
					<view 
						class="waterfall-item" 
						v-for="post in leftColumnPosts" 
						:key="post.id"
					>
						<view class="waterfall-card">
							<!-- 图片（如果有） -->
							<view class="card-image-wrapper" v-if="post.images && post.images.length > 0" @click="gotoPostDetail(post)">
								<image 
									class="card-image"
									:src="post.images[0]" 
									mode="widthFix"
								></image>
							</view>
							
							<!-- 内容 -->
							<view class="card-content" @click="gotoPostDetail(post)">
								<text class="content-text">{{ post.content }}</text>
							</view>
							
							<!-- 用户信息和点赞 -->
							<view class="card-header">
								<view class="user-info" @click="gotoUserProfile(post)">
									<image 
										class="card-avatar" 
										:src="post.avatar || '/static/default-avatar.png'" 
										mode="aspectFill"
									></image>
									<text class="card-nickname">{{ truncateNickname(post.nickname) }}</text>
								</view>
								
								<view class="like-action" @click.stop="toggleLike(post)">
								    <image
								        class="like-icon-img"
								        :src="post.isLiked ? iconLikedUrl : iconLikeUrl"
								        mode="aspectFit"
								    ></image>
								    <text class="action-count">{{ post.likeCount }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 右列 -->
				<view class="waterfall-column">
					<view 
						class="waterfall-item" 
						v-for="post in rightColumnPosts" 
						:key="post.id"
					>
						<view class="waterfall-card">
							<!-- 图片（如果有） -->
							<view class="card-image-wrapper" v-if="post.images && post.images.length > 0" @click="gotoPostDetail(post)">
								<image 
									class="card-image"
									:src="post.images[0]" 
									mode="widthFix"
								></image>
							</view>
							
							<!-- 内容 -->
							<view class="card-content" @click="gotoPostDetail(post)">
								<text class="content-text">{{ post.content }}</text>
							</view>
							
							<!-- 用户信息和点赞 -->
							<view class="card-header">
								<view class="user-info" @click="gotoUserProfile(post)">
									<image 
										class="card-avatar" 
										:src="post.avatar || '/static/default-avatar.png'" 
										mode="aspectFill"
									></image>
									<text class="card-nickname">{{ truncateNickname(post.nickname) }}</text>
								</view>
								
								<view class="like-action" @click.stop="toggleLike(post)">
								    <image
								        class="like-icon-img"
								        :src="post.isLiked ? iconLikedUrl : iconLikeUrl"
								        mode="aspectFit"
								    ></image>
								    <text class="action-count">{{ post.likeCount }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 空状态 -->
			<view class="empty-state" v-else>
				<text class="empty-icon">📭</text>
				<text class="empty-text">{{ getEmptyText() }}</text>
			</view>
		</view>
		
		<!-- 底部间距 -->
		<view class="bottom-spacing"></view>
	</view>
</template>
<script>
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		data() {
			return {
				// 轮播图数据
				bannerList: [],
				
				// ✅ 导航和分类
				sortMode: 'discover', // discover(发现) / latest(最新)
				categoryMode: 'recommend', // recommend(推荐) / daily(日常) / friend(交友) / complaint(吐槽)
				
				// ✅ 帖子列表
				postList: [],
				page: 1,
				pageSize: 10,
				isLoading: false,
				isLoadingMore: false,
				hasMore: true,
				
				// ✅ 推荐模式排除列表
				excludePostIds: [],
				
				// 防抖相关
				isReachingBottom: false,
				lastReachTime: 0,
				reachThrottle: 500,
				// ✅ 导航栏吸顶相关
				isNavFixed: false,     // 是否固定
				navTop: 0,              // 导航栏的 top 值
				bannerHeight: 300,      // 轮播图高度（rpx 转 px 后的值）
				scrollTop: 0,           // 当前滚动位置
				iconLikeUrl: 'https://img.xinshi00.com/label/like.png',
				iconLikedUrl: 'https://img.xinshi00.com/label/liked.png',
			}
		},
		
		computed: {
			...mapState('m_user', ['openid', 'userBase', 'preference']),
			
			// 左列帖子
			leftColumnPosts() {
				return this.postList.filter((_, index) => index % 2 === 0)
			},
			
			// 右列帖子
			rightColumnPosts() {
				return this.postList.filter((_, index) => index % 2 === 1)
			}
		},
		
		async onLoad() {
			// 获取系统信息，计算轮播图高度
			const systemInfo = uni.getSystemInfoSync()
			this.bannerHeight = 300 // rpx
			
			// ✅ 加载轮播图数据
			await this.loadBannerList()
						
			await this.loadPostList()
			
			if (this.openid) {
				const { data: res } = await uni.$http.get('/users/userinfo', { code: this.openid })
				if (res.meta.status === 200) {
					this.updateUserBase(res.message)
				}
			}
		},
		
		onPullDownRefresh() {
			this.refreshPostList()
		},
		
		onReachBottom() {
			const now = Date.now()
			
			if (now - this.lastReachTime < this.reachThrottle) {
				console.log('[onReachBottom] 触发过于频繁，忽略')
				return
			}
			
			this.lastReachTime = now
			console.log('[onReachBottom] 触发上拉加载')
			this.loadMore()
		},
		
		methods: {
			...mapMutations('m_user', ['updateUserBase', 'updatepreference']),
			
			// ✅ 新增：加载轮播图数据
						async loadBannerList() {
							try {
								const { data: res } = await uni.$http.get('/board/recentlist')
								
								if (res.meta.status === 200 && res.message && res.message.length > 0) {
									// 将后端数据转换为轮播图格式
									this.bannerList = res.message.map(board => ({
										id: board.id,
										title: board.description || '小黑板作品',
										image: board.image_url,
										url: '/subpkg/board/board',
										type: 'page',
										boardId: board.id // 保存小黑板ID，方便后续可能的详情跳转
									}))
									
									console.log('✅ 轮播图加载成功:', this.bannerList.length, '张')
								} else {
									console.warn('⚠️ 未获取到轮播图数据，使用默认图片')
									this.setDefaultBanner()
								}
							} catch (error) {
								console.error('❌ 轮播图加载失败:', error)
								this.setDefaultBanner()
							}
						},
						
						// ✅ 新增：设置默认轮播图（兜底方案）
						setDefaultBanner() {
							this.bannerList = [
								{
									id: 1,
									title: '华东师范大学官网',
									image: 'https://img.xinshi00.com/%E5%B0%8F%E9%BB%91%E6%9D%BF/1.jpg',
									url: '/subpkg/board/board',
									type: 'page'
								}
							]
						},
						
			 // 🔥 新增：更新帖子点赞状态的方法
			  updatePostLikeStatus(data) {
			    const { postId, isLiked, likeCount } = data
			    
			    console.log('📥 收到点赞状态更新:', data)
			    
			    // 在 postList 中查找对应的帖子
			    const index = this.postList.findIndex(post => post.id === postId)
			    console.log("imhere");
				console.log(index)
			    if (index !== -1) {
			      // 更新帖子的点赞状态
			      this.postList[index].isLiked = isLiked
			      this.postList[index].likeCount = likeCount
			      
			      // 强制更新视图
			      this.$set(this.postList, index, { ...this.postList[index] })
			      
			      console.log(`✅ 已更新帖子 ${postId} 的点赞状态:`, {
			        isLiked,
			        likeCount
			      })
			    } else {
			      console.warn(`⚠️ 未找到帖子 ${postId}`)
			    }
			  },
			  
			// ✅ 切换排序模式（发现/最新）
			selectSortMode(mode) {
				if (this.sortMode === mode) return
				
				this.sortMode = mode
				
				// 切换到"最新"时，重置分类为"推荐"
				if (mode === 'latest') {
					this.categoryMode = 'recommend'
				}
				
				this.resetAndReload()
				console.log(`🔄 切换排序: ${mode}`)
			},
			
			// 🔥 新增：截断昵称的方法
			truncateNickname(name) {
						if (!name) return '';
						const maxLength = 7; // 限制 7 个字
						if (name.length > maxLength) {
							return name.substring(0, maxLength) + '...';
						}
						return name;
					},
			
			// ✅ 切换分类（推荐/日常/交友/吐槽）
			selectCategory(category) {
				if (this.categoryMode === category) return
				
				this.categoryMode = category
				this.resetAndReload()
				console.log(`📂 切换分类: ${category}`)
			},
			
			// ✅ 跳转到搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/post-search/post-search?'
				})
			},
			
			// ✅ 加载帖子列表
			async loadPostList() {
				if (!this.openid) {
					uni.switchTab({ url: '/pages/my/my' })
					return
				}
				
				try {
					if (this.isLoading) return
					
					this.isLoading = true
					const department = this.userBase?.major || ''
					
					let params = {
						page: this.page,
						pageSize: this.pageSize,
						openid: this.openid || '',
						department: department,
						filterMode: 'all',
						isTopicDiscussion: 'true'
					}
					
					// 根据不同模式设置参数
					if (this.sortMode === 'discover') {
						// 发现模式
						if (this.categoryMode === 'recommend') {
							// 推荐：使用用户偏好 + 排除列表
							params.preference = this.preference
							params.excludePostIds = this.excludePostIds.join(',')
						} else {
							// 其他分类：传递分类名称
							const categoryMap = {
								'daily': '日常',
								'friend': '交友',
								'complaint': '吐槽'
							}
							params.category = categoryMap[this.categoryMode]
						}
					} else if (this.sortMode === 'latest') {
						// 最新模式：按时间排序
						params.sortBy = 'created_at'
					}
					
					console.log(`📡 加载帖子 - 页码: ${this.page}, 排除: ${this.excludePostIds.length} 个`, params)
					
					const { data: res } = await uni.$http.get('/posts/list', params)
					
					if (res.meta.status === 200) {
						let newPosts = (res.message.list || []).map(post => ({
							...post,
							timeText: this.formatTime(post.created_at),
							images: this.processPostImages(post.images),
							viewCount: post.viewCount || 0,
							likeCount: post.likeCount || 0,
							commentCount: post.commentCount || 0,
							isLiked: post.isLiked || false,
							isTopicDiscussion: post.isTopicDiscussion || 0
						}))
						
						// 过滤掉非话题讨论帖子
						// newPosts = newPosts.filter(post => post.isTopicDiscussion === 1)
						
						// 📌 只在推荐模式下累积 excludePostIds
						if (this.sortMode === 'discover' && 
							this.categoryMode === 'recommend' && 
							res.message.fetchedPostIds && 
							res.message.fetchedPostIds.length > 0) {
							
							this.excludePostIds = [...this.excludePostIds, ...res.message.fetchedPostIds]
							console.log(`✅ 累积已获取ID: ${this.excludePostIds.length} 个`)
						}
						
						if (this.page === 1) {
							this.postList = newPosts
						} else {
							this.postList.push(...newPosts)
						}
						
						this.hasMore = res.message.hasMore === true
						console.log(`✅ 加载成功 - 新增: ${newPosts.length}, 总计: ${this.postList.length}`)
						
						if (this.page === 1 && newPosts.length === 0) {
							this.showMessageToast(this.getEmptyText())
						}
					}
				} catch (error) {
					console.error('❌ 加载失败:', error)
					this.showMessageToast('加载失败，请检查网络')
					this.hasMore = false
				} finally {
					this.isLoading = false
					this.isLoadingMore = false
				}
			},
			
			// ✅ 上拉加载更多
			async loadMore() {
				if (this.isReachingBottom || this.isLoading || !this.hasMore) {
					console.log('[loadMore] 条件检查失败，跳过')
					return
				}
				
				this.isReachingBottom = true
				
				try {
					this.page++
					await this.loadPostList()
				} catch (error) {
					console.error('[loadMore] 加载失败:', error)
					this.page--
					this.hasMore = false
				} finally {
					this.isReachingBottom = false
				}
			},
			
			// ✅ 下拉刷新
			async refreshPostList() {
				try {
					this.resetAndReload()
					await this.loadPostList()
					uni.stopPullDownRefresh()
					this.showMessageToast('刷新成功', 1500)
					console.log('🔄 下拉刷新完成')
				} catch (error) {
					console.error('[refreshPostList] 刷新失败:', error)
					uni.stopPullDownRefresh()
					this.showMessageToast('刷新失败')
				}
			},
			
			// ✅ 重置并重新加载
			resetAndReload() {
				this.page = 1
				this.postList = []
				this.excludePostIds = []
				this.hasMore = true
				this.loadPostList()
			},
			
			// ✅ 跳转到帖子详情
			gotoPostDetail(post) {
				this.updatepreference(post.properties || post.category)
				uni.navigateTo({
					url: `/subpkg/topic-detail/topic-detail?id=${post.id}`
				})
			},
			
			// ✅ 跳转到用户主页
			async gotoUserProfile(post) {
				if (!this.openid) {
					uni.switchTab({ url: '/pages/my/my' })
					return
				}
				
				if (!post) return
				
				// 如果是当前用户自己
				if (post.user_openid === this.openid) {
					uni.navigateTo({
						url: '/subpkg/profile/profile'
					})
					return
				}
				
				// 跳转到其他用户主页
				const payload = {
					openid: post.user_openid,
					nickname: post.nickname,
					avatarUrl: post.avatar
				}
				
				const encodedPayload = encodeURIComponent(JSON.stringify(payload))
				uni.navigateTo({
					url: `/subpkg/profile/profile?publisher=${encodedPayload}`
				})
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
							this.postList[index].likeCount = res.message.like_count || 0
							this.$set(this.postList, index, {...this.postList[index]})
						}
					}
				} catch (error) {
					console.error('点赞失败:', error)
					this.showMessageToast('操作失败')
				}
			},
			
			// ✅ 轮播图点击
			onBannerClick(banner) {
				switch (banner.type) {
					case 'page':
						uni.navigateTo({ url: banner.url })
						break
					case 'web':
						this.copyLinkAndNotify(banner.url, banner.title)
						break
					default:
						console.warn('未知的跳转类型:', banner.type)
				}
			},
			
			// 处理图片数据
			processPostImages(images) {
				if (!images) return []
				
				if (typeof images === 'string') {
					try {
						return JSON.parse(images)
					} catch (e) {
						return []
					}
				}
				
				return Array.isArray(images) ? images : []
			},
			
			// 复制链接并提示
			copyLinkAndNotify(url, title) {
				uni.setClipboardData({
					data: url,
					success: () => {
						uni.showToast({
							title: '链接已复制，请在浏览器中打开',
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			
			// 格式化时间
			formatTime(timestamp) {
				const date = new Date(timestamp)
				const now = new Date()
				const diff = now - date
				
				if (diff < 3600000) {
					return Math.floor(diff / 60000) + '分钟前'
				} else if (diff < 86400000) {
					return Math.floor(diff / 3600000) + '小时前'
				} else if (diff < 2592000000) {
					return Math.floor(diff / 86400000) + '天前'
				} else {
					return `${date.getMonth() + 1}-${date.getDate()}`
				}
			},
			
			// 显示提示消息
			showMessageToast(text, duration = 2000) {
				uni.showToast({
					title: text,
					icon: 'none',
					duration: duration
				})
			},
			
			// 获取空状态文本
			getEmptyText() {
				if (this.sortMode === 'latest') {
					return '暂无最新内容'
				}
				
				const categoryNames = {
					'recommend': '推荐',
					'daily': '日常',
					'friend': '交友',
					'complaint': '吐槽'
				}
				
				return `暂无${categoryNames[this.categoryMode]}内容`
			},
			// ✅ 监听页面滚动
				onPageScroll(e) {
					const scrollTop = e.scrollTop
					this.scrollTop = scrollTop
					
					// 将 rpx 转换为 px（假设屏幕宽度为 375px）
					const bannerHeightPx = uni.upx2px(this.bannerHeight)
					
					if (scrollTop >= bannerHeightPx) {
						// 滚动超过轮播图高度，固定导航栏
						if (!this.isNavFixed) {
							this.isNavFixed = true
							this.navTop = 0
						}
					} else {
						// 未超过轮播图高度，导航栏跟随滚动
						this.isNavFixed = false
						this.navTop = 0
					}
				},
		}
	}
</script>

<style lang="scss">
.index-page {
	min-height: 100vh;
	background-color: #f5f5f5;
}

// 轮播图区域
.banner-section {
	.banner-swiper {
		width: 100%;
		height: 400rpx;
		
		.banner-image {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
}

// 🔥 修改：公告栏外层按钮样式
.notice-bar-wrapper {
	width: 100%;
	background: transparent;
	border: none;
	padding: 0;
	margin: 0;
	line-height: 1;
	display: block;
	
	&::after {
		border: none;
	}
}

// 🔥 修改：公告栏样式
.notice-bar {
	display: flex;
	align-items: center;
	background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
	padding: 20rpx 24rpx;
	border-bottom: 1rpx solid #ffe4e4;
	position: relative;
	width: 100%;
	transition: all 0.2s ease;
	
	// 添加点击效果
	&:active {
		background: linear-gradient(135deg, #ffebeb 0%, #fff5f5 100%);
		transform: scale(0.99);
	}
	
	.notice-icon {
		font-size: 32rpx;
		margin-right: 12rpx;
		animation: shake 2s infinite;
		flex-shrink: 0;
	}
	
	.notice-content {
		flex: 1;
		overflow: hidden;
		
		.notice-text {
			font-size: 28rpx;
			color: #C00000;
			line-height: 1.5;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
	}
	
	// 🔥 修改：箭头样式（不再是独立按钮）
	.notice-arrow {
		font-size: 40rpx;
		color: #C00000;
		font-weight: bold;
		padding: 0 8rpx;
		flex-shrink: 0;
	}
}

// 保持原有的摇晃动画
@keyframes shake {
	0%, 100% {
		transform: rotate(0deg);
	}
	10%, 30% {
		transform: rotate(-10deg);
	}
	20%, 40% {
		transform: rotate(10deg);
	}
	50% {
		transform: rotate(0deg);
	}
}


// ✅ 一级导航栏（发现/最新）- 支持吸顶效果
.primary-nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #fff;
	padding: 0 24rpx;
	height: 88rpx;
	border-bottom: 1rpx solid #f0f0f0;
	transition: all 0.3s ease;
	position: relative;
	z-index: 100;
	
	// ✅ 固定状态
	&.is-fixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
	}
	
	.nav-left {
		display: flex;
		align-items: center;
		gap: 48rpx;
		
		.nav-tab {
			position: relative;
			padding: 16rpx 0;
			
			.nav-text {
				font-size: 32rpx;
				color: #666;
				font-weight: 500;
				transition: all 0.3s;
			}
			
			.nav-indicator {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 40rpx;
				height: 6rpx;
				background: linear-gradient(90deg, #C00000 0%, #C00000 100%);
				border-radius: 3rpx;
				animation: slideIn 0.3s ease;
			}
			
			&.active .nav-text {
				color: #333;
				font-weight: 550;
			}
		}
	}
	
	.nav-right {
		.search-icon {
			font-size: 40rpx;
			padding: 8rpx;
		}
	}
}

// ✅ 二级分类导航栏
.category-nav {
	background-color: #fff;
	border-bottom: 1rpx solid #f0f0f0;
	
	.category-scroll {
		width: 100%;
		white-space: nowrap;
		
		.category-list {
			display: inline-flex;
			padding: 0 24rpx;
			gap: 32rpx;
			
			.category-item {
				position: relative;
				padding: 20rpx 8rpx;
				
				.category-text {
					font-size: 28rpx;
					color: #666;
					transition: all 0.3s;
				}
				
				&.active {
					.category-text {
						color: #000;
						font-weight: 550;
					}
	
				}
			}
		}
	}
}

// ✅ 内容区域
.content-section {
	padding: 16rpx;
	
	// 加载状态
	.loading-container {
		padding: 80rpx 0;
		text-align: center;
		
		.loading-text {
			font-size: 28rpx;
			color: #999;
		}
	}
	
	// 瀑布流容器
	.waterfall-container {
		display: flex;
		gap: 12rpx;
		align-items: flex-start;
		
		.waterfall-column {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 12rpx;
			
			.waterfall-item {
				width: 100%;
				
				.waterfall-card {
					background: #fff;
					border-radius: 12rpx;
					overflow: hidden;
					box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
					transition: all 0.3s ease;
					
					&:active {
						transform: translateY(-4rpx);
						box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
					}
					
					.card-image-wrapper {
						width: 100%;
						
						.card-image {
							width: 100%;
							display: block;
						}
					}
					
					.card-content {
						padding: 12rpx 14rpx 6rpx;
						
						.content-text {
							font-size: 30rpx;
							color: #333;
							font-weight: 500;
							line-height: 1.5;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
							overflow: hidden;
						}
					}
					
					.card-header {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 8rpx 14rpx 10rpx;
						
						.user-info {
							display: flex;
							align-items: center;
							gap: 10rpx;
							flex: 1;
							min-width: 0;
							
							.card-avatar {
								width: 48rpx;
								height: 48rpx;
								border-radius: 50%;
								flex-shrink: 0;
							}
							
							.card-nickname {
								font-size: 24rpx;
								color: #666;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
						
						.like-action {
							display: flex;
							align-items: center;
							gap: 6rpx;
							padding: 8rpx 12rpx;
							border-radius: 20rpx;
							flex-shrink: 0;
							transition: all 0.2s;
							
							&:active {
								background: #f5f5f5;
								transform: scale(0.95);
							}
							
							.like-icon {
								font-size: 28rpx;
							}
							.like-icon-img {
								width: 32rpx;
								height: 32rpx;
							}
							
							.action-count {
								font-size: 24rpx;
								color: #666;
								font-weight: 500;
							}
						}
					}
				}
			}
		}
	}
	
	// 空状态
	.empty-state {
		padding: 120rpx 0;
		text-align: center;
		
		.empty-icon {
			font-size: 80rpx;
			display: block;
			margin-bottom: 20rpx;
		}
		
		.empty-text {
			font-size: 28rpx;
			color: #999;
		}
	}
}

// 底部间距
.bottom-spacing {
	height: 100rpx;
}

// 动画
@keyframes slideIn {
	from {
		width: 0;
		opacity: 0;
	}
	to {
		width: 40rpx;
		opacity: 1;
	}
}
</style>
