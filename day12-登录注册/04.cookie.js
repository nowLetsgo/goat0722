/* 
    cookie:
        - 特点：
            - cookie保存在浏览器端，内存只有4kb，并且还有个数限制（个别浏览器限制50左右）
            - cookie是按照域名保存的
            - cookie会随着http请求发送到服务端，如果cookie过多可能造成服务端压力
            - cookie发送是明文发送的

        - cookie的流程
            - 客户端发送请求到服务端
            - 服务端返回成功响应，响应头携带cookie，cookie中保存用户的信息
            - 客户端接收到服务端的响应，并把cookie存放在了客户端储存
            - 客户端再次请求服务端，会自动的携带上所有的cookie，放在自己的请求头上
            - 服务端接收到的请求头中的cookie，判断是哪一个用户，从而作出对应响应
*/