/* 
    GET响应报文：
        //1.报文首行
        //协议版本 + 响应状态码 + 响应状态
        HTTP/1.1 200 OK

        //2.报文头
        //响应的数据格式
        Content-Type: application/json;charset=utf-8
        //响应的具体时间
        Date: Wed, 13 Oct 2021 03:28:22 GMT
        //保持长连接
        Connection: keep-alive
        //保持长连接的时间
        Keep-Alive: timeout=5
        //响应报文体的长度
        Content-Length: 31
        
        //3.报文空行

        //4.报文体
        {
            name: "laowang"
        }

*/


/* 
    POST响应报文：
        HTTP/1.1 200 OK
        Content-Type: application/json;charset=utf-8
        Date: Wed, 13 Oct 2021 03:24:17 GMT
        Connection: keep-alive
        Keep-Alive: timeout=5
        Content-Length: 31

        {
            name: "laowang"
        }

*/