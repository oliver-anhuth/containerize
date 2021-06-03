#!/bin/sh
exec deno run --allow-env --allow-net --allow-read --import-map import_map.json --lock lock.json src/main.ts "$@"
