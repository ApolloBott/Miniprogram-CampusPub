<template>
	<view class="post-detail-page">
		<scroll-view class="post-content-area" scroll-y>
			<view class="post-detail" v-if="post">
				<view class="post-header">
					<view class="user-info">
						<image class="avatar" :src="post.avatar || '/static/default-avatar.png'" mode="aspectFill"></image>
						<view class="user-detail">
							<text class="nickname">{{ post.nickname }}</text>
							<view class="post-meta">
								<text class="post-time">{{ post.created_at }}</text>
								<text class="post-views">{{ post.viewCount }}人浏览</text>
							</view>
						</view>
					</view>
					<text class="iconfont more-btn" @click="showPostMenu">⋮</text>
				</view>
				
				<view class="text-content">
					  <text class="content-text">
					    {{ post.content }}
					    <text 
					      class="tag-item"
					      v-for="(tag, index) in parsePostTags(post.properties)"
					      :key="index"
					    >
					      #{{ tag }}
					    </text>
					  </text>
					</view>
				<view class="post-images" v-if="post.images && post.images.length > 0">
					<image 
						v-for="(img, index) in post.images" 
						:key="index"
						class="post-image"
						:src="img" 
						mode="aspectFill"
						@click="previewImage(post.images, index)"
					></image>
				</view>
				
				<view class="divider"></view>
				
				<view class="comments-title">
					<text>评论 ({{ post.commentCount }})</text>
				</view>
			</view>
			
			<view class="comments-list">
				<view class="comment-item" v-for="comment in commentList" :key="comment.id">
					<view class="comment-main" @click="handleReplyClick(comment)">
						<view class="comment-header" @click.stop>
							<image class="comment-avatar" :src="comment.avatar || '/static/default-avatar.png'" mode="aspectFill"></image>
							<view class="comment-info" @click="handleReplyClick(comment)">
								<view class="nickname-row" @click="handleReplyClick(comment)">
									<text class="comment-nickname" @click="handleReplyClick(comment)">{{ comment.nickname }}</text>
									<text class="author-badge" v-if="comment.is_author">作者</text>
								</view>
								<text class="comment-time">{{ formatCommentTime(comment.created_at) }}</text>
							</view>
							<view class="comment-actions">
								<view class="like-btn" @click.stop="toggleCommentLike(comment)">
									<image
										class="like-icon-img"
										:src="comment.is_liked ? 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/liked.png' : 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/like.png'"
										mode="aspectFit"
										:class="{ 'liked-animation': comment.is_liked }"
									></image>
									<text class="like-count" v-if="comment.like_count > 0">{{ comment.like_count }}</text>
								</view>
								<image
									class="delete-btn-img"
									src="https://wait00.oss-cn-shanghai.aliyuncs.com/label/shanchu.png"
									mode="aspectFit"
									@click.stop="deleteComment(comment.id)"
									v-if="comment.user_openid === openid"
								></image>
							</view>
						</view>
						<view class="comment-content">
							<rich-text :nodes="parseEmojiContent(comment.content)"></rich-text>
						</view>
					</view>
					
					<view class="replies-section" v-if="comment.replies && comment.replies.length > 0">
						<view class="reply-item" v-for="reply in comment.replies" :key="reply.id" @click="handleReplyClick(reply, comment)">
							<view class="reply-header" @click.stop>
								<image class="reply-avatar" :src="reply.avatar || '/static/default-avatar.png'" mode="aspectFill"></image>
								<view class="reply-info" @click="handleReplyClick(reply, comment)">
									<view class="reply-nickname-row" @click="handleReplyClick(reply, comment)">
										<text class="reply-nickname" @click="handleReplyClick(reply, comment)">{{ reply.nickname }}</text>
										<text class="author-badge" v-if="reply.is_author">作者</text>
										<text class="reply-arrow" v-if="reply.reply_to_nickname"> → </text>
										<text class="reply-target" v-if="reply.reply_to_nickname">{{ reply.reply_to_nickname }}</text>
									</view>
									<text class="reply-time">{{ formatCommentTime(reply.created_at) }}</text>
								</view>
								<view class="reply-actions">
									<view class="like-btn" @click.stop="toggleCommentLike(reply)">
										<image
											class="like-icon-img"
											:src="reply.is_liked ? 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/liked.png' : 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/like.png'"
											mode="aspectFit"
											:class="{ 'liked-animation': reply.is_liked }"
										></image>
										<text class="like-count" v-if="reply.like_count > 0">{{ reply.like_count }}</text>
									</view>
									<image
										class="delete-btn-img"
										src="https://wait00.oss-cn-shanghai.aliyuncs.com/label/shanchu.png"
										mode="aspectFit"
										@click.stop="deleteComment(reply.id)"
										v-if="reply.user_openid === openid"
									></image>
								</view>
							</view>
							<view class="reply-content">
								<rich-text :nodes="parseEmojiContent(reply.content)"></rich-text>
							</view>
						</view>
						
						<view 
							class="more-replies-btn" 
							v-if="comment.has_more_replies" 
							@click.stop="loadMoreReplies(comment)"
						>
							<text>查看更多回复 ({{ comment.reply_count - comment.replies.length }})</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="comment-load-more" v-if="commentHasMore">
				<text class="load-text">加载更多评论</text>
			</view>
			<view class="no-comments" v-if="commentList.length === 0 && !isLoadingComments">
				<text>还没有评论，快来抢沙发吧！</text>
			</view>
		</scroll-view>
		
		<view class="bottom-action-bar">
			<view class="input-trigger" @click="showQuickReply">
				<text class="input-placeholder">说说你的想法...</text>
			</view>
			<view class="action-group">
			    <view class="action-item" @click="togglePostLike">
			      <image 
			        class="action-icon-img" 
			        :src="post && post.isLiked ? iconLikedUrl : iconLikeUrl" 
			        mode="aspectFit"
			      ></image>
			      <text class="action-text">{{ post ? post.likeCount : 0 }}</text>
			    </view>
			    <view class="action-item" @click="showQuickReply">
			      <image 
			        class="action-icon-img" 
			        :src="iconCommentUrl" 
			        mode="aspectFit"
			      ></image>
			      <text class="action-text">{{ post ? post.commentCount : 0 }}</text>
			    </view>
			  </view>
		</view>
		
		<view class="reply-modal" v-if="showReplyModal" @click="hideReplyInput">
			<view class="reply-modal-content" @click.stop>
				<view class="reply-header">
					<text class="reply-title">
						{{ replyTarget ? '回复 @' + replyTarget.nickname : '写评论' }}
					</text>
					<text class="close-btn" @click="hideReplyInput">×</text>
				</view>
				
				<view class="input-wrapper">
					<textarea 
						class="reply-textarea" 
						v-model="commentContent"
						:placeholder="replyTarget ? '回复 @' + replyTarget.nickname : '写个评论...'"
						:focus="showReplyModal && !showEmojiPicker"
						auto-height
						maxlength="500"
						@input="onInputChange"
					></textarea>
					
					<view class="emoji-btn" @click.stop="toggleEmojiPicker">
						<image
							v-if="!showEmojiPicker"
							class="emoji-icon-img"
							src="https://wait00.oss-cn-shanghai.aliyuncs.com/label/biaoqing.png"
							mode="aspectFit"
						></image>
						<image
							v-if="showEmojiPicker"
							class="emoji-icon-img"
							src="https://wait00.oss-cn-shanghai.aliyuncs.com/label/jianpan.png"
							mode="aspectFit"
						></image>
					</view>
				</view>
				
				<view class="emoji-picker" v-if="showEmojiPicker" @click.stop>
					<view class="emoji-tabs">
						<view 
							class="tab-item" 
							:class="{ 'active': currentEmojiSet === 'mini' }" 
							@click="switchEmojiSet('mini')"
						>
							小表情
						</view>
						<view 
							class="tab-item" 
							:class="{ 'active': currentEmojiSet === 'large' }" 
							@click="switchEmojiSet('large')"
						>
							大表情
						</view>
					</view>
					
					<view class="emoji-list">
						<view 
							class="emoji-item"
							v-for="(emoji, index) in displayEmojiList"
							:key="index"
							@click="insertEmoji(emoji)"
						>
							<image 
								class="emoji-image" 
								:src="emoji.url" 
								mode="aspectFit"
							></image>
						</view>
					</view>
				</view>
				
				<view class="reply-actions">
					<view class="char-count">{{ commentContent.length }}/500</view>
					<view class="submit-btn" @click="submitComment" :class="{ 'disabled': !commentContent.trim() }">
						<text>发送</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'

