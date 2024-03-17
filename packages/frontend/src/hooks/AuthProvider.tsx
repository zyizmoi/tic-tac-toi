import { useLocalStorage } from '@uidotdev/usehooks'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './useAuth'

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [session, setSession] = useLocalStorage<string | null>('sessionKey', null)
  const navigate = useNavigate()

  const joinSession = useCallback(
    (sessionKey: string) => {
      setSession(sessionKey)
      navigate({ pathname: '/', search: `?sessionKey=${sessionKey}` })
    },
    [navigate, setSession]
  )

  const endSession = useCallback(() => {
    setSession(null)
    navigate('../join')
  }, [navigate, setSession])

  const value = useMemo(
    () => ({
      session,
      joinSession,
      endSession,
    }),
    [endSession, joinSession, session]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
