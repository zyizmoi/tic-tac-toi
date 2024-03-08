import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../utils/queryClient'

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider
