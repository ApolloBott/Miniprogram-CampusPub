<template>
  <view class="topic-page">
    <!-- 顶部标题 -->
    <view class="header-section">
      <text class="page-title">发起话题</text>
    </view>
    
    <!-- 话题输入区域 -->
    <view class="input-section">
      <view class="input-container">
        <!-- 文本输入 -->
        <textarea 
          class="topic-input"
          v-model="topicContent"
          placeholder="输入你想讨论的话题..."
          placeholder-class="input-placeholder"
          :maxlength="200"
          auto-height
          :focus="autoFocus"
        />
        
        <!-- 🔥 图片上传区域（移到输入框内部） -->
        <view class="images-section">
          <view class="images-grid" v-if="selectedImages.length > 0 || !uploading">
            <!-- 已选择的图片 -->
            <view 
              class="image-item" 
              v-for="(img, index) in selectedImages" 
              :key="index"
            >
              <image class="image" :src="img" mode="aspectFill"></image>
              <view class="delete-icon" @click="deleteImage(index)">
                <text>×</text>
              </view>
            </view>
            
            <!-- 添加图片按钮 -->
            <view 
              class="add-image-btn" 
              @click="chooseImage"
              v-if="selectedImages.length < 9 && !uploading"
            >
              <text class="add-icon">+</text>
              <text class="add-text">添加图片</text>
            </view>
            
            <!-- 上传中提示 -->
            <view class="add-image-btn uploading" v-if="uploading">
              <text class="add-icon">⏳</text>
              <text class="add-text">上传中...</text>
            </view>
          </view>
        </view>
        
        <!-- 底部信息栏 -->
        <view class="input-footer">
          <view class="char-count">
            <text :class="{ 'over-limit': topicContent.length > 200 }">
              {{ topicContent.length }}/200
            </text>
          </view>
          
          <!-- 显示图片数量 -->
          <!-- <view class="image-count-badge" v-if="selectedImages.length > 0">
            <text class="badge-icon">🖼️</text>
            <text class="badge-text">{{ selectedImages.length }}/9</text>
          </view> -->
          
          <view class="tips-badge">
            <text class="tips-icon">💡</text>
            <text class="tips-text">简洁的话题更容易引起讨论</text>
          </view>
        </view>
      </view>
      
      <!-- 文字转图片开关 -->
      <view class="toggle-section">
        <view class="toggle-container" @click="toggleTextToImage">
          <view class="toggle-content">
            <view class="toggle-left">
              <view class="toggle-info">
                <text class="toggle-title">文字转图片</text>
                <text class="toggle-desc">{{ enableTextToImage ? '生成话题背景图' : '不生成话题背景图' }}</text>
              </view>
            </view>
            
            <view class="toggle-switch" :class="{ 'active': enableTextToImage }">
              <view class="switch-circle"></view>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部按钮 -->
    <view class="button-section">
      <view class="next-btn" @click="handleNext" :class="{ 'disabled': !canNext }">
        <text class="btn-text">下一步</text>
        <text class="btn-icon">→</text>
      </view>
      
      <view class="hint-text">
        <text>{{ getHintText }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      topicContent: '',
      autoFocus: true,
      enableTextToImage: false,
      selectedImages: [],
      imageUrls: [],
      uploading: false
    }
  },
  
  computed: {
    ...mapState('m_user', ['openid']),
    
    canNext() {
      return this.topicContent.trim().length > 0 && this.topicContent.length <= 200 && !this.uploading
    },
    
    getHintText() {
      if (this.uploading) {
        return '图片上传中，请稍候...'
      }
      if (this.enableTextToImage) {
        return '下一步将为你生成话题背景图'
      }
      if (this.selectedImages.length > 0) {
        return `已选择 ${this.selectedImages.length} 张图片`
      }
      return '下一步将直接发布话题讨论'
    }
  },
  
  methods: {
    chooseImage() {
      const maxCount = 9 - this.selectedImages.length
      
      if (maxCount <= 0) {
        uni.showToast({
          title: '最多只能上传9张图片',
          icon: 'none'
        })
        return
      }
      
      uni.chooseImage({
        count: maxCount,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: async (res) => {
          const tempFiles = res.tempFilePaths
          this.selectedImages = this.selectedImages.concat(tempFiles)
          await this.uploadImages(tempFiles)
        }
      })
    },
    
    async uploadImages(filePaths) {
      if (!filePaths || filePaths.length === 0) {
        return []
      }
      
      this.uploading = true
      uni.showLoading({
        title: `上传中 0/${filePaths.length}`,
        mask: true
      })
      
      try {
        const uploadedUrls = []
        
        for (let i = 0; i < filePaths.length; i++) {
          const filePath = filePaths[i]
          
          uni.showLoading({
            title: `上传中 ${i + 1}/${filePaths.length}`,
            mask: true
          })
          
          console.log(`[${i + 1}] 获取上传凭证...`)
          const { data: tokenRes } = await uni.$http.get('/upload/token', {
            openid: this.openid,
            fileType: 'image'
          })
          
          if (tokenRes.meta.status !== 200) {
            throw new Error('获取上传凭证失败')
          }
          
          const fileContent = await new Promise((resolve, reject) => {
            uni.getFileSystemManager().readFile({
              filePath: filePath,
              encoding: 'base64',
              success: (res) => resolve(res.data),
              fail: reject
            })
          })
          
          await new Promise((resolve, reject) => {
            uni.request({
              url: tokenRes.message.publicUrl,
              method: 'PUT',
              header: {
                'Content-Type': 'application/octet-stream'
              },
              data: uni.base64ToArrayBuffer(fileContent),
              success: (res) => {
                if (res.statusCode === 200) {
                  resolve(res)
                } else {
                  reject(new Error(`上传失败: ${res.statusCode}`))
                }
              },
              fail: reject
            })
          })
          
          uploadedUrls.push(tokenRes.message.publicUrl)
          console.log(`[${i + 1}] 上传成功:`, tokenRes.message.publicUrl)
        }
        
        this.imageUrls = this.imageUrls.concat(uploadedUrls)
        
        uni.hideLoading()
        uni.showToast({
          title: '图片上传成功',
          icon: 'success',
          duration: 1500
        })
        
        console.log('✅ 所有图片上传完成:', this.imageUrls)
        return uploadedUrls
        
      } catch (error) {
        console.error('[ERROR] 上传失败:', error)
        uni.hideLoading()
        uni.showToast({
          title: error.message || '上传失败',
          icon: 'none',
          duration: 3000
        })
        
        filePaths.forEach(path => {
          const index = this.selectedImages.indexOf(path)
          if (index > -1) {
            this.selectedImages.splice(index, 1)
          }
        })
        
        return []
      } finally {
        this.uploading = false
      }
    },
    
    deleteImage(index) {
      this.selectedImages.splice(index, 1)
      this.imageUrls.splice(index, 1)
      
      uni.showToast({
        title: '已删除',
        icon: 'success',
        duration: 1000
      })
    },
    
    toggleTextToImage() {
      this.enableTextToImage = !this.enableTextToImage
      
      uni.showToast({
        title: this.enableTextToImage ? '已开启文字转图片' : '已关闭文字转图片',
        icon: 'none',
        duration: 1500
      })
    },
    
    handleNext() {
      if (!this.canNext) {
        if (this.uploading) {
          uni.showToast({
            title: '图片上传中，请稍候',
            icon: 'none'
          })
        } else if (this.topicContent.trim().length === 0) {
          uni.showToast({
            title: '请输入讨论话题',
            icon: 'none'
          })
        } else if (this.topicContent.length > 200) {
          uni.showToast({
            title: '话题内容过长',
            icon: 'none'
          })
        }
        return
      }
      
      const content = encodeURIComponent(this.topicContent.trim())
      
      if (this.enableTextToImage) {
        const imagesParam = this.imageUrls.length > 0 
          ? `&images=${encodeURIComponent(JSON.stringify(this.imageUrls))}`
          : ''
        
        uni.navigateTo({
          url: `/subpkg/text-to-image/text-to-image?content=${content}&isTopic=1${imagesParam}`
        })
      } else {
        const imagesParam = this.imageUrls.length > 0 
          ? `&images=${encodeURIComponent(JSON.stringify(this.imageUrls))}`
          : ''
        
        uni.navigateTo({
          url: `/subpkg/publish-post/publish-post?content=${content}${imagesParam}`
        })
      }
    }
  }
}
</script>

