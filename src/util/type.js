export const toRawType = v => Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
export const isNative = ctor => {
	return typeof ctor === 'function' && /native code/.test(ctor.toString());
};
export const isObject = v => v !== null && toRawType(v) === 'object';
export const isArray = v => toRawType(v) === 'array';
export const isFunc = v => toRawType(v) === 'function';
export const isGenFunc = v => toRawType(v) === 'generatorfunction';
export const isEmpty = v => Object.keys(v).length === 0;
export const isUndef = v => v === undefined || v === null;
export const isDef = v => v !== undefined && v !== null;
export const isTrue = v => v === true;
export const isFalse = v => v === false;
export const isPrimitive = v => (
	typeof v === 'string' ||
	typeof v === 'number' ||
	typeof v === 'symbol' ||
	typeof v === 'boolean'
);
export const isRegExp = v => toRawType(v) === 'regexp';
export const isPromise = v => (
	isDef(v) &&
	toRawType(v) === 'promise' &&
	typeof v.then === 'function' &&
	typeof v.catch === 'function'
);
export const toString = v => (
	v == null
		? ''
		: isArray(v) || (isObject(v) && v.toString === Object.prototype.toString)
		? JSON.stringify(v, null, 2)
		: String(v)
);
