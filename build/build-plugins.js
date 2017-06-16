const fs = require('fs')
const rollup = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')


const pathJS = 'js/src/'
const pathDistJS = 'js/dist/'
const build = (files) =>  {
  for (var i = 0; i < files.length; i++) {
    const file = files[i]
    const pathFile = pathJS + file
    const pathDistFile = pathDistJS + file
    const moduleName = getModuleName(file)

    rollup.rollup({
      entry: pathFile,
      external: ['popper.js'],
      plugins: [
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
        dest: pathDistFile,
        format: 'umd',
        moduleName: moduleName,
        sourceMap: true
      }).then(function () {
        // Log success bundling
        console.log(pathFile + ' -> ' + pathDistFile)
      })
    })
  }
}

const getModuleName = (file) => {
  const tmp = file.split('.')
  var moduleName = file
  if (tmp.length > 0) {
    moduleName = tmp[0].toLowerCase()
  }
  return moduleName
}

fs.readdir(pathJS, (err, files) => {
  if (err) {
    throw err
  }
  build(files)
})
