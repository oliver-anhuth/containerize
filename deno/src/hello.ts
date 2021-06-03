import { red } from "std/fmt/colors.ts";

export function sayHello(name = "World") {
  console.log(`Hello, ${red(name)}!`);
}
