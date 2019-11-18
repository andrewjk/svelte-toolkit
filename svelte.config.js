//const ts = require('typescript')
const sass = require('node-sass')

module.exports = {
  preprocess: {
    //script: async ({ content, attributes }) => {
    //  if (attributes.lang !== 'typescript') {
    //    return
    //  }
    //  return processTypeScript(content)
    //},
    style: async ({ content, attributes }) => {
      if (attributes.lang !== 'scss') {
        return
      }
      return processSass(content)
    }
  }
}

// NOTE: TypeScript doesn't seem to work very well with Svelte atm
// Importing things from stores doesn't import them properly etc
//function processTypeScript(content) {
//  return new Promise((resolve, reject) => {
//    var options = {
//      //module: ts.ModuleKind.CommonJS,
//      //inlineSourceMap: true,
//      //inlineSources: true
//    }
//    const result = ts.transpileModule(content, options)
//    console.log(result)
//    resolve({
//      code: result.outputText,
//      map: result.sourceMapText
//    })
//  })
//}

function processSass(content) {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        data: content,
        sourceMap: true,
        outFile: 'x' // this is necessary, but is ignored
      },
      (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve({
          code: result.css.toString(),
          map: result.map.toString()
        })
      }
    )
  })
}