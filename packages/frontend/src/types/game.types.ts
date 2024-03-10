export enum gameRole {
  x = 'X',
  o = 'O',
}

export enum winnerPlayer {
  player,
  opponent,
}

export interface boardStateType {
  '1': gameRole | null
  '2': gameRole | null
  '3': gameRole | null
  '4': gameRole | null
  '5': gameRole | null
  '6': gameRole | null
  '7': gameRole | null
  '8': gameRole | null
  '9': gameRole | null
}

export interface gameStateType {
  player: gameRole
  opponent: gameRole
  board: boardStateType
  playerTurn: boolean
  opponentMoves: number[]
  progression: gameProgressionType
  playerProgression: gameProgressionType
  opponentProgression: gameProgressionType
  winner: winnerPlayer | null
  winningLine: number[] | null
}

export const keys: (keyof boardStateType)[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

export interface gameProgressionType {
  line123: number[]
  line456: number[]
  line789: number[]
  line147: number[]
  line258: number[]
  line369: number[]
  line357: number[]
  line159: number[]
}
