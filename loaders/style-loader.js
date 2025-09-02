// 加一个JSON.stringify是因为要加一个双印号,不然变成了变量
// function loader(source) {
//   let script = `
//       let style = document.createElement("style");
//       style.innerHTML = ${JSON.stringify(source)};
//     document.head.appendChild(style);
//     `;
//   return script;
// }

const path = require('path')

function normalize (path) {
  return path.replace(/\\/g, '/')
}

function loader(source) { }

loader.pitch = function (remainingRequest) {
  // /Users/sicheng/Desktop/Demo/learn/loaders/loaders/less-loader.js!/Users/sicheng/Desktop/Demo/learn/loaders/src/style-loader-entry/index.less
  console.log('remainingRequest @@@', remainingRequest);
  console.log('context @@@', this.context);   // 模块所在的目录, 可以解析其他成员模块上下文  index.less 所在的目录
  // 1. 获取剩下的请求
  // 2. 用!分割到各个部分的绝对路径前面是loader路径, 后面是文件路径
  // 3. 把路径从绝对路径转为相对于根目录的相对路径
  // 需要加上!!, 表示只使用行内loader,不使用配置的loader, 否则就会死循环
  const request = '!!' + (remainingRequest.split('!').map(
    requestPath => this.utils.contextify(this.context, requestPath) // 方式 1
    // requestAbsPath => './' + path.posix.relative(normalize(this.context), normalize(requestAbsPath)) // 方式 2 // 模块id
  ).join('!'));

  // !!./../../loaders/less-loader.js!./index.less // 方式 1
  // !!../../loaders/less-loader.js!./index.less  // 方式 2
  console.log('request @@@', request);

  let script = `
      let styleCss = require(${JSON.stringify(request)});
      let style = document.createElement("style");
      style.innerHTML = styleCss;
      document.head.appendChild(style);
    `;
  return script;
}

module.exports = loader;

/*

[
  /Users/sicheng/Desktop/Demo/learn/loaders/loaders/less-loader.js,
  /Users/sicheng/Desktop/Demo/learn/loaders/src/style-loader-entry/index.less
]


request = [
  ./loaders/less-loader.js,
  ./src/style-loader-entry/index.less
]
*/


/*

loader 根据返回值可以分为两种，一种是返回 js 代码（一个 module 的代码，含有类似 module.export 语句）的 loader，
还有不能作为最左边 loader 的其他 loader

有时候我们想把两个第一种 loader chain 起来，比如 style-loader!css-loader! 问题是 css-loader 的返回值是一串 js 代码，
如果按正常方式写 style-loader 的参数就是一串代码字符串
为了解决这种问题，我们需要在 style-loader 里执行 require(css-loader!resources)

*/

/*
  当想把两个返回commonjs代码的loader 级联使用, 就需要pitch和!!
*/


// css 文件中import进来的less文件是否走less-loader?
// less文件里引入less文件, import语句的话,less就直接处理了

// 正常项目中可以直接require('!!xxx-loader!file')