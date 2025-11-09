<!-- subpkg/goods-selector/goods-selector.vue -->
<template>
  <view class="goods-selector-page">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="header-title">选择商品</text>
      <text class="header-subtitle">请选择要关联的商品</text>
    </view>
    
    <!-- 商品列表 -->
    <view class="goods-list" v-if="goodsList.length > 0">
      <view 
        class="goods-item"
        v-for="(goods, index) in goodsList"
        :key="goods.goods_id"
        :class="{ 'selected': selectedGoodsId === goods.goods_id }"
        @click="selectGoods(goods)"
      >
        <image 
          class="goods-image" 
          :src="goods.goods_small_logo || goods.goods_big_logo" 
          mode="aspectFill"
        ></image>
        <view class="goods-info">
          <text class="goods-name">{{ goods.goods_name }}</text>
          <text class="goods-price">¥{{ goods.goods_price }}</text>
          <view class="goods-meta">
            <!-- 🔧 修复：使用对象形式的class绑定 -->
            <text 
              class="goods-status"
              :class="{
                'on-sale': goods.goods_status === 1,
                'sold-out': goods.goods_status === 2,
                'off-shelf': goods.goods_status === 3
              }"
            >
              {{ getStatusText(goods.goods_status) }}
            </text>
            <text class="goods-time">{{ formatTime(goods.add_time) }}</text>
          </view>
        </view>
        <view class="select-indicator" v-if="selectedGoodsId === goods.goods_id">
          <text class="check-icon">✓</text>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty-state" v-else-if="!isLoading">
      <text class="empty-icon">📦</text>
      <text class="empty-text">暂无在售商品</text>
      <text class="empty-desc">请先发布商品后再关联</text>
    </view>
    
    <!-- 加载状态 -->
    <view class="loading-state" v-if="isLoading">
      <text class="loading-text">加载中...</text>
    </view>
    
    <!-- 底部按钮 -->
    <view class="bottom-buttons">
      <view class="btn cancel-btn" @click="cancel">
        <text>取消</text>
      </view>
      <view class="btn confirm-btn" :class="{ 'disabled': !selectedGoodsId }" @click="confirm">
        <text>确定</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      goodsList: [],
      selectedGoodsId: null,
      selectedGoods: null,
      isLoading: true
    }
  },
  
  onLoad() {
    this.loadUserGoods()
  },
  
  computed: {
    ...mapState('m_user', ['openid', 'userBase'])
  },
  
  methods: {
    // 加载用户商品
    async loadUserGoods() {
      try {
        this.isLoading = true
        
        if (!this.userBase.goods_id || this.userBase.goods_id.length === 0) {
          this.goodsList = []
          return
        }
        
        const goodsResponse = await uni.$http.get('/goods/historysearch', { 
          goods_id: this.userBase.goods_id 
        })
        
        if (goodsResponse.data.meta.status === 200) {
          const goodsList = goodsResponse.data.message || []
          // 只显示在售商品
          this.goodsList = goodsList.filter(goods => goods.goods_status === 1)
          console.log('✅ 加载用户商品成功:', this.goodsList.length)
        } else {
          throw new Error(goodsResponse.data.meta.msg || '加载失败')
        }
        
      } catch (error) {
        console.error('❌ 加载用户商品失败:', error)
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
        this.goodsList = []
      } finally {
        this.isLoading = false
      }
    },
    
    // 选择商品
    selectGoods(goods) {
      this.selectedGoodsId = goods.goods_id
      this.selectedGoods = goods
      console.log('📦 选择商品:', goods.goods_name)
    },
    
    // 取消选择
    cancel() {
      uni.navigateBack()
    },
    
    // 确认选择
    confirm() {
      if (!this.selectedGoodsId) {
        uni.showToast({
          title: '请先选择商品',
          icon: 'none'
        })
        return
      }
      
      // 通过事件通道传递数据回发布页面
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.emit('selectGoods', {
        goods_id: this.selectedGoodsId,
        goods: this.selectedGoods
      })
      
      uni.navigateBack()
    },
    
    // 获取商品状态文本
    getStatusText(status) {
      const statusMap = {
        1: '在售',
        2: '已售出',
        3: '已下架'
      }
      return statusMap[status] || '未知'
    },
    
    // 🔧 删除：移除getStatusClass方法，改用模板中的对象绑定
    
    // 格式化时间
    formatTime(timestamp) {
      if (!timestamp) return ''
      const date = new Date(timestamp * 1000)
      return `${date.getMonth() + 1}-${date.getDate()}`
    }
  }
}
</script>

