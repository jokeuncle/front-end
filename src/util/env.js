import { toLowerCase } from "./misc";

const { userAgent } = navigator;
const { devicePixelRatio } = window;
const { width, height } = window.screen;

// specific platform
export const isApple = (/iPhone|iPad|iPod|Macintosh/i).test(userAgent);
export const isAndroid = (/Android/i).test(userAgent);
export const isWeiXin = (/MicroMessenger/i).test(userAgent);
export const isQQ = (/\bQQ\b/i).test(userAgent);
export const isWeiBo = (/Weibo/i).test(userAgent);
export const isChrome = (/(Chrome|CriOS)\/[\d.]+/).test(userAgent);
export const isQQBrowser = (/QQBrowser/i).test(userAgent);

export const screenWidth = width;
export const screenHeight = height;
export const deviceWidth = screenWidth * devicePixelRatio;
export const deviceHeight = screenHeight * devicePixelRatio;
export const pageWidth = 750;
export const pageHeight = deviceHeight * pageWidth / deviceWidth;

// specific device
export const isIPhone5OrSE = isApple
  && screenHeight === 568
  && devicePixelRatio === 2;

export const isIPhone678 = isApple
  && screenHeight === 667
  && devicePixelRatio === 2;

export const isIPhone678Plus = isApple
  && screenHeight === 736
  && devicePixelRatio === 3;

export const isIPhoneX = isApple
  && screenHeight === 812;

export const isIPhoneXR = isApple
  && screenHeight === 896
  && devicePixelRatio === 2;

export const isIPhoneXS = isApple
  && screenHeight === 812
  && devicePixelRatio === 3;

export const isIPhoneXSMax = isApple
  && screenHeight === 896
  && devicePixelRatio === 3;

export const isBangsScreen = isIPhoneX || isIPhoneXR || isIPhoneXS || isIPhoneXSMax;

const getAppInfo = () => {
  let appName = '';
  let appVersion = '';
  const matched = userAgent.match(/AliApp\(([\w-]+)\/([\d.]+)\)/i);
  if (matched) {
    [, appName, appVersion] = matched;
  }
  return { appName, appVersion };
};
const { appName: _appName, appVersion: _appVersion } = getAppInfo();
export const appName = toLowerCase(_appName);
export const appVersion = _appVersion;
export const isAliApp = appName !== '';
export const isHema = appName === 'wdkhema';
export const isTaoBao = appName === 'tb';
export const isTmall = appName === 'tm';
export const isDingTalk = appName === 'dingtalk';

const getOSVersion = () => {
  if(isApple) {
    const matched = userAgent.match(/OS ([\d_.]+) like Mac OS X/);
    if(matched) {
      return matched[1].split('_').join('.');
    }
  }else if(isAndroid) {
    const matched = userAgent.match(/Android[\s/]([\d.]+)/);
    if(matched) {
      return matched[1];
    }
  }
  return '';
};
export const osVersion = getOSVersion();
