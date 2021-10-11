/* 
    process:
        - 进程
        - argv:返回一个数组，保存的是启动时的命令参数
            - 当node index.js启动的时候，第一个值是node.exe的目录，第二个值是被启动文件的目录
        - argv0:其实就是argv[0]
        - cwd():返回node进程的工作目录
        - exit():停止进程的执行

*/
console.log(1);
console.log(process.argv);
console.log(process.argv0);

//根据启动的指令不同，可以运行不同的内容
if (process.argv[2] === "hello") {
    console.log("欢迎光临");
} else if (process.argv[2] === "bye") {
    console.log("欢迎下次光临");
}

console.log("cwd", process.cwd()); //node工作目录


let i = 0
setInterval(() => {
    i++;
    console.log(i);
    if (i > 4) {
        process.exit();
    }
},1000)