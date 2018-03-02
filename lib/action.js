'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = action;

var _task = require('./task');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function action(target, key, descriptor) {
  if (arguments.length === 1 && typeof target === 'function') {
    return (0, _task2.default)(target);
  }
  var value = descriptor.value;

  return {
    get: function get() {
      var boundValue = value.bind(this);
      var newValue = function newValue() {
        var result = boundValue.apply(null, arguments);
        if (result && result.then && result.catch) return _task2.default.fromPromise(result);
        return result;
      };

      Object.defineProperty(this, key, {
        value: newValue
      });

      return newValue;
    }
  };
}