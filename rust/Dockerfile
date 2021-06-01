##############
# Build image
##############
FROM rust:latest AS build

# Required
ARG EXECUTABLE="hello"

# Optional, may be empty (="")
ARG APP_FILES="file.txt assets/"

RUN update-ca-certificates

# Copy application directory tree
WORKDIR /build
COPY . .

# Create application folder and executable
RUN mkdir /app \
  && if [ "${APP_FILES}" != "" ]; then cp -r ${APP_FILES} /app/; fi \
  && cargo build --release \
  && mkdir /app/bin \
  && cp target/release/${EXECUTABLE} /app/bin/ \
  && ln -s /app/bin/${EXECUTABLE} /usr/local/bin/run

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
