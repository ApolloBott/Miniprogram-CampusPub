<template>
   <view class="goods-detail-page">
      <!-- 🔥 修改搜索栏 - 添加隐藏动画 -->
      <view class="search-box" :class="{ 'hide': hideSearchBar }">
        <view class="search-wrapper">
          <view class="search-content">
            <my-search @click="gotoSearch"></my-search>
          </view>
		  
         <!-- 🔥 新增：按钮容器 -->
           <view class="action-buttons">
             <button class="share-btn" open-type="share" @click.stop v-if="openid">
               <uni-icons type="redo" size="24" color="#333"></uni-icons>
             </button>
             
             <text
               class="more-btn" 
               @click="showPostMenu" 
               v-if="goods_info.publisher_id !== openid"
             >⋮</text>
           </view>
         </view>
      </view>
 
    <scroll-view 
          scroll-y 
          class="scroll-content" 
          :style="'height: calc(100vh - ' + (searchHeight + bottomBarHeight) + 'px)'"
          @scroll="onScroll"
        >
      <view class="content-wrapper">
        <!-- 发布者信息区域 -->
        <view class="publisher-section">
          <image 
            :src=publisher_info.avatarUrl
            class="publisher-avatar"
            mode="aspectFill" @click="gotoPublisherProfile()"
          ></image>
          <view class="publisher-info">
            <view class="publisher-name-row">
			<view class="user-info">
              <text class="publisher-name" @click="gotoPublisherProfile()">{{publisher_info.nickname}}</text>
			  <view class="post-meta">
			  	<text class="post-views">{{ goods_info.view_count || 0 }}人浏览</text>
			  </view>
			</view>
              <!-- 🔥 新增：认证标识 -->
            </view>
            <view class="publisher-meta">
            </view>
          </view>
          <!-- 关注按钮 -->
          <view :class="['follow-btn', isFollowing ? 'following' : '']" @click="toggleFollow" v-if="goods_info.publisher_id !== userBase.openid">
            <text>{{ isFollowing ? '已关注' : '+ 关注' }}</text>
          </view>
        </view>
		
		<!-- 🔥 商品基础信息卡片 -->
		<view class="goods-basic-info">
		  <!-- 商品名称 -->
		  <view class="goods-name-section">
		    <text class="goods-name">{{ goods_info.goods_name }}</text>
		  </view>
		  
		  <!-- 价格和位置信息行 -->
		  <view class="price-location-row">
		    <!-- 左侧价格 -->
		    <view class="price-container">
		      <text class="price-symbol">¥</text>
		      <text class="price-value">{{ goods_info.goods_price }}</text>
		    </view>
			  
		    <!-- 右侧位置信息 -->
		    <view class="location-container">
		      <text class="location-text">{{ goods_info.location || '闵行' }}校区</text>
		    </view>
		  </view>
		  
		
		  <!-- 🔥 分类标签行 -->
		</view>
        

        <!-- 商品轮播图 -->
        <view class="goods-images-section">
          <swiper 
            class="goods-swiper"
            :indicator-dots="true" 
            :autoplay="true" 
            :interval="3000" 
            :duration="1000" 
            :circular="true"
			@change="onSwiperChange"
          >
            <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
              <image 
                :src=item.pics_big 
                class="swiper-image"
                mode="aspectFit"
                @click="preview(i)"
              ></image>
            </swiper-item>
          </swiper>
          
          <!-- 图片计数器 -->
          <view class="image-counter">
            <text>{{ currentImageIndex + 1 }}/{{ (goods_info.pics && goods_info.pics.length) || 0 }}</text>
          </view>
        </view>

        <!-- 留言区域 -->
        <view class="comments-section">
          <!-- 留言标题栏 -->
          <view class="section-header">
            <view class="section-title-wrapper">
              <text class="section-title">留言 {{ comments.length }}</text>
            </view>
            <view class="more-btn" @click="openMessage">
              <text class="more-text">查看全部</text>
              <uni-icons type="arrowright" color="#999" size="16"></uni-icons>
            </view>
          </view>
        
          <!-- 快速留言输入框 - 修改点击事件 -->
          <view class="quick-comment-box" @click="showQuickReply">
            <image 
              :src="userBase.avatarUrl || '/images/1.jpg'" 
              class="quick-comment-avatar" 
              mode="aspectFill"
            ></image>
            <view class="quick-comment-input-placeholder">
              <text>说点什么...</text>
            </view>
          </view>
        
          <!-- 留言列表 -->
          <view class="comment-item" v-for="(comment, index) in displayedComments" :key="index">
            <!-- 点击整个留言区域可以回复 -->
            <view class="comment-main-content" @click="showReplyInput(index, comment)">
              <view class="comment-header">
                <image :src="comment.avatarUrl" class="comment-avatar" mode="aspectFill" @click.stop="gotoProfile(comment.user_openid)"></image>
                <view class="comment-user-info">
                  <text class="comment-username">{{ comment.nickname }}</text>
                  <text class="comment-time">{{ RelativeTime(comment.created_at) }}</text>
                </view>
              </view>
              <!-- 🔥 改为支持表情的富文本显示 -->
              <view class="comment-content">
                <rich-text :nodes="parseEmoji(comment.content)"></rich-text>
              </view>
            </view>
            
            <!-- 回复列表 -->
            <view class="replies-section" v-if="comment.replies && comment.replies.length > 0">
              <view 
                class="reply-item" 
                v-for="(reply, rIndex) in comment.displayReplies" 
                :key="rIndex"
              >
                <image :src="reply.avatarUrl" class="reply-avatar" mode="aspectFill" @click.stop="gotoProfile(reply.user_openid)"></image>
                <!-- 🔥 改为支持表情 -->
                <view class="reply-content-wrapper">
                  <text class="reply-username">{{ reply.nickname }}：</text>
                  <rich-text :nodes="parseEmoji(reply.content)"></rich-text>
                </view>
              </view>
              
              <view class="show-more-replies" v-if="comment.replies.length > 1 && !comment.showAllReplies" @click.stop="toggleShowAllReplies(index)">
                <text>查看{{ comment.replies.length }}条回复</text>
                <text class="iconfont icon-arrow-down"></text>
              </view>
              
              <view class="show-more-replies" v-if="comment.showAllReplies" @click.stop="toggleShowAllReplies(index)">
                <text>收起回复</text>
                <text class="iconfont icon-arrow-up"></text>
              </view>
            </view>
          </view>
        </view>

      </view>
    
  </scroll-view>
    <!-- 底部操作栏 - 其他用户查看 -->
    <view class="bottom-bar" v-if="goods_info.publisher_id !== userBase.openid">
      <view class="bar-item" @click="openMessage">
        <uni-icons type="chatbubble" size="30" color="#666"></uni-icons>
      </view>
	  <text class="bar-text" @click="openMessage">留言</text>
      <view class="bar-item" @click="toggleCollect">
        <uni-icons :type="isCollected ? 'star-filled' : 'star'" size="30" :color="isCollected ? '#ffd700' : '#666'"></uni-icons>
      </view>
	  <text class="bar-text"  @click="toggleCollect">{{ isCollected ? '已收藏' : '收藏' }}</text>
      <view class="bar-btn chat-btn" @click="startChat">
        <text>联系卖家</text>
      </view>
    </view>

    <!-- 底部操作栏 - 自己的商品 -->
    <view class="bottom-bar" v-else>
      <view class="bar-item" @click="openMessage">
        <uni-icons type="chatbubble" size="30" color="#666"></uni-icons>
      </view>
	  <text class="bar-text" @click="openMessage">留言</text>
      <view class="bar-item" @click="toggleCollect">
        <uni-icons :type="isCollected ? 'star-filled' : 'star'" size="30" :color="isCollected ? '#ffd700' : '#666'"></uni-icons>
      </view>
	  <text class="bar-text" @click="toggleCollect">{{ isCollected ? '已收藏' : '收藏' }}</text>
      <view class="bar-btn manage-btn" @click="manageGoods">
        <text>管理商品</text>
      </view>
    </view>

    <!-- 留言弹窗遮罩层 -->
    <view 
      class="message-overlay" 
      :class="{ 'show': showMessagePanel }"
      @click="closeMessage"
    ></view>

    <!-- 留言弹窗 -->
    <view 
      class="message-panel" 
      :class="{ 'show': showMessagePanel }"
      @click.stop
    >
      <!-- 留言标题栏 - 居中显示 -->
      <view class="message-header">
        <view class="message-title-wrapper">
          <text class="message-title">全部留言</text>
          <text class="message-count">({{ comments.length }})</text>
        </view>
        <view @click="closeMessage">
          <uni-icons type="closeempty" size="20" color="#999"></uni-icons>
        </view>
      </view>

      <!-- 留言列表 -->
      <scroll-view scroll-y class="message-list" :scroll-into-view="scrollIntoView">
        <view class="message-item" v-for="(comment, index) in comments" :key="index" :id="'msg-' + index">
          <!-- 修改：点击整个留言区域可以回复 -->
          <view class="message-main-content" @click="showReplyInput(index, comment)">
            <image :src="comment.avatarUrl" class="message-avatar" mode="aspectFill" @click.stop="gotoProfile(comment.user_openid)"></image>
            <view class="message-content-wrapper">
              <view class="message-user-info">
                <text class="message-username">{{ comment.nickname }}</text>
                <text class="message-time">{{ RelativeTime(comment.created_at) }}</text>
              </view>
              <!-- 🔥 改为支持表情 -->
              <view class="message-text">
                <rich-text :nodes="parseEmoji(comment.content)"></rich-text>
              </view>
            </view>
            <!-- 点赞按钮 -->
            <!-- <view class="like-btn" @click.stop="toggleCommentLike(comment, index)">
              <uni-icons 
                :type="comment.isLiked ? 'heart-filled' : 'heart'" 
                size="18" 
                :color="comment.isLiked ? '#ff6b6b' : '#999'"
              ></uni-icons>
              <text class="like-count" v-if="comment.likeCount > 0">{{ comment.likeCount }}</text>
            </view> -->
          </view>
          
          <!-- 回复列表 -->
          <view class="replies-section-in-panel" v-if="comment.replies && comment.replies.length > 0">
            <view 
              class="reply-item" 
              v-for="(reply, rIndex) in comment.displayReplies" 
              :key="rIndex"
              @click="showReplyToReply(reply, comment)"
            >
              <image :src="reply.avatarUrl" class="reply-avatar" mode="aspectFill" @click.stop="gotoProfile(reply.user_openid)"></image>
              <view class="reply-content-wrapper">
                <text class="reply-username">{{ reply.nickname }}：</text>
                <rich-text :nodes="parseEmoji(reply.content)"></rich-text>
              </view>
              <!-- 回复的点赞按钮 -->
              <!-- <view class="reply-like-btn" @click.stop="toggleReplyLike(reply, index, rIndex)">
                <uni-icons 
                  :type="reply.isLiked ? 'heart-filled' : 'heart'" 
                  size="16" 
                  :color="reply.isLiked ? '#ff6b6b' : '#999'"
                ></uni-icons>
                <text class="like-count" v-if="reply.likeCount > 0">{{ reply.likeCount }}</text>
              </view> -->
            </view>
            
            <view class="show-more-replies" v-if="comment.replies.length > 1 && !comment.showAllReplies" @click.stop="toggleShowAllReplies(index)">
              <text>查看{{ comment.replies.length }}条回复</text>
            </view>
            
            <view class="show-more-replies" v-if="comment.showAllReplies" @click.stop="toggleShowAllReplies(index)">
              <text>收起回复</text>
            </view>
          </view>
        </view>
      </scroll-view>

      <!-- 留言输入框 -->
      <view class="message-input-box">
        <input 
          class="message-input"
          v-model="newComment"
          placeholder="说点什么..."
          :adjust-position="true"
          @confirm="sendComment"
        />
        <!-- 🔥 新增：表情按钮 -->
        <view class="emoji-btn-inline" @click="showEmojiSelector('message')">
          <text>{{ showEmojiSelector ? '⌨️' : '😊' }}</text>
        </view>
        <view 
          class="send-btn" 
          :class="{ 'active': newComment.trim() }"
          @click="sendComment"
        >
          <text>发送</text>
        </view>
      </view>
    </view>

    <!-- 回复输入框遮罩层 -->
    <view 
      class="reply-overlay" 
      :class="{ 'show': showReplyPanel }"
      @click="closeReply"
    ></view>

    <!-- 回复输入框弹窗 -->
    <view 
      class="reply-panel" 
      :class="{ 'show': showReplyPanel }"
      @click.stop
    >
      <view class="reply-header">
        <text class="reply-title">回复 {{ replyToUser }}</text>
        <view @click="closeReply">
          <uni-icons type="closeempty" size="20" color="#999"></uni-icons>
        </view>
      </view>
      
      <view class="reply-input-box">
        <textarea 
          class="reply-textarea"
          v-model="newReply"
          :placeholder="'回复 ' + replyToUser + '...'"
          :adjust-position="true"
          :focus="showReplyPanel"
          auto-height
          maxlength="500"
          @confirm="sendReply"
        ></textarea>
        <view class="reply-actions">
          <!-- 🔥 新增：表情按钮 -->
          <view class="emoji-btn" @click="showEmojiSelector('reply')">
			  <text>{{ showEmojiSelector ? '⌨️' : '😊' }}</text>
            <!-- <uni-icons type="emotion" size="24" color="#666"></uni-icons> -->
          </view>
          <view class="char-count">{{ newReply.length }}/500</view>
          <view 
            class="send-btn" 
            :class="{ 'active': newReply.trim() }"
            @click="sendReply"
          >
            <text>发送</text>
          </view>
        </view>
      </view>
    </view>
	
	<!-- 🔥 新增:快速留言弹窗 -->
	<view 
	  class="quick-reply-overlay" 
	  :class="{ 'show': showQuickReplyPanel }"
	  @click="closeQuickReply"
	></view>
	
	<view 
	  class="quick-reply-panel" 
	  :class="{ 'show': showQuickReplyPanel }"
	  @click.stop
	>
	  <view class="quick-reply-header">
	    <text class="quick-reply-title">发表留言</text>
	    <view @click="closeQuickReply">
	      <uni-icons type="closeempty" size="20" color="#999"></uni-icons>
	    </view>
	  </view>
	  
	  <view class="quick-reply-input-box">
	    <textarea 
	      class="quick-reply-textarea"
	      v-model="quickComment"
	      placeholder="说点什么..."
	      :adjust-position="true"
	      :focus="showQuickReplyPanel"
	      auto-height
	      maxlength="500"
	      @confirm="sendQuickComment"
	    ></textarea>
	    <view class="quick-reply-actions">
	      <!-- 🔥 新增：表情按钮 -->
	      <view class="emoji-btn" @click="showEmojiSelector('quick')">
			  <text>{{ showEmojiSelector ? '⌨️' : '😊' }}</text>
	        <!-- <uni-icons type="emotion" size="24" color="#666"></uni-icons> -->
	      </view>
	      <view class="char-count">{{ quickComment.length }}/500</view>
	      <view 
	        class="send-btn" 
	        :class="{ 'active': quickComment.trim() }"
	        @click="sendQuickComment"
	      >
	        <text>发送</text>
	      </view>
	    </view>
	  </view>
	</view>
	<!-- 🔥 表情选择器遮罩层 -->
	<view 
	  class="emoji-picker-overlay" 
	  :class="{ 'show': showEmojiPicker }"
	  @click="closeEmojiPicker"
	></view>
	
	<!-- 🔥 表情选择器弹窗 -->
	<view 
	  class="emoji-picker-panel" 
	  :class="{ 'show': showEmojiPicker }"
	  @click.stop
	>
	  <view class="emoji-picker-header">
	    <text class="emoji-picker-title">选择表情</text>
	    <view @click="closeEmojiPicker">
	      <uni-icons type="closeempty" size="20" color="#999"></uni-icons>
	    </view>
	  </view>
	  
	  <scroll-view scroll-y class="emoji-grid-container">
	    <view class="emoji-grid">
	      <view 
	        class="emoji-item" 
	        v-for="emoji in emojiList" 
	        :key="emoji.id"
	        @click="selectEmoji(emoji)"
	      >
	        <image 
	          :src="emoji.url" 
	          class="emoji-icon" 
	          mode="aspectFit"
	        ></image>
	      </view>
	    </view>
	  </scroll-view>
	</view>
	
	<!-- 🔥 新增：购买确认弹窗遮罩层 -->
	<view 
	  class="buy-overlay" 
	  :class="{ 'show': showBuyPanel }"
	  @click="closeBuyPanel"
	></view>
	
	<!-- 🔥 新增：购买确认弹窗 -->
	<view 
	  class="buy-panel" 
	  :class="{ 'show': showBuyPanel }"
	  @click.stop
	>
	  <!-- 弹窗标题栏 -->
	  <view class="buy-header">
	    <text class="buy-title">确认购买</text>
	    <view @click="closeBuyPanel">
	      <uni-icons type="closeempty" size="20" color="#999"></uni-icons>
	    </view>
	  </view>
	
	  <!-- 商品信息 -->
	  <view class="buy-goods-info">
	    <image 
	      :src="goods_info.goods_big_logo" 
	      class="buy-goods-image" 
	      mode="aspectFill"
	    ></image>
	    <view class="buy-goods-detail">
	      <text class="buy-goods-name">{{ goods_info.goods_name }}</text>
	      <view class="buy-goods-price-row">
	        <text class="buy-price-symbol">¥</text>
	        <text class="buy-price-value">{{ goods_info.goods_price }}</text>
	      </view>
	    </view>
	  </view>
	
	  <!-- 收货地址输入 -->
	  <view class="buy-address-section">
	    <view class="buy-section-title">
	      <text>收货地址</text>
	      <text class="required-mark">*</text>
	    </view>
	    <textarea 
	      class="buy-address-input"
	      v-model="deliveryAddress"
	      placeholder="请输入详细的收货地址（如：xx校区xx号楼xx室）"
	      :adjust-position="true"
	      auto-height
	      maxlength="200"
	    ></textarea>
	    <view class="address-char-count">{{ deliveryAddress.length }}/200</view>
	    
	    <!-- 设为默认地址 -->
	    <view class="default-address-checkbox" @click="setAsDefault = !setAsDefault">
	      <view class="checkbox-wrapper">
	        <view class="checkbox" :class="{ 'checked': setAsDefault }">
	          <text v-if="setAsDefault" class="checkbox-icon">✓</text>
	        </view>
	        <text class="checkbox-label">设为默认地址</text>
	      </view>
	    </view>
	  </view>
	
	  <!-- 购买按钮 -->
	  <view class="buy-action-section">
	    <view 
	      class="confirm-buy-btn" 
	      :class="{ 'active': deliveryAddress.trim() }"
	      @click="confirmPurchase"
	    >
	      <text>立即购买</text>
	    </view>
	  </view>
	</view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import uniIcon from '@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue'

