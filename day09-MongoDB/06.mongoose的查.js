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



//1.查询数据(find方法返回promise对象)
const re = studentModel.findOne({
    $where: function () {
        return this.hobby.includes("看书");
    }
}, {
    name: 1,
    _id: 0
})

// console.log(re)
re.then(value => {
    //find返回的promise对象的值是一个数组，包含的是查询到的一个或多个文档对象
    //findOne返回的promise对象的值是就是查询到的一个文档对象
    console.log("查询结果", value);
})