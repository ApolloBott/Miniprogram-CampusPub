(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg/text-to-image/text-to-image"],{

/***/ 254:
/*!*********************************************************************************************************!*\
  !*** E:/ECNU/front-end/Miniprogram-CampusPub/main.js?{"page":"subpkg%2Ftext-to-image%2Ftext-to-image"} ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _textToImage = _interopRequireDefault(__webpack_require__(/*! ./subpkg/text-to-image/text-to-image.vue */ 255));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_textToImage.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 255:
/*!**************************************************************************************!*\
  !*** E:/ECNU/front-end/Miniprogram-CampusPub/subpkg/text-to-image/text-to-image.vue ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-to-image.vue?vue&type=template&id=3f3b62ce&scoped=true& */ 256);
/* harmony import */ var _text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text-to-image.vue?vue&type=script&lang=js& */ 258);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text-to-image.vue?vue&type=style&index=0&id=3f3b62ce&lang=scss&scoped=true& */ 261);
/* harmony import */ var _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
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

/***/ 256:
/*!*********************************************************************************************************************************!*\
  !*** E:/ECNU/front-end/Miniprogram-CampusPub/subpkg/text-to-image/text-to-image.vue?vue&type=template&id=3f3b62ce&scoped=true& ***!
  \*********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./text-to-image.vue?vue&type=template&id=3f3b62ce&scoped=true& */ 257);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_template_id_3f3b62ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 257:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/ECNU/front-end/Miniprogram-CampusPub/subpkg/text-to-image/text-to-image.vue?vue&type=template&id=3f3b62ce&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        l0: l0,
        g3: g3,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 258:
/*!***************************************************************************************************************!*\
  !*** E:/ECNU/front-end/Miniprogram-CampusPub/subpkg/text-to-image/text-to-image.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./text-to-image.vue?vue&type=script&lang=js& */ 259);
