#!/bin/bash

# ============================================================================
# Docker Deploy Script - Carousel API VPS
# ============================================================================
# Script para fazer deploy/atualização da API usando Docker
# ============================================================================

set -e

echo ""
echo "========================================"
echo "  🐳 Carousel API - Docker Deploy"
echo "========================================"
echo ""

# ============================================================================
# Verificar se está no diretório correto
# ============================================================================

if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Erro: docker-compose.yml não encontrado!"
    echo "Execute este script no diretório /var/www/carousel-api"
    exit 1
fi

# ============================================================================
# Verificar se .env existe
# ============================================================================

if [ ! -f ".env" ]; then
    echo "❌ Erro: arquivo .env não encontrado!"
    echo "Crie o arquivo .env antes de fazer deploy"
    echo "Use: cp .env.example .env"
    exit 1
fi

# ============================================================================
# Verificar se gcp-key.json existe
# ============================================================================

if [ ! -f "gcp-key.json" ]; then
    echo "⚠️  Aviso: gcp-key.json não encontrado no diretório atual"
    echo "Certifique-se de que o arquivo existe em /var/www/carousel-api/gcp-key.json"
    read -p "Continuar mesmo assim? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# ============================================================================
# Parar containers existentes
# ============================================================================

echo "📦 [1/4] Parando containers existentes..."

if docker ps -q --filter "name=carousel-api" | grep -q .; then
    docker compose down
    echo "✅ Containers parados"
else
    echo "ℹ️  Nenhum container rodando"
fi

# ============================================================================
# Rebuild da imagem Docker
# ============================================================================

echo ""
echo "🔨 [2/4] Construindo imagem Docker..."

docker compose build

echo "✅ Imagem construída com sucesso"

# ============================================================================
# Iniciar containers
# ============================================================================

echo ""
echo "🚀 [3/4] Iniciando containers..."

docker compose up -d

echo "✅ Containers iniciados"

# ============================================================================
# Verificar status
# ============================================================================

echo ""
echo "🔍 [4/4] Verificando status..."

# Aguardar alguns segundos para o container iniciar
sleep 5

# Verificar se container está rodando
if docker ps | grep -q "carousel-api"; then
    echo "✅ Container está rodando"

    # Verificar health check
    echo ""
    echo "Aguardando health check..."
    sleep 10

    HEALTH_STATUS=$(docker inspect --format='{{.State.Health.Status}}' carousel-api 2>/dev/null || echo "none")

    if [ "$HEALTH_STATUS" = "healthy" ]; then
        echo "✅ Health check: HEALTHY"
    elif [ "$HEALTH_STATUS" = "starting" ]; then
        echo "⏳ Health check: STARTING (ainda inicializando)"
    else
        echo "⚠️  Health check: $HEALTH_STATUS"
    fi
else
    echo "❌ Container não está rodando!"
    echo "Verifique os logs com: docker-compose logs"
    exit 1
fi

# ============================================================================
# Informações finais
# ============================================================================

echo ""
echo "========================================"
echo "  ✅ Deploy concluído!"
echo "========================================"
echo ""
echo "📊 Comandos úteis:"
echo ""
echo "  Ver logs:              docker compose logs -f"
echo "  Parar:                 docker compose down"
echo "  Reiniciar:             docker compose restart"
echo "  Status:                docker compose ps"
echo "  Health check manual:   curl http://localhost:3001/api/health"
echo ""
echo "🌐 API rodando em: http://localhost:3001"
echo ""

# Testar API
echo "🧪 Testando API..."
sleep 2

if curl -s http://localhost:3001/api/health | grep -q "healthy"; then
    echo "✅ API respondendo corretamente!"
else
    echo "⚠️  API não respondeu ao health check"
    echo "Verifique os logs: docker compose logs"
fi

echo ""
