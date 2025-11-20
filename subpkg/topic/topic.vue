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
      uploading: false,
      
      // 🔥 新增：图片检测状态管理
      imageCheckStatus: [], // 存储每张图片的检测状态
      allImagesChecked: false,
      
      // 🔥 新增：发布状态控制
      isPublishing: false,
    }
  },
  
  computed: {
    ...mapState('m_user', ['openid', 'userBase']),
    
    canNext() {
      return (
        this.topicContent.trim().length > 0 && 
        this.topicContent.length <= 200 && 
        !this.uploading &&
        !this.isPublishing
      )
    },
    
    getHintText() {
      if (this.uploading) {
        return '图片上传中，请稍候...'
      }
      
      // 🔥 新增：检测状态提示
      const checkingCount = this.imageCheckStatus.filter(s => s.checking).length
      if (checkingCount > 0) {
        return `${checkingCount} 张图片正在检测中...`
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
    /**
     * 🔥 修改：选择图片 - 立即添加 + 异步检测
     */
    async chooseImage() {
      if (this.isPublishing) return;
      
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
          console.log('📸 选择了', res.tempFilePaths.length, '张图片')
          
          // 🔥 立即添加到列表，提升用户体验
          const newImages = res.tempFilePaths
          const startIndex = this.selectedImages.length
          
          // 先添加图片到展示列表
          this.selectedImages = this.selectedImages.concat(newImages)
          
          // 初始化检测状态（检测中）
          newImages.forEach(() => {
            this.imageCheckStatus.push({
              checking: true,
              safe: null,
              error: false
            })
          })
          
          uni.showToast({
            title: `已添加 ${newImages.length} 张图片`,
            icon: 'success',
            duration: 1000
          })
          
          // 🔥 异步检测图片（不阻塞用户操作）
          this.checkImagesInBackground(newImages, startIndex)
        },
        fail: (err) => {
          console.error('❌ 选择图片失败:', err)
        }
      })
    },
    
