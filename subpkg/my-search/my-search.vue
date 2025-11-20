<template>
  <view class="search-page">
    <!-- 🔥 顶部搜索栏 -->
    <view class="search-header">
      <view class="search-bar">
        <!-- 返回按钮 -->
        <view class="back-btn" @click="goBack">
          <uni-icons type="back" size="22" color="#333"></uni-icons>
        </view>
        
        <!-- 搜索输入框 -->
        <view class="search-input-wrapper">
          <uni-icons type="search" size="18" color="#999"></uni-icons>
          <input 
            class="search-input" 
            v-model="searchKeyword"
            :placeholder="activeSubTab === 0 ? '搜索我的帖子' : '搜索我的商品'" 
            confirm-type="search"
            @confirm="handleSearch"
          />
          <!-- 清除按钮 -->
          <view 
            class="clear-btn" 
            v-if="searchKeyword"
            @click="clearSearch"
          >
            <uni-icons type="clear" size="16" color="#999"></uni-icons>
          </view>
        </view>
        
        <!-- 搜索按钮 -->
        <view class="search-btn" @click="handleSearch">
          <text>搜索</text>
        </view>
      </view>
    </view>

    <!-- 🔥 搜索结果区域 -->
    <view class="search-content" v-if="hasSearched">
      <!-- 分类选项卡 -->
      <view class="category-tabs">
        <view class="tabs-left">
          <!-- 树洞模式 -->
          <template v-if="activeSubTab === 0">
            <view 
              class="tab-item"
              :class="{ active: activeTab === 0 }"
              @click="switchTab(0)"
            >
              <text class="tab-text">动态</text>
              <text class="tab-count" v-if="filteredPostList.length > 0">({{ filteredPostList.length }})</text>
              <view class="tab-indicator" v-if="activeTab === 0"></view>
            </view>
            
            <view 
              class="tab-item"
              :class="{ active: activeTab === 1 }"
              @click="switchTab(1)"
            >
              <text class="tab-text">赞/收藏</text>
              <text class="tab-count" v-if="filteredPostLikeList.length > 0">({{ filteredPostLikeList.length }})</text>
              <view class="tab-indicator" v-if="activeTab === 1"></view>
            </view>
            
            <view 
              class="tab-item"
              :class="{ active: activeTab === 2 }"
              @click="switchTab(2)"
            >
              <text class="tab-text">私密</text>
              <text class="tab-count" v-if="filteredPrivateList.length > 0">({{ filteredPrivateList.length }})</text>
              <view class="tab-indicator" v-if="activeTab === 2"></view>
            </view>
          </template>
          
          <!-- 集市模式 -->
          <template v-else>
            <view 
              class="tab-item"
              :class="{ active: activeTab === 0 }"
              @click="switchTab(0)"
            >
              <text class="tab-text">动态</text>
              <text class="tab-count" v-if="filteredGoodsList.length > 0">({{ filteredGoodsList.length }})</text>
              <view class="tab-indicator" v-if="activeTab === 0"></view>
            </view>
            
            <view 
              class="tab-item"
              :class="{ active: activeTab === 1 }"
              @click="switchTab(1)"
            >
              <text class="tab-text">赞/收藏</text>
              <text class="tab-count" v-if="filteredGoodsCollectList.length > 0">({{ filteredGoodsCollectList.length }})</text>
              <view class="tab-indicator" v-if="activeTab === 1"></view>
            </view>
          </template>
        </view>
        
        <!-- 树洞/集市切换按钮 -->
        <view class="toggle-btn" @click="toggleSubTab">
          <text class="toggle-text">{{ activeSubTab === 0 ? '树洞' : '集市' }}</text>
          <text class="switch-icon">⇄</text>
        </view>
      </view>

      <!-- 🔥 内容区域 -->
      <!-- 树洞帖子列表 -->
      <scroll-view 
        class="post-list" 
        scroll-y
        v-if="activeSubTab === 0"
      >
        <!-- 有结果 -->
        <view v-if="currentList.length > 0">
          <view 
            class="post-item"
            v-for="post in currentList"
            :key="post.id"
          >
            <view class="post-content" @click="gotoPostDetail(post)">
              <rich-text 
                class="content-text" 
                :nodes="highlightKeyword(post.content)"
              ></rich-text>
            </view>
            
            <view class="post-images" v-if="post.images && post.images.length > 0" @click="gotoPostDetail(post)">
              <image
                v-for="(img, index) in post.images.slice(0, 3)"
                :key="index"
                :src="img"
                mode="widthFix"
                class="post-image"
              ></image>
              <view class="more-images" v-if="post.images.length > 3">
                <text>+{{ post.images.length - 3 }}</text>
              </view>
            </view>
            
            <view class="post-footer">
              <view class="left-info">
                <text class="post-time">{{ formatTime(post.created_at) }}</text>
              </view>
              
              <view class="post-stats">
                <!-- 点赞数 -->
                <view class="stat-item" @click.stop="toggleLike(post)">
                  <image 
                    class="stat-icon-img" 
                    :src="post.isLiked ? iconLikedUrl : iconLikeUrl" 
                    mode="aspectFit"
                  ></image>
                  <text class="stat-count">{{ post.like_count }}</text>
                </view>
                
                <!-- 评论数 -->
                <view class="stat-item">
                  <image 
                    class="stat-icon-img" 
                    :src="iconCommentUrl" 
                    mode="aspectFit"
                  ></image>
                  <text class="stat-count">{{ post.comment_count }}</text>
                </view>
              </view>
            </view>
          </view>
          
          <!-- 没有更多 -->
          <view class="no-more">
            <text>没有更多了</text>
          </view>
        </view>
        
        <!-- 空状态 -->
        <view class="empty-state" v-else>
          <text class="empty-icon">📭</text>
          <text class="empty-text">没有找到相关帖子</text>
        </view>
      </scroll-view>
      
      <!-- 集市商品瀑布流 -->
      <scroll-view 
        class="goods-scroll" 
        scroll-y
        v-else
      >
        <view class="waterfall-container" v-if="currentGoodsList.length > 0">
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
          
          <!-- 没有更多 -->
          <view class="no-more">
            <text>没有更多了</text>
          </view>
        </view>
        
        <!-- 空状态 -->
        <view class="empty-state" v-else>
          <text class="empty-icon">🛒</text>
          <text class="empty-text">没有找到相关商品</text>
        </view>
      </scroll-view>
    </view>

    <!-- 🔥 未搜索状态 -->
    <view class="search-tips" v-else>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      // 搜索关键词
      searchKeyword: '',
      
      // 是否已搜索
      hasSearched: false,
      
      // 当前激活的选项卡（0:动态 1:赞/收藏 2:私密）
      activeTab: 0,
      
      // 🔥 新增：子选项卡（0:树洞 1:集市）
      activeSubTab: 0,
      
      // 🔥 原始数据列表
      postList: [],           // 我发布的帖子
      PostLikeList: [],       // 我点赞的帖子
      privateList: [],        // 私密帖子
      goodsList: [],          // 我发布的商品
      goodsCollectList: [],   // 我收藏的商品
      
      // 🔥 筛选后的列表
      filteredPostList: [],        // 筛选后的动态
      filteredPostLikeList: [],    // 筛选后的赞/收藏
      filteredPrivateList: [],     // 筛选后的私密
      filteredGoodsList: [],       // 筛选后的发布商品
      filteredGoodsCollectList: [], // 筛选后的收藏商品
      
      // 图标URL
      iconLikeUrl: 'https://img.xinshi00.com/label/like.png',
      iconLikedUrl: 'https://img.xinshi00.com/label/liked.png',
      iconCommentUrl: 'https://img.xinshi00.com/label/chat.png',
    }
  },
  
  async onLoad() {
    // 加载所有数据
    await this.loadMyPosts()
    await this.loadMyPostLike()
    await this.loadMyPrivatePosts()
    await this.loadMyGoods()
    await this.loadMyGoodsCollect()
  },
  
  computed: {
    ...mapState('m_user', ['token', 'code', 'userBase', 'openid']),
    
    // 🔥 当前显示的帖子列表
    currentList() {
      if (this.activeSubTab === 0) {
        // 树洞模式
        switch(this.activeTab) {
          case 0: return this.filteredPostList
          case 1: return this.filteredPostLikeList
          case 2: return this.filteredPrivateList
          default: return []
        }
      }
      return []
    },
    
    // 🔥 当前显示的商品列表
    currentGoodsList() {
      if (this.activeSubTab === 1) {
        // 集市模式
        switch(this.activeTab) {
          case 0: return this.filteredGoodsList
          case 1: return this.filteredGoodsCollectList
          default: return []
        }
      }
      return []
    },
    
    // 🔥 瀑布流左列
    leftColumn() {
      return this.currentGoodsList.filter((_, idx) => idx % 2 === 0)
    },
    
    // 🔥 瀑布流右列
    rightColumn() {
      return this.currentGoodsList.filter((_, idx) => idx % 2 === 1)
    }
  },
  
  methods: {
    
	
	  // 🔥 新增：高亮关键词方法
	  highlightKeyword(text) {
	    if (!this.searchKeyword || !text) return text
	    
	    const keyword = this.searchKeyword.trim().toLowerCase()
	    
	    // 将关键词拆分成单个字符
	    const chars = keyword.split('').filter(char => char.trim())
	    
	    if (chars.length === 0) return text
	    
	    // 构建正则表达式，匹配任意一个字符
	    const pattern = chars.map(char => {
	      // 转义正则表达式特殊字符
	      return char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	    }).join('|')
	    
	    const regex = new RegExp(`(${pattern})`, 'gi')
	    
	    // 替换匹配到的字符为高亮样式
	    return text.replace(regex, '<span style="color: #ff4757; background-color: #fff2f0; padding: 2rpx 6rpx; border-radius: 6rpx; font-weight: 600;">$1</span>')
	  },
	  
    // 加载我收藏的商品
    async loadMyGoodsCollect() {
      const ids = Array.isArray(this.userBase?.goods_collects) ? this.userBase.goods_collects : []
      console.log(ids)
      
      if (ids.length === 0) {
        this.goodsCollectList = []
        return
      }
      
      const queryObj = { goods_id: ids }
      
      const { data: collectData } = await uni.$http.get('/goods/historysearch', queryObj)
      
      if (collectData.meta.status === 200 && Array.isArray(collectData.message)) {
        this.goodsCollectList = [...this.goodsCollectList, ...collectData.message]
      }
    },
    
    // 加载我发布的商品
    async loadMyGoods() {
      const ids = Array.isArray(this.userBase?.goods_id) ? this.userBase.goods_id : []
      if (ids.length === 0) {
        this.goodsList = []
        return
      }
      
      const { data: res } = await uni.$http.get('/goods/publishsearch', {
        goods_id: ids
      })
      
      if (res?.meta?.status === 200 && Array.isArray(res?.message)) {
        this.goodsList = [...this.goodsList, ...res.message]
      }
    },
    
    processImages(images) {
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
    
    // 🔥 加载私密的树洞帖子
    async loadMyPrivatePosts() {
      const { data: res } = await uni.$http.get('/users/private-posts', {
        user_openid: this.userBase.openid,
        viewer_openid: this.userBase.openid,
        type: 0,
      })
      
      if (res.meta.status === 200) {
        const newPosts = res.message.list.map(post => ({
          ...post,
          images: this.processImages(post.images)
        }))
        
        this.privateList = newPosts
      }
    },
    
    // 🔥 加载点赞的帖子
    async loadMyPostLike() {
      const { data: res } = await uni.$http.get('/posts/my-like', {
        openid: this.userBase.openid,
      })
      
      if (res.meta.status === 200) {
        const newPosts = res.message.list.map(post => ({
          ...post,
          images: this.processImages(post.images)
        }))
        
        this.PostLikeList = newPosts
      }
    },
    
    // 🔥 加载我发布的帖子
    async loadMyPosts() {
      const { data: res } = await uni.$http.get('/users/posts', {
        user_openid: this.userBase.openid,
        viewer_openid: this.userBase.openid || '',
        type: 0,
      })
      
      if (res.meta.status === 200) {
        const newPosts = res.message.list.map(post => ({
          ...post,
          images: this.processImages(post.images),
          isLiked: post.isLiked || false,
        }))
        
        this.postList = newPosts
      }
    },
    
    // 🔥 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 🔥 清除搜索
    clearSearch() {
      this.searchKeyword = ''
      this.hasSearched = false
      this.resetSearchResults()
    },
    
    // 🔥 切换树洞/集市
    toggleSubTab() {
      this.activeSubTab = this.activeSubTab === 0 ? 1 : 0
      this.activeTab = 0 // 切换时重置为第一个tab
      
      // 重新执行搜索
      if (this.hasSearched && this.searchKeyword.trim()) {
        this.filterAllLists()
      }
    },
    
    // 🔥 执行搜索 - 核心方法
    handleSearch() {
      if (!this.searchKeyword.trim()) {
        uni.showToast({
          title: '请输入搜索关键词',
          icon: 'none'
        })
        return
      }
      
      this.hasSearched = true
      
      // 🔥 执行所有列表的筛选
      this.filterAllLists()
      
      // 显示搜索结果提示
      let totalCount = 0
      if (this.activeSubTab === 0) {
        totalCount = this.filteredPostList.length + 
                    this.filteredPostLikeList.length + 
                    this.filteredPrivateList.length
      } else {
        totalCount = this.filteredGoodsList.length + 
                    this.filteredGoodsCollectList.length
      }
      
      if (totalCount === 0) {
        uni.showToast({
          title: this.activeSubTab === 0 ? '未找到相关帖子' : '未找到相关商品',
          icon: 'none'
        })
      }
    },
    
    // 🔥 筛选所有列表
    filterAllLists() {
      const keyword = this.searchKeyword.trim().toLowerCase()
      
      // 筛选帖子列表
      this.filteredPostList = this.postList.filter(post => {
        return this.matchKeyword(post, keyword)
      })
      
      this.filteredPostLikeList = this.PostLikeList.filter(post => {
        return this.matchKeyword(post, keyword)
      })
      
      this.filteredPrivateList = this.privateList.filter(post => {
        return this.matchKeyword(post, keyword)
      })
      
      // 🔥 筛选商品列表
      this.filteredGoodsList = this.goodsList.filter(goods => {
        return this.matchGoodsKeyword(goods, keyword)
      })
      
      this.filteredGoodsCollectList = this.goodsCollectList.filter(goods => {
        return this.matchGoodsKeyword(goods, keyword)
      })
      
      console.log('筛选结果:', {
        动态: this.filteredPostList.length,
        赞收藏: this.filteredPostLikeList.length,
        私密: this.filteredPrivateList.length,
        发布商品: this.filteredGoodsList.length,
        收藏商品: this.filteredGoodsCollectList.length
      })
    },
    
    // 🔥 修改：判断帖子是否匹配关键词（改为逐字匹配）
    matchKeyword(post, keyword) {
      // 将关键词拆分成单个字符
      const chars = keyword.split('').filter(char => char.trim())
      
      // 检查内容
      if (post.content) {
        const contentLower = post.content.toLowerCase()
        // 只要有任意一个字符匹配就返回 true
        for (let char of chars) {
          if (contentLower.includes(char)) {
            return true
          }
        }
      }
      
      // 检查标题（如果有）
      if (post.title) {
        const titleLower = post.title.toLowerCase()
        for (let char of chars) {
          if (titleLower.includes(char)) {
            return true
          }
        }
      }
      
      return false
    },
    
    // 🔥 修改：判断商品是否匹配关键词（改为逐字匹配）
    matchGoodsKeyword(goods, keyword) {
      // 将关键词拆分成单个字符
      const chars = keyword.split('').filter(char => char.trim())
      
      // 检查商品名称
      if (goods.goods_name) {
        const nameLower = goods.goods_name.toLowerCase()
        // 只要有任意一个字符匹配就返回 true
        for (let char of chars) {
          if (nameLower.includes(char)) {
            return true
          }
        }
      }
      
      return false
    },
    
    // 🔥 切换选项卡
    switchTab(index) {
      this.activeTab = index
    },
    
    // 🔥 重置搜索结果
    resetSearchResults() {
      this.filteredPostList = []
      this.filteredPostLikeList = []
      this.filteredPrivateList = []
      this.filteredGoodsList = []
      this.filteredGoodsCollectList = []
    },
    
    // 🔥 点赞/取消点赞
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
          // 🔥 更新当前列表中的帖子状态
          const updatePost = (list) => {
            const index = list.findIndex(p => p.id === post.id)
            if (index !== -1) {
              list[index].isLiked = !list[index].isLiked
              list[index].like_count = res.message.like_count || 0
              this.$set(list, index, {...list[index]})
            }
          }
          
          // 更新所有可能包含该帖子的列表
          updatePost(this.filteredPostList)
          updatePost(this.filteredPostLikeList)
          updatePost(this.filteredPrivateList)
          updatePost(this.postList)
          updatePost(this.PostLikeList)
          updatePost(this.privateList)
        }
      } catch (error) {
        console.error('点赞失败:', error)
        uni.showToast({
          title: '操作失败',
          icon: 'none'
        })
      }
    },
    
    // 🔥 格式化时间
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
    
    // 🔥 跳转到帖子详情
    gotoPostDetail(post) {
      if (post.images && post.images.length > 0) {
        uni.navigateTo({
          url: `/subpkg/topic-detail/topic-detail?id=${post.id}`
        })
      } else {
        uni.navigateTo({
          url: `/subpkg/post-detail/post-detail?id=${post.id}`
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 🔥 搜索头部 */
.search-header {
  background-color: #fff;
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.back-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 18px;
  padding: 0 15px;
  height: 36px;
  gap: 8px;
}

.search-input {
  flex: 1;
  font-size: 14px;
  height: 100%;
}

.clear-btn {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn {
  padding: 8px 16px;
  background-color: #007aff;
  border-radius: 18px;
  
  text {
    color: #fff;
    font-size: 14px;
  }
}

/* 🔥 分类选项卡 */
.category-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 20px;
  border-bottom: 1px solid #f0f0f0;
}

.tabs-left {
  display: flex;
  flex: 1;
}

.tab-item {
  position: relative;
  padding: 12px 0;
  margin-right: 24px;
  display: flex;
  align-items: center;
  gap: 4px;
  
  .tab-text {
    font-size: 15px;
    color: #999;
    transition: all 0.3s;
  }
  
  .tab-count {
    font-size: 12px;
    color: #999;
  }
  
  .tab-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #007aff;
    border-radius: 2px;
  }
  
  &.active {
    .tab-text {
      color: #333;
      font-weight: 600;
    }
    
    .tab-count {
      color: #007aff;
    }
  }
}

/* 🔥 树洞/集市切换按钮 */
.toggle-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background-color: #f5f5f5;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:active {
    background-color: #e0e0e0;
  }
  
  .toggle-text {
    font-size: 13px;
    color: #666;
    font-weight: 500;
  }
  
  .switch-icon {
    font-size: 16px;
    color: #007aff;
  }
}

/* 🔥 帖子列表 */
.post-list {
  height: calc(100vh - 120px);
  padding: 24rpx;
}

.post-item {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
  
  &:active {
    background-color: #f9f9f9;
  }
}

.post-content {
  margin-bottom: 16rpx;
  
  .content-text {
    font-size: 28rpx;
    color: #333333;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}

.post-images {
  display: flex;
  gap: 12rpx;
  margin-bottom: 16rpx;
  
  .post-image {
    width: 200rpx;
    height: 200rpx;
    border-radius: 12rpx;
    background-color: #f0f0f0;
  }
  
  .more-images {
    width: 200rpx;
    height: 200rpx;
    border-radius: 12rpx;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 28rpx;
  }
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16rpx;
  border-top: 1rpx solid #f0f0f0;
  
  .left-info {
    display: flex;
    align-items: center;
    gap: 16rpx;
    
    .post-time {
      font-size: 24rpx;
      color: #999999;
    }
  }
  
  .post-stats {
    display: flex;
    gap: 32rpx;
    
    .stat-item {
      display: flex;
      align-items: center;
      gap: 8rpx;
      font-size: 24rpx;
      color: #999999;
      
      .stat-icon-img {
        width: 32rpx;
        height: 32rpx;
      }
      
      .stat-count {
        font-size: 24rpx;
        color: #999999;
      }
    }
  }
}

/* 🔥 商品瀑布流 */
.goods-scroll {
  height: calc(100vh - 120px);
}

.waterfall-container {
  background: #f5f7fa;
  min-height: 100%;
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

/* 🔥 加载状态 */
.no-more {
  text-align: center;
  padding: 40rpx 0;
  font-size: 26rpx;
  color: #999999;
}

/* 🔥 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 200rpx 0;
  
    .empty-icon {
      font-size: 100rpx;
      margin-bottom: 20rpx;
    }
    
    .empty-text {
      font-size: 28rpx;
      color: #999999;
    }
  }
  
  /* 🔥 搜索提示区域 */
  .search-tips {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 200rpx 0;
    
    .tips-icon {
      font-size: 120rpx;
      margin-bottom: 30rpx;
    }
    
    .tips-text {
      font-size: 28rpx;
      color: #999999;
    }
    
    .tips-list {
      margin-top: 60rpx;
      padding: 0 60rpx;
      width: 100%;
      box-sizing: border-box;
      
      .tips-title {
        font-size: 26rpx;
        color: #666;
        margin-bottom: 20rpx;
      }
      
      .tips-item {
        display: flex;
        align-items: center;
        padding: 20rpx;
        background-color: #fff;
        border-radius: 12rpx;
        margin-bottom: 16rpx;
        
        &:active {
          background-color: #f5f5f5;
        }
        
        .item-icon {
          font-size: 32rpx;
          margin-right: 16rpx;
        }
        
        .item-text {
          font-size: 28rpx;
          color: #333;
        }
      }
    }
  }
  
  /* 🔥 内容区域 */
  .search-content {
    min-height: calc(100vh - 120px);
  }
  
  /* 🔥 响应式优化 */
  @media screen and (max-width: 375px) {
    .post-item {
      padding: 20rpx;
    }
    
    .post-images .post-image {
      width: 180rpx;
      height: 180rpx;
    }
  }
  
  /* 🔥 滚动条样式 */
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }
  
  /* 🔥 过渡动画 */
  .post-item,
  .goods-wrapper {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* 🔥 点击反馈 */
  .stat-item:active {
    opacity: 0.6;
  }
  
  .tab-item:active {
    opacity: 0.7;
  }
  
  .back-btn:active,
  .clear-btn:active {
    opacity: 0.5;
  }
  
  .search-btn:active {
    opacity: 0.8;
    transform: scale(0.95);
  }
  </style>


  
