export interface authType {
  session: string | null
  joinSession: (sessionKey: string) => void
  endSession: () => void
}
