import { Application, Router, send } from "oak/mod.ts";

async function serve(): Promise<void> {
  // Use PORT environent variable, fallback 8080
  const port = parseInt(Deno.env.get("PORT") || "8080");
  if (!port) {
    throw new Error(`Invalid port ${Deno.env.get("PORT")}`);
  }

  // Create routes and web server
  const router = new Router()
    .get("/", async (ctx) => {
      // Serve HTML page
      await send(ctx, "app.html", { root: "." });
    })
    .get("/app.js", async (ctx) => {
      // Serve JavaScript aplication bundle
      await send(ctx, "app.js", { root: "." });
    })
    .get("/app.css", async (ctx) => {
      // Serve style sheet
      await send(ctx, "app.css", { root: "." });
    })
    .get("/app.svg", async (ctx) => {
      // Serve favicon
      await send(ctx, "app.svg", { root: "." });
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
}

if (import.meta.main) {
  await serve();
}
