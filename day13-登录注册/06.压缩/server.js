const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const zlib = require("zlib")

app.get("/", async (req, res) => {

    const filePath = path.resolve(__dirname, "./index.html")
    const rs = fs.createReadStream(filePath);
    //查看支持的压缩格式
    const accpetEncoding = req.headers['accept-encoding'];
    console.log(accpetEncoding)

    //根据客户端的支持的格式来进行不同的压缩
    if (accpetEncoding.includes("gzip")) {
        //zlib.createGzip()//创建一个gzip压缩的盒子，能够被流式写入
        const gzipFile = rs.pipe(zlib.createGzip()) //返回一个gizp压缩格式的可读流

        //告诉客户端我响应的压缩格式是什么
        res.set("content-encoding", "gzip")
        //把压缩好的文件写入到响应中
        return gzipFile.pipe(res) //22.1kb
    }
    
    //根据客户端的支持的格式来进行不同的压缩
    if (accpetEncoding.includes("deflate")) {
        //zlib.createDeflate()//创建一个gzip压缩的盒子，能够被流式写入
        const gzipFile = rs.pipe(zlib.createDeflate()) //返回一个gizp压缩格式的可读流

        //告诉客户端我响应的压缩格式是什么
        res.set("content-encoding", "deflate")
        //把压缩好的文件写入到响应中
        return gzipFile.pipe(res) //22.1kb
    }


    //没有压缩的响应
    rs.pipe(res) //99.1kb
})


app.listen(8888, err => {
    if (err) {
        console.log(err);
        return
    }

    console.log("服务器启动成功 http://192.168.19.38:8888")
})