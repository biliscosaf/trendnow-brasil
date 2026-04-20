import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TrendNow Brasil - Tudo em Alta com Melhor Preço',
  description:
    'Descobra os produtos mais em tendência com os melhores preços. Gadgets, eletrônicos, beleza, pets e mais. TrendNow Brasil.',
  keywords: [
    'shopping',
    'e-commerce',
    'trending',
    'gadgets',
    'eletrônicos',
    'beleza',
    'pets',
    'moda',
    'brasil',
  ],
  authors: [{ name: 'TrendNow Brasil' }],
  creator: 'TrendNow Brasil',
  publisher: 'TrendNow Brasil',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://trendnow.com.br',
    title: 'TrendNow Brasil - Tudo em Alta com Melhor Preço',
    description: 'Os produtos mais em tendência com os melhores preços do Brasil.',
    images: [
      {
        url: 'https://trendnow.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TrendNow Brasil',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrendNow Brasil',
    description: 'Tudo em Alta com Melhor Preço',
    images: ['https://trendnow.com.br/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://trendnow.com.br',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#FF6B35',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <a href="#main-content" className="skip-to-main">
          Pular para conteúdo principal
        </a>

        {/* Aqui virão Header, Navigation, etc */}

        <main id="main-content" className="min-h-screen">
          {children}
        </main>

        {/* Aqui virão Footer, modals globais, etc */}

        {/* Cookie Banner & Consent Management (LGPD) */}
        {/* <CookieBanner /> */}

        {/* Cart Drawer */}
        {/* <CartDrawer /> */}
      </body>
    </html>
  )
}
