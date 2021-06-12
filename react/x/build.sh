#!/bin/sh
BUILD_TYPE=production

while [ $# -gt 0 ]; do
    case "$1" in
        --development | --develop | --dev )
            BUILD_TYPE=development
            ;;
        --production | --prod )
            BUILD_TYPE=production
            ;;
        --clean )
            BUILD_TYPE=clean
            ;;
    esac
    shift
done

IMPORT_MAP="--import-map import_map.json"
LOCK="--lock lock.json"
if [ "$BUILD_TYPE" = "development" ]; then
    IMPORT_MAP="--import-map dev.import_map.json"
    LOCK=""
fi

rm -rf build
if [ "$BUILD_TYPE" != "clean" ]; then
    mkdir -p build \
    && deno bundle $LOCK $IMPORT_MAP serve.ts build/serve.js \
    && deno bundle $LOCK $IMPORT_MAP app.tsx build/app.js \
    && deno run $LOCK $IMPORT_MAP html.tsx > build/app.html \
    && touch "build/$BUILD_TYPE-build"
fi