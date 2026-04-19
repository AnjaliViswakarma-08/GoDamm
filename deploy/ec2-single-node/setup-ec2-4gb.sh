#!/usr/bin/env bash
set -euo pipefail

# Idempotent host bootstrap for a 4 GB Ubuntu EC2 VM using Docker Compose.
SWAP_SIZE_GB="${SWAP_SIZE_GB:-4}"
APP_USER="${APP_USER:-ubuntu}"
APP_DIR="${APP_DIR:-/home/${APP_USER}/GoDamm}"
REPO_URL="${REPO_URL:-https://github.com/Anjan-Kumar-Sahoo/GoDamm.git}"

require_root() {
  if [[ "${EUID}" -ne 0 ]]; then
    echo "Run as root: sudo bash deploy/ec2-single-node/setup-ec2-4gb.sh"
    exit 1
  fi
}

ensure_swap() {
  if swapon --show --noheadings | grep -q "/swapfile"; then
    echo "Swap already configured"
    return
  fi

  echo "Creating ${SWAP_SIZE_GB}G swapfile"
  fallocate -l "${SWAP_SIZE_GB}G" /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=$((SWAP_SIZE_GB * 1024))
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile

  if ! grep -q "^/swapfile" /etc/fstab; then
    echo "/swapfile none swap sw 0 0" >> /etc/fstab
  fi

  cat > /etc/sysctl.d/99-godamm-memory.conf <<EOF
vm.swappiness=15
vm.vfs_cache_pressure=60
EOF
  sysctl --system >/dev/null
}

configure_firewall() {
  ufw allow OpenSSH || true
  ufw allow 80/tcp || true
  ufw allow 443/tcp || true
  ufw allow 8080/tcp || true
  ufw --force enable || true
}

clone_or_update_repo() {
  if [[ ! -d "${APP_DIR}/.git" ]]; then
    git clone "${REPO_URL}" "${APP_DIR}"
  else
    git -C "${APP_DIR}" fetch --all --prune
    git -C "${APP_DIR}" pull --ff-only
  fi
}

prepare_env_file() {
  if [[ ! -f "${APP_DIR}/.env" ]]; then
    cp "${APP_DIR}/.env.example" "${APP_DIR}/.env"
  fi

  chown -R "${APP_USER}:${APP_USER}" "${APP_DIR}"
}

install_packages() {
  export DEBIAN_FRONTEND=noninteractive

  apt-get update
  apt-get install -y \
    ca-certificates \
    curl \
    git \
    gnupg \
    lsb-release \
    docker.io \
    docker-compose-plugin \
    nginx \
    certbot \
    python3-certbot-nginx \
    ufw

  systemctl enable --now docker
  systemctl enable --now nginx
  usermod -aG docker "${APP_USER}" || true
}

main() {
  require_root
  install_packages
  ensure_swap
  configure_firewall
  clone_or_update_repo
  prepare_env_file

  echo
  echo "Host bootstrap complete."
  echo "Next steps:"
  echo "1) Edit ${APP_DIR}/.env and set real secrets"
  echo "2) Install Nginx config from deploy/ec2-single-node/nginx-inventory.conf"
  echo "3) Run: sudo -u ${APP_USER} bash ${APP_DIR}/deploy/ec2-single-node/deploy-app.sh"
}

main "$@"
