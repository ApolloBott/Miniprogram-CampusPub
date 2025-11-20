<template>
  <view class="topic-page-new">
    <view class="new-header">
      
      <view 
        class="toggle-container-top" 
        @click.stop="toggleTextToImage"
      >
        <text class="toggle-title-top">生成背景图</text>
        <view class="toggle-switch" :class="{ 'active': enableTextToImage }">
          <view class="switch-circle"></view>
        </view>
      </view>
      
      <view class="header-spacer"></view> 
      
      <view class="next-btn-top" @click="handleNext" :class="{ 'disabled': !canNext }">
        <text class="btn-text">下一步</text>
      </view>
    </view>
    
    <view class="input-section" :class="{ 'is-focused': isFocused }">
      
      <view class="input-container">
        
        <view 
          class="placeholder-cursor" 
          v-if="!isFocused && topicContent.length === 0"
        ></view>
        
        <textarea 
          class="topic-input"
          v-model="topicContent"
          placeholder="今天想写点什么"
          placeholder-class="input-placeholder"
          :maxlength="200"
          auto-height
          :focus="autoFocus"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        
        <view class="input-footer">
          <view class="char-count">
            <text :class="{ 'over-limit': topicContent.length > 200 }">
              {{ topicContent.length }}/200
            </text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="bottom-card-section" v-if="!isFocused">
      <view class="bottom-card-container" @click="handleNavigateToImagePost">
        <view class="bottom-card-left">
          <image 
            class="bottom-card-icon" 
            src="https://wait00.oss-cn-shanghai.aliyuncs.com/label/photo.png" 
            mode="aspectFit"
          />
          <view class="bottom-card-info">
            <text class="bottom-card-title">直接发图片</text>
            <text class="bottom-card-desc">发布图片，记录生活</text>
          </view>
        </view>
        <text class="bottom-card-arrow">›</text>
      </view>
    </view>
    
    <image 
      class="bottom-right-illustration" 
      src="https://wait00.oss-cn-shanghai.aliyuncs.com/label/pencil.jpg" 
      mode="aspectFit"
      v-if="!isFocused"
    />
    
  </view>
</template>

