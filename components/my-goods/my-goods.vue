<template>
  <view class="goods-item">
    <!-- 图片 -->
    <view class="goods-item-image" @click="gotoDetail(goods)">
      <image :src="goods.goods_big_logo" class="goods-pic" mode="aspectFill"></image>
    </view>

    <!-- 文本信息 -->
    <view class="goods-item-info">
      <view class="goods-name" @click="gotoDetail(goods)">{{ goods.goods_name }}</view>
      
      <!-- 价格和校区信息行 -->
      <view class="goods-footer" @click="gotoDetail(goods)">
        <view class="goods-price" v-if="goods && goods.goods_price">
          <text class="price-symbol">¥</text>
          <text class="price-num">{{ goods.goods_price | tofixed }}</text>
        </view>
        
        <view class="goods-location">
          <text class="location-text">{{ goods.location || '位置未知' }}校区</text>
        </view>
      </view>

      <!-- 🔥 修改：发布者信息 - 左边头像+昵称，右边时间 -->
      <view class="publisher-info" @click="gotoProfile(goods.publisher_id)">
        <view class="publisher-left">
          <image 
            :src="publisherAvatar" 
            class="publisher-avatar"
            mode="aspectFill"
          ></image>
          <text class="publisher-name">{{ publisherName }}</text>
        </view>
        <text class="card-time">{{ formatTime(goods.add_time) }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name:"my-goods",
  props: {
    goods: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      isNavigating: false,
    };
  },
  computed: {
    ...mapState('m_user', ['openid']),
    
    publisherAvatar() {
      return this.goods?.publisher_avatarUrl || '/images/1.jpg';
    },
    publisherName() {
      return this.goods?.publisher_nickname || '匿名用户';
    },
    hoursSince() {
      let currentTimestamp = Math.floor(Date.now() / 1000);
      let diff = currentTimestamp - this.goods?.add_time;
      return Math.floor(diff / 3600);
    },
    isRecent() {
      return this.hoursSince !== null && this.hoursSince <= 72;
    },
    publishedText() {
      if (!this.isRecent) return "";
      const h = Math.max(1, this.hoursSince);
      return `${h}小时内发布`;
    },
  },
  methods: {
    async gotoProfile(openid) {
      if (!this.openid) {
        uni.switchTab({
          url: '/pages/my/my'
        })
        return
      }
      
      if (this.isNavigating) {
        console.log('⏸️ 正在跳转中，请勿重复点击');
        return;
      }
      
      this.isNavigating = true;
      
      try {
        const queryObj = { code: openid };
        const { data: res } = await uni.$http.get('/users/userinfo', queryObj);
        
        if (res.meta.status === 200) {
          console.log('跳转到用户主页');
          const publisher_info = res.message;
          const payload = encodeURIComponent(JSON.stringify(publisher_info));
          
          await uni.navigateTo({
            url: `/subpkg/profile/profile?publisher=${payload}`
          });
        }
      } catch (error) {
        console.error('❌ 跳转用户主页失败:', error);
      } finally {
        setTimeout(() => {
          this.isNavigating = false;
        }, 500);
      }
    },
    
    formatTime(timestamp) {
      if (!timestamp) return '刚刚'
      
      const time = typeof timestamp === 'string' 
        ? new Date(timestamp).getTime() 
        : timestamp * 1000
      
      const now = Date.now()
      const diff = now - time
      
      const minute = 60 * 1000
      const hour = 60 * minute
      const day = 24 * hour
      
      if (diff < 0) return '刚刚'
      if (diff < minute) return '刚刚'
      if (diff < hour) return Math.floor(diff / minute) + '分钟前'
      if (diff < day) return Math.floor(diff / hour) + '小时前'
      if (diff < 7 * day) return Math.floor(diff / day) + '天前'
      
      const date = new Date(time)
      return `${date.getMonth() + 1}-${date.getDate()}`
    },
    
    async gotoDetail(item) {
      if (this.isNavigating) {
        console.log('⏸️ 正在跳转中，请勿重复点击');
        return;
      }
      
      this.isNavigating = true;
      
      try {
        console.log('📊 增加商品浏览次数:', item.goods_id);
        
        uni.$http.post('/goods/view', {
          goods_id: item.goods_id,
          user_openid: this.openid || null
        }).then(({ data: res }) => {
          if (res.meta.status === 200) {
            console.log('✅ 浏览次数增加成功');
          }
        }).catch(error => {
          console.error('❌ 浏览次数增加失败:', error);
        });

        await uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        });
        
        console.log('✅ 跳转成功');
        
      } catch (error) {
        console.error('❌ 跳转失败:', error);
        this.isNavigating = false;
      } finally {
        setTimeout(() => {
          this.isNavigating = false;
        }, 500);
      }
    },
  },
  filters: {
    tofixed(num) {
      return Number(num).toFixed(2)
    }
  }
}
</script>

<style lang="scss">
.goods-item {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
  height: 550rpx;
}

.goods-item-image {
  position: relative;
  width: 100%;
  height: 370rpx;
  background: #f5f5f5;
  flex-shrink: 0;

  .goods-pic {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.goods-item-info {
  padding: 20rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .goods-name {
    font-size: 30rpx;
    color: #333;
    line-height: 40rpx;
    margin-bottom: 0rpx;
    height: 40rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .goods-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rpx;
    height: 30rpx;
    flex-shrink: 0;

    .goods-price {
      display: flex;
      align-items: baseline;
      color: #c00000;

      .price-symbol {
        font-size: 24rpx;
        font-weight: 500;
      }
      .price-num {
        font-size: 36rpx;
        font-weight: 700;
      }
    }

    .goods-location {
      display: flex;
      align-items: center;
      
      .location-text {
        font-size: 22rpx;
        color: #1890ff;
        background-color: #f0f9ff;
        padding: 4rpx 10rpx;
      }
    }
  }

  /* 🔥 关键修改：发布者信息行 */
  .publisher-info {
    display: flex;
    align-items: center;
    justify-content: space-between; // 左右分布
    padding-top: 4rpx;
    height: 40rpx; // 增加高度以容纳内容
    flex-shrink: 0;

    // 🔥 新增：左侧容器（头像+昵称）
    .publisher-left {
      display: flex;
      align-items: center;
      flex: 1; // 占据剩余空间
      min-width: 0; // 允许文本溢出隐藏
    }

    .publisher-avatar {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      margin-right: 10rpx;
      background: #f5f5f5;
      flex-shrink: 0;
    }

    .publisher-name {
      font-size: 20rpx;
      color: #666;
      max-width: 150rpx; // 减小最大宽度，为时间留空间
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex-shrink: 1; // 允许收缩
    }

    // 🔥 修改：时间样式（靠右显示）
    .card-time {
      font-size: 20rpx;
      color: #999;
      white-space: nowrap; // 防止换行
      flex-shrink: 0; // 不允许收缩
      margin-left: 10rpx; // 与昵称保持间距
    }
  }
}
</style>
