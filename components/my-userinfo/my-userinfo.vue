
<!-- components/my-userinfo/my-userinfo.vue -->
<template>
	<view class="my-userinfo-container">
		<!-- 左上角菜单按钮 -->
		<view class="menu-btn" @click="openDrawer">
			<uni-icons type="bars" size="24" color="#ffffff"></uni-icons>
		</view>
		
		<!-- 左侧抽屉菜单 -->
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
					<text class="toggle-icon">🌳</text>
					<text class="toggle-text">树洞</text>
				</view>
				<view 
					class="toggle-item"
					:class="{ 'active': drawerTab === 1 }"
					@click="switchDrawerTab(1)"
				>
					<text class="toggle-icon">🛍️</text>
					<text class="toggle-text">二手</text>
				</view>
			</view>
			
			<view class="drawer-content">
				<!-- 树洞菜单 -->
				<view v-if="drawerTab === 0" class="menu-section">
					<view class="menu-item" @click="handleMenuClick('myPosts')">
						<view class="menu-icon">📝</view>
						<text class="menu-text">我的帖子</text>
						<text class="menu-count" v-if="myPostsCount > 0">{{ myPostsCount }}</text>
						<uni-icons type="arrowright" size="16" color="#999"></uni-icons>
					</view>
					
					<view class="menu-item" @click="handleMenuClick('myComments')">
						<view class="menu-icon">💬</view>
						<text class="menu-text">我评价的</text>
						<text class="menu-count" v-if="myCommentsCount > 0">{{ myCommentsCount }}</text>
						<uni-icons type="arrowright" size="16" color="#999"></uni-icons>
					</view>
					
					<view class="menu-item" @click="handleMenuClick('momentMessages')">
						<view class="menu-icon">✉️</view>
						<text class="menu-text">消息</text>
						<view class="menu-badge" v-if="momentUnread > 0">{{ momentUnread }}</view>
						<uni-icons type="arrowright" size="16" color="#999"></uni-icons>
					</view>
				</view>
				
				<!-- 二手菜单 -->
				<view v-if="drawerTab === 1" class="menu-section">
					<view class="menu-item" @click="handleMenuClick('published')">
						<view class="menu-icon">📦</view>
						<text class="menu-text">我发布的</text>
						<text class="menu-count" v-if="userBase.goods_count > 0">{{ userBase.goods_count }}</text>
						<uni-icons type="arrowright" size="16" color="#999"></uni-icons>
					</view>
					
					<view class="menu-item" @click="handleMenuClick('bought')">
						<view class="menu-icon">🛒</view>
						<text class="menu-text">我买到的</text>
						<uni-icons type="arrowright" size="16" color="#999"></uni-icons>
					</view>
					
					<view class="menu-item" @click="handleMenuClick('sold')">
						<view class="menu-icon">💰</view>
						<text class="menu-text">我卖出的</text>
						<uni-icons type="arrowright" size="16" color="#999"></uni-icons>
					</view>
					
					<view class="menu-item" @click="handleMenuClick('collect')">
						<view class="menu-icon">⭐</view>
						<text class="menu-text">收藏的商品</text>
						<text class="menu-count" v-if="userBase.goods_collects && userBase.goods_collects.length > 0">
							{{ userBase.goods_collects.length }}
						</text>
						<uni-icons type="arrowright" size="16" color="#999"></uni-icons>
					</view>
					
					<view class="menu-item" @click="handleMenuClick('history')">
						<view class="menu-icon">👣</view>
						<text class="menu-text">浏览足迹</text>
						<uni-icons type="arrowright" size="16" color="#999"></uni-icons>
					</view>
					
					<view class="menu-item" @click="handleMenuClick('comment')">
						<view class="menu-icon">📋</view>
						<text class="menu-text">评价的商品</text>
						<uni-icons type="arrowright" size="16" color="#999"></uni-icons>
					</view>
					
					<view class="menu-item" @click="handleMenuClick('secondhandMessages')">
						<view class="menu-icon">✉️</view>
						<text class="menu-text">消息</text>
						<view class="menu-badge" v-if="secondhandUnread > 0">{{ secondhandUnread }}</view>
						<uni-icons type="arrowright" size="16" color="#999"></uni-icons>
					</view>
				</view>
			</view>
			
			<view class="drawer-footer">
				<button class="footer-item contact-btn" open-type="contact">
					<uni-icons type="chatbubble" size="20" color="#666"></uni-icons>
					<text>联系我们（反馈/求助）</text>
					<uni-icons type="arrowright" size="16" color="#999" class="arrow-icon"></uni-icons>
				</button>
				
				<view class="footer-item logout-btn" @click="handleMenuClick('logout')">
					<uni-icons type="logout" size="20" color="#ff3b30"></uni-icons>
					<text class="logout-text">退出登录</text>
					<uni-icons type="arrowright" size="16" color="#999" class="arrow-icon"></uni-icons>
				</view>
			</view>
		</view>
		
		<!-- 用户信息头部 -->
		<view class="user-header">
			<view class="user-info">
				<image 
					:src="userBase.avatarUrl || '/static/default-avatar.png'" 
					class="avatar"
					mode="aspectFill"
					@click="gotoProfile"
				></image>
				
				<view class="user-details">
					<view class="nickname-row">
						<text class="nickname">{{ userBase.nickname }}</text>
					</view>
					
					<view class="gender-row" v-if="userBase.user_sex">
						<text class="gender-text">{{ userBase.user_sex }}</text>
					</view>
				</view>
			</view>
			
			<button class="edit-profile-btn" @click="openEditProfile">
				编辑资料
			</button>
		</view>
		
		<!-- 个人简介 -->
		<view class="intro-section">
			<text class="intro-text">{{ userIntro }}</text>
		</view>
		
		<!-- 关注数据 + 认证状态 -->
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
				<!-- 认证状态 -->
				<view class="verification-badge" @click="gotoVerification" v-if="userBase.is_verified !== 1">
					<text class="verification-icon">{{ verificationIcon }}</text>
					<text class="verification-text">{{ verificationText }}</text>
				</view>
				
				<view class="verified-badge" v-if="userBase.is_verified === 1">
					<text class="verified-icon">✅</text>
					<text class="verified-text">已认证</text>
				</view>
			</view>
		</view>
		
		<!-- 主选项卡：动态/评论 -->
		<view class="main-tabs">
			<view 
				class="main-tab-item"
				:class="{ active: activeMainTab === 0 }"
				@click="switchMainTab(0)"
			>
				<text class="tab-text">动态</text>
				<view class="tab-indicator" v-if="activeMainTab === 0"></view>
			</view>
			
			<view 
				class="main-tab-item"
				:class="{ active: activeMainTab === 1 }"
				@click="switchMainTab(1)"
			>
				<text class="tab-text">评论</text>
				<view class="tab-indicator" v-if="activeMainTab === 1"></view>
			</view>
		</view>
		
		<!-- 子选项卡：树洞/二手 -->
		<view class="sub-tabs">
			<view 
				class="sub-tab-item"
				:class="{ active: activeSubTab === 0 }"
				@click="switchSubTab(0)"
			>
				<text class="tab-text">🌳 树洞</text>
			</view>
			
			<view 
				class="sub-tab-item"
				:class="{ active: activeSubTab === 1 }"
				@click="switchSubTab(1)"
			>
				<text class="tab-text">🛍️ 二手</text>
			</view>
		</view>
		
		<!-- 内容区域 -->
		<scroll-view class="content-scroll" scroll-y @scrolltolower="loadMore">
			<!-- 动态-树洞帖子 -->
			<view v-if="activeMainTab === 0 && activeSubTab === 0">
				<view 
					class="post-item" 
					v-for="post in postList" 
					:key="post.id"
					@click="gotoPostDetail(post)"
				>
					<view class="post-header">
						<text class="post-time">{{ formatTime(post.created_at) }}</text>
						<text class="post-category">{{ post.properties }}</text>
					</view>
					
					<view class="post-content">
						<text class="content-text">{{ post.content }}</text>
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
					
					<view class="post-footer">
						<text class="view-count">{{ post.view_count }} 浏览</text>
						<view class="footer-right">
							<text class="like-count">👍 {{ post.like_count }}</text>
							<text class="comment-count">💬 {{ post.comment_count }}</text>
						</view>
					</view>
				</view>
				
				<view class="empty-state" v-if="postList.length === 0 && !loading">
					<text class="empty-icon">📝</text>
					<text class="empty-text">暂无树洞帖子</text>
				</view>
			</view>
			
			<!-- 动态-二手商品 -->
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
			
			<!-- 评论-树洞 -->
			<view v-if="activeMainTab === 1 && activeSubTab === 0">
				<view 
					class="comment-item" 
					v-for="comment in commentPostList" 
					:key="comment.id"
					@click="gotoPostDetail(comment)"
				>
					<view class="comment-post-preview">
						<text class="preview-content">{{ comment.content }}</text>
					</view>
					
					<view class="my-comment">
						<view class="comment-header">
							<text class="comment-time">{{ formatTime(comment.comment_time) }}</text>
						</view>
						<text class="comment-text">{{ comment.comment_content }}</text>
					</view>
					
					<view class="comment-footer">
						<text class="like-count">👍 {{ comment.comment_likes || 0 }}</text>
					</view>
				</view>
				
				<view class="empty-state" v-if="commentPostList.length === 0 && !loading">
					<text class="empty-icon">💬</text>
					<text class="empty-text">暂无评论记录</text>
				</view>
			</view>
			
			<!-- 评论-二手 -->
			<view v-if="activeMainTab === 1 && activeSubTab === 1">
				<view 
					class="comment-item" 
					v-for="comment in commentGoodsList" 
					:key="comment.id"
					@click="gotoGoodsDetail(comment)"
				>
					<view class="comment-goods-preview">
						<image 
							class="goods-thumb" 
							:src="comment.goods_small_logo"
							mode="aspectFill"
						></image>
						<view class="goods-info">
							<text class="goods-name">{{ comment.goods_name }}</text>
							<text class="goods-price">¥{{ comment.goods_price }}</text>
						</view>
					</view>
					
					<view class="my-comment">
						<view class="comment-header">
							<text class="comment-time">{{ formatTime(comment.comment_time) }}</text>
						</view>
						<text class="comment-text">{{ comment.comment_content }}</text>
					</view>
					
					<view class="comment-footer">
						<text class="like-count">👍 {{ comment.comment_likes || 0 }}</text>
					</view>
				</view>
				
				<view class="empty-state" v-if="commentGoodsList.length === 0 && !loading">
					<text class="empty-icon">💬</text>
					<text class="empty-text">暂无评论记录</text>
				</view>
			</view>
			
			<!-- 加载提示 -->
			<view class="load-more" v-if="loading">
				<text class="load-text">加载中...</text>
			</view>
			<view class="no-more" v-if="!hasMore && dataList.length > 0">
				<text class="no-more-text">没有更多了</text>
			</view>
		</scroll-view>
		
		<!-- 编辑资料弹窗 -->
		<uni-popup ref="editProfilePopup" type="bottom">
			<view class="edit-profile-sheet">
				<view class="sheet-header">
					<text class="sheet-title">编辑资料</text>
					<text class="sheet-close" @click="closeEditProfile">✕</text>
				</view>
				
				<view class="edit-form">
					<!-- 头像 -->
					<view class="form-item">
						<text class="form-label">头像</text>
						<view class="avatar-upload" @click="changeAvatar">
							<image 
								:src="editForm.avatarUrl || '/static/default-avatar.png'" 
								class="upload-avatar"
								mode="aspectFill"
							></image>
							<text class="upload-text">点击更换</text>
						</view>
					</view>
					
					<!-- 昵称 -->
					<view class="form-item">
						<text class="form-label">昵称</text>
						<input 
							v-model="editForm.nickname" 
							class="form-input"
							placeholder="请输入昵称"
							maxlength="20"
						/>
					</view>
					
					<!-- 性别 -->
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
						</view>
					</view>
					
					<!-- 专业 -->
					<view class="form-item">
						<text class="form-label">专业</text>
						<input 
							v-model="editForm.major" 
							class="form-input"
							placeholder="请输入专业"
							maxlength="50"
						/>
					</view>
					
					<!-- 个人简介 -->
					<view class="form-item">
						<text class="form-label">个人简介</text>
						<textarea 
							v-model="editForm.user_introduce" 
							class="form-textarea"
							placeholder="请输入个人简介"
							maxlength="200"
						></textarea>
					</view>
				</view>
				
				<view class="sheet-footer">
					<button class="cancel-btn" @click="closeEditProfile">取消</button>
					<button class="save-btn" @click="saveProfile">保存</button>
				</view>
			</view>
		</uni-popup>
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
			
			// 主选项卡: 0-动态, 1-评论
			activeMainTab: 0,
			// 子选项卡: 0-树洞, 1-二手
			activeSubTab: 0,
			
			// 数据列表
			postList: [],           // 树洞帖子
			goodsList: [],          // 二手商品
			commentPostList: [],    // 评论的树洞帖子
			commentGoodsList: [],   // 评论的二手商品
			
			// 分页
			page: 1,
			pageSize: 10,
			hasMore: true,
			loading: false,
			postPage: 1,
			postPageSize: 10,
			// 统计数据
			followingCount: 0,
			followersCount: 0,
			
			uploading: false,
			editForm: {
				nickname: '',
				avatarUrl: '',
				user_sex: '',
				major: '',
				user_introduce: ''
			}
		}
	},
	
	computed: {
		...mapState('m_user', ['token', 'code', 'userBase', 'openid']),
		
		userIntro() {
			return this.userBase.user_introduce || '这个人很懒，什么都没留下'
		},
		
		leftColumn() {
			return this.goodsList.filter((_, i) => i % 2 === 0)
		},
		
		rightColumn() {
			return this.goodsList.filter((_, i) => i % 2 === 1)
		},
		
		dataList() {
			if (this.activeMainTab === 0) {
				return this.activeSubTab === 0 ? this.postList : this.goodsList
			} else {
				return this.activeSubTab === 0 ? this.commentPostList : this.commentGoodsList
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
	
	async onShow() {
		
			console.log("hello")
			await this.loadUserInfo()
			await this.loadData()
		
	},
	
	methods: {
		...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase', 'updateCode', 'updateOpenid']),
		
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
				'myComments': () => this.gotoMyComments(),
				'momentMessages': () => this.gotoMessages('moment'),
				'published': () => this.gotoPublished(),
				'bought': () => this.gotoBought(),
				'sold': () => this.gotoSold(),
				'collect': () => this.gotoCollect(),
				'history': () => this.gotoHistory(),
				'comment': () => this.gotoComment(),
				'secondhandMessages': () => this.gotoMessages('secondhand'),
				'logout': () => this.logout()
			}
			
			if (actions[type]) {
				actions[type]()
			}
		},
		
		switchMainTab(index) {
			if (this.activeMainTab === index) return
			
			this.activeMainTab = index
			this.resetData()
			this.loadData()
		},
		
		switchSubTab(index) {
			if (this.activeSubTab === index) return
			
			this.activeSubTab = index
			this.resetData()
			this.loadData()
		},
		
		resetData() {
			this.page = 1
			this.hasMore = true
			
			if (this.activeMainTab === 0) {
				if (this.activeSubTab === 0) {
					this.postList = []
				} else {
					this.goodsList = []
				}
			} else {
				if (this.activeSubTab === 0) {
					this.commentPostList = []
				} else {
					this.commentGoodsList = []
				}
			}
		},
		
		async loadData() {
			if (this.loading || !this.hasMore) return
			
			this.loading = true
			
			try {
				if (this.activeMainTab === 0) {
					if (this.activeSubTab === 0) {
						await this.loadMyPosts()
					} else {
						await this.loadMyGoods()
					}
				} else {
					if (this.activeSubTab === 0) {
						await this.loadMyPostComments()
					} else {
						await this.loadMyGoodsComments()
					}
				}
			} catch (error) {
				console.error('加载数据失败:', error)
				uni.showToast({
					title: '加载失败',
					icon: 'none'
				})
			} finally {
				this.loading = false
			}
		},
		
		async loadMyPosts() {
			const { data: res } = await uni.$http.get('/users/posts', {
				user_openid: this.userBase.openid,
				viewer_openid: this.openid || '',
				type: 0, // 0-发布的帖子, 1-评论过的帖子
				page: this.postPage,
				pageSize: this.postPageSize
			})
			
			if (res.meta.status === 200) {
				const newPosts = res.message.list.map(post => ({
					...post,
					images: this.processImages(post.images)
				}))
				
				if (this.postPage === 1) {
					this.postList = newPosts
				} else {
					this.postList = this.postList.concat(newPosts)
				}
				
				this.hasMore = res.message.hasMore
				this.page++
			}
		},
		
		async loadMyGoods() {
			uni.showLoading({ title: '加载中...' })
			const ids = Array.isArray(this.userBase?.goods_id) ? this.userBase.goods_id : []
			if (ids.length === 0) {
				this.goodsList = []
				return
			}
			const { data: res } = await uni.$http.get('/goods/historysearch', {
				goods_id: ids
			})
			this.goodsList = (res?.meta?.status === 200 && Array.isArray(res?.message)) ? res.message : []
		},
		
		async loadMyPostComments() {
			const { data: res } = await uni.$http.get('/posts/my-comments', {
				openid: this.openid,
				page: this.page,
				pageSize: this.pageSize
			})
			
			if (res.meta.status === 200) {
				if (this.page === 1) {
					this.commentPostList = res.message.list
				} else {
					this.commentPostList = this.commentPostList.concat(res.message.list)
				}
				
				this.hasMore = res.message.hasMore
				this.page++
			}
		},
		
		async loadMyGoodsComments() {
			const { data: res } = await uni.$http.get('/goods/my-comments', {
				openid: this.openid,
				page: this.page,
				pageSize: this.pageSize
			})
			
			if (res.meta.status === 200) {
				if (this.page === 1) {
					this.commentGoodsList = res.message.list
				} else {
					this.commentGoodsList = this.commentGoodsList.concat(res.message.list)
				}
				
				this.hasMore = res.message.hasMore
				this.page++
			}
		},
		
		loadMore() {
			if (!this.loading && this.hasMore) {
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
			
			const date = new Date(timestamp)
			const now = new Date()
			const diff = now - date
			
			if (diff < 60000) return '刚刚'
			if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
			if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
			if (diff < 2592000000) return Math.floor(diff / 86400000) + '天前'
			
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
		
		async logout() {
			const [err, succ] = await uni.showModal({
				title: '提示',
				content: '确认退出登录吗？'
			}).catch(err => err)
		
			if (succ && succ.confirm) {
				this.updateUserInfo({})
				this.updateToken('')
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
						
						gotoMyPosts() {
							uni.navigateTo({
								url: '/subpkg/my-posts/my-posts'
							})
						},
						
						gotoMyComments() {
							uni.navigateTo({
								url: '/subpkg/my-post-comments/my-post-comments'
							})
						},
						
						gotoMessages(type) {
							uni.navigateTo({
								url: `/subpkg/messages/messages?type=${type}`
							})
						},
						
						gotoPostDetail(post) {
							uni.navigateTo({
								url: '/subpkg/post-detail/post-detail?id=' + post.id
							})
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
									const uploadedUrls = await this.uploadImages([tempFilePath])
									
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
											url: tokenRes.message.uploadUrl,
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
				
				<style lang="scss">
				.my-userinfo-container {
					min-height: 100vh;
					background-color: #f5f5f5;
					display: flex;
					flex-direction: column;
					
					.menu-btn {
						position: fixed;
						top: 40rpx;
						left: 30rpx;
						width: 72rpx;
						height: 72rpx;
						background: rgba(0, 0, 0, 0.3);
						backdrop-filter: blur(10rpx);
						border-radius: 36rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 100;
						box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
						transition: all 0.3s;
						
						&:active {
							transform: scale(0.95);
							background: rgba(0, 0, 0, 0.4);
						}
					}
					
					.drawer-mask {
						position: fixed;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
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
						left: 0;
						bottom: 0;
						width: 560rpx;
						background-color: #ffffff;
						z-index: 999;
						transform: translateX(-100%);
						transition: transform 0.3s ease;
						display: flex;
						flex-direction: column;
						box-shadow: 4rpx 0 16rpx rgba(0, 0, 0, 0.1);
						
						&.show {
							transform: translateX(0);
						}
						
						.drawer-header {
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 40rpx 32rpx 24rpx;
							border-bottom: 1rpx solid #f0f0f0;
							
							.drawer-title {
								font-size: 36rpx;
								font-weight: 600;
								color: #333333;
							}
							
							.drawer-close {
								width: 60rpx;
								height: 60rpx;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						
						.drawer-toggle {
							display: flex;
							padding: 24rpx 32rpx;
							gap: 16rpx;
							background-color: #f8f8f8;
							
							.toggle-item {
								flex: 1;
								display: flex;
								align-items: center;
								justify-content: center;
								gap: 8rpx;
								padding: 16rpx;
								background-color: #ffffff;
								border-radius: 12rpx;
								border: 2rpx solid transparent;
								transition: all 0.3s;
								
								&.active {
									border-color: #667eea;
									background: linear-gradient(135deg, #f0f2ff 0%, #e8edff 100%);
									
									.toggle-icon {
										transform: scale(1.1);
									}
									
									.toggle-text {
										color: #667eea;
										font-weight: 600;
									}
								}
								
								.toggle-icon {
									font-size: 32rpx;
									transition: transform 0.3s;
								}
								
								.toggle-text {
									font-size: 28rpx;
									color: #666666;
									transition: all 0.3s;
								}
							}
						}
						
						.drawer-content {
							flex: 1;
							overflow-y: auto;
							padding: 16rpx 0;
							
							.menu-section {
								.menu-item {
									display: flex;
									align-items: center;
									padding: 28rpx 32rpx;
									border-bottom: 1rpx solid #f5f5f5;
									transition: background-color 0.3s;
									
									&:active {
										background-color: #f8f8f8;
									}
									
									.menu-icon {
										width: 64rpx;
										height: 64rpx;
										background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
										border-radius: 12rpx;
										display: flex;
										align-items: center;
										justify-content: center;
										font-size: 32rpx;
										margin-right: 20rpx;
										flex-shrink: 0;
									}
									
									.menu-text {
										flex: 1;
										font-size: 28rpx;
										color: #333333;
									}
									
									.menu-count {
										font-size: 24rpx;
										color: #999999;
										margin-right: 12rpx;
									}
									
									.menu-badge {
										min-width: 32rpx;
										height: 32rpx;
										line-height: 32rpx;
										text-align: center;
										background-color: #ff3b30;
										color: #ffffff;
										font-size: 20rpx;
										border-radius: 16rpx;
										padding: 0 8rpx;
										margin-right: 12rpx;
									}
								}
							}
						}
						
						.drawer-footer {
							padding: 24rpx 32rpx;
							border-top: 1rpx solid #f0f0f0;
							background-color: #f8f8f8;
							
							.footer-item {
								display: flex;
								align-items: center;
								gap: 16rpx;
								padding: 20rpx;
								background-color: #ffffff;
								border-radius: 12rpx;
								margin-bottom: 16rpx;
								transition: all 0.3s;
								
								&:last-child {
									margin-bottom: 0;
								}
								
								&:active {
									background-color: #f5f5f5;
									transform: scale(0.98);
								}
								
								text {
									font-size: 28rpx;
									color: #333333;
									flex: 1;
								}
								
								&.contact-btn {
									border: none;
									border-radius: 12rpx;
									width: calc(100% - 0rpx);
									padding: 20rpx;
									background-color: #ffffff;
									
									&::after {
										border: none;
									}
									
									.arrow-icon {
										margin-left: auto;
									}
								}
								
								&.logout-btn {
									background-color: #fff5f5;
									border: 1rpx solid #ffe0e0;
									
									.logout-text {
										color: #ff3b30;
										font-weight: 500;
									}
									
									&:active {
										background-color: #ffebeb;
									}
								}
							}
						}
					}
				}
				
				// 用户信息头部
				.user-header {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					padding: 40rpx 30rpx 24rpx;
					background-color: #ffffff;
					
					.user-info {
						display: flex;
						gap: 24rpx;
						flex: 1;
						
						.avatar {
							width: 120rpx;
							height: 120rpx;
							border-radius: 60rpx;
							flex-shrink: 0;
							border: 2rpx solid #f0f0f0;
						}
						
						.user-details {
							flex: 1;
							
							.nickname-row {
								margin-bottom: 12rpx;
								
								.nickname {
									font-size: 36rpx;
									font-weight: 600;
									color: #333333;
								}
							}
							
							.gender-row {
								.gender-text {
									font-size: 26rpx;
									color: #999999;
								}
							}
						}
					}
					
					.edit-profile-btn {
						display: flex;
						align-items: center;
						gap: 8rpx;
						padding: 12rpx 24rpx;
						background-color: #f5f5f5;
						border-radius: 24rpx;
						border: none;
						font-size: 26rpx;
						color: #666666;
						
						&::after {
							border: none;
						}
					}
				}
				
				// 个人简介
				.intro-section {
					background-color: #ffffff;
					padding: 0 30rpx 24rpx;
					border-bottom: 1rpx solid #f0f0f0;
					
					.intro-text {
						font-size: 28rpx;
						color: #666666;
						line-height: 1.6;
					}
				}
				
				// 关注数据
				.stats-section {
					background-color: #ffffff;
					padding: 24rpx 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 2rpx solid #f0f0f0;
					
					.stats-left {
						display: flex;
						align-items: center;
						gap: 40rpx;
						
						.stat-item {
							display: flex;
							flex-direction: column;
							align-items: center;
							gap: 8rpx;
							
							.stat-num {
								font-size: 32rpx;
								font-weight: 600;
								color: #333333;
							}
							
							.stat-label {
								font-size: 24rpx;
								color: #999999;
							}
						}
						
						.stat-divider {
							width: 1rpx;
							height: 60rpx;
							background-color: #e0e0e0;
						}
					}
					
					.stats-right {
						.verification-badge,
						.verified-badge {
							display: flex;
							align-items: center;
							gap: 8rpx;
							padding: 8rpx 16rpx;
							border-radius: 20rpx;
							
							text {
								font-size: 24rpx;
								font-weight: 500;
							}
						}
						
						.verification-badge {
							background-color: #fff9e6;
							border: 1rpx solid #ffd666;
							
							.verification-icon,
							.verification-text {
								color: #d46b08;
							}
						}
						
						.verified-badge {
							background-color: #f0f9ff;
							border: 1rpx solid #91d5ff;
							
							.verified-icon,
							.verified-text {
								color: #0369a1;
							}
						}
					}
				}
				
				// 主选项卡
				.main-tabs {
					background-color: #ffffff;
					display: flex;
					padding: 0 30rpx;
					
					.main-tab-item {
						flex: 1;
						padding: 24rpx 0;
						display: flex;
						flex-direction: column;
						align-items: center;
						position: relative;
						
						.tab-text {
							font-size: 30rpx;
							color: #666666;
							transition: all 0.3s;
						}
						
						.tab-indicator {
							position: absolute;
							bottom: 0;
							width: 60rpx;
							height: 4rpx;
							background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
							border-radius: 2rpx;
						}
						
						&.active .tab-text {
							color: #667eea;
							font-weight: 600;
						}
					}
				}
				
				// 子选项卡
				.sub-tabs {
					background-color: #ffffff;
					display: flex;
					padding: 0 30rpx 16rpx;
					gap: 16rpx;
					border-bottom: 2rpx solid #f0f0f0;
					
					.sub-tab-item {
						padding: 12rpx 24rpx;
						background-color: #f8f8f8;
						border-radius: 20rpx;
						transition: all 0.3s;
						
						.tab-text {
							font-size: 26rpx;
							color: #666666;
						}
						
						&.active {
							background: linear-gradient(135deg, #f0f2ff 0%, #e8edff 100%);
							
							.tab-text {
								color: #667eea;
								font-weight: 500;
							}
						}
					}
				}
				
				// 内容滚动区域
				.content-scroll {
					flex: 1;
					background-color: #f5f5f5;
				}
				
				// 帖子项
				.post-item {
					background-color: #ffffff;
					padding: 30rpx;
					margin-bottom: 20rpx;
					
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
							color: #999999;
						}
						
						.post-category {
							font-size: 22rpx;
							color: #667eea;
							background-color: #f0f2ff;
							padding: 6rpx 12rpx;
							border-radius: 4rpx;
						}
					}
					
					.post-content {
						margin-bottom: 20rpx;
						
						.content-text {
							font-size: 28rpx;
							color: #333333;
							line-height: 1.5;
							display: -webkit-box;
							-webkit-line-clamp: 3;
							-webkit-box-orient: vertical;
							overflow: hidden;
						}
					}
					
					.post-images {
						display: flex;
						gap: 12rpx;
						margin-bottom: 20rpx;
						
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
							color: #ffffff;
							font-size: 24rpx;
						}
					}
					
					.post-footer {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding-top: 16rpx;
						border-top: 1rpx solid #f0f0f0;
						
						.view-count {
							font-size: 22rpx;
							color: #999999;
						}
						
						.footer-right {
							display: flex;
							gap: 24rpx;
							
							.like-count,
							.comment-count {
								font-size: 22rpx;
								color: #666666;
							}
						}
					}
				}
				
				// 评论项
				.comment-item {
					background-color: #ffffff;
					padding: 30rpx;
					margin-bottom: 20rpx;
					
					&:active {
						background-color: #f9f9f9;
					}
					
					.comment-post-preview {
						padding: 16rpx;
						background-color: #f8f8f8;
						border-radius: 8rpx;
						margin-bottom: 16rpx;
						
						.preview-content {
							font-size: 26rpx;
							color: #666666;
							line-height: 1.5;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							overflow: hidden;
						}
					}
					
					.comment-goods-preview {
						display: flex;
						gap: 16rpx;
						padding: 16rpx;
						background-color: #f8f8f8;
						border-radius: 8rpx;
						margin-bottom: 16rpx;
						
						.goods-thumb {
							width: 80rpx;
							height: 80rpx;
							border-radius: 8rpx;
							background-color: #f0f0f0;
							flex-shrink: 0;
						}
						
						.goods-info {
							flex: 1;
							display: flex;
							flex-direction: column;
							justify-content: center;
							gap: 8rpx;
							
							.goods-name {
								font-size: 26rpx;
								color: #333333;
								display: -webkit-box;
								-webkit-line-clamp: 1;
								-webkit-box-orient: vertical;
								overflow: hidden;
							}
							
							.goods-price {
								font-size: 28rpx;
								color: #667eea;
								font-weight: 600;
							}
						}
					}
					
					.my-comment {
						.comment-header {
							margin-bottom: 12rpx;
							
							.comment-time {
								font-size: 24rpx;
								color: #999999;
							}
						}
						
						.comment-text {
							font-size: 28rpx;
							color: #333333;
							line-height: 1.5;
							display: -webkit-box;
							-webkit-line-clamp: 3;
							-webkit-box-orient: vertical;
							overflow: hidden;
						}
					}
					
					.comment-footer {
						display: flex;
						justify-content: flex-end;
						padding-top: 16rpx;
						border-top: 1rpx solid #f0f0f0;
						margin-top: 16rpx;
						
						.like-count {
							font-size: 22rpx;
							color: #666666;
						}
					}
				}
				
				// 空状态
				.empty-state {
					padding: 200rpx 0;
					text-align: center;
					
					.empty-icon {
						font-size: 120rpx;
						display: block;
						margin-bottom: 24rpx;
						opacity: 0.5;
					}
					
					.empty-text {
						font-size: 28rpx;
						color: #999999;
					}
				}
				
				// 加载提示
				.load-more,
				.no-more {
					padding: 40rpx 0;
					text-align: center;
					
					.load-text,
					.no-more-text {
						font-size: 26rpx;
						color: #999999;
					}
				}
				
				// 编辑资料弹窗
				.edit-profile-sheet {
					background-color: #ffffff;
					border-radius: 24rpx 24rpx 0 0;
					max-height: 80vh;
					display: flex;
					flex-direction: column;
					
					.sheet-header {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 30rpx 40rpx;
						border-bottom: 1rpx solid #f0f0f0;
						
						.sheet-title {
							font-size: 32rpx;
							font-weight: 600;
							color: #333333;
						}
						
						.sheet-close {
							font-size: 40rpx;
							color: #999999;
							width: 60rpx;
							height: 60rpx;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
					
					.edit-form {
						flex: 1;
						overflow-y: auto;
						padding: 20rpx 40rpx;
						
						.form-item {
							margin-bottom: 40rpx;
							
							.form-label {
								display: block;
								font-size: 28rpx;
								color: #666666;
								margin-bottom: 16rpx;
							}
							
							.avatar-upload {
								display: flex;
								align-items: center;
								gap: 24rpx;
								
								.upload-avatar {
									width: 120rpx;
									height: 120rpx;
									border-radius: 60rpx;
									border: 2rpx solid #f0f0f0;
								}
								
								.upload-text {
									font-size: 26rpx;
									color: #667eea;
								}
							}
							
							.form-input {
								width: 100%;
								padding: 20rpx 24rpx;
								background-color: #f8f8f8;
								border-radius: 12rpx;
								font-size: 28rpx;
								color: #333333;
							}
							
							.gender-selector {
								display: flex;
								gap: 24rpx;
								
								.gender-option {
									flex: 1;
									padding: 20rpx;
									text-align: center;
									background-color: #f8f8f8;
									border-radius: 12rpx;
									font-size: 28rpx;
									color: #666666;
									border: 2rpx solid transparent;
									
									&.active {
										background-color: #ffffff;
										color: #667eea;
										border-color: #667eea;
									}
								}
							}
							
							.form-textarea {
								width: 100%;
								min-height: 200rpx;
								padding: 20rpx 24rpx;
								background-color: #f8f8f8;
								border-radius: 12rpx;
								font-size: 28rpx;
								color: #333333;
							}
						}
					}
					
					.sheet-footer {
						display: flex;
						gap: 24rpx;
						padding: 30rpx 40rpx;
						border-top: 1rpx solid #f0f0f0;
						
						.cancel-btn,
						.save-btn {
							flex: 1;
							padding: 24rpx;
							border-radius: 12rpx;
							font-size: 30rpx;
							border: none;
						}
						
						.cancel-btn {
							background-color: #f5f5f5;
							color: #666666;
						}
						
						.save-btn {
							background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
							color: #ffffff;
						}
					}
				}
				</style>


