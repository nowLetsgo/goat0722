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

// console.log(studentSchema);


//3.根据约束对象创建对应的集合
const studentModel = mongoose.model("student", studentSchema);
// console.log(studentModel);



//1.新增一条数据(create方法返回promise对象)
/* const re = studentModel.create({
    name: "yangnie",
    age: 38,
    sex: "男",
    hobby: ["洗juo", "SPA", "精油开背"],
    createTime: Date.now()
})
console.log(re);
re.then(value => {
    //create方法返回promise对象的值是：新增的文档对象
    console.log("value", value);
}) */


//2.新增多条数据(create方法返回promise对象)
const re = studentModel.create([{
    name: "刘渊",
    age: 39,
    sex: "男",
    hobby: ["吃饭", "喝酒", "打王者"],
    createTime: Date.now()
}, {
    name: "laoli",
    age: 18,
    sex: "男",
    hobby: ["看书", "敲代码", "运动"],
    createTime: Date.now()
}])
console.log(re);
re.then(value => {
    //create方法返回promise对象的值是：新增的文档对象
    console.log("value", value);
})