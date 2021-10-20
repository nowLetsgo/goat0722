const gulp = require("gulp");
const jshint = require("gulp-jshint");

//语法检查任务
gulp.task('jshint', function () {
    // 将你的任务的任务代码放在这
    return gulp.src('./src/js/*.js')
        .pipe(jshint({
            esversion: 6, //使用es6语法,
            asi: false, //可以不添加分号
            eqeqeq: true // 必须使用 全等===
        }))
        .pipe(jshint.reporter('default')); // gulp插件中查看
});