<!-- 
<template>
  <view class="verification-page">
    <view class="verified-status" v-if="verificationInfo && verificationInfo.status === 1">
      <view class="status-icon">✅</view>
      <text class="status-title">校园认证已通过</text>
      <text class="status-desc">您已完成校园身份认证，享受专属权益</text>
      <view class="verified-info">
        <view class="info-item">
          <text class="label">认证时间：</text>
          <text class="value">{{ formatTime(verificationInfo.review_time) }}</text>
        </view>
        <view class="info-item">
          <text class="label">认证状态：</text>
          <text class="value verified">已认证用户</text>
        </view>
      </view>
    </view>
    
    
    <view class="pending-status" v-else-if="verificationInfo && verificationInfo.status === 0">
      <view class="status-icon">⏳</view>
      <text class="status-title">认证审核中</text>
      <text class="status-desc">您的认证申请正在审核中，通常1-3个工作日内完成</text>
      <text class="submit-time">提交时间：{{ formatTime(verificationInfo.submit_time) }}</text>
    </view>

    <view class="failed-status" v-else-if="verificationInfo && verificationInfo.status === 2">
      <view class="status-icon">❌</view>
      <text class="status-title">认证未通过</text>
      <text class="status-desc">很遗憾，您的认证申请未通过审核</text>
      <view class="fail-reason" v-if="verificationInfo.admin_remark">
        <text class="reason-title">未通过原因：</text>
        <text class="reason-text">{{ verificationInfo.admin_remark }}</text>
      </view>
      

      <view class="time-limit" v-if="!canRetry">
        <text class="limit-title">⏰ 重新申请限制</text>
        <text class="limit-desc">为避免频繁申请，请在 {{ remainingTime }} 后重新提交认证</text>
      </view>
      
      <view class="retry-btn" @click="startVerification" :class="{ 'disabled': !canRetry }">
        <text>{{ canRetry ? '重新认证' : `${remainingTime}后可重试` }}</text>
      </view>
    </view>
    

    <view class="verification-form" v-else>
      <view class="form-header">
        <view class="header-icon">🎓</view>
        <text class="header-title">校园身份认证</text>
        <text class="header-desc">上传校园卡正反面完成身份认证</text>
      </view>

      <view class="guide-section">
        <text class="section-title">📷 拍照指导</text>
        <text class="section-desc">请按照以下示例拍摄您的校园卡正反面</text>
        
        <view class="guide-images">
          <view class="guide-item">
            <image 
              class="guide-image" 
              src="https://wait00.oss-cn-shanghai.aliyuncs.com/guide/campus-card-front.jpg"
              mode="aspectFit"
            ></image>
            <text class="guide-label">校园卡正面示例</text>
            <text class="guide-tip">确保姓名、照片、学号清晰可见</text>
          </view>
          <view class="guide-item">
            <image 
              class="guide-image" 
              src="https://wait00.oss-cn-shanghai.aliyuncs.com/guide/campus-card-back.jpg" 
              mode="aspectFit"
            ></image>
            <text class="guide-label">校园卡背面示例</text>
            <text class="guide-tip">确保学校名称、有效期清晰可见</text>
          </view>
        </view>
        

        <view class="photo-requirements">
          <text class="req-title">拍照要求：</text>
          <view class="req-list">
            <text class="req-item">• 光线充足，避免反光</text>
            <text class="req-item">• 卡片平整，信息清晰</text>
            <text class="req-item">• 避免遮挡重要信息</text>
            <text class="req-item">• 建议使用深色背景</text>
          </view>
        </view>
      </view>
      
      <view class="form-section">
        <text class="section-title">📋 上传校园卡</text>
        <text class="section-desc">请上传校园卡正反面照片（必须上传2张）</text>
        
        <view class="image-upload">
          <view class="upload-grid">

            <view class="upload-item">
              <text class="upload-label">校园卡正面 *</text>
              <view class="upload-area" @click="chooseImage('front')">
                <image 
                  v-if="frontImage" 
                  class="uploaded-image" 
                  :src="frontImage" 
                  mode="aspectFill"
                ></image>
                <view v-else class="upload-placeholder" :class="{ 'uploading': uploading === 'front' }">
                  <text class="upload-icon">{{ uploading === 'front' ? '⏳' : '📷' }}</text>
                  <text class="upload-text">{{ uploading === 'front' ? '上传中...' : '点击上传正面' }}</text>
                </view>
                <view v-if="frontImage" class="delete-btn" @click.stop="deleteImage('front')">
                  <text>×</text>
                </view>
              </view>
            </view>
            
            <view class="upload-item">
              <text class="upload-label">校园卡背面 *</text>
              <view class="upload-area" @click="chooseImage('back')">
                <image 
                  v-if="backImage" 
                  class="uploaded-image" 
                  :src="backImage" 
                  mode="aspectFill"
                ></image>
                <view v-else class="upload-placeholder" :class="{ 'uploading': uploading === 'back' }">
                  <text class="upload-icon">{{ uploading === 'back' ? '⏳' : '📷' }}</text>
                  <text class="upload-text">{{ uploading === 'back' ? '上传中...' : '点击上传背面' }}</text>
                </view>
                <view v-if="backImage" class="delete-btn" @click.stop="deleteImage('back')">
                  <text>×</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="notice-section">
        <text class="notice-title">📋 认证须知</text>
        <view class="notice-list">
          <text class="notice-item">• 仅支持本校在读学生认证</text>
          <text class="notice-item">• 请确保照片真实有效</text>
          <text class="notice-item">• 认证信息仅用于身份验证</text>
          <text class="notice-item">• 审核时间：1-3个工作日</text>
          <text class="notice-item">• 认证失败后24小时内不可重新申请</text>
        </view>
      </view>
      
      <view class="submit-btn" @click="submitVerification" :class="{ 'disabled': isSubmitting || !canSubmit }">
        <text>{{ isSubmitting ? '提交中...' : '提交认证' }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      verificationInfo: null, // 认证信息
      frontImage: '', // 正面图片URL
      backImage: '', // 背面图片URL
      frontImageUrl: '', // 正面云端URL
      backImageUrl: '', // 背面云端URL
      uploading: '', // 当前上传状态 'front' | 'back' | ''
      isSubmitting: false,
    }
  },
  
  computed: {
    ...mapState('m_user', ['openid', 'userBase']),
    
    // 🔧 新增：是否可以提交
    canSubmit() {
      return this.frontImageUrl && this.backImageUrl && !this.uploading && !this.isSubmitting
    },
    
    // 🔧 新增：是否可以重试（24小时限制）
    canRetry() {
      if (!this.verificationInfo || this.verificationInfo.status !== 2) {
        return true
      }
      
      const reviewTime = new Date(this.verificationInfo.review_time).getTime()
      const now = new Date().getTime()
      const hoursPassed = (now - reviewTime) / (1000 * 60 * 60)
      
      return hoursPassed >= 24
    },
    
    // 🔧 新增：剩余等待时间
    remainingTime() {
      if (!this.verificationInfo || this.verificationInfo.status !== 2) {
        return ''
      }
      
      const reviewTime = new Date(this.verificationInfo.review_time).getTime()
      const now = new Date().getTime()
      const hoursRemaining = 24 - (now - reviewTime) / (1000 * 60 * 60)
      
      if (hoursRemaining <= 0) return ''
      
      const hours = Math.floor(hoursRemaining)
      const minutes = Math.floor((hoursRemaining - hours) * 60)
      
      if (hours > 0) {
        return `${hours}小时${minutes}分钟`
      } else {
        return `${minutes}分钟`
      }
    }
  },
  
  onLoad() {
    this.loadVerificationInfo()
    
    // 🔧 新增：定时更新剩余时间
    this.timer = setInterval(() => {
      if (this.verificationInfo && this.verificationInfo.status === 2 && !this.canRetry) {
        this.$forceUpdate()
      }
    }, 60000) // 每分钟更新一次
  },
  
  onUnload() {
    // 清除定时器
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  
  methods: {
    // 加载认证信息
    async loadVerificationInfo() {
      try {
        const { data: res } = await uni.$http.get('/verification/info', {
          openid: this.openid
        })
        
        if (res.meta.status === 200) {
          this.verificationInfo = res.message
          console.log('认证信息:', this.verificationInfo)
        }
      } catch (error) {
        console.error('加载认证信息失败:', error)
      }
    },
    
    // 开始认证（重新认证）
    startVerification() {
      if (!this.canRetry) {
        uni.showToast({
          title: '请稍后再试',
          icon: 'none'
        })
        return
      }
      
      this.verificationInfo = null
      this.frontImage = ''
      this.backImage = ''
      this.frontImageUrl = ''
      this.backImageUrl = ''
    },
    
    // 🔧 修改：选择图片（区分正反面）
    chooseImage(type) {
      if (this.uploading) {
        uni.showToast({
          title: '正在上传中，请稍候',
          icon: 'none'
        })
        return
      }
      
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: async (res) => {
          const tempFilePath = res.tempFilePaths[0]
          
          // 先显示本地图片
          if (type === 'front') {
            this.frontImage = tempFilePath
          } else {
            this.backImage = tempFilePath
          }
          
          // 立即上传到 OSS
          await this.uploadImage(tempFilePath, type)
        }
      })
    },
    
    // 🔧 新增：删除图片
    deleteImage(type) {
      if (type === 'front') {
        this.frontImage = ''
        this.frontImageUrl = ''
      } else {
        this.backImage = ''
        this.backImageUrl = ''
      }
    },
    
    // 🔧 修改：上传单张图片
    async uploadImage(filePath, type) {
      this.uploading = type
      
      try {
        // 1. 获取上传凭证
        const { data: tokenRes } = await uni.$http.get('/upload/token', {
          openid: this.openid,
          fileType: 'image'
        })

        if (tokenRes.meta.status !== 200) {
          throw new Error('获取上传凭证失败')
        }

        // 2. 读取文件
        const fileContent = await new Promise((resolve, reject) => {
          uni.getFileSystemManager().readFile({
            filePath: filePath,
            encoding: 'base64',
            success: (res) => resolve(res.data),
            fail: reject
          })
        })

        // 3. 上传到 OSS
        await new Promise((resolve, reject) => {
          uni.request({
            url: tokenRes.message.publicUrl,
            method: 'PUT',
            header: {
              'Content-Type': 'image/jpeg'
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

        // 4. 保存云端 URL
        if (type === 'front') {
          this.frontImageUrl = tokenRes.message.publicUrl
        } else {
          this.backImageUrl = tokenRes.message.publicUrl
        }

        console.log(`${type === 'front' ? '正面' : '背面'}上传成功:`, tokenRes.message.publicUrl)

        uni.showToast({
          title: `${type === 'front' ? '正面' : '背面'}上传成功`,
          icon: 'success',
          duration: 1500
        })

      } catch (error) {
        console.error('[ERROR] 上传失败:', error)
        uni.showToast({
          title: error.message || '上传失败',
          icon: 'none',
          duration: 3000
        })
        
        // 上传失败时，清除本地图片
        if (type === 'front') {
          this.frontImage = ''
        } else {
          this.backImage = ''
        }
      } finally {
        this.uploading = ''
      }
    },
    
    // 🔧 修改：提交认证申请
    async submitVerification() {
      try {
        if (!this.canSubmit) {
          uni.showToast({
            title: '请上传校园卡正反面照片',
            icon: 'none'
          })
          return
        }
        
        if (this.isSubmitting) return
        
        this.isSubmitting = true
        
        uni.showLoading({
          title: '提交中...',
          mask: true
        })
        
        // 🔧 修改：简化提交数据
        const { data: res } = await uni.$http.post('/verification/submit', {
          openid: this.openid,
          nickname: this.userBase.nickname,
          avatarUrl: this.userBase.avatarUrl,
          verificationImages: [this.frontImageUrl, this.backImageUrl]
        })
        
        uni.hideLoading()
        
        if (res.meta.status === 201) {
          uni.showToast({
            title: '提交成功，请等待审核',
            icon: 'success',
            duration: 2000
          })
          
          // 重新加载认证信息
          setTimeout(() => {
            this.loadVerificationInfo()
          }, 1000)
          
        } else {
          throw new Error(res.meta.msg || '提交失败')
        }
        
      } catch (error) {
        uni.hideLoading()
        console.error('提交认证申请失败:', error)
        uni.showToast({
          title: error.message || '提交失败，请重试',
          icon: 'none'
        })
      } finally {
        this.isSubmitting = false
      }
    },
    
    // 格式化时间
    formatTime(timestamp) {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    }
  }
}
</script>

<style lang="scss">
.verification-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

// 已认证状态
.verified-status,
.pending-status,
.failed-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 40rpx;
  text-align: center;
  
  .status-icon {
    font-size: 120rpx;
    margin-bottom: 32rpx;
  }
  
  .status-title {
    font-size: 36rpx;
    color: #333333;
    font-weight: 600;
    margin-bottom: 16rpx;
  }
  
  .status-desc {
    font-size: 28rpx;
    color: #666666;
    line-height: 1.5;
    margin-bottom: 32rpx;
  }
}

.verified-info {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-top: 32rpx;
  width: 100%;
  box-sizing: border-box;
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .label {
      font-size: 28rpx;
      color: #999999;
    }
    
    .value {
      font-size: 28rpx;
      color: #333333;
      font-weight: 500;
      
      &.verified {
        color: #10b981;
        font-weight: 600;
      }
    }
  }
}

.submit-time {
  font-size: 26rpx;
  color: #999999;
}

.fail-reason {
  background-color: #fff5f5;
  border: 1rpx solid #fecaca;
  border-radius: 12rpx;
  padding: 24rpx;
  margin: 32rpx 0;
  width: 100%;
  box-sizing: border-box;
  
  .reason-title {
    font-size: 26rpx;
    color: #dc2626;
    font-weight: 500;
    display: block;
    margin-bottom: 8rpx;
  }
  
  .reason-text {
    font-size: 26rpx;
    color: #dc2626;
    line-height: 1.5;
  }
}

// 🔧 新增：时间限制样式
.time-limit {
  background-color: #fef3c7;
  border: 1rpx solid #f59e0b;
  border-radius: 12rpx;
  padding: 24rpx;
  margin: 32rpx 0;
  width: 100%;
  box-sizing: border-box;
  
  .limit-title {
    font-size: 26rpx;
    color: #92400e;
    font-weight: 500;
    display: block;
    margin-bottom: 8rpx;
  }
  
  .limit-desc {
    font-size: 26rpx;
    color: #92400e;
    line-height: 1.5;
  }
}

.retry-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  padding: 24rpx 48rpx;
  border-radius: 32rpx;
  font-size: 28rpx;
  font-weight: 500;
  margin-top: 32rpx;
  transition: all 0.3s;
  
  &:active {
    opacity: 0.8;
  }
  
  &.disabled {
    background: #9ca3af;
    opacity: 0.6;
  }
}

