<template>
  <view class="message-page" v-if="token">
    <!-- 🆕 消息类型选择框 -->
    <view class="message-tabs">
      <view class="tab-item" @click="navigateToFollow">
        <view class="icon-circle">
          <text class="iconfont icon-follow">👤</text>
          <view v-if="userBase.unread_followers > 0" class="tab-unread-badge">
            <text class="tab-unread-text">{{ userBase.unread_followers }}</text>
          </view>
        </view>
        <text class="tab-text">新增关注</text>
      </view>
      <view class="tab-item" @click="navigateToComment">
        <view class="icon-circle">
          <text class="iconfont icon-comment">💬</text>
          <view v-if="userBase.unread_messages > 0" class="tab-unread-badge">
            <text class="tab-unread-text">{{ userBase.unread_messages }}</text>
          </view>
        </view>
        <text class="tab-text">评论和@</text>
      </view>
    </view>

    <!-- 消息列表 -->
    <view class="message-list">
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
            <text class="last-message">{{ chat.lastMessage }}</text>
            <view v-if="getUnreadCount(chat.chat_id) > 0" class="unread-badge">
              <text class="unread-text">{{ getUnreadCount(chat.chat_id) }}</text>
            </view>
          </view>
        </view>
        <image class="goods-image" :src="chat.goodsImage" mode="aspectFill"></image>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      chatList: [],
      goods_info: [],
      userUnreadList: []
    }
  },
  methods: {
    ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase']),

    // 🆕 新增：加载页面数据的统一方法
    async loadPageData() {
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

      try {
        // 加载用户信息
        const queryObj = { code: this.openid };
        const { data: res1 } = await uni.$http.get('/users/userinfo', queryObj);
        
        if (res1.meta.status === 200) {
          this.updateUserBase(res1.message);
          
          // 更新 TabBar 徽章
          if (this.userBase.total_unread > 0) {
            uni.setTabBarBadge({
              index: 2,
              text: this.userBase.total_unread + ''
            });
          } else {
            uni.removeTabBarBadge({ index: 2 });
          }

          // 处理未读消息列表
          const userData = res1.message;
          if (typeof userData.unread === 'string') {
            try {
              this.userUnreadList = JSON.parse(userData.unread);
            } catch {
              this.userUnreadList = [];
            }
          } else if (Array.isArray(userData.unread)) {
            this.userUnreadList = userData.unread;
          } else {
            this.userUnreadList = [];
          }
        }

        // 加载聊天列表
        const req = { openid: this.openid };
        const { data: res } = await uni.$http.get('/chats/list', req);
        if (res.meta.status === 200) {
          this.chatList = res.message;
        }
      } catch (error) {
        console.error('加载页面数据失败:', error);
        uni.showToast({
          title: '加载失败，请重试',
          icon: 'none'
        });
      }
    },

    navigateToLike() {
      uni.navigateTo({
        url: '/subpkg/like-message/like-message'
      });
    },
    
    async navigateToFollow() {
      if (this.userBase.unread_followers > 0) {
        await this.clearFollowersUnread();
      }
      uni.navigateTo({
        url: '/subpkg/follow-message/follow-message'
      });
    },
    
    async navigateToComment() {
      if (this.userBase.unread_messages > 0) {
        await this.clearMessagesUnread();
      }
      uni.navigateTo({
        url: '/subpkg/comment-message/comment-message'
      });
    },

    async clearFollowersUnread() {
      try {
        const queryObj = {
          openid: this.openid,
          type: 'followers'
        };
        const { data: res } = await uni.$http.post('/users/clearUnread', queryObj);
        
        if (res.meta.status === 200) {
          const query = { code: this.openid };
          const { data: res2 } = await uni.$http.get('/users/userinfo', query);
          
          if (res2.meta.status === 200) {
            this.updateUserBase(res2.message);
            
            // 更新 TabBar 徽章
            if (res2.message.total_unread > 0) {
              uni.setTabBarBadge({
                index: 2,
                text: res2.message.total_unread + ''
              });
            } else {
              uni.removeTabBarBadge({ index: 2 });
            }
          }
        }
      } catch (error) {
        console.error('清空关注未读消息失败:', error);
      }
    },

    async clearMessagesUnread() {
      try {
        const queryObj = {
          openid: this.openid,
          type: 'messages'
        };
        const { data: res } = await uni.$http.post('/users/clearUnread', queryObj);
        
        if (res.meta.status === 200) {
          const query = { code: this.openid };
          const { data: res2 } = await uni.$http.get('/users/userinfo', query);
          
          if (res2.meta.status === 200) {
            this.updateUserBase(res2.message);
            
            // 更新 TabBar 徽章
            if (res2.message.total_unread > 0) {
              uni.setTabBarBadge({
                index: 2,
                text: res2.message.total_unread + ''
              });
            } else {
              uni.removeTabBarBadge({ index: 2 });
            }
          }
        }
      } catch (error) {
        console.error('清空评论未读消息失败:', error);
      }
    },

    getUnreadCount(chatId) {
      if (!this.userUnreadList || this.userUnreadList.length === 0) {
        return 0;
      }
      const chatUnread = this.userUnreadList.find(item => item.chat_id === chatId);
      return chatUnread ? chatUnread.unread : 0;
    },

    async openChat(chat) {
      const { data: res } = await uni.$http.get('/goods/detail', { goods_id: chat.users.goods_id });
      if (res.meta.status !== 200) return uni.$showMsg();
      this.goods_info = res.message[0];

      await this.clearChatUnread(chat.chat_id);

      if (this.userBase.openid !== this.goods_info.publisher_id) {
        const payload = encodeURIComponent(JSON.stringify(this.goods_info));
        uni.navigateTo({
          url: `/subpkg/chat/chat?goods_info=${payload}`
        });
      } else {
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

    async clearChatUnread(chatId) {
      try {
        const queryObj = {
          openid: this.openid,
          chat_id: chatId
        };
        const { data: res } = await uni.$http.post('/chats/clearUnread', queryObj);
        if (res.meta.status === 200) {
          this.userUnreadList = res.message.unread || [];
        }
      } catch (error) {
        console.error('清空未读消息失败:', error);
      }
    }
  },
  computed: {
    ...mapState('m_user', ['token', 'code', 'userBase', 'openid']),
  },
  
  // 🆕 页面显示时加载数据
  async onShow() {
    await this.loadPageData();
  },

  // 🆕 下拉刷新
  async onPullDownRefresh() {
    try {
      await this.loadPageData();
    } catch (error) {
      console.error('刷新失败:', error);
      uni.showToast({
        title: '刷新失败',
        icon: 'none'
      });
    } finally {
      // 必须调用，否则刷新状态不会结束
      uni.stopPullDownRefresh();
    }
  }
}
</script>
<style lang="scss">
.message-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  /* 让整个页面都能滚动 */
  overflow-y: auto;
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

/* 消息类型选择框 */
.message-tabs {
  display: flex;
  background-color: #ffffff;
  padding: 40rpx 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon-circle {
      position: relative; /* 🆕 让徽章相对于圆形定位 */
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16rpx;
      box-shadow: 0 4rpx 12rpx rgba(102, 126, 234, 0.3);
      transition: all 0.3s ease;

      .iconfont {
        font-size: 48rpx;
        color: #ffffff;
      }

      /* 🆕 圆形图标上的未读徽章 */
      .tab-unread-badge {
        position: absolute;
        top: -8rpx;
        right: -8rpx;
        min-width: 36rpx;
        height: 36rpx;
        padding: 0 8rpx;
        background-color: #ff3b30;
        border-radius: 18rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3rpx solid #ffffff; /* 白色边框，与背景分离 */
        box-shadow: 0 2rpx 8rpx rgba(255, 59, 48, 0.4);

        .tab-unread-text {
          font-size: 20rpx;
          color: #ffffff;
          font-weight: bold;
          line-height: 1;
        }
      }
    }

    .tab-text {
      font-size: 24rpx;
      color: #666666;
      white-space: nowrap;
    }

    &:active {
      .icon-circle {
        transform: scale(0.9);
        box-shadow: 0 2rpx 8rpx rgba(102, 126, 234, 0.2);
      }
    }
  }

  // 渐变色
  .tab-item:nth-child(1) .icon-circle {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    box-shadow: 0 4rpx 12rpx rgba(245, 87, 108, 0.3);
  }
  .tab-item:nth-child(2) .icon-circle {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    box-shadow: 0 4rpx 12rpx rgba(79, 172, 254, 0.3);
  }
  .tab-item:nth-child(3) .icon-circle {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    box-shadow: 0 4rpx 12rpx rgba(67, 233, 123, 0.3);
  }
}

/* 消息列表 */
.message-list {
  /* 删除固定高度，默认撑开 */
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
