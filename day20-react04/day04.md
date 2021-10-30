# 第2章：React面向组件编程

## 1. 组件基本理解和使用

## 1.1 组件

在 React 世界里，一切皆组件，我们写的 React 项目全部起源于组件。组件可以分为两类，一类是类（ Class ）组件，一类是函数（ Function ）组件。

### 1.2使用React开发者工具调试

![5yRQOJ.jpg](https://z3.ax1x.com/2021/10/21/5yRQOJ.jpg)

### 1.3 用函数定义组件

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

### 1.4 用类定义组件

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



## 2 组件实例三大核心属性1: state

### 2.1 什么是state

1. state是组件对象最重要的属性, 值是对象(可以包含多个key-value的组合)

2. 组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)，一句话就是说，用户的界面会随着状态的改变而改变。
3. state 只能在本组件中去初始化，并且 state 只能被本组件去修改和访问，不能被外部访问和修改，所以也可以说，state  是组件私有的。

### 2.2 效果

需求: 定义一个展示天气信息的组件

1. 默认展示天气炎热 或 凉爽

2. 点击文字切换天气

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





## 3. 组件实例三大核心属性2:props



### 3.1 理解

1. **props就是组件定义属性的集合,**它是组件对外的接口,由外部通过JSX属性传入设置(也就是从外部传递给内部组件的数据)
2. 每个组件对象都会有props(properties的简写)属性
3. 组件标签的所有属性都保存在props中

### 3.2 作用

1. 通过标签属性从组件外向组件内传递变化的数据,**外部世界(组件)就是通过prop来和组件进行对话数据传递的**

2. 注意: 组件内部不要修改props数据



### 3.3 效果

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



### 3.4 批量传递props

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



### 3.5 配置props限制

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



 ### 3.6 函数式组件使用props

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



 ## 4. 组件实例三大核心属性2:refs

### 4.1 效果

需求: 自定义组件, 功能说明如下:

1. 点击按钮, 提示第一个输入框中的值

2. 当第2个输入框失去焦点时, 提示这个输入框中的值

