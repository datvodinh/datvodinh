# syntax=docker/dockerfile:1
FROM python:3.12-slim@sha256:78387bc3881b8273120a12ebe6c1ab22b018ccc2c9adf565ae1ac9b536e184ea
WORKDIR /app
RUN --mount=type=secret,id=BUILD_TOKEN test "$(wc -c < /run/secrets/BUILD_TOKEN)" -gt 20
COPY server.py version.txt migration-mode.txt ./
USER 65534:65534
CMD ["python", "/app/server.py"]
