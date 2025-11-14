(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg/topic-detail/topic-detail"],{

/***/ 263:
/*!***********************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/main.js?{"page":"subpkg%2Ftopic-detail%2Ftopic-detail"} ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _topicDetail = _interopRequireDefault(__webpack_require__(/*! ./subpkg/topic-detail/topic-detail.vue */ 264));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_topicDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 264:
/*!****************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/topic-detail/topic-detail.vue ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _topic_detail_vue_vue_type_template_id_4321b2da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./topic-detail.vue?vue&type=template&id=4321b2da& */ 265);
/* harmony import */ var _topic_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./topic-detail.vue?vue&type=script&lang=js& */ 267);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _topic_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _topic_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _topic_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./topic-detail.vue?vue&type=style&index=0&lang=scss& */ 269);
/* harmony import */ var _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _topic_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _topic_detail_vue_vue_type_template_id_4321b2da___WEBPACK_IMPORTED_MODULE_0__["render"],
  _topic_detail_vue_vue_type_template_id_4321b2da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _topic_detail_vue_vue_type_template_id_4321b2da___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg/topic-detail/topic-detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 265:
/*!***********************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/topic-detail/topic-detail.vue?vue&type=template&id=4321b2da& ***!
  \***********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_template_id_4321b2da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./topic-detail.vue?vue&type=template&id=4321b2da& */ 266);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_template_id_4321b2da___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_template_id_4321b2da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_template_id_4321b2da___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_template_id_4321b2da___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 266:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/topic-detail/topic-detail.vue?vue&type=template&id=4321b2da& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniIcons: function () {
      return Promise.all(/*! import() | uni_modules/uni-icons/components/uni-icons/uni-icons */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-icons/components/uni-icons/uni-icons.vue */ 356))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.post ? _vm.post.images && _vm.post.images.length > 0 : null
  var g1 = _vm.post && g0 ? _vm.post.images.length : null
  var l0 = _vm.post ? _vm.parsePostTags(_vm.post.properties) : null
  var l2 = _vm.__map(_vm.commentList, function (comment, __i0__) {
    var $orig = _vm.__get_orig(comment)
    var m0 = _vm.parseEmojiContent(comment.content)
    var m1 = _vm.formatCommentTime(comment.created_at)
    var g2 = comment.replies && comment.replies.length > 0
    var l1 = g2
      ? _vm.__map(comment.replies, function (reply, __i1__) {
          var $orig = _vm.__get_orig(reply)
          var m2 = _vm.parseEmojiContent(reply.content)
          var m3 = _vm.formatCommentTime(reply.created_at)
          return {
            $orig: $orig,
            m2: m2,
            m3: m3,
          }
        })
      : null
    var g3 = g2 && comment.has_more_replies ? comment.replies.length : null
    return {
      $orig: $orig,
      m0: m0,
      m1: m1,
      g2: g2,
      l1: l1,
      g3: g3,
    }
  })
  var g4 = _vm.commentList.length
  var g5 = _vm.commentList.length === 0 && !_vm.isLoadingComments
  var g6 = _vm.showReplyModal ? _vm.commentContent.length : null
  var g7 = _vm.showReplyModal ? _vm.commentContent.trim() : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        l0: l0,
        l2: l2,
        g4: g4,
        g5: g5,
        g6: g6,
        g7: g7,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 267:
