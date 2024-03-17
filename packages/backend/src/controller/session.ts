import { getSessionParamsType } from '../types/session.types'
import { getSession } from '../model/session'
import { TRPCError } from '@trpc/server'

export const getSessionHandler = async (params: getSessionParamsType) => {
  try {
    const session = await getSession(params.sessionKey)

    if (!session) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Session with session key not found',
      })
    }

    return {
      status: 'success',
      data: {
        session,
      },
    }
  } catch (err) {
    throw err
  }
}
