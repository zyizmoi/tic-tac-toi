import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../../backend/src/router'

const trpc = createTRPCReact<AppRouter>()

export default trpc
