# Carousel API VPS

API backend para geração de carousels usando Puppeteer e Google Cloud Storage.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Deploy na VPS](#-deploy-na-vps)
- [API Endpoints](#-api-endpoints)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Visão Geral

Este projeto é a API backend responsável por:

1. **Receber configurações de carousel** do frontend (React)
2. **Gerar HTML** para cada slide usando a biblioteca `carousel-composer`
3. **Renderizar imagens** usando Puppeteer (headless Chrome)
4. **Fazer upload** das imagens para Google Cloud Storage
5. **Retornar URLs públicas** das imagens geradas

### Fluxo de Geração

```
Frontend → API VPS → HTML Generator → Puppeteer → GCS → URLs
```

---

## 🏗️ Arquitetura

```
carousel-api-vps/
├── src/
│   ├── controllers/         # Controladores da API
│   │   └── carousel.controller.ts
│   ├── routes/             # Rotas Express
│   │   ├── generate.routes.ts
│   │   └── index.ts
│   ├── services/           # Serviços (HTML, Puppeteer, GCS)
│   │   ├── htmlGenerator.service.ts
│   │   ├── puppeteer.service.ts
│   │   └── gcs.service.ts
│   ├── lib/                # Biblioteca carousel-composer
│   │   └── carousel-composer/
│   │       ├── types.ts
│   │       ├── compositer.ts
│   │       └── index.ts
│   ├── types/              # TypeScript types
│   │   └── api.ts
│   └── server.ts           # Servidor Express
├── package.json
├── tsconfig.json
├── ecosystem.config.js     # Configuração PM2
├── .env.example
└── README.md
```

### Componentes Principais

- **Express Server**: API HTTP com CORS, Helmet, Morgan
- **HTML Generator**: Compõe HTML usando módulos do carousel
- **Puppeteer Service**: Renderiza HTML em imagens PNG (1080x1440)
- **GCS Service**: Upload de imagens para Google Cloud Storage
- **Carousel Controller**: Orquestra todo o fluxo de geração

---

## 📦 Pré-requisitos

### Na VPS (Ubuntu 20.04+)

```bash
# Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Dependências do Puppeteer (Chrome headless)
sudo apt-get update
sudo apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgbm1 \
  libgcc1 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  lsb-release \
  wget \
  xdg-utils

# PM2 (gerenciador de processos)
sudo npm install -g pm2

# Git (se ainda não instalado)
sudo apt-get install -y git
```

### Google Cloud Platform

1. **Criar um projeto no GCP**
2. **Criar um bucket no Google Cloud Storage**
   - Nome: `gevia-carousel-images` (ou outro de sua escolha)
   - Região: escolha a mais próxima da VPS
   - Acesso: Uniforme
   - Public access: Permitido (para URLs públicas)
3. **Criar Service Account**
   - IAM & Admin → Service Accounts → Create
   - Conceder permissões: `Storage Object Admin`
   - Criar chave JSON e fazer download

---

## 🚀 Instalação

### 1. Clonar Repositório

```bash
# Na VPS
cd /home/seu-usuario
git clone https://github.com/seu-usuario/carousel-api-vps.git
cd carousel-api-vps
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Fazer Upload da Chave GCP

Transfira o arquivo JSON da service account para a VPS:

```bash
# No seu computador local
scp /path/to/service-account-key.json user@vps-ip:/home/user/carousel-api-vps/gcp-key.json
```

---

## ⚙️ Configuração

### 1. Criar Arquivo .env

```bash
cp .env.example .env
nano .env
```

### 2. Configurar Variáveis de Ambiente

```env
# ============================================================================
# SERVER CONFIGURATION
# ============================================================================

PORT=3001
NODE_ENV=production
BASE_URL=https://api.gevia.co

# ============================================================================
# CORS CONFIGURATION
# ============================================================================

ALLOWED_ORIGINS=https://social.gevia.co,http://localhost:5173

# ============================================================================
# GOOGLE CLOUD STORAGE
# ============================================================================

GCS_PROJECT_ID=gevia-project-123456
GCS_KEY_FILE=/home/user/carousel-api-vps/gcp-key.json
GCS_BUCKET_NAME=gevia-carousel-images

# ============================================================================
# OPTIONAL CONFIGURATIONS
# ============================================================================

LOG_LEVEL=info
MAX_REQUEST_SIZE=10mb
```

**⚠️ IMPORTANTE:**
- Substitua `gevia-project-123456` pelo ID real do seu projeto GCP
- Substitua o caminho da `GCS_KEY_FILE` pelo caminho real do arquivo JSON
- Substitua `GCS_BUCKET_NAME` pelo nome do seu bucket

### 3. Build do Projeto

```bash
npm run build
```

Este comando compila o TypeScript para JavaScript na pasta `dist/`.

---

## 🌐 Deploy na VPS

### Opção 1: PM2 (Recomendado)

```bash
# 1. Criar diretório de logs
mkdir -p logs

# 2. Iniciar aplicação com PM2
pm2 start ecosystem.config.js

# 3. Verificar status
pm2 status

# 4. Ver logs
pm2 logs carousel-api

# 5. Configurar PM2 para iniciar no boot
pm2 startup
pm2 save
```

**Comandos úteis do PM2:**

```bash
# Parar aplicação
pm2 stop carousel-api

# Reiniciar aplicação
pm2 restart carousel-api

# Deletar aplicação
pm2 delete carousel-api

# Monitorar em tempo real
pm2 monit
```

### Opção 2: Direto com Node

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

---

## 🔒 Configurar Nginx (Proxy Reverso)

### 1. Instalar Nginx

```bash
sudo apt-get install -y nginx
```

### 2. Criar Configuração do Site

```bash
sudo nano /etc/nginx/sites-available/carousel-api
```

Conteúdo:

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

        # Timeouts longos para geração de imagens
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

### 4. Configurar SSL com Certbot

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.gevia.co
```

---

## 📡 API Endpoints

### Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "status": "healthy",
  "services": {
    "puppeteer": "ok",
    "gcs": "ok"
  },
  "timestamp": "2025-12-08T12:00:00.000Z"
}
```

### Generate Carousel

```http
POST /api/image-gen/generate-modular
Content-Type: application/json
```

**Request Body:**

```json
{
  "carouselId": "550e8400-e29b-41d4-a716-446655440000",
  "workspaceId": "660e8400-e29b-41d4-a716-446655440000",
  "config": {
    "slides": [
      {
        "id": "slide-1",
        "order": 0,
        "modules": {
          "viewport": {
            "backgroundColor": "#FFFFFF"
          },
          "card": {
            "enabled": true,
            "width": 900,
            "height": 1200,
            "backgroundColor": "#F5F5F5",
            "borderRadius": 24,
            "boxShadow": "0 20px 60px rgba(0,0,0,0.15)",
            "padding": "48px"
          },
          "textFields": {
            "texts": ["Hello World", "This is a carousel"],
            "gap": "24px",
            "fontFamily": "Inter",
            "fontSize": "48px",
            "fontWeight": "700",
            "color": "#000000"
          },
          "contentImage": {
            "imageUrl": "https://picsum.photos/800/600",
            "height": "400px",
            "borderRadius": "16px"
          }
        }
      }
    ],
    "mode": "carousel"
  }
}
```

**Response (Success):**

```json
{
  "success": true,
  "carouselId": "550e8400-e29b-41d4-a716-446655440000",
  "images": [
    {
      "slideIndex": 0,
      "slideId": "slide-1",
      "url": "https://storage.googleapis.com/gevia-carousel-images/carousels/550e8400-e29b-41d4-a716-446655440000/slide-1.png",
      "fileName": "carousels/550e8400-e29b-41d4-a716-446655440000/slide-1.png",
      "width": 1080,
      "height": 1440
    }
  ],
  "generatedAt": "2025-12-08T12:00:00.000Z"
}
```

**Response (Error):**

```json
{
  "success": false,
  "error": "Failed to generate carousel",
  "details": "Error message here"
}
```

---

## 🧪 Testar API

### Usando cURL

```bash
# Health check
curl http://localhost:3001/api/health

# Generate carousel
curl -X POST http://localhost:3001/api/image-gen/generate-modular \
  -H "Content-Type: application/json" \
  -d '{
    "carouselId": "test-123",
    "workspaceId": "workspace-456",
    "config": {
      "slides": [{
        "id": "slide-1",
        "order": 0,
        "modules": {
          "viewport": { "backgroundColor": "#FFF" },
          "textFields": { "texts": ["Test Slide"] }
        }
      }],
      "mode": "carousel"
    }
  }'
