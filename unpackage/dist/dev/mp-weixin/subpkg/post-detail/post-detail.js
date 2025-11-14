(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg/post-detail/post-detail"],{

/***/ 174:
/*!*********************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/main.js?{"page":"subpkg%2Fpost-detail%2Fpost-detail"} ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _postDetail = _interopRequireDefault(__webpack_require__(/*! ./subpkg/post-detail/post-detail.vue */ 175));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_postDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 175:
/*!**************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/post-detail/post-detail.vue ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _post_detail_vue_vue_type_template_id_0a416b90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post-detail.vue?vue&type=template&id=0a416b90& */ 176);
/* harmony import */ var _post_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./post-detail.vue?vue&type=script&lang=js& */ 178);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _post_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _post_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _post_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./post-detail.vue?vue&type=style&index=0&lang=scss& */ 180);
/* harmony import */ var _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _post_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _post_detail_vue_vue_type_template_id_0a416b90___WEBPACK_IMPORTED_MODULE_0__["render"],
  _post_detail_vue_vue_type_template_id_0a416b90___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _post_detail_vue_vue_type_template_id_0a416b90___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg/post-detail/post-detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 176:
/*!*********************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/post-detail/post-detail.vue?vue&type=template&id=0a416b90& ***!
  \*********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_template_id_0a416b90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./post-detail.vue?vue&type=template&id=0a416b90& */ 177);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_template_id_0a416b90___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_template_id_0a416b90___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_template_id_0a416b90___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_template_id_0a416b90___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 177:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/post-detail/post-detail.vue?vue&type=template&id=0a416b90& ***!
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
  var l0 = _vm.post ? _vm.parsePostTags(_vm.post.properties) : null
  var g0 = _vm.post ? _vm.post.images && _vm.post.images.length > 0 : null
  var l2 = _vm.__map(_vm.commentList, function (comment, __i0__) {
    var $orig = _vm.__get_orig(comment)
    var m0 = _vm.formatCommentTime(comment.created_at)
    var m1 = _vm.parseEmojiContent(comment.content)
    var g1 = comment.replies && comment.replies.length > 0
    var l1 = g1
      ? _vm.__map(comment.replies, function (reply, __i1__) {
          var $orig = _vm.__get_orig(reply)
          var m2 = _vm.formatCommentTime(reply.created_at)
          var m3 = _vm.parseEmojiContent(reply.content)
          return {
            $orig: $orig,
            m2: m2,
            m3: m3,
          }
        })
      : null
    var g2 = g1 && comment.has_more_replies ? comment.replies.length : null
    return {
      $orig: $orig,
      m0: m0,
      m1: m1,
      g1: g1,
      l1: l1,
      g2: g2,
    }
  })
  var g3 = _vm.commentList.length === 0 && !_vm.isLoadingComments
  var g4 = _vm.showReplyModal ? _vm.commentContent.length : null
  var g5 = _vm.showReplyModal ? _vm.commentContent.trim() : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        g0: g0,
        l2: l2,
        g3: g3,
        g4: g4,
        g5: g5,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 178:
