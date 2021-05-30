use std::env;
use yansi::Paint;

fn main() {
    let who = env::args().nth(1).unwrap_or(String::from("world"));
    println!("Hello, {}!", Paint::red(who));
}
