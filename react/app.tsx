import React from "react";
import ReactDOM from "react-dom";

export function mount(root: Element) {
  ReactDOM.hydrate(<App />, root);
}

export function App() {
  return <h1>Hello, world!</h1>;
}
