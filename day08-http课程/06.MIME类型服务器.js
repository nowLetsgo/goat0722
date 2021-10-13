const http = require("http");
const path = require("path");
const fs = require("fs")

const server = http.createServer((req, res) => {
    /* //响应一个html
    const filePath = path.resolve(__dirname, "./03.post请求.html");
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    fs.readFile(filePath, (err, data) => {
        res.end(data)
    }) */

    //响应一个mp4
    const filePath = path.resolve(__dirname, "./01.mp4");
    res.setHeader("Content-Type", "text/html");
    fs.readFile(filePath, (err, data) => {
        res.end(data)
    })

})

server.listen(3001, "localhost", (err) => {
    if (err) {
        console.log("服务器启动错误")
        return;
    }

    console.log("服务器启动成功 请访问 http://localhost:3001");
})