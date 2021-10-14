const mongoose = require("mongoose");
//创建某个集合的约束对象
const studentSchema = new mongoose.Schema({
    name: {
        type: String, //约束数据类型是String
        unique: true, //唯一的
        required: true, //必填项
    },
    age: Number, //直接约束数据类型
    sex: String,
    hobby: [String], //直接约束hobby的值是一个数组，数组的值必须是字符串
    createTime: {
        type: Date,
        default: Date.now
    }
})

console.log(studentSchema);


//3.根据约束对象创建对应的集合
const studentModel = mongoose.model("student", studentSchema);
console.log(studentModel);


//把创建好的model对象暴露出去
module.exports = studentModel;