// 认证表单
.verification-form {
  padding: 32rpx;
}

.form-header {
  text-align: center;
  margin-bottom: 48rpx;
  
  .header-icon {
    font-size: 120rpx;
    margin-bottom: 24rpx;
  }
  
  .header-title {
    font-size: 36rpx;
    color: #333333;
    font-weight: 600;
    margin-bottom: 12rpx;
    display: block;
  }
  
  .header-desc {
    font-size: 28rpx;
    color: #666666;
    line-height: 1.5;
  }
}

// 🔧 新增：拍照指导样式
.guide-section {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  
  .section-title {
    font-size: 32rpx;
    color: #333333;
    font-weight: 500;
    margin-bottom: 16rpx;
    display: block;
  }
  
  .section-desc {
    font-size: 26rpx;
    color: #666666;
    line-height: 1.5;
    margin-bottom: 32rpx;
    display: block;
  }
}

.guide-images {
  display: flex;
  gap: 24rpx;
  margin-bottom: 32rpx;
  
  .guide-item {
    flex: 1;
    text-align: center;
    
    .guide-image {
      width: 100%;
      height: 200rpx;
      border-radius: 12rpx;
      border: 2rpx solid #e5e7eb;
      margin-bottom: 16rpx;
    }
    
    .guide-label {
      font-size: 28rpx;
      color: #374151;
      font-weight: 500;
      display: block;
      margin-bottom: 8rpx;
    }
    
    .guide-tip {
      font-size: 24rpx;
      color: #6b7280;
      line-height: 1.4;
    }
  }
}

