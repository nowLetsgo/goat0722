const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "01.mp4")

//想要流式读取某个文件内容 需要给某个文件创建可读流
const rs = fs.createReadStream(filePath);

//可读流读取之后会触发事件 data （data事件就是消费可读流了）
rs.on("data", (chunk) => {
    //chunk就是每次读到的数据
    console.log(chunk);
})

//当流式读取完毕 则会触发end事件
rs.on("end", () => {
    console.log("读完了");
})