const fs = require("fs");
const path = require("path");

//promisify工具 可以把异步的方法 变成返回promise对象的方法
const {
    promisify
} = require("util");

//文件路径
const filePath = path.resolve(__dirname, "01.txt");


const open = promisify(fs.open);
const write = promisify(fs.write);
const close = promisify(fs.close);

(async function () {
    const fd = await open(filePath, "a");
    await write(fd, "hhhhhh~");
    await close(fd)
})()