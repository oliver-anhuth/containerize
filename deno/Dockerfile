##############
# Build image
##############
FROM debian:stable-slim AS build

ARG DENO_VERSION=1.10.2
ARG ENTRY_POINT="src/main.ts"
ARG IMPORT_MAP="import_map.json"
ARG LOCK_FILE="lock.json"
ARG APP_FILES="file.txt assets/"

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
  && cp -r ${APP_FILES} /app/ \
  && LOCK_FILE_ARG= \
  && if [ "${LOCK_FILE}" != "" ]; then LOCK_FILE_ARG="--lock ${LOCK_FILE}"; fi \
  && IMPORT_MAP_ARG= \
  && if [ "${IMPORT_MAP}" != "" ]; then IMPORT_MAP_ARG="--import-map ${IMPORT_MAP}"; fi \
  && deno bundle ${LOCK_FILE_ARG} \
                 ${IMPORT_MAP_ARG} \
                 ${ENTRY_POINT} \
                 /usr/local/app.js \
  && deno install --no-remote --cached-only \
                  --root /usr/local --name run \
                  /usr/local/app.js

################
# Runtime image
################
FROM debian:stable-slim as run

# Copy application bundle from build image
WORKDIR /app
COPY --from=build /app .
COPY --from=build /usr/local/app.js /usr/local/app.js
COPY --from=build /usr/local/bin/deno /usr/local/bin/deno
COPY --from=build /usr/local/bin/run /usr/local/bin/run

# Create unprivileged user to run the application
ARG USER=user
ARG UID=1234
RUN useradd --uid ${UID} --user-group ${USER} \
  && mkdir /home/${USER} \
  && chown ${USER}:${USER} /home/${USER}

# Run as unprivileged user
USER ${USER}:${USER}
ENTRYPOINT ["/usr/local/bin/run"]