<script>
export default {
  data() {
    return {
      topicContent: '',
      autoFocus: false, 
      enableTextToImage: true,
      isFocused: false 
    }
  },
  
  computed: {
    canNext() {
      return this.topicContent.trim().length > 0 && this.topicContent.length <= 200
    }
  },
  
  methods: {
    toggleTextToImage() {
      // 这里的isFocused判断逻辑可以根据实际需求保留或移除
      // 如果希望在键盘弹出时也能点击切换，则移除if
      // if (this.isFocused) return; 
      this.enableTextToImage = !this.enableTextToImage;
      uni.showToast({
        title: this.enableTextToImage ? '已开启生成背景图' : '已关闭生成背景图',
        icon: 'none',
        duration: 1500
      });
    },
    
    handleNext() {
      if (!this.canNext) {
        if (this.topicContent.trim().length === 0) {
          uni.showToast({ title: '请输入讨论话题', icon: 'none' });
        } else if (this.topicContent.length > 200) {
          uni.showToast({ title: '话题内容过长', icon: 'none' });
        }
        return;
      }
      
      const content = encodeURIComponent(this.topicContent.trim());
      
      if (this.enableTextToImage) {
        uni.navigateTo({
          url: `/subpkg/text-to-image/text-to-image?content=${content}&isTopic=1`
        });
      } else {
        uni.navigateTo({
          url: `/subpkg/publish-post/publish-post?content=${content}`
        });
      }
    },
    
    handleFocus() {
      this.isFocused = true;
    },
    
    handleBlur() {
      this.isFocused = false;
    },
    
    handleNavigateToImagePost() {
      uni.chooseImage({
        count: 9, 
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          
          if (tempFilePaths.length > 0) {
            uni.navigateTo({
              url: '/subpkg/publish-post/publish-post', 
              success: (navRes) => {
                navRes.eventChannel.emit('uploadImages', {
                  images: tempFilePaths
                });
              }
            });
          }
        },
        fail: (err) => {
          if (err.errMsg !== 'chooseImage:fail cancel') {
            console.error('选择图片失败:', err);
            uni.showToast({ title: '选择图片失败', icon: 'none' });
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.topic-page-new {
  min-height: 100vh;
  background-color: #F7F8FA;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden; 
}

.new-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60rpx 32rpx 32rpx; 
  background-color: #F7F8FA;
  position: sticky;
  top: 0;
  z-index: 10;
  
  .header-spacer {
    flex-grow: 1;
    min-width: 16rpx;
  }
  
  .next-btn-top {
    height: 64rpx;
    background-color: #FE5167; 
    border-radius: 32rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 32rpx;
    transition: all 0.3s;
    flex-shrink: 0; 
    
    &.disabled {
      opacity: 0.5;
      background-color: #d9d9d9;
    }
    
    .btn-text {
      font-size: 28rpx;
      color: #ffffff;
      font-weight: 600;
    }
  }
}

.input-section {
  flex: 1; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 32rpx 40rpx; 
  width: 100%;
  box-sizing: border-box;
  
  justify-content: center; 
  
  &.is-focused {
    justify-content: flex-start;
  }
}

.input-container {
  /* 1. 稿纸宽度调整 */
  width: calc(100% - 64rpx); 
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 40rpx; 
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05); 
  position: relative;
  transition: all 0.3s ease-out;
  
  /* 2. 模拟光标位置调整 */
  .placeholder-cursor {
    position: absolute;
    top: calc(40rpx + 250rpx - 2rpx); // 减去光标自身一半高度以使其居中
    left: 40rpx; 
    width: 2rpx;
    height: 40rpx; 
    background-color: #A41F35; 
    animation: blink 1s infinite;
    pointer-events: none; 
    z-index: 1;
  }

  .topic-input {
    width: 100%;
    min-height: 700rpx;
    font-size: 32rpx; 
    line-height: 1.8;
    color: #333333;
    padding: 250rpx 0 0 0; 
    background-color: transparent;
    border: none; 
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    caret-color: #A41F35;
    
    &:focus {
      border-color: transparent;
      box-shadow: none;
    }
  }
  
  .input-placeholder {
    color: #b8b8b8;
    font-size: 32rpx;
    line-height: 1.8;
  }
  
  .input-footer {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 24rpx;
    padding: 0; 
    
    .char-count {
      text {
        font-size: 26rpx;
        color: #999999;
        
        &.over-limit {
          color: #ff4d4f;
          font-weight: 600;
        }
      }
    }
  }
}

.toggle-container-top {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 10rpx 20rpx;
  cursor: pointer;
  border: 1rpx solid #E0E0E0; 
  border-radius: 32rpx; 
  transition: all 0.3s;
  flex-shrink: 0; 
  
  .toggle-title-top {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
  }
}

.toggle-switch {
  width: 88rpx;
  height: 48rpx;
  background-color: #E0E0E0;
  border-radius: 24rpx;
  position: relative;
  transition: all 0.3s;
  flex-shrink: 0;
  
  &.active {
    background: #FE5167; 
    
    .switch-circle {
      transform: translateX(40rpx);
    }
  }
}

.switch-circle {
  position: absolute;
  left: 4rpx;
  top: 4rpx;
  width: 40rpx;
  height: 40rpx;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
}

.bottom-card-section {
  width: 100%;
  padding: 0 32rpx 48rpx; 
  box-sizing: border-box;
  background-color: #F7F8FA; 
  transition: all 0.3s ease-out; 
}

.bottom-card-container {
  /* 1. 底部卡片宽度调整 */
  width: calc(100% - 64rpx); 
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 32rpx 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:active {
    transform: scale(0.99);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
  }
}

.bottom-card-left {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.bottom-card-icon {
  width: 64rpx;
  height: 64rpx;
  flex-shrink: 0;
}

.bottom-card-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.bottom-card-title {
  font-size: 32rpx;
  color: #333333;
  font-weight: 600;
}

.bottom-card-desc {
  font-size: 24rpx;
  color: #999999;
}

.bottom-card-arrow {
  font-size: 32rpx;
  color: #C0C0C0;
  font-weight: 600;
}

/* 4. 右下角插图样式 */
.bottom-right-illustration {
  position: fixed; // 固定定位
  right: 65rpx; // 距离右边距
  bottom: 370rpx; // 距离底部边距 (避开底部导航栏或 home bar)
  width: 250rpx; // 插图长宽
  height: 250rpx;
  opacity: 0.7; // 稍微透明
  pointer-events: none; // 不会阻挡下方元素的点击
  z-index: 5; // 确保在底部卡片之上
  transition: all 0.3s ease-out;
}
</style>