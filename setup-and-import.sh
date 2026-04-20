#!/bin/bash

set -e  # Exit on error

echo "================================================"
echo "TrendNow Brasil - Sprint 1.2 Setup & Import"
echo "================================================"
echo ""

# 1. Verificar Docker
echo "[1/5] Verificando Docker..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado!"
    echo "Instale Docker em: https://www.docker.com/products/docker-desktop"
    exit 1
fi
echo "✅ Docker encontrado"
echo ""

# 2. Iniciar PostgreSQL
echo "[2/5] Iniciando PostgreSQL..."
docker-compose up -d
echo "⏳ Aguardando PostgreSQL estar pronto (30 segundos)..."
sleep 30
echo "✅ PostgreSQL iniciado"
echo ""

# 3. Instalar dependências
echo "[3/5] Instalando dependências npm..."
if command -v pnpm &> /dev/null; then
    pnpm install
elif command -v npm &> /dev/null; then
    npm install
else
    echo "❌ npm/pnpm não encontrado!"
    exit 1
fi
echo "✅ Dependências instaladas"
echo ""

# 4. Rodar migrações
echo "[4/5] Executando migrações Drizzle..."
if command -v pnpm &> /dev/null; then
    pnpm run db:migrate
else
    npm run db:migrate
fi
echo "✅ Migrações executadas"
echo ""

# 5. Importar produtos
echo "[5/5] Importando 213 produtos..."
CSV_FILE="${1:-.}/products_export_1.csv"

if [ ! -f "$CSV_FILE" ]; then
    echo "❌ Arquivo CSV não encontrado: $CSV_FILE"
    exit 1
fi

if command -v pnpm &> /dev/null; then
    pnpm run import:products "$CSV_FILE"
else
    npm run import:products "$CSV_FILE"
fi
echo "✅ Produtos importados"
echo ""

echo "================================================"
echo "✅ Setup completo!"
echo "================================================"
echo ""
echo "Próximos passos:"
echo "  1. Inicie o dev server: pnpm dev"
echo "  2. Abra http://localhost:3000"
echo "  3. Veja os produtos importados!"
echo ""
echo "Para parar PostgreSQL: docker-compose down"
echo ""
