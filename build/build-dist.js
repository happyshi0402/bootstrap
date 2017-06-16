const rollup = require('rollup')
const multiEntry = require('rollup-plugin-multi-entry')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')

rollup.rollup({
  entry: 'js/src/*.js',
  plugins: [
    multiEntry(),
    resolve({ jsnext: true }),
    babel({ exclude: 'node_modules/**' })
  ],
  onwarn: function (warning) {
    if (warning.code === 'MISSING_GLOBAL_NAME') {
      return
    }
  }
}).then(function (bundle) {
  // Generate bundle + sourcemap
  bundle.write({
    dest: 'dist/js/bootstrap.js',
    format: 'umd',
    moduleName: 'bootstrap'
  })
})
