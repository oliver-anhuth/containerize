# Prerequisites:
# ./src/main.ts     - main entry point of the application
# ./import_map.json - mappings for imports
# ./lock.json       - lock file for remote dependencies

##############
# Build image
##############
FROM debian:stable-slim AS build

# Deno version
ENV DENO_VERSION=1.10.2

# Files and directories to include in the application directory (/app)
ENV APP_FILES="file.txt assets/"

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

# Create application bundle (/app) and application runner
RUN mkdir /app \
  && cp -r ${APP_FILES} /app/ \
  && deno bundle --lock ./lock.json \
                 --import-map import_map.json \
                 ./src/main.ts \
                 /app/app.js \
  && deno install --no-remote --cached-only \
                  --root /usr/local --name run \
                  /app/app.js

################
# Runtime image
################
FROM debian:stable-slim

# Copy application bundle from build image
WORKDIR /app
COPY --from=build /app .
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