async checkImagesInBackground(imagePaths, startIndex) {
  console.log('🔍 开始后台检测', imagePaths.length, '张图片')
  
  // 🔥 改为 for...of 串行执行
  for (let index = 0; index < imagePaths.length; index++) {
    const filePath = imagePaths[index]
    const globalIndex = startIndex + index
    
    try {
      // 检查文件大小
      const fileInfo = await new Promise((resolve, reject) => {
        uni.getFileInfo({
          filePath: filePath,
          success: resolve,
          fail: reject
        })
      })
      
      console.log(`📁 图片 ${globalIndex + 1} 大小:`, (fileInfo.size / 1024).toFixed(2) + ' KB')
      
      if (fileInfo.size > 1024 * 1024) {
        this.imageCheckStatus[globalIndex] = {
          checking: false,
          safe: null,
          error: true,
          reason: '文件过大'
        }
        continue // 跳过这张图片，继续下一张
      }
      
      // 🔥 关键修复：等待单张图片上传完成后再处理下一张
      const res = await new Promise((resolve, reject) => {
        uni.uploadFile({
          url: 'https://xinshi00.com/upload/imgSecCheck',
          filePath: filePath,
          name: 'media',
          formData: { openid: this.openid },
          success: resolve,
          fail: reject
        })
      })
      
      console.log(`📥 图片 ${globalIndex + 1} 原始响应:`, {
        statusCode: res.statusCode,
        data: res.data
      })
      
      // 解析响应
      let result
      try {
        result = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
      } catch (parseError) {
        console.error(`❌ 图片 ${globalIndex + 1} 响应解析失败:`, parseError)
        this.imageCheckStatus[globalIndex] = {
          checking: false,
          safe: null,
          error: true,
          reason: '响应解析失败'
        }
        continue
      }
      
      console.log(`📥 图片 ${globalIndex + 1} 解析后响应:`, result)
      
      // 根据响应更新状态
      if (res.statusCode === 200 && result.meta && result.meta.status === 200) {
        // ✅ 图片安全
        this.imageCheckStatus[globalIndex] = {
          checking: false,
          safe: true,
          error: false
        }
        console.log(`✅ 图片 ${globalIndex + 1} 检测通过`)
        
      } else if (res.statusCode === 400 || (result.meta && result.meta.status === 400)) {
        // 🚫 图片违规
        this.imageCheckStatus[globalIndex] = {
          checking: false,
          safe: false,
          error: false,
          reason: result.meta?.msg || '内容违规'
        }
        console.warn(`🚫 图片 ${globalIndex + 1} 内容违规:`, result.meta?.msg)
        
      } else {
        // ❌ 检测失败
        this.imageCheckStatus[globalIndex] = {
          checking: false,
          safe: null,
          error: true,
          reason: result.meta?.msg || '检测失败'
        }
        console.error(`❌ 图片 ${globalIndex + 1} 检测失败:`, result.meta?.msg)
      }
      
    } catch (err) {
      console.error(`💥 图片 ${globalIndex + 1} 检测异常:`, err)
      
      this.imageCheckStatus[globalIndex] = {
        checking: false,
        safe: null,
        error: true,
        reason: '网络错误'
      }
    }
  }
  
  // 处理违规和失败的图片
  const unsafeImages = this.imageCheckStatus
    .map((status, index) => ({ status, index }))
    .filter(item => item.status.safe === false)
  
  const errorImages = this.imageCheckStatus
    .map((status, index) => ({ status, index }))
    .filter(item => item.status.safe === null && item.status.error === true)
  
  if (unsafeImages.length > 0) {
    uni.showModal({
      title: '图片检测完成',
      content: `有 ${unsafeImages.length} 张图片未通过检测，已自动移除`,
      showCancel: false,
      confirmText: '我知道了',
      success: () => {
        unsafeImages.reverse().forEach(item => {
          this.selectedImages.splice(item.index, 1)
          this.imageUrls.splice(item.index, 1)
          this.imageCheckStatus.splice(item.index, 1)
        })
      }
    })
  }
  
  if (errorImages.length > 0) {
    const errorReasons = errorImages.map(item => item.status.reason).join('、')
    uni.showModal({
      title: '图片检测失败',
      content: `有 ${errorImages.length} 张图片检测失败（${errorReasons}），已自动移除`,
      showCancel: false,
      confirmText: '我知道了',
      success: () => {
        errorImages.reverse().forEach(item => {
          this.selectedImages.splice(item.index, 1)
          this.imageUrls.splice(item.index, 1)
          this.imageCheckStatus.splice(item.index, 1)
        })
      }
    })
  }
  
  this.allImagesChecked = true
  console.log('✅ 所有图片检测完成')
},



    
    /**
     * 🔥 新增：文本内容安全检测
     */
    async checkTextSafety(text) {
      try {
        console.log('🔍 开始检测文本:', text.substring(0, 30) + '...')
        
        const { data: res } = await uni.$http.post('/upload/textSecCheck', {
          content: text,
          openid: this.openid
        })
        
        console.log('📥 文本检测结果:', res)
        
        if (res.meta.status === 200) {
          console.log('✅ 文本内容安全')
          return true
        } else {
          console.warn('🚫 文本内容违规:', res.meta.msg)
          return false
        }
        
      } catch (err) {
        console.error('💥 文本检测出错:', err)
        
        uni.showToast({
          title: '文本检测失败，请重试',
          icon: 'none',
          duration: 2000
        })
        
        return false
      }
    },
    
    /**
     * 上传图片到OSS
     */
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
        
        this.imageUrls = uploadedUrls
        
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
        
        return []
      } finally {
        this.uploading = false
      }
    },
    
    /**
     * 删除图片
     */
    deleteImage(index) {
      if (this.isPublishing) return
      
      this.selectedImages.splice(index, 1)
      this.imageUrls.splice(index, 1)
      this.imageCheckStatus.splice(index, 1)
      
      uni.showToast({
        title: '已删除',
        icon: 'success',
        duration: 1000
      })
    },
    
    /**
     * 切换文字转图片
     */
    toggleTextToImage() {
      if (this.isPublishing) return
      
      this.enableTextToImage = !this.enableTextToImage
      
      uni.showToast({
        title: this.enableTextToImage ? '已开启文字转图片' : '已关闭文字转图片',
        icon: 'none',
        duration: 1500
      })
    },
    
    /**
     * 🔥 修改：下一步 - 增加检测逻辑
     */
    async handleNext() {
      // 防止重复点击
      if (this.isPublishing) {
        console.log('⚠️ 处理中，请勿重复点击')
        return
      }
      
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
      
      // 设置发布状态
      this.isPublishing = true
      
      // 🔥 检查图片是否还在检测中
      const stillChecking = this.imageCheckStatus.some(status => status.checking)
      
      if (stillChecking) {
        this.isPublishing = false
        uni.showModal({
          title: '请稍候',
          content: '图片正在检测中，请稍后再试',
          showCancel: false,
          confirmText: '我知道了'
        })
        return
      }
      
      // 🔥 检查是否有违规图片
      const hasUnsafeImages = this.imageCheckStatus.some(status => status.safe === false)
      
      if (hasUnsafeImages) {
        this.isPublishing = false
        uni.showModal({
          title: '图片违规',
          content: '存在违规图片，请删除后重试',
          showCancel: false,
          confirmText: '我知道了'
        })
        return
      }
      
      // 🔥 文本内容安全检测
      console.log('[1] 检测文本内容安全性...')
      uni.showLoading({
        title: '检测文本内容...',
        mask: true
      })
      
      const isTextSafe = await this.checkTextSafety(this.topicContent.trim())
      
      uni.hideLoading()
      
      if (!isTextSafe) {
        this.isPublishing = false
        uni.showModal({
          title: '内容违规',
          content: '话题内容包含违规内容，请修改后重试',
          showCancel: false,
          confirmText: '我知道了'
        })
        return
      }
      
      console.log('✅ 文本内容检测通过')
      
      // 🔥 如果有图片，先上传到OSS
      if (this.selectedImages.length > 0 && this.imageUrls.length === 0) {
        console.log('[2] 上传图片到OSS...')
        const uploadedUrls = await this.uploadImages(this.selectedImages)
        
        if (uploadedUrls.length === 0) {
          this.isPublishing = false
          uni.showToast({
            title: '图片上传失败，请重试',
            icon: 'none'
          })
          return
        }
      }
      
      // 重置发布状态
      this.isPublishing = false
      
      // 跳转到下一步
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
    },
    
    /**
     * 清空所有数据
     */
    clearAllData() {
      this.topicContent = ''
      this.selectedImages = []
      this.imageUrls = []
      this.enableTextToImage = false
      
      // 清空检测状态
      this.imageCheckStatus = []
      this.allImagesChecked = false
      this.isPublishing = false
      
      console.log('✅ 数据已清空')
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
