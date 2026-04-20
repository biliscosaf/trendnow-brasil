# Sprint 1.2 — Qualidade de Dados & Importação de Produtos

**Status:** ✅ Preparação Completa | ⏳ Aguardando Execução

## Resumo Executivo

Preparei todo o pipeline para importar 213 produtos (598 variantes) para o PostgreSQL. O processo está automatizado e pronto para rodar com um único comando.

## Arquivos Criados

### Scripts & Automação
- `scripts/import-products.ts` — Script Node.js para importação de 213 produtos
- `docker-compose.yml` — PostgreSQL 15 com healthcheck automático
- `.env.local` — Variáveis de ambiente para desenvolvimento
- `products_export_1.csv` — Base de 213 produtos (1.5MB)

### Dependências Adicionadas
```json
{
  "csv-parse": "5.5.0",      // Parser CSV
  "uuid": "9.0.1",           // UUID generation
  "tsx": "4.7.0"             // TS runner para scripts
}
```

### Scripts npm adicionados
```bash
pnpm run import:products ./products_export_1.csv
```

## Problemas Detectados & Soluções

| Problema | Qtd | Solução |
|----------|-----|---------|
| Preço < R$20 | 8 variantes | Mantém conforme planilha |
| Compare At < Price | 10 variantes | Corrige automaticamente |
| Cost Per Item vazio | 574 variantes | Calcula 35% do preço |
| SEO vazio | 213 produtos | Gera title/description automático |
| Vendors diferentes | 7 valores | Padroniza "TrendNow Brasil" |

## Próximos Passos (Execute nesta ordem)

### 1. Iniciar PostgreSQL (1 min)
```bash
cd trendnow-brasil
docker-compose up -d
# Aguarde ~30s para health check
```

### 2. Instalar dependências (2 min)
```bash
pnpm install
```

### 3. Rodar migrações Drizzle (1 min)
```bash
pnpm run db:migrate
```

### 4. Importar produtos (2-3 min)
```bash
pnpm run import:products ./products_export_1.csv
```

**Tempo total: ~8 minutos**

## Resultados Esperados

```
[IMPORT] Iniciando importação de produtos...
[IMPORT] Lendo 6632 linhas do CSV...
[IMPORT] 213 produtos válidos para importar
[IMPORT] Importados 10/213 produtos
[IMPORT] Importados 20/213 produtos
...
[IMPORT] Importados 213/213 produtos
[IMPORT] Importação concluída com sucesso!
```

## Banco de Dados

### Credenciais Docker
```
Host: localhost
Port: 5432
User: trendnow_user
Password: trendnow_password
Database: trendnow_brasil
```

### Tabelas Preenchidas
- **products**: 213 produtos
- **variants**: ~598 variantes
- **sessions**: vazio (será usado após auth)
- **refresh_tokens**: vazio (será usado após auth)
- **carts**: vazio (será usado no checkout)
- **orders**: vazio (será usado após primeiro pedido)

### Estrutura de Dados

Cada produto contém:
```json
{
  "id": "uuid",
  "handle": "url-slug-do-produto",
  "title": "Título do Produto",
  "description": "Descrição em HTML",
  "vendor": "TrendNow Brasil",
  "category": "Eletrônicos",
  "tags": ["tag1", "tag2"],
  "price": 199.90,
  "compare_at_price": 249.90,
  "cost_per_item": 69.97,
  "status": "active",
  "published": true,
  "seo_title": "Produto - TrendNow Brasil",
  "seo_description": "Descrição para SEO...",
  "images": [
    {
      "src": "https://...",
      "alt": "Descrição da imagem",
      "position": 1
    }
  ],
  "segmentation": {
    "segment": "core",
    "isBestSeller": false,
    "isTrending": false,
    "isNew": true,
    "bundleIds": [],
    "crossSellHandles": []
  }
}
```

## Verificação Pós-Importação

```bash
# Verificar dados importados
pnpm run db:studio

# Depois abra no navegador e rode queries:
SELECT COUNT(*) FROM products;     -- Deve retornar 213
SELECT COUNT(*) FROM variants;     -- Deve retornar ~598
SELECT AVG(price) FROM products;   -- Média: ~R$ 167.40
```

## Próxima Sprint

**Sprint 1.3 — Autenticação & API Base (Semana 1)**
- Implementar NextAuth.js com GitHub OAuth
- Criar endpoints JWT (/api/auth/login, /register, /logout, /refresh)
- Rate limiting em login (5 tentativas/15min)
- Password reset com secure tokens

## Notas Importantes

⚠️ **Antes de importar:**
- Certifique-se que Docker está rodando
- Tenha Node.js 18+ instalado
- Tenha pnpm instalado

💡 **Se houver erro de conexão:**
```bash
# Verifique se PostgreSQL está healthy
docker-compose ps

# Veja logs
docker-compose logs postgres

# Se necessário, resete o banco
docker-compose down -v
docker-compose up -d
```

---

**Última atualização:** 2026-04-20
**Autor:** Claude Code Agent
**Versão:** 1.0
