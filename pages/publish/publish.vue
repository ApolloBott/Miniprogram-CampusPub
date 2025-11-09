<!-- pages/publish-select/publish-select.vue -->
<template>
  <view class="publish-select-page">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="header-title">选择发布类型</text>
      <text class="header-subtitle">请选择你要发布的内容类型</text>
    </view>
    
    <!-- 选择区域 -->
    <view class="select-container">
      
      <!-- 🔥 修改：发布到树洞 - 直接跳转 -->
      <view class="select-card" @click="gotoTopicDiscussion">
        <view class="card-icon">💬</view>
        <view class="card-content">
          <text class="card-title">发布到树洞</text>
          <text class="card-desc">分享你的想法和生活点滴</text>
        </view>
        <view class="card-arrow">›</view>
      </view>
	  
	  <!-- 发布到二手 -->
	  <view class="select-card" @click="gotoSoldPage">
	    <view class="card-icon">🛍️</view>
	    <view class="card-content">
	      <text class="card-title">发布到集市</text>
	      <text class="card-desc">出售闲置物品，让它们找到新主人</text>
	    </view>
	    <view class="card-arrow">›</view>
	  </view>
	  
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      // 🔥 移除：不再需要showSheet
    }
  },
  computed: {
	  ...mapState('m_user', ['token', 'code', 'userBase', 'openid']),
  },
  methods: {
    // 跳转到二手页面
    gotoSoldPage() {
		if (!this.openid) {
		  uni.switchTab({
		    url: '/pages/my/my'
		  })
		  return
		}
      uni.navigateTo({
        url: '/pages/sold/sold'
      })
    },
    
    // 🔥 修改：直接跳转到话题讨论页面
    gotoTopicDiscussion() {
		if (!this.openid) {
		  uni.switchTab({
		    url: '/pages/my/my'
		  })
		  return
		}
      uni.navigateTo({
        url: '/subpkg/topic/topic'
      })
    }
  }
}
</script>

<style lang="scss">
.publish-select-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF8E7 0%, #FFE4B5 100%);
  padding: 80rpx 32rpx;
  position: relative;
}

.page-header {
  text-align: center;
  margin-bottom: 80rpx;
  
  .header-title {
    display: block;
    font-size: 48rpx;
    color: #000;
    font-weight: 600;
    margin-bottom: 16rpx;
  }
  
  .header-subtitle {
    display: block;
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.8);
  }
}

.select-container {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  color: #5D4037
}

.select-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 48rpx 32rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.15);
  }
  
  .card-icon {
    width: 96rpx;
    height: 96rpx;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48rpx;
    flex-shrink: 0;
  }
  
  &:nth-child(2) .card-icon {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }
  
  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
    
    .card-title {
      font-size: 34rpx;
      color: #333333;
      font-weight: 600;
    }
    
    .card-desc {
      font-size: 26rpx;
      color: #999999;
      line-height: 1.4;
    }
  }
  
  .card-arrow {
    font-size: 48rpx;
    color: #cccccc;
    flex-shrink: 0;
  }
}
</style>
