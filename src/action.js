import task from './task';

export default function action(target, key, descriptor) {
  if(arguments.length === 1 && typeof target === 'function') {
    return task(target);
  }
  const { value } = descriptor;
  return {
    get() {
      const boundValue = value.bind(this);
      const newValue = function() {
        const result = boundValue.apply(null, arguments);
        if(result && result.then && result.catch) return task.fromPromise(result);
        return result;
      };

      Object.defineProperty(this, key, {
        value: newValue
      });

      return newValue;
    },
  };
}
