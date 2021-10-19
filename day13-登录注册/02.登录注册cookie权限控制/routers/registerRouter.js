const express = require("express");
const router = new express.Router();

//引入userModel模块
const userModel = require("../models/userModel");

//引入md5模块
const md5 = require("md5");

//注册接口
/* 
    接口文档：
        url:"/register",
        method:"POST",
        请求字段：
            user:用户名 Str
            pass:密码 Str
        响应字段：
            code：状态代码 10000:成功 10001：失败
            msg：响应状态
*/
router.post("/register", async (req, res) => {
    //拿到用户注册请求的账号和密码
    const {
        user,
        pass
    } = req.body;
    // console.log(user, pass)

    //根据当前的user 去数据库查询是否有该用户名存在
    //如果查询到，则响应当前查询的到文档组成的对象,否则响应一个null
    const findResult = await userModel.findOne({
        username: user
    })
    // console.log(findResult)


    //如果查询存在当前用户名(也就是findResult是个对象)，则直接响应 用户名已经存在的结果
    if (findResult) {
        return res.json({
            code: 10001,
            msg: "用户名已经存在，请重新输入"
        })
    }

    //当查询的用户名不存在(也就是findResult是null的时候)，则向数据库添加数据
    const createResult = await userModel.create({
        username: user,
        password: md5(pass),
        createTime: new Date()
    })

    //添加好数据之后，响应给用户注册成功
    res.json({
        code: 10000,
        msg: "注册成功"
    })

})

module.exports = router