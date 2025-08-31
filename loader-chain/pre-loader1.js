function loader(source) {
  console.log("pre-loader1");
  return source + "//pre-loader1";
}
loader.pitch = function () {
  console.log('pre-loader1-pitch');
}
module.exports = loader;