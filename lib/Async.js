'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rejected = exports.Resolved = exports.Pending = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function renderChildren(children, task, key) {
  if (typeof children === 'function') {
    if (key) {
      return children.length ? children(task[key]) : children();
    } else {
      return children(task);
    }
  }
  return children;
}

var Pending = exports.Pending = function Pending(props) {
  return _react2.default.createElement(
    Async,
    _extends({}, props, { state: 'pending' }),
    function (task) {
      return renderChildren(props.children, task, 'elapsed');
    }
  );
};

var Resolved = exports.Resolved = function Resolved(props) {
  return _react2.default.createElement(
    Async,
    _extends({}, props, { state: 'resolved' }),
    function (task) {
      return renderChildren(props.children, task, 'result');
    }
  );
};

var Rejected = exports.Rejected = function Rejected(props) {
  return _react2.default.createElement(
    Async,
    _extends({}, props, { state: 'rejected' }),
    function (task) {
      return renderChildren(props.children, task, 'error');
    }
  );
};

var Async = function (_View) {
  _inherits(Async, _View);

  function Async() {
    _classCallCheck(this, Async);

    return _possibleConstructorReturn(this, (Async.__proto__ || Object.getPrototypeOf(Async)).apply(this, arguments));
  }

  _createClass(Async, [{
    key: 'renderContent',
    value: function renderContent() {
      var _props = this.props,
          task = _props.task,
          children = _props.children;

      return renderChildren(children, task);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          task = _props2.task,
          state = _props2.state,
          children = _props2.children;

      return task && task.state === state && this.renderContent() || null;
    }
  }]);

  return Async;
}(_View3.default);

exports.default = Async;


Async.Pending = Pending;
Async.Resolved = Resolved;
Async.Rejected = Rejected;