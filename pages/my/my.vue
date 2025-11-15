

```vue
<template>
  <view>
    <my-login v-if="!token"></my-login>
    
      <view class="my-userinfo-container" v-else>
        <view class="drawer-mask" :class="{ 'show': showDrawer }" @click="closeDrawer"></view>
        <view class="drawer-container" :class="{ 'show': showDrawer }">
          <view class="drawer-header">
            <text class="drawer-title">菜单</text>
            <view class="drawer-close" @click="closeDrawer">
              <uni-icons type="closeempty" size="24" color="#666"></uni-icons>
            </view>
          </view>
          
          <view class="drawer-toggle">
            <view 
              class="toggle-item"
              :class="{ 'active': drawerTab === 0 }"
              @click="switchDrawerTab(0)"
            >
              <text class="toggle-text">树洞</text>
            </view>
            <view 
              class="toggle-item"
              :class="{ 'active': drawerTab === 1 }"
              @click="switchDrawerTab(1)"
            >
              <text class="toggle-text">集市</text>
            </view>
          </view>
          
          <view class="drawer-content">
            <view v-if="drawerTab === 0" class="menu-section">
              <view class="menu-item" @click="handleMenuClick('myPosts')">
                <text class="menu-text">发布的帖子</text>
                
                <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
              </view>
              
              <view class="menu-item" @click="handleMenuClick('mydeletedPosts')">
                <text class="menu-text">删除的帖子</text>
        
                <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
              </view>
			  
			  <view class="menu-item" @click="handleMenuClick('myLike')">
			    <text class="menu-text">我点赞的帖子</text>
			
			    <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
			  </view>
              
              <view class="menu-item" @click="handleMenuClick('myComments')">
                <text class="menu-text">我评论的帖子</text>
          
                <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
              </view>
            </view>
            
            <view v-if="drawerTab === 1" class="menu-section">
              <view class="menu-item" @click="handleMenuClick('published')">
                <text class="menu-text">我发布的</text>
                <text class="menu-count" v-if="userBase.goods_count > 0">{{ userBase.goods_count }}</text>
                <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
              </view>
              
              <view class="menu-item" @click="handleMenuClick('bought')">
                <text class="menu-text">我买到的</text>
                <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
              </view>
              
              <view class="menu-item" @click="handleMenuClick('sold')">
                <text class="menu-text">我卖出的</text>
                <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
              </view>
              
              <view class="menu-item" @click="handleMenuClick('collect')">
                <text class="menu-text">收藏的商品</text>
                <text class="menu-count" v-if="userBase.goods_collects && userBase.goods_collects.length > 0">
                  {{ userBase.goods_collects.length }}
                </text>
                <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
              </view>
              
              <view class="menu-item" @click="handleMenuClick('history')">
                <text class="menu-text">浏览足迹</text>
                <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
              </view>
              
              <view class="menu-item" @click="handleMenuClick('comment')">
                <text class="menu-text">评价的商品</text>
                <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
              </view>
            </view>
          </view>
          
          <view class="drawer-footer">
            <button class="footer-item" @click="handleMenuClick('editProfile')">
              <text>编辑资料</text>
              <uni-icons type="arrowright" size="16" color="#999" class="arrow-icon"></uni-icons>
            </button>
            
            <button class="footer-item feedback-btn" open-type="contact" @click="handleMenuClick('feedback')">
              <text>反馈</text>
              <uni-icons type="arrowright" size="16" color="#999" class="arrow-icon"></uni-icons>
            </button>
            
            <button class="footer-item contact-btn" open-type="contact">
              <text>联系我们</text>
              <uni-icons type="arrowright" size="16" color="#999" class="arrow-icon"></uni-icons>
            </button>
            
            <button class="footer-item logout-btn" @click="handleMenuClick('logout')">
              <text>退出登录</text>
              <uni-icons type="arrowright" size="16" color="#999" class="arrow-icon"></uni-icons>
            </button>
          </view>
        </view>
        
        <view class="user-header">
          <view class="user-info">
            <image 
              :src="userBase.avatarUrl || '/static/default-avatar.png'" 
              class="avatar"
              mode="aspectFill"
              @click="previewAvatar"
            ></image>
            
            <view class="user-details">
              <view class="nickname-row">
                <text class="nickname">{{ userBase.nickname }}</text>
                
                <view class="verified-badge-inline" v-if="userBase.is_verified === 1">
                  <text class="verified-text">已认证</text>
                </view>
                
                <view 
                  class="verification-badge-inline" 
                  v-if="userBase.is_verified !== 1"
                  @click="gotoVerification"
                >
                  <text class="verification-icon">{{ verificationIcon }}</text>
                  <text class="verification-text">{{ verificationText }}</text>
                </view>
              </view>
              
              <view class="gender-row" v-if="userBase.user_sex">
                <text class="gender-text">{{ userBase.user_sex }}</text>
              </view>
              
              <view class="major-message-row">
                <view class="major-info" v-if="userBase.major">
                  <text class="major-text">{{ userBase.major }}</text>
                </view>
              </view>
            </view>
          </view>
          
          <view class="header-actions">
            <view class="menu-btn" @click="openDrawer">
              <uni-icons type="bars" size="20" color="#666"></uni-icons>
            </view>
          </view>
        </view>

        <view class="stats-section">
          <view class="stats-left">
            <view class="stat-item" @click="gotoFollow">
              <text class="stat-num">{{ (userBase.following_ids || []).length }}</text>
              <text class="stat-label">关注</text>
            </view>
            
            <view class="stat-divider"></view>
            
            <view class="stat-item" @click="gotoFollower">
              <text class="stat-num">{{ (userBase.followers_ids || []).length }}</text>
              <text class="stat-label">粉丝</text>
            </view>
          </view>
          
          <view class="stats-right">
            <button class="message-btn-inline" @click="gotoMessage()">
              <image 
                class="message-icon" 
                src="/static/icons/message.png" 
                mode="aspectFit"
              ></image>
              <text class="btn-text">消息</text>
              <view class="message-badge" v-if="unreadCount > 0">
                <text class="badge-text">{{ unreadCount > 99 ? '99+' : unreadCount }}</text>
              </view>
            </button>
            
            <button class="edit-profile-btn-inline" @click="gotoEditProfile">
              <text class="btn-text">编辑资料</text>
            </button>
          </view>
        </view>
        
        <view class="combined-tabs tabs-sticky">
          <view class="main-tabs-left">
            <view 
              class="main-tab-item"
              :class="{ active: activeMainTab === 0 }"
              @click="switchMainTab(0)"
            >
              <text class="tab-text">动态</text>
              <text class="tab-badge">{{ count }}</text>
              <view class="tab-indicator" v-if="activeMainTab === 0"></view>
            </view>
            
            <view 
              class="main-tab-item"
              :class="{ active: activeMainTab === 1 }"
              @click="switchMainTab(1)"
            >
              <text class="tab-text">赞/收藏</text>
              <text class="tab-badge">{{ commentcount }}</text>
              <view class="tab-indicator" v-if="activeMainTab === 1"></view>
            </view>
            
            <view 
              class="main-tab-item"
              :class="{ active: activeMainTab === 2 }"
              @click="switchMainTab(2)"
            >
              <text class="tab-text" v-if="activeSubTab === 0">私密</text>
              <text class="tab-badge" v-if="activeSubTab === 0">{{ privatecount }}</text>
              <view class="tab-indicator" v-if="activeMainTab === 2"></view>
            </view>
          </view>
		  
		  
          <view class="tabs-right">
              <view 
                class="sub-tab-toggle" 
                v-if="activeMainTab !== 2"
                @click="switchSubTab(activeSubTab === 0 ? 1 : 0)"
              >
                <text class="toggle-text">{{ activeSubTab === 0 ? '树洞' : '二手' }}</text>
                <text class="switch-icon">⇄</text>
              </view>
              
              <view class="search-btn" @click="gotoSearch">
                <image src="https://wait00.oss-cn-shanghai.aliyuncs.com/label/search.png" class="search-icon-img" mode="aspectFit"></image>
              </view>
            </view>
        </view>
        
        <view class="content-container">
          <view v-if="activeMainTab === 0 && activeSubTab === 0">
            <view class="timeline-container">
              <view 
                class="timeline-post-item" 
                v-for="(post, index) in postList" 
                :key="post.id"
                @click="gotoPostDetail(post)"
              >
                <view class="timeline-date">
                  <template v-if="index === 0 || post.fullDateStr !== postList[index - 1].fullDateStr">
                    <text class="date-day">{{ post.timeDay }}</text>
                    <text class="date-month">{{ post.timeMonth }}</text>
                  </template>
                </view>
                
                <view class="timeline-content">
                  <view class="post-content" v-if="post.content">
                    <text class="content-text-timeline">{{ post.content }}</text>
                  </view>
                  
                  <view class="post-images" v-if="post.images && post.images.length > 0">
                    <image 
                      v-for="(img, idx) in post.images.slice(0, 3)" 
                      :key="idx"
                      class="post-image"
                      :src="img"
                      mode="aspectFill"
                    ></image>
                    <view class="more-images" v-if="post.images.length > 3">
                      <text>+{{ post.images.length - 3 }}</text>
                    </view>
                  </view>
                  </view>
              </view>
            </view>
            
            <view class="empty-state" v-if="postList.length === 0 && !loading">
              <text class="empty-icon">📝</text>
              <text class="empty-text">暂无树洞帖子</text>
            </view>
          </view>
          
          <view v-if="activeMainTab === 1 && activeSubTab === 0">
            <view 
              class="post-item" 
              v-for="post in commentPostList" 
              :key="post.id"
              
            >
			<view class="post-content-row" @click="gotoPostDetail(post)">
			      <view class="post-content">
			        <text class="content-text">{{ post.content }}</text>
			      </view>
			      <view class="post-time-wrapper">
			        <text class="post-time">{{ post.timeText }}</text>
			      </view>
			    </view>
              
              <view class="post-images" v-if="post.images && post.images.length > 0" @click="gotoPostDetail(post)">
                <image 
                  v-for="(img, idx) in post.images.slice(0, 3)" 
                  :key="idx"
                  class="post-image"
                  :src="img"
                  mode="widthFix"
                ></image>
                <view class="more-images" v-if="post.images.length > 3">
                  <text>+{{ post.images.length - 3 }}</text>
                </view>
              </view>
              
              <view class="post-footer">
                <text class="view-count">{{ post.view_count}} 浏览</text>
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
            
            <view class="empty-state" v-if="commentPostList.length === 0 && !loading">
              <text class="empty-icon">📝</text>
              <text class="empty-text">暂无评论记录</text>
            </view>
          </view>
          
          <view v-if="activeMainTab === 0 && activeSubTab === 1">
            <view class="waterfall">
              <view class="col">
                <view v-for="(item, i) in leftColumn" :key="i" @click="gotoGoodsDetail(item)">
                  <my-goods v-if="item" :goods="item" />
                </view>
              </view>
              <view class="col">
                <view v-for="(item, i) in rightColumn" :key="i" @click="gotoGoodsDetail(item)">
                  <my-goods v-if="item" :goods="item" />
                </view>
              </view>
            </view>
            
            <view class="empty-state" v-if="goodsList.length === 0 && !loading">
              <text class="empty-icon">📦</text>
              <text class="empty-text">暂无二手商品</text>
            </view>
          </view>
          
          <view v-if="activeMainTab === 1 && activeSubTab === 1">
            <view class="waterfall">
              <view class="col">
                <view v-for="(item, i) in leftColumn1" :key="i" @click="gotoGoodsDetail(item)">
                  <my-goods v-if="item" :goods="item" />
                </view>
              </view>
              <view class="col">
                <view v-for="(item, i) in rightColumn1" :key="i" @click="gotoGoodsDetail(item)">
                  <my-goods v-if="item" :goods="item" />
                </view>
              </view>
            </view>
            
            <view class="empty-state" v-if="commentGoodsList.length === 0 && !loading">
              <text class="empty-icon">📦</text>
              <text class="empty-text">暂无评论记录</text>
            </view>
          </view>
          
          <view v-if="activeMainTab === 2">
            <view 
              class="post-item" 
              v-for="post in privatePostList" 
              :key="post.id"
             
            >
			
			<view class="post-content-row" @click="gotoPostDetail(post)">
			      <view class="post-content">
			        <text class="content-text">{{ post.content }}</text>
			      </view>
			      <view class="post-time-wrapper">
			        <text class="post-time">{{ post.timeText }}</text>
			      </view>
			    </view>
              
              <view class="post-images" v-if="post.images && post.images.length > 0"  @click="gotoPostDetail(post)">
                <image 
                  v-for="(img, idx) in post.images.slice(0, 3)" 
                  :key="idx"
                  class="post-image"
                  :src="img"
                  mode="aspectFill"
                ></image>
                <view class="more-images" v-if="post.images.length > 3">
                  <text>+{{ post.images.length - 3 }}</text>
                </view>
              </view>
              
              <view class="post-footer" @click.stop="toggleLike(post)">
                <text class="view-count">{{ post.view_count }} 浏览</text>
                <view class="footer-right">
                  <view class="action-item">
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
            
            <view class="empty-state" v-if="privatePostList.length === 0 && !loading">
              <text class="empty-icon">🔒</text>
              <text class="empty-text">暂无私密帖子</text>
            </view>
          </view>
          
          <view class="load-more" v-if="loading">
            <text class="load-text">加载中...</text>
          </view>
          <view class="no-more" v-if="!hasMore && dataList.length > 0">
            <text class="no-more-text">没有更多了</text>
          </view>
        </view>
      </view>
  </view>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
export default {
	name: "my-userinfo",
	data() {
		return {
			myPostsCount: 0,
			myCommentsCount: 0,
			secondhandUnread: 0,
			momentUnread: 0,
			showDrawer: false,
			drawerTab: 0,
			
			 // 🔥 修改：主选项卡改为 3 个
			        // 主选项卡: 0-动态, 1-评论, 2-私密
			        activeMainTab: 0,
			        // 子选项卡: 0-树洞, 1-二手
			        activeSubTab: 0,
			
			// 数据列表
			postList: [],           // 树洞帖子
			goodsList: [],          // 二手商品
			commentPostList: [],    // 评论的树洞帖子
			commentGoodsList: [],   // 评论的二手商品
			privatePostList: [],    // 🔥 新增：私密的树洞帖子
			
			// 为每个列表维护独立的分页状态
			postPage: 1,
			postPageSize: 10,
			postHasMore: true,
			
			goodsPage: 1,
			goodsPageSize: 10,
			goodsHasMore: true,
			
			commentPostPage: 1,
			commentPostPageSize: 10,
			commentPostHasMore: true,
			
			commentGoodsPage: 1,
			commentGoodsPageSize: 10,
			commentGoodsHasMore: true,
			
			 // 🔥 新增：私密列表的分页状态
			privatePostPage: 1,
			privatePostPageSize: 10,
			privatePostHasMore: true,
			
			loading: false,
			
			// 统计数据
			followingCount: 0,
			followersCount: 0,
			
			uploading: false,
			editForm: {
				nickname: '',
				avatarUrl: '',
				user_sex: '',
				major: '',
				user_introduce: '',
			},
			postcount: 0,
			postcommentcount: 0,
			goodscount: 0,
			goodscommentcount: 0,
			privatepostcount: 0,      // 🔥 新增：私密帖子数量
			count: 0,
			commentcount: 0,
			myLikeCount: 0,
			privatecount: 0,          // 🔥 新增：私密总数
			// 🔥 新增：图标 URL
			iconLikeUrl: 'https://img.xinshi00.com/label/like.png',
			iconLikedUrl: 'https://img.xinshi00.com/label/liked.png',
			iconCommentUrl: 'https://img.xinshi00.com/label/chat.png',
				
		};
	},
	computed: {
		...mapState('m_user', ['token', 'code', 'userBase', 'openid']),
		
		 // 🔥 新增：未读消息数
		  unreadCount() {
		    return this.userBase?.total_unread || 0;
		  },
		  
		hasMore() {
		        if (this.activeMainTab === 0) {
		            return this.activeSubTab === 0 ? this.postHasMore : this.goodsHasMore
		        } else if (this.activeMainTab === 1){
		            return this.activeSubTab === 0 ? this.commentPostHasMore : this.commentGoodsHasMore
		        } else {
					// 🔥 新增：私密选项卡的 hasMore（只有树洞）
					return this.privatePostHasMore
				}
		    },
			
		userIntro() {
			return this.userBase.user_introduce || '这个人很懒，什么都没留下'
		},
		
		leftColumn() {
			return this.goodsList.filter((_, i) => i % 2 === 0)
		},
		
		rightColumn() {
			return this.goodsList.filter((_, i) => i % 2 === 1)
		},
		
		leftColumn1() {
			return this.commentGoodsList.filter((_, i) => i % 2 === 0)
		},
		
		rightColumn1() {
			return this.commentGoodsList.filter((_, i) => i % 2 === 1)
		},
		
		dataList() {
			if (this.activeMainTab === 0) {
			            return this.activeSubTab === 0 ? this.postList : this.goodsList
			        } else if (this.activeMainTab === 1) {
			            return this.activeSubTab === 0 ? this.commentPostList : this.commentGoodsList
			        } else {
			            // 🔥 新增：私密列表（只有树洞）
			            return this.privatePostList
			        }
		},
		
		verificationIcon() {
			const iconMap = {
				0: '🎓',
				2: '⏳',
				3: '❌'
			}
			return iconMap[this.userBase.is_verified] || '🎓'
		},
		
		verificationText() {
			const textMap = {
				0: '校园认证',
				2: '审核中',
				3: '认证失败'
			}
			return textMap[this.userBase.is_verified] || '校园认证'
		}
	},
	
	  // ✅ 修改：每次进入页面都重新加载
	   async onShow() {
	     if (this.token) {
	       const queryObj = {code: this.openid};
	       const { data: res } = await uni.$http.get('/users/userinfo', queryObj);
	       if (res.meta.status === 200) {
	         console.log(res.message)
	         this.updateUserBase(res.message)
	       }
	     }
	     uni.$emit('updateUnreadCount', this.userBase.total_unread || 0)
	     
	     console.log("🔄 页面显示，重新加载数据")
	     
	     // 🔥 关键修改：每次进入页面都重置当前选项卡的数据
	     this.resetCurrentTabData()
	     
	     await this.loadUserInfo()
	     await this.loadData()
	     await this.loadCount()
	   },
	
	 // ✅ 下拉刷新方法
	  async onPullDownRefresh() {
	    console.log('🔄 下拉刷新触发')
	    
	    try {
	      await this.loadUserInfo()
	      await this.refreshCurrentList()
	      await this.loadCount()
	      
	    
	    } catch (error) {
	      console.error('刷新失败:', error)
	      uni.showToast({
	        title: '刷新失败',
	        icon: 'none'
	      })
	    } finally {
	      uni.stopPullDownRefresh()
	    }
	  },
	  
	   // ✅ 修改：使用页面的 onReachBottom 代替 scrolltolower
	    onReachBottom() {
	      console.log('📌 触发上拉加载')
	      this.loadMore()
	    },
		
	methods: {
		...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase', 'updateCode', 'updateOpenid']),
		
		// 🔥 新增：跳转到搜索页面
		  gotoSearch() {
		    uni.navigateTo({
		      url: '/subpkg/my-search/my-search'
		    })
		  },
		  
		 // 🔥 新增：重置当前选项卡的数据
		    resetCurrentTabData() {
		      console.log(`🗑️ 重置数据 - 主选项卡: ${this.activeMainTab}, 子选项卡: ${this.activeSubTab}`)
		      
		      if (this.activeMainTab === 0) {
		        // 动态选项卡
		        if (this.activeSubTab === 0) {
		          // 树洞帖子
		          this.postList = []
		          this.postPage = 1
		          this.postHasMore = true
		        } else {
		          // 二手商品
		          this.goodsList = []
		          this.goodsPage = 1
		          this.goodsHasMore = true
		        }
		      } else if (this.activeMainTab === 1) {
		        // 评论选项卡
		        if (this.activeSubTab === 0) {
		          // 评论的树洞
		          this.commentPostList = []
		          this.commentPostPage = 1
		          this.commentPostHasMore = true
		        } else {
		          // 评论的二手
		          this.commentGoodsList = []
		          this.commentGoodsPage = 1
		          this.commentGoodsHasMore = true
		        }
		      } else {
		        // 私密选项卡
		        this.privatePostList = []
		        this.privatePostPage = 1
		        this.privatePostHasMore = true
		      }
		    },
			
		// ✅ 点赞/取消点赞
		async toggleLike(post) {
			try {
				if (!this.openid) {
					uni.switchTab({ url: '/pages/my/my' })
					return
				}
				
				const { data: res } = await uni.$http.post('/posts/like', {
					post_id: post.id,
					openid: this.openid,
					is_like: !post.isLiked
				})
				
				if (res.meta.status === 200) {
				
					const index = this.dataList.findIndex(p => p.id === post.id)
					if (index !== -1) {
						this.dataList[index].isLiked = !this.dataList[index].isLiked
						this.dataList[index].like_count = res.message.like_count || 0
						this.$set(this.dataList, index, {...this.dataList[index]})
					}
				}
			} catch (error) {
				console.error('点赞失败:', error)
				this.showMessageToast('操作失败')
			}
		},
		
		// 🔥 新增：更新帖子点赞状态的方法
		 updatePostLikeStatus(data) {
		   const { postId, isLiked, likeCount } = data
		   
		   console.log('📥 收到点赞状态更新:', data)
		   
		   // 在 postList 中查找对应的帖子
		   const index = this.dataList.findIndex(post => post.id === postId)
		   console.log("imhere");
						console.log(index)
		   if (index !== -1) {
		     // 更新帖子的点赞状态
		     this.dataList[index].isLiked = isLiked
		     this.dataList[index].like_count = likeCount
		     
		     // 强制更新视图
		     this.$set(this.dataList, index, { ...this.dataList[index] })
		     
		     console.log(`✅ 已更新帖子 ${postId} 的点赞状态:`, {
		       isLiked,
		       likeCount
		     })
		   } else {
		     console.warn(`⚠️ 未找到帖子 ${postId}`)
		   }
		 },
		 
		// ✅ 刷新当前列表的方法
		    async refreshCurrentList() {
		      if (this.activeMainTab === 0) {
		        if (this.activeSubTab === 0) {
		          this.postList = []
		          this.postPage = 1
		          this.postHasMore = true
		          await this.loadMyPosts()
		        } else {
		          this.goodsList = []
		          this.goodsPage = 1
		          this.goodsHasMore = true
		          await this.loadMyGoods()
		        }
		      } else if (this.activeMainTab === 1) {
		        if (this.activeSubTab === 0) {
		          this.commentPostList = []
		          this.commentPostPage = 1
		          this.commentPostHasMore = true
		          await this.loadMyPostComments()
		        } else {
		          this.commentGoodsList = []
		          this.commentGoodsPage = 1
		          this.commentGoodsHasMore = true
		          await this.loadMyGoodsComments()
		        }
		      } else {
		        this.privatePostList = []
		        this.privatePostPage = 1
		        this.privatePostHasMore = true
		        await this.loadMyPrivatePosts()
		      }
		    },
				
		// 🔥 新增：跳转到消息页面
		gotoMessage() {
		    uni.navigateTo({
		        url: '/pages/message/message'
		    })
		},
		
		// ✅ 新增：预览头像并显示更换选项
			previewAvatar() {
				const avatarUrl = this.userBase.avatarUrl || '/static/default-avatar.png'
				
				uni.previewImage({
					urls: [avatarUrl],
					current: avatarUrl,
					success: () => {
						// 预览成功后，延迟显示更换选项
						setTimeout(() => {
							this.showChangeAvatarOption()
						}, 500)
					}
				})
			},
				
		async loadCount() {
		    const { data: res } = await uni.$http.get('/posts/my-count', {
		        openid: this.openid,
		    })
		    if (res.meta.status === 200) {
		        this.postcount = res.message.total
		    }
		    
		    const { data: res1 } = await uni.$http.get('/posts/my-like-count', {
		        openid: this.openid,
		    })
		    if (res1.meta.status === 200) {
		        this.postcommentcount = res1.message.liked_posts_count
		    }
		    
		    const { data: res3 } = await uni.$http.get('/goods/count', {
		        goods_id: this.userBase.goods_id,
		    })
		    if (res3.meta.status === 200) {
		        this.goodscount = res3.message.count
		    }
		    
		    // ✅ 修复：添加安全检查
		    this.goodscommentcount = (this.userBase.goods_collects && Array.isArray(this.userBase.goods_collects)) 
		        ? this.userBase.goods_collects.length 
		        : 0
		    
		    const { data: res4 } = await uni.$http.get('/posts/my-private-count', {
		        openid: this.openid,
		    })
		    if (res4.meta.status === 200) {
		        this.privatepostcount = res4.message.total
		    }
		    
		    this.count = this.activeSubTab === 0 ? this.postcount : this.goodscount
		    this.commentcount = this.activeSubTab === 0 ? this.postcommentcount : this.goodscommentcount
		    this.privatecount = this.privatepostcount
		},
		
		 // ✅ 修改：跳转到编辑页面
		    gotoEditProfile() {
		      uni.navigateTo({
		        url: '/subpkg/edit/edit'
		      })
		    },
			
		// 【新增方法】自动添加当前用户为微信分账接收方
		// async autoAddProfitSharingReceiver(userInfo) {
		// 	try {
		// 		// 1. 检查是否已经添加为分账接收方
		// 		const checkData = {
		// 			openid: this.openid
		// 		};
		// 		const { data: checkRes } = await uni.$http.post('/profitsharing/check-receiver', checkData);
				
		// 		// 2. 如果未添加,则调用添加接收方接口
		// 		if (checkRes.meta.status === 200 && !checkRes.message.exists) {
		// 			const receiverData = {
		// 				openid: this.openid,
		// 				account: this.openid, // 微信分账接收方账号(一般是openid)
		// 				type: 'PERSONAL_OPENID', // 分账接收方类型
		// 				name: userInfo.nickname || '默认昵称',
		// 				relation_type: 'USER' // 与分账方的关系类型
		// 			};
					
		// 			const { data: addRes } = await uni.$http.post('/profitsharing/add-receiver', receiverData);
					
		// 			if (addRes.meta.status === 200) {
		// 				console.log('✅ 自动添加微信分账接收方成功');
		// 				// 可选: 显示成功提示
		// 				// uni.showToast({
		// 				// 	title: '已开通分账功能',
		// 				// 	icon: 'success',
		// 				// 	duration: 2000
		// 				// });
		// 			} else {
		// 				console.warn('⚠️ 自动添加微信分账接收方失败:', addRes.meta.msg);
		// 			}
		// 		} else if (checkRes.message.exists) {
		// 			console.log('ℹ️ 用户已是微信分账接收方,跳过添加');
		// 		}
		// 	} catch (error) {
		// 		console.error('❌ 自动添加微信分账接收方异常:', error);
		// 		// 不影响主流程,仅记录错误
		// 	}
		// },
		
		openDrawer() {
			this.showDrawer = true
		},
		
		closeDrawer() {
			this.showDrawer = false
		},
		
		switchDrawerTab(index) {
			this.drawerTab = index
		},
		
		handleMenuClick(type) {
			this.closeDrawer()
			
			const actions = {
				'myPosts': () => this.gotoMyPosts(),
				'mydeletedPosts': () => this.gotoMyDeletedPosts(),
				'myComments': () => this.gotoMyComments(),
				'myLike': () => this.gotoMyLike(),
				'momentMessages': () => this.gotoMessages('moment'),
				'published': () => this.gotoPublished(),
				'bought': () => this.gotoBought(),
				'sold': () => this.gotoSold(),
				'collect': () => this.gotoCollect(),
				'history': () => this.gotoHistory(),
				'comment': () => this.gotoComment(),
				'secondhandMessages': () => this.gotoMessages('secondhand'),
				'editProfile': () => this.gotoEditProfile(), // 🔥 新增 (Request 2)
				'logout': () => this.logout()
			}
			
			if (actions[type]) {
				actions[type]()
			}
		},
		
		switchMainTab(index) {
		    if (this.activeMainTab === index) return
		    
		    this.activeMainTab = index
		    
		    // 🔥 修改：增加私密选项卡的判断
		    const needLoad = this.activeMainTab === 0
		        ? (this.activeSubTab === 0 ? this.postList.length === 0 : this.goodsList.length === 0)
		        : this.activeMainTab === 1
		        ? (this.activeSubTab === 0 ? this.commentPostList.length === 0 : this.commentGoodsList.length === 0)
		        : this.privatePostList.length === 0  // 私密只判断树洞帖子
		    
		    if (needLoad) {
		        this.loadData()
		    }
		},
		
		switchSubTab(index) {
		    this.count = index === 0 ? this.postcount : this.goodscount;
		    this.commentcount = index === 0 ? this.postcommentcount : this.goodscommentcount;
		    
		    if (this.activeSubTab === index) return
		    
		    this.activeSubTab = index
		    
		    // 🔥 修改：增加私密选项卡的判断（私密不需要切换，因为没有二手）
		    const needLoad = this.activeMainTab === 0
		        ? (this.activeSubTab === 0 ? this.postList.length === 0 : this.goodsList.length === 0)
		        : this.activeMainTab === 1
		        ? (this.activeSubTab === 0 ? this.commentPostList.length === 0 : this.commentGoodsList.length === 0)
		        : false  // 私密不需要切换子选项卡
		    
		    if (needLoad) {
		        this.loadData()
		    }
		},
		
		// 重置数据和分页状态
		resetData() {
		    if (this.activeMainTab === 0) {
		        if (this.activeSubTab === 0) {
		            this.postList = []
		            this.postPage = 1
		            this.postHasMore = true
		        } else {
		            this.goodsList = []
		            this.goodsPage = 1
		            this.goodsHasMore = true
		        }
		    } else if (this.activeMainTab === 1) {
		        if (this.activeSubTab === 0) {
		            this.commentPostList = []
		            this.commentPostPage = 1
		            this.commentPostHasMore = true
		        } else {
		            this.commentGoodsList = []
		            this.commentGoodsPage = 1
		            this.commentGoodsHasMore = true
		        }
		    } else {
		        // 🔥 新增：重置私密列表
		        this.privatePostList = []
		        this.privatePostPage = 1
		        this.privatePostHasMore = true
		    }
		},
		
		async loadData() {
		    if (this.loading) return
		    
		    // let hasMore = false
		    // if (this.activeMainTab === 0) {
		    //     hasMore = this.activeSubTab === 0 ? this.postHasMore : this.goodsHasMore
		    // } else if (this.activeMainTab === 1) {
		    //     hasMore = this.activeSubTab === 0 ? this.commentPostHasMore : this.commentGoodsHasMore
		    // } else {
		    //     // 🔥 新增：私密选项卡
		    //     hasMore = this.privatePostHasMore
		    // }
		    
		    // if (!hasMore) {
		    //     console.log('没有更多数据了')
		    //     return
		    // }
		    
		    this.loading = true
		    
		    try {
		        if (this.activeMainTab === 0) {
		            if (this.activeSubTab === 0) {
		                await this.loadMyPosts()
		            } else {
		                await this.loadMyGoods()
		            }
		        } else if (this.activeMainTab === 1) {
		            if (this.activeSubTab === 0) {
		                await this.loadMyPostComments()
		            } else {
		                await this.loadMyGoodsComments()
		            }
		        } else {
		            // 🔥 新增：加载私密数据
		            await this.loadMyPrivatePosts()
		        }
		    } catch (error) {
		        console.error('加载数据失败:', error)
		        
		    } finally {
		        this.loading = false
		    }
		},
		
		// 🔥 新增：加载私密的树洞帖子
		async loadMyPrivatePosts() {
		    console.log('加载私密树洞帖子，当前页:', this.privatePostPage)
		    
		    const { data: res } = await uni.$http.get('/users/private-posts', {
		        user_openid: this.userBase.openid,
				viewer_openid: this.userBase.openid,
		        type: 0, // 0-树洞
		        page: this.privatePostPage,
		        pageSize: this.privatePostPageSize
		    })
		    
		    if (res.meta.status === 200) {
		        const newPosts = res.message.list.map(post => ({
		            ...post,
		            images: this.processImages(post.images),
					timeText: this.formatTime(post.created_at),
		        }))
		        
		        console.log(`加载了 ${newPosts.length} 条私密帖子`)
		        
		        this.privatePostList = [...this.privatePostList, ...newPosts]
		        this.privatePostHasMore = res.message.hasMore
		        
		        if (this.privatePostHasMore) {
		            this.privatePostPage++
		        }
		    }
		},
		
		
		// 加载我发布的帖子
		async loadMyPosts() {
			console.log('加载树洞帖子，当前页:', this.postPage)
			
			const { data: res } = await uni.$http.get('/users/posts', {
				user_openid: this.userBase.openid,
				viewer_openid: this.userBase.openid || '',
				type: 0,
				page: this.postPage,
				pageSize: this.postPageSize
			})
			
			if (res.meta.status === 200) {
				// 🔥 修改：适配朋友圈UI (Request 3 & 4)
				const newPosts = res.message.list.map(post => {
				    const date = new Date(post.created_at);
				    const day = date.getDate() || '??';
				    const month = (date.getMonth() + 1);
				    return {
				        ...post,
				        images: this.processImages(post.images),
				        isLiked: post.isLiked || false,
				        timeDay: day,
				        timeMonth: month + '月',
				        fullDateStr: `${month}月${day}日` // 🔥 新增：用于日期比较
				    };
				})
				
				console.log(`加载了 ${newPosts.length} 条帖子`)
				
				// 追加新数据
				this.postList = [...this.postList, ...newPosts]
				
				// 更新分页状态
				this.postHasMore = res.message.hasMore
				
				if (this.postHasMore) {
					this.postPage++
				}
				
				console.log('是否还有更多:', this.postHasMore, '下一页:', this.postPage)
			}
		},
		
		// 加载我发布的商品
		async loadMyGoods() {
			const ids = Array.isArray(this.userBase?.goods_id) ? this.userBase.goods_id : []
			if (ids.length === 0) {
				this.goodsList = []
				this.goodsHasMore = false
				return
			}
			
			// 计算当前页的商品ID
			const startIndex = (this.goodsPage - 1) * this.goodsPageSize
			const endIndex = startIndex + this.goodsPageSize
			const pageIds = ids.slice(startIndex, endIndex)
			console.log(pageIds)
			if (pageIds.length === 0) {
				this.goodsHasMore = false
				return
			}
			
			const { data: res } = await uni.$http.get('/goods/publishsearch', {
				goods_id: pageIds
			})
			
			if (res?.meta?.status === 200 && Array.isArray(res?.message)) {
				// 追加新数据
				this.goodsList = [...this.goodsList, ...res.message]
				
				// 判断是否还有更多数据
				this.goodsHasMore = endIndex < ids.length
				if (this.goodsHasMore) {
					this.goodsPage++
				}
			}
		},
		
		// 加载我点赞过的帖子
		async loadMyPostComments() {
			const { data: res } = await uni.$http.get('/posts/my-like', {
				openid: this.userBase.openid,
				page: 1,
				pageSize: 10
			})
			
			if (res.meta.status === 200) {
				const newPosts = res.message.list.map(post => ({
					...post,
					images: this.processImages(post.images),
					timeText: this.formatTime(post.created_at),
				}))
				
				// 追加新数据
				this.commentPostList = [...this.commentPostList, ...newPosts]
				
				// 更新分页状态
				this.commentPostHasMore = res.message.hasMore
				if (this.commentPostHasMore) {
					this.commentPostPage++
				}
			}
		},
		
		// 加载我评论过的商品
		async loadMyGoodsComments() {
			// 如果是第一页，先获取所有评论过的商品ID
			if (this.commentGoodsPage === 1) {
				const { data: res } = await uni.$http.get('/users/comment', {
					code: this.openid
				})
				
				if (res.meta.status !== 200 || !res.data) {
					this.commentGoodsHasMore = false
					return
				}
				
				this.commentGoodsIds = Array.isArray(res.data) ? res.data : []
			}
			
			if (!this.commentGoodsIds || this.commentGoodsIds.length === 0) {
				this.commentGoodsHasMore = false
				return
			}
			
			const ids = Array.isArray(this.userBase?.goods_collects) ? this.userBase.goods_collects : []
			
			// 分页加载
			const startIndex = (this.commentGoodsPage - 1) * this.commentGoodsPageSize
			const endIndex = startIndex + this.commentGoodsPageSize
			const pageIds = ids.slice(startIndex, endIndex)
			
			if (pageIds.length === 0) {
				this.commentGoodsHasMore = false
				return
			}
			
			// const { data: commentList } = await uni.$http.get('/users/collect', {
			// 	code: this.openid
			// })
			
			const queryObj = {goods_id: pageIds}
			
			const { data: commentData } = await uni.$http.get('/goods/historysearch', queryObj);
			
			if (commentData.meta.status === 200 && Array.isArray(commentData.message)) {
				// 追加新数据
				this.commentGoodsList = [...this.commentGoodsList, ...commentData.message]
				
				// 更新分页状态
				this.commentGoodsHasMore = endIndex < this.commentGoodsIds.length
				if (this.commentGoodsHasMore) {
					this.commentGoodsPage++
				}
			}
		},
		
		loadMore() {
		    console.log('触发上拉加载')
		    if (this.loading) {
		        console.log('正在加载中，跳过')
		        return
		    }
		    
		    // 🔥 修改：增加私密选项卡的判断
		    let hasMore = false
		    if (this.activeMainTab === 0) {
		        hasMore = this.activeSubTab === 0 ? this.postHasMore : this.goodsHasMore
		    } else if (this.activeMainTab === 1) {
		        hasMore = this.activeSubTab === 0 ? this.commentPostHasMore : this.commentGoodsHasMore
		    } else {
		        hasMore = this.privatePostHasMore
		    }
		    
		    console.log('是否有更多数据:', hasMore)
		    
		    if (hasMore) {
		        this.loadData()
		    }
		},
		
		processImages(images) {
			if (!images) return []
			
			if (typeof images === 'string') {
				try {
					return JSON.parse(images)
				} catch (e) {
					return []
				}
			}
			
			return Array.isArray(images) ? images : []
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
		
		async loadUserInfo() {
			try {
				const { data: res } = await uni.$http.get('/users/userinfo', {
					code: this.openid
				})
				
				if (res.meta.status === 200) {
					this.updateUserBase(res.message)
					this.followingCount = res.message.following_ids?.length || 0
					this.followersCount = res.message.followers_ids?.length || 0
					this.secondhandUnread = res.message.secondhand_unread || 0
					this.momentUnread = res.message.moment_unread || 0
				}
			} catch (error) {
				console.error('加载用户信息失败:', error)
			}
		},
		
		// ... 其他方法保持不变 ...
		async logout() {
			const [err, succ] = await uni.showModal({
				title: '提示',
				content: '确认退出登录吗？'
			}).catch(err => err)
		
			if (succ && succ.confirm) {
				this.updateUserInfo({})
				this.updateToken('')
				this.updateOpenid('')
				this.updateUserBase({})
				uni.showToast({
					title: '已退出登录',
					icon: 'success'
				})
			}
		},
		
		gotoProfile() {
			uni.navigateTo({
				url: '/subpkg/profile/profile'
			})
		},
		
		gotoVerification() {
			if (this.userBase.is_verified === 1) {
				uni.showToast({
					title: '您已完成校园认证',
					icon: 'success'
				})
				return
			}
			
			uni.navigateTo({
				url: '/subpkg/verification/verification'
			})
		},
		
		gotoFollow() {
			uni.navigateTo({
				url: '/subpkg/follow/follow'
			})
		},
		
		gotoFollower() {
			uni.navigateTo({
				url: '/subpkg/follower/follower'
			})
		},
		
		gotoPublished() {
			uni.navigateTo({
				url: '/subpkg/publish/publish'
			})
		},
		
		gotoBought() {
			uni.navigateTo({
				url: '/subpkg/orders/orders?type=bought'
			})
		},
		
		gotoSold() {
			uni.navigateTo({
				url: '/subpkg/orders/orders?type=sold'
			})
		},
		
		gotoCollect() {
			uni.navigateTo({
				url: '/subpkg/collect/collect'
			})
		},
		
		gotoHistory() {
			uni.navigateTo({
				url: '/subpkg/history/history'
			})
		},
		
		gotoComment() {
			uni.navigateTo({
				url: '/subpkg/comment/comment'
			})
		},
		
		gotoMyLike() {
			uni.navigateTo({
				url: '/subpkg/like/like'
			})
		},
		
		gotoMyPosts() {
			uni.navigateTo({
				url: '/subpkg/my-posts/my-posts'
			})
		},
		
		gotoMyDeletedPosts() {
			uni.navigateTo({
				url: '/subpkg/my-deleted-posts/my-deleted-posts'
			})
		},
		
		gotoMyComments() {
			uni.navigateTo({
				url: '/subpkg/my-post-comments/my-post-comments'
			})
		},
		
		gotoMessages(type) {
			uni.navigateTo({
				url: '/pages/message/message'
			})
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
		
		async gotoGoodsDetail(goods) {
			try {
				await uni.$http.post('/goods/view', {
					goods_id: goods.goods_id,
					user_openid: this.openid || null
				})
			} catch (error) {
				console.error('增加浏览次数失败:', error)
			}
			
			uni.navigateTo({
				url: `/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`
			})
		},
		
		openEditProfile() {
			this.initEditForm()
			this.$refs.editProfilePopup.open()
		},
		
		closeEditProfile() {
			this.$refs.editProfilePopup.close()
		},
		
		initEditForm() {
			this.editForm = {
				nickname: this.userBase.nickname || '',
				avatarUrl: this.userBase.avatarUrl || '',
				user_sex: this.userBase.user_sex || '',
				major: this.userBase.major || '',
				user_introduce: this.userBase.user_introduce || ''
			}
		},
		
		async saveProfile() {
			if (!this.editForm.nickname.trim()) {
				return uni.showToast({ title: '昵称不能为空', icon: 'none' })
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
					this.updateUserBase({
						...this.userBase,
						nickname: this.editForm.nickname.trim(),
						avatarUrl: this.editForm.avatarUrl,
						user_sex: this.editForm.user_sex,
						major: this.editForm.major.trim(),
						user_introduce: this.editForm.user_introduce.trim()
					})

					uni.showToast({ title: '保存成功', icon: 'success' })
					this.closeEditProfile()
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
		
		async changeAvatar() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: async (res) => {
					const tempFilePath = res.tempFilePaths[0]
					console.log(tempFilePath)
					const uploadedUrls = await this.uploadImages([tempFilePath])
					console.log(uploadedUrls)
					if (uploadedUrls && uploadedUrls.length > 0) {
						this.editForm.avatarUrl = uploadedUrls[0]
						uni.showToast({ title: '头像已更新，请点击保存', icon: 'none' })
					}
				},
				fail: (err) => {
					console.error('选择图片失败:', err)
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

			const imageUrls = []

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
					duration: 3000
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
.my-userinfo-container {
	min-height: 100vh;
	background-color: #f5f5f5;
}

/* ✅ 抽屉样式 - 修改为从右侧弹出 */
.drawer-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 998;
	opacity: 0;
	visibility: hidden;
	transition: all 0.3s;
	
	&.show {
		opacity: 1;
		visibility: visible;
	}
}

.drawer-container {
	position: fixed;
	top: 0;
	right: -280px; /* ✅ 从右侧开始 */
	width: 280px;
	height: 100%;
	background-color: #fff;
	z-index: 999;
	transition: all 0.3s;
	display: flex;
	flex-direction: column;
	
	&.show {
		right: 0; /* ✅ 滑入到右侧 */
	}
}

.drawer-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	border-bottom: 1px solid #eee;
	
	.drawer-title {
		font-size: 18px;
		font-weight: 600;
		color: #333;
	}
	
	.drawer-close {
		padding: 5px;
	}
}

.drawer-toggle {
	display: flex;
	padding: 15px;
	gap: 10px;
	border-bottom: 1px solid #eee;
	
	.toggle-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		padding: 10px;
		background-color: #f5f5f5;
		border-radius: 8px;
		transition: all 0.2s;
		
		&.active {
			background-color: #007aff;
			color: #fff;
		}
		
		.toggle-icon {
			font-size: 16px;
		}
		
		.toggle-text {
			font-size: 14px;
		}
	}
}

.drawer-content {
	flex: 1;
	overflow-y: auto;
}

.menu-section {
	padding: 10px 0;
}

.menu-item {
	display: flex;
	align-items: center;
	padding: 15px 20px;
	gap: 12px;
	transition: background-color 0.2s;
	
	&:active {
		background-color: #f5f5f5;
	}
	
	.menu-icon {
		font-size: 20px;
	}
	
	.menu-text {
		flex: 1;
		font-size: 15px;
		color: #333;
	}
	
	.menu-count {
		font-size: 13px;
		color: #999;
	}
	
	.menu-badge {
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		background-color: #ff3b30;
		color: #fff;
		font-size: 12px;
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.drawer-footer {
	// border-top: 1px solid #eee;
	padding: 10px 0;
	
	.footer-item {
		display: flex;
		align-items: center;
		padding: 15px 20px;
		gap: 12px;
		background-color: transparent;
		border: none;
		font-size: 15px;
		color: #333;
		text-align: left;
		width: 100%;
		position: relative;
		
		&:active {
			background-color: #f5f5f5;
		}
		
		.arrow-icon {
			margin-left: auto;
		}
	}
	
	.logout-btn {
		.logout-text {
			// color: #f5f5f5;
		}
	}
	
	.contact-btn::after {
		border: none;
	}
}

/* ✅ 用户信息头部 - 放大头像 */
.user-header {
	background-color: #fff;
	padding: 20px;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 15px;
}

.user-info {
	flex: 1;
	display: flex;
	gap: 15px;
	align-items: center;
}

.avatar {
	width: 100px; /* ✅ 从 70px 放大到 100px */
	height: 100px;
	border-radius: 50px;
	background-color: #f0f0f0;
}

.user-details {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.nickname-row {
	display: flex;
	align-items: center;
	gap: 8px;
	flex-wrap: wrap;
}

.nickname {
	font-size: 20px;
	font-weight: 600;
	color: #333;
}

.verified-badge-inline {
	display: flex;
	align-items: center;
	gap: 3px;
	padding: 2px 8px;
	background-color: #e8f5e9;
	border-radius: 12px;
	
	.verified-icon {
		font-size: 12px;
	}
	
	.verified-text {
		font-size: 11px;
		color: #4caf50;
	}
}

.verification-badge-inline {
	display: flex;
	align-items: center;
	gap: 3px;
	padding: 2px 8px;
	background-color: #fff3e0;
	border-radius: 12px;
	
	.verification-icon {
		font-size: 12px;
	}
	
	.verification-text {
		font-size: 11px;
		color: #ff9800;
	}
}

.gender-row {
	.gender-text {
		font-size: 14px;
		color: #666;
	}
}

/* ✅ 学院信息 */
/* 🔥 学院信息和消息按钮同行 - 关键布局 */
/* 🔥 修改：学院信息和消息按钮布局 */
/* ✅ 学院信息 */
.major-message-row {
	display: flex;
	align-items: center;
	width: 100%;
}

.major-info {
	flex: 1;
	min-width: 0;
	
	.major-text {
		font-size: 14px;
		color: #999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

/* 🔥 消息按钮 - 固定在屏幕右侧 */
.message-btn {
	position: fixed;
	right: 22px; /* 距离屏幕右侧的距离，可根据需要调整 */
	top: 80px;   /* 距离屏幕顶部的距离，可根据实际布局调整 */
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5f5f5;
	border-radius: 18px;
	transition: all 0.3s ease;
	z-index: 100;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	
	&:active {
		background-color: #e8e8e8;
		transform: scale(0.95);
	}
	
	.message-icon {
		width: 20px;
		height: 20px;
	}
}

/* 未读消息badge样式保持不变 */
.message-badge {
	position: absolute;
	top: -4px;
	right: -4px;
	min-width: 16px;
	height: 16px;
	padding: 0 4px;
	background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 1px 4px rgba(255, 77, 79, 0.4);
	border: 1px solid #ffffff;
	animation: badgePulse 2s ease-in-out infinite;

	.badge-text {
		font-size: 10px;
		color: #ffffff;
		font-weight: bold;
		line-height: 1;
		transform: scale(0.9);
	}
}


/* 🔥 badge脉冲动画 */
@keyframes badgePulse {
	0%, 100% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
}

.header-actions {
	display: flex;
	align-items: center;
}

// .edit-profile-btn {
// 	height: 36px;
// 	padding: 0 16px;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	background-color: #007aff;
// 	border-radius: 18px;
// 	border: none;
	
// 	&::after {
// 		border: none;
// 	}
	
// 	.edit-text {
// 		font-size: 14px;
// 		color: #fff;
// 		font-weight: 500;
// 	}
// }

.menu-btn {
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5f5f5;
	border-radius: 20px;
	border: none;
	padding: 0;
	margin-top: 70rpx;
	
	&::after {
		border: none;
	}
}
/* 关注数据 */
/* ========== 关注数据区域 ========== */
.stats-section {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-top: 1px solid #f0f0f0;
}

/* 🔥 新增：左侧关注/粉丝容器 */
.stats-left {
  display: flex;
  align-items: center;
  gap: 10px; /* 🔥 减小间距 */
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px; /* 🔥 减小间距 */
  
  .stat-num {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  
  .stat-label {
    font-size: 12px; /* 🔥 从 13px 改为 12px */
    color: #999;
  }
}

.stat-divider {
  width: 1px;
  height: 30px; /* 🔥 设置固定高度 */
  background-color: #f0f0f0;
}

/* 🔥 新增：右侧按钮组容器 */
.stats-right {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* 🔥 新增：内联消息按钮 */
.message-btn-inline {
  position: relative;
  height: 36px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: #f5f5f5;
  border-radius: 18px;
  border: none;
  transition: all 0.3s ease;
  
  &::after {
    border: none;
  }
  
  &:active {
    background-color: #e8e8e8;
    transform: scale(0.95);
  }
  
  .message-icon {
    width: 16px;
    height: 16px;
  }
  
  .btn-text {
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }
  
  /* 未读消息badge */
  .message-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 4px rgba(255, 77, 79, 0.4);
    border: 1px solid #ffffff;
    animation: badgePulse 2s ease-in-out infinite;

    .badge-text {
      font-size: 10px;
      color: #ffffff;
      font-weight: bold;
      line-height: 1;
      transform: scale(0.9);
    }
  }
}

.stat-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
	
	.stat-num {
		font-size: 18px;
		font-weight: 600;
		color: #333;
	}
	
	.stat-label {
		font-size: 13px;
		color: #999;
	}
}

.stat-divider {
	width: 1px;
	background-color: #f0f0f0;
	margin: 0 20px;
}

/* 🔥 修改：编辑资料按钮样式 */
.edit-profile-btn-inline {
  height: 36px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 18px;
  border: none;
  transition: all 0.3s ease;
  
  &::after {
    border: none;
  }
  
  &:active {
    background-color: #f5f5f5;
    transform: scale(0.95);
  }
  
  .btn-text {
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }
}

/* badge脉冲动画 */
@keyframes badgePulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* 🔥 修改：主选项卡 - 调整布局 */
.combined-tabs {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-top: 1px solid #f0f0f0;
  margin-top: 10px;

  /* 关键：添加吸顶定位 */
  &.tabs-sticky {
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0);
    transition: box-shadow 0.3s ease;
  }
}

/* 🔥 可选：吸顶时的阴影效果 */
.tabs-sticky.is-fixed {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 🔥 修改：内容容器 - 移除固定高度 */
.content-container {
  /* ❌ 删除 height: calc(100vh - 320px); */
  /* ✅ 改为自适应高度 */
  min-height: 200px;
  padding-bottom: 20px; /* 添加底部padding，避免内容被tabbar遮挡 */
}

/* 左侧选项卡 */
.main-tabs-left {
  display: flex;
  gap: 18px;
}

.main-tab-item {
  position: relative;
  padding: 12px 0;
  
  .tab-text {
    font-size: 14px;
    color: #999;
    transition: color 0.2s;
  }
  
  .tab-badge {
    font-size: 24rpx;
    color: #999;
    margin-left: 8rpx;
  }
  
  &.active {
    .tab-text {
      color: #333;
      font-weight: 600;
    }
    .tab-badge {
      font-size: 24rpx;
      color: #333;
      font-weight: 600;
    }
  }
}

/* 🔥 新增：右侧容器 */
.tabs-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 🔥 修改：树洞/二手切换按钮 */
.sub-tab-toggle {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background-color: #f5f5f5;
  border-radius: 16px;
  
  .toggle-text {
    font-size: 13px;
    color: #666;
  }
  
  .switch-icon {
    font-size: 12px;
    color: #999;
  }
}

/* 🔥 新增：搜索按钮 */
.search-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 18px;
  transition: all 0.3s ease;
  
  &:active {
    background-color: #e8e8e8;
    transform: scale(0.95);
  }
}

.sub-tab-toggle {
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 8px 12px;
	background-color: #f5f5f5;
	border-radius: 20px;
	
	.toggle-icon {
		font-size: 14px;
	}
	
	.toggle-text {
		font-size: 13px;
		color: #666;
	}
	
	.switch-icon {
		font-size: 12px;
		color: #999;
	}
}

/* 内容区域 */
.content-scroll {
	height: calc(100vh - 320px);
}

/* 树洞帖子样式 */
.post-item {
	background-color: #fff;
	margin: 10px;
	padding: 15px;
	border-radius: 12px;
}

.post-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	
	.post-time {
		font-size: 12px;
		color: #999;
	}
	
	.post-category {
		font-size: 12px;
		color: #007aff;
		padding: 3px 8px;
		background-color: #e3f2fd;
		border-radius: 4px;
	}
}
/* 🔥 新增：帖子顶部区域 */
.post-top {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
  
  .post-time {
    font-size: 12px;
    color: #999;
    padding: 2px 8px;
    // background-color: #f5f5f5;
    border-radius: 10px;
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
	gap: 5px;
	margin-bottom: 10px;
	position: relative;
	
	.post-image {
		width: 100px;
		height: 100px;
		border-radius: 8px;
		background-color: #f5f5f5;
	}
	
	.more-images {
		position: absolute;
		right: 5px;
		bottom: 5px;
		background-color: rgba(0, 0, 0, 0.6);
		color: #fff;
		padding: 5px 10px;
		border-radius: 12px;
		font-size: 12px;
	}
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
  
  .view-count {
    font-size: 12px;
    color: #999;
  }
  
  .footer-right {
    display: flex;
    gap: 15px;
    align-items: center;
    
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
    
    // ❌ 删除旧样式（如果存在）
    // .like-count,
    // .comment-count {
    //   font-size: 12px;
    //   color: #666;
    // }
  }
}

/* 二手商品瀑布流 */
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

/* 空状态 */
.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 80px 20px;
	
	.empty-icon {
		font-size: 60px;
		margin-bottom: 15px;
		opacity: 0.5;
	}
	
	.empty-text {
		font-size: 14px;
		color: #999;
	}
}

/* 加载提示 */
.load-more,
.no-more {
	padding: 20px;
	text-align: center;
	
	.load-text,
	.no-more-text {
		font-size: 13px;
		color: #999;
	}
}

/* 编辑资料弹窗 */
.edit-profile-sheet {
	background-color: #fff;
	border-radius: 20px 20px 0 0;
	max-height: 80vh;
	display: flex;
	flex-direction: column;
}

.sheet-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	border-bottom: 1px solid #f0f0f0;
	
	.sheet-title {
		font-size: 18px;
		font-weight: 600;
		color: #333;
	}
	
	.sheet-close {
		font-size: 24px;
		color: #999;
		padding: 0 5px;
	}
}

.edit-form {
	flex: 1;
	overflow-y: auto;
	padding: 20px;
}

.form-item {
	margin-bottom: 25px;
	
	.form-label {
		display: block;
		font-size: 14px;
		color: #666;
		margin-bottom: 10px;
	}
	
	.avatar-upload {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		
		.upload-avatar {
			width: 80px;
			height: 80px;
			border-radius: 40px;
			background-color: #f0f0f0;
		}
		
		.upload-text {
			font-size: 13px;
			color: #007aff;
		}
	}
	
	.form-input {
		width: 100%;
		padding: 12px;
		background-color: #f5f5f5;
		border-radius: 8px;
		font-size: 15px;
		border: none;
	}
	
	.gender-selector {
		display: flex;
		gap: 15px;
		
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
			}
		}
	}
	
	.form-textarea {
		width: 100%;
		min-height: 100px;
		padding: 12px;
		background-color: #f5f5f5;
		border-radius: 8px;
		font-size: 15px;
		border: none;
	}
}

.sheet-footer {
	display: flex;
	gap: 15px;
	padding: 20px;
	border-top: 1px solid #f0f0f0;
	
	.cancel-btn,
	.save-btn {
		flex: 1;
		padding: 15px;
		border-radius: 8px;
		font-size: 16px;
		border: none;
		
		&::after {
			border: none;
		}
	}
	
	.cancel-btn {
		background-color: #f5f5f5;
		color: #666;
	}
	
	.save-btn {
		background-color: #007aff;
		color: #fff;
	}
}

/* 🔥 新增：页面滚动容器 */
.page-scroll {
  height: 100vh;
}

.my-userinfo-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 🔥 新增：朋友圈时间线样式 (Request 3) */
.timeline-container {
  background-color: #fff;
  padding: 0 15px;
}

.timeline-post-item {
  display: flex;
  gap: 15px;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
}

.timeline-date {
  flex-shrink: 0;
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  .date-day {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    line-height: 1.2;
  }
  
  .date-month {
    font-size: 14px;
    color: #888;
    line-height: 1.2;
  }
}

.timeline-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  // 新增一个 text 样式，保留换行
  .content-text-timeline {
    font-size: 15px;
    color: #333;
    line-height: 1.6;
    word-break: break-all;
    white-space: pre-wrap; // 关键: 保留换行符
  }
  
  // 沿用已有的 .post-images 样式
  .post-images {
    margin-bottom: 0; // 覆盖
  }
}

/* 🔥 修改：搜索图标 (Request 1) */
.search-btn {
  .search-icon-img {
    width: 20px;
    height: 20px;
  }
}
</style>