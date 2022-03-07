(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"EnergyClue","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 3:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' &&
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"EnergyClue","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"EnergyClue","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"EnergyClue","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"EnergyClue","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent'])
        .call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        })
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 32:
/*!************************************************************!*\
  !*** D:/GitProject/MiniProgram/EnergyClue/common/jif97.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// jif97 - JavaScript Implement of IAPWS IF-97
// Created:     2022-01-18
// Copyright:   (c) simumis. All rights reserved.
// Licence:     MIT License
// Reference:   http://www.iapws.org/relguide/IF97-Rev.html
// Reference:   Wagner, Wolfgang & Kretzschmar, Hans-Joachim. (2008). International Steam Tables. 10.1007/978-3-540-74234-0.

/** @mainpage 基于 IAPWS-IF97 的水和水蒸气热力性质计算程序
 * 使用 JavaScript 语言实现国际水和水蒸气性质协会（IAPWS）发布的 IF97 公式，提供了一系列函数用于性质计算。通常这些函数接受两个输入参数，如果计算成功则返回 Water 对象实例，否则返回 null 值。
 * 返回的 Water 对象属性代表各项热力性质，且都使用国际单位制存储数据。
 * <table>
 * <tr>	<th>序号</th>	<th>属性</th>	<th>含义</th>		<th>单位</th> </tr>
 * <tr> <td>1</td>		<td>p</td>		<td>压力</td>		<td>Pa</td> </tr>
 * <tr> <td>2</td>		<td>t</td>		<td>温度</td>		<td>K</td> </tr>
 * <tr> <td>3</td>		<td>v</td>		<td>比容</td>		<td>m³/kg</td> </tr>
 * <tr> <td>4</td>		<td>u</td>		<td>比内能</td>		<td>J/kg</td> </tr>
 * <tr> <td>5</td>		<td>h</td>		<td>比焓</td>		<td>J/kg</td> </tr>
 * <tr> <td>6</td>		<td>s</td>		<td>比熵</td>		<td>J/(kg.K)</td> </tr>
 * <tr> <td>7</td>		<td>cv</td>		<td>定容比热</td>	<td>J/(kg.K)</td> </tr>
 * <tr> <td>8</td>		<td>cp</td>		<td>定压比热</td>	<td>J/(kg.K)</td> </tr>
 * <tr> <td>9</td>		<td>w</td>		<td>声速</td>		<td>m/s</td> </tr>
 * <tr> <td>10</td>		<td>x</td>		<td>干度</td>		<td>kg/kg</td> </tr>
 * </table>
 *
 * @section 国际单位制函数
 * 使用国际单位制的函数以"setup"开头，以"si"结尾，如下所示：
 * <table>
 * <tr> <th>序号</th>	<th>名称</th>		<th>参数</th>	<th>单位</th> </tr>
 * <tr> <td>1</td>		<td>setupPTsi</td>	<td>p,t</td> 	<td>Pa,K</td> </tr>
 * <tr> <td>2</td>		<td>setupPHsi</td>	<td>p,h</td> 	<td>Pa,J/kg</td> </tr>
 * <tr> <td>3</td>		<td>setupPSsi</td>	<td>p,s</td> 	<td>Pa,J/(kg.K)</td> </tr>
 * <tr> <td>4</td>		<td>setupHSsi</td>	<td>h,s</td> 	<td>J/kg,J/(kg.K)</td> </tr>
 * <tr> <td>5</td>		<td>setupTXsi</td>	<td>t,x</td> 	<td>K,kg/kg</td> </tr>
 * <tr> <td>6</td>		<td>setupPXsi</td>	<td>p,x</td> 	<td>Pa,kg/kg</td> </tr>
 * </table>
 *
 * @section 常用单位制函数
 * 另外提供一组函数，名称在上面函数基础上去掉"si"，使用常用单位作为输入，比如：压力单位为 MPa，温度单位为 ℃， 所有含有 J 的均改为 kJ。
 *
 * @section props 函数
 * 为方便使用，提供 props 函数，接受 4 个参数，分别为：arg1-第一输入参数名称，value1-第一输入参数数值，arg2-第二输入参数名称，value2-第二输入参数数值。
 * props 函数用于计算的两个输入参数组合可以是 "pt", "ph", "ps", "px", "tx" 或 "hs"，其中 "p"代表压力，"t"代表温度，"h"代表比焓，"s"代表比熵，"x"代表干度。
 * 这些输入参数均采用常用单位制。
 *
 * @section 用法
 * 方便起见，建议使用 props 函数进行计算。两组输入参数的顺序可以互换，计算结果不受影响。
 * @code 
 * let p = 20.0； // MPa
 * let t = 350.0; // ℃
 * import * as jif97 from "jif97.js"
 * let w = jif97.props("p", p, "t", t)；
 * console.log(w);
 */



/** Water - 代表水和水蒸气热力性质
               *
               * Water.rgn 属性代表 IAPWS-IF97 所划定的分区，取值范围1~5，若为0则表示非法分区。其属性代表各项热力性质，如下表所示：
               * <table>
               * <tr>	<th>序号</th>	<th>属性</th>	<th>含义</th>		<th>单位</th> </tr>
               * <tr> <td>1</td>		<td>p</td>		<td>压力</td>		<td>Pa</td> </tr>
               * <tr> <td>2</td>		<td>t</td>		<td>温度</td>		<td>K</td> </tr>
               * <tr> <td>3</td>		<td>v</td>		<td>比容</td>		<td>m³/kg</td> </tr>
               * <tr> <td>4</td>		<td>u</td>		<td>比内能</td>		<td>J/kg</td> </tr>
               * <tr> <td>5</td>		<td>h</td>		<td>比焓</td>		<td>J/kg</td> </tr>
               * <tr> <td>6</td>		<td>s</td>		<td>比熵</td>		<td>J/(kg.K)</td> </tr>
               * <tr> <td>7</td>		<td>cv</td>		<td>定容比热</td>	<td>J/(kg.K)</td> </tr>
               * <tr> <td>8</td>		<td>cp</td>		<td>定压比热</td>	<td>J/(kg.K)</td> </tr>
               * <tr> <td>9</td>		<td>w</td>		<td>声速</td>		<td>m/s</td> </tr>
               * <tr> <td>10</td>		<td>x</td>		<td>干度</td>		<td>kg/kg</td> </tr>
               * </table>
               */Object.defineProperty(exports, "__esModule", { value: true });exports.Water = Water;exports.props = props;exports.setupPT = setupPT;exports.setupPH = setupPH;exports.setupPS = setupPS;exports.setupHS = setupHS;exports.setupPX = setupPX;exports.setupTX = setupTX;exports.setupPTsi = setupPTsi;exports.setupPHsi = setupPHsi;exports.setupPSsi = setupPSsi;exports.setupHSsi = setupHSsi;exports.setupPXsi = setupPXsi;exports.setupTXsi = setupTXsi;
function Water() {
  this.rgn = 0;
}

/** setupPTsi - Calculate the thermaldynamic properties of water by pressure[Pa] and temperature[K]
   */
function setupPTsi(p, t) {
  if (typeof p != "number" || typeof t != "number") {
    return null;
  }
  var rgn = getRegion_pt(p, t);
  var w = null;
  switch (rgn) {
    case 1:
      w = r1(p, t);
      break;
    case 2:
      w = r2(p, t);
      break;
    case 3:
      w = r3(1.0 / r3_vpt(p, t), t);
      break;
    case 5:
      w = r5(p, t);
      break;
    default:
      return null;}

  if (w != null) {
    w.p = p;
    w.t = t;
  }
  return w;
}

/** setupPHsi calculates the thermaldynamic properties of water by pressure[Pa] and enthalpy[J/kg]
   */
function setupPHsi(p, h) {
  if (typeof p != "number" || typeof h != "number") {
    return null;
  }
  var rgn = getRegion_ph(p, h);
  var w = null;
  switch (rgn) {
    case 1:{
        var t = r1_tph(p, h);
        w = r1(p, t);
        break;
      }
    case 2:{
        var _t = r2_tph(p, h);
        w = r2(p, _t);
        break;
      }
    case 3:{
        var v = r3_vph(p, h);
        var _t2 = r3_tph(p, h);
        w = r3(1.0 / v, _t2);
        break;
      }
    case 4:{
        var _t3 = r4Sat_tp(p);
        var wl = r4(_t3, 0.0);
        var wv = r4(_t3, 1.0);
        if (wl == null || wv == null) {
          return null;
        }
        var hl = wl.h;
        var hv = wv.h;
        var x = null;
        if (hl == hv) {
          x = 1.0;
        } else {
          x = (h - hl) / (hv - hl);
        }
        w = r4(_t3, x);
        break;
      }
    case 5:{
        var _t4 = r5_tph(p, h);
        w = r5(p, _t4);
        break;
      }
    default:
      return null;}
  // switch
  if (w != null) {
    w.p = p;
    w.h = h;
  }
  return w;
}

/** setupPSsi calculates the thermaldynamic properties of water by pressure[Pa] and entropy[J/(kg·K)]
   */
function setupPSsi(p, s) {
  if (typeof p != "number" || typeof s != "number") {
    return null;
  }
  var rgn = getRegion_ps(p, s);
  var w = null;
  switch (rgn) {
    case 1:{
        var t = r1_tps(p, s);
        w = r1(p, t);
        break;
      }
    case 2:{
        var _t5 = r2_tps(p, s);
        w = r2(p, _t5);
        break;
      }
    case 3:{
        var v = r3_vps(p, s);
        var _t6 = r3_tps(p, s);
        w = r3(1.0 / v, _t6);
        break;
      }
    case 4:{
        var _t7 = r4Sat_tp(p);
        var wl = r4(_t7, 0.0);
        var wv = r4(_t7, 1.0);
        if (wl == null || wv == null) {
          return null;
        }
        var sl = wl.s;
        var sv = wv.s;
        if (sl == sv) {
          w = r4(_t7, 1.0);
        } else {
          var x = (s - sl) / (sv - sl);
          w = r4(_t7, x);
        }

        break;
      }
    case 5:{
        var _t8 = r5_tps(p, s);
        w = r5(p, _t8);
        break;
      }
    default:
      return null;}

  if (w != null) {
    w.p = p;
    w.s = s;
  }
  return w;
}

/** setupHSsi calculates the thermaldynamic properties of water by enthalpy[J/kg] and entropy[J/(kg·K)]
   */
function setupHSsi(h, s) {
  if (typeof h != "number" || typeof s != "number") {
    return null;
  }
  var rgn = getRegion_hs(h, s);
  var w = null;
  switch (rgn) {
    case 1:{
        var p = r1_phs(h, s);
        var t = r1_tph(p, h);
        w = r1(p, t);
        break;
      }
    case 2:{
        var _p = r2_phs(h, s);
        var _t9 = r2_tph(_p, h);
        w = r2(_p, _t9);
        break;
      }
    case 3:{
        var _t10 = r3_ths(h, s);
        var v = r3_vhs(h, s);
        w = r3(1.0 / v, _t10);
        break;
      }
    case 4:{
        var _t11 = r4_ths(h, s);
        var wl = r4(_t11, 0.0);
        var wv = r4(_t11, 1.0);
        if (wl == null || wv == null) {
          return null;
        }
        var hl = wl.h;
        var hv = wv.h;
        if (hl == hv) {
          w = r4(_t11, 1.0);
        } else {
          var x = (h - hl) / (hv - hl);
          w = r4(_t11, x);
        }
        break;
      }
    case 5:{
        var _p2 = r5_phs(h, s);
        var _t12 = r5_tph(_p2, h);
        w = r5(_p2, _t12);
        break;
      }
    default:
      return null;}

  if (w != null) {
    w.h = h;
    w.s = s;
  }
  return w;
}

/** setupTXsi calculates the thermaldynamic properties of water by temperature[K] and vapor quality[kg/kg], region4 only
   */
function setupTXsi(t, x) {
  if (typeof t != "number" || typeof x != "number") {
    return null;
  }
  var w = null;
  if (t >= iapws_tmin && t <= iapws_tc) {
    w = r4(t, x);
  }
  return w;
}

/** setupPXsi calculates the thermaldynamic properties of water by pressure[Pa] and vapor quality[kg/kg], r4 only
   */
function setupPXsi(p, x) {
  if (typeof p != "number" || typeof x != "number") {
    return null;
  }
  var w = null;
  if (p >= iapws_pmin && p <= iapws_pc) {
    var t = r4Sat_tp(p);
    w = r4(t, x);
  }
  if (w != null) {
    w.p = p;
  }
  return w;
}

/** setupPT is almost the same as setupPTsi, except for the unit(p[MPa], t[℃])
   */
function setupPT(p, t) {
  return setupPTsi(p * 1.0e6, t + 273.15);
}

/** setupPH is almost the same as setupPHsi, except for the unit(p[MPa], h[kJ/kg])
   */
function setupPH(p, h) {
  return setupPHsi(p * 1.0e6, h * 1.0e3);
}

/** setupPS is almost the same as setupPSsi, except for the unit(p[Mpa], s[kJ/(kg·℃)])
   */
function setupPS(p, s) {
  return setupPSsi(p * 1.0e6, s * 1.0e3);
}

/** setupHS is almost the same as setupHSsi, except for the unit(h[kJ/kg], s[kJ/(kg·℃)])
   */
function setupHS(h, s) {
  return setupHSsi(h * 1.0e3, s * 1.0e3);
}

/** setupPX is almost the same as setupPXsi, except for the unit(p[MPa], x[kg/kg])
   */
function setupPX(p, x) {
  return setupPXsi(p * 1.0e6, x);
}

/** setupTX is almost the same as setupTXsi, except for the unit(T[℃], x[kg/kg])
   */
function setupTX(t, x) {
  return setupTXsi(t + 273.15, x);
}

/** props - Calculate the thermaldynamic properties of water by two arguments.
   * The combination of two arguments is one of "pt","ph","ps","px","tx" or "hs".
   * p - pressure [MPa]
   * t - temperature [℃]
   * h - specific enthalpy [kJ/kg]
   * s - specific entropy [kJ/(kg·℃)]
   * x - vapor quality [kg/kg]
   * \param arg1 - Name of the first argument
   * \param value1 - Value of the first argument
   * \param arg2 - Name of the second argument
   * \param value2 - Value of the second argument
   * \return Object of Water
   */
function props(arg1, value1, arg2, value2) {
  if (typeof arg1 != "string" || typeof arg2 != "string") {
    return null;
  }
  if (typeof value1 != "number" || typeof value2 != "number") {
    return null;
  }
  arg1 = arg1.toLowerCase();
  arg2 = arg2.toLowerCase();
  var w = null;

  if (arg1 == "p") {
    if (arg2 == "t") {
      w = setupPT(value1, value2);
    } else if (arg2 == "h") {
      w = setupPH(value1, value2);
    } else if (arg2 == "s") {
      w = setupPS(value1, value2);
    } else if (arg2 == "x") {
      w = setupPX(value1, value2);
    }
  } else if (arg1 == "t") {
    if (arg2 == "p") {
      w = setupPT(value2, value1);
    } else if (arg2 == "x") {
      w = setupTX(value1, value2);
    }
  } else if (arg1 == "h") {
    if (arg2 == "p") {
      w = setupPH(value2, value1);
    } else if (arg2 == "s") {
      w = setupHS(value1, value2);
    }
  } else if (arg1 == "s") {
    if (arg2 == "p") {
      w = setupPS(value2, value1);
    } else if (arg2 == "h") {
      w = setupHS(value2, value1);
    }
  } else if (arg1 == "x") {
    if (arg2 == "p") {
      w = setupPX(value2, value1);
    } else if (arg2 == "t") {
      w = setupTX(value2, value1);
    }
  }
  return w;
}


// Constants
var
iapws_inChIKey = "XLYOFNOQVPJJNP-UHFFFAOYSA-N", /// International Chemical Identifier of ordinary water
iapws_casRegistryNumber = "7732-18-5", /// CAS Registry Number
iapws_formula = "H2O", /// Molecular formula
iapws_molecularWeight = 18.015257, /// molar mass of ordinary water(\f$ kg/kmol \f$)
iapws_R = 0.461526E3, /// Specific gas constant of ordinary water(\f$ J/(kg \cdot K) \f$) */
// Critical constants of ordinary water
iapws_pc = 22.064E6, /// (\f$ Pa \f$)
iapws_tc = 647.096, /// (\f$ K \f$)
iapws_rhoc = 322.0, /// (\f$ kg/m^3 \f$)
iapws_hc = 2.087546845E6, /// (\f$ J/kg \f$)
iapws_sc = 4.41202148223476E3, /// \f$J\cdot kg^{-1}\cdot K^{-1}\f$
// Triple point constants of ordinary water
iapws_tt = 273.16, /// (\f$ K \f$) */
iapws_pt = 611.657, /// (\f$ Pa \f$) */
iapws_rhot_l = 958.367, /// Density(liquid)(\f$ kg/m^3 \f$) */
iapws_rhot_v = 0.00485458, /// Density(vapor)(\f$ kg/m^3 \f$) */
iapws_ut = 0.0,
iapws_st = 0.0,
iapws_ht = 0.611782, /// (\f$ J/kg \f$) */
// Normal boiling point
iapws_tb = 373.1243,
iapws_pb = 101325.0,
iapws_rhob_l = 958.367,
iapws_rhob_v = 0.597657,
// Boundary constants
iapws_pmin = 611.212677,
iapws_pmax = 100.0E6,
iapws_tmin = 273.15,
iapws_tmax = 2273.15,
iapws_t25 = 1073.15,
iapws_t13 = 623.15, /// Boundary between r1 and r3, T=623.15K
iapws_psat13 = 16.5291643E6, /// \f$ p_{sat}(623.15K) \f$
iapws_pmax5 = 50.0E6, /// maximium pressure of r5
iapws_p2ab = 4.0E6, /// Boundary between subregion 2a and 2b(p=4.0MPa)
iapws_hl623 = 1.670858218E6, /// \f$ h^'(623.15K) \f$
iapws_hv623 = 2.563592004E6, /// \f$ h^"(623.15K) \f$
iapws_sl273 = -1.54549591910E-1, /// \f$ s^'(273.15K) \f$
iapws_sv273 = 9.155759395E3, /// \f$ s^"(273.15K) \f$
iapws_sl623 = 3.778281340E3, /// \f$ S^'(623.15K) \f$
iapws_sv623 = 5.210887825E3, /// \f$ S^"(623.15K) \f$
iapws_s13_100 = 3.397782955E3, /// s(100MPa, 623.15K)
iapws_h863_100 = 2.812942061E6; /// h(100MPa, 863.15K)

var
tolerance = 1.0E-12,
tolerancek = 1.0E-9,
tolerancem = 1.0E-6;

// Boundary
function getRegion_pt(p, t) {
  if (typeof p != "number" || typeof t != "number") {
    return 0;
  }
  var rgn = 0;
  if (t > iapws_t25 && t <= iapws_tmax && p >= iapws_pmin && p <= iapws_pmax5) {
    rgn = 5;
  } else if (p >= iapws_pmin && p <= iapws_psat13) {
    var satT = r4Sat_tp(p);
    if (t >= iapws_tmin && t <= satT) {
      rgn = 1;
    } else if (t > satT && t <= iapws_t25) {
      rgn = 2;
    }
  } else if (p > iapws_psat13 && p <= iapws_pmax) {
    var t_b23 = boundaryB23_tp(p);
    if (t >= iapws_tmin && t <= iapws_t13) {
      rgn = 1;
    } else if (t > iapws_t13 && t < t_b23) {
      rgn = 3;
    } else if (t >= t_b23 && t <= iapws_t25) {
      rgn = 2;
    }
  }
  return rgn;
}

/// Region definition for input p and h
function getRegion_ph(p, h) {
  if (typeof p != "number" || typeof h != "number") {
    return 0;
  }
  var rgn = 0;
  var eps = 1E-3;
  var hmin = r1(p, iapws_tmin).h * (1.0 - eps);
  var hmax = r5(p, iapws_tmax).h * (1.0 + eps);
  var h25 = r2(p, iapws_t25).h * (1.0 + eps);
  if (p >= iapws_pmin && p <= iapws_psat13) {
    var satT = r4Sat_tp(p);
    var h14 = r1(p, satT).h;
    var h24 = r2(p, satT).h;
    if (h >= hmin && h <= h14) {
      rgn = 1;
    } else if (h > h14 && h < h24) {
      rgn = 4;
    } else if (h >= h24 && h <= h25) {
      rgn = 2;
    } else if (h > h25 && h <= hmax) {
      rgn = 5;
    }
  } else if (p > iapws_psat13 && p < iapws_pc) {
    var h13 = r1(p, iapws_t13).h;
    var h32 = r2(p, boundaryB23_tp(p)).h;
    if (h >= hmin && h <= h13) {
      rgn = 1;
    } else if (h > h13 && h < h32) {
      var p34 = boundarySat_ph(h) * (1.0 - 4.3e-6);
      if (p >= p34) {
        rgn = 3;
      } else {
        rgn = 4;
      }
    } else if (h >= h32 && h <= h25) {
      rgn = 2;
    } else if (h > h25 && h < hmax) {
      rgn = 5;
    }
  } else if (p >= iapws_pc && p <= iapws_pmax) {
    var _h = r1(p, iapws_t13).h;
    var _h2 = r2(p, boundaryB23_tp(p)).h;
    if (h >= hmin && h <= _h) {
      rgn = 1;
    } else if (h > _h && h < _h2) {
      rgn = 3;
    } else if (h >= _h2 && h < h25) {
      rgn = 2;
    } else if (h >= h25 && h <= hmax && p <= iapws_pmax5) {
      rgn = 5;
    }
  }
  return rgn;
}

/// Region definition for input p and s
function getRegion_ps(p, s) {
  if (typeof p != "number" || typeof s != "number") {
    return 0;
  }
  var rgn = 0;
  var eps = 1E-3;
  var smin = r1(p, iapws_tmin).s * (1.0 - eps);
  var smax = r5(p, iapws_tmax).s * (1.0 + eps);
  var s25 = r2(p, iapws_t25).s * (1.0 + eps);
  if (p >= iapws_pmin && p <= iapws_psat13) {
    var satT = r4Sat_tp(p);
    var s14 = r1(p, satT).s;
    var s24 = r2(p, satT).s;
    if (s >= smin && s <= s14) {
      rgn = 1;
    } else if (s > s14 && s < s24) {
      rgn = 4;
    } else if (s >= s24 && s <= s25) {
      rgn = 2;
    } else if (s > s25 && s <= smax) {
      rgn = 5;
    }
  } else if (p > iapws_psat13 && p < iapws_pc) {
    var s13 = r1(p, iapws_t13).s;
    var s32 = r2(p, boundaryB23_tp(p)).s;
    if (s >= smin && s <= s13) {
      rgn = 1;
    } else if (s > s13 && s < s32) {
      var p34 = boundarySat_ps(s) * (1.0 - 3.3e-6);
      if (p >= p34) {
        rgn = 3;
      } else {
        rgn = 4;
      }
    } else if (s >= s32 && s <= s25) {
      rgn = 2;
    } else if (s > s25 && s < smax) {
      rgn = 5;
    }
  } else if (p >= iapws_pc && p <= iapws_pmax) {
    var _s = r1(p, iapws_t13).s;
    var _s2 = r2(p, boundaryB23_tp(p)).s;
    if (s >= smin && s <= _s) {
      rgn = 1;
    } else if (s > _s && s < _s2) {
      rgn = 3;
    } else if (s >= _s2 && s < s25) {
      rgn = 2;
    } else if (s >= s25 && s <= smax && p <= iapws_pmax5) {
      rgn = 5;
    }
  }
  return rgn;
}

