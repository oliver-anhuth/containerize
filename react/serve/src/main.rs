use warp::{self, Filter};

#[tokio::main]
async fn main() {
    let html = warp::get()
        .and(warp::path::end())
        .and(warp::fs::file("app.html"));
    let js = warp::get()
        .and(warp::path("app.js"))
        .and(warp::path::end())
        .and(warp::fs::file("app.js"));
    let routes = html.or(js);
    warp::serve(routes).run(([0, 0, 0, 0], 8080)).await;
}