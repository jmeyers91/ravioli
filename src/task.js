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
    startTime: Date.now(),
    endTime: null,
    elapsed: 0,

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
      const pendingFn = states[PENDING];
      const resolvedFn = states[RESOLVED];
      const rejectedFn = states[REJECTED];
      const state = task.state;

      if(state === PENDING && pendingFn) return pendingFn.length ? pendingFn(task.elapsed) : pendingFn();
      if(state === RESOLVED && resolvedFn) return resolvedFn.length ? resolvedFn(task.result) : resolvedFn();
      if(state === REJECTED && rejectedFn) return rejectedFn.length ? rejectedFn(task.error) : rejectedFn();
      return null;
    },
  });

  const requestIdleCallback = window.requestIdleCallback || (fn) => setTimeout(fn, 1000 / 10);

  requestIdleCallback(requestIdleCallbackLoop);

  function updateElapsed() {
    const now = Date.now();
    task.elapsed = now - task.startTime;
    return now;
  }

  function requestIdleCallbackLoop() {
    if(!task.pending) return;
    updateElapsed();
    requestIdleCallback(requestIdleCallbackLoop);
  }

  promise.then(
    result => {
      task.endTime = updateElapsed();
      task.result = result;
      task.state = RESOLVED;
    },
    error => {
      task.endTime = updateElapsed();
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
