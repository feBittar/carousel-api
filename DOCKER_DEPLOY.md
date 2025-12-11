# Docker Deploy Guide

Guia completo para fazer deploy da API usando Docker.

## 📋 Pré-requisitos na VPS

### 1. Instalar Docker

```bash
# Atualizar sistema
sudo apt-get update

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Adicionar usuário ao grupo docker (para não precisar de sudo)
sudo usermod -aG docker $USER

# Relogar ou rodar:
newgrp docker

# Verificar instalação
docker --version
```

### 2. Verificar Docker Compose

```bash
# Docker Compose já vem com Docker moderno
docker compose version

# Se não funcionar, instale o plugin:
sudo apt-get install docker compose-plugin
```

---

## 🚀 Deploy Inicial

### 1. Clonar Repositório (se ainda não fez)

```bash
cd /var/www
git clone https://github.com/SEU-USUARIO/carousel-api-vps.git carousel-api
cd carousel-api
```

### 2. Configurar Ambiente

```bash
# Copiar template de .env
cp .env.example .env

# Editar .env
nano .env
```

**Preencha com seus dados:**

```env
PORT=3001
NODE_ENV=production
BASE_URL=https://api.gevia.co
ALLOWED_ORIGINS=https://social.gevia.co,http://localhost:5173
GCS_PROJECT_ID=folkloric-stone-475712-k7
GCS_KEY_FILE=/app/gcp-key.json
GCS_BUCKET_NAME=seu-bucket-name
LOG_LEVEL=info
MAX_REQUEST_SIZE=10mb
```

**⚠️ IMPORTANTE**: No Docker, use `GCS_KEY_FILE=/app/gcp-key.json` (caminho dentro do container)

### 3. Verificar Chave GCP

Certifique-se de que `gcp-key.json` está em `/var/www/carousel-api/`:

```bash
ls -la /var/www/carousel-api/gcp-key.json
```

### 4. Build e Start

```bash
# Dar permissão ao script de deploy
chmod +x deploy-docker.sh

# Executar deploy
./deploy-docker.sh
```

**OU manualmente:**

```bash
# Build da imagem
docker compose build

# Iniciar containers
docker compose up -d

# Ver logs
docker compose logs -f
```

---

## 🔄 Atualizar Aplicação

Quando fizer mudanças no código:

```bash
cd /var/www/carousel-api

# 1. Puxar código atualizado
git pull origin main

# 2. Rebuild e reiniciar
./deploy-docker.sh
```

**OU manualmente:**

```bash
git pull origin main
docker compose down
docker compose build --no-cache
docker compose up -d
```

---

## 📊 Comandos Úteis

### Gerenciamento de Containers

```bash
# Ver status
docker compose ps

# Ver logs
docker compose logs -f

# Ver logs apenas de erros
docker compose logs -f | grep ERROR

# Parar containers
docker compose down

# Reiniciar
docker compose restart

# Rebuild sem cache
docker compose build --no-cache

# Start em foreground (ver logs direto)
docker compose up
```

### Debugging

```bash
# Entrar no container
docker exec -it carousel-api bash

# Ver processos dentro do container
docker exec carousel-api ps aux

# Ver health check status
docker inspect --format='{{.State.Health.Status}}' carousel-api

# Testar API
curl http://localhost:3001/api/health
```

### Limpeza

```bash
# Remover containers parados
docker container prune

# Remover imagens não usadas
docker image prune

# Remover tudo não usado (cuidado!)
docker system prune -a
```

---

## 🌐 Configurar Nginx (Reverse Proxy)

### 1. Instalar Nginx

```bash
sudo apt-get install -y nginx
```

### 2. Criar Configuração

```bash
sudo nano /etc/nginx/sites-available/carousel-api
```

**Conteúdo:**

```nginx
server {
    listen 80;
    server_name api.gevia.co;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts longos para geração
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }
}
```

