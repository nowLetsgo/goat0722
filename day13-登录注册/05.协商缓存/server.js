const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const etag = require("etag")
const {
    promisify
} = require("util");

app.get("/", async (req, res) => {
    const filePath = path.resolve(__dirname, "./index.html");

    //接到请求头中的if-none-match和if-modified-since
    const ifNoneMatch = req.headers['if-none-match'];
    const ifModifiedSince = req.headers['if-modified-since'];



    //获取服务端文件的唯一标识和文件的最后一次修改时间
    const eTag = etag(filePath);

    //获取服务端文件的最后一次修改时间
    const stat = promisify(fs.stat); //把stat方法转换成返回promise对象的方法
    const fileDetail = await stat(filePath);
    const lastModified = fileDetail.mtime.toGMTString(); //获取最后一次修改时间 并转为标准时间字符串
    console.log(eTag, lastModified)

    //判断是否读取缓存
    if (ifNoneMatch === eTag && ifModifiedSince === lastModified) {
        //读取缓存
        res.status(304);
        return res.end();
    }


    //响应之前设置协商缓存的响应头
    res.set("ETag", eTag);
    res.set("Last-Modified", lastModified);
    //响应文件 
    res.sendFile(filePath)

})


app.listen(8888, err => {
    if (err) {
        console.log(err);
        return
    }

    console.log("服务器启动成功 http://192.168.19.38:8888")
})