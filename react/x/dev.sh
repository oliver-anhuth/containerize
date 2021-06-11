#!/bin/sh
if deno bundle --import-map dev.import_map.json app.tsx app.js; then
    exec deno run --import-map dev.import_map.json --allow-read --allow-env --allow-net serve.ts "$@"
fi
