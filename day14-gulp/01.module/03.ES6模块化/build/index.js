"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _add = _interopRequireDefault(require("./add"));

var _utils = require("./utils");

var say = _interopRequireWildcard(require("./say"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* 
    ES6模块化编译
        - 使用babel把ES6模块化语法编译为CommonJS模块化
        - 使用browserify把CommonJS模块化编译为浏览器识别的语法

    - babel的使用
        - npm install --save-dev @babel/core @babel/cli @babel/preset-env
            - @babel/core：babel的核心包
            - @babel/cli：babel的命令包
            - @babel/preset-env：babel的预设包
        - 在package.json中配置预设
            "babel": {
                "presets": [
                "@babel/env"
                ]
            }
        - 使用babel的命令把js文件夹中所有ES6模块化的文件编译为CommonJS的模块化规范
            - npx babel 目标文件夹 -d 新文件夹（npx是启动本地命令）
        - 使用browserify把babel编译出来的CommonJS规范的入口文件代码编译为浏览器识别的代码


*/

/* 
    引入模块统一使用 import XXX from XXX来引入
    as:起别名

*/

/* 
    引入默认暴露的功能
*/
console.log("add", (0, _add["default"])(1, 1));
/* 
    引入分别暴露模块（必须使用解构赋值的形式来引入），因为分别暴露最终暴露的是一个对象

*/

console.log("count,m1,mins", _utils.count, _utils.msg, (0, _utils.mins)(3, 1));
/* 
    引入统一暴露模块（一般也是使用解构赋值的形式接受）

*/

console.log("s1,say2", (0, say.s1)("laoli"), (0, say.say2)("laoli"));
/* 
    假如真的不想用解构赋值，我们可以直接用一个对象接收住分别暴露和统一暴露的内容
*/

console.log("say", say);