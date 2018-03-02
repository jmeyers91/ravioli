var ravioli =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return view; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util__["a"]; });




function view(Comp, ref) {
  if ( ref === void 0 ) ref = {};
  var rawDevtool = ref.devtool;

  var _class, _temp;

  var isStatelessComp = !(Comp.prototype && Comp.prototype.isReactComponent);
  var BaseComp = isStatelessComp ? __WEBPACK_IMPORTED_MODULE_0_react__["Component"] : Comp;

  var devtool = rawDevtool ? function (operation) { return rawDevtool(Object.assign({ Component: Comp }, operation)); } : undefined;

  // return a HOC which overwrites render, shouldComponentUpdate and componentWillUnmount
  // it decides when to run the new reactive methods and when to proxy to the original methods
  return _temp = _class = (function (BaseComp) {
    function ReactiveHOC(props, context) {
      var this$1 = this;

      BaseComp.call(this, props, context);

      // create a reactive render for the component
      // run a dummy setState to schedule a new reactive render, avoid forceUpdate
      this.render = Object(__WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util__["b" /* observe */])(this.render, {
        scheduler: function () { return this$1.setState({}); },
        debugger: devtool,
        lazy: true
      });
    }

    if ( BaseComp ) ReactiveHOC.__proto__ = BaseComp;
    ReactiveHOC.prototype = Object.create( BaseComp && BaseComp.prototype );
    ReactiveHOC.prototype.constructor = ReactiveHOC;

    ReactiveHOC.prototype.render = function render () {
      return isStatelessComp ? Comp(this.props, this.context) : BaseComp.prototype.render.call(this);
    };

    // react should trigger updates on prop changes, while easyState handles store changes
    ReactiveHOC.prototype.shouldComponentUpdate = function shouldComponentUpdate (nextProps, nextState) {
      var ref = this;
      var props = ref.props;
      var state = ref.state;

      // respect the case when user prohibits updates
      if (BaseComp.prototype.shouldComponentUpdate && !BaseComp.prototype.shouldComponentUpdate.call(this, nextProps, nextState)) {
        devtool && devtool({ type: 'render', renderType: 'blocked' });
        return false;
      }

      // return true if it is a reactive render or state changes
      if (state !== nextState) {
        devtool && devtool({ type: 'render', renderType: 'reactive' });
        return true;
      }

      // the component should update if any of its props shallowly changed value
      var keys = Object.keys(props);
      var nextKeys = Object.keys(nextProps);
      if (nextKeys.length !== keys.length || nextKeys.some(function (key) { return props[key] !== nextProps[key]; })) {
        devtool && devtool({
          type: 'render',
          renderType: 'normal',
          props: nextProps,
          oldProps: props
        });
        return true;
      }
      return false;
    };

    ReactiveHOC.prototype.componentWillUnmount = function componentWillUnmount () {
      // call user defined componentWillUnmount
      if (BaseComp.prototype.componentWillUnmount) {
        BaseComp.prototype.componentWillUnmount.call(this);
      }
      // clean up memory used by easyState
      Object(__WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util__["c" /* unobserve */])(this.render);
    };

    return ReactiveHOC;
  }(BaseComp)), _class.displayName = Comp.displayName || Comp.name, _class.contextTypes = Comp.contextTypes, _class.childContextTypes = Comp.childContextTypes, _class.propTypes = Comp.propTypes, _class.defaultProps = Comp.defaultProps, _temp;
}




/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isTask;
/* harmony export (immutable) */ __webpack_exports__["c"] = taskFromPromise;
/* harmony export (immutable) */ __webpack_exports__["a"] = task;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_easy_state__ = __webpack_require__(0);


const isTaskSymbol = Symbol('isTask');
const PENDING = 'pending';
const REJECTED = 'rejected';
const RESOLVED = 'resolved';

function isTask(value) {
  return value && value[isTaskSymbol];
}

