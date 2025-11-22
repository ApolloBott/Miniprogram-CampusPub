<template>
  <view class="feedback-container">
    <view class="feedback-header">
      <text class="header-title">问题反馈</text>
      <text class="header-desc">请描述您遇到的问题，我们会尽快处理</text>
    </view>

    <!-- 反馈内容输入框 -->
    <view class="feedback-content">
      <textarea 
        class="content-input" 
        v-model="feedbackContent"
        placeholder="请详细描述您遇到的问题..."
        maxlength="500"
        :auto-height="true"
        placeholder-style="color: #999;"
      />
      <view class="char-count">{{ feedbackContent.length }}/500</view>
    </view>

    <!-- 图片上传区域 -->
    <view class="image-upload">
      <view class="upload-title">上传图片（选填）</view>
      <view class="image-list">
        <!-- 已选择的图片 -->
        <view 
          class="image-item" 
          v-for="(image, index) in selectedImages" 
          :key="index"
        >
          <image :src="image" mode="aspectFill" class="image-preview" />
          <view class="image-delete" @tap="deleteImage(index)">
            <text class="delete-icon">×</text>
          </view>
        </view>

        <!-- 添加图片按钮 -->
        <view 
          class="image-add" 
          @tap="chooseImage"
          v-if="selectedImages.length < 6"
        >
          <text class="add-icon">+</text>
          <text class="add-text">添加图片</text>
        </view>
      </view>
      <view class="upload-tip">最多上传6张图片，每张不超过5MB</view>
    </view>

    <!-- 提交按钮 -->
    <view class="submit-btn-wrapper">
      <button 
        class="submit-btn" 
        :class="{ 'btn-disabled': !canSubmit || submitting }"
        :disabled="!canSubmit || submitting"
        @tap="submitFeedback"
      >
        {{ submitting ? '提交中...' : '提交反馈' }}
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      feedbackContent: '',      // 反馈内容
      selectedImages: [],       // 选中的图片路径
      imageUrls: [],            // 上传后的图片URL
      submitting: false,        // 是否正在提交
      uploading: false,         // 是否正在上传图片
      openid: ''                // 用户openid
    };
  },

  computed: {
    // 是否可以提交
    canSubmit() {
      return this.feedbackContent.trim().length > 0 && !this.submitting;
    }
  },

  onLoad() {
    // 获取用户openid（根据你的实际情况获取）
    this.openid = uni.getStorageSync('openid') || '';
  },

  methods: {
    // 选择图片
    chooseImage() {
      const remainCount = 6 - this.selectedImages.length;
      
      uni.chooseImage({
        count: remainCount,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          
          // 检查图片大小
          const validImages = [];
          const maxSize = 5 * 1024 * 1024; // 5MB
          
          tempFilePaths.forEach(path => {
            uni.getFileInfo({
              filePath: path,
              success: (info) => {
                if (info.size <= maxSize) {
                  validImages.push(path);
                  this.selectedImages.push(path);
                } else {
                  uni.showToast({
                    title: '图片不能超过5MB',
                    icon: 'none'
                  });
                }
              }
            });
          });
        }
      });
    },

    // 删除图片
    deleteImage(index) {
      uni.showModal({
        title: '提示',
        content: '确定删除这张图片吗？',
        success: (res) => {
          if (res.confirm) {
            this.selectedImages.splice(index, 1);
            // 如果已经上传了，也删除对应的URL
            if (this.imageUrls.length > index) {
              this.imageUrls.splice(index, 1);
            }
          }
        }
      });
    },

    // 上传图片到OSS
    async uploadImages(filePaths) {
      if (!filePaths || filePaths.length === 0) {
        return [];
      }

      this.uploading = true;
      uni.showLoading({
        title: `上传中 0/${filePaths.length}`,
        mask: true
      });

      try {
        const uploadedUrls = [];

        for (let i = 0; i < filePaths.length; i++) {
          const filePath = filePaths[i];

          uni.showLoading({
            title: `上传中 ${i + 1}/${filePaths.length}`,
            mask: true
          });

          console.log(`[${i + 1}] 获取上传凭证...`);
          const { data: tokenRes } = await uni.$http.get('/upload/token', {
            openid: this.openid,
            fileType: 'image'
          });

          if (tokenRes.meta.status !== 200) {
            throw new Error('获取上传凭证失败');
          }

          const fileContent = await new Promise((resolve, reject) => {
            uni.getFileSystemManager().readFile({
              filePath: filePath,
              encoding: 'base64',
              success: (res) => resolve(res.data),
              fail: reject
            });
          });

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
                  resolve(res);
                } else {
                  reject(new Error(`上传失败: ${res.statusCode}`));
                }
              },
              fail: reject
            });
          });

          uploadedUrls.push(tokenRes.message.publicUrl);
          console.log(`[${i + 1}] 上传成功:`, tokenRes.message.publicUrl);
        }

        uni.hideLoading();
        console.log('✅ 所有图片上传完成:', uploadedUrls);
        return uploadedUrls;

      } catch (error) {
        console.error('[ERROR] 上传失败:', error);
        uni.hideLoading();
        uni.showToast({
          title: error.message || '图片上传失败',
          icon: 'none',
          duration: 2000
        });
        return [];
      } finally {
        this.uploading = false;
      }
    },

    // 提交反馈
    async submitFeedback() {
      // 验证反馈内容
      if (!this.feedbackContent.trim()) {
        uni.showToast({
          title: '请输入反馈内容',
          icon: 'none'
        });
        return;
      }

      this.submitting = true;

      try {
        // 如果有图片，先上传图片
        let uploadedImageUrls = [];
        if (this.selectedImages.length > 0) {
          uni.showLoading({
            title: '正在上传图片...',
            mask: true
          });
          uploadedImageUrls = await this.uploadImages(this.selectedImages);
          
          // 如果上传失败，询问是否继续提交
          if (uploadedImageUrls.length < this.selectedImages.length) {
            const continueSubmit = await new Promise((resolve) => {
              uni.showModal({
                title: '提示',
                content: '部分图片上传失败，是否继续提交反馈？',
                success: (res) => resolve(res.confirm),
                fail: () => resolve(false)
              });
            });
            
            if (!continueSubmit) {
              this.submitting = false;
              return;
            }
          }
        }

        // 提交反馈到后端
        uni.showLoading({
          title: '提交中...',
          mask: true
        });

        const { data: res } = await uni.$http.post('/feedback/create', {
          content: this.feedbackContent.trim(),
          images: uploadedImageUrls.length > 0 ? uploadedImageUrls : null
        });

        uni.hideLoading();

        if (res.meta.status === 200) {
          uni.showToast({
            title: '反馈提交成功',
            icon: 'success',
            duration: 2000
          });

          // 延迟返回上一页
          setTimeout(() => {
            uni.navigateBack();
          }, 2000);
        } else {
          throw new Error(res.meta.msg || '提交失败');
        }

      } catch (error) {
        console.error('[ERROR] 提交反馈失败:', error);
        uni.hideLoading();
        uni.showToast({
          title: error.message || '提交失败，请重试',
          icon: 'none',
          duration: 2000
        });
      } finally {
        this.submitting = false;
      }
    }
  }
};
</script>

