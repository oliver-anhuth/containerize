import { Application, Router, send } from "oak/mod.ts";
import { html } from "./app.tsx";

// Use PORT environent variable, fallback 8080
const port = parseInt(Deno.env.get("PORT") || "8080");
if (!port) {
  throw new Error(`Invalid port ${Deno.env.get("PORT")}`);
}

// Create routes and web server
const router = new Router()
  .get("/", (ctx) => {
    // Serve main HTML page
    ctx.response.type = "text/html";
    ctx.response.body = html;
  })
  .get("/app.js", async (ctx) => {
    // Serve JavaScript aplication bundle
    await send(ctx, "app.js", { root: "." });
  });

const server = new Application();
server.use(router.routes());
server.use(router.allowedMethods());

// Start web server
server.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on http${secure ? "s" : ""}://${hostname ??
      "localhost"}:${port}...`,
  );
});
await server.listen({ port });
