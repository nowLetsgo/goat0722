"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.count = void 0;
exports.mins = mins;
exports.msg = void 0;

/* 
    分别暴露：
        - 当一个模块中有多个功能需要暴露的时候，可以在声明语句前进行书写export进行暴露
        - 分别暴露可以暴露多个功能出去

*/
var num = 1;
var count = 0;
exports.count = count;
var msg = {
  code: 10000,
  info: "hello world"
};
exports.msg = msg;

function mins(a, b) {
  return a - b;
} //以下写法错误，如果是分别暴露 则需要把export写在完整的声明语句前，如果是默认暴露 请添加default
// export mins;