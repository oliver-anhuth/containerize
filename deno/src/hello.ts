import { red } from "std/fmt/colors.ts";

export function hello(name = "World") {
  console.log(`Hello, ${red(name)}!`);
}
