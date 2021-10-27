# 面向组件编程

## 1 模块与组件

### 1.1 模块

1. 理解：向外提供特定功能的JS程序, 一般就是一个JS文件

2. 为什么要拆成模块：随着业务逻辑增加，代码越来越多且复杂。

3. 作用：复用JS, 简化JS的编写, 提高JS运行效率

### 1.2 组件

1. 理解：用来实现局部功能效的代码和资源的集合(html/css/JS/image等等)

2. 为什么要用组件： 一个界面的功能复杂

3. 作用：复用编码, 简化项目编码, 提高运行效率

### 1.3 模块化

当应用的JS都以模块来编写的, 这个应用就是一个模块化的应用

### 1.4 组件化

当应用是以多组件的方式实现, 这个应用就是一个组件化的应用

![5yRiLj.jpg](https://z3.ax1x.com/2021/10/21/5yRiLj.jpg)

## 2. 组件基本理解和使用

### 2.1 组件

在 React 世界里，一切皆组件，我们写的 React 项目全部起源于组件。组件可以分为两类，一类是类（ Class ）组件，一类是函数（ Function ）组件。

### 2.2使用React开发者工具调试

![5yRQOJ.jpg](https://z3.ax1x.com/2021/10/21/5yRQOJ.jpg)

### 2.3 用函数定义组件

- 一个函数就是一个组件，return一份虚拟DOM节点

- 特点： 
  - 1.会被更新并挂载，但是没有生命周期函数 
  - 2.没有this(组件实例） 
  - 3.没有内部状态（state） 
- 优点 ：轻量，如果你的组件没有涉及到内部状态，只是用来渲染数据，那么就用函数式组件，性能较好。



```html
<!-- 准备一个容器 -->
<div id="test"></div>

<script type="text/babel">
	//1.使用函数定义一个组件
	function Hello(){
		console.log(this) //严重注意：此处的this是undefined，因为babel编译后开启了严格模式。
		return <h2>我是用函数定义的组件，（适用于：【简单组件】的定义）</h2>
	}

	//2.渲染组件到页面
	ReactDOM.render(<Hello/>,document.getElementById('test'))

	/* 
		执行了ReactDOM.render(<Hello/>.........后发生了什么？
			第一步：React发现了<Hello/>标签，寻找Hello组件定义的位置。
				(1).若找到了，则进行第二步
				(2).若未找到，则报错 Hello is not defined
			第二步：React发现Hello组件使用函数定义的，React去调用Hello，将返回的虚拟DOM结构渲染到页面。
			备注：
				所谓简单组件就是：没有状态的组件。
				所谓的复杂组件就是：有状态的组件。
				什么是状态呢？———— 后续章节会详细聊			
	*/

</script>
```

### 2.4 用类定义组件

通常情况下，我们会使用ES6的`class`关键字来创建React组件

```html
<!-- 准备一个容器 -->
<div id="test"></div>

<script type="text/babel">
	//使用ES6中的class定义一个组件
	class Hello extends React.Component{
		//render方法放在哪里的？ —— Hello的原型对象上，供实例去使用
		//render中的this是谁？ —— Hello类的实例对象 <=> Hello的实例对象 <=> Hello组件实例
		render(){
			console.log(this)//render中的this是Hello类的实例对象
			return <h2>我是用类定义的组件，适用于：【复杂组件的定义】</h2>
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Hello/>,document.getElementById('test')
	/* 
		执行了ReactDOM.render(<Hello/>.........后发生了什么？
		第一步：React解析组件标签，寻找Hello组件：
			(1).若找到了，则进行第二步
			(1).若未找到，则报错 Hello is not defined
		第二步：发现Hello组件是用类定义的，随后React帮我们new了一个Hello组件的实例：h
			并通过h调用到了Hello原型上的render方法，即：h.render()
			备注：此处的h只是我们分析问题时候的一个代号，React底层用的肯定不是h，是其他名
			第三步：将render调用返回的虚拟DOM渲染到页面

	*/

</script>
```



## 3 组件实例三大核心属性1: state

### 3.1 什么是state

1. state是组件对象最重要的属性, 值是对象(可以包含多个key-value的组合)

2. 组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)，一句话就是说，用户的界面会随着状态的改变而改变。
3. state 只能在本组件中去初始化，并且 state 只能被本组件去修改和访问，不能被外部访问和修改，所以也可以说，state  是组件私有的。

### 3.2 state使用

需求: 定义一个展示天气信息的组件

1. 默认展示天气炎热 或 凉爽
2. 点击文字切换天气

#### 3.2.2 state的基础使用

```html
//1.初始化state
<!-- 准备好一个容器 -->
<div id="test"></div>

<script type="text/babel">
	//定义组件
	class Weather extends React.Component{
		constructor(props){
			super(props)
			//初始化state，要求：state必须为一个对象
			this.state = {isHot:false,wind:'微风'} 
		}
		render(){
			return (
				<div>
					<h2>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h2>
    			</div>
			)
		}
	}
	//渲染组件
	ReactDOM.render(<Weather/>,document.getElementById('test'))
</script>
```



#### 3.2.2 react绑定事件写法

```html
//2.react绑定事件的写法
<!-- 准备好一个容器 -->
<div id="test"></div>

<script type="text/babel">
	//定义组件
	class Weather extends React.Component{
		constructor(props){
			super(props)
			//初始化state，要求：state必须为一个对象
			this.state = {isHot:false,wind:'微风'} 
		}
		render(){
			return (
				<div>
					<h2 onClick={demo}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h2>
    			</div>
			)
		}
	}
	function demo(){
		alert("hello")
	}
	//渲染组件
	ReactDOM.render(<Weather/>,document.getElementById('test'))
</script>
```



#### 3.2.3 修改state属性的值

```html
//3. react绑定事件函数的写法 及 修改state属性的值
<script type="text/babel">
	//定义组件
	class Weather extends React.Component{
		constructor(props){//构造器调用几次？ —————— 1次
			super(props)
			//下面这行是为了解决changeWeather中this指向的问题
			this.gaiTianQi = this.changeWeather.bind(this)
		}
		render(){//render调几次？———————— 1+n次，1是初始化那次，n是state改变的次数。
			return (
				<div>
					<h2 onClick={this.gaiTianQi}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h2>
    </div>
			)
		}
				
		//changeWeather放在哪里？———— Weather的原型上，通过实例可以看见
		//changeWeather中的this是谁？———— 通过Weather的实例调用，那么changeWeather中的this就是Weather的实例
		//类式组件中的方法如果做事件回调去使用，this是undefined
		//改变天气的回调
		changeWeather(){ //changeWeather调用几次？ —————— 点几次调几次
			//state中的数据不可以直接修改，下面这行就是直接修改
			// this.state.isHot = true

			//获取原状态
			const {isHot} = this.state
			//修改state一定要调用setState这个方法去修改
			this.setState({isHot:!isHot}) //setState做了两件事：1.改变state 2.重新调用了一次render
		}
	}
	//渲染组件
	ReactDOM.render(<Weather/>,document.getElementById('test'))
</script>
```

#### 3.2.4 state的简写模式

```html
//state的简写方式
<script type="text/babel">
	/* 
		1.在开发中，初始化state一般直接使用： state = {}
		2.在开发中，把类中所有事件回调的函数，都写成箭头函数，且直接放在组件实例自身。
	*/
	class Weather extends React.Component{
		//初始化状态
		state = {isHot:true}

		render(){
			console.log(this)
			return <h2 onClick={this.changeWeather}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h2>
		}

		changeWeather = ()=>{
			const {isHot} = this.state
			this.setState({isHot:!isHot})
		}
	}

	// console.dir(Weather)

	ReactDOM.render(<Weather/>,document.getElementById('test'))
	ReactDOM.render(<Weather/>,document.getElementById('test2'))
</script>
```



## 4. 组件实例三大核心属性2:props



### 4.1 理解

1. **props就是组件定义属性的集合,**它是组件对外的接口,由外部通过JSX属性传入设置(也就是从外部传递给内部组件的数据)
2. 每个组件对象都会有props(properties的简写)属性
3. 组件标签的所有属性都保存在props中

### 4.2 作用

1. 通过标签属性从组件外向组件内传递变化的数据,**外部世界(组件)就是通过prop来和组件进行对话数据传递的**

2. 注意: 组件内部不要修改props数据



### 4.3 效果

需求: 自定义用来显示一个人员信息的组件

1. 姓名必须指定，且为字符串类型；

2. 性别为字符串类型，如果性别没有指定，默认为男

3. 年龄为字符串类型，且为数字类型，默认值为18

![5Wo8aV.jpg](https://z3.ax1x.com/2021/10/24/5Wo8aV.jpg)



```html
//props的基础使用
<!-- 准备好一个容器 -->
<div id="test"></div>
<div id="test2"></div>

<script type="text/babel">
	//定义Person组件
	class Person extends React.Component{
		render(){
			console.log(this)
			const {name,age,sex} = this.props
			//思考：如果想要在每一个名字后添加一个感叹号该如何去做？
			// this.props.name = this.props.name + '!' //改行代码会引起报错，因为props是只读的
			//name+=! //可以使用
			return (
				<ul>
					<li>姓名：{name}</li>	
					<li>性别：{sex}</li>	
					<li>年龄：{age}</li>	
    			</ul>
			)
		}
	}
	//渲染组件
	ReactDOM.render(<Person name="老刘" age="18" sex="男"/>,document.getElementById('test'))
	ReactDOM.render(<Person name="老王" age="19" sex="女"/>,document.getElementById('test2'))
</script>
```



### 4.4 批量传递props

```html
<script type="text/babel">
	//定义Person组件
	class Person extends React.Component{
		render(){
			console.log(this)
			const {name,age,sex,address,car} = this.props
			return (
				<ul>
					<li>姓名：{name}</li>	
					<li>性别：{sex}</li>	
					<li>年龄：{age}</li>	
					<li>住址：{address}</li>	
					<li>座驾：{car}</li>	
    			</ul>
			)
		}
	}

	let p1 = {
		name:'laowang',
		age:18,
		sex:'女',
		address:'中铁七局',
		car:'奔驰c63'
	}


	//渲染组件
	// ReactDOM.render(<Person name={p1.name} age={p1.age} sex={p1.sex} address={p1.address} car={p1.car}/>,document.getElementById('test'))

	//批量传递props
	//正常情况下...obj是会报错的，但是react+babel就可以完成...obj，且仅仅适用于标签属性的传递
	ReactDOM.render(<Person {...p1}/>,document.getElementById('test'))
```



### 4.5 配置props限制

```html
<script type="text/babel">
    //定义Person组件
    class Person extends React.Component{
        //限制props的类型以及必要性
        static propTypes = {
            name:PropTypes.string.isRequired, //name必须传且为字符串
            age:PropTypes.number.isRequired,//age必须传且为数值
            sex:PropTypes.string.isRequired,//sex必须传且为字符串
            address:PropTypes.string //address可传可不传，但是传必须是字符串
        }

    	//给props指定默认值，注意：可传可不传的属性，才需要配置默认值
    	static defaultProps = {
        	address:'火星'
    	}

        render(){
            const {name,age,sex,address} = this.props
            return (
                <ul>
                	<li>姓名：{name}</li>	
        			<li>性别：{sex}</li>	
        			<li>年龄：{age+1}</li>	
        			<li>住址：{address}</li>	
        		</ul>
        	)
        }
    }

    let p1 = {
        name:'老刘',
        age:18,
        sex:'女',
        address:'我心里'
    }
    ReactDOM.render(<Person {...p1}/>,document.getElementById('test'))

    ReactDOM.render(<Person name="老王" age={19} sex="男"/>,document.getElementById('test2'))
</script>
```



 ### 4.6 函数式组件使用props

```html
<script type="text/babel">

    function Person(props){
        const {name,sex,age,address} = props
        return (
            <ul>
                <li>姓名：{name}</li>	
                <li>性别：{sex}</li>	
                <li>年龄：{age}</li>	
                <li>住址：{address}</li>	
            </ul>
        )
    }

    //限制props的类型以及必要性
    Person.propTypes = {
        name:PropTypes.string.isRequired, //name必须传且为字符串
        age:PropTypes.number.isRequired,//age必须传且为数值
        sex:PropTypes.string.isRequired,//sex必须传且为字符串
        address:PropTypes.string //address可传可不传，但是传必须是字符串
    }

    //给props指定默认值，注意：可传可不传的属性，才需要配置默认值
    Person.defaultProps = {
        address:'火星'
    }

    let p1 = {
        name:'老刘',
        age:18,
        sex:'女',
        address:'我心里'
    }
    ReactDOM.render(<Person {...p1}/>,document.getElementById('test'))

</script>
```



 ## 5. 组件实例三大核心属性2:refs

### 5.1 效果

需求: 自定义组件, 功能说明如下:

1. 点击按钮, 提示第一个输入框中的值

2. 当第2个输入框失去焦点时, 提示这个输入框中的值

![5fwldI.png](https://z3.ax1x.com/2021/10/24/5fwldI.png)

 

### 5.2 字符串形式的refs

```html
<script type="text/babel">
    //定义组件
    class Demo extends React.Component{
        render(){
            return (
                <div>	
                	<input ref="userinput" type="text"/>&nbsp;
                	<button onClick={this.showData}>点我提示左侧数据</button>&nbsp;
    				<input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
    			</div>
    		)
    	}
    	showData = ()=>{
     	   // console.log(this)
    	    alert(this.refs.userinput.value)
   	 	}

    	showData2 = (event)=>{
        	const {target} = event
        	alert(target.value)
    	}
    }
    //渲染组件
    ReactDOM.render(<Demo/>,document.getElementById('test'))
</script>
```

### 5.3 回调函数形式的ref

```html
<script type="text/babel">
	//定义组件
	class Demo extends React.Component{
		render(){
			return (
				<div>	
					<input ref={ c => this.userinput = c } type="text"/>&nbsp;
					<button onClick={this.showData}>点我提示左侧数据</button>&nbsp;
					<input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
   				 </div>
			)
		}
		showData = ()=>{
			alert(this.userinput.value)
		}
		showData2 = (event)=>{
			const {target} = event
			alert(target.value)
		}
	}
	//渲染组件
	ReactDOM.render(<Demo/>,document.getElementById('test'))
</script>
```

### 5.4 createRef的使用

```html
<script type="text/babel">
    //定义组件
    class Demo extends React.Component{
        //创建一个承装被ref所标记节点的容器——该容器是专人专用的（只能存一个）
        userInput = React.createRef()
    	btn = React.createRef()
   	 	render(){
        	return (
            	<div>	
            		<input ref={this.userInput} type="text"/>&nbsp;
    				<button ref={this.btn} onClick={this.showData}>点我提示左侧数据</button>&nbsp;
    				<input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
    			</div>
    		)
    	}
    	showData = ()=>{
             // const {current:{value:x}} = this.userInput //解构赋值+重命名
        	alert(this.userInput.current.value)
    	}
    	showData2 = (event)=>{
        	const {target} = event
        	alert(target.value)
    	}
    }
    //渲染组件
    ReactDOM.render(<Demo/>,document.getElementById('test'))
</script>
```



## 6. 类式组件中构造器的说明

1. 一般在开发中我们从来不写构造器，因为原本需要在构造器中完成的如下两个任务：

​                  (1).通过给 this.state 赋值对象来初始化内部 state

​                  (2).解决事件处理函数中this的问题

​              均可以通过如下两个方式搞定：

​                  (1).state = {}完成初始化state

​                  (2).changeWeather = ()=>{} 解决this指向问题



2. 如果写了构造器，那么构造器中必调用super，调用super时传不传入props呢？

​                  (1).如果传递，在super语句之后，可以通过this.props正常获取props

​                  (2).如果不传递，在构造器中this.props是undefined。（此场景几乎开发中不出现）



```html
<script type="text/babel">
	//定义组件
	class Weather extends React.Component{
		constructor(props){
			// console.log('constructor',props)
			super(props)
			console.log('%%%',this.props)
			this.state = {isHot:true}
		}

		render(){
			return (
				<div>
					<h2>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h2>
					<h4>我收到了一个人的信息：{this.props.name}--{this.props.age}</h4>
					<button onClick={this.changeWeather}>切换天气</button>
				</div>
			)
		}

		changeWeather = ()=>{
			//获取原来的isHot值
			const {isHot} = this.state
			//更新状态
			this.setState({isHot:!isHot})
		}
	}

	//渲染组件
	ReactDOM.render(<Weather name="老刘" age={18}/>,document.getElementById('test'))
</script>
```



## 7. 事件处理

1. React底层并没有使用原生的DOM事件，而是采用了自定义事件（合成事件）。
2. React实现了一套高效的事件系统，包含：事件注册、事件存储、事件绑定、事件分发等全套逻辑。在原生DOM事件体系基础上有了很大的改进：减少了内存的消耗、且最大程度上解决了浏览器兼容性问题。
3. React中的事件都是通过事件委托的方式实现的。
4. React中通过onXxxx去绑定事件（注意大小写）
5. 可以通过event.target得到发生事件的DOM元素。