/*!*****************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/topic-detail/topic-detail.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./topic-detail.vue?vue&type=script&lang=js& */ 268);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 268:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/topic-detail/topic-detail.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// ✅ 基础 URL
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
      iconLikeUrl: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/like.png',
      iconLikedUrl: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/liked.png',
      iconCommentUrl: 'https://wait00.oss-cn-shanghai.aliyuncs.com/label/chat.png',
      // ✅ 新增：当前表情集
      currentEmojiSet: 'mini',
      // ✅ 新增：大表情
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
      // ✅ 修改：重命名为 miniEmojiList
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
      swiperHeight: 750,
      // swiper 默认高度
      imageHeights: {},
      // 存储每张图片的计算高度
      currentSwiperIndex: 0 // 当前 swiper 索引
    };
  },
  onLoad: function onLoad(options) {
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
  computed: _objectSpread(_objectSpread({}, (0, _vuex.mapState)('m_user', ['openid', 'userBase', 'token'])), {}, {
    // ✅ 新增：计算属性，用于显示当前表情集
    displayEmojiList: function displayEmojiList() {
      return this.currentEmojiSet === 'large' ? this.emojiList : this.miniEmojiList;
    }
  }),
  methods: (0, _defineProperty2.default)({
    // 🔥 新增：解析帖子标签
    parsePostTags: function parsePostTags(properties) {
      if (!properties || properties === 'null') {
        return [];
      }

      // 如果是字符串，按逗号分割
      if (typeof properties === 'string') {
        return properties.split(',').filter(function (tag) {
          return tag.trim();
        });
      }

      // 如果是数组，直接返回
      if (Array.isArray(properties)) {
        return properties;
      }
      return [];
    },
    // 分享到微信
    onShareAppMessage: function onShareAppMessage() {
      if (!this.post) {
        return {
          title: '精彩话题分享',
          path: "/subpkg/topic-detail/topic-detail?id=".concat(this.postId)
        };
      }

      // 获取分享图片（优先使用帖子第一张图片）
      var imageUrl = '';
      if (this.post.images && this.post.images.length > 0) {
        imageUrl = this.post.images[0];
      }
      return {
        title: this.post.content.substring(0, 30) + (this.post.content.length > 30 ? '...' : ''),
        path: "/subpkg/topic-detail/topic-detail?id=".concat(this.postId),
        imageUrl: imageUrl
      };
    },
    // swiper 切换时更新高度
    onSwiperChange: function onSwiperChange(e) {
      var index = e.detail.current;
      this.currentSwiperIndex = index;

      // 如果该图片已加载过，使用缓存的高度
      if (this.imageHeights[index]) {
        this.swiperHeight = this.imageHeights[index];
      }
    },
    // 图片加载完成，计算高度
    onImageLoad: function onImageLoad(e, index) {
      var _e$detail = e.detail,
        width = _e$detail.width,
        height = _e$detail.height;

      // 获取屏幕宽度
      var systemInfo = uni.getSystemInfoSync();
      var screenWidth = systemInfo.windowWidth;

      // 计算图片显示高度（单位：rpx）
      // 750rpx 是设计稿宽度，screenWidth 是实际屏幕宽度
      var imageHeight = Math.floor(height / width * 750);

      // 限制最大高度为 1200rpx，最小高度为 400rpx
      var finalHeight = Math.max(400, Math.min(1200, imageHeight));

      // 存储每张图片的高度
      this.imageHeights[index] = finalHeight;

      // 如果是第一张图片或当前显示的图片，更新 swiper 高度
      if (index === 0 || index === this.currentSwiperIndex) {
        this.swiperHeight = finalHeight;
      }
      console.log("\u56FE\u7247 ".concat(index, " \u9AD8\u5EA6:"), finalHeight);
    },
    // 加载帖子详情
    loadPostDetail: function loadPostDetail() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _yield$uni$$http$get, res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return uni.$http.get('/posts/detail', {
                  id: _this.postId,
                  openid: _this.openid
                });
              case 3:
                _yield$uni$$http$get = _context.sent;
                res = _yield$uni$$http$get.data;
                if (res.meta.status === 200) {
                  _this.post = _objectSpread(_objectSpread({}, res.message), {}, {
                    created_at: _this.formatPostTime(res.message.created_at),
                    images: _this.processPostImages(res.message.images)
                  });
                }
                _context.next = 12;
                break;
              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.error('加载失败:', _context.t0);
                uni.showToast({
                  title: '加载失败',
                  icon: 'none'
                });
              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }))();
    },
    // 加载评论列表
    loadComments: function loadComments() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _yield$uni$$http$get2, res;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                if (!_this2.isLoadingComments) {
                  _context2.next = 3;
                  break;
                }
                return _context2.abrupt("return");
              case 3:
                _this2.isLoadingComments = true;
                _context2.next = 6;
                return uni.$http.get('/posts/comments', {
                  post_id: _this2.postId,
                  page: _this2.commentPage,
                  pageSize: _this2.commentPageSize,
                  current_user_openid: _this2.openid
                });
              case 6:
                _yield$uni$$http$get2 = _context2.sent;
                res = _yield$uni$$http$get2.data;
                if (res.meta.status === 200) {
                  _this2.commentList = _this2.commentList.concat(res.message.list);
                  _this2.commentHasMore = res.message.hasMore;
                }
                _context2.next = 14;
                break;
              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                console.error('加载评论失败:', _context2.t0);
              case 14:
                _context2.prev = 14;
                _this2.isLoadingComments = false;
                return _context2.finish(14);
              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11, 14, 17]]);
      }))();
    },
    // 加载更多评论（滚动触底）
    loadMoreComments: function loadMoreComments() {
      if (!this.commentHasMore || this.isLoadingComments) return;
      this.commentPage++;
      this.loadComments();
    },
    // 加载更多回复
    loadMoreReplies: function loadMoreReplies(comment) {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _yield$uni$$http$get3, res, commentIndex;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                if (!_this3.loadingMoreReplies.has(comment.id)) {
                  _context3.next = 3;
                  break;
                }
                return _context3.abrupt("return");
              case 3:
                _this3.loadingMoreReplies.add(comment.id);
                _context3.next = 6;
                return uni.$http.get('/posts/replies', {
                  comment_id: comment.id,
                  page: 1,
                  pageSize: 50,
                  current_user_openid: _this3.openid
                });
              case 6:
                _yield$uni$$http$get3 = _context3.sent;
                res = _yield$uni$$http$get3.data;
                if (res.meta.status === 200) {
                  commentIndex = _this3.commentList.findIndex(function (c) {
                    return c.id === comment.id;
                  });
                  if (commentIndex !== -1) {
                    _this3.commentList[commentIndex].replies = res.message.list;
                    _this3.commentList[commentIndex].has_more_replies = false;
                  }
                }
                _context3.next = 14;
                break;
              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                console.error('加载失败:', _context3.t0);
              case 14:
                _context3.prev = 14;
                _this3.loadingMoreReplies.delete(comment.id);
                return _context3.finish(14);
              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11, 14, 17]]);
      }))();
    },
    // 点赞帖子
    togglePostLike: function togglePostLike() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var _yield$uni$$http$post, res;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                if (_this4.openid) {
                  _context4.next = 4;
                  break;
                }
                uni.switchTab({
                  url: '/pages/my/my'
                });
                return _context4.abrupt("return");
              case 4:
                _context4.next = 6;
                return uni.$http.post('/posts/like', {
                  post_id: _this4.postId,
                  openid: _this4.openid,
                  is_like: !_this4.post.isLiked
                });
              case 6:
                _yield$uni$$http$post = _context4.sent;
                res = _yield$uni$$http$post.data;
                if (res.meta.status === 200) {
                  _this4.post.isLiked = !_this4.post.isLiked;
                  _this4.post.likeCount = res.message.like_count || 0;
                }
                _context4.next = 14;
                break;
              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                console.error('点赞失败:', _context4.t0);
              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 11]]);
      }))();
    },
    // 点赞评论
    toggleCommentLike: function toggleCommentLike(comment) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var _yield$uni$$http$post2, res;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                if (_this5.openid) {
                  _context5.next = 4;
                  break;
                }
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                return _context5.abrupt("return");
              case 4:
                _context5.next = 6;
                return uni.$http.post('/posts/comment/like', {
                  comment_id: comment.id,
                  user_openid: _this5.openid
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
                _context5.next = 14;
                break;
              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](0);
                console.error('操作失败:', _context5.t0);
              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 11]]);
      }))();
    },
    // 显示快速回复
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
    // ✅ 修改：重命名为 handleReplyClick 并简化
    handleReplyClick: function handleReplyClick(targetComment) {
      var mainComment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!this.openid) {
        uni.switchTab({
          url: '/pages/my/my'
        });
        return;
      }

      // 如果有 mainComment 参数，说明是在回复别人的回复
      if (mainComment) {
        this.replyTarget = {
          id: targetComment.id,
          // 被回复的回复ID
          nickname: targetComment.nickname,
          // 被回复者昵称
          user_openid: targetComment.user_openid,
          // 被回复者openid
          parent_id: mainComment.id // 主评论ID（重要：用于归类）
        };

        console.log('回复别人的回复:', this.replyTarget);
      }
      // 否则是回复主评论
      else {
        this.replyTarget = {
          id: targetComment.id,
          // 被回复的评论ID
          nickname: targetComment.nickname,
          // 被回复者昵称
          user_openid: targetComment.user_openid,
          // 被回复者openid
          parent_id: targetComment.id // 主评论ID就是自己
        };

        console.log('回复主评论:', this.replyTarget);
      }
      this.commentContent = '';
      this.showReplyModal = true;
      this.showEmojiPicker = false;
    },
    // 隐藏回复输入框
    hideReplyInput: function hideReplyInput() {
      this.showReplyModal = false;
      this.showEmojiPicker = false;
      this.replyTarget = null;
      this.commentContent = '';
    },
    // ✅ 修改：提交评论 (使用 userBase.openid)
    submitComment: function submitComment() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var content, params, _yield$uni$$http$post3, res;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                if (_this6.openid) {
                  _context6.next = 4;
                  break;
                }
                uni.switchTab({
                  url: '/pages/my/my'
                });
                return _context6.abrupt("return");
              case 4:
                content = _this6.commentContent.trim();
                if (content) {
                  _context6.next = 8;
                  break;
                }
                uni.showToast({
                  title: '请输入内容',
                  icon: 'none'
                });
                return _context6.abrupt("return");
              case 8:
                if (!_this6.isSubmittingComment) {
                  _context6.next = 10;
                  break;
                }
                return _context6.abrupt("return");
              case 10:
                _this6.isSubmittingComment = true;
                params = {
                  post_id: _this6.postId,
                  openid: _this6.userBase.openid,
                  // ✅ 使用 userBase.openid
                  nickname: _this6.userBase.nickname || '用户',
                  avatar: _this6.userBase.avatarUrl || '',
                  content: content
                }; // 如果是回复（无论是回复评论还是回复回复）
                if (_this6.replyTarget) {
                  params.parent_id = _this6.replyTarget.parent_id; // 归属的主评论ID
                  params.reply_to_openid = _this6.replyTarget.user_openid; // 被回复者的openid
                  params.reply_to_nickname = _this6.replyTarget.nickname; // 被回复者的昵称
                }

                console.log('提交评论参数:', params);
                _context6.next = 16;
                return uni.$http.post('/posts/comment', params);
              case 16:
                _yield$uni$$http$post3 = _context6.sent;
                res = _yield$uni$$http$post3.data;
                if (res.meta.status === 201) {
                  // 刷新评论列表
                  _this6.commentList = [];
                  _this6.commentPage = 1;
                  _this6.commentHasMore = true;
                  _this6.hideReplyInput();
                  _this6.loadComments();

                  // 更新评论数
                  if (_this6.post) {
                    _this6.post.commentCount += 1;
                  }
                  uni.showToast({
                    title: _this6.replyTarget ? '回复成功' : '评论成功',
                    icon: 'success'
                  });
                }
                _context6.next = 25;
                break;
              case 21:
                _context6.prev = 21;
                _context6.t0 = _context6["catch"](0);
                console.error('提交失败:', _context6.t0);
                uni.showToast({
                  title: '提交失败',
                  icon: 'none'
                });
              case 25:
                _context6.prev = 25;
                _this6.isSubmittingComment = false;
                return _context6.finish(25);
              case 28:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 21, 25, 28]]);
      }))();
    },
    // 新增：通用的跳转用户主页方法
    gotoUserProfile: function gotoUserProfile(userInfo) {
      if (!this.openid) {
        uni.switchTab({
          url: '/pages/my/my'
        });
        return;
      }
      if (!userInfo) return;

      // 如果是当前用户自己
      if (userInfo.user_openid === this.openid) {
        uni.navigateTo({
          url: '/subpkg/profile/profile'
        });
        return;
      }

      // 跳转到其他用户主页
      var payload = {
        openid: userInfo.user_openid,
        nickname: userInfo.nickname,
        avatarUrl: userInfo.avatar
      };
      var encodedPayload = encodeURIComponent(JSON.stringify(payload));
      uni.navigateTo({
        url: "/subpkg/profile/profile?publisher=".concat(encodedPayload)
      });
    },
    // 删除评论
    deleteComment: function deleteComment(commentId) {
      var _this7 = this;
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
                                _context7.next = 12;
                                break;
                              }
                              _context7.prev = 1;
                              _context7.next = 4;
                              return uni.$http.delete('/posts/comment', {
                                comment_id: commentId,
                                openid: _this7.openid
                              });
                            case 4:
                              _yield$uni$$http$dele = _context7.sent;
                              result = _yield$uni$$http$dele.data;
                              if (result.meta.status === 200) {
                                _this7.commentList = [];
                                _this7.commentPage = 1;
                                _this7.commentHasMore = true;
                                _this7.loadComments();
                                if (_this7.post) {
                                  _this7.loadPostDetail();
                                }
                                uni.showToast({
                                  title: '删除成功',
                                  icon: 'success'
                                });
                              }
                              _context7.next = 12;
                              break;
                            case 9:
                              _context7.prev = 9;
                              _context7.t0 = _context7["catch"](1);
                              console.error('删除失败:', _context7.t0);
                            case 12:
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
    // 显示帖子菜单
    showPostMenu: function showPostMenu() {
      var _this8 = this;
      if (this.post && this.post.user_openid === this.openid) {
        uni.showActionSheet({
          itemList: ['删除话题'],
          success: function success(res) {
            if (res.tapIndex === 0) {
              _this8.deletePost();
            }
          }
        });
      }
      if (this.post && this.post.user_openid !== this.openid) {
        uni.showActionSheet({
          itemList: ['举报'],
          success: function success(res) {
            if (res.tapIndex === 0) {
              _this8.reportUser();
            }
          }
        });
      }
    },
    // 举报用户
    reportUser: function reportUser() {
      var _this9 = this;
      // 安全检查
      if (!this.post || !this.openid) {
        uni.showToast({
          title: '无法获取用户信息',
          icon: 'none'
        });
        return;
      }

      // 弹出一个可编辑的输入框
      uni.showModal({
        title: '请输入您举报该用户的理由:',
        editable: true,
        // 显示输入框
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
                    reason = res.content.trim(); // 获取输入框内容
                    // 验证理由是否为空
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
                    // 准备提交到后端的数据
                    reportData = {
                      reporter_openid: _this9.openid,
                      // 举报人 (当前用户)
                      reported_openid: _this9.post.user_openid,
                      // 被举报人 (帖子作者)
                      post_id: _this9.postId,
                      // 相关帖子ID
                      reason: reason // 举报理由
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
    // 删除帖子
    deletePost: function deletePost() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                uni.showModal({
                  title: '删除话题',
                  content: '确定要删除这个话题吗？删除后无法恢复',
                  success: function () {
                    var _success3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(res) {
                      var _yield$uni$$http$dele2, result;
                      return _regenerator.default.wrap(function _callee10$(_context10) {
                        while (1) {
                          switch (_context10.prev = _context10.next) {
                            case 0:
                              if (!res.confirm) {
                                _context10.next = 12;
                                break;
                              }
                              _context10.prev = 1;
                              _context10.next = 4;
                              return uni.$http.delete('/posts/delete', {
                                post_id: _this10.postId,
                                openid: _this10.openid
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
                              }
                              _context10.next = 12;
                              break;
                            case 9:
                              _context10.prev = 9;
                              _context10.t0 = _context10["catch"](1);
                              console.error('删除失败:', _context10.t0);
                            case 12:
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
    },
    // 切换表情面板
    toggleEmojiPicker: function toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    // 插入表情
    insertEmoji: function insertEmoji(emoji) {
      this.commentContent += emoji.code;
    },
    // ✅ 新增：监听输入
    onInputChange: function onInputChange(e) {
      this.commentContent = e.detail.value;
    },
    // ✅ 新增：切换表情集
    switchEmojiSet: function switchEmojiSet(set) {
      this.currentEmojiSet = set;
    },
    // ✅ 修改：解析表情内容 (使用新尺寸 1.8em 和 2.8em)
    parseEmojiContent: function parseEmojiContent(content) {
      var _this11 = this;
      if (!content) return '';
      var html = content;

      // 合并所有表情并指定尺寸
      var allEmojis = [].concat((0, _toConsumableArray2.default)(this.emojiList.map(function (e) {
        return _objectSpread(_objectSpread({}, e), {}, {
          size: '4em'
        });
      })), (0, _toConsumableArray2.default)(this.miniEmojiList.map(function (e) {
        return _objectSpread(_objectSpread({}, e), {}, {
          size: '1.8em'
        });
      })));
      allEmojis.forEach(function (emoji) {
        var regex = new RegExp(_this11.escapeRegExp(emoji.code), 'g');
        html = html.replace(regex, // 使用各自的尺寸
        "<img src=\"".concat(emoji.url, "\" style=\"width: ").concat(emoji.size, "; height: ").concat(emoji.size, "; vertical-align: text-bottom; margin: 0 2rpx; display: inline-block;\" />"));
      });
      return html;
    },
    escapeRegExp: function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    // 处理图片数据
    processPostImages: function processPostImages(images) {
      if (!images) return [];
      var imageArray = [];
      if (typeof images === 'string') {
        try {
          imageArray = JSON.parse(images);
        } catch (e) {
          return [];
        }
      } else if (Array.isArray(images)) {
        imageArray = images;
      }
      return imageArray.filter(function (img) {
        return img;
      });
    },
    // 格式化时间
    formatPostTime: function formatPostTime(timestamp) {
      if (!timestamp) return '';
      var date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);
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
    // 预览图片
    previewImage: function previewImage(images, current) {
      uni.previewImage({
        urls: images,
        current: current
      });
    }
  }, "gotoUserProfile", function gotoUserProfile() {
    if (!this.openid) {
      uni.switchTab({
        url: '/pages/my/my'
      });
      return;
    }
    if (!this.post) return;
    if (this.post.user_openid === this.openid) {
      uni.navigateTo({
        url: '/subpkg/profile/profile'
      });
      return;
    }
    var userInfo = {
      openid: this.post.user_openid,
      nickname: this.post.nickname,
      avatarUrl: this.post.avatar
    };
    var payload = encodeURIComponent(JSON.stringify(userInfo));
    uni.navigateTo({
      url: "/subpkg/profile/profile?publisher=".concat(payload)
    });
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 269:
/*!**************************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/topic-detail/topic-detail.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./topic-detail.vue?vue&type=style&index=0&lang=scss& */ 270);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_topic_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 270:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/topic-detail/topic-detail.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[263,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/topic-detail/topic-detail.js.map