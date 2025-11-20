<template>
  <view class="sold-page">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="header-title">我卖出的</text>
    </view>

    <!-- 商品列表 -->
    <scroll-view scroll-y class="goods-list">
      <view class="goods-grid">
        <view 
          class="goods-item" 
          v-for="(item, index) in soldList" 
          :key="index"
          @click="gotoDetail(item.goods_id)"
        >
          <image :src="item.goods_big_logo" class="goods-image" mode="aspectFill"></image>
          <view class="goods-info">
            <view class="goods-name">{{ item.goods_name }}</view>
            <view class="goods-price">
              <text class="price-symbol">¥</text>
              <text class="price-number">{{ item.goods_price }}</text>
            </view>
            <view class="sold-time">售出时间：{{ formatTime(item.buy_time) }}</view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="soldList.length === 0" class="empty-state">
        <text class="empty-text">暂无售出记录</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      soldList: [], // 已售出商品列表
    };
  },
  
  computed: {
    ...mapState('m_user', ['token', 'code', 'userBase', 'openid']),
  },
  
  async onLoad() {
    await this.loadSoldGoods();
  },
  
  methods: {
    // 加载已售出商品列表
    async loadSoldGoods() {
      try {
        // 参数验证
        if (!this.openid) {
          console.error('❌ 用户未登录');
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
          return;
        }
        
        // 调用接口获取已售出商品
        const { data: res } = await uni.$http.get('/goods/soldlist', {
          openid: this.openid
        });
        
        if (res.meta.status === 200) {
          this.soldList = res.message || [];
          console.log('✅ 已售出商品加载成功:', this.soldList);
        } else {
          console.warn('⚠️ 加载失败:', res.meta.msg);
          uni.showToast({
            title: res.meta.msg || '加载失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('❌ 加载已售出商品失败:', error);
        uni.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        });
      }
    },
    
    // 跳转到商品详情
    async gotoDetail(goods_id) {
      try {
        // 增加浏览次数
        console.log('📊 增加商品浏览次数:', goods_id);
        const { data: res } = await uni.$http.post('/goods/view', {
          goods_id: goods_id,
          user_openid: this.openid || null
        });
        
        if (res.meta.status === 200) {
          console.log('✅ 浏览次数增加成功');
        } else {
          console.warn('⚠️ 浏览次数增加失败:', res.meta.msg);
        }
      } catch (error) {
        console.error('❌ 浏览次数增加接口错误:', error);
      }
      
      // 跳转到详情页
      uni.navigateTo({
        url: `/subpkg/goods_detail/goods_detail?goods_id=${goods_id}`
      });
    },
    
    // 格式化时间戳
    formatTime(timestamp) {
      if (!timestamp) return '--';
      
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hour}:${minute}`;
    },
  },
};
</script>

<style lang="scss">
.sold-page {
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

  .goods-image {
    width: 100%;
    height: 340rpx;
    display: block;
    background: #f0f0f0;
  }

  .goods-info {
    padding: 16rpx 20rpx;

    .goods-name {
      font-size: 28rpx;
      color: #333;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 8rpx;
    }

    .goods-price {
      display: flex;
      align-items: baseline;
      margin-bottom: 8rpx;

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

    .sold-time {
      font-size: 22rpx;
      color: #999;
      margin-bottom: 4rpx;
    }

    .buyer-info {
      font-size: 22rpx;
      color: #666;
      background: #f5f5f5;
      padding: 4rpx 8rpx;
      border-radius: 4rpx;
      display: inline-block;
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
