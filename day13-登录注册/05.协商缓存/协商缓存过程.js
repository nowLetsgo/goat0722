/* 
    协商缓存：
        - 客户端向服务端发送请求，请求某一个资源文件
        - 服务端向客户端响应当前的文件，并且在响应头中添加两个字段，分别是文件的唯一标识（eTag）和当前被请求文件的最后一次修改时间（last-modified）
        - 客户端接收到响应，还要处理关于协商缓存的信息，把文件的唯一标识和最后一次修改时间保存下来，并且还要修改字段名，把eTag更名为if-none-match,把last-modified更名为if-modified-since
        - 客户端再次请求资源，会携带if-none-match和if-modified-since字段
        - 服务端接收到请求后，会把if-none-match和自己的eTag进行比较，把if-modified-since和自己的last-modified进行比较，如果都相同，则直接响应304状态码，要求读取缓存。否则响应数据，并携带最新的eTag和last-modified


*/