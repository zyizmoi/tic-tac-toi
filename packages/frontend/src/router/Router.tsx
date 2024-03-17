import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { loader as homeLoader } from '../loaders/auth.loader'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route lazy={() => import('../components/AuthLayout')}>
        <Route lazy={() => import('../components/ProtectedRoute')} loader={homeLoader} errorElement={<Navigate to='../join' />}>
          <Route path='/' lazy={() => import('../pages/Home')} />
        </Route>
        <Route path='/join' lazy={() => import('../pages/Join')} />
      </Route>
    </>
  )
)