.photo-requirements {
  background-color: #f9fafb;
  border-radius: 12rpx;
  padding: 24rpx;
  border-left: 4rpx solid #3b82f6;
  
  .req-title {
    font-size: 28rpx;
    color: #1f2937;
    font-weight: 500;
    margin-bottom: 12rpx;
    display: block;
  }
  
  .req-list {
    display: flex;
    flex-direction: column;
    gap: 8rpx;
    
    .req-item {
      font-size: 26rpx;
      color: #4b5563;
      line-height: 1.4;
    }
  }
}

.form-section {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  
  .section-title {
    font-size: 32rpx;
    color: #333333;
    font-weight: 500;
    margin-bottom: 16rpx;
    display: block;
  }
  
  .section-desc {
    font-size: 26rpx;
    color: #666666;
    line-height: 1.5;
    margin-bottom: 32rpx;
    display: block;
  }
}

// 🔧 修改：图片上传样式
.image-upload {
  .upload-grid {
    display: flex;
    gap: 24rpx;
  }
  
  .upload-item {
    flex: 1;
    
    .upload-label {
      font-size: 28rpx;
      color: #374151;
      font-weight: 500;
      margin-bottom: 16rpx;
      display: block;
    }
    
    .upload-area {
      position: relative;
      width: 100%;
      height: 240rpx;
      border-radius: 12rpx;
      overflow: hidden;
      
      .uploaded-image {
        width: 100%;
        height: 100%;
        border-radius: 12rpx;
      }
      
      .upload-placeholder {
        width: 100%;
        height: 100%;
        background-color: #f9fafb;
        border: 2rpx dashed #d1d5db;
        border-radius: 12rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        
        &.uploading {
          background-color: #eff6ff;
          border-color: #3b82f6;
          
          .upload-icon,
          .upload-text {
            color: #3b82f6;
          }
        }
        
        .upload-icon {
          font-size: 48rpx;
          color: #9ca3af;
          margin-bottom: 8rpx;
        }
        
        .upload-text {
          font-size: 24rpx;
          color: #9ca3af;
        }
      }
      
      .delete-btn {
        position: absolute;
        top: -8rpx;
        right: -8rpx;
        width: 48rpx;
        height: 48rpx;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        
        text {
          font-size: 28rpx;
          color: #ffffff;
          line-height: 1;
        }
      }
    }
  }
}