function taskFromPromise(promise) {
  promise = promise || Promise.resolve();
  if (isTask(promise)) return promise;

  const _then = promise.then.bind(promise);
  const _catch = promise.catch.bind(promise);
  const task = Object(__WEBPACK_IMPORTED_MODULE_0_react_easy_state__["a" /* store */])({
    [isTaskSymbol]: true,
    state: PENDING,
    result: null,
    error: null,

    get resolved() {
      return task.state === RESOLVED;
    },

    get rejected() {
      return task.state === REJECTED;
    },

    get pending() {
      return task.state === PENDING;
    },

    then(...args) {
      return promise.then(...args);
    },

    catch(...args) {
      return promise.catch(...args);
    },

    match(states) {
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
    }
  });

  promise.then(result => {
    task.result = result;
    task.state = RESOLVED;
  }, error => {
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

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return observe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return unobserve; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return observable; });
/* unused harmony export isObservable */
/* unused harmony export raw */
var connectionStore = new WeakMap();
var ITERATION_KEY = Symbol('iteration key');

function storeObservable(obj) {
  // this will be used to save (obj.key -> reaction) connections later
  connectionStore.set(obj, Object.create(null));
}

function registerReactionForOperation(reaction, ref) {
  var target = ref.target;
  var key = ref.key;
  var type = ref.type;

  if (type === 'iterate') {
    key = ITERATION_KEY;
  }

  var reactionsForObj = connectionStore.get(target);
  var reactionsForKey = reactionsForObj[key];
  if (!reactionsForKey) {
    reactionsForObj[key] = reactionsForKey = new Set();
  }
  // save the fact that the key is used by the reaction during its current run
  if (!reactionsForKey.has(reaction)) {
    reactionsForKey.add(reaction);
    reaction.cleaners.push(reactionsForKey);
  }
}

function getReactionsForOperation(ref) {
  var target = ref.target;
  var key = ref.key;
  var type = ref.type;

  var reactionsForTarget = connectionStore.get(target);
  var reactionsForKey = new Set();

  if (type === 'clear') {
    for (var key$1 in reactionsForTarget) {
      addReactionsForKey(reactionsForKey, reactionsForTarget, key$1);
    }
  } else {
    addReactionsForKey(reactionsForKey, reactionsForTarget, key);
  }

  if (type === 'add' || type === 'delete' || type === 'clear') {
    var iterationKey = Array.isArray(target) ? 'length' : ITERATION_KEY;
    addReactionsForKey(reactionsForKey, reactionsForTarget, iterationKey);
  }

  return reactionsForKey;
}

function addReactionsForKey(reactionsForKey, reactionsForTarget, key) {
  var reactions = reactionsForTarget[key];
  reactions && reactions.forEach(reactionsForKey.add, reactionsForKey);
}

function releaseReaction(reaction) {
  if (reaction.cleaners) {
    reaction.cleaners.forEach(releaseReactionKeyConnection, reaction);
  }
  reaction.cleaners = [];
}

function releaseReactionKeyConnection(reactionsForKey) {
  reactionsForKey.delete(this);
}

var runningReaction;
var isDebugging = false;

function runAsReaction(reaction, fn, context, args) {
  // do not build reactive relations, if the reaction is unobserved
  if (reaction.unobserved) {
    return fn.apply(context, args);
  }

  // release the (obj -> key -> reactions) connections
  // and reset the cleaner connections
  releaseReaction(reaction);

  try {
    // set the reaction as the currently running one
    // this is required so that we can create (observable.prop -> reaction) pairs in the get trap
    runningReaction = reaction;
    return fn.apply(context, args);
  } finally {
    // always remove the currently running flag from the reaction when it stops execution
    runningReaction = undefined;
  }
}

// register the currently running reaction to be queued again on obj.key mutations
function registerRunningReactionForOperation(operation) {
  if (runningReaction) {
    debugOperation(runningReaction, operation);
    registerReactionForOperation(runningReaction, operation);
  }
}

function queueReactionsForOperation(operation) {
  // iterate and queue every reaction, which is triggered by obj.key mutation
  getReactionsForOperation(operation).forEach(queueReaction, operation);
}

function queueReaction(reaction) {
  debugOperation(reaction, this);
  // queue the reaction for later execution or run it immediately
  if (typeof reaction.scheduler === 'function') {
    reaction.scheduler(reaction);
  } else if (typeof reaction.scheduler === 'object') {
    reaction.scheduler.add(reaction);
  } else {
    reaction();
  }
}

function debugOperation(reaction, operation) {
  if (reaction.debugger && !isDebugging) {
    try {
      isDebugging = true;
      reaction.debugger(operation);
    } finally {
      isDebugging = false;
    }
  }
}

function hasRunningReaction() {
  return runningReaction !== undefined;
}

var IS_REACTION = Symbol('is reaction');

function observe(fn, options) {
  if ( options === void 0 ) options = {};

  // wrap the passed function in a reaction, if it is not already one
  var reaction = fn[IS_REACTION] ? fn : function reaction() {
    return runAsReaction(reaction, fn, this, arguments);
  };
  // save the scheduler and debugger on the reaction
  reaction.scheduler = options.scheduler;
  reaction.debugger = options.debugger;
  // save the fact that this is a reaction
  reaction[IS_REACTION] = true;
  // run the reaction once if it is not a lazy one
  if (!options.lazy) {
    reaction();
  }
  return reaction;
}

function unobserve(reaction) {
  // do nothing, if the reaction is already unobserved
  if (!reaction.unobserved) {
    // indicate that the reaction should not be triggered any more
    reaction.unobserved = true;
    // release (obj -> key -> reaction) connections
    releaseReaction(reaction);
  }
  // unschedule the reaction, if it is scheduled
  if (typeof reaction.scheduler === 'object') {
    reaction.scheduler.delete(reaction);
  }
}

var proxyToRaw = new WeakMap();
var rawToProxy = new WeakMap();

var getPrototypeOf = Object.getPrototypeOf;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var instrumentations = {
  has: function has(key) {
    var target = proxyToRaw.get(this);
    var proto = getPrototypeOf(this);
    registerRunningReactionForOperation({ target: target, key: key, type: 'has' });
    return proto.has.apply(target, arguments);
  },
  get: function get(key) {
    var target = proxyToRaw.get(this);
    var proto = getPrototypeOf(this);
    registerRunningReactionForOperation({ target: target, key: key, type: 'get' });
    return proto.get.apply(target, arguments);
  },
  add: function add(key) {
    var target = proxyToRaw.get(this);
    var proto = getPrototypeOf(this);
    var hadKey = proto.has.call(target, key);
    // forward the operation before queueing reactions
    var result = proto.add.apply(target, arguments);
    if (!hadKey) {
      queueReactionsForOperation({ target: target, key: key, value: key, type: 'add' });
    }
    return result;
  },
  set: function set(key, value) {
    var target = proxyToRaw.get(this);
    var proto = getPrototypeOf(this);
    var hadKey = proto.has.call(target, key);
    var oldValue = proto.get.call(target, key);
    // forward the operation before queueing reactions
    var result = proto.set.apply(target, arguments);
    if (!hadKey) {
      queueReactionsForOperation({ target: target, key: key, value: value, type: 'add' });
    } else if (value !== oldValue) {
      queueReactionsForOperation({ target: target, key: key, value: value, oldValue: oldValue, type: 'set' });
    }
    return result;
  },
  delete: function delete$1(key) {
    var target = proxyToRaw.get(this);
    var proto = getPrototypeOf(this);
    var hadKey = proto.has.call(target, key);
    var oldValue = proto.get ? proto.get.call(target, key) : undefined;
    // forward the operation before queueing reactions
    var result = proto.delete.apply(target, arguments);
    if (hadKey) {
      queueReactionsForOperation({ target: target, key: key, oldValue: oldValue, type: 'delete' });
    }
    return result;
  },
  clear: function clear() {
    var target = proxyToRaw.get(this);
    var proto = getPrototypeOf(this);
    var hadItems = target.size !== 0;
    var oldTarget = target instanceof Map ? new Map(target) : new Set(target);
    // forward the operation before queueing reactions
    var result = proto.clear.apply(target, arguments);
    if (hadItems) {
      queueReactionsForOperation({ target: target, oldTarget: oldTarget, type: 'clear' });
    }
    return result;
  },
  forEach: function forEach() {
    var target = proxyToRaw.get(this);
    var proto = getPrototypeOf(this);
    registerRunningReactionForOperation({ target: target, type: 'iterate' });
    return proto.forEach.apply(target, arguments);
  },
  keys: function keys() {
    var target = proxyToRaw.get(this);
    var proto = getPrototypeOf(this);
    registerRunningReactionForOperation({ target: target, type: 'iterate' });
    return proto.keys.apply(target, arguments);
  },
  values: function values() {
    var target = proxyToRaw.get(this);
    var proto = getPrototypeOf(this);
    registerRunningReactionForOperation({ target: target, type: 'iterate' });
    return proto.values.apply(target, arguments);
  },
  entries: function entries() {
    var target = proxyToRaw.get(this);
    var proto = getPrototypeOf(this);
    registerRunningReactionForOperation({ target: target, type: 'iterate' });
    return proto.entries.apply(target, arguments);
  },
  get size() {
    var target = proxyToRaw.get(this);
    var proto = getPrototypeOf(this);
    registerRunningReactionForOperation({ target: target, type: 'iterate' });
    return Reflect.get(proto, 'size', target);
  }
};
instrumentations[Symbol.iterator] = function () {
    var target = proxyToRaw.get(this);
    var proto = getPrototypeOf(this);
    registerRunningReactionForOperation({ target: target, type: 'iterate' });
    return proto[Symbol.iterator].apply(target, arguments);
  };

var collectionHandlers = {
  get: function get(target, key, receiver) {
    // instrument methods and property accessors to be reactive
    target = hasOwnProperty.call(instrumentations, key) ? instrumentations : target;
    return Reflect.get(target, key, receiver);
  }
};

// simple objects are not wrapped by Proxies, neither instrumented
var dontInstrument = new Set([Date, RegExp]);

// built-in object can not be wrapped by Proxies
// their methods expect the object instance as the 'this' instead of the Proxy wrapper
// complex objects are wrapped with a Proxy of instrumented methods
// which switch the proxy to the raw object and to add reactive wiring
var handlers = new Map([[Map, collectionHandlers], [Set, collectionHandlers], [WeakMap, collectionHandlers], [WeakSet, collectionHandlers]]);

function shouldInstrument(obj) {
  if (typeof Node === 'function' && obj instanceof Node) {
    return false;
  }
  return !dontInstrument.has(obj.constructor);
}

function getHandlers(obj) {
  return handlers.get(obj.constructor);
}

var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

// intercept get operations on observables to know which reaction uses their properties
function get(target, key, receiver) {
  var result = Reflect.get(target, key, receiver);
  // do not register (observable.prop -> reaction) pairs for these cases
  if (typeof key === 'symbol' || typeof result === 'function') {
    return result;
  }
  // register and save (observable.prop -> runningReaction)
  registerRunningReactionForOperation({ target: target, key: key, receiver: receiver, type: 'get' });
  // if we are inside a reaction and observable.prop is an object wrap it in an observable too
  // this is needed to intercept property access on that object too (dynamic observable tree)
  if (hasRunningReaction() && typeof result === 'object' && result !== null) {
    return observable(result);
  }
  // otherwise return the observable wrapper if it is already created and cached or the raw object
  return rawToProxy.get(result) || result;
}

function has(target, key) {
  var result = Reflect.has(target, key);
  // do not register (observable.prop -> reaction) pairs for these cases
  if (typeof key === 'symbol') {
    return result;
  }
  // register and save (observable.prop -> runningReaction)
  registerRunningReactionForOperation({ target: target, key: key, type: 'has' });
  return result;
}

function ownKeys(target) {
  registerRunningReactionForOperation({ target: target, type: 'iterate' });
  return Reflect.ownKeys(target);
}

// intercept set operations on observables to know when to trigger reactions
function set(target, key, value, receiver) {
  // make sure to do not pollute the raw object with observables
  if (typeof value === 'object' && value !== null) {
    value = proxyToRaw.get(value) || value;
  }
  // save if the object had a descriptor for this key
  var hadKey = hasOwnProperty$1.call(target, key);
  // save if the value changed because of this set operation
  var oldValue = target[key];
  // execute the set operation before running any reaction
  var result = Reflect.set(target, key, value, receiver);
  // emit a warning and do not queue anything when another reaction is queued
  // from an already running reaction
  if (hasRunningReaction()) {
    console.error(("Mutating observables in reactions is forbidden. You set " + key + " to " + value + "."));
    return result;
  }
  // do not queue reactions if it is a symbol keyed property
  // or the target of the operation is not the raw receiver
  // (possible because of prototypal inheritance)
  if (typeof key === 'symbol' || target !== proxyToRaw.get(receiver)) {
    return result;
  }

  // queue a reaction if it's a new property or its value changed
  if (!hadKey) {
    queueReactionsForOperation({ target: target, key: key, value: value, receiver: receiver, type: 'add' });
  } else if (value !== oldValue) {
    queueReactionsForOperation({
      target: target,
      key: key,
      value: value,
      oldValue: oldValue,
      receiver: receiver,
      type: 'set'
    });
  }
  return result;
}

function deleteProperty(target, key) {
  // save if the object had the key
  var hadKey = hasOwnProperty$1.call(target, key);
  var oldValue = target[key];
  // execute the delete operation before running any reaction
  var result = Reflect.deleteProperty(target, key);
  // only queue reactions for non symbol keyed property delete which resulted in an actual change
  if (typeof key !== 'symbol' && hadKey) {
    queueReactionsForOperation({ target: target, key: key, oldValue: oldValue, type: 'delete' });
  }
  return result;
}

var baseHandlers = { get: get, has: has, ownKeys: ownKeys, set: set, deleteProperty: deleteProperty };

function observable(obj) {
  if ( obj === void 0 ) obj = {};

  // if it is already an observable or it should not be wrapped, return it
  if (proxyToRaw.has(obj) || !shouldInstrument(obj)) {
    return obj;
  }
  // if it already has a cached observable wrapper, return it
  // otherwise create a new observable
  return rawToProxy.get(obj) || createObservable(obj);
}

function createObservable(obj) {
  // if it is a complex built-in object or a normal object, wrap it
  var handlers = getHandlers(obj) || baseHandlers;
  var observable = new Proxy(obj, handlers);
  // save these to switch between the raw object and the wrapped object with ease later
  rawToProxy.set(obj, observable);
  proxyToRaw.set(observable, obj);
  // init basic data structures to save and cleanup later (observable.prop -> reaction) connections
  storeObservable(obj);
  return observable;
}

function isObservable(obj) {
  return proxyToRaw.has(obj);
}

function raw(obj) {
  return proxyToRaw.get(obj) || obj;
}




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__View__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




function renderChildren(children, ...args) {
  if (typeof children === 'function') {
    return children(...args);
  }
  return children;
}

const Pending = props => __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
  Async,
  _extends({}, props, { state: 'pending' }),
  task => renderChildren(props.children)
);
/* harmony export (immutable) */ __webpack_exports__["a"] = Pending;


