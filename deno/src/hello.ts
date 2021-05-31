import { red } from "std/fmt/colors.ts";
import { serve } from "std/http/server.ts";

export async function hello(name = "World") {
  const port = parseInt(Deno.env.get("PORT") || "");
  if (port) {
    const server = serve({ port });
    console.log(`Listening on http://localhost:${port}/, Ctrl+C to quit`);
    for await (const req of server) {
      req.respond({ body: `Hello, ${name}\n` });
    }
  } else {
    console.log(`Hello, ${red(name)}!`);
  }
}
