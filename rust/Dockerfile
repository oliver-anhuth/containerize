##############
# Build image
##############
FROM rust:latest AS build

# Required
ARG EXECUTABLE="hello"

# Optional, may be empty ("")
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
  && cp "target/release/${EXECUTABLE}" /app/bin/ \
  && echo "/app/bin/${EXECUTABLE}" > /app/app-exe-path-fdb6b4b7-0ff2-4854-8f61-42bbe5675a6b

###################
# Deployment image
###################
FROM debian:stable-slim as run

# Copy application folder from build image
WORKDIR /app
COPY --from=build /app .

# Create application runner
RUN ln -s "$(cat /app/app-exe-path-fdb6b4b7-0ff2-4854-8f61-42bbe5675a6b)" /usr/local/bin/run \
  && rm /app/app-exe-path-fdb6b4b7-0ff2-4854-8f61-42bbe5675a6b

# Create unprivileged user to run the application
ARG USER=user
ARG UID=1234
RUN useradd --uid ${UID} --user-group ${USER} \
  && mkdir /home/${USER} \
  && chown ${USER}:${USER} /home/${USER}

# Run as unprivileged user
USER ${USER}:${USER}
ENTRYPOINT ["/usr/local/bin/run"]
