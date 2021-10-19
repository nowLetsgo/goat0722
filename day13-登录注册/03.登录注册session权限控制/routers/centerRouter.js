const express = require("express");
const router = new express.Router();

//引入userModel模块
const userModel = require("../models/userModel");

//个人中心权限管理接口
router.post("/center", async (req, res) => {
    //权限判断
    console.log(req.session.user)
    if (req.session.user) {
        return res.json({
            code: 10000,
            msg: req.session.user.username
        })
    }

    res.json({
        code: 10001,
        msg: "没有权限，请重新登录"
    })
})

module.exports = router;