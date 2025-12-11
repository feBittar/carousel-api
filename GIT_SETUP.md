# Git Setup Guide

Guia para criar o repositório Git e fazer deploy na VPS.

## 🔧 Criar Repositório no GitHub

### 1. Via GitHub Web Interface

1. Acesse https://github.com/new
2. Nome do repositório: `carousel-api-vps`
3. Descrição: `API backend for carousel image generation using Puppeteer and Google Cloud Storage`
4. Visibilidade: **Private** (recomendado)
5. **NÃO** inicialize com README, .gitignore ou LICENSE (já temos localmente)
6. Clique em **Create repository**

### 2. Inicializar Git Localmente

No diretório `D:\Gevia\carousel-api-vps\`:

```bash
# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "Initial commit: Carousel API VPS with Puppeteer and GCS"

# Adicionar remote (substitua SEU-USUARIO pelo seu GitHub username)
git remote add origin https://github.com/SEU-USUARIO/carousel-api-vps.git

# Push para GitHub
git branch -M main
git push -u origin main
```

### 3. Via GitHub CLI (gh)

Se preferir usar o GitHub CLI:

```bash
cd D:\Gevia\carousel-api-vps

# Criar repositório e fazer push
gh repo create carousel-api-vps --private --source=. --remote=origin --push

# Opcional: adicionar descrição
gh repo edit --description "API backend for carousel image generation"
```

---

## 🚀 Deploy na VPS via Git

### 1. SSH na VPS

```bash
ssh user@vps-ip
```

### 2. Clonar Repositório

```bash
cd ~
git clone https://github.com/SEU-USUARIO/carousel-api-vps.git
cd carousel-api-vps
```

### 3. Setup

```bash
# Executar script de setup
bash setup.sh

# Fazer upload da chave GCP
# (rode no seu PC local em outro terminal)
scp service-account.json user@vps-ip:~/carousel-api-vps/gcp-key.json

# Configurar .env
nano .env

# Build
npm run build

# Iniciar com PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 🔄 Workflow de Atualização

### No Desenvolvimento (Local)

```bash
# 1. Fazer alterações no código
# ...

# 2. Testar localmente
npm run dev

# 3. Build de teste
npm run build

# 4. Commit e push
git add .
git commit -m "feat: sua mensagem de commit"
git push origin main
```

### Na Produção (VPS)

```bash
# 1. SSH na VPS
ssh user@vps-ip

# 2. Navegar para o diretório
cd ~/carousel-api-vps

# 3. Pull latest code
git pull origin main

# 4. Instalar novas dependências (se houver)
npm install

# 5. Build
npm run build

# 6. Reiniciar PM2
pm2 restart carousel-api

# 7. Verificar logs
pm2 logs carousel-api --lines 50
```

---

## 📋 Convenções de Commit

Use conventional commits para mensagens claras:

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças em documentação
- `style`: Formatação, espaços em branco
- `refactor`: Refatoração de código
- `perf`: Melhorias de performance
- `test`: Adicionar testes
- `chore`: Tarefas de manutenção

### Exemplos

```bash
git commit -m "feat: add webhook notification on generation complete"
git commit -m "fix: resolve puppeteer timeout on large slides"
git commit -m "docs: update README with new API endpoint"
git commit -m "perf: optimize image compression before GCS upload"
git commit -m "chore: upgrade puppeteer to version 22"
```

---

## 🌿 Branching Strategy

### Main Branch

- Branch principal: `main`
- Sempre deployável
- Protegida (requer pull request)

### Feature Branches

```bash
# Criar feature branch
git checkout -b feature/webhook-notifications

# Fazer commits
git add .
git commit -m "feat: implement webhook service"

# Push para remote
git push -u origin feature/webhook-notifications

# Criar Pull Request no GitHub
gh pr create --title "Add webhook notifications" --body "Implements webhook..."

# Após merge, deletar branch
git checkout main
git pull
git branch -d feature/webhook-notifications
```

---

## 🔒 Arquivos Sensíveis

### Nunca commitar:

- `.env` (variáveis de ambiente)
- `gcp-key.json` (chave GCP)
- `*.log` (logs)
- `node_modules/` (dependências)
- `dist/` (build artifacts)

Todos esses já estão no `.gitignore`.

### Verificar antes de commit:

```bash
# Ver status
git status

# Ver diff
git diff

# Ver arquivos staged
git diff --cached
```

---

## 🚨 Emergência: Reverter Deploy

Se algo der errado após deploy:

```bash
# Na VPS

# 1. Ver commits recentes
git log --oneline -5

# 2. Reverter para commit anterior
git reset --hard COMMIT_HASH

# 3. Rebuild
npm run build

# 4. Reiniciar
pm2 restart carousel-api

# 5. Verificar
curl http://localhost:3001/api/health
```

---

## 🏷️ Tags e Releases

### Criar versão release:

```bash
# 1. Atualizar package.json com nova versão
nano package.json  # Mude "version": "1.0.1"

# 2. Commit
git add package.json
git commit -m "chore: bump version to 1.0.1"

# 3. Criar tag
git tag -a v1.0.1 -m "Release v1.0.1: Add webhook support"

# 4. Push com tags
git push origin main --tags

# 5. Criar release no GitHub
gh release create v1.0.1 --title "v1.0.1" --notes "Release notes here"
```

---

## 📊 Ver Histórico

```bash
# Log simples
git log --oneline

# Log com grafo
git log --oneline --graph --all

# Log detalhado
git log -p

# Log de um arquivo específico
git log src/services/puppeteer.service.ts

# Commits de um autor
git log --author="seu-nome"
```

---

## 🔍 Troubleshooting Git

### Erro: "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/carousel-api-vps.git
```

### Conflitos no pull

```bash
# Ver arquivos em conflito
git status

# Editar arquivos manualmente, então:
git add .
git commit -m "Resolve merge conflicts"
```

### Descartar mudanças locais

```bash
# Um arquivo
git checkout -- src/server.ts

# Todos os arquivos
git reset --hard HEAD
```

---

## 🎯 Quick Commands

```bash
# Status
git status

# Ver mudanças
git diff

# Adicionar tudo
git add .

# Commit
git commit -m "mensagem"

# Push
git push

# Pull
git pull

# Ver branches
git branch -a

# Trocar de branch
git checkout branch-name

# Criar e trocar
git checkout -b nova-branch

# Ver remote
git remote -v

# Ver tags
git tag
```

---

Pronto! Agora você tem controle total sobre o versionamento do projeto.
