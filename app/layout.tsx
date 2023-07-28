import "@styles/globals.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from "@components/Provider";
import Navbar from "@components/Navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Promptomania',
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
        <Provider session>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
