# webpack 快速入门教程

## 1、了解 Webpack 相关

1. 什么是 webpack

- Webpack 是一个模块打包器(bundler)。
- 在 Webpack 看来, 前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理
- 它将根据模块的依赖关系进行静态分析，生成对应的静态资源

2. 五大“护法”

- Entry：入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
- Output：output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。
- Loader：loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只能解析 JavaScript）。
- Plugins：插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等。
- Mode：模式，有生产模式 production 和开发模式 development

3. 理解 Loader

- Webpack 本身只能加载 JS/JSON 模块，如果要加载其他类型的文件(模块)，就需要使用对应的 loader 进行转换/加载
- Loader 本身也是运行在 node.js 环境中的 JavaScript 模块
- 它本身是一个函数，接受源文件作为参数，返回转换的结果
- loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 json-loader。

4. 理解 Plugins

- 插件可以完成一些 loader 不能完成的功能。
- 插件的使用一般是在 webpack 的配置信息 plugins 选项中指定。

5. 配置文件(默认)

- webpack.config.js : 是一个 node 模块，内部暴露 webpack 配置对象

## 2、准备工作

- 初始化项目：

  - 生成 package.json 文件
  - 命令：`npm init -y`

- 安装 webpack
  - `npm install webpack webpack-cli -D`
  - `npm install webpack webpack-cli -g`

## 3、小试牛刀

- 创建 js 文件
  - src/index.js
  - src/js/module1.js
  - src/js/module2.js
  - src/js/module3.js
- 创建 json 文件
  - src/json/data.json
- 创建主页面:
  - public/index.html
- 运行指令
  - 开发配置指令：` webpack ./src/index.js -o ./build/js --mode=development`
    - 功能: webpack 能够编译打包 js 和 json 文件，并且能将 es6 的模块化语法转换成浏览器能识别的语法
  - 生产配置指令：` webpack ./src/index.js -o ./build/js --mode=production`
    - 功能: 在开发配置功能上加上一个压缩代码
- 结论：
  - webpack 能够编译打包 js 和 json 文件
  - 能将 es6 的模块化语法转换成浏览器能识别的语法
  - 能压缩代码
- 缺点：
  - 不能编译打包 css、img 等文件
  - 不能将 js 的 es6 基本语法转化为 es5 以下语法
- 改善：使用 webpack 配置文件解决，自定义功能

## 4、使用 webpack 配置文件

- 目的：在项目**根目录**定义配置文件，通过自定义配置文件，还原以上功能
- 文件名称：`webpack.config.js`
- 文件内容：

  ```js
  const { resolve } = require("path"); // node内置核心模块，用来设置路径。

  module.exports = {
    entry: "./src/index.js", // 入口文件
    output: {
      // 输出配置
      filename: "./js/main.js", // 输出文件名
      path: resolve(__dirname, "build"), // 输出文件路径配置
    },
    mode: "development", // 开发环境(二选一)
    // mode: 'production'   // 生产环境(二选一)
  };
  ```
  
- 运行指令： `webpack`

## 5、js 语法检查

- 缘由：

  - webpack 本身可以将 js 文件 ES6 语法编译成浏览器能识别的模块化语法
  - 但是开发时我们希望团队内部统一代码编程风格，不要你写你的样，我写我的样，这样看起来很难受
  - Eslint 工具就是用来做这个的，除此以外还能尽量规避一些开发时代码错误隐患

- 安装plugin
  
  - `npm install eslint-webpack-plugin --save-dev`
  - `npm install eslint --save-dev`
- 配置 plugin
  ```js
  plugins: [new ESLintPlugin()],
  ```
- eslint 要想工作，必须定义配置文件，配置文件有两种写法
  - `.eslintrc.js`
  - package.json 文件中 `eslintConfig`
- 我们以第一种为例，项目根目录新建`.eslintrc.js`
  ```js
  module.exports = {
    // eslint配置
    parserOptions: {
      ecmaVersion: 8, // es8
      sourceType: "module", //  ECMAScript 模块
    },
    rules: {
      // error 和 2 代表错误
      // warn 和 1 代表警告
      // off 和 0 代表关闭
      semi: "error", // 分号
      "no-debugger": "warn",
      eqeqeq: "off", // 必须使用三个等号
    },
  };
  ```
- 运行指令：` webpack`

## 6、js 语法转换

- 缘由
  
  - webpack 只能编译 ES6 模块化语法，其他语法不编译，所以要借助 babel 帮我们编译，否则自己手动改太费劲了
- 安装 loader
  
  - `npm install babel-loader @babel/core @babel/preset-env -D`
- 配置 loader

  ```js
  module: {
    rules: [
      // 省略之前配置
      ...,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      }
    ],
  },
  ```

- 问题：

  - 此时我们的模块已经被 babel 处理了，由 ES6 语法变成 ES5 或 ES5 以下语法了
  - 但是 webpack 生成的函数还是箭头函数，导致 IE 运行不了

- 解决：

  - 在 package.json 中添加配置
  - 意思是：1. 覆盖 99%主流浏览器 2. 只要最近两个版本 3. 不要已经死的(欧朋移动版)

  ```json
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
  ```

  - 这个配置会指示 webpack 打包的内容以什么样的浏览器去兼容

- 运行指令：`webpack`

## 7、打包 less 资源

- 创建 less 文件
  - src/less/test1.less
  - src/less/test2.less
- 入口 index.js 文件
  
  - 引入 less 资源
- 安装 loader
  
  - `npm install css-loader style-loader less-loader less -D`
- 配置 loader
  ```js
  module: {
    rules: [
      // 省略之前配置
      ...,
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ],
  },
  ```
- index.html 中创建相应的 DOM 结构
- 运行指令：` webpack`

## 8、打包样式文件中的图片资源

