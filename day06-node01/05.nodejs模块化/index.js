//引入模块
//1.当暴露的是{add:fn}
const {
    add
} = require("./add");
console.log(add);
console.log(add(1, 2));

//2.当暴露的是add的时候
/* const add = require("./add");
console.log(add);
console.log(add(1, 1)); */