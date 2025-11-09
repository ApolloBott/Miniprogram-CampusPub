<!-- subpkg/webview/webview.vue -->
<template>
	<view class="webview-page">
		<!-- 自定义导航栏 -->
		<view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="navbar-content">
				<view class="navbar-left" @click="goBack">
					<text class="back-icon">←</text>
				</view>
				<view class="navbar-center">
					<text class="navbar-title">{{ pageTitle }}</text>
				</view>
				<view class="navbar-right">
					<text class="refresh-icon" @click="refreshWebview">🔄</text>
					<text class="more-icon" @click="showActionSheet">⋯</text>
				</view>
			</view>
		</view>
		
		<!-- 加载进度条 -->
		<view class="progress-bar" v-if="isLoading">
			<view class="progress-fill" :style="{ width: progress + '%' }"></view>
		</view>
		
		<!-- Webview 容器 -->
		<web-view 
			class="webview-container"
			:src="webviewUrl"
			@load="onLoad"
			@error="onError"
			@loading="onLoading"
			@loaded="onLoaded"
		></web-view>
		
		<!-- 错误状态 -->
		<view class="error-container" v-if="showError">
			<view class="error-content">
				<text class="error-icon">😞</text>
				<text class="error-title">页面加载失败</text>
				<text class="error-message">{{ errorMessage }}</text>
				<view class="error-actions">
					<view class="error-btn retry" @click="retryLoad">
						<text>重新加载</text>
					</view>
					<view class="error-btn back" @click="goBack">
						<text>返回上页</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewUrl: '',
				pageTitle: '',
				originalUrl: '',
				statusBarHeight: 0,
				isLoading: true,
				progress: 0,
				showError: false,
				errorMessage: '',
				progressTimer: null
			}
		},
		
		onLoad(options) {
			// 获取传入的 URL 和标题
			this.originalUrl = decodeURIComponent(options.url || '')
			this.pageTitle = decodeURIComponent(options.title || '加载中...')
			this.webviewUrl = this.originalUrl
			
			console.log('Webview 加载:', this.webviewUrl)
			
			// 获取状态栏高度
			this.getSystemInfo()
			
			// 开始加载进度模拟
			this.startProgressAnimation()
		},
		
		onUnload() {
			// 清理定时器
			if (this.progressTimer) {
				clearInterval(this.progressTimer)
			}
		},
		
		methods: {
			// 获取系统信息
			getSystemInfo() {
				uni.getSystemInfo({
					success: (res) => {
						this.statusBarHeight = res.statusBarHeight || 20
					}
				})
			},
			
			// 开始进度动画
			startProgressAnimation() {
				this.progress = 0
				this.progressTimer = setInterval(() => {
					if (this.progress < 90) {
						this.progress += Math.random() * 10
					}
				}, 200)
			},
			
			// 完成进度动画
			completeProgress() {
				if (this.progressTimer) {
					clearInterval(this.progressTimer)
				}
				this.progress = 100
				setTimeout(() => {
					this.isLoading = false
				}, 300)
			},
			
			// webview 开始加载
			onLoading() {
				console.log('Webview 开始加载')
				this.isLoading = true
				this.showError = false
				this.startProgressAnimation()
			},
			
			// webview 加载成功
			onLoad() {
				console.log('Webview 加载成功')
				this.completeProgress()
				this.showError = false
			},
			
			// webview 加载完成
			onLoaded() {
				console.log('Webview 加载完成')
				this.completeProgress()
			},
			
			// webview 加载错误
			onError(event) {
				console.error('Webview 加载错误:', event)
				this.isLoading = false
				this.showError = true
				this.errorMessage = this.getErrorMessage(event)
				
				if (this.progressTimer) {
					clearInterval(this.progressTimer)
				}
			},
			
			// 获取错误信息
			getErrorMessage(event) {
				// 根据不同的错误类型返回用户友好的错误信息
				if (event.detail && event.detail.errMsg) {
					const errMsg = event.detail.errMsg.toLowerCase()
					if (errMsg.includes('network')) {
						return '网络连接失败，请检查网络设置'
					} else if (errMsg.includes('timeout')) {
						return '页面加载超时，请重试'
					} else if (errMsg.includes('ssl') || errMsg.includes('certificate')) {
						return '安全证书验证失败'
					}
				}
				return '页面加载失败，请检查网络或重试'
			},
			
			// 返回上一页
			goBack() {
				uni.navigateBack({
					fail: () => {
						// 如果无法返回，则跳转到首页
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				})
			},
			
			// 刷新页面
			refreshWebview() {
				this.isLoading = true
				this.showError = false
				this.webviewUrl = ''
				
				// 延迟重新设置 URL，确保 webview 重新加载
				setTimeout(() => {
					this.webviewUrl = this.originalUrl
					this.startProgressAnimation()
				}, 100)
				
				uni.showToast({
					title: '正在刷新...',
					icon: 'loading',
					duration: 1000
				})
			},
			
			// 重新加载
			retryLoad() {
				this.refreshWebview()
			},
			
			// 显示操作菜单
			showActionSheet() {
				uni.showActionSheet({
					itemList: ['刷新页面', '复制链接', '在浏览器中打开'],
					success: (res) => {
						switch (res.tapIndex) {
							case 0:
								this.refreshWebview()
								break
							case 1:
								this.copyUrl()
								break
							case 2:
								this.openInBrowser()
								break
						}
					}
				})
			},
			
			// 复制链接
			copyUrl() {
				uni.setClipboardData({
					data: this.originalUrl,
					success: () => {
						uni.showToast({
							title: '链接已复制',
							icon: 'success'
						})
					}
				})
			},
			
			// 在浏览器中打开
			openInBrowser() {
				uni.showModal({
					title: '提示',
					content: '即将复制链接到剪贴板，请在浏览器中粘贴打开',
					success: (res) => {
						if (res.confirm) {
							uni.setClipboardData({
								data: this.originalUrl,
								success: () => {
									uni.showToast({
										title: '链接已复制，请在浏览器中打开',
										icon: 'none',
										duration: 3000
									})
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.webview-page {
	height: 100vh;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
}

// 自定义导航栏
.custom-navbar {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	z-index: 1000;
	
	.navbar-content {
		height: 88rpx;
		display: flex;
		align-items: center;
		padding: 0 24rpx;
		
		.navbar-left {
			width: 80rpx;
			display: flex;
			align-items: center;
			
			.back-icon {
				font-size: 36rpx;
				color: #ffffff;
				font-weight: bold;
			}
		}
		
		.navbar-center {
			flex: 1;
			text-align: center;
			
			.navbar-title {
				font-size: 32rpx;
				color: #ffffff;
				font-weight: 500;
				max-width: 400rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		
		.navbar-right {
			width: 120rpx;
			display: flex;
			justify-content: flex-end;
			gap: 24rpx;
			
			.refresh-icon,
			.more-icon {
				font-size: 32rpx;
				color: #ffffff;
				padding: 8rpx;
			}
		}
	}
}

// 进度条
.progress-bar {
	height: 4rpx;
	background-color: rgba(255, 255, 255, 0.3);
	position: relative;
	overflow: hidden;
	
	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
		transition: width 0.3s ease;
		position: absolute;
		left: 0;
		top: 0;
	}
}

// Webview 容器
.webview-container {
	flex: 1;
	width: 100%;
}

// 错误状态
.error-container {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
	
	.error-content {
		text-align: center;
		padding: 40rpx;
		
		.error-icon {
			font-size: 120rpx;
			margin-bottom: 32rpx;
			display: block;
		}
		
		.error-title {
			font-size: 36rpx;
			color: #333333;
			font-weight: 500;
			margin-bottom: 16rpx;
			display: block;
		}
		
		.error-message {
			font-size: 28rpx;
			color: #666666;
			line-height: 1.5;
			margin-bottom: 48rpx;
			display: block;
		}
		
		.error-actions {
			display: flex;
			gap: 24rpx;
			justify-content: center;
			
			.error-btn {
				padding: 20rpx 40rpx;
				border-radius: 12rpx;
				font-size: 28rpx;
				text-align: center;
				transition: all 0.3s;
				
				&.retry {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					color: #ffffff;
					
					&:active {
						opacity: 0.8;
					}
				}
				
				&.back {
					background-color: #f5f5f5;
					color: #666666;
					
					&:active {
						background-color: #e8e8e8;
					}
				}
			}
		}
	}
}

// 适配不同平台
/* #ifdef MP-WEIXIN */
.custom-navbar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
}

.webview-container {
	margin-top: var(--navbar-height);
}
/* #endif */

// 暗黑模式适配
@media (prefers-color-scheme: dark) {
	.webview-page {
		background-color: #1f1f1f;
	}
	
	.error-container {
		background-color: #1f1f1f;
		
		.error-title {
			color: #ffffff;
		}
		
		.error-message {
			color: #cccccc;
		}
		
		.error-btn.back {
			background-color: #333333;
			color: #cccccc;
		}
	}
}
</style>