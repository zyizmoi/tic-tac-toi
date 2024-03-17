import { LoaderFunction } from 'react-router-dom'
import { clientUtils } from '../utils/trpc'

export const loader: LoaderFunction = async ({ request }) => {
  const sessionKey = new URL(request.url).searchParams.get('sessionKey') ?? JSON.parse(localStorage.getItem('sessionKey')!)

  if (!sessionKey) throw new Error('Missing session key')

  return clientUtils.getSession.getData({ sessionKey }) ?? (await clientUtils.getSession.fetch({ sessionKey }))
}
