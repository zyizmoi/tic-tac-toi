import { createTRPCQueryUtils, createTRPCReact, httpBatchLink } from '@trpc/react-query'
import type { AppRouter } from '../../../backend/src/router'
import { queryClient } from './queryClient'

const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_API_URL}/trpc`,
    }),
  ],
})

export const clientUtils = createTRPCQueryUtils({ queryClient, client: trpcClient })

export default trpc
