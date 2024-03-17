import trpc, { trpcClient } from '../utils/trpc'
import { queryClient } from '../utils/queryClient'

const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  )
}

export default TRPCProvider