```

### Usando Postman

1. Import a collection do Postman (se disponível)
2. Configure o environment com `baseUrl = http://localhost:3001`
3. Execute as requests

---

## 🐛 Troubleshooting

### Erro: "Puppeteer failed to launch Chrome"

**Causa:** Faltam dependências do Chrome headless.

**Solução:**

```bash
# Instalar dependências
sudo apt-get update
sudo apt-get install -y chromium-browser chromium-chromedriver

# Ou usar o script completo de dependências no início deste README
```

### Erro: "GCS authentication failed"

**Causa:** Chave de service account inválida ou caminho incorreto.

**Solução:**

1. Verifique se o arquivo JSON existe no caminho especificado em `GCS_KEY_FILE`
2. Verifique as permissões do arquivo:

```bash
chmod 600 /path/to/gcp-key.json
```

3. Verifique se a service account tem permissões corretas no GCP

### Erro: "CORS blocked"

**Causa:** Origem não permitida.

**Solução:**

Adicione a origem no `.env`:

```env
ALLOWED_ORIGINS=https://social.gevia.co,http://localhost:5173,https://new-origin.com
```

Reinicie a aplicação:

```bash
pm2 restart carousel-api
```

### Timeout na Geração

**Causa:** Geração de muitos slides ou slides complexos.

