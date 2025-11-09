<template>
	<view>
		<view class="search-box">
			<!-- 搜索栏容器 -->
			<view class="search-container">
				<!-- 使用 uni-ui 提供的搜索组件 -->
				<uni-search-bar 
					@input="input" 
					:radius="100" 
					cancelButton="none"
					@confirm="handleSearch"
					v-model="kw"
					class="search-input"
				></uni-search-bar>
				<!-- 搜索按钮 -->
				<view class="search-btn" @click="handleSearch">
					<text>搜索</text>
				</view>
			</view>
			
			<!-- 新增: 搜索建议下拉列表 -->
			<view class="suggestions-panel" v-if="showSuggestions && suggestionList.length > 0">
				<view 
					class="suggestion-item" 
					v-for="(item, index) in suggestionList" 
					:key="index"
					@click="selectSuggestion(item)"
				>
					<uni-icons type="search" size="16" color="#999"></uni-icons>
					<text class="suggestion-text">{{ item }}</text>
				</view>
			</view>
		</view>
		
		<!-- 搜索历史:只有在没有搜索结果且没有搜索建议时才显示 -->
		<view class="history-box" v-if="searchResults.length === 0 && suggestionList.length === 0 && token">
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="getkw(item)"></uni-tag>
			</view>
		</view>
		
		<!-- 搜索结果 -->
		<view class="waterfall" @click="hideSuggestions">
			<!-- 左列:索引为偶数 -->
			<view class="col">
				<view v-for="(item, i) in leftColumn" :key="item.goods_id" @click="gotoDetail(item)">
					<my-goods :goods="item" />
				</view>
			</view>
		
			<!-- 右列:索引为奇数 -->
			<view class="col">
				<view v-for="(item, i) in rightColumn" :key="item.goods_id" @click="gotoDetail(item)">
					<my-goods :goods="item" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				// 延时器的 timerId
				timer: null,
				// 搜索建议延时器
				suggestionTimer: null,
				// 搜索关键词
				kw: '',
				// 当前搜索关键词(用于判断是否是新的搜索)
				currentKeyword: '',
				// 搜索结果列表
				searchResults: [],
				// 搜索建议列表
				suggestionList: [],
				// 是否显示搜索建议
				showSuggestions: false,
				total: 0,
				// 是否正在请求数据
				isloading: false,
				queryObj: {
					// 查询关键词
					query: '',
					// 商品分类Id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 6
				},
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		computed: {
			...mapState('m_user', ['code', 'token', 'openid']),
			leftColumn()  { return this.searchResults.filter((_, idx) => idx % 2 === 0) },
			rightColumn() { return this.searchResults.filter((_, idx) => idx % 2 === 1) },
			historys() {
				// 注意:由于数组是引用类型,所以不要直接基于原数组调用 reverse 方法,以免修改原数组中元素的顺序
				// 而是应该新建一个内存无关的数组,再进行 reverse 反转
				return [...this.historyList].reverse()
			}
		},
		methods: {
			input(e) {
				// 清除之前的延时器
				clearTimeout(this.timer)
				clearTimeout(this.suggestionTimer)
				
				// 如果输入为空,清空建议列表
				if (!e || e.trim() === '') {
					this.suggestionList = []
					this.showSuggestions = false
					return
				}
				
				// 显示建议面板
				this.showSuggestions = true
				
				// 获取搜索建议(延迟300ms,避免频繁请求)
				this.suggestionTimer = setTimeout(() => {
					// 调用后端API获取搜索建议
					this.getSuggestions(e)
				}, 300)
				
				// 原有的搜索逻辑(延迟500ms)
				this.timer = setTimeout(() => {
					this.kw = e
				}, 500)
			},
			
			// 修改: 从后端获取搜索建议
			async getSuggestions(keyword) {
				if (!keyword || keyword.trim() === '') {
					this.suggestionList = []
					return
				}
				
				try {
					// GET 请求: 从后端获取搜索建议
					const { data: res } = await uni.$http.get('/goods/suggestions', { 
						keyword: keyword.trim() 
					})
					
					if (res.meta.status === 200) {
						// 后端返回的建议列表
						this.suggestionList = res.data.suggestions || []
					} else {
						console.log('获取搜索建议失败:', res.meta.msg)
						this.suggestionList = []
					}
				} catch (error) {
					console.error('获取搜索建议接口错误:', error)
					// 接口失败时使用模拟数据(可选)
					this.suggestionList = this.getMockSuggestions(keyword)
				}
			},
			
			// 新增: 保存搜索关键词到后端数据库
			async saveKeywordToDatabase(keyword) {
				if (!keyword || keyword.trim() === '') {
					return
				}
				
				try {
					// POST 请求: 保存搜索关键词到后端
					const { data: res } = await uni.$http.post('/goods/suggestions', {
						code: this.openid,  // 用户标识
						keyword: keyword.trim()
					})
					
					if (res.meta.status === 200) {
						console.log('搜索关键词保存成功')
					} else {
						console.log('保存搜索关键词失败:', res.meta.msg)
					}
				} catch (error) {
					console.error('保存搜索关键词接口错误:', error)
				}
			},
			
			// 保留: 模拟搜索建议数据(后端接口失败时的降级方案)
			getMockSuggestions(keyword) {
				const mockData = {
					'手机': ['手机', '手机壳', '手机支架', '二手手机', '苹果手机'],
					'电脑': ['电脑', '电脑桌', '笔记本电脑', '台式电脑', '电脑配件'],
					'自行车': ['自行车', '山地自行车', '公路自行车', '儿童自行车', '自行车配件'],
					'iphone': ['iphone 13', 'iphone 12', 'iphone 14', 'iphone 充电器', 'iphone 耳机']
				}
				
				// 简单的关键词匹配逻辑
				for (let key in mockData) {
					if (key.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(key)) {
						return mockData[key]
					}
				}
				
				// 默认返回包含关键词的建议
				return [
					keyword,
					keyword + ' 二手',
					keyword + ' 全新',
					'闲置' + keyword
				]
			},
			
			// 修改: 选择搜索建议
			async selectSuggestion(suggestion) {
				this.kw = suggestion
				this.showSuggestions = false
				this.suggestionList = []
				// 清空之前的搜索结果
				this.searchResults = []
				this.queryObj.pagenum = 1
				
				// 保存到后端数据库
				await this.saveKeywordToDatabase(suggestion)
				
				// 触发搜索并保存到本地历史记录
				this.getSearchList(true)
			},
			
			// 新增: 隐藏搜索建议
			hideSuggestions() {
				this.showSuggestions = false
				this.suggestionList = []
			},
			
			// 修改: 处理搜索按钮点击和回车事件
			async handleSearch() {
				if (this.kw.trim() === '') {
					uni.showToast({
						title: '请输入搜索关键词',
						icon: 'none'
					})
					return
				}
				
				// 隐藏搜索建议
				this.showSuggestions = false
				this.suggestionList = []
				// 清空之前的搜索结果
				this.searchResults = []
				this.queryObj.pagenum = 1
				
				// 保存到后端数据库
					
				if (this.token) {
					await this.saveKeywordToDatabase(this.kw)
				}
				
				// 触发搜索并保存到本地历史记录
				this.getSearchList(true)
			},
			
			// 根据搜索关键词,搜索商品建议列表
			// saveHistory: 是否保存到搜索历史
			async getSearchList(saveHistory = false, cb) {
				// 判断关键词是否为空
				if (this.kw === '') {
					this.searchResults = []
					return
				}
				
				// 检测是否是新的搜索关键词
				if (this.currentKeyword !== this.kw) {
					// 如果是新的搜索,清空之前的结果并重置页码
					this.searchResults = []
					this.queryObj.pagenum = 1
					this.currentKeyword = this.kw
				}
				
				this.isloading = true
				// 发起请求,获取搜索建议列表
				const { data: res } = await uni.$http.get('/goods/search', { 
					query: this.kw,
					pagenum: this.queryObj.pagenum,
					pagesize: this.queryObj.pagesize
				})
				this.isloading = false
				cb && cb()
				
				if (res.meta.status !== 200) return uni.$showMsg()
				
				// 获取新数据
				const newGoods = res.message.goods || []
				this.total = res.message.total
				
				// 去重处理:创建已有商品ID的Set集合
				const existingIds = new Set(this.searchResults.map(item => item.goods_id))
				
				// 过滤掉已存在的商品
				const uniqueNewGoods = newGoods.filter(item => !existingIds.has(item.goods_id))
				
				// 添加去重后的新商品到结果列表
				this.searchResults = [...this.searchResults, ...uniqueNewGoods]
				
				// 只有在明确指定保存历史时才保存到本地
				if (saveHistory && this.token) {
					this.saveSearchHistory()
				}
			},
			
			saveSearchHistory() {
				// 1. 将 Array 数组转化为 Set 对象
				const set = new Set(this.historyList)
				// 2. 调用 Set 对象的 delete 方法,移除对应的元素
				set.delete(this.kw)
				// 3. 调用 Set 对象的 add 方法,向 Set 中添加元素
				set.add(this.kw)
				// 4. 将 Set 对象转化为 Array 数组
				this.historyList = Array.from(set)
				// 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			
			// 清空搜索历史记录
			cleanHistory() {
				// 🔥 添加确认提示框
				uni.showModal({
					title: '提示',
					content: '确定要清空所有搜索历史吗？',
					confirmText: '确定',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							// 用户点击确定后才执行清空操作
							// 清空 data 中保存的搜索历史
							this.historyList = []
							// 清空本地存储中记录的搜索历史
							uni.setStorageSync('kw', '[]')
						} else if (res.cancel) {
							// 用户点击取消，不做任何操作
							console.log('用户取消清空历史记录')
						}
					}
				})
			},
			
			// 修改: 点击历史记录触发搜索
			async getkw(kw) {
				this.kw = kw
				this.currentKeyword = '' // 重置当前关键词,确保会清空旧数据
				this.searchResults = []
				this.queryObj.pagenum = 1
				this.showSuggestions = false // 隐藏搜索建议
				this.suggestionList = [] // 清空搜索建议
				
				// 保存到后端数据库
				await this.saveKeywordToDatabase(kw)
				
				// 点击历史记录时触发搜索,不需要再次保存到本地历史
				this.getSearchList(false)
			},
			
			// 点击跳转到商品详情页面
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
			}
		},
		
		// 触底的事件
		onReachBottom() {
			// 判断是否还有下一页数据
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕!')
			// 判断是否正在请求其它数据,如果是,则不发起额外的请求
			if (this.isloading) return
			// 让页码值自增 +1
			this.queryObj.pagenum += 1
			// 重新获取列表数据(不保存历史)
			this.getSearchList(false)
		},
		   	
		   	// 下拉刷新的事件
		   	onPullDownRefresh() {
		   		// 1. 重置关键数据
		   		this.queryObj.pagenum = 1
		   		this.total = 0
		   		this.isloading = false
		   		this.searchResults = []
		   		this.currentKeyword = '' // 重置当前关键词
		   		// 2. 重新发起请求(不保存历史)
		   		this.getSearchList(false, () => uni.stopPullDownRefresh())
		   	}
		   }
		</script>
		