<style lang="scss">
.topic-page {
  min-height: 100vh;
  background-color: #FFF8DC;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.header-section {
  text-align: center;
  padding: 80rpx 32rpx 60rpx;
  
  .page-title {
    display: block;
    font-size: 44rpx;
    color: #333333;
    font-weight: 600;
    margin-bottom: 16rpx;
  }
}

.input-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 32rpx 220rpx;
  gap: 24rpx;
}

.input-container {
  width: 100%;
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 48rpx 40rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  
  .topic-input {
    width: 100%;
    min-height: 300rpx;
    font-size: 36rpx;
    line-height: 1.8;
    color: #333333;
    padding: 40rpx;
    background-color: #ffffff;
    border-radius: 20rpx;
    border: 2rpx solid #F0F0F0;
    box-sizing: border-box;
    transition: all 0.3s;
    margin-bottom: 24rpx; // 🔥 新增：与图片区域间距
    
    &:focus {
      border-color: #DAA520;
      box-shadow: 0 0 0 4rpx rgba(218, 165, 32, 0.1);
    }
  }
  
  .input-placeholder {
    color: #b8b8b8;
  }
  
  // 🔥 图片上传区域（在输入框内部）
  .images-section {
    margin-bottom: 24rpx;
    
    .images-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16rpx;
    }
    
    .image-item {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      
      .image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12rpx;
        background-color: #f0f0f0;
      }
      
      .delete-icon {
        position: absolute;
        top: -12rpx;
        right: -12rpx;
        width: 48rpx;
        height: 48rpx;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        
        text {
          font-size: 36rpx;
          color: #ffffff;
          line-height: 1;
        }
      }
    }
    
    .add-image-btn {
      width: 100%;
      padding-bottom: 100%;
      position: relative;
      background-color: #f8f8f8;
      border-radius: 12rpx;
      border: 2rpx dashed #d9d9d9;
      transition: all 0.3s;
      
      &:active {
        background-color: #f0f0f0;
        transform: scale(0.96);
      }
      
      &.uploading {
        background-color: #f0f2ff;
        border-color: #DAA520;
        
        .add-icon,
        .add-text {
          color: #DAA520;
        }
      }
      
      .add-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -80%);
        font-size: 56rpx;
        color: #999999;
      }
      
      .add-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 20%);
        font-size: 22rpx;
        color: #999999;
        white-space: nowrap;
      }
    }
  }
  
  .input-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8rpx;
    flex-wrap: wrap;
    gap: 12rpx;
    
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
    
    // 🔥 新增：图片数量徽章
    .image-count-badge {
      display: flex;
      align-items: center;
      gap: 6rpx;
      padding: 8rpx 16rpx;
      background-color: #E8F4FD;
      border-radius: 16rpx;
      
      .badge-icon {
        font-size: 22rpx;
      }
      
      .badge-text {
        font-size: 22rpx;
        color: #1890FF;
        font-weight: 500;
      }
    }
    
    .tips-badge {
      display: flex;
      align-items: center;
      gap: 8rpx;
      padding: 10rpx 18rpx;
      background-color: #FFF8DC;
      border-radius: 20rpx;
      
      .tips-icon {
        font-size: 24rpx;
      }
      
      .tips-text {
        font-size: 22rpx;
        color: #8B7355;
      }
    }
  }
}

