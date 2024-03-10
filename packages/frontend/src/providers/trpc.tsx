import { httpBatchLink } from '@trpc/client'
import trpc from '../utils/trpc'
import { queryClient } from '../utils/queryClient'

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_API_URL}/trpc`,
    }),
  ],
})

const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  )
}

export default TRPCProvider
