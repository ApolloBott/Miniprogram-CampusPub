(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg/chat/chat"],{

/***/ 151:
/*!*******************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/main.js?{"page":"subpkg%2Fchat%2Fchat"} ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _chat = _interopRequireDefault(__webpack_require__(/*! ./subpkg/chat/chat.vue */ 152));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_chat.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 152:
/*!************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/chat/chat.vue ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chat_vue_vue_type_template_id_19940a7a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.vue?vue&type=template&id=19940a7a& */ 153);
/* harmony import */ var _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat.vue?vue&type=script&lang=js& */ 155);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat.vue?vue&type=style&index=0&lang=scss& */ 157);
/* harmony import */ var _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _chat_vue_vue_type_template_id_19940a7a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _chat_vue_vue_type_template_id_19940a7a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _chat_vue_vue_type_template_id_19940a7a___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg/chat/chat.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 153:
/*!*******************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/chat/chat.vue?vue&type=template&id=19940a7a& ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_19940a7a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=template&id=19940a7a& */ 154);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_19940a7a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_19940a7a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_19940a7a___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_19940a7a___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 154:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/chat/chat.vue?vue&type=template&id=19940a7a& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var l0 = _vm.__map(_vm.messages, function (msg, index) {
    var $orig = _vm.__get_orig(msg)
    var m0 =
      msg.type === "received" &&
      (msg.message_type === "text" || !msg.message_type)
        ? _vm.parseContent(msg.content)
        : null
    var m1 =
      msg.type === "sent" && (msg.message_type === "text" || !msg.message_type)
        ? _vm.parseContent(msg.content)
        : null
    return {
      $orig: $orig,
      m0: m0,
      m1: m1,
    }
  })
  var g0 = _vm.addressInput.trim()
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.showEmojiPanel = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        g0: g0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 155:
/*!*************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/chat/chat.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=script&lang=js& */ 156);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 156:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/chat/chat.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _vuex = __webpack_require__(/*! vuex */ 33);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// 定义表情包基础URL
var BASE_URL_SMALL = 'https://wait00.oss-cn-shanghai.aliyuncs.com/emoji/emoji-small/';
var _default = {
  data: function data() {
    return {
      memberCode: 'x***3',
      // 聊天消息列表
      messages: [],
      // 输入框内容
      inputText: '',
      // 滚动到的消息ID
      scrollIntoView: '',
      // 商品信息
      goods_info: [],
      // 轮询定时器
      pollingTimer: null,
      // 轮询间隔(毫秒) - 建议2-5秒
      pollingInterval: 3000,
      // 是否正在请求中(防止重复请求)
      isRequesting: false,
      // 最后一条消息的ID(用于判断是否有新消息)
      lastMessageId: null,
      otherOpenid: '',
      other_nickname: '',
      other_avatarUrl: '',
      // 购买弹窗相关
      showPurchasePopup: false,
      // 收货地址输入框
      addressInput: '',
      // 当前订单信息
      currentOrder: null,
      // 新增：表情包相关
      showEmojiPanel: false,
      // 控制表情面板显示
      // 🔥 修改：新的表情包列表
      emojiList: [{
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
      // 新增：图片上传相关
      uploading: false,
      transactionStatus: 0,
      // 0=无交易, 1=买家发起待确认, 2=卖家同意交易中, 3=交易完成
      isTransactionInitiator: false,
      // 是否是交易发起方(买家)
      // 🔥 新增：交易过期时间(7天，单位毫秒)
      TRANSACTION_EXPIRE_TIME: 7 * 24 * 60 * 60 * 1000,
      // 🔥 新增：新消息提示相关
      showNewMessageTip: false,
      // 是否显示新消息提示
      newMessageCount: 0,
      // 新消息数量
      scrollTop: 0,
      // 当前滚动位置
      scrollThreshold: 100,
      // 阈值(rpx)，距离底部多少时显示提示
      isNearBottom: true,
      // 是否接近底部
      lastMessagesLength: 0,
      // 上一次的消息数量
      scrollViewHeight: 0
    };
  },
  onLoad: function onLoad(options) {
    var _this = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var queryObj, _yield$uni$$http$get, res1, chatData, queryObj1, _yield$uni$$http$get2, _res;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              queryObj = {
                code: _this.openid
              };
              _context.next = 3;
              return uni.$http.get('/users/userinfo', queryObj);
            case 3:
              _yield$uni$$http$get = _context.sent;
              res1 = _yield$uni$$http$get.data;
              if (res1.meta.status === 200) {
                console.log(res1.message);
                _this.updateUserBase(res1.message);
              }
              _context.prev = 6;
              if (!(options && options.goods_info)) {
                _context.next = 23;
                break;
              }
              chatData = JSON.parse(decodeURIComponent(options.goods_info)) || null; // 判断是否传了 other_openid
              if (!chatData.other_openid) {
                _context.next = 21;
                break;
              }
              // 接收完整数据(包含 other_openid)
              _this.goods_info = chatData;
              _this.otherOpenid = chatData.other_openid;
              console.log('接收到 other_openid:', _this.otherOpenid);
              queryObj1 = {
                code: chatData.other_openid
              };
              _context.next = 16;
              return uni.$http.get('/users/userinfo', queryObj1);
            case 16:
              _yield$uni$$http$get2 = _context.sent;
              _res = _yield$uni$$http$get2.data;
              if (_res.meta.status === 200) {
                _this.other_nickname = _res.message.nickname;
                _this.other_avatarUrl = _res.message.avatarUrl;
              }
              _context.next = 23;
              break;
            case 21:
              // 只接收 goods_info
              _this.goods_info = chatData;
              console.log('只接收 goods_info');
            case 23:
              _context.next = 29;
              break;
            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](6);
              console.warn('publisher 解析失败:', _context.t0);
              _this.goods_info = null;
            case 29:
              _context.next = 31;
              return _this.loadMessages();
            case 31:
              // 🔥 新增：初始化消息数量
              _this.lastMessagesLength = _this.messages.length;

              // 加载当前商品的订单状态
              _context.next = 34;
              return _this.loadCurrentOrder();
            case 34:
              // 启动轮询
              _this.startPolling();

              // 加载本地保存的地址
              _this.loadLocalAddress();

              // 🔥 新增：确保初始位置在底部
              _this.$nextTick(function () {
                _this.scrollToBottom();
                _this.isNearBottom = true;
              });
            case 37:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 25]]);
    }))();
  },
  // 页面隐藏时停止轮询
  onHide: function onHide() {
    this.stopPolling();
  },
  // 添加 onReady 生命周期
  onReady: function onReady() {
    var _this2 = this;
    uni.createSelectorQuery().select('.chat-content').boundingClientRect(function (rect) {
      if (rect) {
        _this2.scrollViewHeight = rect.height;
        console.log('📏 聊天区域高度:', _this2.scrollViewHeight);
      }
    }).exec();
  },
  // 页面显示时恢复轮询
  onShow: function onShow() {
    var _this3 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_this3.goods_info && _this3.goods_info.goods_id) {
                _this3.startPolling();
              }
              // 重新加载本地地址(可能在其他页面被修改)
              _context2.next = 3;
              return _this3.loadLocalAddress();
            case 3:
              _context2.next = 5;
              return _this3.loadCurrentOrder();
            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  // 页面卸载时停止轮询
  onUnload: function onUnload() {
    this.stopPolling();
  },
  methods: _objectSpread(_objectSpread({}, (0, _vuex.mapMutations)('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase', 'updateAddress'])), {}, {
    // 完整的 handleScroll
    handleScroll: function handleScroll(e) {
      var _e$detail = e.detail,
        scrollTop = _e$detail.scrollTop,
        scrollHeight = _e$detail.scrollHeight,
        deltaY = _e$detail.deltaY;
      this.scrollTop = scrollTop;

      // 计算距离底部的距离
      var distanceToBottom = 0;
      if (this.scrollViewHeight > 0) {
        distanceToBottom = scrollHeight - scrollTop - this.scrollViewHeight;
        this.isNearBottom = distanceToBottom < this.scrollThreshold;
      } else {
        // 降级方案：使用百分比
        var scrollPercentage = scrollTop / scrollHeight;
        this.isNearBottom = scrollPercentage > 0.95;
      }
      console.log('📊', {
        scrollTop: scrollTop.toFixed(0),
        scrollHeight: scrollHeight,
        viewHeight: this.scrollViewHeight,
        distanceToBottom: distanceToBottom.toFixed(0),
        isNearBottom: this.isNearBottom
      });

      // 滚动到底部时清除提示
      if (this.isNearBottom && this.showNewMessageTip) {
        this.showNewMessageTip = false;
        this.newMessageCount = 0;
      }
    },
    /**
     * 🔥 触底事件
     */
    handleScrollToLower: function handleScrollToLower() {
      this.isNearBottom = true;
      if (this.showNewMessageTip) {
        this.showNewMessageTip = false;
        this.newMessageCount = 0;
      }
    },
    /**
     * 🔥 点击新消息提示跳转到底部
     */
    scrollToBottomWithTip: function scrollToBottomWithTip() {
      var _this4 = this;
      this.showNewMessageTip = false;
      this.newMessageCount = 0;
      this.isNearBottom = true;
      this.$nextTick(function () {
        _this4.scrollToBottom();
      });
    },
    /**
             * 🔥 新增：检查交易是否过期
             */
    checkTransactionExpiration: function checkTransactionExpiration() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var lastTransactionMsg, hasAgreeMsg, hasFinishMsg, hasSystemCloseMsg, transactionTime, now, timePassed;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                // 查找最后一条交易消息
                lastTransactionMsg = (0, _toConsumableArray2.default)(_this5.messages).reverse().find(function (msg) {
                  return msg.message_type === 'transaction';
                });
                if (lastTransactionMsg) {
                  _context3.next = 4;
                  break;
                }
                return _context3.abrupt("return");
              case 4:
                // 检查是否已经有同意、完成或系统关闭消息
                hasAgreeMsg = _this5.messages.some(function (msg) {
                  return msg.message_type === 'agree';
                });
                hasFinishMsg = _this5.messages.some(function (msg) {
                  return msg.message_type === 'finish';
                });
                hasSystemCloseMsg = _this5.messages.some(function (msg) {
                  return msg.message_type === 'system' && msg.content && msg.content.includes('交易自动关闭');
                }); // 如果已经有后续操作，不需要检查过期
                if (!(hasAgreeMsg || hasFinishMsg || hasSystemCloseMsg)) {
                  _context3.next = 9;
                  break;
                }
                return _context3.abrupt("return");
              case 9:
                // 解析交易消息时间戳（秒转毫秒）
                transactionTime = lastTransactionMsg.created_at * 1000;
                now = Date.now();
                timePassed = now - transactionTime; // 🔥 如果超过7天，发送系统消息关闭交易
                if (!(timePassed > _this5.TRANSACTION_EXPIRE_TIME)) {
                  _context3.next = 16;
                  break;
                }
                console.log('⏰ 交易已过期，自动关闭');
                _context3.next = 16;
                return _this5.sendSystemCloseMessage();
              case 16:
                _context3.next = 21;
                break;
              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3["catch"](0);
                console.error('❌ 检查交易过期失败:', _context3.t0);
              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 18]]);
      }))();
    },
    /**
     * 🔥 新增：发送系统关闭交易消息
     */
    sendSystemCloseMessage: function sendSystemCloseMessage() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var systemMessage, reqObj, _yield$uni$$http$post, res, newMessages;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                systemMessage = '因7天之内卖家没有同意，该交易自动关闭';
                reqObj = {
                  openid1: _this6.openid,
                  openid2: _this6.userBase.openid !== _this6.goods_info.publisher_id ? _this6.goods_info.publisher_id : _this6.goods_info.other_openid,
                  goods_id: _this6.goods_info.goods_id,
                  senderid: 'system',
                  // 🔥 标记为系统消息
                  content: systemMessage,
                  message_type: 'system'
                };
                _context4.next = 5;
                return uni.$http.post('/chats/message', reqObj);
              case 5:
                _yield$uni$$http$post = _context4.sent;
                res = _yield$uni$$http$post.data;
                if (res.meta.status === 200) {
                  // 更新状态为无交易
                  _this6.transactionStatus = 0;
                  _this6.isTransactionInitiator = false;

                  // 刷新消息列表
                  newMessages = _this6.processMessages(res.message.messages);
                  _this6.messages = newMessages;
                  if (newMessages.length > 0) {
                    _this6.lastMessageId = newMessages[newMessages.length - 1].id || newMessages[newMessages.length - 1].created_at;
                  }

                  // 滚动到最新消息
                  _this6.$nextTick(function () {
                    _this6.scrollToBottom();
                  });
                  console.log('✅ 系统关闭交易消息已发送');
                }
                _context4.next = 13;
                break;
              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](0);
                console.error('❌ 发送系统消息失败:', _context4.t0);
              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 10]]);
      }))();
    },
    /**
     * 买家确认交易完成
     */
    finish: function finish() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var _yield$uni$showModal, _yield$uni$showModal2, err, res, finishData, reqObj, _yield$uni$$http$post2, res2, newMessages;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return uni.showModal({
                  title: '确认交易完成',
                  content: '确认已完成线下交易？确认后交易状态将变为已完成',
                  confirmText: '确认完成',
                  cancelText: '取消'
                });
              case 3:
                _yield$uni$showModal = _context5.sent;
                _yield$uni$showModal2 = (0, _slicedToArray2.default)(_yield$uni$showModal, 2);
                err = _yield$uni$showModal2[0];
                res = _yield$uni$showModal2[1];
                if (!(err || !res.confirm)) {
                  _context5.next = 9;
                  break;
                }
                return _context5.abrupt("return");
              case 9:
                uni.showLoading({
                  title: '确认中...',
                  mask: true
                });

                // 构建完成交易消息内容
                finishData = {
                  goods_id: _this7.goods_info.goods_id,
                  goods_name: _this7.goods_info.goods_name,
                  goods_price: _this7.goods_info.goods_price,
                  timestamp: Date.now()
                }; // 发送"交易完成"类型的消息
                reqObj = {
                  openid1: _this7.openid,
                  openid2: _this7.userBase.openid !== _this7.goods_info.publisher_id ? _this7.goods_info.publisher_id : _this7.goods_info.other_openid,
                  goods_id: _this7.goods_info.goods_id,
                  senderid: _this7.openid,
                  content: JSON.stringify(finishData),
                  message_type: 'finish' // 🔥 交易完成消息类型
                };
                _context5.next = 14;
                return uni.$http.post('/chats/message', reqObj);
              case 14:
                _yield$uni$$http$post2 = _context5.sent;
                res2 = _yield$uni$$http$post2.data;
                uni.hideLoading();
                if (res2.meta.status === 200) {
                  // 更新状态为交易完成
                  _this7.transactionStatus = 3;

                  // 刷新消息列表
                  newMessages = _this7.processMessages(res2.message.messages);
                  _this7.messages = newMessages;
                  if (newMessages.length > 0) {
                    _this7.lastMessageId = newMessages[newMessages.length - 1].id || newMessages[newMessages.length - 1].created_at;
                  }
                  uni.showToast({
                    title: '交易已完成',
                    icon: 'success',
                    duration: 2000
                  });

                  // 滚动到最新消息
                  _this7.$nextTick(function () {
                    _this7.scrollToBottom();
                  });
                } else {
                  uni.showToast({
                    title: res2.meta.msg || '操作失败',
                    icon: 'none'
                  });
                }
                _context5.next = 25;
                break;
              case 20:
                _context5.prev = 20;
                _context5.t0 = _context5["catch"](0);
                uni.hideLoading();
                console.error('确认交易完成失败:', _context5.t0);
                uni.showToast({
                  title: '操作失败',
                  icon: 'none'
                });
              case 25:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 20]]);
      }))();
    },
    /**
     * 预览表情包(放大查看)
     */
    previewEmoji: function previewEmoji(emojiUrl) {
      uni.previewImage({
        current: emojiUrl,
        urls: [emojiUrl]
      });
    },
    /**
        * 选择表情包发送
        */
    selectEmoji: function selectEmoji(emoji) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // 将表情的代码（如 '(微笑)'）追加到输入框文本后
                _this8.inputText = (_this8.inputText || '') + emoji.code;
                // 注意：不需要在这里调用发送接口，用户会点击发送按钮统一发送
              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    /**
     * 加载当前商品的订单状态
     */
    parseContent: function parseContent(content) {
      if (!content) return '';
      var temp = content;
      // 遍历表情列表，把文本中的 (微笑) 替换成 <img /> 标签
      this.emojiList.forEach(function (item) {
        // 转义正则中的特殊字符括号
        var code = item.code.replace('(', '\\(').replace(')', '\\)');
        var reg = new RegExp(code, 'g');
        // 替换为 img 标签，注意这里设置了 vertical-align: middle 让表情和文字对齐
        temp = temp.replace(reg, "<img style=\"width: 26px; height: 26px; vertical-align: middle; margin: 0 4rpx;\" src=\"".concat(item.url, "\" />"));
      });
      return temp;
    },
    loadCurrentOrder: function loadCurrentOrder() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var _yield$uni$$http$get3, res;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return uni.$http.get('/orders/current', {
                  user_openid: _this9.userBase.openid,
                  goods_id: _this9.goods_info.goods_id,
                  _hideLoading: true
                });
              case 3:
                _yield$uni$$http$get3 = _context7.sent;
                res = _yield$uni$$http$get3.data;
                if (res.code === 200 && res.data) {
                  _this9.currentOrder = res.data;
                  console.log('📦 当前订单状态:', _this9.currentOrder);
                } else {
                  _this9.currentOrder = null;
                }
                _context7.next = 12;
                break;
              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](0);
                console.error('❌ 加载订单状态失败:', _context7.t0);
                _this9.currentOrder = null;
              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 8]]);
      }))();
    },
    /**
     * 确认收货
     */
    confirmReceipt: function confirmReceipt() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var _yield$uni$showModal3, _yield$uni$showModal4, err, res, _yield$uni$$http$post3, result;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return uni.showModal({
                  title: '确认收货',
                  content: '确认已收到商品?收货后款项将转入卖家账户',
                  confirmText: '确认收货',
                  cancelText: '取消'
                });
              case 2:
                _yield$uni$showModal3 = _context8.sent;
                _yield$uni$showModal4 = (0, _slicedToArray2.default)(_yield$uni$showModal3, 2);
                err = _yield$uni$showModal4[0];
                res = _yield$uni$showModal4[1];
                if (!(err || !res.confirm)) {
                  _context8.next = 8;
                  break;
                }
                return _context8.abrupt("return");
              case 8:
                _context8.prev = 8;
                uni.showLoading({
                  title: '处理中...',
                  mask: true
                });
                _context8.next = 12;
                return uni.$http.post('/orders/confirm_receipt', {
                  order_number: _this10.currentOrder.order_number,
                  openid: _this10.userBase.openid
                });
              case 12:
                _yield$uni$$http$post3 = _context8.sent;
                result = _yield$uni$$http$post3.data;
                uni.hideLoading();
                if (!(result.meta.status === 200)) {
                  _context8.next = 24;
                  break;
                }
                uni.showToast({
                  title: '确认收货成功',
                  icon: 'success',
                  duration: 2000
                });

                // 更新订单状态
                _this10.currentOrder.order_status = 3;

                // 发送确认收货消息
                _context8.next = 20;
                return _this10.sendPaymentMessage('我已确认收货,交易完成!');
              case 20:
                _context8.next = 22;
                return _this10.loadMessages();
              case 22:
                _context8.next = 25;
                break;
              case 24:
                uni.showToast({
                  title: result.meta.msg || '确认收货失败',
                  icon: 'none',
                  duration: 2000
                });
              case 25:
                _context8.next = 32;
                break;
              case 27:
                _context8.prev = 27;
                _context8.t0 = _context8["catch"](8);
                uni.hideLoading();
                console.error('❌ 确认收货失败:', _context8.t0);
                uni.showToast({
                  title: '确认收货失败,请重试',
                  icon: 'none',
                  duration: 2000
                });
              case 32:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[8, 27]]);
      }))();
    },
    /**
     * 🔥 修改：加载消息时检查是否有新消息
     */
    loadMessages: function loadMessages() {
      var _arguments = arguments,
        _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var silent, req, _yield$uni$$http$get4, res, newMessages, newLastMessageId, hadMessages, oldLength, newMessagesCount, lastMessage, isFromOther;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                silent = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                if (!_this11.isRequesting) {
                  _context9.next = 3;
                  break;
                }
                return _context9.abrupt("return");
              case 3:
                _this11.isRequesting = true;
                _context9.prev = 4;
                req = {
                  openid1: _this11.openid,
                  openid2: _this11.userBase.openid !== _this11.goods_info.publisher_id ? _this11.goods_info.publisher_id : _this11.goods_info.other_openid,
                  goods_id: _this11.goods_info.goods_id,
                  _hideLoading: true
                };
                _context9.next = 8;
                return uni.$http.get('/chats/message', req);
              case 8:
                _yield$uni$$http$get4 = _context9.sent;
                res = _yield$uni$$http$get4.data;
                if (!(res.meta.status === 200)) {
                  _context9.next = 25;
                  break;
                }
                newMessages = _this11.processMessages(res.message.messages);
                if (!(newMessages.length > 0)) {
                  _context9.next = 24;
                  break;
                }
                newLastMessageId = newMessages[newMessages.length - 1].id || newMessages[newMessages.length - 1].created_at; // 🔥 新增：检测是否有新消息
                if (!(_this11.lastMessageId !== newLastMessageId)) {
                  _context9.next = 22;
                  break;
                }
                hadMessages = _this11.messages.length > 0;
                oldLength = _this11.messages.length;
                _this11.messages = newMessages;
                _this11.lastMessageId = newLastMessageId;
                _context9.next = 21;
                return _this11.checkTransactionExpiration();
              case 21:
                // 🔥 新增：处理新消息逻辑
                if (hadMessages && !silent) {
                  newMessagesCount = newMessages.length - oldLength; // 检查最后一条消息是否是别人发的
                  lastMessage = newMessages[newMessages.length - 1];
                  isFromOther = lastMessage.openid !== _this11.openid && lastMessage.message_type !== 'system';
                  if (newMessagesCount > 0 && isFromOther) {
                    if (_this11.isNearBottom) {
                      // 如果接近底部，自动滚动
                      _this11.$nextTick(function () {
                        _this11.scrollToBottom();
                      });
                    } else {
                      // 如果不在底部，显示提示
                      _this11.newMessageCount += newMessagesCount;
                      _this11.showNewMessageTip = true;
                    }
                  } else {
                    // 自己发的消息，直接滚动到底部
                    _this11.$nextTick(function () {
                      _this11.scrollToBottom();
                    });
                  }
                }
              case 22:
                _context9.next = 25;
                break;
              case 24:
                _this11.messages = newMessages;
              case 25:
                _context9.next = 30;
                break;
              case 27:
                _context9.prev = 27;
                _context9.t0 = _context9["catch"](4);
                console.error('加载消息失败:', _context9.t0);
              case 30:
                _context9.prev = 30;
                _this11.isRequesting = false;
                return _context9.finish(30);
              case 33:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[4, 27, 30, 33]]);
      }))();
    },
    // 启动轮询
    startPolling: function startPolling() {
      var _this12 = this;
      // 先清除可能存在的定时器
      this.stopPolling();

      // 启动新的定时器
      this.pollingTimer = setInterval(function () {
        _this12.loadMessages(true); // silent=true 静默加载,不显示提示
        _this12.loadCurrentOrder(); // 同时轮询订单状态
      }, this.pollingInterval);
    },
    // 停止轮询
    stopPolling: function stopPolling() {
      if (this.pollingTimer) {
        clearInterval(this.pollingTimer);
        this.pollingTimer = null;
      }
    },
    // 返回上一页
    goBack: function goBack() {
      uni.navigateBack();
    },
    // 显示更多操作
    showMoreOptions: function showMoreOptions() {
      var _this13 = this;
      uni.showActionSheet({
        itemList: ['举报'],
        success: function success(res) {
          if (res.tapIndex === 0) {
            _this13.reportUser();
          }
        }
      });
    },
    // 举报用户
    reportUser: function reportUser() {
      var _this14 = this;
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
          var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(res) {
            var reason, reportData, _yield$uni$$http$post4, apiRes;
            return _regenerator.default.wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    if (!res.confirm) {
                      _context10.next = 23;
                      break;
                    }
                    reason = res.content.trim(); // 获取输入框内容
                    // 验证理由是否为空
                    if (reason) {
                      _context10.next = 5;
                      break;
                    }
                    uni.showToast({
                      title: '举报理由不能为空',
                      icon: 'none'
                    });
                    return _context10.abrupt("return");
                  case 5:
                    // 准备提交到后端的数据
                    reportData = {
                      reporter_openid: _this14.openid,
                      // 举报人 (当前用户)
                      reported_openid: _this14.goods_info.publisher_id,
                      // 被举报人 (帖子作者)
                      post_id: 0,
                      goods_id: _this14.goods_info.goods_id,
                      // 相关帖子ID
                      reason: reason // 举报理由
                    };

                    console.log('提交举报:', reportData);
                    _context10.prev = 7;
                    _context10.next = 10;
                    return uni.$http.post('/users/report', reportData);
                  case 10:
                    _yield$uni$$http$post4 = _context10.sent;
                    apiRes = _yield$uni$$http$post4.data;
                    if (!(apiRes.meta.status === 201)) {
                      _context10.next = 16;
                      break;
                    }
                    uni.showToast({
                      title: '举报成功，我们会尽快核实',
                      icon: 'success'
                    });
                    _context10.next = 17;
                    break;
                  case 16:
                    throw new Error(apiRes.meta.msg || '举报失败');
                  case 17:
                    _context10.next = 23;
                    break;
                  case 19:
                    _context10.prev = 19;
                    _context10.t0 = _context10["catch"](7);
                    console.error('举报失败:', _context10.t0);
                    uni.showToast({
                      title: _context10.t0.message || '举报时发生错误',
                      icon: 'none'
                    });
                  case 23:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10, null, [[7, 19]]);
          }));
          function success(_x) {
            return _success.apply(this, arguments);
          }
          return success;
        }()
      });
    },
    // 立即购买 - 显示弹窗
    buyNow: function buyNow() {
      this.showPurchasePopup = true;
      // 每次打开弹窗时重新加载地址
      this.loadLocalAddress();
    },
    // 关闭购买弹窗
    closePurchasePopup: function closePurchasePopup() {
      this.showPurchasePopup = false;
    },
    // 加载本地保存的地址
    loadLocalAddress: function loadLocalAddress() {
      // 从 Vuex 中获取本地保存的地址
      if (this.address && (0, _typeof2.default)(this.address) === 'object' && Object.keys(this.address).length > 0) {
        // 如果地址对象有 fullAddress 字段,直接使用
        if (this.address.fullAddress) {
          this.addressInput = this.address.fullAddress;
        }
        // 如果是结构化地址,拼接显示
        else if (this.address.provinceName || this.address.cityName) {
          var addressParts = [this.address.provinceName, this.address.cityName, this.address.countyName, this.address.detailInfo].filter(function (part) {
            return part;
          }); // 过滤掉空值
          this.addressInput = addressParts.join(' ');
        }
      }
    },
    // 保存收货地址
    saveAddress: function saveAddress() {
      var address = this.addressInput.trim();

      // 验证地址不能为空
      if (!address) {
        uni.showToast({
          title: '请输入收货地址',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      try {
        // 构建地址对象
        var addressObj = {
          fullAddress: address,
          timestamp: Date.now() // 添加时间戳
        };

        // 调用 Vuex 的 updateAddress 方法保存地址
        this.updateAddress(addressObj);
        uni.showToast({
          title: '地址保存成功',
          icon: 'success',
          duration: 1500
        });
        console.log('地址已保存:', addressObj);
      } catch (error) {
        console.error('保存地址失败:', error);
        uni.showToast({
          title: '保存失败,请重试',
          icon: 'none',
          duration: 2000
        });
      }
    },
    /**
     * 发送支付专属消息
     * @param {string} content - 消息内容
     */
    sendPaymentMessage: function sendPaymentMessage(content) {
      var _this15 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        var reqObj, _yield$uni$$http$post5, res;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                reqObj = {
                  openid1: _this15.openid,
                  openid2: _this15.userBase.openid !== _this15.goods_info.publisher_id ? _this15.goods_info.publisher_id : _this15.goods_info.other_openid,
                  goods_id: _this15.goods_info.goods_id,
                  senderid: _this15.openid,
                  content: content,
                  is_payment: 1 // 标记为支付消息
                };
                _context11.next = 4;
                return uni.$http.post('/chats/message', reqObj);
              case 4:
                _yield$uni$$http$post5 = _context11.sent;
                res = _yield$uni$$http$post5.data;
                if (!(res.meta.status === 200)) {
                  _context11.next = 9;
                  break;
                }
                console.log('✅ 支付消息发送成功');
                return _context11.abrupt("return", true);
              case 9:
                return _context11.abrupt("return", false);
              case 12:
                _context11.prev = 12;
                _context11.t0 = _context11["catch"](0);
                console.error('❌ 发送支付消息失败:', _context11.t0);
                return _context11.abrupt("return", false);
              case 16:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 12]]);
      }))();
    },
    // 处理线下交易请求
    handleWechatPay: function handleWechatPay() {
      var _this16 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        var finalAddress, transactionData, reqObj, _yield$uni$$http$post6, res, newMessages;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                finalAddress = _this16.addressInput.trim();
                _context12.prev = 1;
                uni.showLoading({
                  title: '发送中...',
                  mask: true
                });

                // 构建交易消息内容（使用JSON格式存储）
                transactionData = {
                  goods_id: _this16.goods_info.goods_id,
                  goods_name: _this16.goods_info.goods_name,
                  goods_price: _this16.goods_info.goods_price,
                  location: finalAddress || null,
                  timestamp: Date.now()
                }; // 发送交易类型消息
                reqObj = {
                  openid1: _this16.openid,
                  openid2: _this16.userBase.openid !== _this16.goods_info.publisher_id ? _this16.goods_info.publisher_id : _this16.goods_info.other_openid,
                  goods_id: _this16.goods_info.goods_id,
                  senderid: _this16.openid,
                  content: JSON.stringify(transactionData),
                  // 将数据序列化为JSON
                  message_type: 'transaction',
                  // 新的消息类型
                  location: finalAddress || null // 额外保存地点字段
                };
                _context12.next = 7;
                return uni.$http.post('/chats/message', reqObj);
              case 7:
                _yield$uni$$http$post6 = _context12.sent;
                res = _yield$uni$$http$post6.data;
                uni.hideLoading();
                if (res.meta.status === 200) {
                  // 刷新消息列表
                  newMessages = _this16.processMessages(res.message.messages);
                  _this16.messages = newMessages;
                  if (newMessages.length > 0) {
                    _this16.lastMessageId = newMessages[newMessages.length - 1].id || newMessages[newMessages.length - 1].created_at;
                  }

                  // 🔥 新增: 更新交易状态
                  _this16.transactionStatus = 1; // 买家发起交易,等待卖家确认
                  _this16.isTransactionInitiator = true; // 标记为交易发起方

                  // 关闭弹窗
                  _this16.closePurchasePopup();

                  // 显示成功提示
                  uni.showToast({
                    title: '交易请求已发送',
                    icon: 'success',
                    duration: 2000
                  });

                  // 滚动到最新消息
                  _this16.$nextTick(function () {
                    _this16.scrollToBottom();
                  });
                } else {
                  uni.showToast({
                    title: res.meta.msg || '发送失败',
                    icon: 'none',
                    duration: 2000
                  });
                }
                _context12.next = 18;
                break;
              case 13:
                _context12.prev = 13;
                _context12.t0 = _context12["catch"](1);
                uni.hideLoading();
                console.error('❌ 发送交易请求失败:', _context12.t0);
                uni.showToast({
                  title: '发送失败，请重试',
                  icon: 'none',
                  duration: 2000
                });
              case 18:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[1, 13]]);
      }))();
    },
    // 发送消息
    sendMessage: function sendMessage() {
      var _this17 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
        var newMessage, requyObj, _yield$uni$$http$post7, res, newMessages;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (_this17.inputText.trim()) {
                  _context13.next = 2;
                  break;
                }
                return _context13.abrupt("return");
              case 2:
                newMessage = _this17.inputText;
                _this17.inputText = '';
                _context13.prev = 4;
                // 发送消息到后端
                requyObj = {
                  openid1: _this17.openid,
                  openid2: _this17.userBase.openid !== _this17.goods_info.publisher_id ? _this17.goods_info.publisher_id : _this17.goods_info.other_openid,
                  goods_id: _this17.goods_info.goods_id,
                  senderid: _this17.openid,
                  content: newMessage,
                  message_type: 'text'
                };
                _context13.next = 8;
                return uni.$http.post('/chats/message', requyObj);
              case 8:
                _yield$uni$$http$post7 = _context13.sent;
                res = _yield$uni$$http$post7.data;
                if (res.meta.status === 200) {
                  // 发送成功后立即刷新消息列表
                  newMessages = _this17.processMessages(res.message.messages);
                  _this17.messages = newMessages;

                  // 更新最后一条消息ID
                  if (newMessages.length > 0) {
                    _this17.lastMessageId = newMessages[newMessages.length - 1].id || newMessages[newMessages.length - 1].created_at;
                  }

                  // 滚动到底部
                  _this17.$nextTick(function () {
                    _this17.scrollToBottom();
                  });
                }
                _context13.next = 17;
                break;
              case 13:
                _context13.prev = 13;
                _context13.t0 = _context13["catch"](4);
                console.error('发送消息失败:', _context13.t0);
                uni.showToast({
                  title: '发送失败',
                  icon: 'none'
                });
              case 17:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[4, 13]]);
      }))();
    },
    showEmojiPicker: function showEmojiPicker() {
      this.showEmojiPanel = !this.showEmojiPanel;
    },
    /**
      * 显示添加菜单 - 修改原方法
      */
    showAddMenu: function showAddMenu() {
      var _this18 = this;
      uni.showActionSheet({
        itemList: ['从相册选择', '拍照'],
        success: function success(res) {
          if (res.tapIndex === 0) {
            _this18.chooseImageFromAlbum();
          } else if (res.tapIndex === 1) {
            _this18.chooseImageFromCamera();
          }
        }
      });
    },
    /**
        * 从相册选择图片
        */
    chooseImageFromAlbum: function chooseImageFromAlbum() {
      var _this19 = this;
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album'],
        success: function success(res) {
          _this19.uploadAndSendImage(res.tempFilePaths);
        }
      });
    },
    /**
        * 拍照
        */
    chooseImageFromCamera: function chooseImageFromCamera() {
      var _this20 = this;
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: function success(res) {
          _this20.uploadAndSendImage(res.tempFilePaths);
        }
      });
    },
    /**
         * 上传并发送图片
         */
    uploadAndSendImage: function uploadAndSendImage(filePaths) {
      var _this21 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14() {
        var filePath, _yield$uni$$http$get5, tokenRes, fileContent, imageUrl, reqObj, _yield$uni$$http$post8, res, newMessages;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (!(!filePaths || filePaths.length === 0)) {
                  _context14.next = 2;
                  break;
                }
                return _context14.abrupt("return");
              case 2:
                _this21.uploading = true;
                uni.showLoading({
                  title: '上传中...',
                  mask: true
                });
                _context14.prev = 4;
                filePath = filePaths[0]; // 1. 获取上传凭证
                _context14.next = 8;
                return uni.$http.get('/upload/token', {
                  openid: _this21.openid,
                  fileType: 'image'
                });
              case 8:
                _yield$uni$$http$get5 = _context14.sent;
                tokenRes = _yield$uni$$http$get5.data;
                if (!(tokenRes.meta.status !== 200)) {
                  _context14.next = 12;
                  break;
                }
                throw new Error('获取上传凭证失败');
              case 12:
                _context14.next = 14;
                return new Promise(function (resolve, reject) {
                  uni.getFileSystemManager().readFile({
                    filePath: filePath,
                    encoding: 'base64',
                    success: function success(res) {
                      return resolve(res.data);
                    },
                    fail: reject
                  });
                });
              case 14:
                fileContent = _context14.sent;
                _context14.next = 17;
                return new Promise(function (resolve, reject) {
                  uni.request({
                    url: tokenRes.message.publicUrl,
                    method: 'PUT',
                    header: {
                      'Content-Type': 'application/octet-stream'
                    },
                    data: uni.base64ToArrayBuffer(fileContent),
                    success: function success(res) {
                      if (res.statusCode === 200) {
                        resolve(res);
                      } else {
                        reject(new Error("\u4E0A\u4F20\u5931\u8D25: ".concat(res.statusCode)));
                      }
                    },
                    fail: reject
                  });
                });
              case 17:
                imageUrl = tokenRes.message.publicUrl;
                uni.hideLoading();

                // 4. 发送图片消息
                reqObj = {
                  openid1: _this21.openid,
                  openid2: _this21.userBase.openid !== _this21.goods_info.publisher_id ? _this21.goods_info.publisher_id : _this21.goods_info.other_openid,
                  goods_id: _this21.goods_info.goods_id,
                  senderid: _this21.openid,
                  content: imageUrl,
                  message_type: 'image',
                  // 标记为图片消息
                  sub_type: 'image' // 标记为普通图片
                };
                _context14.next = 22;
                return uni.$http.post('/chats/message', reqObj);
              case 22:
                _yield$uni$$http$post8 = _context14.sent;
                res = _yield$uni$$http$post8.data;
                if (res.meta.status === 200) {
                  newMessages = _this21.processMessages(res.message.messages);
                  _this21.messages = newMessages;
                  if (newMessages.length > 0) {
                    _this21.lastMessageId = newMessages[newMessages.length - 1].id || newMessages[newMessages.length - 1].created_at;
                  }
                  _this21.$nextTick(function () {
                    _this21.scrollToBottom();
                  });
                }
                _context14.next = 32;
                break;
              case 27:
                _context14.prev = 27;
                _context14.t0 = _context14["catch"](4);
                console.error('❌ 上传图片失败:', _context14.t0);
                uni.hideLoading();
                uni.showToast({
                  title: _context14.t0.message || '上传失败',
                  icon: 'none',
                  duration: 2000
                });
              case 32:
                _context14.prev = 32;
                _this21.uploading = false;
                return _context14.finish(32);
              case 35:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[4, 27, 32, 35]]);
      }))();
    },
    /**
         * 预览图片
         */
    previewImage: function previewImage(imageUrl) {
      // 收集所有图片消息的URL
      var imageUrls = this.messages.filter(function (msg) {
        return msg.message_type === 'image';
      }).map(function (msg) {
        return msg.content;
      });
      uni.previewImage({
        current: imageUrl,
        urls: imageUrls
      });
    },
    // 滚动到底部
    scrollToBottom: function scrollToBottom() {
      if (this.messages.length > 0) {
        this.scrollIntoView = 'msg-' + (this.messages.length - 1);
      }
    },
    // 格式化时间
    formatTime: function formatTime(date) {
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var day = String(date.getDate()).padStart(2, '0');
      var hour = String(date.getHours()).padStart(2, '0');
      var minute = String(date.getMinutes()).padStart(2, '0');
      return "".concat(month, "-").concat(day, " ").concat(hour, ":").concat(minute);
    },
    /**
             * 🔥 修改：处理消息时识别系统消息
             */
    processMessages: function processMessages(messages) {
      var _this22 = this;
      if (!Array.isArray(messages)) {
        console.log("messages不是数组");
        return [];
      }

      // 检查是否有系统关闭消息
      var hasSystemCloseMsg = messages.some(function (msg) {
        return msg.message_type === 'system' && msg.content && msg.content.includes('交易自动关闭');
      });

      // 🔥 如果有系统关闭消息，重置交易状态
      if (hasSystemCloseMsg) {
        this.transactionStatus = 0;
        this.isTransactionInitiator = false;
      } else {
        // 原有的状态检查逻辑
        var hasTransactionMessage = messages.some(function (msg) {
          return msg.message_type === 'transaction';
        });
        var hasAgreeMessage = messages.some(function (msg) {
          return msg.message_type === 'agree';
        });
        var hasFinishMessage = messages.some(function (msg) {
          return msg.message_type === 'finish';
        });
        if (hasFinishMessage) {
          this.transactionStatus = 3;
        } else if (hasAgreeMessage) {
          this.transactionStatus = 2;
        } else if (hasTransactionMessage) {
          var latestTransaction = (0, _toConsumableArray2.default)(messages).reverse().find(function (msg) {
            return msg.message_type === 'transaction';
          });
          if (latestTransaction) {
            if (latestTransaction.openid === this.openid) {
              this.transactionStatus = 1;
              this.isTransactionInitiator = true;
            } else {
              this.transactionStatus = 1;
              this.isTransactionInitiator = false;
            }
          }
        }
      }
      return messages.map(function (message) {
        var processed = _objectSpread(_objectSpread({}, message), {}, {
          type: message.openid === _this22.openid ? 'sent' : message.message_type === 'system' ? 'system' : 'received',
          // 🔥 系统消息标记
          is_payment: message.is_payment || 0,
          message_type: message.message_type || 'text',
          sub_type: message.sub_type || null
        });

        // 交易消息处理
        if (message.message_type === 'transaction') {
          try {
            var transactionData = JSON.parse(message.content);
            processed.location = transactionData.location || message.location;
            processed.transactionData = transactionData;
          } catch (e) {
            console.error('解析交易消息失败:', e);
            processed.location = message.location;
          }
        }

        // 同意消息处理
        if (message.message_type === 'agree') {
          try {
            var agreeData = JSON.parse(message.content);
            processed.agreeData = agreeData;
          } catch (e) {
            console.error('解析同意消息失败:', e);
          }
        }

        // 完成消息处理
        if (message.message_type === 'finish') {
          try {
            var finishData = JSON.parse(message.content);
            processed.finishData = finishData;
          } catch (e) {
            console.error('解析完成消息失败:', e);
          }
        }
        return processed;
      });
    },
    // 在 methods 中修改 agreeTransaction 方法
    agreeTransaction: function agreeTransaction() {
      var _this23 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15() {
        var agreeData, reqObj, _yield$uni$$http$post9, res, newMessages;
        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                uni.showLoading({
                  title: '确认中...',
                  mask: true
                });

                // 🔥 构建同意交易消息内容
                agreeData = {
                  goods_id: _this23.goods_info.goods_id,
                  goods_name: _this23.goods_info.goods_name,
                  goods_price: _this23.goods_info.goods_price,
                  timestamp: Date.now()
                }; // 🔥 发送"同意交易"类型的消息
                reqObj = {
                  openid1: _this23.openid,
                  openid2: _this23.userBase.openid !== _this23.goods_info.publisher_id ? _this23.goods_info.publisher_id : _this23.goods_info.other_openid,
                  goods_id: _this23.goods_info.goods_id,
                  senderid: _this23.openid,
                  content: JSON.stringify(agreeData),
                  message_type: 'agree' // 🔥 新增: 同意交易消息类型
                };
                _context15.next = 6;
                return uni.$http.post('/chats/message', reqObj);
              case 6:
                _yield$uni$$http$post9 = _context15.sent;
                res = _yield$uni$$http$post9.data;
                uni.hideLoading();
                if (res.meta.status === 200) {
                  // 更新状态为交易进行中
                  _this23.transactionStatus = 2;

                  // 刷新消息列表
                  newMessages = _this23.processMessages(res.message.messages);
                  _this23.messages = newMessages;
                  if (newMessages.length > 0) {
                    _this23.lastMessageId = newMessages[newMessages.length - 1].id || newMessages[newMessages.length - 1].created_at;
                  }
                  uni.showToast({
                    title: '已同意交易',
                    icon: 'success'
                  });

                  // 滚动到最新消息
                  _this23.$nextTick(function () {
                    _this23.scrollToBottom();
                  });
                } else {
                  uni.showToast({
                    title: res.meta.msg || '操作失败',
                    icon: 'none'
                  });
                }
                _context15.next = 17;
                break;
              case 12:
                _context15.prev = 12;
                _context15.t0 = _context15["catch"](0);
                uni.hideLoading();
                console.error('同意交易失败:', _context15.t0);
                uni.showToast({
                  title: '操作失败',
                  icon: 'none'
                });
              case 17:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[0, 12]]);
      }))();
    },
    // 跳转到商品详情
    gotoDetail: function gotoDetail(item) {
      var _this24 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16() {
        var _yield$uni$$http$post10, res;
        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;
                // 1. 先增加浏览次数
                console.log('📊 增加商品浏览次数:', item.goods_id);
                _context16.next = 4;
                return uni.$http.post('/goods/view', {
                  goods_id: item.goods_id,
                  // 可选：添加用户信息用于统计分析
                  user_openid: _this24.openid || null
                });
              case 4:
                _yield$uni$$http$post10 = _context16.sent;
                res = _yield$uni$$http$post10.data;
                if (res.meta.status === 200) {
                  console.log('✅ 浏览次数增加成功');
                } else {
                  console.warn('⚠️ 浏览次数增加失败:', res.meta.msg);
                }
                _context16.next = 12;
                break;
              case 9:
                _context16.prev = 9;
                _context16.t0 = _context16["catch"](0);
                console.error('❌ 浏览次数增加接口错误:', _context16.t0);
                // 即使接口失败也继续跳转，不影响用户体验
              case 12:
                uni.navigateTo({
                  url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
                });
              case 13:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, null, [[0, 9]]);
      }))();
    }
  }),
  computed: _objectSpread(_objectSpread({}, (0, _vuex.mapState)('m_user', ['token', 'code', 'userBase', 'openid', 'address'])), {}, {
    // 🔥 新增：处理商品名称截断
    displayGoodsName: function displayGoodsName() {
      if (!this.goods_info || !this.goods_info.goods_name) {
        return '';
      }
      var name = this.goods_info.goods_name;
      return name.length > 15 ? name.substring(0, 13) + '...' : name;
    },
    // 显示已保存的地址文本
    savedAddressText: function savedAddressText() {
      if (this.address && this.address.fullAddress) {
        return this.address.fullAddress;
      }
      return '';
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 157:
/*!**********************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/chat/chat.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=style&index=0&lang=scss& */ 158);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 158:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/chat/chat.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[151,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/chat/chat.js.map