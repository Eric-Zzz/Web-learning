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