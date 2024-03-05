import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { getSessionParams } from '../types/session.types'
import { getSessionHandler } from '../controller/session'

const SessionRouter = router({
  exampleWithArgs: publicProcedure
    .input(
      z.object({
        message: z.string(),
        id: z.number(),
      })
    )
    .mutation((req) => {
      return { info: req.input.message }
    }),

  getSession: publicProcedure.input(getSessionParams).query(({ input }) => getSessionHandler(input)),
})

export default SessionRouter
