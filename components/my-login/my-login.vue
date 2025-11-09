<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- ✅ 直接绑定登录方法 -->
		<button type="primary" class="btn-login" @tap="handleLogin">一键登录</button>
		<view class="tips-text">登录后即可探索更多内容</view>
	</view>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      isLogging: false
    }
  },
  
  computed: {
    ...mapState('m_user', ['token', 'openid'])
  },
  
  onLoad() {
    this.checkLoginStatus()
  },
  
  methods: {
    ...mapMutations('m_user', [
      'updateUserInfo', 
      'updateToken', 
      'updateOpenid',
      'updateUnionid',
      'updateUserBase'
    ]),
    
    checkLoginStatus() {
      const token = uni.getStorageSync('token')
      const openid = uni.getStorageSync('openid')
      
      if (token && openid) {
        console.log('[登录检查] 已登录，openid:', openid)
      } else {
        console.log('[登录检查] 未登录')
      }
    },
    
    async handleLogin() {
      if (this.isLogging) {
        console.log('[登录] 正在登录中...')
        return
      }
      
      this.isLogging = true
      uni.showLoading({ title: '登录中...', mask: true })
      
      try {
        console.log('[登录] 步骤1: 获取登录凭证')
        const code = await this.getLoginCode()
        
        console.log('[登录] 步骤2: 发送登录请求')
        await this.sendLoginRequest(code)
        
      } catch (error) {
        console.error('[登录] 登录失败:', error)
        uni.$showMsg(error.message || '登录失败，请重试')
        this.isLogging = false
        uni.hideLoading()
      }
    },
    
    getLoginCode() {
      return new Promise((resolve, reject) => {
        uni.login({
          success: (res) => {
            if (res.code) {
              console.log('[登录] 获取 code 成功:', res.code)
              resolve(res.code)
            } else {
              reject(new Error('获取 code 失败'))
            }
          },
          fail: (err) => {
            console.error('[登录] wx.login 失败:', err)
            reject(err)
          }
        })
      })
    },
    
    async sendLoginRequest(code) {
      const query = {
        code: code
      }
      
      console.log('[登录] 请求参数:', query)
      
      try {
        const { data: loginResult } = await uni.$http.post('/users/wxlogin', query)
        
        console.log('[登录] 服务器响应:', loginResult)
        
        if (loginResult.meta.status === 200) {
          uni.hideLoading()
          await this.handleLoginSuccess(loginResult)
          
        } else if (loginResult.meta.shouldRetry) {
          console.log('[登录] code 已过期，重新登录...')
          uni.$showMsg('登录凭证已过期，正在重试...')
          
          const newCode = await this.getLoginCode()
          await this.sendLoginRequest(newCode)
        } else {
          throw new Error(loginResult.meta.msg || '登录失败')
        }
        
      } catch (error) {
        console.error('[登录] 请求失败:', error)
        
        if (error.data && error.data.meta && error.data.meta.shouldRetry) {
          uni.$showMsg('正在重试...')
          const newCode = await this.getLoginCode()
          await this.sendLoginRequest(newCode)
        } else {
          throw error
        }
      }
    },
    
    async handleLoginSuccess(loginResult) {
      const { token, openid, unionid, userInfo: serverUserInfo } = loginResult.message
      
      console.log('[登录成功] 保存数据...')
      console.log('  - token:', token)
      console.log('  - openid:', openid)
      
      // 获取用户详细信息
      const queryObj = { code: openid }
      const { data: res } = await uni.$http.get('/users/userinfo', queryObj)
      
      if (res.meta.status === 200) {
        console.log('[用户信息]', res.message)
        this.updateUserBase(res.message)
        
        // 如果服务器返回了用户信息，也更新到 userInfo
        if (res.message) {
          this.updateUserInfo({
            nickName: res.message.nickName || '新用户',
            avatarUrl: res.message.avatarUrl || ''
          })
        }
      }
      
      this.updateToken(token)
      this.updateOpenid(openid)
      
      if (unionid) {
        this.updateUnionid(unionid)
      }
      
      uni.setStorageSync('token', token)
      uni.setStorageSync('openid', openid)
      
      if (unionid) {
        uni.setStorageSync('unionid', unionid)
      }
      
      if (serverUserInfo) {
        uni.setStorageSync('userId', serverUserInfo.userId)
        uni.setStorageSync('userInfo', JSON.stringify(serverUserInfo))
      }
      
      console.log('[登录成功] 数据已保存')
      uni.$showMsg('登录成功')
      
      this.isLogging = false
      
      setTimeout(() => {
        uni.navigateBack({
          fail: () => {
            uni.switchTab({ url: '/pages/home/home' })
          }
        })
      }, 800)
    }
  }
}
</script>

<style lang="scss">
.login-container {
	height: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;
	position: relative;
	overflow: hidden;

	&::after {
		content: ' ';
		display: block;
		position: absolute;
		width: 100%;
		height: 40px;
		left: 0;
		bottom: 0;
		background-color: white;
		border-radius: 100%;
		transform: translateY(50%);
	}

	.btn-login {
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #c00000;
	}

	.tips-text {
		font-size: 12px;
		color: gray;
	}
}
</style>
