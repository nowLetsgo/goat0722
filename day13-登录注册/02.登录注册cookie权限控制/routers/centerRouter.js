const express = require("express");
const router = new express.Router();

//引入userModel模块
const userModel = require("../models/userModel");

//个人中心权限管理接口
router.post("/center", async (req, res) => {
    console.log(req.cookies);
    //因为用户可能修改_id之后，在数据库查询的时候，会因为格式不对导致报错 需要处理错误
    try {
        //根据当前的cookie中保存的userID去数据库判断 是否存在该用户
        const findResult = await userModel.findOne({
            _id: req.cookies.user_id
        });
        console.log(findResult);

        //如果查询到用户信息了 则响应值
        if (findResult) {
            return res.json({
                code: 10000,
                msg: findResult.username //响应一个用户名出去
            })
        }

        //如果查询不到 则直接响应查询不到
        res.clearCookie("user_id")
        res.json({
            code: 10001,
            msg: "您没有权限请登录" //响应一个用户名出去
        })
    } catch (e) {
        //当登录失败，需要删除用户端保存的当前的cookie
        res.clearCookie("user_id")
        res.json({
            code: 10001,
            msg: "您没有权限请登录" //响应一个用户名出去
        })
    }
})

module.exports = router;