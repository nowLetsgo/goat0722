/* 
    path：
        - 关于路径的操作
        - path.resolve(,,,):将多个路径拼成一个一个绝对路径

*/
const path = require("path");

// const filePath1 = path.resolve("../02.process/01.txt");
// const filePath1 = path.resolve("../", "hello", "01.txt");
const filePath1 = path.resolve(__dirname, "01.txt")
console.log(filePath1);