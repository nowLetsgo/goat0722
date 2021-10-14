const mongoose = require("mongoose");
//连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/class0722");

//当数据库连接成功会触发mongoose.connection对象的open事件
mongoose.connection.once("open", err => {
    if (err) {
        console.log("数据库连接失败", err);
        return;
    }
    console.log("数据库连接成功");
})