/// Region definition for input h and s
function getRegion_hs(h, s) {
  if (typeof h != "number" || typeof s != "number") {
    return 0;
  }
  var rgn = 0;
  var eps = 1E-3;
  // isotherm T=273.15K 等温线 T=273.15K 上 h,  s的最大最小值。
  var h1min = r1(iapws_pmin, iapws_tmin).h * (1.0 - eps); // h(ps(273.15K), 273.15K)
  var h1max = r1(iapws_pmax, iapws_tmin).h * (1.0 + eps); // h(100MPa, 273.15k)
  var smin = r1(iapws_pmax, iapws_tmin).s * (1.0 + eps); // s(100MPa, 273.15K)
  var s1max = 4.7516100567e-1; // s_{max}(273.15K)
  //
  var propL = r1(iapws_pmin, iapws_tmin);
  var propV = r2(iapws_pmin, iapws_tmin);
  var h4pmin = propL.h + (s - propL.s) / (propV.s - propL.s) * (propV.h - propL.h); // h(pmin,273.15K)
  var sB23min = 5.048096828e3;
  var sB23max = 5.260578707e3;
  var hB23min = 2.563592004e6;
  var hB23max = 2.812942061e6;
  var s2bc = 5.85e3;
  var prop = r2(iapws_pmax, iapws_t25);
  var h2pmax = prop.h;
  var s2pmax = prop.s;
  prop = r2(iapws_pmax5, iapws_t25);
  var h25 = prop.h;
  var s25 = prop.s;
  prop = r2(4.0e6, iapws_t25);
  var h2ab = prop.h;
  var s2ab = prop.s;
  var s5pmax = r5(iapws_pmax5, iapws_tmax).s;
  prop = r2(iapws_pmin, iapws_t25);
  var h2pmin = prop.h;
  var s2pmin = prop.s;
  prop = r5(iapws_pmin, iapws_tmax);
  var h5pmin = prop.h;
  var s5pmin = prop.s;

  if (s >= smin && s < s1max) {
    if (h >= h1min && h < h1max) {
      var t1 = r1_ths(h, s) + 24.0e-3;
      if (t1 > iapws_tmin) {
        var h14 = boundaryB14_hs(s);
        if (h >= h4pmin && h < h14) {
          rgn = 4;
        } else if (h >= h14) {
          rgn = 1;
        }
      }
    } else if (h >= h1max) {
      var hmax = r1(iapws_pmax, r1_tps(iapws_pmax, s)).h * (1.0 + eps);
      if (h <= hmax) {
        rgn = 1;
      }
    }
  } else if (s >= s1max && s <= iapws_s13_100) {
    var _h3 = boundaryB14_hs(s);
    var hmin = h4pmin * (1.0 - eps);
    var t = r1_tps(iapws_pmax, s) - 21.8e-3; // for numeric consistency
    var _hmax = r1(iapws_pmax, t).h * (1.0 + eps);
    if (h >= hmin && h < _h3) {
      rgn = 4;
    } else if (h >= _h3 && h <= _hmax) {
      rgn = 1;
    }
  } else if (s > iapws_s13_100 && s <= iapws_sl623) {
    var _h4 = boundaryB14_hs(s);
    var _hmin = h4pmin * (1.0 - eps);
    var h13 = boundaryB13_hs(s);
    var v = r3_vps(iapws_pmax, s) * (1 + 9.6e-5);
    var _t13 = r3_tps(iapws_pmax, s) - 24.8e-3;
    var _hmax2 = r3(1.0 / v, _t13).h * (1.0 + eps);
    if (h >= _hmin && h < _h4) {
      rgn = 4;
    } else if (h >= _h4 && h <= h13) {
      rgn = 1;
    } else if (h > h13 && h <= _hmax2) {
      rgn = 3;
    }
  } else if (s > iapws_sl623 && s <= iapws_sc) {
    var _hmin2 = h4pmin * (1.0 - eps);
    var h34 = boundaryB3a4_hs(s);
    var _v = r3_vps(iapws_pmax, s) * (1 + 9.6e-5);
    var _t14 = r3_tps(iapws_pmax, s) - 24.8e-3;
    var _hmax3 = r3(1.0 / _v, _t14).h * (1.0 + eps);
    if (h >= _hmin2 && h < h34) {
      rgn = 4;
    } else if (h >= h34 && h < _hmax3) {
      rgn = 3;
    }
  } else if (s > iapws_sc && s <= sB23min) {
    var _hmin3 = h4pmin * (1.0 - eps);
    var _h5 = boundaryB2c3b4_hs(s);
    var _v2 = r3_vps(iapws_pmax, s) * (1 + 7.7e-5);
    var _t15 = r3_tps(iapws_pmax, s) - 22.1e-3;
    var _hmax4 = r3(1.0 / _v2, _t15).h * (1.0 + eps);
    if (h >= _hmin3 && h < _h5) {
      rgn = 4;
    } else if (h >= _h5 && h < _hmax4) {
      rgn = 3;
    }
  } else if (s > sB23min && s < sB23max) {
    var _hmin4 = h4pmin * (1.0 - eps);
    var hs = boundaryB2c3b4_hs(s);
    var _t16 = r2_tps(iapws_pmax, s) - 19.0e-3;
    var _hmax5 = r2(iapws_pmax, _t16).h * (1.0 + eps);
    if (h >= _hmin4 && h < hs) {
      rgn = 4;
    } else if (h >= hs && h < hB23min) {
      rgn = 3;
    } else if (h >= hB23min && h < hB23max) {
      var T23 = boundaryB23_ths(h, s);
      var p23 = boundaryB23_pt(T23) * (1.0 + 4.5e-5);
      var p = r2_phs(h, s);
      if (p <= p23) {
        rgn = 2;
      } else {
        rgn = 3;
      }
    } else if (h >= hB23max && h <= _hmax5) {
      rgn = 2;
    }
  } else if (s >= sB23max && s < s2bc) {
    var _hmin5 = h4pmin * (1.0 - eps);
    var h24 = boundaryB2c3b4_hs(s);
    var _t17 = r2_tps(iapws_pmax, s) - 19.0e-3;
    var _hmax6 = r2(iapws_pmax, _t17).h * (1.0 + eps);
    if (h >= _hmin5 && h < h24) {
      rgn = 4;
    } else if (h > h24 && h <= _hmax6) {
      rgn = 2;
    }
  } else if (s >= s2bc && s < s2pmax) {
    var _hmin6 = h4pmin * (1.0 - eps);
    var _h6 = boundaryB2ab4_hs(s);
    var _t18 = r2_tps(iapws_pmax, s) - 6.5e-3;
    var _hmax7 = r2(iapws_pmax, _t18).h * (1.0 + eps);
    if (h >= _hmin6 && h < _h6) {
      rgn = 4;
    } else if (h > _h6 && h <= _hmax7) {
      rgn = 2;
    }
  } else if (s >= s2pmax && s < s25) {
    var _hmin7 = h4pmin * (1.0 - eps);
    var _h7 = boundaryB2ab4_hs(s);
    var _hmax8 = h25 * (1.0 + eps);
    if (h >= _hmin7 && h < _h7) {
      rgn = 4;
    } else if (h >= _h7 && h <= h2pmax) {
      rgn = 2;
    } else if (h > h2pmax && h <= _hmax8) {
      var _t19 = r2_ths(h, s) - 9.8e-3;
      if (_t19 <= iapws_t25) {
        rgn = 2;
      }
    }
  } else if (s >= s25 && s < s2ab) {
    var _hmin8 = h4pmin * (1.0 - eps);
    var _h8 = boundaryB2ab4_hs(s);
    var _hmax9 = r5(iapws_pmax5, r5_tps(iapws_pmax5, s)).h * (1.0 + eps);
    if (h >= _hmin8 && h < _h8) {
      rgn = 4;
    } else if (h >= _h8 && h <= h25) {
      rgn = 2;
    } else if (h > h25 && h <= h2ab) {
      var _t20 = r2_ths(h, s) - 9.8e-3;
      if (_t20 <= iapws_t25) {
        rgn = 2;
      } else if (h <= _hmax9) {
        rgn = 5;
      }
    } else if (h > h2ab && h < _hmax9) {
      rgn = 5;
    }
  } else if (s >= s2ab && s < s5pmax) {
    var _hmin9 = h4pmin * (1.0 - eps);
    var _h9 = boundaryB2ab4_hs(s);
    var _hmax10 = r5(iapws_pmax5, r5_tps(iapws_pmax5, s)).h * (1.0 + eps);
    if (h >= _hmin9 && h < _h9) {
      rgn = 4;
    } else if (h >= _h9 && h <= h2pmin) {
      var _t21 = r2_ths(h, s) - 9.7e-3;
      if (_t21 <= iapws_t25) {
        rgn = 2;
      } else if (h < _hmax10) {
        rgn = 5;
      }
    } else if (h > h2pmin && h <= _hmax10) {
      rgn = 5;
    }
  } else if (s >= s5pmax && s < iapws_sv273) {
    var _hmin10 = h4pmin * (1.0 - eps);
    var _h10 = boundaryB2ab4_hs(s);
    if (h >= _hmin10 && h < _h10) {
      rgn = 4;
    } else if (h <= h2pmin) {
      var _t22 = r2_ths(h, s) - 9.7e-3;
      if (_t22 <= iapws_t25) {
        rgn = 2;
      } else {
        rgn = 5;
      }
    } else if (h > h2pmin && h <= h5pmin) {
      var _t23 = r5_ths(h, s);
      if (_t23 <= iapws_tmax) {
        rgn = 5;
      }
    }
  } else if (s >= iapws_sv273 && s <= s2pmin) {
    var _hmin11 = r2(iapws_pmin, r2_tps(iapws_pmin, s)).h * (1.0 - eps);
    if (h >= _hmin11 && h <= h2pmin) {
      var _t24 = r2_ths(h, s) - 9.7e-3;
      if (_t24 <= iapws_t25) {
        rgn = 2;
      } else {
        rgn = 5;
      }
    } else if (h > h2pmin && h <= h5pmin) {
      var _t25 = r5_ths(h, s);
      if (_t25 <= iapws_tmax) {
        rgn = 5;
      }
    }
  } else if (s > s2pmin && s <= s5pmin) {
    var _hmin12 = r5(iapws_pmin, r5_tps(iapws_pmin, s)).h * (1.0 - eps);
    if (h >= _hmin12 && h <= h2pmin) {
      var _t26 = r5_ths(h, s);
      if (_t26 <= iapws_tmax) {
        rgn = 5;
      }
    }
  }

  return rgn;
}

function boundaryB23_pt(t) {
  var p_star = 1.0e6;
  var t_star = 1.0;
  var theta = t / t_star;
  var n1 = 0.34805185628969e+03;
  var n2 = -0.11671859879975e+01;
  var n3 = 0.10192970039326e-2;

  return p_star * (n1 + n2 * theta + n3 * theta * theta);
}

function boundaryB23_tp(p) {
  var p_star = 1.0e6;
  var t_star = 1.0;
  var pi = p / p_star;
  var n3 = 0.10192970039326e-2;
  var n4 = 0.57254459862746e+03;
  var n5 = 0.13918839778870e+02;

  return t_star * (n4 + Math.sqrt((pi - n5) / n3));
}

// Equations for Region Boundaries Given Enthalpy and Entropy - Supp-phs3-2014
// Equations $h^'_1(s)$ for the Saturated Liquid Line
function boundaryB14_hs(s) {
  var h_star = 1700.0e3;
  var s_star = 3.8e3;
  var ir = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 7, 8, 12, 12, 14, 14, 16, 20, 20, 22, 24, 28, 32, 32];
  var jr = [14, 36, 3, 16, 0, 5, 4, 36, 4, 16, 24, 18, 24, 1, 4, 2, 4, 1, 22, 10, 12, 28, 8, 3, 0, 6, 8];
  var nr = [0.332171191705237, 0.611217706323496e-3, -0.882092478906822e1, -0.455628192543250, -0.263483840850452e-4, -0.223949661148062e2, -0.428398660164013e1, -0.616679338856916, -0.146823031104040e2, 0.284523138727299e3, -0.113398503195444e3, 0.115671380760859e4, 0.395551267359325e3, -0.154891257229285e1, 0.194486637751291e2, -0.357915139457043e1, -0.335369414148819e1, -0.664426796332460, 0.323321885383934e5, 0.331766744667084e4, -0.223501257931087e5, 0.573953875852936e7, 0.173226193407919e3, -0.363968822121321e-1, 0.834596332878346e-6, 0.503611916682674e1, 0.655444787064505e2];
  //
  var sigma = s / s_star;
  var aa = sigma - 1.09;
  var bb = sigma + 0.366e-4;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }
  return sum * h_star;
}

// Equations for Region Boundaries Given Enthalpy and Entropy - Supp-phs3-2014
// Equations $h^'_3a(s)$ for the Saturated Liquid Line
function boundaryB3a4_hs(s) {
  var h_star = 1700.0e3;
  var s_star = 3.8e3;
  var ir = [0, 0, 0, 0, 2, 3, 4, 4, 5, 5, 6, 7, 7, 7, 10, 10, 10, 32, 32];
  var jr = [1, 4, 10, 16, 1, 36, 3, 16, 20, 36, 4, 2, 28, 32, 14, 32, 36, 0, 6];
  var nr = [0.822673364673336, 0.181977213534479, -0.112000260313624e-1, -0.746778287048033e-3, -0.179046263257381, 0.424220110836657e-1, -0.341355823438768, -0.209881740853565e1, -0.822477343323596e1, -0.499684082076008e1, 0.191413958471069, 0.581062241093136e-1, -0.165505498701029e4, 0.158870443421201e4, -0.850623535172818e2, -0.317714386511207e5, -0.945890406632871e5, -0.139273847088690e-5, 0.631052532240980];
  //
  var sigma = s / s_star;
  var aa = sigma - 1.09;
  var bb = sigma + 0.366e-4;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }
  return sum * h_star;
}

// Equations $h^{''}_{2ab}(s)$ for the Saturated Vapor Line
function boundaryB2ab4_hs(s) {
  var h_star = 2800.0e3;
  var s1_star = 5.21e3;
  var s2_star = 9.2e3;
  var ir = [1, 1, 2, 2, 4, 4, 7, 8, 8, 10, 12, 12, 18, 20, 24, 28, 28, 28, 28, 28, 32, 32, 32, 32, 32, 36, 36, 36, 36, 36];
  var jr = [8, 24, 4, 32, 1, 2, 7, 5, 12, 1, 0, 7, 10, 12, 32, 8, 12, 20, 22, 24, 2, 7, 12, 14, 24, 10, 12, 20, 22, 28];
  var nr = [-0.524581170928788e3, -0.926947218142218e7, -0.237385107491666e3, 0.210770155812776e11, -0.239494562010986e2, 0.221802480294197e3, -0.510472533393438e7, 0.124981396109147e7, 0.200008436996201e10, -0.815158509791035e3, -0.157612685637523e3, -0.114200422332791e11, 0.662364680776872e16, -0.227622818296144e19, -0.171048081348406e32, 0.660788766938091e16, 0.166320055886021e23, -0.218003784381501e30, -0.787276140295618e30, 0.151062329700346e32, 0.795732170300541e7, 0.131957647355347e16, -0.325097068299140e24, -0.418600611419248e26, 0.297478906557467e35, -0.953588761745473e20, 0.166957699620939e25, -0.175407764869978e33, 0.347581490626396e35, -0.710971318427851e39];
  //
  var A = s1_star / s; //A = 1.0/sigma1; sigma1 = s/s1_star;
  var sigma2 = s / s2_star;
  var aa = A - 0.513;
  var bb = sigma2 - 0.524;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }
  return Math.exp(sum) * h_star;
}

// Equations $h^{''}_{2c3b}(s)$ for the Saturated Vapor Line
function boundaryB2c3b4_hs(s) {
  var h_star = 2800.0e3;
  var s_star = 5.9e3;
  var ir = [0, 0, 0, 1, 1, 5, 6, 7, 8, 8, 12, 16, 22, 22, 24, 36];
  var jr = [0, 3, 4, 0, 12, 36, 12, 16, 2, 20, 32, 36, 2, 32, 7, 20];
  var nr = [0.104351280732769e1, -0.227807912708513e1, 0.180535256723202e1, 0.420440834792042, -0.105721244834660e6, 0.436911607493884e25, -0.328032702839753e12, -0.678686760804270e16, 0.743957464645363e4, -0.356896445355761e20, 0.167590585186801e32, -0.355028625419105e38, 0.396611982166538e12, -0.414716268484468e41, 0.359080103867382e19, -0.116994334851995e41];
  //
  var sigma = s / s_star;
  var aa = sigma - 1.02;
  var bb = sigma - 0.726;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }
  var tmp = sum * sum;
  var tmp2 = tmp * tmp;
  return tmp2 * h_star;
}

// Equation h_{B13}(s) for Boundary between Regions 1 and 3
function boundaryB13_hs(s) {
  var h_star = 1700.0e3;
  var s_star = 3.8e3;
  var ir = [0, 1, 1, 3, 5, 6];
  var jr = [0, -2, 2, -12, -4, -3];
  var nr = [0.913965547600543, -0.430944856041991e-4, 0.603235694765419e2, 0.117518273082168e-17, 0.220000904781292, -0.690815545851641e2];
  //
  var sigma = s / s_star;
  var aa = sigma - 0.884;
  var bb = sigma - 0.864;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * h_star;
}

// Equation $T_{B23}(h,s)$ for the Boundary between Regions 2 and 3
function boundaryB23_ths(h, s) {
  var t_star = 900.0;
  var h_star = 3000.0e3;
  var s_star = 5.3e3;
  var ir = [-12, -10, -8, -4, -3, -2, -2, -2, -2, 0, 1, 1, 1, 3, 3, 5, 6, 6, 8, 8, 8, 12, 12, 14, 14];
  var jr = [10, 8, 3, 4, 3, -6, 2, 3, 4, 0, -3, -2, 10, -2, -1, -5, -6, -3, -8, -2, -1, -12, -1, -12, 1];
  var nr = [0.629096260829810e-3, -0.823453502583165e-3, 0.515446951519474e-7, -0.117565945784945e1, 0.348519684726192e1, -0.507837382408313e-11, -0.284637670005479e1, -0.236092263939673e1, 0.601492324973779e1, 0.148039650824546e1, 0.360075182221907e-3, -0.126700045009952e-1, -0.122184332521413e7, 0.149276502463272, 0.698733471798484, -0.252207040114321e-1, 0.147151930985213e-1, -0.108618917681849e1, -0.936875039816322e-3, 0.819877897570217e2, -0.182041861521835e3, 0.261907376402688e-5, -0.291626417025961e5, 0.140660774926165e-4, 0.783237062349385e7];
  //
  var eta = h / h_star;
  var sigma = s / s_star;
  var aa = eta - 0.727;
  var bb = sigma - 0.864;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }
  return sum * t_star;
}

// Boundary between r3 and r4: psat(h) - Supp-Tv(ph,ps)3-2014
function boundarySat_ph(h) {
  var p_star = 22.0e6; // Pa
  var h_star = 2600.0e3; // $J\cdot kg^{-1}$
  var ir = [0, 1, 1, 1, 1, 5, 7, 8, 14, 20, 22, 24, 28, 36];
  var jr = [0, 1, 3, 4, 36, 3, 0, 24, 16, 16, 3, 18, 8, 24];
  var nr = [0.600073641753024, -0.936203654849857e1, 0.246590798594147e2, -0.107014222858224e3, -0.915821315805768e14, -0.862332011700662e4, -0.235837344740032e2, 0.252304969384128e18, -0.389718771997719e19, -0.333775713645296e23, 0.356499469636328e11, -0.148547544720641e27, 0.330611514838798e19, 0.813641294467829e38];

  var eta = h / h_star;
  var aa = eta - 1.02;
  var bb = eta - 0.608;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * p_star;
}

// Boundary between r3 and r4: psat(s) - Supp-Tv(ph,ps)3-2014
function boundarySat_ps(s) {
  var p_star = 22.0e6; // Pa
  var s_star = 5.2e3; // $J\cdot kg^{-1} \cdot K^{-1}$
  var ir = [0, 1, 1, 4, 12, 12, 16, 24, 28, 32];
  var jr = [0, 1, 32, 7, 4, 14, 36, 10, 0, 18];
  var nr = [0.639767553612785, -0.129727445396014e2, -0.224595125848403e16, 0.177466741801846e7, 0.717079349571538e10, -0.378829107169011e18, -0.955586736431328e35, 0.187269814676188e24, 0.119254746466473e12, 0.110649277244882e37];

  var sigma = s / s_star;
  var aa = sigma - 1.03;
  var bb = sigma - 0.699;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * p_star;
}

// Region1
// r1 - Main functiontion to calculate the thermal dynamic properties of water in region1 by p and t
function r1(p, t) {
  var p_star = 16.53e6;
  var t_star = 1386.0;
  var pi = p / p_star;
  var tau = t_star / t;
  var gma = r1Gamma(pi, tau);
  var w = new Water();

  w.rgn = 1;
  w.p = p;
  w.t = t;
  w.v = iapws_R * t_star / p_star / tau * gma[1];
  w.u = iapws_R * t_star * (gma[2] - pi / tau * gma[1]);
  w.h = iapws_R * t_star * gma[2];
  w.s = iapws_R * (tau * gma[2] - gma[0]);
  w.cp = -iapws_R * tau * tau * gma[4];
  w.cv = iapws_R * (Math.pow(gma[1] - tau * gma[5], 2) / gma[3] - tau * tau * gma[4]);
  w.w = gma[1] * Math.sqrt(iapws_R * t_star / (Math.pow(gma[1] - tau * gma[5], 2) / tau / gma[4] - tau * gma[3]));
  w.x = NaN;

  return w;
}

// r1_tph - Calculate T from p and h in r1
function r1_tph(p, h) {
  var t0 = r1Backward_tph(p, h);
  var xa = iapws_tmin;
  var xb = null;
  if (p < iapws_psat13) {
    xb = r4Sat_tp(p);
  } else {
    xb = iapws_t13;
  }

  xa = Math.max(xa, 0.999 * t0);
  xb = Math.min(xb, 1.001 * t0);
  var f = function f(t) {
    var w = r1(p, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.h - h;
    }
  };
  var res = fzero(f, xa, xb, tolerance, t0);
  return res;
}

