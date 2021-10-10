//定义一个模块
function add(a, b) {
    return a + b;
}


/* 
    暴露：
        - 怎么暴露当前模块的对象或者方法呢？需要把被暴露的东西放在一个对象上
        - module.exports就是真正当前模块暴露的对象，只要把被暴露的内容放在module.exports上,就可以被暴露出去
        - exports默认指向module.exports对象的，所以给exports添加内容，也能被暴露出去，但是一旦修改exports的地址，不再指向module.exports,则exports对象将不代表暴露对象了


*/

//暴露方式1：暴露的是一个对象 对象内有一个add方法
// module.exports.add = add;

//暴露方式2：直接把当前add暴露出去
// module.exports = add;


//暴露方式3:暴露的是一个对象 里边有add方法
// exports.add = add;

//这样是没有暴露出去的，因为并没有修改module.exports对象的内容
exports = add;