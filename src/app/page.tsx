import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrendNow Brasil - Tudo em Alta com Melhor Preço',
  description: 'Descubra os produtos mais em tendência com os melhores preços',
}

export default function HomePage() {
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

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      {/* HEADER */}
      <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 50 }}>
        <nav style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#4F46E5' }}>T</span>
            <div>
              <div style={{ fontWeight: 'bold', color: '#1F2937', fontSize: '0.875rem' }}>TrendNow</div>
              <div style={{ fontSize: '0.75rem', color: '#4F46E5' }}>Brasil</div>
            </div>
          </div>

          <div style={{ display: 'none', gap: '2rem', '@media (min-width: 768px)': { display: 'flex' } }}>
            <a href="#" style={{ color: '#374151', textDecoration: 'none' }}>Categorias</a>
            <a href="#" style={{ color: '#374151', textDecoration: 'none' }}>Destaques</a>
            <a href="#" style={{ color: '#374151', textDecoration: 'none' }}>Ofertas</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ backgroundColor: 'transparent', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}>🔍</button>
            <button style={{ backgroundColor: 'transparent', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}>❤️</button>
            <button style={{ backgroundColor: '#4F46E5', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>🛒</button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(to right, #4F46E5, #9333EA, #4F46E5)', color: 'white', padding: '6rem 1rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: 1.2 }}>Os Trends Mais Quentes 🔥</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#E0E7FF' }}>Descubra os produtos em alta com os melhores preços do Brasil</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ backgroundColor: 'white', color: '#4F46E5', padding: '1rem 2rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.125rem' }}>🛍️ Explorar Agora</button>
            <button style={{ backgroundColor: 'transparent', color: 'white', padding: '1rem 2rem', borderRadius: '0.5rem', border: '2px solid white', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.125rem' }}>📲 Baixar App</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ backgroundColor: '#F9FAFB', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#4F46E5', marginBottom: '0.5rem' }}>213+</div>
              <p style={{ color: '#4B5563', fontWeight: '600' }}>Produtos em Alta</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#4F46E5', marginBottom: '0.5rem' }}>50%</div>
              <p style={{ color: '#4B5563', fontWeight: '600' }}>Desconto Médio</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#4F46E5', marginBottom: '0.5rem' }}>⚡</div>
              <p style={{ color: '#4B5563', fontWeight: '600' }}>Entrega Rápida</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section style={{ padding: '6rem 1rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ color: '#4F46E5', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🔥 Destaques</div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '900', color: '#111827', marginTop: '0.75rem' }}>Mais Vendidos Agora</h2>
            <p style={{ color: '#4B5563', marginTop: '1rem', fontSize: '1.125rem' }}>Os produtos que todos estão comprando neste momento</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {products.slice(0, 4).map((p) => (
              <div key={p.id} style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}>
                <div style={{ backgroundColor: '#F0F9FF', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', position: 'relative' }}>
                  {p.emoji}
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: '#EF4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 'bold' }}>-{p.discount}%</div>
                </div>
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem', fontSize: '0.875rem' }}>{p.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
                    <span>{'⭐'.repeat(p.rating)}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>({p.reviews})</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#4F46E5' }}>R${p.price.toFixed(2)}</span>
                    <span style={{ fontSize: '0.875rem', color: '#9CA3AF', textDecoration: 'line-through' }}>R${p.oldPrice.toFixed(2)}</span>
                  </div>
                  <button style={{ width: '100%', backgroundColor: '#4F46E5', color: 'white', padding: '0.5rem', borderRadius: '0.5rem', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Adicionar ao Carrinho</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOVIDADES */}
      <section style={{ padding: '6rem 1rem', backgroundColor: '#F9FAFB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ color: '#4F46E5', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase' }}>✨ Novidade</div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '900', color: '#111827', marginTop: '0.75rem' }}>Lançamentos da Semana</h2>
            <p style={{ color: '#4B5563', marginTop: '1rem', fontSize: '1.125rem' }}>Chegadas mais recentes e exclusivas do mercado</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {products.slice(4).map((p) => (
              <div key={p.id} style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ backgroundColor: '#F0F9FF', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', position: 'relative' }}>
                  {p.emoji}
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: '#EF4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 'bold' }}>-{p.discount}%</div>
                </div>
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem', fontSize: '0.875rem' }}>{p.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
                    <span>{'⭐'.repeat(p.rating)}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>({p.reviews})</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#4F46E5' }}>R${p.price.toFixed(2)}</span>
                    <span style={{ fontSize: '0.875rem', color: '#9CA3AF', textDecoration: 'line-through' }}>R${p.oldPrice.toFixed(2)}</span>
                  </div>
                  <button style={{ width: '100%', backgroundColor: '#4F46E5', color: 'white', padding: '0.5rem', borderRadius: '0.5rem', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Adicionar ao Carrinho</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ background: 'linear-gradient(to right, #4F46E5, #9333EA)', color: 'white', padding: '5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>📧 Receba Ofertas Exclusivas</h3>
          <p style={{ marginBottom: '2rem', fontSize: '1.125rem' }}>Inscreva-se e receba 10% de desconto na sua primeira compra</p>
          <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" placeholder="seu@email.com" style={{ flex: 1, minWidth: '200px', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', outline: 'none' }} />
            <button style={{ backgroundColor: 'white', color: '#4F46E5', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>Inscrever</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#111827', color: '#D1D5DB', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#818CF8' }}>T</span>
                <h4 style={{ fontWeight: 'bold', color: 'white' }}>TrendNow Brasil</h4>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Os produtos mais em tendência com melhor preço do Brasil.</p>
            </div>
            <div>
              <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Categorias</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="#" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem' }}>Eletrônicos</a></li>
                <li><a href="#" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem' }}>Moda</a></li>
                <li><a href="#" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem' }}>Casa & Decor</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Suporte</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="#" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem' }}>Contato</a></li>
                <li><a href="#" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem' }}>FAQ</a></li>
                <li><a href="#" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem' }}>Rastreamento</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="#" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem' }}>Privacidade</a></li>
                <li><a href="#" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem' }}>Termos</a></li>
                <li><a href="#" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem' }}>Cookies</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #374151', paddingTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#9CA3AF' }}>
            <p>&copy; 2024 TrendNow Brasil. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
