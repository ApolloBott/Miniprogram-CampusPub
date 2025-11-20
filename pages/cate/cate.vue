<template>
  <view>
    <!-- ✅ 顶部导航栏   删除顶部的导航栏隐藏-->       
    <!-- <view 
      class="top-nav-bar" 
      :class="{ 'nav-hidden': isNavHidden }"
      :style="{ transform: navTransform }"      
    > -->                              
	<view class="top-nav-bar">
     <!-- 🔥 菜单按钮 - 替换原来的消息按钮 -->
           <view class="menu-btn" @click="openSideMenu">
             <text class="menu-icon">☰</text>
           </view>
      
      <!-- 🔥 中间标签区域 - 只保留推荐和新品 -->
      <view class="nav-tabs">
        <view 
          v-for="(item, i) in startList" 
          :key="i" 
          :class="['nav-tab-item', i === active ? 'active' : '']" 
          @click="activeChanged(i)"
        >
          <text class="tab-label">{{ item }}</text>
        </view>
      </view>
      
      <!-- 搜索图标按钮 -->
      <view class="search-btn" @click="gotoSearch">
        <text class="search-icon">🔍</text>
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
	
    <!-- 🔥🔥🔥 新增：类别选项栏 🔥🔥🔥 -->
    <view 
      class="category-nav-bar" 
      :class="{ 'category-hidden': isCategoryHidden }"
      :style="{ transform: categoryTransform }"
      v-if="active === 0"
    >
      <scroll-view scroll-x class="category-scroll" :show-scrollbar="false">
        <view class="category-list">
          <view 
            v-for="(item, index) in categoryOptions" 
            :key="index"
            :class="['category-option', selectedCategoryIndex === index ? 'active' : '']"
            @click="selectCategoryOption(index)"
          >
            <!-- <text class="category-icon">{{ item.icon }}</text> -->
            <text class="category-label">{{ item.name }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 🔥 分类商品展示区域 -->
    <view class="waterfall-container" v-if="showCategoryGoods">

      <view class="waterfall" v-if="categoodsList.length > 0">
        <view class="col">
          <view 
            v-for="(item, i) in cateleftColumn" 
            :key="i" 
            class="goods-wrapper"
          >
            <my-goods :goods="item" />
          </view>
        </view>
        <view class="col">
          <view 
            v-for="(item, i) in caterightColumn" 
            :key="i" 
            class="goods-wrapper"
          >
            <my-goods :goods="item" />
          </view>
        </view>
      </view>

      <view class="empty-state" v-else-if="!isLoading">
        <text class="empty-icon">📦</text>
        <text class="empty-text">该分类暂无商品</text>
        <text class="empty-tip">去看看其他分类吧～</text>
      </view>

      <view class="loading-state" v-if="isLoading">
        <text class="loading-text">加载中</text>
      </view>
    </view>
    
    <!-- ✅ 新品页面 -->
    <view class="waterfall-container" v-if="active === 1">
      <view class="waterfall">
        <view class="col">
          <view v-for="(item, i) in recentleftColumn" :key="i" class="goods-wrapper">
            <my-goods :goods="item" />
          </view>
        </view>
        <view class="col">
          <view v-for="(item, i) in recentrightColumn" :key="i" class="goods-wrapper">
            <my-goods :goods="item" />
          </view>
        </view>
      </view>
    </view>
    
    <!-- ✅ 推荐页面 - 只在未选中分类时显示 -->
    <view class="waterfall-container" v-if="active === 0 && !showCategoryGoods">
      <view class="waterfall">
        <view class="col">
          <view v-for="(item, i) in leftColumn" :key="i" class="goods-wrapper">
            <my-goods :goods="item" />
          </view>
        </view>
        <view class="col">
          <view v-for="(item, i) in rightColumn" :key="i" class="goods-wrapper">
            <my-goods :goods="item" />
          </view>
        </view>
      </view>
    </view>
      
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {
      sw: 0,
      startList: [
        '发现','新品'  // 将"消息"改为"分类"
      ],
	  // 🔥 新增：类别选项配置
	        categoryOptions: [
	          { name: '推荐', icon: '⭐', value: 'recommend' },
	          { name: '学习', icon: '📖', value: 'study' },
	          { name: '日常', icon: '🔤', value: 'daily' },
	          { name: '其他服务', icon: '⚽', value: 'other' }
	        ],
	        
	        selectedCategoryIndex: 0, // 默认选中推荐
			// 🔥 新增：类别栏滚动控制
			      isCategoryHidden: false,
			      categoryTransform: 'translateY(0)',
      // 🔥 新增：下拉菜单状态
      showCategoryDropdown: false,
      
      // 🔥 新增：是否显示分类商品
      showCategoryGoods: false,
      active: 0,
      queryObj: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 6
      },
      goodsList: [],
      newgoodsList: [],
      total: 0,
      isloading: false,
      followers: [],
      goods_ids: [],
      filteredgoodsList: [],  
          
      goods_info: [],
      userUnreadList: [],
      pageNum: 1,
      pageSize: 6,
      hasMore: true,
      isLoading: false,
      isRefreshing: false,
      
      // 🔥🔥🔥 分类列表(包含图标和数量) 🔥🔥🔥
      categoryList: [
        { name: '学习', icon: '📖', count: 0 },
        { name: '日常', icon: '🔤', count: 0 },
        { name: '其他服务', icon: '⚽', count: 0 },
      ],
      // selectedCategoryIndex: -1, // 🔥 改为 -1，表示未选中任何分类
      categoodsList: [], // 商品列表
      selectedLocation: '闵行', // 🔧 新增：默认位置
      showLocationModal: false, // 🔧 新增：位置选择弹窗状态
      isUsingRandomMode: false, // 🔥 标记是否已切换到随机模式
      loadedGoodsIds: new Set(), // 🔥 记录所有已加载的商品ID（包括推荐+随机）
	  // 🔥 新增：导航栏控制相关
		isNavHidden: false,        // 导航栏是否隐藏
		lastScrollTop: 0,          // 上次滚动位置
		scrollThreshold: 50,       // 触发隐藏的滚动距离阈值(px)
		navTransform: 'translateY(0)', // 导航栏位移
		tabBarInstance: null,
		 // 🔥 新增:最新商品相关数据
		recentGoodsList: [],      // 最新商品列表
		recentPageNum: 1,          // 最新商品页码
		recentPageSize: 6,         // 每页数量
		recentHasMore: true,       // 是否还有更多
		recentIsLoading: false,    // 是否正在加载
		recentLoadedIds: new Set(), // 已加载的商品ID
		// 🔥 新增:侧边菜单相关
		showSideMenu: false, // 控制菜单显示/隐藏
		menuItems: [
		  { name: '我发布的', icon: '📝', route: '/subpkg/publish/publish' },
		  { name: '我买到的', icon: '🛍️', route: '/subpkg/my-bought/my-bought' },
		  { name: '我卖出的', icon: '💰', route: '/subpkg/my-sold/my-sold' },
		  { name: '收藏的商品', icon: '⭐', route: '/subpkg/collect/collect' },
		  { name: '浏览足迹', icon: '👣', route: '/subpkg/history/history' },
		  { name: '评价的商品', icon: '💬', route: '/subpkg/comment/comment' }
		],
		excludeGoodsIds: [], // ✅ 新增：已获取的商品ID列表
    };
  },
	  
  
  methods: {
    ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase']),
	  ...mapMutations('m_posts', ['clearNewPost']),
	  
	  insertNewPost(post) {
	    if (!post) return;
	    
	    // 检查是否已存在（避免重复插入）
	    const exists = this.goodsList.some(p => p.goods_id === post.goods_id);
	    if (exists) {
	      console.log('⚠️ 商品已存在，跳过插入');
	      return;
	    }
	    
	    // 🔥 关键修改：完整初始化帖子对象（与 loadPostList 保持一致）
	    const formattedPost = {
	      ...post,
		  add_time: Date.now()
	      // timeText: this.formatTime(post.created_at || new Date().toISOString()),
	      // images: this.processPostImages(post.images),
	      // 🔥 核心：初始化图片加载状态
	      // imageLoaded: false,
	      // imageError: false
	    };
	    
	    // 插入到列表顶部
	    this.goodsList.unshift(formattedPost);
	    console.log('✅ 新商品已插入列表顶部:', formattedPost.goods_id);
	    
	    // 显示提示
	    uni.showToast({
	      title: '帖子已发布',
	      icon: 'success',
	      duration: 2000
	    });
	  },
	  
    // 🔥 新增:打开侧边菜单
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
	// 🔥 新增：选择类别选项
	    async selectCategoryOption(index) {
	      this.selectedCategoryIndex = index
	      
	      if (index === 0) {
	        // 选择推荐：显示推荐商品
	        this.showCategoryGoods = false
	      } else {
	        // 选择具体分类：加载分类商品
	        this.showCategoryGoods = true
	        this.pageNum = 1
	        this.categoodsList = []
	        this.hasMore = true
	        
	        await this.loadGoodsByCategory()
	        
	      }
	    },
		
	  // 🔥 修改：处理页面滚动
	     handlePageScroll(e) {
	       const scrollTop = e.scrollTop
	       const delta = scrollTop - this.lastScrollTop
	       
	       // 控制顶部导航栏
	       if (delta > 0 && scrollTop > this.scrollThreshold) {
	         if (!this.isNavHidden) {
	           this.isNavHidden = true
	           this.navTransform = 'translateY(-100%)'
	         }
	       } else if (delta < 0) {
	         if (this.isNavHidden) {
	           this.isNavHidden = false
	           this.navTransform = 'translateY(0)'
	         }
	       }
	       
	       // 🔥 新增：控制类别选项栏（只在推荐页显示）
	       if (this.active === 0) {
	         if (scrollTop <= 10) {
	           // 回到顶部：显示类别栏
	           this.isCategoryHidden = false
	           this.categoryTransform = 'translateY(0)'
	         } else if (delta > 0) {
	           // 向下滚动：隐藏类别栏
	           this.isCategoryHidden = true
	           this.categoryTransform = 'translateY(-100%)'
	         }
	       }
	       
	       this.lastScrollTop = scrollTop
	     },
	    
	    // 🔥 修改：重置导航栏状态
	        resetNavBar() {
	          this.isNavHidden = false
	          this.navTransform = 'translateY(0)'
	          this.isCategoryHidden = false
	          this.categoryTransform = 'translateY(0)'
	          this.lastScrollTop = 0
	        },
		
    // 🔥 新增：跳转到消息页面
    gotoMessage() {
		if (!this.openid) {
			uni.switchTab({
		  url: '/pages/my/my'
		})
		return
		}
		
      uni.navigateTo({
        url: '/pages/message/message'
      });
    },
      
    // 🔥 新增：切换分类下拉菜单
    toggleCategoryDropdown() {
      this.showCategoryDropdown = !this.showCategoryDropdown;
    },
      
    // 🔥 新增：关闭分类下拉菜单
    closeCategoryDropdown() {
      this.showCategoryDropdown = false;
    },
    
    // 🔥 新增：从下拉菜单选择分类
   // 🔥 修改：从下拉菜单选择分类
       async selectCategoryFromDropdown(index) {
         this.selectedCategoryIndex = index;
         this.showCategoryDropdown = false;
         this.showCategoryGoods = true;
         
         // 重置分页
         this.pageNum = 1;
         this.categoodsList = [];
         this.hasMore = true;
         
         // 加载分类商品
         await this.loadGoodsByCategory();
         
         uni.showToast({
           title: `已切换到 ${this.currentCategoryName}`,
           icon: 'none',
           duration: 1500
         });
       },
    
    // 🔥🔥🔥 选择分类 🔥🔥🔥
    async selectCategory(index) {
          // 🔥 移除这行判断，允许重复点击同一分类
          // if (this.selectedCategoryIndex === index) return
          
          this.selectedCategoryIndex = index;
          this.pageNum = 1;
          this.categoodsList = [];
          this.hasMore = true;
          this.showCategoryGoods = true;
          
          await this.loadGoodsByCategory();
          
        },
    
    // 🔥🔥🔥 加载分类统计数据 🔥🔥🔥
    async loadCategoryStats() {
      try {
        const { data: res } = await uni.$http.get('/goods/categorystats')
        
        if (res.meta.status === 200) {
          // 更新每个分类的商品数量
          res.message.forEach(stat => {
            const category = this.categoryList.find(c => c.name === stat.category)
            if (category) {
              category.count = stat.count
            }
          })
        }
      } catch (error) {
        console.error('加载分类统计失败:', error)
      }
    },
    
   // 🔥 根据分类加载商品
      // 🔥 根据分类加载商品（随机模式）
        async loadGoodsByCategory() {
          if (this.isLoading || !this.hasMore) return
          
          this.isLoading = true
          
          try {
            const categoryName = this.currentCategoryName
            
            const { data: res } = await uni.$http.get('/goods/categorylist', {
              category: categoryName,
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              excludeGoodsIds: this.excludeGoodsIds.join(','), // ✅ 传递排除列表
              randomMode: 'true' // ✅ 启用随机模式
            })
            
            if (res.meta.status === 200) {
              const newGoods = res.message.goods || []
              
              // ✅ 累积已获取的商品ID
              if (res.message.fetchedGoodsIds && res.message.fetchedGoodsIds.length > 0) {
                this.excludeGoodsIds = [...this.excludeGoodsIds, ...res.message.fetchedGoodsIds]
                console.log(`✅ 累积已获取商品ID: ${this.excludeGoodsIds.length} 个`)
              }
              
              if (this.pageNum === 1) {
                this.categoodsList = newGoods
              } else {
                this.categoodsList = [...this.categoodsList, ...newGoods]
              }
              
              // ✅ 使用后端返回的 hasMore 判断
              this.hasMore = res.message.hasMore === true
              
              console.log(`✅ 加载成功 - 新增: ${newGoods.length}, 总计: ${this.categoodsList.length}`)
            }
          } catch (error) {
            console.error('加载商品失败:', error)
            uni.showToast({
              title: '加载失败',
              icon: 'none'
            })
          } finally {
            this.isLoading = false
          }
        },
    
    // 🔧 新增：显示位置选择器
    showLocationPicker() {
      this.showLocationModal = true
    },

    // 🔧 新增：隐藏位置选择器
    hideLocationPicker() {
      this.showLocationModal = false
    },

    // 🔧 新增：选择位置
    selectLocation(location) {
      this.selectedLocation = location
      this.hideLocationPicker()
      
      uni.showToast({
        title: `已选择${location}校区`,
        icon: 'success',
        duration: 1000
      })
    },
	
	// 🔥 切换分类时重置
	  onCategoryChange(categoryName) {
	    this.currentCategory = categoryName
	    this.pageNum = 1
	    this.categoodsList = []
	    this.excludeGoodsIds = [] // ✅ 重置排除列表
	    this.hasMore = true
	    this.loadGoodsByCategory()
	  },
	  

    // 🔥 加载更多(触底加载) 🔥
    loadMore() {
      if (!this.hasMore || this.isLoading) return
      
      this.pageNum++
      this.loadGoodsByCategory()
    },
    
    // 🔥 下拉刷新 🔥
    async onRefresh() {
      this.isRefreshing = true
      this.pageNum = 1
      this.goodsList = []
      this.hasMore = true
      
      await this.loadCategoryStats()
      await this.loadGoodsByCategory()
    },
    
    // ✅ 格式化时间
    formatTime(timestamp) {
      if (!timestamp) return '';
      const now = Math.floor(Date.now() / 1000);
      const diff = now - timestamp;
      
      if (diff < 60) return '刚刚';
      if (diff < 3600) return Math.floor(diff / 60) + '分钟前';
      if (diff < 86400) return Math.floor(diff / 3600) + '小时前';
      if (diff < 604800) return Math.floor(diff / 86400) + '天前';
      
      const date = new Date(timestamp * 1000);
      return `${date.getMonth() + 1}-${date.getDate()}`;
    },
    
    gotoSearch() {
		if (!this.openid) {
			uni.switchTab({
		  url: '/pages/my/my'
		})
		return
		}
      uni.navigateTo({
        url: '/subpkg/search/search'
      })
    },
    
   async activeChanged(i) {
     // 🔥 新增：如果点击当前已激活的选项，只滚动到顶部
     if (this.active === i) {
       uni.pageScrollTo({
         scrollTop: 0,
         duration: 300  // 300毫秒的平滑动画
       })
       // 重置导航栏状态
       this.resetNavBar()
       console.log(`🔄 重复点击标签 ${i}，滚动到顶部`)
       return
     }
     
     // 🔥 新增：切换不同选项时，先滚动到顶部
     uni.pageScrollTo({
       scrollTop: 0,
       duration: 300
     })
     
     this.resetNavBar() // 切换标签时重置导航栏
     
     try {
       this.active = i;
       
       // 🔥 如果点击的是"新品"标签(index=1)
       if (i === 1) {
         // if (!this.openid) {
         //   this.active = 0;
         //   uni.switchTab({
         //     url: '/pages/my/my'
         //   });
         //   return;
         // }
         
         // 🔥 如果是第一次加载新品,则请求数据
         if (this.recentGoodsList.length === 0) {
           await this.getRecentGoodsList();
         }
         return;
       }
       
       if (i === 2) {
         // 🔥 如果之前已经选中了某个分类，此时应该重置状态，显示分类选择页面
         if (this.showCategoryGoods) {
           this.showCategoryGoods = false
           this.selectedCategoryIndex = 0
           
           uni.showToast({
             title: '请选择分类',
             icon: 'none',
             duration: 1500
           });
         }
         return;
       }
       
       // 🔥 切换到其他标签时，隐藏分类商品并重置选中状态
       this.showCategoryGoods = false
       this.selectedCategoryIndex = 0
       
       if (this.active === 2) {
         // 分类页面不需要特殊处理
         return;
       }
       
       if (this.active === 1) {
         if (!this.openid) {
           this.active = 0
           uni.switchTab({
             url: '/pages/my/my'
           })
           return;
         }
         const queryObj = { code: this.openid };
         const { data: res } = await uni.$http.get('/users/userinfo', queryObj);
         if (res.meta.status === 200) {
           this.updateUserBase(res.message);
         }
         const followingIds = res.message.following_ids;
         if (!Array.isArray(followingIds) || followingIds.length === 0) {
           this.followers = [];
           this.filteredgoodsList = [];
           return;
         }
         const followerPromises = followingIds.map(async (userId) => {
           try {
             const queryObj1 = { code: userId };
             const { data: res1 } = await uni.$http.get('/users/userinfo', queryObj1);
             if (res1.meta.status === 200) {
               return res1.message;
             } else {
               return null;
             }
           } catch (error) {
             return null;
           }
         });
         const followersResults = await Promise.all(followerPromises);
         this.followers = followersResults.filter(f => f !== null);
         this.goods_ids = [];
         
         if (Array.isArray(this.followers) && this.followers.length > 0) {
           this.followers.forEach(follower => {
             if (Array.isArray(follower?.goods_id)) {
               this.goods_ids.push(...follower.goods_id.map(id => String(id)));
             } else if (follower?.goods_id) {
               this.goods_ids.push(String(follower.goods_id));
             }
           });
         } else {
           this.filteredgoodsList = [];
           return;
         }
         if (this.goods_ids.length === 0) {
           this.filteredgoodsList = [];
           return;
         }
         
         const queryObj2 = { goods_id: this.goods_ids };
         const { data: res2 } = await uni.$http.get('/goods/historysearch', queryObj2);
         if (res2.meta.status === 200) {
           this.filteredgoodsList = res2.message;
         } else {
           uni.showToast({
             title: '获取商品信息失败',
             icon: 'none'
           });
           this.filteredgoodsList = [];
         }
       }
     } catch (error) {
       console.error('activeChanged 方法执行出错:', error);
       uni.showToast({
         title: '操作失败，请稍后重试',
         icon: 'none'
       });
     }
   },
    
	 /**
	   * 🔥 获取最新商品列表(72小时内)
	   * @param {Function} cb 回调函数
	   */
	 async getRecentGoodsList(cb) {
	   if (this.recentIsLoading || !this.recentHasMore) {
	     cb && cb();
	     return;
	   }
	   
	   this.recentIsLoading = true;
	   
	   try {
	     const queryObj = {
	       pagesize: this.recentPageSize,
	       excludeIds: JSON.stringify(Array.from(this.recentLoadedIds))
	     };
	     // ✅ 不再传递 pagenum
	     
	     console.log(`📦 加载最新商品 - 已加载:${this.recentLoadedIds.size}件`);
	     
	     const { data: res } = await uni.$http.get('/goods/recentlist', queryObj);
	     
	     if (res.meta.status === 200) {
	       const newGoods = res.message.goods || [];
	       
	       // 🔥 去重（虽然后端已处理，但前端再次确认更安全）
	       const uniqueNewGoods = newGoods.filter(
	         goods => !this.recentLoadedIds.has(goods.goods_id)
	       );
	       
	       // 🔥 添加到列表
	       this.recentGoodsList = [...this.recentGoodsList, ...uniqueNewGoods];
	       
	       // 🔥 记录已加载的ID
	       uniqueNewGoods.forEach(goods => this.recentLoadedIds.add(goods.goods_id));
	       
	       // 🔥 更新是否还有更多
	       this.recentHasMore = res.message.hasMore;
	       
	       console.log(`✅ 成功加载 ${uniqueNewGoods.length} 件最新商品，总计 ${this.recentGoodsList.length} 件`);
	       
	       if (!this.recentHasMore) {
	       }
	     } else {
	       uni.showToast({
	         title: res.meta.msg || '加载失败',
	         icon: 'none'
	       });
	     }
	   } catch (error) {
	     console.error('❌ 获取最新商品失败:', error);
	     uni.showToast({
	       title: '网络错误',
	       icon: 'none'
	     });
	   } finally {
	     this.recentIsLoading = false;
	     cb && cb();
	   }
	 },
	  
    async getGoodsList(cb) {
        this.isloading = true
        
        // 🔥 根据模式选择不同的接口
        const endpoint = this.isUsingRandomMode ? '/goods/list' : '/goods/suggestionsearch'
        const queryObj = {
          openid: this.openid,
          pagenum: this.queryObj.pagenum,
          pagesize: 6
        };
        
        console.log(`调用接口: ${endpoint}, 页码: ${this.queryObj.pagenum}, 模式: ${this.isUsingRandomMode ? '随机' : '推荐'}`)
        
        const { data: res } = await uni.$http.get(endpoint, queryObj)
        this.isloading = false
        cb && cb()
        
        if (res.meta.status !== 200) return uni.$showMsg()
        
        const newGoods = res.message.goods || []
        
        // 🔥 去重逻辑:使用全局的 loadedGoodsIds 去重
        const uniqueNewGoods = newGoods.filter(goods => !this.loadedGoodsIds.has(goods.goods_id))
        
        // 🔥 关键判断:如果推荐模式下没有新商品,切换到随机模式
        if (!this.isUsingRandomMode && uniqueNewGoods.length === 0 && newGoods.length > 0) {
          console.log('⚠️ 推荐商品已全部加载,切换到随机商品模式')
          this.isUsingRandomMode = true
          
          // 🔥 切换模式后立即请求随机商品
          this.queryObj.pagenum = 1 // 重置页码
          await this.getGoodsList(cb)
          return
        }
        
        // 🔥 添加新商品到列表
        this.goodsList = [...this.goodsList, ...uniqueNewGoods]
        
        // 🔥 更新已加载商品ID集合
        uniqueNewGoods.forEach(goods => this.loadedGoodsIds.add(goods.goods_id))
        
        this.total = res.message.total
        
		        if (this.isUsingRandomMode && uniqueNewGoods.length === 0) {
		          uni.showToast({
		            title: '暂无更多商品',
		            icon: 'none',
		            duration: 2000
		          })
		        }
		      },
		
		    async gotoDetail(item) {
		      try {
		      // 1. 先增加浏览次数
		        console.log('📊 增加商品浏览次数:', item.goods_id);
		        const { data: res } = await uni.$http.post('/goods/view', {
		          goods_id: item.goods_id
		          // 可选：添加用户信息用于统计分析
		          // user_openid: this.$store.state.m_user.openid || null
		        });
		    
		        if (res.meta.status === 200) {
		          console.log('✅ 浏览次数增加成功');
		        } else {
		          console.warn('⚠️ 浏览次数增加失败:', res.meta.msg);
		        }
		      } catch (error) {
		        console.error('❌ 浏览次数增加接口错误:', error);
		        // 即使接口失败也继续跳转，不影响用户体验
		      }
		      uni.navigateTo({
		        url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
		      })
		    },
		    
		    async gotoProfile(openid) {
		      const queryObj = { code: openid };
		      const { data: res } = await uni.$http.get('/users/userinfo', queryObj);
		      if (res.meta.status === 200) {
		        const publisher_info = res.message;
		        const payload = encodeURIComponent(JSON.stringify(publisher_info));
		        uni.navigateTo({
		          url: `/subpkg/profile/profile?publisher=${payload}`
		        });
		      }
		    },
		    
		    // ✅ 获取分类图标
		    getCategoryIcon(category) {
		      const iconMap = {
		        '学习': '📖',
		        '日常': '🔤',
		        '其他服务': '⚽'
		      }
		      return iconMap[category] || '🏷️'
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
			  updateTabBar(index) {
			        // #ifdef MP-WEIXIN
			        // 确保是当前激活的页面
			        const pages = getCurrentPages();
			        const currentPage = pages[pages.length - 1];
			        
			        // 使用 this.$mp.page 或 currentPage 来检查
			        if (currentPage && currentPage.route === 'pages/home/home') {
			          // 每次都重新获取 tabBar 实例
			          if (typeof this.$scope.getTabBar === 'function') {
			            const tabBar = this.$scope.getTabBar();
			            if (tabBar) {
			              tabBar.setData({
			                selected: index
			              });
			            }
			          }
			        }
			        // #endif
			      }
		  },
		  
		  computed: {
		    ...mapState('m_user', ['token', 'code', 'userBase', 'openid']),
			...mapState('m_posts', ['newPublishedPost']),
			...mapGetters('m_posts', ['shouldShowNewPost']),
		    // recentGoods() {
		    //   const now = Math.floor(Date.now() / 1000);
		    //   const maxAge = 72 * 3600;
		    
		    //   return (this.goodsList || []).filter(g => {
		    //     if (!g || g.add_time == null) return false;
		    //     const diff = now - Number(g.add_time);
		    //     return Number.isFinite(diff) && diff >= 0 && diff <= maxAge;
		    //   });
		    // },
		    leftColumn()  { return this.goodsList.filter((_, idx) => idx % 2 === 0) },
		    rightColumn() { return this.goodsList.filter((_, idx) => idx % 2 === 1) },
		    recentleftColumn() {
		      return this.recentGoodsList.filter((_, idx) => idx % 2 === 0);
		    },
		    recentrightColumn() {
		      return this.recentGoodsList.filter((_, idx) => idx % 2 === 1);
		    },
		    // 🔥 当前选中的分类名称 🔥
		    // 🔥 修改：当前选中的分类名称
		        currentCategoryName() {
		          if (this.selectedCategoryIndex === 0) return '推荐';
		          return this.categoryOptions[this.selectedCategoryIndex]?.name || '';
		        },
		    // 🔥 瀑布流左列(偶数索引) 🔥
		    cateleftColumn() {
		      return this.categoodsList.filter((_, idx) => idx % 2 === 0)
		    },
		    
		    // 🔥 瀑布流右列(奇数索引) 🔥
		    caterightColumn() {
		      return this.categoodsList.filter((_, idx) => idx % 2 === 1)
		    }
		  },
		  
		  // 🔥 新增：页面生命周期 - 监听滚动
		    onPageScroll(e) {
		      this.handlePageScroll(e)
		    },
			
		  async onLoad(options) {
		    const currentTimestamp = Math.floor(Date.now() / 1000);
		    const sysInfo = uni.getSystemInfoSync()
		    this.sw = sysInfo.windowHeight
		    this.queryObj.query = ''
		    this.queryObj.cid = ''
		    if (this.active === 0) {
		      this.getGoodsList()
		    }
		    
		    if (this.active === 2 && options.category) {
		          const index = this.categoryList.findIndex(item => item.name === options.category);
		          if (index !== -1) {
		            this.selectedCategoryIndex = index;
		            this.showCategoryGoods = true;
		            await this.loadGoodsByCategory();
		          }
		        }
		    // 加载分类统计数据
		    await this.loadCategoryStats()
		    // 加载当前分类的商品
		    // await this.loadGoodsByCategory()
		  },
		  
		  // 🔥 修改：onShow - 重置导航栏
		    async onShow() {
				console.log('📄 cate 页面 onShow 触发');
				if (this.shouldShowNewPost('cate')) {
				  console.log('📥 收到新发布的帖子:', this.newPublishedPost);
				  
				  // 插入到列表
				  this.insertNewPost(this.newPublishedPost);
				  
				  // 清空 Vuex 状态（防止重复显示）
				  this.clearNewPost();
				}
			  this.updateTabBar(1);
		    },
		  
		  onReachBottom() {
			  // 🔥 如果在"新品"标签,加载更多最新商品
			    if (this.active === 1) {
			      if (!this.recentHasMore) {
			        return uni.showToast({
			          title: '暂无更多最新商品',
			          icon: 'none'
			        });
			      }
			      
			      if (this.recentIsLoading) return;
			      
			      this.recentPageNum++;
			      this.getRecentGoodsList();
			      return;
			    }
			    
			    // 🔥 如果在"分类"标签,加载更多分类商品
			    if (this.active === 0 && this.currentCategoryName !== '推荐') {
			      this.loadMore();
			      return;
			    }
				
		    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
		      return uni.$showMsg('数据加载完毕！')
		    if (this.isloading) return
		    this.queryObj.pagenum += 1
		    this.getGoodsList()
		  },
		  	
		  // 🔥 修改：onPullDownRefresh - 重置导航栏
		    onPullDownRefresh() {
		      this.resetNavBar() // 下拉刷新时重置导航栏
		      
			  // 🔥 如果在"新品"标签
			    if (this.active === 1) {
			      this.recentPageNum = 1;
			      this.recentGoodsList = [];
			      this.recentLoadedIds.clear();
			      this.recentHasMore = true;
			      this.getRecentGoodsList(() => uni.stopPullDownRefresh());
			      return;
			    }
			    
			    // 🔥 如果在"分类"标签
			    if (this.active === 0 && this.currentCategoryName !== '推荐') {
			      this.pageNum = 1;
			      this.categoodsList = [];
				  this.excludeGoodsIds = [] // ✅ 重置排除列表
			      this.hasMore = true;
			      this.loadGoodsByCategory().then(() => uni.stopPullDownRefresh());
			      return;
			    }
				
		      this.queryObj.pagenum = 1
		      this.total = 0
		      this.isloading = false
		      this.goodsList = []
		      this.loadedGoodsIds.clear()
		      this.isUsingRandomMode = false
		      this.getGoodsList(() => uni.stopPullDownRefresh())
		    }
		};
		</script>
		
		<style lang="scss">
		/* ===== 全局样式优化 ===== */
		page {
		  background-color: #f5f7fa;
		}
		
		/* ===== 🔥 顶部导航栏 - 添加动画效果 ===== */
		.top-nav-bar {
		  position: sticky;
		  top: 0;
		  z-index: 999;
		  display: flex;
		  align-items: center;
		  justify-content: space-between;
		  padding: 12rpx 24rpx;
		  background: #ffffff;
		  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
		
		 /* 🔥 关键：添加过渡动画 */
		  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		  /* 🔥 隐藏状态 */
		    &.nav-hidden {
		      box-shadow: none;
		    }
		}
		
		/* 🔥🔥🔥 类别选项栏样式 🔥🔥🔥 */
		.category-nav-bar {
		  position: sticky;
		  top: 88rpx; /* 紧贴顶部导航栏下方 */
		  z-index: 998;
		  background: #ffffff;
		  display: flex;
		  justify-content: space-around;
		  align-items: center;
		  padding: 10rpx 14rpx;
		  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
		  // box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
		  // transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		  /* 平滑过渡动画 */
		  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
		              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		  &.category-hidden {
		    box-shadow: none;
		  }
		}
		
		.category-scroll {
		  width: 100%;
		  white-space: nowrap;
		}
		
		.category-list {
		  display: inline-flex;
		  padding: 10rpx 16rpx;
		  gap: 24rpx;
		}
		
		.category-option {
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
		  min-width: 120rpx;
		  padding: 10rpx 16rpx;
		  background: #fff;
		  border-radius: 20rpx;
		  transition: all 0.3s ease;
		  border: 2rpx solid transparent;
		
		  // .category-icon {
		  //   font-size: 28rpx;
		  //   margin-bottom: 8rpx;
		  // }
		
		  .category-label {
		    font-size: 28rpx;
		    color: #666;
		    font-weight: 500;
		    white-space: nowrap;
		  }
		
		  &.active {
		    // background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
		    // border-color: #ff6b6b;
		    // box-shadow: 0 4rpx 12rpx rgba(255, 107, 107, 0.3);
			font-size: 30rpx;
			
		    .category-label {
		      color: #000;
		      font-weight: 600;
			  font-size: 30rpx;
		    }
		  }
		
		  &:active {
		    transform: scale(0.95);
			color: #000;
		  }
		}
		
		/* 响应式优化 */
		@media screen and (max-width: 375px) {
		  .category-option {
		    min-width: 60rpx;
		    padding: 10rpx 16rpx;
		
		    // .category-icon {
		    //   font-size: 36rpx;
		    // }
		
		    .category-label {
		      font-size: 28rpx;
		    }
		  }
		}
		
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
		
		/* 🔥 中间标签区域 */
		.nav-tabs {
		  flex: 1;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  gap: 40rpx;
		  padding: 0 20rpx;
		}
		
		.nav-tab-item {
		  position: relative;
		  padding: 8rpx 20rpx;
		  transition: all 0.3s ease;
		
		  .tab-label {
		    font-size: 30rpx;
		    color: #666666;
		    font-weight: 500;
		    transition: all 0.3s ease;
		  }
		
		  &.active {
		    .tab-label {
		      color: #000;
		      font-weight: 700;
		      font-size: 30rpx;
		    }
		
		    &::after {
		      // content: '';
		      // position: absolute;
		      // bottom: -4rpx;
		      // left: 50%;
		      // transform: translateX(-50%);
		      // width: 40rpx;
		      // height: 6rpx;
		      // background: #FFE4B5;
		      // border-radius: 3rpx;
		    }
		  }
		
		  &:active {
		    transform: scale(0.95);
		  }
		}
		
		/* 🔥 搜索图标按钮 */
		.search-btn {
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
		
		  .search-icon {
		    font-size: 36rpx;
		  }
		}
		
		/* 🔥 分类页面样式 */
		.category-page {
		  padding: 24rpx;
		  background: #f5f7fa;
		  min-height: 100vh;
		}
		
		.category-grid {
		  display: grid;
		  grid-template-columns: repeat(2, 1fr);
		  gap: 24rpx;
		  padding: 0 16rpx;
		}
		
		.category-item {
		  position: relative;
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
		  padding: 40rpx 24rpx;
		  background: #ffffff;
		  border-radius: 24rpx;
		  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
		  transition: all 0.3s ease;
		  border: 4rpx solid transparent;
		
		  &:active {
		    transform: scale(0.98);
		  }
		
		  &.active {
		    background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
		    border-color: #C00000;
		    box-shadow: 0 6rpx 20rpx rgba(192, 0, 0, 0.15);
		
		    .category-name {
		      color: #C00000;
		      font-weight: 700;
		    }
		
		    .category-count {
		      color: #C00000;
		    }
		  }
		
		  .category-icon {
		    font-size: 64rpx;
		    margin-bottom: 20rpx;
		  }
		
		  .category-name {
		    font-size: 28rpx;
		    color: #333;
		    font-weight: 600;
		    margin-bottom: 8rpx;
		  }
		
		  .category-count {
		    font-size: 24rpx;
		    color: #999;
		  }
		
		  .check-indicator {
		    position: absolute;
		    top: 16rpx;
		    right: 16rpx;
		    width: 40rpx;
		    height: 40rpx;
		    background: #C00000;
		    color: #fff;
		    border-radius: 50%;
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    font-size: 24rpx;
		    font-weight: bold;
		  }
		}
		
		/* 🔥 分类下拉菜单 */
		.category-dropdown {
		  position: fixed;
		  top: 0;
		  left: 0;
		  right: 0;
		  bottom: 0;
		  background: rgba(0, 0, 0, 0.3);
		  z-index: 9999;
		  display: flex;
		  align-items: flex-start;
		  padding-top: 96rpx;
		
		  .dropdown-content {
		    width: 92%;
		    max-width: 680rpx;
		    max-height: 45vh;
		    margin: 0 auto;
		    background: #fff;
		    border-radius: 24rpx;
		    overflow: hidden;
		    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
		    animation: slideDown 0.25s ease;
		  }
		
		  @keyframes slideDown {
		    from {
		      transform: translateY(-20rpx);
		      opacity: 0;
		    }
		    to {
		      transform: translateY(0);
		      opacity: 1;
		    }
		  }
		
		  .dropdown-header {
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    padding: 16rpx 24rpx;
		    background: linear-gradient(135deg, #C00000 0%, #C00000 100%);
		    box-shadow: 0 2rpx 8rpx rgba(192, 0, 0, 0.1);
		
		    .dropdown-title {
		      font-size: 28rpx;
		      font-weight: bold;
		      color: #fff;
		    }
		
		    .close-btn {
		      font-size: 36rpx;
		      color: #fff;
		      line-height: 1;
		      padding: 8rpx;
		    }
		  }
		
		  .dropdown-grid-container {
		    max-height: calc(45vh - 56rpx);
		    padding: 16rpx 12rpx;
		  }
		
		  .dropdown-grid {
		    display: grid;
		    grid-template-columns: repeat(3, 1fr);
		    gap: 12rpx;
		  }
		
		  .grid-item {
		    position: relative;
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		    justify-content: center;
		    padding: 20rpx 12rpx;
		    background: #f8f8f8;
		    border-radius: 16rpx;
		    border: 2rpx solid transparent;
		    transition: all 0.3s ease;
		    min-height: 140rpx;
		
		    &:active {
		      transform: scale(0.96);
		    }
		
		    &.active {
		      background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
		      border-color: #C00000;
		      box-shadow: 0 4rpx 12rpx rgba(192, 0, 0, 0.15);
		
		      .item-name {
		        color: #C00000;
		        font-weight: 700;
		      }
		
		      .item-count {
		        color: #C00000;
		      }
		    }
		
		    .item-icon {
		      font-size: 48rpx;
		      margin-bottom: 8rpx;
		    }
		
		    .item-name {
		      font-size: 24rpx;
		      color: #333;
		      font-weight: 600;
		      text-align: center;
		      line-height: 1.3;
		      margin-bottom: 4rpx;
		      max-width: 100%;
		      overflow: hidden;
		      text-overflow: ellipsis;
		      white-space: nowrap;
		    }
		
		    .item-count {
		      font-size: 20rpx;
		      color: #999;
		
		      &::after {
		        content: '件';
		      }
		    }
		
		    .check-mark {
		      position: absolute;
		      top: 8rpx;
		      right: 8rpx;
		      width: 32rpx;
		      height: 32rpx;
		      background: #C00000;
		      color: #fff;
		      border-radius: 50%;
		      display: flex;
		      align-items: center;
		      justify-content: center;
		      font-size: 20rpx;
		      font-weight: bold;
		      box-shadow: 0 2rpx 8rpx rgba(192, 0, 0, 0.3);
		    }
		  }
		}
		
		/* 🔥 响应式调整 - 小屏幕改为2列 */
		@media screen and (max-width: 375px) {
		  .category-dropdown {
		    .dropdown-grid {
		      grid-template-columns: repeat(2, 1fr);
		      gap: 10rpx;
		    }
		
		    .grid-item {
		      min-height: 130rpx;
		      
		      .item-icon {
		        font-size: 44rpx;
		      }
		      
		      .item-name {
		        font-size: 22rpx;
		      }
		    }
		  }
		}
		
		/* 🔥 分类商品展示区域 */
		.category-header {
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  padding: 24rpx;
		  background: #fff;
		  margin: 16rpx 16rpx 0;
		  border-radius: 20rpx;
		  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
		
		  .category-title {
		    font-size: 36rpx;
		    font-weight: bold;
		    color: #333;
		  }
		
		  .goods-count {
		    font-size: 26rpx;
		    color: #999;
		  }
		}
		
		/* ===== 瀑布流优化 ===== */
		.waterfall-container {
		  background: #f5f7fa;
		  min-height: 100vh;
		}
		
		.waterfall {
		  display: flex;
		  justify-content: space-between;
		  padding: 16rpx;
		  box-sizing: border-box;
		}
		
		.col {
		  width: 48%;
		  display: flex;
		  flex-direction: column;
		}
		
		.goods-wrapper {
		  margin-bottom: 16rpx;
		  border-radius: 16rpx;
		  overflow: hidden;
		  background: #fff;
		  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
		  transition: all 0.3s ease;
		
		  &:active {
		    transform: translateY(-4rpx);
		    box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
		  }
		}
		
		/* 🔥 空状态 🔥 */
		.empty-state {
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
		  padding: 200rpx 0;
		
		  .empty-icon {
		    font-size: 120rpx;
		    margin-bottom: 24rpx;
		    opacity: 0.5;
		  }
		
		  .empty-text {
		    font-size: 28rpx;
		    color: #999;
		  }
		
		  .empty-tip {
		    font-size: 26rpx;
		    color: #999;
		    margin-top: 12rpx;
		  }
		}
		
		/* 🔥 加载状态 🔥 */
		.loading-state {
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  padding: 40rpx 0;
		
		  .loading-text {
		    font-size: 26rpx;
		    color: #999;
		  }
		}
		</style>