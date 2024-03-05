import { useEffect } from 'react'
import trpc from './utils/trpc'

const App = () => {
  const { isLoading, data: example } = trpc.example.useQuery()

  const { mutate } = trpc.exampleWithArgs.useMutation()

  useEffect(() => {
    mutate({ message: 'hello there', id: 1 })
  }, [mutate])

  return (
    <main className='w-screen h-screen flex-col justify-center flex items-center'>
      <h1 className='text-2xl mt-4 font-bold mb-4 border-b pb-4'>viteRPC</h1>
      <p className={`mt-2 text-sm ${isLoading ? 'text-orange-400' : 'text-green-600'} first-letter:capitalize`}>
        {isLoading ? 'loading tRPC query...' : `hello from tRPC procedure! The result is ${example?.info}`}
      </p>
    </main>
  )
}

export default App
