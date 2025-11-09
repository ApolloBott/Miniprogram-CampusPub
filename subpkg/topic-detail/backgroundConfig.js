// backgroundConfig.js

/**
 * 🎨 1. 新增: 字体库 (Font Library)
 * ---------------------------------
 * 在这里统一定义所有字体。
 * 我们在下面的 backgroundCategories 中将通过 "键" (例如 'siyuan', 'shoujinti') 来引用它们。
 */
export const fontLibrary = {
	// 🔥 新增：楷体定义
		'kaiti': {
			name: '楷体',
			family: 'KaiTi, STKaiti, serif', // 系统字体
			weight: 'normal',
			style: 'normal',
			// url: null, // 不需要加载，使用系统字体
			textColor: '#2C3E50',
			highlightColor: '#FFD7BE',
			highlightGeometry: { yOffset: -0.1, height: 0.6 }
		},
		
	'siyuan': {
		name: '思源黑体',
		family: 'SourceHanSansCN-Bold', 
		weight: 'bold',                
		style: 'normal',
		url: 'https://img.xinshi00.com/fonts/SourceHanSansCN-Bold.otf',
		textColor: '#333333',
		highlightColor: '#A6ECA6',
		highlightGeometry: { yOffset: -0.1, height: 0.6 } // (标准字体高亮)
	},
	
	'shoujinti': {
		name: '瘦金体',
		family: 'YeZiGongChangJiangYueLingXingKai',
		weight: 'bold', 
		style: 'normal',
		url: 'https://img.xinshi00.com/fonts/YeZiGongChangJiangYueLingXingKai-2.ttf',
		textColor: '#333333',
		highlightColor: '#A6ECA6',
		highlightGeometry: { yOffset: -0.2, height: 0.5 }
	},
	
	'pingfang': {
		name: '苹方',
		family: 'PingFang SC', 
		weight: '500', 
		style: 'normal',
		// (无 url, 使用系统字体)
		textColor: '#2c3e50',
		highlightColor: '#A6ECA6',
		highlightGeometry: { yOffset: -0.1, height: 0.6 } 
	},
	
	'kaishu': {
		name: '硬笔楷书',
		family: 'ZhengXinGeYingBiKaiShuJian', 
		weight: 'bold',                
		style: 'normal',
		url: 'https://img.xinshi00.com/fonts/ZhengXinGeYingBiKaiShuJian-2.ttf',
		textColor: '#333333',
		highlightColor: '#A6ECA6',
		highlightGeometry: { yOffset: -0.2, height: 0.5 } // (艺术字体高亮)
	},
	
	'sansheng': {
		name: '三生体',
		family: 'PingFangsanshengti', 
		weight: 'bold',                
		style: 'normal',
		url: 'https://img.xinshi00.com/fonts/pingfangsanshengti.ttf',
		textColor: '#333333',
		highlightColor: '#A6ECA6',
		highlightGeometry: { yOffset: -0.2, height: 0.5 }
	},
	
	'liukaiti': {
		name: '方正苏新诗柳楷体',
		family: 'LiuKaiti', 
		weight: 'bold',                
		style: 'normal',
		url: 'https://img.xinshi00.com/fonts/FangZhengSuXinShiLiuKaiJianTi-1.ttf',
		textColor: '#333333',
		highlightColor: '#A6ECA6',
		highlightGeometry: { yOffset: -0.2, height: 0.5 }
	},
	
	'yingbishoujinti': {
		name: '华光硬笔简瘦金体',
		family: 'YingBiShouJinTi', 
		weight: 'bold',                
		style: 'normal',
		url: 'https://img.xinshi00.com/fonts/HuaGuangYingBiJianShouJinTi-2.ttf',
		textColor: '#333333',
		highlightColor: '#A6ECA6',
		highlightGeometry: { yOffset: -0.2, height: 0.5 }
	},
	
	'mashan': {
		name: '谷歌字体',
		family: 'MaShanZheng', 
		weight: 'bold',                
		style: 'normal',
		url: 'https://img.xinshi00.com/fonts/MaShanZheng-Regular.ttf',
		textColor: '#333333',
		highlightColor: '#A6ECA6',
		highlightGeometry: { yOffset: -0.1, height: 0.6 } // (标准字体高亮)
	}
};


/**
 * 🎨 2. 修改: 背景分类 (Background Categories)
 * ---------------------------------
 * `styles.fonts` 数组现在只包含 fontLibrary 中的 "键" (字符串)。
 */
