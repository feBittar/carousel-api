# Carousel API VPS - Resumo do Projeto

## 📂 Estrutura do Repositório

```
carousel-api-vps/
├── src/                           # Código-fonte TypeScript
│   ├── controllers/               # Controladores da API
│   │   └── carousel.controller.ts # Orquestra geração completa
│   ├── routes/                    # Rotas Express
│   │   ├── generate.routes.ts     # POST /generate-modular
│   │   └── index.ts               # Rotas centralizadas
│   ├── services/                  # Serviços de negócio
│   │   ├── htmlGenerator.service.ts  # Gera HTML por slide
│   │   ├── puppeteer.service.ts      # Renderiza HTML em imagem
│   │   └── gcs.service.ts            # Upload para Google Cloud
│   ├── lib/                       # Bibliotecas internas
│   │   └── carousel-composer/     # Composição de templates
│   │       ├── types.ts           # TypeScript types
│   │       ├── compositer.ts      # Lógica de composição
│   │       └── index.ts           # Exports públicos
│   ├── types/                     # Types globais
│   │   └── api.ts                 # Request/Response types
│   └── server.ts                  # Servidor Express principal
├── package.json                   # Dependências NPM
├── tsconfig.json                  # Configuração TypeScript
├── ecosystem.config.js            # Configuração PM2
├── .env.example                   # Template de variáveis de ambiente
├── .gitignore                     # Arquivos ignorados pelo Git
├── .npmrc                         # Configuração NPM
├── LICENSE                        # Licença MIT
├── README.md                      # Documentação completa
├── QUICK_START.md                 # Guia rápido de deploy
├── PROJECT_SUMMARY.md             # Este arquivo
├── request-example.json           # Exemplo de request
├── setup.sh                       # Script de instalação
└── test-api.sh                    # Script de testes
```

---

## 🔄 Fluxo de Execução

### Request do Frontend

```javascript
POST https://api.gevia.co/api/image-gen/generate-modular

{
  "carouselId": "uuid",
  "workspaceId": "uuid",
  "config": {
    "slides": [
      {
        "id": "slide-1",
        "order": 0,
        "modules": {
          "viewport": { ... },
          "card": { ... },
          "textFields": { ... },
          "contentImage": { ... }
        }
      }
    ],
    "mode": "carousel"
  }
}
```

### Processamento Interno

```
1. CarouselController.generateCarousel()
   ↓
2. HtmlGeneratorService.generateCarousel()
   → Para cada slide:
     → composeTemplate() (carousel-composer)
     → Retorna HTML completo
   ↓
3. PuppeteerService.renderMultiple()
   → Para cada HTML:
     → Inicializa headless Chrome
     → Renderiza página (1080x1440)
     → Captura screenshot PNG
     → Retorna Buffer
   ↓
4. GcsService.uploadMultiple()
   → Para cada Buffer:
     → Upload para gs://gevia-carousel-images/carousels/{carouselId}/
     → Define arquivo como público
     → Retorna URL pública
   ↓
5. Response para Frontend

{
  "success": true,
  "carouselId": "uuid",
  "images": [
    {
      "slideIndex": 0,
      "slideId": "slide-1",
      "url": "https://storage.googleapis.com/...",
      "fileName": "carousels/uuid/slide-1.png",
      "width": 1080,
      "height": 1440
    }
  ],
  "generatedAt": "2025-12-08T12:00:00Z"
}
```

---

## 🧩 Componentes Principais

### 1. Carousel Controller

**Arquivo**: `src/controllers/carousel.controller.ts`

**Responsabilidades**:
- Validar request body
- Orquestrar serviços (HTML → Puppeteer → GCS)
- Tratar erros
- Formatar response

**Endpoints**:
- `POST /api/image-gen/generate-modular`
- `GET /api/health`

---

### 2. HTML Generator Service

**Arquivo**: `src/services/htmlGenerator.service.ts`

**Responsabilidades**:
- Validar configuração do carousel
- Gerar HTML completo por slide
- Usar `carousel-composer` para composição

**Métodos**:
- `generateCarousel(config)`: Gera array de HTMLs
- `validateConfig(config)`: Valida estrutura
- `generateSlide(slide)`: Gera HTML de 1 slide

---

### 3. Puppeteer Service

**Arquivo**: `src/services/puppeteer.service.ts`

**Responsabilidades**:
- Gerenciar instância do browser
- Renderizar HTML em imagem PNG
- Otimizar performance (reusa browser)

**Métodos**:
- `initBrowser()`: Inicia headless Chrome
- `renderHtmlToImage(html)`: Renderiza 1 slide
- `renderMultiple(htmls)`: Renderiza múltiplos slides
- `closeBrowser()`: Finaliza browser
- `healthCheck()`: Verifica se está funcionando

**Configurações**:
- Viewport: 1080x1440px
- Device scale factor: 2x (retina)
- Formato: PNG
- Wait: networkidle0 + fonts loaded

---

### 4. Google Cloud Storage Service

**Arquivo**: `src/services/gcs.service.ts`

**Responsabilidades**:
- Upload de imagens para GCS
- Gerenciar permissões (público)
- Deletar imagens antigas (opcional)

**Métodos**:
- `uploadImage(buffer, fileName, carouselId)`: Upload 1 imagem
- `uploadMultiple(buffers, carouselId)`: Upload batch
- `deleteImage(fileName)`: Deleta 1 imagem
- `deleteCarousel(carouselId)`: Deleta todas imagens de um carousel
- `healthCheck()`: Verifica acesso ao bucket

