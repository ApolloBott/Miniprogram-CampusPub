<template>
  <view class="publish-container" v-if="token">
    <!-- 🔥 修改：新顶部导航栏 -->
    <view class="nav-header">
      <!-- 左侧标题 -->
      <view class="nav-left">
        <text class="nav-title">发闲置</text>
      </view>

      <!-- 右侧发布按钮 -->
      <view class="nav-right">
        <button 
          class="publish-btn-small" 
          @click="publishGoods"
          :disabled="isPublishing"
        >
          <text v-if="!isPublishing">发布</text>
          <text v-else>发布中...</text>
        </button>
      </view>
    </view>

    <!-- 内容区 - 添加外层包裹元素 -->
    <view class="page-content">
      <!-- 🔥 合并区域: 图片+描述+位置+分类 🔥 -->
      <view class="card combined-section">
        <!-- 图片上传区域 -->
        <view class="images-area">
          <view class="images-grid">
            <!-- 已上传的图片 -->
            <view 
              v-for="(img, index) in imageList" 
              :key="index" 
              class="image-item"
            >
              <image 
                :src="img" 
                mode="aspectFill" 
                class="preview-image"
              ></image>
              <!-- 删除按钮 -->
              <view class="delete-btn" @click="deleteImage(index)">
                <text class="delete-icon">✕</text>
              </view>
              <!-- 图片序号 -->
              <view class="image-index">{{ index + 1 }}</view>
            </view>

            <!-- 添加图片按钮(最多9张) -->
            <view 
              v-if="imageList.length < 9" 
              class="image-item add-image-btn" 
              @click="chooseImage"
              :class="{ disabled: isPublishing }"
            >
              <text class="add-text">添加图片</text>
              <text class="add-count">({{ imageList.length }}/9)</text>
            </view>
          </view>
        </view>

        <!-- 商品描述输入 -->
        <view class="description-area">
          <textarea 
            class="description-input" 
            v-model="goodsDescription" 
            placeholder="请详细描述商品的品牌、型号、成色、购买时间等信息..." 
            auto-height 
            :disabled="isPublishing"
          />
        </view>

        <!-- 🔥 AI助手 + 位置选择 🔥 -->
        <view class="action-row">
          <!-- AI助手按钮 -->
          <view 
            class="ai-helper" 
            @click="useAIHelp"
            :class="{ disabled: isPublishing }"
          >
            <text class="ai-text">AI生成描述</text>
          </view>

          <!-- 位置切换按钮 -->
          <view 
            class="location-toggle" 
            @click="toggleLocation"
            :class="{ disabled: isPublishing }"
          >
            <text class="location-text">{{ selectedLocation }}校区</text>
          </view>
        </view>

        <!-- 🔥 商品分类(紧凑版) 🔥 -->
        <view class="category-compact">
          <text class="category-label">分类:</text>
          <view class="category-tags">
            <view 
              v-for="(category, index) in categoryList" 
              :key="index"
              class="category-tag-small"
              :class="{ 
                active: selectedCategory === category,
                disabled: isPublishing
              }"
              @click="selectCategory(category)"
            >
              <text class="tag-text">{{ category }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 价格 -->
      <view class="card list-item price-section">
        <view class="label-row">
          <text class="label">价格</text>
        </view>
        <view class="price-box">
          <text class="price-symbol">¥</text>
          <input 
            class="price-input" 
            v-model="price" 
            type="digit" 
            placeholder="0.00" 
            :disabled="isPublishing"
          />
        </view>
      </view>

      <!-- 🔥 发布中遮罩层 🔥 -->
      <view class="publishing-overlay" v-if="isPublishing">
        <view class="publishing-content">
          <view class="loading-spinner"></view>
          <text class="publishing-text">正在发布中...</text>
          <text class="publishing-tip">请勿重复点击</text>
        </view>
      </view>

      <view class="bottom-placeholder"></view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      imageList: [],
      imageUrls: [],
      goodsDescription: '',
      price: '',
      uploading: false,
      
      categoryList: ['学习', '日常', '其他服务'],
      selectedCategory: '',
      
      selectedLocation: '闵行',
      
      // 🔥 新增：发布状态控制
      isPublishing: false,
	  
	   // 🔥 新增：图片检测状态管理
	      imageCheckStatus: [], // 存储每张图片的检测状态 { checking: true/false, safe: true/false }
	      allImagesChecked: false, // 所有图片是否检测完成
    }
  },

  onLoad(options) {
    if (!options || Object.keys(options).length === 0) {
      // 处理空参数情况
    }
  },

  computed: {
    ...mapState('m_user', ['token', 'code', 'userBase', 'openid']),
  },

  methods: {
    ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase']),

    toggleLocation() {
      if (this.isPublishing) return; // 发布中禁用
      this.selectedLocation = this.selectedLocation === '闵行' ? '普陀' : '闵行'
      uni.showToast({
        title: `已切换到${this.selectedLocation}校区`,
        icon: 'none',
        duration: 1000
      })
    },

    selectCategory(category) {
      if (this.isPublishing) return; // 发布中禁用
      this.selectedCategory = category
      console.log('选择分类:', category)
    },

   async chooseImage() {
     if (this.isPublishing) return;
     const remainingCount = 9 - this.imageList.length;
     
     uni.chooseImage({
       count: remainingCount,
       sizeType: ['compressed'],
       sourceType: ['album', 'camera'],
       success: async (res) => {
         console.log('📸 选择了', res.tempFilePaths.length, '张图片');
         
         // 🔥 立即添加到列表，提升用户体验
         const newImages = res.tempFilePaths;
         const startIndex = this.imageList.length;
         
         // 先添加图片到展示列表
         this.imageList.push(...newImages);
         
         // 初始化检测状态（检测中）
         newImages.forEach(() => {
           this.imageCheckStatus.push({
             checking: true,
             safe: null,
             error: false
           });
         });
         
         uni.showToast({
           title: `已添加 ${newImages.length} 张图片`,
           icon: 'success',
           duration: 1000
         });
         
         // 🔥 异步检测图片（不阻塞用户操作）
         this.checkImagesInBackground(newImages, startIndex);
       },
       fail: (err) => {
         console.error('❌ 选择图片失败:', err);
       }
     });
   },


	/**
	 * 🔥 新增：后台异步检测图片
	 */
	async checkImagesInBackground(imagePaths, startIndex) {
	  console.log('🔍 开始后台检测', imagePaths.length, '张图片');
	  
	  // 🔥 并行检测所有图片
	  const checkPromises = imagePaths.map(async (filePath, index) => {
	    const globalIndex = startIndex + index;
	    
	    try {
	      // 检查文件大小
	      const fileInfo = await new Promise((resolve, reject) => {
	        uni.getFileInfo({
	          filePath: filePath,
	          success: resolve,
	          fail: reject
	        });
	      });
	      
	      console.log(`📁 图片 ${globalIndex + 1} 大小:`, (fileInfo.size / 1024).toFixed(2) + ' KB');
	      
	      // 🔥 文件过大直接标记为不安全
	      if (fileInfo.size > 1024 * 1024) {
	        this.imageCheckStatus[globalIndex] = {
	          checking: false,
	          safe: false,
	          error: true,
	          reason: '文件过大'
	        };
	        return;
	      }
	      
	      // 🔥 调用检测接口（不显示 Loading）
	      const uploadTask = uni.uploadFile({
	        url: 'https://xinshi00.com/upload/imgSecCheck',
	        filePath: filePath,
	        name: 'media',
	        formData: { openid: this.openid },
	      });
	      
	      const [error, res] = await new Promise((resolve) => {
	        uploadTask.then(resolve).catch(resolve);
	      });
	      
	      if (error) {
	        this.imageCheckStatus[globalIndex] = {
	          checking: false,
	          safe: false,
	          error: true,
	          reason: '检测失败'
	        };
	        return;
	      }
	      
	      const result = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
	      
	      if (result.meta && result.meta.status === 200) {
	        // ✅ 图片安全
	        this.imageCheckStatus[globalIndex] = {
	          checking: false,
	          safe: true,
	          error: false
	        };
	        console.log(`✅ 图片 ${globalIndex + 1} 检测通过`);
	        
	      } else {
	        // ❌ 图片违规
	        this.imageCheckStatus[globalIndex] = {
	          checking: false,
	          safe: false,
	          error: false,
	          reason: '内容违规'
	        };
	        console.warn(`🚫 图片 ${globalIndex + 1} 检测不通过`);
	      }
	      
	    } catch (err) {
	      console.error(`💥 图片 ${globalIndex + 1} 检测异常:`, err);
	      this.imageCheckStatus[globalIndex] = {
	        checking: false,
	        safe: false,
	        error: true,
	        reason: '检测异常'
	      };
	    }
	  });
	  
	  // 等待所有检测完成
	  await Promise.all(checkPromises);
	  
	  // 🔥 检查是否有违规图片
	  const unsafeImages = this.imageCheckStatus
	    .map((status, index) => ({ status, index }))
	    .filter(item => item.status.safe === false);
	  
	  if (unsafeImages.length > 0) {
	    console.warn('🚫 发现违规图片:', unsafeImages.length, '张');
	    
	    uni.showModal({
	      title: '图片检测完成',
	      content: `有 ${unsafeImages.length} 张图片未通过检测，已自动移除`,
	      showCancel: false,
	      confirmText: '我知道了',
	      success: () => {
	        // 🔥 移除违规图片（从后往前删除，避免索引错乱）
	        unsafeImages.reverse().forEach(item => {
	          this.imageList.splice(item.index, 1);
	          this.imageCheckStatus.splice(item.index, 1);
	        });
	      }
	    });
	  } else {
	    console.log('✅ 所有图片检测通过');
	  }
	  
	  this.allImagesChecked = true;
	},



	/**
	   * 🔥 新增：文本内容安全检测
	   */
	  async checkTextSafety(text) {
	    try {
	      console.log('🔍 开始检测文本:', text.substring(0, 30) + '...');
	      
	      const { data: res } = await uni.$http.post('/upload/textSecCheck', {
	        content: text,
	        openid: this.openid
	      });
	      
	      console.log('📥 文本检测结果:', res);
	      
	      if (res.meta.status === 200) {
	        console.log('✅ 文本内容安全');
	        return true;
	      } else {
	        console.warn('🚫 文本内容违规:', res.meta.msg);
	        return false;
	      }
	      
	    } catch (err) {
	      console.error('💥 文本检测出错:', err);
	      
	      // 🔥 网络错误时提示用户
	      uni.showToast({
	        title: '文本检测失败，请重试',
	        icon: 'none',
	        duration: 2000
	      });
	      
	      return false;
	    }
	  },


	
    deleteImage(index) {
      if (this.isPublishing) return; // 发布中禁用
      uni.showModal({
        title: '提示',
        content: '确定删除这张图片吗?',
        success: (res) => {
          if (res.confirm) {
            this.imageList.splice(index, 1)
            this.imageUrls.splice(index, 1)
          }
        }
      })
    },

   clearAllData() {
     this.imageList = [];
     this.imageUrls = [];
     this.goodsDescription = '';
     this.price = '';
     this.selectedCategory = '';
     this.selectedLocation = '闵行';
     
     // 🔥 清空检测状态
     this.imageCheckStatus = [];
     this.allImagesChecked = false;
     
     console.log('✅ 数据已清空');
   },

    useAIHelp() {
      if (this.isPublishing) return; // 发布中禁用
      uni.showToast({
        title: 'AI正在生成描述...',
        icon: 'none'
      })
      setTimeout(() => {
        this.goodsDescription = '这是一款品质优良的闲置商品,几乎全新,功能完好,适合需要的用户购买。'
      }, 1000)
    },

    /**
       * 🔥 修改：发布商品方法，增加文本审核
       */
      async publishGoods() {
        // 防止重复点击
        if (this.isPublishing) {
          console.log('⚠️ 发布中，请勿重复点击');
          return;
        }
    
        // 设置发布状态
        this.isPublishing = true;
        
        console.log('[0] 检查用户认证状态...')
        console.log('用户认证状态:', this.userBase.is_verified)
        
        if (this.userBase.is_verified !== 1) {
          this.isPublishing = false;
          uni.showModal({
            title: '认证提醒',
            content: '发布商品需要完成校园认证,是否前往认证?',
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
          return
        }
        
        if (this.imageList.length === 0) {
          this.isPublishing = false;
          uni.showToast({
            title: '请至少上传一张图片',
            icon: 'none'
          })
          return
        }
		
		// 🔥 新增：检查图片是否还在检测中
		  const stillChecking = this.imageCheckStatus.some(status => status.checking);
		  
		  if (stillChecking) {
		      this.isPublishing = false;
		      uni.showModal({
		        title: '请稍候',
		        content: '图片正在检测中，请稍后再试',
		        showCancel: false,
		        confirmText: '我知道了'
		      });
		      return;
		    }
			
			// 🔥 新增：检查是否有违规图片
			  const hasUnsafeImages = this.imageCheckStatus.some(status => status.safe === false);
			
			
			if (hasUnsafeImages) {
			    this.isPublishing = false;
			    uni.showModal({
			      title: '图片违规',
			      content: '存在违规图片，请删除后重试',
			      showCancel: false,
			      confirmText: '我知道了'
			    });
			    return;
			  }
			  
        if (!this.goodsDescription.trim()) {
          this.isPublishing = false;
          uni.showToast({
            title: '请输入商品描述',
            icon: 'none'
          })
          return
        }
    
        if (!this.price || parseFloat(this.price) <= 0) {
          this.isPublishing = false;
          uni.showToast({
            title: '请输入有效价格',
            icon: 'none'
          })
          return
        }
    
        // 🔥 新增：文本内容安全检测
        console.log('[1] 检测文本内容安全性...');
        uni.showLoading({
          title: '检测文本内容...',
          mask: true
        });
    
        const isTextSafe = await this.checkTextSafety(this.goodsDescription.trim());
        
        if (!isTextSafe) {
          uni.hideLoading();
          this.isPublishing = false;
          
          uni.showModal({
            title: '内容违规',
            content: '商品描述包含违规内容，请修改后重试',
            showCancel: false,
            confirmText: '我知道了'
          });
          return;
        }
    
        console.log('✅ 文本内容检测通过');
    
        // 🔥 上传图片
        console.log('[2] 开始上传图片...');
        await this.uploadImages(this.imageList);
        
        if (this.imageUrls.length === 0) {
          uni.hideLoading();
          this.isPublishing = false;
          uni.showToast({
            title: '图片上传失败,请重试',
            icon: 'none'
          })
          return
        }
    
        // 🔥 构造发布数据
        const publishData = {
          code: this.openid,
          publisherNickname: this.userBase.nickname,
          publisherAvatarUrl: this.userBase.avatarUrl,
          description: this.goodsDescription.trim(),
          price: parseFloat(this.price),
          location: this.selectedLocation,
          coverImage: this.imageUrls[0],
          images: this.imageUrls,
          categories: this.selectedCategory
        }
    
        uni.showLoading({
          title: '发布中...',
          mask: true
        })
    
        try {
          const { data: res } = await uni.$http.post('/goods/publish', publishData)
    
          if (res.meta.status !== 200) {
            throw new Error(res.meta.msg || '发布失败')
          }
    
          try {
            const queryObj = {
              code: this.openid,
              goods_id: res.message.goods_id
            }
			
			const goodsData = {
				goods_id: res.message.goods_id,
				goods_name: this.goodsDescription.trim(),
				goods_introduce: this.goodsDescription.trim(),
				goods_price: parseFloat(this.price),
				publisher_avatarUrl: this.userBase.avatarUrl,
				publisher_nickname: this.userBase.nickname,
				goods_big_logo: this.imageUrls,
				categories: this.selectedCategory,
				location: this.selectedLocation,
			}
			this.$store.commit('m_posts/setNewPost', {
			  post: goodsData,
			  targetPage: 'cate'
			});
			
            await uni.$http.post('/users/publish', queryObj)
          } catch (updateError) {
            console.error('更新用户发布记录失败:', updateError)
          }
    
          uni.hideLoading()
          this.isPublishing = false;
		
          uni.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1500
          })
    
          this.clearAllData()
    
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/cate/cate'
            })
          }, 1500)
    
        } catch (error) {
          uni.hideLoading()
          this.isPublishing = false;
          console.error('发布商品失败:', error)
          uni.showToast({
            title: error.message || '发布失败',
            icon: 'none',
            duration: 2000
          })
        }
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

      this.imageUrls = []

      try {
        for (let i = 0; i < filePaths.length; i++) {
          const filePath = filePaths[i]

          uni.showLoading({
            title: `上传中 ${i + 1}/${filePaths.length}`,
            mask: true
          })

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

          this.imageUrls.push(tokenRes.message.publicUrl)
        }

        uni.hideLoading()
        return this.imageUrls

      } catch (error) {
        console.error('上传失败:', error)
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
  },

  async onShow() {
    if (!this.token) {
      uni.switchTab({
        url: '/pages/my/my',
        success: () => {
          uni.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 2000
          })
        }
      })
      return
    }

    const queryObj = { code: this.openid }
    const { data: res } = await uni.$http.get('/users/userinfo', queryObj)

    if (res.meta.status === 200) {
      console.log(res.message)
      this.updateUserBase(res.message)
    }

    if (this.userBase.total_unread > 0) {
      uni.setTabBarBadge({
        index: 2,
        text: this.userBase.total_unread + ''
      })
    } else {
      uni.removeTabBarBadge({
        index: 2
      })
    }
  }
}
</script>

