const gulp = require("gulp");
const jshint = require("gulp-jshint");
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");

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
});