/* 
    Global:
        - nodeJS的顶层对象
        - 拥有定时器 微任务 立即执行函数等方法
    
        - 在node端 js完全没有DOM、有个别的BOM（定时器等）、完全支持ES


        - setImmediate:立即执行函数，和setTimeout设置时间为0是一样的

        - queueMicrotask：设置微任务

        - process.nextTick():立即执行函数,是微任务，但是排在了微任务的第一梯队上（如果你想让一段代码在同步结束后立马执行，请使用他）

*/
// console.log(global);

//定时器
setTimeout(() => {
    console.log(2);
}, 0)

//立即执行函数
setImmediate(() => {
    console.log("setImmediate");
})

//微任务
queueMicrotask(() => {
    console.log("queueMicrotask");
})

//立即执行函数
process.nextTick(() => {
    console.log("process.nextTick");
})




console.log(1);