(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg/goods_detail/goods_detail"],{

/***/ 73:
/*!***********************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/main.js?{"page":"subpkg%2Fgoods_detail%2Fgoods_detail"} ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _goods_detail = _interopRequireDefault(__webpack_require__(/*! ./subpkg/goods_detail/goods_detail.vue */ 74));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_goods_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 74:
/*!****************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/goods_detail/goods_detail.vue ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _goods_detail_vue_vue_type_template_id_18739e8c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./goods_detail.vue?vue&type=template&id=18739e8c& */ 75);
/* harmony import */ var _goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./goods_detail.vue?vue&type=script&lang=js& */ 77);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _goods_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./goods_detail.vue?vue&type=style&index=0&lang=scss& */ 79);
/* harmony import */ var _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _goods_detail_vue_vue_type_template_id_18739e8c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _goods_detail_vue_vue_type_template_id_18739e8c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _goods_detail_vue_vue_type_template_id_18739e8c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg/goods_detail/goods_detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 75:
/*!***********************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/goods_detail/goods_detail.vue?vue&type=template&id=18739e8c& ***!
  \***********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_template_id_18739e8c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./goods_detail.vue?vue&type=template&id=18739e8c& */ 76);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_template_id_18739e8c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_template_id_18739e8c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_template_id_18739e8c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_template_id_18739e8c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 76:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/goods_detail/goods_detail.vue?vue&type=template&id=18739e8c& ***!
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
    mySearch: function () {
      return __webpack_require__.e(/*! import() | components/my-search/my-search */ "components/my-search/my-search").then(__webpack_require__.bind(null, /*! @/components/my-search/my-search.vue */ 413))
    },
    uniIcons: function () {
      return Promise.all(/*! import() | uni_modules/uni-icons/components/uni-icons/uni-icons */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-icons/components/uni-icons/uni-icons.vue */ 391))
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
  var g0 = (_vm.goods_info.pics && _vm.goods_info.pics.length) || 0
  var g1 = _vm.comments.length
  var l1 = _vm.__map(_vm.displayedComments, function (comment, index) {
    var $orig = _vm.__get_orig(comment)
    var m0 = _vm.RelativeTime(comment.created_at)
    var m1 = _vm.parseEmoji(comment.content)
    var g2 = comment.replies && comment.replies.length > 0
    var l0 = g2
      ? _vm.__map(comment.displayReplies, function (reply, rIndex) {
          var $orig = _vm.__get_orig(reply)
          var m2 = _vm.parseEmoji(reply.content)
          return {
            $orig: $orig,
            m2: m2,
          }
        })
      : null
    var g3 = g2 ? comment.replies.length > 1 && !comment.showAllReplies : null
    var g4 = g2 && g3 ? comment.replies.length : null
    return {
      $orig: $orig,
      m0: m0,
      m1: m1,
      g2: g2,
      l0: l0,
      g3: g3,
      g4: g4,
    }
  })
  var g5 = _vm.comments.length
  var l3 = _vm.__map(_vm.comments, function (comment, index) {
    var $orig = _vm.__get_orig(comment)
    var m3 = _vm.RelativeTime(comment.created_at)
    var m4 = _vm.parseEmoji(comment.content)
    var g6 = comment.replies && comment.replies.length > 0
    var l2 = g6
      ? _vm.__map(comment.displayReplies, function (reply, rIndex) {
          var $orig = _vm.__get_orig(reply)
          var m5 = _vm.parseEmoji(reply.content)
          return {
            $orig: $orig,
            m5: m5,
          }
        })
      : null
    var g7 = g6 ? comment.replies.length > 1 && !comment.showAllReplies : null
    var g8 = g6 && g7 ? comment.replies.length : null
    return {
      $orig: $orig,
      m3: m3,
      m4: m4,
      g6: g6,
      l2: l2,
      g7: g7,
      g8: g8,
    }
  })
  var g9 = _vm.newComment.trim()
  var g10 = _vm.newReply.length
  var g11 = _vm.newReply.trim()
  var g12 = _vm.quickComment.length
  var g13 = _vm.quickComment.trim()
  var g14 = _vm.deliveryAddress.length
  var g15 = _vm.deliveryAddress.trim()
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.setAsDefault = !_vm.setAsDefault
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        l1: l1,
        g5: g5,
        l3: l3,
        g9: g9,
        g10: g10,
        g11: g11,
        g12: g12,
        g13: g13,
        g14: g14,
        g15: g15,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 77:
