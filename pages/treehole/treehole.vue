<template>
	<view class="index-page">
		
	<view class="banner-section">
		<swiper 
			class="banner-swiper" 
			:autoplay="true" 
			:interval="3000" 
			:duration="500"
			:circular="true"
			indicator-dots
			indicator-color="rgba(255, 255, 255, 0.5)"
			indicator-active-color="#ffffff"
		>
			<swiper-item v-for="(banner, index) in bannerList" :key="index">
				<image 
					class="banner-image" 
					:src="banner.image" 
					mode="aspectFill"
					@click="onBannerClick(banner)"
				/>
			</swiper-item>
		</swiper>
	</view>
  <view class="community-page">
    <!-- 顶部导航栏 -->
    <!-- 顶部导航栏 - 添加动态样式控制 -->
        <view 
          class="nav-bar" 
        >
      <!-- 左侧：院系筛选按钮 -->
      <view class="nav-left">
		 <view class="menu-btn" @click="openSideMenu">
		   <text class="menu-icon">☰</text>
		 </view> 
    <!-- <view class="filter-icon-btn" @click="toggleFilterMenu">
      <image 
          class="nav-bar-icon" 
          :src="filterMode === 'all' ? iconFilterAllUrl : iconFilterDeptUrl" 
          mode="aspectFit"
      ></image>
    </view> -->
