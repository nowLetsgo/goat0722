const express = require("express");

//创建一个router对象
const router = new express.Router();


//中间件函数封装
function fn(req, res, next) {
    const {
        user,
        pass
    } = req.body;

    const userReg = /^[A-Z][A-Za-z0-9]{4,9}$/g;
    const passReg = /^\d{3,6}$/g;
    if (!userReg.test(user)) {
        return res.json({
            code: 10004,
            msg: "用户名应该是大写字母开头，后边字母数字，总共5-10位"
        })
    }

    if (!passReg.test(pass)) {
        return res.json({
            code: 10004,
            msg: "密码是3-6为的数字"
        })
    }

    next();
}

//正则验证中间件
router.use("/login", fn)
router.use("/register", fn)

//把当前的router暴露出去
module.exports = router;