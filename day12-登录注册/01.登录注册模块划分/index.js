const express = require("express");
const app = express();
const path = require("path")

//1.官方的静态资源中间件（服务器上的文件响应）
//暴露views中的静态文件，直接可以在服务器的地址栏后添加对应的静态资源路径即可访问
app.use("/",express.static(path.resolve(__dirname, "./views")))
//暴露public中的静态文件，但是做了路径限制，在服务器地址后添加/public/+静态资源路径即可访问
app.use("/public/", express.static(path.resolve(__dirname, "./public")))

app.listen("8888", err => {
    if (err) {
        console.log("服务端错误", err);
        return;
    }
    console.log("服务端启动成功 http://192.168.19.38:8888");
})