</view>

      <!-- 中间：最热、最新、两个选项 -->
      <view class="nav-center">
        <view 
          class="sort-item"
          :class="{ 'active': sortMode === 'hottest' }"
          @click="selectSortMode('hottest')"
        >
          发现
        </view>
        <view class="sort-divider">|</view>
        <view 
          class="sort-item"
          :class="{ 'active': sortMode === 'latest' }"
          @click="selectSortMode('latest')"
        >
          最新
        </view>
        <!-- <view class="sort-divider">|</view>
        <view 
          class="sort-item"
          :class="{ 'active': sortMode === 'topic' }"
          @click="selectSortMode('topic')"
        >
          话题
        </view> -->
      </view>

      <!-- 右侧：搜索按钮 -->
      <view class="nav-right">
          <view class="search-icon-btn" @click="gotoSearch">
            <image 
                class="nav-bar-icon" 
                :src="iconSearchUrl" 
                mode="aspectFit"
            ></image>
          </view>
      </view>
    </view>
	
	<!-- 🔥🔥🔥 新增:左侧弹出菜单 🔥🔥🔥 -->
	    <view 
	      class="side-menu-overlay" 
	      :class="{ 'show': showSideMenu }"
	      @click="closeSideMenu"
	    >
	      <view 
	        class="side-menu-drawer" 
	        :class="{ 'show': showSideMenu }"
	        @click.stop
	      >
	        <!-- 菜单头部 -->
	        <view class="menu-header">
	          <text class="menu-title">我的菜单</text>
	          <view class="close-btn" @click="closeSideMenu">
	            <text class="close-icon">✕</text>
	          </view>
	        </view>
	        
	        <!-- 菜单列表 -->
	        <scroll-view class="menu-list" scroll-y>
	          <view 
	            v-for="(item, index) in menuItems" 
	            :key="index"
	            class="menu-item"
	            @click="handleMenuClick(item)"
	          >
	            <text class="menu-item-icon">{{ item.icon }}</text>
	            <text class="menu-item-text">{{ item.name }}</text>
	            <text class="menu-arrow">›</text>
	          </view>
	        </scroll-view>
	      </view>
	    </view>
	
	<!-- 🔥 修改：二级分类栏 - 使用独立的隐藏控制 -->
	<view 
	  class="category-bar" 
	  v-if="sortMode === 'hottest'"
	  :class="{ 'category-hidden': isCategoryHidden }"
	  :style="{ transform: categoryTransform }"
	>
	  <view 
	    class="category-item"
	    :class="{ 'active': categoryMode === 'recommend' }"
	    @click="selectCategory('recommend')"
	  >
	    <text class="category-text">推荐</text>
	  </view>
	  <view 
	    class="category-item"
	    :class="{ 'active': categoryMode === 'daily' }"
	    @click="selectCategory('daily')"
	  >
	    <text class="category-text">日常</text>
	  </view>
	  <view 
	    class="category-item"
	    :class="{ 'active': categoryMode === 'friend' }"
	    @click="selectCategory('friend')"
	  >
	    <text class="category-text">交友</text>
	  </view>
	  <view 
	    class="category-item"
	    :class="{ 'active': categoryMode === 'complaint' }"
	    @click="selectCategory('complaint')"
	  >
	    <text class="category-text">吐槽</text>
	  </view>
	  <view
	    class="category-item"
	    :class="{ 'active': categoryMode === 'goods' }"
	    @click="selectCategory('goods')"
	  >
	    <text class="category-text">好物</text>
	  </view>
	</view>
		
    <!-- 筛选下拉菜单 -->
    <view class="filter-menu" v-if="showFilterMenu" @click="closeFilterMenu">
      <view class="filter-content" @click.stop>
        <view 
          class="filter-option"
          :class="{ 'active': filterMode === 'all' }"
          @click="selectFilterMode('all')"
        >
          <image class="option-icon-img" :src="iconMenuAllUrl" mode="aspectFit"></image>
          <view class="option-info">
            <text class="option-title">全部</text>
            <text class="option-desc">显示所有可见帖子</text>
          </view>
          <text class="check-icon" v-if="filterMode === 'all'">✓</text>
        </view>
        
        <view 
          class="filter-option"
          :class="{ 'active': filterMode === 'department' }"
          @click="selectFilterMode('department')"
        >
          <image class="option-icon-img" :src="iconFilterDeptUrl" mode="aspectFit"></image>
          <view class="option-info">
            <text class="option-title">本院系</text>
            <text class="option-desc">仅显示发布到本院系的帖子</text>
          </view>
          <text class="check-icon" v-if="filterMode === 'department'">✓</text>
        </view>
      </view>
    </view>

    <!-- 消息提示区域 -->
    <view class="message-area" v-if="showMessage">
      <text class="message-text">{{ messageText }}</text>
    </view>

    <!-- 话题讨论：双列瀑布流布局 -->
    <view class="waterfall-container" v-if="sortMode === 'topic'">
      <view class="waterfall-column">
        <view 
          class="waterfall-item" 
          v-for="post in leftColumnPosts" 
          :key="post.id"
          @click="gotoPostDetail(post)"
        >
          <view class="waterfall-card">
            <view class="card-image-wrapper" v-if="post.images && post.images.length > 0">
              <image 
                class="card-image"
                :src="post.images[0]" 
                mode="widthFix"
                @load="onImageLoad(post, $event)"
              ></image>
            </view>
            
            <view class="card-content" v-if="post.content">
              <text class="content-text">{{ post.content }}</text>
            </view>
            
            <view class="card-header" @click.stop="onAvatarClick(post)">
              <image 
                class="card-avatar" 
                :src="post.avatar || '/static/default-avatar.png'" 
                mode="aspectFill"
              ></image>
              <text class="card-nickname">{{ post.nickname }}</text>
            </view>
            
            <view class="card-footer">
              <view class="footer-info">
                <text class="card-time">{{ post.timeText }}</text>
              </view>
              
              <view class="footer-actions">
                <view class="action-item" @click.stop="toggleLike(post, post.id)">
                  <image class="action-icon-img waterfall-icon" :src="post.isLiked ? iconLikedUrl : iconLikeUrl" mode="aspectFit"></image>
                  <text class="action-count">{{ post.likeCount }}</text>
                </view>
                <view class="action-item" @click.stop="gotoComments(post)">
                  <image class="action-icon-img waterfall-icon" :src="iconCommentUrl" mode="aspectFit"></image>
                  <text class="action-count">{{ post.commentCount }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <view class="waterfall-column">
        <view 
          class="waterfall-item" 
          v-for="post in rightColumnPosts" 
          :key="post.id"
          @click="gotoPostDetail(post)"
        >
          <view class="waterfall-card">
            <view class="card-image-wrapper" v-if="post.images && post.images.length > 0">
              <image 
                class="card-image"
                :src="post.images[0]" 
                mode="widthFix"
                @load="onImageLoad(post, $event)"
              ></image>
            </view>
            
            <view class="card-content" v-if="post.content">
              <text class="content-text">{{ post.content }}</text>
            </view>
            
            <view class="card-header" @click.stop="onAvatarClick(post)">
              <image 
                class="card-avatar" 
                :src="post.avatar || '/static/default-avatar.png'" 
                mode="aspectFill"
              ></image>
              <text class="card-nickname">{{ post.nickname }}</text>
            </view>
            
            <view class="card-footer">
              <view class="footer-info">
                <text class="card-time">{{ post.timeText }}</text>
              </view>
              
              <view class="footer-actions">
                <view class="action-item" @click.stop="toggleLike(post, post.id)">
                  <image class="action-icon-img list-icon" :src="post.isLiked ? iconLikedUrl : iconLikeUrl" mode="aspectFit"></image>
                  <text class="action-count">{{ post.likeCount }}</text>
                </view>
                
                <view class="action-item" @click.stop="gotoComments(post)">
                  <image class="action-icon-img list-icon" :src="iconCommentUrl" mode="aspectFit"></image>
                  <text class="action-count">{{ post.commentCount }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 最新/最热：普通列表布局 -->
    <view class="post-list" v-else>
      <view class="post-item" v-for="post in postList" :key="post.id" @click="gotoPostDetail(post)">
        <view class="post-header">
          <view class="user-info" >
            <!-- <image 
              class="avatar" 
              :src="post.avatar || '/static/default-avatar.png'" 
              mode="aspectFill"
			  @click.stop="onAvatarClick(post)"
            ></image>    暂时在树洞中不能跳转到发帖者主页-->    
			<image
			  class="avatar" 
			  :src="post.avatar || '/static/default-avatar.png'" 
			  mode="aspectFill"
			></image>       
            <text class="nickname">{{ post.nickname }}</text>
          </view>
          <text class="post-time">{{ post.timeText }}</text>
        </view>

        <view class="post-content">
          <text class="content-text">{{ post.content }}</text>
        </view>

        <view class="post-images" v-if="post.images && post.images.length > 0">
          <image 
            v-for="(img, imgIndex) in post.images" 
            :key="imgIndex"
            class="post-image"
            :class="{ 
              'single-image': post.images.length === 1,
              'double-image': post.images.length === 2,
              'triple-image': post.images.length >= 3
            }"
            :src="img" 
            :mode="post.images.length === 1 ? 'widthFix' : 'aspectFill'"
            @click.stop="previewImage(post.images, imgIndex)"
          ></image>
        </view>

        <view class="post-footer">
          <view class="footer-left">
            <!-- <text class="tag">{{ post.tag }}</text> -->
            <text class="view-count">{{ post.viewCount }}人浏览</text>
          </view>
          <view class="footer-right">
			  <view
			    class="action-item contact" 
			    v-if="post.contactInfo && post.user_openid !== openid"
			    @click.stop="copyContact(post)"
			  >
			    <text class="contact-icon">📞</text>
			    <text class="action-text">联系TA</text>
			  </view>
			  
			  <view
			    class="action-item goods" 
			    v-if="post.relatedGoodsId"
			    @click.stop="gotoGoodsDetail(post.relatedGoodsId)"
			  >
			    <text class="goods-icon">🛍️</text>
			    <text class="action-text">查看商品</text>
			  </view>
			  
			  
            <view class="action-item" @click.stop="toggleLike(post, post.id)">
              <image class="action-icon-img list-icon" :src="post.isLiked ? iconLikedUrl : iconLikeUrl" mode="aspectFit"></image>
              <text class="action-count">{{ post.likeCount }}</text>
            </view>
            
            <view class="action-item" @click.stop="gotoComments(post)">
              <image class="action-icon-img list-icon" :src="iconCommentUrl" mode="aspectFit"></image>
              <text class="action-count">{{ post.commentCount }}</text>
            </view>
            
          </view>
        </view>
      </view>

      <view class="load-more" v-if="showLoadMore">
        <view class="load-more-content">
          <text class="load-text" v-if="isLoadingMore">正在加载更多...</text>
          <text class="load-text" v-else-if="hasMore">上拉加载更多</text>
          <text class="no-more-text" v-else>没有更多了</text>
        </view>
      </view>
      
      <view class="empty-state" v-if="postList.length === 0 && !isLoading">
        <text class="empty-icon">📭</text>
        <text class="empty-text">{{ filterMode === 'department' ? '本院系暂无帖子' : '暂无帖子' }}</text>
      </view>
    </view>
</view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      sortMode: 'hottest', // 'latest', 'hottest', 'topic'
      filterMode: 'all', // 'all' 或 'department'
	  categoryMode: 'recommend', // 🔥 新增：二级分类 'recommend', 'daily', 'friend', 'complaint'
      showFilterMenu: false,
      showMessage: false,
      messageText: '',
      postList: [],
	  excludePostIds: [],
      page: 1,
      pageSize: 10,
      isLoading: false,
      isLoadingMore: false,
      hasMore: true,
      leftColumnHeight: 0,
      rightColumnHeight: 0,
      imageHeights: {},
	  iconLikeUrl: 'https://img.xinshi00.com/label/like.png',
	  iconLikedUrl: 'https://img.xinshi00.com/label/liked.png',
	  iconCommentUrl: 'https://img.xinshi00.com/label/chat.png',
	  iconFilterAllUrl: 'https://img.xinshi00.com/label/shaixuan.png',
	  iconFilterDeptUrl: 'https://img.xinshi00.com/label/department.png',
	  iconSearchUrl: 'https://img.xinshi00.com/label/search.png',
	  iconMenuAllUrl: 'https://img.xinshi00.com/label/school.png',
	  // 🔥 修改：导航栏控制
	  isNavHidden: false,
	  navTransform: 'translateY(0)',
		 // 🔥 新增：分类栏单独控制
	  isCategoryHidden: false,
	  categoryTransform: 'translateY(0)',
	  // 滚动控制
		lastScrollTop: 0,
		categoryScrollThreshold: 80, 
		scrollDirection: 'down',
		tabBarInstance: null,
		// --- ⬇️ 修改：登录跳转逻辑 ⬇️ ---
		      redirectTimer: null, // Renamed from loginRedirectTimer
		      isRedirecting: false,  // 🔥 新增：跳转“门锁”
		      // --- ⬆️ 修改：登录跳转逻辑 ⬆️ ---
		bannerList: [],
		menuItems: [
		  { name: '我发布的', icon: '📝', route: '/subpkg/my-posts/my-posts' },
		  { name: '我删除的', icon: '🛍️', route: '/subpkg/my-deleted-posts/my-deleted-posts' },
		  { name: '我点赞的', icon: '💰', route: '/subpkg/like/like' },
		  { name: '我评论的', icon: '⭐', route: '/subpkg/my-post-comments/my-post-comments' },
		],
		showSideMenu: false
    }
  },
  
  // 🔥 修改：onShow - 重置导航栏
    onShow() {
		// #ifdef MP-WEIXIN
		    // 检查当前页面是否是栈顶页面
		    const pages = getCurrentPages();
		    const currentPage = pages[pages.length - 1];
		    const currentRoute = currentPage.route;
		    
		    // 只有当前页面是 home 时才更新
		    if (currentRoute === 'pages/home/home' && this.tabBarInstance) {
		      this.tabBarInstance.setData({ selected: 3 });
		    }
		    // #endif
		  
      this.resetNavBar()
	  // --- ⬇️ 修改：登录检查与跳转逻辑 ⬇️ ---
	  	  
	  	  // 1. 页面显示时，先清除可能存在的旧定时器
	  	  if (this.redirectTimer) {
	  	    clearTimeout(this.redirectTimer)
	  	    this.redirectTimer = null
	  	  }
	        
	        // 2. 🔥 检查是否正在跳转中，如果是，则阻止后续操作
	        if (this.isRedirecting) {
	          console.log('🔄 正在跳转中，阻止 onShow 再次执行');
	          return;
	        }
	  	          
	  	  // 3. 检查用户是否未登录
	  	  if (!this.openid) {
	  	    console.log('🤔 用户未登录，立即准备跳转到 "我的" 页面')
	          
	          // 4. 🔥 立即“上锁”，防止快速点击
	          this.isRedirecting = true; 
	                
	  	    // 6. 设置1.5秒定时器，等Toast显示完毕后再跳转
	  	    this.redirectTimer = setTimeout(() => {
	  	      console.log('⏰ Toast结束，执行跳转...');
	  	      uni.switchTab({
	  	        url: '/pages/my/my'
	  	      })
	  	      this.redirectTimer = null; // 清除定时器ID
	  	    }, 1500) // 1500毫秒 = 1.5秒 (匹配Toast时长)
	  	    
	  	  } else {
	          // 7. 用户已登录，确保“门锁”是打开的
	          this.isRedirecting = false;
	        }
	  
    },
  // --- ⬇️ 新增：页面隐藏时清除定时器 ⬇️ ---
      onHide() {
       // 1. 如果定时器存在，则清除它
        if (this.redirectTimer) {
          clearTimeout(this.redirectTimer)
          this.redirectTimer = null
          console.log('👋 页面隐藏，清除跳转定时器')
        }
        
        // 2. 🔥 重置“门锁”
        // 这样即使用户在1.5秒内切换到其他页面再切回来，
        // 登录检查也会重新触发
        this.isRedirecting = false;
      },
 
  onPullDownRefresh() {
    console.log('📱 触发下拉刷新')
    this.refreshPostList()
  },
  
  onReachBottom() {
    console.log('📱 触发上拉加载更多')
    this.loadMore()
  },
  
  async onLoad() {
	  console.log('🚀 页面加载，开始获取帖子列表') 
	  // ✅ 加载轮播图数据
	  await this.loadBannerList()
	  await this.loadPostList() 
	  },
  onReady() {
	  // #ifdef MP-WEIXIN
	      if (typeof this.$scope.getTabBar === 'function') {
	        this.tabBarInstance = this.$scope.getTabBar();
	      }
	      // #endif
  },
  // 🔥 新增：监听页面滚动
    onPageScroll(e) {
      this.handlePageScroll(e)
    },
  
  computed: {
    ...mapState('m_user', ['openid', 'userBase', 'preference']),
    
	
	
    leftColumnPosts() {
      if (this.sortMode !== 'topic') return []
      
      let leftHeight = 0
      let rightHeight = 0
      const left = []
      
      // 更新基础卡片高度
      // 内容76 + 头像44 + 底部42 = 162rpx
      const baseCardHeight = 162
      
      this.postList.forEach(post => {
        const imageHeight = this.imageHeights[post.id] || 300
        const cardHeight = imageHeight + baseCardHeight
        
        if (leftHeight <= rightHeight) {
          left.push(post)
          leftHeight += cardHeight
        } else {
          rightHeight += cardHeight
        }
      })
      
      return left
    },
    
    rightColumnPosts() {
      if (this.sortMode !== 'topic') return []
      
      let leftHeight = 0
      let rightHeight = 0
      const right = []
      
      const baseCardHeight = 162
      
      this.postList.forEach(post => {
        const imageHeight = this.imageHeights[post.id] || 300
        const cardHeight = imageHeight + baseCardHeight
        
        if (leftHeight <= rightHeight) {
          leftHeight += cardHeight
        } else {
          right.push(post)
          rightHeight += cardHeight
        }
      })
      
      return right
    },

    
    showLoadMore() {
      return this.postList.length > 0 && (this.hasMore || this.isLoadingMore)
    }
  },
  
  methods: {
	  openSideMenu() {
	    if (!this.openid) {
	      uni.switchTab({
	        url: '/pages/my/my'
	      });
	      return;
	    }
	    this.showSideMenu = true;
	  },
	  
	  // 🔥 新增:关闭侧边菜单
	  closeSideMenu() {
	    this.showSideMenu = false;
	  },
	  
	  // 🔥 新增:处理菜单项点击
	  handleMenuClick(item) {
	    this.closeSideMenu();
	    
	    // 延迟跳转,让关闭动画完成
	    setTimeout(() => {
	      uni.navigateTo({
	        url: item.route,
	        fail: (err) => {
	          uni.showToast({
	            title: '页面开发中',
	            icon: 'none',
	            duration: 2000
	          });
	        }
	      });
	    }, 300);
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
	   
	  ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase', 'updatepreference']),
	    // 📌 切换分类时清空 excludePostIds
	      selectCategory(category) {
	        if (this.categoryMode === category) return
	        
	        this.categoryMode = category
	        this.isCategoryHidden = false
	        this.categoryTransform = 'translateY(0)'
	        
	        this.page = 1
	        this.postList = []
	        this.excludePostIds = [] // 🔥 清空
	        this.hasMore = true
	        
	        this.loadPostList()
	        console.log(`📂 切换分类: ${category}，已清空排除列表`)
	      },
	  setTabBarIndex(index) {
	      // #ifdef MP-WEIXIN
	      // 立即尝试设置
	      const trySetTabBar = () => {
	        if (typeof this.$scope.getTabBar === 'function') {
	          const tabBar = this.$scope.getTabBar();
	          if (tabBar && tabBar.setData) {
	            tabBar.setData({
	              selected: index
	            });
	            return true;  // 设置成功
	          }
	        }
	        return false;  // 设置失败
	      };
	      
	      // 第一次立即执行
	      if (!trySetTabBar()) {
	        // 如果失败,使用短延迟重试
	        setTimeout(() => {
	          trySetTabBar();
	        }, 50);
	      }
	      // #endif
	    },
		
	  // 🔥 修改：handlePageScroll - 分别控制导航栏和分类栏
	      handlePageScroll(e) {
	        const scrollTop = e.scrollTop
	        const delta = scrollTop - this.lastScrollTop
	        
	        // 判断滚动方向
	        if (delta > 0) {
	          this.scrollDirection = 'down'
	        } else if (delta < 0) {
	          this.scrollDirection = 'up'
	        }
	        
	        // 🔥 1. 控制主导航栏
	        if (this.scrollDirection === 'down' && scrollTop > this.navScrollThreshold) {
	          if (!this.isNavHidden) {
	            this.isNavHidden = true
	            this.navTransform = 'translateY(-100%)'
	          }
	        } else if (this.scrollDirection === 'up') {
	          if (this.isNavHidden) {
	            this.isNavHidden = false
	            this.navTransform = 'translateY(0)'
	          }
	        }
	        
	        // 🔥 2. 控制分类栏（仅在"最新"模式下生效）
	        if (this.sortMode === 'hottest') {
	          if (this.scrollDirection === 'down' && scrollTop > this.categoryScrollThreshold) {
	            // 向下滚动超过阈值 -> 隐藏分类栏
	            if (!this.isCategoryHidden) {
	              this.isCategoryHidden = true
	              this.categoryTransform = 'translateY(-100%)'
	            }
	          } else if (scrollTop <= 10) {
	            // 🔥 关键：滚动到顶部（≤10px）-> 显示分类栏
	            if (this.isCategoryHidden) {
	              this.isCategoryHidden = false
	              this.categoryTransform = 'translateY(0)'
	            }
	          }
	        }
	        
	        this.lastScrollTop = scrollTop
	      },
	      
	      // 🔥 修改：resetNavBar - 同时重置两个栏
	          resetNavBar() {
	            this.isNavHidden = false
	            this.navTransform = 'translateY(0)'
	            
	            // 🔥 新增：重置分类栏
	            this.isCategoryHidden = false
	            this.categoryTransform = 'translateY(0)'
	            
	            this.lastScrollTop = 0
	            this.scrollDirection = 'down'
	          },
		  
    // 切换筛选菜单
    toggleFilterMenu() {
		if (!this.openid) {
		  uni.switchTab({
		    url: '/pages/my/my'
		  })
		  return
		}
		if (this.userBase.is_verified !== 1) {
			uni.showToast({
			  title: '您还未完成校园认证，该功能暂时无法使用',
			  icon: 'none',
			  duration: 1000
			});
			uni.navigateTo({
				url: '/subpkg/verification/verification'
			})
			return
		}
      this.showFilterMenu = !this.showFilterMenu
    },
    
    // 关闭筛选菜单
    closeFilterMenu() {
      this.showFilterMenu = false
    },
    
      // 📌 筛选模式切换时清空 excludePostIds
         selectFilterMode(mode) {
           if (!this.openid) {
             uni.switchTab({ url: '/pages/my/my' })
             return
           }
           
           if (this.filterMode === mode) {
             this.closeFilterMenu()
             return
           }
           
           if (mode === 'department' && !this.userBase.major) {
             this.showMessageToast('请先在个人中心设置院系')
             this.closeFilterMenu()
             return
           }
           
           this.filterMode = mode
           this.closeFilterMenu()
           this.resetNavBar()
           
           this.page = 1
           this.postList = []
           this.excludePostIds = [] // 🔥 清空
           this.hasMore = true
           
           this.loadPostList()
           console.log(`🔄 切换筛选: ${mode}，已清空排除列表`)
         },
      
	   // 🔥 新增：辅助方法 - 获取分类名称
	      getCategoryName() {
	        const categoryMap = {
	          'daily': '日常',
	          'friend': '交友',
	          'complaint': '吐槽',
			  'goods': '二手',
	        }
	        return categoryMap[this.categoryMode] || ''
	      },
		  
      // 📌 切换排序模式时清空 excludePostIds
        selectSortMode(mode) {
          if (this.sortMode === mode) return
          
          this.sortMode = mode
          
          if (mode === 'latest') {
            this.categoryMode = 'recommend'
            this.isCategoryHidden = false
            this.categoryTransform = 'translateY(0)'
          }
          
          this.resetNavBar()
          
          this.page = 1
          this.postList = []
          this.excludePostIds = [] // 🔥 清空
          this.hasMore = true
          
          this.loadPostList()
          console.log(`🔄 切换排序: ${mode}，已清空排除列表`)
        },
    
    // 重置和重新加载
    resetAndReload() {
      this.page = 1
      this.postList = []
      this.hasMore = true
      this.leftColumnHeight = 0
      this.rightColumnHeight = 0
      this.imageHeights = {}
      this.loadPostList()
    },
    
    // 🔥 修改：loadPostList
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
              filterMode: this.filterMode,
			  isTopicDiscussion: 'false'
            }
            
            if (this.sortMode === 'hottest') {
              // 📌 推荐模式：传递 preference 和 excludePostIds
              if (this.categoryMode === 'recommend') {
                params.preference1 = this.preference
                params.excludePostIds = this.excludePostIds.join(',') // 🔥 关键：传递已排除的ID
              } else {
                // 非推荐模式：传递 category
                const categoryMap = {
                  'daily': '日常',
                  'friend': '交友',
                  'complaint': '吐槽',
				  'goods': '二手',
				  
                }
                params.category = categoryMap[this.categoryMode]
              }
            } else if (this.sortMode === 'latest') {
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
              
              // 前端二次过滤
              if (this.sortMode === 'topic') {
                newPosts = newPosts.filter(post => post.isTopicDiscussion === 1)
              } else {
                newPosts = newPosts.filter(post => post.isTopicDiscussion !== 1)
              }
              
              // 📌 关键：只在推荐模式下累积 excludePostIds
              if (this.sortMode === 'hottest' && 
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
                const emptyMsg = this.categoryMode === 'recommend' 
                  ? (this.filterMode === 'department' ? '本院系暂无帖子' : '暂无帖子') 
                  : `暂无${this.getCategoryName()}帖子`
                this.showMessageToast(emptyMsg)
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
    
    onImageLoad(post, event) {
      if (!post || !post.id) return
      
      const { width, height } = event.detail
      const screenWidth = uni.getSystemInfoSync().windowWidth
      const columnWidth = (screenWidth - 48) / 2
      const actualHeight = (height / width) * columnWidth
      
      this.$set(this.imageHeights, post.id, actualHeight)
    },
    
    // 📌 下拉刷新时清空 excludePostIds
        async refreshPostList() {
          try {
            this.resetNavBar()
            
            this.page = 1
            this.postList = []
            this.excludePostIds = [] // 🔥 清空
            this.hasMore = true
            
            await this.loadPostList()
            uni.stopPullDownRefresh()
            this.showMessageToast('刷新成功', 1500)
            console.log('🔄 下拉刷新，已清空排除列表')
          } catch (error) {
            uni.stopPullDownRefresh()
            this.showMessageToast('刷新失败')
          }
        },
    
    async loadMore() {
      if (!this.hasMore || this.isLoading || this.isLoadingMore) return
      
      this.isLoadingMore = true
      this.page++
      await this.loadPostList()
    },
    
    onAvatarClick(post) {
      if (post.properties === '二手') {
        this.gotoUserProfile(post)
      } else {
        this.showMessageToast('只有二手帖子允许查看个人主页')
      }
    },
    
    gotoUserProfile(post) {
      if (post.user_openid === this.openid) {
        uni.navigateTo({ url: '/subpkg/profile/profile' })
        return
      }
      
      const userInfo = {
        openid: post.user_openid,
        nickname: post.nickname,
        avatarUrl: post.avatar,
      }
      
      const payload = encodeURIComponent(JSON.stringify(userInfo))
      uni.navigateTo({
        url: `/subpkg/profile/profile?publisher=${payload}`
      })
    },
    
    gotoSearch() {
		if (!this.openid) {
		  uni.switchTab({
		    url: '/pages/my/my'
		  })
		  return
		}
      uni.navigateTo({ url: '/subpkg/post-search/post-search' })
    },
    
    async gotoGoodsDetail(goodsId) {
      try {
        await uni.$http.post('/goods/view', { goods_id: goodsId })
      } catch (error) {
        console.error('增加浏览次数失败:', error)
      }
      
      uni.navigateTo({
        url: `/subpkg/goods_detail/goods_detail?goods_id=${goodsId}`
      })
    },
    
    copyContact(post) {
		if (!this.openid) {
		  uni.switchTab({
		    url: '/pages/my/my'
		  })
		  return
		}
		if (this.userBase.is_verified !== 1) {
			uni.navigateTo({
			  url: '/subpkg/verification/verification'
			})
		}
      if (!post.contactInfo) {
        uni.showToast({ title: '该帖子未提供联系方式', icon: 'none' })
        return
      }
      
      uni.setClipboardData({
        data: post.contactInfo,
        success: () => {
          uni.showToast({ title: '联系方式已复制', icon: 'success' })
        }
      })
    },
    
    showMessageToast(text, duration = 2000) {
      this.messageText = text
      this.showMessage = true
      setTimeout(() => {
        this.showMessage = false
      }, duration)
    },
    
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
      
      return imageArray.filter(img => img)
    },
    
    formatTime(timestamp) {
      if (!timestamp) return '刚刚'
      
      const time = typeof timestamp === 'string' ? new Date(timestamp).getTime() : timestamp
      const now = Date.now()
      const diff = now - time
      
      const minute = 60 * 1000
      const hour = 60 * minute
      const day = 24 * hour
      
      if (diff < minute) return '刚刚'
      if (diff < hour) return Math.floor(diff / minute) + '分钟前'
      if (diff < day) return Math.floor(diff / hour) + '小时前'
      if (diff < 7 * day) return Math.floor(diff / day) + '天前'
      
      const date = new Date(time)
      return `${date.getMonth() + 1}-${date.getDate()}`
    },
    
    async toggleLike(post, indexOrId) {
      try {
        if (!this.openid) {
          uni.switchTab({
            url: '/pages/my/my'
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
    
    previewImage(images, current) {
      uni.previewImage({ urls: images, current: current })
    },
    
    gotoPostDetail(post) {
	  this.updatepreference(post.properties)
      const url = post.isTopicDiscussion === 1 
        ? '/subpkg/topic-detail/topic-detail' 
        : '/subpkg/post-detail/post-detail'
      
      uni.navigateTo({
        url: `${url}?id=${post.id}`
      })
    },
    
    gotoComments(post) {
      const url = post.isTopicDiscussion === 1 
        ? '/subpkg/topic-detail/topic-detail' 
        : '/subpkg/post-detail/post-detail'
      
      uni.navigateTo({
        url: `${url}?id=${post.id}&tab=comment`
      })
    },
    
    gotoPublish() {
      if (!this.openid) {
        this.showMessageToast('请先登录')
        return
      }
      
      uni.navigateTo({ url: '/subpkg/publish-post/publish-post' })
    }
  }
}
</script>

<style lang="scss" scoped>
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

.community-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 100rpx;
}

/* 🔥 导航栏 - 添加动画效果 */
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  
  /* 🔥 关键：添加平滑过渡动画 */
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 🔥 隐藏状态时移除阴影 */
  &.nav-hidden {
    box-shadow: none;
  }
}

/* 🔥 新增：二级分类栏 */
.category-bar {
  position: sticky;
  top: 112rpx; /* 紧贴在顶部导航栏下方 */
  z-index: 99;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16rpx 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  
  /* 平滑过渡动画 */
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 隐藏状态时移除阴影 */
  &.category-hidden {
    box-shadow: none;
  }
  
  .category-item {
    flex: 1;
    text-align: center;
    padding: 12rpx 0;
    position: relative;
    transition: all 0.3s ease;
    
    .category-text {
      font-size: 28rpx;
      color: #666;
      font-weight: 500;
      transition: color 0.3s;
    }
    
    &.active {
      .category-text {
        color: #000;
        font-weight: 600;
        font-size: 30rpx;
      }
      
      /* 下划线指示器 */
      &::after {
        // content: '';
        // position: absolute;
        // bottom: 0;
        // left: 50%;
        // transform: translateX(-50%);
        // width: 40rpx;
        // height: 4rpx;
        // background-color: #FFE4B5;
        // border-radius: 2rpx;
      }
    }
    
    /* 点击效果 */
    &:active {
      opacity: 0.7;
    }
  }
}

.nav-left {
  flex-shrink: 0;
  
  /* 🔥 菜单按钮样式 - 替换原来的消息按钮 */
  .menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72rpx;
    height: 64rpx;
    background: #f5f5f5;
    border-radius: 16rpx;
    transition: all 0.3s ease;
    flex-shrink: 0;
  
    &:active {
      background: #e8e8e8;
      transform: scale(0.95);
    }
  
    .menu-icon {
      font-size: 44rpx;
      color: #333;
      font-weight: bold;
    }
  }
  
}

.filter-icon-btn {
  width: 80rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 32rpx;
  transition: background-color 0.3s;
  
  &:active {
    background-color: transparent;
  }
  
  .filter-icon {
    font-size: 36rpx;
  }
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin: 0 20rpx;
}

.sort-item {
  padding: 0 24rpx;
  font-size: 30rpx;
  color: #666;
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
  
  &.active {
    color: #000;
    font-weight: 600;
    
    &::after {
      // content: '';
      // position: absolute;
      // bottom: -8rpx;
      // left: 50%;
      // transform: translateX(-50%);
      // width: 40rpx;
      // height: 4rpx;
      // background-color: #FFE4B5;
      // border-radius: 2rpx;
    }
  }
}

/* 🔥🔥🔥 侧边菜单遮罩层 🔥🔥🔥 */
		.side-menu-overlay {
		  position: fixed;
		  top: 0;
		  left: 0;
		  right: 0;
		  bottom: 0;
		  background: rgba(0, 0, 0, 0);
		  z-index: 9998;
		  opacity: 0;
		  visibility: hidden;
		  transition: all 0.3s ease;
		
		  &.show {
		    opacity: 1;
		    visibility: visible;
		    background: rgba(0, 0, 0, 0.5);
		  }
		}
		
		/* 🔥🔥🔥 侧边菜单抽屉 🔥🔥🔥 */
		.side-menu-drawer {
		  position: fixed;
		  top: 0;
		  left: 0;
		  bottom: 0;
		  width: 560rpx;
		  background: #ffffff;
		  box-shadow: 4rpx 0 24rpx rgba(0, 0, 0, 0.15);
		  transform: translateX(-100%);
		  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		  display: flex;
		  flex-direction: column;
		  z-index: 9999;
		
		  &.show {
		    transform: translateX(0);
		  }
		}
		
		/* 🔥 菜单头部 */
		.menu-header {
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  padding: 32rpx 24rpx;
		  background: linear-gradient(135deg, #C00000 0%, #ff4757 100%);
		  box-shadow: 0 4rpx 12rpx rgba(192, 0, 0, 0.1);
		
		  .menu-title {
		    font-size: 36rpx;
		    font-weight: bold;
		    color: #ffffff;
		  }
		
		  .close-btn {
		    width: 56rpx;
		    height: 56rpx;
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    background: rgba(255, 255, 255, 0.2);
		    border-radius: 50%;
		    transition: all 0.3s ease;
		
		    &:active {
		      background: rgba(255, 255, 255, 0.3);
		      transform: scale(0.9);
		    }
		
		    .close-icon {
		      font-size: 40rpx;
		      color: #ffffff;
		      font-weight: bold;
		      line-height: 1;
		    }
		  }
		}
		
		/* 🔥 菜单列表 */
		.menu-list {
		  flex: 1;
		  padding: 16rpx 0;
		  overflow-y: auto;
		}
		
		.menu-item {
		  display: flex;
		  align-items: center;
		  padding: 32rpx 24rpx;
		  margin: 8rpx 16rpx;
		  background: #f8f9fa;
		  border-radius: 16rpx;
		  transition: all 0.3s ease;
		  border: 2rpx solid transparent;
		
		  &:active {
		    background: #e8ecef;
		    transform: scale(0.98);
		    border-color: #C00000;
		  }
		
		  .menu-item-icon {
		    font-size: 44rpx;
		    margin-right: 20rpx;
		    width: 48rpx;
		    text-align: center;
		  }
		
		  .menu-item-text {
		    flex: 1;
		    font-size: 30rpx;
		    color: #333;
		    font-weight: 500;
		  }
		
		  .menu-arrow {
		    font-size: 48rpx;
		    color: #999;
		    line-height: 1;
		    margin-left: 12rpx;
		  }
		}
		
		/* 🔥 响应式优化 - 小屏幕 */
		@media screen and (max-width: 375px) {
		  .side-menu-drawer {
		    width: 520rpx;
		  }
		
		  .menu-item {
		    padding: 28rpx 20rpx;
		
		    .menu-item-icon {
		      font-size: 40rpx;
		      width: 44rpx;
		    }
		
		    .menu-item-text {
		      font-size: 28rpx;
		    }
		  }
		}
		
.sort-divider {
  color: #ddd;
  font-size: 28rpx;
  margin: 0 8rpx;
}

.nav-right {
  flex-shrink: 0;
}

.search-icon-btn {
  width: 80rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 32rpx;
  transition: background-color 0.3s;
  
  &:active {
    background-color: transparent;
  }
  
  .search-icon {
    font-size: 36rpx;
  }
}
.nav-bar-icon {
    width: 36rpx;
    height: 36rpx;
}
/* 筛选菜单 */
.filter-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 140rpx;
  padding-left: 24rpx;
}

.filter-content {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 0;
  min-width: 300rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.filter-option {
  display: flex;
  align-items: center;
  padding: 28rpx 32rpx;
  border-bottom: 1rpx solid #f0f0f0;
  transition: background-color 0.2s;
  
  &:last-child {
    border-bottom: none;
  }
  
  &.active {
    background-color: #f8f9fa;
  }
  
  &:active {
    background-color: #f0f0f0;
  }
  
  .option-icon {
    font-size: 40rpx;
    margin-right: 20rpx;
    width: 40rpx;
    text-align: center;
  }
  .option-icon-img {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
    }
  .option-info {
    flex: 1;
    
    .option-title {
      font-size: 32rpx;
      color: #333;
      font-weight: 500;
      display: block;
      margin-bottom: 8rpx;
    }
    
    .option-desc {
      font-size: 24rpx;
      color: #999;
      display: block;
    }
  }
  
  .check-icon {
    font-size: 32rpx;
    color: #C00000;
    font-weight: bold;
    margin-left: 16rpx;
  }
}

/* 消息提示 */
.message-area {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
    z-index: 3000;
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
    padding: 20rpx 40rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    
    .message-text {
      white-space: nowrap;
    }
  }
  
  /* 瀑布流布局（话题讨论） */
  .waterfall-container {
    display: flex;
    padding: 24rpx 16rpx 0;
    gap: 16rpx;
    min-height: calc(100vh - 140rpx);
  }
  
/* 🔥 调整：瀑布流容器也需要适配 */
.waterfall-container {
  padding: 16rpx 12rpx 0;
  
  .community-page[data-sort-mode="latest"] & {
    padding-top: 0;
  }
}
  
  .waterfall-item {
    width: 100%;
    margin-bottom: 0;
  }
  
/* 🔥 调整：瀑布流容器也需要适配 */
.waterfall-container {
  padding: 16rpx 12rpx 0;
  
  .community-page[data-sort-mode="latest"] & {
    padding-top: 0;
  }
}
  
  .waterfall-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12rpx; // 减少卡片间距
  }
  
  .waterfall-item {
    width: 100%;
    margin-bottom: 0;
  }
  
  /* ✅ 1. 瀑布流卡片 - 添加点击效果 */
  .waterfall-card {
    background: #fff;
    border-radius: 12rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    
    // 🔥 新增：平滑过渡动画
    transition: all 0.3s ease;
    
    // 🔥 新增：点击时的效果
    &:active {
      transform: translateY(-4rpx);
      box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
    }
    
    .card-image-wrapper {
      width: 100%;
      overflow: hidden;
      
      .card-image {
        width: 100%;
        display: block;
        vertical-align: bottom; // 消除图片底部间隙
      }
    }
    
    .card-content {
      padding: 12rpx 14rpx 6rpx; // 上下左右都压缩
      
      .content-text {
        font-size: 28rpx; // 增大字体
        color: #333;
        font-weight: 500; // 增加字重
        line-height: 1.5;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; // 允许显示3行
        overflow: hidden;
        word-break: break-all;
      }
    }
    
    .card-header {
      display: flex;
      align-items: center;
      padding: 6rpx 14rpx; // 极致压缩
      gap: 10rpx;
      
      .card-avatar {
        width: 36rpx;
        height: 36rpx;
        border-radius: 50%;
        flex-shrink: 0;
      }
      
      .card-nickname {
        font-size: 26rpx; // 增大昵称字体
        color: #666;
        font-weight: 500;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8rpx 14rpx 10rpx; // 底部稍多一点
      border-top: 1rpx solid #f5f5f5;
      
      .footer-info {
        .card-time {
          font-size: 22rpx; // 增大时间字体
          color: #999;
        }
      }
      
      .footer-actions {
        display: flex;
        gap: 16rpx;
        
        .action-item {
          display: flex;
          align-items: center;
          gap: 6rpx;
          
          .like-icon,
          .comment-icon {
            font-size: 28rpx; // 增大图标
            color: #999;
            
            &.liked {
              color: #C00000;
            }
          }
          .waterfall-icon {
                        width: 28rpx;
                        height: 28rpx;
                    }
          .action-count {
            font-size: 22rpx; // 增大数字字体
            color: #666;
            font-weight: 500;
          }
        }
      }
    }
  }

  
  /* 🔥 调整：当显示分类栏时，调整帖子列表的 padding-top */
  .post-list {
    padding: 24rpx;
    
    /* 当显示分类栏时增加顶部间距 */
    .community-page[data-sort-mode="latest"] & {
      padding-top: 0; /* 分类栏会自动占据空间 */
    }
  }
  
 /* ✅ 2. 普通列表 - 添加点击效果 */
 .post-item {
   background: #fff;
   border-radius: 16rpx;
   padding: 28rpx;
   margin-bottom: 24rpx;
   box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
   
   // 🔥 新增：平滑过渡动画
   transition: all 0.3s ease;
   
   // 🔥 新增：点击时的效果
   &:active {
     transform: translateY(-4rpx);
     box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
   }
    .post-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      
      .user-info {
        display: flex;
        align-items: center;
        gap: 16rpx;
        flex: 1;
        
        .avatar {
          width: 64rpx;
          height: 64rpx;
          border-radius: 50%;
          flex-shrink: 0;
        }
        
        .nickname {
          font-size: 28rpx;
          color: #333;
          font-weight: 500;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      
      .post-time {
        font-size: 24rpx;
        color: #999;
        flex-shrink: 0;
        margin-left: 16rpx;
      }
    }
    
    .post-content {
      margin-bottom: 20rpx;
      
      .content-text {
        font-size: 30rpx;
        color: #333;
        line-height: 1.7;
        word-break: break-all;
      }
    }
    
    .post-images {
      display: flex;
      flex-wrap: wrap;
      gap: 12rpx;
      margin-bottom: 20rpx;
      
      .post-image {
        border-radius: 12rpx;
        background: #f5f5f5;
        
        &.single-image {
          width: 100%;
          max-height: 600rpx;
        }
        
        &.double-image {
          width: calc(50% - 6rpx);
          height: 320rpx;
        }
        
        &.triple-image {
          width: calc(33.33% - 8rpx);
          height: 200rpx;
        }
      }
    }
    
    .post-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 20rpx;
      border-top: 1rpx solid #f5f5f5;
      
      .footer-left {
        display: flex;
        align-items: center;
        gap: 16rpx;
        flex: 1;
        
        .tag {
          font-size: 24rpx;
          color: #C00000;
          background: rgba(192, 0, 0, 0.08);
          padding: 6rpx 16rpx;
          border-radius: 8rpx;
        }
        
        .view-count {
          font-size: 24rpx;
          color: #999;
        }
      }
      
      .footer-right {
        display: flex;
        gap: 24rpx;
        flex-shrink: 0;
        
        .action-item {
          display: flex;
          align-items: center;
          gap: 8rpx;
          
          .like-icon,
          .comment-icon,
          .goods-icon,
          .contact-icon {
            font-size: 32rpx;
          }
          .list-icon {
                        width: 32rpx;
                        height: 32rpx;
                    }
          .like-icon.liked {
            color: #C00000;
          }
          
          .action-count,
          .action-text {
            font-size: 24rpx;
            color: #666;
          }
          
          &.goods,
          &.contact {
            color: #C00000;
            
            .action-text {
              color: #C00000;
            }
          }
        }
      }
    }
  }
  
  /* 加载更多 */
  .load-more {
    padding: 40rpx 0;
    
    .load-more-content {
      display: flex;
      justify-content: center;
      align-items: center;
      
      .load-text,
      .no-more-text {
        font-size: 26rpx;
        color: #999;
      }
    }
  }
  
  /* 空状态 */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120rpx 0;
    
    .empty-icon {
      font-size: 120rpx;
      margin-bottom: 24rpx;
    }
    
    .empty-text {
      font-size: 28rpx;
      color: #999;
    }
  }
  
  /* 发帖按钮 */
  .publish-btn {
    position: fixed;
    right: 32rpx;
    bottom: 120rpx;
    width: 112rpx;
    height: 112rpx;
    background: linear-gradient(135deg, #C00000 0%, #8B0000 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8rpx 24rpx rgba(192, 0, 0, 0.35);
    z-index: 99;
    transition: transform 0.3s;
    
    &:active {
      transform: scale(0.95);
    }
    
    .publish-icon {
      font-size: 48rpx;
      color: #fff;
    }
  }
  </style>

