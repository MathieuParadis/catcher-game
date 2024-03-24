// REACT IMPORT
import React from 'react'

// COMPONENTS IMPORTS
import Playboard from './Playboard'
import Leaderboard from './Leaderboard'

const GameCanvas = (): JSX.Element => {
  return (
    <div className="relative responsive-canvas flex justify-center items-center bg-[#448ee9]">
      <div className="flex flex-col justify-center items-center gap-2">
        <button className="p-2 w-[150px] border">Play</button>
        <button className="p-2 w-[150px] border whitespace-nowrap">See ranking</button>
      </div>

      <Playboard />
      <Leaderboard />
    </div>
  )
}

export default GameCanvas
