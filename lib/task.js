'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTask = isTask;
exports.taskFromPromise = taskFromPromise;
exports.default = task;

var _reactEasyState = require('react-easy-state');

function _defineEnumerableProperties(obj, descs) { for (var key in descs) { var desc = descs[key]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, key, desc); } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isTaskSymbol = Symbol('isTask');
var PENDING = 'pending';
var REJECTED = 'rejected';
var RESOLVED = 'resolved';

function isTask(value) {
  return value && value[isTaskSymbol];
}

function taskFromPromise(promise) {
  var _resolved, _rejected, _pending, _store, _mutatorMap;

  promise = promise || Promise.resolve();
  if (isTask(promise)) return promise;

  var task = (0, _reactEasyState.store)((_store = {}, _defineProperty(_store, isTaskSymbol, true), _defineProperty(_store, 'state', PENDING), _defineProperty(_store, 'result', null), _defineProperty(_store, 'error', null), _resolved = 'resolved', _mutatorMap = {}, _mutatorMap[_resolved] = _mutatorMap[_resolved] || {}, _mutatorMap[_resolved].get = function () {
    return task.state === RESOLVED;
  }, _rejected = 'rejected', _mutatorMap[_rejected] = _mutatorMap[_rejected] || {}, _mutatorMap[_rejected].get = function () {
    return task.state === REJECTED;
  }, _pending = 'pending', _mutatorMap[_pending] = _mutatorMap[_pending] || {}, _mutatorMap[_pending].get = function () {
    return task.state === PENDING;
  }, _defineProperty(_store, 'then', function then() {
    var _promise;

    return (_promise = promise).then.apply(_promise, arguments);
  }), _defineProperty(_store, 'catch', function _catch() {
    var _promise2;

    return (_promise2 = promise).catch.apply(_promise2, arguments);
  }), _defineProperty(_store, 'match', function match(states) {
    switch (this.state) {
      case PENDING:
        if (states[PENDING]) return states[PENDING]();break;
      case RESOLVED:
        if (states[RESOLVED]) return states[RESOLVED](this.result);break;
      case REJECTED:
        if (states[REJECTED]) return states[REJECTED](this.error);break;
      default:
        return null;
    }
  }), _defineEnumerableProperties(_store, _mutatorMap), _store));

  promise.then(function (result) {
    task.result = result;
    task.state = RESOLVED;
  }, function (error) {
    task.error = error;
    task.state = REJECTED;
  });

  return task;
}

task.fromPromise = taskFromPromise;

function task(fn, binding) {
  if (binding) fn = fn.bind(binding);
  return function wrappedTaskFn() {
    return taskFromPromise(Promise.resolve(fn.apply(null, arguments)));
  };
}