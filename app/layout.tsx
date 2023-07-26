import "@styles/globals.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Promptopia',
  description: 'Create, Share & Discover AI Prompts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <Provider> */}
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          {/* <Nav /> */}
          {children}
        </main>
      {/* </Provider> */}
    </body>
    </html>
  )
}
