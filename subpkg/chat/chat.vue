<template>
	<view class="chat-container">
		<!-- 顶部导航栏 - 固定位置 -->
		<view class="header">
			<view class="seller-info">
				<text class="seller-name" v-if="goods_info.publisher_id !== userBase.openid">{{ goods_info.publisher_nickname }}</text>
				<text class="seller-name" v-else>{{ other_nickname }}</text>
			</view>
			<view class="more-btn" @click="showMoreOptions">
				<image class="more_icons" src="/static/icons/more.png"></image>
			</view>
		</view>

		<!-- 商品简介栏 - 固定位置 -->
		<view class="goods-bar">
			<image class="goods-image" :src="goods_info.goods_big_logo" mode="aspectFill" @click="gotoDetail(goods_info)"></image>
			<view class="goods-info">
				<text class="goods-name">{{ displayGoodsName }}</text>
				<text class="goods-price">¥{{ goods_info.goods_price }}</text>
			</view>
			
			<!-- 买家视角 -->
			    <view v-if="goods_info.publisher_id !== userBase.openid">
			        <!-- 无交易状态 - 显示线下交易按钮 -->
			        <view class="buy-btn" @click="buyNow" v-if="transactionStatus === 0">
			            线下交易
			        </view>
			        
			        <!-- 买家发起交易待确认 - 显示等待状态 -->
			        <view class="waiting-btn" v-else-if="transactionStatus === 1">
			            等待卖家确认
			        </view>
			        
			        <!-- 卖家同意，交易进行中 -->
			        <view class="in-progress-btn" @click="finish" v-else-if="transactionStatus === 2">
			            确认交易完成
			        </view>
			        
			        <!-- 交易完成 -->
			        <view class="completed-btn" v-else-if="transactionStatus === 3">
			            交易已完成
			        </view>
			    </view>
				
				<!-- 卖家视角 -->
				    <view v-else>
				        <!-- 买家发起交易 - 显示同意按钮 -->
				        <view class="agree-btn" @click="agreeTransaction" v-if="transactionStatus === 1">
				            同意线下交易
				        </view>
				        
				        <!-- 交易进行中 -->
				        <view class="in-progress-btn" v-else-if="transactionStatus === 2">
				            线下交易进行中
				        </view>
				        
				        <!-- 交易完成 -->
				        <view class="completed-btn" v-else-if="transactionStatus === 3">
				            交易已完成
				        </view>
				        
				        <!-- 无交易状态 -->
				        <view class="no-transaction-btn" v-else>
				            等待买家发起
				        </view>
				    </view>
		</view>

		<!-- 聊天内容区域 -->
		<scroll-view 
		  class="chat-content" 
		  scroll-y 
		  :scroll-into-view="scrollIntoView" 
		  scroll-with-animation
		  @scroll="handleScroll"
		  :lower-threshold="scrollThreshold"
		  @scrolltolower="handleScrollToLower"
		>
		    <view v-for="(msg, index) in messages" :key="index" :id="'msg-' + index" class="message-item">
		        <!-- 时间戳 -->
		        <view v-if="msg.showTime" class="message-time">
		            {{ msg.time }}
		        </view>
		        
				<!-- 🔥 新增：系统消息 -->
				<view v-if="msg.type === 'system'" class="system-message">
					<text class="system-text">{{ msg.content }}</text>
				</view>
						
		        <!-- 对方消息(左侧) -->
		        <view v-if="msg.type === 'received'" class="message-wrapper left">
		            <image class="avatar" :src="goods_info.publisher_avatarUrl" mode="aspectFill" v-if="goods_info.publisher_id !== openid"></image>
					<image class="avatar" :src="other_avatarUrl" mode="aspectFill" v-else></image>
		            <view class="message-content">
		                <!-- 文本消息 -->
		                <view v-if="msg.message_type === 'text' || !msg.message_type" 
		                      class="message-bubble left-bubble" 
		                      :class="{ 'payment-message': msg.is_payment }">
		                    <text>{{ msg.content }}</text>
		                </view>
		                
		                <!-- 图片消息 -->
		                <image v-else-if="msg.message_type === 'image'" 
		                       class="message-image"
		                       :src="msg.content" 
		                       mode="aspectFill"
		                       @click="previewImage(msg.content)"></image>
		                
		                <!-- 表情包消息 -->
		                <image v-else-if="msg.message_type === 'emoji'" 
		                       class="message-emoji"
		                       :src="msg.content" 
		                       mode="aspectFit"
		                       @click="previewEmoji(msg.content)"></image>
		                
		                <!-- 交易消息 - 新增 -->
		                <view v-else-if="msg.message_type === 'transaction'" 
		                      class="transaction-message left-transaction">
		                    <view class="transaction-header">
		                        <text class="transaction-icon">🤝</text>
		                        <text class="transaction-title">发起线下交易</text>
		                    </view>
		                    <view class="transaction-body">

		                        <view class="transaction-item" v-if="msg.location">
		                            <text class="label">见面地点:</text>
		                            <text class="value location">{{ msg.location }}</text>
		                        </view>
		                        <view class="transaction-item" v-else>
		                            <text class="label">见面地点:</text>
		                            <text class="value tips">待协商</text>
		                        </view>
		                    </view>
		                    <view class="transaction-footer">
		                        <text class="status-text">等待对方确认</text>
		                    </view>
		                </view>
						
						<!-- 同意交易消息 - 🔥 新增 -->
						<view v-else-if="msg.message_type === 'agree'" 
						      :class="['agree-message', msg.type === 'sent' ? 'right-agree' : 'left-agree']">
						    <view class="agree-header">
						        <text class="agree-icon">✅</text>
						        <text class="agree-title">已同意线下交易</text>
						    </view>
						    <view class="agree-body">
						        <view class="agree-item">
						            <text class="tips-text">💬 请双方协商具体交易事宜</text>
						        </view>
						    </view>
						    <view class="agree-footer">
						        <text class="status-text">交易进行中</text>
						    </view>
						</view>
						
						<!-- 完成交易消息 - 🔥 新增 -->
						<view v-else-if="msg.message_type === 'finish'" 
						      class="finish-message left-finish">
						    <view class="finish-header">
						        <text class="finish-icon">🎉</text>
						        <text class="finish-title">交易已完成</text>
						    </view>
						    <view class="finish-body">
						        <view class="finish-item">
						            <text class="tips-text">✅ 感谢您的交易，期待下次合作</text>
						        </view>
						    </view>
						    <view class="finish-footer">
						        <text class="status-text">交易成功</text>
						    </view>
						</view>
		            </view>
		        </view>
		
		       <!-- 自己消息(右侧) -->
		       <view v-if="msg.type === 'sent'" class="message-wrapper right">
		           <view class="message-content">
		               <!-- 文本消息 -->
		               <view v-if="msg.message_type === 'text' || !msg.message_type" 
		                     class="message-bubble right-bubble" 
		                     :class="{ 'payment-message': msg.is_payment }">
		                   <text>{{ msg.content }}</text>
		               </view>
		               
		               <!-- 图片消息 -->
		               <image v-else-if="msg.message_type === 'image'" 
		                      class="message-image"
		                      :src="msg.content" 
		                      mode="aspectFill"
		                      @click="previewImage(msg.content)"></image>
		               
		               <!-- 表情包消息 -->
		               <image v-else-if="msg.message_type === 'emoji'" 
		                      class="message-emoji"
		                      :src="msg.content" 
		                      mode="aspectFit"
							   @click="previewEmoji(msg.content)"></image>
		               
		               <!-- 交易消息 -->
		               <view v-else-if="msg.message_type === 'transaction'" 
		                     class="transaction-message right-transaction">
		                   <view class="transaction-header">
		                       <text class="transaction-icon">🤝</text>
		                       <text class="transaction-title">发起线下交易</text>
		                   </view>
		                   <view class="transaction-body">
		                       <view class="transaction-item" v-if="msg.location">
		                           <text class="label">见面地点:</text>
		                           <text class="value location">{{ msg.location }}</text>
		                       </view>
		                       <view class="transaction-item" v-else>
		                           <text class="label">见面地点:</text>
		                           <text class="value tips">待协商</text>
		                       </view>
		                   </view>
		                   <view class="transaction-footer">
		                       <text class="status-text">已发送交易请求</text>
		                   </view>
		               </view>
		               
		               <!-- 同意交易消息 -->
		               <view v-else-if="msg.message_type === 'agree'" 
		                     class="agree-message right-agree">
		                   <view class="agree-header">
		                       <text class="agree-icon">✅</text>
		                       <text class="agree-title">已同意线下交易</text>
		                   </view>
		                   <view class="agree-body">
	
		
		                       <view class="agree-item">
		                           <text class="tips-text">💬 请双方协商具体交易事宜</text>
		                       </view>
		                   </view>
		                   <view class="agree-footer">
		                       <text class="status-text">交易进行中</text>
		                   </view>
		               </view>
		               
		               <!-- 完成交易消息 - 🔥 修复class和删除内部头像 -->
		               <view v-else-if="msg.message_type === 'finish'" 
		                     class="finish-message right-finish">
		                   <view class="finish-header">
		                       <text class="finish-icon">🎉</text>
		                       <text class="finish-title">交易已完成</text>
		                   </view>
		                   <view class="finish-body">
	
		                       <view class="finish-item">
		                           <text class="tips-text">✅ 感谢您的交易，期待下次合作</text>
		                       </view>
		                   </view>
		                   <view class="finish-footer">
		                       <text class="status-text">交易成功</text>
		                   </view>
		               </view>
		           </view>
		           
		           <!-- 🔥 只保留这一个头像 -->
		           <image class="avatar" :src="userBase.avatarUrl" mode="aspectFill"></image>
		       </view>
		    </view>
		</scroll-view>


		<!-- 表情面板 -->
		<view class="emoji-panel" :class="{ 'show': showEmojiPanel }">
			<scroll-view class="emoji-scroll" scroll-y>
				<view class="emoji-grid">
					<view 
						class="emoji-item" 
						v-for="(emoji, index) in emojiList" 
						:key="index"
						@click="selectEmoji(emoji)"
					>
						<image class="emoji-image" :src="emoji.url" mode="aspectFit"></image>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 底部输入栏 - 修改 -->
		<view class="input-bar" :style="{ bottom: showEmojiPanel ? '250px' : '0' }">
		    <input 
		        class="input-field" 
		        v-model="inputText" 
		        placeholder="想跟TA说点什么..." 
		        confirm-type="send"
		        @confirm="sendMessage"
		        @focus="showEmojiPanel = false"
		    />
		    <view class="emoji-btn" @click="showEmojiPicker">
		        <text class="iconfont">😊</text>
		    </view>
		    <view class="add-btn" @click="showAddMenu">
		        <text class="iconfont">📎</text>
		    </view>
		</view>
		
		<!-- 🔥 新增：新消息提示按钮 -->
		<view 
		  class="new-message-tip" 
		  :class="{ 'show': showNewMessageTip }"
		  @click="scrollToBottomWithTip"
		>
		  <view class="tip-content">
		    <text class="tip-icon">💬</text>
		    <text class="tip-text">{{ newMessageCount }}条新消息</text>
		    <text class="tip-arrow">👇</text>
		  </view>
		</view>
		
		<!-- 表情面板 -->
		<view class="emoji-panel" :class="{ 'show': showEmojiPanel }">
		    <scroll-view scroll-y class="emoji-scroll">
		        <view class="emoji-grid">
		            <view class="emoji-item" 
		                  v-for="(emoji, index) in emojiList" 
		                  :key="index"
		                  @click="selectEmoji(emoji)">
		                <image class="emoji-image" :src="emoji.url" mode="aspectFit"></image>
		            </view>
		        </view>
		    </scroll-view>
		</view>
		
		<!-- 购买弹窗 -->
		<view class="purchase-popup" :class="{ 'show': showPurchasePopup }" @click="closePurchasePopup">
			<view class="popup-content" @click.stop>
				<view class="close-btn" @click="closePurchasePopup">
					<text class="iconfont">✕</text>
				</view>

				<view class="popup-goods-info">
					<image class="popup-goods-image" :src="goods_info.goods_big_logo" mode="aspectFill"></image>
					<view class="popup-goods-detail">
						<text class="popup-goods-name">{{ goods_info.goods_name }}</text>
						<text class="popup-goods-price">¥{{ goods_info.goods_price }}</text>
					</view>
				</view>

				<view class="address-section">
				    <view class="address-header">
				        <text class="iconfont location-icon">📍</text>
				        <text class="address-title">期待线下交易地点</text>
				        <text class="address-tip">(选填)</text>
				    </view>
				    
				    <!-- 修改这部分 -->
				    <view class="address-input-container">
				        <textarea 
				            class="address-input"
				            v-model="addressInput"
				            placeholder="请输入收货地址(可不填,付款后协商)"
				            placeholder-class="address-placeholder"
				            maxlength="200"
				            :auto-height="true"
				            :show-confirm-bar="false"
				        />
				    </view>
				    
				    <!-- 将保存按钮移到外面 -->
				    <view class="save-address-btn" 
				          v-if="addressInput.trim()"
				          @click.stop="saveAddress">
				        <text>💾 保存地址</text>
				    </view>
				    
				    <view class="saved-address" v-if="savedAddressText">
				        <text class="saved-label">已保存:</text>
				        <text class="saved-text">{{ savedAddressText }}</text>
				    </view>
				</view>

				<view class="payment-section">
				    <view class="payment-button" @click="handleWechatPay">
				        <text class="transaction-icon">🤝</text>
				        <text class="payment-text">确认发起交易</text>
				    </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				memberCode: 'x***3',
				// 聊天消息列表
				messages: [],
				// 输入框内容
				inputText: '',
				// 滚动到的消息ID
				scrollIntoView: '',
				// 商品信息
				goods_info: [],
				// 轮询定时器
				pollingTimer: null,
				// 轮询间隔(毫秒) - 建议2-5秒
				pollingInterval: 3000,
				// 是否正在请求中(防止重复请求)
				isRequesting: false,
				// 最后一条消息的ID(用于判断是否有新消息)
				lastMessageId: null,
				otherOpenid: '',
				other_nickname: '',
				other_avatarUrl: '',
				// 购买弹窗相关
				showPurchasePopup: false,
				// 收货地址输入框
				addressInput: '',
				// 当前订单信息
				currentOrder: null,
				 // 新增：表情包相关
				        showEmojiPanel: false,  // 控制表情面板显示
						emojiList: [
							{ id: 1, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-1.png', name: '[微笑]' },
							{ id: 2, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-2.png', name: '[大笑]' },
							{ id: 3, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-3.png', name: '[笑哭]' },
							{ id: 4, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-4.png', name: '[难过]' },
							{ id: 5, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-5.png', name: '[大哭]' },
							{ id: 6, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-6.png', name: '[疑问]' },
							{ id: 7, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-7.png', name: '[爱心]' },
							{ id: 8, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-8.png', name: '[得意]' },
							{ id: 9, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-9.png', name: '[惊恐]' },
						],
						// 新增：图片上传相关
						uploading: false,
						transactionStatus: 0, // 0=无交易, 1=买家发起待确认, 2=卖家同意交易中, 3=交易完成
						isTransactionInitiator: false, // 是否是交易发起方(买家)
								// 🔥 新增：交易过期时间(7天，单位毫秒)
						TRANSACTION_EXPIRE_TIME: 7 * 24 * 60 * 60 * 1000,
						 // 🔥 新增：新消息提示相关
						      showNewMessageTip: false,      // 是否显示新消息提示
						      newMessageCount: 0,             // 新消息数量
						      scrollTop: 0,                   // 当前滚动位置
						      scrollThreshold: 100,           // 阈值(rpx)，距离底部多少时显示提示
						      isNearBottom: true,             // 是否接近底部
						      lastMessagesLength: 0,          // 上一次的消息数量
							  scrollViewHeight: 0,
							
			};
		},
		async onLoad(options) {
			const queryObj = {code: this.openid};
			const { data: res1 } = await uni.$http.get('/users/userinfo', queryObj);
			if (res1.meta.status === 200) {
				console.log(res1.message)
				this.updateUserBase(res1.message)
			}
			try {
				if (options && options.goods_info) {
					const chatData  = JSON.parse(decodeURIComponent(options.goods_info)) || null;
					// 判断是否传了 other_openid
					if (chatData.other_openid) {
						// 接收完整数据(包含 other_openid)
						this.goods_info = chatData;
						this.otherOpenid = chatData.other_openid;
						console.log('接收到 other_openid:', this.otherOpenid);
						const queryObj1 = {code: chatData.other_openid};
						const { data: res1 } = await uni.$http.get('/users/userinfo', queryObj1);
						if (res1.meta.status === 200) {
							this.other_nickname = res1.message.nickname
							this.other_avatarUrl = res1.message.avatarUrl
						}
					} else {
						// 只接收 goods_info
						this.goods_info = chatData;
						console.log('只接收 goods_info');
					}
				}
				
			} catch (e) {
				console.warn('publisher 解析失败:', e)
				this.goods_info = null
			}
			
			// 初始化加载消息
			await this.loadMessages();
			
			// 🔥 新增：初始化消息数量
			  this.lastMessagesLength = this.messages.length;
			  
			// 加载当前商品的订单状态
			await this.loadCurrentOrder();
			
			// 启动轮询
			this.startPolling();
			
			// 加载本地保存的地址
			this.loadLocalAddress();
			
			// 🔥 新增：确保初始位置在底部
			  this.$nextTick(() => {
			    this.scrollToBottom();
			    this.isNearBottom = true;
			  });
		},
		
		// 页面隐藏时停止轮询
		onHide() {
			this.stopPolling();
		},
		
		// 添加 onReady 生命周期
		onReady() {
		    uni.createSelectorQuery()
		        .select('.chat-content')
		        .boundingClientRect((rect) => {
		            if (rect) {
		                this.scrollViewHeight = rect.height;
		                console.log('📏 聊天区域高度:', this.scrollViewHeight);
		            }
		        })
		        .exec();
		},
		
		// 页面显示时恢复轮询
		async onShow() {
			if (this.goods_info && this.goods_info.goods_id) {
				this.startPolling();
			}
			// 重新加载本地地址(可能在其他页面被修改)
			await this.loadLocalAddress();
			// 重新加载订单状态
			await this.loadCurrentOrder();
		},
		
		// 页面卸载时停止轮询
		onUnload() {
			this.stopPolling();
		},
		
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase', 'updateAddress']),
			
			// 完整的 handleScroll
			handleScroll(e) {
			    const { scrollTop, scrollHeight, deltaY } = e.detail;
			    this.scrollTop = scrollTop;
			    
			    // 计算距离底部的距离
			    let distanceToBottom = 0;
			    if (this.scrollViewHeight > 0) {
			        distanceToBottom = scrollHeight - scrollTop - this.scrollViewHeight;
			        this.isNearBottom = distanceToBottom < this.scrollThreshold;
			    } else {
			        // 降级方案：使用百分比
			        const scrollPercentage = scrollTop / scrollHeight;
			        this.isNearBottom = scrollPercentage > 0.95;
			    }
			    
			    console.log('📊', {
			        scrollTop: scrollTop.toFixed(0),
			        scrollHeight,
			        viewHeight: this.scrollViewHeight,
			        distanceToBottom: distanceToBottom.toFixed(0),
			        isNearBottom: this.isNearBottom
			    });
			    
			    // 滚动到底部时清除提示
			    if (this.isNearBottom && this.showNewMessageTip) {
			        this.showNewMessageTip = false;
			        this.newMessageCount = 0;
			    }
			},
			  
			  /**
			   * 🔥 触底事件
			   */
			  handleScrollToLower() {
			    this.isNearBottom = true;
			    if (this.showNewMessageTip) {
			      this.showNewMessageTip = false;
			      this.newMessageCount = 0;
			    }
			  },
			  
			  /**
			   * 🔥 点击新消息提示跳转到底部
			   */
			  scrollToBottomWithTip() {
			    this.showNewMessageTip = false;
			    this.newMessageCount = 0;
			    this.isNearBottom = true;
			    
			    this.$nextTick(() => {
			      this.scrollToBottom();
			    });
			  },
			  
			/**
			         * 🔥 新增：检查交易是否过期
			         */
			        async checkTransactionExpiration() {
			            try {
			                // 查找最后一条交易消息
			                const lastTransactionMsg = [...this.messages]
			                    .reverse()
			                    .find(msg => msg.message_type === 'transaction');
			                
			                if (!lastTransactionMsg) {
			                    return;
			                }
			                
			                // 检查是否已经有同意、完成或系统关闭消息
			                const hasAgreeMsg = this.messages.some(msg => msg.message_type === 'agree');
			                const hasFinishMsg = this.messages.some(msg => msg.message_type === 'finish');
			                const hasSystemCloseMsg = this.messages.some(msg => 
			                    msg.message_type === 'system' && 
			                    msg.content && 
			                    msg.content.includes('交易自动关闭')
			                );
			                
			                // 如果已经有后续操作，不需要检查过期
			                if (hasAgreeMsg || hasFinishMsg || hasSystemCloseMsg) {
			                    return;
			                }
			                
			                // 解析交易消息时间戳（秒转毫秒）
			                const transactionTime = lastTransactionMsg.created_at * 1000;
			                const now = Date.now();
			                const timePassed = now - transactionTime;
			                
			                // 🔥 如果超过7天，发送系统消息关闭交易
			                if (timePassed > this.TRANSACTION_EXPIRE_TIME) {
			                    console.log('⏰ 交易已过期，自动关闭');
			                    await this.sendSystemCloseMessage();
			                }
			            } catch (error) {
			                console.error('❌ 检查交易过期失败:', error);
			            }
			        },
			        
			        /**
			         * 🔥 新增：发送系统关闭交易消息
			         */
			        async sendSystemCloseMessage() {
			            try {
			                const systemMessage = '因7天之内卖家没有同意，该交易自动关闭';
			                
			                const reqObj = {
			                    openid1: this.openid,
			                    openid2: this.userBase.openid !== this.goods_info.publisher_id 
			                            ? this.goods_info.publisher_id 
			                            : this.goods_info.other_openid,
			                    goods_id: this.goods_info.goods_id,
			                    senderid: 'system', // 🔥 标记为系统消息
			                    content: systemMessage,
			                    message_type: 'system',
			                };
			                
			                const { data: res } = await uni.$http.post('/chats/message', reqObj);
			                
			                if (res.meta.status === 200) {
			                    // 更新状态为无交易
			                    this.transactionStatus = 0;
			                    this.isTransactionInitiator = false;
			                    
			                    // 刷新消息列表
			                    const newMessages = this.processMessages(res.message.messages);
			                    this.messages = newMessages;
			                    
			                    if (newMessages.length > 0) {
			                        this.lastMessageId = newMessages[newMessages.length - 1].id || 
			                                            newMessages[newMessages.length - 1].created_at;
			                    }
			                    
			                    // 滚动到最新消息
			                    this.$nextTick(() => {
			                        this.scrollToBottom();
			                    });
			                    
			                    console.log('✅ 系统关闭交易消息已发送');
			                }
			            } catch (error) {
			                console.error('❌ 发送系统消息失败:', error);
			            }
			        },
					
			/**
			 * 买家确认交易完成
			 */
			async finish() {
			    try {
			        // 二次确认
			        const [err, res] = await uni.showModal({
			            title: '确认交易完成',
			            content: '确认已完成线下交易？确认后交易状态将变为已完成',
			            confirmText: '确认完成',
			            cancelText: '取消'
			        });
			        
			        if (err || !res.confirm) {
			            return;
			        }
			        
			        uni.showLoading({
			            title: '确认中...',
			            mask: true
			        });
			        
			        // 构建完成交易消息内容
			        const finishData = {
			            goods_id: this.goods_info.goods_id,
			            goods_name: this.goods_info.goods_name,
			            goods_price: this.goods_info.goods_price,
			            timestamp: Date.now()
			        };
			        
			        // 发送"交易完成"类型的消息
			        const reqObj = {
			            openid1: this.openid,
			            openid2: this.userBase.openid !== this.goods_info.publisher_id 
			                    ? this.goods_info.publisher_id 
			                    : this.goods_info.other_openid,
			            goods_id: this.goods_info.goods_id,
			            senderid: this.openid,
			            content: JSON.stringify(finishData),
			            message_type: 'finish',  // 🔥 交易完成消息类型
			        };
			        
			        const { data: res2 } = await uni.$http.post('/chats/message', reqObj);
			        
			        uni.hideLoading();
			        
			        if (res2.meta.status === 200) {
			            // 更新状态为交易完成
			            this.transactionStatus = 3;
			            
			            // 刷新消息列表
			            const newMessages = this.processMessages(res2.message.messages);
			            this.messages = newMessages;
			            
			            if (newMessages.length > 0) {
			                this.lastMessageId = newMessages[newMessages.length - 1].id || 
			                                    newMessages[newMessages.length - 1].created_at;
			            }
			            
			            uni.showToast({
			                title: '交易已完成',
			                icon: 'success',
			                duration: 2000
			            });
			            
			            // 滚动到最新消息
			            this.$nextTick(() => {
			                this.scrollToBottom();
			            });
			        } else {
			            uni.showToast({
			                title: res2.meta.msg || '操作失败',
			                icon: 'none'
			            });
			        }
			    } catch (error) {
			        uni.hideLoading();
			        console.error('确认交易完成失败:', error);
			        uni.showToast({
			            title: '操作失败',
			            icon: 'none'
			        });
			    }
			},


			/**
			 * 预览表情包(放大查看)
			 */
			previewEmoji(emojiUrl) {
			    uni.previewImage({
			        current: emojiUrl,
			        urls: [emojiUrl]
			    });
			},
			
			 /**
			     * 选择表情包发送
			     */
			    async selectEmoji(emoji) {
			        try {
			            const reqObj = {
			                openid1: this.openid,
			                openid2: this.userBase.openid !== this.goods_info.publisher_id 
			                        ? this.goods_info.publisher_id 
			                        : this.goods_info.other_openid,
			                goods_id: this.goods_info.goods_id,
			                senderid: this.openid,
			                content: emoji.url,
			                message_type: 'emoji',  // 标记为图片消息
			                // sub_type: 'emoji'       // 标记为表情包
			            };
			            
			            const { data: res } = await uni.$http.post('/chats/message', reqObj);
			            
			            if (res.meta.status === 200) {
			                const newMessages = this.processMessages(res.message.messages);
			                this.messages = newMessages;
			                
			                if (newMessages.length > 0) {
			                    this.lastMessageId = newMessages[newMessages.length - 1].id || 
			                                        newMessages[newMessages.length - 1].created_at;
			                }
			                
			                this.$nextTick(() => {
			                    this.scrollToBottom();
			                });
			                
			                // 发送成功后关闭表情面板
			                this.showEmojiPanel = false;
			            }
			        } catch (error) {
			            console.error('❌ 发送表情失败:', error);
			            uni.showToast({
			                title: '发送失败',
			                icon: 'none'
			            });
			        }
			    },
				
			/**
			 * 加载当前商品的订单状态
			 */
			async loadCurrentOrder() {
				try {
					// 假设后端有一个接口可以查询当前用户对该商品的最新订单
					const { data: res } = await uni.$http.get('/orders/current', {
						user_openid: this.userBase.openid,
						goods_id: this.goods_info.goods_id,
						_hideLoading: true
					});
					
					if (res.code === 200 && res.data) {
						this.currentOrder = res.data;
						console.log('📦 当前订单状态:', this.currentOrder);
					} else {
						this.currentOrder = null;
					}
				} catch (error) {
					console.error('❌ 加载订单状态失败:', error);
					this.currentOrder = null;
				}
			},
			
			/**
			 * 确认收货
			 */
			async confirmReceipt() {
				// 二次确认
				const [err, res] = await uni.showModal({
					title: '确认收货',
					content: '确认已收到商品?收货后款项将转入卖家账户',
					confirmText: '确认收货',
					cancelText: '取消'
				});
				
				if (err || !res.confirm) {
					return;
				}
				
				try {
					uni.showLoading({
						title: '处理中...',
						mask: true
					});
					
					const { data: result } = await uni.$http.post('/orders/confirm_receipt', {
						order_number: this.currentOrder.order_number,
						openid: this.userBase.openid
					});
					
					uni.hideLoading();
					
					if (result.meta.status === 200) {
						uni.showToast({
							title: '确认收货成功',
							icon: 'success',
							duration: 2000
						});
						
						// 更新订单状态
						this.currentOrder.order_status = 3;
						
						// 发送确认收货消息
						await this.sendPaymentMessage('我已确认收货,交易完成!');
						
						// 刷新消息列表
						await this.loadMessages();
					} else {
						uni.showToast({
							title: result.meta.msg || '确认收货失败',
							icon: 'none',
							duration: 2000
						});
					}
				} catch (error) {
					uni.hideLoading();
					console.error('❌ 确认收货失败:', error);
					uni.showToast({
						title: '确认收货失败,请重试',
						icon: 'none',
						duration: 2000
					});
				}
			},
			
			/**
			 * 🔥 修改：加载消息时检查是否有新消息
			 */
			async loadMessages(silent = false) {
			  if (this.isRequesting) return;
			  
			  this.isRequesting = true;
			  
			  try {
			    const req = {
			      openid1: this.openid,
			      openid2: this.userBase.openid !== this.goods_info.publisher_id 
			              ? this.goods_info.publisher_id 
			              : this.goods_info.other_openid,
			      goods_id: this.goods_info.goods_id,
			      _hideLoading: true
			    };
			    
			    const { data: res } = await uni.$http.get('/chats/message', req);
			    
			    if (res.meta.status === 200) {
			      const newMessages = this.processMessages(res.message.messages);
			      
			      if (newMessages.length > 0) {
			        const newLastMessageId = newMessages[newMessages.length - 1].id || 
			                                newMessages[newMessages.length - 1].created_at;
			        
			        // 🔥 新增：检测是否有新消息
			        if (this.lastMessageId !== newLastMessageId) {
			          const hadMessages = this.messages.length > 0;
			          const oldLength = this.messages.length;
			          
			          this.messages = newMessages;
			          this.lastMessageId = newLastMessageId;
			          
			          await this.checkTransactionExpiration();
			          
			          // 🔥 新增：处理新消息逻辑
			          if (hadMessages && !silent) {
			            const newMessagesCount = newMessages.length - oldLength;
			            
			            // 检查最后一条消息是否是别人发的
			            const lastMessage = newMessages[newMessages.length - 1];
			            const isFromOther = lastMessage.openid !== this.openid && 
			                               lastMessage.message_type !== 'system';
			            
			            if (newMessagesCount > 0 && isFromOther) {
			              if (this.isNearBottom) {
			                // 如果接近底部，自动滚动
			                this.$nextTick(() => {
			                  this.scrollToBottom();
			                });
			              } else {
			                // 如果不在底部，显示提示
			                this.newMessageCount += newMessagesCount;
			                this.showNewMessageTip = true;
			              }
			            } else {
			              // 自己发的消息，直接滚动到底部
			              this.$nextTick(() => {
			                this.scrollToBottom();
			              });
			            }
			          }
			        }
			      } else {
			        this.messages = newMessages;
			      }
			    }
			  } catch (error) {
			    console.error('加载消息失败:', error);
			  } finally {
			    this.isRequesting = false;
			  }
			},
			
			// 启动轮询
			startPolling() {
				// 先清除可能存在的定时器
				this.stopPolling();
				
				// 启动新的定时器
				this.pollingTimer = setInterval(() => {
					this.loadMessages(true); // silent=true 静默加载,不显示提示
					this.loadCurrentOrder(); // 同时轮询订单状态
				}, this.pollingInterval);
			},
			
			// 停止轮询
			stopPolling() {
				if (this.pollingTimer) {
					clearInterval(this.pollingTimer);
					this.pollingTimer = null;
				}
			},
			
			// 返回上一页
			goBack() {
				uni.navigateBack();
			},
			
			// 显示更多操作
			showMoreOptions() {
				uni.showActionSheet({
					itemList: ['举报'],
					success: (res) => {
						if (res.tapIndex === 0) {
							this.reportUser()
						}
					}
				});
			},
			
			// 举报用户
					reportUser() {
						// 安全检查
						if (!this.openid) {
							uni.switchTab({
							  url: '/pages/my/my',
							});
							return;
						}
			
						// 弹出一个可编辑的输入框
						uni.showModal({
							title: '请输入您举报该用户的理由:',
							editable: true, // 显示输入框
							placeholderText: '例如：涉及人身攻击、广告等',
							success: async (res) => {
								// 检查用户是否点击了“确定”
								if (res.confirm) {
									const reason = res.content.trim() // 获取输入框内容
									
									// 验证理由是否为空
									if (!reason) {
										uni.showToast({
											title: '举报理由不能为空',
											icon: 'none'
										})
										return
									}
			
									// 准备提交到后端的数据
									const reportData = {
										reporter_openid: this.openid, // 举报人 (当前用户)
										reported_openid: this.goods_info.publisher_id, // 被举报人 (帖子作者)
										post_id: 0, 
										goods_id: this.goods_info.goods_id, // 相关帖子ID
										reason: reason // 举报理由
									}
									
									console.log('提交举报:', reportData)
			
									try {
										// 调用后端 /users/report 接口
										const { data: apiRes } = await uni.$http.post('/users/report', reportData)
			
										// 根据后端返回的状态码处理
										if (apiRes.meta.status === 201) {
											uni.showToast({
												title: '举报成功，我们会尽快核实',
												icon: 'success'
											})
										} else {
											// 显示后端返回的错误信息
											throw new Error(apiRes.meta.msg || '举报失败')
										}
									} catch (error) {
										console.error('举报失败:', error)
										uni.showToast({
											title: error.message || '举报时发生错误',
											icon: 'none'
										})
									}
								}
							}
						})
					},
					
			// 立即购买 - 显示弹窗
			buyNow() {
				this.showPurchasePopup = true;
				// 每次打开弹窗时重新加载地址
				this.loadLocalAddress();
			},
			
			// 关闭购买弹窗
			closePurchasePopup() {
				this.showPurchasePopup = false;
			},
			
			// 加载本地保存的地址
			loadLocalAddress() {
				// 从 Vuex 中获取本地保存的地址
				if (this.address && typeof this.address === 'object' && Object.keys(this.address).length > 0) {
					// 如果地址对象有 fullAddress 字段,直接使用
					if (this.address.fullAddress) {
						this.addressInput = this.address.fullAddress;
					} 
					// 如果是结构化地址,拼接显示
					else if (this.address.provinceName || this.address.cityName) {
						const addressParts = [
							this.address.provinceName,
							this.address.cityName,
							this.address.countyName,
							this.address.detailInfo
						].filter(part => part); // 过滤掉空值
						this.addressInput = addressParts.join(' ');
					}
				}
			},
			
			// 保存收货地址
			saveAddress() {
				const address = this.addressInput.trim();
				
				// 验证地址不能为空
				if (!address) {
					uni.showToast({
						title: '请输入收货地址',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				
				try {
					// 构建地址对象
					const addressObj = {
						fullAddress: address,
						timestamp: Date.now() // 添加时间戳
					};
					
					// 调用 Vuex 的 updateAddress 方法保存地址
					this.updateAddress(addressObj);
					
					uni.showToast({
						title: '地址保存成功',
						icon: 'success',
						duration: 1500
					});
					
					console.log('地址已保存:', addressObj);
				} catch (error) {
					console.error('保存地址失败:', error);
					uni.showToast({
						title: '保存失败,请重试',
						icon: 'none',
						duration: 2000
					});
				}
			},
			
			/**
			 * 发送支付专属消息
			 * @param {string} content - 消息内容
			 */
			async sendPaymentMessage(content) {
				try {
					const reqObj = {
						openid1: this.openid,
						openid2: this.userBase.openid !== this.goods_info.publisher_id 
								? this.goods_info.publisher_id 
								: this.goods_info.other_openid,
						goods_id: this.goods_info.goods_id,
						senderid: this.openid,
						content: content,
						is_payment: 1  // 标记为支付消息
					};
					
					const { data: res } = await uni.$http.post('/chats/message', reqObj);
					
					if (res.meta.status === 200) {
						console.log('✅ 支付消息发送成功');
						return true;
					}
					return false;
				} catch (error) {
					console.error('❌ 发送支付消息失败:', error);
					return false;
				}
			},
			
			// 处理线下交易请求
			async handleWechatPay() {
			    const finalAddress = this.addressInput.trim();
			    
			    try {
			        uni.showLoading({
			            title: '发送中...',
			            mask: true
			        });
			        
			        // 构建交易消息内容（使用JSON格式存储）
			        const transactionData = {
			            goods_id: this.goods_info.goods_id,
			            goods_name: this.goods_info.goods_name,
			            goods_price: this.goods_info.goods_price,
			            location: finalAddress || null,
			            timestamp: Date.now()
			        };
			        
			        // 发送交易类型消息
			        const reqObj = {
			            openid1: this.openid,
			            openid2: this.userBase.openid !== this.goods_info.publisher_id 
			                    ? this.goods_info.publisher_id 
			                    : this.goods_info.other_openid,
			            goods_id: this.goods_info.goods_id,
			            senderid: this.openid,
			            content: JSON.stringify(transactionData),  // 将数据序列化为JSON
			            message_type: 'transaction',  // 新的消息类型
			            location: finalAddress || null  // 额外保存地点字段
			        };
			        
			        const { data: res } = await uni.$http.post('/chats/message', reqObj);
			        
			        uni.hideLoading();
			        
			        if (res.meta.status === 200) {
			            // 刷新消息列表
			            const newMessages = this.processMessages(res.message.messages);
			            this.messages = newMessages;
			            
			            if (newMessages.length > 0) {
			                this.lastMessageId = newMessages[newMessages.length - 1].id || 
			                                    newMessages[newMessages.length - 1].created_at;
			            }
			            
						 // 🔥 新增: 更新交易状态
						    this.transactionStatus = 1; // 买家发起交易,等待卖家确认
						    this.isTransactionInitiator = true; // 标记为交易发起方
							
			            // 关闭弹窗
			            this.closePurchasePopup();
			            
			            // 显示成功提示
			            uni.showToast({
			                title: '交易请求已发送',
			                icon: 'success',
			                duration: 2000
			            });
			            
			            // 滚动到最新消息
			            this.$nextTick(() => {
			                this.scrollToBottom();
			            });
			        } else {
			            uni.showToast({
			                title: res.meta.msg || '发送失败',
			                icon: 'none',
			                duration: 2000
			            });
			        }
			    } catch (error) {
			        uni.hideLoading();
			        console.error('❌ 发送交易请求失败:', error);
			        uni.showToast({
			            title: '发送失败，请重试',
			            icon: 'none',
			            duration: 2000
			        });
			    }
			},

			// // 处理微信支付
			// async handleWechatPay() {
			// 	// 地址变为选填,所以去掉强制验证
			// 	const finalAddress = this.addressInput.trim();
				
			// 	try {
			// 		uni.showLoading({
			// 			title: '创建订单中...',
			// 			mask: true
			// 		});
					
			// 		// 1. 创建订单
			// 		const orderInfo = {
			// 			//order_price: this.goods_info.goods_price,  // 使用实际价格
			// 			order_price: 0.1,
			// 			consignee_addr: finalAddress || null,  // 允许为空
			// 			goods: this.goods_info,
			// 			openid: this.openid
			// 		};
					
			// 		const { data: res } = await uni.$http.post('/orders/create', orderInfo);
					
			// 		if (res.meta.status !== 200) {
			// 			uni.hideLoading();
			// 			return uni.$showMsg('创建订单失败！');
			// 		}
					
			// 		const orderNumber = res.message.order_number;
			// 		console.log('📝 订单创建成功:', orderNumber);
					
			// 		uni.showLoading({
			// 			title: '准备支付...',
			// 			mask: true
			// 		});
					
			// 		// 2. 订单预支付
			// 		const { data: res2 } = await uni.$http.post('/orders/req_unifiedorder', { 
			// 			order_number: orderNumber 
			// 		});
					
			// 		if (res2.meta.status !== 200) {
			// 			uni.hideLoading();
			// 			return uni.$showMsg('预付订单生成失败！');
			// 		}
					
			// 		const payInfo = res2.message.pay;
			// 		console.log('💳 预支付信息获取成功');
					
			// 		uni.hideLoading();
					
			// 		// 3. 发起微信支付
			// 		const [err, succ] = await uni.requestPayment(payInfo);
					
			// 		if (err) {
			// 			console.log('❌ 用户取消支付');
			// 			return uni.$showMsg('订单未支付！');
			// 		}
					
			// 		console.log('✅ 支付成功,验证订单状态...');
					
			// 		uni.showLoading({
			// 			title: '验证支付状态...',
			// 			mask: true
			// 		});
					
			// 		// 4. 验证订单支付状态
			// 		const { data: res3 } = await uni.$http.post('/orders/chkOrder', { 
			// 			order_number: orderNumber 
			// 		});
					
			// 		uni.hideLoading();
					
			// 		if (res3.meta.status !== 200) {
			// 			return uni.$showMsg('订单未支付！');
			// 		}
					
			// 		// 5. 支付成功后发送专属消息
			// 		let paymentMessage = '';
			// 		if (finalAddress) {
			// 			paymentMessage = `我已付款,选择的交易地点为: ${finalAddress}`;
			// 		} else {
			// 			paymentMessage = '我已付款,请我们协商交易地点';
			// 		}
					
			// 		// 发送支付消息
			// 		await this.sendPaymentMessage(paymentMessage);
					
			// 		// 6. 更新当前订单状态
			// 		this.currentOrder = {
			// 			order_number: orderNumber,
			// 			pay_status: 1,
			// 			order_status: 1,  // 待发货
			// 			consignee_addr: finalAddress
			// 		};
					
			// 		// 7. 刷新消息列表
			// 		await this.loadMessages();
					
			// 		// 8. 关闭弹窗
			// 		this.closePurchasePopup();
					
			// 		// 9. 显示成功提示
			// 		uni.showToast({
			// 			title: '支付成功!',
			// 			icon: 'success',
			// 			duration: 2000
			// 		});
					
			// 		// 10. 滚动到最新消息
			// 		this.$nextTick(() => {
			// 			this.scrollToBottom();
			// 		});
					
			// 	} catch (error) {
			// 		uni.hideLoading();
			// 		console.error('❌ 订单支付失败:', error);
			// 		uni.showToast({
			// 			title: '订单支付失败',
			// 			icon: 'none',
			// 			duration: 2000
			// 		});
			// 	}
			// },
			
			// 发送消息
			async sendMessage() {
				if (!this.inputText.trim()) {
					return;
				}
				
				const newMessage = this.inputText;
				this.inputText = '';
				
				try {
					// 发送消息到后端
					const requyObj = {
						openid1: this.openid,
						openid2: this.userBase.openid !== this.goods_info.publisher_id 
								? this.goods_info.publisher_id 
								: this.goods_info.other_openid,
						goods_id: this.goods_info.goods_id,
						senderid: this.openid,
						content: newMessage,
						message_type: 'text',
					};
					
					const { data: res } = await uni.$http.post('/chats/message', requyObj)
					
					if (res.meta.status === 200) {
						// 发送成功后立即刷新消息列表
						const newMessages = this.processMessages(res.message.messages);
						this.messages = newMessages;
						
						// 更新最后一条消息ID
						if (newMessages.length > 0) {
							this.lastMessageId = newMessages[newMessages.length - 1].id || 
												newMessages[newMessages.length - 1].created_at;
						}
						
						// 滚动到底部
						this.$nextTick(() => {
							this.scrollToBottom();
						});
					}
				} catch (error) {
					console.error('发送消息失败:', error);
					uni.showToast({
						title: '发送失败',
						icon: 'none'
					});
				}
			},
			
			showEmojiPicker() {
			        this.showEmojiPanel = !this.showEmojiPanel;
			    },
			
			   /**
			     * 显示添加菜单 - 修改原方法
			     */
			    showAddMenu() {
			        uni.showActionSheet({
			            itemList: ['从相册选择', '拍照'],
			            success: (res) => {
			                if (res.tapIndex === 0) {
			                    this.chooseImageFromAlbum();
			                } else if (res.tapIndex === 1) {
			                    this.chooseImageFromCamera();
			                }
			            }
			        });
			    },
				 /**
				     * 从相册选择图片
				     */
				    chooseImageFromAlbum() {
				        uni.chooseImage({
				            count: 1,
				            sizeType: ['compressed'],
				            sourceType: ['album'],
				            success: (res) => {
				                this.uploadAndSendImage(res.tempFilePaths);
				            }
				        });
				    },
					
					 /**
					     * 拍照
					     */
					    chooseImageFromCamera() {
					        uni.chooseImage({
					            count: 1,
					            sizeType: ['compressed'],
					            sourceType: ['camera'],
					            success: (res) => {
					                this.uploadAndSendImage(res.tempFilePaths);
					            }
					        });
					    },
						
						/**
						     * 上传并发送图片
						     */
						    async uploadAndSendImage(filePaths) {
						        if (!filePaths || filePaths.length === 0) {
						            return;
						        }
						        
						        this.uploading = true;
						        uni.showLoading({
						            title: '上传中...',
						            mask: true
						        });
						        
						        try {
						            const filePath = filePaths[0];
						            
						            // 1. 获取上传凭证
						            const { data: tokenRes } = await uni.$http.get('/upload/token', {
						                openid: this.openid,
						                fileType: 'image'
						            });
						            
						            if (tokenRes.meta.status !== 200) {
						                throw new Error('获取上传凭证失败');
						            }
						            
						            // 2. 读取文件内容
						            const fileContent = await new Promise((resolve, reject) => {
						                uni.getFileSystemManager().readFile({
						                    filePath: filePath,
						                    encoding: 'base64',
						                    success: (res) => resolve(res.data),
						                    fail: reject
						                });
						            });
						            
						            // 3. 上传到OSS
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
						                            resolve(res);
						                        } else {
						                            reject(new Error(`上传失败: ${res.statusCode}`));
						                        }
						                    },
						                    fail: reject
						                });
						            });
						            
						            const imageUrl = tokenRes.message.publicUrl;
						            
						            uni.hideLoading();
						            
						            // 4. 发送图片消息
						            const reqObj = {
						                openid1: this.openid,
						                openid2: this.userBase.openid !== this.goods_info.publisher_id 
						                        ? this.goods_info.publisher_id 
						                        : this.goods_info.other_openid,
						                goods_id: this.goods_info.goods_id,
						                senderid: this.openid,
						                content: imageUrl,
						                message_type: 'image',  // 标记为图片消息
						                sub_type: 'image'       // 标记为普通图片
						            };
						            
						            const { data: res } = await uni.$http.post('/chats/message', reqObj);
						            
						            if (res.meta.status === 200) {
						                const newMessages = this.processMessages(res.message.messages);
						                this.messages = newMessages;
						                
						                if (newMessages.length > 0) {
						                    this.lastMessageId = newMessages[newMessages.length - 1].id || 
						                                        newMessages[newMessages.length - 1].created_at;
						                }
						                
						                this.$nextTick(() => {
						                    this.scrollToBottom();
						                });
						            }
						            
						        } catch (error) {
						            console.error('❌ 上传图片失败:', error);
						            uni.hideLoading();
						            uni.showToast({
						                title: error.message || '上传失败',
						                icon: 'none',
						                duration: 2000
						            });
						        } finally {
						            this.uploading = false;
						        }
						    },
							
							/**
							     * 预览图片
							     */
							    previewImage(imageUrl) {
							        // 收集所有图片消息的URL
							        const imageUrls = this.messages
							            .filter(msg => msg.message_type === 'image')
							            .map(msg => msg.content);
							        
							        uni.previewImage({
							            current: imageUrl,
							            urls: imageUrls
							        });
							    },
								
					
			
			// 滚动到底部
			scrollToBottom() {
				if (this.messages.length > 0) {
					this.scrollIntoView = 'msg-' + (this.messages.length - 1);
				}
			},
			
			// 格式化时间
			formatTime(date) {
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				const hour = String(date.getHours()).padStart(2, '0');
				const minute = String(date.getMinutes()).padStart(2, '0');
				return `${month}-${day} ${hour}:${minute}`;
			},
			
			/**
			         * 🔥 修改：处理消息时识别系统消息
			         */
			        processMessages(messages) {
			            if (!Array.isArray(messages)) {
			                console.log("messages不是数组");
			                return [];
			            }
			            
			            // 检查是否有系统关闭消息
			            const hasSystemCloseMsg = messages.some(msg => 
			                msg.message_type === 'system' && 
			                msg.content && 
			                msg.content.includes('交易自动关闭')
			            );
			            
			            // 🔥 如果有系统关闭消息，重置交易状态
			            if (hasSystemCloseMsg) {
			                this.transactionStatus = 0;
			                this.isTransactionInitiator = false;
			            } else {
			                // 原有的状态检查逻辑
			                const hasTransactionMessage = messages.some(msg => msg.message_type === 'transaction');
			                const hasAgreeMessage = messages.some(msg => msg.message_type === 'agree');
			                const hasFinishMessage = messages.some(msg => msg.message_type === 'finish');
			                
			                if (hasFinishMessage) {
			                    this.transactionStatus = 3;
			                } else if (hasAgreeMessage) {
			                    this.transactionStatus = 2;
			                } else if (hasTransactionMessage) {
			                    const latestTransaction = [...messages]
			                        .reverse()
			                        .find(msg => msg.message_type === 'transaction');
			                    
			                    if (latestTransaction) {
			                        if (latestTransaction.openid === this.openid) {
			                            this.transactionStatus = 1;
			                            this.isTransactionInitiator = true;
			                        } else {
			                            this.transactionStatus = 1;
			                            this.isTransactionInitiator = false;
			                        }
			                    }
			                }
			            }
			            
			            return messages.map(message => {
			                const processed = {
			                    ...message,
			                    type: message.openid === this.openid ? 'sent' : 
			                          message.message_type === 'system' ? 'system' : 'received', // 🔥 系统消息标记
			                    is_payment: message.is_payment || 0,
			                    message_type: message.message_type || 'text',
			                    sub_type: message.sub_type || null
			                };
			                
			                // 交易消息处理
			                if (message.message_type === 'transaction') {
			                    try {
			                        const transactionData = JSON.parse(message.content);
			                        processed.location = transactionData.location || message.location;
			                        processed.transactionData = transactionData;
			                    } catch (e) {
			                        console.error('解析交易消息失败:', e);
			                        processed.location = message.location;
			                    }
			                }
			                
			                // 同意消息处理
			                if (message.message_type === 'agree') {
			                    try {
			                        const agreeData = JSON.parse(message.content);
			                        processed.agreeData = agreeData;
			                    } catch (e) {
			                        console.error('解析同意消息失败:', e);
			                    }
			                }
			                
			                // 完成消息处理
			                if (message.message_type === 'finish') {
			                    try {
			                        const finishData = JSON.parse(message.content);
			                        processed.finishData = finishData;
			                    } catch (e) {
			                        console.error('解析完成消息失败:', e);
			                    }
			                }
			                
			                return processed;
			            });
			        },
			
		// 在 methods 中修改 agreeTransaction 方法
		async agreeTransaction() {
		    try {
		        uni.showLoading({
		            title: '确认中...',
		            mask: true
		        });
		        
		        // 🔥 构建同意交易消息内容
		        const agreeData = {
		            goods_id: this.goods_info.goods_id,
		            goods_name: this.goods_info.goods_name,
		            goods_price: this.goods_info.goods_price,
		            timestamp: Date.now()
		        };
		        
		        // 🔥 发送"同意交易"类型的消息
		        const reqObj = {
		            openid1: this.openid,
		            openid2: this.userBase.openid !== this.goods_info.publisher_id 
		                    ? this.goods_info.publisher_id 
		                    : this.goods_info.other_openid,
		            goods_id: this.goods_info.goods_id,
		            senderid: this.openid,
		            content: JSON.stringify(agreeData),
		            message_type: 'agree',  // 🔥 新增: 同意交易消息类型
		        };
		        
		        const { data: res } = await uni.$http.post('/chats/message', reqObj);
		        
		        uni.hideLoading();
		        
		        if (res.meta.status === 200) {
		            // 更新状态为交易进行中
		            this.transactionStatus = 2;
		            
		            // 刷新消息列表
		            const newMessages = this.processMessages(res.message.messages);
		            this.messages = newMessages;
		            
		            if (newMessages.length > 0) {
		                this.lastMessageId = newMessages[newMessages.length - 1].id || 
		                                    newMessages[newMessages.length - 1].created_at;
		            }
		            
		            uni.showToast({
		                title: '已同意交易',
		                icon: 'success'
		            });
		            
		            // 滚动到最新消息
		            this.$nextTick(() => {
		                this.scrollToBottom();
		            });
		        } else {
		            uni.showToast({
		                title: res.meta.msg || '操作失败',
		                icon: 'none'
		            });
		        }
		    } catch (error) {
		        uni.hideLoading();
		        console.error('同意交易失败:', error);
		        uni.showToast({
		            title: '操作失败',
		            icon: 'none'
		        });
		    }
		},
			
			
			// 跳转到商品详情
			async gotoDetail(item) {
				try {
					// 1. 先增加浏览次数
					console.log('📊 增加商品浏览次数:', item.goods_id);
					const { data: res } = await uni.$http.post('/goods/view', {
						goods_id: item.goods_id,
						// 可选：添加用户信息用于统计分析
						user_openid: this.openid || null
					});
				
					if (res.meta.status === 200) {
						console.log('✅ 浏览次数增加成功');
					} else {
						console.warn('⚠️ 浏览次数增加失败:', res.meta.msg);
					}
				} catch (error) {
					console.error('❌ 浏览次数增加接口错误:', error);
					// 即使接口失败也继续跳转，不影响用户体验
				}
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
		},
		computed: {
			...mapState('m_user', ['token', 'code', 'userBase', 'openid', 'address']),
			 // 🔥 新增：处理商品名称截断
			    displayGoodsName() {
			        if (!this.goods_info || !this.goods_info.goods_name) {
			            return '';
			        }
			        const name = this.goods_info.goods_name;
			        return name.length > 15 ? name.substring(0, 13) + '...' : name;
			    },
				
			// 显示已保存的地址文本
			savedAddressText() {
				if (this.address && this.address.fullAddress) {
					return this.address.fullAddress;
				}
				return '';
			}
		}
	}
</script>

<style lang="scss">
/* 原有样式保持不变 */
.chat-container {
	position: relative;
	height: 100vh;
	background-color: #f5f5f5;
}

.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	display: flex;
	align-items: center;
	height: 88rpx;
	padding: 0 24rpx;
	background-color: #ffffff;
	border-bottom: 1rpx solid #e5e5e5;
	
	.back-btn {
		font-size: 36rpx;
		color: #333333;
	}
	
	.seller-info {
		flex: 1;
		display: flex;
		align-items: center;
		margin-left: 20rpx;
		
		.seller-name {
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			margin-right: 16rpx;
		}
		
		.member-badge {
			font-size: 24rpx;
			color: #999999;
		}
	}
	
	.more-btn {
		font-size: 36rpx;
		color: #333333;
		.more_icons {
			width: 50rpx;
			height: 50rpx;
		}
	}
}

.goods-bar {
	position: fixed;
	top: 88rpx;
	left: 0;
	right: 0;
	z-index: 99;
	display: flex;
	align-items: center;
	padding: 20rpx 24rpx;
	background-color: #ffffff;
	border-bottom: 1rpx solid #e5e5e5;
	
	.goods-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
	}
	
	.goods-info {
		flex: 1;
		margin-left: 20rpx;
		
		.goods-name {
			display: block;
			font-size: 28rpx;
			color: #333333;
			margin-bottom: 8rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		
		.goods-price {
			font-size: 32rpx;
			font-weight: 600;
			color: #ff4444;
		}
	}
	
	.buy-btn,
	.waiting-btn,
	.agree-btn,
	.in-progress-btn,
	.completed-btn,
	.no-transaction-btn {
		padding: 16rpx 32rpx;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-weight: 500;
		white-space: nowrap;
	}
	
	.buy-btn {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: #ffffff;
	}
	
	.waiting-btn {
		background: linear-gradient(135deg, #ffa726 0%, #fb8c00 100%);
		color: #ffffff;
		opacity: 0.8;
	}
	
	.agree-btn {
		background: linear-gradient(135deg, #66bb6a 0%, #43a047 100%);
		color: #ffffff;
		animation: pulse 2s infinite;
	}
	
	.in-progress-btn {
		background: linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%);
		color: #ffffff;
		opacity: 0.8;
	}
	
	.completed-btn {
		background-color: #e5e5e5;
		color: #999999;
	}
	
	.no-transaction-btn {
		background-color: #f5f5f5;
		color: #999999;
		border: 1rpx solid #e5e5e5;
	}
}

@keyframes pulse {
	0%, 100% {
		transform: scale(1);
		box-shadow: 0 4rpx 12rpx rgba(102, 187, 106, 0.3);
	}
	50% {
		transform: scale(1.05);
		box-shadow: 0 6rpx 16rpx rgba(102, 187, 106, 0.5);
	}
}

.chat-content {
	position: fixed;
	top: 228rpx;
	bottom: 100rpx;
	left: 0;
	right: 0;
	padding: 20rpx 24rpx;
	
	.message-item {
		margin-bottom: 32rpx;
		
		.message-time {
			text-align: center;
			font-size: 24rpx;
			color: #999999;
			margin-bottom: 20rpx;
		}
		
		.system-message {
			display: flex;
			justify-content: center;
			margin: 24rpx 0;
			
			.system-text {
				padding: 12rpx 24rpx;
				background-color: #e0e0e0;
				color: #666666;
				font-size: 24rpx;
				border-radius: 16rpx;
				max-width: 500rpx;
				text-align: center;
				line-height: 1.5;
				box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
			}
		}
		
		.message-wrapper {
			display: flex;
			align-items: flex-end;
			
			&.left {
				justify-content: flex-start;
				
				/* 🔥 关键修改：左侧消息内容统一添加左边距 */
				.message-content {
					margin-left: 24rpx;
				}
			}
			
			&.right {
				justify-content: flex-end;
				padding-right: 16rpx;
				
				/* 🔥 关键修改：右侧消息内容统一添加右边距 */
				.message-content {
					margin-right: 24rpx;
				}
			}
			
			.avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 8rpx;
			}
			
			.message-bubble {
				max-width: 500rpx;
				padding: 20rpx 24rpx;
				border-radius: 8rpx;
				font-size: 28rpx;
				line-height: 1.5;
				word-wrap: break-word;
				
				&.left-bubble {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					color: #ffffff;
				}
				
				&.right-bubble {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					color: #ffffff;
				}
				
				&.payment-message {
					border: 2rpx solid #ff6b6b;
					background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
					color: #ff4444;
					font-weight: 500;
					box-shadow: 0 4rpx 12rpx rgba(255, 107, 107, 0.2);
					
					&.right-bubble {
						background: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%);
						color: #ffffff;
					}
				}
			}
		}
	}
}

.input-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
	display: flex;
	align-items: center;
	padding: 16rpx 24rpx;
	background-color: #ffffff;
	border-top: 1rpx solid #e5e5e5;
	transition: bottom 0.3s ease;
	
	.input-field {
		flex: 1;
		height: 68rpx;
		padding: 0 24rpx;
		background-color: #f5f5f5;
		border-radius: 34rpx;
		font-size: 28rpx;
	}
	
	.emoji-btn,
	.add-btn {
		margin-left: 16rpx;
		font-size: 48rpx;
		color: #666666;
	}
}

.new-message-tip {
	position: fixed;
	right: 32rpx;
	bottom: 180rpx;
	z-index: 99;
	opacity: 0;
	transform: translateY(20rpx) scale(0.8);
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	pointer-events: none;
	
	&.show {
		opacity: 1;
		transform: translateY(0) scale(1);
		pointer-events: auto;
	}
	
	.tip-content {
		display: flex;
		align-items: center;
		padding: 16rpx 24rpx;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: #ffffff;
		border-radius: 40rpx;
		box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.4);
		animation: tipPulse 2s infinite;
		
		.tip-icon {
			font-size: 32rpx;
			margin-right: 8rpx;
		}
		
		.tip-text {
			font-size: 26rpx;
			font-weight: 500;
			margin-right: 8rpx;
		}
		
		.tip-arrow {
			font-size: 28rpx;
			animation: bounce 1s infinite;
		}
	}
}

@keyframes tipPulse {
	0%, 100% {
		box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.4);
	}
	50% {
		box-shadow: 0 8rpx 32rpx rgba(102, 126, 234, 0.6);
	}
}

@keyframes bounce {
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(4rpx);
	}
}

.purchase-popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: none;
	justify-content: center;
	align-items: flex-end;
	z-index: 1000;
	
	&.show {
		display: flex;
		animation: fadeIn 0.3s ease;
	}
	
	.popup-content {
		width: 100%;
		max-height: 80vh;
		background-color: #ffffff;
		border-radius: 32rpx 32rpx 0 0;
		padding: 40rpx 32rpx;
		position: relative;
		animation: slideUp 0.3s ease;
		
		.close-btn {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 40rpx;
			color: #999999;
		}
		
		.popup-goods-info {
			display: flex;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #f0f0f0;
			margin-bottom: 30rpx;
			
			.popup-goods-image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 12rpx;
			}
			
			.popup-goods-detail {
				flex: 1;
				margin-left: 24rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				.popup-goods-name {
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					line-height: 1.4;
				}
				
				.popup-goods-price {
					font-size: 40rpx;
					font-weight: 600;
					color: #ff4444;
				}
			}
		}
		
		.address-section {
			margin-bottom: 30rpx;
			
			.address-header {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				
				.location-icon {
					font-size: 32rpx;
					margin-right: 8rpx;
				}
				
				.address-title {
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
				}
				
				.address-tip {
					font-size: 24rpx;
					color: #999999;
					margin-left: 8rpx;
				}
			}
			
			.address-input-container {
				position: relative;
				
				.address-input {
					width: 100%;
					min-height: 120rpx;
					padding: 20rpx;
					background-color: #f8f8f8;
					border-radius: 12rpx;
					font-size: 28rpx;
					color: #333333;
					line-height: 1.6;
					box-sizing: border-box;
				}
				
				.address-placeholder {
					color: #cccccc;
				}
			}
			
			.save-address-btn {
				width: 100%;
				margin-top: 20rpx;
				padding: 20rpx;
				background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
				color: #ffffff;
				border-radius: 12rpx;
				font-size: 28rpx;
				font-weight: 500;
				text-align: center;
				box-shadow: 0 4rpx 12rpx rgba(102, 126, 234, 0.3);
				transition: all 0.3s;
				
				&:active {
					transform: scale(0.98);
					box-shadow: 0 2rpx 8rpx rgba(102, 126, 234, 0.3);
				}
			}
			
			.saved-address {
				margin-top: 16rpx;
				padding: 16rpx;
				background-color: #f0f9ff;
				border-radius: 8rpx;
				border-left: 4rpx solid #667eea;
				
				.saved-label {
					font-size: 24rpx;
					color: #667eea;
					font-weight: 500;
					margin-right: 8rpx;
				}
				
				.saved-text {
					font-size: 26rpx;
					color: #666666;
					line-height: 1.5;
				}
			}
		}
		
		.payment-section {
			.payment-button {
				width: 100%;
				height: 88rpx;
				background: linear-gradient(135deg, #ff9800 0%, #ff6b00 100%);
				border-radius: 44rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				box-shadow: 0 8rpx 24rpx rgba(255, 152, 0, 0.3);
				
				.transaction-icon {
					font-size: 48rpx;
					margin-right: 12rpx;
				}
				
				.payment-text {
					font-size: 32rpx;
					font-weight: 600;
					color: #ffffff;
				}
			}
		}
	}
}

.emoji-panel {
	position: fixed;
	bottom: 100rpx;
	left: 0;
	right: 0;
	height: 500rpx;
	background-color: #f7f7f7;
	border-top: 1rpx solid #e5e5e5;
	transform: translateY(100%);
	transition: transform 0.3s ease;
	z-index: 98;
	
	&.show {
		transform: translateY(0);
	}
	
	.emoji-scroll {
		height: 100%;
		padding: 20rpx;
		
		.emoji-grid {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 20rpx;
			
			.emoji-item {
				aspect-ratio: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #ffffff;
				border-radius: 12rpx;
				transition: all 0.2s;
				
				&:active {
					transform: scale(0.95);
					background-color: #f0f0f0;
				}
				
				.emoji-image {
					width: 80%;
					height: 80%;
				}
			}
		}
	}
}

/* 🔥 关键修改：消息内容容器 - 移除所有内部 margin */
.message-content {
	max-width: 500rpx;
	
	/* 图片消息 */
	.message-image {
		max-width: 250rpx;
		max-height: 250rpx;
		min-width: 160rpx;
		min-height: 160rpx;
		border-radius: 12rpx;
		display: block;
		background-color: #f5f5f5;
		/* 🔥 移除 margin-right 和 margin-left */
	}
	
	/* 表情包消息 */
	.message-emoji {
		width: 120rpx;
		height: 120rpx;
		display: block;
		/* 🔥 移除 margin-right 和 margin-left */
	}
	
	/* 交易消息 */
	.transaction-message {
		max-width: none !important;
		padding: 0 !important;
		border-radius: 16rpx !important;
		/* 🔥 移除 margin-right 和 margin-left */
	}
	
	/* 同意消息 */
	.agree-message {
		max-width: none !important;
		padding: 0 !important;
		border-radius: 16rpx !important;
		/* 🔥 移除 margin-right 和 margin-left */
	}
	
	/* 完成消息 */
	.finish-message {
		max-width: none !important;
		padding: 0 !important;
		border-radius: 16rpx !important;
		/* 🔥 移除 margin-right 和 margin-left */
	}
}

.message-emoji:active {
	transform: scale(1.1);
	transition: transform 0.1s ease;
}

/* 交易消息样式 */
.transaction-message {
	width: 480rpx;
	background: linear-gradient(135deg, #fff9e6 0%, #fff3d6 100%);
	border: 2rpx solid #ffb800;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 12rpx rgba(255, 184, 0, 0.15);
	
	&.left-transaction {
		background: linear-gradient(135deg, #e8f5e9 0%, #dcedc8 100%);
		border-color: #4caf50;
		box-shadow: 0 4rpx 12rpx rgba(76, 175, 80, 0.15);
	}
	
	&.right-transaction {
		background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
		border-color: #2196f3;
		box-shadow: 0 4rpx 12rpx rgba(33, 150, 243, 0.15);
	}
	
	.transaction-header {
		display: flex;
		align-items: center;
		padding: 18rpx 20rpx;
		background: rgba(255, 255, 255, 0.5);
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
		
		.transaction-icon {
			font-size: 36rpx;
			margin-right: 10rpx;
		}
		
		.transaction-title {
			font-size: 28rpx;
			font-weight: 600;
			color: #333333;
		}
	}
	
	.transaction-body {
		padding: 18rpx 20rpx;
		
		.transaction-item {
			display: flex;
			align-items: flex-start;
			margin-bottom: 12rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.label {
				font-size: 26rpx;
				color: #666666;
				min-width: 120rpx;
				font-weight: 500;
			}
			
			.value {
				flex: 1;
				font-size: 26rpx;
				color: #333333;
				line-height: 1.5;
				word-break: break-all;
				
				&.price {
					color: #ff4444;
					font-weight: 600;
					font-size: 30rpx;
				}
				
				&.location {
					color: #2196f3;
				}
				
				&.tips {
					color: #999999;
					font-style: italic;
				}
			}
		}
	}
	
	.transaction-footer {
		padding: 16rpx 20rpx;
		background: rgba(0, 0, 0, 0.03);
		border-top: 1rpx solid rgba(0, 0, 0, 0.05);
		
		.status-text {
			font-size: 22rpx;
			color: #ff9800;
			font-weight: 500;
		}
	}
}

/* 同意交易消息样式 */
.agree-message {
	width: 480rpx;
	background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
	border: 2rpx solid #4caf50;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 12rpx rgba(76, 175, 80, 0.2);
	
	&.left-agree {
		background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
		border-color: #4caf50;
	}
	
	&.right-agree {
		background: linear-gradient(135deg, #a5d6a7 0%, #81c784 100%);
		border-color: #66bb6a;
	}
	
	.agree-header {
		display: flex;
		align-items: center;
		padding: 18rpx 20rpx;
		background: rgba(255, 255, 255, 0.6);
		border-bottom: 1rpx solid rgba(76, 175, 80, 0.1);
		
		.agree-icon {
			font-size: 36rpx;
			margin-right: 10rpx;
		}
		
		.agree-title {
			font-size: 28rpx;
			font-weight: 600;
			color: #2e7d32;
		}
	}
	
	.agree-body {
		padding: 18rpx 20rpx;
		
		.agree-item {
			display: flex;
			align-items: flex-start;
			margin-bottom: 12rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.label {
				font-size: 26rpx;
				color: #1b5e20;
				min-width: 120rpx;
				font-weight: 500;
			}
			
			.value {
				flex: 1;
				font-size: 26rpx;
				color: #2e7d32;
				line-height: 1.5;
				word-break: break-all;
				
				&.price {
					color: #f44336;
					font-weight: 600;
					font-size: 30rpx;
				}
			}
			
			.tips-text {
				width: 100%;
				font-size: 24rpx;
				color: #558b2f;
				text-align: center;
				padding: 8rpx 0;
				background: rgba(255, 255, 255, 0.5);
				border-radius: 8rpx;
			}
		}
	}
	
	.agree-footer {
		padding: 16rpx 20rpx;
		background: rgba(76, 175, 80, 0.1);
		border-top: 1rpx solid rgba(76, 175, 80, 0.1);
		
		.status-text {
			font-size: 22rpx;
			color: #2e7d32;
			font-weight: 600;
		}
	}
}

/* 完成交易消息样式 */
.finish-message {
	width: 480rpx;
	background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
	border: 2rpx solid #ff9800;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 12rpx rgba(255, 152, 0, 0.2);
	
	&.left-finish {
		background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
		border-color: #ff9800;
	}
	
	&.right-finish {
		background: linear-gradient(135deg, #ffcc80 0%, #ffb74d 100%);
		border-color: #f57c00;
	}
	
	.finish-header {
		display: flex;
		align-items: center;
		padding: 18rpx 20rpx;
		background: rgba(255, 255, 255, 0.6);
		border-bottom: 1rpx solid rgba(255, 152, 0, 0.1);
		
		.finish-icon {
			font-size: 36rpx;
			margin-right: 10rpx;
		}
		
		.finish-title {
			font-size: 28rpx;
			font-weight: 600;
			color: #e65100;
		}
	}
	
	.finish-body {
		padding: 18rpx 20rpx;
		
		.finish-item {
			display: flex;
			align-items: flex-start;
			margin-bottom: 12rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.label {
				font-size: 26rpx;
				color: #e65100;
				min-width: 120rpx;
				font-weight: 500;
			}
			
			.value {
				flex: 1;
				font-size: 26rpx;
				color: #f57c00;
				line-height: 1.5;
				word-break: break-all;
				
				&.price {
					color: #f44336;
					font-weight: 600;
					font-size: 30rpx;
				}
			}
			
			.tips-text {
				width: 100%;
				font-size: 24rpx;
				color: #ef6c00;
				text-align: center;
				padding: 8rpx 0;
				background: rgba(255, 255, 255, 0.5);
				border-radius: 8rpx;
			}
		}
	}
	
	.finish-footer {
		padding: 16rpx 20rpx;
		background: rgba(255, 152, 0, 0.1);
		border-top: 1rpx solid rgba(255, 152, 0, 0.1);
		
		.status-text {
			font-size: 22rpx;
			color: #e65100;
			font-weight: 600;
		}
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes slideUp {
	from {
		transform: translateY(100%);
	}
	to {
		transform: translateY(0);
	}
}
</style>
