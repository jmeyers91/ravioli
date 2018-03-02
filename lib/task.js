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

  var task = (0, _reactEasyState.store)((_store = {}, _defineProperty(_store, isTaskSymbol, true), _defineProperty(_store, 'state', PENDING), _defineProperty(_store, 'result', null), _defineProperty(_store, 'error', null), _defineProperty(_store, 'startTime', Date.now()), _defineProperty(_store, 'endTime', null), _defineProperty(_store, 'elapsed', 0), _resolved = 'resolved', _mutatorMap = {}, _mutatorMap[_resolved] = _mutatorMap[_resolved] || {}, _mutatorMap[_resolved].get = function () {
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
    var pendingFn = states[PENDING];
    var resolvedFn = states[RESOLVED];
    var rejectedFn = states[REJECTED];
    var state = task.state;

    if (state === PENDING && pendingFn) return pendingFn.length ? pendingFn(task.elapsed) : pendingFn();
    if (state === RESOLVED && resolvedFn) return resolvedFn.length ? resolvedFn(task.result) : resolvedFn();
    if (state === REJECTED && rejectedFn) return rejectedFn.length ? rejectedFn(task.error) : rejectedFn();
    return null;
  }), _defineEnumerableProperties(_store, _mutatorMap), _store));

  var requestIdleCallback = window.requestIdleCallback;
  if (!requestIdleCallback) requestIdleCallback = function requestIdleCallback(fn) {
    return setTimeout(fn, 1000 / 10);
  };

  requestIdleCallback(requestIdleCallbackLoop);

  function updateElapsed() {
    var now = Date.now();
    task.elapsed = now - task.startTime;
    return now;
  }

  function requestIdleCallbackLoop() {
    if (!task.pending) return;
    updateElapsed();
    requestIdleCallback(requestIdleCallbackLoop);
  }

  promise.then(function (result) {
    task.endTime = updateElapsed();
    task.result = result;
    task.state = RESOLVED;
  }, function (error) {
    task.endTime = updateElapsed();
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