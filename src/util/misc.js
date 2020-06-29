export const toLowerCase = s => String(s || '').toLowerCase();
export const toUpperCase = s => String(s || '').toUpperCase();
export const padZero = num => (num.toString().length < 2 ? `0${num}` : num);
// 2017-9-10 10:10 => 1505009400000
export const parseDateStr2Timestamp = (datestr='') => {
  const regex = /^(\d+)[-/](\d+)[-/](\d+)(?:[T\s](\d+):(\d+)(?::(\d+))?)?$/;
  const matched = datestr.toString().match(regex);
  if (matched) {
    const [, YYYY, MM, DD, HH = '00', mm = '00', ss = '00'] = matched;
    const timeString = `${YYYY}-${padZero(MM)}-${padZero(DD)}T${padZero(HH)}:${padZero(mm)}:${padZero(ss)}.000+08:00`;
    return Date.parse(timeString);
  }
  return Number.NaN;
};
export const noop = () => {};
export const makeMap = (str, expectsLowerCase) => {
	const map = Object.create(null);
	const list = str.split(',');
	for (let i = 0; i < list.length; i++) {
		map[list[i]] = true;
	}
	return expectsLowerCase
		? val => map[val.toLowerCase()]
		: val => !!map[val];
};
export const cacheFn = fn => {
	const cache = Object.create(null)
	return function cachedFn (str) {
		const hit = cache[str];
		return hit || (cache[str] = fn(str));
	};
};
export const capitalize = cacheFn(str => {
	return (str || '').charAt(0).toUpperCase() + str.slice(1);
});
export const camelize = str => {
	const camelizeRE = /-(\w)/g;
	return (str || '').replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
};
const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cacheFn(str => {
	return str.replace(hyphenateRE, '-$1').toLowerCase();
});
export const onceFn = fn => {
	let called = false;
	return function() {
		if(!called) {
			called = true;
			return fn.apply(this, arguments);
		}
	}
};
export const time2o = (millisecond=0, expectsPad) => {
	let seconds = millisecond / 1000;
	seconds = Math.max(seconds, 0);
	let d = Math.floor(seconds / 86400);
	let h = Math.floor((seconds %= 86400) / 3600);
	let m = Math.floor((seconds %= 3600) / 60);
	let s = Math.floor(seconds % 60);
	// generally, it's no need to pad days.
	if(expectsPad) {
		h = padZero(h);
		m = padZero(m);
		s = padZero(s);
	}
	return { d, h, m, s };
};
const week = ['日','一','二','三','四','五','六'];
export const dateFormat = (date, fmt='') => {
	let o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		'S': date.getMilliseconds(), // 毫秒
		'w': week[date.getDay()], // 星期几
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (let k in o)
		if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
	return fmt;
};
// 获取地图上两点之间的距离
export const getDistance = (point1, point2) => {
	// 地球半径（米）
	const R = 6378137;
	const d2r = Math.PI / 180;
	const dLat = (point1.lat - point2.lat) * d2r;
	const dLon = (point1.lng - point2.lng) * d2r;
	const lat1 = point2.lat * d2r;
	const lat2 = point1.lat * d2r;
	const sin1 = Math.sin(dLat / 2);
	const sin2 = Math.sin(dLon / 2);
	const a = (sin1 * sin1) + (sin2 * sin2 * Math.cos(lat1) * Math.cos(lat2));
	return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// 格式化输出距离
export const formatDistance = (distance) => {
	if (distance > 99000) {
		return '>99千米';
	}
	else if (distance <= 99000 && distance >= 1000) {
		return `${(distance / 1000).toFixed(1)}千米`;
	}
	else {
		return `${distance.toFixed(0)}米`;
	}
};

// 获取地图上两点之间的距离，并格式化输出
export const getFormattedDistance = (point1={lat: 0, lng: 0}, point2={lat: 0, lng: 0}) => {
	const distance = getDistance(point1, point2);
	return {formattedDistance: formatDistance(distance), rawDistance: distance};
};

export const getCookie = (key) => {
	const regex = new RegExp(`(?:^|;\\s*)${key}\\=([^;]+)(?:;\\s*|$)`);
	const matched = regex.exec(document.cookie);
	return matched && matched[1];
};
