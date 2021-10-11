const fs = require("fs");
const path = require("path");

const filePath1 = path.resolve(__dirname, "01.mp4");
const filePath2 = path.resolve(__dirname, "02.mp4");


//创建可读流
const rs = fs.createReadStream(filePath1);
//创建可写流
const ws = fs.createWriteStream(filePath2);

//直接把可读流写入到可写流 并关闭可读流可写流
rs.pipe(ws);

//监听可写流是否被关闭
ws.on("close", () => {
    console.log("可写流关闭");
})
rs.on("end", () => {
    console.log("可读流关闭");
})