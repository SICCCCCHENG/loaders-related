const core = require("@babel/core");
const path = require("path");


// 此处源代码经过了两次转换(复用语法树)   webpack 需要两次还原
function loader(source, ast, inputSourceMap) {

    // 在loader中this是一个loaderContext对象
    // 把loader执行从同步转为异步
    const callback = this.async()
    console.log(this.callback === callback);
    let options = this.getOptions()
    let babelOptions = {
        ...options,
        ast: true,
        sourceMaps: true,  // 当前转换babel时,要生成sourcemap
        inputSourceMap  // 接收上一份soucemap
    }
    core.transformAsync(source, babelOptions).then(({ code }) => {
        // 在loader执行完成后才让调用callback,表示loader执行完成
        callback(null, code)
    })
}
module.exports = loader


/*
同步转换
function loader(source) {
    // 在loader中this是一个loaderContext对象
    let options = this.getOptions()
    const { code } = core.transformSync(source, options)
    return code
}
*/



/*
function loader(source) {
    // 在loader中this是一个loaderContext对象
    // 把loader执行从同步转为异步
    const callback = this.async()
    console.log(this.callback === callback);
    
    core.transformAsync(source, options).then(({ code }) => {
        // 在loader执行完成后才让调用callback,表示loader执行完成
        callback(null, code)
    })
}
*/


/**
 * babel-loader只是提供一个转换函数，但是它并不知道要干啥要转啥
 * @babel/core 负责把源代码转成AST，然后遍历AST，然后重新生成新的代码
 * 但是它并不知道如何转换语换法，它并不认识箭头函数，也不知道如何转换
 * @babel/transform-arrow-functions 插件其实是一个访问器，它知道如何转换AST语法树
 * 因为要转换的语法太多，插件也太多。所以可一堆插件打包大一起，成为预设preset-env
 */