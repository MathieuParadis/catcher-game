// REACT IMPORTS
import React, { useState } from 'react'

// COMPONENTS IMPORTS
import Playboard from './Playboard'
import Leaderboard from './Leaderboard'

const GameCanvas = (): JSX.Element => {
  const [isPlayMode, setIsPlayMode] = useState(false)
  const [isRankingMode, setIsRankingMode] = useState(false)

  const play = (): void => {
    setIsPlayMode(true)
    setIsRankingMode(false)
  }

  const seeRanking = (): void => {
    setIsPlayMode(false)
    setIsRankingMode(true)
  }

  return (
    <div className="relative responsive-canvas flex justify-center items-center bg-[#448ee9]">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-6xl text-center mb-10">
          Welcome to<br></br>
          <span className="font-bold">Sea Catch Adventure</span>
        </h1>
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
