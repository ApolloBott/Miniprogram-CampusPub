// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'
import { $http } from '@escook/request-miniprogram'

// 封装的展示消息提示的方法
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none',
	})
}

uni.$http = $http
// 配置请求根路径
// $http.baseUrl = 'http://192.168.1.107:3000'
// $http.baseUrl = 'http://172.26.218.185:3000'
$http.baseUrl = 'https://xinshi00.com' 

$http.beforeRequest = function (options) {
	console.log(options)
	if (options.data && options.data._hideLoading) {
		// console.log('✅ 跳过 loading 显示')
		delete options.data._hideLoading;
		return;
	}
	// uni.showLoading({
	// 	title: '数据加载中...',
	// })
	// if (options.url.indexOf('/my/') !== -1) {
	// 	options.header = {
	// 		Authorization: store.state.m_user.token,
	// 	}
	// }
}

$http.afterRequest = function () {
	console.log('=== afterRequest 拦截器触发 ===')
	uni.hideLoading()
}
//请求开始之前做一些事情
// $http.beforeRequest = function (options) {
// 	// 【关键修改】只有在未明确设置 showLoading 为 false 时才显示加载提示
// 	if (options.showLoading !== false) {
// 		uni.showLoading({
// 			title: '数据加载中...',
// 		})
// 	}
// }
// $http.beforeRequest = function (options) {
// 	// 如果 URL 包含特定标记，就不显示 loading
// 	if (options.url && options.url.includes('_hideLoading=true')) {
// 		return;
// 	}
	
// 	uni.showLoading({
// 		title: '数据加载中...',
// 	})
// }

// 请求完成之后做一些事情
// $http.afterRequest = function () {
// 	// 【关键修改】只有在显示了 loading 的情况下才隐藏
// 	uni.hideLoading()
// }

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif
