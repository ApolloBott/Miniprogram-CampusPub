<template>
	<view class="chat-container">
		<view class="header">
			<view class="seller-info">
				<text class="seller-name">{{ other_nickname }}</text>
			</view>
			<view class="more-btn" @click="showMoreOptions">
				<image class="more_icons" src="/static/icons/more.png"></image>
			</view>
		</view>

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
		        <view v-if="msg.showTime" class="message-time">
		            {{ msg.time }}
		        </view>
		        
				<view v-if="msg.type === 'system'" class="system-message">
					<text class="system-text">{{ msg.content }}</text>
				</view>
						
		        <view v-if="msg.type === 'received'" class="message-wrapper left">
					<image class="avatar" :src="other_avatarUrl" mode="aspectFill"></image>
		            <view class="message-content">
		                <view v-if="msg.message_type === 'text' || !msg.message_type" 
		                      class="message-bubble left-bubble" 
		                      :class="{ 'payment-message': msg.is_payment }">
		                    <rich-text :nodes="parseContent(msg.content)"></rich-text>
		                </view>
		                <image v-else-if="msg.message_type === 'image'" 
		                       class="message-image"
		                       :src="msg.content" 
		                       mode="aspectFill"
		                       @click="previewImage(msg.content)"></image>
		                
		                <image v-else-if="msg.message_type === 'emoji'" 
		                       class="message-emoji"
		                       :src="msg.content" 
		                       mode="aspectFit"
		                       @click="previewEmoji(msg.content)"></image>
		            </view>
		        </view>
		
		       <view v-if="msg.type === 'sent'" class="message-wrapper right">
		           <view class="message-content">
		               <view v-if="msg.message_type === 'text' || !msg.message_type" 
		                     class="message-bubble right-bubble" 
		                     :class="{ 'payment-message': msg.is_payment }">
		                   <rich-text :nodes="parseContent(msg.content)"></rich-text>
		               </view>
		               
		               <image v-else-if="msg.message_type === 'image'" 
		                      class="message-image"
		                      :src="msg.content" 
		                      mode="aspectFill"
		                      @click="previewImage(msg.content)"></image>
		               
		               <image v-else-if="msg.message_type === 'emoji'" 
		                      class="message-emoji"
		                      :src="msg.content" 
		                      mode="aspectFit"
							   @click="previewEmoji(msg.content)"></image>									
		           </view>
		           <image class="avatar" :src="userBase.avatarUrl" mode="aspectFill"></image>
		       </view>
		    </view>
		</scroll-view>


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
		        <image src="https://wait00.oss-cn-shanghai.aliyuncs.com/label/biaoqing.png" mode="aspectFit" style="width: 56rpx; height: 56rpx;"></image>
		    </view>
		    <view class="add-btn" @click="showAddMenu">
		       <image src="https://wait00.oss-cn-shanghai.aliyuncs.com/label/jiahao.png" mode="aspectFit" style="width: 56rpx; height: 56rpx;"></image>
		    </view>
		</view>
		
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
		
		<view class="purchase-popup" :class="{ 'show': showPurchasePopup }" @click="closePurchasePopup">
			<view class="popup-content" @click.stop>
				<view class="close-btn" @click="closePurchasePopup">
					<text class="iconfont">✕</text>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	
	// 定义表情包基础URL
	const BASE_URL_SMALL = 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-small/';
	
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
				 // 新增：表情包相关
				showEmojiPanel: false,  // 控制表情面板显示
				// 🔥 修改：新的表情包列表
				emojiList: [
					{ id: 10, name: 'mini-1', url: `${BASE_URL_SMALL}1weixiao.png`, code: '(微笑)' },
					{ id: 11, name: 'mini-2', url: `${BASE_URL_SMALL}2piezui.png`, code: '(撇嘴)' },
					{ id: 12, name: 'mini-3', url: `${BASE_URL_SMALL}3yanchan.png`, code: '(馋)' },
					{ id: 13, name: 'mini-4', url: `${BASE_URL_SMALL}4jingya.png`, code: '(惊讶)' },
					{ id: 14, name: 'mini-5', url: `${BASE_URL_SMALL}5mojing.png`, code: '(秀)' },
					{ id: 15, name: 'mini-6', url: `${BASE_URL_SMALL}6daku.png`, code: '(哭)' },
					{ id: 16, name: 'mini-7', url: `${BASE_URL_SMALL}7wuzui.png`, code: '(闭麦)' },
					{ id: 17, name: 'mini-8', url: `${BASE_URL_SMALL}8ganga.png`, code: '(尴尬)' },
					{ id: 18, name: 'mini-9', url: `${BASE_URL_SMALL}9shengqi.png`, code: '(发怒)' },
					{ id: 19, name: 'mini-10', url: `${BASE_URL_SMALL}10daxiao.png`, code: '(大笑)' },
					{ id: 20, name: 'mini-11', url: `${BASE_URL_SMALL}10yumen.png`, code: '(郁闷)' },
					{ id: 21, name: 'mini-12', url: `${BASE_URL_SMALL}11nanguo.png`, code: '(难过)' },
					{ id: 22, name: 'mini-13', url: `${BASE_URL_SMALL}11tushe.png`, code: '(调皮)' },
					{ id: 23, name: 'mini-14', url: `${BASE_URL_SMALL}12exin.png`, code: '(吐)' },
					{ id: 24, name: 'mini-15', url: `${BASE_URL_SMALL}13touxiao.png`, code: '(偷笑)' },
					{ id: 25, name: 'mini-16', url: `${BASE_URL_SMALL}14yukuai.png`, code: '(愉快)' },
					{ id: 26, name: 'mini-17', url: `${BASE_URL_SMALL}16heng.png`, code: '(哼)' },
					{ id: 27, name: 'mini-18', url: `${BASE_URL_SMALL}17kouzhao.png`, code: '(生病)' },
					{ id: 28, name: 'mini-19', url: `${BASE_URL_SMALL}18haqian.png`, code: '(困)' },
					{ id: 29, name: 'mini-20', url: `${BASE_URL_SMALL}19yihuo.png`, code: '(疑惑)' },
					{ id: 30, name: 'mini-21', url: `${BASE_URL_SMALL}20shiwang.png`, code: '(失望)' },
					{ id: 31, name: 'mini-22', url: `${BASE_URL_SMALL}21zhuakuang.png`, code: '(抓狂)' },
					{ id: 32, name: 'mini-23', url: `${BASE_URL_SMALL}22yun.png`, code: '(晕)' },
					{ id: 33, name: 'mini-24', url: `${BASE_URL_SMALL}23duzui.png`, code: '(嘟嘴)' },
					{ id: 34, name: 'mini-25', url: `${BASE_URL_SMALL}24deyi.png`, code: '(得意)' },
					{ id: 35, name: 'mini-26', url: `${BASE_URL_SMALL}25wasai.png`, code: '(哇塞)' },
					{ id: 36, name: 'mini-27', url: `${BASE_URL_SMALL}26hanxiao.png`, code: '(憨笑)' },
					{ id: 37, name: 'mini-28', url: `${BASE_URL_SMALL}27jinghuang.png`, code: '(惊慌)' },
					{ id: 38, name: 'mini-29', url: `${BASE_URL_SMALL}28yinxian.png`, code: '(阴险)' },
					{ id: 39, name: 'mini-30', url: `${BASE_URL_SMALL}29meigui.png`, code: '(玫瑰)' },
					{ id: 40, name: 'mini-31', url: `${BASE_URL_SMALL}30chigua.png`, code: '(吃瓜)' },
					{ id: 41, name: 'mini-32', url: `${BASE_URL_SMALL}31xiaoku.png`, code: '(笑哭)' },
					{ id: 42, name: 'mini-33', url: `${BASE_URL_SMALL}32feiwen.png`, code: '(飞吻)' },
					{ id: 43, name: 'mini-34', url: `${BASE_URL_SMALL}33haode.png`, code: '(好的)' },
					{ id: 44, name: 'mini-35', url: `${BASE_URL_SMALL}34liekai.png`, code: '(裂开)' },
					{ id: 45, name: 'mini-36', url: `${BASE_URL_SMALL}35wuyu.png`, code: '(无语)' },
					{ id: 46, name: 'mini-37', url: `${BASE_URL_SMALL}36huanhu.png`, code: '(欢呼)' },
					{ id: 47, name: 'mini-38', url: `${BASE_URL_SMALL}37emo.png`, code: '(emo)' },
				],
				// 新增：图片上传相关
				uploading: false,
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
				if (options) {
					
					this.otherOpenid = options.openid;
					console.log('接收到 other_openid:', this.otherOpenid);
					const queryObj1 = {code: this.otherOpenid };
					const { data: res1 } = await uni.$http.get('/users/userinfo', queryObj1);
					if (res1.meta.status === 200) {
						this.other_nickname = res1.message.nickname
						this.other_avatarUrl = res1.message.avatarUrl
				}
				}
			} catch (e) {
				console.warn('other_openid 解析失败:', e)
				// this.goods_info = null
			}
			
			// 初始化加载消息
			await this.loadMessages();
			
			// 🔥 新增：初始化消息数量
			this.lastMessagesLength = this.messages.length;
			  	
			// 启动轮询
			this.startPolling();
			
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
			this.startPolling();		
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
    // 将表情的代码（如 '(微笑)'）追加到输入框文本后
    this.inputText = (this.inputText || '') + emoji.code;
    // 注意：不需要在这里调用发送接口，用户会点击发送按钮统一发送
},
			parseContent(content) {
			    if (!content) return '';
			    
			    let temp = content;
			    // 遍历表情列表，把文本中的 (微笑) 替换成 <img /> 标签
			    this.emojiList.forEach(item => {
			        // 转义正则中的特殊字符括号
			        const code = item.code.replace('(', '\\(').replace(')', '\\)');
			        const reg = new RegExp(code, 'g');
			        // 替换为 img 标签，注意这里设置了 vertical-align: middle 让表情和文字对齐
			        temp = temp.replace(reg, `<img style="width: 26px; height: 26px; vertical-align: middle; margin: 0 4rpx;" src="${item.url}" />`);
			    });
			    return temp;
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
			      openid2: this.otherOpenid,
			      goods_id: -1,
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
			
			processMessages(messages) {
			    if (!Array.isArray(messages)) {
			        console.log("messages不是数组");
			        return [];
			    }
			    
			    return messages.map(message => {
			        const processed = {
			            ...message,
			            type: message.openid === this.openid ? 'sent' : 
			                  message.message_type === 'system' ? 'system' : 'received', // 🔥 系统消息标记
			            message_type: message.message_type || 'text',
			            sub_type: message.sub_type || null
			        };
			        return processed;
			    });
			},
			
			// 启动轮询
			startPolling() {
				// 先清除可能存在的定时器
				this.stopPolling();
				
				// 启动新的定时器
				this.pollingTimer = setInterval(() => {
					this.loadMessages(true); // silent=true 静默加载,不显示提示
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
										reported_openid: this.otherOpenid, // 被举报人 (帖子作者)
										post_id: 0, 
										goods_id: -1, // 相关帖子ID
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
						openid2: this.otherOpenid,
						goods_id: -1,
						senderid: this.openid,
						content: newMessage,
						message_type: 'text',
						type: 1
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
						                openid2: this.otherOpenid,
						                goods_id: -1,
						                senderid: this.openid,
						                content: imageUrl,
						                message_type: 'image',  // 标记为图片消息
						                sub_type: 'image',       // 标记为普通图片
										type: 1
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
					
		},
		computed: {
			...mapState('m_user', ['token', 'code', 'userBase', 'openid', 'address']),		
		}
	}
</script>

<style lang="scss">
/* 原有样式保持不变 */
.chat-container {
	position: relative;
	height: 100vh;
	background-color: #EDEDED; /* 🔥 修改：背景色 */
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
	top: 88rpx;
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
			align-items: flex-start; /* 🔥 修改：头像对齐 */
			
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
				flex-shrink: 0; /* 防止头像被挤压 */
			}
			
			.message-bubble {
				max-width: 500rpx;
				padding: 20rpx 24rpx;
				border-radius: 8rpx;
				font-size: 28rpx;
				line-height: 1.5;
				word-wrap: break-word;
				
				/* 🔥 修改：左侧气泡样式 (对方) */
				&.left-bubble {
					background: #FFFFFF;
					color: #474747;
					border: none;
				}
				
				/* 🔥 修改：右侧气泡样式 (我方) */
				&.right-bubble {
					background: #95EC69;
					color: #474747;
					border: none;
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
	background-color: #ffffff;
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
			grid-template-columns: repeat(5, 1fr);
			gap: 15rpx;
			
			.emoji-item {
				aspect-ratio: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: transparent; /* 🔥 修改：透明背景 */
				border-radius: 12rpx;
				transition: all 0.2s;
				
				&:active {
					transform: scale(0.95);
					background-color: #e0e0e0;
				}
				
				.emoji-image {
					/* 🔥 修改：小表情尺寸 */
					width: 100rpx;
					height: 100rpx;
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
		/* 🔥 修改：小表情在气泡外显示时的尺寸 */
		width: 64rpx;
		height: 64rpx;
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