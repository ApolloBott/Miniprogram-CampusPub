<!-- pages/address/edit-address.vue -->
<template>
	<view class="edit-address-page">
		<view class="form-container">
			<!-- 详细地址 -->
			<view class="form-item address-item">
				<text class="label required">详细地址</text>
				<textarea 
					class="textarea" 
					v-model="formData.street" 
					placeholder="街道、楼牌号等详细信息"
					placeholder-class="placeholder"
					maxlength="200"
					:auto-height="true"
				/>
			</view>
			
			<!-- 设为默认地址 -->
			<view class="form-item switch-item">
				<text class="label">设为默认地址</text>
				<switch 
					:checked="formData.is_default" 
					@change="switchChange"
					color="#07c160"
				/>
			</view>
		</view>
		
		<!-- 保存按钮 -->
		<view class="save-btn" @click="saveAddress">
			<text>保存</text>
		</view>
		
		<!-- 地区选择器(隐藏) -->
		<picker 
			mode="region" 
			@change="regionChange"
			:value="regionValue"
			ref="regionPicker"
		>
			<view></view>
		</picker>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				// 表单数据
				formData: {
					recipient_name: '',
					recipient_phone: '',
					province: '',
					city: '',
					district: '',
					street: '',
					is_default: false
				},
				// 地址ID(编辑模式)
				addressId: null,
				// 地区选择器的值
				regionValue: ['北京市', '北京市', '东城区'],
			}
		},
		
		onLoad(options) {
			if (options && options.id) {
				// 编辑模式
				this.addressId = options.id;
				this.loadAddressDetail();
				uni.setNavigationBarTitle({
					title: '编辑地址'
				});
			} else {
				// 新增模式
				uni.setNavigationBarTitle({
					title: '新增地址'
				});
			}
		},
		
		methods: {
			// 加载地址详情
			async loadAddressDetail() {
				try {
					const { data: res } = await uni.$http.get('/address/detail', {
						openid: this.openid,
						address_id: this.addressId
					});
					
					if (res.meta.status === 200) {
						this.formData = {
							recipient_name: res.message.recipient_name || '',
							recipient_phone: res.message.recipient_phone || '',
							province: res.message.province || '',
							city: res.message.city || '',
							district: res.message.district || '',
							street: res.message.street || '',
							is_default: res.message.is_default || false
						};
						
						// 设置地区选择器的值
						if (res.message.province) {
							this.regionValue = [
								res.message.province,
								res.message.city,
								res.message.district
							];
						}
					}
				} catch (error) {
					console.error('加载地址详情失败:', error);
					uni.showToast({
						title: '加载地址失败',
						icon: 'none'
					});
				}
			},
			
			// 打开地区选择器
			openRegionPicker() {
				// 通过编程方式触发picker
				// 注意:这里需要使用一个技巧来触发picker
				const pickerElement = document.querySelector('picker');
				if (pickerElement) {
					pickerElement.click();
				}
			},
			
			// 地区选择变化
			regionChange(e) {
				const region = e.detail.value;
				this.regionValue = region;
				this.formData.province = region[0];
				this.formData.city = region[1];
				this.formData.district = region[2];
				
				console.log('选择的地区:', region);
			},
			
			// 开关变化
			switchChange(e) {
				this.formData.is_default = e.detail.value;
			},
			
			// 表单验证
			validateForm() {
				// 验证详细地址
				if (!this.formData.street.trim()) {
					uni.showToast({
						title: '请输入详细地址',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
			},
			// 保存地址
			async saveAddress() {
				// 表单验证
				if (!this.validateForm()) {
					return;
				}
				
				// 显示加载提示
				uni.showLoading({
					title: this.addressId ? '修改中...' : '保存中...',
					mask: true
				});
				
				try {
					const url = this.addressId ? '/address/update' : '/address/add';
					const params = {
						openid: this.openid,
						recipient_name: this.formData.recipient_name.trim(),
						recipient_phone: this.formData.recipient_phone.trim(),
						province: this.formData.province,
						city: this.formData.city,
						district: this.formData.district,
						street: this.formData.street.trim(),
						is_default: this.formData.is_default ? 1 : 0
					};
					
					// 如果是编辑模式,添加地址ID
					if (this.addressId) {
						params.address_id = this.addressId;
					}
					
					const { data: res } = await uni.$http.post(url, params);
					
					uni.hideLoading();
					
					if (res.meta.status === 200 || res.meta.status === 201) {
						uni.showToast({
							title: this.addressId ? '修改成功' : '添加成功',
							icon: 'success',
							duration: 1500
						});
						
						// 延迟返回上一页
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1500);
					} else {
						uni.showToast({
							title: res.meta.msg || '保存失败',
							icon: 'none',
							duration: 2000
						});
					}
				} catch (error) {
					uni.hideLoading();
					console.error('保存地址失败:', error);
					
					// 显示具体错误信息
					let errorMsg = '保存失败,请稍后重试';
					if (error.data && error.data.meta && error.data.meta.msg) {
						errorMsg = error.data.meta.msg;
					} else if (error.errMsg) {
						errorMsg = error.errMsg;
					}
					
					uni.showToast({
						title: errorMsg,
						icon: 'none',
						duration: 2000
					});
				}
			}
		},
		
		computed: {
			...mapState('m_user', ['openid']),
			
			// 地区显示文本
			regionText() {
				if (this.formData.province && this.formData.city && this.formData.district) {
					return `${this.formData.province} ${this.formData.city} ${this.formData.district}`;
				}
				return '';
			}
		}
	}
</script>

<style lang="scss">
	.edit-address-page {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 180rpx;
	}
	
	.form-container {
		background-color: #ffffff;
		margin: 24rpx;
		border-radius: 16rpx;
		overflow: hidden;
	}
	
	.form-item {
		display: flex;
		align-items: center;
		padding: 32rpx;
		border-bottom: 1rpx solid #f0f0f0;
		
		&:last-child {
			border-bottom: none;
		}
		
		.label {
			width: 180rpx;
			font-size: 30rpx;
			color: #333333;
			flex-shrink: 0;
			
			&.required::before {
				content: '*';
				color: #ff3b30;
				margin-right: 4rpx;
			}
		}
		
		.input {
			flex: 1;
			font-size: 30rpx;
			color: #333333;
		}
		
		.placeholder {
			color: #c0c0c0;
			font-size: 30rpx;
		}
	}
	
	.picker-item {
		.picker-value {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.selected-text {
				flex: 1;
				font-size: 30rpx;
				color: #333333;
			}
			
			.placeholder {
				flex: 1;
				font-size: 30rpx;
				color: #c0c0c0;
			}
			
			.arrow {
				font-size: 40rpx;
				color: #c0c0c0;
				margin-left: 12rpx;
			}
		}
	}
	
	.address-item {
		align-items: flex-start;
		
		.label {
			padding-top: 4rpx;
		}
		
		.textarea {
			flex: 1;
			font-size: 30rpx;
			color: #333333;
			min-height: 140rpx;
			line-height: 1.6;
			width: 100%;
		}
	}
	
	.switch-item {
		justify-content: space-between;
	}
	
	.save-btn {
		position: fixed;
		bottom: 48rpx;
		left: 24rpx;
		right: 24rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #07c160 0%, #06ae56 100%);
		border-radius: 48rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 24rpx rgba(7, 193, 96, 0.3);
		
		&:active {
			opacity: 0.8;
		}
		
		text {
			font-size: 32rpx;
			color: #ffffff;
			font-weight: 500;
		}
	}
	
	// 隐藏picker组件
	picker {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}
</style>