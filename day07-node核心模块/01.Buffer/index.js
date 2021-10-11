/* 
    Buffer：
        - 二进制流，专门保存二进制的数据

*/

//创建一个长度为10的Buffer
const buf1 = Buffer.alloc(10);
console.log('buf1', buf1);

//创建一个长度为10的Buffer 填充内容(如果填充不满则重复)
const buf2 = Buffer.alloc(10, "atguigu");
console.log('buf2', buf2);

//创建一个长度为10的Buffer
const buf3 = Buffer.allocUnsafe(10);
console.log('buf3', buf3);


//创建一个字符串对应的buffer
const buf4 = Buffer.from("尚硅谷 atguigu");
console.log('buf4', buf4); //<Buffer e5 b0 9a e7 a1 85 e8 b0 b7 20 61 74 67 75 69 67 75>

//把Buffer转为字符串
console.log(buf4.toString());

//Buffer可以forEach
buf4.forEach(item => {
    console.log(item);
})