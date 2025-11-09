<template>
  <view class="edit-profile-page">
    <!-- 导航栏 -->
    <view class="navbar">
      <view class="navbar-left" @click="goBack">
        <uni-icons type="left" size="24" color="#333"></uni-icons>
      </view>
      <text class="navbar-title">编辑资料</text>
      <view class="navbar-right" @click="saveProfile">
        <text class="save-text">保存</text>
      </view>
    </view>
    
    <!-- 编辑表单 -->
    <scroll-view class="form-container" scroll-y>
      <!-- 头像 -->
      <view class="form-section">
        <view class="form-item avatar-item">
          <text class="form-label">头像</text>
          <view class="avatar-upload" @click="changeAvatar">
            <image 
              :src="editForm.avatarUrl || '/static/default-avatar.png'" 
              class="upload-avatar"
              mode="aspectFill"
            ></image>
            <uni-icons type="camera" size="24" color="#fff" class="camera-icon"></uni-icons>
          </view>
        </view>
      </view>
      
      <!-- 基本信息 -->
      <view class="form-section">
        <view class="form-item">
          <text class="form-label">昵称</text>
          <input 
            v-model="editForm.nickname" 
            class="form-input"
            placeholder="请输入昵称"
            maxlength="20"
          />
        </view>
        
        <view class="form-item">
          <text class="form-label">性别</text>
          <view class="gender-selector">
            <view 
              class="gender-option"
              :class="{ active: editForm.user_sex === '男' }"
              @click="editForm.user_sex = '男'"
            >
              <text>男</text>
            </view>
            <view 
              class="gender-option"
              :class="{ active: editForm.user_sex === '女' }"
              @click="editForm.user_sex = '女'"
            >
              <text>女</text>
            </view>
            <view
              class="gender-option"
              :class="{ active: editForm.user_sex === '保密' }"
              @click="editForm.user_sex = '保密'"
            >
              <text>保密</text>
            </view>
          </view>
        </view>
        
        <!-- 🔥 修改：学院改为只读显示 -->
        <view class="form-item">
          <text class="form-label">学院</text>
          <view class="form-readonly">
            <text class="readonly-text">{{ editForm.major || '暂无' }}</text>
            <text class="readonly-tip">此信息不可修改</text>
          </view>
        </view>
      </view>
      
      <!-- 个人简介 -->
      <view class="form-section">
        <view class="form-item">
          <text class="form-label">个人简介</text>
          <textarea 
            v-model="editForm.user_introduce" 
            class="form-textarea"
            placeholder="请输入个人简介"
            maxlength="200"
            :show-count="true"
          ></textarea>
        </view>
      </view>
      
      <!-- 提示信息 -->
      <view class="form-tips">
        <text class="tips-text">• 头像和昵称是您在社区的展示名片</text>
        <text class="tips-text">• 学院信息由系统认证，不可修改</text>
        <text class="tips-text">• 真实的个人信息有助于建立信任</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'EditProfile',
  data() {
    return {
      editForm: {
        nickname: '',
        avatarUrl: '',
        user_sex: '',
        major: '', // 🔥 只用于显示，不会被修改
        user_introduce: ''
      },
      uploading: false,
      hasChanges: false,
	  enableWatch: false  // 🔥 新增
    }
  },
  
  computed: {
    ...mapState('m_user', ['userBase', 'openid', 'userMajor'])
  },
  
  onLoad() {
    this.initEditForm()
	// 🔥 延迟启用监听
	    this.$nextTick(() => {
	      this.enableWatch = true
	    })
  },
  
  // 监听表单变化
  watch: {
    editForm: {
      handler() {
         // 🔥 修复：只有启用监听后才标记
               if (this.enableWatch) {
                 this.hasChanges = true
               }
      },
      deep: true
    }
  },
  
  // 返回前提示
  onBackPress() {
    if (this.hasChanges) {
      uni.showModal({
        title: '提示',
        content: '您有未保存的修改，确定要离开吗？',
        success: (res) => {
          if (res.confirm) {
            uni.navigateBack()
          }
        }
      })
      return true // 阻止默认返回
    }
  },
  
  methods: {
    ...mapMutations('m_user', ['updateUserBase']),
    
    // 初始化表单
    initEditForm() {
      this.editForm = {
        nickname: this.userBase.nickname || '',
        avatarUrl: this.userBase.avatarUrl || '',
        user_sex: this.userBase.user_sex || '保密',
        major: this.userBase.major || '', // 🔥 只读字段
        user_introduce: this.userBase.user_introduce || ''
      }
      this.hasChanges = false
	  this.enableWatch = false  // 🔥 保存后禁用监听，避免导航返回时误判
    },
    
    // 返回
    goBack() {
      if (this.hasChanges) {
        uni.showModal({
          title: '提示',
          content: '您有未保存的修改，确定要离开吗？',
          success: (res) => {
            if (res.confirm) {
              uni.navigateBack()
            }
          }
        })
      } else {
        uni.navigateBack()
      }
    },
    
    // 保存资料
    async saveProfile() {
      if (!this.editForm.nickname.trim()) {
        return uni.showToast({ 
          title: '昵称不能为空', 
          icon: 'none' 
        })
      }

      try {
        uni.showLoading({ title: '保存中...', mask: true })
        
        // 🔥 修改：不发送 major 字段到后端
        const { data: res } = await uni.$http.post('/users/updateProfile', {
          openid: this.userBase.openid,
          nickname: this.editForm.nickname.trim(),
          avatarUrl: this.editForm.avatarUrl,
          user_sex: this.editForm.user_sex,
          major: this.editForm.major.trim(),
          user_introduce: this.editForm.user_introduce.trim()
        })

        if (res.meta.status === 200) {
          // 更新 Vuex
          this.updateUserBase({
            ...this.userBase,
            nickname: this.editForm.nickname.trim(),
            avatarUrl: this.editForm.avatarUrl,
            user_sex: this.editForm.user_sex,
            major: this.editForm.major,
            user_introduce: this.editForm.user_introduce.trim()
          })

          this.hasChanges = false
          
          uni.showToast({ 
            title: '保存成功', 
            icon: 'success',
            duration: 1500
          })
          
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        } else {
          throw new Error(res.meta.msg || '保存失败')
        }
      } catch (error) {
        console.error('保存资料失败:', error)
        uni.showToast({ 
          title: error.message || '保存失败', 
          icon: 'none' 
        })
      } finally {
        uni.hideLoading()
      }
    },
    
    // 更换头像
    changeAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: async (res) => {
          const tempFilePath = res.tempFilePaths[0]
          const uploadedUrls = await this.uploadImages([tempFilePath])
          
          if (uploadedUrls && uploadedUrls.length > 0) {
            this.editForm.avatarUrl = uploadedUrls[0]
            uni.showToast({ 
              title: '头像已更新', 
              icon: 'success' 
            })
          }
        },
        fail: (err) => {
          console.error('选择图片失败:', err)
          uni.showToast({
            title: '选择图片失败',
            icon: 'none'
          })
        }
      })
    },
    
    // 上传图片
    async uploadImages(filePaths) {
      if (!filePaths || filePaths.length === 0) {
        return []
      }

      this.uploading = true
      uni.showLoading({
        title: '上传中...',
        mask: true
      })

      const imageUrls = []

      try {
        for (let i = 0; i < filePaths.length; i++) {
          const filePath = filePaths[i]

          // 获取上传凭证
          const { data: tokenRes } = await uni.$http.get('/upload/token', {
            openid: this.openid,
            fileType: 'image'
          })

          if (tokenRes.meta.status !== 200) {
            throw new Error('获取上传凭证失败')
          }

          // 读取文件内容
          const fileContent = await new Promise((resolve, reject) => {
            uni.getFileSystemManager().readFile({
              filePath: filePath,
              encoding: 'base64',
              success: (res) => resolve(res.data),
              fail: reject
            })
          })

          // 上传到云存储
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

          imageUrls.push(tokenRes.message.publicUrl)
        }

        uni.hideLoading()
        return imageUrls

      } catch (error) {
        console.error('[ERROR] 上传失败:', error)
        uni.hideLoading()
        uni.showToast({
          title: error.message || '上传失败',
          icon: 'none',
          duration: 2000
        })
        return []
      } finally {
        this.uploading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-profile-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 导航栏 */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
  
  .navbar-left,
  .navbar-right {
    width: 60px;
  }
  
  .navbar-left {
    display: flex;
    align-items: center;
  }
  
  .navbar-right {
    display: flex;
    justify-content: flex-end;
    
    .save-text {
      font-size: 16px;
      color: #007aff;
      font-weight: 500;
    }
  }
  
  .navbar-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
}

/* 表单容器 */
.form-container {
  height: calc(100vh - 50px);
  padding-bottom: 20px;
}

.form-section {
  background-color: #fff;
  margin-top: 10px;
  padding: 0 20px;
}

.form-item {
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  &.avatar-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .form-label {
    display: block;
    font-size: 15px;
    color: #333;
    margin-bottom: 12px;
    font-weight: 500;
  }
  
  .avatar-upload {
    position: relative;
    width: 80px;
    height: 80px;
    
    .upload-avatar {
      width: 100%;
      height: 100%;
      border-radius: 40px;
      background-color: #f0f0f0;
    }
    
    .camera-icon {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 28px;
      height: 28px;
      background-color: #007aff;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #fff;
    }
  }
  
  .form-input {
    width: 100%;
    padding: 12px 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
    font-size: 15px;
    border: none;
    color: #333;
    
    &::placeholder {
      color: #999;
    }
  }
  
  // 🔥 新增：只读字段样式
  .form-readonly {
    padding: 12px 15px;
    background-color: #fafafa;
    border-radius: 8px;
    border: 1px dashed #e0e0e0;
    
    .readonly-text {
      display: block;
      font-size: 15px;
      color: #666;
      margin-bottom: 6px;
    }
    
    .readonly-tip {
      display: block;
      font-size: 12px;
      color: #999;
    }
  }
  
  .gender-selector {
    display: flex;
    gap: 12px;
    
    .gender-option {
      flex: 1;
      padding: 12px;
      background-color: #f5f5f5;
      border-radius: 8px;
      text-align: center;
      font-size: 15px;
      color: #666;
      transition: all 0.2s;
      
      &.active {
        background-color: #007aff;
        color: #fff;
        font-weight: 500;
      }
    }
  }
  
  .form-textarea {
    width: 100%;
    min-height: 120px;
    padding: 12px 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
    font-size: 15px;
    border: none;
    color: #333;
    line-height: 1.6;
    
    &::placeholder {
      color: #999;
    }
  }
}

/* 提示信息 */
.form-tips {
  margin-top: 20px;
  padding: 0 20px;
  
  .tips-text {
    display: block;
    font-size: 13px;
    color: #999;
    line-height: 2;
    
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}
</style>