export default {
	// components: {
	//     uniIcon
	//   }
  data() {
    return {
      goods_info: {},
	  addstr: '22号宿舍楼',
      publisher_info: {},
      isFollowing: false,
      isCollected: false,
      searchHeight: 44,
      bottomBarHeight: 60,
      reviews: [
        {
          userAvatar: '/images/1.jpg',
          username: '来自中国湖北...',
          time: '7天前',
          content: '五星好评。\n物美价廉'
        },
        {
          userAvatar: '/images/2.jpg',
          username: '来自中国安徽...',
          time: '8天前',
          content: '没问题。😍😍😍😍'
        }
      ],
      comments: [],
      queryObj: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 6
      },
      goodsList: [],
      total: 0,
      isloading: false,
      goods_id: 0,
      showMessagePanel: false,
      newComment: '',
      scrollIntoView: '',
      viewCount: 0,
      // 新增：回复相关数据
      showReplyPanel: false,
      newReply: '',
      replyToUser: '',
      replyToCommentIndex: null,
      replyToComment: null,
	  quickComment: '',
	  goodsCategories: [],
	  showReplyPanel: false,
	  replyToUser: '',
	  newReply: '',
	  replyTarget: null, // 存储回复目标信息
	  replyType: '', // 'comment' 或 'reply'
	  currentImageIndex: 0,
	  // 🔥 新增:快速留言相关
	  showQuickReplyPanel: false,  // 控制快速留言弹窗显示
	  quickComment: '',            // 快速留言内容
	  hideSearchBar: false,      // 控制搜索栏显示/隐藏
	  lastScrollTop: 0,          // 上一次滚动的位置
	  scrollThreshold: 120,       // 滚动阈值(像素)
	    // 🔥 新增：表情包相关数据
	      showEmojiPicker: false,  // 控制表情选择器显示
	      currentInputType: '',    // 'quick' | 'message' | 'reply' - 记录当前输入框类型
	      emojiList: [
	        { id: 1, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-1.png', code: '[微笑]' },
	        { id: 2, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-2.png', code: '[大笑]' },
	        { id: 3, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-3.png', code: '[笑哭]' },
	        { id: 4, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-4.png', code: '[难过]' },
	        { id: 5, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-5.png', code: '[大哭]' },
	        { id: 6, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-6.png', code: '[疑问]' },
	        { id: 7, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-7.png', code: '[爱心]' },
	        { id: 8, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-8.png', code: '[得意]' },
	        { id: 9, url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-9.png', code: '[惊恐]' },
	      ],
		  // 🔥 新增：购买确认弹窗相关
		      showBuyPanel: false,           // 控制购买弹窗显示
		      deliveryAddress: '',           // 收货地址
		      setAsDefault: false,           // 是否设为默认地址
		      defaultAddress: '',            // 默认地址
	  
    };
  },
  async onLoad(options) {
    this.goods_id = options.goods_id
    await this.getIfCollected()
    await this.getGoodsDetail(this.goods_id)
    await this.getIfFollowed()
    await this.getPublisher()
    this.getGoodsList()
    this.saveHistory()
    
    // 初始化留言数据
    this.comments = this.goods_info.comment
    this.comments = this.comments.map(comment => ({
      ...comment,
      isLiked: false,
      showAllReplies: false,
      displayReplies: comment.replies ? comment.replies.slice(0, 1) : []
    }));
    
    if (this.token) {
      const code = this.openid
      const queryObj = {code: code};
      const { data: res } = await uni.$http.get('/users/userinfo', queryObj);
      if (res.meta.status === 200) {
        console.log(res.message)
        this.updateUserBase(res.message)
      }
      this.getGoodsList();
    }
  },
  methods: {
    ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase']),	
	
	// 显示帖子菜单
	showPostMenu() {
			uni.showActionSheet({
				itemList: ['举报'],
				success: (res) => {
					if (res.tapIndex === 0) {
						this.reportUser()
					}
				}
			})
	},
	
	// 举报用户
			reportUser() {
				// 安全检查
				if (!this.openid) {
						  // 弹出登录提示框
						  uni.showModal({
						    title: '提示',
						    content: '需要登录才能体验更多内容哦',
						    cancelText: '取消',
						    confirmText: '登录',
						    success: (res) => {
						      if (res.confirm) {
						        // 用户点击了"登录"按钮
						        uni.switchTab({
						          url: '/pages/my/my'
						        })
						      }
						      // 用户点击了"取消"按钮，不做任何操作
						    }
						  })
						  return
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
								goods_id: this.goods_id, // 相关帖子ID
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
			
	// 🔥 新增：分享给好友
	  onShareAppMessage(res) {
	 if (!this.openid) {
	 		  // 弹出登录提示框
	 		  uni.showModal({
	 		    title: '提示',
	 		    content: '需要登录才能体验更多内容哦',
	 		    cancelText: '取消',
	 		    confirmText: '登录',
	 		    success: (res) => {
	 		      if (res.confirm) {
	 		        // 用户点击了"登录"按钮
	 		        uni.switchTab({
	 		          url: '/pages/my/my'
	 		        })
	 		      }
	 		      // 用户点击了"取消"按钮，不做任何操作
	 		    }
	 		  })
	 		  return
	 		}
	
	    return {
	      title: this.goods_info.goods_name || '发现一个好物推荐给你',
	      path: `/subpkg/goods_detail/goods_detail?goods_id=${this.goods_id}`,
	      imageUrl: this.goods_info.goods_big_logo || ''
	    };
	  },
	  
	// 🔥 新增：显示表情选择器
	  showEmojiSelector(type) {
	    this.currentInputType = type;
	    this.showEmojiPicker = true;
	  },
	  
	  // 🔥 新增：关闭表情选择器
	  closeEmojiPicker() {
	    this.showEmojiPicker = false;
	  },
	  
	  // 🔥 修改：选择表情后自动关闭
	  selectEmoji(emoji) {
	    // 根据当前输入框类型插入表情代码
	    switch(this.currentInputType) {
	      case 'quick':
	        this.quickComment += emoji.code;
	        break;
	      case 'message':
	        this.newComment += emoji.code;
	        break;
	      case 'reply':
	        this.newReply += emoji.code;
	        break;
	    }
	    
	    // ✅ 选择后自动关闭表情选择器
	    this.closeEmojiPicker();
	  },

		// 🔥 新增：解析表情代码为HTML（用于显示）
		  parseEmoji(content) {
		    if (!content) return '';
		    
		    let result = content;
		    
		    // 遍历所有表情，替换表情代码为图片标签
		    this.emojiList.forEach(emoji => {
		      const regex = new RegExp(emoji.code.replace(/\[/g, '\\[').replace(/\]/g, '\\]'), 'g');
		      result = result.replace(regex, `<img src="${emoji.url}" class="emoji-image" />`);
		    });
		    
		    return result;
		  },
		  
	 // 🔥 新增：监听滚动事件
	    onScroll(e) {
	      const scrollTop = e.detail.scrollTop;
	      
	      // 判断是上滑还是下滑
	      if (scrollTop > this.lastScrollTop) {
	        // 上滑：隐藏搜索栏
	        if (scrollTop > this.scrollThreshold) {
	          this.hideSearchBar = true;
	        }
	      } else {
	        // 下滑：显示搜索栏
	        this.hideSearchBar = false;
	      }
	      
	      this.lastScrollTop = scrollTop;
	    },	  
	
	// 🔥 新增:显示快速留言输入框
	  showQuickReply() {
	   if (!this.openid) {
	   		  // 弹出登录提示框
	   		  uni.showModal({
	   		    title: '提示',
	   		    content: '需要登录才能体验更多内容哦',
	   		    cancelText: '取消',
	   		    confirmText: '登录',
	   		    success: (res) => {
	   		      if (res.confirm) {
	   		        // 用户点击了"登录"按钮
	   		        uni.switchTab({
	   		          url: '/pages/my/my'
	   		        })
	   		      }
	   		      // 用户点击了"取消"按钮，不做任何操作
	   		    }
	   		  })
	   		  return
	   		}
	    
	    this.showQuickReplyPanel = true;
	    this.quickComment = '';
	  },
	  
	  // 🔥 新增:关闭快速留言输入框
	  closeQuickReply() {
	    this.showQuickReplyPanel = false;
	    this.quickComment = '';
	  },
	  
	// 🔥 新增：监听轮播图切换
	  onSwiperChange(e) {
	    this.currentImageIndex = e.detail.current;
	  },
					  
	// 🔥🔥🔥 新增:获取分类图标 🔥🔥🔥
	  getCategoryIcon(category) {
	    const iconMap = {
	      '思政课资料': '📖',
	      '英语资料': '🔤',
	      '体育课器材': '⚽',
	      '通识课程资料': '🎓',
	      '基础课程资料': '📚',
	      '考研资料': '📝',
	      '期末资料': '📄',
		  '学习用书': '📄',
		  '学习工具': '📄',
		  '日用品': '📄',
		  '穿搭': '📄',
		  '家教': '📄',
	      '其他好物': '📦'
	    }
		 return iconMap[category] || '🏷️'
		},
		
		// 🔥 修改：显示购买确认弹窗
		ShowBuyPanel() {
		if (!this.openid) {
				  // 弹出登录提示框
				  uni.showModal({
				    title: '提示',
				    content: '需要登录才能体验更多内容哦',
				    cancelText: '取消',
				    confirmText: '登录',
				    success: (res) => {
				      if (res.confirm) {
				        // 用户点击了"登录"按钮
				        uni.switchTab({
				          url: '/pages/my/my'
				        })
				      }
				      // 用户点击了"取消"按钮，不做任何操作
				    }
				  })
				  return
				}
		  
		  // 加载默认地址
		  this.loadDefaultAddress();
		  this.showBuyPanel = true;
		},
		
		// 🔥 新增：关闭购买弹窗
		closeBuyPanel() {
		  this.showBuyPanel = false;
		},
		
		// 🔥 新增：加载默认地址
		async loadDefaultAddress() {
		  try {
		    // 从本地存储获取默认地址
		    const defaultAddr = uni.getStorageSync('default_delivery_address_' + this.openid);
		    if (defaultAddr) {
		      this.defaultAddress = defaultAddr;
		      this.deliveryAddress = defaultAddr;
		    }
		  } catch (error) {
		    console.error('加载默认地址失败:', error);
		  }
		},
		
		// 🔥 新增：保存默认地址
		saveDefaultAddress() {
		  if (this.setAsDefault && this.deliveryAddress.trim()) {
		    try {
		      uni.setStorageSync('default_delivery_address_' + this.openid, this.deliveryAddress.trim());
		      uni.showToast({
		        title: '已设为默认地址',
		        icon: 'success',
		        duration: 1500
		      });
		    } catch (error) {
		      console.error('保存默认地址失败:', error);
		    }
		  }
		},
		
		// 🔥 修改：确认购买方法
		async confirmPurchase() {
			if (!this.openid) {
					  // 弹出登录提示框
					  uni.showModal({
					    title: '提示',
					    content: '需要登录才能体验更多内容哦',
					    cancelText: '取消',
					    confirmText: '登录',
					    success: (res) => {
					      if (res.confirm) {
					        // 用户点击了"登录"按钮
					        uni.switchTab({
					          url: '/pages/my/my'
					        })
					      }
					      // 用户点击了"取消"按钮，不做任何操作
					    }
					  })
					  return
					}
		  // 验证地址
		  const address = this.deliveryAddress.trim();
		  if (!address) {
		    uni.showToast({
		      title: '请输入收货地址',
		      icon: 'none'
		    });
		    return;
		  }
		  
		  // 如果勾选了设为默认，保存地址
		  if (this.setAsDefault) {
		    this.saveDefaultAddress();
		  }
		  
		  // 关闭弹窗
		  this.closeBuyPanel();
		  
		  // 执行原有的支付逻辑
		  try {
		    // 1. 创建订单
		    const orderInfo = {
		      order_price: 0.01,
		      consignee_addr: address,  // 使用用户输入的地址
		      goods: this.goods_info,
		      openid: this.openid
		    };
		
		    const { data: res } = await uni.$http.post('/orders/create', orderInfo);
		    if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！');
		
		    const orderNumber = res.message.order_number;
		
		    // 2. 订单预支付
		    const { data: res2 } = await uni.$http.post('/orders/req_unifiedorder', { order_number: orderNumber });
		    if (res2.meta.status !== 200) return uni.$showMsg('预付订单生成失败！');
		
		    const payInfo = res2.message.pay;
		
		    // 3. 发起微信支付
		    const [err, succ] = await uni.requestPayment(payInfo);
		    if (err) return uni.$showMsg('订单未支付！');
		
		    const { data: res3 } = await uni.$http.post('/orders/chkOrder', { order_number: orderNumber });
		    if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！');
		
		    uni.showToast({
		      title: '订单支付完成！',
		      icon: 'success'
		    });
		  } catch (error) {
		    console.error('支付失败:', error);
		    uni.showToast({
		      title: '支付失败，请重试',
		      icon: 'none'
		    });
		  }
		},
		
	async payOrder() {
	        // 1. 创建订单
	        // 1.1 组织订单的信息对象
	        const orderInfo = {
	          // order_price: this.checkedGoodsAmount,
	          order_price: 0.01,
	          consignee_addr: this.addstr,
	          goods: this.goods_info,
			  openid: this.openid
	        }
	
	        // 1.2 发起请求创建订单
	        const { data: res } = await uni.$http.post('/orders/create', orderInfo)
	        if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
	
	        // 1.3 得到服务器响应的“订单编号”
	        const orderNumber = res.message.order_number
	
	        // 2. 订单预支付
	        // 2.1 发起请求获取订单的支付信息
	        const { data: res2 } = await uni.$http.post('/orders/req_unifiedorder', { order_number: orderNumber })
	        // 2.2 预付订单生成失败
	        if (res2.meta.status !== 200) return uni.$showMsg('预付订单生成失败！')
	        // 2.3 得到订单支付相关的必要参数
	        const payInfo = res2.message.pay
	
	        // 3. 发起微信支付
	        // 3.1 调用 uni.requestPayment() 发起微信支付
	        const [err, succ] = await uni.requestPayment(payInfo)
	        // 3.2 未完成支付
	        if (err) return uni.$showMsg('订单未支付！')
	        // 3.3 完成了支付，进一步查询支付的结果
	        const { data: res3 } = await uni.$http.post('/orders/chkOrder', { order_number: orderNumber })
	        // 3.4 检测到订单未支付
	        if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
	        // 3.5 检测到订单支付完成
	        uni.showToast({
	          title: '订单支付完成！',
	          icon: 'success'
	        })
	      },
		  
    // 新增：显示回复输入框
    showReplyInput(index, comment) {
		if (!this.openid) {
				  // 弹出登录提示框
				  uni.showModal({
				    title: '提示',
				    content: '需要登录才能体验更多内容哦',
				    cancelText: '取消',
				    confirmText: '登录',
				    success: (res) => {
				      if (res.confirm) {
				        // 用户点击了"登录"按钮
				        uni.switchTab({
				          url: '/pages/my/my'
				        })
				      }
				      // 用户点击了"取消"按钮，不做任何操作
				    }
				  })
				  return
				}
      this.replyToCommentIndex = index;
      this.replyToComment = comment;
      this.replyToUser = comment.nickname;
      this.showReplyPanel = true;
      this.newReply = '';
    },
    
    // 新增：关闭回复输入框
    closeReply() {
      this.showReplyPanel = false;
      this.newReply = '';
      this.replyToCommentIndex = null;
      this.replyToComment = null;
      this.replyToUser = '';
    },
    
async sendReply() {
  if (!this.openid) {
  		  // 弹出登录提示框
  		  uni.showModal({
  		    title: '提示',
  		    content: '需要登录才能体验更多内容哦',
  		    cancelText: '取消',
  		    confirmText: '登录',
  		    success: (res) => {
  		      if (res.confirm) {
  		        // 用户点击了"登录"按钮
  		        uni.switchTab({
  		          url: '/pages/my/my'
  		        })
  		      }
  		      // 用户点击了"取消"按钮，不做任何操作
  		    }
  		  })
  		  return
  		}

  const content = this.newReply.trim();
  if (!content) {
    uni.showToast({
      title: '请输入回复内容',
      icon: 'none'
    });
    return;
  }

  // 🔥 新增：文本内容安全检测
  uni.showLoading({
    title: '检测内容...',
    mask: true
  });

  const isTextSafe = await this.checkTextSafety(content);
  uni.hideLoading();

  if (!isTextSafe) {
    uni.showModal({
      title: '内容违规',
      content: '回复内容包含违规信息，请修改后重试',
      showCancel: false,
      confirmText: '我知道了'
    });
    return;
  }

  // ✅ 检测通过，继续发送回复
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const targetCommentId = this.replyToComment.comment_id;

  const newReplyObj = {
    reply_id: 'reply_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    user_openid: this.userBase.openid,
    nickname: this.userBase.nickname,
    avatarUrl: this.userBase.avatarUrl || '/images/1.jpg',
    content: content,
    created_at: currentTimestamp
  };

  const targetComment = this.comments.find(c => c.comment_id === targetCommentId);
  
  if (!targetComment) {
    uni.showToast({
      title: '留言不存在',
      icon: 'none'
    });
    return;
  }

  if (!targetComment.replies) {
    targetComment.replies = [];
  }
  targetComment.replies.push(newReplyObj);

  if (!targetComment.showAllReplies) {
    targetComment.displayReplies = targetComment.replies.slice(0, 1);
  } else {
    targetComment.displayReplies = targetComment.replies;
  }

  this.closeReply();

  // 保存到后端
  try {
    const { data: res } = await uni.$http.post('/goods/reply', {
      comment_id: targetCommentId,
      user_openid: this.userBase.openid,
      nickname: this.userBase.nickname,
      avatarUrl: this.userBase.avatarUrl || '/images/1.jpg',
      content: content,
      created_at: currentTimestamp,
      goods_id: this.goods_id
    });

    if (res.meta.status !== 200) {
      console.error('回复保存失败:', res.meta.msg);
      uni.showToast({
        title: '回复保存失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('调用回复API失败:', error);
  }
},

    
    // 新增：切换显示所有回复
    toggleShowAllReplies(index) {
		if (!this.openid) {
				  // 弹出登录提示框
				  uni.showModal({
				    title: '提示',
				    content: '需要登录才能体验更多内容哦',
				    cancelText: '取消',
				    confirmText: '登录',
				    success: (res) => {
				      if (res.confirm) {
				        // 用户点击了"登录"按钮
				        uni.switchTab({
				          url: '/pages/my/my'
				        })
				      }
				      // 用户点击了"取消"按钮，不做任何操作
				    }
				  })
				  return
				}
		else {
			this.comments[index].showAllReplies = !this.comments[index].showAllReplies;
			if (this.comments[index].showAllReplies) {
			  this.comments[index].displayReplies = this.comments[index].replies;
			} else {
			  this.comments[index].displayReplies = this.comments[index].replies.slice(0, 1);
			}
		}
      
    },
    
    async gotoPublisherProfile() {
		if (!this.openid) {
				  // 弹出登录提示框
				  uni.showModal({
				    title: '提示',
				    content: '需要登录才能体验更多内容哦',
				    cancelText: '取消',
				    confirmText: '登录',
				    success: (res) => {
				      if (res.confirm) {
				        // 用户点击了"登录"按钮
				        uni.switchTab({
				          url: '/pages/my/my'
				        })
				      }
				      // 用户点击了"取消"按钮，不做任何操作
				    }
				  })
				  return
				}
		else {
			const payload = encodeURIComponent(JSON.stringify(this.publisher_info));
			uni.navigateTo({
			  url: `/subpkg/profile/profile?publisher=${payload}`
			});
		}
    },
    async gotoProfile(openid) {
		if (!this.openid) {
				  // 弹出登录提示框
				  uni.showModal({
				    title: '提示',
				    content: '需要登录才能体验更多内容哦',
				    cancelText: '取消',
				    confirmText: '登录',
				    success: (res) => {
				      if (res.confirm) {
				        // 用户点击了"登录"按钮
				        uni.switchTab({
				          url: '/pages/my/my'
				        })
				      }
				      // 用户点击了"取消"按钮，不做任何操作
				    }
				  })
				  return
				}
	  else {
		  const queryObj = {code: openid};
		  const {data: res} = await uni.$http.get('/users/userinfo', queryObj);
		  if (res.meta.status === 200) {
		    const user_info = res.message
		    const payload = encodeURIComponent(JSON.stringify(user_info));
		    uni.navigateTo({
		      url: `/subpkg/profile/profile?publisher=${payload}`
		    });
		  }
	  }
      
    },
    async getIfFollowed() {
		if (this.openid) {
			const queryObj = {code: this.openid, publisher_id: this.goods_info.publisher_id};
      const { data: res } = await uni.$http.get('/users/iffollow', queryObj) 
      if (res.meta.status === 200) {
        this.isFollowing = res.data.isFollowing;
      }
		}
      
    },
    async getIfCollected() {
		if (this.openid) {
			const queryObj = {code: this.openid, goods_id: this.goods_id};
      const { data: res } = await uni.$http.get('/users/ifcollect', queryObj) 
      if (res.meta.status === 200) {	
        this.isCollected = res.data.isCollected;
      }
		}
      
    },
    async getGoodsDetail(goods_id) {
      const { data: res } = await uni.$http.get('/goods/detail', { goods_id })
      if (res.meta.status !== 200) return uni.$showMsg()
      this.goods_info = res.message[0]
      console.log(this.goods_info)
	  // 🔥🔥🔥 解析商品分类(从逗号分隔的字符串转为数组) 🔥🔥🔥
	    if (this.goods_info.category) {
	      this.goodsCategories = this.goods_info.category
	        .split(',')
	        .filter(c => c.trim() !== '')
	    } else {
	      this.goodsCategories = []
	    }
	  
    },
    async getGoodsList(cb) {
      this.isloading = true
      const { data: res } = await uni.$http.get('/goods/search', this.queryObj)
      this.isloading = false
      cb && cb()
      if (res.meta.status !== 200) return uni.$showMsg()
      this.goodsList = [...this.goodsList, ...res.message.goods]
      this.total = res.message.total
    },
    async saveHistory() {
		if (this.openid) {
			const requestBody = {
        code: this.openid,
        goods_id: this.goods_id
      };
      const { data: res } = await uni.$http.post('/users/history', requestBody)
		}
      
    },
    async getPublisher() {
      console.log('hello')
      const req = {openid: this.goods_info.publisher_id}
      const { data: res } = await uni.$http.get('/users/publisher', req)
      if (res.meta.status === 200) {
        this.publisher_info = res.message
      }
    },
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
    // 修改预览图片方法，同步更新索引
      preview(i) {
        this.currentImageIndex = i; // 更新当前索引
        uni.previewImage({
          current: i,
          urls: this.goods_info.pics.map(x => x.pics_big + '?x-oss-process=image/quality,q_80'),
        });
      },
    gotoSearch() {
		if (!this.openid) {
				  // 弹出登录提示框
				  uni.showModal({
				    title: '提示',
				    content: '需要登录才能体验更多内容哦',
				    cancelText: '取消',
				    confirmText: '登录',
				    success: (res) => {
				      if (res.confirm) {
				        // 用户点击了"登录"按钮
				        uni.switchTab({
				          url: '/pages/my/my'
				        })
				      }
				      // 用户点击了"取消"按钮，不做任何操作
				    }
				  })
				  return
				}
      uni.navigateTo({
        url: '/subpkg/search/search'
      })
    },
    async toggleFollow() {
		if (!this.openid) {
				  // 弹出登录提示框
				  uni.showModal({
				    title: '提示',
				    content: '需要登录才能体验更多内容哦',
				    cancelText: '取消',
				    confirmText: '登录',
				    success: (res) => {
				      if (res.confirm) {
				        // 用户点击了"登录"按钮
				        uni.switchTab({
				          url: '/pages/my/my'
				        })
				      }
				      // 用户点击了"取消"按钮，不做任何操作
				    }
				  })
				  return
				}
	  else {
		  this.isFollowing = !this.isFollowing;
		  const url1 = this.isFollowing ? '/users/follow' : '/users/unfollow';
		  const query = {code: this.openid, publisher_id: this.goods_info.publisher_id};
		  const {data: res} = await uni.$http.post(url1, query);
		  uni.showToast({
		    title: this.isFollowing ? '关注成功' : '取消关注',
		    icon: 'none'
		  });
	  }
     
    },
    toggleLike(index) {
		if (!this.openid) {
				  // 弹出登录提示框
				  uni.showModal({
				    title: '提示',
				    content: '需要登录才能体验更多内容哦',
				    cancelText: '取消',
				    confirmText: '登录',
				    success: (res) => {
				      if (res.confirm) {
				        // 用户点击了"登录"按钮
				        uni.switchTab({
				          url: '/pages/my/my'
				        })
				      }
				      // 用户点击了"取消"按钮，不做任何操作
				    }
				  })
				  return
				}
		else {
			this.comments[index].isLiked = !this.comments[index].isLiked;
		}
    },	
    openMessage() {
		if (!this.openid) {
				  // 弹出登录提示框
				  uni.showModal({
				    title: '提示',
				    content: '需要登录才能体验更多内容哦',
				    cancelText: '取消',
				    confirmText: '登录',
				    success: (res) => {
				      if (res.confirm) {
				        // 用户点击了"登录"按钮
				        uni.switchTab({
				          url: '/pages/my/my'
				        })
				      }
				      // 用户点击了"取消"按钮，不做任何操作
				    }
				  })
				  return
				}
		else {
			 this.showMessagePanel = true;
		}
     
    },
    closeMessage() {
      this.showMessagePanel = false;
    },
    async toggleCollect() {
		if (!this.openid) {
				  // 弹出登录提示框
				  uni.showModal({
				    title: '提示',
				    content: '需要登录才能体验更多内容哦',
				    cancelText: '取消',
				    confirmText: '登录',
				    success: (res) => {
				      if (res.confirm) {
				        // 用户点击了"登录"按钮
				        uni.switchTab({
				          url: '/pages/my/my'
				        })
				      }
				      // 用户点击了"取消"按钮，不做任何操作
				    }
				  })
				  return
				}
		else {
			this.isCollected = !this.isCollected;
      const url = this.isCollected ? '/users/collect' : '/users/uncollect';
      const queryObj = {code: this.openid, goods_id: this.goods_id};
      const {data: res} = await uni.$http.post(url, queryObj);
      uni.showToast({
        title: this.isCollected ? '收藏成功' : '取消收藏',
        icon: 'none'
      });
	}  
},
    buyNow() {
		if (!this.openid) {
				  // 弹出登录提示框
				  uni.showModal({
				    title: '提示',
				    content: '需要登录才能体验更多内容哦',
				    cancelText: '取消',
				    confirmText: '登录',
				    success: (res) => {
				      if (res.confirm) {
				        // 用户点击了"登录"按钮
				        uni.switchTab({
				          url: '/pages/my/my'
				        })
				      }
				      // 用户点击了"取消"按钮，不做任何操作
				    }
				  })
				  return
				}
		else {
			uni.showToast({
			title: '立即购买',
			icon: 'none'
		  });
		}
    },
    startChat() {
		if (!this.openid) {
				  // 弹出登录提示框
				  uni.showModal({
				    title: '提示',
				    content: '需要登录才能体验更多内容哦',
				    cancelText: '取消',
				    confirmText: '登录',
				    success: (res) => {
				      if (res.confirm) {
				        // 用户点击了"登录"按钮
				        uni.switchTab({
				          url: '/pages/my/my'
				        })
				      }
				      // 用户点击了"取消"按钮，不做任何操作
				    }
				  })
				  return
				}
		else {
			const payload = encodeURIComponent(JSON.stringify(this.goods_info));
		  uni.navigateTo({
			url: `/subpkg/chat/chat?goods_info=${payload}`
		  })
		}
    },
    async sendComment() {
     if (!this.openid) {
     		  // 弹出登录提示框
     		  uni.showModal({
     		    title: '提示',
     		    content: '需要登录才能体验更多内容哦',
     		    cancelText: '取消',
     		    confirmText: '登录',
     		    success: (res) => {
     		      if (res.confirm) {
     		        // 用户点击了"登录"按钮
     		        uni.switchTab({
     		          url: '/pages/my/my'
     		        })
     		      }
     		      // 用户点击了"取消"按钮，不做任何操作
     		    }
     		  })
     		  return
     		}
    
      const content = this.newComment.trim();
      if (!content) {
        uni.showToast({
          title: '请输入留言内容',
          icon: 'none'
        });
        return;
      }
    
      // 🔥 新增：文本内容安全检测
      uni.showLoading({
        title: '检测内容...',
        mask: true
      });
    
      const isTextSafe = await this.checkTextSafety(content);
      uni.hideLoading();
    
      if (!isTextSafe) {
        uni.showModal({
          title: '内容违规',
          content: '留言内容包含违规信息，请修改后重试',
          showCancel: false,
          confirmText: '我知道了'
        });
        return;
      }
    
      // ✅ 检测通过，继续发送留言
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const newCommentObj = {
        comment_id: 'cmt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        user_openid: this.userBase.openid,
        nickname: this.userBase.nickname,
        avatarUrl: this.userBase.avatarUrl,
        content: content,
        created_at: currentTimestamp,
        like_count: 0,
        replies: [],
        showAllReplies: false,
        displayReplies: []
      };
      
      this.comments.unshift(newCommentObj);
      this.newComment = '';
      this.scrollIntoView = 'msg-0';
      
      uni.showToast({
        title: '留言成功',
        icon: 'success'
      });
    
      // 保存到后端
      const queryObj = {goods_id: this.goods_id, comment: newCommentObj};
      const { data: res } = await uni.$http.post('/goods/comment', queryObj);
      
      const queryObj1 = {code: this.openid, goods_id: this.goods_id, content: newCommentObj};
      const { data: res1 } = await uni.$http.post('/users/comment', queryObj1);
    },
    showViewCount() {
      uni.showToast({
        title: `共 ${this.viewCount || 0} 人浏览`,
        icon: 'none',
        duration: 2000
      });
    },
    manageGoods() {
	if (this.goods_info.goods_status === 1) {
		uni.showActionSheet({
		  itemList: ['下架商品', '查看数据'],
		  success: (res) => {
		    switch(res.tapIndex) {
		      case 0:
		        this.offlineGoods();
		        break;
		      case 1:
		        this.viewGoodsData();
		        break;
		    }
		  }
		});
	};
    if (this.goods_info.goods_status === 2) {
		uni.showActionSheet({
		  itemList: ['重新上架','查看数据'],
		  success: (res) => {
		    switch(res.tapIndex) {
		      case 0:
		        this.reofflineGoods();
		        break;
		      case 1:
		        this.viewGoodsData();
		        break;
		    }
		  }
		});
	}
    },
    editGoods() {
		const goodsData = {
		  goods_id: this.goods_info.goods_id,
		  description: this.goods_info.goods_name,
		  price: this.goods_info.goods_price,
		  images: this.goods_info.pics.map(item => item.pics_big),
		};
		uni.setStorageSync('edit_goods_data', goodsData);
		uni.switchTab({
		    url: '/pages/sold/sold'
		  });
    },
    async offlineGoods() {
      uni.showModal({
        title: '提示',
        content: '确定要下架该商品吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              const queryObj = {goods_id: this.goods_id};
              const { data: res } = await uni.$http.post('/goods/unpublish', queryObj);
              
              uni.showToast({
                title: '下架成功',
                icon: 'success',
                duration: 1000
              });
              
              // ✅ 等待 Toast 显示完成后返回上一页
              setTimeout(() => {
                uni.navigateBack({
                  delta: 1
                });
              }, 1000);
              
            } catch (error) {
              console.error('下架失败:', error);
              uni.showToast({
                title: '下架失败',
                icon: 'none',
                duration: 1000
              });
            }
          }
        }
      });
    },
	
	/**
	 * 🔥 新增：文本内容安全检测
	 */
	async checkTextSafety(text) {
	  try {
	    console.log('🔍 开始检测文本:', text.substring(0, 30) + '...');
	    
	    const { data: res } = await uni.$http.post('/upload/textSecCheck', {
	      content: text,
	      openid: this.openid
	    });
	    
	    console.log('📥 文本检测结果:', res);
	    
	    if (res.meta.status === 200) {
	      console.log('✅ 文本内容安全');
	      return true;
	    } else {
	      console.warn('🚫 文本内容违规:', res.meta.msg);
	      return false;
	    }
	    
	  } catch (err) {
	    console.error('💥 文本检测出错:', err);
	    
	    // 🔥 网络错误时提示用户
	    uni.showToast({
	      title: '文本检测失败，请重试',
	      icon: 'none',
	      duration: 2000
	    });
	    
	    return false;
	  }
	},

	
	
	async reofflineGoods() {
	  uni.showModal({
	    title: '提示',
	    content: '确定要重新上架该商品吗？',
	    success: async (res) => {
	      if (res.confirm) {
	        try {
	          const picsBigList = this.goods_info.pics.map(item => item.pics_big);
	          const queryObj = {
	            code: this.openid,
	            publisherNickname: this.userBase.nickname,
	            description: this.goods_info.goods_name,
	            price: this.goods_info.goods_price,
	            coverImage: this.goods_info.goods_big_logo, // 第一张作为封面
	            images: picsBigList, // 所有图片
	            goods_id: this.goods_info.goods_id
	          };
	          
	          const { data: res } = await uni.$http.post('/goods/republish', queryObj);
	          
	          uni.showToast({
	            title: '重新上架成功',
	            icon: 'success',
	            duration: 1000
	          });
	          
	          // ✅ 等待 Toast 显示完成后返回上一页
	          setTimeout(() => {
	            uni.navigateBack({
	              delta: 1
	            });
	          }, 1000);
	          
	        } catch (error) {
	          console.error('重新上架失败:', error);
	          uni.showToast({
	            title: '重新上架失败',
	            icon: 'none',
	            duration: 1000
	          });
	        }
	      }
	    }
	  });
	},
    deleteGoods() {
      uni.showModal({
        title: '警告',
        content: '删除后无法恢复，确定要删除该商品吗？',
        success: (res) => {
          if (res.confirm) {
            console.log('删除商品');
          }
        }
      });
    },
    viewGoodsData() {
      uni.showModal({
        title: '商品数据',
        content: `浏览：${this.viewCount}\n收藏：${this.collectCount}\n留言：${this.comments.length}`,
        showCancel: false
      });
    },
    RelativeTime(createdAt) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const diffInSeconds = currentTimestamp - createdAt;
      
      if (diffInSeconds <= 0) {
        return "刚刚";
      }
      
      const MINUTE = 60;
      const HOUR = 60 * MINUTE;
      const DAY = 24 * HOUR;
      const MONTH = 30 * DAY;
      const YEAR = 365 * DAY;
      
      if (diffInSeconds < HOUR) {
        const minutes = Math.floor(diffInSeconds / MINUTE);
        return minutes <= 0 ? "刚刚" : `${minutes}分钟之前`;
      }
      
      if (diffInSeconds < DAY) {
        const hours = Math.floor(diffInSeconds / HOUR);
        return `${hours}小时之前`;
      }
      
      if (diffInSeconds < MONTH) {
        const days = Math.floor(diffInSeconds / DAY);
        return `${days}天之前`;
      }
      
      if (diffInSeconds < YEAR) {
        const months = Math.floor(diffInSeconds / MONTH);
        return `${months}个月之前`;
      }
      
      const years = Math.floor(diffInSeconds / YEAR);
      return `${years}年之前`;
    },
	async sendQuickComment() {
	  if (!this.openid) {
	  		  // 弹出登录提示框
	  		  uni.showModal({
	  		    title: '提示',
	  		    content: '需要登录才能体验更多内容哦',
	  		    cancelText: '取消',
	  		    confirmText: '登录',
	  		    success: (res) => {
	  		      if (res.confirm) {
	  		        // 用户点击了"登录"按钮
	  		        uni.switchTab({
	  		          url: '/pages/my/my'
	  		        })
	  		      }
	  		      // 用户点击了"取消"按钮，不做任何操作
	  		    }
	  		  })
	  		  return
	  		}
	  
	  const content = this.quickComment.trim();
	  if (!content) {
	    uni.showToast({
	      title: '请输入留言内容',
	      icon: 'none'
	    });
	    return;
	  }
	
	  // 🔥 新增：文本内容安全检测
	  uni.showLoading({
	    title: '检测内容...',
	    mask: true
	  });
	
	  const isTextSafe = await this.checkTextSafety(content);
	  uni.hideLoading();
	
	  if (!isTextSafe) {
	    uni.showModal({
	      title: '内容违规',
	      content: '留言内容包含违规信息，请修改后重试',
	      showCancel: false,
	      confirmText: '我知道了'
	    });
	    return;
	  }
	
	  // ✅ 检测通过，继续发送快速留言
	  const currentTimestamp = Math.floor(Date.now() / 1000);
	  
	  const newCommentObj = {
	    comment_id: 'cmt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
	    user_openid: this.userBase.openid,
	    nickname: this.userBase.nickname,
	    avatarUrl: this.userBase.avatarUrl || '/images/1.jpg',
	    content: content,
	    created_at: currentTimestamp,
	    like_count: 0,
	    replies: [],
	    showAllReplies: false,
	    displayReplies: [],
	    isLiked: false
	  };
	  
	  this.comments.unshift(newCommentObj);
	  this.closeQuickReply();
	  
	  uni.showToast({
	    title: '留言成功',
	    icon: 'success'
	  });
	  
	  // 保存到后端
	  try {
	    const queryObj = {
	      goods_id: this.goods_id,
	      comment: newCommentObj
	    };
	    const { data: res } = await uni.$http.post('/goods/comment', queryObj);
	    
	    if (res.meta.status !== 200) {
	      console.error('留言保存失败:', res.meta.msg);
	    }
	    
	    const queryObj1 = {
	      code: this.openid,
	      goods_id: this.goods_id,
	      content: newCommentObj
	    };
	    await uni.$http.post('/users/comment', queryObj1);
	    
	  } catch (error) {
	    console.error('调用留言API失败:', error);
	  }
	},
  },
  computed: {
    ...mapState('m_user', ['token', 'code', 'userBase', 'openid']),
    leftColumn()  { return this.goodsList.filter((_, idx) => idx % 2 === 0) },
    rightColumn() { return this.goodsList.filter((_, idx) => idx % 2 === 1) },
	displayedComments() {
	    return this.comments.slice(0, 3);
	  }
  },
  onReachBottom() {
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
    return uni.$showMsg('数据加载完毕！')
    if (this.isloading) return
    this.queryObj.pagenum += 1
    this.getGoodsList()
  },
  onPullDownRefresh() {
    this.queryObj.pagenum = 1
    this.total = 0
    this.isloading = false
    this.goodsList = []
    this.getGoodsList(() => uni.stopPullDownRefresh())
  },
  
}
</script>


<style lang="scss">
.goods-detail-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding-bottom: 120rpx;
}

// 🔥 修改搜索框样式 - 优化隐藏动画
.search-box {
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  
  /* 🔥 关键：添加平滑过渡动画 */
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 默认状态 */
  transform: translateY(0);
  opacity: 1;
  
  &.hide {
    /* 向上滑出屏幕 */
    transform: translateY(-100%);
    opacity: 0;
    box-shadow: none;
    /* 隐藏后不占用空间 */
    pointer-events: none;
  }
  
  .search-wrapper {
    display: flex;
    align-items: center;
    padding: 0 16rpx;
    height: 88rpx; /* 🔥 固定高度，防止动画时抖动 */
    
    .search-content {
      flex: 1;
    }
    
	/* 🔥 新增：按钮容器 - 确保右侧按钮对齐 */
	  .action-buttons {
	    display: flex;
	    align-items: center;
	    gap: 20rpx;  /* ✅ 控制两个按钮之间的间距 */
	  }
	  
    .share-btn {
     width: 64rpx;
     height: 64rpx;
     background: #ffffff; 
     // background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
     border-radius: 50%;
     display: flex;
     align-items: center;
     justify-content: center;
     border: none;
     padding: 0;
     margin: 0;
     transition: all 0.3s;
	 flex-shrink: 0;  /* ✅ 防止按钮被压缩 */
	 
      &::after {
        border: none;
      }
	  
      &:active {
        transform: scale(0.95);
      }
	  .share-icon {
	    width: 40rpx;      /* 图片宽度 */
	    height: 40rpx;     /* 图片高度 */
	    display: block;

	  }
	  
    }
  }
}
.more-btn {
    width: 64rpx;           /* ✅ 设置固定宽度 */
    height: 64rpx;          /* ✅ 设置固定高度 */
    font-size: 48rpx;
    color: #999;
    display: flex;          /* ✅ 使用flex居中 */
    align-items: center;
    justify-content: center;
    flex-shrink: 0;         /* ✅ 防止按钮被压缩 */
  }
.scroll-content {
  width: 100%;
  transition: height 0.3s ease;
}

.content-wrapper {
  padding: 0 16rpx;
}

// 🎨 发布者信息区域
.publisher-section {
  display: flex;
  align-items: center;
  padding: 20rpx 24rpx;
  margin: 16rpx 0;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);

  .publisher-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-right: 16rpx;
    background: #f5f5f5;
  }

  .publisher-info {
    flex: 1;

    .publisher-name-row {
      display: flex;
      align-items: center;
      margin-bottom: 4rpx;
      
	  .user-info {
	    flex: 1; 
		
      .publisher-name {
        font-size: 28rpx;
        font-weight: 600;
        color: #333;
        margin-right: 12rpx;
		margin_bottom: 3rpx;
      }
	  
	  .post-meta {
	    display: flex;
	    gap: 16rpx;
	    font-size: 24rpx;
	    color: #999;
	  
	    .post-views::before {
	      margin-right: 8rpx;
	    }
	  }
}
      .verification-badge {
        display: flex;
        align-items: center;
        padding: 2rpx 8rpx;
        background: #C00000;
        border-radius: 12rpx;

        .badge-icon {
          font-size: 16rpx;
          color: #fff;
          margin-right: 2rpx;
        }

        .badge-text {
          font-size: 16rpx;
          color: #fff;
        }
      }
    }

    .publisher-meta {
      display: flex;
      align-items: center;
      gap: 16rpx;

      .publish-time {
        font-size: 22rpx;
        color: #999;
      }

      .view-count-item {
        display: flex;
        align-items: center;
        gap: 4rpx;

        .view-icon {
          font-size: 20rpx;
        }

        .view-count {
          font-size: 22rpx;
          color: #666;
        }
      }
    }
  }

  .follow-btn {
    padding: 12rpx 24rpx;
    background: #C00000;
    color: #fff;
    border-radius: 20rpx;
    font-size: 24rpx;
    
    &.following {
      background: #f0f0f0;
      color: #666;
    }
  }
}

// 🎨 商品基础信息卡片
.goods-basic-info {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin: 16rpx 0;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.goods-name-section {
  margin-bottom: 16rpx;

  .goods-name {
    font-size: 28rpx;
    line-height: 40rpx;
    color: #333;
    font-weight: 500;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}

.price-location-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;

  .price-container {
    display: flex;
    align-items: baseline;

    .price-symbol {
      font-size: 24rpx;
      color: #C00000;
      font-weight: 600;
    }

    .price-value {
      font-size: 48rpx;
      color: #C00000;
      font-weight: 700;
      margin-left: 4rpx;
    }
  }
  

	

  .location-container {
    display: flex;
    align-items: center;
    padding: 8rpx 16rpx;
    background: #f0f9ff;
    border-radius: 20rpx;
    border: 1rpx solid #e6f7ff;

    .location-icon {
      font-size: 20rpx;
      margin-right: 6rpx;
    }

    .location-text {
      font-size: 22rpx;
      color: #C00000;
      margin-right: 8rpx;
    }

    .status-dot {
      width: 8rpx;
      height: 8rpx;
      background: #C00000;
      border-radius: 50%;
    }
  }
}

// 🔥 新增：浏览数单独一行的样式
.view-count-row {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
  
  .view-count-badge {
    display: flex;
    align-items: center;
    padding: 6rpx 12rpx;
    background: #f5f5f5;
    border-radius: 16rpx;
    
    .view-icon {
      font-size: 20rpx;
      margin-right: 6rpx;
    }
    
    .view-text {
      font-size: 22rpx;
      color: #666;
    }
  }
}

.category-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;

  .category-tag {
    display: flex;
    align-items: center;
    padding: 6rpx 12rpx;
    background: #f8f9fa;
    border: 1rpx solid #e9ecef;
    border-radius: 16rpx;

    .tag-icon {
      font-size: 20rpx;
      margin-right: 4rpx;
    }

    .tag-text {
      font-size: 20rpx;
      color: #666;
    }
  }
}

// 🎨 商品图片区域
.goods-images-section {
  position: relative;
  margin: 16rpx 0;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);

  .goods-swiper {
    width: 100%;
    height: 680rpx;

    .swiper-image {
      width: 100%;
      height: 100%;
    }
  }

  .image-counter {
    position: absolute;
    top: 16rpx;
    right: 16rpx;
    padding: 4rpx 12rpx;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 16rpx;
    backdrop-filter: blur(10rpx);

    text {
      color: #fff;
      font-size: 20rpx;
    }
  }
}

// 🎨 统计信息区域
.stats-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
  margin: 16rpx 0;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);

  .stats-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .stats-number {
      font-size: 32rpx;
      font-weight: 700;
      color: #333;
      margin-bottom: 4rpx;
    }

    .stats-label {
      font-size: 22rpx;
      color: #999;
    }
  }

  .stats-divider {
    width: 1rpx;
    height: 40rpx;
    background: #f0f0f0;
    margin: 0 20rpx;
  }
}

.comments-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 15rpx;
  margin: 16rpx 0;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
    padding-bottom: 12rpx;
    border-bottom: 1rpx solid #f5f5f5;

    .section-title-wrapper {
      .section-title {
        font-size: 28rpx;
        font-weight: 600;
        color: #333;
      }
    }

    .more-btn {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4rpx;
      white-space: nowrap;
      flex-shrink: 0;
      padding: 16rpx 20rpx;

      .more-text {
        font-size: 24rpx;
        color: #999;
        display: inline-block;
        line-height: 1;
        padding-top: 15rpx;
      }
    }
  }

  .quick-comment-box {
    display: flex;
    align-items: center;
    padding: 16rpx 0;
    border-bottom: 1rpx solid #f5f5f5;
    cursor: pointer;

    .quick-comment-avatar {
      width: 56rpx;
      height: 56rpx;
      border-radius: 50%;
      margin-right: 16rpx;
      margin-bottom: 12rpx;
      flex-shrink: 0;
    }

    .quick-comment-input-placeholder {
      flex: 1;
      height: 56rpx;
      background: #f8f9fa;
      border-radius: 28rpx;
      padding: 0 30rpx;
      display: flex;
      align-items: center;
      margin-bottom: 12rpx;
      
      text {
        font-size: 24rpx;
        color: #999;
      }
    }
  }

  .comment-item {
    padding: 16rpx 0;
    border-bottom: 1rpx solid #f0f0f0;  // 🔥 修改：使用更明显的分界线颜色

    &:last-child {
      border-bottom: none;  // 最后一条留言不显示分界线
    }

    .comment-main-content {
      cursor: pointer;
      
      .comment-header {
        display: flex;
        align-items: center;
        margin-bottom: 12rpx;

        .comment-avatar {
          width: 56rpx;
          height: 56rpx;
          border-radius: 50%;
          margin-right: 12rpx;
          flex-shrink: 0;
        }

        .comment-user-info {
          flex: 1;

          .comment-username {
            font-size: 26rpx;
            color: #333;
            font-weight: 600;
            margin-bottom: 4rpx;  // 🔥 减小间距（原来没有设置 → 4rpx）
            display: block;
          }

          .comment-time {
            font-size: 22rpx;
            color: #999;
			line-height: 1;  // 🔥 新增：设置行高为1，进一步减小间距
          }
        }
      }

      .comment-content {
        padding-left: 68rpx;
        font-size: 26rpx;
        line-height: 36rpx;
        color: #333;
        word-break: break-word;
      }
    }

    .replies-section {
      margin-top: 16rpx;
      padding: 16rpx;
      margin-left: 68rpx;
      background: #f8f9fa;
      border-radius: 12rpx;

      .reply-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 24rpx;
        cursor: pointer;
		  padding-bottom: 16rpx;  // 🔥 增加底部内边距（原来没有）

        &:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .reply-avatar {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          margin-right: 8rpx;
          flex-shrink: 0;
        }

        .reply-content-wrapper {
          flex: 1;
          font-size: 24rpx;
           line-height: 36rpx;  // 🔥 增加行高（原32rpx → 36rpx）
          word-break: break-word;

          .reply-username {
            color: #666;
            font-weight: 600;
          }

          .reply-text {
            color: #333;
          }
        }
      }

      .show-more-replies {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12rpx 0;
        font-size: 24rpx;
        color: #C00000;
        cursor: pointer;
      }
    }
  }
}


