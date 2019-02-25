#React 知识总结

### JSX 
JSX 语法是 React 的一大特色，允许 HTML 和 JavaScript 的混写。
JSX 用来声明 React 当中的元素。
```
    const element = <h1>Hello, world!</h1>;
    
    const user = {
      firstName: 'Harper',
      lastName: 'Perez'
    };
```
---

####JSX 属性
可以使用引号来定义以字符串为值的属性。
```
    const element = <div tabIndex="0"></div>;
```
可以使用大括号来定义以 JavaScript 表达式为值的属性。
```
    const element = <img src={user.avatarUrl} />;
```
---
####JSX 嵌套
JSX 标签同样可以相互嵌套。
如果 JSX 标签是闭合式的，那么你需要在结尾处用 />, 就好像 XML/HTML 一样.
```
    const element = <img src={user.avatarUrl} />;
```
---
####警告:
因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。

例如，class 变成了 className，而 tabindex 则对应着 tabIndex。

----
###元素渲染
React 只会更新必要的部分
React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。
----
###组件 & Props
组件可以将UI切分成一些独立的、可复用的部件，这样你就只需专注于构建每一个单独的部件。

组件从概念上看就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素。

---
####函数定义/类定义组件
定义一个组件最简单的方式是使用JavaScript函数：
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
---
####警告:

组件名称必须以大写字母开头。

例如，\<div /> 表示一个DOM标签，但 <Welcome /> 表示一个组件，并且在使用该组件时你必须定义或引入它。

组件的返回值只能有一个根元素。这也是我们要用一个\<div>来包裹所有\<Welcome />元素的原因。

----
####Props的只读性
无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。
纯函数（不改变数据）：
```
function sum(a, b) {
  return a + b;
}
```
非纯函数，它会改变它自身的输入值：
```$xslt
function withdraw(account, amount) {
  account.total -= amount;
}
```
**所有的React组件必须像纯函数那样使用它们的props。**

---
###State & 生命周期
状态与属性十分相似，但是状态是私有的，完全受控于当前组件。

我们之前提到过，定义为类的组件有一些额外的特性。局部状态就是如此：只能用于类的一个功能。

---
####将函数转换为类 为一个类添加局部状态
```$xslt
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
render()必须有。
组件的返回值只能有一个根元素。需要用\<div>\</div>包起来。
类组件应始终使用props调用基础构造函数。

---
####将生命周期方法添加到类中
![生命周期](./生命周期.jpg )
#####初始化:
```
getDefaultProps()
```
设置默认的props，也可以用dufaultProps设置组件的默认属性.
```$xslt
getInitialState()
```
在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props
```$xslt
componentWillMount()
```
组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。
```$xslt
render()
```
react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。
```$xslt
componentDidMount()
```
组件渲染之后调用，只调用一次。
#####更新:
```$xslt
componentWillReceiveProps(nextProps)
```
组件初始化时不调用，组件接受新的props时调用。
```$xslt
shouldComponentUpdate(nextProps, nextState)
```
react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候
```$xslt
componentWillUpdata(nextProps, nextState)
```
组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state
```$xslt
render()
```
组件渲染
```$xslt
componentDidUpdate()
```
组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。
#####卸载:
```$xslt
componentWillUnmount()
```
组件将要卸载时调用，一些事件监听和定时器需要在此时清除。

----
###正确地使用状态
关于 setState() 这里有三件事情需要知道
####不要直接更新状态
```$xslt
// Wrong
this.state.comment = 'Hello';
```
此代码不会重新渲染组件,应当使用 setState():
```$xslt
// Correct
this.setState({comment: 'Hello'});
```
构造函数是唯一能够初始化 this.state 的地方。
####状态更新可能是异步的
React 可以将多个setState() 调用合并成一个调用来提高性能。

因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。
例如，此代码可能无法更新计数器：
```$xslt
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
要修复它，请使用第二种形式的 setState() 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数
```$xslt
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
```$xslt
// Correct
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```
####状态更新合并
当你调用 setState() 时，React 将你提供的对象合并到当前状态。

例如，你的状态可能包含一些独立的变量：
```$xslt
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```
你可以调用 setState() 独立地更新它们：
```$xslt
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```
这里的合并是浅合并，也就是说this.setState({comments})完整保留了this.state.posts，但完全替换了this.state.comments。

----
###数据自顶向下流动
父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。

这就是为什么状态通常被称为局部或封装。 除了拥有并设置它的组件外，其它组件不可访问。

组件可以选择将其状态作为属性传递给其子组件：
```$xslt
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```
这也适用于用户定义的组件：
```$xslt
<FormattedDate date={this.state.date} />
```
FormattedDate 组件将在其属性中接收到 date 值，并且不知道它是来自 Clock 状态、还是来自 Clock 的属性、亦或手工输入：
```$xslt
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```
这通常被称为自顶向下或单向数据流。 任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。

如果你想象一个组件树作为属性的瀑布，每个组件的状态就像一个额外的水源，它连接在一个任意点，但也流下来。

---
###事件处理
React 元素的事件处理和 DOM元素的很相似。但是有一点语法上的不同:

1. React事件绑定属性的命名采用驼峰式写法，而不是小写。
2. 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)

传统的 HTML：
```$xslt
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
React 中稍稍有点不同：
```$xslt
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault。例如，传统的 HTML 中阻止链接默认打开一个新页面，你可以这样写：
```$xslt
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```
在 React，应该这样来写：
```$xslt
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
在这里，e 是一个合成事件。使用 React 的时候通常你不需要使用 addEventListener 为一个已创建的 DOM 元素添加监听器。你仅仅需要在这个元素初始渲染的时候提供一个监听器。
当你使用 ES6 class 语法来定义一个组件的时候，事件处理器会成为类的一个方法。例如，下面的 Toggle 组件渲染一个让用户切换开关状态的按钮：
    
