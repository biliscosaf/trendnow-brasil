# Como Importar os 213 Produtos

## Opção 1: Setup Automático (Recomendado)

Se você tem Docker instalado, execute um único script:

```bash
cd trendnow-brasil
chmod +x setup-and-import.sh
./setup-and-import.sh
```

Isso fará tudo automaticamente:
- ✅ Inicia PostgreSQL no Docker
- ✅ Instala dependências npm
- ✅ Roda migrações do banco
- ✅ Importa 213 produtos
- ⏱️ Tempo total: ~8 minutos

---

## Opção 2: Setup Manual (Passo a Passo)

### Pré-requisitos
- Docker instalado e rodando
- Node.js 18+ e pnpm instalados
- Arquivo `.env.local` (já foi criado)

### Passo 1: Iniciar PostgreSQL

```bash
cd trendnow-brasil
docker-compose up -d
```

Aguarde 30 segundos para o banco ficar pronto. Você pode verificar com:

```bash
docker-compose ps
# STATUS deve ser "healthy"
```

### Passo 2: Instalar Dependências

```bash
pnpm install
```

Isso vai instalar todas as bibliotecas, incluindo a nova dependência `csv-parse` necessária para ler o arquivo de produtos.

### Passo 3: Rodar Migrações do Banco

```bash
pnpm run db:migrate
```

Isso cria as tabelas (products, variants, users, orders, etc) baseado no schema Drizzle.

### Passo 4: Importar Produtos

```bash
pnpm run import:products ./products_export_1.csv
```

Você verá um output assim:

```
[IMPORT] Iniciando importação de produtos...
[IMPORT] Lendo 6632 linhas do CSV...
[IMPORT] 213 produtos válidos para importar
[IMPORT] Importados 10/213 produtos
[IMPORT] Importados 20/213 produtos
[IMPORT] Importados 30/213 produtos
...
[IMPORT] Importados 213/213 produtos
[IMPORT] Importação concluída com sucesso!
```

⏱️ Tempo estimado: 2-3 minutos

---

## Verificar Importação

Após importar, você pode verificar os dados:

```bash
# Opção 1: Via Drizzle Studio (Interface Visual)
pnpm run db:studio
```

Isso abrirá um navegador com interface para explorar o banco visualmente.

```bash
# Opção 2: Via SQL direto (se tiver psql instalado)
psql postgresql://trendnow_user:trendnow_password@localhost:5432/trendnow_brasil

# Dentro do psql:
SELECT COUNT(*) as total_produtos FROM products;
SELECT AVG(price) as preco_medio FROM products;
SELECT category, COUNT(*) FROM products GROUP BY category;
```

---

## Próximo: Rodar a Aplicação

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

Você verá a homepage placeholder. Próximos sprints vão:
- ✅ Autenticação & Login
- ✅ Página de produtos com listagem & filtros
- ✅ Checkout & pagamento
- ✅ Integração Mercado Pago

---

## Troubleshooting

### ❌ "PostgreSQL connection refused"

Docker não está rodando. Inicie com:

```bash
docker-compose up -d
docker-compose logs postgres
```

### ❌ "File not found: products_export_1.csv"

O arquivo CSV precisa estar no mesmo diretório. Copie de:

```bash
cp ~/Downloads/products_export_1.csv ./products_export_1.csv
```

Ou especifique o caminho completo:

```bash
pnpm run import:products ~/Downloads/products_export_1.csv
```

### ❌ "Command not found: pnpm"

Instale pnpm:

```bash
npm install -g pnpm
```

Ou use npm direto:

```bash
npm run db:migrate
npm run import:products ./products_export_1.csv
```

### ❌ "EADDRINUSE: address already in use :::5432"

Já existe PostgreSQL rodando. Parar:

```bash
docker-compose down
```

Depois reinicie:

```bash
docker-compose up -d
```

---

## O Que Foi Corrigido Automaticamente

Durante a importação, o script:

✅ **8 produtos com preço < R$20** → Mantém conforme planilha (revisados)

✅ **10 variantes com Compare At < Price** → Remove Compare At inválido

✅ **574 variantes sem Cost Per Item** → Calcula 35% do preço

✅ **Todos os 213 produtos** → Gera SEO title/description automático

✅ **Vendors diferentes** → Padroniza para "TrendNow Brasil"

✅ **Imagens sem Alt text** → Usa título do produto como alt

---

## Estatísticas dos 213 Produtos

```
Categorias:
- Eletrônicos: 42 (19.7%)
- Beleza: 37 (17.4%)
- Pets: 34 (16.0%)
- Home: 29 (13.6%)
- Infantil: 22 (10.3%)
- Fitness: 20 (9.4%)
- Moda: 15 (7.0%)
- Câmeras: 8 (3.8%)
- Aquário: 3 (1.4%)
- Lazer: 3 (1.4%)

Preços:
- Mínimo: R$ 6.00
- Máximo: R$ 2.800,00
- Mediana: R$ 127,90
- Média: R$ 167,40

Variantes: ~598 total
Imagens: ~1.200 imagens de produto
```

---

## Próximas Sprints

Após a importação estar OK, os próximos passos são:

1. **Sprint 1.3** — Autenticação com GitHub + JWT
2. **Sprint 2.1-2.3** — Listagem de produtos + Filtros
3. **Sprint 2.4-2.5** — Detalhe do produto + Reviews
4. **Sprint 3.1-3.4** — Checkout + Integração Mercado Pago

---

**Dúvidas?** Veja o arquivo [SPRINT_1_2_STATUS.md](./SPRINT_1_2_STATUS.md) para mais detalhes técnicos.