<style lang="scss">
.publish-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f7fa 0%, #ffffff 100%);
  padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
  position: relative;
}

/* 🔥 修改：新顶部导航栏 */
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 24rpx;
  background: #ffffff;
  border-bottom: 1rpx solid #f5f5f5;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);

  .nav-left {
    display: flex;
    align-items: center;
    gap: 8rpx;

    .nav-icon {
      font-size: 32rpx;
    }

    .nav-title {
      font-size: 28rpx;
      font-weight: 600;
      color: #333;
    }
  }

  .nav-right {
    .publish-btn-small {
      padding: 8rpx 16rpx;
      background: linear-gradient(135deg, #C00000 0%, #C00000 100%);
      color: #fff;
      font-size: 24rpx;
      border-radius: 30rpx;
      border: none;
      font-weight: 600;
      transition: all 0.3s ease;

      &:active {
        transform: scale(0.95);
        opacity: 0.8;
      }

      /* 🔥 禁用状态样式 */
      &[disabled] {
        background: #ccc;
        opacity: 0.7;
        transform: none;
      }
    }
  }
}

/* 🔥 禁用状态通用样式 */
.disabled {
  opacity: 0.5 !important;
  pointer-events: none !important;
}

.add-image-btn.disabled {
  border-color: #ccc;
  background: #f0f0f0;
  
  .add-icon, .add-text, .add-count {
    color: #999 !important;
  }
}

