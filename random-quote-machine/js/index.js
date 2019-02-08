var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];var

AppWrapper = function (_React$Component) {_inherits(AppWrapper, _React$Component);
  function AppWrapper(props) {_classCallCheck(this, AppWrapper);var _this = _possibleConstructorReturn(this, (AppWrapper.__proto__ || Object.getPrototypeOf(AppWrapper)).call(this,
    props));
    _this.state = {
      currentData: '',
      color: '' };

    _this.getRandomQuote = _this.getRandomQuote.bind(_this);
    _this.get = _this.get.bind(_this);
    _this.getQuote = _this.getQuote.bind(_this);return _this;
  }_createClass(AppWrapper, [{ key: 'get', value: function get()

    {
      $.ajax({
        type: 'get',
        url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: function success(res) {
          localStorage.setItem("temp2", res);
        } });

    } }, { key: 'getRandomQuote', value: function getRandomQuote()

    {
      return this.props.quotesData.quotes[Math.floor(Math.random() * this.props.quotesData.quotes.length)];
    } }, { key: 'getQuote', value: function getQuote()

    {
      this.get();
      this.props.quotesData = JSON.parse(localStorage.getItem("temp2"));
      this.setState({
        currentData: this.getRandomQuote(),
        color: colors[Math.floor(Math.random() * colors.length)] });


      $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.state.currentData.quote + '" ' + this.state.currentData.author));

      $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + encodeURIComponent(this.state.currentData.author) + '&content=' + encodeURIComponent(this.state.currentData.quote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');

      $(".quote-text").animate(
      { opacity: 0 },
      500,
      function () {
        $(this).animate({ opacity: 1 }, 500);
      });


      $(".quote-author").animate(
      { opacity: 0 },
      500,
      function () {
        $(this).animate({ opacity: 1 }, 500);
      });

    } }, { key: 'componentWillMount', value: function componentWillMount()

    {
      this.getQuote();
    } }, { key: 'render', value: function render()

    {
      $("body").css("background-color", this.state.color);
      return (
        React.createElement('div', { id: 'wrapper', style: { backgroundColor: this.props.color, color: this.props.color } },
          React.createElement('div', { id: 'quote-box' },
            React.createElement(QuoteText, { text: this.state.currentData.quote, color: this.state.color }),
            React.createElement(QuoteAuthor, { author: this.state.currentData.author,
              color: this.state.color }),
            React.createElement(Buttons, { getQuote: this.getQuote, color: this.state.color })),

          React.createElement(Footer, null)));


    } }]);return AppWrapper;}(React.Component);
;var


QuoteText = function (_React$Component2) {_inherits(QuoteText, _React$Component2);
  function QuoteText(props) {_classCallCheck(this, QuoteText);var _this2 = _possibleConstructorReturn(this, (QuoteText.__proto__ || Object.getPrototypeOf(QuoteText)).call(this,
    props));
    _this2.state = {};return _this2;
  }_createClass(QuoteText, [{ key: 'render', value: function render()

    {
      return (
        React.createElement('div', { 'class': 'quote-text' },
          React.createElement('i', { 'class': 'fa fa-quote-left',
              style: { color: this.props.color } }, ' ', this.props.text),
          React.createElement('span', { id: 'text' }, ' ')));


    } }]);return QuoteText;}(React.Component);
;var

QuoteAuthor = function (_React$Component3) {_inherits(QuoteAuthor, _React$Component3);
  function QuoteAuthor(props) {_classCallCheck(this, QuoteAuthor);var _this3 = _possibleConstructorReturn(this, (QuoteAuthor.__proto__ || Object.getPrototypeOf(QuoteAuthor)).call(this,
    props));
    _this3.state = {};return _this3;
  }_createClass(QuoteAuthor, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { 'class': 'quote-author',
            style: { color: this.props.color } }, '- ',
          React.createElement('span', { id: 'author' }, this.props.author, ' ')));


    } }]);return QuoteAuthor;}(React.Component);
;var


Buttons = function (_React$Component4) {_inherits(Buttons, _React$Component4);
  function Buttons(props) {_classCallCheck(this, Buttons);var _this4 = _possibleConstructorReturn(this, (Buttons.__proto__ || Object.getPrototypeOf(Buttons)).call(this,
    props));
    _this4.state = {};return _this4;
  }_createClass(Buttons, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { 'class': 'buttons' },
          React.createElement('a', { id: 'tweet-quote',
              herf: 'twitter.com/intent/tweet',
              title: 'Tweet this quote!',
              'class': 'button',
              target: '_blank',
              style: { backgroundColor: this.props.color } },
            React.createElement('i', { 'class': 'fa fa-twitter' }, ' ')),

          React.createElement('a', { id: 'tumblr-quote',
              herf: 'twitter.com/intent/tweet',
              title: 'Post this quote on tumblr!',
              'class': 'button',
              target: '_blank',
              style: { backgroundColor: this.props.color } },
            React.createElement('i', { 'class': 'fa fa-tumblr' }, ' ')),

          React.createElement('button', { 'class': 'button',
              id: 'new-quote',
              onClick: this.props.getQuote,
              style: { backgroundColor: this.props.color } }, ' New quote')));



    } }]);return Buttons;}(React.Component);
;var

Footer = function (_React$Component5) {_inherits(Footer, _React$Component5);
  function Footer(props) {_classCallCheck(this, Footer);var _this5 = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this,
    props));
    _this5.state = {};return _this5;
  }_createClass(Footer, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { 'class': 'footer' }, ' by EricZzz '));

    } }]);return Footer;}(React.Component);
;



ReactDOM.render(React.createElement(AppWrapper, null), document.getElementById("app"));