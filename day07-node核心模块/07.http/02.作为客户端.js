const http = require("http");

//设置请求地址：
const url = "http://127.0.0.1:3000"
//设置请求
const request = http.request(url, response => {
    //回调函数的参数response 就是响应的对象

    // console.log(response);
    //响应状态码
    console.log(response.statusCode);

    //node作为客户端请求到数据是可读流，需要使用可读流的是data事件来接受
    response.on("data", chunk => {
        console.log(chunk);
        console.log(chunk.toString());
    })

});


//发送请求
request.end();