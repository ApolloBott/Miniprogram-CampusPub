<template>
  <view class="history-page">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="header-title">历史浏览</text>
      <text class="clear-btn" @click="clearHistory" v-if="activeTab === 0">清空</text>
    </view>

    <!-- 选项卡 -->
    <view class="tabs-container">
      <view 
        class="tab-item" 
        v-for="(tab, index) in tabsWithCount" 
        :key="index"
        :class="{ active: activeTab === index }"
        @click="switchTab(index)"
      >
        <view class="tab-content">
          <text class="tab-name">{{ tab.name }}</text>
          <text class="tab-count">{{ tab.count }}</text>
        </view>
        <view v-if="activeTab === index" class="tab-indicator"></view>
      </view>
    </view>

    <!-- 商品列表 -->
    <scroll-view scroll-y class="goods-list">
      <view class="goods-grid">
        <view 
          class="goods-item" 
          v-for="item in currentGoodsList" 
          :key="item.goods_id"
          @click="gotoDetail(item.goods_id)"
        >
          <image :src="item.goods_big_logo" class="goods-image" mode="aspectFill"></image>
          <view class="goods-price">
            <text class="price-symbol">¥</text>
            <text class="price-number">{{ item.goods_price }}</text>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="currentGoodsList.length === 0" class="empty-state">
        <text class="empty-text">暂无{{ tabs[activeTab].name }}记录</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      activeTab: 0,
      tabs: [
        { name: '我浏览的', type: 'viewed' },
        { name: '我收藏的', type: 'collected' },
        { name: '我留言的', type: 'commented' }
      ],
      
      // ✅ 存储每个 tab 的商品 ID 列表
      viewedIds: [],
      collectedIds: [],
      commentedIds: [],
      
      // ✅ 存储每个 tab 的商品详情列表
      viewedGoodsList: [],
      collectedGoodsList: [],
      commentedGoodsList: [],
    };
  },

  computed: {
    ...mapState('m_user', ['token', 'code', 'userBase', 'openid']),

    // ✅ 计算每个 tab 的数量
    tabsWithCount() {
      return [
        {
          name: '我浏览的',
          count: this.viewedGoodsList.length
        },
        {
          name: '我收藏的',
          count: this.collectedGoodsList.length
        },
        {
          name: '我留言的',
          count: this.commentedGoodsList.length
        }
      ];
    },

    // ✅ 根据当前 tab 返回对应的商品列表
    currentGoodsList() {
      switch(this.activeTab) {
        case 0: return this.viewedGoodsList;
        case 1: return this.collectedGoodsList;
        case 2: return this.commentedGoodsList;
        default: return [];
      }
    },
  },

  async onLoad() {
    // ✅ 页面加载时同时获取所有 tab 的数据
    await this.loadAllTabsData();
  },

  methods: {
    // ✅ 同时加载所有 tab 的数据
    async loadAllTabsData() {
      try {
        uni.showLoading({ title: '加载中...' });
        
        // 并行请求所有数据
        await Promise.all([
          this.loadTabData(0),  // 我浏览的
          this.loadTabData(1),  // 我收藏的
          this.loadTabData(2)   // 我留言的
        ]);
        
        console.log('[History] 所有数据加载完成');
        console.log('  - 浏览:', this.viewedGoodsList.length);
        console.log('  - 收藏:', this.collectedGoodsList.length);
        console.log('  - 留言:', this.commentedGoodsList.length);
        
      } catch (error) {
        console.error('[History] 加载数据失败:', error);
        uni.showToast({
          title: '加载失败，请重试',
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },

    // ✅ 加载指定 tab 的数据
    async loadTabData(tabIndex) {
      try {
        const queryObj = { code: this.openid };
        
        // 1. 获取商品 ID 列表
        let idsResponse;
        switch(tabIndex) {
          case 0: 
            idsResponse = await uni.$http.get('/users/history', queryObj);
            break;
          case 1: 
            idsResponse = await uni.$http.get('/users/collect', queryObj);
            break;
          case 2: 
            idsResponse = await uni.$http.get('/users/comment', queryObj);
            break;
        }
        
        if (idsResponse.data.meta.status !== 200) {
          throw new Error(`获取${this.tabs[tabIndex].name}列表失败`);
        }
        
        const ids = idsResponse.data.data || [];
        
        // 保存 ID 列表
        switch(tabIndex) {
          case 0: this.viewedIds = ids; break;
          case 1: this.collectedIds = ids; break;
          case 2: this.commentedIds = ids; break;
        }
        
        // 2. 如果有 ID，则获取商品详情
        if (ids.length > 0) {
          const goodsResponse = await uni.$http.get('/goods/historysearch', { 
            goods_id: ids 
          });
          
          if (goodsResponse.data.meta.status === 200) {
            const goodsList = goodsResponse.data.message || [];
            
            // 保存商品详情列表
            switch(tabIndex) {
              case 0: this.viewedGoodsList = goodsList; break;
              case 1: this.collectedGoodsList = goodsList; break;
              case 2: this.commentedGoodsList = goodsList; break;
            }
          }
        } else {
          // 没有数据时清空列表
          switch(tabIndex) {
            case 0: this.viewedGoodsList = []; break;
            case 1: this.collectedGoodsList = []; break;
            case 2: this.commentedGoodsList = []; break;
          }
        }
        
      } catch (error) {
        console.error(`[History] 加载${this.tabs[tabIndex].name}失败:`, error);
        // 加载失败时设置为空数组
        switch(tabIndex) {
          case 0: this.viewedGoodsList = []; break;
          case 1: this.collectedGoodsList = []; break;
          case 2: this.commentedGoodsList = []; break;
        }
      }
    },
    
    // ✅ 切换选项卡（已有数据不重新加载）
    async switchTab(index) {
      console.log(`[History] 切换到 tab: ${this.tabs[index].name}`);
      this.activeTab = index;
      
      // 如果当前 tab 还没有数据，则加载
      const currentList = this.currentGoodsList;
      if (currentList.length === 0) {
        console.log(`[History] ${this.tabs[index].name} 暂无数据，重新加载`);
        await this.loadTabData(index);
      }
    },
    
    // ✅ 清空历史记录
    async clearHistory() {
      const tabName = this.tabs[this.activeTab].name;
      
      uni.showModal({
        title: '提示',
        content: `确定要清空所有${tabName}吗？`,
        success: async (res) => {
          if (res.confirm) {
            try {
              uni.showLoading({ title: '清空中...' });
              
              // 调用后端清空接口
              const { data: response } = await uni.$http.post('/users/clearhistory', { 
                code: this.openid,
                type: this.activeTab  // 0=浏览, 1=收藏, 2=留言
              });
              
              if (response.meta.status === 200) {
                // 清空对应的数据
                switch(this.activeTab) {
                  case 0: 
                    this.viewedIds = [];
                    this.viewedGoodsList = [];
                    break;
                  case 1: 
                    this.collectedIds = [];
                    this.collectedGoodsList = [];
                    break;
                  case 2: 
                    this.commentedIds = [];
                    this.commentedGoodsList = [];
                    break;
                }
                
                uni.showToast({
                  title: '已清空',
                  icon: 'success'
                });
              } else {
                throw new Error(response.meta.msg || '清空失败');
              }
              
            } catch (error) {
              console.error('[History] 清空失败:', error);
              uni.showToast({
                title: '清空失败，请重试',
                icon: 'none'
              });
            } finally {
              uni.hideLoading();
            }
          }
        }
      });
    },
    
    // ✅ 跳转到商品详情
    async gotoDetail(goods_id) {
		try {
		  // 1. 先增加浏览次数
		  console.log('📊 增加商品浏览次数:', goods_id);
		  const { data: res } = await uni.$http.post('/goods/view', {
		    goods_id: goods_id,
		    // 可选：添加用户信息用于统计分析
		    user_openid: this.openid || null
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
      if (!goods_id) {
        console.warn('[History] 商品 ID 无效');
        return;
      }
      
      uni.navigateTo({
        url: `/subpkg/goods_detail/goods_detail?goods_id=${goods_id}`
      });
    },
    
    // ✅ 刷新当前 tab 的数据（可选，用于下拉刷新）
    async refreshCurrentTab() {
      await this.loadTabData(this.activeTab);
    },
    
    // ✅ 刷新所有 tab 的数据（可选）
    async refreshAllTabs() {
      await this.loadAllTabsData();
    }
  },
};
</script>

<style lang="scss">
.history-page {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

// 顶部标题栏
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 32rpx;
  background: #fff;
  border-bottom: 1rpx solid #e5e5e5;

  .header-title {
    font-size: 36rpx;
    font-weight: 700;
    color: #333;
  }

  .clear-btn {
    font-size: 28rpx;
    color: #ff4444;
    padding: 8rpx 16rpx;
    transition: opacity 0.3s;
    
    &:active {
      opacity: 0.6;
    }
  }
}

// 选项卡容器
.tabs-container {
  display: flex;
  background: #fff;
  padding: 0 32rpx;
  border-bottom: 1rpx solid #e5e5e5;

  .tab-item {
    flex: 1;
    text-align: center;
    padding: 24rpx 0;
    position: relative;
    transition: all 0.3s;

    .tab-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8rpx;

      .tab-name {
        font-size: 28rpx;
        color: #666;
        transition: all 0.3s;
      }

      .tab-count {
        font-size: 20rpx;
        color: #999;
        background: #f5f5f5;
        padding: 2rpx 10rpx;
        border-radius: 12rpx;
        min-width: 32rpx;
        text-align: center;
        transition: all 0.3s;
      }
    }

    &.active {
      .tab-content {
        .tab-name {
          color: #333;
          font-weight: 600;
        }

        .tab-count {
          color: #fff;
          background: #ff4444;
        }
      }

      .tab-indicator {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60rpx;
        height: 4rpx;
        background: #ff4444;
        border-radius: 2rpx;
      }
    }
  }
}

// 商品列表
.goods-list {
  flex: 1;
  padding: 20rpx;
}

.goods-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.goods-item {
  width: 48%;
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
  transition: transform 0.3s;

  &:active {
    transform: scale(0.98);
  }

  .goods-image {
    width: 100%;
    height: 340rpx;
    display: block;
    background: #f0f0f0;
  }

  .goods-price {
    padding: 16rpx 20rpx;
    display: flex;
    align-items: baseline;

    .price-symbol {
      font-size: 24rpx;
      color: #ff4444;
      font-weight: 600;
    }

    .price-number {
      font-size: 36rpx;
      color: #ff4444;
      font-weight: 700;
      margin-left: 4rpx;
    }
  }
}

// 空状态
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600rpx;

  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}
</style>