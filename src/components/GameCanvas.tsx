// REACT IMPORT
import React from 'react'

// COMPONENTS IMPORTS
import Playboard from './Playboard'
import Leaderboard from './Leaderboard'

// REDUX IMPORTS
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { selectGameModeState, startGame, openRanking } from '../redux/slices/gameModeSlice'

const GameCanvas = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const gameMode = useAppSelector(selectGameModeState)
  const { isPlayMode, isRankingMode } = gameMode

  const play = (): void => {
    dispatch(startGame())
  }

  const seeRanking = (): void => {
    dispatch(openRanking())
  }

  return (
    <div className="relative responsive-canvas flex justify-center items-center bg-[#448ee9]">
      <div className="flex flex-col justify-center items-center gap-2">
        <button className="p-2 w-[150px] border" onClick={play}>
          Play
        </button>
        <button className="p-2 w-[150px] border whitespace-nowrap" onClick={seeRanking}>
          See ranking
        </button>
      </div>

      {isPlayMode && <Playboard />}
      {isRankingMode && <Leaderboard />}
    </div>
  )
}

export default GameCanvas