/*!***************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/post-detail/post-detail.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./post-detail.vue?vue&type=script&lang=js& */ 179);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 179:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/post-detail/post-detail.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _vuex = __webpack_require__(/*! vuex */ 33);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// ✅ 新增：小表情基础路径
var BASE_URL_SMALL = 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-small/';
var _default = {
  data: function data() {
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
      emojiList: [{
        id: 1,
        name: 'happy',
        url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-1.png',
        code: '[微笑]'
      }, {
        id: 2,
        name: 'laugh',
        url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-2.png',
        code: '[大笑]'
      }, {
        id: 3,
        name: 'love',
        url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-3.png',
        code: '[笑哭]'
      }, {
        id: 4,
        name: 'cool',
        url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-4.png',
        code: '[难过]'
      }, {
        id: 5,
        name: 'sad',
        url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-5.png',
        code: '[大哭]'
      }, {
        id: 6,
        name: 'cry',
        url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-6.png',
        code: '[疑问]'
      }, {
        id: 7,
        name: 'angry',
        url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-7.png',
        code: '[爱心]'
      }, {
        id: 8,
        name: 'surprise',
        url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-8.png',
        code: '[得意]'
      }, {
        id: 9,
        name: 'thinking',
        url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-9.png',
        code: '[惊恐]'
      }],
      // ✅ 新增：第二套小表情
      miniEmojiList: [{
        id: 10,
        name: 'mini-1',
        url: "".concat(BASE_URL_SMALL, "1weixiao.png"),
        code: '(微笑)'
      }, {
        id: 11,
        name: 'mini-2',
        url: "".concat(BASE_URL_SMALL, "2piezui.png"),
        code: '(撇嘴)'
      }, {
        id: 12,
        name: 'mini-3',
        url: "".concat(BASE_URL_SMALL, "3yanchan.png"),
        code: '(馋)'
      }, {
        id: 13,
        name: 'mini-4',
        url: "".concat(BASE_URL_SMALL, "4jingya.png"),
        code: '(惊讶)'
      }, {
        id: 14,
        name: 'mini-5',
        url: "".concat(BASE_URL_SMALL, "5mojing.png"),
        code: '(秀)'
      }, {
        id: 15,
        name: 'mini-6',
        url: "".concat(BASE_URL_SMALL, "6daku.png"),
        code: '(哭)'
      }, {
        id: 16,
        name: 'mini-7',
        url: "".concat(BASE_URL_SMALL, "7wuzui.png"),
        code: '(闭麦)'
      }, {
        id: 17,
        name: 'mini-8',
        url: "".concat(BASE_URL_SMALL, "8ganga.png"),
        code: '(尴尬)'
      }, {
        id: 18,
        name: 'mini-9',
        url: "".concat(BASE_URL_SMALL, "9shengqi.png"),
        code: '(发怒)'
      }, {
        id: 19,
        name: 'mini-10',
        url: "".concat(BASE_URL_SMALL, "10daxiao.png"),
        code: '(大笑)'
      }, {
        id: 20,
        name: 'mini-11',
        url: "".concat(BASE_URL_SMALL, "10yumen.png"),
        code: '(郁闷)'
      }, {
        id: 21,
        name: 'mini-12',
        url: "".concat(BASE_URL_SMALL, "11nanguo.png"),
        code: '(难过)'
      }, {
        id: 22,
        name: 'mini-13',
        url: "".concat(BASE_URL_SMALL, "11tushe.png"),
        code: '(调皮)'
      }, {
        id: 23,
        name: 'mini-14',
        url: "".concat(BASE_URL_SMALL, "12exin.png"),
        code: '(吐)'
      }, {
        id: 24,
        name: 'mini-15',
        url: "".concat(BASE_URL_SMALL, "13touxiao.png"),
        code: '(偷笑)'
      }, {
        id: 25,
        name: 'mini-16',
        url: "".concat(BASE_URL_SMALL, "14yukuai.png"),
        code: '(愉快)'
      }, {
        id: 26,
        name: 'mini-17',
        url: "".concat(BASE_URL_SMALL, "16heng.png"),
        code: '(哼)'
      }, {
        id: 27,
        name: 'mini-18',
        url: "".concat(BASE_URL_SMALL, "17kouzhao.png"),
        code: '(生病)'
      }, {
        id: 28,
        name: 'mini-19',
        url: "".concat(BASE_URL_SMALL, "18haqian.png"),
        code: '(困)'
      }, {
        id: 29,
        name: 'mini-20',
        url: "".concat(BASE_URL_SMALL, "19yihuo.png"),
        code: '(疑惑)'
      }, {
        id: 30,
        name: 'mini-21',
        url: "".concat(BASE_URL_SMALL, "20shiwang.png"),
        code: '(失望)'
      }, {
        id: 31,
        name: 'mini-22',
        url: "".concat(BASE_URL_SMALL, "21zhuakuang.png"),
        code: '(抓狂)'
      }, {
        id: 32,
        name: 'mini-23',
        url: "".concat(BASE_URL_SMALL, "22yun.png"),
        code: '(晕)'
      }, {
        id: 33,
        name: 'mini-24',
        url: "".concat(BASE_URL_SMALL, "23duzui.png"),
        code: '(嘟嘴)'
      }, {
        id: 34,
        name: 'mini-25',
        url: "".concat(BASE_URL_SMALL, "24deyi.png"),
        code: '(得意)'
      }, {
        id: 35,
        name: 'mini-26',
        url: "".concat(BASE_URL_SMALL, "25wasai.png"),
        code: '(哇塞)'
      }, {
        id: 36,
        name: 'mini-27',
        url: "".concat(BASE_URL_SMALL, "26hanxiao.png"),
        code: '(憨笑)'
      }, {
        id: 37,
        name: 'mini-28',
        url: "".concat(BASE_URL_SMALL, "27jinghuang.png"),
        code: '(惊慌)'
      }, {
        id: 38,
        name: 'mini-29',
        url: "".concat(BASE_URL_SMALL, "28yinxian.png"),
        code: '(阴险)'
      }, {
        id: 39,
        name: 'mini-30',
        url: "".concat(BASE_URL_SMALL, "29meigui.png"),
        code: '(玫瑰)'
      }, {
        id: 40,
        name: 'mini-31',
        url: "".concat(BASE_URL_SMALL, "30chigua.png"),
        code: '(吃瓜)'
      }, {
        id: 41,
        name: 'mini-32',
        url: "".concat(BASE_URL_SMALL, "31xiaoku.png"),
        code: '(笑哭)'
      }, {
        id: 42,
        name: 'mini-33',
        url: "".concat(BASE_URL_SMALL, "32feiwen.png"),
        code: '(飞吻)'
      }, {
        id: 43,
        name: 'mini-34',
        url: "".concat(BASE_URL_SMALL, "33haode.png"),
        code: '(好的)'
      }, {
        id: 44,
        name: 'mini-35',
        url: "".concat(BASE_URL_SMALL, "34liekai.png"),
        code: '(裂开)'
      }, {
        id: 45,
        name: 'mini-36',
        url: "".concat(BASE_URL_SMALL, "35wuyu.png"),
        code: '(无语)'
      }, {
        id: 46,
        name: 'mini-37',
        url: "".concat(BASE_URL_SMALL, "36huanhu.png"),
        code: '(欢呼)'
      }, {
        id: 47,
        name: 'mini-38',
        url: "".concat(BASE_URL_SMALL, "37emo.png"),
        code: '(emo)'
      }],
      // ✅ 修改：替换为阿里云图标路径
      iconLikeUrl: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/like.png',
      iconLikedUrl: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/liked.png',
      iconCommentUrl: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/chat.png'
    };
  },
  onLoad: function onLoad(options) {
    // ... (不变)
    if (options.id) {
      this.postId = options.id;
      this.loadPostDetail();
      this.loadComments();
    }
  },
  onUnload: function onUnload() {
    var pages = getCurrentPages();
    console.log('imhere');
    if (pages.length > 1) {
      var prevPage = pages[pages.length - 2];

      // 🔥 关键：通过 $vm 访问 Vue 组件实例
      var prevPageVm = prevPage.$vm || prevPage;

      // 检查方法是否存在
      if (prevPageVm && typeof prevPageVm.updatePostLikeStatus === 'function') {
        var _this$post, _this$post2;
        prevPageVm.updatePostLikeStatus({
          postId: parseInt(this.postId),
          isLiked: this.post ? this.post.isLiked : false,
          likeCount: this.post ? this.post.likeCount : 0
        });
        console.log('✅ 已传递点赞状态:', {
          postId: this.postId,
          isLiked: (_this$post = this.post) === null || _this$post === void 0 ? void 0 : _this$post.isLiked,
          likeCount: (_this$post2 = this.post) === null || _this$post2 === void 0 ? void 0 : _this$post2.likeCount
        });
      } else {
        console.warn('⚠️ 上一个页面没有 updatePostLikeStatus 方法');
      }
    }
  },
  methods: {
    // ... (togglePostLike, parsePostTags, handleReplyClick 不变) ...
    togglePostLike: function togglePostLike() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _yield$uni$$http$post, res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                if (_this.openid) {
                  _context.next = 4;
                  break;
                }
                uni.switchTab({
                  url: '/pages/my/my'
                });
                return _context.abrupt("return");
              case 4:
                _context.next = 6;
                return uni.$http.post('/posts/like', {
                  post_id: _this.postId,
                  openid: _this.openid,
                  is_like: !_this.post.isLiked
                });
              case 6:
                _yield$uni$$http$post = _context.sent;
                res = _yield$uni$$http$post.data;
                if (res.meta.status === 200) {
                  _this.post.isLiked = !_this.post.isLiked;
                  _this.post.likeCount = res.message.like_count || 0;
                }
                _context.next = 14;
                break;
              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                console.error('点赞失败:', _context.t0);
              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }))();
    },
    parsePostTags: function parsePostTags(properties) {
      if (!properties || properties === 'null') {
        return [];
      }
      if (typeof properties === 'string') {
        return properties.split(',').filter(function (tag) {
          return tag.trim();
        });
      }
      if (Array.isArray(properties)) {
        return properties;
      }
      return [];
    },
    handleReplyClick: function handleReplyClick(comment) {
      var mainComment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!this.openid) {
        uni.switchTab({
          url: '/pages/my/my'
        });
        return;
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
    parseEmojiContent: function parseEmojiContent(content) {
      var _this2 = this;
      if (!content) return '';
      var html = content;
      var allEmojis = [].concat((0, _toConsumableArray2.default)(this.emojiList.map(function (e) {
        return _objectSpread(_objectSpread({}, e), {}, {
          size: '2.8em'
        });
      })), (0, _toConsumableArray2.default)(this.miniEmojiList.map(function (e) {
        return _objectSpread(_objectSpread({}, e), {}, {
          size: '1.8em'
        });
      })));
      allEmojis.forEach(function (emoji) {
        var regex = new RegExp(_this2.escapeRegExp(emoji.code), 'g');
        html = html.replace(regex, "<img src=\"".concat(emoji.url, "\" style=\"width: ").concat(emoji.size, "; height: ").concat(emoji.size, "; vertical-align: text-bottom; margin: 0 2rpx; display: inline-block;\" />"));
      });
      return html;
    },
    escapeRegExp: function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    toggleEmojiPicker: function toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    insertEmoji: function insertEmoji(emoji) {
      this.commentContent += emoji.code;
    },
    onInputChange: function onInputChange(e) {
      this.commentContent = e.detail.value;
    },
    // ✅ 新增：切换表情集
    switchEmojiSet: function switchEmojiSet(set) {
      this.currentEmojiSet = set;
    },
    // ... (loadPostDetail, loadComments, loadMoreReplies, toggleCommentLike, showQuickReply, hideReplyInput, submitComment, deleteComment, formatPostTime, formatCommentTime, previewImage, reportUser, showPostMenu, deletePost 不变) ...
    loadPostDetail: function loadPostDetail() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _yield$uni$$http$get, res;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return uni.$http.get('/posts/detail', {
                  id: _this3.postId,
                  openid: _this3.openid
                });
              case 3:
                _yield$uni$$http$get = _context2.sent;
                res = _yield$uni$$http$get.data;
                if (res.meta.status === 200) {
                  _this3.post = _objectSpread(_objectSpread({}, res.message), {}, {
                    created_at: _this3.formatPostTime(res.message.created_at)
                  });
                } else {
                  uni.showToast({
                    title: res.meta.msg || '加载失败',
                    icon: 'none'
                  });
                }
                _context2.next = 12;
                break;
              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                console.error('加载帖子详情失败:', _context2.t0);
                uni.showToast({
                  title: '加载失败，请检查网络',
                  icon: 'none'
                });
              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }))();
    },
    loadComments: function loadComments() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _yield$uni$$http$get2, res;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                if (!_this4.isLoadingComments) {
                  _context3.next = 3;
                  break;
                }
                return _context3.abrupt("return");
              case 3:
                _this4.isLoadingComments = true;
                _context3.next = 6;
                return uni.$http.get('/posts/comments', {
                  post_id: _this4.postId,
                  page: _this4.commentPage,
                  pageSize: _this4.commentPageSize,
                  current_user_openid: _this4.openid
                });
              case 6:
                _yield$uni$$http$get2 = _context3.sent;
                res = _yield$uni$$http$get2.data;
                if (res.meta.status === 200) {
                  _this4.commentList = _this4.commentList.concat(res.message.list);
                  _this4.commentHasMore = res.message.hasMore;
                }
                _context3.next = 15;
                break;
              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                console.error('加载评论失败:', _context3.t0);
                uni.showToast({
                  title: '加载评论失败',
                  icon: 'none'
                });
              case 15:
                _context3.prev = 15;
                _this4.isLoadingComments = false;
                return _context3.finish(15);
              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11, 15, 18]]);
      }))();
    },
    loadMoreReplies: function loadMoreReplies(comment) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var _yield$uni$$http$get3, res, commentIndex;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                if (!_this5.loadingMoreReplies.has(comment.id)) {
                  _context4.next = 3;
                  break;
                }
                return _context4.abrupt("return");
              case 3:
                _this5.loadingMoreReplies.add(comment.id);
                _context4.next = 6;
                return uni.$http.get('/posts/replies', {
                  comment_id: comment.id,
                  page: 1,
                  pageSize: 50,
                  current_user_openid: _this5.openid
                });
              case 6:
                _yield$uni$$http$get3 = _context4.sent;
                res = _yield$uni$$http$get3.data;
                if (res.meta.status === 200) {
                  commentIndex = _this5.commentList.findIndex(function (c) {
                    return c.id === comment.id;
                  });
                  if (commentIndex !== -1) {
                    _this5.commentList[commentIndex].replies = res.message.list;
                    _this5.commentList[commentIndex].has_more_replies = false;
                  }
                }
                _context4.next = 15;
                break;
              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                console.error('加载更多回复失败:', _context4.t0);
                uni.showToast({
                  title: '加载失败',
                  icon: 'none'
                });
              case 15:
                _context4.prev = 15;
                _this5.loadingMoreReplies.delete(comment.id);
                return _context4.finish(15);
              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 11, 15, 18]]);
      }))();
    },
    toggleCommentLike: function toggleCommentLike(comment) {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var _yield$uni$$http$post2, res;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                if (_this6.openid) {
                  _context5.next = 4;
                  break;
                }
                uni.switchTab({
                  url: '/pages/my/my'
                });
                return _context5.abrupt("return");
              case 4:
                _context5.next = 6;
                return uni.$http.post('/posts/comment/like', {
                  comment_id: comment.id,
                  user_openid: _this6.openid
                });
              case 6:
                _yield$uni$$http$post2 = _context5.sent;
                res = _yield$uni$$http$post2.data;
                if (res.meta.status === 200) {
                  comment.is_liked = res.message.is_liked;
                  if (res.message.is_liked) {
                    comment.like_count = (comment.like_count || 0) + 1;
                  } else {
                    comment.like_count = Math.max((comment.like_count || 0) - 1, 0);
                  }
                }
                _context5.next = 15;
                break;
              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](0);
                console.error('点赞操作失败:', _context5.t0);
                uni.showToast({
                  title: '操作失败',
                  icon: 'none'
                });
              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 11]]);
      }))();
    },
    showQuickReply: function showQuickReply() {
      if (!this.openid) {
        uni.switchTab({
          url: '/pages/my/my'
        });
        return;
      }
      this.replyTarget = null;
      this.commentContent = '';
      this.showReplyModal = true;
      this.showEmojiPicker = false;
    },
    hideReplyInput: function hideReplyInput() {
      this.showReplyModal = false;
      this.showEmojiPicker = false;
      this.replyTarget = null;
      this.commentContent = '';
    },
    submitComment: function submitComment() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var content, params, _yield$uni$$http$post3, res, _error$response, _error$response$data, _error$response$data$;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                if (_this7.openid) {
                  _context6.next = 4;
                  break;
                }
                uni.switchTab({
                  url: '/pages/my/my'
                });
                return _context6.abrupt("return");
              case 4:
                content = _this7.commentContent.trim();
                if (content) {
                  _context6.next = 8;
                  break;
                }
                uni.showToast({
                  title: _this7.replyTarget ? '请输入回复内容' : '请输入评论内容',
                  icon: 'none'
                });
                return _context6.abrupt("return");
              case 8:
                if (!_this7.isSubmittingComment) {
                  _context6.next = 10;
                  break;
                }
                return _context6.abrupt("return");
              case 10:
                _this7.isSubmittingComment = true;
                params = {
                  post_id: _this7.postId,
                  openid: _this7.userBase.openid,
                  nickname: _this7.userBase.nickname || '用户',
                  avatar: _this7.userBase.avatarUrl || '',
                  content: content
                };
                if (_this7.replyTarget) {
                  params.parent_id = _this7.replyTarget.parent_id;
                  params.reply_to_openid = _this7.replyTarget.user_openid;
                  params.reply_to_nickname = _this7.replyTarget.nickname;
                }
                console.log('提交参数:', params);
                _context6.next = 16;
                return uni.$http.post('/posts/comment', params);
              case 16:
                _yield$uni$$http$post3 = _context6.sent;
                res = _yield$uni$$http$post3.data;
                if (!(res.meta.status === 201)) {
                  _context6.next = 30;
                  break;
                }
                _this7.commentContent = '';
                _this7.hideReplyInput();
                _this7.commentList = [];
                _this7.commentPage = 1;
                _this7.commentHasMore = true;
                _context6.next = 26;
                return _this7.loadComments();
              case 26:
                if (!_this7.replyTarget && _this7.post) {
                  _this7.post.commentCount += 1;
                }
                uni.showToast({
                  title: _this7.replyTarget ? '回复成功' : '评论成功',
                  icon: 'success'
                });
                _context6.next = 31;
                break;
              case 30:
                uni.showToast({
                  title: res.meta.msg || '提交失败',
                  icon: 'none'
                });
              case 31:
                _context6.next = 38;
                break;
              case 33:
                _context6.prev = 33;
                _context6.t0 = _context6["catch"](0);
                console.error('提交失败:', _context6.t0);
                console.error('错误详情:', _context6.t0.response || _context6.t0);
                uni.showToast({
                  title: ((_error$response = _context6.t0.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : (_error$response$data$ = _error$response$data.meta) === null || _error$response$data$ === void 0 ? void 0 : _error$response$data$.msg) || '提交失败，请重试',
                  icon: 'none'
                });
              case 38:
                _context6.prev = 38;
                _this7.isSubmittingComment = false;
                return _context6.finish(38);
              case 41:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 33, 38, 41]]);
      }))();
    },
    deleteComment: function deleteComment(commentId) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                uni.showModal({
                  title: '删除评论',
                  content: '确定要删除这条评论吗？',
                  success: function () {
                    var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(res) {
                      var _yield$uni$$http$dele, result;
                      return _regenerator.default.wrap(function _callee7$(_context7) {
                        while (1) {
                          switch (_context7.prev = _context7.next) {
                            case 0:
                              if (!res.confirm) {
                                _context7.next = 13;
                                break;
                              }
                              _context7.prev = 1;
                              _context7.next = 4;
                              return uni.$http.delete('/posts/comment', {
                                comment_id: commentId,
                                openid: _this8.openid
                              });
                            case 4:
                              _yield$uni$$http$dele = _context7.sent;
                              result = _yield$uni$$http$dele.data;
                              if (result.meta.status === 200) {
                                _this8.commentList = [];
                                _this8.commentPage = 1;
                                _this8.commentHasMore = true;
                                _this8.loadComments();
                                if (_this8.post) {
                                  _this8.loadPostDetail();
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
                              _context7.next = 13;
                              break;
                            case 9:
                              _context7.prev = 9;
                              _context7.t0 = _context7["catch"](1);
                              console.error('删除评论失败:', _context7.t0);
                              uni.showToast({
                                title: '删除失败',
                                icon: 'none'
                              });
                            case 13:
                            case "end":
                              return _context7.stop();
                          }
                        }
                      }, _callee7, null, [[1, 9]]);
                    }));
                    function success(_x) {
                      return _success.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    formatPostTime: function formatPostTime(timestamp) {
      if (!timestamp) return '';
      if (typeof timestamp === 'string') {
        var _date = new Date(timestamp);
        return "".concat(_date.getMonth() + 1, "\u6708").concat(_date.getDate(), "\u65E5 ").concat(_date.getHours(), ":").concat(String(_date.getMinutes()).padStart(2, '0'));
      }
      var date = new Date(timestamp);
      return "".concat(date.getMonth() + 1, "\u6708").concat(date.getDate(), "\u65E5 ").concat(date.getHours(), ":").concat(String(date.getMinutes()).padStart(2, '0'));
    },
    formatCommentTime: function formatCommentTime(timestamp) {
      if (!timestamp) return '';
      if (typeof timestamp === 'string') {
        timestamp = new Date(timestamp).getTime();
      }
      var now = Date.now();
      var diff = now - timestamp;
      var minute = 60 * 1000;
      var hour = 60 * minute;
      var day = 24 * hour;
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
    previewImage: function previewImage(images, current) {
      uni.previewImage({
        urls: images,
        current: current
      });
    },
    reportUser: function reportUser() {
      var _this9 = this;
      if (!this.post || !this.openid) {
        uni.showToast({
          title: '无法获取用户信息',
          icon: 'none'
        });
        return;
      }
      uni.showModal({
        title: '请输入您举报该用户的理由:',
        editable: true,
        placeholderText: '例如：涉及人身攻击、广告等',
        success: function () {
          var _success2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(res) {
            var reason, reportData, _yield$uni$$http$post4, apiRes;
            return _regenerator.default.wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    if (!res.confirm) {
                      _context9.next = 23;
                      break;
                    }
                    reason = res.content.trim();
                    if (reason) {
                      _context9.next = 5;
                      break;
                    }
                    uni.showToast({
                      title: '举报理由不能为空',
                      icon: 'none'
                    });
                    return _context9.abrupt("return");
                  case 5:
                    reportData = {
                      reporter_openid: _this9.openid,
                      reported_openid: _this9.post.user_openid,
                      post_id: _this9.postId,
                      reason: reason
                    };
                    console.log('提交举报:', reportData);
                    _context9.prev = 7;
                    _context9.next = 10;
                    return uni.$http.post('/users/report', reportData);
                  case 10:
                    _yield$uni$$http$post4 = _context9.sent;
                    apiRes = _yield$uni$$http$post4.data;
                    if (!(apiRes.meta.status === 201)) {
                      _context9.next = 16;
                      break;
                    }
                    uni.showToast({
                      title: '举报成功，我们会尽快核实',
                      icon: 'success'
                    });
                    _context9.next = 17;
                    break;
                  case 16:
                    throw new Error(apiRes.meta.msg || '举报失败');
                  case 17:
                    _context9.next = 23;
                    break;
                  case 19:
                    _context9.prev = 19;
                    _context9.t0 = _context9["catch"](7);
                    console.error('举报失败:', _context9.t0);
                    uni.showToast({
                      title: _context9.t0.message || '举报时发生错误',
                      icon: 'none'
                    });
                  case 23:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9, null, [[7, 19]]);
          }));
          function success(_x2) {
            return _success2.apply(this, arguments);
          }
          return success;
        }()
      });
    },
    showPostMenu: function showPostMenu() {
      var _this10 = this;
      if (this.post && this.post.user_openid === this.openid) {
        uni.showActionSheet({
          itemList: ['删除'],
          success: function success(res) {
            if (res.tapIndex === 0) {
              _this10.deletePost();
            }
          }
        });
      }
      if (this.post && this.post.user_openid !== this.openid) {
        uni.showActionSheet({
          itemList: ['举报'],
          success: function success(res) {
            if (res.tapIndex === 0) {
              _this10.reportUser();
            }
          }
        });
      }
    },
    deletePost: function deletePost() {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                uni.showModal({
                  title: '删除帖子',
                  content: '确定要删除这条帖子吗？删除后无法恢复',
                  success: function () {
                    var _success3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(res) {
                      var _yield$uni$$http$dele2, result;
                      return _regenerator.default.wrap(function _callee10$(_context10) {
                        while (1) {
                          switch (_context10.prev = _context10.next) {
                            case 0:
                              if (!res.confirm) {
                                _context10.next = 13;
                                break;
                              }
                              _context10.prev = 1;
                              _context10.next = 4;
                              return uni.$http.delete('/posts/delete', {
                                post_id: _this11.postId,
                                openid: _this11.openid
                              });
                            case 4:
                              _yield$uni$$http$dele2 = _context10.sent;
                              result = _yield$uni$$http$dele2.data;
                              if (result.meta.status === 200) {
                                uni.showToast({
                                  title: '删除成功',
                                  icon: 'success'
                                });
                                setTimeout(function () {
                                  uni.navigateBack();
                                }, 1500);
                              } else {
                                uni.showToast({
                                  title: result.meta.msg || '删除失败',
                                  icon: 'none'
                                });
                              }
                              _context10.next = 13;
                              break;
                            case 9:
                              _context10.prev = 9;
                              _context10.t0 = _context10["catch"](1);
                              console.error('删除帖子失败:', _context10.t0);
                              uni.showToast({
                                title: '删除失败',
                                icon: 'none'
                              });
                            case 13:
                            case "end":
                              return _context10.stop();
                          }
                        }
                      }, _callee10, null, [[1, 9]]);
                    }));
                    function success(_x3) {
                      return _success3.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    }
  },
  computed: _objectSpread(_objectSpread({}, (0, _vuex.mapState)('m_user', ['openid', 'userBase', 'token'])), {}, {
    // ✅ 新增：计算属性，用于显示当前表情集
    displayEmojiList: function displayEmojiList() {
      return this.currentEmojiSet === 'large' ? this.emojiList : this.miniEmojiList;
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 180:
/*!************************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/post-detail/post-detail.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./post-detail.vue?vue&type=style&index=0&lang=scss& */ 181);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_post_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 181:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/post-detail/post-detail.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[174,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/post-detail/post-detail.js.map