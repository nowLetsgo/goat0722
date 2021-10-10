//引入模块
//1.当暴露的是{add:fn}
/* const {
    add
} = require("./add");
console.log(add);
console.log(add(1, 2)); */

//2.当暴露的是add的时候
/* const add = require("./add");
console.log(add);
console.log(add(1, 1)); */


/* 
    模块标识：
        - require()中书写引入的模块内容，叫做模块标识
        - 模块标识分为3中
            - 核心模块（node自带模块 直接引入即可） require('fs')
            - 第三方模块(别人写好的模块，我们下载之后 直接引入) npm i jquery  / require("jquery")
            - 自定义模块(我们自己书写的模块,直接按照路径引入，可以省略后缀)(省略后缀自动会按照以下顺序添加：.js .json .node)

*/


const fs = require("fs");
console.log(fs.open);