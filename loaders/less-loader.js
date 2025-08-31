// let less = require("less");
// function loader(source) {
//   let callback = this.async();
//   // 同步方法
//   less.render(source, { filename: this.resource }, (err, output) => {
//     callback(err, output.css);
//   });
// }


let less = require("less");
function loader(source) {
  let callback = this.async();
  // 同步方法
  less.render(source, { filename: this.resource }, (err, output) => {
    // 此处可能有各样的导出
    callback(err, `module.exports = ${JSON.stringify(output.css)}`);
  });
}

module.exports = loader; 