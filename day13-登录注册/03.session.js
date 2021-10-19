/*  
    session:
        - session是服务端的存储
        - session设置过程
            - 客户端发送请求到服务端
            - 服务端验证请求成功后，在服务端创建一个session对象，然后再创建一个永远不会重复的sessionID，把当前的用户信息和sessionID全部存放在session对象中
            - 服务端向客户端返回响应，并在cookie中携带sessionID
            - 客户端收到的服务端的响应，并把sessionID存放在cookie中
            - 客户端再次请求服务端，cookie会随着http的请求头发送
            - 服务端接收到了客户端发送的cookie中的sessionID，去自身保存的session对象中查询是否存在该用户信息
            - 如果服务端验证存在该用户信息，则直接响应成功请求，否则进行失败响应，要求重新验证权限

    session和cookie的对比：
        - 安全性：cookie中可能会存放敏感信息，session是把敏感信息放在服务端，并把唯一的id放在了cookie中
        - 存放位置：cookie是客户端储存，session是服务端存储
        - session在服务端存储的时候会占用服务端资源，所以可以尝试把session对象放在数据库中



*/