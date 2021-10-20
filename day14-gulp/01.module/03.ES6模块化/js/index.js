/* 
    引入模块统一使用 import XXX from XXX来引入
    as:起别名

*/

/* 
    引入默认暴露的功能
*/
import add from './add';


/* 
    引入分别暴露模块（必须使用解构赋值的形式来引入），因为分别暴露最终暴露的是一个对象

*/
import {
    count,
    msg as m1, //如果msg和其他变量冲突，可以起一个别名
    mins
} from './utils'



/* 
    引入统一暴露模块（一般也是使用解构赋值的形式接受）

*/
import {
    s1,
    say2,
} from './say'


/* 
    假如真的不想用解构赋值，我们可以直接用一个对象接收住分别暴露和统一暴露的内容
*/
import * as say from './say'