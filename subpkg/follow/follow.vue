<template>
  <view class="follow-page">
    <!-- 顶部标题 -->
    <view class="header">
      <text class="title">关注列表</text>
    </view>

    <!-- 关注列表 -->
    <view class="list">
      <view class="card" v-for="(u, index) in users" :key="index" >
        <image class="avatar" :src=u.avatarUrl mode="aspectFill" @click="gotoProfile(u)"/>

        <view class="info">
          <text class="name" @click="gotoProfile(u)">{{ u.nickname }}</text>
          <text class="desc" v-if="u.user_introduce">{{ u.user_introduce }}</text>
        </view>

        <view class="actions">
          <!-- 关注按钮 -->
          <view
            class="btn follow-btn"
            :class="{ following: isFollowing[index] }"
            @click.stop="toggleFollow(u, index)"
			v-if="u.openid !== openid"
          >
            <text>{{ isFollowing[index] ? '已关注' : '+ 关注' }}</text>
          </view>

        </view>
      </view>

      <view v-if="!users.length" class="empty">
        暂无关注的人
      </view>
    </view>
  </view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      // 演示数据，替换成你的接口返回值即可
      users: [],
	  isFollowing: [],
	  pageUser: null,
    };
  },
  methods: {
	...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase']),
    async toggleFollow(user, index) {
		
		this.isFollowing[index] = !this.isFollowing[index];
		const url1 = this.isFollowing[index] ? '/users/follow' : '/users/unfollow';
		const query = {code: this.openid, publisher_id: user.openid};
		const {data: res} = await uni.$http.post(url1, query);
		uni.showToast({
			title: this.isFollowing[index] ? '关注成功' : '取消关注',
			icon: 'none'
		});
		const code = this.openid;
		const queryObj = {code: code};
		const { data: my } = await uni.$http.get('/users/userinfo', queryObj);
		if (my.meta.status === 200) {
			this.updateUserBase(my.message)
		}
    },
    openChat(user) {
      // TODO: 跳转到聊天页并携带对方信息
      // uni.navigateTo({ url: '/pages/chat/chat?uid=' + user.id })
      uni.showToast({ title: `与 ${user.nickname} 聊天`, icon: 'none' });
    },
	gotoProfile(user) {
		const payload = encodeURIComponent(JSON.stringify(user));
		uni.navigateTo({
		  url: `/subpkg/profile/profile?publisher=${payload}`
		});
	}
  },
  // 解析路由参数（只在进入页面时做一次）
    onLoad(options) {
      try {
        if (options && options.publisher) {
          this.pageUser = JSON.parse(decodeURIComponent(options.publisher)) || null
        }
      } catch (e) {
        console.warn('publisher 解析失败：', e)
        this.pageUser = null
      }
    },
  // 每次展示页面都按“页面用户(优先)”→“vuex.userBase(兜底)”去拉列表
    async onShow() {
      const sourceUser = (this.pageUser && Object.keys(this.pageUser).length)
        ? this.pageUser
        : this.userBase;
		// const sourceUser = (this.userBase === this.pageUser) ? this.pageUser : this.userBase
		console.log(sourceUser)
      const ids = Array.isArray(sourceUser?.following_ids) ? sourceUser.following_ids : []
      if (!ids.length) {
        this.users = []
        this.isFollowing = []
        return
      }
  
      const { data: res } = await uni.$http.get('/users/userinfo', { code: ids })
      if (res?.meta?.status === 200) {
        const list = Array.isArray(res.message) ? res.message : [res.message]
        this.users = list.filter(u => u && u.openid)
      } else {
        this.users = []
      }

	  this.isFollowing = this.users.map(user => {
		  return this.userBase.following_ids?.includes(user.openid) || false
	  })
	  
      
    },
  computed: {
  	...mapState('m_user', ['token', 'code', 'userBase', 'openid'])
  },
};
</script>

<style lang="scss">
/* 简易图标字体（仅用作“消息”小图标），可换成你自己的 iconfont */
.iconfont {
  font-family: 'iconfont';
}

/* 页面背景 */
.follow-page {
  min-height: 100vh;
  background: #f7f7f7;
}

/* 顶部标题 */
.header {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  font-weight: 600;
  border-bottom: 1rpx solid #f0f0f0;

  .title {
    font-size: 34rpx;
    color: #111;
  }
}

/* 列表 */
.list {
  padding: 24rpx 24rpx 40rpx;
}

/* 用户卡片 */
.card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 24rpx;
  border-radius: 20rpx;
  background: #fff;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.04);
  margin-bottom: 20rpx;
}

.avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  flex-shrink: 0;
  background: #eee;
}

.info {
  flex: 1;
  min-width: 0;

  .name {
    display: block;
    font-size: 30rpx;
    color: #222;
    font-weight: 700;
    margin-bottom: 6rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .desc {
    font-size: 24rpx;
    color: #999;
  }
}

/* 右侧操作区 */
.actions {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

/* 按钮通用样式（自定义 view 当按钮用，避免原生 button 默认样式） */
.btn {
  height: 64rpx;
  padding: 0 24rpx;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  line-height: 1;
  border: 2rpx solid transparent;
}

/* 关注按钮：黄色/已关注灰色 */
.follow-btn {
  background: #ffe14d;
  color: #222;
  font-weight: 600;

  &.following {
    background: #f3f3f3;
    color: #666;
  }
}

/* 消息按钮：描边浅灰 */
.msg-btn {
  background: #fff;
  color: #333;
  border-color: #e6e6e6;

  .msg-text {
    margin-left: 8rpx;
  }
}

/* 空态 */
.empty {
  padding: 200rpx 0;
  text-align: center;
  color: #999;
  font-size: 28rpx;
}
</style>
