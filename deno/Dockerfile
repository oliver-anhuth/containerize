# Prerequisites:
# ./src/main.ts     - main entry point of the application
# ./import_map.json - mappings for imports
# ./lock.json       - lock file for remote dependencies

# Start from slim image
FROM debian:stable-slim

# Application user and directory
ENV APP_USER user
ENV APP_UID 1234
ENV APP_DIR /app
ARG APP_FILES="src assets bin foo bar"

# Deno version and installation directory
ENV DENO_VERSION=1.10.2
ENV DENO_INSTALL_ROOT /usr/local

# Install Deno binary (adopted from https://github.com/hayd/deno-docker)
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -qq update \
 && apt-get -qq install -y --no-install-recommends curl ca-certificates unzip \
 && curl -fsSL https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip \
         --output deno.zip \
 && unzip deno.zip \
 && rm deno.zip \
 && chmod 755 deno \
 && mv deno ${DENO_INSTALL_ROOT}/bin/deno \
 && apt-get -qq remove --purge -y curl ca-certificates unzip \
 && apt-get -y -qq autoremove \
 && apt-get -qq clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Create non privileged user to run the application
RUN useradd --uid ${APP_UID} --user-group ${APP_USER} \
 && mkdir /home/${APP_USER} \
 && chown ${APP_USER}:${APP_USER} /home/${APP_USER}

# Copy application directory tree
WORKDIR ${APP_DIR}
COPY . .

# Set up Deno cache directory
# Create and install bundle
# Remove generated files and Deno cache directory
# Set up entry point
ENV DENO_DIR ${APP_DIR}/deno_cache
RUN mkdir ${DENO_DIR} \
 && deno bundle --lock ./lock.json \
                --import-map import_map.json \
                ./src/main.ts \
                ${APP_DIR}/app.js \
 && deno install --no-remote --cached-only \
                 --root ${DENO_INSTALL_ROOT} --name run \
                 ${APP_DIR}/app.js \
 && rm -rf ${DENO_DIR}
ENTRYPOINT ["/usr/local/bin/run"]

# Run as unprivileged user
USER ${APP_USER}:${APP_USER}
ENV DENO_DIR /home/${APP_USER}/.deno
