import { mergeRouters } from '../trpc'
import SessionRouter from './session'

type AppRouter = typeof appRouter

const appRouter = mergeRouters(SessionRouter)

export default appRouter
export type { AppRouter }
