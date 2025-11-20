<template>
  <view class="profile-page">
    <view class="navbar">
      <view class="navbar-left" @click="goBack">
        <uni-icons type="left" size="24" color="#333"></uni-icons>
      </view>
      <text class="navbar-title">个人资料</text>
      <view class="navbar-right"></view>
    </view>
    
    <view class="profile-list">
      <view class="list-item" @click="openAvatarPopup">
        <text class="item-label">头像</text>
        <view class="item-value">
          <image 
            :src="editForm.avatarUrl || '/static/default-avatar.png'" 
            class="item-avatar"
            mode="aspectFill"
          ></image>
        </view>
        <uni-icons type="right" size="18" color="#bbb"></uni-icons>
      </view>
      
      <view class="list-item" @click="openNicknamePopup">
        <text class="item-label">昵称</text>
        <view class="item-value">
          <text class="item-text">{{ editForm.nickname }}</text>
        </view>
        <uni-icons type="right" size="18" color="#bbb"></uni-icons>
      </view>
      
      <view class="list-item" @click="openGenderPopup">
        <text class="item-label">性别</text>
        <view class="item-value">
          <text class="item-text">{{ editForm.user_sex }}</text>
        </view>
        <uni-icons type="right" size="18" color="#bbb"></uni-icons>
      </view>
      
      <view class="list-item readonly">
        <text class="item-label">学院</text>
        <view class="item-value">
          <text class="item-text readonly-text">{{ editForm.major || '暂无' }}</text>
        </view>
      </view>
      
      <view class="list-item" @click="openBioPopup">
        <text class="item-label">个人简介</text>
        <view class="item-value">
          <text class="item-text bio-text">{{ editForm.user_introduce || '未填写' }}</text>
        </view>
        <uni-icons type="right" size="18" color="#bbb"></uni-icons>
      </view>
    </view>
    
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
    
    <uni-popup ref="nicknamePopup" type="center" :is-mask-click="false">
      <view class="edit-popup-container">
        <view class="popup-header-with-save">
          <text class="popup-action-btn" @click="closeNicknamePopup">取消</text>
          <text class="popup-title">修改昵称</text>
          <text class="popup-action-btn save" @click="saveNickname">保存</text>
        </view>
        <view class="popup-body">
          <view class="nickname-generator">
            <text class="nickname-display">{{ tempNickname }}</text>
            <view class="random-button" @click="generateRandomNickname(true)">
              <uni-icons type="refreshempty" size="20" color="#007aff"></uni-icons>
              <text class="random-text">换一个</text>
            </view>
          </view>
          <text class="popup-tip">为你推荐一个昵称，点击"换一个"可切换</text>
        </view>
      </view>
    </uni-popup>
    
    <uni-popup ref="bioPopup" type="center" :is-mask-click="false">
      <view class="edit-popup-container">
        <view class="popup-header-with-save">
          <text class="popup-action-btn" @click="closeBioPopup">取消</text>
          <text class="popup-title">修改简介</text>
          <text class="popup-action-btn save" @click="saveBio">保存</text>
        </view>
        <view class="popup-body">
          <textarea 
            v-model="tempBio" 
            class="popup-textarea"
            placeholder="请输入个人简介"
            maxlength="200"
            :show-count="true"
          ></textarea>
        </view>
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
    const presetAvatarList = Array.from({ length: 25 }, (_, i) => {
      return `https://wait00.oss-cn-shanghai.aliyuncs.com/profile/${i + 1}.png`
    })
    
    // 昵称词库
    const nameStyles = [
      {
        adjectives: ['软萌', '阳光', '软糯', '蓬松', '乖巧', '暖暖', '泡泡', '糯糯', '迷茫', '忧郁'],
        nouns: ['西蓝花', '鲷鱼烧', '草莓派', '热可可', '奇异果', '小麻薯', '小可颂', '小曲奇', '星冰乐', '菠萝包', '小云吞', '糯米团', '小泡芙', '排骨年糕']
      },
      {
        adjectives: ['虹梅南路', '中山北路', '剑川路上', '金沙江路', '东川路的', '莲花南路', '老子思维', '量子思维', '求实创造', '为人师表', '丽娃河畔', '樱桃河畔', '紫竹的'],
        nouns: ['秋实阁', '夏雨厅', '冬月厅', '冬日厅', '满天星', '光华书院', '大零号湾', '环球港', '苏州河', '黄浦江']
      },
      {
        adjectives: ['轮换', '异步', '正交', '全息', '冒泡', '异构', '正则', '赛博', '类脑', '互易', '脉冲', '矩阵', '导电'],
        nouns: ['量子思维', '老子思维', '多项式', '逻辑门', 'CMOS', 'TTL', '二叉树', '超导体', '光子束', '算力核', '模块机', '智能端', '逆矩阵', '对称阵子', '八木天线', '牛顿环', '希尔伯特空间', 'pn结', '干涉仪', '示波器']
      },
      {
        adjectives: ['暮色', '星澜', '风栖', '云上', '微光', '秋色', '月白', '遥远', '淡墨', '枝间', '山海', '雾起', '岁月', '青藤', '轻舟', '温柔', '晴空', '流光', '雨落', '清晨'],
        nouns: ['小心心', '小泡泡', '小问号', '小叹号', '小方块', '暖粒子', '小灵感', '小记忆', '小能量', '小音符', '轻情绪', '小希望', '小梦境', '小计划', '小故事', '小念头', '小宇宙', '小期待']
      }
    ]
    
    return {
      // editForm 仍用于存储页面的“最终”状态
      editForm: {
        nickname: '',
        avatarUrl: '',
        user_sex: '',
        major: '', 
        user_introduce: ''
      },
      presetAvatars: presetAvatarList,
      nameStyles: nameStyles,
      currentStyleIndex: 0,
      
      // 🔥 NEW: 用于弹窗的临时数据
      tempNickname: '',
      tempBio: '',
      
      // 🔥 REMOVED: hasChanges, enableWatch
    }
  },
  
  computed: {
    ...mapState('m_user', ['userBase', 'openid', 'userMajor'])
  },
  
  onLoad() {
    this.initEditForm()
  },
  
  // 🔥 REMOVED: watch, onBackPress
  
  methods: {
    ...mapMutations('m_user', ['updateUserBase']),
    
    // 🔥 MODIFIED: 初始化表单 (移除 change tracking)
    initEditForm() {
      this.editForm = {
        nickname: this.userBase.nickname || '',
        avatarUrl: this.userBase.avatarUrl || '',
        user_sex: this.userBase.user_sex || '保密',
        major: this.userBase.major || '',
        user_introduce: this.userBase.user_introduce || ''
      }
      
      // 如果昵称为空，则自动生成一个
      if (!this.editForm.nickname) {
        this.generateRandomNickname(false, 'editForm') // 直接修改 editForm
      }
      
      // 初始化临时变量
      this.tempNickname = this.editForm.nickname
      this.tempBio = this.editForm.user_introduce
    },
    
    // 🔥 MODIFIED: 简化返回
    goBack() {
      uni.navigateBack()
    },
    
    // 🔥 MODIFIED: 重命名为 commitProfileChanges
    // 这是一个通用的保存方法，用于保存所有字段
    async commitProfileChanges() {
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
            ...this.editForm
          })
          
          uni.showToast({ 
            title: '保存成功', 
            icon: 'success',
            duration: 1000
          })
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
    
    // --- 1. 头像逻辑 ---
    openAvatarPopup() {
      this.$refs.avatarPopup.open()
    },
    
    closeAvatarPopup() {
      this.$refs.avatarPopup.close()
    },
    
    // 🔥 MODIFIED: 选择后立刻保存
    async selectAvatar(url) {
      this.editForm.avatarUrl = url
      await this.commitProfileChanges() // 立即提交保存
      this.closeAvatarPopup()
    },

    // --- 2. 昵称逻辑 ---
    openNicknamePopup() {
      // 打开弹窗时，用 editForm 的值覆盖 tempNickname
      this.tempNickname = this.editForm.nickname
      this.$refs.nicknamePopup.open()
    },
    
    closeNicknamePopup() {
      this.$refs.nicknamePopup.close()
    },
    
    async saveNickname() {
      this.editForm.nickname = this.tempNickname // 确认修改
      await this.commitProfileChanges() // 提交保存
      this.closeNicknamePopup()
    },
    
    // 🔥 MODIFIED: generateRandomNickname
    // target = 'temp' (在弹窗中) 或 'editForm' (在初始化时)
    generateRandomNickname(incrementStyle = false, target = 'temp') {
      let styleIndexToUse = this.currentStyleIndex;
      
      if (incrementStyle) {
        this.currentStyleIndex = (this.currentStyleIndex + 1) % this.nameStyles.length;
        styleIndexToUse = this.currentStyleIndex;
      }
      
      const selectedStyle = this.nameStyles[styleIndexToUse];
      let newName = '';
      let attempts = 0;
      
      const currentName = (target === 'temp') ? this.tempNickname : this.editForm.nickname;
      
      do {
        const adjIndex = Math.floor(Math.random() * selectedStyle.adjectives.length);
        const adj = selectedStyle.adjectives[adjIndex];
        const nounIndex = Math.floor(Math.random() * selectedStyle.nouns.length);
        const noun = selectedStyle.nouns[nounIndex];
        newName = (adj + noun).substring(0, 20);
        attempts++;
      } while (
        newName === currentName &&
        (selectedStyle.adjectives.length > 1 || selectedStyle.nouns.length > 1) &&
        attempts < 10
      );

      if (target === 'temp') {
        this.tempNickname = newName;
      } else {
        this.editForm.nickname = newName;
      }
    },
    
    // --- 3. 性别逻辑 ---
    openGenderPopup() {
      uni.showActionSheet({
        itemList: ['男', '女', '保密'],
        success: async (res) => {
          const gender = ['男', '女', '保密'][res.tapIndex]
          this.editForm.user_sex = gender
          await this.commitProfileChanges() // 立即提交保存
        },
        fail: (err) => {
          console.log(err.errMsg)
        }
      })
    },
    
    // --- 4. 简介逻辑 ---
    openBioPopup() {
      this.tempBio = this.editForm.user_introduce
      this.$refs.bioPopup.open()
    },
    
    closeBioPopup() {
      this.$refs.bioPopup.close()
    },
    
    async saveBio() {
      this.editForm.user_introduce = this.tempBio
      await this.commitProfileChanges()
      this.closeBioPopup()
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 导航栏 (无修改) */
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
  .navbar-left { display: flex; align-items: center; }
  .navbar-right { display: flex; justify-content: flex-end; }
  .navbar-title { font-size: 18px; font-weight: 600; color: #333; }
}

/* 🔥 NEW: 微信风格列表样式 */
.profile-list {
  margin-top: 10px;
  background-color: #fff;
  
  .list-item {
    display: flex;
    align-items: center;
    padding: 18px 20px;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .item-label {
      font-size: 16px;
      color: #333;
      width: 100px; // 固定标签宽度
    }
    
    .item-value {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 10px;
      
      .item-avatar {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        background-color: #f0f0f0;
      }
      
      .item-text {
        font-size: 16px;
        color: #888;
        // 文本过长时省略
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .bio-text {
        max-width: 180px; // 限制简介宽度
      }
      
      .readonly-text {
        color: #333; // 只读文本颜色深一点
      }
    }
    
    // 只读项
    &.readonly {
      .item-value {
        margin-right: 0; // 没有箭头，不需要间距
      }
    }
  }
}

/* 🔥 NEW: 弹窗样式 */
.edit-popup-container {
  width: 85vw;
  background-color: #fff;
  border-radius: 12px;
  
  .popup-header-with-save {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #f0f0f0;
    
    .popup-title {
      font-size: 17px;
      font-weight: 600;
    }
    
    .popup-action-btn {
      font-size: 16px;
      color: #555;
      
      &.save {
        color: #007aff;
        font-weight: 500;
      }
    }
  }
  
  .popup-body {
    padding: 20px;
  }
  
  .popup-tip {
    display: block;
    font-size: 12px;
    color: #999;
    margin-top: 10px;
    text-align: center;
  }
  
  .popup-textarea {
    width: 100%;
    min-height: 120px;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 8px;
    font-size: 15px;
    line-height: 1.6;
    box-sizing: border-box; // 确保 padding 不会撑开
  }
}

/* 🔥 沿用并修改: 昵称生成器样式 (用于弹窗) */
.nickname-generator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-sizing: border-box;
  
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


/* 🔥 沿用: 头像弹窗样式 (无修改) */
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