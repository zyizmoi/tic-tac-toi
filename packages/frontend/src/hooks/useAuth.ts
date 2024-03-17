import { createContext, useContext } from 'react'
import { authType } from '../types/auth.types'

export const AuthContext = createContext<authType | null>(null)

export const useAuth = () => {
  const currAuthContext = useContext(AuthContext)

  if (!currAuthContext) {
    throw new Error('useAuth has to be used within <AuthContext.Provider>')
  }

  return currAuthContext
}