.notice-section {
  background-color: #f0f9ff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 48rpx;
  border-left: 4rpx solid #0ea5e9;
  
  .notice-title {
    font-size: 28rpx;
    color: #0369a1;
    font-weight: 500;
    margin-bottom: 16rpx;
    display: block;
  }
  
  .notice-list {
    display: flex;
    flex-direction: column;
    gap: 8rpx;
    
    .notice-item {
      font-size: 26rpx;
      color: #0369a1;
      line-height: 1.5;
    }
  }
}

// 提交按钮
.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 96rpx;
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.4);
  transition: all 0.3s;
  
  &:active {
    transform: scale(0.98);
  }
  
  &.disabled {
    background: #9ca3af;
    opacity: 0.6;
    pointer-events: none;
    box-shadow: none;
  }
  
  text {
    font-size: 32rpx;
    color: #ffffff;
    font-weight: 500;
  }
}
</style> -->

<template>
  <view class="verification-page">
    <!-- 已认证状态 -->
    <view class="verified-status" v-if="isVerified">
      <view class="status-icon">✅</view>
      <text class="status-title">校园认证已通过</text>
      <text class="status-desc">您已完成校园身份认证，可以使用所有功能</text>
      
      <!-- 确认按钮 -->
      <view class="retry-btn" @click="confirmAndBack">
        <text>确认</text>
      </view>
    </view>
    
    <!-- 认证表单 -->
    <view class="verification-form" v-else>
      <view class="form-header">
        <text class="header-icon">🎓</text>
        <text class="header-title">校园身份认证</text>
        <text class="header-desc">请填写真实信息完成身份认证</text>
      </view>
      
      <view class="form-section">
        <!-- 姓名输入 -->
        <view class="form-item">
          <view class="item-label">
            <text>姓名</text>
            <text class="required">*</text>
          </view>
          <input 
            class="item-input"
            v-model="formData.name"
            placeholder="请输入真实姓名"
            placeholder-class="input-placeholder"
            maxlength="10"
          />
          <text class="error-tip" v-if="errors.name">{{ errors.name }}</text>
        </view>
        
        <!-- 学号输入 -->
        <view class="form-item">
          <view class="item-label">
            <text>学号</text>
            <text class="required">*</text>
          </view>
          <input 
            class="item-input"
            v-model="formData.studentId"
            placeholder="请输入11位学号"
            placeholder-class="input-placeholder"
            type="number"
            maxlength="11"
          />
          <text class="hint-tip">学号为11位数字</text>
          <text class="error-tip" v-if="errors.studentId">{{ errors.studentId }}</text>
        </view>
        
        <!-- 🔥 新增：学院选择 -->
        <view class="form-item">
          <view class="item-label">
            <text>学院</text>
            <text class="required">*</text>
          </view>
          <picker 
            mode="selector" 
            :range="allDepartments" 
            :value="departmentIndex"
            @change="onDepartmentChange"
          >
            <view class="picker-input" :class="{ 'has-value': formData.department }">
              <text class="picker-text">{{ formData.department || '请选择学院' }}</text>
              <text class="picker-arrow">▼</text>
            </view>
          </picker>
          <text class="error-tip" v-if="errors.department">{{ errors.department }}</text>
        </view>
      </view>
      
      <!-- 注意事项 -->
      <view class="notice-section">
        <view class="notice-title">📌 注意事项</view>
        <view class="notice-item">
          <text>• 请确保填写的姓名、学号和学院信息真实有效</text>
        </view>
        <view class="notice-item">
          <text>• 学院信息请谨慎填写，填写后无法修改</text>
        </view>
        <view class="notice-item">
          <text>• 认证通过后可享受所有功能</text>
        </view>
      </view>
      
      <!-- 提交按钮 -->
      <button 
        class="submit-btn"
        :class="{ 'submitting': isSubmitting }"
        @click="submitVerification"
        :disabled="isSubmitting"
      >
        <text>{{ isSubmitting ? '提交中...' : '提交认证' }}</text>
      </button>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      isVerified: false,
      verificationData: {
        name: '',
        studentId: '',
        department: '',  // 🔥 新增
        verifyTime: ''
      },
      formData: {
        name: '',
        studentId: '',
        department: ''  // 🔥 新增
      },
      errors: {
        name: '',
        studentId: '',
        department: ''  // 🔥 新增
      },
      isSubmitting: false,
      
      // 🔥 新增：学院列表
      allDepartments: [
        '中国语言文学系',
        '国际汉语文化学院',
        '外语学院',
        '经济与管理学院',
        '亚欧商学院',
        '公共管理学院',
        '统计学院',
        '传播学院',
        '历史学系',
        '哲学系',
        '政治与国际关系学院',
        '马克思主义学院',
        '法学院',
        '社会发展学院',
        '教育学部',
        '心理与认知科学学院',
        '数学科学学院',
        '物理与电子科学学院',
        '通信与电子工程学院',
        '计算机科学与技术学院',
        '软件工程学院',
        '数据科学与工程学院',
        '化学与分子工程学院',
        '生命科学学院',
        '地理科学学院',
        '生态与环境科学学院',
        '空间人工智能学院',
        '美术学院',
        '设计学院',
        '音乐学院',
        '体育与健康学院'
      ],
      departmentIndex: -1  // 🔥 新增：当前选中的学院索引
    }
  },
  
  onLoad() {
    // this.checkVerificationStatus()
  },
  
  computed: {
	  ...mapState('m_user', ['token', 'code', 'userBase', 'openid', 'userMajor']),
  },
  
  methods: {
    // 🔥 新增：学院选择变化
    onDepartmentChange(e) {
      const index = e.detail.value
      this.departmentIndex = index
      this.formData.department = this.allDepartments[index]
      this.errors.department = ''  // 清除错误提示
    },
    
    
    // 🔥 修改：表单验证 - 增加学院验证
    validateForm() {
      let isValid = true
      this.errors = {
        name: '',
        studentId: '',
        department: ''
      }
      
      // 验证姓名
      if (!this.formData.name.trim()) {
        this.errors.name = '请输入姓名'
        isValid = false
      } else if (this.formData.name.trim().length < 2) {
        this.errors.name = '姓名至少需要2个字符'
        isValid = false
      }
      
      // 验证学号
      if (!this.formData.studentId) {
        this.errors.studentId = '请输入学号'
        isValid = false
      } else if (!/^\d{11}$/.test(this.formData.studentId)) {
        this.errors.studentId = '学号必须为11位数字'
        isValid = false
      }
      
      // 🔥 新增：验证学院
      if (!this.formData.department) {
        this.errors.department = '请选择学院'
        isValid = false
      }
      
      return isValid
    },
    
    // 🔥 修改：提交认证 - 包含学院信息
    async submitVerification() {
      if (this.isSubmitting) return
      
      // 表单验证
      if (!this.validateForm()) {
        const firstError = this.errors.name || this.errors.studentId || this.errors.department
        uni.showToast({
          title: firstError,
          icon: 'none',
          duration: 2000
        })
        return
      }
      
      this.isSubmitting = true
      
      uni.showLoading({
        title: '认证中...',
        mask: true
      })
      
      try {
        // ✅ 传递完整的认证信息（包括学院）
        const { data: res } = await uni.$http.post('/verification/nano_submit', {
          openid: this.openid,
          // name: this.formData.name.trim(),           // 姓名
          // studentId: this.formData.studentId,        // 学号
          department: this.formData.department       // 学院（通过 departmentIndex 选择）
        })
        
        uni.hideLoading()
        
        if (res.mata.status === 200) {
          // 保存认证信息
          this.verificationData = {
            name: this.formData.name,
            studentId: this.formData.studentId,
            department: this.formData.department,
            verifyTime: this.formatCurrentTime()
          }
          
          uni.showToast({
            title: '认证成功',
            icon: 'success',
            duration: 2000
          })
          
          // 更新状态
          this.isVerified = true
          
          // 清空表单
          this.formData = {
            name: '',
            studentId: '',
            department: ''
          }
          this.departmentIndex = -1
          
        } else {
          uni.showToast({
            title: res.mata.msg || '认证失败，请重试',
            icon: 'none'
          })
        }
        
      } catch (error) {
        uni.hideLoading()
        console.error('认证失败:', error)
        uni.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        })
      } finally {
        this.isSubmitting = false
      }
    },

    
    // 确认并返回上一页
    confirmAndBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    
    // 格式化当前时间
    formatCurrentTime() {
      const date = new Date()
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    }
  }
}
</script>

