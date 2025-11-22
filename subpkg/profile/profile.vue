<template>
	<view class="publisher-container">
		<!-- 1. 顶部用户信息区域 -->
		<view class="user-header">
			<!-- 头像 -->
			<image 
				:src="user.avatarUrl || '/static/default-avatar.png'" 
				class="avatar" 
				mode="aspectFill"
				@click="handleAvatarClick"
			></image>
			
			<!-- 右侧信息 -->
			<view class="user-right">
				<!-- 昵称和性别 -->
				<view class="user-basic">
					<text class="nickname">{{user.nickname}}</text>
					<text class="gender" v-if="user.user_sex">{{ user.user_sex }}</text>
				</view>
				
				<!-- 个人简介 -->
				<view class="intro-text">{{userIntro}}</view>
				
				<!-- 关注/粉丝数和关注按钮 -->
				<view class="stats-follow-row">
				  <view class="stats">
				    <text class="stat-item" @click="gotoFollower()">{{ (user.followers_ids || []).length }} 粉丝</text>
				    <text class="stat-divider">|</text>
				    <text class="stat-item" @click="gotoFollow()">{{ (user.following_ids || []).length }} 关注</text>
				  </view>
				  
				  <!-- 按钮组（关注按钮和私聊按钮） -->
				  <view class="action-buttons" v-if="!ismyself">
				    <!-- 私聊按钮 -->
				    <button class="msg-btn" @click="goToChat">
				      私聊
				    </button>
				    <!-- 关注按钮 -->
				    <button 
				      class="follow-btn" 
				      :class="{ following: isFollowing }"
				      @click="toggleFollow"
				    >
				      {{ isFollowing ? '已关注' : '+ 关注' }}
				    </button>
				  </view>
				</view>
			</view>
		</view>

		<!-- 2. 动态选项卡（带切换图标） -->
		<view class="dynamic-tab">
			<view class="tab-title">
				<text class="tab-text">动态</text>
				<text class="tab-badge">{{ count }}</text>
			</view>
			
			<!-- 切换图标 -->
			<view class="toggle-icon" @click="toggleContentType">
				<text class="toggle-text">{{ contentType === 'post' ? '树洞' : '二手' }}</text>
				<text class="toggle-arrow">⇄</text>
			</view>
		</view>

		<!-- 3. 内容区域 -->
		<!-- 树洞内容 -->
		<view v-if="contentType === 'post'">
			<!-- 帖子列表 -->
			<scroll-view class="post-list" scroll-y @scrolltolower="loadMorePosts">
				<view class="post-item" v-for="(post, index) in postList" :key="post.id">

					<view class="post-content-row" @click="gotoPostDetail(post)">
					  <view class="post-content">
					    <text class="content-text">{{ post.content }}</text>
					  </view>
					  <view class="post-time-wrapper">
					    <text class="post-time">{{ post.timeText }}</text>
					  </view>
					</view>

					<!-- 帖子图片 -->
					<view class="post-images" v-if="post.images && post.images.length > 0" @click="gotoPostDetail(post)">
						<image 
							v-for="(img, imgIndex) in post.images.slice(0, 3)" 
							:key="imgIndex"
							class="post-image"
							:src="img" 
							mode="aspectFill"
						></image>
						<view class="more-images" v-if="post.images.length > 3">
							<text>+{{ post.images.length - 3 }}</text>
						</view>
					</view>

					<!-- 帖子底部 -->
					<view class="post-footer">
						<view class="footer-left">
							<text class="view-count">{{ post.view_count }}浏览</text>
						</view>
						
						<view class="footer-right">
							<view class="action-item" @click.stop="toggleLike(post)">
							  <image 
							    class="action-icon-img" 
							    :src="post.isLiked ? iconLikedUrl : iconLikeUrl" 
							    mode="aspectFit"
							  ></image>
							  <text class="action-count">{{ post.like_count }}</text>
							</view>
							
							<view class="action-item">
							  <image 
							    class="action-icon-img" 
							    :src="iconCommentUrl" 
							    mode="aspectFit"
							  ></image>
							  <text class="action-count">{{ post.comment_count }}</text>
							</view>
							
						</view>
					</view>
				</view>

				<!-- 加载更多 -->
				<view class="load-more" v-if="loadingPosts && postList.length > 0">
					<text class="load-text">加载中...</text>
				</view>
				<view class="no-more-posts" v-else-if="!hasMorePosts && postList.length > 0">
					<text class="no-more-text">没有更多了</text>
				</view>

				<!-- 帖子空状态 -->
				<view v-if="postList.length === 0 && !loadingPosts" class="empty-state">
					<text class="empty-icon">📝</text>
					<text class="empty-text">{{ ismyself ? '你还没有发布过帖子' : 'TA还没有发布过帖子' }}</text>
				</view>
			</scroll-view>
		</view>

		<!-- 二手商品内容 -->
		<!-- 二手商品内容 -->
		<view v-if="contentType === 'goods'">
		  <!-- 🔥 修改：添加 scroll-view 支持滚动加载 -->
		  <scroll-view 
		    class="goods-scroll" 
		    scroll-y 
		    @scrolltolower="loadMoreGoods"
		  >
		    <!-- 商品列表 - 双列瀑布流 -->
		    <view class="waterfall" v-if="goodsList && goodsList.length > 0">
		      <view class="col">
		        <view v-for="(item, i) in leftColumn" :key="i" @click="gotoDetail(item)">
		          <my-goods v-if="item" :goods="item" />
		        </view>
		      </view>
		      <view class="col">
		        <view v-for="(item, i) in rightColumn" :key="i" @click="gotoDetail(item)">
		          <my-goods v-if="item" :goods="item" />
		        </view>
		      </view>
		    </view>
		
		    <!-- 🔥 新增：商品加载状态提示 -->
		    <view class="load-more" v-if="loadingGoods && goodsList.length > 0">
		      <text class="load-text">加载中...</text>
		    </view>
		    <view class="no-more-posts" v-else-if="!goodsHasMore && goodsList.length > 0">
		      <text class="no-more-text">没有更多了</text>
		    </view>
		
		    <!-- 商品空状态 -->
		    <view v-if="goodsList.length === 0 && !loadingGoods" class="empty-state">
		      <text class="empty-icon">📦</text>
		      <text class="empty-text">{{ ismyself ? '你还没有发布过商品' : 'TA还没有发布过商品' }}</text>
		    </view>
		  </scroll-view>
		</view>

		<!-- 头像查看弹出层（仅非本人时使用） -->
		<uni-popup ref="avatarPopup" type="center">
			<view class="avatar-preview">
				<image 
					:src="user.avatarUrl || '/static/default-avatar.png'" 
					mode="aspectFit"
					class="preview-image"
				></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
	data() {
		return {
			isFollowing: false,
			userIntro: '',
			
			// 内容类型：post-树洞，goods-二手
			contentType: 'post',
			
			// 商品相关
			goodsList: [],
			
			// 帖子相关
			postList: [],
			postPage: 1,
			postPageSize: 10,
			hasMorePosts: true,
			loadingPosts: true,
			
			user: {},        
			ismyself: false,
			uploading: false,
			loading: false,
			count: 0,
			postcount: 0,
			goodscount: 0,
			iconLikeUrl: 'https://img.xinshi00.com/label/like.png',
			iconLikedUrl: 'https://img.xinshi00.com/label/liked.png',
			iconCommentUrl: 'https://img.xinshi00.com/label/chat.png',
			goodsPage: 1,
			    goodsPageSize: 10,
			    goodsHasMore: true,
			    loadingGoods: false, // 🔥 新增：商品加载状态
		}
	},

	async onLoad(options) {
		if (!options || Object.keys(options).length === 0) {
			this.ismyself = true
		}
		if (!this.userBase || Object.keys(this.userBase).length === 0) {
			try { 
				await this.$store.dispatch('m_user/getUserInfo') 
			} catch(e) {
				console.error('获取用户信息失败:', e)
			}
		}

		let fromRoute = null
		try {
			if (options && options.publisher) {
				fromRoute = JSON.parse(decodeURIComponent(options.publisher))
			}
		} catch (e) {
			console.warn('publisher 解析失败：', e)
		}
		
		this.user = (fromRoute && typeof fromRoute === 'object') ? fromRoute : (this.userBase || {})
		const queryObj = {code: this.user.openid};
		const { data: res } = await uni.$http.get('/users/userinfo', queryObj);
		if (res.meta.status === 200) {
			this.user = res.message
		}
		this.ismyself = (this.user.openid === this.userBase.openid) ? true : false
		this.userIntro = this.user?.user_introduce ?? '这个人很懒，什么都没留下'
		
		// 🔥 修复:初始化分页状态
		    this.postPage = 1
		    this.hasMorePosts = true
		    this.postList = []
			
		// 🔥 新增：初始化商品分页状态
		  this.goodsPage = 1
		  this.goodsHasMore = true
		  this.goodsList = []
			
		// 加载数据（默认显示树洞）
		await Promise.all([
			this.loadUserPosts(),
			this.loadPublisherGoods()
		])
		
		if (!this.ismyself) {
			await this.getIfFollowed()
		}
		await this.loadCount()
	},

	computed: {
		...mapState('m_user', ['token', 'code', 'userBase', 'openid']),
		leftColumn() { 
			return (this.goodsList || []).filter((_, i) => i % 2 === 0) 
		},
		rightColumn() { 
			return (this.goodsList || []).filter((_, i) => i % 2 === 1) 
		},
		// 总动态数
		totalCount() {
			return this.postList.length + this.goodsList.length
		}
	},
	
	
	methods: {
		...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase', 'updateCode', 'updateOpenid']),
		
		// 新增：跳转到私聊页面
		  goToChat() {
		    uni.navigateTo({
		      url: `/subpkg/personal-chat/personal-chat?openid=${this.user.openid}`
		    });
		  },
		  
		// ✅ 点赞/取消点赞
		async toggleLike(post) {
			try {
				if (!this.openid) {
						  // 弹出登录提示框
						  uni.showModal({
						    title: '提示',
						    content: '需要登录才能体验更多内容哦',
						    cancelText: '取消',
						    confirmText: '登录',
						    success: (res) => {
						      if (res.confirm) {
						        // 用户点击了"登录"按钮
						        uni.switchTab({
						          url: '/pages/my/my'
						        })
						      }
						      // 用户点击了"取消"按钮，不做任何操作
						    }
						  })
						  return
						}
				
				const { data: res } = await uni.$http.post('/posts/like', {
					post_id: post.id,
					openid: this.openid,
					is_like: !post.isLiked
				})
				
				if (res.meta.status === 200) {
				
					const index = this.postList.findIndex(p => p.id === post.id)
					if (index !== -1) {
						this.postList[index].isLiked = !this.postList[index].isLiked
						this.postList[index].like_count = res.message.like_count || 0
						this.$set(this.postList, index, {...this.postList[index]})
					}
				}
			} catch (error) {
				console.error('点赞失败:', error)
				this.showMessageToast('操作失败')
			}
		},
		
		async loadCount() {
			const { data: res } = await uni.$http.get('/posts/my-count', {
				openid: this.user.openid,
			})
			if (res.meta.status === 200) {
				this.postcount = res.message.total
				}
			
			const { data: res3 } = await uni.$http.get('/goods/count', {
				goods_id: this.user.goods_id,
			})
			if (res3.meta.status === 200) {
				this.goodscount = res3.message.count
			}
			
			// this.goodscount = this.user.goods_id.length;
			
			this.count = this.contentType === 'post' ? this.postcount : this.goodscount;
		},
		// 切换内容类型
		toggleContentType() {
			this.contentType = this.contentType === 'post' ? 'goods' : 'post'
			this.count = this.contentType === 'post' ? this.postcount : this.goodscount;
		},

		// 加载用户帖子（所有发布的帖子）
		async loadUserPosts() {
			try {
				this.loadingPosts = true
				
				const { data: res } = await uni.$http.get('/users/posts', {
					user_openid: this.user.openid,
					viewer_openid: this.userBase.openid || '',
					type: 0, // 0-发布的帖子
					page: this.postPage,
					pageSize: this.postPageSize
				})

				if (res.meta.status === 200) {
					const newPosts = res.message.list.map(post => ({
						...post,
						images: this.processPostImages(post.images),
						timeText: this.formatTime(post.created_at),
					}))
					
					console.log(`加载了 ${newPosts.length} 条帖子`)
					
					// 🔥 修复:第一页直接赋值,后续页追加
					if (this.postPage === 1) {
						this.postList = newPosts
					} else {
						this.postList = [...this.postList, ...newPosts]
					}
					
					// 更新分页状态
					this.hasMorePosts = res.message.hasMore
					// if (this.hasMorePosts) {
					// 	this.postPage++
					// }
					
					console.log('是否还有更多:', this.hasMorePosts, '下一页:', this.postPage)
					
					// if (this.postPage === 1) {
					// 	this.postList = newPosts
					// } else {
					// 	this.postList = this.postList.concat(newPosts)
					// }
					
					// this.hasMorePosts = res.message.hasMore
				}
			} catch (error) {
				console.error('加载帖子失败:', error)
				uni.showToast({
					title: '加载失败',
					icon: 'none'
				})
			} finally {
				this.loadingPosts = false
			}
		},

		// 加载更多帖子
		async loadMorePosts() {
			console.log('🔄 触发加载更多 - 当前页:', this.postPage, '是否还有更多:', this.hasMorePosts, '是否正在加载:', this.loadingPosts)
			    
			    // 🔥 修复:检查条件
			    if (!this.hasMorePosts) {
			        console.log('⚠️ 没有更多数据了')
			        return
			    }
			    
			    if (this.loadingPosts) {
			        console.log('⚠️ 正在加载中,跳过')
			        return
			    }
			    
			    // 🔥 关键修复:先增加页码,再加载
			    this.postPage++
			    await this.loadUserPosts()
		},

		// 加载用户商品
		// 加载用户商品
		async loadPublisherGoods() {
		  try {
		    // 🔥 修改：使用专门的加载状态
		    this.loadingGoods = true
		    
		    const ids = Array.isArray(this.user?.goods_id) ? this.user.goods_id : []
		    if (ids.length === 0) {
		      this.goodsList = []
		      this.goodsHasMore = false
		      return
		    }
		    
		    // 计算当前页的商品ID
		    const startIndex = (this.goodsPage - 1) * this.goodsPageSize
		    const endIndex = startIndex + this.goodsPageSize
		    const pageIds = ids.slice(startIndex, endIndex)
		    
		    console.log(`📦 加载商品 - 第${this.goodsPage}页，商品ID:`, pageIds)
		    
		    if (pageIds.length === 0) {
		      this.goodsHasMore = false
		      return
		    }
		    
		    const { data: res } = await uni.$http.get('/goods/publishsearch', { goods_id: pageIds })
		    if (res?.meta?.status === 200 && Array.isArray(res?.message)) {
		      // 🔥 修改：第一页直接赋值，后续页追加
		      if (this.goodsPage === 1) {
		        this.goodsList = res.message
		      } else {
		        this.goodsList = [...this.goodsList, ...res.message]
		      }
		      
		      // 判断是否还有更多数据
		      this.goodsHasMore = endIndex < ids.length
		      
		      console.log(`✅ 商品加载成功 - 当前总数: ${this.goodsList.length}, 是否还有更多: ${this.goodsHasMore}`)
		    }
		  } catch (err) {
		    console.error('❌ 加载商品失败:', err)
		    uni.showToast({
		      title: '加载失败',
		      icon: 'none'
		    })
		  } finally {
		    this.loadingGoods = false
		  }
		},
		
		// 🔥 新增：加载更多商品
		async loadMoreGoods() {
		  console.log('🔄 触发商品加载更多 - 当前页:', this.goodsPage, '是否还有更多:', this.goodsHasMore, '是否正在加载:', this.loadingGoods)
		  
		  // 检查条件
		  if (!this.goodsHasMore) {
		    console.log('⚠️ 没有更多商品了')
		    return
		  }
		  
		  if (this.loadingGoods) {
		    console.log('⚠️ 正在加载中，跳过')
		    return
		  }
		  
		  // 增加页码并加载
		  this.goodsPage++
		  await this.loadPublisherGoods()
		},
		
		// 处理帖子图片
		processPostImages(images) {
			if (!images) return []
			
			let imageArray = []
			if (typeof images === 'string') {
				try {
					imageArray = JSON.parse(images)
				} catch (e) {
					return []
				}
			} else if (Array.isArray(images)) {
				imageArray = images
			}
			
			return imageArray
		},

		formatTime(timestamp) {
		  if (!timestamp) return '刚刚'
		  
		  const time = typeof timestamp === 'string' ? new Date(timestamp).getTime() : timestamp
		  const now = Date.now()
		  const diff = now - time
		  
		  const minute = 60 * 1000
		  const hour = 60 * minute
		  const day = 24 * hour
		  
		  if (diff < minute) return '刚刚'
		  if (diff < hour) return Math.floor(diff / minute) + '分钟前'
		  if (diff < day) return Math.floor(diff / hour) + '小时前'
		  if (diff < 7 * day) return Math.floor(diff / day) + '天前'
		  
		  const date = new Date(time)
		  return `${date.getMonth() + 1}-${date.getDate()}`
		},

		gotoPostDetail(post) {
			if (post.images.length > 0) {
				uni.navigateTo({
					url: '/subpkg/topic-detail/topic-detail?id=' + post.id
				})
			}
			else {
				uni.navigateTo({
				url: '/subpkg/post-detail/post-detail?id=' + post.id
			})
			}
			
		},

		// 获取关注状态
		async getIfFollowed() {
			try {
				const queryObj = {
					code: this.userBase.openid, 
					publisher_id: this.user.openid
				}
				const { data: res } = await uni.$http.get('/users/iffollow', queryObj) 
				if (res.meta.status === 200) {
					this.isFollowing = res.data.isFollowing
				}
			} catch (error) {
				console.error('获取关注状态失败:', error)
			}
		},

		// 点击头像（非本人时查看大图）
		handleAvatarClick() {
			if (!this.ismyself) {
				this.$refs.avatarPopup.open()
			}
		},

		// 切换关注
		async toggleFollow() {
			try {
				if (!this.openid) {
					uni.showToast({ title: '请先登录', icon: 'none' })
					return
				}
				
				const url = !this.isFollowing ? '/users/follow' : '/users/unfollow'
				
				const { data } = await uni.$http.post(url, {
					code: this.userBase.openid,
					publisher_id: this.user.openid
				})
				
				
				if (data.meta.status === 200) {
					this.isFollowing = !this.isFollowing
					uni.showToast({ 
						title: this.isFollowing ? '关注成功' : '取消关注', 
						icon: 'success',
					})
					this.user.followers_ids.length += this.isFollowing ? 1 : -1
					
					const queryObj = {code: this.openid};
					const { data: res1 } = await uni.$http.get('/users/userinfo', queryObj);
					if (res1.meta.status === 200) {
					  this.updateUserBase(res1.message)
					  console.log('imhere')
					}
					
				}
			} catch (error) {
				console.error('关注操作失败:', error)
			}
		},

		// 跳转到商品详情
		async gotoDetail(goodsId) {
			try {
				console.log('📊 增加商品浏览次数:', goodsId);
				const { data: res } = await uni.$http.post('/goods/view', {
					goods_id: goodsId,
					user_openid: this.openid || null
				});
			
				if (res.meta.status === 200) {
					console.log('✅ 浏览次数增加成功');
				} else {
					console.warn('⚠️ 浏览次数增加失败:', res.meta.msg);
				}
			} catch (error) {
				console.error('❌ 浏览次数增加接口错误:', error);
			}
			uni.navigateTo({
				url: `/subpkg/goods_detail/goods_detail?goods_id=${goodsId.goods_id}`
			})
		},

		gotoFollow() {
			const payload = encodeURIComponent(JSON.stringify(this.user))
			uni.navigateTo({
				url: `/subpkg/follow/follow?publisher=${payload}`
			})
		},

		gotoFollower() {
			const payload = encodeURIComponent(JSON.stringify(this.user))
			uni.navigateTo({
				url: `/subpkg/follower/follower?publisher=${payload}`
			})
		}
	}
}
</script>

