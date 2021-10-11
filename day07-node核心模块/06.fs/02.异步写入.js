const fs = require("fs");
const path = require("path");

//文件路径
const filePath = path.resolve(__dirname, "01.txt")

//异步打开文件(回调函数的第一个参数是err，第二个参数是文件标识)
fs.open(filePath, "a", (err, fd) => {
    //错误优先处理
    if (err) {
        console.log("err", err);
        return;
    }

    console.log(fd);

    //写入文件
    fs.write(fd, "汗滴禾下土", err => {
        if (err) {
            console.log("err", err)
            return;
        }

        console.log("文件写入成功");

        
        //关闭文件
        fs.close(fd, err => {
            if (err) {
                console.log("err", err);
                return;
            }
            console.log("文件关闭成功");
        })
    })

})

console.log("end");