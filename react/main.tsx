/// Server side rendered React application served with Oak
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom-server";
import { Application, Context, Router } from "oak/mod.ts";

import { App } from "./app.tsx";

// Use PORT environent variable, fallback 8080
const port = parseInt(Deno.env.get("PORT") || "8080");
if (!port) {
  throw new Error(`Invalid port ${Deno.env.get("PORT")}`);
}

// HTML page with servered rendered content and client side hydration
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
    <main id="app">${ReactDOMServer.renderToString(<App />)}</main>
    <script type="module">
import React from "https://esm.sh/react@${React.version}";
import ReactDOM from "https://esm.sh/react-dom@${ReactDOM.version}";
ReactDOM.hydrate(React.createElement(${App}), document.getElementById("app"));
    </script>
  </body>
</html>
`;

const router = new Router()
  .get("/", (ctx) => {
    ctx.response.type = "text/html";
    ctx.response.body = html;
  });

// Start web server, add routes and listen for connections
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on http${secure ? "s" : ""}://${hostname ??
      "localhost"}:${port}...`,
  );
});
await app.listen({ port });