// 🎨 分隔线区域
.section-divider {
  display: flex;
  align-items: center;
  margin: 32rpx 0;
  padding: 0 24rpx;

  .divider-line {
    flex: 1;
    height: 1rpx;
    background: #e9ecef;
  }

    .divider-text {
      padding: 0 20rpx;
      font-size: 24rpx;
      color: #999;
      background: #f8f9fa;
    }
  }
  
  // 商品瀑布流
  .waterfall {
    display: flex;
    padding: 16rpx;
    justify-content: space-between;
  
    .col {
      width: 48%;
      display: flex;
      flex-direction: column;
    }
  }
  
  // 🎨 底部操作栏
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 20rpx;
    box-shadow: 0 -2rpx 16rpx rgba(0, 0, 0, 0.08);
    z-index: 999;
  
    .bar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 0rpx;
      padding: 8rpx;
    }
  
  .bar-text {
   font-size: 23rpx;
       color: #666;
       margin-top: 4rpx;
       /* 🔥 关键修改：设置固定宽度，防止文字长度变化影响布局 */
       width: 60rpx;
       text-align: center;
       white-space: nowrap;  /* 防止换行 */
  }
    .bar-btn {
      // flex: 1;
      height: 70rpx;
	  width: 400rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 35rpx;
      font-size: 28rpx;
      font-weight: 600;
      margin-left: 30rpx;
	  
	  flex-shrink: 0;  /* 防止被压缩 */
    }
  
    .buy-btn {
      background: linear-gradient(135deg, #C00000, #C00000);
      color: #fff;
    }
  
    .chat-btn {
      background: linear-gradient(135deg, #C00000, #C00000);
      color: #fff;
    }
  
    .manage-btn {
      background: linear-gradient(135deg, #C00000, #C00000);
      color: #fff;
    }
  }
  
  // 留言弹窗相关样式
  .message-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  
    &.show {
      opacity: 1;
      visibility: visible;
    }
  }
  
  .message-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80vh;
    background: #fff;
    border-radius: 20rpx 20rpx 0 0;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    transform: translateY(100%);
    transition: transform 0.3s;
  
    &.show {
      transform: translateY(0);
    }
  
    .message-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24rpx;
      border-bottom: 1rpx solid #f5f5f5;
  
      .message-title-wrapper {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: baseline;
  
        .message-title {
          font-size: 28rpx;
          font-weight: 600;
          color: #333;
        }
  
        .message-count {
          font-size: 22rpx;
          color: #999;
          margin-left: 8rpx;
        }
      }
    }
