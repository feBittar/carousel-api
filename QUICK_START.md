# Quick Start Guide

Guia rápido para colocar a API no ar em 5 minutos.

## 📋 Checklist Pré-Deploy

- [ ] VPS Ubuntu 20.04+ com Node.js 18+ instalado
- [ ] Projeto GCP criado
- [ ] Bucket GCS criado (`gevia-carousel-images`)
- [ ] Service Account JSON baixada
- [ ] Domínio apontando para VPS (opcional, mas recomendado)

---

## 🚀 Deploy em 5 Passos

### 1️⃣ Clone o Repositório

```bash
cd ~
git clone https://github.com/seu-usuario/carousel-api-vps.git
cd carousel-api-vps
```

### 2️⃣ Instale Dependências

```bash
# Instalar dependências Node
npm install

# Instalar dependências Puppeteer (Chrome)
sudo apt-get update
sudo apt-get install -y chromium-browser
```

### 3️⃣ Configure Ambiente

```bash
# Copiar template de configuração
cp .env.example .env

# Editar configuração
nano .env
```

Mínimo necessário no `.env`:

```env
PORT=3001
NODE_ENV=production
GCS_PROJECT_ID=seu-projeto-gcp
GCS_KEY_FILE=/home/user/carousel-api-vps/gcp-key.json
GCS_BUCKET_NAME=gevia-carousel-images
ALLOWED_ORIGINS=https://social.gevia.co
```

**Upload da chave GCP:**

```bash
# No seu PC local
scp service-account.json user@vps-ip:~/carousel-api-vps/gcp-key.json

# Na VPS, ajustar permissões
chmod 600 ~/carousel-api-vps/gcp-key.json
```

### 4️⃣ Build e Start

```bash
# Build TypeScript
npm run build

# Instalar PM2 globalmente
sudo npm install -g pm2

# Iniciar com PM2
mkdir -p logs
pm2 start ecosystem.config.js

# Salvar configuração PM2
pm2 save
pm2 startup
```

### 5️⃣ Teste

```bash
# Health check
curl http://localhost:3001/api/health

# Deve retornar:
# {
#   "status": "healthy",
#   "services": { "puppeteer": "ok", "gcs": "ok" }
# }
```

**Teste de geração:**

```bash
curl -X POST http://localhost:3001/api/image-gen/generate-modular \
  -H "Content-Type: application/json" \
  -d @request-example.json
```

---

## 🌐 Setup Nginx (Opcional, mas Recomendado)

```bash
# 1. Instalar Nginx
sudo apt-get install -y nginx

# 2. Criar config
sudo nano /etc/nginx/sites-available/carousel-api
```

Conteúdo mínimo:

```nginx
server {
    listen 80;
    server_name api.gevia.co;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;

        # Timeouts longos
        proxy_connect_timeout 300s;
        proxy_read_timeout 300s;
    }
}
```

```bash
# 3. Ativar
sudo ln -s /etc/nginx/sites-available/carousel-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 4. SSL com Certbot
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.gevia.co
```

---

## ✅ Verificar se Está Tudo OK

```bash
# Status PM2
pm2 status

# Logs
pm2 logs carousel-api --lines 50

# Health check via domínio
curl https://api.gevia.co/api/health
```

---

## 🐛 Troubleshooting Rápido

### API não inicia

```bash
# Ver logs de erro
pm2 logs carousel-api --err

# Comum: falta dependências Chrome
sudo apt-get install -y chromium-browser chromium-chromedriver
```

### GCS error

```bash
# Verificar se arquivo existe
ls -la ~/carousel-api-vps/gcp-key.json

# Verificar permissões
chmod 600 ~/carousel-api-vps/gcp-key.json

# Verificar variável de ambiente
cat .env | grep GCS
```

### CORS blocked

Adicione origem no `.env`:

```env
ALLOWED_ORIGINS=https://social.gevia.co,https://new-origin.com
```

Reinicie:

```bash
pm2 restart carousel-api
```

---

## 🔄 Atualizar Código

```bash
cd ~/carousel-api-vps
git pull
npm install
npm run build
pm2 restart carousel-api
```

---

## 📝 Comandos Úteis

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs carousel-api

# Reiniciar
pm2 restart carousel-api

# Parar
pm2 stop carousel-api

# Deletar
pm2 delete carousel-api

# Monitorar recursos
pm2 monit
```

---

## 🎉 Pronto!

Sua API está rodando! Acesse:

- **Health**: `https://api.gevia.co/api/health`
- **Generate**: `POST https://api.gevia.co/api/image-gen/generate-modular`

Para documentação completa, veja [README.md](./README.md).