function r1_tps(p, s) {
  var t0, xa, xb;
  t0 = r1Backward_tps(p, s);
  xa = iapws_tmin;
  if (p < iapws_psat13) {
    xb = r4Sat_tp(p);
  } else {
    xb = iapws_t13;
  }

  xa = Math.max(xa, 0.999 * t0);
  xb = Math.min(xb, 1.001 * t0);
  var f = function f(t) {
    var w = r1(p, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };
  var res = fzero(f, xa, xb, tolerance, t0);
  return res;
}

function r1_pts(t, s) {
  var xa = r4Sat_pt(t);
  var xb = iapws_pmax;
  var f = function f(p) {
    var w = r1(p, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };

  var res = fzero(f, xa, xb, tolerancem);
  return res;
}

function r1_phs(h, s) {
  var p0 = r1Backward_phs(h, s);
  var xa, xb;

  xa = r4Sat_pt(r1Sat_ts(s));
  if (s <= iapws_s13_100) {
    xb = iapws_pmax;
  } else {
    xb = r1_pts(iapws_t13, s);
  }

  xa = Math.max(xa, 0.999 * p0);
  xb = Math.min(xb, 1.001 * p0);

  var f = function f(p) {
    var tx = r1_tph(p, h);
    var w = r1(p, tx);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };

  var res = fzero(f, xa, xb, tolerancem, p0);
  return res;
}

function r1_ths(h, s) {
  var p = r1_phs(h, s);
  return r1_tph(p, h);
}

function r1Sat_ts(s) {
  var xa = iapws_tmin;
  var xb = iapws_t13;
  var f = function f(t) {
    var p = r4Sat_pt(t);
    var w = r1(p, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };
  var res = fzero(f, xa, xb, tolerance);
  return res;
}

// Backward functiontions

function r1Backward_tph(p, h) {
  var t_star = 1.0; // K
  var p_star = 1.0e6; // Pa
  var h_star = 2500.0e3; // $J\cdot kg^{-1}$
  var ir = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 5, 6];
  var jr = [0, 1, 2, 6, 22, 32, 0, 1, 2, 3, 4, 10, 32, 10, 32, 10, 32, 32, 32, 32];
  var nr = [-0.23872489924521e+03, 0.40421188637945e+03, 0.11349746881718e+03, -0.58457616048039e+01, -0.15285482413140e-03, -0.10866707695377e-05, -0.13391744872602e+02, 0.43211039183559e+02, -0.54010067170506e+02, 0.30535892203916e+02, -0.65964749423638e+01, 0.93965400878363e-02, 0.11573647505340e-06, -0.25858641282073e-04, -0.40644363084799e-08, 0.66456186191635e-07, 0.80670734103027e-10, -0.93477771213947e-12, 0.58265442020601e-14, -0.15020185953503e-16];

  var pi = p / p_star;
  var eta = h / h_star;
  var length = ir.length;
  var sum = 0.0;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(pi, ir[i]) * Math.pow(eta + 1.0, jr[i]);
  }

  return sum * t_star;
}

function r1Backward_tps(p, s) {
  var t_star = 1.0; // K
  var p_star = 1.0e6; // Pa
  var s_star = 1.0e3; // $J\cdot kg^{-1}\cdot K^{-1}$
  var ir = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 4];
  var jr = [0, 1, 2, 3, 11, 31, 0, 1, 2, 3, 12, 31, 0, 1, 2, 9, 31, 10, 32, 32];
  var nr = [0.17478268058307e+03, 0.34806930892873e+02, 0.65292584978455e+01, 0.33039981775489e+00, -0.19281382923196e-06, -0.24909197244573e-22, -0.26107636489332e+00, 0.22592965981586e+00, -0.64256463395226e-01, 0.78876289270526e-02, 0.35672110607366e-09, 0.17332496994895e-23, 0.56608900654837e-03, -0.32635483139717e-03, 0.44778286690632e-04, -0.51322156908507e-09, -0.42522657042207e-25, 0.26400441360689e-12, 0.78124600459723e-28, -0.30732199903668e-30];

  var pi = p / p_star;
  var sigma = s / s_star;
  var length = ir.length;
  var sum = 0.0;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(pi, ir[i]) * Math.pow(sigma + 2.0, jr[i]);
  }

  return sum * t_star;
}

function r1Backward_phs(h, s) {
  var p_star = 100.0e6; // Pa
  var h_star = 3400.0e3; // $J\cdot kg^{-1}$
  var s_star = 7.6e3; // $J\cdot kg^{-1}\cdot K^{-1}$
  var ir = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 5];
  var jr = [0, 1, 2, 4, 5, 6, 8, 14, 0, 1, 4, 6, 0, 1, 10, 4, 1, 4, 0];
  var nr = [-0.691997014660582, -0.183612548787560e2, -0.928332409297335e1, 0.659639569909906e2, -0.162060388912024e2, 0.450620017338667e3, 0.854680678224170e3, 0.607523214001162e4, 0.326487682621856e2, -0.269408844582931e2, -0.319947848334300e3, -0.928354307043320e3, 0.303634537455249e2, -0.650540422444146e2, -0.430991316516130e4, -0.747512324096068e3, 0.730000345529245e3, 0.114284032569021e4, -0.436407041874559e3];

  var eta = h / h_star;
  var sigma = s / s_star;
  var aa = eta + 0.05;
  var bb = sigma + 0.05;
  var length = ir.length;
  var sum = 0.0;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * p_star;
}

function r1Backward_ths(h, s) {
  var p = r1Backward_phs(h, s);
  return r1Backward_tph(p, h);
}

// r1Gamma - Basic equation of r1
// The basic equation for this region is a fundamental equation for the specific Gibbs free energy (g).
// This equation is expressed in dimensionless form
// \f$ \frac{g(p,T)}{RT}=\gamma(\pi,\tau) = \Sigma_{i=1}^{34}n_i(7.1-\pi)^{I_i}(\tau-1.222)^{J_i} \f$
// Input pi - p/16.53MPa
// Input tau - 1386K/t
// Output [\gamma, \gamma_{\pi], \gamma_{\tau], \gamma_{\pi \pi], \gamma_{\tau \tau], \gamma_{\pi \tau}]
function r1Gamma(pi, tau) {
  var aa = 7.1 - pi;
  var bb = tau - 1.222;
  var ir = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 8, 8, 21, 23, 29, 30, 31, 32];
  var jr = [-2, -1, 0, 1, 2, 3, 4, 5, -9, -7, -1, 0, 1, 3, -3, 0, 1, 3, 17, -4, 0, 6, -5, -2, 10, -8, -11, -6, -29, -31, -38, -39, -40, -41];
  var nr = [0.14632971213167e+00, -0.84548187169114e+00, -0.37563603672040e+01, 0.33855169168385e+01, -0.95791963387872e+00, 0.15772038513228e+00, -0.16616417199501e-01, 0.81214629983568e-03, 0.28319080123804e-03, -0.60706301565874e-03, -0.18990068218419e-01, -0.32529748770505e-01, -0.21841717175414e-01, -0.52838357969930e-04, -0.47184321073267e-03, -0.30001780793026e-03, 0.47661393906987e-04, -0.44141845330846e-05, -0.72694996297594e-15, -0.31679644845054e-04, -0.28270797985312e-05, -0.85205128120103e-09, -0.22425281908000e-05, -0.65171222895601e-06, -0.14341729937924e-12, -0.40516996860117e-06, -0.12734301741641e-08, -0.17424871230634e-09, -0.68762131295531e-18, 0.14478307828521e-19, 0.26335781662795e-22, -0.11947622640071e-22, 0.18228094581404e-23, -0.93537087292458e-25];

  var length = ir.length;
  var res = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  for (var i = 0; i < length; i++) {
    var cc = nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
    res[0] += cc; //g
    res[1] += -ir[i] * cc / aa; //gp
    res[2] += jr[i] * cc / bb; //gt
    res[3] += ir[i] * (ir[i] - 1.0) * cc / aa / aa; //gpp
    res[4] += jr[i] * (jr[i] - 1.0) * cc / bb / bb; //gtt
    res[5] += -ir[i] * jr[i] * cc / aa / bb; //gpt
  }
  return res;
}


// Region2
// r2 - Main functiontion to calculate the thermal dynamic properties of water in region2 by p and t
function r2(p, t) {
  var p_star = 1.0e6;
  var t_star = 540.0;
  var pi = p / p_star;
  var tau = t_star / t;
  var gma = r2Gamma(pi, tau);
  var w = new Water();

  w.rgn = 2;
  w.p = p;
  w.t = t;
  w.v = iapws_R * t_star / p_star / tau * gma[1];
  w.u = iapws_R * t_star * (gma[2] - pi / tau * gma[1]);
  w.h = iapws_R * t_star * gma[2];
  w.s = iapws_R * (tau * gma[2] - gma[0]);
  w.cp = -iapws_R * tau * tau * gma[4];
  w.cv = iapws_R * (Math.pow(gma[1] - tau * gma[5], 2) / gma[3] - tau * tau * gma[4]);
  w.w = gma[1] * Math.sqrt(iapws_R * t_star / (Math.pow(gma[1] - tau * gma[5], 2) / tau / gma[4] - tau * gma[3]));
  w.x = NaN;

  return w;
}

function r2_tph(p, h) {
  var t0 = r2Backward_tph(p, h);
  var xa, xb;

  xa = iapws_tmin;
  if (p < iapws_psat13) {
    xb = r4Sat_tp(p);
  } else {
    xb = iapws_t13;
  }

  xa = Math.max(xa, 0.999 * t0);
  xb = Math.min(xb, 1.001 * t0);
  var f = function f(t) {
    var w = r2(p, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.h - h;
    }
  };

  var res = fzero(f, xa, xb, tolerance, t0);
  return res;
}

function r2_tps(p, s) {
  var t0 = r2Backward_tps(p, s);
  var xa, xb;
  xa = iapws_tmin;
  if (p < iapws_psat13) {
    xb = r4Sat_tp(p);
  } else {
    xb = iapws_t13;
  }

  xa = Math.max(xa, 0.999 * t0);
  xb = Math.min(xb, 1.001 * t0);
  var f = function f(t) {
    var w = r2(p, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };

  var res = fzero(f, xa, xb, tolerance, t0);
  return res;
}

function r2_pts(t, s) {
  var xa, xb;

  xa = iapws_pmin;
  if (t <= iapws_t13) {
    xb = r4Sat_pt(t);
  } else if (t < boundaryB23_tp(iapws_pmax)) {
    xb = boundaryB23_pt(t);
  } else {
    xb = iapws_pmax;
  }
  var f = function f(p) {
    var w = r2(p, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };

  var res = fzero(f, xa, xb, tolerancem);
  return res;
}

function r2_phs(h, s) {
  var p0 = r2Backward_phs(h, s);
  var xa, xb;

  if (s <= r2(iapws_pmax, iapws_t25).s) {
    xa = r4Sat_pt(r2Sat_ts(s));
    xb = iapws_pmax;
  } else if (s <= r2(iapws_pmin, iapws_tmin).s) {
    xa = r4Sat_pt(r2Sat_ts(s));
    xb = r2_pts(iapws_t25, s);
  } else {
    xa = iapws_pmin;
    xb = r2_pts(iapws_t25, s);
  }
  xa = Math.max(xa, 0.999 * p0);
  xb = Math.min(xb, 1.001 * p0);
  var f = function f(p) {
    var tx = r2_tph(p, h);
    var w = r2(p, tx);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };

  var res = fzero(f, xa, xb, tolerancem, p0);
  return res;
}

function r2_ths(h, s) {
  var p = r2_phs(h, s);
  return r2_tph(p, h);
}

function r2Sat_ts(s) {
  var xa = iapws_tmin;
  var xb = iapws_t13;
  var f = function f(t) {
    var p = r4Sat_pt(t);
    var w = r2(p, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };
  var res = fzero(f, xa, xb, tolerance);
  return res;
}

// Backward Equations

function r2Backward_tph(p, h) {
  var b2ab_p = 4.0e6; // Pa
  if (p < b2ab_p) {
    return r2Backward_tph_2a(p, h);
  } else if (p < r2B2bc_ph(h)) {
    return r2Backward_tph_2b(p, h);
  } else {
    return r2Backward_tph_2c(p, h);
  }
}

function r2Backward_tps(p, s) {
  var b2ab_p = 4.0e6; // Pa
  var s_boundry = 5.85e3; // $J \cdot kg_{-1} \cdot K_{-1}$
  if (p < b2ab_p) {
    return r2Backward_tps_2a(p, s);
  } else if (s >= s_boundry) {
    return r2Backward_tps_2b(p, s);
  } else {
    return r2Backward_tps_2c(p, s);
  }
}

function r2Backward_phs(h, s) {
  var b2bc_s = 5.85e3; // $J \cdot kg_{-1} \cdot K_{-1}$
  if (s < b2bc_s) {
    return r2Backward_phs_2c(h, s);
  } else {
    if (h > r2_b2ab_hs(s)) {
      return r2Backward_phs_2b(h, s);
    } else {
      return r2Backward_phs_2a(h, s);
    }
  }
}

function r2Backward_ths(h, s) {
  var p = r2Backward_phs(h, s);
  return r2Backward_tph(p, h);
}

function r2Backward_tph_2a(p, h) {
  var t_star = 1.0; // K
  var p_star = 1.0e6; // Pa
  var h_star = 2000.0e3; // $J\cdot kg^{-1}$
  var ir = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7];
  var jr = [0, 1, 2, 3, 7, 20, 0, 1, 2, 3, 7, 9, 11, 18, 44, 0, 2, 7, 36, 38, 40, 42, 44, 24, 44, 12, 32, 44, 32, 36, 42, 34, 44, 28];
  var nr = [0.10898952318288e+04, 0.84951654495535e+03, -0.10781748091826e+03, 0.33153654801263e+02, -0.74232016790248e+01, 0.11765048724356e+02, 0.18445749355790e+01, -0.41792700549624e+01, 0.62478196935812e+01, -0.17344563108114e+02, -0.20058176862096e+03, 0.27196065473796e+03, -0.45511318285818e+03, 0.30919688604755e+04, 0.25226640357872e+06, -0.61707422868339e-02, -0.31078046629583e+00, 0.11670873077107e+02, 0.12812798404046e+09, -0.98554909623276e+09, 0.28224546973002e+10, -0.35948971410703e+10, 0.17227349913197e+10, -0.13551334240775e+05, 0.12848734664650e+08, 0.13865724283226e+01, 0.23598832556514e+06, -0.13105236545054e+08, 0.73999835474766e+04, -0.55196697030060e+06, 0.37154085996233e+07, 0.19127729239660e+05, -0.41535164835634e+06, -0.62459855192507e+02];

  var pi = p / p_star;
  var eta = h / h_star;
  var aa = pi;
  var bb = eta - 2.1;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * t_star;
}

function r2Backward_tph_2b(p, h) {
  var t_star = 1.0; // K
  var p_star = 1.0e6; // Pa
  var h_star = 2000.0e3; // $J\cdot kg^{-1}$
  var ir = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 6, 7, 7, 9, 9];
  var jr = [0, 1, 2, 12, 18, 24, 28, 40, 0, 2, 6, 12, 18, 24, 28, 40, 2, 8, 18, 40, 1, 2, 12, 24, 2, 12, 18, 24, 28, 40, 18, 24, 40, 28, 2, 28, 1, 40];
  var nr = [0.14895041079516e+04, 0.74307798314034e+03, -0.97708318797837e+02, 0.24742464705674e+01, -0.63281320016026e+00, 0.11385952129658e+01, -0.47811863648625e+00, 0.85208123431544e-02, 0.93747147377932e+00, 0.33593118604916e+01, 0.33809355601454e+01, 0.16844539671904e+00, 0.73875745236695e+00, -0.47128737436186e+00, 0.15020273139707e+00, -0.21764114219750e-02, -0.21810755324761e-01, -0.10829784403677e+00, -0.46333324635812e-01, 0.71280351959551e-04, 0.11032831789999e-03, 0.18955248387902e-03, 0.30891541160537e-02, 0.13555504554949e-02, 0.28640237477456e-06, -0.10779857357512e-04, -0.76462712454814e-04, 0.14052392818316e-04, -0.31083814331434e-04, -0.10302738212103e-05, 0.28217281635040e-06, 0.12704902271945e-05, 0.73803353468292e-07, -0.11030139238909e-07, -0.81456365207833e-13, -0.25180545682962e-10, -0.17565233969407e-17, 0.86934156344163e-14];

  var pi = p / p_star;
  var eta = h / h_star;
  var aa = pi - 2.0;
  var bb = eta - 2.6;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * t_star;
}

function r2Backward_tph_2c(p, h) {
  var t_star = 1.0; // K
  var p_star = 1.0e6; // Pa
  var h_star = 2000.0e3; // $J\cdot kg^{-1}$
  var ir = [-7, -7, -6, -6, -5, -5, -2, -2, -1, -1, 0, 0, 1, 1, 2, 6, 6, 6, 6, 6, 6, 6, 6];
  var jr = [0, 4, 0, 2, 0, 2, 0, 1, 0, 2, 0, 1, 4, 8, 4, 0, 1, 4, 10, 12, 16, 20, 22];
  var nr = [-0.32368398555242e+13, 0.73263350902181e+13, 0.35825089945447e+12, -0.58340131851590e+12, -0.10783068217470e+11, 0.20825544563171e+11, 0.61074783564516e+06, 0.85977722535580e+06, -0.25745723604170e+05, 0.31081088422714e+05, 0.12082315865936e+04, 0.48219755109255e+03, 0.37966001272486e+01, -0.10842984880077e+02, -0.45364172676660e-01, 0.14559115658698e-12, 0.11261597407230e-11, -0.17804982240686e-10, 0.12324579690832e-06, -0.11606921130984e-05, 0.27846367088554e-04, -0.59270038474176e-03, 0.12918582991878e-02];

  var pi = p / p_star;
  var eta = h / h_star;
  var aa = pi + 25.0;
  var bb = eta - 1.8;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * t_star;
}

function r2Backward_tps_2a(p, s) {
  var t_star = 1.0; // K
  var p_star = 1.0e6; // Pa
  var s_star = 2.0e3; // $J\cdot kg^{-1}\cdot K^{-1}$
  var ir = [-1.5, -1.5, -1.5, -1.5, -1.5, -1.5, -1.25, -1.25, -1.25, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -0.75, -0.75, -0.5, -0.5, -0.5, -0.5, -0.25, -0.25, -0.25, -0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 1.0, 1.0, 1.25, 1.25, 1.5, 1.5];
  var jr = [-24, -23, -19, -13, -11, -10, -19, -15, -6, -26, -21, -17, -16, -9, -8, -15, -14, -26, -13, -9, -7, -27, -25, -11, -6, 1, 4, 8, 11, 0, 1, 5, 6, 10, 14, 16, 0, 4, 9, 17, 7, 18, 3, 15, 5, 18];
  var nr = [-0.39235983861984e6, 0.51526573827270e6, 0.40482443161048e5, -0.32193790923902e3, 0.96961424218694e2, -0.22867846371773e2, -0.44942914124357e6, -0.50118336020166e4, 0.35684463560015, 0.44235335848190e5, -0.13673388811708e5, 0.42163260207864e6, 0.22516925837475e5, 0.47442144865646e3, -0.14931130797647e3, -0.19781126320452e6, -0.23554399470760e5, -0.19070616302076e5, 0.55375669883164e5, 0.38293691437363e4, -0.60391860580567e3, 0.19363102620331e4, 0.42660643698610e4, -0.59780638872718e4, -0.70401463926862e3, 0.33836784107553e3, 0.20862786635187e2, 0.33834172656196e-1, -0.43124428414893e-4, 0.16653791356412e3, -0.13986292055898e3, -0.78849547999872, 0.72132411753872e-1, -0.59754839398283e-2, -0.12141358953904e-4, 0.23227096733871e-6, -0.10538463566194e2, 0.20718925496502e1, -0.72193155260427e-1, 0.20749887081120e-6, -0.18340657911379e-1, 0.29036272348696e-6, 0.21037527893619, 0.25681239729999e-3, -0.12799002933781e-1, -0.82198102652018e-5];

  var pi = p / p_star;
  var sigma = s / s_star;
  var aa = pi;
  var bb = sigma - 2.0;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * t_star;
}

function r2Backward_tps_2b(p, s) {
  var t_star = 1.0; // K
  var p_star = 1.0e6; // Pa
  var s_star = 0.7853e3; // $J\cdot kg^{-1}\cdot K^{-1}$
  var ir = [-6, -6, -5, -5, -4, -4, -4, -3, -3, -3, -3, -2, -2, -2, -2, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5];
  var jr = [0, 11, 0, 11, 0, 1, 11, 0, 1, 11, 12, 0, 1, 6, 10, 0, 1, 5, 8, 9, 0, 1, 2, 4, 5, 6, 9, 0, 1, 2, 3, 7, 8, 0, 1, 5, 0, 1, 3, 0, 1, 0, 1, 2];
  var nr = [0.31687665083497e6, 0.20864175881858e2, -0.39859399803599e6, -0.21816058518877e2, 0.22369785194242e6, -0.27841703445817e4, 0.99207436071480e1, -0.75197512299157e5, 0.29708605951158e4, -0.34406878548526e1, 0.38815564249115, 0.17511295085750e5, -0.14237112854449e4, 0.10943803364167e1, 0.89971619308495, -0.33759740098958e4, 0.47162885818355e3, -0.19188241993679e1, 0.41078580492196, -0.33465378172097, 0.13870034777505e4, -0.40663326195838e3, 0.41727347159610e2, 0.21932549434532e1, -0.10320050009077e1, 0.35882943516703, 0.52511453726066e-2, 0.12838916450705e2, -0.28642437219381e1, 0.56912683664855, -0.99962954584931e-1, -0.32632037778459e-2, 0.23320922576723e-3, -0.15334809857450, 0.29072288239902e-1, 0.37534702741167e-3, 0.17296691702411e-2, -0.38556050844504e-3, -0.35017712292608e-4, -0.14566393631492e-4, 0.56420857267269e-5, 0.41286150074605e-7, -0.20684671118824e-7, 0.16409393674725e-8];

  var pi = p / p_star;
  var sigma = s / s_star;
  var aa = pi;
  var bb = 10.0 - sigma;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * t_star;
}

function r2Backward_tps_2c(p, s) {
  var t_star = 1.0; // K
  var p_star = 1.0e6; // Pa
  var s_star = 2.9251e3; // $J\cdot kg^{-1}\cdot K^{-1}$
  var ir = [-2, -2, -1, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 7, 7, 7];
  var jr = [0, 1, 0, 0, 1, 2, 3, 0, 1, 3, 4, 0, 1, 2, 0, 1, 5, 0, 1, 4, 0, 1, 2, 0, 1, 0, 1, 3, 4, 5];
  var nr = [0.90968501005365e3, 0.24045667088420e4, -0.59162326387130e3, 0.54145404128074e3, -0.27098308411192e3, 0.97976525097926e3, -0.46966772959435e3, 0.14399274604723e2, -0.19104204230429e2, 0.53299167111971e1, -0.21252975375934e2, -0.31147334413760, 0.60334840894623, -0.42764839702509e-1, 0.58185597255259e-2, -0.14597008284753e-1, 0.56631175631027e-2, -0.76155864584577e-4, 0.22440342919332e-3, -0.12561095013413e-4, 0.63323132660934e-6, -0.20541989675375e-5, 0.36405370390082e-7, -0.29759897789215e-8, 0.10136618529763e-7, 0.59925719692351e-11, -0.20677870105164e-10, -0.20874278181886e-10, 0.10162166825089e-9, -0.16429828281347e-9];

  var pi = p / p_star;
  var sigma = s / s_star;
  var aa = pi;
  var bb = 2.0 - sigma;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * t_star;
}

function r2Backward_phs_2a(h, s) {
  var p_star = 4.0e6; // Pa
  var h_star = 4200.0e3; // $J\cdot kg^{-1}$
  var s_star = 12.0e3; // $J\cdot kg^{-1}\cdot K^{-1}$
  var ir = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 5, 5, 6, 7];
  var jr = [1, 3, 6, 16, 20, 22, 0, 1, 2, 3, 5, 6, 10, 16, 20, 22, 3, 16, 20, 0, 2, 3, 6, 16, 16, 3, 16, 3, 1];
  var nr = [-0.182575361923032e-1, -0.125229548799536, 0.592290437320145, 0.604769706185122e1, 0.238624965444474e3, -0.298639090222922e3, 0.512250813040750e-1, -0.437266515606486, 0.413336902999504, -0.516468254574773e1, -0.557014838445711e1, 0.128555037824478e2, 0.114144108953290e2, -0.119504225652714e3, -0.284777985961560e4, 0.431757846408006e4, 0.112894040802650e1, 0.197409186206319e4, 0.151612444706087e4, 0.141324451421235e-1, 0.585501282219601, -0.297258075863012e1, 0.594567314847319e1, -0.623656565798905e4, 0.965986235133332e4, 0.681500934948134e1, -0.633207286824489e4, -0.558919224465760e1, 0.400645798472063e-1];

  var eta = h / h_star;
  var sigma = s / s_star;
  var aa = eta - 0.5;
  var bb = sigma - 1.2;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return Math.pow(sum, 4) * p_star;
}

