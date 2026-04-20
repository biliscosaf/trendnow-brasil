# Deploy na Vercel - Passo a Passo

## Pré-requisitos

Você precisa de:
- Conta GitHub (gratuita em https://github.com)
- Conta Vercel (gratuita em https://vercel.com)
- Git instalado (já tem no seu sistema)

---

## Passo 1: Criar Repositório GitHub

### 1.1 Inicializar Git Localmente

```bash
cd trendnow-brasil
git init
git add .
git commit -m "Initial commit: TrendNow Brasil e-commerce setup with 213 products"
```

### 1.2 Criar Repositório no GitHub

1. Abra https://github.com/new
2. Preencha:
   - **Repository name:** `trendnow-brasil`
   - **Description:** `E-commerce moderno com 213 produtos em alta`
   - **Public** (deixe público para usar Vercel grátis)
   - Clique **Create repository**

### 1.3 Conectar e Fazer Push

No terminal do projeto, copie o comando que GitHub mostra:

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/trendnow-brasil.git
git push -u origin main
```

✅ Agora seu código está no GitHub!

---

## Passo 2: Configurar Banco de Dados

Para Vercel, você precisa de PostgreSQL gerenciado (não pode ser Docker local).

### Opção A: Vercel Postgres (Recomendado)

1. Abra https://vercel.com/dashboard
2. Vá em **Storage** → **Create Database** → **Postgres**
3. Nome: `trendnow_brasil`
4. Região: `São Paulo` (sa-east-1)
5. Clique **Create**

Ele vai gerar automaticamente a `DATABASE_URL`. Copie-a.

### Opção B: Railway.app ou Neon.tech

Se preferir outro serviço, qualquer PostgreSQL 15+ funciona.

---

## Passo 3: Criar Projeto na Vercel

1. Abra https://vercel.com/new
2. Selecione **Import Git Repository**
3. Paste o URL do seu repositório GitHub:
   ```
   https://github.com/SEU_USUARIO/trendnow-brasil.git
   ```
4. Clique **Continue**

---

## Passo 4: Configurar Variáveis de Ambiente

Na tela de configuração do projeto Vercel:

### 4.1 Database URL

Copie a `DATABASE_URL` do Vercel Postgres (Passo 2.Opção A):

```
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/[db]?schema=public
```

### 4.2 Outras Variáveis Obrigatórias

Preencha todas estas (você pode usar valores de teste):

```
NEXTAUTH_URL=https://seu-projeto.vercel.app
NEXTAUTH_SECRET=generate-com: openssl rand -base64 32

JWT_SECRET=generate-com: openssl rand -base64 64
JWT_REFRESH_SECRET=generate-com: openssl rand -base64 64

ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef

NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-sandbox-key
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-sandbox-token
MP_WEBHOOK_SECRET=webhook-secret-123

SENDGRID_API_KEY=SG-sandbox-key
SENDGRID_FROM_EMAIL=noreply@trendnow.com.br

UPSTASH_REDIS_REST_URL=https://upstash-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=token

NODE_ENV=production
```

### 4.3 Salvar Variáveis

Clique **Deploy** na Vercel.

---

## Passo 5: Executar Migrações (Build Hook)

Após o primeiro deploy, você precisa rodar as migrações do Drizzle.

### 5.1 via Vercel CLI (Recomendado)

```bash
npm i -g vercel
vercel login
vercel env pull   # Puxa .env do Vercel
pnpm run db:migrate
```

### 5.2 via Vercel Dashboard

1. Vá em **Project Settings** → **Build & Development Settings**
2. Em **Build Command**, troque para:

```
pnpm run db:migrate && pnpm build
```

3. Clique **Save**

4. Vá em **Deployments** e clique **Redeploy** no último deploy

---

## Passo 6: Importar Produtos para Produção

Após as migrações rodarem com sucesso:

```bash
# Local (com DATABASE_URL do Vercel)
vercel env pull
pnpm run import:products ./products_export_1.csv
```

Ou via terminal Vercel:

```bash
vercel exec "pnpm import:products ./products_export_1.csv"
```

---

## ✅ Pronto!

Seu site estará em:

```
https://trendnow-brasil.vercel.app
```

Ou com domínio customizado (opcional):

```
https://trendnow.com.br
```

---

## Configuração Domínio Customizado (Opcional)

1. Compre domínio em https://vercel.com/domains ou registrador (Godaddy, etc)
2. Na Vercel → **Project Settings** → **Domains**
3. Adicione seu domínio
4. Configure DNS (instruções aparecem na Vercel)

---

## Troubleshooting

### ❌ "Build failed: drizzle migration failed"

Certifique-se que `DATABASE_URL` está corret no Vercel.

```bash
vercel env pull
cat .env.local  # Veja se DATABASE_URL está lá
pnpm run db:migrate
```

### ❌ "Products table is empty"

Você precisa rodar `import:products` no ambiente de produção:

```bash
pnpm install
pnpm run import:products ./products_export_1.csv
```

### ❌ "Static page generation failed"

Isso é normal no primeiro deploy. Vercel vai revalidar páginas automaticamente.

---

## Monitoramento Após Deploy

```bash
# Ver logs do projeto
vercel logs

# Monitorar funções serverless
vercel inspect
```

---

## Próximas Otimizações

Após o deploy inicial:

1. **CDN + Edge Caching** → Images ficarão mais rápidas
2. **Analytics** → Ativar Google Analytics & Sentry
3. **Performance** → Otimizar Lighthouse (90+ score)
4. **SSL/TLS** → Vercel ativa automaticamente
5. **Backups** → Configurar backup automático do banco

---

**Tempo estimado:** 15-20 minutos

Qualquer dúvida, veja a documentação: https://vercel.com/docs
