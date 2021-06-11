#!/bin/sh
if deno bundle --import-map import_map.dev.json app.tsx app.js; then
    exec deno run --import-map import_map.dev.json --allow-read --allow-env --allow-net serve.ts "$@"
fi