<style lang="scss">
.verification-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.verified-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 40rpx;
  text-align: center;
  
  .status-icon {
    font-size: 120rpx;
    margin-bottom: 32rpx;
  }
  
  .status-title {
    font-size: 36rpx;
    color: #333333;
    font-weight: 600;
    margin-bottom: 16rpx;
  }
  
  .status-desc {
    font-size: 28rpx;
    color: #666666;
    line-height: 1.5;
    margin-bottom: 32rpx;
  }
}

.verified-info {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-top: 32rpx;
  width: 100%;
  max-width: 600rpx;
  box-sizing: border-box;
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .label {
      font-size: 28rpx;
      color: #999999;
    }
    
    .value {
      font-size: 28rpx;
      color: #333333;
      font-weight: 500;
    }
  }
}

.retry-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  padding: 24rpx 48rpx;
  border-radius: 32rpx;
  font-size: 28rpx;
  font-weight: 500;
  margin-top: 48rpx;
  transition: all 0.3s;
  
  &:active {
    opacity: 0.8;
    transform: scale(0.98);
  }
}

.verification-form {
  padding: 32rpx;
}

.form-header {
  text-align: center;
  margin-bottom: 48rpx;
  
  .header-icon {
    font-size: 120rpx;
    margin-bottom: 24rpx;
  }
  
  .header-title {
    font-size: 36rpx;
    color: #333333;
    font-weight: 600;
    margin-bottom: 12rpx;
    display: block;
  }
  
  .header-desc {
    font-size: 28rpx;
    color: #666666;
    line-height: 1.5;
  }
}

