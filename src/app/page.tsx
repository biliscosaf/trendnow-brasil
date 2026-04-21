'use client'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrendNow Brasil - Tudo em Alta com Melhor Preço',
  description: 'Descubra os produtos mais em tendência com os melhores preços',
}

const products = [
  { id: 1, name: 'Fone Bluetooth Premium', price: 189.90, oldPrice: 299.90, emoji: '📱', rating: 5, reviews: 324, discount: 37 },
  { id: 2, name: 'Smartwatch Elegante', price: 299.90, oldPrice: 449.90, emoji: '⌚', rating: 5, reviews: 287, discount: 33 },
  { id: 3, name: 'Câmera Instant', price: 349.90, oldPrice: 499.90, emoji: '📷', rating: 5, reviews: 412, discount: 30 },
  { id: 4, name: 'Luminária LED', price: 79.90, oldPrice: 149.90, emoji: '💡', rating: 4, reviews: 156, discount: 47 },
  { id: 5, name: 'Teclado Mecânico', price: 249.90, oldPrice: 399.90, emoji: '⌨️', rating: 5, reviews: 198, discount: 37 },
  { id: 6, name: 'Mouse Gamer RGB', price: 99.90, oldPrice: 199.90, emoji: '🖱️', rating: 5, reviews: 267, discount: 50 },
  { id: 7, name: 'Monitor Ultra Wide', price: 899.90, oldPrice: 1299.90, emoji: '🖥️', rating: 5, reviews: 156, discount: 31 },
  { id: 8, name: 'Headset Wireless', price: 349.90, oldPrice: 549.90, emoji: '🎧', rating: 5, reviews: 312, discount: 36 },
]

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-indigo-600">T</span>
            <div>
              <div className="font-bold text-gray-900 text-sm">TrendNow</div>
              <div className="text-xs text-indigo-600">Brasil</div>
            </div>
          </div>

          <div className="hidden md:flex gap-8">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">Categorias</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">Destaques</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">Ofertas</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-xl hover:scale-110 transition">🔍</button>
            <button className="text-xl hover:scale-110 transition">❤️</button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition">🛒</button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white py-24 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-6">Os Trends Mais Quentes 🔥</h1>
          <p className="text-lg md:text-xl mb-8 text-indigo-100">Descubra os produtos em alta com os melhores preços do Brasil</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">🛍️ Explorar Agora</button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-indigo-600 transition">📲 Baixar App</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-4xl font-black text-indigo-600 mb-2">213+</div>
              <p className="text-gray-600 font-semibold">Produtos em Alta</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-4xl font-black text-indigo-600 mb-2">50%</div>
              <p className="text-gray-600 font-semibold">Desconto Médio</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-4xl font-black text-indigo-600 mb-2">⚡</div>
              <p className="text-gray-600 font-semibold">Entrega Rápida</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTOS - MAIS VENDIDOS */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-indigo-600 text-sm font-semibold uppercase tracking-wider">🔥 Destaques</div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Mais Vendidos Agora</h2>
            <p className="text-gray-600 mt-4 text-lg">Os produtos que todos estão comprando neste momento</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300">
                <div className="bg-blue-50 h-48 flex items-center justify-center text-6xl relative">
                  {p.emoji}
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-{p.discount}%</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">{p.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-sm">{'⭐'.repeat(p.rating)}</span>
                    <span className="text-xs text-gray-500">({p.reviews})</span>
                  </div>
                  <div className="flex gap-2 items-baseline mb-4">
                    <span className="text-2xl font-black text-indigo-600">R${p.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-400 line-through">R${p.oldPrice.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">Adicionar ao Carrinho</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUTOS - LANÇAMENTOS */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-indigo-600 text-sm font-semibold uppercase">✨ Novidade</div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Lançamentos da Semana</h2>
            <p className="text-gray-600 mt-4 text-lg">Chegadas mais recentes e exclusivas do mercado</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(4).map((p) => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300">
                <div className="bg-blue-50 h-48 flex items-center justify-center text-6xl relative">
                  {p.emoji}
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-{p.discount}%</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">{p.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-sm">{'⭐'.repeat(p.rating)}</span>
                    <span className="text-xs text-gray-500">({p.reviews})</span>
                  </div>
                  <div className="flex gap-2 items-baseline mb-4">
                    <span className="text-2xl font-black text-indigo-600">R${p.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-400 line-through">R${p.oldPrice.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">Adicionar ao Carrinho</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-black mb-4">📧 Receba Ofertas Exclusivas</h3>
          <p className="text-lg mb-8 text-indigo-100">Inscreva-se e receba 10% de desconto na sua primeira compra</p>
          <div className="flex gap-2 max-w-md mx-auto flex-wrap justify-center">
            <input type="email" placeholder="seu@email.com" className="flex-1 min-w-[200px] px-4 py-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-white" />
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition whitespace-nowrap">Inscrever</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-black text-indigo-400">T</span>
                <h4 className="font-bold text-white">TrendNow Brasil</h4>
              </div>
              <p className="text-sm text-gray-500">Os produtos mais em tendência com melhor preço do Brasil.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Categorias</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition">Eletrônicos</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Moda</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Casa & Decor</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition">Contato</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">FAQ</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Rastreamento</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition">Privacidade</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Termos</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2024 TrendNow Brasil. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