const Resolved = props => __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
  Async,
  _extends({}, props, { state: 'resolved' }),
  task => renderChildren(props.children, task.result)
);
/* harmony export (immutable) */ __webpack_exports__["c"] = Resolved;


const Rejected = props => __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
  Async,
  _extends({}, props, { state: 'rejected' }),
  task => renderChildren(props.children, task.error)
);
/* harmony export (immutable) */ __webpack_exports__["b"] = Rejected;


class Async extends __WEBPACK_IMPORTED_MODULE_0__View__["a" /* default */] {
  renderContent() {
    const { task, children } = this.props;
    return renderChildren(children, task);
  }

  render() {
    const { task, state, children } = this.props;
    return task && task.state === state && this.renderContent() || null;
  }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = Async;


Async.Pending = Pending;
Async.Resolved = Resolved;
Async.Rejected = Rejected;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_easy_state__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_easy_state__["b" /* view */])(__WEBPACK_IMPORTED_MODULE_0_react___default.a));

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_easy_state__ = __webpack_require__(0);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "store", function() { return __WEBPACK_IMPORTED_MODULE_0_react_easy_state__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "view", function() { return __WEBPACK_IMPORTED_MODULE_0_react_easy_state__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(2);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isTask", function() { return __WEBPACK_IMPORTED_MODULE_1__task__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "taskFromPromise", function() { return __WEBPACK_IMPORTED_MODULE_1__task__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "task", function() { return __WEBPACK_IMPORTED_MODULE_1__task__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Async__ = __webpack_require__(4);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Pending", function() { return __WEBPACK_IMPORTED_MODULE_2__Async__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Resolved", function() { return __WEBPACK_IMPORTED_MODULE_2__Async__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Rejected", function() { return __WEBPACK_IMPORTED_MODULE_2__Async__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Async", function() { return __WEBPACK_IMPORTED_MODULE_2__Async__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__View__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return __WEBPACK_IMPORTED_MODULE_3__View__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Store__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return __WEBPACK_IMPORTED_MODULE_4__Store__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__action__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "action", function() { return __WEBPACK_IMPORTED_MODULE_5__action__["a"]; });
// view and store


// Observable async tasks



// Async task components



// Component wrapped in react-easy-state view


// Class wrapped in react-easy-state store


// Method/function decorator for autobinding and converting promises into tasks


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_easy_state__ = __webpack_require__(0);


class Store {
  constructor() {
    return Object(__WEBPACK_IMPORTED_MODULE_0_react_easy_state__["a" /* store */])(this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Store;
;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = action;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(2);


function action(target, key, descriptor) {
  if (arguments.length === 1 && typeof target === 'function') {
    return Object(__WEBPACK_IMPORTED_MODULE_0__task__["a" /* default */])(target);
  }
  const { value } = descriptor;
  return {
    get() {
      const boundValue = value.bind(this);
      const newValue = function () {
        const result = boundValue.apply(null, arguments);
        if (result && result.then && result.catch) return __WEBPACK_IMPORTED_MODULE_0__task__["a" /* default */].fromPromise(result);
        return result;
      };

      Object.defineProperty(this, key, {
        value: newValue
      });

      return newValue;
    }
  };
}

/***/ })
/******/ ]);