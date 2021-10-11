const EventEmitter = require("events");

//创建一个子类 继承EventEmitter  在子类实例化对象上扩展自定义事件
class myEvent extends EventEmitter {};

//实例化子类
const event = new myEvent();

//注册一个事件（on也可以写作addListener），once是绑定一次性事件
function fn() {
    console.log("hello");
}
event.on("hello", fn)


//触发事件
event.emit("hello")

//解绑事件
event.off("hello", fn);

event.emit("hello")
event.emit("hello")
event.emit("hello")