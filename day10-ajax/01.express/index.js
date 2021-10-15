//1.引入express
const express = require("express");
const path = require("path");

//2.获取application对象（express是一个函数，当express调用后，会返回一个app对象，express的方法大多在app对象上）
const app = express();

//3.书写接口
app.get("/", (req, res) => {
    //req是请求对象
    // console.log("req", req);
    //res是响应对象
    // console.log("res", res);

    //获取get请求的请求查询字符串(已经转为对象呈现)
    console.log("req.query", req.query)


    //响应内容
    //send：普通响应，自动设置好响应头的Content-type
    res.send("我是根目录的响应")

})

app.get("/studentInfo", (req, res) => {
    //响应一个json格式
    res.json({
        name: "laowang",
        age: 18
    })
})

app.get("/download", (req, res) => {
    const filePath = path.resolve(__dirname, "index.js")
    //download：响应一个下载 里边书写文件路径
    res.download(filePath);
})

app.get("/bang", (req, res) => {
    const filePath = path.resolve(__dirname, "test.html")
    //sendFile:响应一个文件出去，里边书写文件路径
    res.sendFile(filePath)
})

app.get("/jd", (req, res) => {
    res.redirect("http://www.jd.com")
})
//4.启动服务，并设置端口号
app.listen(8888, err => {
    if (err) {
        console.log("err", err);
        return;
    }
    console.log("服务器启动成功 http://127.0.0.1:8888");
})