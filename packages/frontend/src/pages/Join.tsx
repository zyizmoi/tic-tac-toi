import { Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export const Component = () => {
  const [sessionKey, setSessionKey] = useState('')
  const { joinSession } = useAuth()

  const handleJoinSession = () => {
    if (sessionKey) {
      joinSession(sessionKey)
    }
  }

  const handleEnterSessionKey = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSessionKey(e.target.value)
  }

  return (
    <Stack sx={{ height: '100vh', alignItems: 'center', justifyContent: 'center', rowGap: '1rem' }}>
      <Typography variant='h6'>Enter session key:</Typography>
      <TextField sx={{ '& .MuiInputBase-root': { backgroundColor: 'rgba(255,255,255,0.8)' } }} onChange={handleEnterSessionKey} />
      <Button variant='contained' color='inherit' disabled={!sessionKey} onClick={handleJoinSession} sx={{ textTransform: 'none', fontSize: '1rem' }}>
        Join
      </Button>
    </Stack>
  )
}
