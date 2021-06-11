#!/bin/sh
exec deno run --import-map import_map.json --lock lock.json --allow-env --allow-net main.tsx "$@"
