"use client"
import React from 'react';
import { SessionProvider } from "next-auth/react"

interface HomeProps {
  children: React.ReactNode,
  session: any
}

const Provider = ({ children, session }: HomeProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider;
