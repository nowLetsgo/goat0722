//test1
//2 1 4 3 6
/* process.nextTick(() => {
    console.log(111);
});

const promise = new Promise(resolve => {
    console.log(222);
    resolve();
});

setTimeout(() => {
    console.log(333);
}, 0);

promise.then(() => {
    console.log(444);
});

setImmediate(() => {
    console.log(666);
}); */


//test2
/* process.nextTick(() => {
    console.log('process.nextTick() 333');
})

setTimeout(() => {
    console.log('setTimeout()  111');
}, 0)

setImmediate(() => {
    console.log('setImmediate() 222');
})

console.log('全局代码执行完了 444'); */


//test3
//1 3 6 4 5 2
/* console.log('1') //同步

setTimeout(() => {
    console.log('2') //宏任务
}, 0)

new Promise((resolve) => {
        console.log('3') //同步
        resolve()
    })
    .then(() => {
        console.log('4') //微任务
    })
    .then(() => {
        console.log('5') //微任务
    })

console.log('6') //同步 */



//test4
//1 4 5 8 2 6 3 9 / 1 4 8 5 2 6 3 9
/* setTimeout(() => {console.log(222);}, 0);
setImmediate(() => {console.log(333);});

const promise = Promise.resolve();

promise
  .then(() => {
    console.log(444);
    // process.nextTick(() => {console.log(555);});
    queueMicrotask(()=>{console.log(555);})
    setTimeout(() => {console.log(666);}, 0);
  })
  .catch(() => {console.log(777);})
  .then(() => {
    console.log(888);
    setImmediate(() => {console.log(999);});
  })
  .catch(() => {console.log(101010);})


  process.nextTick(() => {console.log(111);}); */


//test5
//4 1 3 6 8 2 7 5
/* async function async1() {
    console.log('1');
    await async2();
    console.log('2')
}
async function async2() {
    console.log('3')
}
console.log('4');
setTimeout(() => {
    console.log('5')
}, 0);
async1();
new Promise((resolve) => {
    console.log('6');
    resolve()
}).then(() => {
    console.log('7')
});
console.log('8') */


//test6
//1 2 3 5 4
/* setTimeout(() => {
    console.log(4);
}, 0);

new Promise(resolve => {
    console.log(1);
    for (let i = 0; i < 10000; i++) {
        i == 9999 && resolve();
    }
    console.log(2)
}).then(() => {
    console.log(5)
})

console.log(3) */


//test7
//1 2 3 4
/* Promise.resolve().then(() => { //then1
    console.log(1);
    process.nextTick(() => {
        console.log(2);
    })
})
Promise.resolve().then(function () { //then2
    setTimeout(() => {
        new Promise(function (resolve, reject) {
            console.log(3);
            reject();
        }).catch(function () {
            console.log(4);
        });
    })
}); */


//test8
//1 3 2 4
/* Promise.resolve().then(() => {
    console.log(1);
    queueMicrotask(() => {
        console.log(2);
    })
})
Promise.resolve().then(function () {
    new Promise(function (resolve, reject) {
        console.log(3);
        reject();
    }).catch(function () {
        console.log(4);
    });
}); */

//test9
//1 3 4 2
Promise.resolve().then(() => {
    console.log(1);
    process.nextTick(() => {
        console.log(2);
    })
})
Promise.resolve().then(function () {
    new Promise(function (resolve, reject) {
        console.log(3);
        reject();
    }).catch(function () {
        console.log(4);
    });
});


//test10
new Promise((resolve, reject) => {
    console.log(1)
    resolve(1)
})
.then(() => {
    console.log(2)
    new Promise((resolve, reject) => {
            console.log(3)
            resolve()
        })
        .then(() => {
            console.log(4)
        })
        .then(() => {
            console.log(5)
        })
        .then(() => {
            console.log(6)
        })
    console.log(8);
})
.then(() => {
    console.log(7)
})