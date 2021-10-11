const fs = require("fs");
const path = require("path");

//文件路径
const filePath = path.resolve(__dirname, "01.txt");

(async function () {
    const fd = await new Promise((resolve, reject) => {
        fs.open(filePath, "a", (err, fd) => {
            if (err) {
                return reject(err);
            }
            console.log("打开文件成功");
            resolve(fd);
        })
    })

    await new Promise((resolve, reject) => {
        fs.write(fd, "锄禾日当午", (err) => {
            if (err) {
                return reject(err);
            }
            console.log("写入成功");
            resolve()
        })
    })


    await new Promise((resolve, reject) => {
        fs.close(fd, err => {
            if (err) {
                return reject(err)
            }
            console.log("关闭成功");
            resolve()
        })
    })

})()
.then(() => {
        console.log("文件打开写入关闭一套结束");
    })
    .catch(reason => {
        console.log("文件操作出现了错误", reason);
    })