import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom-server";

export const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://esm.sh/purecss@2.0.3/build/pure-min.css">
    <title>Document</title>
</head>
  <body>
    <main id="root">${ReactDOMServer.renderToString(<App />)}</main>
    <script type="module">
      import { mount } from "./app.js";
      mount(document.getElementById("root"));
    </script>
  </body>
</html>
`;

export function App() {
  return <h1>Hello, world!</h1>;
}

export function mount(root: Element) {
  ReactDOM.hydrate(<App />, root);
}
