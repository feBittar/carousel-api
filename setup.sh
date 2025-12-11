#!/bin/bash

# ============================================================================
# Carousel API VPS - Setup Script
# ============================================================================
# Este script instala todas as dependências necessárias na VPS Ubuntu
# Execute com: bash setup.sh
# ============================================================================

set -e

echo ""
echo "========================================"
echo "  Carousel API VPS - Setup Script"
echo "========================================"
echo ""

# ============================================================================
# Check if running as root
# ============================================================================

if [ "$EUID" -eq 0 ]; then
  echo "⚠️  Não execute este script como root!"
  echo "Execute como usuário normal: bash setup.sh"
  exit 1
fi

# ============================================================================
# 1. Update system
# ============================================================================

echo "📦 [1/6] Atualizando sistema..."
sudo apt-get update -y

# ============================================================================
# 2. Install Node.js 18.x
# ============================================================================

echo "📦 [2/6] Instalando Node.js 18..."

# Check if Node.js is already installed
if command -v node &> /dev/null; then
  NODE_VERSION=$(node -v)
  echo "✅ Node.js já instalado: $NODE_VERSION"
else
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  echo "✅ Node.js instalado: $(node -v)"
fi

# ============================================================================
# 3. Install Puppeteer dependencies (Chrome headless)
# ============================================================================

echo "📦 [3/6] Instalando dependências do Puppeteer..."

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
  xdg-utils \
  chromium-browser

echo "✅ Dependências do Puppeteer instaladas"

# ============================================================================
# 4. Install PM2
# ============================================================================

echo "📦 [4/6] Instalando PM2..."

if command -v pm2 &> /dev/null; then
  echo "✅ PM2 já instalado: $(pm2 -v)"
else
  sudo npm install -g pm2
  echo "✅ PM2 instalado: $(pm2 -v)"
fi

# ============================================================================
# 5. Install project dependencies
# ============================================================================

echo "📦 [5/6] Instalando dependências do projeto..."

npm install

echo "✅ Dependências do projeto instaladas"

# ============================================================================
# 6. Setup .env file
# ============================================================================

echo "📦 [6/6] Configurando arquivo .env..."

if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Arquivo .env criado (configure antes de rodar!)"
  echo ""
  echo "⚠️  IMPORTANTE: Edite o arquivo .env com suas configurações:"
  echo "   - GCS_PROJECT_ID"
  echo "   - GCS_KEY_FILE"
  echo "   - GCS_BUCKET_NAME"
  echo "   - ALLOWED_ORIGINS"
  echo ""
  echo "   Use: nano .env"
else
  echo "✅ Arquivo .env já existe"
fi

# ============================================================================
# Create logs directory
# ============================================================================

mkdir -p logs
echo "✅ Diretório de logs criado"

# ============================================================================
# Done
# ============================================================================

echo ""
echo "========================================"
echo "  ✅ Setup concluído!"
echo "========================================"
echo ""
echo "Próximos passos:"
echo ""
echo "1. Faça upload da chave GCP:"
echo "   scp service-account.json user@vps-ip:~/carousel-api-vps/gcp-key.json"
echo ""
echo "2. Configure o arquivo .env:"
echo "   nano .env"
echo ""
echo "3. Build o projeto:"
echo "   npm run build"
echo ""
echo "4. Inicie a aplicação:"
echo "   pm2 start ecosystem.config.js"
echo "   pm2 save"
echo "   pm2 startup"
echo ""
echo "5. Teste a API:"
echo "   curl http://localhost:3001/api/health"
echo ""
echo "Para mais detalhes, veja QUICK_START.md"
echo ""
