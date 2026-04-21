import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrendNow Brasil - Tudo em Alta com Melhor Preço',
  description: 'Descubra os produtos mais em tendência com os melhores preços',
}

const sampleProducts = [
  { id: 1, name: 'Fone Bluetooth Premium', price: 189.90, oldPrice: 299.90, image: '📱', rating: 4.8, reviews: 324 },
  { id: 2, name: 'Smartwatch Elegante', price: 299.90, oldPrice: 449.90, image: '⌚', rating: 4.7, reviews: 287 },
  { id: 3, name: 'Câmera Instant', price: 349.90, oldPrice: 499.90, image: '📷', rating: 4.9, reviews: 412 },
  { id: 4, name: 'Luminária LED', price: 79.90, oldPrice: 149.90, image: '💡', rating: 4.6, reviews: 156 },
]

function ProductCard({ product }: { product: typeof sampleProducts[0] }) {
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-2xl hover:-translate-y-1">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 h-48 flex items-center justify-center">
        <span className="text-6xl group-hover:scale-110 transition-transform">{product.image}</span>
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400">
            {'⭐'.repeat(Math.floor(product.rating))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>
        <div className="flex gap-2 items-baseline mb-4">
          <span className="text-2xl font-bold text-indigo-600">R${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">R${product.oldPrice.toFixed(2)}</span>
          )}
        </div>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Os Trends Mais Quentes
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Descubra produtos em alta com os melhores preços do Brasil
            </p>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
              Explorar Produtos
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600">213+</div>
              <p className="text-gray-600 mt-2">Produtos em Alta</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">50%</div>
              <p className="text-gray-600 mt-2">Desconto Médio</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">⚡</div>
              <p className="text-gray-600 mt-2">Entrega Rápida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mais Vendidos */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">🔥 Destaques</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">Mais Vendidos Agora</h2>
            <p className="text-gray-600 mt-4 text-lg">Os produtos que todos estão comprando</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Novidades */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">✨ Novidade</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">Lançamentos da Semana</h2>
            <p className="text-gray-600 mt-4 text-lg">Chegadas mais recentes e exclusivas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Receba Ofertas Exclusivas</h3>
          <p className="text-indigo-100 mb-8">Inscreva-se e receba 10% de desconto na sua primeira compra</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none"
            />
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Inscrever
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">TrendNow Brasil</h4>
              <p className="text-sm">Os produtos mais em tendência com melhor preço do Brasil.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Categorias</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Eletrônicos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Moda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Casa</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Suporte</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rastreamento</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 TrendNow Brasil. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
