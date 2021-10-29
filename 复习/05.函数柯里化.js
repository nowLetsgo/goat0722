add(1)(2)(3)

//add被称作为高阶函数
//以下这种写法被称作为函数柯里化
function add(a) {
    return function (b) {
        return function (c) {
            console.log(a + b + c)
        }
    }
}