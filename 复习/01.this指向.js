function fn() {
    console.log(this);
}

//1.函数默认调用---this指向window
fn();

//2.函数被上下文对象调用---this指向o
const o = {
    f: function () {
        console.log(this);
    }
}
o.f();


//3.隐式丢失--看丢失给的变量是怎么调用的
const o2 = {
    f: fn
}
const f2 = o2.f;
f2();


//4.实例化调用--this指向实例化对象
const o3 = new fn();


//5.强制绑定---this指向强制绑定的对象
fn.call(o3);


//判断this指向
//1.先看这个函数有没有被强制绑定（call apply  bind）
//2.再看这个函数没有被实例化（new 调用）
//3.再看函数有没有上下文对象调用
//4.其他都是指向window
//5.箭头函数没有this,严格模式下函数默认调用 this指向undefined