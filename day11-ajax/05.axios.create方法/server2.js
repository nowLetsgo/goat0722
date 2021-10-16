const express = require("express");
const app = express();
const path = require("path")

//登录页面
app.get("/", (req, res) => {
    const filePath = path.resolve(__dirname, 'index.html');
    res.sendFile(filePath)
})


//登录get接口
app.get("/login", (req, res) => {
    //拿到查询字符串
    const query = req.query;
    console.log(query);
    // console.log(req);
    //获取请求的请求源
    const origin = req.headers.origin;
    //把白名单放在数组中
    const arr = ["http://127.0.0.1:5400", "http://127.0.0.1:5500", "http://127.0.0.1:5600", "http://127.0.0.1:5700"]
    //判断请求源在不在白名单里
    if (arr.includes(origin)) {
        //如果请求源在白名单中，则直接把当前的请求源设置为跨域
        //设置一个可跨域的header:
        res.set("Access-Control-Allow-Origin", origin)
    }

    //判断用户名和密码是否正确
    if (query.user === "laoli" && query.pass === '123456') {
        return res.json({
            code: 100001,
            msg: "登录成功",
            type: "GET"
        })
    }

    res.send({
        code: 100000,
        msg: "登录失败",
        type: "GET"
    })
})



app.listen("6666", (err) => {
    if (err) {
        console.log("服务器启动失败", err);
        return
    }

    console.log("服务器启动成功 http://192.168.19.35:8888")
})