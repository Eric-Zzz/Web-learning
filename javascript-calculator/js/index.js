var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var isOperator = /[x/+‑]/,
endsWithOperator = /[x+‑/]$/,
clearStyle = { background: '#ac3939' },
operatorStyle = { background: '#666666' },
equalsStyle = {
  background: '#004466',
  position: 'absolute',
  height: 130,
  bottom: 5 };var


Calculator = function (_React$Component) {_inherits(Calculator, _React$Component);
  function Calculator(props) {_classCallCheck(this, Calculator);var _this = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this,
    props));
    _this.state = {
      currentVal: '0',
      prevVal: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: '' };

    _this.maxDigitWarning = _this.maxDigitWarning.bind(_this);
    _this.handleOperators = _this.handleOperators.bind(_this);
    _this.handleEvaluate = _this.handleEvaluate.bind(_this);
    _this.initialize = _this.initialize.bind(_this);
    _this.handleDecimal = _this.handleDecimal.bind(_this);
    _this.handleNumbers = _this.handleNumbers.bind(_this);return _this;
  }_createClass(Calculator, [{ key: 'maxDigitWarning', value: function maxDigitWarning()

    {var _this2 = this;
      this.setState({
        currentVal: 'Digit Limit Met',
        prevVal: this.state.currentVal });

      setTimeout(function () {return _this2.setState({ currentVal: _this2.state.prevVal });}, 1000);
    } }, { key: 'handleEvaluate', value: function handleEvaluate()

    {
      if (!this.state.currentVal.includes('Limit')) {
        var expression = this.state.formula;
        if (endsWithOperator.test(expression)) expression = expression.slice(0, -1);
        expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
        var answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
        this.setState({
          currentVal: answer.toString(),
          formula: expression.replace(/\*/g, '⋅').replace(/-/g, '‑') + '=' + answer,
          prevVal: answer,
          evaluated: true });

      }
    } }, { key: 'handleOperators', value: function handleOperators(

    e) {
      if (!this.state.currentVal.includes('Limit')) {
        this.setState({ currentVal: e.target.value, evaluated: false });
        if (this.state.formula.includes('=')) {
          this.setState({ formula: this.state.prevVal + e.target.value }); // comment 1
        } else {
          this.setState({ // comment 2
            prevVal: !isOperator.test(this.state.currentVal) ?
            this.state.formula :
            this.state.prevVal,
            formula: !isOperator.test(this.state.currentVal) ?
            this.state.formula += e.target.value :
            this.state.prevVal += e.target.value });

        }
      }
    } }, { key: 'handleNumbers', value: function handleNumbers(

    e) {
      if (!this.state.currentVal.includes('Limit')) {
        this.setState({ evaluated: false });
        if (this.state.currentVal.length > 21) {
          this.maxDigitWarning();
        } else if (this.state.evaluated === true) {
          this.setState({
            currentVal: e.target.value,
            formula: e.target.value != '0' ? e.target.value : '' });

        } else {
          this.setState({
            currentVal:
            this.state.currentVal == '0' ||
            isOperator.test(this.state.currentVal) ?
            e.target.value : this.state.currentVal + e.target.value,
            formula:
            this.state.currentVal == '0' && e.target.value == '0' ?
            this.state.formula :
            /([^.0-9]0)$/.test(this.state.formula) ?
            this.state.formula.slice(0, -1) + e.target.value :
            this.state.formula + e.target.value });

        }
      }
    } }, { key: 'handleDecimal', value: function handleDecimal()

    {
      if (this.state.evaluated === true) {
        this.setState({
          currentVal: '0.',
          formula: '0.',
          evaluated: false });
      } else if (!this.state.currentVal.includes('.') &&
      !this.state.currentVal.includes('Limit')) {
        this.setState({ evaluated: false });
        if (this.state.currentVal.length > 21) {
          this.maxDigitWarning();
        } else if (endsWithOperator.test(this.state.formula) ||
        this.state.currentVal == '0' && this.state.formula === '') {
          this.setState({
            currentVal: '0.',
            formula: this.state.formula + '0.' });

        } else {
          this.setState({
            currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
            formula: this.state.formula + '.' });

        }
      }
    } }, { key: 'initialize', value: function initialize()

    {
      this.setState({
        currentVal: '0',
        prevVal: '0',
        formula: '',
        currentSign: 'pos',
        lastClicked: '' });

    } }, { key: 'render', value: function render()

    {
      return (
        React.createElement('div', null,
          React.createElement('div', { className: 'calculator' },
            React.createElement(Formula, { formula: this.state.formula.replace(/x/g, '⋅') }),
            React.createElement(Output, { currentValue: this.state.currentVal }),
            React.createElement(Buttons, { evaluate: this.handleEvaluate,
              operators: this.handleOperators,
              initialize: this.initialize,
              decimal: this.handleDecimal,
              numbers: this.handleNumbers })),

          React.createElement('div', { className: 'author' }, ' Designed and Coded By ', React.createElement('br', null),
            React.createElement('a', { target: '_blank', href: 'https://www.freecodecamp.org/eric-zzz' }, 'EricZzz'))));





    } }]);return Calculator;}(React.Component);
