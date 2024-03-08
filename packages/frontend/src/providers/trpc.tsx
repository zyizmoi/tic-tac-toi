import { httpBatchLink } from '@trpc/client'
import trpc from '../utils/trpc'
import { queryClient } from '../utils/queryClient'

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `http://localhost:5001/trpc`
    })
  ]
})

const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  )
}

export default TRPCProvider
