#!/bin/sh
exec deno run --allow-net --allow-env --import-map import_map.json --lock lock.json src/main.ts "$@"