// ✅ 新增：小表情基础路径
const BASE_URL_SMALL = 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-small/';

export default {
	data() {
		return {
			postId: null,
			post: null,
			commentList: [],
			commentPage: 1,
			commentPageSize: 20,
			commentHasMore: true,
			isLoadingComments: false,
			commentContent: '',
			isSubmittingComment: false,
			replyTarget: null,
			showReplyModal: false,
			loadingMoreReplies: new Set(),
			showEmojiPicker: false,
			
			// ✅ 新增：默认选中 'mini'
			currentEmojiSet: 'mini',
			
			// ✅ 修改：第一套大表情
			emojiList: [
				{ id: 1, name: 'happy', url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-1.png', code: '[微笑]' },
				{ id: 2, name: 'laugh', url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-2.png', code: '[大笑]' },
				{ id: 3, name: 'love', url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-3.png', code: '[笑哭]' },
				{ id: 4, name: 'cool', url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-4.png', code: '[难过]' },
				{ id: 5, name: 'sad', url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-5.png', code: '[大哭]' },
				{ id: 6, name: 'cry', url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-6.png', code: '[疑问]' },
				{ id: 7, name: 'angry', url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-7.png', code: '[爱心]' },
				{ id: 8, name: 'surprise', url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-8.png', code: '[得意]' },
				{ id: 9, name: 'thinking', url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-9.png', code: '[惊恐]' },
			],
			
			// ✅ 新增：第二套小表情
			miniEmojiList: [
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
			
			// ✅ 修改：替换为阿里云图标路径
			iconLikeUrl: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/like.png',
			iconLikedUrl: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/liked.png',
			iconCommentUrl: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/chat.png',
		}
	},
	
	onLoad(options) {
		// ... (不变)
		if (options.id) {
			this.postId = options.id;
			this.loadPostDetail();
			this.loadComments();
		}
	},
	
	onUnload() {
	  const pages = getCurrentPages()
	  console.log('imhere')
	  
	  if (pages.length > 1) {
	    const prevPage = pages[pages.length - 2]
	    
	    // 🔥 关键：通过 $vm 访问 Vue 组件实例
	    const prevPageVm = prevPage.$vm || prevPage
	    
	    // 检查方法是否存在
	    if (prevPageVm && typeof prevPageVm.updatePostLikeStatus === 'function') {
	      prevPageVm.updatePostLikeStatus({
	        postId: parseInt(this.postId),
	        isLiked: this.post ? this.post.isLiked : false,
	        likeCount: this.post ? this.post.likeCount : 0
	      })
	      
	      console.log('✅ 已传递点赞状态:', {
	        postId: this.postId,
	        isLiked: this.post?.isLiked,
	        likeCount: this.post?.likeCount
	      })
	    } else {
	      console.warn('⚠️ 上一个页面没有 updatePostLikeStatus 方法')
	    }
	  }
	},
	
	methods: {
		// ... (togglePostLike, parsePostTags, handleReplyClick 不变) ...
		async togglePostLike() {
			try {
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
				const { data: res } = await uni.$http.post('/posts/like', {
					post_id: this.postId,
					openid: this.openid,
					is_like: !this.post.isLiked
				})
				if (res.meta.status === 200) {
					this.post.isLiked = !this.post.isLiked
					this.post.likeCount = res.message.like_count || 0
				}
			} catch (error) {
				console.error('点赞失败:', error)
			}
		},
		parsePostTags(properties) {
		  if (!properties || properties === 'null') {
		    return []
		  }
		  if (typeof properties === 'string') {
		    return properties.split(',').filter(tag => tag.trim())
		  }
		  if (Array.isArray(properties)) {
		    return properties
		  }
		  return []
		},
		handleReplyClick(comment, mainComment = null) {
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
			if (mainComment) {
				this.replyTarget = {
					id: comment.id,
					nickname: comment.nickname,
					user_openid: comment.user_openid,
					parent_id: mainComment.id
				};
			} else {
				this.replyTarget = {
					id: comment.id,
					nickname: comment.nickname,
					user_openid: comment.user_openid,
					parent_id: comment.id
				};
			}
			this.commentContent = '';
			this.showReplyModal = true;
			this.showEmojiPicker = false;
		},
		
		// ✅ 修改：解析表情内容 (使用新尺寸 1.8em 和 2.8em)
		parseEmojiContent(content) {
			if (!content) return '';
			
			let html = content;
			
			const allEmojis = [
				// 大表情尺寸 2.8em
				...this.emojiList.map(e => ({ ...e, size: '2.8em' })), 
				// 小表情尺寸 1.8em
				...this.miniEmojiList.map(e => ({ ...e, size: '1.8em' })) 
			];
			
			allEmojis.forEach(emoji => {
				const regex = new RegExp(this.escapeRegExp(emoji.code), 'g');
				html = html.replace(
					regex, 
					`<img src="${emoji.url}" style="width: ${emoji.size}; height: ${emoji.size}; vertical-align: text-bottom; margin: 0 2rpx; display: inline-block;" />`
				);
			});
			
			return html;
		},
		
		escapeRegExp(string) {
			return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		},
		
		toggleEmojiPicker() {
			this.showEmojiPicker = !this.showEmojiPicker;
		},
		
		insertEmoji(emoji) {
			this.commentContent += emoji.code;
		},
		
		onInputChange(e) {
			this.commentContent = e.detail.value;
		},
		
		// ✅ 新增：切换表情集
		switchEmojiSet(set) {
		  this.currentEmojiSet = set;
		},
		
		// ... (loadPostDetail, loadComments, loadMoreReplies, toggleCommentLike, showQuickReply, hideReplyInput, submitComment, deleteComment, formatPostTime, formatCommentTime, previewImage, reportUser, showPostMenu, deletePost 不变) ...
		async loadPostDetail() {
			try {
				const { data: res } = await uni.$http.get('/posts/detail', {
					id: this.postId,
					openid: this.openid
				});
				if (res.meta.status === 200) {
					this.post = {
						...res.message,
						created_at: this.formatPostTime(res.message.created_at)
					};
				} else {
					uni.showToast({
						title: res.meta.msg || '加载失败',
						icon: 'none'
					});
				}
			} catch (error) {
				console.error('加载帖子详情失败:', error);
				uni.showToast({
					title: '加载失败，请检查网络',
					icon: 'none'
				});
			}
		},
		async loadComments() {
			try {
				if (this.isLoadingComments) return;
				this.isLoadingComments = true;
				const { data: res } = await uni.$http.get('/posts/comments', {
					post_id: this.postId,
					page: this.commentPage,
					pageSize: this.commentPageSize,
					current_user_openid: this.openid
				});
				if (res.meta.status === 200) {
					this.commentList = this.commentList.concat(res.message.list);
					this.commentHasMore = res.message.hasMore;
				}
			} catch (error) {
				console.error('加载评论失败:', error);
				uni.showToast({
					title: '加载评论失败',
					icon: 'none'
				});
			} finally {
				this.isLoadingComments = false;
			}
		},
		async loadMoreReplies(comment) {
			try {
				if (this.loadingMoreReplies.has(comment.id)) return;
				this.loadingMoreReplies.add(comment.id);
				const { data: res } = await uni.$http.get('/posts/replies', {
					comment_id: comment.id,
					page: 1,
					pageSize: 50,
					current_user_openid: this.openid
				});
				if (res.meta.status === 200) {
					const commentIndex = this.commentList.findIndex(c => c.id === comment.id);
					if (commentIndex !== -1) {
						this.commentList[commentIndex].replies = res.message.list;
						this.commentList[commentIndex].has_more_replies = false;
					}
				}
			} catch (error) {
				console.error('加载更多回复失败:', error);
				uni.showToast({
					title: '加载失败',
					icon: 'none'
				});
			} finally {
				this.loadingMoreReplies.delete(comment.id);
			}
		},
		async toggleCommentLike(comment) {
			try {
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
				const { data: res } = await uni.$http.post('/posts/comment/like', {
					comment_id: comment.id,
					user_openid: this.openid
				});
				if (res.meta.status === 200) {
					comment.is_liked = res.message.is_liked;
					if (res.message.is_liked) {
						comment.like_count = (comment.like_count || 0) + 1;
					} else {
						comment.like_count = Math.max((comment.like_count || 0) - 1, 0);
					}
				}
			} catch (error) {
				console.error('点赞操作失败:', error);
				uni.showToast({
					title: '操作失败',
					icon: 'none'
				});
			}
		},
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
			this.replyTarget = null;
			this.commentContent = '';
			this.showReplyModal = true;
			this.showEmojiPicker = false;
		},
		hideReplyInput() {
			this.showReplyModal = false;
			this.showEmojiPicker = false;
			this.replyTarget = null;
			this.commentContent = '';
		},
		async submitComment() {
		  try {
		    // 检查登录状态
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
		    
		    // 检查内容是否为空
		    const content = this.commentContent.trim();
		    if (!content) {
		      uni.showToast({
		        title: this.replyTarget ? '请输入回复内容' : '请输入评论内容',
		        icon: 'none'
		      });
		      return;
		    }
		    
		    // 防止重复提交
		    if (this.isSubmittingComment) {
		      console.log('⚠️ 提交中，请勿重复点击');
		      return;
		    }
		    
		    // 🔥 新增：文本内容安全检测
		    console.log('[1] 开始检测文本内容安全性...');
		    uni.showLoading({
		      title: '检测内容...',
		      mask: true
		    });
		    
		    const isTextSafe = await this.checkTextSafety(content);
		    
		    if (!isTextSafe) {
		      uni.hideLoading();
		      uni.showModal({
		        title: '内容违规',
		        content: this.replyTarget ? '回复内容包含违规信息，请修改后重试' : '评论内容包含违规信息，请修改后重试',
		        showCancel: false,
		        confirmText: '我知道了'
		      });
		      return;
		    }
		    
		    console.log('✅ 文本内容检测通过');
		    
		    // ✅ 检测通过，继续提交评论/回复
		    this.isSubmittingComment = true;
		    
		    uni.showLoading({
		      title: this.replyTarget ? '发送回复...' : '发送评论...',
		      mask: true
		    });
		    
		    // 构造请求参数
		    const params = {
		      post_id: this.postId,
		      openid: this.userBase.openid,
		      nickname: this.userBase.nickname || '用户',
		      avatar: this.userBase.avatarUrl || '',
		      content: content
		    };
		    
		    // 如果是回复
		    if (this.replyTarget) {
		      params.parent_id = this.replyTarget.parent_id;
		      params.reply_to_openid = this.replyTarget.user_openid;
		      params.reply_to_nickname = this.replyTarget.nickname;
		    }
		    
		    console.log('[2] 提交参数:', params);
		    
		    // 调用后端接口
		    const { data: res } = await uni.$http.post('/posts/comment', params);
		    
		    if (res.meta.status === 201) {
		      // 清空输入框
		      this.commentContent = '';
		      this.hideReplyInput();
		      
		      // 重新加载评论列表
		      this.commentList = [];
		      this.commentPage = 1;
		      this.commentHasMore = true;
		      await this.loadComments();
		      
		      // 更新帖子评论数
		      if (!this.replyTarget && this.post) {
		        this.post.commentCount += 1;
		      }
		      
		      uni.hideLoading();
		      uni.showToast({
		        title: this.replyTarget ? '回复成功' : '评论成功',
		        icon: 'success'
		      });
		      
		    } else {
		      uni.hideLoading();
		      uni.showToast({
		        title: res.meta.msg || '提交失败',
		        icon: 'none'
		      });
		    }
		    
		  } catch (error) {
		    console.error('[💥] 提交失败:', error);
		    console.error('错误详情:', error.response || error);
		    
		    uni.hideLoading();
		    uni.showToast({
		      title: error.response?.data?.meta?.msg || '提交失败，请重试',
		      icon: 'none'
		    });
		    
		  } finally {
		    this.isSubmittingComment = false;
		  }
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


		
		async deleteComment(commentId) {
			uni.showModal({
				title: '删除评论',
				content: '确定要删除这条评论吗？',
				success: async (res) => {
					if (res.confirm) {
						try {
							const { data: result } = await uni.$http.delete('/posts/comment', {
								comment_id: commentId,
								openid: this.openid
							});
							if (result.meta.status === 200) {
								this.commentList = [];
								this.commentPage = 1;
								this.commentHasMore = true;
								this.loadComments();
								if (this.post) {
									this.loadPostDetail();
								}
								uni.showToast({
									title: '删除成功',
									icon: 'success'
								});
							} else {
								uni.showToast({
									title: result.meta.msg || '删除失败',
									icon: 'none'
								});
							}
						} catch (error) {
							console.error('删除评论失败:', error);
							uni.showToast({
								title: '删除失败',
								icon: 'none'
							});
						}
					}
				}
			});
		},
		formatPostTime(timestamp) {
			if (!timestamp) return '';
			if (typeof timestamp === 'string') {
				const date = new Date(timestamp);
				return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
			}
			const date = new Date(timestamp);
			return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
		},
		formatCommentTime(timestamp) {
			if (!timestamp) return '';
			if (typeof timestamp === 'string') {
				timestamp = new Date(timestamp).getTime();
			}
			const now = Date.now();
			const diff = now - timestamp;
			const minute = 60 * 1000;
			const hour = 60 * minute;
			const day = 24 * hour;
			if (diff < minute) {
				return '刚刚';
			} else if (diff < hour) {
				return Math.floor(diff / minute) + '分钟前';
			} else if (diff < day) {
				return Math.floor(diff / hour) + '小时前';
			} else {
				return Math.floor(diff / day) + '天前';
			}
		},
		previewImage(images, current) {
			uni.previewImage({
				urls: images,
				current: current
			});
		},
		reportUser() {
			if (!this.post || !this.openid) {
				uni.showToast({
					title: '无法获取用户信息',
					icon: 'none'
				})
				return
			}
			uni.showModal({
				title: '请输入您举报该用户的理由:',
				editable: true,
				placeholderText: '例如：涉及人身攻击、广告等',
				success: async (res) => {
					if (res.confirm) {
						const reason = res.content.trim()
						if (!reason) {
							uni.showToast({
								title: '举报理由不能为空',
								icon: 'none'
							})
							return
						}
						const reportData = {
							reporter_openid: this.openid,
							reported_openid: this.post.user_openid,
							post_id: this.postId,
							reason: reason
						}
						console.log('提交举报:', reportData)
						try {
							const { data: apiRes } = await uni.$http.post('/users/report', reportData)
							if (apiRes.meta.status === 201) {
								uni.showToast({
									title: '举报成功，我们会尽快核实',
									icon: 'success'
								})
							} else {
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
		showPostMenu() {
			if (this.post && this.post.user_openid === this.openid) {
				uni.showActionSheet({
					itemList: ['删除'],
					success: (res) => {
						if (res.tapIndex === 0) {
							this.deletePost();
						}
					}
				});
			}
			if (this.post && this.post.user_openid !== this.openid) {
				uni.showActionSheet({
					itemList: ['举报'],
					success: (res) => {
						if (res.tapIndex === 0) {
							this.reportUser();
						}
					}
				});
			} 
		},
		async deletePost() {
			uni.showModal({
				title: '删除帖子',
				content: '确定要删除这条帖子吗？删除后无法恢复',
				success: async (res) => {
					if (res.confirm) {
						try {
							const { data: result } = await uni.$http.delete('/posts/delete', {
								post_id: this.postId,
								openid: this.openid
							});
							if (result.meta.status === 200) {
								uni.showToast({
									title: '删除成功',
									icon: 'success'
								});
								setTimeout(() => {
									uni.navigateBack();
								}, 1500);
							} else {
								uni.showToast({
									title: result.meta.msg || '删除失败',
									icon: 'none'
								});
							}
						} catch (error) {
							console.error('删除帖子失败:', error);
							uni.showToast({
								title: '删除失败',
								icon: 'none'
							});
						}
					}
				}
			});
		}
	},
	
	computed: {
		...mapState('m_user', ['openid', 'userBase', 'token']),
		
		// ✅ 新增：计算属性，用于显示当前表情集
		displayEmojiList() {
			return this.currentEmojiSet === 'large' ? this.emojiList : this.miniEmojiList;
		}
	}
}
</script>

<style lang="scss">
// ... ( .comment-main, .reply-item, .post-detail-page, .post-content-area, .post-detail, .post-header, .text-content, .post-images, .divider, .comments-title 不变) ...
.comment-main,
.reply-item {
	cursor: pointer;
	transition: background-color 0.2s;
	&:active {
		background-color: rgba(0, 0, 0, 0.02);
	}
}
.post-detail-page {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 120rpx;
}
.post-content-area {
	height: calc(100vh - 120rpx);
}
.post-detail {
	background-color: #ffffff;
	padding: 32rpx;
	margin-bottom: 20rpx;
	.post-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24rpx;
		.user-info {
			display: flex;
			align-items: center;
			flex: 1;
			.avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 20rpx;
				background-color: #f0f0f0;
			}
			.user-detail {
				display: flex;
				flex-direction: column;
				.nickname {
					font-size: 32rpx;
					color: #333333;
					font-weight: 500;
					margin-bottom: 8rpx;
				}
				.post-meta {
				  display: flex;
				  gap: 16rpx;
				  font-size: 24rpx;
				  color: #999;
				.post-time {
					font-size: 24rpx;
					color: #999999;
				}
				.post-views::before {
				  content: '·';
				  margin-right: 8rpx;
				}
				}
			}
		}
		.more-btn {
			font-size: 48rpx;
			color: #999999;
			padding: 0 16rpx;
		}
	}
	.post-content {
		margin-bottom: 24rpx;
		.content-text {
			font-size: 32rpx;
			color: #333333;
			line-height: 1.8;
			word-wrap: break-word;
		}
	}
	.text-content {
		padding: 32rpx;
		.content-text {
			font-size: 32rpx;
			line-height: 1.8;
			color: #333;
			word-wrap: break-word;
			    .tag-item {
			      display: inline;
			      font-size: 28rpx;
			      color: #fbbf24;
			      background-color: transparent;
			      padding: 0 8rpx;
			      font-weight: 500;
			      margin-left: 8rpx;
			    }
		}
	}
	.post-images {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16rpx;
		margin-bottom: 32rpx;
		.post-image {
			width: 100%;
			height: 200rpx;
			border-radius: 12rpx;
			background-color: #f0f0f0;
		}
	}
	.divider {
		height: 20rpx;
		background-color: #f5f5f5;
		margin: 0 -32rpx;
	}
	.comments-title {
		padding: 24rpx 0;
		text {
			font-size: 30rpx;
			color: #333333;
			font-weight: 500;
		}
	}
}

.comments-list {
	background-color: #ffffff;
	
	.comment-item {
		padding: 24rpx 32rpx;
		border-bottom: 1rpx solid #f0f0f0;
		
		&:last-child {
			border-bottom: none;
		}
		
		.comment-main {
			.comment-header {
				display: flex;
				align-items: flex-start;
				margin-bottom: 16rpx;
				
				.comment-avatar {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					margin-right: 16rpx;
					background-color: #f0f0f0;
				}
				
				.comment-info {
					flex: 1;
					
					.nickname-row {
						display: flex;
						align-items: center;
						margin-bottom: 6rpx;
						
						.comment-nickname {
							font-size: 28rpx;
							color: #333333;
							margin-right: 8rpx;
						}
						
						.author-badge {
							font-size: 20rpx;
							color: #ff6b6b;
							background-color: #ffe8e8;
							padding: 4rpx 12rpx;
							border-radius: 4rpx;
							font-weight: 500;
						}
					}
					
					.comment-time {
						font-size: 22rpx;
						color: #999999;
					}
				}
				
				// ✅ 修改：评论区操作按钮
				.comment-actions {
					display: flex;
					align-items: center;
					gap: 24rpx;
					
					.like-btn {
						display: flex;
						align-items: center;
						gap: 8rpx;
						
						// ✅ 修改：点赞图标
						.like-icon-img {
							width: 36rpx;
							height: 36rpx;
							transition: transform 0.3s;
							
							&.liked-animation {
								transform: scale(1.1);
							}
						}
						
						.like-count {
							font-size: 24rpx;
							color: #999999;
						}
					}
					
					// ✅ 修改：删除图标
					.delete-btn-img {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
			
			.comment-content {
				margin-left: 80rpx;
				font-size: 28rpx;
				color: #333333;
				line-height: 1.6;
				word-wrap: break-word;
			}
		}
						
		.replies-section {
			margin-top: 16rpx;
			margin-left: 80rpx;
			padding-left: 24rpx;
			border-left: 2rpx solid #f0f0f0;
			
			.reply-item {
				padding: 16rpx 0;
				
				.reply-header {
					display: flex;
					align-items: flex-start;
					margin-bottom: 12rpx;
					
					.reply-avatar {
						width: 48rpx;
						height: 48rpx;
						border-radius: 50%;
						margin-right: 12rpx;
						background-color: #f0f0f0;
					}
					
					.reply-info {
						flex: 1;
						
						.reply-nickname-row {
							display: flex;
							align-items: center;
							flex-wrap: wrap;
							margin-bottom: 6rpx;
							
							.reply-nickname {
								font-size: 26rpx;
								color: #333333;
								font-weight: 500;
							}
							
							.author-badge {
								font-size: 18rpx;
								color: #ff6b6b;
								background-color: #ffe8e8;
								padding: 2rpx 8rpx;
								border-radius: 4rpx;
								margin-left: 8rpx;
								font-weight: 500;
							}
							
							.reply-arrow {
								font-size: 24rpx;
								color: #999999;
								margin: 0 6rpx;
							}
							
							.reply-target {
								font-size: 26rpx;
								color: #666666;
							}
						}
						
						.reply-time {
							font-size: 22rpx;
							color: #999999;
						}
					}
					
					// ✅ 修改：回复区操作按钮
					.reply-actions {
						display: flex;
						align-items: center;
						gap: 20rpx;
						
						.like-btn {
							display: flex;
							align-items: center;
							gap: 6rpx;
							
							// ✅ 修改：点赞图标
							.like-icon-img {
								width: 36rpx;
								height: 36rpx;
								transition: transform 0.3s;
								
								&.liked-animation {
									transform: scale(1.1);
								}
							}
							
							.like-count {
								font-size: 22rpx;
								color: #999999;
							}
						}
						
						// ✅ 修改：删除图标
						.delete-btn-img {
							width: 28rpx;
							height: 28rpx;
						}
					}
				}
				
				.reply-content {
					margin-left: 60rpx;
					font-size: 26rpx;
					color: #333333;
					line-height: 1.6;
					word-wrap: break-word;
				}
			}
			
			.more-replies-btn {
				padding: 16rpx 0;
				text-align: center;
				
				text {
					font-size: 26rpx;
					color: #1890ff;
				}
			}
		}
	}
}
				
.comment-load-more {
	padding: 32rpx;
	text-align: center;
	
	.load-text {
		font-size: 28rpx;
		color: #999999;
	}
}

.no-comments {
	padding: 80rpx 32rpx;
	text-align: center;
	
	text {
		font-size: 28rpx;
		color: #999999;
	}
}
				
.bottom-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: #fff;
  padding: 16rpx 24rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.04);
  padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
  
  .input-trigger {
    flex: 1;
    height: 72rpx;
    background: #f5f5f5;
    border-radius: 36rpx;
    display: flex;
    align-items: center;
    padding: 0 24rpx;
    
    .input-placeholder {
      font-size: 28rpx;
      color: #999;
    }
  }
  
  .action-group {
    display: flex;
    align-items: center;
    gap: 24rpx;
    
    .action-item {
      display: flex;
      align-items: center;
      gap: 8rpx;
      transition: all 0.3s;
      
      &:active {
        transform: scale(0.95);
      }
      
      .action-icon-img {
        width: 44rpx;
        height: 44rpx;
        transition: transform 0.3s ease;
      }
      
      .action-text {
        font-size: 26rpx;
        color: #666;
        min-width: 32rpx;
        text-align: center;
      }
    }
  }
}

@keyframes likeScale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
					
				
// ✅ 修改：回复弹窗 (完全重构)
.reply-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
	display: flex;
	align-items: flex-end;
	animation: fadeIn 0.3s ease;
	
	.reply-modal-content {
		width: 100%;
		max-height: 80vh;
		background-color: #ffffff;
		border-radius: 32rpx 32rpx 0 0;
		display: flex;
		flex-direction: column;
		animation: slideUp 0.3s ease;
		
		.reply-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 32rpx 32rpx 24rpx;
			border-bottom: 1rpx solid #f0f0f0;
			
			.reply-title {
				font-size: 32rpx;
				color: #333333;
				font-weight: 500;
			}
			
			.close-btn {
				font-size: 48rpx;
				color: #999999;
				line-height: 1;
			}
		}
		
		.input-wrapper {
			padding: 24rpx 32rpx;
			display: flex;
			align-items: flex-start;
			gap: 16rpx;
			
			.reply-textarea {
				flex: 1;
				min-height: 120rpx;
				max-height: 400rpx;
				padding: 16rpx;
				background-color: #f5f5f5;
				border-radius: 12rpx;
				font-size: 28rpx;
				line-height: 1.6;
			}
			
			// ✅ 修改：表情/键盘按钮
			.emoji-btn {
				width: 80rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #ffffff; // 移除背景
				border-radius: 12rpx;
				
				// ✅ 修改：图标尺寸
				.emoji-icon-img {
					width: 60rpx;
					height: 60rpx;
				}
			}
		}
		
		// ✅ 修改：表情选择器 (全新样式)
		.emoji-picker {
			max-height: 400rpx;
			overflow-y: auto;
			padding: 0 32rpx 24rpx;
			
			// Tab 切换
			.emoji-tabs {
				display: flex;
				border-bottom: 1rpx solid #f0f0f0;
				margin-bottom: 24rpx;
				padding: 0 0 8rpx 0;
				
				.tab-item {
					padding: 16rpx 0;
					margin-right: 40rpx;
					font-size: 28rpx;
					color: #999999;
					position: relative;
					cursor: pointer;
					
					&.active {
						color: #333333;
						font-weight: 500;
						
						&::after {
							content: '';
							position: absolute;
							bottom: 0;
							left: 0;
							right: 0;
							height: 4rpx;
							background-color: #1890ff;
							border-radius: 2rpx;
						}
					}
				}
			}
			
			// 表情列表
			.emoji-list {
				display: grid;
				grid-template-columns: repeat(7, 1fr); // 7 列
				gap: 16rpx;
				
				.emoji-item {
					aspect-ratio: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #ffffff; // 移除背景
					border-radius: 12rpx;
					cursor: pointer;
					
					&:active {
						background-color: #ffffff; 
					}
					
					.emoji-image {
						width: 80%; // 增大显示
						height: 80%;
					}
				}
			}
		}
		
		.reply-actions {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 24rpx 32rpx;
			padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
			border-top: 1rpx solid #f0f0f0;
			
			.char-count {
				font-size: 24rpx;
				color: #999999;
			}
			
			.submit-btn {
				padding: 16rpx 48rpx;
				background-color: #1890ff;
				border-radius: 40rpx;
				
				text {
					font-size: 28rpx;
					color: #ffffff;
					font-weight: 500;
				}
				
				&.disabled {
					background-color: #cccccc;
					opacity: 0.5;
				}
			}
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