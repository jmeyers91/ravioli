import View from './View';
import React from 'react';

function renderChildren(children, task, key) {
  if(typeof children === 'function') {
    return children.length ? children(task[key]) : children();
  }
  return children;
}

export const Pending = (props) => (
  <Async {...props} state="pending">
    {task => renderChildren(props.children, task, 'elapsed')}
  </Async>
);

export const Resolved = (props) => (
  <Async {...props} state="resolved">
    {task => renderChildren(props.children, task, 'result')}
  </Async>
);

export const Rejected = (props) => (
  <Async {...props} state="rejected">
    {task => renderChildren(props.children, task, 'error')}
  </Async>
);

export default class Async extends View {
  renderContent() {
    const { task, children } = this.props;
    return renderChildren(children, task);
  }

  render() {
    const { task, state, children } = this.props;
    return task && task.state === state && this.renderContent() || null;
  }
}

Async.Pending = Pending;
Async.Resolved = Resolved;
Async.Rejected = Rejected;