<style lang="scss">
.goods-selector-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
}

.header {
  background-color: #ffffff;
  padding: 32rpx;
  text-align: center;
  border-bottom: 1rpx solid #f0f0f0;
  
  .header-title {
    font-size: 36rpx;
    color: #333333;
    font-weight: 500;
    display: block;
    margin-bottom: 8rpx;
  }
  
  .header-subtitle {
    font-size: 26rpx;
    color: #999999;
  }
}

.goods-list {
  padding: 16rpx;
}

.goods-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 16rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s;
  
  &:active {
    background-color: #f9f9f9;
  }
  
  &.selected {
    border-color: #C00000;
    background-color: #fff5f5;
  }
  
  .goods-image {
    width: 120rpx;
    height: 120rpx;
    border-radius: 12rpx;
    background-color: #f0f0f0;
    margin-right: 24rpx;
    flex-shrink: 0;
  }
  
  .goods-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
    
    .goods-name {
      font-size: 30rpx;
      color: #333333;
      font-weight: 500;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    
    .goods-price {
      font-size: 32rpx;
      color: #C00000;
      font-weight: 600;
    }
    
    .goods-meta {
      display: flex;
      align-items: center;
      gap: 16rpx;
      
      .goods-status {
        font-size: 22rpx;
        padding: 4rpx 12rpx;
        border-radius: 12rpx;
        
        &.on-sale {
          background-color: #f0f9ff;
          color: #0369a1;
        }
        
        &.sold-out {
          background-color: #fef2f2;
          color: #dc2626;
        }
        
        &.off-shelf {
          background-color: #f9fafb;
          color: #6b7280;
        }
      }
      
      .goods-time {
        font-size: 22rpx;
        color: #999999;
      }
    }
  }
  
  .select-indicator {
    width: 48rpx;
    height: 48rpx;
    background-color: #C00000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .check-icon {
      font-size: 28rpx;
      color: #ffffff;
      font-weight: bold;
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 40rpx;
  text-align: center;
  
  .empty-icon {
    font-size: 120rpx;
    margin-bottom: 24rpx;
  }
  
  .empty-text {
    font-size: 32rpx;
    color: #666666;
    margin-bottom: 12rpx;
  }
  
  .empty-desc {
    font-size: 26rpx;
    color: #999999;
  }
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120rpx 0;
  
  .loading-text {
    font-size: 28rpx;
    color: #999999;
  }
}

.bottom-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 24rpx;
  padding: 24rpx 32rpx;
  background-color: #ffffff;
  border-top: 1rpx solid #f0f0f0;
  
  .btn {
    flex: 1;
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 44rpx;
    font-size: 30rpx;
    transition: all 0.3s;
    
    &.cancel-btn {
      background-color: #f5f5f5;
      color: #666666;
      
      &:active {
        background-color: #e8e8e8;
      }
    }
    
    &.confirm-btn {
      background: linear-gradient(135deg, #C00000 0%, #C00000 100%);
      color: #ffffff;
      font-weight: 500;
      
      &:active {
        opacity: 0.8;
      }
      
      &.disabled {
        background: #cccccc;
        opacity: 0.6;
        pointer-events: none;
      }
    }
  }
}
</style>