.toggle-section {
  width: 100%;
}

.toggle-container {
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 32rpx 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s;
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
  }
}

.toggle-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toggle-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
  flex: 1;
}

.toggle-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.toggle-title {
  font-size: 32rpx;
  color: #333333;
  font-weight: 600;
}

.toggle-desc {
  font-size: 24rpx;
  color: #999999;
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
    background: linear-gradient(135deg, #DAA520 0%, #B8860B 100%);
    
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

.button-section {
  position: fixed;
  bottom: 48rpx;
  left: 32rpx;
  right: 32rpx;
  z-index: 10;
  
  .next-btn {
    height: 96rpx;
    background: linear-gradient(135deg, #DAA520 0%, #B8860B 100%);
    border-radius: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    box-shadow: 0 8rpx 24rpx rgba(218, 165, 32, 0.3);
    transition: all 0.3s;
    
    &:not(.disabled):active {
      transform: scale(0.98);
      box-shadow: 0 4rpx 12rpx rgba(218, 165, 32, 0.4);
    }
    
    &.disabled {
      opacity: 0.5;
      background: linear-gradient(135deg, #d9d9d9 0%, #bfbfbf 100%);
    }
    
    .btn-text {
      font-size: 34rpx;
      color: #ffffff;
      font-weight: 600;
    }
    
    .btn-icon {
      font-size: 32rpx;
      color: #ffffff;
      font-weight: bold;
    }
  }
  
  .hint-text {
    text-align: center;
    margin-top: 16rpx;
    
    text {
      font-size: 24rpx;
      color: #999999;
    }
  }
}
</style>