function r2Backward_phs_2b(h, s) {
  var p_star = 100.0e6; // Pa
  var h_star = 4100.0e3; // $J\cdot kg^{-1}$
  var s_star = 7.9e3; // $J\cdot kg^{-1}\cdot K^{-1}$
  var ir = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 8, 12, 14];
  var jr = [0, 1, 2, 4, 8, 0, 1, 2, 3, 5, 12, 1, 6, 18, 0, 1, 7, 12, 1, 16, 1, 12, 1, 8, 18, 1, 16, 1, 3, 14, 18, 10, 16];
  var nr = [0.801496989929495e-1, -0.543862807146111, 0.337455597421283, 0.890555451157450e1, 0.313840736431485e3, 0.797367065977789, -0.121616973556240e1, 0.872803386937477e1, -0.169769781757602e2, -0.186552827328416e3, 0.951159274344237e5, -0.189168510120494e2, -0.433407037194840e4, 0.543212633012715e9, 0.144793408386013, 0.128024559637516e3, -0.672309534071268e5, 0.336972380095287e8, -0.586634196762720e3, -0.221403224769889e11, 0.171606668708389e4, -0.570817595806302e9, -0.312109693178482e4, -0.207841384633010e7, 0.305605946157786e13, 0.322157004314333e4, 0.326810259797295e12, -0.144104158934487e4, 0.410694867802691e3, 0.109077066873024e12, -0.247964654258893e14, 0.188801906865134e10, -0.123651009018773e15];

  var eta = h / h_star;
  var sigma = s / s_star;
  var aa = eta - 0.6;
  var bb = sigma - 1.01;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return Math.pow(sum, 4) * p_star;
}

function r2Backward_phs_2c(h, s) {
  var p_star = 100.0e6; // Pa
  var h_star = 3500.0e3; // $J\cdot kg^{-1}$
  var s_star = 5.9e3; // $J\cdot kg^{-1}\cdot K^{-1}$
  var ir = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 5, 5, 5, 5, 6, 6, 10, 12, 16];
  var jr = [0, 1, 2, 3, 4, 8, 0, 2, 5, 8, 14, 2, 3, 7, 10, 18, 0, 5, 8, 16, 18, 18, 1, 4, 6, 14, 8, 18, 7, 7, 10];
  var nr = [0.112225607199012, -0.339005953606712e1, -0.320503911730094e2, -0.197597305104900e3, -0.407693861553446e3, 0.132943775222331e5, 0.170846839774007e1, 0.373694198142245e2, 0.358144365815434e4, 0.423014446424664e6, -0.751071025760063e9, 0.523446127607898e2, -0.228351290812417e3, -0.960652417056937e6, -0.807059292526074e8, 0.162698017225669e13, 0.772465073604171, 0.463929973837746e5, -0.137317885134128e8, 0.170470392630512e13, -0.251104628187308e14, 0.317748830835520e14, 0.538685623675312e2, -0.553089094625169e5, -0.102861522421405e7, 0.204249418756234e13, 0.273918446626977e9, -0.263963146312685e16, -0.107890854108088e10, -0.296492620980124e11, -0.111754907323424e16];

  var eta = h / h_star;
  var sigma = s / s_star;
  var aa = eta - 0.7;
  var bb = sigma - 1.1;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return Math.pow(sum, 4) * p_star;
}

// Basic equations of r2

function r2Gamma(pi, tau) {
  var gma1 = r2Gamma_o(pi, tau);
  var gma2 = r2Gamma_r(pi, tau);
  var res = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  for (var i = 0; i < 6; i++) {
    res[i] = gma1[i] + gma2[i];
  }
  return res;
}

function r2Gamma_o(pi, tau) {
  var aa = pi;
  var bb = tau;
  var jr = [0, 1, -5, -4, -3, -2, -1, 2, 3];
  var nr = [-0.96927686500217e+01, 0.10086655968018e+02, -0.56087911283020e-02, 0.71452738081455e-01, -0.40710498223928e+00, 0.14240819171444e+01, -0.43839511319450e+01, -0.28408632460772e+00, 0.21268463753307e-01];
  var res = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  res[0] = Math.log(aa); // g
  res[1] = 1.0 / aa; // gp
  res[2] = 0.0; // gt
  res[3] = -1.0 / aa / aa; //gpp
  res[4] = 0.0; // gtt
  res[5] = 0.0; // gpt
  var length = jr.length;
  for (var i = 0; i < length; i++) {
    var cc = nr[i] * Math.pow(bb, jr[i]);
    res[0] += cc; //g
    res[2] += jr[i] * cc / bb; //gt
    res[4] += jr[i] * (jr[i] - 1.0) * cc / bb / bb; //gtt
  }
  return res;
}

function r2Gamma_r(pi, tau) {
  var aa = pi;
  var bb = tau - 0.5;
  var ir = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 5, 6, 6, 6, 7, 7, 7, 8, 8, 9, 10, 10, 10, 16, 16, 18, 20, 20, 20, 21, 22, 23, 24, 24, 24];
  var jr = [0, 1, 2, 3, 6, 1, 2, 4, 7, 36, 0, 1, 3, 6, 35, 1, 2, 3, 7, 3, 16, 35, 0, 11, 25, 8, 36, 13, 4, 10, 14, 29, 50, 57, 20, 35, 48, 21, 53, 39, 26, 40, 58];
  var nr = [-0.17731742473213e-02, -0.17834862292358e-01, -0.45996013696365e-01, -0.57581259083432e-01, -0.50325278727930e-01, -0.33032641670203e-04, -0.18948987516315e-03, -0.39392777243355e-02, -0.43797295650573e-01, -0.26674547914087e-04, 0.20481737692309e-07, 0.43870667284435e-06, -0.32277677238570e-04, -0.15033924542148e-02, -0.40668253562649e-01, -0.78847309559367e-09, 0.12790717852285e-07, 0.48225372718507e-06, 0.22922076337661e-05, -0.16714766451061e-10, -0.21171472321355e-02, -0.23895741934104e+02, -0.59059564324270e-17, -0.12621808899101e-05, -0.38946842435739e-01, 0.11256211360459e-10, -0.82311340897998e+01, 0.19809712802088e-07, 0.10406965210174e-18, -0.10234747095929e-12, -0.10018179379511e-08, -0.80882908646985e-10, 0.10693031879409e+00, -0.33662250574171e+00, 0.89185845355421e-24, 0.30629316876232e-12, -0.42002467698208e-05, -0.59056029685639e-25, 0.37826947613457e-05, -0.12768608934681e-14, 0.73087610595061e-28, 0.55414715350778e-16, -0.94369707241210e-06];
  var res = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  var length = ir.length;
  for (var i = 0; i < length; i++) {
    var cc = nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
    res[0] += cc; //g
    res[1] += ir[i] * cc / aa; //gp
    res[2] += jr[i] * cc / bb; //gt
    res[3] += ir[i] * (ir[i] - 1.0) * cc / aa / aa; //gpp
    res[4] += jr[i] * (jr[i] - 1.0) * cc / bb / bb; //gtt
    res[5] += ir[i] * jr[i] * cc / aa / bb; //gpt
  }

  return res;
}

// boundary of subregion 2b and 2c

function r2B2bc_ph(h) {
  var p_star = 1.0e6;
  var h_star = 1.0e3; // $J\cdot kg^{-1}$
  var eta = h / h_star;

  var n1 = 0.90584278514723e+03;
  var n2 = -0.67955786399241e+00;
  var n3 = 0.12809002730136e-03;

  var pi = n1 + n2 * eta + n3 * eta * eta;
  return pi * p_star;
}

function r2B2bc_hp(p) {
  var p_star = 1.0e6; // Pa
  var h_star = 1.0e3; // $J\cdot kg^{-1}$
  var pi = p / p_star;

  var n3 = 0.12809002730136e-03;
  var n4 = 0.26526571908428e+04;
  var n5 = 0.45257578905948e+01;

  var eta = n4 + Math.sqrt((pi - n5) / n3);
  return eta * h_star;
}

function r2_b2ab_hs(s) {
  var h_star = 1.0e3; // $J\cdot kg^{-1}$
  var s_star = 1.0e3; // $J\cdot kg^{-1}\cdot K^{-1}$
  var sigma = s / s_star;

  var n1 = -0.349898083432139e4;
  var n2 = 0.257560716905876e4;
  var n3 = -0.421073558227969e3;
  var n4 = 0.276349063799944e2;

  return h_star * (n1 + n2 * sigma + n3 * sigma * sigma + n4 * sigma * sigma * sigma);
}

// r3
function r3(d, t) {
  var delta = d / iapws_rhoc;
  var tau = iapws_tc / t;
  var phi = r3Phi(delta, tau);
  var w = new Water();

  w.rgn = 3;
  w.p = iapws_R * iapws_tc * iapws_rhoc * delta * delta / tau * phi[1];
  w.t = t;
  w.v = 1.0 / d;
  w.u = iapws_R * iapws_tc * phi[2];
  w.h = iapws_R * iapws_tc * (phi[2] + delta / tau * phi[1]);
  w.s = iapws_R * (tau * phi[2] - phi[0]);
  w.cp = iapws_R * (Math.pow(phi[1] - tau * phi[5], 2) / (2.0 / delta * phi[1] + phi[3]) - tau * tau * phi[4]);
  w.cv = -iapws_R * tau * tau * phi[4];
  w.w = Math.sqrt(iapws_R * iapws_tc * delta * delta / tau * (2.0 / delta * phi[1] + phi[3] - Math.pow(phi[1] - tau * phi[5], 2) / (tau * tau * phi[4])));
  w.x = NaN;

  return w;
}

function r3_vpt(p, t) {
  var v0 = r3Backward_vpt(p, t);
  var xa, xb;
  if (p >= iapws_pc) {
    var ta = iapws_t13;
    xa = r1(p, ta).v;
    var tb = boundaryB23_tp(p);
    xb = r2(p, tb).v;
  } else {
    var ts = r4Sat_tp(p);
    if (t < ts) {
      var _ta = iapws_t13;
      xa = r1(p, _ta).v;
      xb = r3SatLiquid_vt(ts);
    } else {
      xa = r3SatVapor_vt(ts);
      var _tb = boundaryB23_tp(p);
      xb = r2(p, _tb).v;
    }
  }
  xa = Math.max(0.999 * v0, xa);
  xb = Math.min(1.001 * v0, xb);
  var f = function f(v) {
    var w = r3(1.0 / v, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.p - p;
    }
  };
  var res = fzero(f, xa, xb, tolerancek, v0);
  return res;
}

function r3_tph(p, h) {
  var t0 = r3Backward_tph(p, h);
  var xa, xb;

  if (p >= iapws_pc) {
    xa = iapws_t13;
    xb = boundaryB23_tp(p);
  } else {
    var ts = r4Sat_tp(p);
    var vl = r3SatLiquid_vt(ts);
    var vv = r3SatVapor_vt(ts);
    var hl = r3(1.0 / vl, ts).h;
    var hv = r3(1.0 / vv, ts).h;
    if (h <= hl) {
      xa = iapws_t13;
      xb = ts;
    } else if (h >= hv) {
      xa = ts;
      xb = boundaryB23_tp(p);
    } else {
      return t0;
    }
  }
  xa = Math.max(xa, 0.999 * t0);
  xb = Math.min(xb, 1.001 * t0);
  var f = function f(t) {
    var v = r3_vpt(p, t);
    var w = r3(1.0 / v, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.h - h;
    }
  };

  var res = fzero(f, xa, xb, tolerance, t0);
  return res;
}

function r3_vph(p, h) {
  var v0 = r3Backward_vph(p, h);

  var t = r3_tph(p, h);
  var v = r3_vpt(p, t);
  if (isNaN(v)) {
    return v0;
  }
  return v;
}