```$xslt
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```          
你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。

这并不是 React 的特殊行为；它是函数如何在 JavaScript 中运行的一部分。通常情况下，如果你没有在方法后面添加 () ，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。

如果使用 bind 让你很烦，这里有两种方式可以解决。如果你正在使用实验性的属性初始化器语法，你可以使用属性初始化器来正确的绑定回调函数：
```$xslt
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```
这个语法在 Create React App 中默认开启。

如果你没有使用属性初始化器语法，你可以在回调函数中使用 箭头函数：
```$xslt
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```
使用这个语法有个问题就是每次 LoggingButton 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。

---
###向事件处理程序传递参数

通常我们会为事件处理程序传递额外的参数。例如，若是 id 是你要删除那一行的 id，以下两种方式都可以向事件处理程序传递参数：
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
上述两种方式是等价的，分别通过 arrow functions 和 Function.prototype.bind 来为事件处理函数传递参数。

上面两个例子中，参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面，例如:
```$xslt
class Popper extends React.Component{
    constructor(){
        super();
        this.state = {name:'Hello world!'};
    }
    
    preventPop(name, e){    //事件对象e要放在最后
        e.preventDefault();
        alert(name);
    }
    
    render(){
        return (
            <div>
                <p>hello</p>
                {/* Pass params via bind() method. */}
                <a href="https://reactjs.org" onClick={this.preventPop.bind(this,this.state.name)}>Click</a>
            </div>
        );
    }
}
```
----
###条件渲染
在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后还可以根据应用的状态变化只渲染其中的一部分。

React 中的条件渲染和 JavaScript 中的一致，使用 JavaScript 操作符 if 或条件运算符来创建表示当前状态的元素，然后让 React 根据它们来更新 UI。

先来看两个组件:
```$xslt
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```
我们将创建一个 Greeting 组件，它会根据用户是否登录来显示其中之一：
```$xslt
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```
此示例根据 isLoggedIn 的值渲染不同的问候语。

---

###元素变量

你可以使用变量来储存元素。它可以帮助你有条件的渲染组件的一部分，而输出的其他部分不会更改。

再来看两个新组件分别代表注销和登录：
```$xslt
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

在下面的例子中，我们将要创建一个名为 LoginControl 的有状态的组件。

它会根据当前的状态来渲染 \<LoginButton /> 或 \<LogoutButton />，它也将渲染前面例子中的 \<Greeting />。
```$xslt
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```
---
声明变量并使用 if 语句是条件渲染组件的不错的方式，但有时你也想使用更简洁的语法，在 JSX 中有如下几种方法。


###与运算符 &&
你可以通过用花括号包裹代码在 JSX 中嵌入任何表达式 ，也包括 JavaScript 的逻辑与 &&，它可以方便地条件渲染一个元素。

```$xslt
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```
之所以能这样做，是因为在 JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。

因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。

---
###三目运算符
条件渲染的另一种方法是使用 JavaScript 的条件运算符 condition ? true : false。

在下面的例子中，我们用它来有条件的渲染一小段文本。
```$xslt
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```
同样它也可以用在较大的表达式中，虽然不太直观：

```$xslt
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

---
###阻止组件渲染
在极少数情况下，你可能希望隐藏组件，即使它被其他组件渲染。让 render 方法返回 null 而不是它的渲染结果即可实现。

在下面的例子中，\<WarningBanner /> 根据属性 warn 的值条件渲染。如果 warn 的值是 false，则组件不会渲染：
```$xslt
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```
组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用。

---
###列表 & Keys

如下代码，我们使用map()函数让数组中的每一项翻倍,我们得到了一个新的数列doubled
```$xslt
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

代码打印出[2, 4, 6, 8, 10]

在React中，把数组转化为数列元素的过程是相似的

---
###渲染多个组件

你可以通过使用{}在JSX内构建一个元素集合

下面，我们使用Javascript中的map()方法遍历numbers数组。对数组中的每个元素返回<li>标签，最后我们得到一个数组listItems

```$xslt
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

我们把整个listItems插入到ul元素中，然后渲染进DOM:

```$xslt
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

这段代码生成了一个1到5的数字列表

---
####基础列表组件
通常你需要渲染一个列表到组件中

我们可以把前面的例子重构成一个组件。这个组件接收numbers数组作为参数，输出一个无序列表。
```$xslt
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
当我们运行这段代码，将会看到一个警告 a key should be provided for list items ，意思是当你创建一个元素时，必须包括一个特殊的 key 属性。

让我们来给每个列表元素分配一个 key 来解决上面的那个警告：
```$xslt
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

---
####Keys
Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。
```$xslt
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```
一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的id作为元素的key:
```$xslt
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```
当元素没有确定的id时，你可以使用他的序列号索引index作为key
```$xslt
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```
如果列表项目的顺序可能会变化，我们不建议使用索引来用作键值，因为这样做会导致性能的负面影响，还可能引起组件状态问题。如果你想要了解更多，请点击深度解析key的必要性。如果你选择不指定显式的键值，那么React将默认使用索引用作为列表项目的键值。

---