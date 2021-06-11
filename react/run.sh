#!/bin/sh
if deno bundle --import-map import_map.json --lock lock.json app.tsx app.js; then
    exec deno run --import-map import_map.json --lock lock.json --allow-read --allow-env --allow-net serve.ts "$@"
fi
