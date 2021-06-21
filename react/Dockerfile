##############
# Build image
##############
FROM debian:stable-slim AS build

# Required
ARG DENO_VERSION=1.11.1

# Optional, may be empty ("")
ARG IMPORT_MAP="import_map.json"
ARG LOCK_FILE="lock.json"
ARG APP_FILES="app.css app.svg"

# Install Deno binary
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get -qq update \
  && apt-get -qq install -y --no-install-recommends curl ca-certificates unzip \
  && curl -fsSL https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip \
          --output deno.zip \
  && unzip deno.zip \
  && rm deno.zip \
  && chmod u+rwx,go+rx deno \
  && mv deno /usr/local/bin/deno

# Copy application directory tree
WORKDIR /build
COPY . .

# Create application folder, bundle and runner
RUN mkdir /app \
  && if [ "${APP_FILES}" != "" ]; then cp -r ${APP_FILES} /app/; fi \
  && LOCK_FILE_ARG= \
  && if [ "${LOCK_FILE}" != "" ]; then LOCK_FILE_ARG="--lock ${LOCK_FILE}"; fi \
  && IMPORT_MAP_ARG= \
  && if [ "${IMPORT_MAP}" != "" ]; then IMPORT_MAP_ARG="--import-map ${IMPORT_MAP}"; fi \
  && deno bundle ${LOCK_FILE_ARG} \
                 ${IMPORT_MAP_ARG} \
                 app.tsx \
                 /app/app.js \
  && deno run ${LOCK_FILE_ARG} \
              ${IMPORT_MAP_ARG} \
              html.tsx \
              > /app/app.html \
  && deno bundle ${LOCK_FILE_ARG} \
                 ${IMPORT_MAP_ARG} \
                 serve.ts \
                 /app/serve.js \
  && deno install --no-remote --cached-only \
                  --allow-env --allow-read --allow-net \
                  --root /usr/local --name serve \
                  /app/serve.js

###################
# Deployment image
###################
FROM debian:stable-slim as run

ARG USER=user
ARG UID=1234

# Copy application bundle from build image
WORKDIR /app
COPY --from=build /app .
COPY --from=build /usr/local/bin/deno /usr/local/bin/deno
COPY --from=build /usr/local/bin/serve /usr/local/bin/serve

# Create unprivileged user to run the application
RUN useradd --uid ${UID} --user-group ${USER} \
  && mkdir /home/${USER} \
  && chown ${USER}:${USER} /home/${USER}

# Run as unprivileged user
USER ${USER}:${USER}
ENTRYPOINT ["/usr/local/bin/serve"]
