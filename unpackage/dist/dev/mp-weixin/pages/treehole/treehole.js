(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/treehole/treehole"],{

/***/ 158:
/*!**********************************************************************************************!*\
  !*** E:/ECNU/front-end/Miniprogram-CampusPub/main.js?{"page":"pages%2Ftreehole%2Ftreehole"} ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _treehole = _interopRequireDefault(__webpack_require__(/*! ./pages/treehole/treehole.vue */ 159));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_treehole.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 159:
/*!***************************************************************************!*\
  !*** E:/ECNU/front-end/Miniprogram-CampusPub/pages/treehole/treehole.vue ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _treehole_vue_vue_type_template_id_0d7ebf74_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./treehole.vue?vue&type=template&id=0d7ebf74&scoped=true& */ 160);
/* harmony import */ var _treehole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./treehole.vue?vue&type=script&lang=js& */ 162);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _treehole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _treehole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _treehole_vue_vue_type_style_index_0_id_0d7ebf74_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./treehole.vue?vue&type=style&index=0&id=0d7ebf74&lang=scss&scoped=true& */ 164);
/* harmony import */ var _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _treehole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _treehole_vue_vue_type_template_id_0d7ebf74_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _treehole_vue_vue_type_template_id_0d7ebf74_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0d7ebf74",
  null,
  false,
  _treehole_vue_vue_type_template_id_0d7ebf74_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/treehole/treehole.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 160:
/*!**********************************************************************************************************************!*\
  !*** E:/ECNU/front-end/Miniprogram-CampusPub/pages/treehole/treehole.vue?vue&type=template&id=0d7ebf74&scoped=true& ***!
  \**********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_template_id_0d7ebf74_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./treehole.vue?vue&type=template&id=0d7ebf74&scoped=true& */ 161);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_template_id_0d7ebf74_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_template_id_0d7ebf74_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_template_id_0d7ebf74_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_template_id_0d7ebf74_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 161:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/ECNU/front-end/Miniprogram-CampusPub/pages/treehole/treehole.vue?vue&type=template&id=0d7ebf74&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var l0 =
    _vm.sortMode === "topic"
      ? _vm.__map(_vm.leftColumnPosts, function (post, __i0__) {
          var $orig = _vm.__get_orig(post)
          var g0 = post.images && post.images.length > 0
          return {
            $orig: $orig,
            g0: g0,
          }
        })
      : null
  var l1 =
    _vm.sortMode === "topic"
      ? _vm.__map(_vm.rightColumnPosts, function (post, __i1__) {
          var $orig = _vm.__get_orig(post)
          var g1 = post.images && post.images.length > 0
          return {
            $orig: $orig,
            g1: g1,
          }
        })
      : null
  var l3 = !(_vm.sortMode === "topic")
    ? _vm.__map(_vm.postList, function (post, __i2__) {
        var $orig = _vm.__get_orig(post)
        var g2 = post.images && post.images.length > 0
        var l2 = g2
          ? _vm.__map(post.images, function (img, imgIndex) {
              var $orig = _vm.__get_orig(img)
              var g3 = post.images.length
              var g4 = post.images.length
              var g5 = post.images.length
              var g6 = post.images.length
              return {
                $orig: $orig,
                g3: g3,
                g4: g4,
                g5: g5,
                g6: g6,
              }
            })
          : null
        return {
          $orig: $orig,
          g2: g2,
          l2: l2,
        }
      })
    : null
  var g7 = !(_vm.sortMode === "topic")
    ? _vm.postList.length === 0 && !_vm.isLoading
    : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        l1: l1,
        l3: l3,
        g7: g7,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 162:
/*!****************************************************************************************************!*\
  !*** E:/ECNU/front-end/Miniprogram-CampusPub/pages/treehole/treehole.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./treehole.vue?vue&type=script&lang=js& */ 163);
