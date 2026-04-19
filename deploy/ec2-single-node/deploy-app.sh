#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/GoDamm}"

require_non_root() {
  if [[ "${EUID}" -eq 0 ]]; then
    echo "Run as a non-root user with access to docker group."
    exit 1
  fi
}

ensure_env_file() {
  if [[ ! -f "${APP_DIR}/.env" ]]; then
    echo "Missing ${APP_DIR}/.env"
    echo "Copy .env.example to .env and set secrets before deploying."
    exit 1
  fi
}

read_db_url() {
  local db_url
  db_url="$(grep -E '^DB_URL=' "${APP_DIR}/.env" | tail -n 1 | cut -d '=' -f2- || true)"

  if [[ -z "${db_url}" ]]; then
    db_url="jdbc:mysql://mysql:3306/inventory_db"
  fi

  db_url="${db_url#\"}"
  db_url="${db_url%\"}"
  echo "${db_url}"
}

uses_local_mysql() {
  local db_url
  db_url="$(read_db_url)"
  [[ "${db_url}" == *"//mysql:"* || "${db_url}" == *"@mysql:"* ]]
}

deploy_stack() {
  cd "${APP_DIR}"
  docker compose pull backend

  if uses_local_mysql; then
    echo "DB_URL targets local mysql container. Starting mysql + redis + backend."
    docker compose up -d mysql redis
  else
    echo "DB_URL targets external database. Starting redis + backend (skipping mysql container)."
    docker compose up -d redis
  fi

  docker compose up -d --no-build backend
}

post_checks() {
  cd "${APP_DIR}"
  docker compose ps
}

main() {
  require_non_root
  ensure_env_file
  deploy_stack
  post_checks

  echo
  echo "Deployment complete."
  echo "API health: curl -fsS http://127.0.0.1:8080/actuator/health"
}

main "$@"
