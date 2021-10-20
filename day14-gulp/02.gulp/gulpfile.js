const gulp = require("gulp");
const jshint = require("gulp-jshint");
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");
const less = require("gulp-less");
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const {
    exec
} = require("child_process")

//语法检查任务
gulp.task('jshint', function () {
    // 将你的任务的任务代码放在这
    return gulp.src('./src/js/*.js')
        .pipe(jshint({
            esversion: 6, //使用es6语法,
            asi: true, //可以不添加分号
            eqeqeq: true // 必须使用 全等===
        }))
        .pipe(jshint.reporter('default')); // gulp插件中查看
});


//babel配置
gulp.task('babel', () =>
    gulp.src('src/js/*.js') // 将 src/js 所有JS文件导入到gulp的流中
    .pipe(babel({
        // 使用babel对流中的文件进行编译
        // 将ES6语法编译成ES5以下语法
        // 将ES6模块化编译成commonjs
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist/js')) // 输出到dist目录下
    .pipe(connect.reload())
);

gulp.task('browserify', function () {
    // 必须写return 否则报错
    return gulp.src('dist/js/index.js')
        // 将commonjs模块化编译成浏览器能识别的语法
        .pipe(browserify({
            insertGlobals: true,
        }))
        .pipe(rename("build.js"))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())
});

//把js的操作组成一个大的操作
gulp.task("js-dev", gulp.series(["jshint", "babel", "browserify"]))


//less编译
gulp.task("less", function () {
    return gulp
        .src("./src/less/*.less")
        .pipe(less()) // 将less编译成css
        .pipe(concat("all.css"))
        .pipe(gulp.dest("./dist/css"))
        .pipe(connect.reload());
});

//html编译
gulp.task("html", function () {
    return gulp.src("./src/index.html")
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
})

//把整个的操作组成一个大的操作
gulp.task("dev", gulp.parallel(["js-dev", "less", "html"]))



//开发环境的服务器配置
gulp.task("connect", function () {
    // 创建一个服务器
    connect.server({
        port: 8888, // 端口号
        root: ["dist"], // 暴露目录
        livereload: true, // 自动刷新浏览器
    });

    //自动打开浏览器
    exec("start http://127.0.0.1:8888")

    // 自动监视 src/index.html 文件的变化，一旦文件发生变化就会执行后面
    gulp.watch("src/index.html", gulp.series(["html"]));
    gulp.watch("src/less/*.less", gulp.series(["less"]));
    gulp.watch("src/js/*.js", gulp.series(["js-dev"]));
});



gulp.task("watch", gulp.series(["dev", "connect"]));