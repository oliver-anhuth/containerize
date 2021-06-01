import { sayHello, serveHello } from "./hello.ts";

if (Deno.args[0] === "--serve") {
  await serveHello(Deno.args[1]);
} else {
  sayHello(Deno.args[0]);
}
