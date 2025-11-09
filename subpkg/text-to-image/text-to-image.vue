<template>
	<view class="text-to-image-page">
		<canvas 
			id="textCanvas" 
			type="2d" 
			style="width: 750px; height: 1000px; position: fixed; left: -9999px;"
		></canvas>
		
		<view class="image-preview-container">
			<view class="loading-container" v-if="isGenerating">
				<view class="loading-spinner"></view>
				<text class="loading-text">正在生成图片...</text>
			</view>
			
			<view 
				class="preview-image-wrapper" 
				v-else-if="tempImagePath"
			>
				<image 
				  id="previewImage"
				  class="preview-image" 
				  :src="tempImagePath" 
				  mode="widthFix"
				></image>
				
				</view>
			
			<view class="empty-preview" v-else>
				<text class="empty-icon">🎨</text>
				<text class="empty-text">选择背景图片生成预览</text>
				<text class="empty-hint">向下滑动选择背景风格</text>
			</view>
		</view>
		
		<view class="highlight-toolbar-container" v-if="tempImagePath && !isGenerating && highlightQueries.length > 0">
			<view class="button-group">
				<view class="highlight-action-btn add-more" @click="showHighlightPrompt">
					<text>继续添加</text>
				</view>
				<view class="highlight-action-btn clear" @click="clearHighlight">
					<text>清除</text>
				</view>
			</view>
		</view>
		
		<view class="font-slider-container" v-if="tempImagePath && !isGenerating">
			<text class="slider-label">字号:</text>
			<slider
				class="font-slider"
				:value="currentFontSize"
				:min="minFontSize"
				:max="initialFontSize"
				@changing="handleSliderChange" 
				block-size="20"
				activeColor="#C00000"
				backgroundColor="#f0f0f0"
			/>
			<view 
				class="font-change-button" 
				v-if="currentFontList.length > 1" 
				@click="handleChangeFont"
			>
				<text>换字体</text>
			</view>
		</view>
		
		<view class="bg-selector-section">
			<text class="selector-title">选择背景风格</text>
			<scroll-view class="bg-image-list" scroll-x show-scrollbar="false">
				<view 
					class="bg-image-item"
					v-for="(bg, index) in backgroundCategories"
					:key="index"
					:class="{ 
						'active': selectedCategoryIndex === index,
						'disabled': isGenerating
					}"
					@click="handleSelectCategory(index)"
				>
					<image 
						class="bg-thumbnail" 
						:src="bg.currentStyle.path" 
						mode="aspectFill"
					></image>
					<view class="bg-name-wrapper">
						<text class="bg-name">{{ bg.name }}</text>
					</view>
					<view class="selected-badge" v-if="selectedCategoryIndex === index">
						<text class="badge-icon">✓</text>
					</view>
					<view 
						class="change-style-btn" 
						v-if="selectedCategoryIndex === index && bg.styles.length > 1"
						@click.stop="handleChangeStyle(index)"
					>
						<text class="change-icon">🔄</text>
					</view>
					
					</view>
			</scroll-view>
		</view>
		
		<view class="bottom-actions">
			<view class="action-btn cancel" @click="goBack">
				<text>取消</text>
			</view>
			
			<view 
				class="action-btn drawing-toggle" 
				@click="showHighlightPrompt"
				v-if="tempImagePath && !isGenerating"
			>
				<text>{{ highlightQueries.length > 0 ? '继续添加' : '高亮' }}</text>
			</view>
			
			<view 
				class="action-btn confirm" 
				:class="{ 'disabled': !tempImagePath || isGenerating || isUploading }"
				@click="confirmSelection"
			>
				<text>{{ isUploading ? '上传中...' : isGenerating ? '生成中...' : '下一步' }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { backgroundCategories, fontLibrary } from './backgroundConfig.js'; 
	
	export default {
		data() {
			return {
				contentItems: [], 
				contentText: '',
				contentItems: [], // 🔥 新增：存储混合内容
				selectedCategoryIndex: -1,
				tempImagePath: '',
				generatedImageUrl: '',
				isGenerating: false,
				isUploading: false,
				isTopic: false,
				
				// 🎨 2. <script> data() 修改:
				// highlightQuery (string) -> highlightQueries (array)
				highlightQueries: [], 
				
				backgroundCategories: backgroundCategories,
				fontLibrary: fontLibrary, 
				loadedFontFamilies: new Set(), 
				
				initialFontSize: 100, 
				currentFontSize: 18,
				minFontSize: 18,
				sliderDebounceTimer: null, 
				
				isFirstLoad: true,
				// 🔥 新增：存储从 topic 页面传递过来的图片
				      existingImages: []
			}
		},
		
		computed: {
			// ... (computed 保持不变) ...
			...mapState('m_user', ['openid', 'userBase']),
			
			currentStyle() {
				if (this.selectedCategoryIndex === -1) return null;
				const category = this.backgroundCategories[this.selectedCategoryIndex];
				return category.styles[category.currentStyleIndex];
			},
			
			currentFontList() {
				if (!this.currentStyle || !this.currentStyle.fonts) {
					return [];
				}
				return this.currentStyle.fonts.map(fontKey => {
					const fontData = this.fontLibrary[fontKey];
					if (!fontData) {
						console.error(`❌ 字体Key "${fontKey}" 在 fontLibrary 中未找到!`);
						return { name: 'Error' }; 
					}
					return fontData;
				});
			},
			
			currentFontIndex() {
				return this.currentStyle ? this.currentStyle.currentFontIndex : 0;
			},
			
			currentBackground() {
				if (!this.currentStyle) return null;
				
				const style = this.currentStyle;
				const fontIndex = style.currentFontIndex || 0;
				
				const fontKey = style.fonts[fontIndex];
				if (!fontKey) {
					 console.error('❌ 字体Key缺失');
					 return null;
				}
				
				const font = this.fontLibrary[fontKey]; 
				
				if (!font) {
					console.error(`❌ 字体Key "${fontKey}" 在库中未找到!`);
					return null;
				}
				
				return {
				  path: style.path,
				  name: style.name,
				  textBox: style.textBox || null,
				  
				  fontConfig: { 
					family: font.family,
					weight: font.weight,
					style: font.style || 'normal',
					url: font.url || null 
				  },
				  textColor: font.textColor,
				  highlightColor: font.highlightColor,
				  highlightGeometry: font.highlightGeometry || null
				};
			}

		},
		onLoad(options) {
		    try {
		      // 处理话题内容
		      const storedContentItems = uni.getStorageSync('topic_content_items');
		      
		      if (storedContentItems && storedContentItems.length > 0) {
		        this.contentItems = storedContentItems;
		        this.contentText = this.convertContentItemsToText(storedContentItems);
		        console.log('✅ 成功加载话题内容:', {
		          items: this.contentItems,
		          plainText: this.contentText
		        });
		        uni.removeStorageSync('topic_content_items');
		      } else if (options.content) {
		        this.contentText = decodeURIComponent(options.content);
		        this.contentItems = [{
		          type: 'text',
		          content: this.contentText
		        }];
		      }
		    } catch (err) {
		      console.error('❌ 加载话题内容失败:', err);
		      if (options.content) {
		        this.contentText = decodeURIComponent(options.content);
		        this.contentItems = [{
		          type: 'text',
		          content: this.contentText
		        }];
		      }
		    }
		    
		    // 🔥 新增：接收从 topic 页面传递的图片
		    if (options.images) {
		      try {
		        const images = JSON.parse(decodeURIComponent(options.images));
		        if (Array.isArray(images) && images.length > 0) {
		          this.existingImages = images;
		          console.log('✅ 成功接收 topic 页面的图片:', images);
		        }
		      } catch (error) {
		        console.error('❌ 解析图片数据失败:', error);
		      }
		    }
		    
		    if (options.isTopic) {
		      this.isTopic = options.isTopic === '1';
		    }
		    
		    // 初始化背景样式
		    this.backgroundCategories.forEach(category => {
		      this.$set(category, 'currentStyle', category.styles[category.currentStyleIndex]);
		      
		      category.styles.forEach(style => {
		        if (style.currentFontIndex === undefined) {
		          this.$set(style, 'currentFontIndex', 0);
		        }
		      });
		
		      this.$set(category, '_shuffledIndices', null); 
		      this.$set(category, '_shuffledCycleIndex', -1); 
		    });
		    
		    this.$nextTick(() => {
		      this.selectCategory(0);
		    });
		  },
		
		methods: {
			...mapMutations('m_user', ['updateUserBase']),
			
			
			// 🔥 新增方法：转换contentItems为纯文本
			convertContentItemsToText(items) {
			  return items.map(item => {
			    if (item.type === 'text') {
			      return item.content;
			    } else if (item.type === 'emoji') {
			      return '　'; // 用全角空格占位，保持宽度计算
			    }
			    return '';
			  }).join('');
			},
			
			showHighlightPrompt() {
			   // 🔥 修改：检测两种表情包情况
			    const hasEmojiType = this.contentItems.some(item => item.type === 'emoji');
			    const hasEmojiInText = this.contentItems.some(item => {
			      if (item.type === 'text') {
			        // 使用正则检测文本中是否包含emoji字符
			        const emojiRegex = /[\p{Emoji}\p{Emoji_Component}]/gu;
			        return emojiRegex.test(item.content);
			      }
			      return false;
			    });
			    
			    const hasEmoji = hasEmojiType || hasEmojiInText;
			    
			    if (hasEmoji) {
			      uni.showModal({
			        title: '无法添加高亮',
			        content: '添加表情包后无法添加高亮，请在纯文字内容中使用高亮功能',
			        showCancel: false,
			        confirmText: '我知道了',
			        confirmColor: '#C00000'
			      });
			      return;
			    }
			  
			  // 🔥 以下是原有逻辑（仅在无表情时执行）
			  const textWithoutEmojis = this.contentItems
			    .filter(item => item.type === 'text')
			    .map(item => item.content)
			    .join('');
			  
			  console.log('📄 当前纯文本内容（用于高亮）:', textWithoutEmojis);
			  
			  uni.showModal({
			    title: '添加高亮关键词',
			    editable: true,
			    placeholderText: '例如：重点',
			    success: (res) => {
			      if (res.confirm && res.content) {
			        const newQuery = res.content.trim();
			        if (!newQuery) return;
			        
			        // 🔥 检查关键词是否在纯文本中存在
			        if (!textWithoutEmojis.includes(newQuery)) {
			          uni.showModal({
			            title: '未找到关键词',
			            content: `内容中不包含"${newQuery}"，请检查拼写或选择其他关键词`,
			            showCancel: false,
			            confirmText: '重新输入',
			            success: () => {
			              this.showHighlightPrompt();
			            }
			          });
			          return;
					  
			        }
			        
			        // 检查是否已存在
			        if (this.highlightQueries.includes(newQuery)) {
			          uni.showToast({
			            title: '关键词已存在',
			            icon: 'none',
			            duration: 2000
			          });
			          return;
			        }
			        
			        // 添加到数组
			        this.highlightQueries.push(newQuery);
			        console.log('✨ 添加高亮关键词:', this.highlightQueries);
			        
			        // 重新生成图片
			        this.generateImage(this.currentFontSize);
			        
			        uni.showToast({
			          title: `已高亮"${newQuery}"`,
			          icon: 'success',
			          duration: 1500
			        });
			      }
			    }
			  });
			},


			
			// 🎨 4. <script> methods 修改: clearHighlight
			// (清除数组并增加确认框)
			clearHighlight() {
				if (this.highlightQueries.length > 0) {
					
					uni.showModal({
						title: '确认清除',
						content: '要清除所有高亮关键词吗？',
						success: (res) => {
							if (res.confirm) {
								this.highlightQueries = []; // (修改) 清空数组
								this.generateImage(this.currentFontSize);
								uni.showToast({
									title: '高亮已清除',
									icon: 'none'
								});
							}
						}
					});
				}
			},
			  					  
			convertToPlainText(items) {
				return items.map(item => {
					if (item.type === 'text') {
						return item.content;
					} else if (item.type === 'emoji') {
						return `[${item.name || '表情'}]`;
					}
					return '';
				}).join('');
			},
			
			// ... (handleSelectCategory, selectCategory, changeStyle 保持不变) ...
			handleSelectCategory(index) {
				if (this.isGenerating) return;
				this.selectCategory(index);
			},
			
			selectCategory(index) {
				this.selectedCategoryIndex = index;
				this.generateImage(null);
			},
			
			handleChangeStyle(index) {
				if (this.isGenerating) return;
				this.changeStyle(index);
			},
			
			changeStyle(categoryIndex) {
			  const category = this.backgroundCategories[categoryIndex];
			  const styleCount = category.styles.length;
			  
			  if (styleCount <= 1) {
				uni.showToast({
				  title: '该风格暂无其他搭配',
				  icon: 'none',
				  duration: 1500
				});
				return;
			  }
			  
			  if (!category._shuffledIndices || category._shuffledCycleIndex >= styleCount - 1) {
				console.log(`🔄 列表播放完毕, 为 ${category.name} 重新生成随机列表...`);
				let indices = Array.from({ length: styleCount }, (_, i) => i);
				for (let i = indices.length - 1; i > 0; i--) {
				  const j = Math.floor(Math.random() * (i + 1));
				  [indices[i], indices[j]] = [indices[j], indices[i]];
				}
				const currentStyleIndex = category.currentStyleIndex;
				if (indices[0] === currentStyleIndex && styleCount > 1) {
				  const lastIndex = indices.length - 1;
				  [indices[0], indices[lastIndex]] = [indices[lastIndex], indices[0]];
				}
				category._shuffledIndices = indices;
				category._shuffledCycleIndex = -1;
			  }
			  
			  category._shuffledCycleIndex++;
			  const newStyleIndex = category._shuffledIndices[category._shuffledCycleIndex];
			  
			  category.currentStyleIndex = newStyleIndex;
			  this.$forceUpdate();
			  
			  this.generateImage(null); 
			  
			  const newStyle = category.styles[newStyleIndex];
			  const fontKey = newStyle.fonts[newStyle.currentFontIndex || 0];
			  const newFont = this.fontLibrary[fontKey]; 
			  
			  uni.showToast({
				title: `${newStyle.name} · ${newFont.name}`,
				icon: 'success',
				duration: 1500
			  });
			},
			
			// ... (handleChangeFont, handleSliderChange 保持不变) ...
			handleChangeFont() {
				if (this.isGenerating || !this.currentStyle) return;

				const fontCount = this.currentFontList.length;
				if (fontCount <= 1) {
					return;
				}
	
				const currentIndex = this.currentFontIndex;
				let newIndex;
	
				do {
					newIndex = Math.floor(Math.random() * fontCount);
				} while (newIndex === currentIndex);
	
				this.currentStyle.currentFontIndex = newIndex;
				this.$forceUpdate(); 
				
				this.generateImage(null); 
	
				const newFont = this.currentFontList[newIndex];
				uni.showToast({
					title: `字体: ${newFont.name}`,
					icon: 'none'
				});
			},
			
			handleSliderChange(e) {
				const newSize = e.detail.value;
				
				this.currentFontSize = newSize; 
				
				if (this.sliderDebounceTimer) {
					clearTimeout(this.sliderDebounceTimer);
				}
				this.sliderDebounceTimer = setTimeout(() => {
					this.generateImage(newSize); 
				}, 50);
			},

			// ... (getCanvasContext, doesTextFit, calculateMaxFontSize, loadCustomFont 保持不变) ...
			async getCanvasContext() {
				 return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('#textCanvas')
						.fields({ node: true, size: true })
						.exec((res) => {
							if (!res || !res[0] || !res[0].node) {
								reject(new Error('获取 Canvas 失败'));
								return;
							}
							const canvas = res[0].node;
							const ctx = canvas.getContext('2d');
							resolve(ctx);
						});
				 });
			},
			
			doesTextFit(ctx, text, fontSize, maxWidth, maxHeight, fontConfig) {
				const fontWeight = fontConfig.weight || 'normal';
				const fontFamily = fontConfig.family || 'sans-serif';
				ctx.font = `normal ${fontWeight} ${fontSize}px ${fontFamily}`;
				
				const lineHeight = fontSize * 1.4;
				const lines = this.wrapText(ctx, text, maxWidth, fontSize); 
				const totalHeight = lines.length * lineHeight;
				
				return totalHeight <= maxHeight;
			},
			
			async calculateMaxFontSize(text, canvasWidth, canvasHeight, textBox, fontConfig) {
				const padding = 60;
				const maxWidth = textBox ? textBox.width : canvasWidth - padding * 2;
				const maxHeight = textBox ? textBox.height : canvasHeight * 0.7;
				
				const minFont = this.minFontSize; // 18
				const maxFont = 300; 

				const ctx = await this.getCanvasContext();
				
				let bestFit = minFont;
				let low = minFont;
				let high = maxFont;
				
				for (let i = 0; i < 10; i++) {
					if (low > high) break;
					
					let mid = Math.floor((low + high) / 2);
					if (mid === 0) return bestFit; 

					if (this.doesTextFit(ctx, text, mid, maxWidth, maxHeight, fontConfig)) {
						bestFit = mid;
						low = mid + 1;
					} else {
						high = mid - 1;
					}
				}
				console.log(`Binary search result: bestFit = ${bestFit}`);
				return bestFit;
			},

			async loadCustomFont(fontConfig) {
			  // 🔥 关键：没有 URL 的系统字体直接返回成功
			  if (!fontConfig || !fontConfig.url) {
			    console.log('✅ 使用系统字体，无需加载');
			    return Promise.resolve();
			  }
			  
			  const fontFamilyName = fontConfig.family;
			  
			  // 如果已经尝试加载过（成功或失败），不再重复尝试
			  if (this.loadedFontFamilies.has(fontFamilyName)) {
			    console.log(`⏭️ 字体 '${fontFamilyName}' 已处理过，跳过`);
			    return Promise.resolve();
			  }
			  
			  console.log(`⏳ 开始加载字体: ${fontFamilyName} from ${fontConfig.url}`);
			  uni.showLoading({ title: '加载字体...', mask: true });
			  
			  // 🔥 关键：使用 try-catch 包裹整个 Promise，确保任何错误都不会中断流程
			  try {
			    await new Promise((resolve, reject) => {
			      uni.loadFontFace({
			        family: fontFamilyName,
			        source: `url("${fontConfig.url}")`,
			        weight: fontConfig.weight || 'normal',
			        style: fontConfig.style || 'normal',
			        success: () => {
			          console.log(`✅ 字体 '${fontFamilyName}' 加载成功`);
			          this.loadedFontFamilies.add(fontFamilyName);
			          uni.hideLoading();
			          resolve(); // 成功时 resolve
			        },
			        fail: (err) => {
			          console.warn(`⚠️ 字体 '${fontFamilyName}' 加载失败，将使用系统默认字体:`, err);
			          // 🔥 关键修改：失败时也标记为已处理，并 resolve（不 reject）
			          this.loadedFontFamilies.add(fontFamilyName);
			          uni.hideLoading();
			          resolve(); // ✅ 即使失败也 resolve，不中断流程
			        }
			      });
			    });
			  } catch (error) {
			    // 🔥 兜底处理：即使 Promise 异常也不抛出错误
			    console.warn(`⚠️ 字体加载异常，继续使用系统字体:`, error);
			    uni.hideLoading();
			  }
			  
			  // 🔥 最终确保总是返回 resolved Promise
			  return Promise.resolve();
			},

			
			// 🎨 5. <script> methods 修改: generateImage
			async generateImage(newFontSize = null) {
				if (this.isGenerating && newFontSize) {
					console.log('--- 正在生成, 丢弃滑块事件 ---');
					return; 
				}
				
				this.isGenerating = true;
				
				try {
				  const canvasWidth = 750;
				  const canvasHeight = 1000;
				  
				  if (!this.currentBackground) {
					throw new Error('无法获取当前背景配置');
				  }
				  
				  await this.loadCustomFont(this.currentBackground.fontConfig);
				  
				  let fontSize;

				  if (newFontSize) {
					fontSize = newFontSize;
				  } else {
					console.log('Calculating max font size for new background...');
					const newMaxFontSize = await this.calculateMaxFontSize(
						this.contentText.trim(),
						canvasWidth,
						canvasHeight,
						this.currentBackground.textBox,
						this.currentBackground.fontConfig 
					);
					
					console.log(`📐 新背景最大字号: ${newMaxFontSize}px`);
					
					this.initialFontSize = newMaxFontSize;  
					
					if (this.isFirstLoad) {
						fontSize = newMaxFontSize;
						this.isFirstLoad = false; 
						console.log('首次加载，设置为最大值');
					} else {
						fontSize = Math.min(this.currentFontSize, newMaxFontSize);
						console.log(`切换背景，保留字号: ${this.currentFontSize} -> ${fontSize}`);
					}
					
					this.currentFontSize = fontSize;
				  }
				  
				   // 修改这里：传递 contentItems 而不是 contentText
				    const tempFilePath = await this.drawTextOnBackground(
				      this.contentItems, // 🔥 传递 contentItems
				      this.currentBackground.path,
				      {
				        fontSize: fontSize,
				        textColor: this.currentBackground.textColor,
				        enableShadow: true,
				        fontConfig: this.currentBackground.fontConfig,
				        highlightColor: this.currentBackground.highlightColor,
				        textBox: this.currentBackground.textBox,
				        highlightGeometry: this.currentBackground.highlightGeometry,
				        highlightQueries: this.highlightQueries
				      }
				    );
				  
				  this.tempImagePath = tempFilePath;
				  
				} catch (error) {
				  console.error('❌ 生成图片失败:', error);
				  uni.showToast({
					title: error.message || '生成失败，请重试',
					icon: 'none'
				  });
				} finally {
				  this.isGenerating = false;
				}
			},
			
			// 🔥 修改 drawTextOnBackground 方法
			async drawTextOnBackground(contentItems, bgImagePath, styleConfig) {
			  return new Promise((resolve, reject) => {
			    const query = uni.createSelectorQuery().in(this);
			    query.select('#textCanvas')
			      .fields({ node: true, size: true })
			      .exec(async (res) => {
			        
			        if (!res || !res[0]) {
			          reject(new Error('获取 Canvas 失败'));
			          return;
			        }
			        
			        const canvas = res[0].node;
			        const ctx = canvas.getContext('2d');
			        
			        const dpr = uni.getSystemInfoSync().pixelRatio;
			        canvas.width = 750 * dpr;
			        canvas.height = 1000 * dpr;
			        ctx.scale(dpr, dpr);
			        
			        const width = 750;
			        const height = 1000;
			        
			        ctx.clearRect(0, 0, width, height);
			        
			        try {
			          // 1. 绘制背景
			          await this.drawBackgroundImage(ctx, canvas, width, height, bgImagePath);
			          
			          // 2. 设置字体
			          const fontConfig = styleConfig.fontConfig;
			          const fontStyle = fontConfig.style === 'italic' ? 'italic' : 'normal';
			          const fontWeight = fontConfig.weight || 'normal';
			          const fontFamily = fontConfig.family || 'sans-serif';
			          
			          ctx.fillStyle = styleConfig.textColor;
			          ctx.textBaseline = 'middle';
			          ctx.font = `${fontStyle} ${fontWeight} ${styleConfig.fontSize}px ${fontFamily}`;
			          
			          if (styleConfig.enableShadow) {
			            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
			            ctx.shadowBlur = 8;
			            ctx.shadowOffsetX = 2;
			            ctx.shadowOffsetY = 2;
			          }
			          
			          // 3. 🔥 绘制混合内容（文字 + 表情）
			          await this.drawMixedContent(ctx, canvas, contentItems, width, height, styleConfig);
			          
			          // 4. 导出图片
			          const exportPromise = new Promise((res, rej) => {
			            uni.canvasToTempFilePath({
			              canvas: canvas,
			              success: (r) => res(r.tempFilePath),
			              fail: (err) => rej(new Error('导出图片失败: ' + err.errMsg))
			            }, this);
			          });
			
			          const exportTimeout = new Promise((_, rej) => {
			            setTimeout(() => {
			              console.error('❌ 导出 Canvas 超时');
			              reject(new Error('图片导出超时'));
			            }, 5000);
			          });
			          
			          const tempFilePath = await Promise.race([exportPromise, exportTimeout]);
			          resolve(tempFilePath);
			          
			        } catch (error) {
			          reject(error);
			        }
			      });
			  });
			},
			
			// 🔥 继续 drawMixedContent 方法
			async drawMixedContent(ctx, canvas, contentItems, canvasWidth, canvasHeight, styleConfig) {
			  const box = styleConfig.textBox;
			  const padding = 60;
			  
			  const maxWidth = box ? box.width : canvasWidth - padding * 2;
			  const hAlign = box ? (box.hAlign || 'center') : 'center';
			  const vAlign = box ? (box.vAlign || 'middle') : 'middle';
			  
			  const lineHeight = styleConfig.fontSize * 1.4;
			  const emojiSize = styleConfig.fontSize * 1.1; // 表情大小略大于字体
			  
			  // 🔥 将 contentItems 转换为可绘制的 segments（包含加载的图片）
			  const segments = await this.prepareDrawSegments(canvas, contentItems, maxWidth, styleConfig.fontSize, emojiSize, ctx);
			  
			  // 计算总高度
			  const totalHeight = segments.length * lineHeight;
			  
			  let startY;
			  if (box) {
			    if (vAlign === 'top') {
			      startY = box.y;
			    } else if (vAlign === 'bottom') {
			      startY = box.y + box.height - totalHeight;
			    } else {
			      startY = box.y + (box.height - totalHeight) / 2;
			    }
			  } else {
			    startY = (canvasHeight - totalHeight) / 2;
			  }
			  
			  // 高亮处理
			  const highlightQueries = styleConfig.highlightQueries;
			  const hasHighlight = Array.isArray(highlightQueries) && highlightQueries.length > 0;
			  const highlightColor = styleConfig.highlightColor || '#A6ECA6';
			  const defaultHighlightGeo = { yOffset: -0.1, height: 0.6 };
			  const customHighlightGeo = styleConfig.highlightGeometry;
			  const geo = customHighlightGeo || defaultHighlightGeo;
			  
			  // 创建没有表情的纯文本版本用于高亮匹配
			  const textWithoutEmojis = contentItems
			    .filter(item => item.type === 'text')
			    .map(item => item.content)
			    .join('');
			  
			  // 查找所有高亮范围
			  const highlightRanges = [];
			  if (hasHighlight) {
			    highlightQueries.forEach(query => {
			      if (!query || query.trim() === '') return;
			      let startIndex = textWithoutEmojis.indexOf(query);
			      while (startIndex !== -1) {
			        highlightRanges.push({
			          start: startIndex,
			          end: startIndex + query.length
			        });
			        startIndex = textWithoutEmojis.indexOf(query, startIndex + 1);
			      }
			    });
			  }
			  
			  // 🔥 绘制每一行
			  let textCharIndex = 0; // 跟踪纯文本字符索引
			  
			  segments.forEach((line, lineIndex) => {
			    const y = startY + lineIndex * lineHeight + lineHeight / 2;
			    
			    // 计算行宽度
			    let lineWidth = 0;
			    line.forEach(item => {
			      if (item.type === 'text') {
			        lineWidth += ctx.measureText(item.content).width;
			      } else if (item.type === 'emoji') {
			        lineWidth += emojiSize;
			      }
			    });
			    
			    // 计算 x 起始位置
			    let x;
			    if (box) {
			      if (hAlign === 'left') {
			        x = box.x;
			      } else if (hAlign === 'right') {
			        x = box.x + box.width - lineWidth;
			      } else {
			        x = box.x + (box.width - lineWidth) / 2;
			      }
			    } else {
			      if (hAlign === 'left') {
			        x = padding;
			      } else if (hAlign === 'right') {
			        x = canvasWidth - padding - lineWidth;
			      } else {
			        x = (canvasWidth - lineWidth) / 2;
			      }
			    }
			    
			    // 🔥 绘制行内容
			    line.forEach(item => {
			      if (item.type === 'text') {
			        const text = item.content;
			        
			        // 检查是否需要高亮
			        if (hasHighlight) {
			          for (let i = 0; i < text.length; i++) {
			            const currentIndex = textCharIndex + i;
			            const char = text[i];
			            const charWidth = ctx.measureText(char).width;
			            
			            // 判断当前字符是否在高亮范围内
			            const isHighlighted = highlightRanges.some(range => 
			              currentIndex >= range.start && currentIndex < range.end
			            );
			            
			            if (isHighlighted) {
			              // 绘制高亮背景
			              const highlightY = y + styleConfig.fontSize * geo.yOffset;
			              const highlightHeight = styleConfig.fontSize * geo.height;
			              
			              ctx.save();
			              ctx.shadowColor = 'transparent';
			              ctx.shadowBlur = 0;
			              ctx.shadowOffsetX = 0;
			              ctx.shadowOffsetY = 0;
			              ctx.fillStyle = highlightColor;
			              ctx.fillRect(x, highlightY, charWidth, highlightHeight);
			              ctx.restore();
			            }
			            
			            // 绘制字符
			            ctx.fillText(char, x, y);
			            x += charWidth;
			          }
			        } else {
			          // 无高亮，直接绘制
			          ctx.fillText(text, x, y);
			          x += ctx.measureText(text).width;
			        }
			        
			        textCharIndex += text.length;
			        
			      } else if (item.type === 'emoji' && item.image) {
			        // 🔥 绘制表情图片
			        const emojiY = y - emojiSize / 2;
			        ctx.drawImage(item.image, x, emojiY, emojiSize, emojiSize);
			        x += emojiSize;
			      }
			    });
			  });
			},
			
			
			// 🔥 新增方法：准备绘制片段（包含加载表情图片）
			async prepareDrawSegments(canvas, contentItems, maxWidth, fontSize, emojiSize, ctx) {
			  const lines = [];
			  let currentLine = [];
			  let currentLineWidth = 0;
			  
			  // 🔥 首先加载所有表情图片
			  for (let item of contentItems) {
			    if (item.type === 'emoji' && item.url) {
			      try {
			        item.image = await this.loadImageToCanvas(canvas, item.url);
			        console.log('✅ 表情图片加载成功:', item.name);
			      } catch (err) {
			        console.error('❌ 表情图片加载失败:', item.name, err);
			        item.image = null;
			      }
			    }
			  }
			  
			  // 🔥 处理换行
			  for (let item of contentItems) {
			    if (item.type === 'text') {
			      const text = item.content;
			      
			      for (let char of text) {
			        const charWidth = ctx.measureText(char).width;
			        
			        if (currentLineWidth + charWidth > maxWidth && currentLine.length > 0) {
			          // 需要换行
			          lines.push(currentLine);
			          currentLine = [];
			          currentLineWidth = 0;
			        }
			        
			        // 合并相邻的文字
			        const lastItem = currentLine[currentLine.length - 1];
			        if (lastItem && lastItem.type === 'text') {
			          lastItem.content += char;
			        } else {
			          currentLine.push({
			            type: 'text',
			            content: char
			          });
			        }
			        
			        currentLineWidth += charWidth;
			      }
			      
			    } else if (item.type === 'emoji') {
			      if (currentLineWidth + emojiSize > maxWidth && currentLine.length > 0) {
			        // 需要换行
			        lines.push(currentLine);
			        currentLine = [];
			        currentLineWidth = 0;
			      }
			      
			      currentLine.push({
			        type: 'emoji',
			        image: item.image,
			        name: item.name
			      });
			      
			      currentLineWidth += emojiSize;
			    }
			  }
			  
			  // 添加最后一行
			  if (currentLine.length > 0) {
			    lines.push(currentLine);
			  }
			  
			  return lines;
			},
			
			// 🔥 新增方法：加载图片到 Canvas
			loadImageToCanvas(canvas, imageUrl) {
			  return new Promise((resolve, reject) => {
			    const img = canvas.createImage();
			    
			    img.onload = () => {
			      console.log('✅ 图片加载成功:', imageUrl);
			      resolve(img);
			    };
			    
			    img.onerror = (err) => {
			      console.error('❌ 图片加载失败:', imageUrl, err);
			      reject(new Error('图片加载失败'));
			    };
			    
			    img.src = imageUrl;
			    
			    // 设置超时
			    setTimeout(() => {
			      reject(new Error('图片加载超时'));
			    }, 5000);
			  });
			},
			
			
			// ... (wrapText 保持不变) ...
			// 🎨 2. Bug修复: 修改 wrapText 以支持 \n 换行
						wrapText(ctx, text, maxWidth, fontSize) {
							const lines = [];
							let currentLine = '';
							const words = text.split(''); // (保持字符分割)
							
							for (let i = 0; i < words.length; i++) { //
								
								// (Bug修复) 检查是否是 \n
								if (words[i] === '\n') {
									lines.push(currentLine); // 推送 \n 之前的内容
									currentLine = ''; // 开始新的一行
									continue; // 跳过 \n 字符
								}
								
								const testLine = currentLine + words[i]; //
								const metrics = ctx.measureText(testLine); //
								
								if (metrics.width > maxWidth && currentLine !== '') { //
									lines.push(currentLine); //
									currentLine = words[i]; //
								} else {
									currentLine = testLine; //
								}
							}
							
							if (currentLine !== '') { //
								lines.push(currentLine); //
							}
							
							return lines;
						},
			
			// ... (drawBackgroundImage 保持不变) ...
			drawBackgroundImage(ctx, canvas, width, height, imagePath) {
				const loadPromise = new Promise((resolve, reject) => {
					const image = canvas.createImage();
					
					image.onload = () => {
						ctx.drawImage(image, 0, 0, width, height);
						console.log('✅ 背景图片绘制成功');
						resolve();
					};
					
					image.onerror = (err) => {
						console.error('❌ 加载背景图片失败:', err);
						reject(new Error('加载背景图片失败'));
					};
					
					image.src = imagePath;
					console.log('📷 开始加载背景图片:', imagePath);
				});

				const timeoutPromise = new Promise((_, reject) => {
					setTimeout(() => {
						console.error(`❌ 加载背景图片超时: ${imagePath}`);
						reject(new Error('背景图片加载超时'));
					}, 10000);
				});

				return Promise.race([loadPromise, timeoutPromise]);
			},
			
			// ... (uploadToOSS 保持不变, 已包含压缩) ...
			async uploadToOSS(originalTempFilePath) {
				try {
					console.log('📤 开始上传图片到 OSS...');

					console.log('⏳ 正在压缩图片 (quality: 80)...');
					const compressedFile = await new Promise((resolve, reject) => {
						uni.compressImage({
							src: originalTempFilePath, 
							quality: 80, 
							success: resolve,
							fail: (err) => {
								console.error('❌ 图片压缩失败:', err);
								reject(new Error('图片压缩失败'));
							}
						});
					});
					
					const tempFilePath = compressedFile.tempFilePath;
					console.log(`✅ 压缩完成, 新路径: ${tempFilePath}`);

					
					const { data: tokenRes } = await uni.$http.get('/upload/token', {
						openid: this.openid,
						fileType: 'image'
					});
					
					if (tokenRes.meta.status !== 200) {
						throw new Error('获取上传凭证失败');
					}
					
					const uploadUrl = tokenRes.message.uploadUrl;
					const publicUrl = tokenRes.message.publicUrl;
					
					const fileContent = await new Promise((resolve, reject) => {
						uni.getFileSystemManager().readFile({
							filePath: tempFilePath, 
							encoding: 'base64',
							success: (res) => resolve(res.data),
							fail: reject
						});
					});
					
					await new Promise((resolve, reject) => {
						uni.getFileInfo({
							filePath: tempFilePath, 
							success: (fileInfo) => {
								console.log(` compressed file size: ${(fileInfo.size / 1024).toFixed(2)} KB`);
								
								uni.request({
									url: publicUrl,
									method: 'PUT',
									header: { 'Content-Type': 'application/octet-stream' },
									data: uni.base64ToArrayBuffer(fileContent),
									success: (res) => {
										if (res.statusCode === 200) resolve(res);
										else reject(new Error(`上传失败: ${res.statusCode}`));
									},
									fail: reject
								});
							},
							fail: reject
						});
					});
					
					this.generatedImageUrl = publicUrl;
					console.log('✅ 图片上传到 OSS 完成:', publicUrl);
					
					return publicUrl;
					
				} catch (error) {
					console.error('❌ 上传失败:', error);
					throw error;
				}
			},
			
			// ... (confirmSelection, uploadAndNavigate, goBack 保持不变) ...
			async confirmSelection() {
				if (!this.tempImagePath || this.isGenerating || this.isUploading) {
				  return;
				}
				
				this.uploadAndNavigate();
			},
			  
			// 🔥 修改：uploadAndNavigate 方法，传递图片数据
			    async uploadAndNavigate() {
			      this.isUploading = true;
			      
			      try {
			        const ossUrl = await this.uploadToOSS(this.tempImagePath);
			        
			        uni.showToast({
			          title: '上传成功',
			          icon: 'success',
			          duration: 1500
			        });
			        
			        setTimeout(() => {
			          // 🔥 修改：将生成的背景图和原有图片一起传递
			          const allImages = [ossUrl, ...this.existingImages];
			          
			          console.log('📤 传递到 publish-post 的图片:', allImages);
			          
			          uni.navigateTo({
			            url: '/subpkg/publish-post/publish-post',
			            success: (res) => {
			              res.eventChannel.emit('topicImageData', {
			                imageUrl: ossUrl, // 生成的背景图（保留兼容性）
			                images: allImages, // 🔥 新增：所有图片数组（背景图 + topic 图片）
			                content: this.contentText,
			                isTopic: this.isTopic
			              });
			            }
			          });
			        }, 1500);
			        
			      } catch (error) {
			        console.error('❌ 上传失败:', error);
			        uni.showToast({
			          title: error.message || '上传失败,请重试',
			          icon: 'none',
			          duration: 2000
			        });
			      } finally {
			        this.isUploading = false;
			      }
			    },
			  
			goBack() {
				uni.navigateBack();
			}
		
	},
}
</script>