;var

Buttons = function (_React$Component2) {_inherits(Buttons, _React$Component2);function Buttons() {_classCallCheck(this, Buttons);return _possibleConstructorReturn(this, (Buttons.__proto__ || Object.getPrototypeOf(Buttons)).apply(this, arguments));}_createClass(Buttons, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', null,
          React.createElement('button', { id: 'clear', value: 'AC', onClick: this.props.initialize, className: 'jumbo', style: clearStyle }, 'AC'),
          React.createElement('button', { id: 'divide', value: '/', onClick: this.props.operators, style: operatorStyle }, '/'),
          React.createElement('button', { id: 'multiply', value: 'x', onClick: this.props.operators, style: operatorStyle }, 'x'),
          React.createElement('button', { id: 'seven', value: '7', onClick: this.props.numbers }, '7'),
          React.createElement('button', { id: 'eight', value: '8', onClick: this.props.numbers }, '8'),
          React.createElement('button', { id: 'nine', value: '9', onClick: this.props.numbers }, '9'),
          React.createElement('button', { id: 'subtract', value: '\u2011', onClick: this.props.operators, style: operatorStyle }, '-'),
          React.createElement('button', { id: 'four', value: '4', onClick: this.props.numbers }, '4'),
          React.createElement('button', { id: 'five', value: '5', onClick: this.props.numbers }, '5'),
          React.createElement('button', { id: 'six', value: '6', onClick: this.props.numbers }, '6'),
          React.createElement('button', { id: 'add', value: '+', onClick: this.props.operators, style: operatorStyle }, '+'),
          React.createElement('button', { id: 'one', value: '1', onClick: this.props.numbers }, '1'),
          React.createElement('button', { id: 'two', value: '2', onClick: this.props.numbers }, '2'),
          React.createElement('button', { id: 'three', value: '3', onClick: this.props.numbers }, '3'),
          React.createElement('button', { id: 'zero', value: '0', onClick: this.props.numbers, className: 'jumbo' }, '0'),
          React.createElement('button', { id: 'decimal', value: '.', onClick: this.props.decimal }, '.'),
          React.createElement('button', { id: 'equals', value: '=', onClick: this.props.evaluate, style: equalsStyle }, '=')));


    } }]);return Buttons;}(React.Component);var


Output = function (_React$Component3) {_inherits(Output, _React$Component3);function Output() {_classCallCheck(this, Output);return _possibleConstructorReturn(this, (Output.__proto__ || Object.getPrototypeOf(Output)).apply(this, arguments));}_createClass(Output, [{ key: 'render', value: function render()
    {
      return React.createElement('div', { id: 'display', className: 'outputScreen' }, this.props.currentValue);
    } }]);return Output;}(React.Component);
;var

Formula = function (_React$Component4) {_inherits(Formula, _React$Component4);function Formula() {_classCallCheck(this, Formula);return _possibleConstructorReturn(this, (Formula.__proto__ || Object.getPrototypeOf(Formula)).apply(this, arguments));}_createClass(Formula, [{ key: 'render', value: function render()
    {
      return React.createElement('div', { className: 'formulaScreen' }, this.props.formula);
    } }]);return Formula;}(React.Component);
;

ReactDOM.render(React.createElement(Calculator, null), document.getElementById('app'));