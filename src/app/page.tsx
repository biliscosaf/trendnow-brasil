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
  { id: 5, name: 'Teclado Mecânico', price: 249.90, oldPrice: 399.90, image: '⌨️', rating: 4.8, reviews: 198 },
  { id: 6, name: 'Mouse Gamer RGB', price: 99.90, oldPrice: 199.90, image: '🖱️', rating: 4.7, reviews: 267 },
  { id: 7, name: 'Monitor Ultra Wide', price: 899.90, oldPrice: 1299.90, image: '🖥️', rating: 4.9, reviews: 156 },
  { id: 8, name: 'Headset Wireless', price: 349.90, oldPrice: 549.90, image: '🎧', rating: 4.8, reviews: 312 },
]

function ProductCard({ product }: { product: typeof sampleProducts[0] }) {
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 h-48 flex items-center justify-center">
        <span className="text-6xl group-hover:scale-125 transition-transform duration-300">{product.image}</span>
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{discount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">{product.name}</h3>
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
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 active:scale-95">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black text-indigo-600">T</span>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm">TrendNow</span>
            <span className="text-xs text-indigo-600">Brasil</span>
          </div>
        </div>

        <div className="hidden md:flex gap-8">
          <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Categorias</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Destaques</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Ofertas</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-700 hover:text-indigo-600 transition-colors text-xl">🔍</button>
          <button className="text-gray-700 hover:text-indigo-600 transition-colors text-xl">❤️</button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">🛒</button>
        </div>
      </nav>
    </header>
  )
}

export default function HomePage() {
  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Os Trends Mais Quentes 🔥
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Descubra os produtos em alta com os melhores preços do Brasil
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                🛍️ Explorar Agora
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all">
                📲 Baixar App
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-gray-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-5xl font-black text-indigo-600 mb-2">213+</div>
              <p className="text-gray-600 font-semibold">Produtos em Alta</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-5xl font-black text-indigo-600 mb-2">50%</div>
              <p className="text-gray-600 font-semibold">Desconto Médio</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-5xl font-black text-indigo-600 mb-2">⚡</div>
              <p className="text-gray-600 font-semibold">Entrega Rápida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mais Vendidos */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">🔥 Destaques</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">Mais Vendidos Agora</h2>
            <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Os produtos que todos estão comprando neste momento</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Novidades */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">✨ Novidade</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">Lançamentos da Semana</h2>
            <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Chegadas mais recentes e exclusivas do mercado</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.slice(4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-black mb-4">📧 Receba Ofertas Exclusivas</h3>
          <p className="text-indigo-100 mb-8 text-lg">Inscreva-se e receba 10% de desconto na sua primeira compra</p>
          <div className="flex gap-2 max-w-md mx-auto flex-col sm:flex-row">
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none placeholder-gray-500"
            />
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors whitespace-nowrap">
              Inscrever
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-black text-indigo-400">T</span>
                <h4 className="font-bold text-white">TrendNow Brasil</h4>
              </div>
              <p className="text-sm text-gray-400">Os produtos mais em tendência com melhor preço do Brasil.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Categorias</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Eletrônicos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Moda</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Casa & Decor</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Beleza</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Suporte</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Entre em Contato</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Perguntas Frequentes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Rastreamento</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Devoluções</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal & Social</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 TrendNow Brasil. Todos os direitos reservados. | Feito com ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
