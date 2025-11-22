(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg/text-to-image/text-to-image"],{

/***/ 255:
/*!*************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/main.js?{"page":"subpkg%2Ftext-to-image%2Ftext-to-image"} ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _textToImage = _interopRequireDefault(__webpack_require__(/*! ./subpkg/text-to-image/text-to-image.vue */ 256));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_textToImage.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 256:
/*!******************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/text-to-image/text-to-image.vue ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-to-image.vue?vue&type=template&id=3f3b62ce&scoped=true& */ 257);
/* harmony import */ var _text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text-to-image.vue?vue&type=script&lang=js& */ 259);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text-to-image.vue?vue&type=style&index=0&id=3f3b62ce&lang=scss&scoped=true& */ 262);
/* harmony import */ var _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3f3b62ce",
  null,
  false,
  _text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg/text-to-image/text-to-image.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 257:
/*!*************************************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/text-to-image/text-to-image.vue?vue&type=template&id=3f3b62ce&scoped=true& ***!
  \*************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./text-to-image.vue?vue&type=template&id=3f3b62ce&scoped=true& */ 258);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 258:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/text-to-image/text-to-image.vue?vue&type=template&id=3f3b62ce&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 =
    _vm.tempImagePath && !_vm.isGenerating && _vm.highlightQueries.length > 0
  var g1 =
    _vm.tempImagePath && !_vm.isGenerating ? _vm.currentFontList.length : null
  var l0 = _vm.__map(_vm.backgroundCategories, function (bg, index) {
    var $orig = _vm.__get_orig(bg)
    var g2 = _vm.selectedCategoryIndex === index && bg.styles.length > 1
    return {
      $orig: $orig,
      g2: g2,
    }
  })
  var g3 =
    _vm.tempImagePath && !_vm.isGenerating ? _vm.highlightQueries.length : null
  var g4 = _vm.showTextEditor ? _vm.editingText.length : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        l0: l0,
        g3: g3,
        g4: g4,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 259:
