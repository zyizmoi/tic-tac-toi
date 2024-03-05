import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

const ExampleRouter = router({
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

  example: publicProcedure.query(async ({ ctx }) => {
    return { info: 42 }
  }),
})

export default ExampleRouter
