

# 第1章：React入门

## 1. React全家桶

- React基础
- React-Router
- PubSub
- Redux
- Ant-Design

## 2. React简介

### 2.1 官网

1. 英文官网：https://reactjs.org/

2. 中文官网：https://zh-hans.reactjs.org/

### 2.2 介绍描述

1. 用于动态构建用户界面的 JavaScript 库(只关注于视图)

   是一个将数据渲染为HTML视图的开源JavaScript库

   ![501XOP.png](https://z3.ax1x.com/2021/10/19/501XOP.png)

2. 由Facebook开源

   ![503snP.png](https://z3.ax1x.com/2021/10/19/503snP.png)

### 2.3 为什么学习React

1. 原生JavaScript操作DOM繁琐、效率低（DOM-API操作UI）
2. 使用JavaScript直接操作DOM，浏览器会进行大量的重绘重排
3. 原生的JavaScript没有组件化编码方案，代码复用率低

### 2.4 React的特点

1. 采用组件化模式、声明式编码，提高开发效率及组件复用率

3. 在React Native中可以使用React语法进行移动端开发 

4. 使用虚拟DOM+优秀的Diffing算法，尽量减少与真实DOM的交互

### 2.5 React高效的原因

1. 使用虚拟(virtual)DOM, 不总是直接操作页面真实DOM。

2. DOM Diffing算法, 最小化页面重绘。

   ![50GkZV.png](https://z3.ax1x.com/2021/10/20/50GkZV.png)

   

   ![50GeG4.png](https://z3.ax1x.com/2021/10/20/50GeG4.png)

   

   ![50GJiD.png](https://z3.ax1x.com/2021/10/20/50GJiD.png)



### 2.6 学习React需要掌握的基础知识

- 判断this指向
- class(类)
- ES6语法规范
- npm 包管理器
- 原型、原型链
- 数组常用方法
- 模块化

## 3. React的基本使用

### 3.1 相关js库

1. react.js：React核心库。

2. react-dom.js：提供操作DOM的react扩展库。

3. babel.min.js：解析JSX为JS的库。

   ```html
   <!-- 引入react核心库 -->
   <script type="text/javascript" src="../js/react.development.js"></script>
   <!-- 引入react-dom，用于支持react操作DOM -->
   <script type="text/javascript" src="../js/react-dom.development.js"></script>
   <!-- 引入babel，用户解析jsx为js -->
   <script type="text/javascript" src="../js/babel.min.js"></script>
   ```

   

### 3.2 第一个React练习

![5ywl11.jpg](https://z3.ax1x.com/2021/10/21/5ywl11.jpg)

```html
<!-- 准备一个空的DOM容器，后期react会往其中加入解析完的结构 -->
<div id="test"></div>

<!-- 此处一定要写上babel，因为我们写的不是js是jsx要靠babel解析 -->
<script type="text/babel">
	//1.创建一个虚拟DOM
	//此处一定不要加引号,因为这是jsx中创建虚拟DOM的特殊语法。
	const VDOM = <h1>Hello,React!</h1> 

	//2.通过react将VDOM转为真实DOM，插入页面
	ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```



### 3.3 创建虚拟DOM的两种方式 

#### 3.3.1 JSX方式

- 全称:  JavaScript XML

- react定义的一种类似于XML的JS扩展语法JS + XML本质是React.createElement(component,props, ...children)方法的语法糖

- 作用: 用来简化创建虚拟DOM 

- babel.js的作用：

  - 浏览器不能直接解析JSX代码, 需要babel转译为纯JS的代码才能运行

  - 只要用了JSX，就要加上type="text/babel", 声明需要babel来处理

```html
<!-- 准备好一个容器 -->
<div id="test"></div>

<script type="text/babel">
	//1.创建一个虚拟DOM
	let VDOM = (
		<h1 id="title">
			<span>Hello,React!</span>
   		</h1> 
	)
	//2.通过react将VDOM转为真实DOM，插入页面
	ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```



#### 3.3.2 纯JS方式(开发中不用)

React提供了一些API来创建一种 “特别” 的Object对象

- `const VDOM=React.createElement('xx',{id:'xx'},'xx')`

- 上面创建的就是一个简单的虚拟DOM对象。

- 虚拟DOM对象要会被React转换为真实DOM才能呈现在页面。

- 编码时只需操作虚拟DOM，React能将其转为真实DOM的变化，从而更新界面。

```html
<!-- 准备一个容器 -->
<div id="test"></div>

<script>
    //1.创建一个虚拟DOM(createElement(标签名，标签属性，标签体))
    const VDOM = React.createElement('h1',{id:'title'},React.createElement('span',null,'Hello,React!'))
    //2.通过react将VDOM转为真实DOM，插入页面
    ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```



### 3.4 虚拟DOM与真实DOM

关于虚拟DOM目前你需要知道的：

- 本质就是Object类型的对象（一般对象）。
- 虚拟DOM比较“轻”，真实DOM比较“重”，虚拟DOM是react内部在用的，无需真实DOM身上那么多的属性
- 虚拟DOM早晚会被react转为真实DOM，呈现在页面上。



```html
<script type="text/babel" >
	//1.创建一个虚拟DOM
	const VDOM = <h1>Hello,React</h1>
	console.log(VDOM) //输出的是虚拟DOM，本质就是Object类型的一般对象
		
	const TDOM = document.getElementById('test')
	console.log(TDOM) //输出的是真实DOM
	debugger;
		
	//2.将虚拟DOM准备真实DOM渲染到页面
	ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```



### 3.5 React JSX语法

- 定义虚拟DOM时，不要写引号。
- 标签结构中要混入js表达式，要用{}做分割，即：{js表达式}
- 指定样式的类名不要用class，必须用className
- 行内样式，要用style={{}}的形式去编写，且像font-size这种属性，要转为fontSize
- 只能有一个根标签（临时的解决办法：在最外侧包裹一个div，后面的课程中会有更好的解决办法）
- 标签必须闭合
- 标签首字母:
  - 若标签首字母小写：则将该标签转为html中同名元素，若html中无该元素，则报错。
  - 若标签首字母大写：则react去渲染对应的组件，若没有定义过该组件，则报错。



### 3.6 JSX练习

需求: 动态展示如下列表

![5yDw9J.jpg](https://z3.ax1x.com/2021/10/21/5yDw9J.jpg)

```html
<!-- 准备一个容器 -->
<div id="test"></div>

<script type="text/babel">
	/* 
		一定注意区分：【js语句(js代码)】与 【js表达式】
			1.表达式：一个表达式会产生一个值，可以放在需要一个值的地方，表达式是一种特殊的语句（代码）
				下面这些都是表达式：
					(1). a
					(2). a+b
					(3). demo()
					(4). arr.map()	
						....

				2.语句（代码）：
						(1). if(){}
						(2). for(){}
						(3). switch(){case:xxx}
						.....
		*/

		//模拟一些数据
		const arr = ['Angular','React','Vue']
		const x = 100
		// const arr = [<li>Angular</li>,<li>React</li>,<li>Vue</li>]

		//1.创建虚拟DOM
		const VDOM = (
			<div>
				<h2>前端框架列表</h2>
				<ul a={x}>
					{
						arr.map((item,index)=>{
							return <li key={index}>{item}</li>
						})
					}
    			</ul>
    		</div>
		)
		//渲染
		ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```



## 4. 模块与组件

### 4.1 模块

1. 理解：向外提供特定功能的js程序, 一般就是一个js文件

2. 为什么要拆成模块：随着业务逻辑增加，代码越来越多且复杂。

3. 作用：复用js, 简化js的编写, 提高js运行效率

### 4.2 组件

1. 理解：用来实现局部功能效的代码和资源的集合(html/css/js/image等等)

2. 为什么要用组件： 一个界面的功能更复杂

3. 作用：复用编码, 简化项目编码, 提高运行效率

### 4.3 模块化

当应用的js都以模块来编写的, 这个应用就是一个模块化的应用

### 4.4 组件化

当应用是以多组件的方式实现, 这个应用就是一个组件化的应用

![5yRiLj.jpg](https://z3.ax1x.com/2021/10/21/5yRiLj.jpg)
