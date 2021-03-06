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
    //当登录成功的时候，需要先设置cookie 用来以后免登录
    //把当前用户在数据库生成的唯一的id 保存到cookie中
    res.cookie("user_id", findResult._id, {
        httpOnly: true,
        // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),//expires是http1.0提供的，需要设置过期的时间
        maxAge: 1000 * 60 * 60 * 24 * 7 //maxAge是http1.1版本提供的，直接设置设置的时长即可

    })

    //登录成功
    res.json({
        code: 10000,
        msg: "登录成功"
    })
})

module.exports = router