/*!*****************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/goods_detail/goods_detail.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./goods_detail.vue?vue&type=script&lang=js& */ 78);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 78:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/goods_detail/goods_detail.vue?vue&type=script&lang=js& ***!
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
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _vuex = __webpack_require__(/*! vuex */ 33);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// import uniIcon from '@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue'
var _default = {
  // components: {
  //     uniIcon
  //   }
  data: function data() {
    var _ref;
    return _ref = {
      goods_info: {},
      addstr: '22号宿舍楼',
      publisher_info: {},
      isFollowing: false,
      isCollected: false,
      searchHeight: 44,
      bottomBarHeight: 60,
      reviews: [{
        userAvatar: '/images/1.jpg',
        username: '来自中国湖北...',
        time: '7天前',
        content: '五星好评。\n物美价廉'
      }, {
        userAvatar: '/images/2.jpg',
        username: '来自中国安徽...',
        time: '8天前',
        content: '没问题。😍😍😍😍'
      }],
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
      goodsCategories: []
    }, (0, _defineProperty2.default)(_ref, "showReplyPanel", false), (0, _defineProperty2.default)(_ref, "replyToUser", ''), (0, _defineProperty2.default)(_ref, "newReply", ''), (0, _defineProperty2.default)(_ref, "replyTarget", null), (0, _defineProperty2.default)(_ref, "replyType", ''), (0, _defineProperty2.default)(_ref, "currentImageIndex", 0), (0, _defineProperty2.default)(_ref, "showQuickReplyPanel", false), (0, _defineProperty2.default)(_ref, "quickComment", ''), (0, _defineProperty2.default)(_ref, "hideSearchBar", false), (0, _defineProperty2.default)(_ref, "lastScrollTop", 0), (0, _defineProperty2.default)(_ref, "scrollThreshold", 120), (0, _defineProperty2.default)(_ref, "showEmojiPicker", false), (0, _defineProperty2.default)(_ref, "currentInputType", ''), (0, _defineProperty2.default)(_ref, "emojiList", [{
      id: 1,
      url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-1.png',
      code: '[微笑]'
    }, {
      id: 2,
      url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-2.png',
      code: '[大笑]'
    }, {
      id: 3,
      url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-3.png',
      code: '[笑哭]'
    }, {
      id: 4,
      url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-4.png',
      code: '[难过]'
    }, {
      id: 5,
      url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-5.png',
      code: '[大哭]'
    }, {
      id: 6,
      url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-6.png',
      code: '[疑问]'
    }, {
      id: 7,
      url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-7.png',
      code: '[爱心]'
    }, {
      id: 8,
      url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-8.png',
      code: '[得意]'
    }, {
      id: 9,
      url: 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-9.png',
      code: '[惊恐]'
    }]), (0, _defineProperty2.default)(_ref, "showBuyPanel", false), (0, _defineProperty2.default)(_ref, "deliveryAddress", ''), (0, _defineProperty2.default)(_ref, "setAsDefault", false), (0, _defineProperty2.default)(_ref, "defaultAddress", ''), _ref;
  },
  onLoad: function onLoad(options) {
    var _this = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var code, queryObj, _yield$uni$$http$get, res;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.goods_id = options.goods_id;
              _context.next = 3;
              return _this.getIfCollected();
            case 3:
              _context.next = 5;
              return _this.getGoodsDetail(_this.goods_id);
            case 5:
              _context.next = 7;
              return _this.getIfFollowed();
            case 7:
              _context.next = 9;
              return _this.getPublisher();
            case 9:
              _this.getGoodsList();
              _this.saveHistory();

              // 初始化留言数据
              _this.comments = _this.goods_info.comment;
              _this.comments = _this.comments.map(function (comment) {
                return _objectSpread(_objectSpread({}, comment), {}, {
                  isLiked: false,
                  showAllReplies: false,
                  displayReplies: comment.replies ? comment.replies.slice(0, 1) : []
                });
              });
              if (!_this.token) {
                _context.next = 22;
                break;
              }
              code = _this.openid;
              queryObj = {
                code: code
              };
              _context.next = 18;
              return uni.$http.get('/users/userinfo', queryObj);
            case 18:
              _yield$uni$$http$get = _context.sent;
              res = _yield$uni$$http$get.data;
              if (res.meta.status === 200) {
                console.log(res.message);
                _this.updateUserBase(res.message);
              }
              _this.getGoodsList();
            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  methods: _objectSpread(_objectSpread({}, (0, _vuex.mapMutations)('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase'])), {}, {
    // 显示帖子菜单
    showPostMenu: function showPostMenu() {
      var _this2 = this;
      uni.showActionSheet({
        itemList: ['举报'],
        success: function success(res) {
          if (res.tapIndex === 0) {
            _this2.reportUser();
          }
        }
      });
    },
    // 举报用户
    reportUser: function reportUser() {
      var _this3 = this;
      // 安全检查
      if (!this.openid) {
        // 弹出登录提示框
        uni.showModal({
          title: '提示',
          content: '需要登录才能体验更多内容哦',
          cancelText: '取消',
          confirmText: '登录',
          success: function success(res) {
            if (res.confirm) {
              // 用户点击了"登录"按钮
              uni.switchTab({
                url: '/pages/my/my'
              });
            }
            // 用户点击了"取消"按钮，不做任何操作
          }
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
          var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(res) {
            var reason, reportData, _yield$uni$$http$post, apiRes;
            return _regenerator.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!res.confirm) {
                      _context2.next = 23;
                      break;
                    }
                    reason = res.content.trim(); // 获取输入框内容
                    // 验证理由是否为空
                    if (reason) {
                      _context2.next = 5;
                      break;
                    }
                    uni.showToast({
                      title: '举报理由不能为空',
                      icon: 'none'
                    });
                    return _context2.abrupt("return");
                  case 5:
                    // 准备提交到后端的数据
                    reportData = {
                      reporter_openid: _this3.openid,
                      // 举报人 (当前用户)
                      reported_openid: _this3.goods_info.publisher_id,
                      // 被举报人 (帖子作者)
                      post_id: 0,
                      goods_id: _this3.goods_id,
                      // 相关帖子ID
                      reason: reason // 举报理由
                    };

                    console.log('提交举报:', reportData);
                    _context2.prev = 7;
                    _context2.next = 10;
                    return uni.$http.post('/users/report', reportData);
                  case 10:
                    _yield$uni$$http$post = _context2.sent;
                    apiRes = _yield$uni$$http$post.data;
                    if (!(apiRes.meta.status === 201)) {
                      _context2.next = 16;
                      break;
                    }
                    uni.showToast({
                      title: '举报成功，我们会尽快核实',
                      icon: 'success'
                    });
                    _context2.next = 17;
                    break;
                  case 16:
                    throw new Error(apiRes.meta.msg || '举报失败');
                  case 17:
                    _context2.next = 23;
                    break;
                  case 19:
                    _context2.prev = 19;
                    _context2.t0 = _context2["catch"](7);
                    console.error('举报失败:', _context2.t0);
                    uni.showToast({
                      title: _context2.t0.message || '举报时发生错误',
                      icon: 'none'
                    });
                  case 23:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, null, [[7, 19]]);
          }));
          function success(_x) {
            return _success.apply(this, arguments);
          }
          return success;
        }()
      });
    },
    // 🔥 新增：分享给好友
    onShareAppMessage: function onShareAppMessage(res) {
      if (!this.openid) {
        // 弹出登录提示框
        uni.showModal({
          title: '提示',
          content: '需要登录才能体验更多内容哦',
          cancelText: '取消',
          confirmText: '登录',
          success: function success(res) {
            if (res.confirm) {
              // 用户点击了"登录"按钮
              uni.switchTab({
                url: '/pages/my/my'
              });
            }
            // 用户点击了"取消"按钮，不做任何操作
          }
        });

        return;
      }
      return {
        title: this.goods_info.goods_name || '发现一个好物推荐给你',
        path: "/subpkg/goods_detail/goods_detail?goods_id=".concat(this.goods_id),
        imageUrl: this.goods_info.goods_big_logo || ''
      };
    },
    // 🔥 新增：显示表情选择器
    showEmojiSelector: function showEmojiSelector(type) {
      this.currentInputType = type;
      this.showEmojiPicker = true;
    },
    // 🔥 新增：关闭表情选择器
    closeEmojiPicker: function closeEmojiPicker() {
      this.showEmojiPicker = false;
    },
    // 🔥 修改：选择表情后自动关闭
    selectEmoji: function selectEmoji(emoji) {
      // 根据当前输入框类型插入表情代码
      switch (this.currentInputType) {
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
    parseEmoji: function parseEmoji(content) {
      if (!content) return '';
      var result = content;

      // 遍历所有表情，替换表情代码为图片标签
      this.emojiList.forEach(function (emoji) {
        var regex = new RegExp(emoji.code.replace(/\[/g, '\\[').replace(/\]/g, '\\]'), 'g');
        result = result.replace(regex, "<img src=\"".concat(emoji.url, "\" class=\"emoji-image\" />"));
      });
      return result;
    },
    // 🔥 新增：监听滚动事件
    onScroll: function onScroll(e) {
      var scrollTop = e.detail.scrollTop;

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
    showQuickReply: function showQuickReply() {
      if (!this.openid) {
        // 弹出登录提示框
        uni.showModal({
          title: '提示',
          content: '需要登录才能体验更多内容哦',
          cancelText: '取消',
          confirmText: '登录',
          success: function success(res) {
            if (res.confirm) {
              // 用户点击了"登录"按钮
              uni.switchTab({
                url: '/pages/my/my'
              });
            }
            // 用户点击了"取消"按钮，不做任何操作
          }
        });

        return;
      }
      this.showQuickReplyPanel = true;
      this.quickComment = '';
    },
    // 🔥 新增:关闭快速留言输入框
    closeQuickReply: function closeQuickReply() {
      this.showQuickReplyPanel = false;
      this.quickComment = '';
    },
    // 🔥 新增：监听轮播图切换
    onSwiperChange: function onSwiperChange(e) {
      this.currentImageIndex = e.detail.current;
    },
    // 🔥🔥🔥 新增:获取分类图标 🔥🔥🔥
    getCategoryIcon: function getCategoryIcon(category) {
      var iconMap = {
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
      };
      return iconMap[category] || '🏷️';
    },
    // 🔥 修改：显示购买确认弹窗
    ShowBuyPanel: function ShowBuyPanel() {
      if (!this.openid) {
        // 弹出登录提示框
        uni.showModal({
          title: '提示',
          content: '需要登录才能体验更多内容哦',
          cancelText: '取消',
          confirmText: '登录',
          success: function success(res) {
            if (res.confirm) {
              // 用户点击了"登录"按钮
              uni.switchTab({
                url: '/pages/my/my'
              });
            }
            // 用户点击了"取消"按钮，不做任何操作
          }
        });

        return;
      }

      // 加载默认地址
      this.loadDefaultAddress();
      this.showBuyPanel = true;
    },
    // 🔥 新增：关闭购买弹窗
    closeBuyPanel: function closeBuyPanel() {
      this.showBuyPanel = false;
    },
    // 🔥 新增：加载默认地址
    loadDefaultAddress: function loadDefaultAddress() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var defaultAddr;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                try {
                  // 从本地存储获取默认地址
                  defaultAddr = uni.getStorageSync('default_delivery_address_' + _this4.openid);
                  if (defaultAddr) {
                    _this4.defaultAddress = defaultAddr;
                    _this4.deliveryAddress = defaultAddr;
                  }
                } catch (error) {
                  console.error('加载默认地址失败:', error);
                }
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // 🔥 新增：保存默认地址
    saveDefaultAddress: function saveDefaultAddress() {
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
    confirmPurchase: function confirmPurchase() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var address, orderInfo, _yield$uni$$http$post2, res, orderNumber, _yield$uni$$http$post3, res2, payInfo, _yield$uni$requestPay, _yield$uni$requestPay2, err, succ, _yield$uni$$http$post4, res3;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (_this5.openid) {
                  _context4.next = 3;
                  break;
                }
                // 弹出登录提示框
                uni.showModal({
                  title: '提示',
                  content: '需要登录才能体验更多内容哦',
                  cancelText: '取消',
                  confirmText: '登录',
                  success: function success(res) {
                    if (res.confirm) {
                      // 用户点击了"登录"按钮
                      uni.switchTab({
                        url: '/pages/my/my'
                      });
                    }
                    // 用户点击了"取消"按钮，不做任何操作
                  }
                });
                return _context4.abrupt("return");
              case 3:
                // 验证地址
                address = _this5.deliveryAddress.trim();
                if (address) {
                  _context4.next = 7;
                  break;
                }
                uni.showToast({
                  title: '请输入收货地址',
                  icon: 'none'
                });
                return _context4.abrupt("return");
              case 7:
                // 如果勾选了设为默认，保存地址
                if (_this5.setAsDefault) {
                  _this5.saveDefaultAddress();
                }

                // 关闭弹窗
                _this5.closeBuyPanel();

                // 执行原有的支付逻辑
                _context4.prev = 9;
                // 1. 创建订单
                orderInfo = {
                  order_price: 0.01,
                  consignee_addr: address,
                  // 使用用户输入的地址
                  goods: _this5.goods_info,
                  openid: _this5.openid
                };
                _context4.next = 13;
                return uni.$http.post('/orders/create', orderInfo);
              case 13:
                _yield$uni$$http$post2 = _context4.sent;
                res = _yield$uni$$http$post2.data;
                if (!(res.meta.status !== 200)) {
                  _context4.next = 17;
                  break;
                }
                return _context4.abrupt("return", uni.$showMsg('创建订单失败！'));
              case 17:
                orderNumber = res.message.order_number; // 2. 订单预支付
                _context4.next = 20;
                return uni.$http.post('/orders/req_unifiedorder', {
                  order_number: orderNumber
                });
              case 20:
                _yield$uni$$http$post3 = _context4.sent;
                res2 = _yield$uni$$http$post3.data;
                if (!(res2.meta.status !== 200)) {
                  _context4.next = 24;
                  break;
                }
                return _context4.abrupt("return", uni.$showMsg('预付订单生成失败！'));
              case 24:
                payInfo = res2.message.pay; // 3. 发起微信支付
                _context4.next = 27;
                return uni.requestPayment(payInfo);
              case 27:
                _yield$uni$requestPay = _context4.sent;
                _yield$uni$requestPay2 = (0, _slicedToArray2.default)(_yield$uni$requestPay, 2);
                err = _yield$uni$requestPay2[0];
                succ = _yield$uni$requestPay2[1];
                if (!err) {
                  _context4.next = 33;
                  break;
                }
                return _context4.abrupt("return", uni.$showMsg('订单未支付！'));
              case 33:
                _context4.next = 35;
                return uni.$http.post('/orders/chkOrder', {
                  order_number: orderNumber
                });
              case 35:
                _yield$uni$$http$post4 = _context4.sent;
                res3 = _yield$uni$$http$post4.data;
                if (!(res3.meta.status !== 200)) {
                  _context4.next = 39;
                  break;
                }
                return _context4.abrupt("return", uni.$showMsg('订单未支付！'));
              case 39:
                uni.showToast({
                  title: '订单支付完成！',
                  icon: 'success'
                });
                _context4.next = 46;
                break;
              case 42:
                _context4.prev = 42;
                _context4.t0 = _context4["catch"](9);
                console.error('支付失败:', _context4.t0);
                uni.showToast({
                  title: '支付失败，请重试',
                  icon: 'none'
                });
              case 46:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[9, 42]]);
      }))();
    },
    payOrder: function payOrder() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var orderInfo, _yield$uni$$http$post5, res, orderNumber, _yield$uni$$http$post6, res2, payInfo, _yield$uni$requestPay3, _yield$uni$requestPay4, err, succ, _yield$uni$$http$post7, res3;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // 1. 创建订单
                // 1.1 组织订单的信息对象
                orderInfo = {
                  // order_price: this.checkedGoodsAmount,
                  order_price: 0.01,
                  consignee_addr: _this6.addstr,
                  goods: _this6.goods_info,
                  openid: _this6.openid
                }; // 1.2 发起请求创建订单
                _context5.next = 3;
                return uni.$http.post('/orders/create', orderInfo);
              case 3:
                _yield$uni$$http$post5 = _context5.sent;
                res = _yield$uni$$http$post5.data;
                if (!(res.meta.status !== 200)) {
                  _context5.next = 7;
                  break;
                }
                return _context5.abrupt("return", uni.$showMsg('创建订单失败！'));
              case 7:
                // 1.3 得到服务器响应的“订单编号”
                orderNumber = res.message.order_number; // 2. 订单预支付
                // 2.1 发起请求获取订单的支付信息
                _context5.next = 10;
                return uni.$http.post('/orders/req_unifiedorder', {
                  order_number: orderNumber
                });
              case 10:
                _yield$uni$$http$post6 = _context5.sent;
                res2 = _yield$uni$$http$post6.data;
                if (!(res2.meta.status !== 200)) {
                  _context5.next = 14;
                  break;
                }
                return _context5.abrupt("return", uni.$showMsg('预付订单生成失败！'));
              case 14:
                // 2.3 得到订单支付相关的必要参数
                payInfo = res2.message.pay; // 3. 发起微信支付
                // 3.1 调用 uni.requestPayment() 发起微信支付
                _context5.next = 17;
                return uni.requestPayment(payInfo);
              case 17:
                _yield$uni$requestPay3 = _context5.sent;
                _yield$uni$requestPay4 = (0, _slicedToArray2.default)(_yield$uni$requestPay3, 2);
                err = _yield$uni$requestPay4[0];
                succ = _yield$uni$requestPay4[1];
                if (!err) {
                  _context5.next = 23;
                  break;
                }
                return _context5.abrupt("return", uni.$showMsg('订单未支付！'));
              case 23:
                _context5.next = 25;
                return uni.$http.post('/orders/chkOrder', {
                  order_number: orderNumber
                });
              case 25:
                _yield$uni$$http$post7 = _context5.sent;
                res3 = _yield$uni$$http$post7.data;
                if (!(res3.meta.status !== 200)) {
                  _context5.next = 29;
                  break;
                }
                return _context5.abrupt("return", uni.$showMsg('订单未支付！'));
              case 29:
                // 3.5 检测到订单支付完成
                uni.showToast({
                  title: '订单支付完成！',
                  icon: 'success'
                });
              case 30:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    // 新增：显示回复输入框
    showReplyInput: function showReplyInput(index, comment) {
      if (!this.openid) {
        // 弹出登录提示框
        uni.showModal({
          title: '提示',
          content: '需要登录才能体验更多内容哦',
          cancelText: '取消',
          confirmText: '登录',
          success: function success(res) {
            if (res.confirm) {
              // 用户点击了"登录"按钮
              uni.switchTab({
                url: '/pages/my/my'
              });
            }
            // 用户点击了"取消"按钮，不做任何操作
          }
        });

        return;
      }
      this.replyToCommentIndex = index;
      this.replyToComment = comment;
      this.replyToUser = comment.nickname;
      this.showReplyPanel = true;
      this.newReply = '';
    },
    // 新增：关闭回复输入框
    closeReply: function closeReply() {
      this.showReplyPanel = false;
      this.newReply = '';
      this.replyToCommentIndex = null;
      this.replyToComment = null;
      this.replyToUser = '';
    },
    sendReply: function sendReply() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var content, isTextSafe, currentTimestamp, targetCommentId, newReplyObj, targetComment, _yield$uni$$http$post8, res;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (_this7.openid) {
                  _context6.next = 3;
                  break;
                }
                // 弹出登录提示框
                uni.showModal({
                  title: '提示',
                  content: '需要登录才能体验更多内容哦',
                  cancelText: '取消',
                  confirmText: '登录',
                  success: function success(res) {
                    if (res.confirm) {
                      // 用户点击了"登录"按钮
                      uni.switchTab({
                        url: '/pages/my/my'
                      });
                    }
                    // 用户点击了"取消"按钮，不做任何操作
                  }
                });
                return _context6.abrupt("return");
              case 3:
                content = _this7.newReply.trim();
                if (content) {
                  _context6.next = 7;
                  break;
                }
                uni.showToast({
                  title: '请输入回复内容',
                  icon: 'none'
                });
                return _context6.abrupt("return");
              case 7:
                // 🔥 新增：文本内容安全检测
                uni.showLoading({
                  title: '检测内容...',
                  mask: true
                });
                _context6.next = 10;
                return _this7.checkTextSafety(content);
              case 10:
                isTextSafe = _context6.sent;
                uni.hideLoading();
                if (isTextSafe) {
                  _context6.next = 15;
                  break;
                }
                uni.showModal({
                  title: '内容违规',
                  content: '回复内容包含违规信息，请修改后重试',
                  showCancel: false,
                  confirmText: '我知道了'
                });
                return _context6.abrupt("return");
              case 15:
                // ✅ 检测通过，继续发送回复
                currentTimestamp = Math.floor(Date.now() / 1000);
                targetCommentId = _this7.replyToComment.comment_id;
                newReplyObj = {
                  reply_id: 'reply_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                  user_openid: _this7.userBase.openid,
                  nickname: _this7.userBase.nickname,
                  avatarUrl: _this7.userBase.avatarUrl || '/images/1.jpg',
                  content: content,
                  created_at: currentTimestamp
                };
                targetComment = _this7.comments.find(function (c) {
                  return c.comment_id === targetCommentId;
                });
                if (targetComment) {
                  _context6.next = 22;
                  break;
                }
                uni.showToast({
                  title: '留言不存在',
                  icon: 'none'
                });
                return _context6.abrupt("return");
              case 22:
                if (!targetComment.replies) {
                  targetComment.replies = [];
                }
                targetComment.replies.push(newReplyObj);
                if (!targetComment.showAllReplies) {
                  targetComment.displayReplies = targetComment.replies.slice(0, 1);
                } else {
                  targetComment.displayReplies = targetComment.replies;
                }
                _this7.closeReply();

                // 保存到后端
                _context6.prev = 26;
                _context6.next = 29;
                return uni.$http.post('/goods/reply', {
                  comment_id: targetCommentId,
                  user_openid: _this7.userBase.openid,
                  nickname: _this7.userBase.nickname,
                  avatarUrl: _this7.userBase.avatarUrl || '/images/1.jpg',
                  content: content,
                  created_at: currentTimestamp,
                  goods_id: _this7.goods_id
                });
              case 29:
                _yield$uni$$http$post8 = _context6.sent;
                res = _yield$uni$$http$post8.data;
                if (res.meta.status !== 200) {
                  console.error('回复保存失败:', res.meta.msg);
                  uni.showToast({
                    title: '回复保存失败',
                    icon: 'none'
                  });
                }
                _context6.next = 37;
                break;
              case 34:
                _context6.prev = 34;
                _context6.t0 = _context6["catch"](26);
                console.error('调用回复API失败:', _context6.t0);
              case 37:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[26, 34]]);
      }))();
    },
    // 新增：切换显示所有回复
    toggleShowAllReplies: function toggleShowAllReplies(index) {
      if (!this.openid) {
        // 弹出登录提示框
        uni.showModal({
          title: '提示',
          content: '需要登录才能体验更多内容哦',
          cancelText: '取消',
          confirmText: '登录',
          success: function success(res) {
            if (res.confirm) {
              // 用户点击了"登录"按钮
              uni.switchTab({
                url: '/pages/my/my'
              });
            }
            // 用户点击了"取消"按钮，不做任何操作
          }
        });

        return;
      } else {
        this.comments[index].showAllReplies = !this.comments[index].showAllReplies;
        if (this.comments[index].showAllReplies) {
          this.comments[index].displayReplies = this.comments[index].replies;
        } else {
          this.comments[index].displayReplies = this.comments[index].replies.slice(0, 1);
        }
      }
    },
    gotoPublisherProfile: function gotoPublisherProfile() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var payload;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (_this8.openid) {
                  _context7.next = 5;
                  break;
                }
                // 弹出登录提示框
                uni.showModal({
                  title: '提示',
                  content: '需要登录才能体验更多内容哦',
                  cancelText: '取消',
                  confirmText: '登录',
                  success: function success(res) {
                    if (res.confirm) {
                      // 用户点击了"登录"按钮
                      uni.switchTab({
                        url: '/pages/my/my'
                      });
                    }
                    // 用户点击了"取消"按钮，不做任何操作
                  }
                });
                return _context7.abrupt("return");
              case 5:
                payload = encodeURIComponent(JSON.stringify(_this8.publisher_info));
                uni.navigateTo({
                  url: "/subpkg/profile/profile?publisher=".concat(payload)
                });
              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    gotoProfile: function gotoProfile(openid) {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var queryObj, _yield$uni$$http$get2, res, user_info, payload;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (_this9.openid) {
                  _context8.next = 5;
                  break;
                }
                // 弹出登录提示框
                uni.showModal({
                  title: '提示',
                  content: '需要登录才能体验更多内容哦',
                  cancelText: '取消',
                  confirmText: '登录',
                  success: function success(res) {
                    if (res.confirm) {
                      // 用户点击了"登录"按钮
                      uni.switchTab({
                        url: '/pages/my/my'
                      });
                    }
                    // 用户点击了"取消"按钮，不做任何操作
                  }
                });
                return _context8.abrupt("return");
              case 5:
                queryObj = {
                  code: openid
                };
                _context8.next = 8;
                return uni.$http.get('/users/userinfo', queryObj);
              case 8:
                _yield$uni$$http$get2 = _context8.sent;
                res = _yield$uni$$http$get2.data;
                if (res.meta.status === 200) {
                  user_info = res.message;
                  payload = encodeURIComponent(JSON.stringify(user_info));
                  uni.navigateTo({
                    url: "/subpkg/profile/profile?publisher=".concat(payload)
                  });
                }
              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    getIfFollowed: function getIfFollowed() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var queryObj, _yield$uni$$http$get3, res;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!_this10.openid) {
                  _context9.next = 7;
                  break;
                }
                queryObj = {
                  code: _this10.openid,
                  publisher_id: _this10.goods_info.publisher_id
                };
                _context9.next = 4;
                return uni.$http.get('/users/iffollow', queryObj);
              case 4:
                _yield$uni$$http$get3 = _context9.sent;
                res = _yield$uni$$http$get3.data;
                if (res.meta.status === 200) {
                  _this10.isFollowing = res.data.isFollowing;
                }
              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    getIfCollected: function getIfCollected() {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var queryObj, _yield$uni$$http$get4, res;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!_this11.openid) {
                  _context10.next = 7;
                  break;
                }
                queryObj = {
                  code: _this11.openid,
                  goods_id: _this11.goods_id
                };
                _context10.next = 4;
                return uni.$http.get('/users/ifcollect', queryObj);
              case 4:
                _yield$uni$$http$get4 = _context10.sent;
                res = _yield$uni$$http$get4.data;
                if (res.meta.status === 200) {
                  _this11.isCollected = res.data.isCollected;
                }
              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
    getGoodsDetail: function getGoodsDetail(goods_id) {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        var _yield$uni$$http$get5, res;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return uni.$http.get('/goods/detail', {
                  goods_id: goods_id
                });
              case 2:
                _yield$uni$$http$get5 = _context11.sent;
                res = _yield$uni$$http$get5.data;
                if (!(res.meta.status !== 200)) {
                  _context11.next = 6;
                  break;
                }
                return _context11.abrupt("return", uni.$showMsg());
              case 6:
                _this12.goods_info = res.message[0];
                console.log(_this12.goods_info);
                // 🔥🔥🔥 解析商品分类(从逗号分隔的字符串转为数组) 🔥🔥🔥
                if (_this12.goods_info.category) {
                  _this12.goodsCategories = _this12.goods_info.category.split(',').filter(function (c) {
                    return c.trim() !== '';
                  });
                } else {
                  _this12.goodsCategories = [];
                }
              case 9:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    },
    getGoodsList: function getGoodsList(cb) {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        var _yield$uni$$http$get6, res;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _this13.isloading = true;
                _context12.next = 3;
                return uni.$http.get('/goods/search', _this13.queryObj);
              case 3:
                _yield$uni$$http$get6 = _context12.sent;
                res = _yield$uni$$http$get6.data;
                _this13.isloading = false;
                cb && cb();
                if (!(res.meta.status !== 200)) {
                  _context12.next = 9;
                  break;
                }
                return _context12.abrupt("return", uni.$showMsg());
              case 9:
                _this13.goodsList = [].concat((0, _toConsumableArray2.default)(_this13.goodsList), (0, _toConsumableArray2.default)(res.message.goods));
                _this13.total = res.message.total;
              case 11:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }))();
    },
    saveHistory: function saveHistory() {
      var _this14 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
        var requestBody, _yield$uni$$http$post9, res;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (!_this14.openid) {
                  _context13.next = 6;
                  break;
                }
                requestBody = {
                  code: _this14.openid,
                  goods_id: _this14.goods_id
                };
                _context13.next = 4;
                return uni.$http.post('/users/history', requestBody);
              case 4:
                _yield$uni$$http$post9 = _context13.sent;
                res = _yield$uni$$http$post9.data;
              case 6:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }))();
    },
    getPublisher: function getPublisher() {
      var _this15 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14() {
        var req, _yield$uni$$http$get7, res;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                console.log('hello');
                req = {
                  openid: _this15.goods_info.publisher_id
                };
                _context14.next = 4;
                return uni.$http.get('/users/publisher', req);
              case 4:
                _yield$uni$$http$get7 = _context14.sent;
                res = _yield$uni$$http$get7.data;
                if (res.meta.status === 200) {
                  _this15.publisher_info = res.message;
                }
              case 7:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }))();
    },
    gotoDetail: function gotoDetail(item) {
      var _this16 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15() {
        var _yield$uni$$http$post10, res;
        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                // 1. 先增加浏览次数
                console.log('📊 增加商品浏览次数:', item.goods_id);
                _context15.next = 4;
                return uni.$http.post('/goods/view', {
                  goods_id: item.goods_id,
                  // 可选：添加用户信息用于统计分析
                  user_openid: _this16.openid || null
                });
              case 4:
                _yield$uni$$http$post10 = _context15.sent;
                res = _yield$uni$$http$post10.data;
                if (res.meta.status === 200) {
                  console.log('✅ 浏览次数增加成功');
                } else {
                  console.warn('⚠️ 浏览次数增加失败:', res.meta.msg);
                }
                _context15.next = 12;
                break;
              case 9:
                _context15.prev = 9;
                _context15.t0 = _context15["catch"](0);
                console.error('❌ 浏览次数增加接口错误:', _context15.t0);
                // 即使接口失败也继续跳转，不影响用户体验
              case 12:
                uni.navigateTo({
                  url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
                });
              case 13:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[0, 9]]);
      }))();
    },
    // 修改预览图片方法，同步更新索引
    preview: function preview(i) {
      this.currentImageIndex = i; // 更新当前索引
      uni.previewImage({
        current: i,
        urls: this.goods_info.pics.map(function (x) {
          return x.pics_big + '?x-oss-process=image/quality,q_80';
        })
      });
    },
    gotoSearch: function gotoSearch() {
      if (!this.openid) {
        // 弹出登录提示框
        uni.showModal({
          title: '提示',
          content: '需要登录才能体验更多内容哦',
          cancelText: '取消',
          confirmText: '登录',
          success: function success(res) {
            if (res.confirm) {
              // 用户点击了"登录"按钮
              uni.switchTab({
                url: '/pages/my/my'
              });
            }
            // 用户点击了"取消"按钮，不做任何操作
          }
        });

        return;
      }
      uni.navigateTo({
        url: '/subpkg/search/search'
      });
    },
    toggleFollow: function toggleFollow() {
      var _this17 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16() {
        var url1, query, _yield$uni$$http$post11, res;
        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (_this17.openid) {
                  _context16.next = 5;
                  break;
                }
                // 弹出登录提示框
                uni.showModal({
                  title: '提示',
                  content: '需要登录才能体验更多内容哦',
                  cancelText: '取消',
                  confirmText: '登录',
                  success: function success(res) {
                    if (res.confirm) {
                      // 用户点击了"登录"按钮
                      uni.switchTab({
                        url: '/pages/my/my'
                      });
                    }
                    // 用户点击了"取消"按钮，不做任何操作
                  }
                });
                return _context16.abrupt("return");
              case 5:
                _this17.isFollowing = !_this17.isFollowing;
                url1 = _this17.isFollowing ? '/users/follow' : '/users/unfollow';
                query = {
                  code: _this17.openid,
                  publisher_id: _this17.goods_info.publisher_id
                };
                _context16.next = 10;
                return uni.$http.post(url1, query);
              case 10:
                _yield$uni$$http$post11 = _context16.sent;
                res = _yield$uni$$http$post11.data;
                uni.showToast({
                  title: _this17.isFollowing ? '关注成功' : '取消关注',
                  icon: 'none'
                });
              case 13:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }))();
    },
    toggleLike: function toggleLike(index) {
      if (!this.openid) {
        // 弹出登录提示框
        uni.showModal({
          title: '提示',
          content: '需要登录才能体验更多内容哦',
          cancelText: '取消',
          confirmText: '登录',
          success: function success(res) {
            if (res.confirm) {
              // 用户点击了"登录"按钮
              uni.switchTab({
                url: '/pages/my/my'
              });
            }
            // 用户点击了"取消"按钮，不做任何操作
          }
        });

        return;
      } else {
        this.comments[index].isLiked = !this.comments[index].isLiked;
      }
    },
    openMessage: function openMessage() {
      if (!this.openid) {
        // 弹出登录提示框
        uni.showModal({
          title: '提示',
          content: '需要登录才能体验更多内容哦',
          cancelText: '取消',
          confirmText: '登录',
          success: function success(res) {
            if (res.confirm) {
              // 用户点击了"登录"按钮
              uni.switchTab({
                url: '/pages/my/my'
              });
            }
            // 用户点击了"取消"按钮，不做任何操作
          }
        });

        return;
      } else {
        this.showMessagePanel = true;
      }
    },
    closeMessage: function closeMessage() {
      this.showMessagePanel = false;
    },
    toggleCollect: function toggleCollect() {
      var _this18 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17() {
        var url, queryObj, _yield$uni$$http$post12, res;
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (_this18.openid) {
                  _context17.next = 5;
                  break;
                }
                // 弹出登录提示框
                uni.showModal({
                  title: '提示',
                  content: '需要登录才能体验更多内容哦',
                  cancelText: '取消',
                  confirmText: '登录',
                  success: function success(res) {
                    if (res.confirm) {
                      // 用户点击了"登录"按钮
                      uni.switchTab({
                        url: '/pages/my/my'
                      });
                    }
                    // 用户点击了"取消"按钮，不做任何操作
                  }
                });
                return _context17.abrupt("return");
              case 5:
                _this18.isCollected = !_this18.isCollected;
                url = _this18.isCollected ? '/users/collect' : '/users/uncollect';
                queryObj = {
                  code: _this18.openid,
                  goods_id: _this18.goods_id
                };
                _context17.next = 10;
                return uni.$http.post(url, queryObj);
              case 10:
                _yield$uni$$http$post12 = _context17.sent;
                res = _yield$uni$$http$post12.data;
                uni.showToast({
                  title: _this18.isCollected ? '收藏成功' : '取消收藏',
                  icon: 'none'
                });
              case 13:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }))();
    },
    buyNow: function buyNow() {
      if (!this.openid) {
        // 弹出登录提示框
        uni.showModal({
          title: '提示',
          content: '需要登录才能体验更多内容哦',
          cancelText: '取消',
          confirmText: '登录',
          success: function success(res) {
            if (res.confirm) {
              // 用户点击了"登录"按钮
              uni.switchTab({
                url: '/pages/my/my'
              });
            }
            // 用户点击了"取消"按钮，不做任何操作
          }
        });

        return;
      } else {
        uni.showToast({
          title: '立即购买',
          icon: 'none'
        });
      }
    },
    startChat: function startChat() {
      if (!this.openid) {
        // 弹出登录提示框
        uni.showModal({
          title: '提示',
          content: '需要登录才能体验更多内容哦',
          cancelText: '取消',
          confirmText: '登录',
          success: function success(res) {
            if (res.confirm) {
              // 用户点击了"登录"按钮
              uni.switchTab({
                url: '/pages/my/my'
              });
            }
            // 用户点击了"取消"按钮，不做任何操作
          }
        });

        return;
      } else {
        var payload = encodeURIComponent(JSON.stringify(this.goods_info));
        uni.navigateTo({
          url: "/subpkg/chat/chat?goods_info=".concat(payload)
        });
      }
    },
    sendComment: function sendComment() {
      var _this19 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18() {
        var content, isTextSafe, currentTimestamp, newCommentObj, queryObj, _yield$uni$$http$post13, res, queryObj1, _yield$uni$$http$post14, res1;
        return _regenerator.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                if (_this19.openid) {
                  _context18.next = 3;
                  break;
                }
                // 弹出登录提示框
                uni.showModal({
                  title: '提示',
                  content: '需要登录才能体验更多内容哦',
                  cancelText: '取消',
                  confirmText: '登录',
                  success: function success(res) {
                    if (res.confirm) {
                      // 用户点击了"登录"按钮
                      uni.switchTab({
                        url: '/pages/my/my'
                      });
                    }
                    // 用户点击了"取消"按钮，不做任何操作
                  }
                });
                return _context18.abrupt("return");
              case 3:
                content = _this19.newComment.trim();
                if (content) {
                  _context18.next = 7;
                  break;
                }
                uni.showToast({
                  title: '请输入留言内容',
                  icon: 'none'
                });
                return _context18.abrupt("return");
              case 7:
                // 🔥 新增：文本内容安全检测
                uni.showLoading({
                  title: '检测内容...',
                  mask: true
                });
                _context18.next = 10;
                return _this19.checkTextSafety(content);
              case 10:
                isTextSafe = _context18.sent;
                uni.hideLoading();
                if (isTextSafe) {
                  _context18.next = 15;
                  break;
                }
                uni.showModal({
                  title: '内容违规',
                  content: '留言内容包含违规信息，请修改后重试',
                  showCancel: false,
                  confirmText: '我知道了'
                });
                return _context18.abrupt("return");
              case 15:
                // ✅ 检测通过，继续发送留言
                currentTimestamp = Math.floor(Date.now() / 1000);
                newCommentObj = {
                  comment_id: 'cmt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                  user_openid: _this19.userBase.openid,
                  nickname: _this19.userBase.nickname,
                  avatarUrl: _this19.userBase.avatarUrl,
                  content: content,
                  created_at: currentTimestamp,
                  like_count: 0,
                  replies: [],
                  showAllReplies: false,
                  displayReplies: []
                };
                _this19.comments.unshift(newCommentObj);
                _this19.newComment = '';
                _this19.scrollIntoView = 'msg-0';
                uni.showToast({
                  title: '留言成功',
                  icon: 'success'
                });

                // 保存到后端
                queryObj = {
                  goods_id: _this19.goods_id,
                  comment: newCommentObj
                };
                _context18.next = 24;
                return uni.$http.post('/goods/comment', queryObj);
              case 24:
                _yield$uni$$http$post13 = _context18.sent;
                res = _yield$uni$$http$post13.data;
                queryObj1 = {
                  code: _this19.openid,
                  goods_id: _this19.goods_id,
                  content: newCommentObj
                };
                _context18.next = 29;
                return uni.$http.post('/users/comment', queryObj1);
              case 29:
                _yield$uni$$http$post14 = _context18.sent;
                res1 = _yield$uni$$http$post14.data;
              case 31:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }))();
    },
    showViewCount: function showViewCount() {
      uni.showToast({
        title: "\u5171 ".concat(this.viewCount || 0, " \u4EBA\u6D4F\u89C8"),
        icon: 'none',
        duration: 2000
      });
    },
    manageGoods: function manageGoods() {
      var _this20 = this;
      if (this.goods_info.goods_status === 1) {
        uni.showActionSheet({
          itemList: ['下架商品', '查看数据'],
          success: function success(res) {
            switch (res.tapIndex) {
              case 0:
                _this20.offlineGoods();
                break;
              case 1:
                _this20.viewGoodsData();
                break;
            }
          }
        });
      }
      ;
      if (this.goods_info.goods_status === 2) {
        uni.showActionSheet({
          itemList: ['重新上架', '查看数据'],
          success: function success(res) {
            switch (res.tapIndex) {
              case 0:
                _this20.reofflineGoods();
                break;
              case 1:
                _this20.viewGoodsData();
                break;
            }
          }
        });
      }
    },
    editGoods: function editGoods() {
      var goodsData = {
        goods_id: this.goods_info.goods_id,
        description: this.goods_info.goods_name,
        price: this.goods_info.goods_price,
        images: this.goods_info.pics.map(function (item) {
          return item.pics_big;
        })
      };
      uni.setStorageSync('edit_goods_data', goodsData);
      uni.switchTab({
        url: '/pages/sold/sold'
      });
    },
    offlineGoods: function offlineGoods() {
      var _this21 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee20() {
        return _regenerator.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                uni.showModal({
                  title: '提示',
                  content: '确定要下架该商品吗？',
                  success: function () {
                    var _success2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee19(res) {
                      var queryObj, _yield$uni$$http$post15, _res;
                      return _regenerator.default.wrap(function _callee19$(_context19) {
                        while (1) {
                          switch (_context19.prev = _context19.next) {
                            case 0:
                              if (!res.confirm) {
                                _context19.next = 15;
                                break;
                              }
                              _context19.prev = 1;
                              queryObj = {
                                goods_id: _this21.goods_id
                              };
                              _context19.next = 5;
                              return uni.$http.post('/goods/unpublish', queryObj);
                            case 5:
                              _yield$uni$$http$post15 = _context19.sent;
                              _res = _yield$uni$$http$post15.data;
                              uni.showToast({
                                title: '下架成功',
                                icon: 'success',
                                duration: 1000
                              });

                              // ✅ 等待 Toast 显示完成后返回上一页
                              setTimeout(function () {
                                uni.navigateBack({
                                  delta: 1
                                });
                              }, 1000);
                              _context19.next = 15;
                              break;
                            case 11:
                              _context19.prev = 11;
                              _context19.t0 = _context19["catch"](1);
                              console.error('下架失败:', _context19.t0);
                              uni.showToast({
                                title: '下架失败',
                                icon: 'none',
                                duration: 1000
                              });
                            case 15:
                            case "end":
                              return _context19.stop();
                          }
                        }
                      }, _callee19, null, [[1, 11]]);
                    }));
                    function success(_x2) {
                      return _success2.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 1:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      }))();
    },
    /**
     * 🔥 新增：文本内容安全检测
     */
    checkTextSafety: function checkTextSafety(text) {
      var _this22 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee21() {
        var _yield$uni$$http$post16, res;
        return _regenerator.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.prev = 0;
                console.log('🔍 开始检测文本:', text.substring(0, 30) + '...');
                _context21.next = 4;
                return uni.$http.post('/upload/textSecCheck', {
                  content: text,
                  openid: _this22.openid
                });
              case 4:
                _yield$uni$$http$post16 = _context21.sent;
                res = _yield$uni$$http$post16.data;
                console.log('📥 文本检测结果:', res);
                if (!(res.meta.status === 200)) {
                  _context21.next = 12;
                  break;
                }
                console.log('✅ 文本内容安全');
                return _context21.abrupt("return", true);
              case 12:
                console.warn('🚫 文本内容违规:', res.meta.msg);
                return _context21.abrupt("return", false);
              case 14:
                _context21.next = 21;
                break;
              case 16:
                _context21.prev = 16;
                _context21.t0 = _context21["catch"](0);
                console.error('💥 文本检测出错:', _context21.t0);

                // 🔥 网络错误时提示用户
                uni.showToast({
                  title: '文本检测失败，请重试',
                  icon: 'none',
                  duration: 2000
                });
                return _context21.abrupt("return", false);
              case 21:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, null, [[0, 16]]);
      }))();
    },
    reofflineGoods: function reofflineGoods() {
      var _this23 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee23() {
        return _regenerator.default.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                uni.showModal({
                  title: '提示',
                  content: '确定要重新上架该商品吗？',
                  success: function () {
                    var _success3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee22(res) {
                      var picsBigList, queryObj, _yield$uni$$http$post17, _res2;
                      return _regenerator.default.wrap(function _callee22$(_context22) {
                        while (1) {
                          switch (_context22.prev = _context22.next) {
                            case 0:
                              if (!res.confirm) {
                                _context22.next = 16;
                                break;
                              }
                              _context22.prev = 1;
                              picsBigList = _this23.goods_info.pics.map(function (item) {
                                return item.pics_big;
                              });
                              queryObj = {
                                code: _this23.openid,
                                publisherNickname: _this23.userBase.nickname,
                                description: _this23.goods_info.goods_name,
                                price: _this23.goods_info.goods_price,
                                coverImage: _this23.goods_info.goods_big_logo,
                                // 第一张作为封面
                                images: picsBigList,
                                // 所有图片
                                goods_id: _this23.goods_info.goods_id
                              };
                              _context22.next = 6;
                              return uni.$http.post('/goods/republish', queryObj);
                            case 6:
                              _yield$uni$$http$post17 = _context22.sent;
                              _res2 = _yield$uni$$http$post17.data;
                              uni.showToast({
                                title: '重新上架成功',
                                icon: 'success',
                                duration: 1000
                              });

                              // ✅ 等待 Toast 显示完成后返回上一页
                              setTimeout(function () {
                                uni.navigateBack({
                                  delta: 1
                                });
                              }, 1000);
                              _context22.next = 16;
                              break;
                            case 12:
                              _context22.prev = 12;
                              _context22.t0 = _context22["catch"](1);
                              console.error('重新上架失败:', _context22.t0);
                              uni.showToast({
                                title: '重新上架失败',
                                icon: 'none',
                                duration: 1000
                              });
                            case 16:
                            case "end":
                              return _context22.stop();
                          }
                        }
                      }, _callee22, null, [[1, 12]]);
                    }));
                    function success(_x3) {
                      return _success3.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 1:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23);
      }))();
    },
    deleteGoods: function deleteGoods() {
      uni.showModal({
        title: '警告',
        content: '删除后无法恢复，确定要删除该商品吗？',
        success: function success(res) {
          if (res.confirm) {
            console.log('删除商品');
          }
        }
      });
    },
    viewGoodsData: function viewGoodsData() {
      uni.showModal({
        title: '商品数据',
        content: "\u6D4F\u89C8\uFF1A".concat(this.viewCount, "\n\u6536\u85CF\uFF1A").concat(this.collectCount, "\n\u7559\u8A00\uFF1A").concat(this.comments.length),
        showCancel: false
      });
    },
    RelativeTime: function RelativeTime(createdAt) {
      var currentTimestamp = Math.floor(Date.now() / 1000);
      var diffInSeconds = currentTimestamp - createdAt;
      if (diffInSeconds <= 0) {
        return "刚刚";
      }
      var MINUTE = 60;
      var HOUR = 60 * MINUTE;
      var DAY = 24 * HOUR;
      var MONTH = 30 * DAY;
      var YEAR = 365 * DAY;
      if (diffInSeconds < HOUR) {
        var minutes = Math.floor(diffInSeconds / MINUTE);
        return minutes <= 0 ? "刚刚" : "".concat(minutes, "\u5206\u949F\u4E4B\u524D");
      }
      if (diffInSeconds < DAY) {
        var hours = Math.floor(diffInSeconds / HOUR);
        return "".concat(hours, "\u5C0F\u65F6\u4E4B\u524D");
      }
      if (diffInSeconds < MONTH) {
        var days = Math.floor(diffInSeconds / DAY);
        return "".concat(days, "\u5929\u4E4B\u524D");
      }
      if (diffInSeconds < YEAR) {
        var months = Math.floor(diffInSeconds / MONTH);
        return "".concat(months, "\u4E2A\u6708\u4E4B\u524D");
      }
      var years = Math.floor(diffInSeconds / YEAR);
      return "".concat(years, "\u5E74\u4E4B\u524D");
    },
    sendQuickComment: function sendQuickComment() {
      var _this24 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee24() {
        var content, isTextSafe, currentTimestamp, newCommentObj, queryObj, _yield$uni$$http$post18, res, queryObj1;
        return _regenerator.default.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                if (_this24.openid) {
                  _context24.next = 3;
                  break;
                }
                // 弹出登录提示框
                uni.showModal({
                  title: '提示',
                  content: '需要登录才能体验更多内容哦',
                  cancelText: '取消',
                  confirmText: '登录',
                  success: function success(res) {
                    if (res.confirm) {
                      // 用户点击了"登录"按钮
                      uni.switchTab({
                        url: '/pages/my/my'
                      });
                    }
                    // 用户点击了"取消"按钮，不做任何操作
                  }
                });
                return _context24.abrupt("return");
              case 3:
                content = _this24.quickComment.trim();
                if (content) {
                  _context24.next = 7;
                  break;
                }
                uni.showToast({
                  title: '请输入留言内容',
                  icon: 'none'
                });
                return _context24.abrupt("return");
              case 7:
                // 🔥 新增：文本内容安全检测
                uni.showLoading({
                  title: '检测内容...',
                  mask: true
                });
                _context24.next = 10;
                return _this24.checkTextSafety(content);
              case 10:
                isTextSafe = _context24.sent;
                uni.hideLoading();
                if (isTextSafe) {
                  _context24.next = 15;
                  break;
                }
                uni.showModal({
                  title: '内容违规',
                  content: '留言内容包含违规信息，请修改后重试',
                  showCancel: false,
                  confirmText: '我知道了'
                });
                return _context24.abrupt("return");
              case 15:
                // ✅ 检测通过，继续发送快速留言
                currentTimestamp = Math.floor(Date.now() / 1000);
                newCommentObj = {
                  comment_id: 'cmt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                  user_openid: _this24.userBase.openid,
                  nickname: _this24.userBase.nickname,
                  avatarUrl: _this24.userBase.avatarUrl || '/images/1.jpg',
                  content: content,
                  created_at: currentTimestamp,
                  like_count: 0,
                  replies: [],
                  showAllReplies: false,
                  displayReplies: [],
                  isLiked: false
                };
                _this24.comments.unshift(newCommentObj);
                _this24.closeQuickReply();
                uni.showToast({
                  title: '留言成功',
                  icon: 'success'
                });

                // 保存到后端
                _context24.prev = 20;
                queryObj = {
                  goods_id: _this24.goods_id,
                  comment: newCommentObj
                };
                _context24.next = 24;
                return uni.$http.post('/goods/comment', queryObj);
              case 24:
                _yield$uni$$http$post18 = _context24.sent;
                res = _yield$uni$$http$post18.data;
                if (res.meta.status !== 200) {
                  console.error('留言保存失败:', res.meta.msg);
                }
                queryObj1 = {
                  code: _this24.openid,
                  goods_id: _this24.goods_id,
                  content: newCommentObj
                };
                _context24.next = 30;
                return uni.$http.post('/users/comment', queryObj1);
              case 30:
                _context24.next = 35;
                break;
              case 32:
                _context24.prev = 32;
                _context24.t0 = _context24["catch"](20);
                console.error('调用留言API失败:', _context24.t0);
              case 35:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, null, [[20, 32]]);
      }))();
    }
  }),
  computed: _objectSpread(_objectSpread({}, (0, _vuex.mapState)('m_user', ['token', 'code', 'userBase', 'openid'])), {}, {
    leftColumn: function leftColumn() {
      return this.goodsList.filter(function (_, idx) {
        return idx % 2 === 0;
      });
    },
    rightColumn: function rightColumn() {
      return this.goodsList.filter(function (_, idx) {
        return idx % 2 === 1;
      });
    },
    displayedComments: function displayedComments() {
      return this.comments.slice(0, 3);
    }
  }),
  onReachBottom: function onReachBottom() {
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！');
    if (this.isloading) return;
    this.queryObj.pagenum += 1;
    this.getGoodsList();
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.queryObj.pagenum = 1;
    this.total = 0;
    this.isloading = false;
    this.goodsList = [];
    this.getGoodsList(function () {
      return uni.stopPullDownRefresh();
    });
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 79:
/*!**************************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/goods_detail/goods_detail.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./goods_detail.vue?vue&type=style&index=0&lang=scss& */ 80);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 80:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/goods_detail/goods_detail.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[73,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/goods_detail/goods_detail.js.map