/* harmony import */ var _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 163:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/ECNU/front-end/Miniprogram-CampusPub/pages/treehole/treehole.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _vuex = __webpack_require__(/*! vuex */ 33);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    return {
      sortMode: 'hottest',
      // 'latest', 'hottest', 'topic'
      filterMode: 'all',
      // 'all' 或 'department'
      categoryMode: 'recommend',
      // 🔥 新增：二级分类 'recommend', 'daily', 'friend', 'complaint'
      showFilterMenu: false,
      showMessage: false,
      messageText: '',
      postList: [],
      excludePostIds: [],
      page: 1,
      pageSize: 10,
      isLoading: false,
      isLoadingMore: false,
      hasMore: true,
      leftColumnHeight: 0,
      rightColumnHeight: 0,
      imageHeights: {},
      iconLikeUrl: 'https://img.xinshi00.com/label/like.png',
      iconLikedUrl: 'https://img.xinshi00.com/label/liked.png',
      iconCommentUrl: 'https://img.xinshi00.com/label/chat.png',
      iconFilterAllUrl: 'https://img.xinshi00.com/label/shaixuan.png',
      iconFilterDeptUrl: 'https://img.xinshi00.com/label/department.png',
      iconSearchUrl: 'https://img.xinshi00.com/label/search.png',
      iconMenuAllUrl: 'https://img.xinshi00.com/label/school.png',
      // 🔥 修改：导航栏控制
      isNavHidden: false,
      navTransform: 'translateY(0)',
      // 🔥 新增：分类栏单独控制
      isCategoryHidden: false,
      categoryTransform: 'translateY(0)',
      // 滚动控制
      lastScrollTop: 0,
      categoryScrollThreshold: 80,
      scrollDirection: 'down',
      tabBarInstance: null,
      // --- ⬇️ 修改：登录跳转逻辑 ⬇️ ---
      redirectTimer: null,
      // Renamed from loginRedirectTimer
      isRedirecting: false,
      // 🔥 新增：跳转“门锁”
      // --- ⬆️ 修改：登录跳转逻辑 ⬆️ ---
      bannerList: [],
      menuItems: [{
        name: '我发布的',
        icon: '📝',
        route: '/subpkg/my-posts/my-posts'
      }, {
        name: '我删除的',
        icon: '🛍️',
        route: '/subpkg/my-deleted-posts/my-deleted-posts'
      }, {
        name: '我点赞的',
        icon: '💰',
        route: '/subpkg/like/like'
      }, {
        name: '我评论的',
        icon: '⭐',
        route: '/subpkg/my-post-comments/my-post-comments'
      }],
      showSideMenu: false
    };
  },
  // 🔥 修改：onShow - 重置导航栏
  onShow: function onShow() {
    var _this = this;
    // 检查当前页面是否是栈顶页面
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    var currentRoute = currentPage.route;

    // 只有当前页面是 home 时才更新
    if (currentRoute === 'pages/home/home' && this.tabBarInstance) {
      this.tabBarInstance.setData({
        selected: 3
      });
    }
    this.resetNavBar();
    // --- ⬇️ 修改：登录检查与跳转逻辑 ⬇️ ---

    // 1. 页面显示时，先清除可能存在的旧定时器
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
      this.redirectTimer = null;
    }

    // 2. 🔥 检查是否正在跳转中，如果是，则阻止后续操作
    if (this.isRedirecting) {
      console.log('🔄 正在跳转中，阻止 onShow 再次执行');
      return;
    }

    // 3. 检查用户是否未登录
    if (!this.openid) {
      console.log('🤔 用户未登录，立即准备跳转到 "我的" 页面');

      // 4. 🔥 立即“上锁”，防止快速点击
      this.isRedirecting = true;

      // 6. 设置1.5秒定时器，等Toast显示完毕后再跳转
      this.redirectTimer = setTimeout(function () {
        console.log('⏰ Toast结束，执行跳转...');
        uni.switchTab({
          url: '/pages/my/my'
        });
        _this.redirectTimer = null; // 清除定时器ID
      }, 1500); // 1500毫秒 = 1.5秒 (匹配Toast时长)
    } else {
      // 7. 用户已登录，确保“门锁”是打开的
      this.isRedirecting = false;
    }
  },
  // --- ⬇️ 新增：页面隐藏时清除定时器 ⬇️ ---
  onHide: function onHide() {
    // 1. 如果定时器存在，则清除它
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
      this.redirectTimer = null;
      console.log('👋 页面隐藏，清除跳转定时器');
    }

    // 2. 🔥 重置“门锁”
    // 这样即使用户在1.5秒内切换到其他页面再切回来，
    // 登录检查也会重新触发
    this.isRedirecting = false;
  },
  onPullDownRefresh: function onPullDownRefresh() {
    console.log('📱 触发下拉刷新');
    this.refreshPostList();
  },
  onReachBottom: function onReachBottom() {
    console.log('📱 触发上拉加载更多');
    this.loadMore();
  },
  onLoad: function onLoad() {
    var _this2 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('🚀 页面加载，开始获取帖子列表');
              // ✅ 加载轮播图数据
              _context.next = 3;
              return _this2.loadBannerList();
            case 3:
              _context.next = 5;
              return _this2.loadPostList();
            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  onReady: function onReady() {
    if (typeof this.$scope.getTabBar === 'function') {
      this.tabBarInstance = this.$scope.getTabBar();
    }
  },
  // 🔥 新增：监听页面滚动
  onPageScroll: function onPageScroll(e) {
    this.handlePageScroll(e);
  },
  computed: _objectSpread(_objectSpread({}, (0, _vuex.mapState)('m_user', ['openid', 'userBase', 'preference'])), {}, {
    // ✅ 新增：获取用户关注列表
    followingIds: function followingIds() {
      if (!this.userBase || !this.userBase.following_ids) {
        return '';
      }

      // 如果是数组，转为逗号分隔的字符串
      if (Array.isArray(this.userBase.following_ids)) {
        return this.userBase.following_ids.join(',');
      }

      // 如果已经是字符串，直接返回
      return this.userBase.following_ids;
    },
    leftColumnPosts: function leftColumnPosts() {
      var _this3 = this;
      if (this.sortMode !== 'topic') return [];
      var leftHeight = 0;
      var rightHeight = 0;
      var left = [];

      // 更新基础卡片高度
      // 内容76 + 头像44 + 底部42 = 162rpx
      var baseCardHeight = 162;
      this.postList.forEach(function (post) {
        var imageHeight = _this3.imageHeights[post.id] || 300;
        var cardHeight = imageHeight + baseCardHeight;
        if (leftHeight <= rightHeight) {
          left.push(post);
          leftHeight += cardHeight;
        } else {
          rightHeight += cardHeight;
        }
      });
      return left;
    },
    rightColumnPosts: function rightColumnPosts() {
      var _this4 = this;
      if (this.sortMode !== 'topic') return [];
      var leftHeight = 0;
      var rightHeight = 0;
      var right = [];
      var baseCardHeight = 162;
      this.postList.forEach(function (post) {
        var imageHeight = _this4.imageHeights[post.id] || 300;
        var cardHeight = imageHeight + baseCardHeight;
        if (leftHeight <= rightHeight) {
          leftHeight += cardHeight;
        } else {
          right.push(post);
          rightHeight += cardHeight;
        }
      });
      return right;
    },
    showLoadMore: function showLoadMore() {
      return this.postList.length > 0 && (this.hasMore || this.isLoadingMore);
    }
  }),
  methods: _objectSpread(_objectSpread({
    openSideMenu: function openSideMenu() {
      if (!this.openid) {
        uni.switchTab({
          url: '/pages/my/my'
        });
        return;
      }
      this.showSideMenu = true;
    },
    // 🔥 新增:关闭侧边菜单
    closeSideMenu: function closeSideMenu() {
      this.showSideMenu = false;
    },
    // 🔥 新增:处理菜单项点击
    handleMenuClick: function handleMenuClick(item) {
      this.closeSideMenu();

      // 延迟跳转,让关闭动画完成
      setTimeout(function () {
        uni.navigateTo({
          url: item.route,
          fail: function fail(err) {
            uni.showToast({
              title: '页面开发中',
              icon: 'none',
              duration: 2000
            });
          }
        });
      }, 300);
    },
    // ✅ 轮播图点击
    onBannerClick: function onBannerClick(banner) {
      switch (banner.type) {
        case 'page':
          uni.navigateTo({
            url: banner.url
          });
          break;
        case 'web':
          this.copyLinkAndNotify(banner.url, banner.title);
          break;
        default:
          console.warn('未知的跳转类型:', banner.type);
      }
    },
    // ✅ 新增：加载轮播图数据
    loadBannerList: function loadBannerList() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _yield$uni$$http$get, res;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return uni.$http.get('/board/recentlist');
              case 3:
                _yield$uni$$http$get = _context2.sent;
                res = _yield$uni$$http$get.data;
                if (res.meta.status === 200 && res.message && res.message.length > 0) {
                  // 将后端数据转换为轮播图格式
                  _this5.bannerList = res.message.map(function (board) {
                    return {
                      id: board.id,
                      title: board.description || '小黑板作品',
                      image: board.image_url,
                      url: '/subpkg/board/board',
                      type: 'page',
                      boardId: board.id // 保存小黑板ID，方便后续可能的详情跳转
                    };
                  });

                  console.log('✅ 轮播图加载成功:', _this5.bannerList.length, '张');
                } else {
                  console.warn('⚠️ 未获取到轮播图数据，使用默认图片');
                  _this5.setDefaultBanner();
                }
                _context2.next = 12;
                break;
              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                console.error('❌ 轮播图加载失败:', _context2.t0);
                _this5.setDefaultBanner();
              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }))();
    },
    // 🔥 新增：更新帖子点赞状态的方法
    updatePostLikeStatus: function updatePostLikeStatus(data) {
      var postId = data.postId,
        isLiked = data.isLiked,
        likeCount = data.likeCount;
      console.log('📥 收到点赞状态更新:', data);

      // 在 postList 中查找对应的帖子
      var index = this.postList.findIndex(function (post) {
        return post.id === postId;
      });
      console.log("imhere");
      console.log(index);
      if (index !== -1) {
        // 更新帖子的点赞状态
        this.postList[index].isLiked = isLiked;
        this.postList[index].likeCount = likeCount;

        // 强制更新视图
        this.$set(this.postList, index, _objectSpread({}, this.postList[index]));
        console.log("\u2705 \u5DF2\u66F4\u65B0\u5E16\u5B50 ".concat(postId, " \u7684\u70B9\u8D5E\u72B6\u6001:"), {
          isLiked: isLiked,
          likeCount: likeCount
        });
      } else {
        console.warn("\u26A0\uFE0F \u672A\u627E\u5230\u5E16\u5B50 ".concat(postId));
      }
    }
  }, (0, _vuex.mapMutations)('m_user', ['updateUserInfo', 'updateToken', 'updateUserBase', 'updatepreference'])), {}, {
    // 📌 切换分类时清空 excludePostIds
    selectCategory: function selectCategory(category) {
      if (this.categoryMode === category) return;
      this.categoryMode = category;
      this.isCategoryHidden = false;
      this.categoryTransform = 'translateY(0)';
      this.page = 1;
      this.postList = [];
      this.excludePostIds = []; // 🔥 清空
      this.hasMore = true;
      this.loadPostList();
      console.log("\uD83D\uDCC2 \u5207\u6362\u5206\u7C7B: ".concat(category, "\uFF0C\u5DF2\u6E05\u7A7A\u6392\u9664\u5217\u8868"));
    },
    setTabBarIndex: function setTabBarIndex(index) {
      var _this6 = this;
      // 立即尝试设置
      var trySetTabBar = function trySetTabBar() {
        if (typeof _this6.$scope.getTabBar === 'function') {
          var tabBar = _this6.$scope.getTabBar();
          if (tabBar && tabBar.setData) {
            tabBar.setData({
              selected: index
            });
            return true; // 设置成功
          }
        }

        return false; // 设置失败
      };

      // 第一次立即执行
      if (!trySetTabBar()) {
        // 如果失败,使用短延迟重试
        setTimeout(function () {
          trySetTabBar();
        }, 50);
      }
    },
    // 🔥 修改：handlePageScroll - 分别控制导航栏和分类栏
    handlePageScroll: function handlePageScroll(e) {
      var scrollTop = e.scrollTop;
      var delta = scrollTop - this.lastScrollTop;

      // 判断滚动方向
      if (delta > 0) {
        this.scrollDirection = 'down';
      } else if (delta < 0) {
        this.scrollDirection = 'up';
      }

      // 🔥 1. 控制主导航栏
      if (this.scrollDirection === 'down' && scrollTop > this.navScrollThreshold) {
        if (!this.isNavHidden) {
          this.isNavHidden = true;
          this.navTransform = 'translateY(-100%)';
        }
      } else if (this.scrollDirection === 'up') {
        if (this.isNavHidden) {
          this.isNavHidden = false;
          this.navTransform = 'translateY(0)';
        }
      }

      // 🔥 2. 控制分类栏（仅在"最新"模式下生效）
      if (this.sortMode === 'hottest') {
        if (this.scrollDirection === 'down' && scrollTop > this.categoryScrollThreshold) {
          // 向下滚动超过阈值 -> 隐藏分类栏
          if (!this.isCategoryHidden) {
            this.isCategoryHidden = true;
            this.categoryTransform = 'translateY(-100%)';
          }
        } else if (scrollTop <= 10) {
          // 🔥 关键：滚动到顶部（≤10px）-> 显示分类栏
          if (this.isCategoryHidden) {
            this.isCategoryHidden = false;
            this.categoryTransform = 'translateY(0)';
          }
        }
      }
      this.lastScrollTop = scrollTop;
    },
    // 🔥 修改：resetNavBar - 同时重置两个栏
    resetNavBar: function resetNavBar() {
      this.isNavHidden = false;
      this.navTransform = 'translateY(0)';

      // 🔥 新增：重置分类栏
      this.isCategoryHidden = false;
      this.categoryTransform = 'translateY(0)';
      this.lastScrollTop = 0;
      this.scrollDirection = 'down';
    },
    // 切换筛选菜单
    toggleFilterMenu: function toggleFilterMenu() {
      if (!this.openid) {
        uni.switchTab({
          url: '/pages/my/my'
        });
        return;
      }
      if (this.userBase.is_verified !== 1) {
        uni.showToast({
          title: '您还未完成校园认证，该功能暂时无法使用',
          icon: 'none',
          duration: 1000
        });
        uni.navigateTo({
          url: '/subpkg/verification/verification'
        });
        return;
      }
      this.showFilterMenu = !this.showFilterMenu;
    },
    // 关闭筛选菜单
    closeFilterMenu: function closeFilterMenu() {
      this.showFilterMenu = false;
    },
    // 📌 筛选模式切换时清空 excludePostIds
    selectFilterMode: function selectFilterMode(mode) {
      if (!this.openid) {
        uni.switchTab({
          url: '/pages/my/my'
        });
        return;
      }
      if (this.filterMode === mode) {
        this.closeFilterMenu();
        return;
      }
      if (mode === 'department' && !this.userBase.major) {
        this.showMessageToast('请先在个人中心设置院系');
        this.closeFilterMenu();
        return;
      }
      this.filterMode = mode;
      this.closeFilterMenu();
      this.resetNavBar();
      this.page = 1;
      this.postList = [];
      this.excludePostIds = []; // 🔥 清空
      this.hasMore = true;
      this.loadPostList();
      console.log("\uD83D\uDD04 \u5207\u6362\u7B5B\u9009: ".concat(mode, "\uFF0C\u5DF2\u6E05\u7A7A\u6392\u9664\u5217\u8868"));
    },
    // 🔥 新增：辅助方法 - 获取分类名称
    getCategoryName: function getCategoryName() {
      var categoryMap = {
        'daily': '日常',
        'friend': '交友',
        'complaint': '吐槽',
        'goods': '二手'
      };
      return categoryMap[this.categoryMode] || '';
    },
    // 📌 切换排序模式时清空 excludePostIds
    selectSortMode: function selectSortMode(mode) {
      if (this.sortMode === mode) return;

      // ✅ 新增：点击关注时的特殊处理
      if (mode === 'follow') {
        if (!this.openid) {
          uni.switchTab({
            url: '/pages/my/my'
          });
          return;
        }
        if (!this.followingIds) {
          this.showMessageToast('您还没有关注任何人');
          return;
        }
      }
      this.sortMode = mode;
      if (mode === 'latest') {
        this.categoryMode = 'recommend';
        this.isCategoryHidden = false;
        this.categoryTransform = 'translateY(0)';
      }
      this.resetNavBar();
      this.page = 1;
      this.postList = [];
      this.excludePostIds = []; // 🔥 清空
      this.hasMore = true;
      this.loadPostList();
      console.log("\uD83D\uDD04 \u5207\u6362\u6392\u5E8F: ".concat(mode, "\uFF0C\u5DF2\u6E05\u7A7A\u6392\u9664\u5217\u8868"));
    },
    // 重置和重新加载
    resetAndReload: function resetAndReload() {
      this.page = 1;
      this.postList = [];
      this.hasMore = true;
      this.leftColumnHeight = 0;
      this.rightColumnHeight = 0;
      this.imageHeights = {};
      this.loadPostList();
    },
    // 🔥 修改：loadPostList
    loadPostList: function loadPostList() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _this7$userBase, department, params, categoryMap, _yield$uni$$http$get2, res, newPosts, _this7$postList, emptyMsg;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (_this7.openid) {
                  _context3.next = 3;
                  break;
                }
                uni.switchTab({
                  url: '/pages/my/my'
                });
                return _context3.abrupt("return");
              case 3:
                _context3.prev = 3;
                if (!_this7.isLoading) {
                  _context3.next = 6;
                  break;
                }
                return _context3.abrupt("return");
              case 6:
                _this7.isLoading = true;

                // ✅ 新增：关注模式使用不同的接口
                if (!(_this7.sortMode === 'follow')) {
                  _context3.next = 11;
                  break;
                }
                _context3.next = 10;
                return _this7.loadFollowPosts();
              case 10:
                return _context3.abrupt("return");
              case 11:
                department = ((_this7$userBase = _this7.userBase) === null || _this7$userBase === void 0 ? void 0 : _this7$userBase.major) || '';
                params = {
                  page: _this7.page,
                  pageSize: _this7.pageSize,
                  openid: _this7.openid || '',
                  department: department,
                  filterMode: _this7.filterMode,
                  isTopicDiscussion: 'false'
                };
                if (_this7.sortMode === 'hottest') {
                  // 📌 推荐模式：传递 preference 和 excludePostIds
                  if (_this7.categoryMode === 'recommend') {
                    params.preference1 = _this7.preference;
                    params.excludePostIds = _this7.excludePostIds.join(','); // 🔥 关键：传递已排除的ID
                  } else {
                    // 非推荐模式：传递 category
                    categoryMap = {
                      'daily': '日常',
                      'friend': '交友',
                      'complaint': '吐槽',
                      'goods': '二手'
                    };
                    params.category = categoryMap[_this7.categoryMode];
                  }
                } else if (_this7.sortMode === 'latest') {
                  params.sortBy = 'created_at';
                }
                console.log("\uD83D\uDCE1 \u52A0\u8F7D\u5E16\u5B50 - \u9875\u7801: ".concat(_this7.page, ", \u6392\u9664: ").concat(_this7.excludePostIds.length, " \u4E2A"), params);
                _context3.next = 17;
                return uni.$http.get('/posts/list', params);
              case 17:
                _yield$uni$$http$get2 = _context3.sent;
                res = _yield$uni$$http$get2.data;
                if (res.meta.status === 200) {
                  newPosts = (res.message.list || []).map(function (post) {
                    return _objectSpread(_objectSpread({}, post), {}, {
                      timeText: _this7.formatTime(post.created_at),
                      images: _this7.processPostImages(post.images),
                      viewCount: post.viewCount || 0,
                      likeCount: post.likeCount || 0,
                      commentCount: post.commentCount || 0,
                      isLiked: post.isLiked || false,
                      isTopicDiscussion: post.isTopicDiscussion || 0
                    });
                  }); // 前端二次过滤
                  if (_this7.sortMode === 'topic') {
                    newPosts = newPosts.filter(function (post) {
                      return post.isTopicDiscussion === 1;
                    });
                  } else {
                    newPosts = newPosts.filter(function (post) {
                      return post.isTopicDiscussion !== 1;
                    });
                  }

                  // 📌 关键：只在推荐模式下累积 excludePostIds
                  if (_this7.sortMode === 'hottest' && _this7.categoryMode === 'recommend' && res.message.fetchedPostIds && res.message.fetchedPostIds.length > 0) {
                    _this7.excludePostIds = [].concat((0, _toConsumableArray2.default)(_this7.excludePostIds), (0, _toConsumableArray2.default)(res.message.fetchedPostIds));
                    console.log("\u2705 \u7D2F\u79EF\u5DF2\u83B7\u53D6ID: ".concat(_this7.excludePostIds.length, " \u4E2A"));
                  }
                  if (_this7.page === 1) {
                    _this7.postList = newPosts;
                  } else {
                    (_this7$postList = _this7.postList).push.apply(_this7$postList, (0, _toConsumableArray2.default)(newPosts));
                  }
                  _this7.hasMore = res.message.hasMore === true;
                  console.log("\u2705 \u52A0\u8F7D\u6210\u529F - \u65B0\u589E: ".concat(newPosts.length, ", \u603B\u8BA1: ").concat(_this7.postList.length));
                  if (_this7.page === 1 && newPosts.length === 0) {
                    emptyMsg = _this7.categoryMode === 'recommend' ? _this7.filterMode === 'department' ? '本院系暂无帖子' : '暂无帖子' : "\u6682\u65E0".concat(_this7.getCategoryName(), "\u5E16\u5B50");
                    _this7.showMessageToast(emptyMsg);
                  }
                }
                _context3.next = 27;
                break;
              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](3);
                console.error('❌ 加载失败:', _context3.t0);
                _this7.showMessageToast('加载失败，请检查网络');
                _this7.hasMore = false;
              case 27:
                _context3.prev = 27;
                _this7.isLoading = false;
                _this7.isLoadingMore = false;
                return _context3.finish(27);
              case 31:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[3, 22, 27, 31]]);
      }))();
    },
    // ✅ 新增：加载关注用户的帖子
    loadFollowPosts: function loadFollowPosts() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var params, _yield$uni$$http$get3, res, newPosts, _this8$postList;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                params = {
                  page: _this8.page,
                  pageSize: _this8.pageSize,
                  openid: _this8.openid,
                  following_ids: _this8.followingIds,
                  type: '1' // 🔥 关键：只获取无图片的帖子
                };

                console.log('📡 加载关注帖子 - 页码:', _this8.page, '参数:', params);
                _context4.next = 5;
                return uni.$http.get('/posts/followlist', params);
              case 5:
                _yield$uni$$http$get3 = _context4.sent;
                res = _yield$uni$$http$get3.data;
                if (res.meta.status === 200) {
                  newPosts = (res.message.list || []).map(function (post) {
                    return _objectSpread(_objectSpread({}, post), {}, {
                      timeText: _this8.formatTime(post.created_at),
                      images: _this8.processPostImages(post.images),
                      viewCount: post.view_count || 0,
                      likeCount: post.like_count || 0,
                      commentCount: post.comment_count || 0,
                      isLiked: post.is_liked || false,
                      avatar: post.avatarUrl || '/static/default-avatar.png',
                      nickname: post.nickname || '匿名用户'
                    });
                  });
                  if (_this8.page === 1) {
                    _this8.postList = newPosts;
                  } else {
                    (_this8$postList = _this8.postList).push.apply(_this8$postList, (0, _toConsumableArray2.default)(newPosts));
                  }

                  // ✅ 判断是否还有更多数据
                  _this8.hasMore = newPosts.length >= _this8.pageSize;
                  console.log("\u2705 \u5173\u6CE8\u5217\u8868\u52A0\u8F7D\u6210\u529F - \u65B0\u589E: ".concat(newPosts.length, ", \u603B\u8BA1: ").concat(_this8.postList.length));
                  if (_this8.page === 1 && newPosts.length === 0) {
                    _this8.showMessageToast('关注的用户还没有发布帖子');
                  }
                } else {
                  _this8.showMessageToast(res.meta.msg || '加载失败');
                  _this8.hasMore = false;
                }
                _context4.next = 15;
                break;
              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](0);
                console.error('❌ 加载关注帖子失败:', _context4.t0);
                _this8.showMessageToast('加载失败，请检查网络');
                _this8.hasMore = false;
              case 15:
                _context4.prev = 15;
                _this8.isLoading = false;
                _this8.isLoadingMore = false;
                return _context4.finish(15);
              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 10, 15, 19]]);
      }))();
    },
    onImageLoad: function onImageLoad(post, event) {
      if (!post || !post.id) return;
      var _event$detail = event.detail,
        width = _event$detail.width,
        height = _event$detail.height;
      var screenWidth = uni.getSystemInfoSync().windowWidth;
      var columnWidth = (screenWidth - 48) / 2;
      var actualHeight = height / width * columnWidth;
      this.$set(this.imageHeights, post.id, actualHeight);
    },
    // 📌 下拉刷新时清空 excludePostIds
    refreshPostList: function refreshPostList() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _this9.resetNavBar();
                _this9.page = 1;
                _this9.postList = [];
                _this9.excludePostIds = []; // 🔥 清空
                _this9.hasMore = true;
                _context5.next = 8;
                return _this9.loadPostList();
              case 8:
                uni.stopPullDownRefresh();
                _this9.showMessageToast('刷新成功', 1500);
                console.log('🔄 下拉刷新，已清空排除列表');
                _context5.next = 17;
                break;
              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](0);
                uni.stopPullDownRefresh();
                _this9.showMessageToast('刷新失败');
              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 13]]);
      }))();
    },
    loadMore: function loadMore() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(!_this10.hasMore || _this10.isLoading || _this10.isLoadingMore)) {
                  _context6.next = 2;
                  break;
                }
                return _context6.abrupt("return");
              case 2:
                _this10.isLoadingMore = true;
                _this10.page++;
                _context6.next = 6;
                return _this10.loadPostList();
              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    onAvatarClick: function onAvatarClick(post) {
      if (post.properties === '二手') {
        this.gotoUserProfile(post);
      } else {
        this.showMessageToast('只有二手帖子允许查看个人主页');
      }
    },
    gotoUserProfile: function gotoUserProfile(post) {
      if (post.user_openid === this.openid) {
        uni.navigateTo({
          url: '/subpkg/profile/profile'
        });
        return;
      }
      var userInfo = {
        openid: post.user_openid,
        nickname: post.nickname,
        avatarUrl: post.avatar
      };
      var payload = encodeURIComponent(JSON.stringify(userInfo));
      uni.navigateTo({
        url: "/subpkg/profile/profile?publisher=".concat(payload)
      });
    },
    gotoSearch: function gotoSearch() {
      if (!this.openid) {
        uni.switchTab({
          url: '/pages/my/my'
        });
        return;
      }
      uni.navigateTo({
        url: '/subpkg/post-search/post-search'
      });
    },
    gotoGoodsDetail: function gotoGoodsDetail(goodsId) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return uni.$http.post('/goods/view', {
                  goods_id: goodsId
                });
              case 3:
                _context7.next = 8;
                break;
              case 5:
                _context7.prev = 5;
                _context7.t0 = _context7["catch"](0);
                console.error('增加浏览次数失败:', _context7.t0);
              case 8:
                uni.navigateTo({
                  url: "/subpkg/goods_detail/goods_detail?goods_id=".concat(goodsId)
                });
              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 5]]);
      }))();
    },
    copyContact: function copyContact(post) {
      if (!this.openid) {
        uni.switchTab({
          url: '/pages/my/my'
        });
        return;
      }
      if (this.userBase.is_verified !== 1) {
        uni.navigateTo({
          url: '/subpkg/verification/verification'
        });
      }
      if (!post.contactInfo) {
        uni.showToast({
          title: '该帖子未提供联系方式',
          icon: 'none'
        });
        return;
      }
      uni.setClipboardData({
        data: post.contactInfo,
        success: function success() {
          uni.showToast({
            title: '联系方式已复制',
            icon: 'success'
          });
        }
      });
    },
    showMessageToast: function showMessageToast(text) {
      var _this11 = this;
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
      this.messageText = text;
      this.showMessage = true;
      setTimeout(function () {
        _this11.showMessage = false;
      }, duration);
    },
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
    formatTime: function formatTime(timestamp) {
      if (!timestamp) return '刚刚';
      var time = typeof timestamp === 'string' ? new Date(timestamp).getTime() : timestamp;
      var now = Date.now();
      var diff = now - time;
      var minute = 60 * 1000;
      var hour = 60 * minute;
      var day = 24 * hour;
      if (diff < minute) return '刚刚';
      if (diff < hour) return Math.floor(diff / minute) + '分钟前';
      if (diff < day) return Math.floor(diff / hour) + '小时前';
      if (diff < 7 * day) return Math.floor(diff / day) + '天前';
      var date = new Date(time);
      return "".concat(date.getMonth() + 1, "-").concat(date.getDate());
    },
    toggleLike: function toggleLike(post, indexOrId) {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var _yield$uni$$http$post, res, index;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                if (_this12.openid) {
                  _context8.next = 4;
                  break;
                }
                uni.switchTab({
                  url: '/pages/my/my'
                });
                return _context8.abrupt("return");
              case 4:
                _context8.next = 6;
                return uni.$http.post('/posts/like', {
                  post_id: post.id,
                  openid: _this12.openid,
                  is_like: !post.isLiked
                });
              case 6:
                _yield$uni$$http$post = _context8.sent;
                res = _yield$uni$$http$post.data;
                if (res.meta.status === 200) {
                  index = _this12.postList.findIndex(function (p) {
                    return p.id === post.id;
                  });
                  if (index !== -1) {
                    _this12.postList[index].isLiked = !_this12.postList[index].isLiked;
                    _this12.postList[index].likeCount = res.message.like_count || 0;
                    _this12.$set(_this12.postList, index, _objectSpread({}, _this12.postList[index]));
                  }
                }
                _context8.next = 15;
                break;
              case 11:
                _context8.prev = 11;
                _context8.t0 = _context8["catch"](0);
                console.error('点赞失败:', _context8.t0);
                _this12.showMessageToast('操作失败');
              case 15:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 11]]);
      }))();
    },
    previewImage: function previewImage(images, current) {
      uni.previewImage({
        urls: images,
        current: current
      });
    },
    gotoPostDetail: function gotoPostDetail(post) {
      this.updatepreference(post.properties);
      var url = post.isTopicDiscussion === 1 ? '/subpkg/topic-detail/topic-detail' : '/subpkg/post-detail/post-detail';
      uni.navigateTo({
        url: "".concat(url, "?id=").concat(post.id)
      });
    },
    gotoComments: function gotoComments(post) {
      var url = post.isTopicDiscussion === 1 ? '/subpkg/topic-detail/topic-detail' : '/subpkg/post-detail/post-detail';
      uni.navigateTo({
        url: "".concat(url, "?id=").concat(post.id, "&tab=comment")
      });
    },
    gotoPublish: function gotoPublish() {
      if (!this.openid) {
        this.showMessageToast('请先登录');
        return;
      }
      uni.navigateTo({
        url: '/subpkg/publish-post/publish-post'
      });
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 164:
/*!*************************************************************************************************************************************!*\
  !*** E:/ECNU/front-end/Miniprogram-CampusPub/pages/treehole/treehole.vue?vue&type=style&index=0&id=0d7ebf74&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_style_index_0_id_0d7ebf74_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./treehole.vue?vue&type=style&index=0&id=0d7ebf74&lang=scss&scoped=true& */ 165);
/* harmony import */ var _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_style_index_0_id_0d7ebf74_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_style_index_0_id_0d7ebf74_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_style_index_0_id_0d7ebf74_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_style_index_0_id_0d7ebf74_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_treehole_vue_vue_type_style_index_0_id_0d7ebf74_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 165:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/ECNU/front-end/Miniprogram-CampusPub/pages/treehole/treehole.vue?vue&type=style&index=0&id=0d7ebf74&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[158,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/treehole/treehole.js.map