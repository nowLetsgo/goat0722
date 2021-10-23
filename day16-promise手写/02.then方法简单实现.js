function MyPromise(executor) {
    //保存当前this
    const _this = this;

    //MyPromise构造函数返回一个promise对象，拥有state和result属性
    //构造函数被实例化调用的时候本身就返回一个实例化对象
    //所以直接给this扩展state和result属性即可(构造函数的this指向实例化对象)
    _this.state = "pending";
    _this.result = undefined;

    function resolve(value) {
        //promise的状态只能由pending变成其他状态，否则将不会改变状态
        if (_this.state !== "pending") return;

        //当调用resolve的时候，改变MyPromise实例化对象的状态和值
        _this.state = "fulfilled";
        _this.result = value;


        //当resolve的时候，调用then的onResolved的方法，并把成功对象的值传入
        //因为用户可能不调用then方法，则很可能出现没有onResolved的函数，所以需要进行一个判断
        //在判断是否存在onResolved外边嵌套一个定时器,因为构造函数的resolve方法可能是同步直接调用了，此时then还没有执行到，所以可能没有设置上onResolved这个函数，等以后执行到then的时候，下边代码不会再执行了，所以then中的两个回调可能就失效了，嵌套个计时器的原因就是：保证以下的判断在then的后边执行
        setTimeout(() => {
            _this.onResolved && _this.onResolved(value);
        })

    }

    function reject(reason) {
        //promise的状态只能由pending变成其他状态，否则将不会改变状态
        if (_this.state !== "pending") return;

        //当调用reject的时候，改变MyPromise实例化对象的状态和值
        _this.state = "rejected";
        _this.result = reason;

        //当reject的时候，调用then的onRejected的方法，并把失败对象的值传入
        setTimeout(() => {
            _this.onRejected && _this.onRejected(reason);
        })

    }

    //实例化构造函数的时候，会传递一个函数作为参数，我们内部要调用这个参数，并传入两个函数作为实参
    executor(resolve, reject);
}


//以下这种判断逻辑上是错误的：因为当then执行的时候，promise中的异步代码并没有执行，所以promise对象的状态也没有发生改变，所以onResolved和onrejected两个函数不符合if条件不能执行，所以我们要考虑onResolved和onrejected两个函数应该在promise对象的状态发生改变后再调用（promise对象中调用resolve和reject方法后再调用）
/* //then方法是实例化对象调用的，在原型对象上
MyPromise.prototype.then = function (onResolved, onRejected) {
    const _this = this;

    if (_this.state === "fulfilled") {
        onResolved(_this.result);
    }
    if (_this.state === "rejected") {
        onRejected(_this.result);
    }
} */



//then方法是实例化对象调用的，在原型对象上
//正确的逻辑是把onResolved和onrejected两个函数在promise构造函数内的resolve和reject方法执行后再调用，不要在then中直接调用
MyPromise.prototype.then = function (onResolved, onRejected) {
    const _this = this;

    //因为onResolved和onrejected函数是局部变量，想要在其他位置执行
    //请把这两个函数放在this上（实例化对象上），这样其他位置就能获取到这两个方法
    _this.onResolved = onResolved;
    _this.onRejected = onRejected;

}