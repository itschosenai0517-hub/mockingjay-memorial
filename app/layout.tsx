import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Mockingjay Lives — 反抗之鳥永不熄滅',
  description: '致敬《飢餓遊戲》反抗精神的個人紀念網站。凱妮絲·艾佛丁的故事，潘恩十二區的記憶。若我們燃燒，你也將與我們同焚。',
  keywords: [
    'Hunger Games', '飢餓遊戲', 'Mockingjay', '反抗之鳥',
    'Katniss Everdeen', 'Panem', 'District 12', '第十二區',
    'tribute', 'rebellion', 'Suzanne Collins',
  ],
  authors: [{ name: 'Mockingjay Memorial' }],
  openGraph: {
    title: 'The Mockingjay Lives — 反抗之鳥永不熄滅',
    description: 'If we burn, you burn with us. 若我們燃燒，你也將與我們同焚。',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'Mockingjay Memorial',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Mockingjay Lives — 反抗之鳥永不熄滅',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Mockingjay Lives',
    description: 'If we burn, you burn with us.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: '#ff6b00',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <head>
        {/*
          Google Fonts is loaded via @import in globals.css.
          Preconnect hints are still useful for performance.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bg-ash-black text-gray-100 antialiased">
        {/* Skip-to-content link for keyboard / screen-reader users */}
        <a href="#hero" className="skip-to-content">
          Skip to content — 跳至內容
        </a>
        {children}
      </body>
    </html>
  )
}