**Solução:**

Aumente os timeouts no Nginx:

```nginx
proxy_connect_timeout 600s;
proxy_send_timeout 600s;
proxy_read_timeout 600s;
```

Reinicie o Nginx:

```bash
sudo systemctl restart nginx
```

### Logs da Aplicação

```bash
# Ver logs em tempo real
pm2 logs carousel-api

# Ver apenas erros
pm2 logs carousel-api --err

# Ver logs salvos em arquivo
tail -f logs/error.log
tail -f logs/out.log
```

---

## 📝 Notas Importantes

### Performance

- **Puppeteer** é single-threaded: 1 geração por vez
- Para múltiplos carousels simultâneos, considere scaling horizontal (múltiplas VPS)
- Geração de 1 slide leva ~2-5 segundos
- Geração de 10 slides leva ~20-50 segundos

### Custos GCS

- **Storage**: ~$0.02/GB/mês
- **Network egress**: ~$0.12/GB (primeiros 1TB grátis)
- Imagens PNG 1080x1440: ~200-500KB cada
- 1000 imagens ≈ 0.3GB ≈ $0.006/mês de storage

### Segurança

- ✅ CORS configurado
- ✅ Helmet headers
- ✅ Request body limit (10MB)
- ✅ Service account com permissões mínimas
- ⚠️ **Não commitar** `.env` ou `gcp-key.json` no Git!

---

## 🔄 Atualizações

Para atualizar o código em produção:

```bash
cd /home/user/carousel-api-vps

# 1. Pull latest code
git pull origin main

# 2. Install dependencies
npm install

# 3. Build
npm run build

# 4. Restart PM2
pm2 restart carousel-api
```

---

## 📧 Suporte

Para problemas ou dúvidas:
- Email: dev@gevia.co
- GitHub Issues: [github.com/seu-usuario/carousel-api-vps/issues](https://github.com/seu-usuario/carousel-api-vps/issues)

---

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.
