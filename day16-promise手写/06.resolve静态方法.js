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
            try {
                const result = onRejected(reason);
                if (result instanceof MyPromise) {
                    result.then(value => {
                        resolve(value)
                    }, reason => {
                        reject(reason)
                    })
                } else {
                    resolve(result)
                }
            } catch (e) {
                reject(e);
            }
        }

    })

}

MyPromise.prototype.catch = function (onRejected) {
    //catch方法其实就是then的第二个参数的写法，用来处理失败的回调函数的
    //所以当用户调用catch的时候，我们可以直接在内部调用then方法，并把回调函数传入then作为第二个参数
    return this.then(null, onRejected)
}

MyPromise.prototype.finally = function (onResolved) {
    //我们使用then来判断调用finally的是成功还是失败的promise对象
    //而then刚好返回promise对象，所以finally直接返回then的返回值即可
    return this.then(value => {
        //当成功的promise调用finally
        //获取finally回调函数的返回值，是不是promise对象
        const result = onResolved();
        if (result instanceof MyPromise) {
            //判断result是成功的promise还是失败的promise
            return result.then(value => {
                //直接在当前的then中return一个值，当前的then就返回成功的promise对象
                //因为当前的then的返回值被return出去了，所以外边的then也返回成功的promise对象
                return value;
            }, reason => {
                //当result是失败的promise对象的时候，当前的then要返回一个失败的promise对象，
                //在当前的catch中，如果直接报错，则当前的catch所在的then直接返回失败的promise对象
                throw reason;
            })
        } else {
            //当finally中的回调函数返回的不是promise对象的时候，则控制then返回成功的promise对象即可
            //在then中的第一个回调函数中，直接返回一个值，则then的返回的promise对象是成功状态，值为return的值
            return value;
            /* return new MyPromise((resolve, reject) => {
                resolve(value)
            }) */
        }
    }, reason => {
        //当失败的promise对象调用finally,则finally都会返回失败的promise对象的
        const result = onResolved();
        //判断finally回调函数onResolved的返回值result是不是promise对象
        if (result instanceof MyPromise) {
            return result.then(value => {
                //如果finally的回调函数返回值result是成功的promise对象，则finally还是返回失败，值是类似穿透的值
                throw reason
            }, reason => {
                //如果finally的回调函数返回值result是失败的promise对象，则finally返回失败，值是这个失败对象的值
                throw reason
            })
        } else {
            //如果不是promise对象，则直接给报错，则所在的then就是失败的promise对象
            //值是类似穿透的值
            throw reason;
        }

    })
}


//封装一个resolve的静态方法
//resolve快速创建一个成功的promise对象，如果里边传的是一个普通值，则成功promise对象的值就是参数传递的值
//如果resolve传递的是一个promise对象，则resolve创建的promise对象的状态和值 参照参数的promise对象的状态和值
MyPromise.resolve = function (info) {
    //一定会返回一个promise对象
    return new MyPromise((resolve, reject) => {
        //判断info是不是promise对象
        if (info instanceof MyPromise) {
            //判断当前的info是成功还是失败状态的
            info.then(value => {
                //如果成功，则也让resolve方法返回成功，只为当前的value
                resolve(value)
            }, reason => {
                //如果失败，则整个resolve方法返回失败的promise对象，值为info失败的值
                reject(reason)
            })
        } else {
            //如果不是,则直接返回一个成功状态即可,值为info
            resolve(info)
        }
    })
}