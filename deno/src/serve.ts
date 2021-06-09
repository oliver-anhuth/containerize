import { Application, Context, Router, send, Status } from "oak/mod.ts";

const STATIC_ROOT = "www";

export async function serve() {
  const port = parseInt(Deno.env.get("PORT") || "8080");
  if (!port) {
    throw new Error(`Invalid port ${Deno.env.get("PORT")}`);
  }

  const app = new Application();

  const router = new Router()
    .get("/", async (ctx: Context) => {
      await send(ctx, "main.html", { root: STATIC_ROOT });
    })
    .get("/(.*)", async (ctx: Context) => {
      const path = ctx.request.url.pathname;
      const fileInfo = Deno.statSync(`${STATIC_ROOT}${path}`);
      if (!fileInfo.isFile && !fileInfo.isSymlink) {
        ctx.response.status = Status.NotFound;
        ctx.response.body = "Not Found";
        return;
      }
      await send(ctx, path, { root: STATIC_ROOT });
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

if (import.meta.main) {
  await serve();
}