.category-tag-small.disabled {
  background: #f0f0f0 !important;
  border-color: #e0e0e0 !important;
  color: #999 !important;
  transform: none !important;
}

.ai-helper.disabled, .location-toggle.disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* 🔥 发布中遮罩层 */
.publishing-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.publishing-content {
  background: #fff;
  padding: 60rpx 40rpx;
  border-radius: 24rpx;
  text-align: center;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.2);
  min-width: 300rpx;
}

.loading-spinner {
  width: 80rpx;
  height: 80rpx;
  border: 6rpx solid #f3f3f3;
  border-top: 6rpx solid #C00000;
  border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 30rpx;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .publishing-text {
    display: block;
    font-size: 32rpx;
    color: #333;
    font-weight: 600;
    margin-bottom: 16rpx;
  }
  
  .publishing-tip {
    display: block;
    font-size: 26rpx;
    color: #999;
  }
  
  .page-content {
    padding: 24rpx;
    position: relative;
  }
  
  .card {
    background: #ffffff;
    border-radius: 24rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
    margin-bottom: 24rpx;
    overflow: hidden;
    transition: all 0.3s ease;
  
    &:active {
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
    }
  }
  
  .combined-section {
    padding: 0;
  }
  
  .images-area {
    padding: 24rpx;
    border-bottom: 2rpx solid #f5f5f5;
  }
  
  .images-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
  }
  
  .image-item {
    position: relative;
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  
    &:active {
      transform: scale(0.95);
    }
  
    .preview-image {
      width: 100%;
      height: 100%;
    }
  
    .delete-btn {
      position: absolute;
      top: 8rpx;
      right: 8rpx;
      width: 44rpx;
      height: 44rpx;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10rpx);
  
      .delete-icon {
        color: #fff;
        font-size: 32rpx;
        line-height: 32rpx;
        font-weight: bold;
      }
    }
  
    .image-index {
      position: absolute;
      top: 8rpx;
      left: 8rpx;
      min-width: 40rpx;
      height: 40rpx;
      padding: 0 8rpx;
      background: linear-gradient(135deg, #C00000 0%, #C00000 100%);
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 22rpx;
      font-weight: bold;
    }
  }
  
  .add-image-btn {
    border: 3rpx dashed #d9d9d9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fafafa;
  
    .add-icon {
      font-size: 64rpx;
      margin-bottom: 4rpx;
    }
  
    .add-text {
      font-size: 24rpx;
      color: #999;
      margin-bottom: 4rpx;
    }
  
    .add-count {
      font-size: 20rpx;
      color: #ccc;
    }
  }
  
  .description-area {
    padding: 0;
  }
  
  .description-input {
    width: 100%;
    font-size: 28rpx;
    color: #333;
    min-height: 200rpx;
    padding: 24rpx;
    box-sizing: border-box;
    line-height: 1.6;
    border-bottom: 2rpx solid #f5f5f5;
    
    /* 🔥 禁用状态样式 */
    &:disabled {
      background: #f9f9f9;
      color: #999;
    }
  }
  
  .action-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16rpx 24rpx;
    gap: 16rpx;
    border-bottom: 2rpx solid #f5f5f5;
  }
  
  .ai-helper {
    display: flex;
    align-items: center;
    padding: 12rpx 20rpx;
    background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
    border-radius: 40rpx;
    color: #C00000;
    font-size: 24rpx;
    border: 2rpx solid #ffd9d9;
    transition: all 0.3s ease;
    flex: 1;
    justify-content: center;
  
    &:active {
      opacity: 0.7;
      transform: scale(0.98);
    }
  
    .ai-icon {
      margin-right: 8rpx;
      font-size: 28rpx;
      animation: sparkle 2s infinite;
    }
  
    @keyframes sparkle {
      0%, 100% { transform: scale(1) rotate(0deg); }
      50% { transform: scale(1.2) rotate(180deg); }
    }
  }
  
  .location-toggle {
    display: flex;
    align-items: center;
    padding: 12rpx 20rpx;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 40rpx;
    color: #0369a1;
    font-size: 24rpx;
    border: 2rpx solid #bae6fd;
    transition: all 0.3s ease;
    flex: 1;
    justify-content: center;
  
    &:active {
      opacity: 0.7;
      transform: scale(0.98);
    }
  
    .location-icon {
      margin-right: 8rpx;
      font-size: 28rpx;
    }
  }
  
  .category-compact {
    display: flex;
    align-items: center;
    padding: 16rpx 24rpx 24rpx;
  
    .category-label {
      font-size: 26rpx;
      color: #666;
      margin-right: 16rpx;
      flex-shrink: 0;
    }
  
    .category-tags {
      display: flex;
      gap: 12rpx;
      flex: 1;
    }
  
    .category-tag-small {
      padding: 10rpx 20rpx;
      background: #f8f8f8;
      border: 2rpx solid #e8e8e8;
      border-radius: 30rpx;
      font-size: 24rpx;
      color: #666;
      transition: all 0.3s ease;
      flex: 1;
      text-align: center;
  
      &.active {
        background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
        border-color: #C00000;
        color: #C00000;
        font-weight: 600;
        transform: scale(1.05);
      }
  
      &:active {
        transform: scale(0.95);
      }
    }
  }
  
  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28rpx 24rpx;
  
    .label-row {
      display: flex;
      align-items: center;
  
      .label-icon {
        font-size: 32rpx;
        margin-right: 8rpx;
      }
  
      .label {
        font-size: 30rpx;
        color: #333;
        font-weight: 600;
      }
    }
  }
  
  .price-section {
    align-items: center;
  }
  
  .price-box {
    display: flex;
    align-items: center;
    min-width: 200rpx;
  
    .price-symbol {
      font-size: 32rpx;
      color: #C00000;
      font-weight: bold;
      margin-right: 8rpx;
    }
  
    .price-input {
      font-size: 40rpx;
      color: #C00000;
      font-weight: bold;
      text-align: right;
      flex: 1;
      
      /* 🔥 禁用状态样式 */
      &:disabled {
        background: #f9f9f9;
        color: #999;
      }
    }
  }
  
  .bottom-placeholder {
    height: 40rpx;
  }
  </style>