<style lang="scss">
	
	/* 🔥 新增：商品滚动容器 */
	.goods-scroll {
	  height: calc(100vh - 350rpx);
	  background-color: #f7f7f7;
	}
	
	/* 商品列表瀑布流 */
	.waterfall {
	  display: flex;
	  padding: 20rpx 10rpx;
	  gap: 20rpx;
	  
	  .col {
	    flex: 1;
	    display: flex;
	    flex-direction: column;
	    gap: 20rpx;
	  }
	}
	
.publisher-container {
	min-height: 100vh;
	background-color: #f7f7f7;
}

/* 1. 用户头部区域 - 重新设计 */
.user-header {
	display: flex;
	padding: 40rpx 30rpx;
	background-color: #fff;
	
	.avatar {
		width: 140rpx;
		height: 140rpx;
		border-radius: 70rpx;
		margin-right: 24rpx;
		flex-shrink: 0;
	}
	
	.user-right {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
		.user-basic {
			display: flex;
			align-items: center;
			gap: 12rpx;
			margin-bottom: 12rpx;
			
			.nickname {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
			}
			
			.gender {
				font-size: 24rpx;
				color: #999;
				padding: 4rpx 12rpx;
				background-color: #f5f5f5;
				border-radius: 8rpx;
			}
		}
		
		.intro-text {
			font-size: 26rpx;
			color: #666;
			line-height: 1.5;
			margin-bottom: 16rpx;
		}
		
		.stats-follow-row {
		  display: flex;
		  align-items: center;
		  justify-content: space-between;
		  
		  .stats {
		    display: flex;
		    align-items: center;
		    
		    .stat-item {
		      font-size: 26rpx;
		      color: #666;
		    }
		    
		    .stat-divider {
		      margin: 0 16rpx;
		      color: #ddd;
		    }
		  }
		  
		  /* 🔥 新增：按钮组容器 */
		  .action-buttons {
		    display: flex;
		    gap: 12rpx;
		    align-items: center;
		  }
		  
		  /* 🔥 新增：私聊按钮样式 */
		  .msg-btn {
		    padding: 10rpx 24rpx;
		    background-color: #fff;
		    color: #333;
		    font-size: 26rpx;
		    border-radius: 40rpx;
		    border: 1rpx solid #e6e6e6;
		  }
		  
		  .follow-btn {
		    padding: 10rpx 32rpx;
		    background-color: #c00000;
		    color: #fff;
		    font-size: 26rpx;
		    border-radius: 40rpx;
		    border: none;
		    
		    &.following {
		      background-color: #f0f0f0;
		      color: #666;
		    }
		  }
		}
	}
}

