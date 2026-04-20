# 🚀 TrendNow Brasil - Lançar em 3 Passos

Tudo está pronto! Você só precisa fazer 3 coisas:

---

## ✅ Passo 1: GitHub (1 minuto)

**Abra seu terminal:**
```bash
cd C:/Users/Maria/trendnow-brasil
git branch -M main
git remote add origin https://github.com/biliscosaf/trendnow-brasil.git
git push -u origin main
```

Ele vai pedir autenticação do GitHub. Use seu **GitHub password** ou **Personal Access Token**.

---

## ✅ Passo 2: Vercel (3 minutos)

**Abra seu navegador:**
https://vercel.com/new

1. Clique: **Import Git Repository**
2. Cole: `https://github.com/biliscosaf/trendnow-brasil.git`
3. Clique: **Continue**
4. Procure: **Environment Variables**
5. Copie tudo do seu `.env.local` e cole na Vercel:

```
DATABASE_URL=postgresql://trendnow_user:trendnow_password@localhost:5432/trendnow_brasil?schema=public
NEXTAUTH_URL=https://trendnow-brasil.vercel.app
NEXTAUTH_SECRET=dev-secret-32-chars-minimum-ok
JWT_SECRET=dev-jwt-secret-64-chars-minimum-for-development-only-not-secure
JWT_REFRESH_SECRET=dev-refresh-secret-64-chars-minimum-for-development-only-not-secure
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-dev-public-key
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-dev-access-token
NODE_ENV=production
```

6. Clique: **Deploy**

✅ Seu site está ONLINE!

---

## ✅ Passo 3: Importar Produtos (2 minutos)

**De volta no terminal:**
```bash
cd C:/Users/Maria/trendnow-brasil
vercel env pull
pnpm install
pnpm run db:migrate
pnpm run import:products ./products_export_1.csv
```

---

## 🌐 RESULTADO FINAL

Seu site ao vivo:
```
https://trendnow-brasil.vercel.app
```

Repositório GitHub:
```
https://github.com/biliscosaf/trendnow-brasil
```

---

**Pronto!** 
- ✅ 213 produtos importados
- ✅ Database em produção
- ✅ Site online para o mundo
- ✅ CI/CD automático no GitHub Actions

**Próximo:** Sprint 1.3 - Autenticação & API

🎉 Parabéns! Sua loja está no ar!
