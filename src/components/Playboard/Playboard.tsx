// REACT IMPORTS
import React, { useState } from 'react'

// COMPONENTS
import GameOver from './GameOver'
import PlayCanvas from './PlayCanvas'
import Rules from './Rules'

// REDUX IMPORTS
import { useAppSelector } from '../../redux/hooks'
import { selectPlayModeState } from '../../redux/slices/playModeSlice'

const Playboard = (): JSX.Element => {
  const playMode = useAppSelector(selectPlayModeState)
  const { areRulesDisplayed, isGameOver } = playMode
  const [score, setScore] = useState(0)

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-[url('../assets/image/bg1.png')] bg-cover">
      <div className="relative h-full w-full">
        {/* Rules */}
        {areRulesDisplayed && <Rules />}

        {/* Game in progress */}
        {!areRulesDisplayed && !isGameOver && <PlayCanvas score={score} setScore={setScore} />}

        {/* Game in progress */}
        {!areRulesDisplayed && isGameOver && <GameOver score={score} />}
      </div>
    </div>
  )
}

export default Playboard
