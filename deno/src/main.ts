import { sayHello } from "./hello.ts";
import { serve } from "./serve.ts"

if (Deno.args[0] === "--serve") {
  serve();
} else {
  sayHello(Deno.args[0]);
}