### 3. Ativar Configuração

```bash
sudo ln -s /etc/nginx/sites-available/carousel-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. SSL com Certbot

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.gevia.co
```

---

## 🔒 Segurança

### Volumes Sensíveis

O `docker compose.yml` monta a chave GCP como **read-only**:

```yaml
volumes:
  - /var/www/carousel-api/gcp-key.json:/app/gcp-key.json:ro
```

Isso impede que o container modifique a chave.

### Usuário Non-Root

O Dockerfile cria um usuário `nodejs` não-privilegiado para rodar a aplicação, aumentando a segurança.

### Network Isolation

Containers rodam em uma rede isolada (`carousel-network`), expondo apenas a porta 3001.

---

## 📈 Monitoramento

### Ver Uso de Recursos

```bash
# Ver stats em tempo real
docker stats carousel-api

# Ver uso de memória
docker exec carousel-api free -h

# Ver processos
docker top carousel-api
```

### Logs Estruturados

```bash
# Logs com timestamp
docker compose logs -f --timestamps

# Últimas 100 linhas
docker compose logs --tail=100

# Desde uma hora específica
docker compose logs --since 2024-01-01T12:00:00
```

---

## 🐛 Troubleshooting

### Container não inicia

```bash
# Ver logs de erro
docker compose logs

# Verificar se porta está em uso
sudo lsof -i :3001

# Rebuild forçado
docker compose down -v
docker compose build --no-cache
docker compose up
```

### Erro de permissão GCP

```bash
# Verificar se arquivo existe no host
ls -la /var/www/carousel-api/gcp-key.json

# Verificar permissões
chmod 600 /var/www/carousel-api/gcp-key.json

# Verificar se está montado no container
docker exec carousel-api ls -la /app/gcp-key.json
```

### Health check failing

```bash
# Testar manualmente
docker exec carousel-api curl http://localhost:3001/api/health

# Ver logs detalhados
docker inspect carousel-api | grep -A 10 Health
```

### Puppeteer não funciona

```bash
# Verificar se Chromium está instalado no container
docker exec carousel-api which chromium

# Verificar dependências
docker exec carousel-api chromium --version
```

---

## 🔄 Backup e Restore

### Backup da Configuração

```bash
# Backup do .env e chave GCP
tar -czf carousel-api-config-backup.tar.gz .env gcp-key.json

# Fazer download do backup
scp root@159.65.222.28:/var/www/carousel-api/carousel-api-config-backup.tar.gz ~/Desktop/
```

### Restore

```bash
# Upload do backup
scp ~/Desktop/carousel-api-config-backup.tar.gz root@159.65.222.28:/var/www/carousel-api/

# Extrair
cd /var/www/carousel-api
tar -xzf carousel-api-config-backup.tar.gz
```

---

## 🎯 Performance

### Otimizações Aplicadas

✅ Multi-stage build (imagem final menor)
✅ Production-only dependencies no final
✅ Chromium compartilhado do sistema (não baixa novamente)
✅ Health check configurado
✅ Restart policy: unless-stopped

### Tamanho da Imagem

```bash
# Ver tamanho
docker images | grep carousel-api

# Esperado: ~700-900MB (por causa do Chromium)
```

---

## 📝 Notas Importantes

### Docker vs PM2

**Vantagens do Docker:**
- ✅ Isolamento completo
- ✅ Fácil de atualizar (rebuild + restart)
- ✅ Portável (funciona em qualquer servidor)
- ✅ Health checks nativos
- ✅ Logs centralizados

**PM2 ainda é útil para:**
- Desenvolvimento local
- VPS sem Docker instalado

### Auto-restart

O Docker está configurado com `restart: unless-stopped`, então:
- Container reinicia automaticamente se crashar
- Container inicia automaticamente no boot da VPS
- Só para se você rodar `docker compose down`

---

Pronto! Agora você tem deploy Dockerizado! 🐳🚀
