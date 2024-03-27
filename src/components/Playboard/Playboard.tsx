// REACT IMPORT
import React from 'react'

// COMPONENTS
import PlayCanvas from './PlayCanvas'
import Rules from './Rules'

// REDUX IMPORTS
import { useAppSelector } from '../../redux/hooks'
import { selectPlayModeState } from '../../redux/slices/playModeSlice'

const Playboard = (): JSX.Element => {
  const playMode = useAppSelector(selectPlayModeState)
  const { areRulesDisplayed } = playMode

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-[url('../assets/image/bg1.png')] bg-cover">
      <div className="relative h-full w-full">
        {/* rules */}
        {areRulesDisplayed && <Rules />}

        {/* game */}
        {!areRulesDisplayed && <PlayCanvas />}
      </div>
    </div>
  )
}

export default Playboard
