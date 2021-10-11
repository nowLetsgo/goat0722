const fs = require("fs");
const path = require("path");

//获取被操作文件的路径
const filePath = path.resolve(__dirname, "01.txt");

//同步打开文件(同步的意思就是，线程会等到这个文件的打开才向下继续执行)
//返回的就是这个文件的id
const fd = fs.openSync(filePath, "a");
console.log(fd);

//同步写入
fs.writeSync(fd, "锄禾日当午");

//同步关闭
fs.closeSync(fd);


