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


//then方法是实例化对象调用的，在原型对象上
//正确的逻辑是把onResolved和onrejected两个函数在promise构造函数内的resolve和reject方法执行后再调用，不要在then中直接调用
MyPromise.prototype.then = function (onResolved, onRejected) {
    const _this = this;

    return new MyPromise((resolve, reject) => {
        //因为then返回的promise对象的状态需要看onResolved和onRejected的执行后结果，所以我们必须让onResolved和onRejected在这个位置调用
        //我们封装一个新的方法，在新的方法中调用onResolved和onRejected，把新的方法放在resolve和reject函数中调用，此时onResolved和onRejected的调用要听resolve和reject函数，并且还能在当前位置调用，拿到返回值
        _this.onResolved = function (value) {
            //调用onResolved的时候要捕获错误，如果onResolved函数执行报错，则then直接返回一个失败的promise对象，值为错误的值
            try {
                //调用then的成功回调函数，拿到返回值
                const result = onResolved(value);

                //判断result是不是一个promise对象
                if (result instanceof MyPromise) {
                    //如果result是一个promise对象，则then的返回值应该看当前promise对象的状态
                    //可以直接使用then返回当前是成功还是失败
                    result.then(value => {
                        //如果result是成功的promise对象，则直接让then返回成功的promise对象，值就是当前的value
                        resolve(value);
                    }, reason => {
                        //如果result是失败的promise对象，则直接让then返回失败的promise对象，值就是reason
                        reject(reason);
                    })
                } else {
                    //如果then的onResolved回调返回的不是promise对象，则then直接返回成功的promise对象，并且值是onResolved的返回值result
                    resolve(result)
                }

            } catch (e) {
                //当函数执行出错 直接调用reject，让then返回一个失败的promise对象，值为报错信息
                reject(e);
            }


        }
        _this.onRejected = function (reason) {
            onRejected(reason)
        }

    })

}



//then的函数调用逻辑简化

/* function fn1() {
    //XXXXX
    this.b()
}

function fn2(a) {
    //但是a必须要达到fn1中的某个条件的时候才能调用a，所以我把a写在一个b函数中,在b函数中调用a
    //当fn1中条件达到的时候，调用b，此时下边的b就会执行，a也就才执行，并且a也在以下位置调用，可能拿到a的返回值
    this.b = function () {
        //因为我要在这个位置拿到a的返回值，所以a必须在这个位置调用
        a()
    }
} */