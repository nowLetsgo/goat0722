/* 
    统一暴露：
        直接在export后放对象，把需要暴露的功能放在对象中暴露出去
        一般是暴露多个功能使用

*/
function say1(con) {
    console.log("hello " + con);
}

function say2(con) {
    console.log("bye " + con)
}

//统一暴露
/* export {
    say1,
    say2
} */

//统一暴露的时候 起一个别名
export {
    say1 as s1, //起别名
    say2
}