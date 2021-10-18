const mongoose = require("mongoose");
//创建某个集合的约束对象
const userSchema = new mongoose.Schema({
    username: {
        type: String, //约束数据类型是String
        unique: true, //唯一的
        required: true, //必填项
    },
    password: {
        type: String, //约束数据类型是String
        unique: true, //唯一的
        required: true, //必填项
    }, //直接约束数据类型
    createTime: {
        type: Date,
        default: Date.now
    }
})



//3.根据约束对象创建对应的集合
const userModel = mongoose.model("user", userSchema);


//把创建好的model对象暴露出去
module.exports = userModel;