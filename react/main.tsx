import React from "react";
import ReactDomServer from "react-dom-server";
import { Application, Context, Router } from "oak/mod.ts";

const port = parseInt(Deno.env.get("PORT") || "8080");
if (!port) {
  throw new Error(`Invalid port ${Deno.env.get("PORT")}`);
}

function App() {
  return <h1>Hello SSR</h1>;
}

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css">
    <title>Document</title>
</head>
  <body>
    <main id="app">${ReactDomServer.renderToString(<App />)}</main>
    <script type="module">
      import React from "https://esm.sh/react@17.0.2";
      import ReactDom from "https://esm.sh/react-dom@17.0.2";
      ReactDom.hydrate(React.createElement(${App}), document.getElementById("app"));
    </script>
  </body>
</html>
`;

const js = `
`;

const router = new Router()
  .get("/", (ctx) => {
    ctx.response.type = "text/html";
    ctx.response.body = html;
  });

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
