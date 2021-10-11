const fs = require("fs");
const path = require("path");

const filePath1 = path.resolve(__dirname, "01.mp4");
const filePath2 = path.resolve(__dirname, "02.mp4");


//创建可读流
const rs = fs.createReadStream(filePath1);
//创建可写流
const ws = fs.createWriteStream(filePath2);


//data事件是消费可读流
rs.on("data", chunk => {
    //向可写流写入读取的流式内容
    ws.write(chunk)
})

//监听可读流读取完毕
rs.on("end", () => {
    console.log("可读流over");
    //关闭可写流
    ws.end();
})

//监听可写流是否被关闭
ws.on("close", () => {
    console.log("可写流关闭");
})