function r3_tps(p, s) {
  var t0 = r3Backward_tps(p, s);
  var xa, xb;
  if (p >= iapws_pc) {
    xa = iapws_t13;
    xb = boundaryB23_tp(p);
  } else {
    var ts = r4Sat_tp(p);
    var vl = r3SatLiquid_vt(ts);
    var vv = r3SatVapor_vt(ts);
    var sl = r3(1.0 / vl, ts).s;
    var sv = r3(1.0 / vv, ts).s;
    if (s <= sl) {
      xa = iapws_t13;
      xb = ts;
    } else if (s >= sv) {
      xa = ts;
      xb = boundaryB23_tp(p);
    } else {
      return t0;
    }
  }
  xa = Math.max(xa, 0.999 * t0);
  xb = Math.min(xb, 1.001 * t0);
  var f = function f(t) {
    var v = r3_vpt(p, t);
    var w = r3(1.0 / v, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };

  var res = fzero(f, xa, xb, tolerance, t0);
  return res;
}

function r3_vps(p, s) {
  var v0 = r3Backward_vps(p, s);
  var t = r3_tps(p, s);
  var v = r3_vpt(p, t);

  if (isNaN(v)) {
    return v0;
  }
  return v;
}

function r3_vts(t, s) {
  var va, vb;
  if (t > iapws_tc) {
    va = r3_vpt(boundaryB23_pt(t), t);
    vb = r3_vpt(iapws_pmax, t);
  } else {
    var vl = r3SatLiquid_vt(t);
    var vv = r3SatVapor_vt(t);
    var sl = r3(1.0 / vl, t).s;
    var sv = r3(1.0 / vv, t).s;
    if (s <= sl) {
      va = r3_vpt(iapws_pmax, t);
      vb = vl;
    } else if (s >= sv) {
      va = vv;
      vb = r3_vpt(boundaryB23_pt(t), t);
    } else {
      return NaN; // We should not reach here, or we are in r4
    }
  }

  var xa = Math.min(va, vb);
  var xb = Math.max(va, vb);
  var f = function f(v) {
    var w = r3(1.0 / v, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };

  var res = fzero(f, xa, xb, tolerancek);
  return res;
}

function r3_ths(h, s) {
  var t0 = r3Backward_ths(h, s);
  var xa = iapws_t13;
  var xb = r3_tps(iapws_pmax, s);
  xa = Math.max(xa, 0.999 * t0);
  xb = Math.min(xb, 1.001 * t0);
  var f = function f(t) {
    var v = r3_vts(t, s);
    var w = r3(1.0 / v, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.h - h;
    }
  };
  var res = fzero(f, xa, xb, tolerance, t0);
  return res;
}

function r3_vhs(h, s) {
  var v0 = r3Backward_vhs(h, s);

  var t = r3_ths(h, s);
  var v = r3_vts(t, s);

  if (isNaN(v)) {
    return v0;
  }
  return v;
}

//
function r3SatLiquid_vt(t) {
  var v0 = r3BackwardSatLiquid_vt(t);
  var xa = r1(r4Sat_pt(iapws_t13), iapws_t13).v;
  var xb = 1.0 / iapws_rhoc;

  xa = Math.max(xa, 0.999 * v0);
  xb = Math.min(xb, 1.001 * v0);
  var p = r4Sat_pt(t);
  var f = function f(v) {
    var w = r3(1.0 / v, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.p - p;
    }
  };

  var res = fzero(f, xa, xb, tolerancek, v0);
  return res;
}

function r3SatVapor_vt(t) {
  var v0 = r3BackwardSatVapor_vt(t);
  var xa = 1.0 / iapws_rhoc;
  var xb = r2(r4Sat_pt(iapws_t13), iapws_t13).v;
  xa = Math.max(xa, 0.999 * v0);
  xb = Math.min(xb, 1.001 * v0);
  var p = r4Sat_pt(t);
  var f = function f(v) {
    var w = r3(1.0 / v, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.p - p;
    }
  };
  var res = fzero(f, xa, xb, tolerancek, v0);
  return res;
}
/*
  function r3Sat_ts(s) {
  	let xa = iapws_t13;
  	let xb = iapws_tc;
  	let f = function(t) {
  		var v;
  		if (s <= iapws_sc) {
  			v = r3SatLiquid_vt(t);
  		} else {
  			v = r3SatVapor_vt(t);
  		}
  		let w = r3(1.0/v, t);
  		if(w == null) {
  			return Infinity;
  		} else {
  			return w.s - s;
  		}
  	}
  	let res = fzero(f, xa, xb, tolerance);
  	return res
  }
  */
// Backward Equations
// Backward Equations T(p,h) - Supp-Tv(ph,ps)3-2014
function r3Backward_tph(p, h) {
  if (h < r3B3ab_hp(p)) {
    return r3Backward_tph_3a(p, h);
  } else {
    return r3Backward_tph_3b(p, h);
  }
}

// Backward Equations v(p,h) - Supp-Tv(ph,ps)3-2014
function r3Backward_vph(p, h) {
  if (h < r3B3ab_hp(p)) {
    return r3Backward_vph_3a(p, h);
  } else {
    return r3Backward_vph_3b(p, h);
  }
}

// Backward Equations T(p,s) - Supp-Tv(ph,ps)3-2014
function r3Backward_tps(p, s) {
  if (s <= iapws_sc) {
    return r3Backward_tps_3a(p, s);
  } else {
    return r3Backward_tps_3b(p, s);
  }
}

// Backward Equations v(p,s) - Supp-Tv(ph,ps)3-2014
function r3Backward_vps(p, s) {
  if (s <= iapws_sc) {
    return r3Backward_vps_3a(p, s);
  } else {
    return r3Backward_vps_3b(p, s);
  }
}

// Backward Equations p(h,s) - Supp-phs3-2014
function r3Backward_phs(h, s) {
  if (s <= iapws_sc) {
    return r3Backward_phs_3a(h, s);
  } else {
    return r3Backward_phs_3b(h, s);
  }
}

// Backward functiontion T(h,s) - Supp-phs3-2014
function r3Backward_ths(h, s) {
  var p = r3Backward_phs(h, s);
  return r3Backward_tph(p, h);
}

// Backward functiontion v(h,s) - Supp-phs3-2014
function r3Backward_vhs(h, s) {
  var p = r3Backward_phs(h, s);
  return r3Backward_vps(p, s);
}

// Backward Equations v(p,T) - Supp-VPT3-2014
function r3Backward_vpt(p, t) {
  var subrgn = r3SubRegionVPT(p, t);
  return r3Backward_vpt_helper(p, t, subrgn);
}

// r3 Helper functiontions
function r3Backward_tph_3a(p, h) {
  var t_star = 760.0; // K
  var p_star = 100.0e6; // Pa
  var h_star = 2300.0e3; // $J\cdot kg^{-1}$
  var ir = [-12, -12, -12, -12, -12, -12, -12, -12, -10, -10, -10, -8, -8, -8, -8, -5, -3, -2, -2, -2, -1, -1, 0, 0, 1, 3, 3, 4, 4, 10, 12];
  var jr = [0, 1, 2, 6, 14, 16, 20, 22, 1, 5, 12, 0, 2, 4, 10, 2, 0, 1, 3, 4, 0, 2, 0, 1, 1, 0, 1, 0, 3, 4, 5];
  var nr = [-0.133645667811215e-6, 0.455912656802978e-5, -0.146294640700979e-4, 0.639341312970080e-2, 0.372783927268847e3, -0.718654377460447e4, 0.573494752103400e6, -0.267569329111439e7, -0.334066283302614e-4, -0.245479214069597e-1, 0.478087847764996e2, 0.764664131818904e-5, 0.128350627676972e-2, 0.171219081377331e-1, -0.851007304583213e1, -0.136513461629781e-1, -0.384460997596657e-5, 0.337423807911655e-2, -0.551624873066791, 0.729202277107470, -0.992522757376041e-2, -0.119308831407288, 0.793929190615421, 0.454270731799386, 0.209998591259910, -0.642109823904738e-2, -0.235155868604540e-1, 0.252233108341612e-2, -0.764885133368119e-2, 0.136176427574291e-1, -0.133027883575669e-1];

  var pi = p / p_star;
  var eta = h / h_star;
  var aa = pi + 0.240;
  var bb = eta - 0.615;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * t_star;
}
function r3Backward_tph_3b(p, h) {
  var t_star = 860.0; // K
  var p_star = 100.0e6; // Pa
  var h_star = 2800.0e3; // $J\cdot kg^{-1}$
  var ir = [-12, -12, -10, -10, -10, -10, -10, -8, -8, -8, -8, -8, -6, -6, -6, -4, -4, -3, -2, -2, -1, -1, -1, -1, -1, -1, 0, 0, 1, 3, 5, 6, 8];
  var jr = [0, 1, 0, 1, 5, 10, 12, 0, 1, 2, 4, 10, 0, 1, 2, 0, 1, 5, 0, 4, 2, 4, 6, 10, 14, 16, 0, 2, 1, 1, 1, 1, 1];
  var nr = [0.323254573644920e-4, -0.127575556587181e-3, -0.475851877356068e-3, 0.156183014181602e-2, 0.105724860113781, -0.858514221132534e2, 0.724140095480911e3, 0.296475810273257e-2, -0.592721983365988e-2, -0.126305422818666e-1, -0.115716196364853, 0.849000969739595e2, -0.108602260086615e-1, 0.154304475328851e-1, 0.750455441524466e-1, 0.252520973612982e-1, -0.602507901232996e-1, -0.307622221350501e1, -0.574011959864879e-1, 0.503471360939849e1, -0.925081888584834, 0.391733882917546e1, -0.773146007130190e2, 0.949308762098587e4, -0.141043719679409e7, 0.849166230819026e7, 0.861095729446704, 0.323346442811720, 0.873281936020439, -0.436653048526683, 0.286596714529479, -0.131778331276228, 0.676682064330275e-2];
  //
  var pi = p / p_star;
  var eta = h / h_star;
  var aa = pi + 0.298;
  var bb = eta - 0.720;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * t_star;
}

function r3Backward_vph_3a(p, h) {
  var v_star = 0.0028; // $m^3 \cdot kg^{-1}$
  var p_star = 100.0e6; // Pa
  var h_star = 2100.0e3; // $J\cdot kg^{-1}$
  var ir = [-12, -12, -12, -12, -10, -10, -10, -8, -8, -6, -6, -6, -4, -4, -3, -2, -2, -1, -1, -1, -1, 0, 0, 1, 1, 1, 2, 2, 3, 4, 5, 8];
  var jr = [6, 8, 12, 18, 4, 7, 10, 5, 12, 3, 4, 22, 2, 3, 7, 3, 16, 0, 1, 2, 3, 0, 1, 0, 1, 2, 0, 2, 0, 2, 2, 2];
  var nr = [0.529944062966028e-2, -0.170099690234461, 0.111323814312927e2, -0.217898123145125e4, -0.506061827980875e-3, 0.556495239685324, -0.943672726094016e1, -0.297856807561527, 0.939353943717186e2, 0.192944939465981e-1, 0.421740664704763, -0.368914126282330e7, -0.737566847600639e-2, -0.354753242424366, -0.199768169338727e1, 0.115456297059049e1, 0.568366875815960e4, 0.808169540124668e-2, 0.172416341519307, 0.104270175292927e1, -0.297691372792847, 0.560394465163593, 0.275234661176914, -0.148347894866012, -0.651142513478515e-1, -0.292468715386302e1, 0.664876096952665e-1, 0.352335014263844e1, -0.146340792313332e-1, -0.224503486668184e1, 0.110533464706142e1, -0.408757344495612e-1];
  //
  var pi = p / p_star;
  var eta = h / h_star;
  var aa = pi + 0.128;
  var bb = eta - 0.727;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * v_star;
}

function r3Backward_vph_3b(p, h) {
  var v_star = 0.0088; // $m^3 \cdot kg^{-1}$
  var p_star = 100.0e6; // Pa
  var h_star = 2800.0e3; // $J\cdot kg^{-1}$
  var ir = [-12, -12, -8, -8, -8, -8, -8, -8, -6, -6, -6, -6, -6, -6, -4, -4, -4, -3, -3, -2, -2, -1, -1, -1, -1, 0, 1, 1, 2, 2];
  var jr = [0, 1, 0, 1, 3, 6, 7, 8, 0, 1, 2, 5, 6, 10, 3, 6, 10, 0, 2, 1, 2, 0, 1, 4, 5, 0, 0, 1, 2, 6];
  var nr = [-0.225196934336318e-8, 0.140674363313486e-7, 0.233784085280560e-5, -0.331833715229001e-4, 0.107956778514318e-2, -0.271382067378863, 0.107202262490333e1, -0.853821329075382, -0.215214194340526e-4, 0.769656088222730e-3, -0.431136580433864e-2, 0.453342167309331, -0.507749535873652, -0.100475154528389e3, -0.219201924648793, -0.321087965668917e1, 0.607567815637771e3, 0.557686450685932e-3, 0.187499040029550, 0.905368030448107e-2, 0.285417173048685, 0.329924030996098e-1, 0.239897419685483, 0.482754995951394e1, -0.118035753702231e2, 0.169490044091791, -0.179967222507787e-1, 0.371810116332674e-1, -0.536288335065096e-1, 0.160697101092520e1];
  //
  var pi = p / p_star;
  var eta = h / h_star;
  var aa = pi + 0.0661;
  var bb = eta - 0.720;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * v_star;
}

function r3Backward_tps_3a(p, s) {
  var t_star = 760.0; // K
  var p_star = 100.0e6; // Pa
  var s_star = 4.4e3; // $J\cdot kg^{-1} \cdot K^{-1}$
  var ir = [-12, -12, -10, -10, -10, -10, -8, -8, -8, -8, -6, -6, -6, -5, -5, -5, -4, -4, -4, -2, -2, -1, -1, 0, 0, 0, 1, 2, 2, 3, 8, 8, 10];
  var jr = [28, 32, 4, 10, 12, 14, 5, 7, 8, 28, 2, 6, 32, 0, 14, 32, 6, 10, 36, 1, 4, 1, 6, 0, 1, 4, 0, 0, 3, 2, 0, 1, 2];
  var nr = [0.150042008263875e10, -0.159397258480424e12, 0.502181140217975e-3, -0.672057767855466e2, 0.145058545404456e4, -0.823889534888890e4, -0.154852214233853, 0.112305046746695e2, -0.297000213482822e2, 0.438565132635495e11, 0.137837838635464e-2, -0.297478527157462e1, 0.971777947349413e13, -0.571527767052398e-4, 0.288307949778420e5, -0.744428289262703e14, 0.128017324848921e2, -0.368275545889071e3, 0.664768904779177e16, 0.449359251958880e-1, -0.422897836099655e1, -0.240614376434179, -0.474341365254924e1, 0.724093999126110, 0.923874349695897, 0.399043655281015e1, 0.384066651868009e-1, -0.359344365571848e-2, -0.735196448821653, 0.188367048396131, 0.141064266818704e-3, -0.257418501496337e-2, 0.123220024851555e-2];
  //
  var pi = p / p_star;
  var sigma = s / s_star;
  var aa = pi + 0.240;
  var bb = sigma - 0.703;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * t_star;
}

function r3Backward_tps_3b(p, s) {
  var t_star = 860.0; // K
  var p_star = 100.0e6; // Pa
  var s_star = 5.3e3; // $J\cdot kg^{-1} \cdot K^{-1}$
  var ir = [-12, -12, -12, -12, -8, -8, -8, -6, -6, -6, -5, -5, -5, -5, -5, -4, -3, -3, -2, 0, 2, 3, 4, 5, 6, 8, 12, 14];
  var jr = [1, 3, 4, 7, 0, 1, 3, 0, 2, 4, 0, 1, 2, 4, 6, 12, 1, 6, 2, 0, 1, 1, 0, 24, 0, 3, 1, 2];
  var nr = [0.527111701601660, -0.401317830052742e2, 0.153020073134484e3, -0.224799398218827e4, -0.193993484669048, -0.140467557893768e1, 0.426799878114024e2, 0.752810643416743, 0.226657238616417e2, -0.622873556909932e3, -0.660823667935396, 0.841267087271658, -0.253717501764397e2, 0.485708963532948e3, 0.880531517490555e3, 0.265015592794626e7, -0.359287150025783, -0.656991567673753e3, 0.241768149185367e1, 0.856873461222588, 0.655143675313458, -0.213535213206406, 0.562974957606348e-2, -0.316955725450471e15, -0.699997000152457e-3, 0.119845803210767e-1, 0.193848122022095e-4, -0.215095749182309e-4];
  //
  var pi = p / p_star;
  var sigma = s / s_star;
  var aa = pi + 0.760;
  var bb = sigma - 0.818;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * t_star;
}

function r3Backward_vps_3a(p, s) {
  var v_star = 0.0028; // $m^3 \cdot kg^{-1}$
  var p_star = 100.0e6; // Pa
  var s_star = 4.4e3; // $J\cdot kg^{-1} \cdot K^{-1}$
  var ir = [-12, -12, -12, -10, -10, -10, -10, -8, -8, -8, -8, -6, -5, -4, -3, -3, -2, -2, -1, -1, 0, 0, 0, 1, 2, 4, 5, 6];
  var jr = [10, 12, 14, 4, 8, 10, 20, 5, 6, 14, 16, 28, 1, 5, 2, 4, 3, 8, 1, 2, 0, 1, 3, 0, 0, 2, 2, 0];
  var nr = [0.795544074093975e2, -0.238261242984590e4, 0.176813100617787e5, -0.110524727080379e-2, -0.153213833655326e2, 0.297544599376982e3, -0.350315206871242e8, 0.277513761062119, -0.523964271036888, -0.148011182995403e6, 0.160014899374266e7, 0.170802322663427e13, 0.246866996006494e-3, 0.165326084797980e1, -0.118008384666987, 0.253798642355900e1, 0.965127704669424, -0.282172420532826e2, 0.203224612353823, 0.110648186063513e1, 0.526127948451280, 0.277000018736321, 0.108153340501132e1, -0.744127885357893e-1, 0.164094443541384e-1, -0.680468275301065e-1, 0.257988576101640e-1, -0.145749861944416e-3];
  //
  var pi = p / p_star;
  var sigma = s / s_star;
  var aa = pi + 0.187;
  var bb = sigma - 0.755;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * v_star;
}

function r3Backward_vps_3b(p, s) {
  var v_star = 0.0088; // $m^3 \cdot kg^{-1}$
  var p_star = 100.0e6; // Pa
  var s_star = 5.3e3; // $J\cdot kg^{-1} \cdot K^{-1}$
  var ir = [-12, -12, -12, -12, -12, -12, -10, -10, -10, -10, -8, -5, -5, -5, -4, -4, -4, -4, -3, -2, -2, -2, -2, -2, -2, 0, 0, 0, 1, 1, 2];
  var jr = [0, 1, 2, 3, 5, 6, 0, 1, 2, 4, 0, 1, 2, 3, 0, 1, 2, 3, 1, 0, 1, 2, 3, 4, 12, 0, 1, 2, 0, 2, 2];
  var nr = [0.591599780322238e-4, -0.185465997137856e-2, 0.104190510480013e-1, 0.598647302038590e-2, -0.771391189901699, 0.172549765557036e1, -0.467076079846526e-3, 0.134533823384439e-1, -0.808094336805495e-1, 0.508139374365767, 0.128584643361683e-2, -0.163899353915435e1, 0.586938199318063e1, -0.292466667918613e1, -0.614076301499537e-2, 0.576199014049172e1, -0.121613320606788e2, 0.167637540957944e1, -0.744135838773463e1, 0.378168091437659e-1, 0.401432203027688e1, 0.160279837479185e2, 0.317848779347728e1, -0.358362310304853e1, -0.115995260446827e7, 0.199256573577909, -0.122270624794624, -0.191449143716586e2, -0.150448002905284e-1, 0.146407900162154e2, -0.327477787188230e1];
  //
  var pi = p / p_star;
  var sigma = s / s_star;
  var aa = pi + 0.298;
  var bb = sigma - 0.816;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * v_star;
}

function r3Backward_phs_3a(h, s) {
  var p_star = 99.0e6; // Pa
  var h_star = 2300.0e3; // $J \cdot kg^{-1}$
  var s_star = 4.4e3; // $J\cdot kg^{-1} \cdot K^{-1}$
  var ir = [0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 6, 7, 8, 10, 10, 14, 18, 20, 22, 22, 24, 28, 28, 32, 32];
  var jr = [0, 1, 5, 0, 3, 4, 8, 14, 6, 16, 0, 2, 3, 0, 1, 4, 5, 28, 28, 24, 1, 32, 36, 22, 28, 36, 16, 28, 36, 16, 36, 10, 28];
  var nr = [0.770889828326934e1, -0.260835009128688e2, 0.267416218930389e3, 0.172221089496844e2, -0.293542332145970e3, 0.614135601882478e3, -0.610562757725674e5, -0.651272251118219e8, 0.735919313521937e5, -0.116646505914191e11, 0.355267086434461e2, -0.596144543825955e3, -0.475842430145708e3, 0.696781965359503e2, 0.335674250377312e3, 0.250526809130882e5, 0.146997380630766e6, 0.538069315091534e20, 0.143619827291346e22, 0.364985866165994e20, -0.254741561156775e4, 0.240120197096563e28, -0.393847464679496e30, 0.147073407024852e25, -0.426391250432059e32, 0.194509340621077e39, 0.666212132114896e24, 0.706777016552858e34, 0.175563621975576e42, 0.108408607429124e29, 0.730872705175151e44, 0.159145847398870e25, 0.377121605943324e41];
  //
  var eta = h / h_star;
  var sigma = s / s_star;
  var aa = eta - 1.01;
  var bb = sigma - 0.750;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return sum * p_star;
}

function r3Backward_phs_3b(h, s) {
  var p_star = 16.6e6; // Pa
  var h_star = 2800.0e3; // $J \cdot kg^{-1}$
  var s_star = 5.3e3; // $J\cdot kg^{-1} \cdot K^{-1}$
  var ir = [-12, -12, -12, -12, -12, -10, -10, -10, -10, -8, -8, -6, -6, -6, -6, -5, -4, -4, -4, -3, -3, -3, -3, -2, -2, -1, 0, 2, 2, 5, 6, 8, 10, 14, 14];
  var jr = [2, 10, 12, 14, 20, 2, 10, 14, 18, 2, 8, 2, 6, 7, 8, 10, 4, 5, 8, 1, 3, 5, 6, 0, 1, 0, 3, 0, 1, 0, 1, 1, 1, 3, 7];
  var nr = [0.125244360717979e-12, -0.126599322553713e-1, 0.506878030140626e1, 0.317847171154202e2, -0.391041161399932e6, -0.975733406392044e-10, -0.186312419488279e2, 0.510973543414101e3, 0.373847005822362e6, 0.299804024666572e-7, 0.200544393820342e2, -0.498030487662829e-5, -0.102301806360030e2, 0.552819126990325e2, -0.206211367510878e3, -0.794012232324823e4, 0.782248472028153e1, -0.586544326902468e2, 0.355073647696481e4, -0.115303107290162e-3, -0.175092403171802e1, 0.257981687748160e3, -0.727048374179467e3, 0.121644822609198e-3, 0.393137871762692e-1, 0.704181005909296e-2, -0.829108200698110e2, -0.265178818131250, 0.137531682453991e2, -0.522394090753046e2, 0.240556298941048e4, -0.227361631268929e5, 0.890746343932567e5, -0.239234565822486e8, 0.568795808129714e10];
  //
  var eta = h / h_star;
  var sigma = s / s_star;
  var aa = eta - 0.681;
  var bb = sigma - 0.792;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }

  return p_star / sum;
}

// Backward Equations v(p,T) of subregion 3a through 3z - Supp-VPT3-2014
/*
type _VPT_DATA struct {
	v_star        float64
	p_star        float64
	t_star        float64
	N             int
	a, b, c, d, e float64
}
*/
function _VPT_DATA(arr) {
  this.v_star = arr[0];
  this.p_star = arr[1];
  this.t_star = arr[2];
  this.N = arr[3];
  this.a = arr[4];
  this.b = arr[5];
  this.c = arr[6];
  this.d = arr[7];
  this.e = arr[8];
}
function r3Backward_vpt_helper(p, t, subrgn) {
  if (typeof subrgn != "string" || subrgn.length != 1) {
    return NaN;
  }
  if (subrgn.match(/[a-z]/) == null) {
    return NaN;
  }
  var data = {
    'a': new _VPT_DATA([0.0024, 100e6, 760, 30, 0.085, 0.817, 1, 1, 1]),
    'b': new _VPT_DATA([0.0041, 100e6, 860, 32, 0.28, 0.779, 1, 1, 1]),
    'c': new _VPT_DATA([0.0022, 40e6, 690, 35, 0.259, 0.903, 1, 1, 1]),
    'd': new _VPT_DATA([0.0029, 40e6, 690, 38, 0.559, 0.939, 1, 1, 4]),
    'e': new _VPT_DATA([0.0032, 40e6, 710, 29, 0.587, 0.918, 1, 1, 1]),
    'f': new _VPT_DATA([0.0064, 40e6, 730, 42, 0.587, 0.891, 0.5, 1, 4]),
    'g': new _VPT_DATA([0.0027, 25e6, 660, 38, 0.872, 0.971, 1, 1, 4]),
    'h': new _VPT_DATA([0.0032, 25e6, 660, 29, 0.898, 0.983, 1, 1, 4]),
    'i': new _VPT_DATA([0.0041, 25e6, 660, 42, 0.91, 0.984, 0.5, 1, 4]),
    'j': new _VPT_DATA([0.0054, 25e6, 670, 29, 0.875, 0.964, 0.5, 1, 4]),
    'k': new _VPT_DATA([0.0077, 25e6, 680, 34, 0.802, 0.935, 1, 1, 1]),
    'l': new _VPT_DATA([0.0026, 24e6, 650, 43, 0.908, 0.989, 1, 1, 4]),
    'm': new _VPT_DATA([0.0028, 23e6, 650, 40, 1, 0.997, 1, 0.25, 1]),
    'n': new _VPT_DATA([0.0031, 23e6, 650, 39, 0.976, 0.997, 1, 1, 1]),
    'o': new _VPT_DATA([0.0034, 23e6, 650, 24, 0.974, 0.996, 0.5, 1, 1]),
    'p': new _VPT_DATA([0.0041, 23e6, 650, 27, 0.972, 0.997, 0.5, 1, 1]),
    'q': new _VPT_DATA([0.0022, 23e6, 650, 24, 0.848, 0.983, 1, 1, 4]),
    'r': new _VPT_DATA([0.0054, 23e6, 650, 27, 0.874, 0.982, 1, 1, 1]),
    's': new _VPT_DATA([0.0022, 21e6, 640, 29, 0.886, 0.99, 1, 1, 4]),
    't': new _VPT_DATA([0.0088, 20e6, 650, 33, 0.803, 1.02, 1, 1, 1]),
    'u': new _VPT_DATA([0.0026, 23e6, 650, 38, 0.902, 0.988, 1, 1, 1]),
    'v': new _VPT_DATA([0.0031, 23e6, 650, 39, 0.96, 0.995, 1, 1, 1]),
    'w': new _VPT_DATA([0.0039, 23e6, 650, 35, 0.959, 0.995, 1, 1, 4]),
    'x': new _VPT_DATA([0.0049, 23e6, 650, 36, 0.91, 0.988, 1, 1, 1]),
    'y': new _VPT_DATA([0.0031, 22e6, 650, 20, 0.996, 0.994, 1, 1, 4]),
    'z': new _VPT_DATA([0.0038, 22e6, 650, 23, 0.993, 0.994, 1, 1, 4]) };

  var ir = {
    'a': [-12, -12, -12, -10, -10, -10, -8, -8, -8, -6, -5, -5, -5, -4, -3, -3, -3, -3, -2, -2, -2, -1, -1, -1, 0, 0, 1, 1, 2, 2],
    'b': [-12, -12, -10, -10, -8, -6, -6, -6, -5, -5, -5, -4, -4, -4, -3, -3, -3, -3, -3, -2, -2, -2, -1, -1, 0, 0, 1, 1, 2, 3, 4, 4],
    'c': [-12, -12, -12, -10, -10, -10, -8, -8, -8, -6, -5, -5, -5, -4, -4, -3, -3, -2, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 8],
    'd': [-12, -12, -12, -12, -12, -12, -10, -10, -10, -10, -10, -10, -10, -8, -8, -8, -8, -6, -6, -5, -5, -5, -5, -4, -4, -4, -3, -3, -2, -2, -1, -1, -1, 0, 0, 1, 1, 3],
    'e': [-12, -12, -10, -10, -10, -10, -10, -8, -8, -8, -6, -5, -4, -4, -3, -3, -3, -2, -2, -2, -2, -1, 0, 0, 1, 1, 1, 2, 2],
    'f': [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 4, 5, 5, 6, 7, 7, 10, 12, 12, 12, 14, 14, 14, 14, 14, 16, 16, 18, 18, 20, 20, 20, 22, 24, 24, 28, 32],
    'g': [-12, -12, -12, -12, -12, -12, -10, -10, -10, -8, -8, -8, -8, -6, -6, -5, -5, -4, -3, -2, -2, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 1, 3, 5, 6, 8, 10, 10],
    'h': [-12, -12, -10, -10, -10, -10, -10, -10, -8, -8, -8, -8, -8, -6, -6, -6, -5, -5, -5, -4, -4, -3, -3, -2, -1, -1, 0, 1, 1],
    'i': [0, 0, 0, 1, 1, 1, 1, 2, 3, 3, 4, 4, 4, 5, 5, 5, 7, 7, 8, 8, 10, 12, 12, 12, 14, 14, 14, 14, 18, 18, 18, 18, 18, 20, 20, 22, 24, 24, 32, 32, 36, 36],
    'j': [0, 0, 0, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5, 6, 10, 12, 12, 14, 14, 14, 16, 18, 20, 20, 24, 24, 28, 28],
    'k': [-2, -2, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 5, 5, 5, 6, 6, 6, 6, 8, 10, 12],
    'l': [-12, -12, -12, -12, -12, -10, -10, -8, -8, -8, -8, -8, -8, -8, -6, -5, -5, -4, -4, -3, -3, -3, -3, -2, -2, -2, -1, -1, -1, 0, 0, 0, 0, 1, 1, 2, 4, 5, 5, 6, 10, 10, 14],
    'm': [0, 3, 8, 20, 1, 3, 4, 5, 1, 6, 2, 4, 14, 2, 5, 3, 0, 1, 1, 1, 28, 2, 16, 0, 5, 0, 3, 4, 12, 16, 1, 8, 14, 0, 2, 3, 4, 8, 14, 24],
    'n': [0, 3, 4, 6, 7, 10, 12, 14, 18, 0, 3, 5, 6, 8, 12, 0, 3, 7, 12, 2, 3, 4, 2, 4, 7, 4, 3, 5, 6, 0, 0, 3, 1, 0, 1, 0, 1, 0, 1],
    'o': [0, 0, 0, 2, 3, 4, 4, 4, 4, 4, 5, 5, 6, 7, 8, 8, 8, 10, 10, 14, 14, 20, 20, 24],
    'p': [0, 0, 0, 0, 1, 2, 3, 3, 4, 6, 7, 7, 8, 10, 12, 12, 12, 14, 14, 14, 16, 18, 20, 22, 24, 24, 36],
    'q': [-12, -12, -10, -10, -10, -10, -8, -6, -5, -5, -4, -4, -3, -2, -2, -2, -2, -1, -1, -1, 0, 1, 1, 1],
    'r': [-8, -8, -3, -3, -3, -3, -3, 0, 0, 0, 0, 3, 3, 8, 8, 8, 8, 10, 10, 10, 10, 10, 10, 10, 10, 12, 14],
    's': [-12, -12, -10, -8, -6, -5, -5, -4, -4, -3, -3, -2, -1, -1, -1, 0, 0, 0, 0, 1, 1, 3, 3, 3, 4, 4, 4, 5, 14],
    't': [0, 0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 4, 4, 7, 7, 7, 7, 7, 10, 10, 10, 10, 10, 18, 20, 22, 22, 24, 28, 32, 32, 32, 36],
    'u': [-12, -10, -10, -10, -8, -8, -8, -6, -6, -5, -5, -5, -3, -1, -1, -1, -1, 0, 0, 1, 2, 2, 3, 5, 5, 5, 6, 6, 8, 8, 10, 12, 12, 12, 14, 14, 14, 14],
    'v': [-10, -8, -6, -6, -6, -6, -6, -6, -5, -5, -5, -5, -5, -5, -4, -4, -4, -4, -3, -3, -3, -2, -2, -1, -1, 0, 0, 0, 1, 1, 3, 4, 4, 4, 5, 8, 10, 12, 14],
    'w': [-12, -12, -10, -10, -8, -8, -8, -6, -6, -6, -6, -5, -4, -4, -3, -3, -2, -2, -1, -1, -1, 0, 0, 1, 2, 2, 3, 3, 5, 5, 5, 8, 8, 10, 10],
    'x': [-8, -6, -5, -4, -4, -4, -3, -3, -1, 0, 0, 0, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 8, 8, 8, 8, 10, 12, 12, 12, 12, 14, 14, 14, 14],
    'y': [0, 0, 0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 8, 8, 10, 12],
    'z': [-8, -6, -5, -5, -4, -4, -4, -3, -3, -3, -2, -1, 0, 1, 2, 3, 3, 6, 6, 6, 6, 8, 8] };

  var jr = {
    'a': [5, 10, 12, 5, 10, 12, 5, 8, 10, 1, 1, 5, 10, 8, 0, 1, 3, 6, 0, 2, 3, 0, 1, 2, 0, 1, 0, 2, 0, 2],
    'b': [10, 12, 8, 14, 8, 5, 6, 8, 5, 8, 10, 2, 4, 5, 0, 1, 2, 3, 5, 0, 2, 5, 0, 2, 0, 1, 0, 2, 0, 2, 0, 1],
    'c': [6, 8, 10, 6, 8, 10, 5, 6, 7, 8, 1, 4, 7, 2, 8, 0, 3, 0, 4, 5, 0, 1, 2, 0, 1, 2, 0, 2, 0, 1, 3, 7, 0, 7, 1],
    'd': [4, 6, 7, 10, 12, 16, 0, 2, 4, 6, 8, 10, 14, 3, 7, 8, 10, 6, 8, 1, 2, 5, 7, 0, 1, 7, 2, 4, 0, 1, 0, 1, 5, 0, 2, 0, 6, 0],
    'e': [14, 16, 3, 6, 10, 14, 16, 7, 8, 10, 6, 6, 2, 4, 2, 6, 7, 0, 1, 3, 4, 0, 0, 1, 0, 4, 6, 0, 2],
    'f': [-3, -2, -1, 0, 1, 2, -1, 1, 2, 3, 0, 1, -5, -2, 0, -3, -8, 1, -6, -4, 1, -6, -10, -8, -4, -12, -10, -8, -6, -4, -10, -8, -12, -10, -12, -10, -6, -12, -12, -4, -12, -12],
    'g': [7, 12, 14, 18, 22, 24, 14, 20, 24, 7, 8, 10, 12, 8, 22, 7, 20, 22, 7, 3, 5, 14, 24, 2, 8, 18, 0, 1, 2, 0, 1, 3, 24, 22, 12, 3, 0, 6],
    'h': [8, 12, 4, 6, 8, 10, 14, 16, 0, 1, 6, 7, 8, 4, 6, 8, 2, 3, 4, 2, 4, 1, 2, 0, 0, 2, 0, 0, 2],
    'i': [0, 1, 10, -4, -2, -1, 0, 0, -5, 0, -3, -2, -1, -6, -1, 12, -4, -3, -6, 10, -8, -12, -6, -4, -10, -8, -4, 5, -12, -10, -8, -6, 2, -12, -10, -12, -12, -8, -10, -5, -10, -8],
    'j': [-1, 0, 1, -2, -1, 1, -1, 1, -2, -2, 2, -3, -2, 0, 3, -6, -8, -3, -10, -8, -5, -10, -12, -12, -10, -12, -6, -12, -5],
    'k': [10, 12, -5, 6, -12, -6, -2, -1, 0, 1, 2, 3, 14, -3, -2, 0, 1, 2, -8, -6, -3, -2, 0, 4, -12, -6, -3, -12, -10, -8, -5, -12, -12, -10],
    'l': [14, 16, 18, 20, 22, 14, 24, 6, 10, 12, 14, 18, 24, 36, 8, 4, 5, 7, 16, 1, 3, 18, 20, 2, 3, 10, 0, 1, 3, 0, 1, 2, 12, 0, 16, 1, 0, 0, 1, 14, 4, 12, 10],
    'm': [0, 0, 0, 2, 5, 5, 5, 5, 6, 6, 7, 8, 8, 10, 10, 12, 14, 14, 18, 20, 20, 22, 22, 24, 24, 28, 28, 28, 28, 28, 32, 32, 32, 36, 36, 36, 36, 36, 36, 36],
    'n': [-12, -12, -12, -12, -12, -12, -12, -12, -12, -10, -10, -10, -10, -10, -10, -8, -8, -8, -8, -6, -6, -6, -5, -5, -5, -4, -3, -3, -3, -2, -1, -1, 0, 1, 1, 2, 4, 5, 6],
    'o': [-12, -4, -1, -1, -10, -12, -8, -5, -4, -1, -4, -3, -8, -12, -10, -8, -4, -12, -8, -12, -8, -12, -10, -12],
    'p': [-1, 0, 1, 2, 1, -1, -3, 0, -2, -2, -5, -4, -2, -3, -12, -6, -5, -10, -8, -3, -8, -8, -10, -10, -12, -8, -12],
    'q': [10, 12, 6, 7, 8, 10, 8, 6, 2, 5, 3, 4, 3, 0, 1, 2, 4, 0, 1, 2, 0, 0, 1, 3],
    'r': [6, 14, -3, 3, 4, 5, 8, -1, 0, 1, 5, -6, -2, -12, -10, -8, -5, -12, -10, -8, -6, -5, -4, -3, -2, -12, -12],
    's': [20, 24, 22, 14, 36, 8, 16, 6, 32, 3, 8, 4, 1, 2, 3, 0, 1, 4, 28, 0, 32, 0, 1, 2, 3, 18, 24, 4, 24],
    't': [0, 1, 4, 12, 0, 10, 0, 6, 14, 3, 8, 0, 10, 3, 4, 7, 20, 36, 10, 12, 14, 16, 22, 18, 32, 22, 36, 24, 28, 22, 32, 36, 36],
    'u': [14, 10, 12, 14, 10, 12, 14, 8, 12, 4, 8, 12, 2, -1, 1, 12, 14, -3, 1, -2, 5, 10, -5, -4, 2, 3, -5, 2, -8, 8, -4, -12, -4, 4, -12, -10, -6, 6],
    'v': [-8, -12, -12, -3, 5, 6, 8, 10, 1, 2, 6, 8, 10, 14, -12, -10, -6, 10, -3, 10, 12, 2, 4, -2, 0, -2, 6, 10, -12, -10, 3, -6, 3, 10, 2, -12, -2, -3, 1],
    'w': [8, 14, -1, 8, 6, 8, 14, -4, -3, 2, 8, -10, -1, 3, -10, 3, 1, 2, -8, -4, 1, -12, 1, -1, -1, 2, -12, -5, -10, -8, -6, -12, -10, -12, -8],
    'x': [14, 10, 10, 1, 2, 14, -2, 12, 5, 0, 4, 10, -10, -1, 6, -12, 0, 8, 3, -6, -2, 1, 1, -6, -3, 1, 8, -8, -10, -8, -5, -4, -12, -10, -8, -6],
    'y': [-3, 1, 5, 8, 8, -4, -1, 4, 5, -8, 4, 8, -6, 6, -2, 1, -8, -2, -5, -8],
    'z': [3, 6, 6, 8, 5, 6, 8, -2, 5, 6, 2, -6, 3, 1, 6, -6, -2, -6, -5, -4, -1, -8, -4] };

  var nr = {
    'a': [0.110879558823853e-2, 0.572616740810616e3, -0.767051948380852e5, -0.253321069529674e-1, 0.628008049345689e4, 0.234105654131876e6, 0.216867826045856, -0.156237904341963e3, -0.269893956176613e5, -0.180407100085505e-3, 0.116732227668261e-2, 0.266987040856040e2, 0.282776617243286e5, -0.242431520029523e4, 0.435217323022733e-3, -0.122494831387441e-1, 0.179357604019989e1, 0.442729521058314e2, -0.593223489018342e-2, 0.453186261685774, 0.135825703129140e1, 0.408748415856745e-1, 0.474686397863312, 0.118646814997915e1, 0.546987265727549, 0.195266770452643, -0.502268790869663e-1, -0.369645308193377, 0.633828037528420e-2, 0.797441793901017e-1],
    'b': [-0.827670470003621e-1, 0.416887126010565e2, 0.483651982197059e-1, -0.291032084950276e5, -0.111422582236948e3, -0.202300083904014e-1, 0.294002509338515e3, 0.140244997609658e3, -0.344384158811459e3, 0.361182452612149e3, -0.140699677420738e4, -0.202023902676481e-2, 0.171346792457471e3, -0.425597804058632e1, 0.691346085000334e-5, 0.151140509678925e-2, -0.416375290166236e-1, -0.413754957011042e2, -0.506673295721637e2, -0.572212965569023e-3, 0.608817368401785e1, 0.239600660256161e2, 0.122261479925384e-1, 0.216356057692938e1, 0.398198903368642, -0.116892827834085, -0.102845919373532, -0.492676637589284, 0.655540456406790e-1, -0.240462535078530, -0.269798180310075e-1, 0.128369435967012],
    'c': [0.311967788763030e1, 0.276713458847564e5, 0.322583103403269e8, -0.342416065095363e3, -0.899732529907377e6, -0.793892049821251e8, 0.953193003217388e2, 0.229784742345072e4, 0.175336675322499e6, 0.791214365222792e7, 0.319933345844209e-4, -0.659508863555767e2, -0.833426563212851e6, 0.645734680583292e-1, -0.382031020570813e7, 0.406398848470079e-4, 0.310327498492008e2, -0.892996718483724e-3, 0.234604891591616e3, 0.377515668966951e4, 0.158646812591361e-1, 0.707906336241843, 0.126016225146570e2, 0.736143655772152, 0.676544268999101, -0.178100588189137e2, -0.156531975531713, 0.117707430048158e2, 0.840143653860447e-1, -0.186442467471949, -0.440170203949645e2, 0.123290423502494e7, -0.240650039730845e-1, -0.107077716660869e7, 0.438319858566475e-1],
    'd': [-0.452484847171645e-9, 0.315210389538801e-4, -0.214991352047545e-2, 0.508058874808345e3, -0.127123036845932e8, 0.115371133120497e13, -0.197805728776273e-15, 0.241554806033972e-10, -0.156481703640525e-5, 0.277211346836625e-2, -0.203578994462286e2, 0.144369489909053e7, -0.411254217946539e11, 0.623449786243773e-5, -0.221774281146038e2, -0.689315087933158e5, -0.195419525060713e8, 0.316373510564015e4, 0.224040754426988e7, -0.436701347922356e-5, -0.404213852833996e-3, -0.348153203414663e3, -0.385294213555289e6, 0.135203700099403e-6, 0.134648383271089e-3, 0.125031835351736e6, 0.968123678455841e-1, 0.225660517512438e3, -0.190102435341872e-3, -0.299628410819229e-1, 0.500833915372121e-2, 0.387842482998411, -0.138535367777182e4, 0.870745245971773, 0.171946252068742e1, -0.326650121426383e-1, 0.498044171727877e4, 0.551478022765087e-2],
    'e': [0.715815808404721e9, -0.114328360753449e12, 0.376531002015720e-11, -0.903983668691157e-4, 0.665695908836252e6, 0.535364174960127e10, 0.794977402335603e11, 0.922230563421437e2, -0.142586073991215e6, -0.111796381424162e7, 0.896121629640760e4, -0.669989239070491e4, 0.451242538486834e-2, -0.339731325977713e2, -0.120523111552278e1, 0.475992667717124e5, -0.266627750390341e6, -0.153314954386524e-3, 0.305638404828265, 0.123654999499486e3, -0.104390794213011e4, -0.157496516174308e-1, 0.685331118940253, 0.178373462873903e1, -0.544674124878910, 0.204529931318843e4, -0.228342359328752e5, 0.413197481515899, -0.341931835910405e2],
    'f': [-0.251756547792325e-7, 0.601307193668763e-5, -0.100615977450049e-2, 0.999969140252192, 0.214107759236486e1, -0.165175571959086e2, -0.141987303638727e-2, 0.269251915156554e1, 0.349741815858722e2, -0.300208695771783e2, -0.131546288252539e1, -0.839091277286169e1, 0.181545608337015e-9, -0.591099206478909e-3, 0.152115067087106e1, 0.252956470663225e-4, 0.100726265203786e-14, -0.149774533860650e1, -0.793940970562969e-9, -0.150290891264717e-3, 0.151205531275133e1, 0.470942606221652e-5, 0.195049710391712e-12, -0.911627886266077e-8, 0.604374640201265e-3, -0.225132933900136e-15, 0.610916973582981e-11, -0.303063908043404e-6, -0.137796070798409e-4, -0.919296736666106e-3, 0.639288223132545e-9, 0.753259479898699e-6, -0.400321478682929e-12, 0.756140294351614e-8, -0.912082054034891e-11, -0.237612381140539e-7, 0.269586010591874e-4, -0.732828135157839e-10, 0.241995578306660e-9, -0.405735532730322e-3, 0.189424143498011e-9, -0.486632965074563e-9],
    'g': [0.412209020652996e-4, -0.114987238280587e7, 0.948180885032080e10, -0.195788865718971e18, 0.496250704871300e25, -0.105549884548496e29, -0.758642165988278e12, -0.922172769596101e23, 0.725379072059348e30, -0.617718249205859e2, 0.107555033344858e5, -0.379545802336487e8, 0.228646846221831e12, -0.499741093010619e7, -0.280214310054101e31, 0.104915406769586e7, 0.613754229168619e28, 0.802056715528378e32, -0.298617819828065e8, -0.910782540134681e2, 0.135033227281565e6, -0.712949383408211e19, -0.104578785289542e37, 0.304331584444093e2, 0.593250797959445e10, -0.364174062110798e28, 0.921791403532461, -0.337693609657471, -0.724644143758508e2, -0.110480239272601, 0.536516031875059e1, -0.291441872156205e4, 0.616338176535305e40, -0.120889175861180e39, 0.818396024524612e23, 0.940781944835829e9, -0.367279669545448e5, -0.837513931798655e16],
    'h': [0.561379678887577e-1, 0.774135421587083e10, 0.111482975877938e-8, -0.143987128208183e-2, 0.193696558764920e4, -0.605971823585005e9, 0.171951568124337e14, -0.185461154985145e17, 0.387851168078010e-16, -0.395464327846105e-13, -0.170875935679023e3, -0.212010620701220e4, 0.177683337348191e8, 0.110177443629575e2, -0.234396091693313e6, -0.656174421999594e7, 0.156362212977396e-4, -0.212946257021400e1, 0.135249306374858e2, 0.177189164145813, 0.139499167345464e4, -0.703670932036388e-2, -0.152011044389648, 0.981916922991113e-4, 0.147199658618076e-2, 0.202618487025578e2, 0.899345518944240, -0.211346402240858, 0.249971752957491e2],
    'i': [0.106905684359136e1, -0.148620857922333e1, 0.259862256980408e15, -0.446352055678749e-11, -0.566620757170032e-6, -0.235302885736849e-2, -0.269226321968839, 0.922024992944392e1, 0.357633505503772e-11, -0.173942565562222e2, 0.700681785556229e-5, -0.267050351075768e-3, -0.231779669675624e1, -0.753533046979752e-12, 0.481337131452891e1, -0.223286270422356e22, -0.118746004987383e-4, 0.646412934136496e-2, -0.410588536330937e-9, 0.422739537057241e20, 0.313698180473812e-12, 0.164395334345040e-23, -0.339823323754373e-5, -0.135268639905021e-1, -0.723252514211625e-14, 0.184386437538366e-8, -0.463959533752385e-1, -0.992263100376750e14, 0.688169154439335e-16, -0.222620998452197e-10, -0.540843018624083e-7, 0.345570606200257e-2, 0.422275800304086e11, -0.126974478770487e-14, 0.927237985153679e-9, 0.612670812016489e-13, -0.722693924063497e-11, -0.383669502636822e-3, 0.374684572410204e-3, -0.931976897511086e5, -0.247690616026922e-1, 0.658110546759474e2],
    'j': [-0.111371317395540e-3, 0.100342892423685e1, 0.530615581928979e1, 0.179058760078792e-5, -0.728541958464774e-3, -0.187576133371704e2, 0.199060874071849e-2, 0.243574755377290e2, -0.177040785499444e-3, -0.259680385227130e-2, -0.198704578406823e3, 0.738627790224287e-4, -0.236264692844138e-2, -0.161023121314333e1, 0.622322971786473e4, -0.960754116701669e-8, -0.510572269720488e-10, 0.767373781404211e-2, 0.663855469485254e-14, -0.717590735526745e-9, 0.146564542926508e-4, 0.309029474277013e-11, -0.464216300971708e-15, -0.390499637961161e-13, -0.236716126781431e-9, 0.454652854268717e-11, -0.422271787482497e-2, 0.283911742354706e-10, 0.270929002720228e1],
    'k': [-0.401215699576099e9, 0.484501478318406e11, 0.394721471363678e-14, 0.372629967374147e5, -0.369794374168666e-29, -0.380436407012452e-14, 0.475361629970233e-6, -0.879148916140706e-3, 0.844317863844331, 0.122433162656600e2, -0.104529634830279e3, 0.589702771277429e3, -0.291026851164444e14, 0.170343072841850e-5, -0.277617606975748e-3, -0.344709605486686e1, 0.221333862447095e2, -0.194646110037079e3, 0.808354639772825e-15, -0.180845209145470e-10, -0.696664158132412e-5, -0.181057560300994e-2, 0.255830298579027e1, 0.328913873658481e4, -0.173270241249904e-18, -0.661876792558034e-6, -0.395688923421250e-2, 0.604203299819132e-17, -0.400879935920517e-13, 0.160751107464958e-8, 0.383719409025556e-4, -0.649565446702457e-14, -0.149095328506000e-11, 0.541449377329581e-8],
    'l': [0.260702058647537e10, -0.188277213604704e15, 0.554923870289667e19, -0.758966946387758e23, 0.413865186848908e27, -0.815038000738060e12, -0.381458260489955e33, -0.123239564600519e-1, 0.226095631437174e8, -0.495017809506720e12, 0.529482996422863e16, -0.444359478746295e23, 0.521635864527315e35, -0.487095672740742e55, -0.714430209937547e6, 0.127868634615495, -0.100752127917598e2, 0.777451437960990e7, -0.108105480796471e25, -0.357578581169659e-5, -0.212857169423484e1, 0.270706111085238e30, -0.695953622348829e33, 0.110609027472280, 0.721559163361354e2, -0.306367307532219e15, 0.265839618885530e-4, 0.253392392889754e-1, -0.214443041836579e3, 0.937846601489667, 0.223184043101700e1, 0.338401222509191e2, 0.494237237179718e21, -0.198068404154428, -0.141415349881140e31, -0.993862421613651e2, 0.125070534142731e3, -0.996473529004439e3, 0.473137909872765e5, 0.116662121219322e33, -0.315874976271533e16, -0.445703369196945e33, 0.642794932373694e33],
    'm': [0.811384363481847, -0.568199310990094e4, -0.178657198172556e11, 0.795537657613427e32, -0.814568209346872e5, -0.659774567602874e8, -0.152861148659302e11, -0.560165667510446e12, 0.458384828593949e6, -0.385754000383848e14, 0.453735800004273e8, 0.939454935735563e12, 0.266572856432938e28, -0.547578313899097e10, 0.200725701112386e15, 0.185007245563239e13, 0.185135446828337e9, -0.170451090076385e12, 0.157890366037614e15, -0.202530509748774e16, 0.368193926183570e60, 0.170215539458936e18, 0.639234909918741e42, -0.821698160721956e15, -0.795260241872306e24, 0.233415869478510e18, -0.600079934586803e23, 0.594584382273384e25, 0.189461279349492e40, -0.810093428842645e46, 0.188813911076809e22, 0.111052244098768e36, 0.291133958602503e46, -0.329421923951460e22, -0.137570282536696e26, 0.181508996303902e28, -0.346865122768353e30, -0.211961148774260e38, -0.128617899887675e49, 0.479817895699239e65],
    'n': [0.280967799943151e-38, 0.614869006573609e-30, 0.582238667048942e-27, 0.390628369238462e-22, 0.821445758255119e-20, 0.402137961842776e-14, 0.651718171878301e-12, -0.211773355803058e-7, 0.264953354380072e-2, -0.135031446451331e-31, -0.607246643970893e-23, -0.402352115234494e-18, -0.744938506925544e-16, 0.189917206526237e-12, 0.364975183508473e-5, 0.177274872361946e-25, -0.334952758812999e-18, -0.421537726098389e-8, -0.391048167929649e-1, 0.541276911564176e-13, 0.705412100773699e-11, 0.258585887897486e-8, -0.493111362030162e-10, -0.158649699894543e-5, -0.525037427886100, 0.220019901729615e-2, -0.643064132636925e-2, 0.629154149015048e2, 0.135147318617061e3, 0.240560808321713e-6, -0.890763306701305e-3, -0.440209599407714e4, -0.302807107747776e3, 0.159158748314599e4, 0.232534272709876e6, -0.792681207132600e6, -0.869871364662769e11, 0.354542769185671e12, 0.400849240129329e15],
    'o': [0.128746023979718e-34, -0.735234770382342e-11, 0.289078692149150e-2, 0.244482731907223, 0.141733492030985e-23, -0.354533853059476e-28, -0.594539202901431e-17, -0.585188401782779e-8, 0.201377325411803e-5, 0.138647388209306e1, -0.173959365084772e-4, 0.137680878349369e-2, 0.814897605805513e-14, 0.425596631351839e-25, -0.387449113787755e-17, 0.139814747930240e-12, -0.171849638951521e-2, 0.641890529513296e-21, 0.118960578072018e-10, -0.155282762571611e-17, 0.233907907347507e-7, -0.174093247766213e-12, 0.377682649089149e-8, -0.516720236575302e-10],
    'p': [-0.982825342010366e-4, 0.105145700850612e1, 0.116033094095084e3, 0.324664750281543e4, -0.123592348610137e4, -0.561403450013495e-1, 0.856677401640869e-7, 0.236313425393924e3, 0.972503292350109e-2, -0.103001994531927e1, -0.149653706199162e-8, -0.215743778861592e-4, -0.834452198291445e1, 0.586602660564988, 0.343480022104968e-25, 0.816256095947021e-5, 0.294985697916798e-2, 0.711730466276584e-16, 0.400954763806941e-9, 0.107766027032853e2, -0.409449599138182e-6, -0.729121307758902e-5, 0.677107970938909e-8, 0.602745973022975e-7, -0.382323011855257e-10, 0.179946628317437e-2, -0.345042834640005e-3],
    'q': [-0.820433843259950e5, 0.473271518461586e11, -0.805950021005413e-1, 0.328600025435980e2, -0.356617029982490e4, -0.172985781433335e10, 0.351769232729192e8, -0.775489259985144e6, 0.710346691966018e-4, 0.993499883820274e5, -0.642094171904570, -0.612842816820083e4, 0.232808472983776e3, -0.142808220416837e-4, -0.643596060678456e-2, -0.428577227475614e1, 0.225689939161918e4, 0.100355651721510e-2, 0.333491455143516, 0.109697576888873e1, 0.961917379376452, -0.838165632204598e-1, 0.247795908411492e1, -0.319114969006533e4],
    'r': [0.144165955660863e-2, -0.701438599628258e13, -0.830946716459219e-16, 0.261975135368109, 0.393097214706245e3, -0.104334030654021e5, 0.490112654154211e9, -0.147104222772069e-3, 0.103602748043408e1, 0.305308890065089e1, -0.399745276971264e7, 0.569233719593750e-11, -0.464923504407778e-1, -0.535400396512906e-17, 0.399988795693162e-12, -0.536479560201811e-6, 0.159536722411202e-1, 0.270303248860217e-14, 0.244247453858506e-7, -0.983430636716454e-5, 0.663513144224454e-1, -0.993456957845006e1, 0.546491323528491e3, -0.143365406393758e5, 0.150764974125511e6, -0.337209709340105e-9, 0.377501980025469e-8],
    's': [-0.532466612140254e23, 0.100415480000824e32, -0.191540001821367e30, 0.105618377808847e17, 0.202281884477061e59, 0.884585472596134e8, 0.166540181638363e23, -0.313563197669111e6, -0.185662327545324e54, -0.624942093918942e-1, -0.504160724132590e10, 0.187514491833092e5, 0.121399979993217e-2, 0.188317043049455e1, -0.167073503962060e4, 0.965961650599775, 0.294885696802488e1, -0.653915627346115e5, 0.604012200163444e50, -0.198339358557937, -0.175984090163501e58, 0.356314881403987e1, -0.575991255144384e3, 0.456213415338071e5, -0.109174044987829e8, 0.437796099975134e34, -0.616552611135792e46, 0.193568768917797e10, 0.950898170425042e54],
    't': [0.155287249586268e1, 0.664235115009031e1, -0.289366236727210e4, -0.385923202309848e13, -0.291002915783761e1, -0.829088246858083e12, 0.176814899675218e1, -0.534686695713469e9, 0.160464608687834e18, 0.196435366560186e6, 0.156637427541729e13, -0.178154560260006e1, -0.229746237623692e16, 0.385659001648006e8, 0.110554446790543e10, -0.677073830687349e14, -0.327910592086523e31, -0.341552040860644e51, -0.527251339709047e21, 0.245375640937055e24, -0.168776617209269e27, 0.358958955867578e29, -0.656475280339411e36, 0.355286045512301e39, 0.569021454413270e58, -0.700584546433113e48, -0.705772623326374e65, 0.166861176200148e53, -0.300475129680486e61, -0.668481295196808e51, 0.428432338620678e69, -0.444227367758304e72, -0.281396013562745e77],
    'u': [0.122088349258355e18, 0.104216468608488e10, -0.882666931564652e16, 0.259929510849499e20, 0.222612779142211e15, -0.878473585050085e18, -0.314432577551552e22, -0.216934916996285e13, 0.159079648196849e21, -0.339567617303423e3, 0.884387651337836e13, -0.843405926846418e21, 0.114178193518022e2, -0.122708229235641e-3, -0.106201671767107e3, 0.903443213959313e25, -0.693996270370852e28, 0.648916718965575e-8, 0.718957567127851e4, 0.105581745346187e-2, -0.651903203602581e15, -0.160116813274676e25, -0.510254294237837e-8, -0.152355388953402, 0.677143292290144e12, 0.276378438378930e15, 0.116862983141686e-1, -0.301426947980171e14, 0.169719813884840e-7, 0.104674840020929e27, -0.108016904560140e5, -0.990623601934295e-12, 0.536116483602738e7, 0.226145963747881e22, -0.488731565776210e-9, 0.151001548880670e-4, -0.227700464643920e5, -0.781754507698846e28],
    'v': [-0.415652812061591e-54, 0.177441742924043e-60, -0.357078668203377e-54, 0.359252213604114e-25, -0.259123736380269e2, 0.594619766193460e5, -0.624184007103158e11, 0.313080299915944e17, 0.105006446192036e-8, -0.192824336984852e-5, 0.654144373749937e6, 0.513117462865044e13, -0.697595750347391e19, -0.103977184454767e29, 0.119563135540666e-47, -0.436677034051655e-41, 0.926990036530639e-29, 0.587793105620748e21, 0.280375725094731e-17, -0.192359972440634e23, 0.742705723302738e27, -0.517429682450605e2, 0.820612048645469e7, -0.188214882341448e-8, 0.184587261114837e-1, -0.135830407782663e-5, -0.723681885626348e17, -0.223449194054124e27, -0.111526741826431e-34, 0.276032601145151e-28, 0.134856491567853e15, 0.652440293345860e-9, 0.510655119774360e17, -0.468138358908732e32, -0.760667491183279e16, -0.417247986986821e-18, 0.312545677756104e14, -0.100375333864186e15, 0.247761392329058e27],
    'w': [-0.586219133817016e-7, -0.894460355005526e11, 0.531168037519774e-30, 0.109892402329239, -0.575368389425212e-1, 0.228276853990249e5, -0.158548609655002e19, 0.329865748576503e-27, -0.634987981190669e-24, 0.615762068640611e-8, -0.961109240985747e8, -0.406274286652625e-44, -0.471103725498077e-12, 0.725937724828145, 0.187768525763682e-38, -0.103308436323771e4, -0.662552816342168e-1, 0.579514041765710e3, 0.237416732616644e-26, 0.271700235739893e-14, -0.907886213483600e2, -0.171242509570207e-36, 0.156792067854621e3, 0.923261357901470, -0.597865988422577e1, 0.321988767636389e7, -0.399441390042203e-29, 0.493429086046981e-7, 0.812036983370565e-19, -0.207610284654137e-11, -0.340821291419719e-6, 0.542000573372233e-17, -0.856711586510214e-12, 0.266170454405981e-13, 0.858133791857099e-5],
    'x': [0.377373741298151e19, -0.507100883722913e13, -0.103363225598860e16, 0.184790814320773e-5, -0.924729378390945e-3, -0.425999562292738e24, -0.462307771873973e-12, 0.107319065855767e22, 0.648662492280682e11, 0.244200600688281e1, -0.851535733484258e10, 0.169894481433592e22, 0.215780222509020e-26, -0.320850551367334, -0.382642448458610e17, -0.275386077674421e-28, -0.563199253391666e6, -0.326068646279314e21, 0.397949001553184e14, 0.100824008584757e-6, 0.162234569738433e5, -0.432355225319745e11, -0.592874245598610e12, 0.133061647281106e1, 0.157338197797544e7, 0.258189614270853e14, 0.262413209706358e25, -0.920011937431142e-1, 0.220213765905426e-2, -0.110433759109547e2, 0.847004870612087e7, -0.592910695762536e9, -0.183027173269660e-4, 0.181339603516302, -0.119228759669889e4, 0.430867658061468e7],
    'y': [-0.525597995024633e-9, 0.583441305228407e4, -0.134778968457925e17, 0.118973500934212e26, -0.159096490904708e27, -0.315839902302021e-6, 0.496212197158239e3, 0.327777227273171e19, -0.527114657850696e22, 0.210017506281863e-16, 0.705106224399834e21, -0.266713136106469e31, -0.145370512554562e-7, 0.149333917053130e28, -0.149795620287641e8, -0.381881906271100e16, 0.724660165585797e-4, -0.937808169550193e14, 0.514411468376383e10, -0.828198594040141e5],
    'z': [0.244007892290650e-10, -0.463057430331242e7, 0.728803274777712e10, 0.327776302858856e16, -0.110598170118409e10, -0.323899915729957e13, 0.923814007023245e16, 0.842250080413712e-12, 0.663221436245506e12, -0.167170186672139e15, 0.253749358701391e4, -0.819731559610523e-20, 0.328380587890663e12, -0.625004791171543e8, 0.803197957462023e21, -0.204397011338353e-10, -0.378391047055938e4, 0.972876545938620e-2, 0.154355721681459e2, -0.373962862928643e4, -0.682859011374572e11, -0.248488015614543e-3, 0.394536049497068e7] };


  var pi = p / data[subrgn].p_star;
  var theta = t / data[subrgn].t_star;
  var aa = Math.pow(pi - data[subrgn].a, data[subrgn].c);
  var bb = Math.pow(theta - data[subrgn].b, data[subrgn].d);
  var sum = 0.0;
  for (var i = 0; i < data[subrgn].N; i++) {
    sum += nr[subrgn][i] * Math.pow(aa, ir[subrgn][i]) * Math.pow(bb, jr[subrgn][i]);
  }

  if (subrgn == 'n') {
    return data[subrgn].v_star * Math.exp(sum);
  }
  return data[subrgn].v_star * Math.pow(sum, data[subrgn].e);
}

// Subregion boundary equation  - Supp-Tv(ph,ps)3-2014
function r3B3ab_hp(p) {
  var h_star = 1.0e3; // $J \cdot kg^{-1}$
  var p_star = 1.0e6; // $Pa$
  var pi = p / p_star;
  var n1 = 0.201464004206875e4;
  var n2 = 0.374696550136983e1;
  var n3 = -0.219921901054187e-1;
  var n4 = 0.875131686009950e-4;

  var pi2 = pi * pi;
  var pi3 = pi * pi2;

  return h_star * (n1 + n2 * pi + n3 * pi2 + n4 * pi3);
}

// Subregion boundary equations - Supp-VPT3-2014
function r3B3ab_tp(p) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var pi = p / p_star;
  var ir = [0, 1, 2, -1, -2];
  var nr = [0.154793642129415e4, -0.187661219490113e3, 0.213144632222113e2, -0.191887498864292e4, 0.918419702359447e3];
  //
  var sum = 0.0;
  var length = ir.length;
  var aa = Math.log(pi);
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]);
  }
  return sum * t_star;
}

