# Ravioli

React state management using observables.

## Install

```
yarn add https://github.com/jmeyers91/ravioli
```

## Example

```
import {
  React,
  Store,
  View,
  Async,
  action,
} from 'ravioli';

class UI extends Store {
  fetchDataTask = null;
}

// Instances of AppStore are automatically observed by Views
class AppStore extends Store {
  data = null;
  ui = new UI();

  @action async fetchData() {
    console.log('fetchData');
    this.data = await GET('/some/api/endpoint');
    return this.data;
  }
}

export default class App extends View {
  store = new AppStore();

  // actions are bound automatically and returned promises are made observable
  @action async handleFetchClick() {
    const task = this.store.fetchData();
    this.store.ui.fetchDataTask = task; // Observable promises
    const data = await task;

    console.log('Success:', data)
  }

  render() {
    const { fetchDataTask } = this.store.ui;

    // React to changes in promise state
    return (
      <div>
        <button onClick={this.handleFetchClick}>Fetch</button>
        <Async.Pending task={fetchDataTask}>
          <div>Loading...</div>
        </Async.Pending>
        <Async.Resolved task={fetchDataTask}>
          {data => <div>{data}</div>}
        </Async.Resolved>
        <Async.Rejected task={fetchDataTask}>
          {error => error.message}
        </Async.Rejected>
      </div>
    )
  }
}
```