<style lang="scss" scoped>
// ... ( .text-to-image-page, .image-preview-container 保持不变) ...
.text-to-image-page {
	min-height: 100vh;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
}

.image-preview-container {
	flex: 1;
	width: 100%;
	background-color: #f8f8f8;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 32rpx;
	min-height: 600rpx;
	box-sizing: border-box;
	
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		.loading-spinner {
			width: 60rpx;
			height: 60rpx;
			border: 4rpx solid rgba(192, 0, 0, 0.1);
			border-top: 4rpx solid #C00000;
			border-radius: 50%;
			animation: spin 1s linear infinite;
		}
		
		.loading-text {
			margin-top: 24rpx;
			font-size: 26rpx;
			color: #999999;
		}
	}
	
	.preview-image-wrapper {
	  width: 686rpx;
	  max-width: 100%;
	  background-color: #ffffff;
	  border-radius: 24rpx;
	  box-shadow: 0 12rpx 48rpx rgba(0, 0, 0, 0.15);
	  overflow: hidden;
	  position: relative;
	  left: 50%;
	  transform: translateX(-50%);
	  
	  .preview-image {
	    width: 100%;
	    height: auto;
	    display: block;
	    vertical-align: top;
	  }
	  
	}
	
	.empty-preview {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16rpx;
		
		.empty-icon {
			font-size: 120rpx;
			margin-bottom: 16rpx;
			opacity: 0.3;
		}
		
		.empty-text {
			font-size: 28rpx;
			color: #999999;
		}
		
		.empty-hint {
			font-size: 24rpx;
			color: #cccccc;
		}
	}
}

