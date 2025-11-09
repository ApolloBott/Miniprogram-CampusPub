<template>
  <view class="follow-message-container">

    <!-- 粉丝列表 -->
    <view class="follower-list">
      <view 
        v-for="follower in followerList" 
        :key="follower.id" 
        class="follower-item"
      >
        <!-- 左侧：头像和信息 -->
        <view class="follower-info" @click="goToProfile(follower)">
          <image 
            :src="follower.follower_avatarUrl" 
            class="avatar"
            mode="aspectFill"
          ></image>
          
          <view class="info-content">
            <text class="nickname">{{ follower.follower_nickname }}</text>
            <view class="follow-info">
              <text class="follow-time">{{ follower.follow_time }}</text>
              <text class="follow-tip">关注了你</text>
            </view>
          </view>
        </view>

        <!-- 右侧:关注按钮 -->
        <view class="follow-btn-wrapper">
          <button 
            :class="['follow-btn', follower.is_mutual_follow ? 'mutual' : 'normal']"
            @click="handleFollow(follower)"
            :disabled="followLoading === follower.follower_openid"
          >
            {{ follower.is_mutual_follow ? '互相关注' : '+ 关注' }}
          </button>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="followerList.length === 0 && !loading" class="empty-state">
        <!-- <image src="/static/empty-follower.png" class="empty-image"></image> -->
        <text class="empty-text">暂无粉丝</text>
      </view>

      <!-- 加载状态 -->
      <view v-if="loading" class="loading-state">
        <text>加载中...</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      followerList: [],
      loading: false,
      followLoading: null, // 当前正在关注的用户openid
	  publisher_info: {},
    };
  },
  
  onLoad() {
    this.getFollowerList();
  },

  computed: {
    ...mapState('m_user', ['token', 'code', 'userBase', 'openid']),
  },
  
  methods: {
    ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase', 'updateCode', 'updateOpenid']),
    
    // 获取粉丝列表
    async getFollowerList() {
      this.loading = true;
      
      try {
        const res = await uni.$http.get('/users/follow-message', {
          code: this.openid
        });
          
        if (res.data.meta.status === 200) {
          // 获取当前用户的关注列表
          const followingIds = this.userBase?.following_ids || [];
          console.log('当前用户关注列表:', followingIds);
          
          // 处理粉丝列表数据,判断是否互相关注
          this.followerList = res.data.data.map(follower => {
            // 判断该粉丝的 openid 是否在当前用户的关注列表中
            const isMutualFollow = followingIds.includes(follower.follower_openid);
            
            return {
              ...follower,
              is_mutual_follow: isMutualFollow // 根据本地数据判断是否互相关注
            };
          });
          
          console.log('处理后的粉丝列表:', this.followerList);
        } else {
          uni.showToast({
            title: res.data.message || '获取失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取粉丝列表失败:', error);
        uni.showToast({
          title: '网络错误',
          icon: 'none'
        });
      } finally {
        this.loading = false;
      }
    },

    // 跳转到用户主页
    async goToProfile(follower) {
      try {
		const queryObj = {code: follower.follower_openid};
        const { data: res } = await uni.$http.get('/users/userinfo', queryObj);
        if (res.meta.status === 200) {
			this.publisher_info = res.message
        }
        const payload = encodeURIComponent(JSON.stringify(this.publisher_info));
        
        await uni.navigateTo({
          url: `/subpkg/profile/profile?publisher=${payload}`
        });
      } catch (error) {
        console.error('跳转失败:', error);
        uni.showToast({
          title: '页面跳转失败',
          icon: 'none'
        });
      }
    },

    // 处理关注/取消关注
    async handleFollow(follower) {
      this.followLoading = follower.follower_openid;
      
      const url = follower.is_mutual_follow ? '/users/unfollow' : '/users/follow';
      
      try {
        // 调用关注/取消关注接口
        const res = await uni.$http.post(url, {
          code: this.openid,
          publisher_id: follower.follower_openid
        });

        if (res.data.meta.status === 200) {
          // 更新本地状态
          follower.is_mutual_follow = !follower.is_mutual_follow;
          
          // 同步更新 userBase.following_ids
          const followingIds = this.userBase?.following_ids || [];
          
          if (follower.is_mutual_follow) {
            // 关注成功,添加到关注列表
            if (!followingIds.includes(follower.follower_openid)) {
              followingIds.unshift(follower.follower_openid);
            }
          } else {
            // 取消关注,从关注列表移除
            const index = followingIds.indexOf(follower.follower_openid);
            if (index > -1) {
              followingIds.splice(index, 1);
            }
          }
          
          // 更新 Vuex 中的 userBase
          this.updateUserBase({
            ...this.userBase,
            following_ids: followingIds
          });
          
          console.log('更新后的关注列表:', followingIds);
        }
      } catch (error) {
        console.error('操作失败:', error);
        uni.showToast({
          title: '网络错误',
          icon: 'none'
        });
      } finally {
        this.followLoading = null;
      }
    }
  }
};
</script>

<style lang="scss">
.follow-message-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.header {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
  border-radius: 16rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
  
  .count {
    font-size: 28rpx;
    color: #999;
  }
}

.follower-list {
  .follower-item {
    background-color: #fff;
    padding: 30rpx;
    margin-bottom: 20rpx;
    border-radius: 16rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .follower-info {
      display: flex;
      align-items: center;
      flex: 1;
      cursor: pointer;
      
      .avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        margin-right: 24rpx;
      }
      
      .info-content {
        display: flex;
        flex-direction: column;
        
        .nickname {
          font-size: 32rpx;
          color: #333;
          font-weight: 500;
          margin-bottom: 12rpx;
        }
        
        .follow-info {
          display: flex;
          align-items: center;
          
          .follow-time {
            font-size: 24rpx;
            color: #999;
            margin-right: 12rpx;
          }
          
          .follow-tip {
            font-size: 24rpx;
            color: #666;
          }
        }
      }
    }
    
    .follow-btn-wrapper {
      .follow-btn {
        padding: 16rpx 40rpx;
        border-radius: 50rpx;
        font-size: 28rpx;
        border: none;
        
        &.normal {
          background-color: #1890ff;
          color: #fff;
        }
        
        &.mutual {
          background-color: #f0f0f0;
          color: #999;
        }
      }
    }
  }
}

.empty-state {
  text-align: center;
  padding: 100rpx 0;
  
  .empty-image {
    width: 300rpx;
    height: 300rpx;
    margin-bottom: 40rpx;
  }
  
  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}

.loading-state {
  text-align: center;
  padding: 100rpx 0;
  font-size: 28rpx;
  color: #999;
}
</style>