.form-section {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
}

.form-item {
  margin-bottom: 32rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .item-label {
    font-size: 28rpx;
    color: #333333;
    font-weight: 500;
    margin-bottom: 16rpx;
    display: flex;
    align-items: center;
    
    .required {
      color: #ef4444;
      margin-left: 4rpx;
    }
  }
  
  .item-input {
    width: 100%;
    height: 88rpx;
    background-color: #f9fafb;
    border: 2rpx solid #e5e7eb;
    border-radius: 12rpx;
    padding: 0 24rpx;
    font-size: 28rpx;
    color: #333333;
    box-sizing: border-box;
    transition: all 0.3s;
    
    &:focus {
      background-color: #ffffff;
      border-color: #667eea;
    }
  }
  
  .input-placeholder {
    color: #9ca3af;
  }
  
  /* 🔥 新增：学院选择器样式 */
  .picker-input {
    width: 100%;
    height: 88rpx;
    background-color: #f9fafb;
    border: 2rpx solid #e5e7eb;
    border-radius: 12rpx;
    padding: 0 24rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s;
    
    .picker-text {
      font-size: 28rpx;
      color: #9ca3af;
      flex: 1;
    }
    
    &.has-value .picker-text {
      color: #333333;
    }
    
    .picker-arrow {
      font-size: 24rpx;
      color: #9ca3af;
      margin-left: 12rpx;
    }
  }
  
  .hint-tip {
    font-size: 24rpx;
    color: #6b7280;
    margin-top: 8rpx;
    display: block;
  }
  
  .error-tip {
    font-size: 24rpx;
    color: #ef4444;
    margin-top: 8rpx;
    display: block;
  }
}

.notice-section {
  background-color: #f0f9ff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 48rpx;
  border-left: 4rpx solid #3b82f6;
  
  .notice-title {
    font-size: 28rpx;
    color: #1e40af;
    font-weight: 600;
    margin-bottom: 16rpx;
  }
  
  .notice-item {
    font-size: 24rpx;
    color: #475569;
    line-height: 1.8;
    margin-bottom: 8rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.submit-btn {
  width: 100%;
  height: 96rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 600;
  border-radius: 16rpx;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.4);
  
  &:active {
    transform: translateY(2rpx);
    box-shadow: 0 4rpx 12rpx rgba(102, 126, 234, 0.3);
  }
  
  &.submitting {
    opacity: 0.7;
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
  }
  
  &::after {
    border: none;
  }
}
</style>