// 🎨 7. <style> 修改:
// (重写样式，移除 .highlight-status, 将 .button-group 居中)
.highlight-toolbar-container {
	display: flex;
	align-items: center;
	justify-content: center; // (修改) 改为 center
	padding: 20rpx 32rpx;
	background-color: #ffffff;
	border-top: 1rpx solid #f0f0f0;
	gap: 16rpx;
	
	// (移除) .highlight-status 样式
	
	.button-group {
		display: flex;
		align-items: center;
		gap: 16rpx;
		// (移除) flex-shrink: 0 (不再需要，因为父级是 center)
	}
	
	.highlight-action-btn {
		padding: 10rpx 24rpx;
		border-radius: 30rpx;
		
		text {
		   font-size: 24rpx;
		   font-weight: 500;
		}
		
		&.add-more {
			background-color: #f5f5f5;
			border: 1rpx solid #e0e0e0;
			
			text {
				color: #333;
			}
			
			&:active {
				background-color: #e0e0e0;
			}
		}
		
		&.clear {
			background-color: #fef0f0;
			border: 1rpx solid #fde2e2;
			
			text {
				color: #C00000;
			}
			
			&:active {
				background-color: #fde2e2;
			}
		}
	}
}


.font-slider-container {
// ... (滑块样式 保持不变) ...
	display: flex;
	align-items: center;
	padding: 10rpx 32rpx 20rpx;
	background-color: #ffffff;
	border-top: 1rpx solid #f0f0f0;
	gap: 24rpx;
	
	.slider-label {
		font-size: 26rpx;
		color: #666;
		flex-shrink: 0; 
	}
	
	.font-slider {
		flex: 1;
		margin: 0;
	}
	
	.font-change-button {
		flex-shrink: 0; 
		padding: 10rpx 24rpx;
		background-color: #f5f5f5;
		border: 1rpx solid #e0e0e0;
		border-radius: 30rpx;
		
		text {
			font-size: 24rpx;
			color: #333;
			font-weight: 500;
		}
		
		&:active {
			background-color: #e0e0e0;
		}
	}
}


