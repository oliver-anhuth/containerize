#!/bin/sh
deno cache --reload --import-map import_map.json --lock-write --lock app.lock.json app.tsx
deno cache --reload --import-map import_map.json --lock-write --lock serve.lock.json serve.ts

deno cache --reload --import-map import_map.dev.json app.tsx
deno cache --reload --import-map import_map.dev.json serve.ts
