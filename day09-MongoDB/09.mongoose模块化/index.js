//引入连接数据库的模块(引入模块，模块会直接执行，如果模块没有暴露对象，可以不用接受)
require("./db");

//引入studentModel模块
const studentModel = require("./model/studentModel");

//查
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