import { useCallback, useEffect, useState } from 'react'
import trpc from './utils/trpc'
import { boardStateType, gameProgressionType, gameRole, gameStateType, keys, winnerPlayer } from './types/game.types'
import { Box, Button, Typography } from '@mui/material'
import { Entries } from 'type-fest'

const baseState: gameStateType = {
  opponent: gameRole.x,
  player: gameRole.o,
  board: {
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
    '7': null,
    '8': null,
    '9': null,
  },
  opponentMoves: [],
  playerTurn: false,
  progression: {
    line123: [1, 2, 3],
    line147: [1, 4, 7],
    line159: [1, 5, 9],
    line258: [2, 5, 8],
    line357: [3, 5, 7],
    line369: [3, 6, 9],
    line456: [4, 5, 6],
    line789: [7, 8, 9],
  },
  playerProgression: {
    line123: [],
    line147: [],
    line159: [],
    line258: [],
    line357: [],
    line369: [],
    line456: [],
    line789: [],
  },
  opponentProgression: {
    line123: [],
    line147: [],
    line159: [],
    line258: [],
    line357: [],
    line369: [],
    line456: [],
    line789: [],
  },
  winner: null,
  winningLine: null,
}

const App = () => {
  const [gameState, setGameState] = useState<gameStateType>(structuredClone(baseState))

  const updateGameProgression = useCallback(
    (move: number, role: string) => {
      const tmpProgression = gameState.progression
      const tmpPlayerProgression = gameState.playerProgression
      const tmpOpponentProgression = gameState.opponentProgression
      let tmpWinner = gameState.winner
      let tmpWinningLine = gameState.winningLine

      ;(Object.entries(gameState.progression) as Entries<typeof gameState.progression>).forEach((line) => {
        const tmpIndex = line[1].findIndex((value) => {
          return value === move
        })

        if (tmpIndex !== -1) {
          tmpProgression[line[0]].splice(tmpIndex, 1)

          if (role === 'player') {
            tmpPlayerProgression[line[0]].push(move)

            //check win condition
            if (tmpPlayerProgression[line[0]].length === 3) {
              tmpWinner = winnerPlayer.player
              tmpWinningLine = tmpPlayerProgression[line[0]]
            }
          } else {
            tmpOpponentProgression[line[0]].push(move)

            //check win condition
            if (tmpOpponentProgression[line[0]].length === 3) {
              tmpWinner = winnerPlayer.opponent
              tmpWinningLine = tmpOpponentProgression[line[0]]
            }
          }
        }
      })

      setGameState((prev) => {
        return {
          ...prev,
          progression: tmpProgression,
          playerProgression: tmpPlayerProgression,
          opponentProgression: tmpOpponentProgression,
          winner: tmpWinner,
          winningLine: tmpWinningLine,
        }
      })
    },
    [gameState]
  )

  const handleOpponentTurn = useCallback(() => {
    const tmpOpponentMoves = gameState.opponentMoves
    const tmpBoard = gameState.board

    const winningLine = (Object.entries(gameState.opponentProgression) as Entries<gameProgressionType>).find((line) => {
      return line[1].length === 2 && gameState.progression[line[0]].length > 0
    })

    if (winningLine) {
      const move = gameState.progression[winningLine[0]][0]
      tmpBoard[keys[move - 1]] = gameState.opponent
      updateGameProgression(move, 'opponent')
      setGameState((prev) => {
        return {
          ...prev,
          board: tmpBoard,
        }
      })
      return
    }

    const dangerLine = (Object.entries(gameState.playerProgression) as Entries<gameProgressionType>).find((line) => {
      return line[1].length === 2 && gameState.progression[line[0]].length > 0
    })

    if (dangerLine) {
      const move = gameState.progression[dangerLine[0]][0]
      tmpBoard[keys[move - 1]] = gameState.opponent
      updateGameProgression(move, 'opponent')
      setGameState((prev) => {
        return {
          ...prev,
          board: tmpBoard,
          playerTurn: true,
        }
      })
      return
    }

    while (tmpOpponentMoves.length) {
      const move = tmpOpponentMoves.shift()
      if (!move) return

      if (tmpBoard[keys[move - 1]] === null) {
        tmpBoard[keys[move - 1]] = gameState.opponent
        updateGameProgression(move, 'opponent')
        setGameState((prev) => {
          return {
            ...prev,
            board: tmpBoard,
            opponentMoves: tmpOpponentMoves,
            playerTurn: true,
          }
        })
        return
      }
    }
  }, [gameState, updateGameProgression])

  const handlePlayerTurn = useCallback(
    (sq: keyof boardStateType) => {
      const tmpBoard = gameState.board

      if (tmpBoard[sq] || !gameState.playerTurn || gameState.winner) return

      tmpBoard[sq] = gameState.player
      updateGameProgression(Number(sq), 'player')
      setGameState((prev) => {
        return { ...prev, board: tmpBoard, playerTurn: false }
      })
    },
    [gameState.board, gameState.player, gameState.playerTurn, gameState.winner, updateGameProgression]
  )

  useEffect(() => {
    if (!gameState.playerTurn && gameState.winner === null) {
      setTimeout(handleOpponentTurn, 200)
    }
  }, [gameState.board, gameState.opponent, gameState.opponentMoves, gameState.playerTurn, gameState.winner, handleOpponentTurn])

  const handleReset = () => {
    setGameState({
      ...structuredClone(baseState),
      opponentMoves: structuredClone(sessionData?.data.session.ai_moves) ?? [],
    })
  }

  const { data: sessionData } = trpc.getSession.useQuery(
    { sessionKey: 'tttkey123' }, // fill in accordingly
    {
      refetchInterval: 0,
      onSuccess: (data) => {
        setGameState((prev) => {
          return {
            ...prev,
            opponentMoves: structuredClone(data.data.session.ai_moves),
          }
        })
      },
    }
  )

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        rowGap: '5%',
      }}
    >
      <Typography variant='h5' sx={{ height: '1.5rem' }}>
        {gameState.winner === null ? ' ' : gameState.winner === winnerPlayer.opponent ? 'Opponent wins' : 'Player wins'}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: '5px',
          gridTemplateColumns: 'repeat(3, 1fr)',
          width: '75%',
        }}
      >
        {keys.map((sq, idx) => {
          return (
            <Box
              key={idx}
              sx={{
                width: '100%',
                aspectRatio: '1/1',
                backgroundColor: gameState.winningLine?.includes(Number(sq)) ? '#B4D3B2' : '#ffffff',
                borderRadius: '25%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
              onClick={() => {
                handlePlayerTurn(sq)
              }}
            >
              <Typography component='div' sx={{ fontSize: '3rem' }}>
                {gameState.board[sq] ?? ''}
              </Typography>
              <Typography sx={{ position: 'absolute', top: '5px', left: '5px' }}>{idx + 1}</Typography>
            </Box>
          )
        })}
      </Box>
      <Button variant='contained' color='inherit' onClick={handleReset}>
        Reset
      </Button>
    </Box>
  )
}

export default App
