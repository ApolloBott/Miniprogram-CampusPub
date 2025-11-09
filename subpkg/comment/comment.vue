<template>
  <view class="history-page">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="header-title">我留言过的商品</text>
    </view>
    <!-- 商品列表 -->
    <scroll-view scroll-y class="goods-list">
      <view class="goods-grid">
        <view 
          class="goods-item" 
          v-for="(item, index) in historyList" 
          :key="index"
          @click="gotoDetail(item.goods_id)"
        >
          <image :src=item.goods_big_logo class="goods-image" mode="aspectFill"></image>
          <view class="goods-price">
            <text class="price-symbol">¥</text>
            <text class="price-number">{{ item.goods_price }}</text>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="historyList.length === 0" class="empty-state">
        <text class="empty-text">暂无{{ tabs[activeTab] }}记录</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
	import { mapState } from 'vuex'
import { computed } from "vue";
export default {
  data() {
    return {
      activeTab: 0,
      tabs: ['我留言的'],
      commentedList: [],
    };
  },
  computed: {
	...mapState('m_user', ['token', 'code', 'userBase', 'openid']),
    historyList() {
      switch(this.activeTab) {
        case 0: return this.commentedList;
		default: return [];
      }
    },
  },
  async onLoad() {
    // 实际使用时在这里调用接口获取数据
    await this.loadHistory();
	await this.getHistory();
  },
  methods: {    
    // 跳转到商品详情
    async gotoDetail(goods_id) {
		try {
		  // 1. 先增加浏览次数
		  console.log('📊 增加商品浏览次数:', goods_id);
		  const { data: res } = await uni.$http.post('/goods/view', {
		    goods_id: goods_id,
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
        url: `/subpkg/goods_detail/goods_detail?goods_id=${goods_id}`
      });
    },
    
    // 实际使用时的接口调用示例
    async loadHistory() {
      try {
		  let res;
		  const queryObj = {code: this.openid};
		  switch(this.activeTab)  {
			  case 0: const { data: commentData } = await uni.$http.get('/users/comment', queryObj);
			  res = commentData;
			  break;
			  
		  }
        if (res.meta.status === 200) {
          switch(this.activeTab) {
            case 0: this.commentedList = res.data; break;
          }
        }
      } catch (error) {
        console.error('加载历史记录失败:', error);
      }
    },
	
	async getHistory() {
		try {
			let res;
			const queryObj = {goods_id: this.historyList}
			switch(this.activeTab) {
				case 0: const { data: commentData1 } = await uni.$http.get('/goods/historysearch', queryObj);
				res = commentData1;
				break;
			}
			if (res.meta.status === 200) { 
				switch(this.activeTab) {
				  case 0: this.commentedList = res.message; break;
				}
			}
		} catch (error) {
			console.log('加载历史记录失败:', error);
		}
	},
    
    async clearHistoryAPI() {
      try {
        const { data: res } = await uni.$http.post('/user/history/clear', {
          type: this.activeTab
        });
        if (res.meta.status === 200) {
          uni.showToast({ title: '清空成功', icon: 'success' });
        }
      } catch (error) {
        console.error('清空失败:', error);
      }
    }
  },
};
</script>

<style lang="scss">
.history-page {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

// 顶部标题栏
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 32rpx;
  background: #fff;
  border-bottom: 1rpx solid #e5e5e5;

  .header-title {
    font-size: 36rpx;
    font-weight: 700;
    color: #333;
  }

  .clear-btn {
    font-size: 28rpx;
    color: #ff4444;
    padding: 8rpx 16rpx;
  }
}

// 选项卡容器
.tabs-container {
  display: flex;
  background: #fff;
  padding: 0 32rpx;
  border-bottom: 1rpx solid #e5e5e5;

  .tab-item {
    flex: 1;
    text-align: center;
    padding: 24rpx 0;
    font-size: 28rpx;
    color: #666;
    position: relative;
    transition: all 0.3s;

    &.active {
      color: #333;
      font-weight: 600;

      .tab-indicator {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60rpx;
        height: 4rpx;
        background: #ff4444;
        border-radius: 2rpx;
      }
    }
  }
}

// 商品列表
.goods-list {
  flex: 1;
  padding: 20rpx;
}

.goods-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.goods-item {
  width: 48%;
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);

  .goods-image {
    width: 100%;
    height: 340rpx;
    display: block;
    background: #f0f0f0;
  }

  .goods-price {
    padding: 16rpx 20rpx;
    display: flex;
    align-items: baseline;

    .price-symbol {
      font-size: 24rpx;
      color: #ff4444;
      font-weight: 600;
    }

    .price-number {
      font-size: 36rpx;
      color: #ff4444;
      font-weight: 700;
      margin-left: 4rpx;
    }
  }
}

// 空状态
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600rpx;

  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}
</style>

