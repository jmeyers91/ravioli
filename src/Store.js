import { store } from 'react-easy-state';

export default class Store {
  constructor() {
    return store(this);
  }
};
