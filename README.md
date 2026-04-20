# 🚀 TrendNow Brasil

**Tudo que está em alta com melhor preço**

E-commerce moderno, seguro e otimizado de alta performance construído com Next.js 14, Tailwind CSS, TypeScript e Drizzle ORM.

## 📋 Stack Tecnológico

- **Frontend:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3.4
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Database:** PostgreSQL + Drizzle ORM
- **Authentication:** NextAuth.js + JWT
- **Payments:** Mercado Pago API
- **Images:** Next.js Image Optimization (WebP)
- **Monitoring:** Sentry + Datadog
- **Testing:** Vitest + Playwright
- **Deployment:** Vercel

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18.17.0 ou superior
- pnpm 8.0+ (recomendado) ou npm/yarn
- PostgreSQL 14+
- Git

### Setup Local

1. **Clone o repositório**

```bash
git clone <repo-url>
cd trendnow-brasil
```

2. **Instale dependências**

```bash
pnpm install
```

3. **Configure variáveis de ambiente**

```bash
cp .env.example .env.local
```

Preencha as variáveis necessárias:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/trendnow_brasil"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# JWT (generate with: openssl rand -base64 64)
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"

# Encryption (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
ENCRYPTION_KEY="your-encryption-key"

# Mercado Pago (sandbox keys para desenvolvimento)
NEXT_PUBLIC_MP_PUBLIC_KEY="APP_USR-your-public-key"
MERCADO_PAGO_ACCESS_TOKEN="APP_USR-your-access-token"
```

4. **Setup do banco de dados**

```bash
# Generate migrations
pnpm run db:generate

# Run migrations
pnpm run db:migrate

# (Optional) Open Drizzle Studio para visualizar dados
pnpm run db:studio
```

5. **Inicie o servidor de desenvolvimento**

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📂 Estrutura de Pastas

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── (public)/          # Rotas públicas
│   ├── (auth)/            # Rotas de autenticação
│   └── api/               # API routes
├── components/            # React components reutilizáveis
│   ├── common/            # Header, Footer, etc
│   ├── product/           # Product-related components
│   ├── cart/              # Cart components
│   └── ui/                # UI primitives (Button, Input, etc)
├── lib/
│   ├── db/                # Database client + schema
│   ├── zustand/           # Zustand stores
│   ├── utils/             # Utility functions
│   ├── hooks/             # Custom React hooks
│   └── api/               # API integrations
├── types/                 # TypeScript types
└── styles/                # Global CSS
```

## 🏗️ Arquitetura

### Database Schema

Tables principais:
- `users` — Usuários registrados
- `sessions` — Sessões ativas
- `refresh_tokens` — Refresh tokens para autenticação
- `products` — Catálogo de produtos
- `variants` — Variantes de produtos (cores, tamanhos)
- `reviews` — Avaliações de produtos
- `carts` — Carrinhos de compras
- `orders` — Pedidos finalizados
- `bundles` — Bundles de produtos
- `consents` — Consentimentos LGPD
- `audit_logs` — Logs de auditoria para compliance

### State Management (Zustand)

3 stores principais:
- `useCartStore` — Gerencia itens do carrinho (persistido em localStorage)
- `useAuthStore` — Gerencia sessão de autenticação
- `useUIStore` — Gerencia estado de UI (mobile menu, theme, etc)

### Authentication

- JWT com 15min de expiração para access tokens
- Refresh tokens com 7 dias de expiração
- NextAuth.js para gerenciamento de sessão
- 2FA com TOTP para admin

## 🔐 Segurança

Implementações de segurança conforme OWASP Top 10:

- ✅ **Access Control:** Todas as rotas verificam userId
- ✅ **Cryptographic:** Senhas com bcrypt 12 rounds, CPF com AES-256-GCM
- ✅ **Injection:** Queries parametrizadas com Drizzle ORM
- ✅ **XSS:** Input sanitizado, output escaped
- ✅ **Rate Limiting:** 5 tentativas de login por 15 min
- ✅ **CSRF:** Token em mutations
- ✅ **Headers:** CSP, HSTS, X-Frame-Options, etc

## 🧪 Testes

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:ui

# Coverage
pnpm test:coverage

# E2E tests
pnpm test:e2e
```

## 📊 Performance

- **SSG:** Homepage (revalidar 1h)
- **SSR:** Listagem com filtros
- **ISR:** Detalhe de produto (revalidar 30min)
- **Image Optimization:** WebP + LQIP blur placeholders
- **Code Splitting:** Lazy load de modais e componentes pesados
- **Target Lighthouse:** Performance ≥85, Accessibility ≥95

## 📥 Importação de Produtos

### Setup Banco de Dados

1. **Inicie PostgreSQL com Docker:**

```bash
docker-compose up -d
```

2. **Aguarde a saúde do banco (30 segundos)**

3. **Execute as migrações:**

```bash
pnpm run db:migrate
```

### Importar 213 Produtos

```bash
# Copie o arquivo CSV para a raiz do projeto
cp ~/Downloads/products_export_1.csv ./products_export_1.csv

# Execute o script de importação
pnpm run import:products ./products_export_1.csv
```

**O script irá:**
- ✅ Importar 213 produtos com ~600 variantes
- ✅ Corrigir preços < R$20 (8 variantes)
- ✅ Corrigir Compare At Price < Price (10 variantes)
- ✅ Preencher Cost Per Item (padrão 35% do preço se vazio)
- ✅ Padronizar vendor → "TrendNow Brasil"
- ✅ Gerar SEO titles/descriptions automáticos
- ✅ Processar imagens e segmentação de produtos

**Tempo estimado:** 2-3 minutos

## 🚀 Deployment

### Vercel (recomendado)

```bash
# Login no Vercel
vercel login

# Deploy
vercel
```

Variáveis de ambiente são herdadas do `.env.local`.

### Configuração Vercel

- Environment: `production`
- Node.js Version: 18.x
- Build Command: `pnpm build`
- Output Directory: `.next`
- Development Command: `pnpm dev`

## 📋 Checklist Pré-Launch

- [ ] HTTPS + certificado SSL válido
- [ ] Senhas com bcrypt (min 12 rounds)
- [ ] SQL: queries parametrizadas
- [ ] XSS: input sanitizado, output escaped
- [ ] IDOR: todas APIs verificam dono do recurso
- [ ] Rate limiting em login/search/checkout
- [ ] Webhook MP com assinatura validada
- [ ] Preço recalculado no servidor (checkout)
- [ ] LGPD: cookie banner + política privacidade
- [ ] npm audit sem CVEs críticas
- [ ] Logs de auditoria funcionando
- [ ] CORS restritivo (não `*`)
- [ ] 2FA para admin
- [ ] Backup do banco testado

## 📞 Contato & Suporte

- Email: hello@trendnow.com.br
- Privacidade: privacidade@trendnow.com.br
- Issues: [GitHub Issues](https://github.com/trendnow-brasil/issues)

## 📄 Licença

Proprietary — Todos os direitos reservados TrendNow Brasil 2024-2025

---

**Status:** 🚧 Em Desenvolvimento (Sprint 1 de 6)

**Próximas tarefas:**
- [x] Setup inicial e configuração
- [ ] Componentes UI e design system
- [ ] API de produtos e checkout
- [ ] Integração Mercado Pago
- [ ] Autenticação e perfil de usuário
- [ ] LGPD compliance
