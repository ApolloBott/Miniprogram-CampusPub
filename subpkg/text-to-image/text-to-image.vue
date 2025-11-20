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
				@click="openSelector('font')"
			>
				<text>换字体</text>
			</view>

			<view class="font-change-button edit-btn" @click="openTextEditor">
				<text>改文案</text>
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
						@click.stop="openSelector('style')"
					>
						<text class="change-icon">⋮</text>
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

		<view class="text-editor-modal" v-if="showTextEditor" @click.stop>
			<view class="modal-mask" @click="closeTextEditor"></view>
			<view class="modal-content">
				<view class="modal-header">
					<text class="modal-title">编辑文案</text>
					<view class="close-btn" @click="closeTextEditor">×</view>
				</view>
				<view class="textarea-wrapper">
					<textarea 
						class="editor-textarea" 
						v-model="editingText" 
						maxlength="500"
						placeholder="请输入文字内容..."
						:show-confirm-bar="false"
						fixed="true"
						cursor-spacing="100"
					></textarea>
					<text class="char-count">{{ editingText.length }}/500</text>
				</view>
				<view class="modal-footer">
					<view class="modal-btn cancel" @click="closeTextEditor">取消</view>
					<view class="modal-btn confirm" @click="confirmTextEdit">确认生成</view>
				</view>
			</view>
		</view>

		<view class="selector-drawer" :class="{ 'visible': showSelector }" @click.stop>
			<view class="drawer-mask" @click="closeSelector"></view>
			<view class="drawer-content">
				<view class="drawer-header">
					<text class="drawer-title">
						{{ selectorType === 'font' ? '选择字体' : '选择背景样式' }}
					</text>
					<view class="drawer-close" @click="closeSelector">×</view>
				</view>
				
				<scroll-view scroll-y class="drawer-scroll">
					<view class="drawer-grid">
						<block v-if="selectorType === 'font'">
							<view 
								class="drawer-item font-item"
								v-for="(font, index) in currentFontList" 
								:key="index"
								:class="{ 'active': currentFontIndex === index }"
								@click="handleOptionSelect(index)"
							>
								<text class="font-name">{{ font.name }}</text>
								<text class="font-preview" :style="{ fontFamily: font.family || 'sans-serif' }">
									人生没有白走的路
								</text>
								<view class="check-mark" v-if="currentFontIndex === index">✓</view>
							</view>
						</block>

						<block v-if="selectorType === 'style'">
							<view 
								class="drawer-item style-item"
								v-for="(style, index) in currentCategoryStyles" 
								:key="index"
								:class="{ 'active': currentStyleIndex === index }"
								@click="handleOptionSelect(index)"
							>
								<image :src="style.path" mode="aspectFill" class="style-thumb"></image>
								<text class="style-name">{{ style.name || ('样式 ' + (index + 1)) }}</text>
								<view class="check-mark" v-if="currentStyleIndex === index">✓</view>
							</view>
						</block>
					</view>
				</scroll-view>
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
				selectedCategoryIndex: -1,
				tempImagePath: '',
				generatedImageUrl: '',
				isGenerating: false,
				isUploading: false,
				isTopic: false,
				
				highlightQueries: [], 
				
				backgroundCategories: backgroundCategories,
				fontLibrary: fontLibrary, 
				loadedFontFamilies: new Set(), 
				
				initialFontSize: 100, 
				currentFontSize: 18,
				minFontSize: 18,
				sliderDebounceTimer: null, 
				
				isFirstLoad: true,
				existingImages: [],

				// 编辑器状态
				showTextEditor: false,
				editingText: '',

				// 选择器状态
				showSelector: false,
				selectorType: 'font' // 'font' | 'style'
			}
		},
		
		computed: {
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
						return { name: 'Default' }; 
					}
					return fontData;
				});
			},
			
			currentFontIndex() {
				return this.currentStyle ? this.currentStyle.currentFontIndex : 0;
			},

			currentCategoryStyles() {
				if (this.selectedCategoryIndex === -1) return [];
				return this.backgroundCategories[this.selectedCategoryIndex].styles;
			},

			currentStyleIndex() {
				if (this.selectedCategoryIndex === -1) return 0;
				return this.backgroundCategories[this.selectedCategoryIndex].currentStyleIndex;
			},
			
			currentBackground() {
				if (!this.currentStyle) return null;
				
				const style = this.currentStyle;
				const fontIndex = style.currentFontIndex || 0;
				
				const fontKey = style.fonts[fontIndex];
				if (!fontKey) return null;
				
				const font = this.fontLibrary[fontKey]; 
				if (!font) return null;
				
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
		      const storedContentItems = uni.getStorageSync('topic_content_items');
		      if (storedContentItems && storedContentItems.length > 0) {
		        this.contentItems = storedContentItems;
		        this.contentText = this.convertContentItemsToText(storedContentItems);
		        uni.removeStorageSync('topic_content_items');
		      } else if (options.content) {
		        this.contentText = decodeURIComponent(options.content);
		        this.contentItems = [{ type: 'text', content: this.contentText }];
		      }
		    } catch (err) {
		      if (options.content) {
		        this.contentText = decodeURIComponent(options.content);
		        this.contentItems = [{ type: 'text', content: this.contentText }];
		      }
		    }
		    
		    if (options.images) {
		      try {
		        const images = JSON.parse(decodeURIComponent(options.images));
		        if (Array.isArray(images) && images.length > 0) this.existingImages = images;
		      } catch (error) {}
		    }
		    
		    if (options.isTopic) this.isTopic = options.isTopic === '1';
		    
		    this.backgroundCategories.forEach(category => {
		      this.$set(category, 'currentStyle', category.styles[category.currentStyleIndex]);
		      category.styles.forEach(style => {
		        if (style.currentFontIndex === undefined) {
		          this.$set(style, 'currentFontIndex', 0);
		        }
		      });
		    });
		    
		    this.$nextTick(() => {
		      this.selectCategory(0);
		    });
		},
		
		methods: {
			...mapMutations('m_user', ['updateUserBase']),

			// --- 选择器抽屉逻辑 ---
			openSelector(type) {
				this.selectorType = type;
				this.showSelector = true;

				// 🔥 核心修改：打开字体列表时，触发静默加载
				if (type === 'font') {
					this.preloadFontsForList();
				}
			},

			// 🔥 核心修改：批量加载列表中的字体
			preloadFontsForList() {
				if (!this.currentFontList || this.currentFontList.length === 0) return;

				this.currentFontList.forEach(font => {
					// 如果没有 URL 或者已经加载过，跳过
					if (!font.url || this.loadedFontFamilies.has(font.family)) {
						return;
					}
					
					uni.loadFontFace({
						family: font.family,
						source: `url("${font.url}")`,
						global: true,
						success: () => {
							this.loadedFontFamilies.add(font.family);
							// 强制刷新界面，确保列表中的字体能变过来
							this.$forceUpdate();
						},
						fail: (err) => {
							console.warn('列表字体加载失败:', font.name);
						}
					});
				});
			},

			closeSelector() {
				this.showSelector = false;
			},

			handleOptionSelect(index) {
				if (this.isGenerating) return;

				if (this.selectorType === 'font') {
					// 切换字体
					if (this.currentStyle.currentFontIndex === index) return;
					
					this.currentStyle.currentFontIndex = index;
					this.$forceUpdate();
					this.generateImage(null);
					
					const newFont = this.currentFontList[index];
					uni.showToast({ title: `已切换: ${newFont.name}`, icon: 'none' });
					
				} else if (this.selectorType === 'style') {
					// 切换背景样式
					const category = this.backgroundCategories[this.selectedCategoryIndex];
					if (category.currentStyleIndex === index) return;

					category.currentStyleIndex = index;
					this.$set(category, 'currentStyle', category.styles[index]);
					
					this.generateImage(null);
					uni.showToast({ title: '背景已切换', icon: 'none' });
				}
				
				this.showSelector = false;
			},
			// --------------------
			
			// --- 编辑器逻辑 ---
			openTextEditor() {
				this.editingText = this.contentText;
				this.showTextEditor = true;
			},

			closeTextEditor() {
				this.showTextEditor = false;
			},

			confirmTextEdit() {
				if (!this.editingText.trim()) {
					uni.showToast({ title: '内容不能为空', icon: 'none' });
					return;
				}
				this.contentText = this.editingText;
				this.contentItems = [{ type: 'text', content: this.contentText }];
				
				if (this.highlightQueries.length > 0) {
					const newQueries = this.highlightQueries.filter(q => this.contentText.includes(q));
					if (newQueries.length !== this.highlightQueries.length) {
						uni.showToast({ title: '部分高亮词已自动移除', icon: 'none' });
					}
					this.highlightQueries = newQueries;
				}

				this.showTextEditor = false;
				this.isFirstLoad = true; 
				this.generateImage(null);
			},
			// ----------------

			convertContentItemsToText(items) {
			  return items.map(item => (item.type === 'text' ? item.content : '　')).join('');
			},
			
			showHighlightPrompt() {
			    // 检查是否有 emoji 类型的内容项
			    const hasEmojiType = this.contentItems.some(item => item.type === 'emoji');
			    
			    // 🔥 修改：更精确的 Emoji 检测，排除普通数字和字母
			    const hasEmojiInText = this.contentItems.some(item => {
			        if (item.type === 'text') {
			            // 更严格的 Emoji 正则：排除 ASCII 字符（包括数字、字母、标点）
			            const strictEmojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F910}-\u{1F96B}\u{1F980}-\u{1F9E0}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{3030}\u{303D}\u{3297}\u{3299}]/gu;
			            return strictEmojiRegex.test(item.content);
			        }
			        return false;
			    });
			    
			    if (hasEmojiType || hasEmojiInText) {
			        uni.showModal({
			            title: '无法添加高亮',
			            content: '添加表情包后无法添加高亮，请在纯文字内容中使用高亮功能',
			            showCancel: false, 
			            confirmText: '我知道了', 
			            confirmColor: '#C00000'
			        });
			        return;
			    }
			    
			    const textWithoutEmojis = this.contentItems
			        .filter(i => i.type === 'text')
			        .map(i => i.content)
			        .join('');
			    
			    uni.showModal({
			        title: '添加高亮关键词',
			        editable: true,
			        placeholderText: '例如：重点',
			        success: (res) => {
			            if (res.confirm && res.content) {
			                const newQuery = res.content.trim();
			                if (!newQuery) return;
			                
			                if (!textWithoutEmojis.includes(newQuery)) {
			                    uni.showModal({ 
			                        title: '未找到关键词', 
			                        content: `内容中不包含"${newQuery}"`, 
			                        showCancel: false 
			                    });
			                    return;
			                }
			                
			                if (this.highlightQueries.includes(newQuery)) return;
			                
			                this.highlightQueries.push(newQuery);
			                this.generateImage(this.currentFontSize);
			            }
			        }
			    });
			},

			clearHighlight() {
				if (this.highlightQueries.length > 0) {
					uni.showModal({
						title: '确认清除', content: '要清除所有高亮关键词吗？',
						success: (res) => {
							if (res.confirm) {
								this.highlightQueries = [];
								this.generateImage(this.currentFontSize);
							}
						}
					});
				}
			},
			  					  
			handleSelectCategory(index) {
				if (this.isGenerating) return;
				this.selectCategory(index);
			},
			
			selectCategory(index) {
				this.selectedCategoryIndex = index;
				this.generateImage(null);
			},
			
			handleSliderChange(e) {
				const newSize = e.detail.value;
				this.currentFontSize = newSize; 
				if (this.sliderDebounceTimer) clearTimeout(this.sliderDebounceTimer);
				this.sliderDebounceTimer = setTimeout(() => {
					this.generateImage(newSize); 
				}, 50);
			},

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
							resolve(res[0].node.getContext('2d'));
						});
				 });
			},
			
			doesTextFit(ctx, text, fontSize, maxWidth, maxHeight, fontConfig) {
				const fontWeight = fontConfig.weight || 'normal';
				const fontFamily = fontConfig.family || 'sans-serif';
				ctx.font = `normal ${fontWeight} ${fontSize}px ${fontFamily}`;
				const lineHeight = fontSize * 1.4;
				const lines = this.wrapText(ctx, text, maxWidth, fontSize); 
				return (lines.length * lineHeight) <= maxHeight;
			},
			
			async calculateMaxFontSize(text, canvasWidth, canvasHeight, textBox, fontConfig) {
				const padding = 60;
				const maxWidth = textBox ? textBox.width : canvasWidth - padding * 2;
				const maxHeight = textBox ? textBox.height : canvasHeight * 0.7;
				const ctx = await this.getCanvasContext();
				
				let bestFit = this.minFontSize;
				let low = this.minFontSize, high = 300;
				
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
				return bestFit;
			},

			async loadCustomFont(fontConfig) {
			  if (!fontConfig || !fontConfig.url) return Promise.resolve();
			  const fontFamilyName = fontConfig.family;
			  if (this.loadedFontFamilies.has(fontFamilyName)) return Promise.resolve();
			  
			  uni.showLoading({ title: '加载字体...', mask: true });
			  try {
			    await new Promise((resolve) => {
			      uni.loadFontFace({
			        family: fontFamilyName,
			        source: `url("${fontConfig.url}")`,
			        success: () => { this.loadedFontFamilies.add(fontFamilyName); resolve(); },
			        fail: () => { this.loadedFontFamilies.add(fontFamilyName); resolve(); },
					complete: () => uni.hideLoading()
			      });
			    });
			  } catch (e) { uni.hideLoading(); }
			  return Promise.resolve();
			},

			async generateImage(newFontSize = null) {
				if (this.isGenerating && newFontSize) return; 
				this.isGenerating = true;
				
				try {
				  const canvasWidth = 750, canvasHeight = 1000;
				  if (!this.currentBackground) throw new Error('无法获取当前背景配置');
				  
				  await this.loadCustomFont(this.currentBackground.fontConfig);
				  
				  let fontSize;
				  if (newFontSize) {
					fontSize = newFontSize;
				  } else {
					const newMaxFontSize = await this.calculateMaxFontSize(
						this.contentText.trim(), canvasWidth, canvasHeight,
						this.currentBackground.textBox, this.currentBackground.fontConfig 
					);
					this.initialFontSize = newMaxFontSize;  
					fontSize = this.isFirstLoad ? newMaxFontSize : Math.min(this.currentFontSize, newMaxFontSize);
					this.isFirstLoad = false; 
					this.currentFontSize = fontSize;
				  }
				  
				    const tempFilePath = await this.drawTextOnBackground(
				      this.contentItems, this.currentBackground.path,
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
				  console.error(error);
				  uni.showToast({ title: '生成失败', icon: 'none' });
				} finally {
				  this.isGenerating = false;
				}
			},
			
			async drawTextOnBackground(contentItems, bgImagePath, styleConfig) {
			  return new Promise((resolve, reject) => {
			    const query = uni.createSelectorQuery().in(this);
			    query.select('#textCanvas').fields({ node: true, size: true }).exec(async (res) => {
			        if (!res || !res[0]) { reject(new Error('Canvas Error')); return; }
			        const canvas = res[0].node;
			        const ctx = canvas.getContext('2d');
			        const dpr = uni.getSystemInfoSync().pixelRatio;
			        canvas.width = 750 * dpr; canvas.height = 1000 * dpr;
			        ctx.scale(dpr, dpr);
			        
			        try {
			          await this.drawBackgroundImage(ctx, canvas, 750, 1000, bgImagePath);
			          
			          const { fontConfig, fontSize, textColor } = styleConfig;
			          const fontWeight = fontConfig.weight || 'normal';
			          ctx.fillStyle = textColor;
			          ctx.textBaseline = 'middle';
			          ctx.font = `${fontConfig.style || 'normal'} ${fontWeight} ${fontSize}px ${fontConfig.family || 'sans-serif'}`;
			          
			          if (styleConfig.enableShadow) {
			            ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 8; ctx.shadowOffsetX = 2; ctx.shadowOffsetY = 2;
			          }
			          
			          await this.drawMixedContent(ctx, canvas, contentItems, 750, 1000, styleConfig);
			          
			          uni.canvasToTempFilePath({
			              canvas: canvas,
			              success: (r) => resolve(r.tempFilePath),
			              fail: (err) => reject(err)
			          }, this);
			        } catch (error) { reject(error); }
			      });
			  });
			},
			
			async drawMixedContent(ctx, canvas, contentItems, canvasWidth, canvasHeight, styleConfig) {
				const box = styleConfig.textBox;
				const padding = 60;
				const maxWidth = box ? box.width : canvasWidth - padding * 2;
				const lineHeight = styleConfig.fontSize * 1.4;
				const emojiSize = styleConfig.fontSize * 1.1;
				
				const segments = await this.prepareDrawSegments(canvas, contentItems, maxWidth, styleConfig.fontSize, emojiSize, ctx);
				const totalHeight = segments.length * lineHeight;
				
				let startY;
				if (box) {
				    const vAlign = box.vAlign || 'middle';
				    if (vAlign === 'top') startY = box.y;
				    else if (vAlign === 'bottom') startY = box.y + box.height - totalHeight;
				    else startY = box.y + (box.height - totalHeight) / 2;
				} else {
				    startY = (canvasHeight - totalHeight) / 2;
				}

				const highlightQueries = styleConfig.highlightQueries;
				const hasHighlight = highlightQueries && highlightQueries.length > 0;
				const textWithoutEmojis = contentItems.filter(i => i.type === 'text').map(i => i.content).join('');
				const highlightRanges = [];
				if (hasHighlight) {
					highlightQueries.forEach(q => {
						if (!q) return;
						let idx = textWithoutEmojis.indexOf(q);
						while (idx !== -1) {
							highlightRanges.push({ start: idx, end: idx + q.length });
							idx = textWithoutEmojis.indexOf(q, idx + 1);
						}
					});
				}

				let textCharIndex = 0;
				segments.forEach((line, lineIndex) => {
					const y = startY + lineIndex * lineHeight + lineHeight / 2;
					let lineWidth = 0;
					line.forEach(item => lineWidth += (item.type === 'text' ? ctx.measureText(item.content).width : emojiSize));
					
					let x;
					if (box) {
						const hAlign = box.hAlign || 'center';
						if (hAlign === 'left') x = box.x;
						else if (hAlign === 'right') x = box.x + box.width - lineWidth;
						else x = box.x + (box.width - lineWidth) / 2;
					} else {
						x = (canvasWidth - lineWidth) / 2;
					}

					line.forEach(item => {
						if (item.type === 'text') {
							const text = item.content;
							if (hasHighlight) {
								for (let char of text) {
									const charWidth = ctx.measureText(char).width;
									const isHighlighted = highlightRanges.some(r => textCharIndex >= r.start && textCharIndex < r.end);
									if (isHighlighted) {
										ctx.save();
										ctx.shadowColor='transparent'; ctx.fillStyle = styleConfig.highlightColor || '#A6ECA6';
										const geo = styleConfig.highlightGeometry || { yOffset: -0.1, height: 0.6 };
										ctx.fillRect(x, y + styleConfig.fontSize * geo.yOffset, charWidth, styleConfig.fontSize * geo.height);
										ctx.restore();
									}
									ctx.fillText(char, x, y);
									x += charWidth;
									textCharIndex++;
								}
							} else {
								ctx.fillText(text, x, y);
								x += ctx.measureText(text).width;
								textCharIndex += text.length;
							}
						} else if (item.type === 'emoji' && item.image) {
							ctx.drawImage(item.image, x, y - emojiSize/2, emojiSize, emojiSize);
							x += emojiSize;
						}
					});
				});
			},
			
			async prepareDrawSegments(canvas, contentItems, maxWidth, fontSize, emojiSize, ctx) {
				const lines = []; let currentLine = []; let currentLineWidth = 0;
				for (let item of contentItems) {
					if (item.type === 'emoji' && item.url) {
						try { item.image = await this.loadImageToCanvas(canvas, item.url); } catch(e){ item.image = null; }
					}
				}
				for (let item of contentItems) {
					if (item.type === 'text') {
						for (let char of item.content) {
							const charWidth = ctx.measureText(char).width;
							if (currentLineWidth + charWidth > maxWidth && currentLine.length > 0) {
								lines.push(currentLine); currentLine = []; currentLineWidth = 0;
							}
							const last = currentLine[currentLine.length-1];
							if (last && last.type === 'text') last.content += char;
							else currentLine.push({ type: 'text', content: char });
							currentLineWidth += charWidth;
						}
					} else if (item.type === 'emoji') {
						if (currentLineWidth + emojiSize > maxWidth && currentLine.length > 0) {
							lines.push(currentLine); currentLine = []; currentLineWidth = 0;
						}
						currentLine.push({ type: 'emoji', image: item.image });
						currentLineWidth += emojiSize;
					}
				}
				if (currentLine.length > 0) lines.push(currentLine);
				return lines;
			},
			
			loadImageToCanvas(canvas, url) {
				return new Promise((res, rej) => {
					const img = canvas.createImage();
					img.onload = () => res(img); img.onerror = rej; img.src = url;
				});
			},
			
			wrapText(ctx, text, maxWidth, fontSize) {
				const lines = []; let line = '';
				for (let char of text) {
					if (char === '\n') { lines.push(line); line = ''; continue; }
					if (ctx.measureText(line + char).width > maxWidth && line !== '') { lines.push(line); line = char; }
					else line += char;
				}
				if (line !== '') lines.push(line);
				return lines;
			},
			
			drawBackgroundImage(ctx, canvas, width, height, path) {
				return new Promise((resolve, reject) => {
					const img = canvas.createImage();
					img.onload = () => { ctx.drawImage(img, 0, 0, width, height); resolve(); };
					img.onerror = reject;
					img.src = path;
				});
			},
			
			async uploadToOSS(filePath) {
				// 请替换为真实的上传逻辑
				return new Promise(resolve => resolve(filePath)); 
			},
			
			async confirmSelection() {
				if (!this.tempImagePath || this.isGenerating || this.isUploading) return;
				this.isUploading = true;
				try {
					const ossUrl = await this.uploadToOSS(this.tempImagePath);
					uni.navigateTo({
						url: '/subpkg/publish-post/publish-post',
						success: (res) => {
							res.eventChannel.emit('topicImageData', {
								imageUrl: ossUrl, images: [ossUrl, ...this.existingImages],
								content: this.contentText, isTopic: this.isTopic
							});
						}
					});
				} catch (e) { uni.showToast({ title: '上传失败', icon: 'none' }); } 
				finally { this.isUploading = false; }
			},
			
			goBack() { uni.navigateBack(); }
		}
	}