/* 2. 动态选项卡（带切换图标） */
.dynamic-tab {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	padding: 24rpx 30rpx;
	margin-top: 2rpx;
	border-bottom: 1rpx solid #f0f0f0;
	
	.tab-title {
		display: flex;
		align-items: center;
		
		.tab-text {
			font-size: 32rpx;
			color: #333;
			font-weight: bold;
		}
		
		.tab-badge {
			font-size: 24rpx;
			color: #999;
			margin-left: 12rpx;
		}
	}
	
	.toggle-icon {
		display: flex;
		align-items: center;
		gap: 8rpx;
		padding: 8rpx 20rpx;
		background-color: #f5f5f5;
		border-radius: 20rpx;
		
		&:active {
			background-color: #e8e8e8;
		}
		
		.toggle-text {
			font-size: 26rpx;
			color: #666;
		}
		
		.toggle-arrow {
			font-size: 28rpx;
			color: #999;
		}
	}
}

/* 帖子列表 */
.post-list {
	height: calc(100vh - 350rpx);
	background-color: #f7f7f7;
}

.post-item {
	background-color: #fff;
	margin: 0 0 20rpx 0;
	padding: 30rpx;
	
	
	&:active {
		background-color: #f9f9f9;
	}
	
	.post-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16rpx;
		
		.post-time {
			font-size: 24rpx;
			color: #999;
		}
		
		.post-category {
			font-size: 22rpx;
			color: #c00000;
			background-color: #fff0f0;
			padding: 6rpx 12rpx;
			border-radius: 4rpx;
		}
	}
	
	/* 🔥 新增：内容和时间同行容器 */
	.post-content-row {
	  display: flex;
	  align-items: flex-start;
	  gap: 10px;
	  margin-bottom: 10px;
	}
	
	/* 🔥 修改：帖子内容区域 */
	.post-content {
	  flex: 1;
	  min-width: 0; /* 防止内容撑开容器 */
	  
	  .content-text {
	    font-size: 15px;
	    color: #333;
	    line-height: 1.6;
	    display: -webkit-box;
	    -webkit-line-clamp: 3;
	    -webkit-box-orient: vertical;
	    overflow: hidden;
	    word-break: break-all;
	  }
	}
	
	/* 🔥 新增：时间包裹器 */
	.post-time-wrapper {
	  flex-shrink: 0; /* 防止时间被压缩 */
	  align-self: flex-start;
	  
	  .post-time {
	    font-size: 12px;
	    color: #999;
	    white-space: nowrap; /* 时间不换行 */
	  }
	}
	
	.post-images {
		display: flex;
		gap: 12rpx;
		margin-bottom: 20rpx;
		position: relative;
		
		.post-image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 8rpx;
			background-color: #f0f0f0;
		}
		
		.more-images {
			width: 120rpx;
			height: 120rpx;
			border-radius: 8rpx;
			background-color: rgba(0, 0, 0, 0.6);
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 24rpx;
		}
	}
	
	.post-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 16rpx;
		border-top: 1rpx solid #f0f0f0;
		
		.footer-left {
			.view-count {
				font-size: 22rpx;
				color: #999;
			}
		}
		
		.footer-right {
			display: flex;
			gap: 15px;
			align-items: center;
			
			
			.like-count,
			.comment-count {
				font-size: 22rpx;
				color: #666;
			}
			
			// 🔥 新增：操作项容器
			.action-item {
			  display: flex;
			  align-items: center;
			  gap: 4px;
			}
			
			// 🔥 新增：图标样式
			.action-icon-img {
			  width: 16px;
			  height: 16px;
			}
			
			// 🔥 修改：统一文本样式
			.action-count {
			  font-size: 12px;
			  color: #666;
			}
			
			
		}
	}
}

.load-more,
.no-more-posts {
	padding: 40rpx 0;
	text-align: center;
	
	.load-text,
	.no-more-text {
		font-size: 26rpx;
		color: #999;
	}
}

/* 商品列表瀑布流 */
.waterfall {
	display: flex;
	padding: 20rpx 10rpx;
	gap: 20rpx;
	
	.col {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}
}

/* 空状态 */
.empty-state {
	padding: 200rpx 0;
	text-align: center;
	
	.empty-icon {
		font-size: 80rpx;
		display: block;
		margin-bottom: 20rpx;
	}
	
	.empty-text {
		font-size: 28rpx;
		color: #999;
	}
}

.waterfall {
		  display: flex;
		  justify-content: space-between;
		  padding: 16rpx;
		  box-sizing: border-box;
		}
		
		.col {
		  width: 48%;
		  display: flex;
		  flex-direction: column;
		}
		
/* 头像预览 */
.avatar-preview {
	width: 600rpx;
	height: 600rpx;
	background-color: #000;
	border-radius: 20rpx;
	overflow: hidden;
	
	.preview-image {
		width: 100%;
		height: 100%;
	}
}
</style>