.message-list {
  flex: 1;
  padding: 0 24rpx;

  .message-item {
    margin-top: 0;  // 🔥 修改：移除顶部间距
    margin-bottom: 0;  // 🔥 修改：移除底部间距
    padding: 20rpx 0;  // 🔥 新增：使用内边距代替外边距
    position: relative;
    border-bottom: 1rpx solid #f0f0f0;  // 🔥 新增：添加分界线

    &:last-child {
      border-bottom: none;  // 🔥 最后一条不显示分界线
    }

    // 主留言区域
    .message-main-content {
      display: flex;
      cursor: pointer;
      position: relative;
      padding-right: 80rpx;
      padding-bottom: 0;  // 🔥 修改：移除底部内边距
      
      .message-avatar {
        width: 64rpx;
        height: 64rpx;
        border-radius: 50%;
        margin-right: 20rpx;
        flex-shrink: 0;
      }

      .message-content-wrapper {
        flex: 1;
        min-width: 0;

        .message-user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 12rpx;  // 🔥 修改：减小间距（原16rpx）

          .message-username {
            font-size: 26rpx;
            color: #333;
            font-weight: 600;
            margin-bottom: 6rpx;  // 🔥 修改：减小间距（原8rpx）
          }

          .message-time {
            font-size: 22rpx;
            color: #999;
          }
        }

        .message-text {
          font-size: 26rpx;
          line-height: 40rpx;  // 🔥 修改：减小行高（原44rpx）
          color: #333;
          word-break: break-word;
          overflow-wrap: break-word;
        }
      }

      .like-btn {
        position: absolute;
        right: 47rpx;
        top: 0;
        padding: 8rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 40rpx;

        .like-count {
          font-size: 20rpx;
          color: #666;
          margin-top: 2rpx;
        }
      }
    }

    // 回复区域样式
    .replies-section-in-panel {
      margin-top: 16rpx;  // 🔥 修改：减小顶部间距（原24rpx）
      margin-left: 80rpx;
      margin-right: 40rpx;
      padding: 16rpx;  // 🔥 修改：减小内边距（原20rpx）
      background: #f8f9fa;
      border-radius: 12rpx;

      .reply-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 16rpx;  // 🔥 修改：减小间距（原20rpx）
        cursor: pointer;
        position: relative;
        padding-right: 60rpx;
        padding-bottom: 8rpx;  // 🔥 修改：减小底部内边距（原12rpx）

        &:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .reply-avatar {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          margin-right: 16rpx;
          flex-shrink: 0;
        }

        .reply-content-wrapper {
          flex: 1;
          font-size: 24rpx;
          line-height: 36rpx;  // 🔥 修改：减小行高（原40rpx）
          min-width: 0;
          word-break: break-word;
          overflow-wrap: break-word;

          .reply-username {
            color: #666;
            font-weight: 600;
          }

          .reply-text {
            color: #333;
          }
        }

        .reply-like-btn {
          position: absolute;
          right: 0;
          top: 0;
          padding: 4rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 32rpx;
          flex-shrink: 0;

          .like-count {
            font-size: 18rpx;
            color: #666;
            margin-top: 2rpx;
          }
        }
      }

      .show-more-replies {
        text-align: center;
        padding: 12rpx 0;  // 🔥 修改：减小内边距（原16rpx）
        margin-top: 8rpx;  // 🔥 修改：减小顶部间距（原12rpx）
        font-size: 22rpx;
        color: #C00000;
        cursor: pointer;
      }
    }
  }
}



    .message-input-box {
      display: flex;
      align-items: center;
      padding: 16rpx 24rpx;
      border-top: 1rpx solid #f5f5f5;
      background: #fff;
  
      .message-input {
        flex: 1;
        height: 56rpx;
        background: #f8f9fa;
        border-radius: 28rpx;
        padding: 0 20rpx;
        font-size: 26rpx;
        margin-right: 12rpx;
        border: 1rpx solid #e9ecef;
      }
  
      .send-btn {
        padding: 12rpx 20rpx;
        background: #e9ecef;
        color: #999;
        border-radius: 20rpx;
        font-size: 26rpx;
        transition: all 0.3s;
        flex-shrink: 0;
  
        &.active {
          background: #C00000;
          color: #fff;
        }
      }
    }
  }
  
  // 回复弹窗样式
  .reply-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1002;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  
    &.show {
      opacity: 1;
      visibility: visible;
    }
  }
  
  .reply-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 20rpx 20rpx 0 0;
    z-index: 1003;
    display: flex;
    flex-direction: column;
    transform: translateY(100%);
    transition: transform 0.3s;
    max-height: 60vh;
  
    &.show {
      transform: translateY(0);
    }
  
    .reply-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24rpx;
      border-bottom: 1rpx solid #f5f5f5;
  
      .reply-title {
        font-size: 28rpx;
        font-weight: 600;
        color: #333;
      }
    }
  
    .reply-input-box {
      padding: 24rpx;
  
      .reply-textarea {
        width: 100%;
        min-height: 120rpx;
        max-height: 200rpx;
        background: #f8f9fa;
        border-radius: 12rpx;
        padding: 16rpx;
        font-size: 26rpx;
        line-height: 1.5;
        border: 1rpx solid #e9ecef;
        margin-bottom: 16rpx;
        resize: none;
        box-sizing: border-box;
      }
  
      .reply-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
  
        .char-count {
          font-size: 22rpx;
          color: #999;
        }
  
        .send-btn {
          padding: 12rpx 24rpx;
          background: #e9ecef;
          color: #999;
          border-radius: 20rpx;
          font-size: 26rpx;
          transition: all 0.3s;
          flex-shrink: 0;
  
          &.active {
            background: #C00000;
            color: #fff;
          }
        }
      }
    }
  }
  
  // 🔥 快速留言弹窗样式
  .quick-reply-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1004;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  
    &.show {
      opacity: 1;
      visibility: visible;
    }
  }
  
  .quick-reply-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 20rpx 20rpx 0 0;
    z-index: 1005;
    display: flex;
    flex-direction: column;
    transform: translateY(100%);
    transition: transform 0.3s;
    max-height: 60vh;
    box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
  
    &.show {
      transform: translateY(0);
    }
  
    .quick-reply-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24rpx;
      border-bottom: 1rpx solid #f5f5f5;
  
      .quick-reply-title {
        font-size: 28rpx;
        font-weight: 600;
        color: #333;
      }
    }
  
    .quick-reply-input-box {
      padding: 24rpx;
  
      .quick-reply-textarea {
        width: 100%;
        min-height: 120rpx;
        max-height: 300rpx;
        background: #f8f9fa;
        border-radius: 12rpx;
        padding: 16rpx;
        font-size: 26rpx;
        line-height: 1.5;
        border: 1rpx solid #e9ecef;
        margin-bottom: 16rpx;
        resize: none;
        box-sizing: border-box;
      }
  
      .quick-reply-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
  
        .char-count {
          font-size: 22rpx;
          color: #999;
        }
  
        .send-btn {
          padding: 12rpx 24rpx;
          background: #e9ecef;
          color: #999;
          border-radius: 20rpx;
          font-size: 26rpx;
          transition: all 0.3s;
          flex-shrink: 0;
  
          &.active {
            background: #C00000;
            color: #fff;
          }
        }
      }
    }
  }
  
  // 🔥 表情选择器样式
  .emoji-picker-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  
    &.show {
      opacity: 1;
      visibility: visible;
    }
  }
  
  .emoji-picker-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 480rpx;
    background: #fff;
    border-radius: 20rpx 20rpx 0 0;
    z-index: 2001;
    display: flex;
    flex-direction: column;
    transform: translateY(100%);
    transition: transform 0.3s;
    box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
  
    &.show {
      transform: translateY(0);
    }
  
    .emoji-picker-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 24rpx;
      border-bottom: 1rpx solid #f5f5f5;
      flex-shrink: 0;
  
      .emoji-picker-title {
        font-size: 28rpx;
        font-weight: 600;
        color: #333;
      }
    }
  
    .emoji-grid-container {
      flex: 1;
      overflow-y: auto;
    }
  
    .emoji-grid {
      display: flex;
      flex-wrap: wrap;
      padding: 16rpx;
  
      .emoji-item {
        width: 20%;
        padding: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
  
        &:active {
          background: #f5f5f5;
          border-radius: 8rpx;
        }
  
        .emoji-icon {
          width: 60rpx;
          height: 60rpx;
        }
      }
    }
  }
  
  // 🔥 表情按钮样式
  .emoji-btn {
    padding: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    
    &:active {
      opacity: 0.6;
    }
  }
  
  .emoji-btn-inline {
    padding: 8rpx 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    
    &:active {
      opacity: 0.6;
    }
  }
  
  // 🔥 留言中的表情图片样式
  // ✅ 正确的写法
  .comment-content,
  .message-text,
  .reply-content-wrapper {
    ::v-deep .emoji-image {
      width: 40rpx !important;
      height: 40rpx !important;
      vertical-align: middle;
      display: inline-block;
      margin: 0 4rpx;
    }
  }
  
  // 修改输入框底部按钮布局
  .quick-reply-actions,
  .reply-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8rpx;
  }
  
  .message-input-box {
    display: flex;
    align-items: center;
    padding: 16rpx 24rpx;
    border-top: 1rpx solid #f5f5f5;
    background: #fff;
    gap: 8rpx;
  
    .message-input {
      flex: 1;
      height: 56rpx;
      background: #f8f9fa;
      border-radius: 28rpx;
      padding: 0 20rpx;
      font-size: 26rpx;
      border: 1rpx solid #e9ecef;
    }
  
    .emoji-btn-inline {
      flex-shrink: 0;
    }
  
    .send-btn {
      padding: 12rpx 20rpx;
      background: #e9ecef;
      color: #999;
      border-radius: 20rpx;
      font-size: 26rpx;
      transition: all 0.3s;
      flex-shrink: 0;
  
      &.active {
        background: #C00000;
        color: #fff;
      }
    }
  }
  /* 遮罩层 */
  .buy-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    
    &.show {
      opacity: 1;
      visibility: visible;
    }
  }
  
  /* 弹窗主体 */
  .buy-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80vh;
    background-color: #fff;
    border-radius: 24rpx 24rpx 0 0;
    z-index: 999;
    transform: translateY(100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    
    &.show {
      transform: translateY(0);
    }
  }
  
  /* 弹窗标题栏 */
  .buy-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32rpx;
    border-bottom: 1rpx solid #f0f0f0;
    flex-shrink: 0;
    
    .buy-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #333;
    }
  }
  
  /* 商品信息区域 */
  .buy-goods-info {
    display: flex;
    padding: 32rpx;
    border-bottom: 1rpx solid #f0f0f0;
    flex-shrink: 0;
    
    .buy-goods-image {
      width: 160rpx;
      height: 160rpx;
      border-radius: 12rpx;
      margin-right: 24rpx;
      flex-shrink: 0;
    }
    
    .buy-goods-detail {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      .buy-goods-name {
        font-size: 28rpx;
        color: #333;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      
      .buy-goods-price-row {
        display: flex;
        align-items: baseline;
        
        .buy-price-symbol {
          font-size: 28rpx;
          color: #ff6b6b;
          font-weight: 600;
        }
        
        .buy-price-value {
          font-size: 40rpx;
          color: #ff6b6b;
          font-weight: 700;
        }
      }
    }
  }
  
  /* 收货地址区域 */
  .buy-address-section {
    flex: 1;
    padding: 32rpx;
    overflow-y: auto;
    
    .buy-section-title {
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
      margin-bottom: 20rpx;
      
      .required-mark {
        color: #ff6b6b;
        margin-left: 8rpx;
      }
    }
    
    .buy-address-input {
      width: 100%;
      min-height: 160rpx;
      padding: 20rpx;
      background-color: #f8f8f8;
      border-radius: 12rpx;
      font-size: 28rpx;
      color: #333;
      line-height: 1.6;
      box-sizing: border-box;
    }
    
    .address-char-count {
      text-align: right;
      font-size: 24rpx;
      color: #999;
      margin-top: 12rpx;
    }
    
    /* 默认地址复选框 */
    .default-address-checkbox {
      margin-top: 32rpx;
      
      .checkbox-wrapper {
        display: flex;
        align-items: center;
        
        .checkbox {
          width: 40rpx;
          height: 40rpx;
          border: 2rpx solid #ddd;
          border-radius: 8rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16rpx;
          transition: all 0.2s;
          
          &.checked {
            background-color: #07c160;
            border-color: #07c160;
            
            .checkbox-icon {
              color: #fff;
              font-size: 28rpx;
              font-weight: bold;
            }
          }
        }
        
        .checkbox-label {
          font-size: 28rpx;
          color: #666;
        }
      }
    }
  }
  
  /* 购买按钮区域 */
  .buy-action-section {
    padding: 24rpx 32rpx;
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    border-top: 1rpx solid #f0f0f0;
    flex-shrink: 0;
    
    .confirm-buy-btn {
      width: 100%;
      height: 88rpx;
      background: linear-gradient(135deg, #ffb3b3 0%, #ff6b6b 100%);
      border-radius: 44rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.5;
      transition: all 0.3s;
      
      &.active {
        opacity: 1;
        box-shadow: 0 8rpx 24rpx rgba(255, 107, 107, 0.3);
      }
      
      text {
        font-size: 32rpx;
        color: #fff;
        font-weight: 600;
      }
    }
  }
  

  
  </style>