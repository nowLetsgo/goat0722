const crypto = require("crypto");

//1.确定加密方式（消息摘要加密有多种 md5 sha1 sha256 sha512）
const md5 = crypto.createHash('md5');

//2.获取明文
let pass = "jkl;'";

//加盐
pass += 'atguigu';

//3.加密并转为16进制展示
const result = md5.update(pass, 'utf8').digest('hex')


console.log(result);


//再次加密
const md51 = crypto.createHash('md5');
const result2 = md51.update(result, 'utf8').digest('hex')
console.log(result2);