.bg-selector-section {
	// ... (背景选择样式 保持不变) ...
	background-color: #ffffff;
	padding: 32rpx 0 24rpx;
	border-top: 1rpx solid #f0f0f0;
	position: relative;
	z-index: 10;
	flex-shrink: 0;
	
	.selector-title {
		display: block;
		font-size: 28rpx;
		color: #333333;
		font-weight: 500;
		padding: 0 32rpx;
		margin-bottom: 24rpx;
	}
	
	.bg-image-list {
		white-space: nowrap;
		padding: 0 32rpx;
		
		.bg-image-item {
			display: inline-block;
			margin-right: 20rpx;
			position: relative;
			vertical-align: top;
			
			&:last-child {
				margin-right: 0;
			}
			
			.bg-thumbnail {
				width: 160rpx;
				height: 200rpx;
				border-radius: 16rpx;
				border: 3rpx solid transparent;
				transition: all 0.3s;
				display: block;
			}
			
			.bg-name-wrapper {
				margin-top: 12rpx;
				text-align: center;
				display: flex;
				flex-direction: column;
				gap: 4rpx;
				
				.bg-name {
					font-size: 22rpx;
					color: #666666;
					display: block;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					max-width: 160rpx;
				}
				
			}
			
			.selected-badge {
				position: absolute;
				top: 12rpx;
				right: 12rpx;
				width: 40rpx;
				height: 40rpx;
				background: linear-gradient(135deg, #C00000 0%, #ff6b6b 100%);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				box-shadow: 0 4rpx 12rpx rgba(192, 0, 0, 0.4);
				z-index: 2;
				
				.badge-icon {
					font-size: 24rpx;
					color: #ffffff;
					font-weight: bold;
				}
			}
			
			.change-style-btn {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 72rpx;
				height: 72rpx;
				background: rgba(0, 0, 0, 0.7);
				backdrop-filter: blur(10rpx);
				border-radius: 50%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 4rpx;
				box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.4);
				z-index: 3;
				transition: all 0.3s;
				border: 2rpx solid rgba(255, 255, 255, 0.3);
				
				&:active {
					transform: translate(-50%, -50%) scale(0.9);
					background: rgba(0, 0, 0, 0.85);
				}
				
				.change-icon {
					font-size: 32rpx;
				}
			}
			
			&.active {
				.bg-thumbnail {
					border-color: #C00000;
					box-shadow: 0 8rpx 24rpx rgba(192, 0, 0, 0.3);
					transform: scale(1.05);
				}
				
				.bg-name {
					color: #C00000;
					font-weight: 600;
				}
				
			}
		}
	}
}

					
.bottom-actions {
  // ... (底部按钮 保持不变) ...
  display: flex;
  gap: 16rpx;
  padding: 24rpx 32rpx 48rpx;
  background-color: #ffffff;
  border-top: 1rpx solid #f0f0f0;
  flex-shrink: 0;
  
  .action-btn {
	flex: 1;
	height: 88rpx;
	border-radius: 44rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	font-weight: 500;
	transition: all 0.3s;
	
	text-align: center;
	
	&.cancel {
	  background-color: #f5f5ff;
	  
	  text {
		color: #666666;
	  }
	  
	  &:active {
		background-color: #e8e8e8;
	  }
	}
	
	&.drawing-toggle {
	  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
	  box-shadow: 0 6rpx 20rpx rgba(255, 215, 0, 0.3);
	  
	  text {
		color: #ffffff;
	  }
	  
	  &:active {
		transform: scale(0.98);
	  }
	}
	
	&.confirm {
	  background: linear-gradient(135deg, #C00000 0%, #ff6b6b 100%);
	  box-shadow: 0 8rpx 24rpx rgba(192, 0, 0, 0.3);
	  
	  text {
		color: #ffffff;
	  }
	  
	  &:not(.disabled):active {
		transform: scale(0.98);
		box-shadow: 0 4rpx 12rpx rgba(192, 0, 0, 0.4);
	  }
	  
	  &.disabled {
		opacity: 0.5;
		background: linear-gradient(135deg, #cccccc 0%, #999999 100%);
		box-shadow: none;
	  }
	}
  }
}
					
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>