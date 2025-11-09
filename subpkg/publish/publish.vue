<template>
  <view class="publish-container">
    <!-- 顶部标题 -->
    <view class="page-header">
      <text class="page-title">我发布的</text>
    </view>

    <!-- 选项卡 -->
    <view class="tabs-container">
      <view 
        v-for="(tab, index) in tabsWithCount" 
        :key="index"
        class="tab-item"
        :class="{ active: activeTab === index }"
        @click="switchTab(index)"
      >
        <view class="tab-content">
          <text class="tab-text">{{ tab.name }}</text>
          <text class="tab-count">{{ tab.count }}</text>
        </view>
        <view v-if="activeTab === index" class="tab-line"></view>
      </view>
    </view>

    <view class="waterfall">
      <!-- 左列：索引为偶数 -->
      <view class="col">
        <view v-for="(item, i) in leftColumn" :key="i" @click="gotoDetail(item)">
          <my-goods :goods="item" />
        </view>
      </view>

      <!-- 右列：索引为奇数 -->
      <view class="col">
        <view v-for="(item, i) in rightColumn" :key="i" @click="gotoDetail(item)">
          <my-goods :goods="item" />
        </view>
      </view>
    </view>

    <!-- 空状态提示 -->
    <view v-if="filteredGoods.length === 0" class="empty-state">
      <text class="empty-text">暂无{{ tabs[activeTab] }}的商品</text>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      tabs: ['在卖', '草稿', '已下架'],
      activeTab: 0,
      goodsList: [],
      filteredGoods: []
    };
  },
  
  onLoad() {
    this.loadPublishedGoods();
  },
  
  computed: {
    ...mapState('m_user', ['token', 'code', 'userBase', 'openid']),

    // 🔥 新增：带数量的标签页数据
    tabsWithCount() {
      // 统计各状态商品数量
      const onSaleCount = this.goodsList.filter(item => item.goods_status === 1).length;
      const draftCount = this.goodsList.filter(item => item.goods_status === 3).length;
      const offShelfCount = this.goodsList.filter(item => item.goods_status === 2).length;

      return [
        {
          name: '在卖',
          count: onSaleCount
        },
        {
          name: '已下架',
          count: offShelfCount
        }
      ];
    },

    leftColumn() { 
      return this.filteredGoods.filter((_, idx) => idx % 2 === 0) 
    },
    
    rightColumn() { 
      return this.filteredGoods.filter((_, idx) => idx % 2 === 1) 
    }
  },
  
  methods: {
    // 切换选项卡
    switchTab(index) {
      console.log('[调试] 切换选项卡:', this.tabs[index]);
      this.activeTab = index;
      this.filterGoods(); // 🔥 直接过滤，不重新请求
    },
    
    // 🔥 新增：过滤商品方法（避免重复请求）
    filterGoods() {
      if (this.activeTab === 0) {
        // 在卖
        this.filteredGoods = this.goodsList.filter(item => item.goods_status === 1);
      } else if (this.activeTab === 2) {
        // 草稿
        this.filteredGoods = this.goodsList.filter(item => item.goods_status === 3);
      } else if (this.activeTab === 1) {
        // 已下架
        this.filteredGoods = this.goodsList.filter(item => item.goods_status === 2);
      }
    },
    
    // 加载用户发布的商品
    async loadPublishedGoods() {
      console.log('[调试] 开始加载发布的商品, 状态:', this.activeTab);
      
      try {
        uni.showLoading({ title: '加载中...' });
                
        // 请求用户信息，获取发布的商品ID列表
        const goodsIds = this.userBase.goods_id || [];
        console.log('[调试] 用户发布的商品ID:', goodsIds);
        
        if (goodsIds.length === 0) {
          this.goodsList = [];
          this.filteredGoods = [];
          return;
        }
        
        // 根据商品ID获取商品详情
        const { data: goodsRes } = await uni.$http.get('/goods/historysearch', {
          goods_id: goodsIds
        });
        
        if (goodsRes.meta.status !== 200) {
          console.log("hello");
          throw new Error(goodsRes.meta.msg);
        }
        
        this.goodsList = goodsRes.message;
        console.log('[调试] 获取到的商品列表:', this.goodsList);
        
        // 🔥 初次加载后进行过滤
        this.filterGoods();
        
      } catch (error) {
        console.error('[错误] 加载商品失败:', error);
        uni.showToast({ 
          title: error.message || '加载失败', 
          icon: 'none' 
        });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 跳转到商品详情
    async gotoDetail(item) {
		try {
		  // 1. 先增加浏览次数
		  console.log('📊 增加商品浏览次数:', item.goods_id);
		  const { data: res } = await uni.$http.post('/goods/view', {
		    goods_id: item.goods_id,
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
      uni.navigateTo({
        url: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
      });
    },
  }
}
</script>

<style lang="scss">
.publish-container {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-bottom: 20rpx;
}

/* 顶部标题 */
.page-header {
  background-color: #fff;
  padding: 24rpx 0;
  text-align: center;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);
  
  .page-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
}

/* 选项卡 */
.tabs-container {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 0 40rpx;
  
  .tab-item {
    position: relative;
    padding: 24rpx 32rpx;
    
    // 🔥 新增：标签内容容器
    .tab-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8rpx;
      
      .tab-text {
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
    
    .tab-line {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 40rpx;
      height: 4rpx;
      background-color: #c00000;
      border-radius: 2rpx;
    }
    
    &.active {
      .tab-content {
        .tab-text {
          color: #c00000;
          font-weight: bold;
        }
        
        .tab-count {
          color: #fff;
          background: #c00000;
        }
      }
    }
  }
}

.waterfall {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  background: #f5f5f5;
  box-sizing: border-box;
}

.col {
  width: 48%;
  display: flex;
  flex-direction: column;
}

/* 空状态 */
.empty-state {
  padding: 200rpx 0;
  text-align: center;
  
  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}
</style>