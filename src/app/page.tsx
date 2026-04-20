import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrendNow Brasil - Tudo em Alta com Melhor Preço',
  description: 'Descubra os produtos mais em tendência com os melhores preços',
}

export default function HomePage() {
  return (
    <div>
      <section className="container section-padding">
        <div className="text-center">
          <h1 className="mb-6 text-5xl font-bold text-gradient">TrendNow Brasil</h1>
          <p className="mb-8 text-xl text-neutral-600">
            Tudo que está em alta com melhor preço
          </p>
          <button className="rounded-lg bg-primary-500 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
            Ver Tendências Agora
          </button>
        </div>
      </section>

      {/* Placeholders para seções que virão */}
      <section className="container section-padding">
        <h2 className="mb-12 text-center text-4xl font-bold">Mais Vendidos</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* ProductCards virão aqui */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex h-64 items-center justify-center rounded-lg bg-neutral-200"
            >
              <p className="text-neutral-600">Produto {i}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-padding">
        <h2 className="mb-12 text-center text-4xl font-bold">Novidades</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* NewProducts virão aqui */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex h-64 items-center justify-center rounded-lg bg-neutral-200"
            >
              <p className="text-neutral-600">Novidade {i}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
