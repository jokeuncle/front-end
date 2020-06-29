const path = require('path');
const alias = require('@rollup/plugin-alias');
const replace = require('@rollup/plugin-replace');
const buble = require('@rollup/plugin-buble');
// const resolve = require('@rollup/plugin-node-resolve').default;
// const terser = require('rollup-plugin-terser').terser;
// const clear = require('rollup-plugin-clear');
// const flow = require('@rollup/plugin-sucrase');

const version = process.env.VERSION || require('../package.json').version;

const banner =
  '/*!\n' +
  ` * FrontEnd.js v${version}\n` +
  ` * (c) 2018-${new Date().getFullYear()} Lei Qian\n` +
  ' * Released under the MIT License.\n' +
  ' */';

const aliases = require('./alias');

const _resolve = p => {
  const base = p.split('/')[0];
  if(aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1));
  }else {
    return path.resolve(__dirname, '../', p);
  }
};

const builds = {
  'dev': {
    entry: _resolve('index.js'),
    dest: _resolve('dist/FrontEnd.dev.js'),
    format: 'iife',
    env: 'development',
    banner,
		sourcemap: true
  },
	'prod': {
		entry: _resolve('index.js'),
		dest: _resolve('dist/FrontEnd.min.js'),
		format: 'iife',
		env: 'production',
		banner,
	}
};

function getConfig(name) {
  const opts = builds[name];
  const config = {
    input: opts.entry,
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'FrontEnd',
			sourcemap: opts.sourcemap || false
    },
    external: opts.external,
    plugins: [
      // flow(),
			// clear({
			// 	targets: ['dist'],
			// 	watch: true
			// }),
      alias({
        entries: Object.assign({}, aliases, opts.alias)
      }),
      // resolve()
    ].concat(opts.plugins || [])
  };

  const vars = {};
  if (opts.env) {
    vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }
  config.plugins.push(replace(vars))

  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  });
  return config;
}

if(process.env.TARGET) {
  module.exports = getConfig(process.env.TARGET);
}else {
  exports.getBuild = getConfig;
  exports.getAllBuilds = () => Object.keys(builds).map(getConfig);
}
