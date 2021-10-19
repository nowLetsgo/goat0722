const express = require("express");
const app = express();
const path = require("path")

//连接数据库 及引入数据库的集合信息
require("./db")

//1.官方的静态资源中间件（服务器上的文件响应）
//暴露views中的静态文件，直接可以在服务器的地址栏后添加对应的静态资源路径即可访问
app.use(express.static(path.resolve(__dirname, "./views")))
//暴露public中的静态文件，但是做了路径限制，在服务器地址后添加/public/+静态资源路径即可访问
app.use("/public/", express.static(path.resolve(__dirname, "./public")))

//2.处理post请求报文体的中间件（把报文体的内容放在req.body上）
app.use("", express.urlencoded({
    extended: false
}))
app.use(express.json());

//引入cookie处理的第三方中间件
const cookieParser = require('cookie-parser')
//挂载在app上
app.use(cookieParser())


//3.引入外部的功能路由模块
const regRouter = require("./routers/regRouter");
const loginRouter = require("./routers/loginRouter");
const registerRouter = require("./routers/registerRouter");
const centerRouter = require("./routers/centerRouter");

//4.把路由挂载在app上
app.use(regRouter);
app.use(loginRouter);
app.use(registerRouter);
app.use(centerRouter);



app.listen("8888", err => {
    if (err) {
        console.log("服务端错误", err);
        return;
    }
    console.log("服务端启动成功 http://192.168.19.38:8888");
})