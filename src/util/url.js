import { toRawType } from './type';

export const urlEncode = s => encodeURIComponent(s);
export const urlDecode = s => decodeURIComponent(s);
export const getURLParameter = (name, url) => {
	const search = url || window.location.search;
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(search)||[,''])[1].replace(/\+/g, '%20')) || null;
};
const URL_REGEXP_STRING = ''
	+ '^([a-z0-9-]+:)?'                 // # protocol
	+ '[/]{2}'                          // # slash x 2
	+ '(?:([^@/:?]+)(?::([^@/:]+))?@)?' // # username:password@
	+ '([^:/?#]+)'                      // # hostname
	+ '(?:[:]([0-9]+))?'                // # port
	+ '([/][^?#;]*)?'                   // # pathname
	+ '(?:[?]([^#]*))?'                 // # search
	+ '([#].*)?$'                       // # hash
;
const URL_REGEXP = new RegExp(URL_REGEXP_STRING, 'i');

export class HttpURL {
	/**
	 * HttpURL 构造方法，可以传入一个字符串形式的 URL 做为初始值
	 *
	 * @param {string} url 要解析的URL
	 *
	 * @example
	 * const url = new HttpURL('http://example.com');
	 */
	constructor (url) {
		this._params = {};
		this._hash = '';

		if (url) {
			this.assign(url.toString());
		}
	}

	get params () {
		return this._params;
	}

	set params (v) {
		if (toRawType(v) === 'object') {
			// 先重置所有 _params
			this._params = {};

			const keys = Object.keys(v);
			for (let i = 0; i < keys.length; i += 1) {
				const key = keys[i];
				this._params[key] = v[key];
			}
		}
	}

	get search () {
		const search = [];
		const { _params } = this;

		const keys = Object.keys(_params);
		for (let i = 0; i < keys.length; i += 1) {
			const key = keys[i];

			if (typeof _params[key] === 'undefined') {
				// eslint-disable-next-line no-continue
				continue;
			}

			if (_params[key] === '') {
				try {
					search.push(urlEncode(key));
				}
				catch (e) {
					search.push(key);
				}
			}
			else {
				try {
					search.push(`${urlEncode(key)}=${urlEncode(_params[key])}`);
				}
				catch (e) {
					search.push(`${key}=${_params[key]}`);
				}
			}
		}

		if (search.length) {
			return `?${search.join('&')}`;
		}

		return '';
	}

	set search (v) {
		if (toRawType(v) === 'string') {
			let s = v.toString();
			if (s.indexOf('?') === 0) {
				s = s.substr(1);
			}

			const search = s.split('&');
			this._params = {};

			for (let i = 0; i < search.length; i++) {
				let [key, value] = search[i].split('=');
				// value 无值，则值为 ''
				if (typeof value === 'undefined') {
					value = '';
				}
				if (key) {
					try {
						this._params[urlDecode(key)] = urlDecode(value);
					}
					catch (e) {
						this._params[key] = value;
					}
				}
			}
		}
	}

	get hash () {
		return this._hash;
	}

	set hash (v) {
		if (toRawType(v) === 'string') {
			let s = v.toString();
			if (s && s.indexOf('#') < 0) {
				s = `#${s}`;
			}
			this._hash = s;
		}
	}

	get host () {
		return this.hostname + (this.port ? `:${this.port}` : '');
	}

	set host (v) {
		if (toRawType(v) === 'string') {
			const s = v.toString();
			const matches = s.match(/([^:/?#]+)(?:[:]([0-9]+))?/);
			if (matches) {
				this.hostname = matches[1];
				this.port = matches[2] || '';
			}
		}
	}

	assign (v) {
		const s = v || '';
		const matches = s.match(URL_REGEXP);

		if (matches) {
			// eslint-disable-next-line no-restricted-globals
			this.protocol = matches[1] || (typeof location === 'object' ? location.protocol : '');
			this.username = matches[2] || '';
			this.password = matches[3] || '';
			this.hostname = matches[4];
			this.port = matches[5] || '';
			this.pathname = matches[6] || '/';
			this.search = matches[7] || '';
			this.hash = matches[8] || '';
			this.origin = `${this.protocol}//${this.host}`;
		}
		else {
			throw new Error('Parse Error');
		}
	}

	toString (noTailSlash) {
		let string = `${this.protocol}//`;

		if (this.username) {
			string += this.username;
			if (this.password) {
				string += `:${this.password}`;
			}
			string += '@';
		}

		string += this.hostname;

		if (this.port && this.port !== '80') {
			string += `:${this.port}`;
		}

		if (this.pathname) {
			// 允许通过 noTailSlash 避免生成 pathname 只有一个 / 的情况
			if (!noTailSlash || this.pathname !== '/') {
				string += this.pathname;
			}
		}

		if (this.search) {
			string += this.search;
		}

		if (this.hash) {
			string += this.hash;
		}

		return string;
	}
}