function r3B3cd_tp(p) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var pi = p / p_star;
  var ir = [0, 1, 2, 3];
  var nr = [0.585276966696349e3, 0.278233532206915e1, -0.127283549295878e-1, 0.159090746562729e-3];
  //
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(pi, ir[i]);
  }
  return sum * t_star;
}

function r3B3ef_tp(p) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var pi = p / p_star;

  var theta = 3.727888004 * (pi - 22.064) + 647.096;
  return theta * t_star;
}

function r3B3gh_tp(p) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var pi = p / p_star;
  var ir = [0, 1, 2, 3, 4];
  var nr = [-0.249284240900418e5, 0.428143584791546e4, -0.269029173140130e3, 0.751608051114157e1, -0.787105249910383e-1];
  //
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(pi, ir[i]);
  }
  return sum * t_star;
}

function r3B3ij_tp(p) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var pi = p / p_star;
  var ir = [0, 1, 2, 3, 4];
  var nr = [0.584814781649163e3, -0.616179320924617, 0.260763050899562, -0.587071076864459e-2, 0.515308185433082e-4];
  //
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(pi, ir[i]);
  }
  return sum * t_star;
}

function r3B3jk_tp(p) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var pi = p / p_star;
  var ir = [0, 1, 2, 3, 4];
  var nr = [0.617229772068439e3, -0.770600270141675e1, 0.697072596851896, -0.157391839848015e-1, 0.137897492684194e-3];
  //
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(pi, ir[i]);
  }
  return sum * t_star;
}

