function loader(source) {
  console.log("inline-loader1");

  // console.log(this.loaders[0].data);
  // console.log(this.data);
  
  return source + "//inline-loader1";
}
loader.pitch = function () {
  console.log('inline-loader1-pitch');
}

module.exports = loader;