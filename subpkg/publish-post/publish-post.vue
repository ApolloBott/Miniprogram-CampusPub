<template>
  <view class="publish-page">
    <!-- 🎯 修改:内容输入区 + 图片选择 + 话题讨论整合 -->
    <view class="content-section">
      <!-- 顶部工具栏 -->
      <view class="content-header">
        <text class="header-title">分享新鲜事</text>
        <!-- 话题讨论切换按钮 -->
      </view>

      <!-- 内容输入框 -->
      <textarea 
        class="content-input"
        v-model="postContent"
        placeholder="分享新鲜事..."
        placeholder-class="content-placeholder"
        :maxlength="500"
        auto-height
      />
      
	     <!-- 🔥 新增：内容与标签联合显示区 -->
	     <view class="content-with-tags">
	       <!-- <text class="content-text">{{ postContent }}</text> -->
	       <view class="inline-tags" v-if="selectedTagsInContent.length > 0">
	         <view 
	           class="tag-badge"
	           v-for="(tag, index) in selectedTagsInContent"
	           :key="index"
	           @click="removeTag(tag)"
	         >
	           <text class="tag-text">#{{ tag }}</text>
	         </view>
	       </view>
	     </view>
		
       <!-- 字数统计 -->
        <view class="content-count">
          <text :class="{ 'over-limit': postContent.length > 500 }">
            {{ postContent.length }}/500
          </text>
          <text class="tag-count" v-if="selectedTagsInContent.length > 0">
            已选 {{ selectedTagsInContent.length }}/3 个标签
          </text>
        </view>
		
		  <!-- 🔥 可选标签区域（移到字数统计下方） -->
		   <view class="available-tags" v-if="availableTags.length > 0">
		     <view 
		       class="tag-item available"
		       v-for="(tag, index) in availableTags"
		       :key="index"
		       @click="addTag(tag)"
		     >
		       <text class="tag-text">#{{ tag }}</text>
		     </view>
		   </view>
      
      <!-- 图片网格区域 -->
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
    
    <!-- 二手商品关联区域 -->
    <view class="goods-link-section" v-if="selectedTagsInContent.includes('二手')">
      <text class="section-title">商品关联（可选）</text>
      
      <view class="goods-link-toggle" @click="toggleGoodsLink">
        <text class="toggle-label">关联我发布的商品</text>
        <view class="toggle-switch" :class="{ 'active': enableGoodsLink }">
          <view class="toggle-circle"></view>
        </view>
      </view>
      
      <view class="selected-goods" v-if="enableGoodsLink && selectedGoods">
        <view class="goods-card" @click="gotoSelectGoods">
          <image 
            class="goods-image" 
            :src="selectedGoods.goods_small_logo || selectedGoods.goods_big_logo" 
            mode="aspectFill"
          ></image>
          <view class="goods-info">
            <text class="goods-name">{{ selectedGoods.goods_name }}</text>
            <text class="goods-price">¥{{ selectedGoods.goods_price }}</text>
          </view>
          <text class="change-btn">更换</text>
        </view>
      </view>
      
      <view class="select-goods-btn" v-if="enableGoodsLink && !selectedGoods" @click="gotoSelectGoods">
        <text class="select-icon">📦</text>
        <text class="select-text">选择商品</text>
      </view>
      
      <view class="goods-tips" v-if="enableGoodsLink">
        <text>💡 关联商品后，用户可以直接查看商品详情</text>
      </view>
    </view>
    
    <!-- 联系方式设置 -->
    <view class="contact-section">
      <text class="section-title">联系方式（可选）</text>
      
      <view class="contact-toggle" @click="toggleContact">
        <text class="toggle-label">允许他人联系我</text>
        <view class="toggle-switch" :class="{ 'active': enableContact }">
          <view class="toggle-circle"></view>
        </view>
      </view>
      
      <view class="contact-input-container" v-if="enableContact">
        <view class="input-label">
          <text>联系方式</text>
          <text class="input-tip">请输入微信号或QQ号</text>
        </view>
        <input 
          class="contact-input"
          v-model="contactInfo"
          placeholder="请输入微信号或QQ号"
          placeholder-class="input-placeholder"
          :maxlength="50"
        />
        <view class="contact-tips">
          <text>💡 提示：他人可点击"联系TA"复制您的联系方式，没有校园认证的用户无法获取您的联系方式</text>
        </view>
      </view>
    </view>
    
    <!-- 发布范围设置 -->
    <view class="department-section">
      <text class="section-title">发布范围（可选）</text>
      

	  <!-- 🔥 新增:仅自己可见选项 -->
	  <view class="only-myself-option">
	    <view class="option-header" @click="toggleOnlyMyself">
	      <view class="option-left">
	        <text class="option-label">仅自己可见</text>
	        <text class="option-desc">开启后该帖子只有你能看到</text>
	      </view>
	      <view class="toggle-switch" :class="{ 'active': onlyMyself }">
	        <view class="toggle-circle"></view>
	      </view>
	    </view>
	  </view>
      
      <view class="department-tip">
        <text>💡 提示：不能同时设置"不发布到"和"只发布到"</text>
      </view>
    </view>
        
    <!-- 发布按钮 -->
    <view class="publish-btn" @click="publishPost" :class="{ 'disabled': isPublishing }">
      <text>{{ isPublishing ? '发布中...' : '发布' }}</text>
    </view>
    
    <!-- 院系选择弹窗 -->
    <view class="department-modal" v-if="showModal" @click="closeModal">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <text class="modal-title">
            {{ modalType === 'exclude' ? '选择不发布的院系（可多选）' : '选择只发布的院系' }}
          </text>
          <text class="modal-close" @click="closeModal">×</text>
        </view>
        
        <scroll-view class="modal-body" scroll-y>
          <view 
            class="department-item"
            v-for="(dept, index) in displayDepartments"
            :key="index"
            :class="{ 'selected': isDepartmentSelected(dept) }"
            @click="toggleDepartment(dept)"
          >
            <text class="department-name">{{ dept }}</text>
            <text class="department-check" v-if="isDepartmentSelected(dept)">✓</text>
          </view>
          
          <view class="empty-tip" v-if="modalType === 'include' && !userBase.major">
            <text class="empty-icon">📋</text>
            <text class="empty-text">您的个人信息中未设置院系</text>
          </view>
        </scroll-view>
        
        <view class="modal-footer">
          <view class="modal-btn cancel" @click="closeModal">
            <text>取消</text>
          </view>
          <view class="modal-btn confirm" @click="confirmDepartments">
            <text>确定</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      postContent: '',
      selectedImages: [],
      imageUrls: [],
	  // 🔥 修改：标签相关数据
	  allTags: ['日常', '二手', '询问', '吐槽'],           // 所有标签
	  availableTags: ['日常', '二手', '询问', '吐槽'],    // 当前可选择的标签
	  selectedTagsInContent: [],  
      // categories: ['日常', '二手', '交友', '吐槽'],
      // selectedCategory: [], // 🔥 UI层面仍使用数组
      isPublishing: false,
      uploading: false,
      
      enableGoodsLink: false,
      selectedGoods: null,
      relatedGoodsId: null,
      
      enableContact: false,
      contactInfo: '',
      
      excludeDepartments: [],
      includeDepartment: '',
      tempSelectedDepartments: [],
      tempSelectedDepartment: '',
      showModal: false,
      modalType: '',
      
      generatedBgImage: '',
      showVerificationTip: true,
      
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
	   // 🔥 新增:仅自己可见开关
	  onlyMyself: false,  // 默认关闭
	  
	  // 🔥 新增：图片检测状态管理
	      imageCheckStatus: [], // 存储每张图片的检测状态
	      allImagesChecked: false,
    }
  },
  
  computed: {
    ...mapState('m_user', ['openid', 'userBase']),
    
	  // 🔥 新增：检查是否可以发布
	  canPublish() {
	    // 检查图片是否还在检测中
	    const stillChecking = this.imageCheckStatus.some(status => status.checking)
	    
	    // 检查是否有违规图片
	    const hasUnsafeImages = this.imageCheckStatus.some(status => status.safe === false)
	    
	    return !this.isPublishing && 
	           !this.uploading && 
	           !stillChecking && 
	           !hasUnsafeImages
	  },
	  
    isTopicDiscussion() {
      return this.imageUrls.length > 0
    },
    
    displayDepartments() {
      if (this.modalType === 'include') {
        return this.userBase.major ? [this.userBase.major] : []
      } else {
        return this.allDepartments
      }
    },
    
    verificationStatusClass() {
      if (!this.userBase || this.userBase.is_verified === undefined) {
        return 'status-loading'
      }
      
      switch (this.userBase.is_verified) {
        case 0: return 'status-unverified'
        case 1: return 'status-verified'
        case 2: return 'status-pending'
        case 3: return 'status-failed'
        default: return 'status-unverified'
      }
    },
    
    verificationStatusIcon() {
      if (!this.userBase || this.userBase.is_verified === undefined) {
        return '⏳'
      }
      
      switch (this.userBase.is_verified) {
        case 0: return '🔒'
        case 1: return '✅'
        case 2: return '⏳'
        case 3: return '❌'
        default: return '🔒'
      }
    },
    
    verificationStatusTitle() {
      if (!this.userBase || this.userBase.is_verified === undefined) {
        return '加载中...'
      }
      
      switch (this.userBase.is_verified) {
        case 0: return '校园认证未完成'
        case 1: return '校园认证已完成'
        case 2: return '校园认证审核中'
        case 3: return '校园认证失败'
        default: return '校园认证未完成'
      }
    },
    
    verificationStatusDesc() {
      if (!this.userBase || this.userBase.is_verified === undefined) {
        return '正在获取认证状态...'
      }
      
      switch (this.userBase.is_verified) {
        case 0: return '发布帖子需要完成校园认证'
        case 1: return '您可以正常发布帖子'
        case 2: return '请等待管理员审核，暂时无法发布帖子'
        case 3: return '认证失败，请重新提交认证申请'
        default: return '发布帖子需要完成校园认证'
      }
    }
  },
  
  methods: {
    ...mapMutations('m_user', ['updateUserBase']),
    
	 // 🔥 新增:切换仅自己可见
	  toggleOnlyMyself() {
	    this.onlyMyself = !this.onlyMyself;
	    
	    if (this.onlyMyself) {
	      // 开启仅自己可见后,清除发布范围设置(可选)
	      if (this.excludeDepartments.length > 0 || this.includeDepartment) {
	        uni.showModal({
	          title: '提示',
	          content: '开启"仅自己可见"后,发布范围设置将被忽略',
	          showCancel: false
	        });
	      }
	    }
	  },
	  
	   // 🔥 修改：添加标签（不加入到内容中）
	    addTag(tag) {
	      if (this.selectedTagsInContent.length >= 3) {
	        uni.showToast({
	          title: '最多只能选择3个标签',
	          icon: 'none',
	          duration: 1500
	        });
	        return;
	      }
	      
	      // ✅ 只更新已选标签数组，不修改 postContent
	      this.selectedTagsInContent.push(tag);
	      
	      // 从可选标签中移除
	      const index = this.availableTags.indexOf(tag);
	      if (index > -1) {
	        this.availableTags.splice(index, 1);
	      }
	      
	      // 如果是"二手"标签，自动启用商品关联
	      if (tag === '二手') {
	        this.enableGoodsLink = true;
	      }
	      
	      console.log('✅ 添加标签:', tag);
	    },
	  
	  // 🔥 新增：移除标签方法
	    removeTag(tag) {
	      const index = this.selectedTagsInContent.indexOf(tag);
	      if (index > -1) {
	        this.selectedTagsInContent.splice(index, 1);
	        
	        // 重新添加到可选列表
	        if (!this.availableTags.includes(tag)) {
	          this.availableTags.push(tag);
	        }
	        
	        // 如果删除的是"二手"标签，清除商品关联
	        if (tag === '二手') {
	          this.enableGoodsLink = false;
	          this.selectedGoods = null;
	          this.relatedGoodsId = null;
	        }
	        
	        console.log('🗑️ 删除标签:', tag);
	      }
	    },
		
	 
		
    gotoGenerateBgImage() {
      if (!this.postContent.trim()) {
        uni.showToast({
          title: '请先输入内容',
          icon: 'none'
        });
        return;
      }
      
      if (this.postContent.trim().length > 200) {
        uni.showToast({
          title: '内容过长，建议不超过200字',
          icon: 'none'
        });
        return;
      }
      
      if (this.selectedImages.length >= 9) {
        uni.showToast({
          title: '最多只能上传9张图片',
          icon: 'none'
        });
        return;
      }
      
      uni.navigateTo({
        url: `/subpkg/text-to-image/text-to-image?content=${encodeURIComponent(this.postContent.trim())}&isTopic=1`,
        events: {
          selectBgImage: (data) => {
            if (this.generatedBgImage) {
              const oldIndex = this.selectedImages.indexOf(this.generatedBgImage);
              if (oldIndex > -1) {
                this.selectedImages.splice(oldIndex, 1);
                this.imageUrls.splice(oldIndex, 1);
              }
            }
            
            this.generatedBgImage = data.imageUrl;
            this.selectedImages.push(data.imageUrl);
            this.imageUrls.push(data.imageUrl);
            
            console.log('✅ 已选择话题背景图:', data.imageUrl);
          }
        }
      });
    },
    
    gotoVerification() {
      uni.navigateTo({
        url: '/subpkg/verification/verification'
      })
    },
    
    async checkVerificationStatus() {
      try {
        if (!this.openid) return
        
        const queryObj = { code: this.openid }
        const { data: res } = await uni.$http.get('/users/userinfo', queryObj)
        
        if (res.meta.status === 200) {
          this.updateUserBase(res.message)
          console.log('🔍 认证状态检查:', {
            is_verified: res.message.is_verified,
            nickname: res.message.nickname,
            major: res.message.major
          })
        }
      } catch (error) {
        console.error('检查认证状态失败:', error)
      }
    },
    
    toggleGoodsLink() {
      this.enableGoodsLink = !this.enableGoodsLink;
      if (!this.enableGoodsLink) {
        this.selectedGoods = null;
        this.relatedGoodsId = null;
      }
    },
    
    gotoSelectGoods() {
      if (!this.userBase.goods_id || this.userBase.goods_id.length === 0) {
        uni.showToast({
          title: '您还没有发布商品',
          icon: 'none'
        });
        return;
      }
    
      uni.navigateTo({
        url: '/subpkg/goods-selector/goods-selector',
        events: {
          selectGoods: (data) => {
            this.selectedGoods = data.goods;
            this.relatedGoodsId = data.goods_id;
            console.log('✅ 已选择商品:', data.goods.goods_name);
          }
        }
      });
    },
    
    toggleContact() {
      this.enableContact = !this.enableContact;
      if (!this.enableContact) {
        this.contactInfo = '';
      }
    },
    
    async chooseImage() {
      if (this.isPublishing) return;
      
      const maxCount = 9 - this.selectedImages.length;
    
      if (maxCount <= 0) {
        uni.showToast({
          title: '最多只能上传9张图片',
          icon: 'none'
        });
        return;
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
      });
    },

	async checkImagesInBackground(imagePaths, startIndex) {
	  console.log('🔍 开始后台检测', imagePaths.length, '张图片')
	  
	  // 🔥 串行执行检测
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
	        continue
	      }
	      
	      // 上传检测
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
    
        this.imageUrls = this.imageUrls.concat(uploadedUrls);
    
        uni.hideLoading();
        uni.showToast({
          title: '图片上传成功',
          icon: 'success',
          duration: 1500
        });
    
        console.log('✅ 所有图片上传完成:', this.imageUrls);
        return uploadedUrls;
    
      } catch (error) {
        console.error('[ERROR] 上传失败:', error);
        uni.hideLoading();
        uni.showToast({
          title: error.message || '上传失败',
          icon: 'none',
          duration: 3000
        });
    
        filePaths.forEach(path => {
          const index = this.selectedImages.indexOf(path);
          if (index > -1) {
            this.selectedImages.splice(index, 1);
          }
        });
    
        return [];
      } finally {
        this.uploading = false;
      }
    },
    
    deleteImage(index) {
      if (this.isPublishing) return
      
      const deletedImage = this.selectedImages[index];
      
      if (deletedImage === this.generatedBgImage) {
        this.generatedBgImage = '';
      }
      
      this.selectedImages.splice(index, 1);
      this.imageUrls.splice(index, 1);
      this.imageCheckStatus.splice(index, 1); // 🔥 新增：删除检测状态
      
      uni.showToast({
        title: '已删除',
        icon: 'success',
        duration: 1000
      })
    },

    
    // 🔥 分类选择逻辑（UI层面仍使用数组）
    selectCategory(category) {
      const index = this.selectedCategory.indexOf(category);
      
      if (index > -1) {
        // 已选中，取消选中
        this.selectedCategory.splice(index, 1);
        
        // 如果取消的是"二手"，清除商品关联
        if (category === '二手') {
          this.enableGoodsLink = false;
          this.selectedGoods = null;
          this.relatedGoodsId = null;
        }
      } else {
        // 未选中，检查是否超过3个
        if (this.selectedCategory.length >= 3) {
          uni.showToast({
            title: '最多只能选择3个分类',
            icon: 'none',
            duration: 1500
          });
          return;
        }
        
        // 添加选中
        this.selectedCategory.push(category);
      }
      
      console.log('📝 当前选中分类（数组）:', this.selectedCategory);
    },
    
    showDepartmentPicker(type) {
      if (type === 'exclude' && this.includeDepartment) {
        uni.showToast({
          title: '已设置"只发布到"，不能同时设置',
          icon: 'none'
        });
        return;
      }
    
      if (type === 'include' && this.excludeDepartments.length > 0) {
        uni.showToast({
          title: '已设置"不发布到"，不能同时设置',
          icon: 'none'
        });
        return;
      }
      
      if (type === 'include' && !this.userBase.major) {
        uni.showToast({
          title: '您的个人信息中未设置院系',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    
      this.modalType = type;
    
      if (type === 'exclude') {
        this.tempSelectedDepartments = [...this.excludeDepartments];
      } else {
        this.tempSelectedDepartment = this.includeDepartment;
      }
    
      this.showModal = true;
    },
    
    closeModal() {
      this.showModal = false;
      this.tempSelectedDepartments = [];
      this.tempSelectedDepartment = '';
    },
    
    isDepartmentSelected(dept) {
      if (this.modalType === 'exclude') {
        return this.tempSelectedDepartments.includes(dept);
      } else {
        return this.tempSelectedDepartment === dept;
      }
    },
    
    toggleDepartment(dept) {
      if (this.modalType === 'exclude') {
        const index = this.tempSelectedDepartments.indexOf(dept);
        if (index > -1) {
          this.tempSelectedDepartments.splice(index, 1);
        } else {
          this.tempSelectedDepartments.push(dept);
        }
      } else {
        if (this.tempSelectedDepartment === dept) {
          this.tempSelectedDepartment = '';
        } else {
          this.tempSelectedDepartment = dept;
        }
      }
    },
    
    confirmDepartments() {
      if (this.modalType === 'exclude') {
        this.excludeDepartments = [...this.tempSelectedDepartments];
      } else {
        this.includeDepartment = this.tempSelectedDepartment;
      }
      this.closeModal();
    },
    
    removeDepartment(type, index) {
      if (type === 'exclude') {
        this.excludeDepartments.splice(index, 1);
      }
    },
    
    clearIncludeDepartment() {
      this.includeDepartment = '';
    },
    
    validateForm() {
		// 使用纯内容（不包含标签）
		    const pureContent = this.postContent.trim();
		
		  if (!pureContent && this.selectedImages.length === 0) {
		        uni.showToast({
		          title: '请输入帖子内容或上传图片',
		          icon: 'none'
		        });
		        return false;
		      }
		
		if (pureContent.length > 500) {
		      uni.showToast({
		        title: '内容长度不能超过500字',
		        icon: 'none'
		      });
		      return false;
		    }
		  

      if (!pureContent) {
        uni.showToast({
          title: '请输入帖子内容',
          icon: 'none'
        });
        return false;
      }
    
      if (pureContent.length < 1) {
        uni.showToast({
          title: '内容不能为空',
          icon: 'none'
        });
        return false;
      }

      if (this.selectedImages.length > 9) {
        uni.showToast({
          title: '最多只能上传9张图片',
          icon: 'none'
        });
        return false;
      }
    
      if (this.enableContact && !this.contactInfo.trim()) {
        uni.showToast({
          title: '请输入联系方式',
          icon: 'none'
        });
        return false;
      }
    
      if (this.enableContact && this.contactInfo.trim().length > 50) {
        uni.showToast({
          title: '联系方式长度不能超过50字符',
          icon: 'none'
        });
        return false;
      }
      
      // 🔥 修改：检查"二手"标签的商品关联
      if (this.selectedTagsInContent.includes('二手') && this.enableGoodsLink && !this.relatedGoodsId) {
        uni.showToast({
          title: '请选择要关联的商品',
          icon: 'none'
        });
        return false;
      }
    
      if (this.excludeDepartments.length > 0 && this.includeDepartment) {
        uni.showToast({
          title: '不能同时设置"不发布到"和"只发布到"',
          icon: 'none'
        });
        return false;
      }
    
      return true;
    },
    
  async publishPost() {
    try {
      console.log('[0] 检查用户认证状态...')
      console.log('用户认证状态:', this.userBase.is_verified)
  
      if (!this.userBase || this.userBase.is_verified !== 1) {
        let title = '认证提醒'
        let content = '发布帖子需要完成校园认证,是否前往认证?'
  
        switch (this.userBase?.is_verified) {
          case 0:
            content = '发布帖子需要完成校园认证,是否前往认证?'
            break
          case 2:
            title = '审核中'
            content = '您的认证申请正在审核中,暂时无法发布帖子'
            uni.showToast({
              title: '认证审核中,暂时无法发布',
              icon: 'none',
              duration: 2000
            })
            return
          case 3:
            content = '您的认证申请被拒绝,请重新提交认证申请'
            break
          default:
            content = '发布帖子需要完成校园认证,是否前往认证?'
        }
  
        if (this.userBase?.is_verified !== 2) {
          uni.showModal({
            title: title,
            content: content,
            confirmText: '去认证',
            cancelText: '取消',
            success: (res) => {
              if (res.confirm) {
                uni.navigateTo({
                  url: '/subpkg/verification/verification'
                })
              }
            }
          })
        }
        return
      }
  
      if (!this.validateForm()) {
        return;
      }
	
	// 🔥 新增：检查图片是否还在检测中
	    const stillChecking = this.imageCheckStatus.some(status => status.checking)
		if (stillChecking) {
		      uni.showModal({
		        title: '请稍候',
		        content: '图片正在检测中，请稍后再试',
		        showCancel: false,
		        confirmText: '我知道了'
		      })
		      return
		    }
		    
		    // 🔥 新增：检查是否有违规图片
		    const hasUnsafeImages = this.imageCheckStatus.some(status => status.safe === false)
		    
		    if (hasUnsafeImages) {
		      uni.showModal({
		        title: '图片违规',
		        content: '存在违规图片，请删除后重试',
		        showCancel: false,
		        confirmText: '我知道了'
		      })
		      return
		    }
			
			// 🔥 新增：文本内容安全检测
			    console.log('[1] 检测文本内容安全性...')
			    uni.showLoading({
			      title: '检测文本内容...',
			      mask: true
			    })
			    
			    const pureContent = this.postContent.trim()
			    const isTextSafe = await this.checkTextSafety(pureContent)
			    
			    uni.hideLoading()
			    
			    if (!isTextSafe) {
			      uni.showModal({
			        title: '内容违规',
			        content: '帖子内容包含违规内容，请修改后重试',
			        showCancel: false,
			        confirmText: '我知道了'
			      })
			      return
			    }
			    
			    console.log('✅ 文本内容检测通过')
			
      if (!this.openid) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }
  
      if (this.uploading) {
        uni.showToast({
          title: '图片上传中,请稍候',
          icon: 'none'
        });
        return;
      }
  
      if (this.isPublishing) return;
  
      this.isPublishing = true;
  
      uni.showLoading({
        title: '发布中...',
        mask: true
      });
  
      const finalImages = [...this.imageUrls];
      
	   // ✅ 使用纯内容（不包含标签）
	    const pureContent1 = this.postContent.trim();
	        
			
     // ✅ 标签转为字符串
           const propertiesString = this.selectedTagsInContent.length > 0 
             ? this.selectedTagsInContent.join(',') 
             : 'null';
      
     console.log('📤 发送数据:', {
             content: pureContent1,  // 纯内容
             properties: propertiesString,  // 标签字符串
           });
  
      const { data: res } = await uni.$http.post('/posts/create', {
        openid: this.openid,
        nickname: this.userBase.nickname || '用户',
        avatar: this.userBase.avatarUrl || '',
        content: pureContent1,  // ✅ 只发送纯内容
        properties: propertiesString,  // ✅ 标签单独发送
        images: finalImages,
        excludeDepartments: this.excludeDepartments,
        includeDepartment: this.includeDepartment,
        contactInfo: this.enableContact ? this.contactInfo.trim() : null,
        relatedGoodsId: this.enableGoodsLink ? this.relatedGoodsId : null,
        isTopicDiscussion: this.isTopicDiscussion,
		onlyMyself: this.onlyMyself ? 1 : 0  // 🔥 新增这一行
      });
  
      uni.hideLoading();
  
      if (res.meta.status === 201) {
		  // 🔥 新增：保存当前图片状态
		        const hasImages = this.selectedImages.length > 0;
				
				// 🔥 新增：构建完整的 post 对象
				      const postData = {
				        post_id: res.message.post_id,
				        openid: this.openid,
				        nickname: this.userBase.nickname || '用户',
				        avatar: this.userBase.avatarUrl || '',
				        content: pureContent1,
				        properties: propertiesString,
				        images: finalImages,
				        excludeDepartments: this.excludeDepartments,
				        includeDepartment: this.includeDepartment,
				        contactInfo: this.enableContact ? this.contactInfo.trim() : null,
				        relatedGoodsId: this.enableGoodsLink ? this.relatedGoodsId : null,
				        isTopicDiscussion: this.isTopicDiscussion,
				        onlyMyself: this.onlyMyself ? 1 : 0,
				        created_at: new Date().toISOString(),
				        // 添加其他可能需要的字段
				        likes_count: 0,
				        comments_count: 0,
				        shares_count: 0
				      };
					  
					  // 🔥 核心改动：使用 Vuex 存储数据
					        this.$store.commit('m_posts/setNewPost', {
					          post: postData,
					          targetPage: hasImages ? 'home' : 'treehole'
					        });
        // 清空分类数组
        this.selectedTagsInContent = [];
        this.availableTags = ['日常', '二手', '询问', '吐槽'];
        // 清空其他表单
        this.postContent = '';
        this.selectedImages = [];
        this.imageUrls = [];
        this.excludeDepartments = [];
        this.includeDepartment = '';
        this.enableContact = false;
        this.contactInfo = '';
        this.enableGoodsLink = false;
        this.selectedGoods = null;
        this.relatedGoodsId = null;
        this.generatedBgImage = '';
		this.onlyMyself = false;  // 🔥 新增:重置仅自己可见状态
		 
		 
        uni.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1500
        });
		
		// 清空检测状态
		this.imageCheckStatus = []
		this.allImagesChecked = false
		
		      console.log('📊 是否有图片:', hasImages);
  
        console.log('✅ 发布成功,帖子ID:', res.message.post_id);
		
		// 🔥 核心改动：简化跳转逻辑（不传参数）
		      setTimeout(() => {
		        if (hasImages) {
		          console.log('📸 有图片，跳转到 home 页面');
		          uni.switchTab({
		            url: '/pages/home/home', // 不带参数
		            success: () => {
		              console.log('✅ 成功跳转到 home 页面');
		            }
		          });
		        } else {
		          console.log('💬 无图片，跳转到 treehole 页面');
		          uni.switchTab({
		            url: '/pages/treehole/treehole', // 不带参数
		            success: () => {
		              console.log('✅ 成功跳转到 treehole 页面');
		            }
		          });
		        }
		      }, 1500);
			  
		
      } else {
        uni.showToast({
          title: res.meta.msg || '发布失败',
          icon: 'none'
        });
      }
  
    } catch (error) {
      uni.hideLoading();
      console.error('❌ 发布帖子失败:', error);
      uni.showToast({
        title: '发布失败,请重试',
        icon: 'none'
      });
    } finally {
      this.isPublishing = false;
    }
  }
  },
  
  async onShow() {
    await this.checkVerificationStatus()
  },
  
  async onLoad(options) {
    if (options.content) {
      try {
        this.postContent = decodeURIComponent(options.content)
      } catch (error) {
        console.error('❌ 解析 URL 参数失败:', error)
      }
    }
    
	// 🔥 新增：接收图片数据
	  if (options.images) {
	    try {
	      const images = JSON.parse(decodeURIComponent(options.images))
	      if (Array.isArray(images) && images.length > 0) {
	        this.selectedImages = images
	        this.imageUrls = images
	        console.log('✅ 已接收图片:', images)
	      }
	    } catch (error) {
	      console.error('❌ 解析图片数据失败:', error)
	    }
	  }
	  
    const eventChannel = this.getOpenerEventChannel()
    if (eventChannel) {
      eventChannel.on('topicImageData', (data) => {
        console.log('📥 收到话题图片数据:', data)
        
        if (data.content) {
          this.postContent = data.content
        }
        
		// 🔥 优先使用 images 数组（包含所有图片）
		    if (data.images && Array.isArray(data.images) && data.images.length > 0) {
		      this.selectedImages = data.images
		      this.imageUrls = data.images
		      console.log('✅ 已接收所有图片（背景图 + topic 图片）:', data.images)
		    } 
			
        else if (data.imageUrl) {
          this.selectedImages = [data.imageUrl]
          this.imageUrls = [data.imageUrl]
          this.generatedBgImage = data.imageUrl
        }
        
		if (data.isTopic !== undefined) {
		      this.isTopic = data.isTopic
		    }
			
        uni.showToast({
          title: '话题背景图已添加',
          icon: 'success',
          duration: 1500
        })
      })
      
      eventChannel.on('topicTextData', (data) => {
        console.log('📥 收到纯文本话题数据:', data)
        
        if (data.content) {
          this.postContent = data.content
        }
        
        uni.showToast({
          title: '话题内容已添加',
          icon: 'success',
          duration: 1000
        })
      })
      
      eventChannel.on('uploadImages', (data) => {
        if (data.images && data.images.length > 0) {
          this.selectedImages = data.images
          this.uploadImages(data.images)
        }
      })
    }
    
    await this.checkVerificationStatus()
  }
}
</script>
        
        <style lang="scss">
        .publish-page {
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 32rpx;
          padding-bottom: 160rpx;
        }
        
        // 🎯 新增：内容区域整合样式
        .content-section {
          background-color: #ffffff;
          border-radius: 16rpx;
          padding: 32rpx;
          
          // 顶部工具栏
          .content-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24rpx;
            
            .header-title {
              font-size: 32rpx;
              font-weight: 600;
              color: #333333;
            }
            
            // 话题讨论切换按钮（紧凑版）
            .topic-toggle-btn {
              display: flex;
              align-items: center;
              gap: 8rpx;
              padding: 12rpx 20rpx;
              background-color: #f8f9ff;
              border: 2rpx solid #e0e7ff;
              border-radius: 24rpx;
              transition: all 0.3s;
              
              &.active {
                background: linear-gradient(135deg, #f0f4ff 0%, #e8edff 100%);
                border-color: #C00000;
                
                .toggle-icon {
                  transform: scale(1.1);
                }
                
                .toggle-label {
                  color: #C00000;
                  font-weight: 600;
                }
              }
              
              &:active {
                transform: scale(0.96);
              }
              
              .toggle-icon {
                font-size: 32rpx;
                transition: transform 0.3s;
              }
              
              .toggle-label {
                font-size: 24rpx;
                color: #666666;
                transition: all 0.3s;
                white-space: nowrap;
              }
            }
          }
          
          // 内容输入框
          .content-input {
            width: 100%;
            min-height: 280rpx;
            font-size: 32rpx;
            line-height: 1.6;
            color: #333333;
            box-sizing: border-box;
            border: none;
            outline: none;
          }
          
          .content-placeholder {
            color: #c0c0c0;
          }
          
          // 话题讨论提示
          .topic-hint {
            display: flex;
            align-items: center;
            gap: 12rpx;
            padding: 16rpx 20rpx;
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-radius: 12rpx;
            margin-top: 16rpx;
            border-left: 4rpx solid #fbbf24;
            
            .hint-icon {
              font-size: 28rpx;
              flex-shrink: 0;
            }
            
            .hint-text {
              font-size: 24rpx;
              color: #92400e;
              line-height: 1.4;
            }
          }
          
    /* 🔥 修改字数统计样式 */
    .content-count {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16rpx 0;
    
      text {
        font-size: 24rpx;
        color: #999999;
    
        &.over-limit {
          color: #ff4757;
        }
      }
      
      .tag-count {
        color: #fbbf24;  /* 米黄色 */
        font-weight: 500;
      }
    }
          
          // 图片网格样式
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
              border-color: #C00000;
          
              .add-icon,
              .add-text {
                color: #C00000;
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
          
          // 生成背景图按钮（紧凑版）
          .generate-bg-btn {
            width: 100%;
            padding-bottom: 100%;
            position: relative;
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-radius: 12rpx;
            border: 2rpx dashed #fbbf24;
            transition: all 0.3s;
          
            &:active {
              transform: scale(0.96);
              background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%);
            }
          
            .generate-icon {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -80%);
              font-size: 56rpx;
            }
          
            .generate-text {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, 20%);
              font-size: 22rpx;
              color: #92400e;
              white-space: nowrap;
              font-weight: 500;
            }
          }
        }
        
        .category-section {
          background-color: #ffffff;
          border-radius: 16rpx;
          padding: 32rpx;
          margin-top: 24rpx;
        
          .section-title {
            font-size: 30rpx;
            color: #333333;
            font-weight: 500;
            margin-bottom: 24rpx;
            display: block;
          }
        }
        
        .category-list {
          display: flex;
          gap: 16rpx;
        }
        
        .category-item {
          flex: 1;
          padding: 20rpx 0;
          background-color: #f5f5f5;
          border-radius: 12rpx;
          text-align: center;
          border: 2rpx solid transparent;
          transition: all 0.3s;
		  position: relative; // 🔥 新增
        
          text {
            font-size: 28rpx;
            color: #666666;
          }
		  // 🔥 新增:选中标记样式
		    .check-icon {
		      position: absolute;
		      top: 8rpx;
		      right: 8rpx;
		      font-size: 24rpx;
		      color: #C00000;
		      font-weight: bold;
		    }
			
        
          &.active {
            background-color: #f0f2ff;
            border-color: #C00000;
        
            text {
              color: #C00000;
              font-weight: 500;
            }
          }
        }
        
        .goods-link-section {
          background-color: #ffffff;
          border-radius: 16rpx;
          padding: 32rpx;
          margin-top: 24rpx;
        
          .section-title {
            font-size: 30rpx;
            color: #333333;
            font-weight: 500;
            margin-bottom: 24rpx;
            display: block;
          }
        
          .goods-link-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4rpx 0;
            margin-bottom: 24rpx;
        
            .toggle-label {
              font-size: 28rpx;
              color: #333333;
            }
        
            .toggle-switch {
              width: 92rpx;
              height: 52rpx;
              background-color: #e0e0e0;
              border-radius: 26rpx;
              position: relative;
              transition: all 0.3s;
        
              &.active {
                background-color: #C00000;
              }
        
              .toggle-circle {
                width: 48rpx;
                height: 48rpx;
                background-color: #ffffff;
                border-radius: 50%;
                position: absolute;
                top: 2rpx;
                left: 2rpx;
                transition: all 0.3s;
                box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.15);
              }
        
              &.active .toggle-circle {
                transform: translateX(40rpx);
              }
            }
          }
        
          .selected-goods {
            .goods-card {
              display: flex;
              align-items: center;
              background-color: #f8f9ff;
              border: 2rpx solid #e0e7ff;
              border-radius: 16rpx;
              padding: 20rpx;
              gap: 16rpx;
        
              &:active {
                background-color: #f0f4ff;
              }
        
              .goods-image {
                width: 80rpx;
                height: 80rpx;
                border-radius: 12rpx;
                background-color: #f0f0f0;
                flex-shrink: 0;
              }
        
              .goods-info {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 6rpx;
        
                .goods-name {
                  font-size: 26rpx;
                  color: #333333;
                  font-weight: 500;
                  line-height: 1.3;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                }
        
                .goods-price {
                  font-size: 28rpx;
                  color: #C00000;
                  font-weight: 600;
                }
              }
        
              .change-btn {
                font-size: 24rpx;
                color: #C00000;
                padding: 8rpx 16rpx;
                background-color: #ffffff;
                border: 1rpx solid #C00000;
                border-radius: 20rpx;
              }
            }
          }
        
          .select-goods-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #f8f8f8;
            border-radius: 16rpx;
            border: 2rpx dashed #d9d9d9;
            padding: 60rpx 0;
            transition: all 0.3s;
        
            &:active {
              background-color: #f0f0f0;
            }
        
            .select-icon {
              font-size: 64rpx;
              margin-bottom: 16rpx;
            }
        
            .select-text {
              font-size: 28rpx;
              color: #666666;
            }
          }
        
          .goods-tips {
            margin-top: 16rpx;
            padding: 12rpx;
            background-color: #f0f9ff;
            border-radius: 8rpx;
            border-left: 4rpx solid #0ea5e9;
        
            text {
              font-size: 24rpx;
              color: #0369a1;
              line-height: 1.5;
            }
          }
        }
        
        .contact-section {
          background-color: #ffffff;
          border-radius: 16rpx;
          padding: 32rpx;
          margin-top: 24rpx;
        
          .section-title {
            font-size: 30rpx;
            color: #333333;
            font-weight: 500;
            margin-bottom: 24rpx;
            display: block;
          }
        
          .contact-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4rpx 0;
            margin-bottom: 24rpx;
        
            .toggle-label {
              font-size: 28rpx;
              color: #333333;
            }
        
            .toggle-switch {
              width: 92rpx;
              height: 52rpx;
              background-color: #e0e0e0;
              border-radius: 26rpx;
              position: relative;
              transition: all 0.3s;
        
              &.active {
                background-color: #C00000;
              }
        
              .toggle-circle {
                width: 48rpx;
                height: 48rpx;
                background-color: #ffffff;
                border-radius: 50%;
                position: absolute;
                top: 2rpx;
                left: 2rpx;
                transition: all 0.3s;
                box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.15);
              }
        
              &.active .toggle-circle {
                transform: translateX(40rpx);
              }
            }
          }
        
          .contact-input-container {
            .input-label {
              display: flex;
              align-items: center;
              gap: 16rpx;
              margin-bottom: 16rpx;
        
              text:first-child {
                font-size: 28rpx;
                color: #333333;
              }
        
              .input-tip {
                font-size: 24rpx;
                color: #999999;
              }
            }
        
            .contact-input {
              width: 100%;
              height: 88rpx;
              background-color: #f8f8f8;
              border-radius: 12rpx;
              padding: 0 24rpx;
              font-size: 28rpx;
              color: #333333;
              box-sizing: border-box;
              border: 2rpx solid transparent;
              transition: all 0.3s;
        
              &:focus {
                border-color: #C00000;
                background-color: #ffffff;
              }
            }
        
            .input-placeholder {
              color: #c0c0c0;
            }
        
            .contact-tips {
              margin-top: 16rpx;
              padding: 12rpx;
              background-color: #f0f9ff;
              border-radius: 8rpx;
              border-left: 4rpx solid #0ea5e9;
        
              text {
                font-size: 24rpx;
                color: #0369a1;
                line-height: 1.5;
              }
            }
          }
        }
        
        .department-section {
          background-color: #ffffff;
          border-radius: 16rpx;
          padding: 32rpx;
          margin-top: 24rpx;
        
          .section-title {
            font-size: 30rpx;
            color: #333333;
            font-weight: 500;
            margin-bottom: 24rpx;
            display: block;
          }
        
          .department-option {
            margin-bottom: 24rpx;
        
            &:last-of-type {
              margin-bottom: 16rpx;
            }
        
            .option-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 24rpx;
              background-color: #f8f8f8;
              border-radius: 12rpx;
        
              .option-label {
                font-size: 28rpx;
                color: #333333;
              }
        
              .option-value {
                display: flex;
                align-items: center;
                gap: 8rpx;
        
                .value-text {
                  font-size: 26rpx;
                  color: #999999;
                  max-width: 400rpx;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
        
                  &.selected {
                    color: #C00000;
                  }
                }
        
                .arrow {
                  font-size: 32rpx;
                  color: #999999;
                }
              }
            }
        
            .selected-tags {
              display: flex;
              flex-wrap: wrap;
              gap: 12rpx;
              margin-top: 16rpx;
              padding: 0 8rpx;
        
              .tag-item {
                display: flex;
                align-items: center;
                gap: 8rpx;
                padding: 8rpx 16rpx;
                border-radius: 20rpx;
                font-size: 24rpx;
        
                &.exclude {
                  background-color: #fff5f5;
                  color: #C00000;
                  border: 1rpx solid #ffe0e0;
                }
        
                &.include {
                  background-color: #f0f2ff;
                  color: #667eea;
                  border: 1rpx solid #d9dcff;
        
                  &.single {
                    font-weight: 500;
                  }
                }
        
                .tag-close {
                  font-size: 28rpx;
                  font-weight: bold;
                  line-height: 1;
                }
              }
            }
          }
        
		/* 🔥 新增:仅自己可见选项样式 */
		.only-myself-option {
		  margin-top: 24rpx;
		  padding-top: 24rpx;
		  border-top: 1rpx solid #f0f0f0;
		  
		  .option-header {
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    padding: 20rpx 0;
		    
		    .option-left {
		      flex: 1;
		      display: flex;
		      flex-direction: column;
		      gap: 8rpx;
		      
		      .option-label {
		        font-size: 28rpx;
		        color: #333333;
		        font-weight: 500;
		      }
		      
		      .option-desc {
		        font-size: 24rpx;
		        color: #999999;
		        line-height: 1.4;
		      }
		    }
		    
		    .toggle-switch {
		      width: 92rpx;
		      height: 52rpx;
		      background-color: #e0e0e0;
		      border-radius: 26rpx;
		      position: relative;
		      transition: all 0.3s;
		      flex-shrink: 0;
		      
		      &.active {
		        background-color: #C00000;
		      }
		      
		      .toggle-circle {
		        width: 48rpx;
		        height: 48rpx;
		        background-color: #ffffff;
		        border-radius: 50%;
		        position: absolute;
		        top: 2rpx;
		        left: 2rpx;
		        transition: all 0.3s;
		        box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.15);
		      }
		      
		      &.active .toggle-circle {
		        transform: translateX(40rpx);
		      }
		    }
		  }
		}
			
          .department-tip {
            padding: 16rpx;
            background-color: #fff9e6;
            border-radius: 8rpx;
            border-left: 4rpx solid #ffc107;
        
            text {
              font-size: 24rpx;
              color: #ff9800;
              line-height: 1.5;
            }
          }
        }
        
        .publish-btn {
          position: fixed;
          bottom: 48rpx;
          left: 32rpx;
          right: 32rpx;
          height: 96rpx;
          background: linear-gradient(135deg, #C00000 0%, #C00000 100%);
          border-radius: 48rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8rpx 24rpx rgba(192, 0, 0, 0.4);
          transition: all 0.3s;
        
          &:active {
            transform: scale(0.98);
          }
        
          &.disabled {
            opacity: 0.6;
            pointer-events: none;
          }
        
          text {
            font-size: 32rpx;
            color: #ffffff;
            font-weight: 500;
          }
        }
        
        .department-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: flex-end;
          animation: fadeIn 0.3s ease;
        
          .modal-content {
            width: 100%;
            max-height: 80vh;
            background-color: #ffffff;
            border-radius: 32rpx 32rpx 0 0;
            display: flex;
            flex-direction: column;
            animation: slideUp 0.3s ease;
        
            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 32rpx;
              border-bottom: 1rpx solid #f0f0f0;
        
              .modal-title {
                font-size: 32rpx;
                color: #333333;
                font-weight: 500;
              }
        
              .modal-close {
                font-size: 48rpx;
                color: #999999;
                line-height: 1;
                padding: 0 16rpx;
              }
            }
        
            .modal-body {
              flex: 1;
              overflow-y: auto;
              padding: 16rpx 0;
        
              .department-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 24rpx 32rpx;
                border-bottom: 1rpx solid #f5f5f5;
                transition: background-color 0.3s;
        
                &:active {
                  background-color: #f8f8f8;
                }
        
                &.selected {
                  background-color: #f0f2ff;
        
                  .department-name {
                    color: #C00000;
                    font-weight: 500;
                  }
                }
        
                .department-name {
                  font-size: 28rpx;
                  color: #333333;
                }
        
                .department-check {
                  font-size: 32rpx;
                  color: #C00000;
                  font-weight: bold;
                }
              }
              
              .empty-tip {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 120rpx 0;
                
                .empty-icon {
                  font-size: 120rpx;
                  margin-bottom: 24rpx;
                  opacity: 0.5;
                }
                
                .empty-text {
                  font-size: 28rpx;
                  color: #999999;
                }
              }
            }
        
            .modal-footer {
              display: flex;
              gap: 16rpx;
              padding: 24rpx 32rpx;
              border-top: 1rpx solid #f0f0f0;
        
              .modal-btn {
                flex: 1;
                height: 88rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 44rpx;
                font-size: 30rpx;
                transition: all 0.3s;
        
                &.cancel {
                  background-color: #f5f5f5;
        
                  text {
                    color: #666666;
                  }
        
                  &:active {
                    background-color: #e8e8e8;
                  }
                }
        
                &.confirm {
                  background: linear-gradient(135deg, #C00000 0%, #C00000 100%);
        
                  text {
                    color: #ffffff;
                    font-weight: 500;
                  }
        
                  &:active {
                    opacity: 0.8;
                  }
                }
              }
            }
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

	/* 🔥 修改：可选标签区域（字数统计下方） */
	.available-tags {
	  display: flex;
	  flex-wrap: wrap;
	  gap: 12rpx;
	  margin: 24rpx 0;
	  padding: 16rpx;
	  background-color: rgba(0, 0, 0, 0.05);  /* 透明黑色背景 */
	  border-radius: 12rpx;
	  
	  .tag-item.available {
	    padding: 10rpx 20rpx;
	    background-color: rgba(0, 0, 0, 0.6);  /* 半透明黑色 */
	    border-radius: 20rpx;
	    transition: all 0.3s ease;
	    
	    .tag-text {
	      font-size: 26rpx;
	      color: #ffffff;
	      font-weight: 500;
	    }
	    
	    &:active {
	      transform: scale(0.95);
	      background-color: rgba(0, 0, 0, 0.8);
	    }
	  }
	}
		
		/* 🔥 新增：内容与标签联合显示 */
		.content-with-tags {
		  display: flex;
		  flex-wrap: wrap;
		  align-items: center;
		  gap: 8rpx;
		  min-height: 60rpx;
		  padding: 16rpx 0;
		  border-bottom: 1rpx solid #f0f0f0;
		  
		  .content-text {
		    font-size: 32rpx;
		    color: #333333;
		    line-height: 1.6;
		  }
		  
		  .inline-tags {
		    display: flex;
		    flex-wrap: wrap;
		    gap: 8rpx;
		    
		    .tag-badge {
		      display: inline-flex;
		      align-items: center;
		      padding: 6rpx 16rpx;
		      background-color: #fef3c7;  /* 米黄色背景 */
		      border-radius: 16rpx;
		      border: 1rpx solid #fbbf24;
		      transition: all 0.3s;
		      
		      .tag-text {
		        font-size: 26rpx;
		        color: #92400e;
		        font-weight: 500;
		      }
		      
		      &:active {
		        background-color: #fde68a;
		        transform: scale(0.95);
		      }
		    }
		  }
		}
        </style>


