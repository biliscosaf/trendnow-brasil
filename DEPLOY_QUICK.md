# Deploy Rápido - 10 Minutos para Produção

## ✅ Feito (local)
- Git repository inicializado ✓
- 23 arquivos commitados ✓
- Pronto para enviar para GitHub ✓

## ⏱️ Próximos 10 Minutos

### 1. Criar Repositório GitHub (2 min)

1. Vá em https://github.com/new
2. Preencha:
   - **Name:** `trendnow-brasil`
   - **Description:** `E-commerce com 213 produtos`
   - **Public** (deixe público)
3. Clique **Create repository**

GitHub mostrará um comando como este (copie):

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/trendnow-brasil.git
git push -u origin main
```

### 2. Push para GitHub (1 min)

Abra terminal no seu projeto:

```bash
cd trendnow-brasil
```

Cole o comando que GitHub gerou (acima):

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/trendnow-brasil.git
git push -u origin main
```

Quando pedir autenticação, faça login no GitHub.

### 3. Criar Banco Vercel Postgres (2 min)

1. Abra https://vercel.com/dashboard
2. Clique **Storage** → **Create Database** → **Postgres**
3. Preencha:
   - **Name:** `trendnow_brasil`
   - **Region:** `São Paulo (sa-east-1)`
4. Clique **Create**

Ele vai mostrar `DATABASE_URL`. **Copie toda a URL** (ela é longa mesmo).

### 4. Deploy na Vercel (3 min)

1. Abra https://vercel.com/new
2. Clique **Import Git Repository**
3. Cole sua URL GitHub:
   ```
   https://github.com/SEU_USUARIO/trendnow-brasil.git
   ```
4. Clique **Continue**

5. Na tela de **Project Settings**, procure **Environment Variables**

6. Adicione variáveis (copie do `.env.local`):

| Key | Value |
|-----|-------|
| DATABASE_URL | (Cole a URL do Vercel Postgres acima) |
| NEXTAUTH_URL | `https://trendnow-brasil.vercel.app` |
| NEXTAUTH_SECRET | `dev-secret-32-chars-minimum-ok` |
| JWT_SECRET | `dev-jwt-secret-64-chars-minimum-for-development-only-not-secure` |
| JWT_REFRESH_SECRET | `dev-refresh-secret-64-chars-minimum-for-development-only-not-secure` |
| ENCRYPTION_KEY | `0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef` |
| NEXT_PUBLIC_MP_PUBLIC_KEY | `APP_USR-dev-public-key` |
| MERCADO_PAGO_ACCESS_TOKEN | `APP_USR-dev-access-token` |
| NODE_ENV | `production` |

7. Clique **Deploy**

✅ **SEU SITE ESTÁ ONLINE!**

```
🌐 https://trendnow-brasil.vercel.app
```

---

## 📝 Após Deploy (Próximo Passo)

O site vai estar online, mas ainda precisa de:

### 1. Rodar Migrações do Banco

```bash
vercel env pull
pnpm install
pnpm run db:migrate
```

### 2. Importar 213 Produtos

```bash
pnpm run import:products ./products_export_1.csv
```

Ou via CLI Vercel:

```bash
npx @vercel/cli exec "pnpm run import:products ./products_export_1.csv"
```

---

## ❓ Dúvidas?

- **Variáveis de Ambiente?** Veja `.env.local` no projeto
- **Build falhou?** Veja [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md) seção Troubleshooting
- **Precisa de domínio próprio?** Veja em Vercel → Project Settings → Domains

---

## 📊 Checklist Final

- [ ] GitHub repository criado
- [ ] Código feito push para GitHub
- [ ] Vercel Postgres criado
- [ ] Projeto criado na Vercel
- [ ] Variáveis de ambiente preenchidas
- [ ] Deploy inicial completado ✅
- [ ] Migrações rodadas
- [ ] 213 Produtos importados
- [ ] Site online em produção

---

**Após completar, acesse:**

🌐 **https://trendnow-brasil.vercel.app**

Parabéns! Sua loja está no ar! 🎉
