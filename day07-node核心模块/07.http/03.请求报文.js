/* 
    GET请求报文：
        //1.报文第一部分：报文首行
        //GET：请求方式
        // http://127.0.0.1:3000/?name=laowang：请求地址+携带的数据（GET请求的数据全部在URL地址上书写，而不是在报文体中）
        // HTTP/1.1 :http协议的版本号
        GET http://127.0.0.1:3000/?name=laowang HTTP/1.1

        //2.报文第二部分：报文头部
        //主机地址
        Host: 127.0.0.1:3000
        //保持长连接
        Connection: keep-alive
        //是否强制缓存 并设置强制缓存时间
        Cache-Control: max-age=1000
        //关于浏览器的信息
        sec-ch-ua: "Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"
        sec-ch-ua-mobile: ?0
        sec-ch-ua-platform: "Windows"
        //是否支持使用https
        Upgrade-Insecure-Requests: 1
        //用户代理字符串
        User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36
        //可以接受的响应数据类型
        Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/*;q=0.8,application/signed-exchange;v=b3;q=0.9
        //可以接受的压缩类型
        Accept-Encoding: gzip, deflate, br
        //接受的语言
        Accept-Language: zh-CN,zh;q=0.9
        //3.报文第三部分：报文空行

        //4.报文第四部分：报文体



*/