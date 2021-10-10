/* 
    在nodeJS中，每一个JS模块都默认包裹了一层函数。
        - function (exports, require, module, __filename, __dirname) {}
        - 这个函数是所有模块都有的，node编译时往其中注入5个参数：
            - exports:代表当前模块暴露的对象
            - require:用来引入其他模块
            - module：当前模块的详细信息
            - __filename：代表当前文件的绝对路径
            - __dirname：代表但当前文件所在文件夹的绝对路径
*/

//打印外层包裹的函数
console.log(arguments.callee.toString());
console.log("exports", exports);
console.log("require", require);
console.log("module", module);
console.log("__filename", __filename);
console.log("__dirname", __dirname);