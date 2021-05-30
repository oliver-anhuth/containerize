##############
# Build image
##############
FROM rust:latest AS build

# Required
ARG EXECUTABLE="run"

# Optional, can be ""
ARG APP_FILES="file.txt assets/"

RUN update-ca-certificates

# Copy application directory tree
WORKDIR /build
COPY . .

# Create application folder and executable
RUN mkdir /app \
  && if [ "${APP_FILES}" != "" ]; then cp -r ${APP_FILES} /app/; fi \
  && cargo build --release \
  && cp target/release/${EXECUTABLE} /usr/local/bin/run

################
# Runtime image
################
FROM debian:stable-slim as run

# Copy application folder and binary from build image
WORKDIR /app
COPY --from=build /app .
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
