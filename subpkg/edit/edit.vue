<template>
  <view class="edit-profile-page">
    <view class="navbar">
      <view class="navbar-left" @click="goBack">
        <uni-icons type="left" size="24" color="#333"></uni-icons>
      </view>
      <text class="navbar-title">编辑资料</text>
      <view class="navbar-right" @click="saveProfile">
        <text class="save-text">保存</text>
      </view>
    </view>
    
    <scroll-view class="form-container" scroll-y>
      <view class="form-section">
        <view class="form-item avatar-item">
          <text class="form-label">头像</text>
          <view class="avatar-upload" @click="openAvatarSelector">
            <image 
              :src="editForm.avatarUrl || '/static/default-avatar.png'" 
              class="upload-avatar"
              mode="aspectFill"
            ></image>
            <uni-icons type="loop" size="20" color="#fff" class="camera-icon"></uni-icons>
          </view>
        </view>
      </view>
      
      <view class="form-section">
        
        <view class="form-item nickname-item">
          <text class="form-label">昵称</text>
          <view class="nickname-generator">
            <text class="nickname-display">{{ editForm.nickname }}</text>
            <view class="random-button" @click="generateRandomNickname(true)">
              <uni-icons type="refreshempty" size="20" color="#007aff"></uni-icons>
              <text class="random-text">换一个</text>
            </view>
          </view>
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
        
        <view class="form-item">
          <text class="form-label">学院</text>
          <view class="form-readonly">
            <text class="readonly-text">{{ editForm.major || '暂无' }}</text>
            <text class="readonly-tip">此信息不可修改</text>
          </view>
        </view>
      </view>
      
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
      
      <view class="form-tips">
        <text class="tips-text">• 头像和昵称是您在社区的展示名片</text>
        <text class="tips-text">• 学院信息由系统认证，不可修改</text>
        <text class="tips-text">• 真实的个人信息有助于建立信任</text>
      </view>
    </scroll-view>
    
    <uni-popup ref="avatarPopup" type="bottom" background-color="#fff">
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-title">选择一个头像</text>
          <view class="popup-close" @click="closeAvatarPopup">
            <uni-icons type="close" size="22" color="#999"></uni-icons>
          </view>
        </view>
        <scroll-view class="avatar-grid-container" scroll-y>
          <view class="avatar-grid">
            <image
              v-for="(url, index) in presetAvatars"
              :key="index"
              :src="url"
              class="grid-avatar"
              mode="aspectFill"
              @click="selectAvatar(url)"
              :class="{ 'selected': editForm.avatarUrl === url }"
            ></image>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
    
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'EditProfile',
  data() {
    // 预设头像列表
    const presetAvatarList = Array.from({ length: 40 }, (_, i) => {
      return `https://wait00.oss-cn-shanghai.aliyuncs.com/profile/${i + 1}.png`
    })
    
    // 🔥 MODIFIED: 更新为你的最新词库
    const nameStyles = [
      {
        // 风格1: 可爱
        adjectives: [
          '软萌', '阳光', '软糯', '蓬松', '乖巧',
          '暖暖', '泡泡', '糯糯', '迷茫', '忧郁'
        ],
        nouns: [
          '西蓝花', '鲷鱼烧', '草莓派', '热可可',
          '奇异果', '小麻薯', '小可颂', '小曲奇', '星冰乐',
          '菠萝包', '小云吞', '糯米团', '小泡芙', '排骨年糕'
        ]
      },
      {
        // 风格2: 校园/地名
        adjectives: [
          '虹梅南路', '中山北路', '剑川路上', '金沙江路', '东川路的',
          '莲花南路', '老子思维', '量子思维', '求实创造', '为人师表',
          '丽娃河畔', '樱桃河畔'
        ],
        nouns: [
          '秋实阁', '夏雨厅', '冬月厅', '冬日厅', '满天星',
          '环球港', '苏州河', '黄浦江'
        ]
      },
      {
        // 风格3: 科技/学术
        adjectives: [
          '轮换', '异步', '正交', '全息', '冒泡', '异构', '正则', '赛博',
          '类脑', '互易', '脉冲', '矩阵', '导电'
        ],
        nouns: [
          '量子思维', '老子思维', '多项式', '逻辑门', 'CMOS', 'TTL', '二叉树',
          '超导体', '光子束', '算力核', '模块机', '智能端', '逆矩阵',
          '对称阵子', '八木天线', '牛顿环', '希尔伯特空间', 'pn结', '干涉仪', '示波器'
        ]
      },
      {
        // 风格4: 文艺/抽象
        adjectives: [
          '暮色', '星澜', '风栖', '云上', '微光', '秋色', '月白', '遥远', '淡墨', '枝间',
          '山海', '雾起', '岁月', '青藤', '轻舟', '温柔', '晴空', '流光', '雨落', '清晨'
        ],
        nouns: [
          '小心心', '小泡泡', '小问号', '小叹号', '小方块', '暖粒子', '小灵感', '小记忆', '小能量',
          '小音符', '轻情绪', '小希望', '小梦境', '小计划', '小故事', '小念头', '小宇宙', '小期待'
        ]
      }
    ]
    
    return {
      editForm: {
        nickname: '',
        avatarUrl: '',
        user_sex: '',
        major: '', 
        user_introduce: ''
      },
      hasChanges: false,
	    enableWatch: false,
      presetAvatars: presetAvatarList,
      nameStyles: nameStyles,
      // 🔥 NEW: 添加风格索引计数器
      currentStyleIndex: 0
    }
  },
  
  computed: {
    ...mapState('m_user', ['userBase', 'openid', 'userMajor'])
  },
  
  onLoad() {
    this.initEditForm()
	    this.$nextTick(() => {
	      this.enableWatch = true
	    })
  },
  
  // 监听表单变化 (无修改)
  watch: {
    editForm: {
      handler() {
               if (this.enableWatch) {
                 this.hasChanges = true
               }
      },
      deep: true
    }
  },
  
  // 返回前提示 (无修改)
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
      return true
    }
  },
  
  methods: {
    ...mapMutations('m_user', ['updateUserBase']),
    
    // 🔥 MODIFIED: 初始化表单
    initEditForm() {
      this.editForm = {
        nickname: this.userBase.nickname || '',
        avatarUrl: this.userBase.avatarUrl || '',
        user_sex: this.userBase.user_sex || '保密',
        major: this.userBase.major || '',
        user_introduce: this.userBase.user_introduce || ''
      }
      
      if (!this.editForm.nickname) {
        // 🔥 MODIFIED: 初始化时生成昵称，但不推进计数器
        this.generateRandomNickname(false) 
      }
      
      this.hasChanges = false
	  this.enableWatch = false
    },
    
    // 🔥 MODIFIED: 生成随机昵称的逻辑
    /**
     * @param {boolean} incrementStyle - 是否推进风格计数器（用户点击时为true，初始化时为false）
     */
    generateRandomNickname(incrementStyle = false) {
      
      // 1. 决定使用哪个索引
      let styleIndexToUse = this.currentStyleIndex;
      
      // 2. 如果是用户点击“换一个”，则推进索引
      if (incrementStyle) {
        // 推进索引，并使用 % 运算符确保循环
        this.currentStyleIndex = (this.currentStyleIndex + 1) % this.nameStyles.length;
        styleIndexToUse = this.currentStyleIndex;
      }
      
      const selectedStyle = this.nameStyles[styleIndexToUse];
      
      let newName = '';
      let attempts = 0; // 安全锁，防止死循环
      
      // 3. 循环直到生成一个不重复的昵称
      do {
        const adjIndex = Math.floor(Math.random() * selectedStyle.adjectives.length);
        const adj = selectedStyle.adjectives[adjIndex];
        
        const nounIndex = Math.floor(Math.random() * selectedStyle.nouns.length);
        const noun = selectedStyle.nouns[nounIndex];
        
        newName = (adj + noun).substring(0, 20);
        attempts++;
      } while (
        newName === this.editForm.nickname && // 避免和当前昵称重复
        (selectedStyle.adjectives.length > 1 || selectedStyle.nouns.length > 1) && // 确保词库有足够多的词
        attempts < 10 // 最多尝试10次
      );

      // 4. 赋值
      this.editForm.nickname = newName;
    },
    
    // 返回 (无修改)
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
    
    // 保存资料 (无修改)
    async saveProfile() {
      if (!this.editForm.nickname.trim()) {
        return uni.showToast({ 
          title: '昵称不能为空', 
          icon: 'none' 
        })
      }

      try {
        uni.showLoading({ title: '保存中...', mask: true })
        
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
    
    // 头像弹窗方法 (无修改)
    openAvatarSelector() {
      this.$refs.avatarPopup.open()
    },
    
    closeAvatarPopup() {
      this.$refs.avatarPopup.close()
    },
    
    selectAvatar(url) {
      this.editForm.avatarUrl = url
      this.closeAvatarPopup()
    },
  }
}
</script>

<style lang="scss" scoped>
/* 所有样式与上一版（随机昵称版）完全相同
  ... (此处省略所有样式，请使用上一版中提供的完整样式)
*/

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

/* 昵称生成器样式 (无修改) */
.form-item.nickname-item {
  .nickname-generator {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
    
    .nickname-display {
      font-size: 15px;
      color: #333;
      font-weight: 500;
      flex: 1;
      margin-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .random-button {
      display: flex;
      align-items: center;
      background-color: #eaf2ff;
      padding: 6px 10px;
      border-radius: 20px;
      
      ::v-deep .uni-icons {
        margin-right: 0 !important;
      }
      
      .random-text {
        font-size: 13px;
        color: #007aff;
        margin-left: 4px;
        font-weight: 500;
      }
    }
  }
}

/* 提示信息 (无修改) */
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

/* 头像弹窗样式 (无修改) */
.popup-content {
  padding: 20px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    .popup-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
    
    .popup-close {
      padding: 5px; 
    }
  }
}

.avatar-grid-container {
  max-height: 40vh;
  
  .avatar-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 15px;
    
    .grid-avatar {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background-color: #f0f0f0;
      border: 2px solid transparent;
      transition: all 0.2s;
      
      &.selected {
        border-color: #007aff;
        transform: scale(1.1);
      }
    }
  }
}
</style>