<style lang="scss">
.feedback-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.feedback-header {
  background: #fff;
  padding: 30rpx;
  border-radius: 16rpx;
  margin-bottom: 20rpx;

  .header-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    display: block;
    margin-bottom: 10rpx;
  }

  .header-desc {
    font-size: 28rpx;
    color: #999;
    display: block;
  }
}

.feedback-content {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  position: relative;

  .content-input {
    width: 100%;
    min-height: 300rpx;
    font-size: 30rpx;
    color: #333;
    line-height: 1.6;
  }

  .char-count {
    position: absolute;
    right: 30rpx;
    bottom: 20rpx;
    font-size: 24rpx;
    color: #999;
  }
}

.image-upload {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;

  .upload-title {
    font-size: 30rpx;
    color: #333;
    font-weight: bold;
    margin-bottom: 20rpx;
  }

  .image-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
  }

  .image-item {
    width: 200rpx;
    height: 200rpx;
    border-radius: 12rpx;
    overflow: hidden;
    position: relative;

    .image-preview {
      width: 100%;
      height: 100%;
    }

    .image-delete {
      position: absolute;
      top: 0;
      right: 0;
      width: 50rpx;
      height: 50rpx;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 0 0 0 12rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      .delete-icon {
        color: #fff;
        font-size: 40rpx;
        line-height: 1;
      }
    }
  }

  .image-add {
    width: 200rpx;
    height: 200rpx;
    border: 2rpx dashed #ddd;
    border-radius: 12rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fafafa;

    .add-icon {
      font-size: 60rpx;
      color: #999;
      line-height: 1;
      margin-bottom: 10rpx;
    }

    .add-text {
      font-size: 24rpx;
      color: #999;
    }
  }

  .upload-tip {
    font-size: 24rpx;
    color: #999;
    margin-top: 20rpx;
  }
}

.submit-btn-wrapper {
  padding: 30rpx;

  .submit-btn {
    width: 100%;
    height: 88rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    font-size: 32rpx;
    border-radius: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;

    &.btn-disabled {
      background: #e0e0e0;
      color: #999;
    }
  }
}
</style>
