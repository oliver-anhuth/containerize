import React from "react";
import ReactDOMServer from "react-dom-server";

import { App } from "./app.tsx";

const html = `
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
      import { hydrate } from "./app.js";
      hydrate(document.getElementById("root"));
    </script>
  </body>
</html>
`;

if (import.meta.main) {
  console.log(html);
}
