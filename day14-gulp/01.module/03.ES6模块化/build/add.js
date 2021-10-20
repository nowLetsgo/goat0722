"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* 
    默认暴露：
        - 当前模块只需要暴露一个功能，则可以选用默认暴露
        - 默认暴露在当前模块中只能暴露一个功能
        - 使用 export default XXX;

*/
function add(a, b) {
  return a + b;
}

var _default = add;
exports["default"] = _default;