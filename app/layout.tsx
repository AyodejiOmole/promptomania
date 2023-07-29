import "@styles/globals.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from "@components/Navbar";
import 'dotenv/config';
import UserContextProvider from "@context/UserContext";

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
        <UserContextProvider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Navbar />
            {children}
          </main>
        </UserContextProvider>
      </body>
    </html>
  )
}
