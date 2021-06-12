#!/bin/sh
cd build \
&& exec deno run --allow-read --allow-env --allow-net serve.js