export const backgroundCategories = [
  // 1. 备忘录 (Light)
    {
		name: '备忘录',
		currentStyleIndex: 0,
		styles: [
			{ 
				path: 'https://img.xinshi00.com/bg-pictures/memo/memo1.png', 
				name: '备忘录1',
				textBox: { 
					x: 60, y: 100, width: 650, height: 800,
					hAlign: 'center', vAlign: 'middle'
		        },
				currentFontIndex: 0,
				fonts: ['yingbishoujinti', 'siyuan', 'liukaiti', 'sansheng', 'kaiti'] 
			},
			{ 
				path: 'https://img.xinshi00.com/bg-pictures/memo/memo2.png', 
				name: '备忘录2',
				textBox: { 
					x: 60, y: 100, width: 650, height: 680,
					hAlign: 'center', vAlign: 'middle' 
				},
				currentFontIndex: 0,
				fonts: ['shoujinti', 'sansheng', 'kaiti', 'siyuan', 'liukaiti'] 
	  		},
      		{ 
				path: 'https://img.xinshi00.com/%E5%A4%87%E5%BF%98%E5%BD%95/%E5%A4%87%E5%BF%98%E5%BD%951.png', 
				name: '备忘录3',
				textBox: {
					x: 60, y: 100, width: 650, height: 680,
					hAlign: 'center', vAlign: 'middle' 
				},
				currentFontIndex: 0,
				fonts: ['kaiti', 'siyuan', 'liukaiti','shoujinti', 'sansheng' ]  
      		},
    	]
  	},

	//2. Plain Paper
	{
		name: '白纸',
		currentStyleIndex: 0,
		styles: [
			{ 
				path: 'https://img.xinshi00.com/bg-pictures/plainpaper/plain1.png', 
				name: '清新1',
				textBox: { 
					x: 60, y: 100, width: 650, height: 600,
					hAlign: 'center', vAlign: 'middle'
				},
				currentFontIndex: 0,
				fonts: ['kaishu', 'yingbishoujinti', 'sansheng', 'liukaiti' ] 
			},  
			{ 
		        path: 'https://img.xinshi00.com/bg-pictures/plainpaper/plain2.png', 
		        name: '清新2',
				textBox: { 
		            x: 60, y: 100, width: 650, height: 600,
		            hAlign: 'center', vAlign: 'middle' 
		        },
				currentFontIndex: 0,
				fonts: ['kaishu', 'yingbishoujinti', 'sansheng', 'liukaiti' ] 
		    },
		]
	},
	
	//3. Campus views
	{
		name: '校园',
		currentStyleIndex: 0,
		styles: [
			{ 
				path: 'https://img.xinshi00.com/bg-pictures/campusviews/campus1.jpg', 
				name: '校园1',
				textBox: { 
					x: 60, y: 20, width: 650, height: 700,
					hAlign: 'center', vAlign: 'middle'
				},
				currentFontIndex: 0,
				fonts: ['sansheng','yingbishoujinti', 'liukaiti'] // 🎨 引用 'sansheng'
			},
			{ 
		        path: 'https://img.xinshi00.com/bg-pictures/campusviews/campus2.jpg', 
		        name: '校园2',
				textBox: { 
		            x: 60, y: 20, width: 650, height: 700,
		            hAlign: 'center', vAlign: 'middle' 
		        },
				currentFontIndex: 0,
				fonts: ['sansheng','yingbishoujinti', 'liukaiti']
		    },
			{
			    path: 'https://img.xinshi00.com/bg-pictures/campusviews/campus3.jpg', 
			    name: '校园3',
				textBox: { 
			        x: 60, y: 20, width: 650, height: 700,
			        hAlign: 'center', vAlign: 'middle' 
			    },
				currentFontIndex: 0,
				fonts: ['sansheng','yingbishoujinti', 'liukaiti']
			},
			{
			    path: 'https://img.xinshi00.com/bg-pictures/campusviews/campus4.jpg', 
			    name: '校园4',
				textBox: { 
			        x: 60, y: 20, width: 650, height: 700,
			        hAlign: 'center', vAlign: 'middle' 
			    },
				currentFontIndex: 0,
				fonts: ['sansheng','yingbishoujinti', 'liukaiti']
			},
			{
			    path: 'https://img.xinshi00.com/bg-pictures/campusviews/campus5.jpg', 
			    name: '校园5',
				textBox: { 
			        x: 30, y: 10, width: 660, height: 680,
			        hAlign: 'center', vAlign: 'middle' 
			    },
				currentFontIndex: 0,
				fonts: ['sansheng','yingbishoujinti', 'liukaiti']
			},
			{
			    path: 'https://img.xinshi00.com/bg-pictures/campusviews/campus6.jpg', 
			    name: '校园6',
				textBox: { 
			        x: 30, y: 10, width: 660, height: 680,
			        hAlign: 'center', vAlign: 'middle' 
			    },
				currentFontIndex: 0,
				fonts: ['sansheng','yingbishoujinti', 'liukaiti']
			},
		]
	},
	/*
	//4. emoji
	{
		name: '情绪',
		currentStyleIndex: 0,
		styles: [
			{
			    path: 'https://img.xinshi00.com/bg-pictures/emoji/inquiring.jpg', 
			    name: '疑惑', 
				textBox: { 
			        x: 60, y: 40, width: 650, height: 650,
			        hAlign: 'center', vAlign: 'middle' 
			    },
				currentFontIndex: 0,
				fonts: ['yingbishoujinti','kaishu', 'sansheng', 'liukaiti']
			},
			{ 
				path: 'https://img.xinshi00.com/bg-pictures/emoji/angry.jpg', 
				name: '愤怒',
				textBox: { 
					x: 60, y: 20, width: 650, height: 650,
					hAlign: 'center', vAlign: 'middle'
				},
				currentFontIndex: 0,
				fonts: ['yingbishoujinti','kaishu', 'sansheng', 'liukaiti']
			},  
			{ 
		        path: 'https://img.xinshi00.com/bg-pictures/emoji/sad.jpg', 
		        name: '难过', 
				textBox: { 
		            x: 60, y: 20, width: 650, height: 650,
		            hAlign: 'center', vAlign: 'middle' 
		        },
				currentFontIndex: 0,
				fonts: ['yingbishoujinti','kaishu', 'sansheng', 'liukaiti']
		    },
			{
			    path: 'https://img.xinshi00.com/bg-pictures/emoji/comfortable.jpg', 
			    name: '懒洋洋', 
				textBox: { 
			        x: 60, y: 20, width: 650, height: 650,
			        hAlign: 'center', vAlign: 'middle' 
			    },
				currentFontIndex: 0,
				fonts: ['yingbishoujinti','kaishu', 'sansheng', 'liukaiti']
			},
			{
			    path: 'https://img.xinshi00.com/bg-pictures/emoji/happy.jpg', 
			    name: '开心', 
				textBox: { 
			        x: 60, y: 20, width: 650, height: 650,
			        hAlign: 'center', vAlign: 'middle' 
			    },
				currentFontIndex: 0,
				fonts: ['yingbishoujinti','kaishu', 'sansheng', 'liukaiti']
			},
			{
			    path: 'https://img.xinshi00.com/bg-pictures/emoji/cry.jpg', 
			    name: '哭', 
				textBox: { 
			        x: 60, y: 20, width: 650, height: 650,
			        hAlign: 'center', vAlign: 'middle' 
			    },
				currentFontIndex: 0,
				fonts: ['yingbishoujinti','kaishu', 'sansheng', 'liukaiti']
			},
		]
	},
	*/
   //4. emoji:inquiring
	{
		name: '疑惑',
		currentStyleIndex: 0,
		styles: [
			{
				path: 'https://img.xinshi00.com/bg-pictures/emoji/inquiring.jpg', 
				name: '疑惑1', 
				textBox: { 
					x: 60, y: 40, width: 650, height: 650,
					hAlign: 'center', vAlign: 'middle' 
				},
				currentFontIndex: 0,
				fonts: ['yingbishoujinti','kaishu', 'sansheng', 'liukaiti']
			},
			{ 
				path: 'https://img.xinshi00.com/bg-pictures/emoji/inquiring2.jpg', 
				name: '疑惑2',
				textBox: { 
					x: 60, y: 20, width: 650, height: 650,
					hAlign: 'center', vAlign: 'middle'
				},
				currentFontIndex: 0,
				fonts: ['yingbishoujinti','kaishu', 'sansheng', 'liukaiti']
			}, 
		],
	},
	
	//5. emoji: angry
	{
		name: '生气',
		currentStyleIndex: 0,
		styles: [
			{
				path: 'https://img.xinshi00.com/bg-pictures/emoji/angry.jpg', 
				name: '生气1', 
				textBox: { 
					x: 60, y: 40, width: 650, height: 650,
					hAlign: 'center', vAlign: 'middle' 
				},
				currentFontIndex: 0,
				fonts: ['yingbishoujinti','kaishu', 'sansheng', 'liukaiti']
			},
			{ 
				path: 'https://img.xinshi00.com/bg-pictures/emoji/angry2.jpg', 
				name: '生气2',
				textBox: { 
					x: 60, y: 20, width: 650, height: 650,
					hAlign: 'center', vAlign: 'middle'
				},
				currentFontIndex: 0,
				fonts: [ 'sansheng', 'yingbishoujinti','kaishu', 'liukaiti']
			}, 
		],
	},
];