const express = require("express");
const app = express();
const path = require("path")

//登录页面
app.get("/", (req, res) => {
    const filePath = path.resolve(__dirname, '01.get请求.html');
    res.sendFile(filePath)
})

//登录get接口
app.get("/login", (req, res) => {
    //拿到查询字符串
    const query = req.query;
    console.log(query);
    //判断用户名和密码是否正确
    if (query.user === "laoli" && query.pass === '123456') {
        return res.json({
            code: 100001,
            msg: "登录成功"
        })
    }

    res.send({
        code: 100000,
        msg: "登录失败"
    })
})

app.listen("8888", (err) => {
    if (err) {
        console.log("服务器启动失败", err);
        return
    }

    console.log("服务器启动成功 http://192.168.19.35:8888")
})