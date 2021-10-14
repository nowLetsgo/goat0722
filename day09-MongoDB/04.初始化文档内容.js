const mongoose = require("mongoose");

//1.连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/class0722");

//当数据库连接成功会触发mongoose.connection对象的open事件
mongoose.connection.once("open", err => {
    if (err) {
        console.log("数据库连接失败", err);
        return;
    }
    console.log("数据库连接成功");
})


// 2.创建某个集合的约束对象
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

//4.初始化集合中的文档（直接实例化某个集合即可,里边传入对应的文档）
new studentModel({
    name: "yangnie",
    age: 37,
    sex: "男",
    hobby: ["打台球", "打麻将", "打CF"],
    // createTime: Date.now()
}).save(err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("student集合数据初始化成功");
})