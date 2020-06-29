/*!
 * FrontEnd.js v1.0.0
 * (c) 2018-2020 Lei Qian
 * Released under the MIT License.
 */
var FrontEnd = (function (exports) {
  'use strict';

  var toLowerCase = function (s) { return String(s || '').toLowerCase(); };
  var toUpperCase = function (s) { return String(s || '').toUpperCase(); };
  var padZero = function (num) { return (num.toString().length < 2 ? ("0" + num) : num); };
  // 2017-9-10 10:10 => 1505009400000
  var parseDateStr2Timestamp = function (datestr) {
    if ( datestr === void 0 ) datestr='';

    var regex = /^(\d+)[-/](\d+)[-/](\d+)(?:[T\s](\d+):(\d+)(?::(\d+))?)?$/;
    var matched = datestr.toString().match(regex);
    if (matched) {
      var YYYY = matched[1];
      var MM = matched[2];
      var DD = matched[3];
      var HH = matched[4]; if ( HH === void 0 ) HH = '00';
      var mm = matched[5]; if ( mm === void 0 ) mm = '00';
      var ss = matched[6]; if ( ss === void 0 ) ss = '00';
      var timeString = YYYY + "-" + (padZero(MM)) + "-" + (padZero(DD)) + "T" + (padZero(HH)) + ":" + (padZero(mm)) + ":" + (padZero(ss)) + ".000+08:00";
      return Date.parse(timeString);
    }
    return Number.NaN;
  };

  var userAgent = navigator.userAgent;
  var devicePixelRatio = window.devicePixelRatio;
  var ref = window.screen;
  var width = ref.width;
  var height = ref.height;

  // specific platform
  var isApple = (/iPhone|iPad|iPod|Macintosh/i).test(userAgent);
  var isAndroid = (/Android/i).test(userAgent);
  var isWeiXin = (/MicroMessenger/i).test(userAgent);
  var isQQ = (/\bQQ\b/i).test(userAgent);
  var isWeiBo = (/Weibo/i).test(userAgent);
  var isChrome = (/(Chrome|CriOS)\/[\d.]+/).test(userAgent);
  var isQQBrowser = (/QQBrowser/i).test(userAgent);

  var screenWidth = width;
  var screenHeight = height;
  var deviceWidth = screenWidth * devicePixelRatio;
  var deviceHeight = screenHeight * devicePixelRatio;
  var pageWidth = 750;
  var pageHeight = deviceHeight * pageWidth / deviceWidth;

  // specific device
  var isIPhone5OrSE = isApple
    && screenHeight === 568
    && devicePixelRatio === 2;

  var isIPhone678 = isApple
    && screenHeight === 667
    && devicePixelRatio === 2;

  var isIPhone678Plus = isApple
    && screenHeight === 736
    && devicePixelRatio === 3;

  var isIPhoneX = isApple
    && screenHeight === 812;

  var isIPhoneXR = isApple
    && screenHeight === 896
    && devicePixelRatio === 2;

  var isIPhoneXS = isApple
    && screenHeight === 812
    && devicePixelRatio === 3;

  var isIPhoneXSMax = isApple
    && screenHeight === 896
    && devicePixelRatio === 3;

  var isBangsScreen = isIPhoneX || isIPhoneXR || isIPhoneXS || isIPhoneXSMax;

  var getAppInfo = function () {
    var assign;

    var appName = '';
    var appVersion = '';
    var matched = userAgent.match(/AliApp\(([\w-]+)\/([\d.]+)\)/i);
    if (matched) {
      (assign = matched, appName = assign[1], appVersion = assign[2]);
    }
    return { appName: appName, appVersion: appVersion };
  };
  var ref$1 = getAppInfo();
  var _appName = ref$1.appName;
  var _appVersion = ref$1.appVersion;
  var appName = toLowerCase(_appName);
  var appVersion = _appVersion;
  var isAliApp = appName !== '';
  var isHema = appName === 'wdkhema';
  var isTaoBao = appName === 'tb';
  var isTmall = appName === 'tm';
  var isDingTalk = appName === 'dingtalk';

  var getOSVersion = function () {
    if(isApple) {
      var matched = userAgent.match(/OS ([\d_.]+) like Mac OS X/);
      if(matched) {
        return matched[1].split('_').join('.');
      }
    }else if(isAndroid) {
      var matched$1 = userAgent.match(/Android[\s/]([\d.]+)/);
      if(matched$1) {
        return matched$1[1];
      }
    }
    return '';
  };
  var osVersion = getOSVersion();

  exports.appName = appName;
  exports.appVersion = appVersion;
  exports.deviceHeight = deviceHeight;
  exports.deviceWidth = deviceWidth;
  exports.isAliApp = isAliApp;
  exports.isAndroid = isAndroid;
  exports.isApple = isApple;
  exports.isBangsScreen = isBangsScreen;
  exports.isChrome = isChrome;
  exports.isDingTalk = isDingTalk;
  exports.isHema = isHema;
  exports.isIPhone5OrSE = isIPhone5OrSE;
  exports.isIPhone678 = isIPhone678;
  exports.isIPhone678Plus = isIPhone678Plus;
  exports.isIPhoneX = isIPhoneX;
  exports.isIPhoneXR = isIPhoneXR;
  exports.isIPhoneXS = isIPhoneXS;
  exports.isIPhoneXSMax = isIPhoneXSMax;
  exports.isQQ = isQQ;
  exports.isQQBrowser = isQQBrowser;
  exports.isTaoBao = isTaoBao;
  exports.isTmall = isTmall;
  exports.isWeiBo = isWeiBo;
  exports.isWeiXin = isWeiXin;
  exports.osVersion = osVersion;
  exports.padZero = padZero;
  exports.pageHeight = pageHeight;
  exports.pageWidth = pageWidth;
  exports.parseDateStr2Timestamp = parseDateStr2Timestamp;
  exports.screenHeight = screenHeight;
  exports.screenWidth = screenWidth;
  exports.toLowerCase = toLowerCase;
  exports.toUpperCase = toUpperCase;

  return exports;

}({}));
//# sourceMappingURL=FrontEnd.dev.js.map