- 添加 2 张图片:
  - 小图, 小于 8kb: src/images/1.png
  - 大图, 大于 8kb: src/images/2.jpg
- 在 less 文件中通过背景图的方式引入图片

- webpack 自带处理图片等资源的方式

- 配置 loader

  ```js
  {
    test: /\.(png|jpeg|gif|svg)$/,
    type: "asset",
    parser: {
      dataUrlCondition: {
        maxSize: 8 * 1024, // 小于8kb以下的图片会被打包成base64格式
      },
    },
  }
  ```

- 让图片输出到指定目录

  ```js
  output: {
    assetModuleFilename: "images/[hash:8][ext][query]",
  }
  ```

- 运行指令：`webpack`

## 9、打包其他资源

- 添加字体文件

  - src/fonts/iconfont.eot
  - src/fonts/iconfont.svg
  - src/fonts/iconfont.ttf
  - src/fonts/iconfont.woff
  - src/fonts/iconfont.woff2

- 修改 css，字体文件图片路径

  ```css
  @font-face {
    font-family: "iconfont";
    src: url("../fonts/iconfont.eot");
    src: url("../fonts/iconfont.eot?#iefix") format("embedded-opentype"), url("../fonts/iconfont.woff2")
        format("woff2"), url("../fonts/iconfont.woff") format("woff"), url("../fonts/iconfont.ttf")
        format("truetype"), url("../fonts/iconfont.svg#iconfont") format("svg");
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ```

- 修改 html，添加字体图标

- 配置 loader

  ```js
  {
    test: [/\.ttf$/, /\.woff$/, /\.woff2$/],
    type: 'asset/resource',
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  },
  ```

- 运行指令：` webpack`

## 10、打包 html 文件

- 添加 html 文件
  - src/index.html
  - 注意不要在 html 中引入任何 js 文件
- 安装插件 Plugins
  
  - `npm install html-webpack-plugin -D`
- 在 webpack.config.js 中引入插件（插件都需要手动引入，而 loader 会自动加载）
  
  - `const HtmlWebpackPlugin = require('html-webpack-plugin')`
- 配置插件 Plugins
  ```js
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  ```
- 运行指令：` webpack`

## 11、自动编译打包运行

- 安装
  
  - `npm install webpack-dev-server -D`
- 修改 webpack 配置对象（注意不是 loader 中）
  ```js
  devServer: {
    port: 8080, // 端口号
    open: true  // 自动打开浏览器
  },
  ```
- 运行指令：`webpack serve`
- 简化指令

  - 修改 package.json 中 scripts 指令
    - "start": "npm run dev",
    - "dev": "webpack serve"
  - 运行指令：`npm start / npm run dev`

- 问题：

  - 此时并没有自动刷新浏览器功能
  - 原因：https://github.com/webpack/webpack-dev-server/issues/2758
  - 简单概括，这是一个 webpack BUG，自动刷新浏览器功能和 browserslist 不能同时存在

- 解决办法
  - 添加配置：target: 'web'
  - 问题：那 webpack 等工具打包的代码就有兼容性问题
  - 后面解决

> 以上就是 webpack 开发环境的配置，可以在内存中自动打包所有类型文件并有自动编译运行等功能。

## 12、准备生产环境

- 创建文件夹 config，将 webpack.config.js 复制两份
  - webpack.dev.js
  - webpack.prod.js
- 修改 webpack.prod.js 配置，删除 devServer 配置
  ```js
  module.exports = {
    output: {
      filename: "js/[name].[contenthash:8].js", // 添加了hash值, 实现静态资源的长期缓存
      path: resolve(__dirname, "../build"),
      publicPath: "/", // 所有输出资源公共路径
    },
    mode: "production", // 修改为生产环境
    target: "browserslist", // 让webpack兼容生效，但是devServer会失效，但是生产环境不需要devServer
  };
  ```
- 修改 package.json 的指令
  - "start": "npm run dev"
  - "dev": "webpack serve --config ./config/webpack.dev.js"
  - "build": "webpack --config ./config/webpack.prod.js"
- 开发环境指令
  - npm start
  - npm run dev
- 生产环境指令
  - npm run build
  - 注意: 生产环境代码需要部署到服务器上才能运行
    - npm i serve -g
    - serve -s build

## 13、提取 css 成单独文件

- 安装插件
  
  - `npm install mini-css-extract-plugin -D`
  
- 引入插件
  
  - `const MiniCssExtractPlugin = require("mini-css-extract-plugin");`
  
- 配置 loader
  ```js
  // 将 style-loader 提换成 MiniCssExtractPlugin.loader
  {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'less-loader',
    ]
  }
  ```
  
- 配置插件
  ```js
  new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash:8].css",
  }),
  ```
  
- 运行指令
  - npm run build
  - serve -s dist
  
  
  
  
  
  

## 14、添加 css 兼容

- 安装 loader
  
  - `npm install postcss-loader autoprefixer -D`
- 配置 loader
  ```js
  {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',//新增postcss-loader
      'less-loader',
    ]
  }
  ```
- 在项目根目录添加 postcss 配置文件：.postcssrc.js
  ```js
  module.exports = {
    plugins: {
      autoprefixer: {},
    },
  };
  ```
- 运行指令：
  - npm run build
  - serve -s build

## 15、压缩 css

- 安装插件
  
  - `npm install css-minimizer-webpack-plugin -D`
- 引入插件
  
  - `const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');`
- 配置插件
  ```js
  new CssMinimizerPlugin({}),
  ```
- 运行指令：
  - npm run build
  - serve -s build

## 16、压缩 html

- 已经自动实现了
- 运行指令：
  - npm run build
  - serve -s build

> 以上就是 webpack 生产环境的配置，可以生成打包后的文件。