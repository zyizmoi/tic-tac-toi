// Imports
// ========================================================
import ReactDOM from 'react-dom/client'
import RootProvider from './providers'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Router'

// Render
// ========================================================
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <RootProvider>
    <RouterProvider router={router} />
  </RootProvider>
  // </React.StrictMode>
)
