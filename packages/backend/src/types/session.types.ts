import { z } from 'zod'

export const getSessionParams = z.object({ sessionKey: z.string() })

export type getSessionParamsType = z.TypeOf<typeof getSessionParams>
