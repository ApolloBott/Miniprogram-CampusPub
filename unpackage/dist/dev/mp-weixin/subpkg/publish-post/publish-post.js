(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg/publish-post/publish-post"],{

/***/ 182:
/*!***********************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/main.js?{"page":"subpkg%2Fpublish-post%2Fpublish-post"} ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _publishPost = _interopRequireDefault(__webpack_require__(/*! ./subpkg/publish-post/publish-post.vue */ 183));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_publishPost.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 183:
/*!****************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/publish-post/publish-post.vue ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _publish_post_vue_vue_type_template_id_2c5f9f3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./publish-post.vue?vue&type=template&id=2c5f9f3a& */ 184);
/* harmony import */ var _publish_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./publish-post.vue?vue&type=script&lang=js& */ 186);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _publish_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _publish_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _publish_post_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./publish-post.vue?vue&type=style&index=0&lang=scss& */ 188);
/* harmony import */ var _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _publish_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _publish_post_vue_vue_type_template_id_2c5f9f3a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _publish_post_vue_vue_type_template_id_2c5f9f3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _publish_post_vue_vue_type_template_id_2c5f9f3a___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg/publish-post/publish-post.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 184:
/*!***********************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/publish-post/publish-post.vue?vue&type=template&id=2c5f9f3a& ***!
  \***********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_template_id_2c5f9f3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./publish-post.vue?vue&type=template&id=2c5f9f3a& */ 185);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_template_id_2c5f9f3a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_template_id_2c5f9f3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_template_id_2c5f9f3a___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_template_id_2c5f9f3a___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 185:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/publish-post/publish-post.vue?vue&type=template&id=2c5f9f3a& ***!
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
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.selectedTagsInContent.length
  var g1 = _vm.postContent.length
  var g2 = _vm.postContent.length
  var g3 = _vm.selectedTagsInContent.length
  var g4 = g3 > 0 ? _vm.selectedTagsInContent.length : null
  var g5 = _vm.availableTags.length
  var g6 = _vm.selectedImages.length > 0 || !_vm.uploading
  var g7 = g6 ? _vm.selectedImages.length < 9 && !_vm.uploading : null
  var g8 = _vm.selectedTagsInContent.includes("二手")
  var g9 = _vm.excludeDepartments.length
  var g10 = !(g9 === 0) ? _vm.excludeDepartments.length : null
  var g11 = _vm.excludeDepartments.length
  var l0 = _vm.showModal
    ? _vm.__map(_vm.displayDepartments, function (dept, index) {
        var $orig = _vm.__get_orig(dept)
        var m0 = _vm.isDepartmentSelected(dept)
        var m1 = _vm.isDepartmentSelected(dept)
        return {
          $orig: $orig,
          m0: m0,
          m1: m1,
        }
      })
    : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        g2: g2,
        g3: g3,
        g4: g4,
        g5: g5,
        g6: g6,
        g7: g7,
        g8: g8,
        g9: g9,
        g10: g10,
        g11: g11,
        l0: l0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 186:
