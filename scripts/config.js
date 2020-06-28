const path = require('path');
const alias = require('@rollup/plugin-alias');
const flow = require('@rollup/plugin-sucrase');
const replace = require('@rollup/plugin-replace');
const buble = require('@rollup/plugin-buble');
const resolve = require('@rollup/plugin-node-resolve').default;
const terser = require('rollup-plugin-terser').terser;

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
  'def-dev': {
    entry: _resolve('index.js'),
    dest: _resolve('dist/FrontEnd.js'),
    format: 'umd',
    env: 'development',
    banner
  },
  'def-prod': {
    entry: _resolve('index.js'),
    dest: _resolve('dist/FrontEnd.min.js'),
    format: 'umd',
    env: 'production',
    banner,
    plugins: [terser()]
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
      name: opts.moduleName || 'FrontEnd'
    },
    external: opts.external,
    plugins: [
      // flow(),
      alias({
        entries: Object.assign({}, aliases, opts.alias)
      }),
      resolve()
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
  exports.getAllBuilds = Object.keys(builds).map(getConfig);
}
