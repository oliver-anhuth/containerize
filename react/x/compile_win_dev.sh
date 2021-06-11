#!/bin/sh
if deno bundle --import-map import_map.dev.json app.tsx app.js; then
    deno compile --target x86_64-pc-windows-msvc --output serve --import-map import_map.dev.json --allow-read --allow-env --allow-net serve.ts "$@"
fi