**Estrutura GCS**:
```
gs://gevia-carousel-images/
└── carousels/
    └── {carouselId}/
        ├── slide-1.png
        ├── slide-2.png
        └── slide-N.png
```

---

### 5. Carousel Composer Library

**Arquivos**: `src/lib/carousel-composer/*.ts`

**Responsabilidades**:
- Compor HTML final a partir de módulos
- Gerar CSS por módulo
- Aplicar estilos e layout

**Módulos Suportados** (versão simplificada):
- `viewport`: Background do slide
- `card`: Container principal
- `textFields`: Campos de texto
- `contentImage`: Imagem de conteúdo

**Funções principais**:
- `composeTemplate(moduleIds, data, options)`: Composição principal
- `generateFinalHtml(params)`: HTML final com `<head>` e `<body>`
- `sanitizeHtml(text)`: Previne XSS

---

## 🔧 Tecnologias Utilizadas

### Backend
- **Node.js 18+**: Runtime JavaScript
- **TypeScript 5.3**: Tipagem estática
- **Express 4.18**: Framework web
- **Puppeteer 21.6**: Headless Chrome
- **@google-cloud/storage 7.7**: Cliente GCS

### Middlewares
- **cors**: CORS configurável
- **helmet**: Security headers
- **morgan**: Request logging
- **dotenv**: Variáveis de ambiente

### DevOps
- **PM2**: Process manager
- **ts-node-dev**: Hot reload em dev
- **Nginx**: Reverse proxy (opcional)
- **Certbot**: SSL/TLS (opcional)

---

## 📊 Performance

### Benchmarks

| Operação | Tempo Médio |
|----------|-------------|
| Gerar HTML (1 slide) | ~50ms |
| Renderizar imagem (1 slide) | ~2s |
| Upload para GCS (1 slide) | ~500ms |
| **Total por slide** | **~2.5s** |
| **Total 10 slides** | **~25s** |

### Gargalos

1. **Puppeteer** (maior gargalo):
   - Renderização é CPU-intensive
   - Single-threaded
   - Solução: Scaling horizontal (múltiplas VPS)

2. **Upload GCS**:
   - Depende de latência de rede
   - Solução: VPS na mesma região do GCS

3. **Fonts loading**:
   - Google Fonts precisa baixar em cada render
   - Solução: Cache de fonts localmente (futuro)

### Otimizações Implementadas

- ✅ Browser reusado entre requests (não fecha após cada render)
- ✅ Device scale factor 2x (qualidade retina sem aumentar viewport)
- ✅ Upload em paralelo (Promise.all)
- ✅ Timeouts configuráveis
- ✅ Graceful shutdown do browser

---

## 🔒 Segurança

### Implementado

- ✅ **CORS**: Origins permitidas configuráveis
- ✅ **Helmet**: Security headers (CSP, XSS protection)
- ✅ **Rate limiting**: Via Nginx (opcional)
- ✅ **Body size limit**: 10MB max
- ✅ **XSS prevention**: Sanitização de HTML
- ✅ **Service Account**: Permissões mínimas GCP
- ✅ **HTTPS**: SSL/TLS via Certbot

### Boas Práticas

- Não expor `.env` no Git
- Não expor chaves GCP no Git
- Service account com permissões apenas de Storage Object Admin
- Bucket GCS com acesso público apenas para leitura
- Logs de segurança com Morgan

---

## 💰 Custos Estimados

### Google Cloud Storage

| Item | Custo Mensal (1000 imagens) |
|------|----------------------------|
| Storage (0.3GB) | ~$0.006 |
| Network egress (1GB) | $0 (1TB grátis) |
| **Total** | **~$0.01/mês** |

### VPS

| Especificação | Custo Mensal |
|---------------|--------------|
| 2 vCPUs, 4GB RAM | ~$12-20 |
| 50GB SSD | Incluído |
| **Total** | **~$15/mês** |

**Custo total estimado**: ~$15/mês

---

## 🚀 Roadmap Futuro

### Melhorias Planejadas

- [ ] **Cache de fontes**: Baixar Google Fonts localmente
- [ ] **Queue system**: Redis + Bull para queue de geração
- [ ] **Webhooks**: Notificar frontend quando geração completa
- [ ] **Metrics**: Prometheus + Grafana
- [ ] **CDN**: CloudFlare na frente do GCS
- [ ] **Retry logic**: Retry automático em falhas
- [ ] **Batch optimization**: Gerar múltiplos slides em paralelo
- [ ] **Docker**: Containerização com Dockerfile

### Módulos Adicionais

- [ ] **Bullets**: Listas com marcadores
- [ ] **Logo**: Logo da marca
- [ ] **Corners**: Elementos nos cantos
- [ ] **Texture Overlay**: Texturas de fundo
- [ ] **Arrows**: Setas e indicadores

---

## 📚 Documentação Adicional

- **README.md**: Documentação completa e detalhada
- **QUICK_START.md**: Guia de deploy em 5 passos
- **VPS_IMPLEMENTATION_GUIDE.md**: Guia técnico original (na raiz do content-chisel)

---

## 🤝 Contribuindo

Este é um projeto interno da Gevia. Para sugestões ou bugs:

1. Abra uma issue no GitHub
2. Descreva o problema ou sugestão
3. Inclua logs e exemplos quando possível

---

## 📞 Suporte

- **Email**: dev@gevia.co
- **GitHub**: [github.com/gevia/carousel-api-vps](https://github.com/gevia/carousel-api-vps)

---

**Última atualização**: 2025-12-11
**Versão**: 1.0.0
**Mantido por**: Equipe Gevia
