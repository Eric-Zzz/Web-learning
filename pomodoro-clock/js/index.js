var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
// coded by @no-stack-dub-sack (github) / @no_stack_sub_sack (codepen)

/** NOTES:
/** Dependencies are React, ReactDOM, and 
    Accurate_Interval.js by Squuege (external script 
    to keep setInterval() from drifting over time & 
    thus ensuring timer goes off at correct mark).
/** Utilizes embedded <Audio> tag to ensure audio 
    plays when timer tab is inactive or browser is 
    minimized ( rather than new Audio().play() ).
/** Audio of this fashion not supported on most 
    mobile devices it would seem (bummer I know).
**/

// PROJECTOR SELECTOR FOR EXTERNAL TEST SCRIPT:
var projectName = 'pomodoro-clock';
localStorage.setItem('example_project', 'Pomodoro Clock');

// COMPONENTS:
var TimerLengthControl = function (_React$Component) {_inherits(TimerLengthControl, _React$Component);function TimerLengthControl() {_classCallCheck(this, TimerLengthControl);return _possibleConstructorReturn(this, (TimerLengthControl.__proto__ || Object.getPrototypeOf(TimerLengthControl)).apply(this, arguments));}_createClass(TimerLengthControl, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { className: 'length-control' },
          React.createElement('div', { id: this.props.titleID },
            this.props.title),

          React.createElement('button', { id: this.props.minID,
              className: 'btn-level', value: '-',
              onClick: this.props.onClick },
            React.createElement('i', { className: 'fa fa-arrow-down fa-2x' })),

          React.createElement('div', { id: this.props.lengthID, className: 'btn-level' },
            this.props.length),

          React.createElement('button', { id: this.props.addID,
              className: 'btn-level', value: '+',
              onClick: this.props.onClick },
            React.createElement('i', { className: 'fa fa-arrow-up fa-2x' }))));



    } }]);return TimerLengthControl;}(React.Component);
;var

