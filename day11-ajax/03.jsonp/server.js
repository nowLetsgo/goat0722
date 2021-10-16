const express = require("express");
const app = express();

//登录get接口
app.get("/login", (req, res) => {
    //拿到查询字符串
    const query = req.query;
    console.log(query);

    //判断用户名和密码是否正确
    if (query.user === "laoli" && query.pass === '123456') {
        const data = {
            code: 100001,
            msg: "登录成功",
            type: "GET"
        }
        return res.send(`${query.callback}(${JSON.stringify(data)})`)
    }

    const data = {
        code: 10000,
        msg: "登录失败",
        type: "GET"
    }
    res.send(`${query.callback}(${JSON.stringify(data)})`)
})

app.listen("8888", (err) => {
    if (err) {
        console.log("服务器启动失败", err);
        return
    }

    console.log("服务器启动成功 http://192.168.19.35:8888")
})