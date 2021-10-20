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
import add from './add';
console.log("add", add(1, 1));


/* 
    引入分别暴露模块（必须使用解构赋值的形式来引入），因为分别暴露最终暴露的是一个对象

*/
import {
    count,
    msg as m1, //如果msg和其他变量冲突，可以起一个别名
    mins
} from './utils'
console.log("count,m1,mins", count, m1, mins(3, 1));



/* 
    引入统一暴露模块（一般也是使用解构赋值的形式接受）

*/
import {
    s1,
    say2,
} from './say'
console.log("s1,say2", s1("laoli"), say2("laoli"));


/* 
    假如真的不想用解构赋值，我们可以直接用一个对象接收住分别暴露和统一暴露的内容
*/
import * as say from './say'

console.log("say", say)