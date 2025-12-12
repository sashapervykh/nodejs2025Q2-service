FROM postgres:16-alpine

RUN mkdir -p /docker-entrypoint-initdb.d

EXPOSE 5432

HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
    CMD pg_isready -U postgres -d home_library || exit 1