const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.get("/", (req, res) => {
    const filePath = path.resolve(__dirname, "./index.html");
    const rs = fs.createReadStream(filePath);
    rs.pipe(res)
})

app.get("/img", (req, res) => {
    const filePath = path.resolve(__dirname, "./01.jpg");
    const rs = fs.createReadStream(filePath);
    /* 
        强制缓存：
            - 强制缓存是向浏览器缓存查找请求结果，并根据请求结果来决定我们是否可以使用缓存的过程
            - 简单来讲，就是浏览器直接使用自己的缓存，不进行任何的请求
            - 强制缓存的设置过程
                - 客户端请求的时候，需要携带 Cache-Control请求头字段，值是 max-age=XXXX（秒数）
                - 服务端响应的时候，也需要携带 Cache-Contorl的响应头字段，值是max-age=XXXX（秒数）
                - 当下次再次请求的时候，判断自己是否符合强制缓存条件，如果符合，则直接读取缓存，如果不符合，则会走协商缓存
    
    
    
    */
    res.set("Cache-Control", "max-age=1000")
    rs.pipe(res)
})

app.listen(8888, err => {
    if (err) {
        console.log(err);
        return
    }

    console.log("服务器启动成功 http://192.168.19.38:8888")
})