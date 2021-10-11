const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "01.txt");

//简单写入(参数1：文件路径  参数2：写入内容  参数3：配置对象  参数4：回调函数)
fs.writeFile(filePath, "hhhh~", {
    flag: "a"
}, err => {
    if (err) {
        console.log("err", err);
        return;
    }
    console.log("文件写入成功");
})