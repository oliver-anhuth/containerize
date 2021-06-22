import React from "react";
import ReactDOM from "react-dom";

function App() {
  return <h1>Hello, world!</h1>;
}

function hydrate(root: Element) {
  ReactDOM.hydrate(<App />, root);
}

export { App, hydrate };
