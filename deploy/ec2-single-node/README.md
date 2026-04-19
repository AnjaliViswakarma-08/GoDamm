# EC2 Single-Node Deployment (4 GB)

This profile deploys the backend stack on one EC2 machine using Docker Compose:
- Spring Boot backend container
- MySQL container
- Redis container
- Nginx reverse proxy (HTTPS)

Frontend is hosted on Vercel:
- https://godamm.mraks.dev
- https://godamm.anjaliv.dev

Backend API domain:
- https://api.godamm.mraks.dev

## 1) Launch EC2

- Instance: t3.medium, t4g.medium, or c7i-flex.large (4 GB RAM)
- Storage: 20 GB works, 30 GB gp3 is recommended
- Security Group inbound: 22, 80, 443, 8080

## 2) Bootstrap host

On EC2:

```bash
sudo bash deploy/ec2-single-node/setup-ec2-4gb.sh
```

What it does:
- Installs Docker, Docker Compose plugin, Nginx, Certbot, and UFW
- Creates 4 GB swap and memory sysctl tuning
- Opens ports 22/80/443/8080 in UFW
- Clones or updates repository at /home/ubuntu/GoDamm
- Copies .env.example to .env if missing

## 3) Configure environment

```bash
cd ~/GoDamm
cp deploy/ec2-single-node/backend.env.example .env
nano .env
```

Set production values at minimum:
- JWT_SECRET
- DB_URL
- DB_USERNAME
- DB_PASSWORD
- REDIS_PASSWORD
- MAIL_HOST
- MAIL_PORT
- MAIL_USERNAME
- MAIL_PASSWORD

Mail notes:
- Java Mail in Spring Boot sends OTP over SMTP, so `MAIL_HOST` and `MAIL_PORT` are required.
- Typical SMTP ports are `587` (STARTTLS) and `465` (SSL/TLS).

If using AWS RDS MySQL:
- Set DB_URL to your RDS endpoint, for example:
	- jdbc:mysql://<rds-endpoint>:3306/godamm?useSSL=true&requireSSL=true&serverTimezone=UTC
- Set DB_USERNAME and DB_PASSWORD to your RDS credentials.
- In AWS security groups, allow MySQL port 3306 from your EC2 instance security group (not from 0.0.0.0/0).
- You can keep MYSQL_* values unchanged because backend will use DB_* values.

## 4) Start backend stack

```bash
cd ~/GoDamm
bash deploy/ec2-single-node/deploy-app.sh
```

This pulls the configured backend image tag (for example a commit SHA) and starts mysql, redis, and backend containers.

Deployment behavior:
- If DB_URL points to mysql container (local mode), deploy starts mysql + redis + backend.
- If DB_URL points to external host (RDS mode), deploy starts redis + backend and skips mysql container.

## 5) Configure Nginx

```bash
sudo cp deploy/ec2-single-node/nginx-inventory.conf /etc/nginx/sites-available/godamm-api
sudo ln -sf /etc/nginx/sites-available/godamm-api /etc/nginx/sites-enabled/godamm-api
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 6) Enable HTTPS with Let's Encrypt

```bash
sudo certbot --nginx -d api.godamm.mraks.dev
```

## 7) Optional auto-start with systemd

```bash
sudo cp deploy/ec2-single-node/godamm-stack.service /etc/systemd/system/godamm-stack.service
sudo systemctl daemon-reload
sudo systemctl enable --now godamm-stack
```

## 8) Health checks

```bash
curl -fsS http://127.0.0.1:8080/actuator/health
curl -I https://api.godamm.mraks.dev/actuator/health
docker compose -f ~/GoDamm/docker-compose.yml ps
free -h
```

## 9) 4 GB operations guardrails

- Keep backend heap around 1.0-1.2 GB
- Keep MySQL buffer pool around 512 MB
- Keep Redis maxmemory around 256 MB
- Keep swap at 4 GB as emergency headroom
- Upgrade to 8 GB if memory stays above 85% for sustained periods
