import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const Component = () => {
  const { session } = useAuth()

  if (!session) {
    return <Navigate to='../join' />
  }

  return <Outlet />
}