function r3B3mn_tp(p) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var pi = p / p_star;
  var ir = [0, 1, 2, 3];
  var nr = [0.535339483742384e3, 0.761978122720128e1, -0.158365725441648, 0.192871054508108e-2];
  //
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(pi, ir[i]);
  }
  return sum * t_star;
}

function r3B3op_tp(p) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var pi = p / p_star;
  var ir = [0, 1, 2, -1, -2];
  var nr = [0.969461372400213e3, -0.332500170441278e3, 0.642859598466067e2, 0.773845935768222e3, -0.152313732937084e4];
  //
  var sum = 0.0;
  var length = ir.length;
  var aa = Math.log(pi);
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]);
  }
  return sum * t_star;
}

function r3B3qu_tp(p) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var pi = p / p_star;
  var ir = [0, 1, 2, 3];
  var nr = [0.565603648239126e3, 0.529062258221222e1, -0.102020639611016, 0.122240301070145e-2];
  //
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(pi, ir[i]);
  }
  return sum * t_star;
}

function r3B3rx_tp(p) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var pi = p / p_star;
  var ir = [0, 1, 2, 3];
  var nr = [0.584561202520006e3, -0.102961025163669e1, 0.243293362700452, -0.294905044740799e-2];
  //
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(pi, ir[i]);
  }
  return sum * t_star;
}

function r3B3uv_tp(p) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var pi = p / p_star;
  var ir = [0, 1, 2, 3];
  var nr = [0.528199646263062e3, 0.890579602135307e1, -0.222814134903755, 0.286791682263697e-2];
  //
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(pi, ir[i]);
  }
  return sum * t_star;
}

function r3B3wx_tp(p) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var pi = p / p_star;
  var ir = [0, 1, 2, -1, -2];
  var nr = [0.728052609145380e1, 0.973505869861952e2, 0.147370491183191e2, 0.329196213998375e3, 0.873371668682417e3];
  //
  var sum = 0.0;
  var length = ir.length;
  var aa = Math.log(pi);
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]);
  }
  return sum * t_star;
}

function r3SubRegionVPT(p, t) {
  var psat_643p15K = r4Sat_pt(643.15); // 21.04336732E6 Pa
  var p3cd = 19.00881189173929e6; // Pa
  var psat_264 = 21.93161551e6;
  var psat_385 = 21.90096265e6;
  var rgn = "";

  if (p > 40.0e6) {
    if (t <= r3B3ab_tp(p)) {
      rgn = 'a';
    } else {
      rgn = 'b';
    }
  } else if (p > 25.0e6) {
    if (t <= r3B3cd_tp(p)) {
      rgn = 'c';
    } else if (t <= r3B3ab_tp(p)) {
      rgn = 'd';
    } else if (t <= r3B3ef_tp(p)) {
      rgn = 'e';
    } else {
      rgn = 'f';
    }
  } else if (p > 23.5e6) {
    if (t <= r3B3cd_tp(p)) {
      rgn = 'c';
    } else if (t <= r3B3gh_tp(p)) {
      rgn = 'g';
    } else if (t <= r3B3ef_tp(p)) {
      rgn = 'h';
    } else if (t <= r3B3ij_tp(p)) {
      rgn = 'i';
    } else if (t <= r3B3jk_tp(p)) {
      rgn = 'j';
    } else {
      rgn = 'k';
    }
  } else if (p > 23.0e6) {
    if (t <= r3B3cd_tp(p)) {
      rgn = 'c';
    } else if (t <= r3B3gh_tp(p)) {
      rgn = 'l';
    } else if (t <= r3B3ef_tp(p)) {
      rgn = 'h';
    } else if (t <= r3B3ij_tp(p)) {
      rgn = 'i';
    } else if (t <= r3B3jk_tp(p)) {
      rgn = 'j';
    } else {
      rgn = 'k';
    }
  } else if (p > 22.5e6) {
    if (t <= r3B3cd_tp(p)) {
      rgn = 'c';
    } else if (t <= r3B3gh_tp(p)) {
      rgn = 'l';
    } else if (t <= r3B3mn_tp(p)) {
      rgn = 'm';
    } else if (t <= r3B3ef_tp(p)) {
      rgn = 'n';
    } else if (t <= r3B3op_tp(p)) {
      rgn = 'o';
    } else if (t <= r3B3ij_tp(p)) {
      rgn = 'p';
    } else if (t <= r3B3jk_tp(p)) {
      rgn = 'j';
    } else {
      rgn = 'k';
    }
  } else if (p > 22.11e6) {
    if (t <= r3B3cd_tp(p)) {
      rgn = 'c';
    } else if (t <= r3B3qu_tp(p)) {
      rgn = 'q';
    } else if (t <= r3B3uv_tp(p)) {
      rgn = 'u';
    } else if (t <= r3B3ef_tp(p)) {
      rgn = 'v';
    } else if (t <= r3B3wx_tp(p)) {
      rgn = 'w';
    } else if (t <= r3B3rx_tp(p)) {
      rgn = 'x';
    } else if (t <= r3B3jk_tp(p)) {
      rgn = 'r';
    } else {
      rgn = 'k';
    }
  } else if (p > 22.064e6) {
    if (t <= r3B3cd_tp(p)) {
      rgn = 'c';
    } else if (t <= r3B3qu_tp(p)) {
      rgn = 'q';
    } else if (t <= r3B3uv_tp(p)) {
      rgn = 'u';
    } else if (t <= r3B3ef_tp(p)) {
      rgn = 'y';
    } else if (t <= r3B3wx_tp(p)) {
      rgn = 'z';
    } else if (t <= r3B3rx_tp(p)) {
      rgn = 'x';
    } else if (t <= r3B3jk_tp(p)) {
      rgn = 'r';
    } else {
      rgn = 'k';
    }
  } else if (p > psat_264) {
    if (t <= r3B3cd_tp(p)) {
      rgn = 'c';
    } else if (t <= r3B3qu_tp(p)) {
      rgn = 'q';
    } else if (t <= r3B3uv_tp(p)) {
      rgn = 'u';
    } else if (t <= r4Sat_tp(p)) {
      rgn = 'y';
    } else if (t <= r3B3wx_tp(p)) {
      rgn = 'z';
    } else if (t <= r3B3rx_tp(p)) {
      rgn = 'x';
    } else if (t <= r3B3jk_tp(p)) {
      rgn = 'r';
    } else {
      rgn = 'k';
    }
  } else if (p > psat_385) {
    if (t <= r3B3cd_tp(p)) {
      rgn = 'c';
    } else if (t <= r3B3qu_tp(p)) {
      rgn = 'q';
    } else if (t <= r4Sat_tp(p)) {
      rgn = 'u';
    } else if (t <= r3B3wx_tp(p)) {
      rgn = 'z';
    } else if (t <= r3B3rx_tp(p)) {
      rgn = 'x';
    } else if (t <= r3B3jk_tp(p)) {
      rgn = 'r';
    } else {
      rgn = 'k';
    }
  } else if (p > psat_643p15K) {
    if (t <= r3B3cd_tp(p)) {
      rgn = 'c';
    } else if (t <= r3B3qu_tp(p)) {
      rgn = 'q';
    } else if (t <= r4Sat_tp(p)) {
      rgn = 'u';
    } else if (t <= r3B3rx_tp(p)) {
      rgn = 'x';
    } else if (t <= r3B3jk_tp(p)) {
      rgn = 'r';
    } else if (t > r3B3jk_tp(p)) {
      rgn = 'k';
    }
  } else if (p > 20.5e6) {
    if (t <= r3B3cd_tp(p)) {
      rgn = 'c';
    } else if (t <= r4Sat_tp(p)) {
      rgn = 's';
    } else if (t <= r3B3jk_tp(p)) {
      rgn = 'r';
    } else {
      rgn = 'k';
    }
  } else if (p > p3cd) {
    if (t <= r3B3cd_tp(p)) {
      rgn = 'c';
    } else if (t <= r4Sat_tp(p)) {
      rgn = 's';
    } else {
      rgn = 't';
    }
  } else {
    if (t <= r4Sat_tp(p)) {
      rgn = 'c';
    } else {
      rgn = 't';
    }
  }
  return rgn;
}

// r3BackwardSatLiquid_vt - Backward equation to calculate specific volume by tempeturature of the saturated liquid.
function r3BackwardSatLiquid_vt(t) {
  var p = r4Sat_pt(t);
  var psat_643 = 21.04336732e6;
  var p3cd = 19.00881189173929e6;
  var psat_264 = 21.93161551e6;

  var subrgn = "";

  if (p > psat_264) {
    subrgn = 'y';
  } else if (p > psat_643) {
    subrgn = 'u';
  } else if (p > p3cd) {
    subrgn = 's';
  } else {
    subrgn = 'c';
  }
  return r3Backward_vpt_helper(p, t, subrgn);
}

// r3BackwardSatVapor_vt - Backward equation to calculate specific volume by tempeturature of the saturated vapor.
function r3BackwardSatVapor_vt(t) {
  var p = r4Sat_pt(t);
  var psat_643 = 21.04336732e6;
  var psat_385 = 21.90096265e6;
  var subrgn = "";

  if (p > psat_385) {
    subrgn = 'z';
  } else if (p > psat_643) {
    subrgn = 'x';
  } else if (p > 20.5e6) {
    subrgn = 'r';
  } else {
    subrgn = 't';
  }
  var res = r3Backward_vpt_helper(p, t, subrgn);
  return res;
}

// Basic equation of r3

function r3Phi(delta, tau) {
  var ir = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 8, 9, 9, 10, 10, 11];
  var jr = [0, 0, 1, 2, 7, 10, 12, 23, 2, 6, 15, 17, 0, 2, 6, 7, 22, 26, 0, 2, 4, 16, 26, 0, 2, 4, 26, 1, 3, 26, 0, 2, 26, 2, 26, 2, 26, 0, 1, 26];
  var nr = [0.10658070028513e1, -0.15732845290239e2, 0.20944396974307e2, -0.76867707878716e1, 0.26185947787954e1, -0.28080781148620e1, 0.12053369696517e1, -0.84566812812502e-2, -0.12654315477714e1, -0.11524407806681e1, 0.88521043984318, -0.64207765181607, 0.38493460186671, -0.85214708824206, 0.48972281541877e1, -0.30502617256965e1, 0.39420536879154e-1, 0.12558408424308, -0.27999329698710, 0.13899799569460e1, -0.20189915023570e1, -0.82147637173963e-2, -0.47596035734923, 0.43984074473500e-1, -0.44476435428739, 0.90572070719733, 0.70522450087967, 0.10770512626332, -0.32913623258954, -0.50871062041158, -0.22175400873096e-1, 0.94260751665092e-1, 0.16436278447961, -0.13503372241348e-1, -0.14834345352472e-1, 0.57922953628084e-3, 0.32308904703711e-2, 0.80964802996215e-4, -0.16557679795037e-3, -0.44923899061815e-4];
  //
  var res = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  res[0] = nr[0] * Math.log(delta); // f
  res[1] = nr[0] / delta; // fd
  res[2] = 0.0; // ft
  res[3] = -nr[0] / delta / delta; //fdd
  res[4] = 0.0; // ftt
  res[5] = 0.0; // fdt
  var length = ir.length;
  for (var i = 1; i < length; i++) {
    var cc = nr[i] * Math.pow(delta, ir[i]) * Math.pow(tau, jr[i]);
    res[0] += cc; //f
    res[1] += ir[i] * cc / delta; //fd
    res[2] += jr[i] * cc / tau; //ft
    res[3] += ir[i] * (ir[i] - 1.0) * cc / delta / delta; // fdd
    res[4] += jr[i] * (jr[i] - 1.0) * cc / tau / tau; //ftt
    res[5] += ir[i] * jr[i] * cc / delta / tau; //fdt
  }
  return res;
}


