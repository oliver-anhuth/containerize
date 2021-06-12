#!/bin/sh
set -e
IMPORT_MAP="--import-map import_map.json"
LOCK="--lock lock.json"
deno cache --reload $LOCK $IMPORT_MAP serve.ts app.tsx html.tsx
