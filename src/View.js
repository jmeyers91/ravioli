import React from 'react';
import { view } from 'react-easy-state';

export default view(class extends React.Component {
  constructor(props) {
    super(props);
    const { State } = this.constructor;
    if(State) {
      this.state = new State(props);
    }
  }
});
