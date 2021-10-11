const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "01.txt");

fs.readFile(filePath, (err, data) => {
    if (err) {
        console.log("读取失败", err);
        return;
    }

    //回调函数的第二个参数data就是读取的内容
    console.log(data);
    console.log(data.toString());
})