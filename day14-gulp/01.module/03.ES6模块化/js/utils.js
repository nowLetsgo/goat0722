/* 
    分别暴露：
        - 当一个模块中有多个功能需要暴露的时候，可以在声明语句前进行书写export进行暴露
        - 分别暴露可以暴露多个功能出去

*/
let num = 1;

export let count = 0;

export const msg = {
    code: 10000,
    info: "hello world"
}

export function mins(a, b) {
    return a - b;
}

//以下写法错误，如果是分别暴露 则需要把export写在完整的声明语句前，如果是默认暴露 请添加default
// export mins;