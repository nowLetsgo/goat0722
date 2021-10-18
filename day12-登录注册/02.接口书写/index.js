const express = require("express");
const app = express();
const path = require("path")

//连接数据库 及引入数据库的集合信息
require("./db")
const userModel = require("./models/userModel");

//引入md5模块
const md5 = require("md5");

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


//正则验证中间件
app.use((req, res, next) => {
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
})

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
app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

    //登录成功
    res.json({
        code: 10000,
        msg: "登录成功"
    })
})


app.listen("8888", err => {
    if (err) {
        console.log("服务端错误", err);
        return;
    }
    console.log("服务端启动成功 http://192.168.19.38:8888");
})