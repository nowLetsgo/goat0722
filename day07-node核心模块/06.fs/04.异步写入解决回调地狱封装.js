const fs = require("fs");
const path = require("path");

//文件路径
const filePath = path.resolve(__dirname, "01.txt");

function open(filePath) {
    return new Promise((resolve, reject) => {
        fs.open(filePath, "a", (err, fd) => {
            if (err) {
                return reject(err);
            }
            console.log("打开文件成功");
            resolve(fd);
        })
    })
}

function write(fd, con) {
    return new Promise((resolve, reject) => {
        fs.write(fd, con, (err) => {
            if (err) {
                return reject(err);
            }
            console.log("写入成功");
            resolve()
        })
    })
}

function close(fd) {
    return new Promise((resolve, reject) => {
        fs.close(fd, err => {
            if (err) {
                return reject(err)
            }
            console.log("关闭成功");
            resolve()
        })
    })
}

(async function () {
    const fd = await open(filePath);
    await write(fd, "汗滴禾下土");
    await close(fd);
})()
.then(() => {
        console.log("文件打开写入关闭一套结束");
    })
    .catch(reason => {
        console.log("文件操作出现了错误", reason);
    })