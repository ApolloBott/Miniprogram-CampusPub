export default {
	//开启命名空间
	namespaced: true,
	//数据节点
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userInfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		userBase: JSON.parse(uni.getStorageSync('userBase') || '{}'),
		code: uni.getStorageSync('code') || '',
		openid: uni.getStorageSync('openid') || '',
		unionid: uni.getStorageSync('unionid') || '',
		userMajor: uni.getStorageSync('userMajor') || '',
		preference: uni.getStorageSync('preference') || '',
	}),
	//方法节点
	mutations: {
		updateMajor(state, userMajor) {
		  state.userMajor = userMajor
				
		  this.commit('m_user/saveMajorToStorage')
		},
		// 持久化存储 address
		saveMajorToStorage(state) {
		  uni.setStorageSync('userMajor', JSON.stringify(state.userMajor))
		},
		
		// 更新收货地址
		    updateAddress(state, address) {
		      state.address = address
		
		      this.commit('m_user/saveAddressToStorage')
		    },
		    // 持久化存储 address
		    saveAddressToStorage(state) {
		      uni.setStorageSync('address', JSON.stringify(state.address))
		    },
		//更新用户的基本信息
		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo
			// 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
			this.commit('m_user/saveUserInfoToStorage')
		},
		// 将 userinfo 持久化存储到本地
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		//更新用户数据库的信息
		updateUserBase(state, userBase) {
			state.userBase = userBase
			// 通过 this.commit() 方法，调用 m_user 模块下的 saveUserBaseToStorage 方法，将 userBase 对象持久化存储到本地
			this.commit('m_user/saveUserBaseToStorage')
		},
		// 将 userinfo 持久化存储到本地
		saveUserBaseToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		updatepreference(state, preference) {
			state.preference = preference
			// 通过 this.commit() 方法，调用 m_user 模块下的 savepreferenceToStorage 方法，将 userBase 对象持久化存储到本地
			this.commit('m_user/savepreferenceToStorage')
		},
		// 将 userinfo 持久化存储到本地
		savepreferenceToStorage(state) {
			uni.setStorageSync('preference')
		},
		// 更新 token 字符串
		updateToken(state, token) {
			state.token = token
			// 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
			this.commit('m_user/saveTokenToStorage')
		},
			// 将 token 字符串持久化存储到本地
			saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		updateCode(state, code) {
			state.code = code
			// 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
			this.commit('m_user/saveCodeToStorage')
		},
			saveCodeToStorage(state) {
			uni.setStorageSync('code', state.code)
		},
		updateOpenid(state, openid) {
			state.openid = openid
			// 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
			this.commit('m_user/saveOpenidToStorage')
		},
			saveOpenidToStorage(state) {
			uni.setStorageSync('openid', state.openid)
		},
		// 更新 unionid
		updateUnionid(state, unionid) {
			state.unionid = unionid
		},
		// 清除登录信息（退出登录时使用）
		clearUserInfo(state) {
			state.token = ''
			state.openid = ''
			state.unionid = ''
			state.userInfo = {}
			
			uni.removeStorageSync('token')
			uni.removeStorageSync('openid')
			uni.removeStorageSync('unionid')
			uni.removeStorageSync('userInfo')
			uni.removeStorageSync('userId')
		}
	},
	
	getters: {
		// 收货地址
		    addstr(state) {
		      if (!state.address.provinceName) return ''
		
		      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		    }
	}
}

