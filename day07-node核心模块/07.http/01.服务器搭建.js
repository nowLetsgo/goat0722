const http = require("http");

let count = 0;
//创建一个服务(接受一个回调函数,对请求和响应的处理)
const server = http.createServer((request, response) => {
    //回调函数的两个参数分别是请求对象和响应对象
    count++;
    console.log("请求啦~", count)

    //在响应头中 返回响应格式Content-Type
    response.setHeader("Content-Type", "application/json;charset=utf-8")

    //返回响应
    response.end(`{
        name: "laowang"
    }`);
    // response.end("你是第" + count + "个");
});

//启动服务 并设置端口号和主机地址(localhost\127.0.0.1\192.168.19.35 )
server.listen(3000, "127.0.0.1", (err) => {
    if (err) {
        console.log("err", err);
        return;
    }

    console.log("服务器启动成功 http://127.0.0.1:3000");
})