import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Mockingjay Lives — 反抗之鳥永不熄滅',
  description: '致敬《飢餓遊戲》反抗精神的個人紀念網站。若我們燃燒，你也將與我們同焚。',
  keywords: ['Hunger Games', '飢餓遊戲', 'Mockingjay', '反抗', 'Katniss'],
  openGraph: {
    title: 'The Mockingjay Lives',
    description: 'If we burn, you burn with us.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Caveat:wght@400;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ash-black text-gray-100 antialiased">
        {children}
      </body>
    </html>
  )
}
