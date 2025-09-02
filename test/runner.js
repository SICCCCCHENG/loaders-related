

// const { runLoaders } = require("loader-runner");
const { runLoaders } = require("loader-runner");
const path = require("path");
const fs = require("fs"); //webpack-dev-server启开发服务器的时候 memory-fs
const entryFile = path.resolve(__dirname, "index.tsx");  // 要处理的文件

let rules = [
    {
        test: /\.tsx$/,
        enforce: "pre",
        use: ["code-inspect-loader"],
    },
];

loaders = [...rules[0].use]

let resolveLoader = (loader) =>
    path.resolve(__dirname, "../loaders", loader);
//把loader数组从名称变成绝对路径
loaders = loaders.map(resolveLoader);
runLoaders(
    {
        resource: entryFile, //你要加载的资源
        loaders,  // 需要经过哪些loader处理
        // context: { name: "zhufeng", age: 100 }, //保存一些状态和值
        readResource: fs.readFile.bind(this),
    },
    (err, result) => {
        console.log(err); //运行错误
        console.log(result); //运行的结果
        console.log(
            // 把 buffer 转为字符串
            result.resourceBuffer ? result.resourceBuffer.toString("utf8") : null
        ); //读到的原始的文件
    }
);