import { store } from 'react-easy-state';

const isTaskSymbol = Symbol('isTask');
const PENDING = 'pending';
const REJECTED = 'rejected';
const RESOLVED = 'resolved';

export function isTask(value) {
  return value && (value[isTaskSymbol]);
}

export function taskFromPromise(promise) {
  promise = promise || Promise.resolve();
  if(isTask(promise)) return promise;

  const task = store({
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
      switch(this.state) {
        case PENDING: if(states[PENDING]) return states[PENDING](); break;
        case RESOLVED: if(states[RESOLVED]) return states[RESOLVED](this.result); break;
        case REJECTED: if(states[REJECTED]) return states[REJECTED](this.error); break;
        default: return null;
      }
    },
  });

  promise.then(
    result => {
      task.result = result;
      task.state = RESOLVED;
    },
    error => {
      task.error = error;
      task.state = REJECTED;
    },
  );

  return task;
}

task.fromPromise = taskFromPromise;

export default function task(fn, binding) {
  if(binding) fn = fn.bind(binding);
  return function wrappedTaskFn() {
    return taskFromPromise(Promise.resolve(fn.apply(null, arguments)));
  };
}
