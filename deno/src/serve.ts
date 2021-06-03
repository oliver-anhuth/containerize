import { Application, Router, send } from "oak/mod.ts";

export async function serve() {
  const port = parseInt(Deno.env.get("PORT") || "8080");
  if (!port) {
    throw new Error(`Invalid port ${Deno.env.get("PORT")}`);
  }

  const app = new Application();

  const router = new Router()
    .get("/", async (ctx) => {
      await send(ctx, "main.html", {
        root: "www",
        index: "main.html",
      });
    })
    .get("/index.html", async (ctx) => {
      await send(ctx, "main.html", {
        root: "www",
        index: "main.html",
      });
    });

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.addEventListener("listen", ({ hostname, port, secure }) => {
    console.log(
      `Listening on http${secure ? "s" : ""}://${hostname ??
        "localhost"}:${port}...`,
    );
  });

  await app.listen({ port });
}
