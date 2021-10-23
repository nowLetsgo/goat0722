function MyPromise(exector) {
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
    }

    function reject(reason) {
        //promise的状态只能由pending变成其他状态，否则将不会改变状态
        if (_this.state !== "pending") return;

        //当调用reject的时候，改变MyPromise实例化对象的状态和值
        _this.state = "rejected";
        _this.result = reason;
    }

    //实例化构造函数的时候，会传递一个函数作为参数，我们内部要调用这个参数，并传入两个函数作为实参
    exector(resolve, reject);
}