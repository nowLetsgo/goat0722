# gulp
## 1、什么是项目构建? 

* 项目构建包括如下内容：
  * 代码转换：将 TypeScript 编译成JavaScript、将 LESS 编译成 CSS等。
  * 文件优化：压缩JavaScript、CSS、HTML 代码，压缩合并图片等。
  * 代码分割：提取多个页面的公共代码，提取首屏不需要执行部分代码让其异步记在。
  * 模块合并：在采用模块化的项目里会有很多个模块和文件，需要通过构建功能将模块分类合并成一个文件。
  * 自动刷新：监听本地源代码变化，自动重新构建、刷新浏览器。
  * 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
  * 自动发布：更新代码后，自动构建出线上发布代码并传输给发布系统。
* 构建工具就是做以上这些事，将源代码转换成可以执行的JavaScript、CSS、HTML 代码。

## 2、构建工具的认识

* 构建工具有很多，例如：
  * fis3
  * grunt
  * gulp
  * webpack
  * parcel
  * Rollup
  * ...
* 但是市面上最火，功能最强大的无非就是webpack，而其次是gulp。
* 所以，我们主要就学习这两种构建工具

## 3、构建环境的认识

* 我们对平时开发的代码区分了两种环境：
  * 开发环境 development
    * 自动编译运行项目、检查语法错误、详细的错误提示等... （能帮助程序员更好的写代码, 在内存中编译运行，没有任何文件输出）
  * 生产环境 production
    * 压缩代码、兼容性处理等...（生成打包后的项目文件，提供项目上线使用）
* 而我们使用的库也分为两种依赖：    
  * 开发依赖 devDependencies
    * 项目构建打包需要的依赖
  * 生产依赖 dependencies
    * 项目上线运行时需要的依赖

## 4、gulp的使用

### 4.1 基础配置

1. 初始化package.json

   npm init -y

   包名不能有中文、不能叫gulp

2. 下载

   npm i gulp-cli -g

   npm i gulp -D  

3. 初始化gulp的配置文件：gulpfile.js 

   名称不能修改

   当你将来运行gulp指令，会自动查找的配置文件

4. gulp工作流程

   - 确定要干什么工作

   - 去npm网址找gulp插件，来完成这个工作

     gulp-xxx

   - 下载插件

     npm i xxx -D / --save-dev

   - 引入插件

     const xxx = require("gulp-xxx");

   - 注册插件任务

     gulp.task(任务名称, 要执行的操作);

   - 使用任务

     gulp 任务名称





#### 使用gulp-jshint进行语法检查：

1.安装插件： npm install jshint gulp-jshint --save-dev

2.引入jshint： const jshint = require('gulp-jshint')

3.定义任务:

```js
gulp.task('jshint', function() {
		  // 将你的任务的任务代码放在这
		  return gulp.src('./src/js/*.js')
		    .pipe(jshint({
		      esversion: 6 //使用es6语法,
              asi:true //可以不添加分号
              eqeqeq: true // 必须使用 全等===
		    }))
		    .pipe(jshint.reporter('default')); // gulp插件中查看
		});
使用 gulp jshint 启动
```



### 4.2 bable配置

```js
const gulp = require('gulp');
const babel = require('gulp-babel');
gulp.task('babel', () =>
    gulp.src('src/js/*.js')// 将 src/js 所有JS文件导入到gulp的流中
    .pipe(babel({
      // 使用babel对流中的文件进行编译
      // 将ES6语法编译成ES5以下语法
      // 将ES6模块化编译成commonjs
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist/js'))// 输出到dist目录下
);
//使用gulp babel 命令启动
```



### 4.3 browserify配置

```js
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");
gulp.task('browserify', function () {
    // 必须写return 否则报错
    return gulp.src('dist/js/index.js')
    	// 将commonjs模块化编译成浏览器能识别的语法
        .pipe(browserify({
            insertGlobals: true,
        }))
        .pipe(rename("build.js"))// 重命名
        .pipe(gulp.dest('./dist/js'))
});

//统一配置
gulp.task("js-dev", gulp.series(["babel", "browserify"]));
```



### 4.4 less配置

```js
const less = require("gulp-less");
const concat = require("gulp-concat");
gulp.task("less", function () {
  return gulp
    .src("./src/less/*.less")
    .pipe(less()) // 将less编译成css
    .pipe(concat("all.css")) // 合并文件
    .pipe(gulp.dest("./dist/css"))
});
```



### 4.5 html配置

```js
gulp.task("html", function () {
  return gulp
    .src("./src/index.html")
    .pipe(gulp.dest("./dist"))
});

//统一配置
gulp.task("dev", gulp.parallel(["js-dev", "less", "html"]));
```



### 4.6 配置服务器

```js
const connect = require("gulp-connect");
const {exec} = require("child_process")
gulp.task("connect", function () {
  // 创建一个服务器
  connect.server({
    port: 8888, // 端口号
    root: ["dist"], // 暴露目录
    livereload: true, // 自动刷新浏览器
  });
  // 自动打开浏览器(需要自己书写open方法)
  exec("start http://localhost:9527");
  // 当你修改源代码，自动编译
  // 自动监视 src/index.html 文件的变化，一旦文件发生变化就会执行后面
  gulp.watch("src/index.html", gulp.series(["html"]));
  gulp.watch("src/less/*.less", gulp.series(["less"]));
  gulp.watch("src/js/*.js", gulp.series(["js-dev"]));
});

//自动刷新配置（在每一个任务后添加）
.pipe(connect.reload());
//统一配置
gulp.task("watch", gulp.series(["dev", "connect"]));
```



### 4.7 生产环境配置

```js
const uglify = require("gulp-uglify");
const cssmin = require("gulp-cssmin");
const htmlmin = require("gulp-htmlmin");

gulp.task("uglify", function () {
  return gulp
    .src("./dist/js/built.js")
    .pipe(uglify())
    .pipe(rename("built.min.js"))
    .pipe(gulp.dest("./build/js"));
});

gulp.task("cssmin", function () {
  return gulp
    .src("./dist/css/all.css")
    .pipe(cssmin())
    .pipe(rename("all.min.css"))
    .pipe(gulp.dest("./build/css"));
});

gulp.task("htmlmin", function () {
  return gulp
    .src("./src/index.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true, // 去除空格换行符
        removeComments: true, // 去除注释
      })
    )
    .pipe(gulp.dest("./build"));
});

//生产环境配置
gulp.task("js-prod", gulp.series(["js-dev", "uglify"]));
gulp.task("css-prod", gulp.series(["less", "cssmin"]));
gulp.task('build', gulp.parallel(['js-prod', 'css-prod', 'htmlmin']));

```



### 4.8 package.json启动命令

```js
 "scripts": {
    "start": "gulp watch",//使用npm start
    "build": "gulp build"//使用 npm run build
  }
```

