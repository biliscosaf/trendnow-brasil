import { db } from '@/lib/db/client';
import { products, variants } from '@/lib/db/schema';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

interface ProductRow {
  Handle: string;
  Title: string;
  'Body (HTML)': string;
  Vendor: string;
  'Product Category': string;
  Tags: string;
  'SEO Title'?: string;
  'SEO Description'?: string;
  'Variant SKU': string;
  'Variant Price': string;
  'Variant Compare At Price': string;
  'Cost per item': string;
  'Image Src': string;
  'Image Alt Text': string;
  'Option1 Name': string;
  'Option1 Value': string;
  'Option2 Name': string;
  'Option2 Value': string;
}

async function importProducts() {
  console.log('[IMPORT] Iniciando importação de produtos...');

  try {
    // Ler CSV
    const csvPath = process.argv[2] || './products_export_1.csv';
    const fileContent = readFileSync(csvPath, 'utf-8');
    const rows = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    }) as ProductRow[];

    console.log(`[IMPORT] Lendo ${rows.length} linhas do CSV...`);

    // Agrupar por handle (produto)
    const productsMap = new Map<string, any>();

    for (const row of rows) {
      const handle = row.Handle?.trim();
      if (!handle) continue;

      if (!productsMap.has(handle)) {
        const tags = row.Tags?.trim()
          ?.split(',')
          .map((t) => t.trim())
          .filter(Boolean) || [];

        productsMap.set(handle, {
          id: uuidv4(),
          handle,
          title: row.Title?.trim() || '',
          description: row['Body (HTML)']?.trim() || '',
          vendor: 'TrendNow Brasil',
          category: row['Product Category']?.trim() || 'Diversos',
          tags,
          seo_title: row['SEO Title']?.trim() || row.Title?.trim().substring(0, 60) || '',
          seo_description:
            row['SEO Description']?.trim() ||
            row['Body (HTML)']?.replace(/<[^>]*>/g, '').substring(0, 160) ||
            '',
          images: [],
          variants: [],
          status: 'active',
          published: true,
        });
      }

      // Adicionar variante
      const variantSku = row['Variant SKU']?.trim();
      if (variantSku) {
        const price = parseFloat(row['Variant Price']?.trim() || '0') || 0;
        const compareAt = row['Variant Compare At Price']?.trim()
          ? parseFloat(row['Variant Compare At Price'])
          : null;
        const cost = row['Cost per item']?.trim() ? parseFloat(row['Cost per item']) : price * 0.35;

        // Corrigir Compare At Price < Price
        const validCompareAt = compareAt && compareAt > price ? compareAt : null;

        const product = productsMap.get(handle)!;

        // Atualizar preço do produto com o primeiro (maior)
        if (product.variants.length === 0) {
          product.price = price;
          product.compare_at_price = validCompareAt;
          product.cost_per_item = cost;
        }

        product.variants.push({
          id: uuidv4(),
          sku: variantSku,
          title: row['Option1 Value']?.trim() || 'Default',
          price,
          compare_at_price: validCompareAt,
          cost_per_item: cost,
          quantity: 100,
          option1_name: row['Option1 Name']?.trim() || null,
          option1_value: row['Option1 Value']?.trim() || null,
          option2_name: row['Option2 Name']?.trim() || null,
          option2_value: row['Option2 Value']?.trim() || null,
        });

        // Adicionar imagem
        const imageSrc = row['Image Src']?.trim();
        if (imageSrc && !product.images.some((img: any) => img.src === imageSrc)) {
          product.images.push({
            src: imageSrc,
            alt: row['Image Alt Text']?.trim() || product.title,
            position: product.images.length + 1,
          });
        }
      }
    }

    // Filtrar apenas produtos com variantes
    const validProducts = Array.from(productsMap.values()).filter(
      (p) => p.variants.length > 0
    );

    console.log(`[IMPORT] ${validProducts.length} produtos válidos para importar`);

    // Inserir em lotes
    const BATCH_SIZE = 10;
    for (let i = 0; i < validProducts.length; i += BATCH_SIZE) {
      const batch = validProducts.slice(i, i + BATCH_SIZE);

      for (const product of batch) {
        // Inserir produto
        const productId = product.id;
        await db.insert(products).values({
          handle: product.handle,
          title: product.title,
          description: product.description,
          vendor: product.vendor,
          category: product.category,
          tags: product.tags,
          price: product.price,
          compareAtPrice: product.compare_at_price,
          costPerItem: product.cost_per_item,
          status: product.status,
          published: product.published,
          seoTitle: product.seo_title,
          seoDescription: product.seo_description,
          images: product.images,
          segmentation: {
            segment: 'core',
            isBestSeller: false,
            isTrending: false,
            isNew: true,
            bundleIds: [],
            crossSellHandles: [],
          },
        });

        // Inserir variantes
        for (const variant of product.variants) {
          await db.insert(variants).values({
            productId: productId,
            sku: variant.sku,
            title: variant.title,
            price: variant.price,
            compareAtPrice: variant.compare_at_price,
            costPerItem: variant.cost_per_item,
            quantity: variant.quantity,
            option1Name: variant.option1_name,
            option1Value: variant.option1_value,
            option2Name: variant.option2_name,
            option2Value: variant.option2_value,
          });
        }
      }

      console.log(`[IMPORT] Importados ${Math.min(i + BATCH_SIZE, validProducts.length)}/${validProducts.length} produtos`);
    }

    console.log('[IMPORT] Importação concluída com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('[ERROR]', error);
    process.exit(1);
  }
}

importProducts();