</script>

<style lang="scss" scoped>
// ... (原有基础样式) ...
.text-to-image-page { min-height: 100vh; background-color: #fff; display: flex; flex-direction: column; }
.image-preview-container { flex: 1; background: #f8f8f8; display: flex; align-items: center; justify-content: center; padding: 32rpx; }
.preview-image-wrapper { width: 686rpx; border-radius: 24rpx; box-shadow: 0 12rpx 48rpx rgba(0,0,0,0.15); overflow: hidden; }
.preview-image { width: 100%; display: block; }
.loading-container { display: flex; flex-direction: column; align-items: center; }
.loading-spinner { width: 60rpx; height: 60rpx; border: 4rpx solid rgba(192,0,0,0.1); border-top-color: #C00000; border-radius: 50%; animation: spin 1s linear infinite; }
.loading-text { margin-top: 24rpx; font-size: 26rpx; color: #999; }
.empty-preview { display: flex; flex-direction: column; align-items: center; gap: 16rpx; color: #999; }
.empty-icon { font-size: 120rpx; opacity: 0.3; }

.highlight-toolbar-container { padding: 20rpx; border-top: 1rpx solid #f0f0f0; display: flex; justify-content: center; }
.button-group { display: flex; gap: 16rpx; }
.highlight-action-btn { padding: 10rpx 24rpx; border-radius: 30rpx; font-size: 24rpx; }
.highlight-action-btn.add-more { background: #f5f5f5; border: 1rpx solid #e0e0e0; }
.highlight-action-btn.clear { background: #fef0f0; border: 1rpx solid #fde2e2; color: #C00000; }

.font-slider-container { 
	display: flex; align-items: center; padding: 10rpx 32rpx 20rpx; background: #fff; border-top: 1rpx solid #f0f0f0; gap: 16rpx; 
	.slider-label { font-size: 26rpx; color: #666; }
	.font-slider { flex: 1; margin: 0; }
	.font-change-button { 
		padding: 10rpx 24rpx; background: #f5f5f5; border: 1rpx solid #e0e0e0; border-radius: 30rpx; font-size: 24rpx; color: #333; 
		&.edit-btn { background: #fff0f0; border-color: #ffe0e0; color: #C00000; }
	}
}

.bg-selector-section {
	background: #fff; padding: 32rpx 0 24rpx; border-top: 1rpx solid #f0f0f0; z-index: 10;
	.selector-title { font-size: 28rpx; color: #333; padding: 0 32rpx; margin-bottom: 24rpx; display: block; }
	.bg-image-list { white-space: nowrap; padding: 0 32rpx; }
	.bg-image-item {
		display: inline-block; margin-right: 20rpx; position: relative;
		.bg-thumbnail { width: 160rpx; height: 200rpx; border-radius: 16rpx; border: 3rpx solid transparent; display: block; }
		.bg-name-wrapper { margin-top: 12rpx; text-align: center; .bg-name { font-size: 22rpx; color: #666; } }
		&.active .bg-thumbnail { border-color: #C00000; transform: scale(1.05); }
		&.active .bg-name { color: #C00000; font-weight: 600; }
		
		.selected-badge { 
			position: absolute; top: 12rpx; right: 12rpx; width: 40rpx; height: 40rpx; background: linear-gradient(135deg, #C00000, #ff6b6b); 
			border-radius: 50%; color: #fff; font-size: 24rpx; display: flex; align-items: center; justify-content: center; 
		}
		
		.change-style-btn {
			position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
			width: 72rpx; height: 72rpx; background: rgba(0,0,0,0.7); backdrop-filter: blur(10rpx);
			border-radius: 50%; display: flex; align-items: center; justify-content: center;
			border: 2rpx solid rgba(255,255,255,0.3);
			.change-icon { font-size: 36rpx; color: #fff; font-weight: bold; padding-bottom: 10rpx; } 
		}
	}
}

.bottom-actions {
	display: flex; gap: 16rpx; padding: 24rpx 32rpx 48rpx; background: #fff; border-top: 1rpx solid #f0f0f0;
	.action-btn { 
		flex: 1; height: 88rpx; border-radius: 44rpx; display: flex; align-items: center; justify-content: center; font-size: 32rpx; font-weight: 500;
		&.cancel { background: #f5f5ff; color: #666; }
		&.drawing-toggle { background: linear-gradient(135deg, #FFD700, #FFA500); color: #fff; }
		&.confirm { background: linear-gradient(135deg, #C00000, #ff6b6b); color: #fff; &.disabled { opacity: 0.5; background: #ccc; } }
	}
}

// 文本编辑弹窗样式
.text-editor-modal {
	position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 999; display: flex; align-items: center; justify-content: center;
	.modal-mask { position: absolute; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); }
	.modal-content {
		position: relative; width: 640rpx; background: #fff; border-radius: 24rpx; overflow: hidden; animation: popIn 0.3s;
		.modal-header { padding: 32rpx; display: flex; justify-content: space-between; border-bottom: 1rpx solid #f5f5f5; font-weight: bold; }
		.close-btn { font-size: 40rpx; color: #999; padding: 0 10rpx; }
		.textarea-wrapper { padding: 32rpx; background: #f9f9f9; position: relative; }
		.editor-textarea { width: 100%; height: 300rpx; font-size: 30rpx; line-height: 1.6; }
		.char-count { position: absolute; bottom: 16rpx; right: 32rpx; font-size: 24rpx; color: #ccc; }
		.modal-footer { display: flex; border-top: 1rpx solid #eee; .modal-btn { flex: 1; height: 100rpx; display: flex; align-items: center; justify-content: center; } .cancel { color: #666; border-right: 1rpx solid #eee; } .confirm { color: #C00000; font-weight: 600; } }
	}
}

// 底部选择器样式
.selector-drawer {
	position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; visibility: hidden; transition: visibility 0.3s;
	&.visible { visibility: visible; .drawer-mask { opacity: 1; } .drawer-content { transform: translateY(0); } }
	.drawer-mask { position: absolute; width: 100%; height: 100%; background: rgba(0,0,0,0.5); opacity: 0; transition: opacity 0.3s; }
	.drawer-content {
		position: absolute; bottom: 0; left: 0; width: 100%; height: 60vh; background: #fff; border-radius: 24rpx 24rpx 0 0;
		display: flex; flex-direction: column; transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.19,1,0.22,1);
		padding-bottom: env(safe-area-inset-bottom);
		
		.drawer-header { padding: 32rpx; display: flex; justify-content: space-between; align-items: center; border-bottom: 1rpx solid #f0f0f0; 
			.drawer-title { font-size: 32rpx; font-weight: 600; } .drawer-close { font-size: 48rpx; color: #999; line-height: 1; padding: 0 16rpx; }
		}
		.drawer-scroll { flex: 1; height: 0; }
		.drawer-grid { padding: 24rpx; display: grid; gap: 24rpx; }
		
		.font-item {
			display: flex; flex-direction: column; padding: 24rpx; background: #f9f9f9; border-radius: 16rpx; border: 2rpx solid transparent; position: relative;
			&.active { border-color: #C00000; background: #fff5f5; .font-name { color: #C00000; } }
			.font-name { font-size: 24rpx; font-weight: bold; color: #999; margin-bottom: 12rpx; }
			.font-preview { font-size: 40rpx; color: #333; }
			.check-mark { position: absolute; top: 24rpx; right: 24rpx; color: #C00000; font-weight: bold; }
		}
		
		.style-item {
			display: flex; align-items: center; padding: 16rpx; background: #fff; border-radius: 16rpx; position: relative; border-bottom: 1rpx solid #f5f5f5;
			&.active { background: #fff5f5; .style-name { color: #C00000; font-weight: bold; } }
			.style-thumb { width: 100rpx; height: 100rpx; border-radius: 12rpx; margin-right: 24rpx; background: #eee; }
			.style-name { font-size: 28rpx; color: #333; flex: 1; }
			.check-mark { color: #C00000; font-weight: bold; margin-right: 16rpx; }
		}
	}
}

@keyframes popIn { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>