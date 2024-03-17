import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../hooks/AuthProvider'

export const Component = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
