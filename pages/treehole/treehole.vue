<template>
  <view class="index-page">

    <view class="banner-section">
      <swiper class="banner-swiper" :autoplay="true" :interval="3000" :duration="500" :circular="true" indicator-dots
        indicator-color="rgba(255, 255, 255, 0.5)" indicator-active-color="#ffffff">
        <swiper-item v-for="(banner, index) in bannerList" :key="index">
          <image class="banner-image" :src="banner.image" mode="aspectFill" @click="onBannerClick(banner)" />
        </swiper-item>
      </swiper>
    </view>

    <view class="community-page">
      <view class="nav-bar">
        <view class="nav-left">
          <view class="menu-btn" @click="openSideMenu">
            <text class="menu-icon">☰</text>
          </view>
        </view>

        <view class="nav-center">
          <view class="sort-item" :class="{ 'active': sortMode === 'hottest' }" @click="selectSortMode('hottest')">
            发现
          </view>
          <view class="sort-divider">|</view>

          <view class="sort-item" :class="{ 'active': sortMode === 'follow' }" @click="selectSortMode('follow')">
            关注
          </view>
          <view class="sort-divider">|</view>

          <view class="sort-item" :class="{ 'active': sortMode === 'latest' }" @click="selectSortMode('latest')">
            最新
          </view>
        </view>

        <view class="nav-right">
          <view class="search-icon-btn" @click="gotoSearch">
            <image class="nav-bar-icon" :src="iconSearchUrl" mode="aspectFit"></image>
          </view>
        </view>
      </view>

      <view class="side-menu-overlay" :class="{ 'show': showSideMenu }" @click="closeSideMenu">
      </view>

      <view class="side-menu-drawer" :class="{ 'show': showSideMenu }" @click.stop>
        <scroll-view class="menu-scroll-area" scroll-y>
          <view class="drawer-spacer"></view>

          <view class="group-card" v-for="(group, gIndex) in menuGroups" :key="group.id">
            <view class="menu-row" v-for="(item, iIndex) in group.items" :key="iIndex"
              @click="handleMenuClick(item)">
              <view class="icon-wrapper">
                <image 
                      class="menu-icon-img" 
                      :src="item.icon" 
                      mode="aspectFit"
                    ></image>
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
          <view class="bottom-item" v-for="(action, index) in bottomActions" :key="index"
            @click="handleBottomAction(action)">
            <view class="bottom-icon-wrapper" >
				 <!-- 客服按钮 -->
				      <button class="icon-btn-reset" open-type="contact" v-if="action.action === 'help'">
				        <image class="bottom-icon-img" :src="action.icon" mode="aspectFit"></image>
				      </button>
				      <!-- 普通图标 -->
				      <image class="bottom-icon-img" :src="action.icon" mode="aspectFit" v-if="action.action !== 'help'"></image>
            </view>
            <text class="bottom-text">{{ action.name }}</text>
          </view>
        </view>
      </view>
      <view class="category-bar" v-if="sortMode === 'hottest'" :class="{ 'category-hidden': isCategoryHidden }"
        :style="{ transform: categoryTransform }">
        <view class="category-item" :class="{ 'active': categoryMode === 'recommend' }"
          @click="selectCategory('recommend')">
          <text class="category-text">推荐</text>
        </view>
        <view class="category-item" :class="{ 'active': categoryMode === 'daily' }" @click="selectCategory('daily')">
          <text class="category-text">日常</text>
        </view>
        <view class="category-item" :class="{ 'active': categoryMode === 'friend' }" @click="selectCategory('friend')">
          <text class="category-text">交友</text>
        </view>
        <view class="category-item" :class="{ 'active': categoryMode === 'complaint' }"
          @click="selectCategory('complaint')">
          <text class="category-text">吐槽</text>
        </view>
        <view class="category-item" :class="{ 'active': categoryMode === 'goods' }" @click="selectCategory('goods')">
          <text class="category-text">好物</text>
        </view>
      </view>

      <view class="filter-menu" v-if="showFilterMenu" @click="closeFilterMenu">
        <view class="filter-content" @click.stop>
          <view class="filter-option" :class="{ 'active': filterMode === 'all' }" @click="selectFilterMode('all')">
            <image class="option-icon-img" :src="iconMenuAllUrl" mode="aspectFit"></image>
            <view class="option-info">
              <text class="option-title">全部</text>
              <text class="option-desc">显示所有可见帖子</text>
            </view>
            <text class="check-icon" v-if="filterMode === 'all'">✓</text>
          </view>

          <view class="filter-option" :class="{ 'active': filterMode === 'department' }"
            @click="selectFilterMode('department')">
            <image class="option-icon-img" :src="iconFilterDeptUrl" mode="aspectFit"></image>
            <view class="option-info">
              <text class="option-title">本院系</text>
              <text class="option-desc">仅显示发布到本院系的帖子</text>
            </view>
            <text class="check-icon" v-if="filterMode === 'department'">✓</text>
          </view>
        </view>
      </view>

      <view class="message-area" v-if="showMessage">
        <text class="message-text">{{ messageText }}</text>
      </view>

      <view class="waterfall-container" v-if="sortMode === 'topic'">
        <view class="waterfall-column">
          <view class="waterfall-item" v-for="post in leftColumnPosts" :key="post.id" @click="gotoPostDetail(post)">
            <view class="waterfall-card">
              <view class="card-image-wrapper" v-if="post.images && post.images.length > 0">
                <image class="card-image" :src="post.images[0]" mode="widthFix" @load="onImageLoad(post, $event)">
                </image>
              </view>

              <view class="card-content" v-if="post.content">
                <text class="content-text">{{ post.content }}</text>
              </view>

              <view class="card-header" @click.stop="onAvatarClick(post)">
                <image class="card-avatar" :src="post.avatar || '/static/default-avatar.png'" mode="aspectFill">
                </image>
                <text class="card-nickname">{{ post.nickname }}</text>
              </view>

              <view class="card-footer">
                <view class="footer-info">
                  <text class="card-time">{{ post.timeText }}</text>
                </view>

                <view class="footer-actions">
                  <view class="action-item" @click.stop="toggleLike(post, post.id)">
                    <image class="action-icon-img waterfall-icon" :src="post.isLiked ? iconLikedUrl : iconLikeUrl"
                      mode="aspectFit"></image>
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
          <view class="waterfall-item" v-for="post in rightColumnPosts" :key="post.id" @click="gotoPostDetail(post)">
            <view class="waterfall-card">
              <view class="card-image-wrapper" v-if="post.images && post.images.length > 0">
                <image class="card-image" :src="post.images[0]" mode="widthFix" @load="onImageLoad(post, $event)">
                </image>
              </view>

              <view class="card-content" v-if="post.content">
                <text class="content-text">{{ post.content }}</text>
              </view>

              <view class="card-header" @click.stop="onAvatarClick(post)">
                <image class="card-avatar" :src="post.avatar || '/static/default-avatar.png'" mode="aspectFill">
                </image>
                <text class="card-nickname">{{ post.nickname }}</text>
              </view>

              <view class="card-footer">
                <view class="footer-info">
                  <text class="card-time">{{ post.timeText }}</text>
                </view>

                <view class="footer-actions">
                  <view class="action-item" @click.stop="toggleLike(post, post.id)">
                    <image class="action-icon-img list-icon" :src="post.isLiked ? iconLikedUrl : iconLikeUrl"
                      mode="aspectFit"></image>
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

      <view class="post-list" v-else>
        <view class="post-item" v-for="post in postList" :key="post.id" @click="gotoPostDetail(post)">
          <view class="post-header">
            <view class="user-info">
              <image class="avatar" :src="post.avatar || '/static/default-avatar.png'" mode="aspectFill"></image>
              <text class="nickname">{{ post.nickname }}</text>
            </view>
            <text class="post-time">{{ post.timeText }}</text>
          </view>

          <view class="post-content">
            <text class="content-text">{{ post.content }}</text>
          </view>

          <view class="post-images" v-if="post.images && post.images.length > 0">
            <image v-for="(img, imgIndex) in post.images" :key="imgIndex" class="post-image" :class="{ 
                  'single-image': post.images.length === 1,
                  'double-image': post.images.length === 2,
                  'triple-image': post.images.length >= 3
                }" :src="img" :mode="post.images.length === 1 ? 'widthFix' : 'aspectFill'"
              @click.stop="previewImage(post.images, imgIndex)"></image>
          </view>

          <view class="post-footer">
            <view class="footer-left">
              <text class="view-count">{{ post.viewCount }}人浏览</text>
            </view>
            <view class="footer-right">
              <view class="action-item contact" v-if="post.contactInfo && post.user_openid !== openid"
                @click.stop="copyContact(post)">
                <text class="contact-icon">📞</text>
                <text class="action-text">联系TA</text>
              </view>

              <view class="action-item goods" v-if="post.relatedGoodsId"
                @click.stop="gotoGoodsDetail(post.relatedGoodsId)">
                <text class="goods-icon">🛍️</text>
                <text class="action-text">查看商品</text>
              </view>


              <view class="action-item" @click.stop="toggleLike(post, post.id)">
                <image class="action-icon-img list-icon" :src="post.isLiked ? iconLikedUrl : iconLikeUrl"
                  mode="aspectFit"></image>
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
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    data() {
      return {
        sortMode: 'hottest',
        filterMode: 'all',
        categoryMode: 'recommend',
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
        isNavHidden: false,
        navTransform: 'translateY(0)',
        isCategoryHidden: false,
        categoryTransform: 'translateY(0)',
        lastScrollTop: 0,
        categoryScrollThreshold: 80,
        scrollDirection: 'down',
        tabBarInstance: null,
        redirectTimer: null,
        isRedirecting: false,
        bannerList: [],
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
			  },
			  
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
        bottomActions: [
          {
            name: '帮助与客服',
            icon: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/kefu.png',
            action: 'help'
          },
          {
            name: '设置',
            icon: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/shezhi.png',
            route: '/subpkg/edit/edit'
          }
        ],
        showSideMenu: false
      }
    },

    onShow() {
      // #ifdef MP-WEIXIN
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const currentRoute = currentPage.route;
      if (currentRoute === 'pages/home/home' && this.tabBarInstance) {
        this.tabBarInstance.setData({
          selected: 3
        });
      }
      // #endif

      this.resetNavBar()

      if (this.redirectTimer) {
        clearTimeout(this.redirectTimer)
        this.redirectTimer = null
      }
      if (this.isRedirecting) {
        console.log('🔄 正在跳转中，阻止 onShow 再次执行');
        return;
      }
      if (!this.openid) {
        console.log('🤔 用户未登录，立即准备跳转到 "我的" 页面')
        this.isRedirecting = true;
        this.redirectTimer = setTimeout(() => {
          console.log('⏰ Toast结束，执行跳转...');
          uni.switchTab({
            url: '/pages/my/my'
          })
          this.redirectTimer = null;
        }, 1500)

      } else {
        this.isRedirecting = false;
      }
    },

    onHide() {
      if (this.redirectTimer) {
        clearTimeout(this.redirectTimer)
        this.redirectTimer = null
        console.log('👋 页面隐藏，清除跳转定时器')
      }
      this.isRedirecting = false;
    },

    onPullDownRefresh() {
      this.refreshPostList()
    },

    onReachBottom() {
      this.loadMore()
    },

    async onLoad() {
      console.log('🚀 页面加载，开始获取帖子列表')
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
    onPageScroll(e) {
      this.handlePageScroll(e)
    },

    computed: {
      ...mapState('m_user', ['openid', 'userBase', 'preference']),

      followingIds() {
        if (!this.userBase || !this.userBase.following_ids) {
          return ''
        }
        if (Array.isArray(this.userBase.following_ids)) {
          return this.userBase.following_ids.join(',')
        }
        return this.userBase.following_ids
      },

      leftColumnPosts() {
        if (this.sortMode !== 'topic') return []
        let leftHeight = 0
        let rightHeight = 0
        const left = []
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

      closeSideMenu() {
        this.showSideMenu = false;
      },

      handleMenuClick(item) {
        this.closeSideMenu();
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
      
      // 🔥 修复关键点：补充 getIconEmoji 方法，确保图标能显示
      getIconEmoji(name) {
        const map = {
          'busts_in_silhouette': '👥',
          'bulb': '💡',
          'file_folder': '📂',
          'speech_balloon': '💬',
          'clock': '🕒',
          'arrow_down': '⬇️',
          'clipboard': '📋',
          'shopping_cart': '🛒',
          'credit_card': '💳',
          'link': '🔗',
          'flag': '🚩',
          'scan': '📷',
          'headset': '🎧',
          'settings': '⚙️'
        };
        return map[name] || '🔹';
      },

      // 🔥 修复关键点：补充 handleBottomAction 方法
     // methods: { ...
     
     handleBottomAction(item) {
       console.log('点击底部功能:', item.name);
       
       // 1. 点击后先关闭侧边栏
       this.closeSideMenu();
     
       // 2. 优先处理：如果有配置路由路径 (route)，直接跳转
       if (item.route) {
         uni.navigateTo({
           url: item.route,
           fail: (err) => {
             console.error(err);
             uni.showToast({
               title: '页面路径错误或未创建',
               icon: 'none'
             });
           }
         });
         return;
       }
     
       // 3. 特殊功能处理：根据 action 字段判断
       switch (item.action) {
         case 'help':
           // 示例：弹窗显示联系方式，或者跳转到专门的客服页
           // uni.showModal({
           //   title: '联系客服',
           //   content: '如有问题请联系管理员微信：xxxxxx',
           //   showCancel: false,
           //   confirmText: '知道了'
           // });
           break;
           
         
           
         default:
           uni.showToast({
             title: '功能开发中',
             icon: 'none'
           });
       }
     },
     
     // ... }

      onBannerClick(banner) {
        switch (banner.type) {
          case 'page':
            uni.navigateTo({
              url: banner.url
            })
            break
          case 'web':
            this.copyLinkAndNotify(banner.url, banner.title)
            break
          default:
            console.warn('未知的跳转类型:', banner.type)
        }
      },

      async loadBannerList() {
        try {
          const {
            data: res
          } = await uni.$http.get('/board/recentlist')
          if (res.meta.status === 200 && res.message && res.message.length > 0) {
            this.bannerList = res.message.map(board => ({
              id: board.id,
              title: board.description || '小黑板作品',
              image: board.image_url,
              url: '/subpkg/board/board',
              type: 'page',
              boardId: board.id
            }))
          } else {
            console.warn('⚠️ 未获取到轮播图数据')
          }
        } catch (error) {
          console.error('❌ 轮播图加载失败:', error)
        }
      },

      updatePostLikeStatus(data) {
        const {
          postId,
          isLiked,
          likeCount
        } = data
        const index = this.postList.findIndex(post => post.id === postId)
        if (index !== -1) {
          this.postList[index].isLiked = isLiked
          this.postList[index].likeCount = likeCount
          this.$set(this.postList, index, { ...this.postList[index]
          })
        }
      },

      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase', 'updatepreference']),

      selectCategory(category) {
        if (this.categoryMode === category) return
        this.categoryMode = category
        this.isCategoryHidden = false
        this.categoryTransform = 'translateY(0)'
        this.page = 1
        this.postList = []
        this.excludePostIds = []
        this.hasMore = true
        this.loadPostList()
      },

      setTabBarIndex(index) {
        // #ifdef MP-WEIXIN
        const trySetTabBar = () => {
          if (typeof this.$scope.getTabBar === 'function') {
            const tabBar = this.$scope.getTabBar();
            if (tabBar && tabBar.setData) {
              tabBar.setData({
                selected: index
              });
              return true;
            }
          }
          return false;
        };
        if (!trySetTabBar()) {
          setTimeout(() => {
            trySetTabBar();
          }, 50);
        }
        // #endif
      },

      handlePageScroll(e) {
        const scrollTop = e.scrollTop
        const delta = scrollTop - this.lastScrollTop
        if (delta > 0) {
          this.scrollDirection = 'down'
        } else if (delta < 0) {
          this.scrollDirection = 'up'
        }

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

        if (this.sortMode === 'hottest') {
          if (this.scrollDirection === 'down' && scrollTop > this.categoryScrollThreshold) {
            if (!this.isCategoryHidden) {
              this.isCategoryHidden = true
              this.categoryTransform = 'translateY(-100%)'
            }
          } else if (scrollTop <= 10) {
            if (this.isCategoryHidden) {
              this.isCategoryHidden = false
              this.categoryTransform = 'translateY(0)'
            }
          }
        }
        this.lastScrollTop = scrollTop
      },

      resetNavBar() {
        this.isNavHidden = false
        this.navTransform = 'translateY(0)'
        this.isCategoryHidden = false
        this.categoryTransform = 'translateY(0)'
        this.lastScrollTop = 0
        this.scrollDirection = 'down'
      },

      toggleFilterMenu() {
        if (!this.openid) {
          uni.switchTab({
            url: '/pages/my/my'
          })
          return
        }
        if (this.userBase.is_verified !== 1) {
          uni.showToast({
            title: '您还未完成校园认证',
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

      closeFilterMenu() {
        this.showFilterMenu = false
      },

      selectFilterMode(mode) {
        if (!this.openid) {
          uni.switchTab({
            url: '/pages/my/my'
          })
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
        this.excludePostIds = []
        this.hasMore = true
        this.loadPostList()
      },

      getCategoryName() {
        const categoryMap = {
          'daily': '日常',
          'friend': '交友',
          'complaint': '吐槽',
          'goods': '二手',
        }
        return categoryMap[this.categoryMode] || ''
      },

      selectSortMode(mode) {
        if (this.sortMode === mode) return
        if (mode === 'follow') {
          if (!this.openid) {
            uni.switchTab({
              url: '/pages/my/my'
            })
            return
          }
          if (!this.followingIds) {
            this.showMessageToast('您还没有关注任何人')
            return
          }
        }
        this.sortMode = mode
        if (mode === 'latest') {
          this.categoryMode = 'recommend'
          this.isCategoryHidden = false
          this.categoryTransform = 'translateY(0)'
        }
        this.resetNavBar()
        this.page = 1
        this.postList = []
        this.excludePostIds = []
        this.hasMore = true
        this.loadPostList()
      },

      resetAndReload() {
        this.page = 1
        this.postList = []
        this.hasMore = true
        this.leftColumnHeight = 0
        this.rightColumnHeight = 0
        this.imageHeights = {}
        this.loadPostList()
      },

      async loadPostList() {
        if (!this.openid) {
          uni.switchTab({
            url: '/pages/my/my'
          })
          return
        }
        try {
          if (this.isLoading) return
          this.isLoading = true

          if (this.sortMode === 'follow') {
            await this.loadFollowPosts()
            return
          }

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
            if (this.categoryMode === 'recommend') {
              params.preference1 = this.preference
              params.excludePostIds = this.excludePostIds.join(',')
            } else {
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

          const {
            data: res
          } = await uni.$http.get('/posts/list', params)

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

            if (this.sortMode === 'topic') {
              newPosts = newPosts.filter(post => post.isTopicDiscussion === 1)
            } else {
              newPosts = newPosts.filter(post => post.isTopicDiscussion !== 1)
            }

            if (this.sortMode === 'hottest' &&
              this.categoryMode === 'recommend' &&
              res.message.fetchedPostIds &&
              res.message.fetchedPostIds.length > 0) {
              this.excludePostIds = [...this.excludePostIds, ...res.message.fetchedPostIds]
            }

            if (this.page === 1) {
              this.postList = newPosts
            } else {
              this.postList.push(...newPosts)
            }
            this.hasMore = res.message.hasMore === true
            if (this.page === 1 && newPosts.length === 0) {
              const emptyMsg = this.categoryMode === 'recommend' ?
                (this.filterMode === 'department' ? '本院系暂无帖子' : '暂无帖子') :
                `暂无${this.getCategoryName()}帖子`
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

      async loadFollowPosts() {
        try {
          const params = {
            page: this.page,
            pageSize: this.pageSize,
            openid: this.openid,
            following_ids: this.followingIds,
            type: '1'
          }
          const {
            data: res
          } = await uni.$http.get('/posts/followlist', params)
          if (res.meta.status === 200) {
            let newPosts = (res.message.list || []).map(post => ({
              ...post,
              timeText: this.formatTime(post.created_at),
              images: this.processPostImages(post.images),
              viewCount: post.view_count || 0,
              likeCount: post.like_count || 0,
              commentCount: post.comment_count || 0,
              isLiked: post.is_liked || false,
              avatar: post.avatarUrl || '/static/default-avatar.png',
              nickname: post.nickname || '匿名用户'
            }))
            if (this.page === 1) {
              this.postList = newPosts
            } else {
              this.postList.push(...newPosts)
            }
            this.hasMore = newPosts.length >= this.pageSize
            if (this.page === 1 && newPosts.length === 0) {
              this.showMessageToast('关注的用户还没有发布帖子')
            }
          } else {
            this.showMessageToast(res.meta.msg || '加载失败')
            this.hasMore = false
          }
        } catch (error) {
          this.showMessageToast('加载失败，请检查网络')
          this.hasMore = false
        } finally {
          this.isLoading = false
          this.isLoadingMore = false
        }
      },

      onImageLoad(post, event) {
        if (!post || !post.id) return
        const {
          width,
          height
        } = event.detail
        const screenWidth = uni.getSystemInfoSync().windowWidth
        const columnWidth = (screenWidth - 48) / 2
        const actualHeight = (height / width) * columnWidth
        this.$set(this.imageHeights, post.id, actualHeight)
      },

      async refreshPostList() {
        try {
          this.resetNavBar()
          this.page = 1
          this.postList = []
          this.excludePostIds = []
          this.hasMore = true
          await this.loadPostList()
          uni.stopPullDownRefresh()
          this.showMessageToast('刷新成功', 1500)
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
          uni.navigateTo({
            url: '/subpkg/profile/profile'
          })
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
        uni.navigateTo({
          url: '/subpkg/post-search/post-search'
        })
      },

      async gotoGoodsDetail(goodsId) {
        try {
          await uni.$http.post('/goods/view', {
            goods_id: goodsId
          })
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
          uni.showToast({
            title: '该帖子未提供联系方式',
            icon: 'none'
          })
          return
        }
        uni.setClipboardData({
          data: post.contactInfo,
          success: () => {
            uni.showToast({
              title: '联系方式已复制',
              icon: 'success'
            })
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
          const {
            data: res
          } = await uni.$http.post('/posts/like', {
            post_id: post.id,
            openid: this.openid,
            is_like: !post.isLiked
          })
          if (res.meta.status === 200) {
            const index = this.postList.findIndex(p => p.id === post.id)
            if (index !== -1) {
              this.postList[index].isLiked = !this.postList[index].isLiked
              this.postList[index].likeCount = res.message.like_count || 0
              this.$set(this.postList, index, { ...this.postList[index]
              })
            }
          }
        } catch (error) {
          console.error('点赞失败:', error)
          this.showMessageToast('操作失败')
        }
      },

      previewImage(images, current) {
        uni.previewImage({
          urls: images,
          current: current
        })
      },

      gotoPostDetail(post) {
        this.updatepreference(post.properties)
        const url = post.isTopicDiscussion === 1 ?
          '/subpkg/topic-detail/topic-detail' :
          '/subpkg/post-detail/post-detail'
        uni.navigateTo({
          url: `${url}?id=${post.id}`
        })
      },

      gotoComments(post) {
        const url = post.isTopicDiscussion === 1 ?
          '/subpkg/topic-detail/topic-detail' :
          '/subpkg/post-detail/post-detail'
        uni.navigateTo({
          url: `${url}?id=${post.id}&tab=comment`
        })
      },

      gotoPublish() {
        if (!this.openid) {
          this.showMessageToast('请先登录')
          return
        }
        uni.navigateTo({
          url: '/subpkg/publish-post/publish-post'
        })
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

  /* 🔥 导航栏 */
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
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.nav-hidden {
      box-shadow: none;
    }
  }

  /* 🔥 二级分类栏 */
  .category-bar {
    position: sticky;
    top: 112rpx;
    z-index: 99;
    background-color: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 16rpx 24rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

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
      }

      &:active {
        opacity: 0.7;
      }
    }
  }

  .nav-left {
    flex-shrink: 0;

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
    }
  }

  /* 🔥🔥🔥 侧边菜单样式 🔥🔥🔥 */
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
    padding: 0 24rpx;
    box-sizing: border-box;
  }

  .drawer-spacer {
    height: 0px;
  }

  .bottom-spacer {
    height: 180rpx;
  }

  .group-card {
    background: #ffffff;
    border-radius: 24rpx;
    margin-bottom: 24rpx;
    padding: 8rpx 0;
    box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.02);
    overflow: hidden;
  }

  .menu-row {
    display: flex;
    align-items: center;
    padding: 32rpx 32rpx;
    position: relative;
    transition: background 0.2s;

    &:active {
      background-color: #f9f9f9;
    }

    .icon-wrapper {
      width: 48rpx;
      height: 48rpx;
      margin-right: 24rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      .menu-icon-text {
        font-size: 40rpx;
      }
    }

    .menu-text {
      flex: 1;
      font-size: 30rpx;
      color: #333;
      font-weight: 500;
      letter-spacing: 0.5rpx;
    }

    .menu-right {
      display: flex;
      align-items: center;

      .info-count {
        font-size: 24rpx;
        color: #999;
        margin-right: 10rpx;
      }

      .red-dot {
        width: 16rpx;
        height: 16rpx;
        background: #ff2442;
        border-radius: 50%;
      }
    }
  }
.menu-icon-img {
  width: 40rpx;  /* 设置图片宽度 */
  height: 40rpx; /* 设置图片高度 */
  /* 如果图片颜色较深，想要和文字对齐更好，可以微调 margin */
}

/* 底部图标样式 */
.bottom-icon-img {
  width: 36rpx;
  height: 36rpx;
}
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

      &:active {
        opacity: 0.7;
      }

.bottom-icon-wrapper {
  width: 50px;
  height: 50px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
  position: relative;
  
  /* 重置 button 样式 */
  .icon-btn-reset {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: 0;
    margin: 0;
    line-height: 1;
    border: none;
    
    /* 去除小程序 button 默认边框 */
    &::after {
      border: none;
      width: 0;
      height: 0;
    }
  }
  
  .bottom-icon-img {
    width: 48rpx;   /* 从 36rpx 改为 48rpx */
    height: 48rpx;  /* 从 36rpx 改为 48rpx */
  }
}

      .bottom-text {
        font-size: 24rpx;
        color: #666;
      }
    }
  }

  @media screen and (max-width: 375px) {
    .side-menu-drawer {
      width: 520rpx;
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

    .search-icon-img {
      width: 44rpx;
      height: 44rpx;
      padding: 8rpx;
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

  /* 瀑布流布局 */
  .waterfall-container {
    display: flex;
    padding: 24rpx 16rpx 0;
    gap: 16rpx;
    min-height: calc(100vh - 140rpx);
  }

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
    gap: 12rpx;
  }

  .waterfall-item {
    width: 100%;
    margin-bottom: 0;
  }

  .waterfall-card {
    background: #fff;
    border-radius: 12rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;

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
        vertical-align: bottom;
      }
    }

    .card-content {
      padding: 12rpx 14rpx 6rpx;

      .content-text {
        font-size: 28rpx;
        color: #333;
        font-weight: 500;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        word-break: break-all;
      }
    }

    .card-header {
      display: flex;
      align-items: center;
      padding: 6rpx 14rpx;
      gap: 10rpx;

      .card-avatar {
        width: 36rpx;
        height: 36rpx;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .card-nickname {
        font-size: 26rpx;
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
      padding: 8rpx 14rpx 10rpx;
      border-top: 1rpx solid #f5f5f5;

      .footer-info {
        .card-time {
          font-size: 22rpx;
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

          .waterfall-icon {
            width: 28rpx;
            height: 28rpx;
          }

          .action-count {
            font-size: 22rpx;
            color: #666;
            font-weight: 500;
          }
        }
      }
    }
  }

  .post-list {
    padding: 24rpx;

    .community-page[data-sort-mode="latest"] & {
      padding-top: 0;
    }
  }

  .post-item {
    background: #fff;
    border-radius: 16rpx;
    padding: 28rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;

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

          .list-icon {
            width: 32rpx;
            height: 32rpx;
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
  
</style>