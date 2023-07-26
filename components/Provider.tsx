import React from 'react';

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