/*!*****************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/publish-post/publish-post.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./publish-post.vue?vue&type=script&lang=js& */ 187);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 187:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/publish-post/publish-post.vue?vue&type=script&lang=js& ***!
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
var _default = {
  data: function data() {
    return {
      postContent: '',
      selectedImages: [],
      imageUrls: [],
      // 🔥 修改：标签相关数据
      allTags: ['日常', '二手', '交友', '吐槽'],
      // 所有标签
      availableTags: ['日常', '二手', '交友', '吐槽'],
      // 当前可选择的标签
      selectedTagsInContent: [],
      // categories: ['日常', '二手', '交友', '吐槽'],
      // selectedCategory: [], // 🔥 UI层面仍使用数组
      isPublishing: false,
      uploading: false,
      enableGoodsLink: false,
      selectedGoods: null,
      relatedGoodsId: null,
      enableContact: false,
      contactInfo: '',
      excludeDepartments: [],
      includeDepartment: '',
      tempSelectedDepartments: [],
      tempSelectedDepartment: '',
      showModal: false,
      modalType: '',
      generatedBgImage: '',
      showVerificationTip: true,
      allDepartments: ['中国语言文学系', '国际汉语文化学院', '外语学院', '经济与管理学院', '亚欧商学院', '公共管理学院', '统计学院', '传播学院', '历史学系', '哲学系', '政治与国际关系学院', '马克思主义学院', '法学院', '社会发展学院', '教育学部', '心理与认知科学学院', '数学科学学院', '物理与电子科学学院', '通信与电子工程学院', '计算机科学与技术学院', '软件工程学院', '数据科学与工程学院', '化学与分子工程学院', '生命科学学院', '地理科学学院', '生态与环境科学学院', '空间人工智能学院', '美术学院', '设计学院', '音乐学院', '体育与健康学院'],
      // 🔥 新增:仅自己可见开关
      onlyMyself: false // 默认关闭
    };
  },

  computed: _objectSpread(_objectSpread({}, (0, _vuex.mapState)('m_user', ['openid', 'userBase'])), {}, {
    isTopicDiscussion: function isTopicDiscussion() {
      return this.imageUrls.length > 0;
    },
    displayDepartments: function displayDepartments() {
      if (this.modalType === 'include') {
        return this.userBase.major ? [this.userBase.major] : [];
      } else {
        return this.allDepartments;
      }
    },
    verificationStatusClass: function verificationStatusClass() {
      if (!this.userBase || this.userBase.is_verified === undefined) {
        return 'status-loading';
      }
      switch (this.userBase.is_verified) {
        case 0:
          return 'status-unverified';
        case 1:
          return 'status-verified';
        case 2:
          return 'status-pending';
        case 3:
          return 'status-failed';
        default:
          return 'status-unverified';
      }
    },
    verificationStatusIcon: function verificationStatusIcon() {
      if (!this.userBase || this.userBase.is_verified === undefined) {
        return '⏳';
      }
      switch (this.userBase.is_verified) {
        case 0:
          return '🔒';
        case 1:
          return '✅';
        case 2:
          return '⏳';
        case 3:
          return '❌';
        default:
          return '🔒';
      }
    },
    verificationStatusTitle: function verificationStatusTitle() {
      if (!this.userBase || this.userBase.is_verified === undefined) {
        return '加载中...';
      }
      switch (this.userBase.is_verified) {
        case 0:
          return '校园认证未完成';
        case 1:
          return '校园认证已完成';
        case 2:
          return '校园认证审核中';
        case 3:
          return '校园认证失败';
        default:
          return '校园认证未完成';
      }
    },
    verificationStatusDesc: function verificationStatusDesc() {
      if (!this.userBase || this.userBase.is_verified === undefined) {
        return '正在获取认证状态...';
      }
      switch (this.userBase.is_verified) {
        case 0:
          return '发布帖子需要完成校园认证';
        case 1:
          return '您可以正常发布帖子';
        case 2:
          return '请等待管理员审核，暂时无法发布帖子';
        case 3:
          return '认证失败，请重新提交认证申请';
        default:
          return '发布帖子需要完成校园认证';
      }
    }
  }),
  methods: _objectSpread(_objectSpread({}, (0, _vuex.mapMutations)('m_user', ['updateUserBase'])), {}, {
    // 🔥 新增:切换仅自己可见
    toggleOnlyMyself: function toggleOnlyMyself() {
      this.onlyMyself = !this.onlyMyself;
      if (this.onlyMyself) {
        // 开启仅自己可见后,清除发布范围设置(可选)
        if (this.excludeDepartments.length > 0 || this.includeDepartment) {
          uni.showModal({
            title: '提示',
            content: '开启"仅自己可见"后,发布范围设置将被忽略',
            showCancel: false
          });
        }
      }
    },
    // 🔥 修改：添加标签（不加入到内容中）
    addTag: function addTag(tag) {
      if (this.selectedTagsInContent.length >= 3) {
        uni.showToast({
          title: '最多只能选择3个标签',
          icon: 'none',
          duration: 1500
        });
        return;
      }

      // ✅ 只更新已选标签数组，不修改 postContent
      this.selectedTagsInContent.push(tag);

      // 从可选标签中移除
      var index = this.availableTags.indexOf(tag);
      if (index > -1) {
        this.availableTags.splice(index, 1);
      }

      // 如果是"二手"标签，自动启用商品关联
      if (tag === '二手') {
        this.enableGoodsLink = true;
      }
      console.log('✅ 添加标签:', tag);
    },
    // 🔥 新增：移除标签方法
    removeTag: function removeTag(tag) {
      var index = this.selectedTagsInContent.indexOf(tag);
      if (index > -1) {
        this.selectedTagsInContent.splice(index, 1);

        // 重新添加到可选列表
        if (!this.availableTags.includes(tag)) {
          this.availableTags.push(tag);
        }

        // 如果删除的是"二手"标签，清除商品关联
        if (tag === '二手') {
          this.enableGoodsLink = false;
          this.selectedGoods = null;
          this.relatedGoodsId = null;
        }
        console.log('🗑️ 删除标签:', tag);
      }
    },
    gotoGenerateBgImage: function gotoGenerateBgImage() {
      var _this = this;
      if (!this.postContent.trim()) {
        uni.showToast({
          title: '请先输入内容',
          icon: 'none'
        });
        return;
      }
      if (this.postContent.trim().length > 200) {
        uni.showToast({
          title: '内容过长，建议不超过200字',
          icon: 'none'
        });
        return;
      }
      if (this.selectedImages.length >= 9) {
        uni.showToast({
          title: '最多只能上传9张图片',
          icon: 'none'
        });
        return;
      }
      uni.navigateTo({
        url: "/subpkg/text-to-image/text-to-image?content=".concat(encodeURIComponent(this.postContent.trim()), "&isTopic=1"),
        events: {
          selectBgImage: function selectBgImage(data) {
            if (_this.generatedBgImage) {
              var oldIndex = _this.selectedImages.indexOf(_this.generatedBgImage);
              if (oldIndex > -1) {
                _this.selectedImages.splice(oldIndex, 1);
                _this.imageUrls.splice(oldIndex, 1);
              }
            }
            _this.generatedBgImage = data.imageUrl;
            _this.selectedImages.push(data.imageUrl);
            _this.imageUrls.push(data.imageUrl);
            console.log('✅ 已选择话题背景图:', data.imageUrl);
          }
        }
      });
    },
    gotoVerification: function gotoVerification() {
      uni.navigateTo({
        url: '/subpkg/verification/verification'
      });
    },
    checkVerificationStatus: function checkVerificationStatus() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var queryObj, _yield$uni$$http$get, res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                if (_this2.openid) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return");
              case 3:
                queryObj = {
                  code: _this2.openid
                };
                _context.next = 6;
                return uni.$http.get('/users/userinfo', queryObj);
              case 6:
                _yield$uni$$http$get = _context.sent;
                res = _yield$uni$$http$get.data;
                if (res.meta.status === 200) {
                  _this2.updateUserBase(res.message);
                  console.log('🔍 认证状态检查:', {
                    is_verified: res.message.is_verified,
                    nickname: res.message.nickname,
                    major: res.message.major
                  });
                }
                _context.next = 14;
                break;
              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                console.error('检查认证状态失败:', _context.t0);
              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }))();
    },
    toggleGoodsLink: function toggleGoodsLink() {
      this.enableGoodsLink = !this.enableGoodsLink;
      if (!this.enableGoodsLink) {
        this.selectedGoods = null;
        this.relatedGoodsId = null;
      }
    },
    gotoSelectGoods: function gotoSelectGoods() {
      var _this3 = this;
      if (!this.userBase.goods_id || this.userBase.goods_id.length === 0) {
        uni.showToast({
          title: '您还没有发布商品',
          icon: 'none'
        });
        return;
      }
      uni.navigateTo({
        url: '/subpkg/goods-selector/goods-selector',
        events: {
          selectGoods: function selectGoods(data) {
            _this3.selectedGoods = data.goods;
            _this3.relatedGoodsId = data.goods_id;
            console.log('✅ 已选择商品:', data.goods.goods_name);
          }
        }
      });
    },
    toggleContact: function toggleContact() {
      this.enableContact = !this.enableContact;
      if (!this.enableContact) {
        this.contactInfo = '';
      }
    },
    chooseImage: function chooseImage() {
      var _this4 = this;
      var maxCount = 9 - this.selectedImages.length;
      if (maxCount <= 0) {
        uni.showToast({
          title: '最多只能上传9张图片',
          icon: 'none'
        });
        return;
      }
      uni.chooseImage({
        count: maxCount,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function () {
          var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(res) {
            var tempFiles;
            return _regenerator.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    tempFiles = res.tempFilePaths;
                    _this4.selectedImages = _this4.selectedImages.concat(tempFiles);
                    _context2.next = 4;
                    return _this4.uploadImages(tempFiles);
                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));
          function success(_x) {
            return _success.apply(this, arguments);
          }
          return success;
        }()
      });
    },
    uploadImages: function uploadImages(filePaths) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var uploadedUrls, _loop, i;
        return _regenerator.default.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!filePaths || filePaths.length === 0)) {
                  _context4.next = 2;
                  break;
                }
                return _context4.abrupt("return", []);
              case 2:
                _this5.uploading = true;
                uni.showLoading({
                  title: "\u4E0A\u4F20\u4E2D 0/".concat(filePaths.length),
                  mask: true
                });
                _context4.prev = 4;
                uploadedUrls = [];
                _loop = /*#__PURE__*/_regenerator.default.mark(function _loop(i) {
                  var filePath, _yield$uni$$http$get2, tokenRes, fileContent;
                  return _regenerator.default.wrap(function _loop$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          filePath = filePaths[i];
                          uni.showLoading({
                            title: "\u4E0A\u4F20\u4E2D ".concat(i + 1, "/").concat(filePaths.length),
                            mask: true
                          });
                          console.log("[".concat(i + 1, "] \u83B7\u53D6\u4E0A\u4F20\u51ED\u8BC1..."));
                          _context3.next = 5;
                          return uni.$http.get('/upload/token', {
                            openid: _this5.openid,
                            fileType: 'image'
                          });
                        case 5:
                          _yield$uni$$http$get2 = _context3.sent;
                          tokenRes = _yield$uni$$http$get2.data;
                          if (!(tokenRes.meta.status !== 200)) {
                            _context3.next = 9;
                            break;
                          }
                          throw new Error('获取上传凭证失败');
                        case 9:
                          _context3.next = 11;
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
                        case 11:
                          fileContent = _context3.sent;
                          _context3.next = 14;
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
                        case 14:
                          uploadedUrls.push(tokenRes.message.publicUrl);
                          console.log("[".concat(i + 1, "] \u4E0A\u4F20\u6210\u529F:"), tokenRes.message.publicUrl);
                        case 16:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _loop);
                });
                i = 0;
              case 8:
                if (!(i < filePaths.length)) {
                  _context4.next = 13;
                  break;
                }
                return _context4.delegateYield(_loop(i), "t0", 10);
              case 10:
                i++;
                _context4.next = 8;
                break;
              case 13:
                _this5.imageUrls = _this5.imageUrls.concat(uploadedUrls);
                uni.hideLoading();
                uni.showToast({
                  title: '图片上传成功',
                  icon: 'success',
                  duration: 1500
                });
                console.log('✅ 所有图片上传完成:', _this5.imageUrls);
                return _context4.abrupt("return", uploadedUrls);
              case 20:
                _context4.prev = 20;
                _context4.t1 = _context4["catch"](4);
                console.error('[ERROR] 上传失败:', _context4.t1);
                uni.hideLoading();
                uni.showToast({
                  title: _context4.t1.message || '上传失败',
                  icon: 'none',
                  duration: 3000
                });
                filePaths.forEach(function (path) {
                  var index = _this5.selectedImages.indexOf(path);
                  if (index > -1) {
                    _this5.selectedImages.splice(index, 1);
                  }
                });
                return _context4.abrupt("return", []);
              case 27:
                _context4.prev = 27;
                _this5.uploading = false;
                return _context4.finish(27);
              case 30:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, null, [[4, 20, 27, 30]]);
      }))();
    },
    deleteImage: function deleteImage(index) {
      var deletedImage = this.selectedImages[index];
      if (deletedImage === this.generatedBgImage) {
        this.generatedBgImage = '';
      }
      this.selectedImages.splice(index, 1);
      this.imageUrls.splice(index, 1);
    },
    // 🔥 分类选择逻辑（UI层面仍使用数组）
    selectCategory: function selectCategory(category) {
      var index = this.selectedCategory.indexOf(category);
      if (index > -1) {
        // 已选中，取消选中
        this.selectedCategory.splice(index, 1);

        // 如果取消的是"二手"，清除商品关联
        if (category === '二手') {
          this.enableGoodsLink = false;
          this.selectedGoods = null;
          this.relatedGoodsId = null;
        }
      } else {
        // 未选中，检查是否超过3个
        if (this.selectedCategory.length >= 3) {
          uni.showToast({
            title: '最多只能选择3个分类',
            icon: 'none',
            duration: 1500
          });
          return;
        }

        // 添加选中
        this.selectedCategory.push(category);
      }
      console.log('📝 当前选中分类（数组）:', this.selectedCategory);
    },
    showDepartmentPicker: function showDepartmentPicker(type) {
      if (type === 'exclude' && this.includeDepartment) {
        uni.showToast({
          title: '已设置"只发布到"，不能同时设置',
          icon: 'none'
        });
        return;
      }
      if (type === 'include' && this.excludeDepartments.length > 0) {
        uni.showToast({
          title: '已设置"不发布到"，不能同时设置',
          icon: 'none'
        });
        return;
      }
      if (type === 'include' && !this.userBase.major) {
        uni.showToast({
          title: '您的个人信息中未设置院系',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      this.modalType = type;
      if (type === 'exclude') {
        this.tempSelectedDepartments = (0, _toConsumableArray2.default)(this.excludeDepartments);
      } else {
        this.tempSelectedDepartment = this.includeDepartment;
      }
      this.showModal = true;
    },
    closeModal: function closeModal() {
      this.showModal = false;
      this.tempSelectedDepartments = [];
      this.tempSelectedDepartment = '';
    },
    isDepartmentSelected: function isDepartmentSelected(dept) {
      if (this.modalType === 'exclude') {
        return this.tempSelectedDepartments.includes(dept);
      } else {
        return this.tempSelectedDepartment === dept;
      }
    },
    toggleDepartment: function toggleDepartment(dept) {
      if (this.modalType === 'exclude') {
        var index = this.tempSelectedDepartments.indexOf(dept);
        if (index > -1) {
          this.tempSelectedDepartments.splice(index, 1);
        } else {
          this.tempSelectedDepartments.push(dept);
        }
      } else {
        if (this.tempSelectedDepartment === dept) {
          this.tempSelectedDepartment = '';
        } else {
          this.tempSelectedDepartment = dept;
        }
      }
    },
    confirmDepartments: function confirmDepartments() {
      if (this.modalType === 'exclude') {
        this.excludeDepartments = (0, _toConsumableArray2.default)(this.tempSelectedDepartments);
      } else {
        this.includeDepartment = this.tempSelectedDepartment;
      }
      this.closeModal();
    },
    removeDepartment: function removeDepartment(type, index) {
      if (type === 'exclude') {
        this.excludeDepartments.splice(index, 1);
      }
    },
    clearIncludeDepartment: function clearIncludeDepartment() {
      this.includeDepartment = '';
    },
    validateForm: function validateForm() {
      // 使用纯内容（不包含标签）
      var pureContent = this.postContent.trim();
      if (!pureContent && this.selectedImages.length === 0) {
        uni.showToast({
          title: '请输入帖子内容或上传图片',
          icon: 'none'
        });
        return false;
      }
      if (pureContent.length > 500) {
        uni.showToast({
          title: '内容长度不能超过500字',
          icon: 'none'
        });
        return false;
      }
      if (!pureContent) {
        uni.showToast({
          title: '请输入帖子内容',
          icon: 'none'
        });
        return false;
      }
      if (pureContent.length < 1) {
        uni.showToast({
          title: '内容不能为空',
          icon: 'none'
        });
        return false;
      }
      if (this.selectedImages.length > 9) {
        uni.showToast({
          title: '最多只能上传9张图片',
          icon: 'none'
        });
        return false;
      }
      if (this.enableContact && !this.contactInfo.trim()) {
        uni.showToast({
          title: '请输入联系方式',
          icon: 'none'
        });
        return false;
      }
      if (this.enableContact && this.contactInfo.trim().length > 50) {
        uni.showToast({
          title: '联系方式长度不能超过50字符',
          icon: 'none'
        });
        return false;
      }

      // 🔥 修改：检查"二手"标签的商品关联
      if (this.selectedTagsInContent.includes('二手') && this.enableGoodsLink && !this.relatedGoodsId) {
        uni.showToast({
          title: '请选择要关联的商品',
          icon: 'none'
        });
        return false;
      }
      if (this.excludeDepartments.length > 0 && this.includeDepartment) {
        uni.showToast({
          title: '不能同时设置"不发布到"和"只发布到"',
          icon: 'none'
        });
        return false;
      }
      return true;
    },
    publishPost: function publishPost() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var _this6$userBase, _this6$userBase2, title, content, finalImages, pureContent, propertiesString, _yield$uni$$http$post, res;
        return _regenerator.default.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                console.log('[0] 检查用户认证状态...');
                console.log('用户认证状态:', _this6.userBase.is_verified);
                if (!(!_this6.userBase || _this6.userBase.is_verified !== 1)) {
                  _context5.next = 20;
                  break;
                }
                title = '认证提醒';
                content = '发布帖子需要完成校园认证,是否前往认证?';
                _context5.t0 = (_this6$userBase = _this6.userBase) === null || _this6$userBase === void 0 ? void 0 : _this6$userBase.is_verified;
                _context5.next = _context5.t0 === 0 ? 9 : _context5.t0 === 2 ? 11 : _context5.t0 === 3 ? 15 : 17;
                break;
              case 9:
                content = '发布帖子需要完成校园认证,是否前往认证?';
                return _context5.abrupt("break", 18);
              case 11:
                title = '审核中';
                content = '您的认证申请正在审核中,暂时无法发布帖子';
                uni.showToast({
                  title: '认证审核中,暂时无法发布',
                  icon: 'none',
                  duration: 2000
                });
                return _context5.abrupt("return");
              case 15:
                content = '您的认证申请被拒绝,请重新提交认证申请';
                return _context5.abrupt("break", 18);
              case 17:
                content = '发布帖子需要完成校园认证,是否前往认证?';
              case 18:
                if (((_this6$userBase2 = _this6.userBase) === null || _this6$userBase2 === void 0 ? void 0 : _this6$userBase2.is_verified) !== 2) {
                  uni.showModal({
                    title: title,
                    content: content,
                    confirmText: '去认证',
                    cancelText: '取消',
                    success: function success(res) {
                      if (res.confirm) {
                        uni.navigateTo({
                          url: '/subpkg/verification/verification'
                        });
                      }
                    }
                  });
                }
                return _context5.abrupt("return");
              case 20:
                if (_this6.validateForm()) {
                  _context5.next = 22;
                  break;
                }
                return _context5.abrupt("return");
              case 22:
                if (_this6.openid) {
                  _context5.next = 25;
                  break;
                }
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                return _context5.abrupt("return");
              case 25:
                if (!_this6.uploading) {
                  _context5.next = 28;
                  break;
                }
                uni.showToast({
                  title: '图片上传中,请稍候',
                  icon: 'none'
                });
                return _context5.abrupt("return");
              case 28:
                if (!_this6.isPublishing) {
                  _context5.next = 30;
                  break;
                }
                return _context5.abrupt("return");
              case 30:
                _this6.isPublishing = true;
                uni.showLoading({
                  title: '发布中...',
                  mask: true
                });
                finalImages = (0, _toConsumableArray2.default)(_this6.imageUrls); // ✅ 使用纯内容（不包含标签）
                pureContent = _this6.postContent.trim(); // ✅ 标签转为字符串
                propertiesString = _this6.selectedTagsInContent.length > 0 ? _this6.selectedTagsInContent.join(',') : 'null';
                console.log('📤 发送数据:', {
                  content: pureContent,
                  // 纯内容
                  properties: propertiesString // 标签字符串
                });
                _context5.next = 38;
                return uni.$http.post('/posts/create', {
                  openid: _this6.openid,
                  nickname: _this6.userBase.nickname || '用户',
                  avatar: _this6.userBase.avatarUrl || '',
                  content: pureContent,
                  // ✅ 只发送纯内容
                  properties: propertiesString,
                  // ✅ 标签单独发送
                  images: finalImages,
                  excludeDepartments: _this6.excludeDepartments,
                  includeDepartment: _this6.includeDepartment,
                  contactInfo: _this6.enableContact ? _this6.contactInfo.trim() : null,
                  relatedGoodsId: _this6.enableGoodsLink ? _this6.relatedGoodsId : null,
                  isTopicDiscussion: _this6.isTopicDiscussion,
                  onlyMyself: _this6.onlyMyself ? 1 : 0 // 🔥 新增这一行
                });
              case 38:
                _yield$uni$$http$post = _context5.sent;
                res = _yield$uni$$http$post.data;
                uni.hideLoading();
                if (res.meta.status === 201) {
                  // 清空分类数组
                  _this6.selectedTagsInContent = [];
                  _this6.availableTags = ['日常', '二手', '交友', '吐槽'];
                  // 清空其他表单
                  _this6.postContent = '';
                  _this6.selectedImages = [];
                  _this6.imageUrls = [];
                  _this6.excludeDepartments = [];
                  _this6.includeDepartment = '';
                  _this6.enableContact = false;
                  _this6.contactInfo = '';
                  _this6.enableGoodsLink = false;
                  _this6.selectedGoods = null;
                  _this6.relatedGoodsId = null;
                  _this6.generatedBgImage = '';
                  _this6.onlyMyself = false; // 🔥 新增:重置仅自己可见状态

                  uni.showToast({
                    title: '发布成功',
                    icon: 'success',
                    duration: 1500
                  });
                  setTimeout(function () {
                    uni.switchTab({
                      url: '/pages/home/home'
                    });
                  }, 1500);
                  console.log('✅ 发布成功,帖子ID:', res.message.post_id);
                } else {
                  uni.showToast({
                    title: res.meta.msg || '发布失败',
                    icon: 'none'
                  });
                }
                _context5.next = 49;
                break;
              case 44:
                _context5.prev = 44;
                _context5.t1 = _context5["catch"](0);
                uni.hideLoading();
                console.error('❌ 发布帖子失败:', _context5.t1);
                uni.showToast({
                  title: '发布失败,请重试',
                  icon: 'none'
                });
              case 49:
                _context5.prev = 49;
                _this6.isPublishing = false;
                return _context5.finish(49);
              case 52:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, null, [[0, 44, 49, 52]]);
      }))();
    }
  }),
  onShow: function onShow() {
    var _this7 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
      return _regenerator.default.wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _this7.checkVerificationStatus();
            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee5);
    }))();
  },
  onLoad: function onLoad(options) {
    var _this8 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
      var images, eventChannel;
      return _regenerator.default.wrap(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (options.content) {
                try {
                  _this8.postContent = decodeURIComponent(options.content);
                } catch (error) {
                  console.error('❌ 解析 URL 参数失败:', error);
                }
              }

              // 🔥 新增：接收图片数据
              if (options.images) {
                try {
                  images = JSON.parse(decodeURIComponent(options.images));
                  if (Array.isArray(images) && images.length > 0) {
                    _this8.selectedImages = images;
                    _this8.imageUrls = images;
                    console.log('✅ 已接收图片:', images);
                  }
                } catch (error) {
                  console.error('❌ 解析图片数据失败:', error);
                }
              }
              eventChannel = _this8.getOpenerEventChannel();
              if (eventChannel) {
                eventChannel.on('topicImageData', function (data) {
                  console.log('📥 收到话题图片数据:', data);
                  if (data.content) {
                    _this8.postContent = data.content;
                  }

                  // 🔥 优先使用 images 数组（包含所有图片）
                  if (data.images && Array.isArray(data.images) && data.images.length > 0) {
                    _this8.selectedImages = data.images;
                    _this8.imageUrls = data.images;
                    console.log('✅ 已接收所有图片（背景图 + topic 图片）:', data.images);
                  } else if (data.imageUrl) {
                    _this8.selectedImages = [data.imageUrl];
                    _this8.imageUrls = [data.imageUrl];
                    _this8.generatedBgImage = data.imageUrl;
                  }
                  if (data.isTopic !== undefined) {
                    _this8.isTopic = data.isTopic;
                  }
                  uni.showToast({
                    title: '话题背景图已添加',
                    icon: 'success',
                    duration: 1500
                  });
                });
                eventChannel.on('topicTextData', function (data) {
                  console.log('📥 收到纯文本话题数据:', data);
                  if (data.content) {
                    _this8.postContent = data.content;
                  }
                  uni.showToast({
                    title: '话题内容已添加',
                    icon: 'success',
                    duration: 1000
                  });
                });
                eventChannel.on('uploadImages', function (data) {
                  if (data.images && data.images.length > 0) {
                    _this8.selectedImages = data.images;
                    _this8.uploadImages(data.images);
                  }
                });
              }
              _context7.next = 6;
              return _this8.checkVerificationStatus();
            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee6);
    }))();
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 188:
/*!**************************************************************************************************************************************!*\
  !*** D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/publish-post/publish-post.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./publish-post.vue?vue&type=style&index=0&lang=scss& */ 189);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_publish_post_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 189:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.4.76.2025082103/HBuilderX/project/shopping/subpkg/publish-post/publish-post.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[182,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/publish-post/publish-post.js.map