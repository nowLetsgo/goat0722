const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "01.txt")

//想要流式的写入，需要根据写入的文件创建可写流
const ws = fs.createWriteStream(filePath);


//使用可写流ws的write方法即可向可写流写入内容
ws.write("锄禾日当午");
ws.write("汗滴禾下土");
ws.write("谁知盘中餐");
ws.write("粒粒皆辛苦");

//当写入完成以后关闭可写流
ws.end() //关闭管道的开头
ws.close() //关闭管道的末尾


//事件监听
//绑定open事件，当可写流打开的时候会自动的触发open事件
ws.on("open", () => {
    console.log("文件已经打开");
})

//绑定可写流的关闭事件，当可写流关闭时会触发
ws.on("close", () => {
    console.log("可写流关闭");
    ws.write("粒粒皆辛苦~");
})