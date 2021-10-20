/* 
    - 浏览器是不支持CommonJS规范的
    - 需要使用browserify来进行转换为浏览器识别的js代码
    - 需要安装browserify工具 npm i -g browserify
    - 使用browserify把当前CommonJS规范的入口文件进行编译为浏览器可识别的语法即可
        - browserify index.js -o build.js


*/
const add = require('./add')
const mins = require('./mins')

console.log(add(2, 2))
console.log(mins(10, 2))