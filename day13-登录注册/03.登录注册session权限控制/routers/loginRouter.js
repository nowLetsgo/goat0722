const express = require("express");
const router = new express.Router();

//引入userModel模块
const userModel = require("../models/userModel");

//引入md5模块
const md5 = require("md5");

//登录接口
/* 
    接口文档：
        url:"/login",
        method:"POST",
        请求字段：
            user:用户名 Str
            pass:密码 Str
        响应字段：
            code：状态代码 10000:成功 10001：失败
            msg：响应状态
*/

router.post("/login", async (req, res) => {
    //拿到请求数据
    const {
        user,
        pass
    } = req.body;

    //去数据库查找是否有该用户
    const findResult = await userModel.findOne({
        username: user
    })

    //如果数据库没有该用户 则findResult 返回null
    if (!findResult) {
        return res.json({
            code: 10001,
            msg: "用户名不存在"
        })
    }

    //如果存在该用户，则findResult就是查询的结果，判断用户输入的密码和结果是否一致
    if (md5(pass) !== findResult.password) {
        return res.json({
            code: 10002,
            msg: "密码错误"
        })
    }

    //当登录成功的时候，设置session
    //给session扩展一个user为用户信息
    req.session.user = findResult;

    //登录成功
    res.json({
        code: 10000,
        msg: "登录成功"
    })
})

module.exports = router