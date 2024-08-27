import React from 'react'
import { AuthProvider } from './Auth'

const ContextWrapper = ({children}) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}

export default ContextWrapper