<style lang="scss">
   .search-box {
     position: sticky;
     top: 0;
     z-index: 999;
     background-color: #ffffff; /* 🔥 改为白色 */
     padding: 16rpx;
     box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08); /* 🔥 增加阴影 */
   }
   
   .search-container {
     display: flex;
     align-items: center;
   
     .search-input {
       flex: 1;
       .uni-searchbar {
         background-color: transparent !important;
         padding: 0;
       }
     }
   
     .search-btn {
       margin-left: 16rpx;
       padding: 12rpx 24rpx;
       background-color: #f5f5f5; /* 🔥 改为浅灰色 */
       border-radius: 50rpx;
       font-size: 28rpx;
       color: #000000; /* 🔥 改为黑色 */
       font-weight: 500;
       white-space: nowrap;
   
       &:active {
         opacity: 0.8;
       }
     }
   }
   
   /* 🔥 搜索建议下拉面板 */
   .suggestions-panel {
     position: absolute;
     top: 100%;
     left: 16rpx;
     right: 16rpx;
     background: #fff;
     border-radius: 0 0 16rpx 16rpx;
     box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
     max-height: 600rpx;
     overflow-y: auto;
     z-index: 998;
   
     .suggestion-item {
       display: flex;
       align-items: center;
       padding: 24rpx 32rpx;
       border-bottom: 1rpx solid #f0f0f0;
   
       &:last-child {
         border-bottom: none;
       }
   
       &:active {
         background: #f5f5f5;
       }
   
       .suggestion-text {
         margin-left: 16rpx;
         font-size: 28rpx;
         color: #333;
       }
     }
   }
   
   .uni-searchbar {
     display: flex;
     flex-direction: row;
     position: relative;
     background-color: transparent;
   }
   
   /* 🔥 搜索历史区域 - 优化间距 */
   .history-box {
     padding: 32rpx 24rpx;
   
     .history-title {
       display: flex;
       justify-content: space-between;
       align-items: center;
       height: 60rpx;
       font-size: 32rpx;
       font-weight: 600;
       color: #333333;
       border-bottom: 2rpx solid #f0f0f0;
       margin-bottom: 24rpx;
   
       uni-icons {
         font-size: 28rpx;
         cursor: pointer;
       }
     }
   
     .history-list {
       display: flex;
       flex-wrap: wrap;
       gap: 20rpx; /* 水平和竖直方向的默认间距 */
       row-gap: 50rpx; /* 🔥 行间距（上下间距）增加到 28rpx */
       column-gap: 16rpx; /* 🔥 列间距（左右间距）设置为 16rpx */
   
       .uni-tag {
         margin: 0;
         font-size: 28rpx;
         padding: 16rpx 28rpx;
		 border-radius: 40rpx; /* 🔥 添加圆角，数值越大越圆 */
         line-height: 1.4;
         word-break: keep-all;
         white-space: nowrap;
       }
     }
   }

   
   .waterfall {
     display: flex;
     justify-content: space-between;
     padding: 20rpx;
     background: #f5f5f5;
     box-sizing: border-box;
   }
   
   .col {
     width: 48%;
     display: flex;
     flex-direction: column;
   }

</style>