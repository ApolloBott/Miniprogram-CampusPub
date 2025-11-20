<template>
  <view class="publish-select-page">
    <view class="page-header">
      <text class="header-title">我想发布...</text>
      <text class="header-subtitle">选择您要发布的内容类型</text>
    </view>
    
    <view class="select-container">
      
      <view class="select-card" @click="gotoTopicDiscussion">
        <image 
          class="card-icon" 
          src="https://wait00.oss-cn-shanghai.aliyuncs.com/label/fatiezi.png" 
          mode="aspectFit"
        ></image>
        
        <view class="card-content">
          <text class="card-title">发帖子</text>
          <text class="card-desc">分享你的想法和生活点滴</text>
        </view>
        <view class="card-arrow">›</view>
      </view>
	  
	  <view class="select-card" @click="gotoSoldPage">
        <image 
          class="card-icon" 
          src="https://wait00.oss-cn-shanghai.aliyuncs.com/label/maihaowu.png" 
          mode="aspectFit"
        ></image>
        
	    <view class="card-content">
	      <text class="card-title">卖好物</text>
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
    
    // 跳转到话题讨论页面
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
  
  // 图片样式
  .card-icon {
    width: 110rpx;    /* 保持之前调整后的较大尺寸 */
    height: 110rpx;
    flex-shrink: 0;
    border-radius: 20rpx;
  }
  
  // 移除了 .icon-bordered 相关样式
  
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