/*!*******************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/text-to-image/text-to-image.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./text-to-image.vue?vue&type=script&lang=js& */ 260);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 260:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/text-to-image/text-to-image.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _vuex = __webpack_require__(/*! vuex */ 33);
var _backgroundConfig = __webpack_require__(/*! ./backgroundConfig.js */ 261);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
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
      backgroundCategories: _backgroundConfig.backgroundCategories,
      fontLibrary: _backgroundConfig.fontLibrary,
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
    };
  },

  computed: _objectSpread(_objectSpread({}, (0, _vuex.mapState)('m_user', ['openid', 'userBase'])), {}, {
    currentStyle: function currentStyle() {
      if (this.selectedCategoryIndex === -1) return null;
      var category = this.backgroundCategories[this.selectedCategoryIndex];
      return category.styles[category.currentStyleIndex];
    },
    currentFontList: function currentFontList() {
      var _this = this;
      if (!this.currentStyle || !this.currentStyle.fonts) {
        return [];
      }
      return this.currentStyle.fonts.map(function (fontKey) {
        var fontData = _this.fontLibrary[fontKey];
        if (!fontData) {
          return {
            name: 'Default'
          };
        }
        return fontData;
      });
    },
    currentFontIndex: function currentFontIndex() {
      return this.currentStyle ? this.currentStyle.currentFontIndex : 0;
    },
    currentCategoryStyles: function currentCategoryStyles() {
      if (this.selectedCategoryIndex === -1) return [];
      return this.backgroundCategories[this.selectedCategoryIndex].styles;
    },
    currentStyleIndex: function currentStyleIndex() {
      if (this.selectedCategoryIndex === -1) return 0;
      return this.backgroundCategories[this.selectedCategoryIndex].currentStyleIndex;
    },
    currentBackground: function currentBackground() {
      if (!this.currentStyle) return null;
      var style = this.currentStyle;
      var fontIndex = style.currentFontIndex || 0;
      var fontKey = style.fonts[fontIndex];
      if (!fontKey) return null;
      var font = this.fontLibrary[fontKey];
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
  }),
  onLoad: function onLoad(options) {
    var _this2 = this;
    try {
      var storedContentItems = uni.getStorageSync('topic_content_items');
      if (storedContentItems && storedContentItems.length > 0) {
        this.contentItems = storedContentItems;
        this.contentText = this.convertContentItemsToText(storedContentItems);
        uni.removeStorageSync('topic_content_items');
      } else if (options.content) {
        this.contentText = decodeURIComponent(options.content);
        this.contentItems = [{
          type: 'text',
          content: this.contentText
        }];
      }
    } catch (err) {
      if (options.content) {
        this.contentText = decodeURIComponent(options.content);
        this.contentItems = [{
          type: 'text',
          content: this.contentText
        }];
      }
    }
    if (options.images) {
      try {
        var images = JSON.parse(decodeURIComponent(options.images));
        if (Array.isArray(images) && images.length > 0) this.existingImages = images;
      } catch (error) {}
    }
    if (options.isTopic) this.isTopic = options.isTopic === '1';
    this.backgroundCategories.forEach(function (category) {
      _this2.$set(category, 'currentStyle', category.styles[category.currentStyleIndex]);
      category.styles.forEach(function (style) {
        if (style.currentFontIndex === undefined) {
          _this2.$set(style, 'currentFontIndex', 0);
        }
      });
    });
    this.$nextTick(function () {
      _this2.selectCategory(0);
    });
  },
  methods: _objectSpread(_objectSpread({}, (0, _vuex.mapMutations)('m_user', ['updateUserBase'])), {}, {
    // --- 选择器抽屉逻辑 ---
    openSelector: function openSelector(type) {
      this.selectorType = type;
      this.showSelector = true;

      // 🔥 核心修改：打开字体列表时，触发静默加载
      if (type === 'font') {
        this.preloadFontsForList();
      }
    },
    // 🔥 核心修改：批量加载列表中的字体
    preloadFontsForList: function preloadFontsForList() {
      var _this3 = this;
      if (!this.currentFontList || this.currentFontList.length === 0) return;
      this.currentFontList.forEach(function (font) {
        // 如果没有 URL 或者已经加载过，跳过
        if (!font.url || _this3.loadedFontFamilies.has(font.family)) {
          return;
        }
        uni.loadFontFace({
          family: font.family,
          source: "url(\"".concat(font.url, "\")"),
          global: true,
          success: function success() {
            _this3.loadedFontFamilies.add(font.family);
            // 强制刷新界面，确保列表中的字体能变过来
            _this3.$forceUpdate();
          },
          fail: function fail(err) {
            console.warn('列表字体加载失败:', font.name);
          }
        });
      });
    },
    closeSelector: function closeSelector() {
      this.showSelector = false;
    },
    handleOptionSelect: function handleOptionSelect(index) {
      if (this.isGenerating) return;
      if (this.selectorType === 'font') {
        // 切换字体
        if (this.currentStyle.currentFontIndex === index) return;
        this.currentStyle.currentFontIndex = index;
        this.$forceUpdate();
        this.generateImage(null);
        var newFont = this.currentFontList[index];
        uni.showToast({
          title: "\u5DF2\u5207\u6362: ".concat(newFont.name),
          icon: 'none'
        });
      } else if (this.selectorType === 'style') {
        // 切换背景样式
        var category = this.backgroundCategories[this.selectedCategoryIndex];
        if (category.currentStyleIndex === index) return;
        category.currentStyleIndex = index;
        this.$set(category, 'currentStyle', category.styles[index]);
        this.generateImage(null);
        uni.showToast({
          title: '背景已切换',
          icon: 'none'
        });
      }
      this.showSelector = false;
    },
    // --------------------
    // --- 编辑器逻辑 ---
    openTextEditor: function openTextEditor() {
      this.editingText = this.contentText;
      this.showTextEditor = true;
    },
    closeTextEditor: function closeTextEditor() {
      this.showTextEditor = false;
    },
    confirmTextEdit: function confirmTextEdit() {
      var _this4 = this;
      if (!this.editingText.trim()) {
        uni.showToast({
          title: '内容不能为空',
          icon: 'none'
        });
        return;
      }
      this.contentText = this.editingText;
      this.contentItems = [{
        type: 'text',
        content: this.contentText
      }];
      if (this.highlightQueries.length > 0) {
        var newQueries = this.highlightQueries.filter(function (q) {
          return _this4.contentText.includes(q);
        });
        if (newQueries.length !== this.highlightQueries.length) {
          uni.showToast({
            title: '部分高亮词已自动移除',
            icon: 'none'
          });
        }
        this.highlightQueries = newQueries;
      }
      this.showTextEditor = false;
      this.isFirstLoad = true;
      this.generateImage(null);
    },
    // ----------------
    convertContentItemsToText: function convertContentItemsToText(items) {
      return items.map(function (item) {
        return item.type === 'text' ? item.content : '　';
      }).join('');
    },
    showHighlightPrompt: function showHighlightPrompt() {
      var _this5 = this;
      // 检查是否有 emoji 类型的内容项
      var hasEmojiType = this.contentItems.some(function (item) {
        return item.type === 'emoji';
      });

      // 🔥 修改：更精确的 Emoji 检测，排除普通数字和字母
      var hasEmojiInText = this.contentItems.some(function (item) {
        if (item.type === 'text') {
          // 更严格的 Emoji 正则：排除 ASCII 字符（包括数字、字母、标点）
          var strictEmojiRegex = /(?:[\u200D\u20E3\u2600-\u27BF\u3030\u303D\u3297\u3299\uFE00-\uFE0F]|\uD83C[\uDC00-\uDC2F\uDCA0-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDC00-\uDDFF])/g;
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
      var textWithoutEmojis = this.contentItems.filter(function (i) {
        return i.type === 'text';
      }).map(function (i) {
        return i.content;
      }).join('');
      uni.showModal({
        title: '添加高亮关键词',
        editable: true,
        placeholderText: '例如：重点',
        success: function success(res) {
          if (res.confirm && res.content) {
            var newQuery = res.content.trim();
            if (!newQuery) return;
            if (!textWithoutEmojis.includes(newQuery)) {
              uni.showModal({
                title: '未找到关键词',
                content: "\u5185\u5BB9\u4E2D\u4E0D\u5305\u542B\"".concat(newQuery, "\""),
                showCancel: false
              });
              return;
            }
            if (_this5.highlightQueries.includes(newQuery)) return;
            _this5.highlightQueries.push(newQuery);
            _this5.generateImage(_this5.currentFontSize);
          }
        }
      });
    },
    clearHighlight: function clearHighlight() {
      var _this6 = this;
      if (this.highlightQueries.length > 0) {
        uni.showModal({
          title: '确认清除',
          content: '要清除所有高亮关键词吗？',
          success: function success(res) {
            if (res.confirm) {
              _this6.highlightQueries = [];
              _this6.generateImage(_this6.currentFontSize);
            }
          }
        });
      }
    },
    handleSelectCategory: function handleSelectCategory(index) {
      if (this.isGenerating) return;
      this.selectCategory(index);
    },
    selectCategory: function selectCategory(index) {
      this.selectedCategoryIndex = index;
      this.generateImage(null);
    },
    handleSliderChange: function handleSliderChange(e) {
      var _this7 = this;
      var newSize = e.detail.value;
      this.currentFontSize = newSize;
      if (this.sliderDebounceTimer) clearTimeout(this.sliderDebounceTimer);
      this.sliderDebounceTimer = setTimeout(function () {
        _this7.generateImage(newSize);
      }, 50);
    },
    getCanvasContext: function getCanvasContext() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var query = uni.createSelectorQuery().in(_this8);
                  query.select('#textCanvas').fields({
                    node: true,
                    size: true
                  }).exec(function (res) {
                    if (!res || !res[0] || !res[0].node) {
                      reject(new Error('获取 Canvas 失败'));
                      return;
                    }
                    resolve(res[0].node.getContext('2d'));
                  });
                }));
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    doesTextFit: function doesTextFit(ctx, text, fontSize, maxWidth, maxHeight, fontConfig) {
      var fontWeight = fontConfig.weight || 'normal';
      var fontFamily = fontConfig.family || 'sans-serif';
      ctx.font = "normal ".concat(fontWeight, " ").concat(fontSize, "px ").concat(fontFamily);
      var lineHeight = fontSize * 1.4;
      var lines = this.wrapText(ctx, text, maxWidth, fontSize);
      return lines.length * lineHeight <= maxHeight;
    },
    calculateMaxFontSize: function calculateMaxFontSize(text, canvasWidth, canvasHeight, textBox, fontConfig) {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var padding, maxWidth, maxHeight, ctx, bestFit, low, high, i, mid;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                padding = 60;
                maxWidth = textBox ? textBox.width : canvasWidth - padding * 2;
                maxHeight = textBox ? textBox.height : canvasHeight * 0.7;
                _context2.next = 5;
                return _this9.getCanvasContext();
              case 5:
                ctx = _context2.sent;
                bestFit = _this9.minFontSize;
                low = _this9.minFontSize, high = 300;
                i = 0;
              case 9:
                if (!(i < 10)) {
                  _context2.next = 19;
                  break;
                }
                if (!(low > high)) {
                  _context2.next = 12;
                  break;
                }
                return _context2.abrupt("break", 19);
              case 12:
                mid = Math.floor((low + high) / 2);
                if (!(mid === 0)) {
                  _context2.next = 15;
                  break;
                }
                return _context2.abrupt("return", bestFit);
              case 15:
                if (_this9.doesTextFit(ctx, text, mid, maxWidth, maxHeight, fontConfig)) {
                  bestFit = mid;
                  low = mid + 1;
                } else {
                  high = mid - 1;
                }
              case 16:
                i++;
                _context2.next = 9;
                break;
              case 19:
                return _context2.abrupt("return", bestFit);
              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    loadCustomFont: function loadCustomFont(fontConfig) {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var fontFamilyName;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!fontConfig || !fontConfig.url)) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return", Promise.resolve());
              case 2:
                fontFamilyName = fontConfig.family;
                if (!_this10.loadedFontFamilies.has(fontFamilyName)) {
                  _context3.next = 5;
                  break;
                }
                return _context3.abrupt("return", Promise.resolve());
              case 5:
                uni.showLoading({
                  title: '加载字体...',
                  mask: true
                });
                _context3.prev = 6;
                _context3.next = 9;
                return new Promise(function (resolve) {
                  uni.loadFontFace({
                    family: fontFamilyName,
                    source: "url(\"".concat(fontConfig.url, "\")"),
                    success: function success() {
                      _this10.loadedFontFamilies.add(fontFamilyName);
                      resolve();
                    },
                    fail: function fail() {
                      _this10.loadedFontFamilies.add(fontFamilyName);
                      resolve();
                    },
                    complete: function complete() {
                      return uni.hideLoading();
                    }
                  });
                });
              case 9:
                _context3.next = 14;
                break;
              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](6);
                uni.hideLoading();
              case 14:
                return _context3.abrupt("return", Promise.resolve());
              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[6, 11]]);
      }))();
    },
    generateImage: function generateImage() {
      var _arguments = arguments,
        _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var newFontSize, canvasWidth, canvasHeight, fontSize, newMaxFontSize, tempFilePath;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                newFontSize = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : null;
                if (!(_this11.isGenerating && newFontSize)) {
                  _context4.next = 3;
                  break;
                }
                return _context4.abrupt("return");
              case 3:
                _this11.isGenerating = true;
                _context4.prev = 4;
                canvasWidth = 750, canvasHeight = 1000;
                if (_this11.currentBackground) {
                  _context4.next = 8;
                  break;
                }
                throw new Error('无法获取当前背景配置');
              case 8:
                _context4.next = 10;
                return _this11.loadCustomFont(_this11.currentBackground.fontConfig);
              case 10:
                if (!newFontSize) {
                  _context4.next = 14;
                  break;
                }
                fontSize = newFontSize;
                _context4.next = 21;
                break;
              case 14:
                _context4.next = 16;
                return _this11.calculateMaxFontSize(_this11.contentText.trim(), canvasWidth, canvasHeight, _this11.currentBackground.textBox, _this11.currentBackground.fontConfig);
              case 16:
                newMaxFontSize = _context4.sent;
                _this11.initialFontSize = newMaxFontSize;
                fontSize = _this11.isFirstLoad ? newMaxFontSize : Math.min(_this11.currentFontSize, newMaxFontSize);
                _this11.isFirstLoad = false;
                _this11.currentFontSize = fontSize;
              case 21:
                _context4.next = 23;
                return _this11.drawTextOnBackground(_this11.contentItems, _this11.currentBackground.path, {
                  fontSize: fontSize,
                  textColor: _this11.currentBackground.textColor,
                  enableShadow: true,
                  fontConfig: _this11.currentBackground.fontConfig,
                  highlightColor: _this11.currentBackground.highlightColor,
                  textBox: _this11.currentBackground.textBox,
                  highlightGeometry: _this11.currentBackground.highlightGeometry,
                  highlightQueries: _this11.highlightQueries
                });
              case 23:
                tempFilePath = _context4.sent;
                _this11.tempImagePath = tempFilePath;
                _context4.next = 31;
                break;
              case 27:
                _context4.prev = 27;
                _context4.t0 = _context4["catch"](4);
                console.error(_context4.t0);
                uni.showToast({
                  title: '生成失败',
                  icon: 'none'
                });
              case 31:
                _context4.prev = 31;
                _this11.isGenerating = false;
                return _context4.finish(31);
              case 34:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[4, 27, 31, 34]]);
      }))();
    },
    drawTextOnBackground: function drawTextOnBackground(contentItems, bgImagePath, styleConfig) {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", new Promise(function (resolve, reject) {
                  var query = uni.createSelectorQuery().in(_this12);
                  query.select('#textCanvas').fields({
                    node: true,
                    size: true
                  }).exec( /*#__PURE__*/function () {
                    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(res) {
                      var canvas, ctx, dpr, fontConfig, fontSize, textColor, fontWeight;
                      return _regenerator.default.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              if (!(!res || !res[0])) {
                                _context5.next = 3;
                                break;
                              }
                              reject(new Error('Canvas Error'));
                              return _context5.abrupt("return");
                            case 3:
                              canvas = res[0].node;
                              ctx = canvas.getContext('2d');
                              dpr = uni.getSystemInfoSync().pixelRatio;
                              canvas.width = 750 * dpr;
                              canvas.height = 1000 * dpr;
                              ctx.scale(dpr, dpr);
                              _context5.prev = 9;
                              _context5.next = 12;
                              return _this12.drawBackgroundImage(ctx, canvas, 750, 1000, bgImagePath);
                            case 12:
                              fontConfig = styleConfig.fontConfig, fontSize = styleConfig.fontSize, textColor = styleConfig.textColor;
                              fontWeight = fontConfig.weight || 'normal';
                              ctx.fillStyle = textColor;
                              ctx.textBaseline = 'middle';
                              ctx.font = "".concat(fontConfig.style || 'normal', " ").concat(fontWeight, " ").concat(fontSize, "px ").concat(fontConfig.family || 'sans-serif');
                              if (styleConfig.enableShadow) {
                                ctx.shadowColor = 'rgba(0,0,0,0.5)';
                                ctx.shadowBlur = 8;
                                ctx.shadowOffsetX = 2;
                                ctx.shadowOffsetY = 2;
                              }
                              _context5.next = 20;
                              return _this12.drawMixedContent(ctx, canvas, contentItems, 750, 1000, styleConfig);
                            case 20:
                              uni.canvasToTempFilePath({
                                canvas: canvas,
                                success: function success(r) {
                                  return resolve(r.tempFilePath);
                                },
                                fail: function fail(err) {
                                  return reject(err);
                                }
                              }, _this12);
                              _context5.next = 26;
                              break;
                            case 23:
                              _context5.prev = 23;
                              _context5.t0 = _context5["catch"](9);
                              reject(_context5.t0);
                            case 26:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5, null, [[9, 23]]);
                    }));
                    return function (_x) {
                      return _ref.apply(this, arguments);
                    };
                  }());
                }));
              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    drawMixedContent: function drawMixedContent(ctx, canvas, contentItems, canvasWidth, canvasHeight, styleConfig) {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var box, padding, maxWidth, lineHeight, emojiSize, segments, totalHeight, startY, vAlign, highlightQueries, hasHighlight, textWithoutEmojis, highlightRanges, textCharIndex;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                box = styleConfig.textBox;
                padding = 60;
                maxWidth = box ? box.width : canvasWidth - padding * 2;
                lineHeight = styleConfig.fontSize * 1.4;
                emojiSize = styleConfig.fontSize * 1.1;
                _context7.next = 7;
                return _this13.prepareDrawSegments(canvas, contentItems, maxWidth, styleConfig.fontSize, emojiSize, ctx);
              case 7:
                segments = _context7.sent;
                totalHeight = segments.length * lineHeight;
                if (box) {
                  vAlign = box.vAlign || 'middle';
                  if (vAlign === 'top') startY = box.y;else if (vAlign === 'bottom') startY = box.y + box.height - totalHeight;else startY = box.y + (box.height - totalHeight) / 2;
                } else {
                  startY = (canvasHeight - totalHeight) / 2;
                }
                highlightQueries = styleConfig.highlightQueries;
                hasHighlight = highlightQueries && highlightQueries.length > 0;
                textWithoutEmojis = contentItems.filter(function (i) {
                  return i.type === 'text';
                }).map(function (i) {
                  return i.content;
                }).join('');
                highlightRanges = [];
                if (hasHighlight) {
                  highlightQueries.forEach(function (q) {
                    if (!q) return;
                    var idx = textWithoutEmojis.indexOf(q);
                    while (idx !== -1) {
                      highlightRanges.push({
                        start: idx,
                        end: idx + q.length
                      });
                      idx = textWithoutEmojis.indexOf(q, idx + 1);
                    }
                  });
                }
                textCharIndex = 0;
                segments.forEach(function (line, lineIndex) {
                  var y = startY + lineIndex * lineHeight + lineHeight / 2;
                  var lineWidth = 0;
                  line.forEach(function (item) {
                    return lineWidth += item.type === 'text' ? ctx.measureText(item.content).width : emojiSize;
                  });
                  var x;
                  if (box) {
                    var hAlign = box.hAlign || 'center';
                    if (hAlign === 'left') x = box.x;else if (hAlign === 'right') x = box.x + box.width - lineWidth;else x = box.x + (box.width - lineWidth) / 2;
                  } else {
                    x = (canvasWidth - lineWidth) / 2;
                  }
                  line.forEach(function (item) {
                    if (item.type === 'text') {
                      var text = item.content;
                      if (hasHighlight) {
                        var _iterator = _createForOfIteratorHelper(text),
                          _step;
                        try {
                          for (_iterator.s(); !(_step = _iterator.n()).done;) {
                            var char = _step.value;
                            var charWidth = ctx.measureText(char).width;
                            var isHighlighted = highlightRanges.some(function (r) {
                              return textCharIndex >= r.start && textCharIndex < r.end;
                            });
                            if (isHighlighted) {
                              ctx.save();
                              ctx.shadowColor = 'transparent';
                              ctx.fillStyle = styleConfig.highlightColor || '#A6ECA6';
                              var geo = styleConfig.highlightGeometry || {
                                yOffset: -0.1,
                                height: 0.6
                              };
                              ctx.fillRect(x, y + styleConfig.fontSize * geo.yOffset, charWidth, styleConfig.fontSize * geo.height);
                              ctx.restore();
                            }
                            ctx.fillText(char, x, y);
                            x += charWidth;
                            textCharIndex++;
                          }
                        } catch (err) {
                          _iterator.e(err);
                        } finally {
                          _iterator.f();
                        }
                      } else {
                        ctx.fillText(text, x, y);
                        x += ctx.measureText(text).width;
                        textCharIndex += text.length;
                      }
                    } else if (item.type === 'emoji' && item.image) {
                      ctx.drawImage(item.image, x, y - emojiSize / 2, emojiSize, emojiSize);
                      x += emojiSize;
                    }
                  });
                });
              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    prepareDrawSegments: function prepareDrawSegments(canvas, contentItems, maxWidth, fontSize, emojiSize, ctx) {
      var _this14 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var lines, currentLine, currentLineWidth, _iterator2, _step2, item, _iterator3, _step3, _item, _iterator4, _step4, char, charWidth, last;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                lines = [];
                currentLine = [];
                currentLineWidth = 0;
                _iterator2 = _createForOfIteratorHelper(contentItems);
                _context8.prev = 4;
                _iterator2.s();
              case 6:
                if ((_step2 = _iterator2.n()).done) {
                  _context8.next = 20;
                  break;
                }
                item = _step2.value;
                if (!(item.type === 'emoji' && item.url)) {
                  _context8.next = 18;
                  break;
                }
                _context8.prev = 9;
                _context8.next = 12;
                return _this14.loadImageToCanvas(canvas, item.url);
              case 12:
                item.image = _context8.sent;
                _context8.next = 18;
                break;
              case 15:
                _context8.prev = 15;
                _context8.t0 = _context8["catch"](9);
                item.image = null;
              case 18:
                _context8.next = 6;
                break;
              case 20:
                _context8.next = 25;
                break;
              case 22:
                _context8.prev = 22;
                _context8.t1 = _context8["catch"](4);
                _iterator2.e(_context8.t1);
              case 25:
                _context8.prev = 25;
                _iterator2.f();
                return _context8.finish(25);
              case 28:
                _iterator3 = _createForOfIteratorHelper(contentItems);
                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    _item = _step3.value;
                    if (_item.type === 'text') {
                      _iterator4 = _createForOfIteratorHelper(_item.content);
                      try {
                        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                          char = _step4.value;
                          charWidth = ctx.measureText(char).width;
                          if (currentLineWidth + charWidth > maxWidth && currentLine.length > 0) {
                            lines.push(currentLine);
                            currentLine = [];
                            currentLineWidth = 0;
                          }
                          last = currentLine[currentLine.length - 1];
                          if (last && last.type === 'text') last.content += char;else currentLine.push({
                            type: 'text',
                            content: char
                          });
                          currentLineWidth += charWidth;
                        }
                      } catch (err) {
                        _iterator4.e(err);
                      } finally {
                        _iterator4.f();
                      }
                    } else if (_item.type === 'emoji') {
                      if (currentLineWidth + emojiSize > maxWidth && currentLine.length > 0) {
                        lines.push(currentLine);
                        currentLine = [];
                        currentLineWidth = 0;
                      }
                      currentLine.push({
                        type: 'emoji',
                        image: _item.image
                      });
                      currentLineWidth += emojiSize;
                    }
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
                if (currentLine.length > 0) lines.push(currentLine);
                return _context8.abrupt("return", lines);
              case 32:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[4, 22, 25, 28], [9, 15]]);
      }))();
    },
    loadImageToCanvas: function loadImageToCanvas(canvas, url) {
      return new Promise(function (res, rej) {
        var img = canvas.createImage();
        img.onload = function () {
          return res(img);
        };
        img.onerror = rej;
        img.src = url;
      });
    },
    wrapText: function wrapText(ctx, text, maxWidth, fontSize) {
      var lines = [];
      var line = '';
      var _iterator5 = _createForOfIteratorHelper(text),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var char = _step5.value;
          if (char === '\n') {
            lines.push(line);
            line = '';
            continue;
          }
          if (ctx.measureText(line + char).width > maxWidth && line !== '') {
            lines.push(line);
            line = char;
          } else line += char;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      if (line !== '') lines.push(line);
      return lines;
    },
    drawBackgroundImage: function drawBackgroundImage(ctx, canvas, width, height, path) {
      return new Promise(function (resolve, reject) {
        var img = canvas.createImage();
        img.onload = function () {
          ctx.drawImage(img, 0, 0, width, height);
          resolve();
        };
        img.onerror = reject;
        img.src = path;
      });
    },
    uploadToOSS: function uploadToOSS(filePath) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", new Promise(function (resolve) {
                  return resolve(filePath);
                }));
              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    confirmSelection: function confirmSelection() {
      var _this15 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var ossUrl;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(!_this15.tempImagePath || _this15.isGenerating || _this15.isUploading)) {
                  _context10.next = 2;
                  break;
                }
                return _context10.abrupt("return");
              case 2:
                _this15.isUploading = true;
                _context10.prev = 3;
                _context10.next = 6;
                return _this15.uploadToOSS(_this15.tempImagePath);
              case 6:
                ossUrl = _context10.sent;
                uni.navigateTo({
                  url: '/subpkg/publish-post/publish-post',
                  success: function success(res) {
                    res.eventChannel.emit('topicImageData', {
                      imageUrl: ossUrl,
                      images: [ossUrl].concat((0, _toConsumableArray2.default)(_this15.existingImages)),
                      content: _this15.contentText,
                      isTopic: _this15.isTopic
                    });
                  }
                });
                _context10.next = 13;
                break;
              case 10:
                _context10.prev = 10;
                _context10.t0 = _context10["catch"](3);
                uni.showToast({
                  title: '上传失败',
                  icon: 'none'
                });
              case 13:
                _context10.prev = 13;
                _this15.isUploading = false;
                return _context10.finish(13);
              case 16:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[3, 10, 13, 16]]);
      }))();
    },
    goBack: function goBack() {
      uni.navigateBack();
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 262:
/*!****************************************************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/text-to-image/text-to-image.vue?vue&type=style&index=0&id=3f3b62ce&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./text-to-image.vue?vue&type=style&index=0&id=3f3b62ce&lang=scss&scoped=true& */ 263);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 263:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/text-to-image/text-to-image.vue?vue&type=style&index=0&id=3f3b62ce&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[255,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/text-to-image/text-to-image.js.map