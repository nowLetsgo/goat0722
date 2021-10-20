/* 
    模块化最初的书写方式：
        模块其实就是一个独立的功能
        把功能封装在函数中，不同的函数就是模块
        但是这种方式会出现函数命名冲突

*/
function random() {
    //模块1
}

function sort() {
    //模块2
}

function checkType() {
    //模块3
}


/* 
    对象模块写法
        把模块写成一个对象，所有模块的成员都在这个对象中
        可能会被外部操作my的内容成员信息

*/

const my = {
    num: 0,
    add() {
        //模块1
    },
    mins() {
        //模块2
    }
}

my.add();


/* 
    IIFE的写法
        可以不暴露私有成员


*/

const module1 = (function () {
    let num = 0;
    const timer1 = null;

    function add() {

    }

    function mins() {

    }
    return {
        add,
        mins
    }
})()

//使用
const {
    add,
    mins
} = module1;