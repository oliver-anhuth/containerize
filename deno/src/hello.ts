import { red } from "std/fmt/colors.ts";
import { serve } from "std/http/server.ts";

export function sayHello(name = "World") {
  console.log(`Hello, ${red(name)}!`);
}

export async function serveHello(name = "World") {
  const port = parseInt(Deno.env.get("PORT") || "") || 8080;
  const server = serve({ port });
  console.log(`Listening on http://localhost:${port}/, Ctrl+C to quit`);
  for await (const req of server) {
    req.respond({ body: `Hello, ${name}\n` });
  }
}