![5fwldI.png](https://z3.ax1x.com/2021/10/24/5fwldI.png)

 

### 4.2 字符串形式的refs

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

### 4.3 回调函数形式的ref

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

### 4.4 createRef的使用

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



## 5. 类式组件中构造器的说明

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



## 6. 事件处理

1. React底层并没有使用原生的DOM事件，而是采用了自定义事件（合成事件）。
2. React实现了一套高效的事件系统，包含：事件注册、事件存储、事件绑定、事件分发等全套逻辑。在原生DOM事件体系基础上有了很大的改进：减少了内存的消耗、且最大程度上解决了浏览器兼容性问题。
3. React中的事件都是通过事件委托的方式实现的。
4. React中通过onXxxx去绑定事件（注意大小写）
5. 可以通过event.target得到发生事件的DOM元素。

## 7. 收集表单数据

### 7.1 效果

需求: 定义一个包含表单的组件,输入用户名密码后, 点击登录提示输入信息

![54zbvR.png](https://z3.ax1x.com/2021/10/25/54zbvR.png)

### 7.2 包含表单的组件分类：**非受控组件**

非受控组件: 组件中输入类DOM的值，在使用时：是通过节点获取输入的，而不是从state中读取的。（现用现找节点取）

```html
<script type="text/babel">
    //定义组件
    class Login extends React.Component{
        render(){
            return(
                <form onSubmit={this.login}>
                	用户名 <input ref={c=>this.username=c} type="text"/>	
                	密码 <input ref={c=>this.password=c} type="password"/>	
                	<button>登录</button>
    			</form>
    		)
    	}
    	login = (e)=>{
        	e.preventDefault(); //阻止表单提交后跳转
        	const {username,password} = this
        	alert(`用户名是：${username.value}，密码是${password.value}`)
    	}
    }
    //渲染组件
    ReactDOM.render(<Login/>,document.getElementById('test'))
</script>
```



### 7.3 包含表单的组件分类：**受控组件**

```html
<script type="text/babel">
    //定义组件
    class Login extends React.Component{
        //状态中的数据在使用前最好进行初始化
        state = {
            username:'',
            password:'',
            // subjects:[], 
        }
        render(){
            return(
                <div>
                    <form onSubmit={this.login}>
                        用户名 <input onChange={this.saveUserName} type="text"/>	
                        密码 <input onChange={this.savePassword} type="password"/>	
                        <button>登录</button>
                    </form>
    				<button onClick={this.createSubjects}>生成一些学科</button>
                        <ul>
                        	{
                        		this.state.subjects.map((item,index)=>{
                            		return <li key={index}>{item}</li>
                        		})
                        	}
                        </ul> 
    			</div>
    		)
    	}

    	createSubjects = ()=>{
			this.setState({subjects:['前端','大数据','java']})
		} 

    	//用户名发生改变的回调
    	saveUserName = (e)=>{
        	this.setState({username:e.target.value}) //将用户名存入state
    	}

    	//密码发生改变的回调
    	savePassword = (e)=>{
        	this.setState({password:e.target.value}) //将密码存入state
    	}

        //登录按钮的回调
        login = (e)=>{
            e.preventDefault(); //阻止表单提交后跳转
            const {username,password} = this.state
            alert(`用户名是${username}，密码是${password}`)
        }
    }
    //渲染组件
    ReactDOM.render(<Login/>,document.getElementById('test'))
</script>
```



### 7.4 高阶函数和函数柯里化

- 高阶函数：如果有一个函数A，A符合下面2个规则中的任何一个，那么A函数就是高阶函数

  - 若A函数接收的参数是一个函数，那么A就可以称之为高阶函数；
  - 若A函数调用的返回值依然是一个函数，那么A就可以称之为高阶函数；
  - 常见的高阶函数：数组相关的方法、Promise、setTimeout、等等

- 函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数，最后统一处理的编码形式

  ```html
  <script type="text/babel">
  	//定义组件
  	class Login extends React.Component{
  		//状态中的数据在使用前最好进行初始化
  		state = {
  			username:'',
  			password:'',
  		}
  		render(){
  			return(
  				<form onSubmit={this.login}>
  					用户名 <input onChange={this.saveFormData('username')} type="text"/>
  					密码 <input onChange={this.saveFormData('password')} type="password"/>
  					<button>登录</button>
  				</form>
  			)
  		}
  
  		//saveFormData是程序员自己调的，saveFormData返回的那个函数是交给react作为回调的。
  		saveFormData = (str)=>{
  			return (e)=>{ 
  				console.log(str,e.target.value) 
  				this.setState({[str]:e.target.value})
  			}
  		}
  
  		//登录按钮的回调
  		login = (e)=>{
  			e.preventDefault(); //阻止表单提交后跳转
  			const {username,password} = this.state
  			alert(`用户名是${username}，密码是${password}`)
  		}
  	}
  	//渲染组件
  	ReactDOM.render(<Login/>,document.getElementById('test'))
  </script>
  ```



## 8. 组件的生命周期

### 8.1 理解

1. 组件从创建到死亡它会经历一些特定的阶段。

2. React组件中包含一系列勾子函数(生命周期回调函数), 会在特定的时刻调用。

3. 我们在定义组件时，会在特定的生命周期回调函数中，做特定的工作。

### 8.3 案例引入

需求:定义组件实现以下功能：

1. 让指定的文本做显示 / 隐藏的渐变动画

2. 从完全可见，到彻底消失，耗时2S

3. 点击“不活了”按钮从界面中卸载组件

![55mz3q.gif](https://z3.ax1x.com/2021/10/25/55mz3q.gif)



```html
<script type="text/babel">
	//定义组件
	class Demo extends React.Component{
		state = {opacity:1} //初始化状态

		render(){
			console.log('---render---')
			//从state中获取透明度
			const {opacity} = this.state
			return (
				<div>
					<h2 style={{opacity}}>分手了，怎么办？</h2>
					<button onClick={this.death}>不活了</button>
				</div>
			)
		}
				
		//组件完成挂载 ---- 只是在组件挂载完毕后执行一次
		componentDidMount(){
			console.log('---componentDidMount---')
			//开启定时器，更新透明度
			this.timer = setInterval(() => {
				let {opacity} = this.state //获取原来的透明度 
				opacity -= 0.1 //透明度减小
				if(opacity <= 0) opacity = 1 //重置透明度
				this.setState({opacity}) //更新state
			},200);
		}
				
		//组件将要卸载 ---- 只是在组件将要卸载时执行一次
		componentWillUnmount(){
			console.log('---componentWillUnmount---')
			clearInterval(this.timer)
		}

		//“不活了”按钮的回调
		death = ()=>{
			//卸载组件
			ReactDOM.unmountComponentAtNode(document.getElementById('test'))
		}
	}

	//渲染组件
	ReactDOM.render(<Demo/>,document.getElementById('test'))
</script>
```





### 8.3 生命周期流程图

![5TMhAf.jpg](https://z3.ax1x.com/2021/10/26/5TMhAf.jpg)

生命周期的三个阶段（旧）

1. 初始化阶段由ReactDOM.render()触发---初次渲染

   - constructor()
   - componentWillMount()
   - render()
   - componentDidMount()做初始化的事：开启定时器、发送ajax请求、订阅消息等等....

2. 更新阶段 由组件内部this.setSate()或父组件重新render触发

   - shouldComponentUpdate()
   - componentWillUpdate()
   - render()
   - componentDidUpdate()

3. 卸载组件 由ReactDOM.unmountComponentAtNode()触发

   - componentWillUnmount()做收尾的事：关闭定时器、取消订阅消息、关闭数据库连接、等等....

   ```html
   <script type="text/babel">
   	//生命周期回调函数 <=> 生命周期函数 <=> 生命周期钩子
   	//定义组件
   	class Demo extends React.Component{
   		constructor(){
   			console.log('---constructor---')
   			super()
   			this.state = {sum:0} //初始化状态
   		}
   
   		//组件将要挂载 ------ 只执行一次
   		componentWillMount(){
   			console.log('---componentWillMount---')
   		}
   
   		render(){
   			console.log('---render---')
   			return (
   				<div>	
   					<h1>当前求和为：{this.state.sum}</h1>
   					<button onClick={this.add}>+</button>
   					<button onClick={this.qiang}>点我强制更新</button>
       			</div>
   			)
   		}
   
   		//组件挂在完毕 ----- 只执行一次
   		componentDidMount(){
   			console.log('---componentDidMount---')
   		}
   
   		//控制组件更新的“阀门”
   		shouldComponentUpdate(){
   			console.log('---shouldComponentUpdate---')
   			return true
   		}
   
   		//组件将要更新
   		componentWillUpdate(){
   			console.log('---componentWillUpdate---')
   		}
   
   		//组件完成更新
   		componentDidUpdate(){
   			console.log('---componentDidUpdate---')
   		}
   
   		//事件的回调--程序员根据业务逻辑写的
   		add = ()=>{
   			const {sum} = this.state //获取原状态
   			this.setState({sum:sum+1}) //更新状态
   		}
   
   		//强制更新按钮的回调
   		qiang = ()=>{
   			this.forceUpdate()
   		}
   	}
   
   	//渲染组件
   	ReactDOM.render(<Demo/>,document.getElementById('test'))
   </script>
   ```

   

### 8.4 父组件render的流程

```html
<script type="text/babel">

class A extends React.Component{
		state = {car:'奥拓'}
		render(){
			return (
				<div className="a">
					<h3>我是A组件，我的座驾是：{this.state.car}</h3>
					<button onClick={this.changeCar}>赚钱了，换车</button>
					<B car={this.state.car}/>
				</div>
			)
		}
		changeCar = ()=>{
			this.setState({car:'奔驰'})
		}
	}

	class B extends React.Component{
		constructor(){
			console.log('---B---constructor')
			super()
		}

		componentWillMount(){
			console.log('---B---componentWillMount')
		}

		componentDidMount(){
			console.log('---B---componentDidMount')
		}

		shouldComponentUpdate(){
			console.log('---B---shouldComponentUpdate---')
			return false
		}
		//组件即将被传递props （第一次不算）
		componentWillReceiveProps(){
			console.log('---B---componentWillReceiveProps---')
		}
				
		componentWillUpdate(){
			console.log('---B---componentWillUpdate---')
		}

		componentDidUpdate(){
			console.log('---B---componentDidUpdate')
		}
								
		render(){
			console.log('---B---render')
			return (
				<div className="b">
					<h3>我是B组件，我父亲(A)给我的车是：{this.props.car}</h3>
				</div>
			)
		}
	}

			ReactDOM.render(<A/>,document.getElementById('test'))
		</script>
```



### 8.5 旧的声明周期前缀

```html
<script type="text/babel">
	//生命周期回调函数 <=> 生命周期函数 <=> 生命周期钩子
	//定义组件
	class Demo extends React.Component{
		constructor(){
			console.log('---constructor---')
			super()
			this.state = {sum:0} //初始化状态
		}

		//组件将要挂载 ------ 只执行一次
		UNSAFE_componentWillMount(){
			console.log('---componentWillMount---')
		}

		render(){
			console.log('---render---')
			return (
				<div>	
					<h1>当前求和为：{this.state.sum}</h1>
					<button onClick={this.add}>+</button>
					<button onClick={this.qiang}>点我强制更新</button>
				</div>
			)
		}

		//组件挂在完毕 ----- 只执行一次
		componentDidMount(){
			console.log('---componentDidMount---')
		}

		//控制组件更新的“阀门”
		shouldComponentUpdate(){
			console.log('---shouldComponentUpdate---')
			return true
		}

		//组件将要更新
		UNSAFE_componentWillUpdate(){
			console.log('---componentWillUpdate---')
		}

		//组件完成更新
		componentDidUpdate(){
			console.log('---componentDidUpdate---')
		}
				
		UNSAFE_componentWillReceiveProps(){

		}

		componentWillUnmount(){
					
		}

		//事件的回调--程序员根据业务逻辑写的
		add = ()=>{
			const {sum} = this.state //获取原状态
			this.setState({sum:sum+1}) //更新状态
		}
				
		//强制更新按钮的回调
		qiang = ()=>{
			this.forceUpdate()
		}
	}

	//渲染组件
	ReactDOM.render(<Demo/>,document.getElementById('test'))
</script>
```



### 8.6 生命周期流程图

![5TMvNT.jpg](https://z3.ax1x.com/2021/10/26/5TMvNT.jpg)

生命周期的三个阶段（新）

1. 初始化阶段, 由ReactDOM.render()触发---初次渲染

   - constructor()
   - getDerivedStateFromProps 
   - render()
   - componentDidMount()

2. 由组件内部this.setSate()或父组件重新render触发

   - ***\*getDerivedStateFromProps\****
   - shouldComponentUpdate()
   - render()
   - ***\*getSnapshotBeforeUpdate\****
   - componentDidUpdate()

  3. 卸载组件 由ReactDOM.unmountComponentAtNode()触发

     - componentWillUnmount()

4. ***\*getDerivedStateFromProps\****钩子的作用

   粗略的说（官网）：state 的值在任何时候都取决于 props

   详细的说：

   1. 可以完成：直接复制 props 到 state 上；

    	2. 可以完成：经过一些逻辑比较了props和state，然后决定是否去更新state

   ```html
   <script type="text/babel">
   			
   	class Demo extends React.Component{
   
   		constructor(props){
   			console.log('---constructor---')
   			super(props)
   			this.state = {sum:50}
   		}
   
   		render(){
   			console.log('---render---')
   			return (
   				<div>
   					<h2>当前求和为：{this.state.sum}</h2>
   					<button onClick={this.add}>+</button>
   				</div>
   			)
   		}
   
   		componentDidMount(){
   			console.log('---componentDidMount---')
   		}
   
   		static getDerivedStateFromProps(props,state){
   			console.log('---getDerivedStateFromProps---',props,state)
   			const {n} = props
   			const {sum} = state
   			if(sum+n === 250) return {sum:0}
   			else return null
   		}
   
   		add = ()=>{
   			const {sum} = this.state
   			this.setState({sum:sum+1})
   		}
   	}
   
   	ReactDOM.render(<Demo n={200}/>,document.getElementById('test'))
   </script>
   ```

5. **getSnapshotBeforeUpdate**钩子的作用

   `getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息

   ```html
   <script type="text/babel">
   	class Demo extends React.Component{
   
   		constructor(props){
   			console.log('---constructor---')
   			super(props)
   			this.state = {sum:0}
   		}
   
   		render(){
   			console.log('---render---')
   			return (
   				<div>
   					<h2>当前求和为：{this.state.sum}</h2>
   					<h3 ref="title">当前求和+1-3*100后的结果是：{(this.state.sum+1-3)*100}</h3>
   					<button onClick={this.add}>+</button>
   				</div>
   			)
   		}
   
   		getSnapshotBeforeUpdate(){
   			const title = this.refs.title
   			console.log('---getSnapshotBeforeUpdate--',title.innerText)
   			return title.innerText
   		}
   
   		componentDidUpdate(preProps,preState,x){
   			const title = this.refs.title
   			console.log('---componentDidUpdate---',preProps,preState,x,title.innerText)
   		}
   
   		add = ()=>{
   			const {sum} = this.state
   			this.setState({sum:sum+1})
   		}
   	}
   
   	ReactDOM.render(<Demo x="尚硅谷"/>,document.getElementById('test'))
    </script>
   ```

6. **getSnapshotBeforeUpdate**钩子的应用场景

   ```html
   <script type="text/babel">
   	class Demo extends React.Component{
   		state = {
   			// newsArr:['新闻7','新闻6','新闻5','新闻4','新闻3','新闻2','新闻1']
   			newsArr:[]
   		}
   
   		componentDidMount(){
   			setInterval(() => {
   				//获取原来的新闻
   				const {newsArr} = this.state
   				//更新新闻
   				this.setState({
   					newsArr:['新闻'+(newsArr.length+1),...newsArr]
   				})
   			},1000);
   		}
   
   		getSnapshotBeforeUpdate(){
   			return this.refs.list.scrollHeight
   		}
   
   		componentDidUpdate(_,__,snapValue){
   			const x = this.refs.list.scrollHeight - snapValue
   			if(this.refs.list.scrollTop >= 30) this.refs.list.scrollTop += x
   		}
   
   		render(){
   			return (
   				<div className="list" ref="list">
   					{
   						this.state.newsArr.map((n,index)=>{
   							return <div className="news" key={index}>{n}</div>
   						})
   					}
   				</div>
   			)
   		}
   	}
   
   	ReactDOM.render(<Demo/>,document.getElementById('test'))
   </script>
   ```

   



## 9. 虚拟DOM与DOM Diffing算法

### 9.1 效果

需求：验证虚拟DOM Diffing算法的存在

![5OKhm4.png](https://z3.ax1x.com/2021/10/28/5OKhm4.png)

### 9.2 基本原理图

 

![5OMP9P.jpg](https://z3.ax1x.com/2021/10/28/5OMP9P.jpg)

### 9.3 经典面试题

1. react/vue中的key有什么作用？（key的内部原理是什么？）

   - 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。

   - 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】, 随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：

     - a. 旧虚拟DOM中找到了与新虚拟DOM相同的key：

        (1).若虚拟DOM中内容没变, 直接使用之前的真实DOM

        (2).若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM

     - b. 旧虚拟DOM中未找到与新虚拟DOM相同的key

       根据数据创建新的真实DOM，随后渲染到到页面

     

2. 为什么遍历列表时，key最好不要用index?

   - 若对数据进行：逆序添加、逆序删除等破坏顺序操作:会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
   -  如果结构中还包含输入类的DOM：会产生错误DOM更新 ==> 界面有问题。
   - 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。
   - 开发中如何选择key?:
     - 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
     - 如果确定只是简单的展示数据，用index也是可以的。