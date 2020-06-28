const path = require('path');

const resolve = p => path.resolve(__dirname, '../', p);

module.exports = {
  component: resolve('src/component'),
  util: resolve('src/util')
};
