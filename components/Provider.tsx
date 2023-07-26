"use client"
import React from 'react';
import { SessionProvider } from "next-auth/react"

interface HomeProps {
  children: React.ReactNode,
}

const Provider = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Provider
