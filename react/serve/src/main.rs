use warp::{self, Filter};

#[tokio::main]
async fn main() {
    let port = 8080;
    let html = warp::get()
        .and(warp::path::end())
        .and(warp::fs::file("app.html"));
    let js = warp::get()
        .and(warp::path("app.js"))
        .and(warp::path::end())
        .and(warp::fs::file("app.js"));
    let css = warp::get()
        .and(warp::path("app.css"))
        .and(warp::path::end())
        .and(warp::fs::file("app.css"));
    let favicon = warp::get()
        .and(warp::path("app.svg"))
        .and(warp::path::end())
        .and(warp::fs::file("app.svg"));
    let routes = html.or(js).or(css).or(favicon);
    println!("Listening on http://localhost:{}", port);
    warp::serve(routes).run(([0, 0, 0, 0], port)).await;
}
