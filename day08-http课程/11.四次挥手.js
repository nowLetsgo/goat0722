/* 
    四次挥手：
        - TCP的连接的拆除需要发送四个包，因此称为四次挥手
        - 四次挥手的目的：每个方向的关闭都需要请求和确认，因为客户端的断开请求的时候，服务端的数据并不一定发送发完毕，所以服务端不会把应答和请求一起发送，而是等数据发送完成之后才发送断开请求
        - 四次挥手的过程
            - 客户端向服务端发送断开请求，服务端接收请求
                - 发送的是Fin字段
            - 服务端向客户端发送断开应答，客户端接收
                - 发送ack字段
            - 当服务端的数据发送完成之后，再向客户端发送断开请求，客户端接收
                - 发送Fin字段
            - 客户端向服务端发送断开应答，服务端接收
                - 发送ack字段

*/