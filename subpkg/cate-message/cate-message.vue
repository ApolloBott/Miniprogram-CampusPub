<template>
	<view class="message-page" v-if="token">
		<!-- 顶部标题 -->
		<view class="header">
			<text class="title">集市消息</text>
		</view>
		
		<!-- 消息列表 -->
		<scroll-view class="message-list" scroll-y>
			<view
			  v-for="(chat, index) in chatList"
			  :key="index"
			  class="message-item"
			  @click="openChat(chat)"
			>
			  <image class="avatar" :src="chat.avatarUrl" mode="aspectFill"></image>
			  <view class="content">
			    <view class="top-row">
			      <text class="nickname">{{ chat.nickname }}</text>
			      <text class="time">{{ chat.time }}</text>
			    </view>
			    <view class="bottom-row">
			      <text class="last-message" v-if="chat.type === 'text' || chat.type === 'system'">{{ chat.lastMessage }}</text>
			      <text class="last-message" v-if="chat.type === 'image'">[图片]</text>
			      <text class="last-message" v-if="chat.type === 'emoji'">[表情]</text>
			      <text class="last-message" v-if="chat.type === 'transaction'">[买家发起线下交易]</text>
			      <text class="last-message" v-if="chat.type === 'agree'">[卖家已同意线下交易]</text>
			      <text class="last-message" v-if="chat.type === 'finish'">[交易已完成]</text>
			      <view v-if="getUnreadCount(chat.chat_id) > 0" class="unread-badge">
			        <text class="unread-text">{{ getUnreadCount(chat.chat_id) }}</text>
			      </view>
			    </view>
			  </view>
			  <image class="goods-image" :src="chat.goodsImage" mode="aspectFill"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				chatList: [],
				goods_info: [],
				userUnreadList: []  // ✅ 存储用户的未读消息列表
			};
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase']),
			
			// ✅ 获取某个会话的未读消息数
			getUnreadCount(chatId) {
				if (!this.userUnreadList || this.userUnreadList.length === 0) {
					return 0;
				}
				
				// 从 unread 数组中查找对应的 chat_id
				const chatUnread = this.userUnreadList.find(item => item.chat_id === chatId);
				
				// 返回 unread 字段的值
				return chatUnread ? chatUnread.unread : 0;
			},
			
			async openChat(chat) {
				console.log(chat.users.goods_id)
				const { data: res } = await uni.$http.get('/goods/detail', { goods_id: chat.users.goods_id });
				console.log(chat.users.goods_id)
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goods_info = res.message[0];
				console.log(this.goods_info)
				
				// ✅ 打开聊天时清空该会话的未读消息
				await this.clearChatUnread(chat.chat_id);
				
				if (this.userBase.openid !== this.goods_info.publisher_id) {
					const payload = encodeURIComponent(JSON.stringify(this.goods_info));
					uni.navigateTo({
					 	url: `/subpkg/chat/chat?goods_info=${payload}`
					});
				}
				else {
					const chatData = {
					            ...this.goods_info,
					            other_openid: chat.users.otheropenid,
					};
					const payload = encodeURIComponent(JSON.stringify(chatData));
					uni.navigateTo({
					 	url: `/subpkg/chat/chat?goods_info=${payload}`
					});
				}
			},
			
			// ✅ 清空某个会话的未读消息
			async clearChatUnread(chatId) {
				try {
					const queryObj = {
						openid: this.openid,
						chat_id: chatId
					};
					
					const { data: res } = await uni.$http.post('/chats/clearUnread', queryObj);
					
					if (res.meta.status === 200) {
						console.log(`✅ 会话 ${chatId} 的未读消息已清空`);
						// 更新本地未读数据
						this.userUnreadList = res.message.unread || [];
					}
				} catch (error) {
					console.error('清空未读消息失败:', error);
				}
			}
		},
		computed: {
			...mapState('m_user', ['token', 'code', 'userBase' ,'openid']),
		},
		
		async onShow() {
			
			if (!this.token) {
				uni.switchTab({
					url: '/pages/my/my',
					success: () => {
						uni.showToast({
							title: '请先登录',
							icon: 'none',
							duration: 2000
						});
					}
				});
				return;
			}
			
			// ✅ 获取用户信息
			const queryObj = {code: this.openid};
			const { data: res1 } = await uni.$http.get('/users/userinfo', queryObj);
			if (res1.meta.status === 200) {
				console.log('用户信息:', res1.message)
				this.updateUserBase(res1.message)
				if (this.userBase.total_unread > 0) {
					uni.setTabBarBadge({
					  index: 2,
					  text: this.userBase.total_unread + ''
					})
				}
				else {
					uni.removeTabBarBadge({
					  index: 2
					})
				}
				// ✅ 提取 unread 数组
				const userData = res1.message;
				
				// 如果 unread 是字符串，解析为数组
				if (typeof userData.unread === 'string') {
					try {
						this.userUnreadList = JSON.parse(userData.unread);
					} catch (error) {
						console.error('解析 unread 失败:', error);
						this.userUnreadList = [];
					}
				} else if (Array.isArray(userData.unread)) {
					this.userUnreadList = userData.unread;
				} else {
					this.userUnreadList = [];
				}
				
				console.log('未读消息列表:', this.userUnreadList);
			}
			
			// ✅ 获取聊天列表
			const req = {openid: this.openid}
			const { data: res } = await uni.$http.get('/chats/list', req)
			if (res.meta.status === 200) {
				console.log('聊天列表:', res.message)
				this.chatList = res.message
			}
		}
		
	}
</script>

<style lang="scss">
.message-page {
	min-height: 100vh;
	background-color: #f5f5f5;
}

/* 顶部标题 */
.header {
	position: sticky;
	top: 0;
	z-index: 100;
	padding: 20rpx 32rpx;
	background-color: #ffffff;
	border-bottom: 1rpx solid #e5e5e5;
	
	.title {
		font-size: 40rpx;
		font-weight: bold;
		color: #333333;
	}
}

/* 消息列表 */
/* 消息列表 - 保持不变 */
.message-list {
  padding-bottom: 40rpx;
}

.message-item {
  display: flex;
  align-items: center;
  padding: 24rpx 32rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #f0f0f0;

  &:active {
    background-color: #f5f5f5;
  }

  .avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin-right: 24rpx;
    flex-shrink: 0;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    margin-right: 24rpx;

    .top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12rpx;

      .nickname {
        font-size: 32rpx;
        font-weight: 500;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }

      .time {
        font-size: 24rpx;
        color: #999999;
        margin-left: 16rpx;
        flex-shrink: 0;
      }
    }

    .bottom-row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .last-message {
        font-size: 28rpx;
        color: #999999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }

      .unread-badge {
        min-width: 32rpx;
        height: 32rpx;
        padding: 0 8rpx;
        background-color: #ff3b30;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 16rpx;
        flex-shrink: 0;

        .unread-text {
          font-size: 20rpx;
          color: #ffffff;
          line-height: 1;
        }
      }
    }
  }

  .goods-image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 8rpx;
    flex-shrink: 0;
  }
}
</style>