/* harmony import */ var _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 259:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/ECNU/front-end/Miniprogram-CampusPub/subpkg/text-to-image/text-to-image.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _backgroundConfig = __webpack_require__(/*! ./backgroundConfig.js */ 260);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    var _ref;
    return _ref = {
      contentItems: [],
      contentText: ''
    }, (0, _defineProperty2.default)(_ref, "contentItems", []), (0, _defineProperty2.default)(_ref, "selectedCategoryIndex", -1), (0, _defineProperty2.default)(_ref, "tempImagePath", ''), (0, _defineProperty2.default)(_ref, "generatedImageUrl", ''), (0, _defineProperty2.default)(_ref, "isGenerating", false), (0, _defineProperty2.default)(_ref, "isUploading", false), (0, _defineProperty2.default)(_ref, "isTopic", false), (0, _defineProperty2.default)(_ref, "highlightQueries", []), (0, _defineProperty2.default)(_ref, "backgroundCategories", _backgroundConfig.backgroundCategories), (0, _defineProperty2.default)(_ref, "fontLibrary", _backgroundConfig.fontLibrary), (0, _defineProperty2.default)(_ref, "loadedFontFamilies", new Set()), (0, _defineProperty2.default)(_ref, "initialFontSize", 100), (0, _defineProperty2.default)(_ref, "currentFontSize", 18), (0, _defineProperty2.default)(_ref, "minFontSize", 18), (0, _defineProperty2.default)(_ref, "sliderDebounceTimer", null), (0, _defineProperty2.default)(_ref, "isFirstLoad", true), (0, _defineProperty2.default)(_ref, "existingImages", []), _ref;
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
          console.error("\u274C \u5B57\u4F53Key \"".concat(fontKey, "\" \u5728 fontLibrary \u4E2D\u672A\u627E\u5230!"));
          return {
            name: 'Error'
          };
        }
        return fontData;
      });
    },
    currentFontIndex: function currentFontIndex() {
      return this.currentStyle ? this.currentStyle.currentFontIndex : 0;
    },
    currentBackground: function currentBackground() {
      if (!this.currentStyle) return null;
      var style = this.currentStyle;
      var fontIndex = style.currentFontIndex || 0;
      var fontKey = style.fonts[fontIndex];
      if (!fontKey) {
        console.error('❌ 字体Key缺失');
        return null;
      }
      var font = this.fontLibrary[fontKey];
      if (!font) {
        console.error("\u274C \u5B57\u4F53Key \"".concat(fontKey, "\" \u5728\u5E93\u4E2D\u672A\u627E\u5230!"));
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
  }),
  onLoad: function onLoad(options) {
    var _this2 = this;
    try {
      // 处理话题内容
      var storedContentItems = uni.getStorageSync('topic_content_items');
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
        var images = JSON.parse(decodeURIComponent(options.images));
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
    this.backgroundCategories.forEach(function (category) {
      _this2.$set(category, 'currentStyle', category.styles[category.currentStyleIndex]);
      category.styles.forEach(function (style) {
        if (style.currentFontIndex === undefined) {
          _this2.$set(style, 'currentFontIndex', 0);
        }
      });
      _this2.$set(category, '_shuffledIndices', null);
      _this2.$set(category, '_shuffledCycleIndex', -1);
    });
    this.$nextTick(function () {
      _this2.selectCategory(0);
    });
  },
  methods: _objectSpread(_objectSpread({}, (0, _vuex.mapMutations)('m_user', ['updateUserBase'])), {}, {
    // 🔥 新增方法：转换contentItems为纯文本
    convertContentItemsToText: function convertContentItemsToText(items) {
      return items.map(function (item) {
        if (item.type === 'text') {
          return item.content;
        } else if (item.type === 'emoji') {
          return '　'; // 用全角空格占位，保持宽度计算
        }

        return '';
      }).join('');
    },
    showHighlightPrompt: function showHighlightPrompt() {
      var _this3 = this;
      // 🔥 修改：检测两种表情包情况
      var hasEmojiType = this.contentItems.some(function (item) {
        return item.type === 'emoji';
      });
      var hasEmojiInText = this.contentItems.some(function (item) {
        if (item.type === 'text') {
          // 使用正则检测文本中是否包含emoji字符
          var emojiRegex = /(?:[#\*0-9\xA9\xAE\u200D\u203C\u2049\u20E3\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299\uFE0F]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEDC-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8]|\uDB40[\uDC20-\uDC7F])/g;
          return emojiRegex.test(item.content);
        }
        return false;
      });
      var hasEmoji = hasEmojiType || hasEmojiInText;
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
      var textWithoutEmojis = this.contentItems.filter(function (item) {
        return item.type === 'text';
      }).map(function (item) {
        return item.content;
      }).join('');
      console.log('📄 当前纯文本内容（用于高亮）:', textWithoutEmojis);
      uni.showModal({
        title: '添加高亮关键词',
        editable: true,
        placeholderText: '例如：重点',
        success: function success(res) {
          if (res.confirm && res.content) {
            var newQuery = res.content.trim();
            if (!newQuery) return;

            // 🔥 检查关键词是否在纯文本中存在
            if (!textWithoutEmojis.includes(newQuery)) {
              uni.showModal({
                title: '未找到关键词',
                content: "\u5185\u5BB9\u4E2D\u4E0D\u5305\u542B\"".concat(newQuery, "\"\uFF0C\u8BF7\u68C0\u67E5\u62FC\u5199\u6216\u9009\u62E9\u5176\u4ED6\u5173\u952E\u8BCD"),
                showCancel: false,
                confirmText: '重新输入',
                success: function success() {
                  _this3.showHighlightPrompt();
                }
              });
              return;
            }

            // 检查是否已存在
            if (_this3.highlightQueries.includes(newQuery)) {
              uni.showToast({
                title: '关键词已存在',
                icon: 'none',
                duration: 2000
              });
              return;
            }

            // 添加到数组
            _this3.highlightQueries.push(newQuery);
            console.log('✨ 添加高亮关键词:', _this3.highlightQueries);

            // 重新生成图片
            _this3.generateImage(_this3.currentFontSize);
            uni.showToast({
              title: "\u5DF2\u9AD8\u4EAE\"".concat(newQuery, "\""),
              icon: 'success',
              duration: 1500
            });
          }
        }
      });
    },
    // 🎨 4. <script> methods 修改: clearHighlight
    // (清除数组并增加确认框)
    clearHighlight: function clearHighlight() {
      var _this4 = this;
      if (this.highlightQueries.length > 0) {
        uni.showModal({
          title: '确认清除',
          content: '要清除所有高亮关键词吗？',
          success: function success(res) {
            if (res.confirm) {
              _this4.highlightQueries = []; // (修改) 清空数组
              _this4.generateImage(_this4.currentFontSize);
              uni.showToast({
                title: '高亮已清除',
                icon: 'none'
              });
            }
          }
        });
      }
    },
    convertToPlainText: function convertToPlainText(items) {
      return items.map(function (item) {
        if (item.type === 'text') {
          return item.content;
        } else if (item.type === 'emoji') {
          return "[".concat(item.name || '表情', "]");
        }
        return '';
      }).join('');
    },
    // ... (handleSelectCategory, selectCategory, changeStyle 保持不变) ...
    handleSelectCategory: function handleSelectCategory(index) {
      if (this.isGenerating) return;
      this.selectCategory(index);
    },
    selectCategory: function selectCategory(index) {
      this.selectedCategoryIndex = index;
      this.generateImage(null);
    },
    handleChangeStyle: function handleChangeStyle(index) {
      if (this.isGenerating) return;
      this.changeStyle(index);
    },
    changeStyle: function changeStyle(categoryIndex) {
      var category = this.backgroundCategories[categoryIndex];
      var styleCount = category.styles.length;
      if (styleCount <= 1) {
        uni.showToast({
          title: '该风格暂无其他搭配',
          icon: 'none',
          duration: 1500
        });
        return;
      }
      if (!category._shuffledIndices || category._shuffledCycleIndex >= styleCount - 1) {
        console.log("\uD83D\uDD04 \u5217\u8868\u64AD\u653E\u5B8C\u6BD5, \u4E3A ".concat(category.name, " \u91CD\u65B0\u751F\u6210\u968F\u673A\u5217\u8868..."));
        var indices = Array.from({
          length: styleCount
        }, function (_, i) {
          return i;
        });
        for (var i = indices.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var _ref2 = [indices[j], indices[i]];
          indices[i] = _ref2[0];
          indices[j] = _ref2[1];
        }
        var currentStyleIndex = category.currentStyleIndex;
        if (indices[0] === currentStyleIndex && styleCount > 1) {
          var lastIndex = indices.length - 1;
          var _ref3 = [indices[lastIndex], indices[0]];
          indices[0] = _ref3[0];
          indices[lastIndex] = _ref3[1];
        }
        category._shuffledIndices = indices;
        category._shuffledCycleIndex = -1;
      }
      category._shuffledCycleIndex++;
      var newStyleIndex = category._shuffledIndices[category._shuffledCycleIndex];
      category.currentStyleIndex = newStyleIndex;
      this.$forceUpdate();
      this.generateImage(null);
      var newStyle = category.styles[newStyleIndex];
      var fontKey = newStyle.fonts[newStyle.currentFontIndex || 0];
      var newFont = this.fontLibrary[fontKey];
      uni.showToast({
        title: "".concat(newStyle.name, " \xB7 ").concat(newFont.name),
        icon: 'success',
        duration: 1500
      });
    },
    // ... (handleChangeFont, handleSliderChange 保持不变) ...
    handleChangeFont: function handleChangeFont() {
      if (this.isGenerating || !this.currentStyle) return;
      var fontCount = this.currentFontList.length;
      if (fontCount <= 1) {
        return;
      }
      var currentIndex = this.currentFontIndex;
      var newIndex;
      do {
        newIndex = Math.floor(Math.random() * fontCount);
      } while (newIndex === currentIndex);
      this.currentStyle.currentFontIndex = newIndex;
      this.$forceUpdate();
      this.generateImage(null);
      var newFont = this.currentFontList[newIndex];
      uni.showToast({
        title: "\u5B57\u4F53: ".concat(newFont.name),
        icon: 'none'
      });
    },
    handleSliderChange: function handleSliderChange(e) {
      var _this5 = this;
      var newSize = e.detail.value;
      this.currentFontSize = newSize;
      if (this.sliderDebounceTimer) {
        clearTimeout(this.sliderDebounceTimer);
      }
      this.sliderDebounceTimer = setTimeout(function () {
        _this5.generateImage(newSize);
      }, 50);
    },
    // ... (getCanvasContext, doesTextFit, calculateMaxFontSize, loadCustomFont 保持不变) ...
    getCanvasContext: function getCanvasContext() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var query = uni.createSelectorQuery().in(_this6);
                  query.select('#textCanvas').fields({
                    node: true,
                    size: true
                  }).exec(function (res) {
                    if (!res || !res[0] || !res[0].node) {
                      reject(new Error('获取 Canvas 失败'));
                      return;
                    }
                    var canvas = res[0].node;
                    var ctx = canvas.getContext('2d');
                    resolve(ctx);
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
      var totalHeight = lines.length * lineHeight;
      return totalHeight <= maxHeight;
    },
    calculateMaxFontSize: function calculateMaxFontSize(text, canvasWidth, canvasHeight, textBox, fontConfig) {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var padding, maxWidth, maxHeight, minFont, maxFont, ctx, bestFit, low, high, i, mid;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                padding = 60;
                maxWidth = textBox ? textBox.width : canvasWidth - padding * 2;
                maxHeight = textBox ? textBox.height : canvasHeight * 0.7;
                minFont = _this7.minFontSize; // 18
                maxFont = 300;
                _context2.next = 7;
                return _this7.getCanvasContext();
              case 7:
                ctx = _context2.sent;
                bestFit = minFont;
                low = minFont;
                high = maxFont;
                i = 0;
              case 12:
                if (!(i < 10)) {
                  _context2.next = 22;
                  break;
                }
                if (!(low > high)) {
                  _context2.next = 15;
                  break;
                }
                return _context2.abrupt("break", 22);
              case 15:
                mid = Math.floor((low + high) / 2);
                if (!(mid === 0)) {
                  _context2.next = 18;
                  break;
                }
                return _context2.abrupt("return", bestFit);
              case 18:
                if (_this7.doesTextFit(ctx, text, mid, maxWidth, maxHeight, fontConfig)) {
                  bestFit = mid;
                  low = mid + 1;
                } else {
                  high = mid - 1;
                }
              case 19:
                i++;
                _context2.next = 12;
                break;
              case 22:
                console.log("Binary search result: bestFit = ".concat(bestFit));
                return _context2.abrupt("return", bestFit);
              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    loadCustomFont: function loadCustomFont(fontConfig) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var fontFamilyName;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!fontConfig || !fontConfig.url)) {
                  _context3.next = 3;
                  break;
                }
                console.log('✅ 使用系统字体，无需加载');
                return _context3.abrupt("return", Promise.resolve());
              case 3:
                fontFamilyName = fontConfig.family; // 如果已经尝试加载过（成功或失败），不再重复尝试
                if (!_this8.loadedFontFamilies.has(fontFamilyName)) {
                  _context3.next = 7;
                  break;
                }
                console.log("\u23ED\uFE0F \u5B57\u4F53 '".concat(fontFamilyName, "' \u5DF2\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7"));
                return _context3.abrupt("return", Promise.resolve());
              case 7:
                console.log("\u23F3 \u5F00\u59CB\u52A0\u8F7D\u5B57\u4F53: ".concat(fontFamilyName, " from ").concat(fontConfig.url));
                uni.showLoading({
                  title: '加载字体...',
                  mask: true
                });

                // 🔥 关键：使用 try-catch 包裹整个 Promise，确保任何错误都不会中断流程
                _context3.prev = 9;
                _context3.next = 12;
                return new Promise(function (resolve, reject) {
                  uni.loadFontFace({
                    family: fontFamilyName,
                    source: "url(\"".concat(fontConfig.url, "\")"),
                    weight: fontConfig.weight || 'normal',
                    style: fontConfig.style || 'normal',
                    success: function success() {
                      console.log("\u2705 \u5B57\u4F53 '".concat(fontFamilyName, "' \u52A0\u8F7D\u6210\u529F"));
                      _this8.loadedFontFamilies.add(fontFamilyName);
                      uni.hideLoading();
                      resolve(); // 成功时 resolve
                    },

                    fail: function fail(err) {
                      console.warn("\u26A0\uFE0F \u5B57\u4F53 '".concat(fontFamilyName, "' \u52A0\u8F7D\u5931\u8D25\uFF0C\u5C06\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\u5B57\u4F53:"), err);
                      // 🔥 关键修改：失败时也标记为已处理，并 resolve（不 reject）
                      _this8.loadedFontFamilies.add(fontFamilyName);
                      uni.hideLoading();
                      resolve(); // ✅ 即使失败也 resolve，不中断流程
                    }
                  });
                });
              case 12:
                _context3.next = 18;
                break;
              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](9);
                // 🔥 兜底处理：即使 Promise 异常也不抛出错误
                console.warn("\u26A0\uFE0F \u5B57\u4F53\u52A0\u8F7D\u5F02\u5E38\uFF0C\u7EE7\u7EED\u4F7F\u7528\u7CFB\u7EDF\u5B57\u4F53:", _context3.t0);
                uni.hideLoading();
              case 18:
                return _context3.abrupt("return", Promise.resolve());
              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[9, 14]]);
      }))();
    },
    // 🎨 5. <script> methods 修改: generateImage
    generateImage: function generateImage() {
      var _arguments = arguments,
        _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var newFontSize, canvasWidth, canvasHeight, fontSize, newMaxFontSize, tempFilePath;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                newFontSize = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : null;
                if (!(_this9.isGenerating && newFontSize)) {
                  _context4.next = 4;
                  break;
                }
                console.log('--- 正在生成, 丢弃滑块事件 ---');
                return _context4.abrupt("return");
              case 4:
                _this9.isGenerating = true;
                _context4.prev = 5;
                canvasWidth = 750;
                canvasHeight = 1000;
                if (_this9.currentBackground) {
                  _context4.next = 10;
                  break;
                }
                throw new Error('无法获取当前背景配置');
              case 10:
                _context4.next = 12;
                return _this9.loadCustomFont(_this9.currentBackground.fontConfig);
              case 12:
                if (!newFontSize) {
                  _context4.next = 16;
                  break;
                }
                fontSize = newFontSize;
                _context4.next = 24;
                break;
              case 16:
                console.log('Calculating max font size for new background...');
                _context4.next = 19;
                return _this9.calculateMaxFontSize(_this9.contentText.trim(), canvasWidth, canvasHeight, _this9.currentBackground.textBox, _this9.currentBackground.fontConfig);
              case 19:
                newMaxFontSize = _context4.sent;
                console.log("\uD83D\uDCD0 \u65B0\u80CC\u666F\u6700\u5927\u5B57\u53F7: ".concat(newMaxFontSize, "px"));
                _this9.initialFontSize = newMaxFontSize;
                if (_this9.isFirstLoad) {
                  fontSize = newMaxFontSize;
                  _this9.isFirstLoad = false;
                  console.log('首次加载，设置为最大值');
                } else {
                  fontSize = Math.min(_this9.currentFontSize, newMaxFontSize);
                  console.log("\u5207\u6362\u80CC\u666F\uFF0C\u4FDD\u7559\u5B57\u53F7: ".concat(_this9.currentFontSize, " -> ").concat(fontSize));
                }
                _this9.currentFontSize = fontSize;
              case 24:
                _context4.next = 26;
                return _this9.drawTextOnBackground(_this9.contentItems,
                // 🔥 传递 contentItems
                _this9.currentBackground.path, {
                  fontSize: fontSize,
                  textColor: _this9.currentBackground.textColor,
                  enableShadow: true,
                  fontConfig: _this9.currentBackground.fontConfig,
                  highlightColor: _this9.currentBackground.highlightColor,
                  textBox: _this9.currentBackground.textBox,
                  highlightGeometry: _this9.currentBackground.highlightGeometry,
                  highlightQueries: _this9.highlightQueries
                });
              case 26:
                tempFilePath = _context4.sent;
                _this9.tempImagePath = tempFilePath;
                _context4.next = 34;
                break;
              case 30:
                _context4.prev = 30;
                _context4.t0 = _context4["catch"](5);
                console.error('❌ 生成图片失败:', _context4.t0);
                uni.showToast({
                  title: _context4.t0.message || '生成失败，请重试',
                  icon: 'none'
                });
              case 34:
                _context4.prev = 34;
                _this9.isGenerating = false;
                return _context4.finish(34);
              case 37:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[5, 30, 34, 37]]);
      }))();
    },
    // 🔥 修改 drawTextOnBackground 方法
    drawTextOnBackground: function drawTextOnBackground(contentItems, bgImagePath, styleConfig) {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", new Promise(function (resolve, reject) {
                  var query = uni.createSelectorQuery().in(_this10);
                  query.select('#textCanvas').fields({
                    node: true,
                    size: true
                  }).exec( /*#__PURE__*/function () {
                    var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(res) {
                      var canvas, ctx, dpr, width, height, fontConfig, fontStyle, fontWeight, fontFamily, exportPromise, exportTimeout, tempFilePath;
                      return _regenerator.default.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              if (!(!res || !res[0])) {
                                _context5.next = 3;
                                break;
                              }
                              reject(new Error('获取 Canvas 失败'));
                              return _context5.abrupt("return");
                            case 3:
                              canvas = res[0].node;
                              ctx = canvas.getContext('2d');
                              dpr = uni.getSystemInfoSync().pixelRatio;
                              canvas.width = 750 * dpr;
                              canvas.height = 1000 * dpr;
                              ctx.scale(dpr, dpr);
                              width = 750;
                              height = 1000;
                              ctx.clearRect(0, 0, width, height);
                              _context5.prev = 12;
                              _context5.next = 15;
                              return _this10.drawBackgroundImage(ctx, canvas, width, height, bgImagePath);
                            case 15:
                              // 2. 设置字体
                              fontConfig = styleConfig.fontConfig;
                              fontStyle = fontConfig.style === 'italic' ? 'italic' : 'normal';
                              fontWeight = fontConfig.weight || 'normal';
                              fontFamily = fontConfig.family || 'sans-serif';
                              ctx.fillStyle = styleConfig.textColor;
                              ctx.textBaseline = 'middle';
                              ctx.font = "".concat(fontStyle, " ").concat(fontWeight, " ").concat(styleConfig.fontSize, "px ").concat(fontFamily);
                              if (styleConfig.enableShadow) {
                                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                                ctx.shadowBlur = 8;
                                ctx.shadowOffsetX = 2;
                                ctx.shadowOffsetY = 2;
                              }

                              // 3. 🔥 绘制混合内容（文字 + 表情）
                              _context5.next = 25;
                              return _this10.drawMixedContent(ctx, canvas, contentItems, width, height, styleConfig);
                            case 25:
                              // 4. 导出图片
                              exportPromise = new Promise(function (res, rej) {
                                uni.canvasToTempFilePath({
                                  canvas: canvas,
                                  success: function success(r) {
                                    return res(r.tempFilePath);
                                  },
                                  fail: function fail(err) {
                                    return rej(new Error('导出图片失败: ' + err.errMsg));
                                  }
                                }, _this10);
                              });
                              exportTimeout = new Promise(function (_, rej) {
                                setTimeout(function () {
                                  console.error('❌ 导出 Canvas 超时');
                                  reject(new Error('图片导出超时'));
                                }, 5000);
                              });
                              _context5.next = 29;
                              return Promise.race([exportPromise, exportTimeout]);
                            case 29:
                              tempFilePath = _context5.sent;
                              resolve(tempFilePath);
                              _context5.next = 36;
                              break;
                            case 33:
                              _context5.prev = 33;
                              _context5.t0 = _context5["catch"](12);
                              reject(_context5.t0);
                            case 36:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5, null, [[12, 33]]);
                    }));
                    return function (_x) {
                      return _ref4.apply(this, arguments);
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
    // 🔥 继续 drawMixedContent 方法
    drawMixedContent: function drawMixedContent(ctx, canvas, contentItems, canvasWidth, canvasHeight, styleConfig) {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var box, padding, maxWidth, hAlign, vAlign, lineHeight, emojiSize, segments, totalHeight, startY, highlightQueries, hasHighlight, highlightColor, defaultHighlightGeo, customHighlightGeo, geo, textWithoutEmojis, highlightRanges, textCharIndex;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                box = styleConfig.textBox;
                padding = 60;
                maxWidth = box ? box.width : canvasWidth - padding * 2;
                hAlign = box ? box.hAlign || 'center' : 'center';
                vAlign = box ? box.vAlign || 'middle' : 'middle';
                lineHeight = styleConfig.fontSize * 1.4;
                emojiSize = styleConfig.fontSize * 1.1; // 表情大小略大于字体
                // 🔥 将 contentItems 转换为可绘制的 segments（包含加载的图片）
                _context7.next = 9;
                return _this11.prepareDrawSegments(canvas, contentItems, maxWidth, styleConfig.fontSize, emojiSize, ctx);
              case 9:
                segments = _context7.sent;
                // 计算总高度
                totalHeight = segments.length * lineHeight;
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
                highlightQueries = styleConfig.highlightQueries;
                hasHighlight = Array.isArray(highlightQueries) && highlightQueries.length > 0;
                highlightColor = styleConfig.highlightColor || '#A6ECA6';
                defaultHighlightGeo = {
                  yOffset: -0.1,
                  height: 0.6
                };
                customHighlightGeo = styleConfig.highlightGeometry;
                geo = customHighlightGeo || defaultHighlightGeo; // 创建没有表情的纯文本版本用于高亮匹配
                textWithoutEmojis = contentItems.filter(function (item) {
                  return item.type === 'text';
                }).map(function (item) {
                  return item.content;
                }).join(''); // 查找所有高亮范围
                highlightRanges = [];
                if (hasHighlight) {
                  highlightQueries.forEach(function (query) {
                    if (!query || query.trim() === '') return;
                    var startIndex = textWithoutEmojis.indexOf(query);
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
                textCharIndex = 0; // 跟踪纯文本字符索引
                segments.forEach(function (line, lineIndex) {
                  var y = startY + lineIndex * lineHeight + lineHeight / 2;

                  // 计算行宽度
                  var lineWidth = 0;
                  line.forEach(function (item) {
                    if (item.type === 'text') {
                      lineWidth += ctx.measureText(item.content).width;
                    } else if (item.type === 'emoji') {
                      lineWidth += emojiSize;
                    }
                  });

                  // 计算 x 起始位置
                  var x;
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
                  line.forEach(function (item) {
                    if (item.type === 'text') {
                      var text = item.content;

                      // 检查是否需要高亮
                      if (hasHighlight) {
                        var _loop = function _loop(i) {
                          var currentIndex = textCharIndex + i;
                          var char = text[i];
                          var charWidth = ctx.measureText(char).width;

                          // 判断当前字符是否在高亮范围内
                          var isHighlighted = highlightRanges.some(function (range) {
                            return currentIndex >= range.start && currentIndex < range.end;
                          });
                          if (isHighlighted) {
                            // 绘制高亮背景
                            var highlightY = y + styleConfig.fontSize * geo.yOffset;
                            var highlightHeight = styleConfig.fontSize * geo.height;
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
                        };
                        for (var i = 0; i < text.length; i++) {
                          _loop(i);
                        }
                      } else {
                        // 无高亮，直接绘制
                        ctx.fillText(text, x, y);
                        x += ctx.measureText(text).width;
                      }
                      textCharIndex += text.length;
                    } else if (item.type === 'emoji' && item.image) {
                      // 🔥 绘制表情图片
                      var emojiY = y - emojiSize / 2;
                      ctx.drawImage(item.image, x, emojiY, emojiSize, emojiSize);
                      x += emojiSize;
                    }
                  });
                });
              case 23:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    // 🔥 新增方法：准备绘制片段（包含加载表情图片）
    prepareDrawSegments: function prepareDrawSegments(canvas, contentItems, maxWidth, fontSize, emojiSize, ctx) {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var lines, currentLine, currentLineWidth, _iterator, _step, item, _iterator2, _step2, _item, text, _iterator3, _step3, char, charWidth, lastItem;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                lines = [];
                currentLine = [];
                currentLineWidth = 0; // 🔥 首先加载所有表情图片
                _iterator = _createForOfIteratorHelper(contentItems);
                _context8.prev = 4;
                _iterator.s();
              case 6:
                if ((_step = _iterator.n()).done) {
                  _context8.next = 22;
                  break;
                }
                item = _step.value;
                if (!(item.type === 'emoji' && item.url)) {
                  _context8.next = 20;
                  break;
                }
                _context8.prev = 9;
                _context8.next = 12;
                return _this12.loadImageToCanvas(canvas, item.url);
              case 12:
                item.image = _context8.sent;
                console.log('✅ 表情图片加载成功:', item.name);
                _context8.next = 20;
                break;
              case 16:
                _context8.prev = 16;
                _context8.t0 = _context8["catch"](9);
                console.error('❌ 表情图片加载失败:', item.name, _context8.t0);
                item.image = null;
              case 20:
                _context8.next = 6;
                break;
              case 22:
                _context8.next = 27;
                break;
              case 24:
                _context8.prev = 24;
                _context8.t1 = _context8["catch"](4);
                _iterator.e(_context8.t1);
              case 27:
                _context8.prev = 27;
                _iterator.f();
                return _context8.finish(27);
              case 30:
                // 🔥 处理换行
                _iterator2 = _createForOfIteratorHelper(contentItems);
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    _item = _step2.value;
                    if (_item.type === 'text') {
                      text = _item.content;
                      _iterator3 = _createForOfIteratorHelper(text);
                      try {
                        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                          char = _step3.value;
                          charWidth = ctx.measureText(char).width;
                          if (currentLineWidth + charWidth > maxWidth && currentLine.length > 0) {
                            // 需要换行
                            lines.push(currentLine);
                            currentLine = [];
                            currentLineWidth = 0;
                          }

                          // 合并相邻的文字
                          lastItem = currentLine[currentLine.length - 1];
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
                      } catch (err) {
                        _iterator3.e(err);
                      } finally {
                        _iterator3.f();
                      }
                    } else if (_item.type === 'emoji') {
                      if (currentLineWidth + emojiSize > maxWidth && currentLine.length > 0) {
                        // 需要换行
                        lines.push(currentLine);
                        currentLine = [];
                        currentLineWidth = 0;
                      }
                      currentLine.push({
                        type: 'emoji',
                        image: _item.image,
                        name: _item.name
                      });
                      currentLineWidth += emojiSize;
                    }
                  }

                  // 添加最后一行
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
                if (currentLine.length > 0) {
                  lines.push(currentLine);
                }
                return _context8.abrupt("return", lines);
              case 34:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[4, 24, 27, 30], [9, 16]]);
      }))();
    },
    // 🔥 新增方法：加载图片到 Canvas
    loadImageToCanvas: function loadImageToCanvas(canvas, imageUrl) {
      return new Promise(function (resolve, reject) {
        var img = canvas.createImage();
        img.onload = function () {
          console.log('✅ 图片加载成功:', imageUrl);
          resolve(img);
        };
        img.onerror = function (err) {
          console.error('❌ 图片加载失败:', imageUrl, err);
          reject(new Error('图片加载失败'));
        };
        img.src = imageUrl;

        // 设置超时
        setTimeout(function () {
          reject(new Error('图片加载超时'));
        }, 5000);
      });
    },
    // ... (wrapText 保持不变) ...
    // 🎨 2. Bug修复: 修改 wrapText 以支持 \n 换行
    wrapText: function wrapText(ctx, text, maxWidth, fontSize) {
      var lines = [];
      var currentLine = '';
      var words = text.split(''); // (保持字符分割)

      for (var i = 0; i < words.length; i++) {
        //

        // (Bug修复) 检查是否是 \n
        if (words[i] === '\n') {
          lines.push(currentLine); // 推送 \n 之前的内容
          currentLine = ''; // 开始新的一行
          continue; // 跳过 \n 字符
        }

        var testLine = currentLine + words[i]; //
        var metrics = ctx.measureText(testLine); //

        if (metrics.width > maxWidth && currentLine !== '') {
          //
          lines.push(currentLine); //
          currentLine = words[i]; //
        } else {
          currentLine = testLine; //
        }
      }

      if (currentLine !== '') {
        //
        lines.push(currentLine); //
      }

      return lines;
    },
    // ... (drawBackgroundImage 保持不变) ...
    drawBackgroundImage: function drawBackgroundImage(ctx, canvas, width, height, imagePath) {
      var loadPromise = new Promise(function (resolve, reject) {
        var image = canvas.createImage();
        image.onload = function () {
          ctx.drawImage(image, 0, 0, width, height);
          console.log('✅ 背景图片绘制成功');
          resolve();
        };
        image.onerror = function (err) {
          console.error('❌ 加载背景图片失败:', err);
          reject(new Error('加载背景图片失败'));
        };
        image.src = imagePath;
        console.log('📷 开始加载背景图片:', imagePath);
      });
      var timeoutPromise = new Promise(function (_, reject) {
        setTimeout(function () {
          console.error("\u274C \u52A0\u8F7D\u80CC\u666F\u56FE\u7247\u8D85\u65F6: ".concat(imagePath));
          reject(new Error('背景图片加载超时'));
        }, 10000);
      });
      return Promise.race([loadPromise, timeoutPromise]);
    },
    // ... (uploadToOSS 保持不变, 已包含压缩) ...
    uploadToOSS: function uploadToOSS(originalTempFilePath) {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var compressedFile, tempFilePath, _yield$uni$$http$get, tokenRes, uploadUrl, publicUrl, fileContent;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                console.log('📤 开始上传图片到 OSS...');
                console.log('⏳ 正在压缩图片 (quality: 80)...');
                _context9.next = 5;
                return new Promise(function (resolve, reject) {
                  uni.compressImage({
                    src: originalTempFilePath,
                    quality: 80,
                    success: resolve,
                    fail: function fail(err) {
                      console.error('❌ 图片压缩失败:', err);
                      reject(new Error('图片压缩失败'));
                    }
                  });
                });
              case 5:
                compressedFile = _context9.sent;
                tempFilePath = compressedFile.tempFilePath;
                console.log("\u2705 \u538B\u7F29\u5B8C\u6210, \u65B0\u8DEF\u5F84: ".concat(tempFilePath));
                _context9.next = 10;
                return uni.$http.get('/upload/token', {
                  openid: _this13.openid,
                  fileType: 'image'
                });
              case 10:
                _yield$uni$$http$get = _context9.sent;
                tokenRes = _yield$uni$$http$get.data;
                if (!(tokenRes.meta.status !== 200)) {
                  _context9.next = 14;
                  break;
                }
                throw new Error('获取上传凭证失败');
              case 14:
                uploadUrl = tokenRes.message.uploadUrl;
                publicUrl = tokenRes.message.publicUrl;
                _context9.next = 18;
                return new Promise(function (resolve, reject) {
                  uni.getFileSystemManager().readFile({
                    filePath: tempFilePath,
                    encoding: 'base64',
                    success: function success(res) {
                      return resolve(res.data);
                    },
                    fail: reject
                  });
                });
              case 18:
                fileContent = _context9.sent;
                _context9.next = 21;
                return new Promise(function (resolve, reject) {
                  uni.getFileInfo({
                    filePath: tempFilePath,
                    success: function success(fileInfo) {
                      console.log(" compressed file size: ".concat((fileInfo.size / 1024).toFixed(2), " KB"));
                      uni.request({
                        url: publicUrl,
                        method: 'PUT',
                        header: {
                          'Content-Type': 'application/octet-stream'
                        },
                        data: uni.base64ToArrayBuffer(fileContent),
                        success: function success(res) {
                          if (res.statusCode === 200) resolve(res);else reject(new Error("\u4E0A\u4F20\u5931\u8D25: ".concat(res.statusCode)));
                        },
                        fail: reject
                      });
                    },
                    fail: reject
                  });
                });
              case 21:
                _this13.generatedImageUrl = publicUrl;
                console.log('✅ 图片上传到 OSS 完成:', publicUrl);
                return _context9.abrupt("return", publicUrl);
              case 26:
                _context9.prev = 26;
                _context9.t0 = _context9["catch"](0);
                console.error('❌ 上传失败:', _context9.t0);
                throw _context9.t0;
              case 30:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 26]]);
      }))();
    },
    // ... (confirmSelection, uploadAndNavigate, goBack 保持不变) ...
    confirmSelection: function confirmSelection() {
      var _this14 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(!_this14.tempImagePath || _this14.isGenerating || _this14.isUploading)) {
                  _context10.next = 2;
                  break;
                }
                return _context10.abrupt("return");
              case 2:
                _this14.uploadAndNavigate();
              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
    // 🔥 修改：uploadAndNavigate 方法，传递图片数据
    uploadAndNavigate: function uploadAndNavigate() {
      var _this15 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        var ossUrl;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _this15.isUploading = true;
                _context11.prev = 1;
                _context11.next = 4;
                return _this15.uploadToOSS(_this15.tempImagePath);
              case 4:
                ossUrl = _context11.sent;
                uni.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 1500
                });
                setTimeout(function () {
                  // 🔥 修改：将生成的背景图和原有图片一起传递
                  var allImages = [ossUrl].concat((0, _toConsumableArray2.default)(_this15.existingImages));
                  console.log('📤 传递到 publish-post 的图片:', allImages);
                  uni.navigateTo({
                    url: '/subpkg/publish-post/publish-post',
                    success: function success(res) {
                      res.eventChannel.emit('topicImageData', {
                        imageUrl: ossUrl,
                        // 生成的背景图（保留兼容性）
                        images: allImages,
                        // 🔥 新增：所有图片数组（背景图 + topic 图片）
                        content: _this15.contentText,
                        isTopic: _this15.isTopic
                      });
                    }
                  });
                }, 1500);
                _context11.next = 13;
                break;
              case 9:
                _context11.prev = 9;
                _context11.t0 = _context11["catch"](1);
                console.error('❌ 上传失败:', _context11.t0);
                uni.showToast({
                  title: _context11.t0.message || '上传失败,请重试',
                  icon: 'none',
                  duration: 2000
                });
              case 13:
                _context11.prev = 13;
                _this15.isUploading = false;
                return _context11.finish(13);
              case 16:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[1, 9, 13, 16]]);
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

/***/ 261:
/*!************************************************************************************************************************************************!*\
  !*** E:/ECNU/front-end/Miniprogram-CampusPub/subpkg/text-to-image/text-to-image.vue?vue&type=style&index=0&id=3f3b62ce&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./text-to-image.vue?vue&type=style&index=0&id=3f3b62ce&lang=scss&scoped=true& */ 262);
/* harmony import */ var _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_text_to_image_vue_vue_type_style_index_0_id_3f3b62ce_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 262:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/ECNU/front-end/Miniprogram-CampusPub/subpkg/text-to-image/text-to-image.vue?vue&type=style&index=0&id=3f3b62ce&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[254,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/text-to-image/text-to-image.js.map