Timer = function (_React$Component2) {_inherits(Timer, _React$Component2);
  function Timer(props) {_classCallCheck(this, Timer);var _this2 = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this,
    props));
    _this2.state = {
      brkLength: 5,
      seshLength: 25,
      timerState: 'stopped',
      timerType: 'Session',
      timer: 1500,
      intervalID: '',
      alarmColor: { color: 'white' } };

    _this2.setBrkLength = _this2.setBrkLength.bind(_this2);
    _this2.setSeshLength = _this2.setSeshLength.bind(_this2);
    _this2.lengthControl = _this2.lengthControl.bind(_this2);
    _this2.timerControl = _this2.timerControl.bind(_this2);
    _this2.beginCountDown = _this2.beginCountDown.bind(_this2);
    _this2.decrementTimer = _this2.decrementTimer.bind(_this2);
    _this2.phaseControl = _this2.phaseControl.bind(_this2);
    _this2.warning = _this2.warning.bind(_this2);
    _this2.buzzer = _this2.buzzer.bind(_this2);
    _this2.switchTimer = _this2.switchTimer.bind(_this2);
    _this2.clockify = _this2.clockify.bind(_this2);
    _this2.reset = _this2.reset.bind(_this2);return _this2;
  }_createClass(Timer, [{ key: 'setBrkLength', value: function setBrkLength(
    e) {
      this.lengthControl('brkLength', e.currentTarget.value,
      this.state.brkLength, 'Session');
    } }, { key: 'setSeshLength', value: function setSeshLength(
    e) {
      this.lengthControl('seshLength', e.currentTarget.value,
      this.state.seshLength, 'Break');
    } }, { key: 'lengthControl', value: function lengthControl(
    stateToChange, sign, currentLength, timerType) {
      if (this.state.timerState == 'running') return;
      if (this.state.timerType == timerType) {
        if (sign == "-" && currentLength != 1) {
          this.setState(_defineProperty({}, stateToChange, currentLength - 1));
        } else if (sign == "+" && currentLength != 60) {
          this.setState(_defineProperty({}, stateToChange, currentLength + 1));
        }
      } else {
        if (sign == "-" && currentLength != 1) {var _setState3;
          this.setState((_setState3 = {}, _defineProperty(_setState3, stateToChange, currentLength - 1), _defineProperty(_setState3, 'timer',
          currentLength * 60 - 60), _setState3));
        } else if (sign == "+" && currentLength != 60) {var _setState4;
          this.setState((_setState4 = {}, _defineProperty(_setState4, stateToChange, currentLength + 1), _defineProperty(_setState4, 'timer',
          currentLength * 60 + 60), _setState4));
        }
      }
    } }, { key: 'timerControl', value: function timerControl()
    {
      var control = this.state.timerState == 'stopped' ? (
      this.beginCountDown(),
      this.setState({ timerState: 'running' })) : (

      this.setState({ timerState: 'stopped' }),
      this.state.intervalID && this.state.intervalID.cancel());

    } }, { key: 'beginCountDown', value: function beginCountDown()
    {var _this3 = this;
      this.setState({
        intervalID: accurateInterval(function () {
          _this3.decrementTimer();
          _this3.phaseControl();
        }, 1000) });

    } }, { key: 'decrementTimer', value: function decrementTimer()
    {
      this.setState({ timer: this.state.timer - 1 });
    } }, { key: 'phaseControl', value: function phaseControl()
    {
      var timer = this.state.timer;
      this.warning(timer);
      this.buzzer(timer);
      if (timer < 0) {
        this.state.timerType == 'Session' ? (
        this.state.intervalID && this.state.intervalID.cancel(),
        this.beginCountDown(),
        this.switchTimer(this.state.brkLength * 60, 'Break')) : (

        this.state.intervalID && this.state.intervalID.cancel(),
        this.beginCountDown(),
        this.switchTimer(this.state.seshLength * 60, 'Session'));

      }
    } }, { key: 'warning', value: function warning(
    _timer) {
      var warn = _timer < 61 ?
      this.setState({ alarmColor: { color: '#a50d0d' } }) :
      this.setState({ alarmColor: { color: 'white' } });
    } }, { key: 'buzzer', value: function buzzer(
    _timer) {
      if (_timer === 0) {
        this.audioBeep.play();
      }
    } }, { key: 'switchTimer', value: function switchTimer(
    num, str) {
      this.setState({
        timer: num,
        timerType: str,
        alarmColor: { color: 'white' } });

    } }, { key: 'clockify', value: function clockify()
    {
      var minutes = Math.floor(this.state.timer / 60);
      var seconds = this.state.timer - minutes * 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return minutes + ':' + seconds;
    } }, { key: 'reset', value: function reset()
    {
      this.setState({
        brkLength: 5,
        seshLength: 25,
        timerState: 'stopped',
        timerType: 'Session',
        timer: 1500,
        intervalID: '',
        alarmColor: { color: 'white' } });

      this.state.intervalID && this.state.intervalID.cancel();
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
    } }, { key: 'render', value: function render()
    {var _this4 = this;
      return (
        React.createElement('div', null,
          React.createElement('div', { className: 'main-title' }, 'Pomodoro Clock'),


          React.createElement(TimerLengthControl, {
            titleID: 'break-label', minID: 'break-decrement',
            addID: 'break-increment', lengthID: 'break-length',
            title: 'Break Length', onClick: this.setBrkLength,
            length: this.state.brkLength }),
          React.createElement(TimerLengthControl, {
            titleID: 'session-label', minID: 'session-decrement',
            addID: 'session-increment', lengthID: 'session-length',
            title: 'Session Length', onClick: this.setSeshLength,
            length: this.state.seshLength }),
          React.createElement('div', { className: 'timer', style: this.state.alarmColor },
            React.createElement('div', { className: 'timer-wrapper' },
              React.createElement('div', { id: 'timer-label' },
                this.state.timerType),

              React.createElement('div', { id: 'time-left' },
                this.clockify()))),



          React.createElement('div', { className: 'timer-control' },
            React.createElement('button', { id: 'start_stop', onClick: this.timerControl },
              React.createElement('i', { className: 'fa fa-play fa-2x' }),
              React.createElement('i', { className: 'fa fa-pause fa-2x' })),

            React.createElement('button', { id: 'reset', onClick: this.reset },
              React.createElement('i', { className: 'fa fa-refresh fa-2x' }))),


          React.createElement('div', { className: 'author' }, ' Designed and Coded by ', React.createElement('br', null),
            React.createElement('a', { target: '_blank', href: 'https://www.freecodecamp.org/eric-zzz' }, 'EricZzz')),



          React.createElement('audio', { id: 'beep', preload: 'auto',
            src: 'https://goo.gl/65cBl1',
            ref: function ref(audio) {_this4.audioBeep = audio;} })));


    } }]);return Timer;}(React.Component);
;

ReactDOM.render(React.createElement(Timer, null), document.getElementById('app'));