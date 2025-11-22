<template>
	 <view class="index-page-wrapper">
	        <view 
	              class="index-page" 
	              @touchstart="onTouchStart"
	              @touchmove="onTouchMove"
	              @touchend="onTouchEnd"
	            >
	            
		
			<!-- 🔥 修改：公告栏 - 整个区域都可点击 -->
			<button class="notice-bar-wrapper" @click="gotoFeedback">
				<view class="notice-bar">
					<view class="notice-icon">📢</view>
					<view class="notice-content">
						<text class="notice-text">请点击此处向我们反馈问题</text>
					</view>
					<view class="notice-arrow">›</view>
				</view>
			</button>
			
			<view class="primary-nav" :class="{ 'is-fixed': isNavFixed }" :style="{ top: navTop + 'px' }">
			  <view class="nav-left">
			    <view class="menu-btn" @click="openSideMenu">
			      <image 
			        class="menu-icon-img" 
			        src="https://wait00.oss-cn-shanghai.aliyuncs.com/label/shaixuan.png" 
			        mode="aspectFit"
			      ></image>
			    </view>
			  </view>
			  
			  
			
			  <view class="nav-center">
			    <view class="nav-tab" :class="{ active: sortMode === 'discover' }" @click="selectSortMode('discover')">
			      <text class="nav-text">发现</text>
			      <view class="nav-indicator" v-if="sortMode === 'discover'"></view>
			    </view>
			
			    <view class="sort-divider">|</view>
			
			    <view class="nav-tab" :class="{ active: sortMode === 'follow' }" @click="selectSortMode('follow')">
			      <text class="nav-text">关注</text>
			      <view class="nav-indicator" v-if="sortMode === 'follow'"></view>
			    </view>
			
			    <view class="sort-divider">|</view>
			
			    <view class="nav-tab" :class="{ active: sortMode === 'latest' }" @click="selectSortMode('latest')">
			      <text class="nav-text">最新</text>
			      <view class="nav-indicator" v-if="sortMode === 'latest'"></view>
			    </view>
			  </view>
			<view class="nav-right">
			  <view class="search-btn" @click="gotoSearch">
			    <image 
			      class="search-icon-img" 
			      src="https://wait00.oss-cn-shanghai.aliyuncs.com/label/searchupdate.png" 
			      mode="aspectFit"
			    ></image>
			  </view>
			</view>
			  
			</view>
			
			<view class="side-menu-overlay" :class="{ 'show': showSideMenu }" @click="closeSideMenu"></view>
			
			<view class="side-menu-drawer" :class="{ 'show': showSideMenu }" @click.stop>
			  <scroll-view class="menu-scroll-area" scroll-y>
			    <view class="drawer-spacer"></view> <view class="group-card" v-for="(group, gIndex) in menuGroups" :key="group.id">
			      <view class="menu-row" v-for="(item, iIndex) in group.items" :key="iIndex" @click="handleMenuClick(item)">
			        <view class="icon-wrapper">
			          <image class="menu-icon-img" :src="item.icon" mode="aspectFit"></image>
			        </view>
			        <text class="menu-text">{{ item.name }}</text>
			        <view class="menu-right">
			          <text v-if="item.count" class="info-count">{{ item.count }}</text>
			          <view v-if="item.badge" class="red-dot"></view>
			        </view>
			      </view>
			    </view>
			    <view class="bottom-spacer"></view>
			  </scroll-view>
			
			  <view class="drawer-bottom">
			    <view class="bottom-item" v-for="(action, index) in bottomActions" :key="index" @click="handleBottomAction(action)">
			      <view class="bottom-icon-wrapper">
			        <button class="icon-btn-reset" open-type="contact" v-if="action.action === 'help'">
			          <image class="bottom-icon-img" :src="action.icon" mode="aspectFit"></image>
			        </button>
			        <image class="bottom-icon-img" :src="action.icon" mode="aspectFit" v-if="action.action !== 'help'"></image>
			      </view>
			      <text class="bottom-text">{{ action.name }}</text>
			    </view>
			  </view>
			</view>
			
			<!-- ✅ 二级分类导航栏（仅在"发现"模式下显示） -->
			<view class="category-nav" v-if="sortMode === 'discover'">
			    <view class="category-bar-inner">
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
			            <text class="category-text">询问</text>
			        </view>
			        
			        <view 
			            class="category-item"
			            :class="{ active: categoryMode === 'complaint' }"
			            @click="selectCategory('complaint')"
			        >
			            <text class="category-text">吐槽</text>
			        </view>
			    </view>
			</view>
			<!-- 🔥 自定义下拉刷新组件 - 动态调整 z-index -->
			  <!-- 🔥 自定义下拉刷新组件 - 使用 fixed 定位 -->
			<view 
			  class="custom-refresh-wrapper"
			  :class="{ 
			    'is-refreshing': isRefreshing,
			    'show': pullDistance > 0 
			  }"
			  :style="{ 
			    height: pullDistance + 'px',
			    opacity: pullDistance > 0 ? Math.min(pullDistance / 60, 1) : 0
			  }"
			>
			<view class="refresh-content">
			<image 
			  class="refresh-icon" 
			  :class="{ 'rotating': isRefreshing }"
			  src="https://img.xinshi00.com/emoji/emoji-small/5mojing.png"  
			  mode="aspectFit"
			></image>
			<text class="refresh-text">{{ refreshText }}</text>
			</view>
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
					<!-- 左列 - 修复后 -->
					<view class="waterfall-column">
					    <view 
					        class="waterfall-item" 
					        v-for="post in leftColumnPosts" 
					        :key="post.id"
					    >
					        <view class="waterfall-card">
					            <!-- 🔥 修复：图片加载优化 -->
					            <view 
					                class="card-image-wrapper" 
					                v-if="post.images && post.images.length > 0" 
					                @click="gotoPostDetail(post)"
					            >
					                <view class="image-placeholder" :class="{ 'image-loaded': post.imageLoaded }">
					                    <view class="skeleton-box" v-if="!post.imageLoaded"></view>
					                    <image 
					                        class="card-image"
					                        :src="post.images[0]" 
					                        mode="widthFix"
					                        :lazy-load="true"
					                        :webp="true"
					                        :show-menu-by-longpress="false"
					                        @load="onImageLoad(post)"
					                        @error="onImageError(post)"
					                    ></image>
					                </view>
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
					                        :src="post.avatar"
					                        mode="aspectFill"
					                        :lazy-load="true"
					                        :webp="true"
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
					            <view 
					                class="card-image-wrapper" 
					                v-if="post.images && post.images.length > 0" 
					                @click="gotoPostDetail(post)"
					            >
					                <view class="image-placeholder" :class="{ 'image-loaded': post.imageLoaded }">
					                    <view class="skeleton-box" v-if="!post.imageLoaded"></view>
					                   <!-- 右列 - 补充优化 -->
					                   <image 
					                       class="card-image"
					                       :src="post.images[0]" 
					                       mode="widthFix"
					                       :lazy-load="true"
					                       :webp="true"
					                       :show-menu-by-longpress="false"
					                       @load="onImageLoad(post)"
					                       @error="onImageError(post)"
					                   ></image>
					                </view>
					            </view>
					            
					            <view class="card-content" @click="gotoPostDetail(post)">
					                <text class="content-text">{{ post.content }}</text>
					            </view>
					            
					            <view class="card-header">
					                <view class="user-info" @click="gotoUserProfile(post)">
					                   <!-- 头像也加上懒加载 -->
					                   <image 
					                       class="card-avatar" 
					                       :src="post.avatar"
					                       mode="aspectFill"
					                       :lazy-load="true"
					                       :webp="true"
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
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex';
	
	export default {
		data() {
			return {
				// 轮播图数据
				bannerList: [],
				
				// ✅ 导航和分类
				sortMode: 'discover', // discover(发现) / follow(关注) / latest(最新)
				categoryMode: 'recommend', // recommend(推荐) / daily(日常) / friend(交友) / complaint(吐槽)
				
				// ✅ 帖子列表
				postList: [],
				page: 1,
				pageSize: 6,
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
				navOffsetTop: 0,        // 🆕 导航栏初始位置（距离页面顶部的距离）
				iconLikeUrl: 'https://img.xinshi00.com/label/like.png',
				iconLikedUrl: 'https://img.xinshi00.com/label/liked.png',
				// 🔥 新增：自定义下拉刷新相关
				        isPulling: false,        // 是否正在下拉
				        isRefreshing: false,     // 是否正在刷新
				        pullDistance: 0,         // 下拉距离
				        startY: 0,               // 触摸起始位置
				        refreshThreshold: 80,    // 触发刷新的阈值（px）
						
				        maxPullDistance: 120,     // 最大下拉距离（px）
						 lastTouchTime: 0,        // 🆕 新增：上次触摸时间
						      touchThrottle: 16,       // 🆕 新增：节流间隔（约60fps）
				showSideMenu: false, // 控制侧边栏显示
				// 菜单数据
				menuGroups: [{
				    id: 'content',
				    items: [{
				        name: '我的作品',
				        icon: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/photo.png',
				        route: '/subpkg/my-posts/my-posts'
				      },
				      {
				        name: '我的点赞',
				        icon: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/like.png',
				        route: '/subpkg/like/like'
				      },
				      {
				        name: '我的评论',
				        icon: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/jianpan.png',
				        route: '/subpkg/my-post-comments/my-post-comments'
				      },
				      {
				        name: '我的消息',
				        icon: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/chat.png',
				        route: '/pages/message/message'
				      },
				      {
				        name: '我的删除',
				        icon: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/shanchu.png',
				        route: '/subpkg/my-deleted-posts/my-deleted-posts'
				      }
				    ]
				  },
				  {
				    id: 'system',
				    items: [{
				        name: '小黑板',
				        icon: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/school.png',
				        route: '/subpkg/board/board'
				      },
				      {
				        name: '社区公约',
				        icon: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/department.png',
				        route: '/subpkg/rules/rules'
				      }
				    ]
				  }
				],
				bottomActions: [{
				    name: '帮助与客服',
				    icon: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/bottom-kefu.png',
				    action: 'help'
				  },
				  {
				    name: '设置',
				    icon: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/bottom-shezhi.png',
				    route: '/subpkg/edit/edit'
				  }
				],
				_loadingStates: [],
				pendingLoadMore: false,
				    pendingTimer: null,
				
			}
		},
		
		computed: {
			...mapState('m_user', ['openid', 'userBase', 'preference']),
			...mapState('m_posts', ['newPublishedPost']),
			...mapGetters('m_posts', ['shouldShowNewPost']),
			
			 // 🔥 新增：刷新提示文本
			    refreshText() {
			        if (this.isRefreshing) {
			            return '正在刷新...'
			        } else if (this.pullDistance >= this.refreshThreshold) {
			            return '松开刷新'
			        } else if (this.isPulling) {
			            return '下拉刷新'
			        }
			        return ''
			    },
				
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
			// const systemInfo = uni.getSystemInfoSync()
			// this.bannerHeight = 300 // rpx
			
			// ✅ 加载轮播图数据
			// await this.loadBannerList()
						
			await this.loadPostList()
			
			if (this.openid) {
				const { data: res } = await uni.$http.get('/users/userinfo', { code: this.openid })
				if (res.meta.status === 200) {
					this.updateUserBase(res.message)
				}
			}
		},
		
		onShow() {
			console.log('📄 home 页面 onShow 触发');
			    
			    // 检查是否有新发布的帖子
			    if (this.shouldShowNewPost('home')) {
			      console.log('📥 收到新发布的帖子:', this.newPublishedPost);
			      
			      // 插入到列表
			      this.insertNewPost(this.newPublishedPost);
			      
			      // 清空 Vuex 状态（防止重复显示）
			      this.clearNewPost();
			    }
		},
		
		// onPullDownRefresh() {
		// 	this.refreshPostList()
		// },
		
		 onReachBottom() {
		    const now = Date.now()
		
		    if (this.isLoading || this.isLoadingMore || this.isReachingBottom) {
		      this.pendingLoadMore = true
		      console.log('[onReachBottom] loading 中，排队一次')
		      return
		    }
		
		    if (now - this.lastReachTime < 400) { // 节流窗口缩短，也可以保持 800
		      this.pendingLoadMore = true
		      if (!this.pendingTimer) {
		        this.pendingTimer = setTimeout(() => {
		          this.pendingTimer = null
		          this.flushPendingLoadMore()
		        }, 400 - (now - this.lastReachTime))
		      }
		      console.log('[onReachBottom] 节流命中，排队一次')
		      return
		    }
		
		    this.lastReachTime = now
		    this.loadMore()
		  },
		
		methods: {
			...mapMutations('m_user', ['updateUserBase', 'updatepreference']),
			 ...mapMutations('m_posts', ['clearNewPost']),
			 
			  flushPendingLoadMore() {
			     if (!this.pendingLoadMore) return
			     if (!this.hasMore) {
			       this.pendingLoadMore = false
			       return
			     }
			     if (this.isLoading || this.isLoadingMore || this.isReachingBottom) return
			 
			     this.pendingLoadMore = false
			     this.loadMore()
			   },
			   
			 // 🔥 新增：触摸开始
			    onTouchStart(e) {
			          // 只在页面顶部且未刷新时允许下拉
			          if (this.isRefreshing || this.scrollTop > 5) return
			          
			          this.startY = e.touches[0].pageY
			          this.isPulling = false // 初始状态
			          console.log('👆 触摸开始:', this.startY)
			        },
			     
			     // 🔥 修复：触摸移动（添加节流）
			        onTouchMove(e) {
			          if (this.isRefreshing || this.scrollTop > 5) return
			          
			          const currentY = e.touches[0].pageY
			          const distance = currentY - this.startY
			          
			          // 只处理向下拉的情况
			          if (distance <= 0) return
			          
			          // 🆕 节流处理
			          const now = Date.now()
			          if (now - this.lastTouchTime < this.touchThrottle) {
			            return
			          }
			          this.lastTouchTime = now
			          
			          // 开始下拉
			          if (!this.isPulling) {
			            this.isPulling = true
			            console.log('📍 开始下拉')
			          }
			          
			          // 阻尼效果
			          const damping = distance < 150 ? 0.6 : 0.6
			          this.pullDistance = Math.min(distance * damping, this.maxPullDistance)
			          
			          console.log('📏 下拉距离:', this.pullDistance) // 🆕 添加日志
			        },
			     openSideMenu() {
			      if (!this.openid) {
			      		  // 弹出登录提示框
			      		  uni.showModal({
			      		    title: '提示',
			      		    content: '需要登录才能体验更多内容哦',
			      		    cancelText: '取消',
			      		    confirmText: '登录',
			      		    success: (res) => {
			      		      if (res.confirm) {
			      		        // 用户点击了"登录"按钮
			      		        uni.switchTab({
			      		          url: '/pages/my/my'
			      		        })
			      		      }
			      		      // 用户点击了"取消"按钮，不做任何操作
			      		    }
			      		  })
			      		  return
			      		}
			       this.showSideMenu = true;
			     },
			     
			     closeSideMenu() {
			       this.showSideMenu = false;
			     },
			     
			     handleMenuClick(item) {
			       this.closeSideMenu();
			       setTimeout(() => {
			         uni.navigateTo({
			           url: item.route,
			           fail: () => {
			             uni.showToast({ title: '页面开发中', icon: 'none' });
			           }
			         });
			       }, 300);
			     },
			     
			     handleBottomAction(action) {
			       this.closeSideMenu();
			       if (action.route) {
			         uni.navigateTo({ url: action.route });
			       } 
			       // 客服逻辑由 <button open-type="contact"> 自动处理，此处无需代码
			     },
			    // 🔥 修改：触摸结束 - 添加缓冲回弹动画
			    async onTouchEnd() {
			      if (!this.isPulling || this.isRefreshing) {
			        this.isPulling = false
			        this.pullDistance = 0
			        return
			      }
			      
			      console.log('👇 触摸结束，下拉距离:', this.pullDistance)
			      
			      this.isPulling = false
			      
			      // 判断是否达到刷新阈值
			      if (this.pullDistance >= this.refreshThreshold) {
			        console.log('✅ 触发刷新')
			        this.isRefreshing = true
			        
			        // 🔥 关键：先回弹到阈值位置（带动画）
			        this.pullDistance = this.refreshThreshold
			        
			        try {
			          // 执行刷新操作
			          await this.refreshPostList()
			        } catch (error) {
			          console.error('❌ 刷新失败:', error)
			        } finally {
			          // 🔥 修改：延长回弹时间，让用户看到刷新完成
			          setTimeout(() => {
			            this.isRefreshing = false
			            // 🔥 添加渐进式回弹动画
			            this.pullDistance = 0
			          }, 800) // 延长至 800ms
			        }
			      } else {
			        // 🔥 修改：未达到阈值时也添加缓冲回弹
			        console.log('⚠️ 未达到阈值，缓冲回弹')
			        
			        // 延迟 100ms 再开始回弹，让用户感受到松手
			        setTimeout(() => {
			          this.pullDistance = 0
			        }, 100)
			      }
			    },

			// 🔥 新增：插入新帖子到列表顶部
			   // 🔥 修改：插入新帖子到列表顶部
			   insertNewPost(post) {
			     if (!post) return;
			     
			     // 检查是否已存在（避免重复插入）
			     const exists = this.postList.some(p => p.post_id === post.post_id);
			     if (exists) {
			       console.log('⚠️ 帖子已存在，跳过插入');
			       return;
			     }
			     
			     // 🔥 关键修改：完整初始化帖子对象（与 loadPostList 保持一致）
			     const formattedPost = {
			       ...post,
			       id: post.post_id || post.id, // 确保有 id 字段
			       timeText: this.formatTime(post.created_at || new Date().toISOString()),
			       images: this.processPostImages(post.images),
			       viewCount: post.viewCount || post.view_count || 0,
			       likeCount: post.likeCount || post.like_count || post.likes_count || 0,
			       commentCount: post.commentCount || post.comment_count || post.comments_count || 0,
			       isLiked: post.isLiked || post.is_liked || false,
			       isTopicDiscussion: post.isTopicDiscussion || 0,
			       // 🔥 核心：初始化图片加载状态
			       imageLoaded: false,
			       imageError: false
			     };
			     
			     // 插入到列表顶部
			     this.postList.unshift(formattedPost);
			     console.log('✅ 新帖子已插入列表顶部:', formattedPost.id);
			     
			     // 显示提示
			     uni.showToast({
			       title: '帖子已发布',
			       icon: 'success',
			       duration: 2000
			     });
			   },

			  
			// 🔥 新增：图片加载成功回调
			    onImageLoad(post) {
			      this.$set(post, 'imageLoaded', true)
			      console.log(`✅ 图片加载成功: ${post.id}`)
			    },
			    
			    // 🔥 新增：图片加载失败回调
			    onImageError(post) {
			      this.$set(post, 'imageError', true)
			      console.error(`❌ 图片加载失败: ${post.id}`)
			      
			      // 设置默认图片
			      const index = this.postList.findIndex(p => p.id === post.id)
			      if (index !== -1) {
			        this.postList[index].images = ['https://img.xinshi00.com/label/default-post.png']
			      }
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
			  
			// ✅ 修改：切换排序模式（发现/关注/最新）
		selectSortMode(mode) {
		    if (this.sortMode === mode) {
		        uni.pageScrollTo({ scrollTop: 0, duration: 300 })
		        return
		    }
			
			if (mode === 'follow' && !this.openid) {
					  // 弹出登录提示框
					  uni.showModal({
					    title: '提示',
					    content: '需要登录才能体验更多内容哦',
					    cancelText: '取消',
					    confirmText: '登录',
					    success: (res) => {
					      if (res.confirm) {
					        // 用户点击了"登录"按钮
					        uni.switchTab({
					          url: '/pages/my/my'
					        })
					      }
					      // 用户点击了"取消"按钮，不做任何操作
					    }
					  })
					  return
					}
		    
		    console.log(`🔄 切换排序模式: ${this.sortMode} → ${mode}`)
		    
		    uni.pageScrollTo({ scrollTop: 0, duration: 300 })
		    
		    this.sortMode = mode
		    
		    if (mode === 'latest' || mode === 'follow') {
		        this.categoryMode = 'recommend'
		    }
		    
		    // 🔥 切换模式时重置所有状态
		    this.page = 1
		    this.postList = []
		    this.excludePostIds = []
		    this.hasMore = true
		    this._lastLoadCount = undefined
		    
		    this.loadPostList()
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
			
			// ✅ 修改：切换分类（推荐/日常/交友/吐槽）
			// ✅ 修改 selectCategory() 方法
selectCategory(category) {
    if (this.categoryMode === category) {
        uni.pageScrollTo({ scrollTop: 0, duration: 300 })
        return
    }
    
    console.log(`📂 切换分类: ${this.categoryMode} → ${category}`)
    
    this.categoryMode = category
    
    // 🔥 切换分类时重置所有状态
    this.page = 1
    this.postList = []
    this.excludePostIds = []
    this.hasMore = true
    this._lastLoadCount = undefined // 重置计数
    
    this.loadPostList()
},




			
			// ✅ 跳转到搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/post-search/post-search?'
				})
			},
			
			gotoFeedback() {
				uni.navigateTo({
					url: '/subpkg/feedback/feedback'
				})
			},

			async loadPostList() {
			    try {
			        // 🔥 关键修改:使用更严格的检查
			        if (this.isLoading) {
			            console.log('[loadPostList] 已有请求在进行，跳过')
			            return
			        }
			        
			        this.isLoading = true
			        const department = this.userBase?.major || ''
			        
			        let params = {
			            page: this.page,
			            pageSize: this.pageSize,
			            openid: this.openid || '',
			            department: department,
			            filterMode: 'all',
			            isTopicDiscussion: 'true',
			            excludePostIds: this.excludePostIds.join(',')
			        }
			        
			        // 根据不同模式设置参数
			        if (this.sortMode === 'discover') {
			            if (this.categoryMode === 'recommend') {
			                params.preference = this.preference
			            } else {
			                const categoryMap = {
			                    'daily': '日常',
			                    'friend': '询问',
			                    'complaint': '吐槽'
			                }
			                params.category = categoryMap[this.categoryMode]
			            }
			        } else if (this.sortMode === 'latest') {
			            params.sortBy = 'created_at'
			        } else if (this.sortMode === 'follow') {
			            return await this.loadFollowPosts()
			        }
			        
			        console.log(`📡 加载帖子 - 页码: ${this.page}, 排除: ${this.excludePostIds.length} 个, 模式: ${this.sortMode}`)
			        
			        // 🔥 新增:添加请求超时处理
			        const requestPromise = uni.$http.get('/posts/list', params)
			        const timeoutPromise = new Promise((_, reject) => 
			            setTimeout(() => reject(new Error('请求超时')), 10000)
			        )
			        
			        const { data: res } = await Promise.race([requestPromise, timeoutPromise])
			        
			        if (res.meta.status === 200) {
			            let newPosts = (res.message.list || []).map(post => ({
			                ...post,
			                id: post.post_id || post.id,
			                timeText: this.formatTime(post.created_at),
			                images: this.processPostImages(post.images),
			                viewCount: post.viewCount || 0,
			                likeCount: post.likeCount || 0,
			                commentCount: post.commentCount || 0,
			                isLiked: post.isLiked || false,
			                isTopicDiscussion: post.isTopicDiscussion || 0,
			                imageLoaded: false,
			                imageError: false
			            }))
			            
			            const actualNewPostsCount = newPosts.length
			            console.log(`📊 后端返回: ${actualNewPostsCount} 个帖子`)
			            
			            // 🔥 累积本次获取到的所有帖子ID
			            if (newPosts.length > 0) {
			                const newPostIds = newPosts.map(post => post.id)
			                this.excludePostIds = [...this.excludePostIds, ...newPostIds]
			                console.log(`✅ 累积帖子ID: 新增 ${newPostIds.length} 个，总计 ${this.excludePostIds.length} 个`)
			            }
			            
			            // 🔥 关键修改:更新列表前添加延迟,避免渲染阻塞
			            if (this.page === 1) {
			                this.postList = newPosts
			            } else {
			                // 🔥 分批添加,避免一次性渲染过多
			                for (let i = 0; i < newPosts.length; i += 2) {
			                    this.postList.push(...newPosts.slice(i, i + 2))
			                    if (i + 2 < newPosts.length) {
			                        await new Promise(resolve => setTimeout(resolve, 16)) // 等待一帧
			                    }
			                }
			            }
			            
			            // hasMore判断逻辑
			            if (this.sortMode === 'discover') {
			                this.hasMore = true
			                this._lastLoadCount = actualNewPostsCount
			                console.log(`✅ 发现模式 - 本次返回: ${actualNewPostsCount}，总计: ${this.postList.length}`)
			            } else {
			                this.hasMore = res.message.hasMore === true
			                console.log(`✅ ${this.sortMode}模式 - 加载成功: ${newPosts.length}，hasMore: ${this.hasMore}`)
			            }
			        } else {
			            console.error('❌ 请求失败:', res.meta.msg)
			            this.hasMore = false
			        }
			    } catch (error) {
			        console.error('❌ 加载异常:', error)
			        this.showMessageToast(error.message === '请求超时' ? '网络超时，请重试' : '加载失败，请检查网络')
			        this.hasMore = false
			    } finally {
			        this.isLoading = false
			            this.isLoadingMore = false
			            this.isReachingBottom = false
			            if (this.pendingTimer && !this.pendingLoadMore) {
			              clearTimeout(this.pendingTimer)
			              this.pendingTimer = null
			            }
			            this.$nextTick(() => this.flushPendingLoadMore())
			    }
			},





			
			// 🆕 新增：加载关注用户的帖子
			async loadFollowPosts() {
			    try {
			        // 检查是否有关注列表
			        const followingIds = this.userBase?.following_ids || []
			        
			        if (!Array.isArray(followingIds) || followingIds.length === 0) {
			            console.log('⚠️ 没有关注任何用户')
			            this.postList = []
			            this.hasMore = false
			            this.isLoading = false
			            this.isLoadingMore = false
			            return
			        }
			        
			        const params = {
			            page: this.page,
			            pageSize: this.pageSize,
			            openid: this.openid,
			            following_ids: followingIds.join(',')
			        }
			        
			        console.log(`📡 加载关注帖子 - 页码: ${this.page}, 关注用户数: ${followingIds.length}`)
			        
			        const { data: res } = await uni.$http.get('/posts/followlist', params)
			        
			        if (res.meta.status === 200) {
			            let newPosts = (res.message.list || []).map(post => ({
			                ...post,
			                timeText: this.formatTime(post.created_at),
			                images: this.processPostImages(post.images),
			                viewCount: post.view_count || 0,
			                likeCount: post.like_count || 0,
			                commentCount: post.comment_count || 0,
			                isLiked: post.is_liked || false
			            }))
			            
			            if (this.page === 1) {
			                this.postList = newPosts
			            } else {
			                this.postList.push(...newPosts)
			            }
			            
			            this.hasMore = newPosts.length >= this.pageSize
			            console.log(`✅ 关注帖子加载成功 - 新增: ${newPosts.length}, 总计: ${this.postList.length}`)
			        } else {
			            console.error('❌ 加载失败:', res.meta.msg)
			            this.showMessageToast(res.meta.msg || '加载失败')
			        }
			    } catch (error) {
			        console.error('❌ 请求异常:', error)
			        this.showMessageToast('网络错误')
			        this.hasMore = false
			    } finally {
			        this.isLoading = false
			        this.isLoadingMore = false
			    }
			},
			
			// ✅ 修改：上拉加载更多
			// ✅ 修改：上拉加载更多
		async loadMore() {
		    // 🔥 关键修改:加强状态检查
		    if (this.isReachingBottom || this.isLoading || this.isLoadingMore) {
		        console.log('[loadMore] 正在加载中，跳过')
		        return
		    }
		    
		    // 🔥 非"发现"模式且无更多内容时，直接返回
		    if (this.sortMode !== 'discover' && !this.hasMore) {
		        console.log('[loadMore] 已无更多内容')
		        return
		    }
		    
		    // 🔥 关键修改:同时设置两个loading标志
		    this.isReachingBottom = true
		    this.isLoadingMore = true
		    
		    // 🔥 新增:记录当前页码,失败时回滚
		    const currentPage = this.page
		    
		    try {
		        this.page++
		        console.log(`[loadMore] 开始加载第 ${this.page} 页`)
		        
		        await this.loadPostList()
		        
		        console.log(`[loadMore] 第 ${this.page} 页加载完成`)
		        
		        // 🔥 关键修改:只在"发现"模式下判断是否需要循环
		        if (this.sortMode === 'discover') {
		            // 判断依据:后端返回 0 个帖子
		            if (this._lastLoadCount === 0) {
		                const categoryNames = {
		                    'recommend': '推荐',
		                    'daily': '日常',
		                    'friend': '询问',
		                    'complaint': '吐槽'
		                }
		                
		                console.log(`🔄 ${categoryNames[this.categoryMode]} 已加载全部内容，准备循环`)
		                
		                uni.showToast({
		                    title: '已加载全部内容，重新开始',
		                    icon: 'none',
		                    duration: 1500
		                })
		                
		                // 🔥 短暂延迟后重置并重新加载
		                setTimeout(() => {
		                    console.log('🔄 重置排除列表，开始新一轮加载')
		                    this.excludePostIds = []
		                    this.page = 1
		                    this.hasMore = true
		                    this._lastLoadCount = undefined
		                    
		                    // 🔥 新增:重置loading状态后再加载
		                    this.isReachingBottom = false
		                    this.isLoadingMore = false
		                    this.loadPostList()
		                }, 500)
		                
		                return // 🔥 提前返回,避免重复重置loading
		            }
		        }
		    } catch (error) {
		        console.error('[loadMore] 加载失败:', error)
		        
		        // 🔥 关键修改:失败时回滚页码
		        this.page = currentPage
		        
		        uni.showToast({
		            title: '加载失败，请重试',
		            icon: 'none',
		            duration: 2000
		        })
		    } finally {
		        // 🔥 关键修改:确保loading状态被重置
		        this.isReachingBottom = false
		        this.isLoadingMore = false
				this.$nextTick(() => this.flushPendingLoadMore())
		        
		        console.log('[loadMore] loading状态已重置')
		    }
		},




			
async refreshPostList() {
    try {
        console.log('🔄 下拉刷新')
        
        // 🔥 关键修改：发现模式下保留 excludePostIds
        if (this.sortMode === 'discover') {
            console.log(`✅ 发现模式刷新 - 保留已排除的 ${this.excludePostIds.length} 个帖子`)
        } else {
            // 最新/关注模式：清空排除列表
            this.excludePostIds = []
            console.log('✅ 非发现模式刷新 - 清空排除列表')
        }
        
        // 重置页码和列表
        this.page = 1
        this.postList = []
        this.hasMore = true
        this._lastLoadCount = undefined
        
        await this.loadPostList()
        
        // 🔥 新增：如果发现模式下刷新后列表为空，清空排除列表并重新加载
        if (this.sortMode === 'discover' && this.postList.length === 0 && this.excludePostIds.length > 0) {
            console.log('⚠️ 刷新后无新内容，清空排除列表并重新加载')
            
            uni.showToast({
                title: '已加载全部内容，重新开始',
                icon: 'none',
                duration: 1500
            })
            
            // 延迟后清空并重新加载
            setTimeout(async () => {
                this.excludePostIds = []
                this.page = 1
                this.hasMore = true
                this._lastLoadCount = undefined
                await this.loadPostList()
                uni.stopPullDownRefresh()
            }, 500)
            
            return // 提前返回，避免重复调用 stopPullDownRefresh
        }
        
        // uni.stopPullDownRefresh()
        this.showMessageToast('刷新成功', 1500)
    } catch (error) {
        console.error('[refreshPostList] 刷新失败:', error)
        // uni.stopPullDownRefresh()
        this.showMessageToast('刷新失败')
    }
},



			
			// ✅ 修改：重置并重新加载
			resetAndReload() {
			    this.page = 1
			    this.postList = []
			    
			    // 🔥 新增：只在切换排序模式时才重置 excludePostIds
			    // 分类切换不重置，避免重复
			    if (this.sortMode === 'discover' && this.categoryMode === 'recommend') {
			        // 推荐模式：保留 excludePostIds
			        console.log('🔄 刷新推荐列表，保留已排除ID')
			    } else {
			        // 其他模式：重置 excludePostIds
			        this.excludePostIds = []
			        console.log('🔄 切换模式，重置已排除ID')
			    }
			    
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
						  // 弹出登录提示框
						  uni.showModal({
						    title: '提示',
						    content: '需要登录才能体验更多内容哦',
						    cancelText: '取消',
						    confirmText: '登录',
						    success: (res) => {
						      if (res.confirm) {
						        // 用户点击了"登录"按钮
						        uni.switchTab({
						          url: '/pages/my/my'
						        })
						      }
						      // 用户点击了"取消"按钮，不做任何操作
						    }
						  })
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
							  // 弹出登录提示框
							  uni.showModal({
							    title: '提示',
							    content: '需要登录才能体验更多内容哦',
							    cancelText: '取消',
							    confirmText: '登录',
							    success: (res) => {
							      if (res.confirm) {
							        // 用户点击了"登录"按钮
							        uni.switchTab({
							          url: '/pages/my/my'
							        })
							      }
							      // 用户点击了"取消"按钮，不做任何操作
							    }
							  })
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
			    if (this.sortMode === 'follow') {
			        return '暂无关注用户的动态\n快去关注感兴趣的人吧~'
			    }
			    
			    if (this.sortMode === 'latest') {
			        return '暂无最新内容'
			    }
			    
			    const categoryNames = {
			        'recommend': '推荐',
			        'daily': '日常',
			        'friend': '询问',
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
// 🔥 新增：外层容器
.index-page-wrapper {
	position: relative;
	min-height: 100vh;
	background-color: #f5f5f5;
	overflow: hidden;
}

// 🔥 修改：自定义下拉刷新样式
.custom-refresh-wrapper {
	 position: relative;
	   width: 100%;
	   height: 0;
	   display: flex;
	   align-items: center;
	   justify-content: center;
	   background: linear-gradient(180deg, #f5f5f5 0%, rgba(245, 245, 245, 0.95) 100%);
	   overflow: hidden;
	   z-index: 50;
	   will-change: transform, opacity;
	   
	   // 🔥 关键修改：添加高度和透明度的过渡动画
	   transition: 
	     height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), /* 缓动函数：ease-out-quad */
	     opacity 0.3s ease;
	
	&.is-refreshing {
			pointer-events: auto;
			    transition: 
			      height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
			      opacity 0.4s ease;
		}
		
		// 🔥 新增：显示状态下加速过渡
		  &.show {
		    transition: 
		      height 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
		      opacity 0.2s ease;
		  }
	
	.refresh-content {
		display: flex;
		    flex-direction: column;
		    align-items: center;
		    gap: 8rpx;
		    padding: 10rpx 0; // ✅ 减小内边距
			// 🔥 新增：图标和文字也添加过渡
			    transition: transform 0.3s ease;
		
		.refresh-icon {
			width: 50rpx; // ✅ 稍微缩小图标
			      height: 50rpx;
				  transition: transform 0.3s ease; // 🔥 添加过渡
				  
			       &.rotating {
			              animation: rotate360 1s linear infinite;
			            }
		
		}
		.refresh-text {
			 font-size: 24rpx;
			      color: #666;
			      white-space: nowrap;
			      transition: opacity 0.3s ease; // 🔥 添加过渡
		}
	}
}

@keyframes rotate360 {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

// 🔥 修改：页面内容区域
.index-page {
	position: relative; // ✅ 必须设置
	    min-height: 100vh;
	    background-color: #f5f5f5;
		// 🔥 添加过渡动画
		  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

// 🔥 新增：图片占位符样式
.card-image-wrapper {
  width: 100%;
  position: relative;
  
  .image-placeholder {
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #f5f5f5;
    min-height: 200rpx;
    
   // ✅ 优化后的骨架屏（性能提升）
   .skeleton-box {
     width: 100%;
     height: 200rpx;
     background: #f0f0f0; // 🔥 改为纯色，去掉渐变
     position: relative;
     overflow: hidden;
     
     // 🔥 使用伪元素做动画（性能更好）
     &::after {
       content: '';
       position: absolute;
       top: 0;
       left: -100%;
       width: 100%;
       height: 100%;
       background: linear-gradient(
         90deg,
         transparent,
         rgba(255, 255, 255, 0.4),
         transparent
       );
       animation: skeleton-shimmer 1.5s ease-in-out infinite;
     }
   }
   
   @keyframes skeleton-shimmer {
     0% {
       transform: translateX(0);
     }
     100% {
       transform: translateX(300%); // 🔥 使用 transform 代替 background-position
     }
   }
    
    .card-image {
      width: 100%;
      display: block;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &.image-loaded .card-image {
      opacity: 1;
    }
    
    &.image-loaded .skeleton-box {
      display: none;
    }
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
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
	
	.notice-arrow {
		font-size: 40rpx;
		color: #C00000;
		font-weight: bold;
		padding: 0 8rpx;
		flex-shrink: 0;
	}
}

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

/* ✅✅✅ 1. 修改后的导航栏样式 (居中布局) ✅✅✅ */
.primary-nav {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 两端对齐，中间自适应 */
  background-color: #fff;
  padding: 0 24rpx;
  height: 88rpx;
  border-bottom: 1rpx solid #f0f0f0;
  transition: all 0.3s ease;
  position: relative;
  z-index: 100;

  &.is-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
  }

  /* 左侧：菜单按钮区 */
  .nav-left {
    flex: 0 0 80rpx; /* 固定宽度 */
    display: flex;
    justify-content: flex-start;
    
    .menu-btn {
      width: 72rpx;
      height: 64rpx;
      background: transparent;
      border-radius: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .menu-icon-img {
          width: 20px;  /* 设置合适的大小 */
          height: 20px;
        }
    }
  }

  /* 中间：Tab 区域 (居中) */
  .nav-center {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .nav-tab {
      position: relative;
      padding: 16rpx 12rpx;
      margin: 0 10rpx;

      .nav-text {
        font-size: 30rpx;
        color: #666;
        font-weight: 500;
        transition: all 0.3s;
      }

      &.active .nav-text {
        color: #333;
        font-weight: 600;
        font-size: 32rpx;
      }
      
      .nav-indicator {
        position: absolute;
        bottom: 6rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 28rpx;
        height: 6rpx;
        background: #C00000;
        border-radius: 3rpx;
      }
    }

    .sort-divider {
      color: #ddd;
      font-size: 24rpx;
      margin: 0 4rpx;
    }
  }

  /* 右侧：搜索按钮区 */
  .nav-right {
    flex: 0 0 80rpx; /* 固定宽度，与左侧保持平衡 */
    display: flex;
    justify-content: flex-end;
    
    .search-btn {
      width: 72rpx;
      height: 64rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .search-icon-img {
          width: 44rpx;
          height: 44rpx;
        }
    }
  }
}

/* ✅✅✅ 2. 新增：侧边菜单样式 (完全移植) ✅✅✅ */
.side-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  &.show {
    opacity: 1;
    visibility: visible;
  }
}

.side-menu-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 600rpx;
  background: #F6F6F6;
  box-shadow: 4rpx 0 24rpx rgba(0, 0, 0, 0.05);
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  display: flex;
  flex-direction: column;
  z-index: 9999;
  border-top-right-radius: 32rpx;
  border-bottom-right-radius: 32rpx;

  &.show {
    transform: translateX(0);
  }
}

.menu-scroll-area {
  flex: 1;
  height: 0;
  padding: 0 24rpx; /* 调整顶部间距 */
  box-sizing: border-box;
}

.drawer-spacer { height: 0; display: none; }
.bottom-spacer { height: 180rpx; }

/* 菜单分组卡片 */
.group-card {
  background: #ffffff;
  border-radius: 24rpx;
  margin-bottom: 24rpx;
  margin-top: 0 !important;
  padding: 8rpx 0;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.02);
  overflow: hidden;
}

.menu-row {
  display: flex;
  align-items: center;
  padding: 32rpx 32rpx;
  position: relative;
  
  &:active { background-color: #f9f9f9; }

  .icon-wrapper {
    width: 48rpx;
    height: 48rpx;
    margin-right: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .menu-icon-img { width: 40rpx; height: 40rpx; }
  }

  .menu-text {
    flex: 1;
    font-size: 30rpx;
    color: #333;
    font-weight: 500;
	letter-spacing: 0.5rpx;
  }
  
  .info-count { font-size: 24rpx; color: #999; }
}

/* 底部操作栏 */
.drawer-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 160rpx;
  background: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
  border-top: 1rpx solid rgba(0, 0, 0, 0.03);
  border-bottom-right-radius: 32rpx;

  .bottom-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20rpx;

    /* 🔥 恢复 Treehole 样式：灰色圆形背景 */
    .bottom-icon-wrapper {
      width: 90px;   /* 约 100rpx */
      height: 90px;
      background: transparent; /* 灰色背景 */
      border-radius: 0;  /* 圆形 */
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: -18px; /* 恢复标准间距 */
      position: relative;
      
      /* 恢复小图标尺寸 */
      .bottom-icon-img {
        width: 30px;
        height: 30px;
      }
    }
    
    .bottom-text {
      font-size: 24rpx;
      color: #666;
    }
  }
}
.icon-btn-reset {
  width: 100%; height: 100%;
  background: transparent; padding: 0; margin: 0; line-height: 1; border: none;
  display: flex; align-items: center; justify-content: center;
  &::after { border: none; }
}

/* ✅ 修改后的二级导航栏样式 (居中平铺) */
.category-nav {
    background-color: #fff;
    /* border-bottom: 1rpx solid #f0f0f0; */ /* Treehole 似乎没有底部边框，可根据需要保留或删除 */
    
    .category-bar-inner {
        display: flex;
        justify-content: space-around; /* 🔥 关键：平均分布 */
        align-items: center;
        padding: 16rpx 24rpx; /* 上下留白 */
        
        .category-item {
            flex: 1; /* 每个选项占相同的宽度 */
            text-align: center;
            padding: 12rpx 0;
            position: relative;
            
            .category-text {
                font-size: 28rpx;
                color: #666;
                font-weight: 500;
                transition: all 0.3s;
            }
            
            &.active {
                .category-text {
                    color: #000;
                    font-weight: 600; /* 加粗 */
                    font-size: 30rpx; /* 选中稍微变大 */
                }
            }
            
            &:active {
                opacity: 0.7;
            }
        }
    }
}

// ✅ 内容区域
.content-section {
	padding: 16rpx;
	
	.loading-container {
		padding: 80rpx 0;
		text-align: center;
		
		.loading-text {
			font-size: 28rpx;
			color: #999;
		}
	}
	
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
						position: relative;
						
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

.bottom-spacing {
	height: 100rpx;
}

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