// r4
function r4(t, x) {
  var p = r4Sat_pt(t);
  var w = new Water();
  if (x > 0.0 && x < 1.0) {
    var prop1 = null;
    var prop2 = null;
    if (t <= iapws_t13) {
      prop1 = r1(p, t);
      prop2 = r2(p, t);
    } else {
      prop1 = r3(1.0 / r3SatLiquid_vt(t), t);
      prop2 = r3(1.0 / r3SatVapor_vt(t), t);
    }
    if (prop1 == null || prop2 == null) {
      return null;
    }

    w.rgn = 4;
    w.p = p;
    w.t = t;
    w.v = (1.0 - x) * prop1.v + x * prop2.v;
    w.u = (1.0 - x) * prop1.u + x * prop2.u;
    w.h = (1.0 - x) * prop1.h + x * prop2.h;
    w.s = (1.0 - x) * prop1.s + x * prop2.s;
    w.cp = (1.0 - x) * prop1.cp + x * prop2.cp;
    w.cv = (1.0 - x) * prop1.cv + x * prop2.cv;
    w.w = NaN;
    w.x = x;
  } else {
    var prop = null;
    if (x <= 0.0) {
      x = 0.0;
      if (t <= iapws_t13) {
        prop = r1(p, t);
      } else {
        prop = r3(1.0 / r3SatLiquid_vt(t), t);
      }
    } else {
      x = 1.0;
      if (t <= iapws_t13) {
        prop = r2(p, t);
      } else {
        prop = r3(1.0 / r3SatVapor_vt(t), t);
      }
    }
    if (prop == null) {
      return null;
    }

    w.rgn = 4;
    w.p = p;
    w.t = t;
    w.v = prop.v;
    w.u = prop.u;
    w.h = prop.h;
    w.s = prop.s;
    w.cp = prop.cp;
    w.cv = prop.cv;
    w.w = prop.w;
    w.x = x;
  }
  return w;
}

function r4_ths(h, s) {
  var tmin, tmax;
  tmin = iapws_tmin;
  if (s <= iapws_sc) {
    tmax = r4Sat_ts(s, false);
  } else {
    tmax = r4Sat_ts(s, true);
  }
  var f = function f(t) {
    var wl = r4(t, 0.0);
    var wv = r4(t, 1.0);
    if (wl == null || wv == null) {
      return Infinity;
    }
    var sl = wl.s;
    var sv = wv.s;
    var x = 0.0;
    if (sl == sv) {
      x = 1.0;
    } else {
      x = (s - sl) / (sv - sl);
    }
    var w = r4(t, x);
    if (w == null) {
      return Infinity;
    } else {
      return w.h - h;
    }
  };
  var res = fzero(f, tmin, tmax, tolerance);
  return res;
}

function r4Sat_ts(s, vapor /*bool*/) {
  var xa = iapws_tmin;
  var xb = iapws_tc;
  var x = 0.0;
  if (vapor) {
    x = 1.0;
  } else {
    x = 0.0;
  }
  var f = function f(t) {
    var w = r4(t, x);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };
  var res = fzero(f, xa, xb, tolerance);
  return res;
}

// r4Sat_pt - Saturation Pressure Equation(Basic Equation)
// $ \frac{p_s}{p^*} = \left[ \frac{2C}{-B+(B^2-4AC)^{1/2}} \right]^4 $
function r4Sat_pt(t) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var nr = [0.0, 0.11670521452767e+04, -0.72421316703206e+06, -0.17073846940092e+02, 0.12020824702470e+05, -0.32325550322333e+07, 0.14915108613530e+02, -0.48232657361591e+04, 0.40511340542057e+06, -0.23855557567849e+00, 0.65017534844798e+03];

  var tmp = t / t_star;
  var theta = tmp + nr[9] / (tmp - nr[10]);
  var sq_theta = theta * theta;
  var A = sq_theta + nr[1] * theta + nr[2];
  var B = nr[3] * sq_theta + nr[4] * theta + nr[5];
  var C = nr[6] * sq_theta + nr[7] * theta + nr[8];

  tmp = 2.0 * C / (Math.sqrt(B * B - 4.0 * A * C) - B);
  var tmp2 = tmp * tmp; // tmp^2
  tmp2 *= tmp2; // tmp^4
  return tmp2 * p_star;
}

function r4Sat_tp(p) {
  var t0 = r4BackwardSat_tp(p);
  var xa = Math.max(iapws_tmin, 0.999 * t0);
  var xb = Math.min(iapws_tc, 1.001 * t0);
  var f = function f(t) {
    return r4Sat_pt(t) - p;
  };

  var res = fzero(f, xa, xb, tolerance);
  return res;
}

function r4BackwardSat_tp(p) {
  var t_star = 1.0;
  var p_star = 1.0e6;
  var nr = [0.0, 0.11670521452767e+04, -0.72421316703206e+06, -0.17073846940092e+02, 0.12020824702470e+05, -0.32325550322333e+07, 0.14915108613530e+02, -0.48232657361591e+04, 0.40511340542057e+06, -0.23855557567849e+00, 0.65017534844798e+03];

  var tmp = p / p_star;
  var sq_beta = Math.sqrt(tmp);
  var beta = Math.sqrt(sq_beta);
  var E = sq_beta + nr[3] * beta + nr[6];
  var F = nr[1] * sq_beta + nr[4] * beta + nr[7];
  var G = nr[2] * sq_beta + nr[5] * beta + nr[8];
  var D = 2.0 * G / (-F - Math.sqrt(F * F - 4.0 * E * G));

  tmp = nr[10] + D;
  return (tmp - Math.sqrt(tmp * tmp - 4.0 * (nr[9] + nr[10] * D))) / 2.0 * t_star;
}

function r4BackwardSat_ths(h, s) {
  var t_star = 550.0;
  var h_star = 2800.0e3;
  var s_star = 9.2e3;
  var ir = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 8, 10, 10, 12, 14, 14, 16, 16, 18, 18, 18, 20, 28];
  var jr = [0, 3, 12, 0, 1, 2, 5, 0, 5, 8, 0, 2, 3, 4, 0, 1, 1, 2, 4, 16, 6, 8, 22, 1, 20, 36, 24, 1, 28, 12, 32, 14, 22, 36, 24, 36];
  var nr = [0.179882673606601, -0.267507455199603, 0.116276722612600e1, 0.147545428713616, -0.512871635973248, 0.421333567697984, 0.563749522189870, 0.429274443819153, -0.335704552142140e1, 0.108890916499278e2, -0.248483390456012, 0.304153221906390, -0.494819763939905, 0.107551674933261e1, 0.733888415457688e-1, 0.140170545411085e-1, -0.106110975998808, 0.168324361811875e-1, 0.125028363714877e1, 0.101316840309509e4, -0.151791558000712e1, 0.524277865990866e2, 0.230495545563912e5, 0.249459806365456e-1, 0.210796467412137e7, 0.366836848613065e9, -0.144814105365163e9, -0.179276373003590e-2, 0.489955602100459e10, 0.471262212070518e3, -0.829294390198652e11, -0.171545662263191e4, 0.355777682973575e7, 0.586062760258436e12, -0.129887635078195e8, 0.317247449371057e11];
  //
  var eta = h / h_star;
  var sigma = s / s_star;
  var aa = eta - 0.119;
  var bb = sigma - 1.07;
  var sum = 0.0;
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    sum += nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
  }
  return sum * t_star;
}
function r4BackwardSat_phs(h, s) {
  var t = r4BackwardSat_ths(h, s);
  return r4Sat_pt(t);
}

function r4Backward_xhs(h, s) {
  var t = r4BackwardSat_ths(h, s);
  var p = r4Sat_pt(t);

  var h_l = r1(p, t).h;
  var h_v = r2(p, t).h;

  return (h - h_l) / (h_v - h_l); // h_l != h_v
}


// r5
function r5(p, t) {
  var p_star = 1.0e6;
  var t_star = 1000.0;
  var pi = p / p_star;
  var tau = t_star / t;
  var gma = r5Gamma(pi, tau);
  var w = new Water();

  w.rgn = 5;
  w.p = p;
  w.t = t;
  w.v = iapws_R * t_star / p_star / tau * gma[1];
  w.u = iapws_R * t_star * (gma[2] - pi / tau * gma[1]);
  w.h = iapws_R * t_star * gma[2];
  w.s = iapws_R * (tau * gma[2] - gma[0]);
  w.cp = -iapws_R * tau * tau * gma[4];
  var tmp = gma[1] - tau * gma[5];
  var tmp2 = tmp * tmp;
  w.cv = iapws_R * (tmp2 / gma[3] - tau * tau * gma[4]);
  w.w = gma[1] * Math.sqrt(iapws_R * t_star / (tmp2 / tau / gma[4] - tau * gma[3]));
  w.x = NaN;

  return w;
}

function r5_tph(p, h) {
  var xa = iapws_t25;
  var xb = iapws_tmax;
  var f = function f(t) {
    var w = r5(p, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.h - h;
    }
  };

  var res = fzero(f, xa, xb, tolerance);
  return res;
}

function r5_tps(p, s) {
  var xa = iapws_t25;
  var xb = iapws_tmax;
  var f = function f(t) {
    var w = r5(p, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };

  var res = fzero(f, xa, xb, tolerance);
  return res;
}

function r5_pts(t, s) {
  var xa = iapws_pmin;
  var xb = iapws_pmax5;
  var f = function f(p) {
    var w = r5(p, t);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };

  var res = fzero(f, xa, xb, tolerancem);
  return res;
}

function r5_phs(h, s) {
  var xa, xb;
  if (s <= r5(iapws_pmax5, iapws_tmax).s) {
    xa = r2_pts(iapws_t25, s);
    xb = iapws_pmax5;
  } else if (s < r2(iapws_pmin, iapws_t25).s) {
    xa = r2_pts(iapws_t25, s);
    xb = r5_pts(iapws_tmax, s);
  } else {
    xa = iapws_pmin;
    xb = r5_pts(iapws_tmax, s);
  }

  var f = function f(p) {
    var tx = r5_tph(p, h);
    var w = r5(p, tx);
    if (w == null) {
      return Infinity;
    } else {
      return w.s - s;
    }
  };

  var res = fzero(f, xa, xb, tolerancem);
  return res;
}

function r5_ths(h, s) {
  var p = r5_phs(h, s);
  return r5_tph(p, h);
}

// Basic equations of r5

function r5Gamma(pi, tau) {
  var gma1 = r5Gamma_o(pi, tau);
  var gma2 = r5Gamma_r(pi, tau);
  for (var i = 0; i < 6; i++) {
    gma1[i] += gma2[i];
  }

  return gma1;
}

function r5Gamma_o(pi, tau) {
  var aa = pi;
  var bb = tau;
  var jr = [0, 1, -3, -2, -1, 2];
  var nr = [-0.13179983674201e+02, 0.68540841634434e+01, -0.24805148933466e-01, 0.36901534980333e+00, -0.31161318213925e+01, -0.32961626538917e+00];
  //
  var res = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  res[0] = Math.log(aa); // g
  res[1] = 1.0 / aa; // gp
  res[2] = 0.0; // gt
  res[3] = -1.0 / aa / aa; //gpp
  res[4] = 0.0; // gtt
  res[5] = 0.0; // gpt
  var length = jr.length;
  for (var i = 0; i < length; i++) {
    var cc = nr[i] * Math.pow(bb, jr[i]);
    res[0] += cc; //g
    res[2] += jr[i] * cc / bb; //gt
    res[4] += jr[i] * (jr[i] - 1.0) * cc / bb / bb; //gtt
  }
  return res;
}

function r5Gamma_r(pi, tau) {
  var aa = pi;
  var bb = tau;
  var ir = [1, 1, 1, 2, 2, 3];
  var jr = [1, 2, 3, 3, 9, 7];
  var nr = [0.15736404855259e-02, 0.90153761673944e-03, -0.50270077677648e-02, 0.22440037409485e-05, -0.41163275453471e-05, 0.37919454822955e-07];
  //
  var res = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  var length = ir.length;
  for (var i = 0; i < length; i++) {
    var cc = nr[i] * Math.pow(aa, ir[i]) * Math.pow(bb, jr[i]);
    res[0] += cc; //g
    res[1] += ir[i] * cc / aa; //gp
    res[2] += jr[i] * cc / bb; //gt
    res[3] += ir[i] * (ir[i] - 1.0) * cc / aa / aa; //gpp
    res[4] += jr[i] * (jr[i] - 1.0) * cc / bb / bb; //gtt
    res[5] += ir[i] * jr[i] * cc / aa / bb; //gpt
  }

  return res;
}


/// Bisection
//
function bisection(f, xa, xb, tol) {
  var ya = f(xa);
  var yb = f(xb);
  var xm, ym, res;

  if (Math.abs(ya) < tol) {
    res = xa;
    return res;
  } else if (Math.abs(yb) < tol) {
    res = xb;
    return res;
  } else if (ya < 0.0 && yb < 0.0 || ya > 0.0 && yb > 0.0) {
    if (Math.abs(ya) < Math.abs(yb)) {
      res = xa;
    } else {
      res = xb;
    }
    return res;
  }
  for (;;) {
    xm = (xa + xb) / 2.0;
    ym = f(xm);
    if (Math.abs(ym) < tol || Math.abs((xb - xa) / xa) < tol) {
      res = xm;
      return res;
    }

    if (ya < 0.0 && ym < 0.0 || ya > 0.0 && ym > 0.0) {
      xa = xm;
      ya = ym;
    } else {
      xb = xm;
      yb = ym;
    }
  }
}

/// Newton
//
function newton(f, df, x0, tol) {
  var x1, y0, dy0;
  var res;

  for (;;) {
    y0 = f(x0);
    if (Math.abs(y0) < tol) {
      res = x0;
      return res;
    }
    dy0 = df(x0);
    /*		//dy == 0
                  		if (Math.abs(dy0) < Math.MIN_VALUE) {
                  			res = x0;
                  			throw new Error("Newton:Does not converge");
                  			return res;
                  		}
                  */
    x1 = x0 - y0 / dy0;
    var eps = Math.abs((x1 - x0) / x0);
    if (eps < tol) {
      res = x1;
      return res;
    }
    x0 = x1;
  }
}

/// Secant
//
function secant(f, x0, x1, tol) {
  var y0, y1, x2;
  var res;

  for (var i = 0;; i++) {
    y0 = f(x0);
    if (Math.abs(y0) < tol) {
      res = x0;
      return res;
    }
    y1 = f(x1);
    /*		// y1 == y0
                		if (Math.abs(y1 - y0) < Number.MIN_VALUE) {
                			res = (x0 + x1) / 2.0;
                			throw new Error("Secant:Does not converge");
                			return res;
                		}
                */
    x2 = x1 - y1 * (x1 - x0) / (y1 - y0);
    if (Math.abs((x2 - x1) / x1) < tol) {
      res = x2;
      return res;
    }
    x0 = x1;
    x1 = x2;
  }
}

/// Brent
// Reference: Brent, R. P. (1973), "Chapter 4: An Algorithm with Guaranteed Convergence for Finding a Zero of a functiontion", Algorithms for Minimization without Derivatives, Englewood Cliffs, NJ: Prentice-Hall, ISBN 0-13-022335-2
function brent(f /*Zerofunction*/, xa /*float64*/, xb /*float64*/, tol /*float64*/) {
  var res;

  var a = xa;
  var b = xb;
  var fa = f(a);
  var fb = f(b);

  var c = a;
  var fc = fa;

  var d = b - a;
  var e = d;

  var tol_act, m, p, q, r, s;

  for (;;) {
    if (Math.abs(fc) < Math.abs(fb)) {
      a = b;
      b = c;
      c = a;
      fa = fb;
      fb = fc;
      fc = fa;
    }

    tol_act = 2.0 * Number.MIN_VALUE * Math.abs(b) + tol;
    m = (c - b) / 2.0;
    if (Math.abs(m) <= tol_act || fb == 0.0) {
      res = b;
      return res;
    }

    if (Math.abs(e) < tol_act || Math.abs(fa) <= Math.abs(fb)) {
      d = m;
      e = m;
    } else {
      s = fb / fa;

      if (a == c) {
        p = 2.0 * m * s;
        q = 1.0 - s;
      } else {
        q = fa / fc;
        r = fb / fc;
        p = s * (2.0 * m * q * (q - r) - (b - a) * (r - 1.0));
        q = (q - 1.0) * (r - 1.0) * (s - 1.0);
      }

      if (p > 0.0) {
        q = -q;
      } else {
        p = -p;
      }

      s = e;
      e = d;

      if (2.0 * p < 3.0 * m * q - Math.abs(tol_act * q) && p < Math.abs(0.5 * s * q)) {
        d = p / q;
      } else {
        d = m;
        e = m;
      }
    }

    a = b;
    fa = fb;

    if (Math.abs(d) > tol_act) {
      b += d;
    } else {
      if (m > 0) {
        b += tol_act;
      } else {
        b -= tol_act;
      }
    }

    fb = f(b);

    if (fb > 0 && fc > 0 || fb < 0 && fc < 0) {
      c = a;
      fc = fa;
      d = b - a;
      e = d;
    }
  } // for
} // function

/** fzero - 求形如 f(x)=0 方程的根
 * @param f - function，需要求根的方程 f(x)，形式为接受一个number型参数，并返回一个number型值。
 * @param xa - number，根区间[xa, xb]端点
 * @param xb - number，根区间[xa, xb]端点
 * @param tol - number，容差
 * @param x0 - number，初始值[可选]
 * @param df - function，f(x)的一阶导函数[可选]
 * @return 计算出的根
 */
function fzero(f, xa, xb, tol) {var x0 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;var df = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  if (typeof xa != "number" || typeof xb != "number" || typeof tol != "number") {
    throw new Error("Please check the arguments in fzero.");
  }
  var y0, x1, y1;
  var res;

  if (xa > xb) {
    var tmp = xa;
    xa = xb;
    xb = tmp;
  }

  var ya = f(xa);
  if (Math.abs(ya) < tol) {
    res = xa;
    return res;
  }

  var yb = f(xb);
  if (Math.abs(yb) < tol) {
    res = xb;
    return res;
  }
  // If ya and yb have opposite sign, we can use brent method
  if (ya < 0.0 && yb > 0.0 || ya > 0.0 && yb < 0.0) {
    return brent(f, xa, xb, tol);
  }

  // Now we shoud use the newton method or secant method.
  // So we have to get the initial value of x0 (and x1) in necessary.
  if (x0 == null || typeof x0 != "number") {
    var dh = 1.0e-1 * (xb - xa);
    x0 = xa;
    y0 = f(x0);
    x1 = x0 + dh;
    y1 = f(x1);
    while (x1 < xb) {
      if (Math.abs(y0) > Math.abs(y1)) {
        x0 = x1;
        y0 = y1;
      }
      x1 += dh;
      y1 = f(x1);
    }
    if (Math.abs(y0) > Math.abs(yb)) {
      x0 = xb;
    }
  }

  // Newton
  if (df != null) {
    return newton(f, df, x0, tol);
  } else {
    var _dh = 1.0e-4 * (xb - xa);
    if (x0 - _dh < xa) {
      x1 = x0 + _dh;
    } else if (x0 + _dh > xb) {
      x1 = x0 - _dh;
    } else {
      var m = x0 - _dh;
      var p = x0 + _dh;
      if (Math.abs(f(m)) < Math.abs(f(p))) {
        x1 = m;
      } else {
        x1 = p;
      }
    }
    return secant(f, x0, x1, tol);
  }
}


/* Test */
function jif97_test1() {
  console.log("Test: p-h~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  var pp,tt,eps = 0.0;
  for (var p = 1; p <= 100.0; p += 1) {
    var t_max = 2000.0;
    if (p > 50.0) {
      t_max = 800.0;
    }
    for (var t = 10.0; t <= t_max; t += 10) {
      var w = props("p", p, "t", t);
      if (w == null) {
        throw new Error("Check input number~~~");
      }
      var h = w.h / 1000.0;
      var w1 = props("p", p, "h", h);
      if (w1 == null) {
        console.log("error: ", p, t, h);
        //	throw new Error("Check input number~~~ again");
        continue;
      }
      var p1 = w1.p / 1.0E6;
      var t1 = w1.t - 273.15;
      var e1 = Math.abs((p1 - p) / p);
      var e2 = Math.abs((t1 - t) / t);
      var e = Math.max(e1, e2);
      if (e > eps) {
        eps = e;
        pp = p;
        tt = t;
      }
    }
  }
  console.log("max:", pp, tt, eps);
}

function jif97_test2() {
  console.log("Test: p-s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  var pp,tt,eps = 0.0;
  for (var p = 1; p <= 100.0; p += 1) {
    var t_max = 2000.0;
    if (p > 50.0) {
      t_max = 800.0;
    }
    for (var t = 10.0; t <= t_max; t += 10) {
      var w = props("p", p, "t", t);
      if (w == null) {
        throw new Error("Check input number~~~");
      }
      var s = w.s / 1000.0;
      var w1 = props("p", p, "s", s);
      if (w1 == null) {
        console.log("error: ", p, t, s);
        //	throw new Error("Check input number~~~ again");
        continue;
      }
      var p1 = w1.p / 1.0E6;
      var t1 = w1.t - 273.15;
      var e1 = Math.abs((p1 - p) / p);
      var e2 = Math.abs((t1 - t) / t);
      var e = Math.max(e1, e2);
      if (e > eps) {
        eps = e;
        pp = p;
        tt = t;
      }
    }
  }
  console.log("max:", pp, tt, eps);
}

function jif97_test3() {
  console.log("Test: h-s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  var pp,tt,eps = 0.0;
  for (var p = 1; p <= 100.0; p += 1) {
    var t_max = 2000.0;
    if (p > 50.0) {
      t_max = 800.0;
    }
    for (var t = 0.0; t <= t_max; t += 10) {
      var w = props("p", p, "t", t);
      if (w == null) {
        throw new Error("Check input number~~~");
      }
      var h = w.h / 1000.0;
      var s = w.s / 1000.0;
      var w1 = props("h", h, "s", s);
      if (w1 == null) {
        console.log("error: ", p, t, h, s);
        //	throw new Error("Check input number~~~ again");
        continue;
      }
      var p1 = w1.p / 1.0E6;
      var T1 = w1.t;
      var T = t + 273.15;
      var e1 = Math.abs((p1 - p) / p);
      var e2 = Math.abs((T1 - T) / T);
      var e = Math.max(e1, e2);
      if (e > eps) {
        eps = e;
        pp = p;
        tt = t;
      }
      console.log(p, t, e);
    }
  }
  console.log("max:", pp, tt, eps);
}

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** D:/GitProject/MiniProgram/EnergyClue/pages.json ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map