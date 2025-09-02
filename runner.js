
// loader 的叠加顺序 = post(后置)+inline(内联)+normal(正常)+pre(前置)

const { runLoaders } = require("./loader-runner");
const path = require("path");
const fs = require("fs"); //webpack-dev-server启开发服务器的时候 memory-fs
// const entryFile = path.resolve(__dirname, "src/index.js");  // 要处理的文件
const entryFile = path.resolve(__dirname, "src/style-loader-entry/index.js");  // 要处理的文件 loader-runner 材料

// Auto=Normal
// -!	noPreAutoLoaders	不要前置和普通 loader
// !	noAutoLoaders	不要普通 loader
// !!	noPrePostAutoLoaders	不要前后置和普通 loader,只要内联 loader

// post1  post2    inline1   inline2     normal1   normal2     pre1  pre2
// post1  post2    inline1   inline2     normal1   normal2     pre1  pre2

//如何配置行内
let request = `inline-loader1!inline-loader2!${entryFile}`;
// loader 的分类和自己没有关系,只和使用的时候配置有关系
// webpack 的配置可能是由多个配置文件合并来的, 可以分类保证执行顺序
// eslint-loader pre  babel-loader normal
let rules = [
    {
        test: /\.js$/,
        use: ["normal-loader1", "normal-loader2"],
    },
    {
        test: /\.js$/,
        enforce: "pre",
        use: ["pre-loader1", "pre-loader2"],
    },
    {
        test: /\.js$/,
        enforce: "post",
        use: ["post-loader1", "post-loader2"],
    },
];

let parts = request.replace(/^-?!+/, "").split("!");
let resource = parts.pop(); //弹出最后一个元素 entryFile=src/index.js
let inlineLoaders = parts; //[inline-loader1,inline-loader2]
let preLoaders = [], postLoaders = [], normalLoaders = [];
for (let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    if (rule.test.test(resource)) {
        if (rule.enforce === "pre") {
            preLoaders.push(...rule.use);
        } else if (rule.enforce === "post") {
            postLoaders.push(...rule.use);
        } else {
            normalLoaders.push(...rule.use);
        }
    }
}

let loaders = [];
if(request.startsWith('!!')){
    loaders = [...inlineLoaders];
    //noPreAutoLoaders
}else if(request.startsWith('-!')){
    loaders = [
        ...postLoaders,
        ...inlineLoaders
    ];
}else if(request.startsWith('!')){
    //noAutoLoaders
    loaders = [
        ...postLoaders,
        ...inlineLoaders,
        ...preLoaders
    ];
}else{
    loaders = [
        ...postLoaders,
        ...inlineLoaders,
        ...normalLoaders,
        ...preLoaders
    ];
}

// loaders = [
//     ...postLoaders,
//     ...inlineLoaders,
//     ...normalLoaders,
//     ...preLoaders,
// ];

let resolveLoader = (loader) =>
    path.resolve(__dirname, "loader-chain", loader);
//把loader数组从名称变成绝对路径
loaders = loaders.map(resolveLoader);


runLoaders(
    {
        resource, //你要加载的资源
        loaders,  // 需要经过哪些loader处理
        context: { name: "zhangsan", age: 20 }, //保存一些状态和值
        readResource: fs.readFile.bind(this),
    },
    (err, result) => {
        console.log(err); //运行错误
        console.log(result.result[0]); //运行的结果
        console.log(
            // 把 buffer 转为字符串
            result.resourceBuffer ? result.resourceBuffer.toString("utf8") : null
        ); //读到的原始的文件
    }
);