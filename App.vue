
<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				pollingTimer: null // 轮询定时器
			}
		},
		onLaunch: async function() {
			console.log('App Launch')
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			// 从本地存储恢复登录状态
			this.restoreLoginState()
			uni.onTabBarMidButtonTap(() => {
			  this.showPublishModal();
			});
			// 启动轮询
			this.startPolling()
			
			
			if (this.token) {
				const queryObj = {code: this.openid};
				const { data: res } = await uni.$http.get('/users/userinfo', queryObj);
				if (res.meta.status === 200) {
					console.log(res.message)
					this.updateUserBase(res.message)
				}
			}
			
			
			// 监听未读消息变化
			uni.$on('updateUnreadCount', (count) => {
			  if (count > 0) {
				uni.setTabBarBadge({
				  index: 4,
				  text: count + ''
				})
			  } else {
				uni.removeTabBarBadge({
				  index: 4
				})
			  }
			})
			
			
		},
		onShow: function() {
			console.log('App Show')
			// 页面显示时启动轮询
			this.startPolling()
		},
		onHide: function() {
			console.log('App Hide')
			// 页面显示时启动轮询
			this.startPolling()
		},
		
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase', 'updateCode', 'updateOpenid']),
			startPolling() {
				// 防止重复启动
				if (this.pollingTimer) return
				
				// 立即执行一次
				this.fetchUserInfo()
				
				// 每10秒执行一次
				this.pollingTimer = setInterval(() => {
					this.fetchUserInfo()
				}, 10000) // 10秒 = 10000毫秒
			},
			// 停止轮询
			stopPolling() {
				if (this.pollingTimer) {
					clearInterval(this.pollingTimer)
					this.pollingTimer = null
				}
			},
			// 获取用户信息
			async fetchUserInfo() {
				if (this.token) {
					try {
						const queryObj = {code: this.openid}
						const { data: res } = await uni.$http.get('/users/userinfo', queryObj)
						if (res.meta.status === 200) {
							this.updateUserBase(res.message)
							
							// 触发未读消息更新
							uni.$emit('updateUnreadCount', res.message.total_unread || 0)
						}
					} catch (e) {
						console.error('[App] 获取用户信息失败:', e)
					}
				}
			},
						
			showPublishModal() {
			      uni.showActionSheet({
			        itemList: ['发布到二手', '发布到树洞'],
			        success: (res) => {
			          if (res.tapIndex === 0) {
			            uni.switchTab({
			              url: '/pages/sold/sold'
			            });
			          } else if (res.tapIndex === 1) {
			            uni.navigateTo({
			              url: '/subpkg/publish-post/publish-post'
			            });
			          }
			        }
			      });
			    },
			restoreLoginState() {
				const token = uni.getStorageSync('token')
				const openid = uni.getStorageSync('openid')
				const userInfo = uni.getStorageSync('userInfo')
				
				if (token && openid) {
					console.log('[App] 恢复登录状态成功')
					console.log('[App] openid:', openid)
					
					// 恢复到 vuex
					this.$store.commit('m_user/updateToken', token)
					this.$store.commit('m_user/updateOpenid', openid)
					
					if (userInfo) {
						try {
							this.$store.commit('m_user/updateUserInfo', JSON.parse(userInfo))
						} catch (e) {
							console.error('[App] 解析 userInfo 失败:', e)
						}
					}
				} else {
					console.log('[App] 未登录')
				}
			}
		},
		computed: {
			...mapState('m_user', ['token', 'code', 'userBase', 'openid', 'userMajor']),
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
