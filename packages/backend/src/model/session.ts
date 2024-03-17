import { supabase } from '../database/supabase'

export const getSession = async (sessionKey: string) => {
  const { data: sessionData, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('session_key', sessionKey)

  if (error) throw error

  return sessionData[0]
}
