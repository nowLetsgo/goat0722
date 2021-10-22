const path = require("path")
module.exports = {
    //入口目录 相对于webpack.config的位置
    entry: "./src/js/index.js",
    //输出配置
    output: {
        //输出配置的文件路径及文件名 路径相对于path
        filename: "./js/main.js",
        //webpack打包的参考路径
        path: path.resolve(__dirname, "build")
    },
    //开发模式
    mode: "development"
}