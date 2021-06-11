#!/bin/sh
if deno bundle --import-map import_map.json --lock app.lock.json app.tsx app.js; then
    exec deno run --import-map import_map.json --lock serve.lock.json --allow-read --allow-env --allow-net serve.ts "$@"
fi
