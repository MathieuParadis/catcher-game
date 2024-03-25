// REACT IMPORT
import React from 'react'

// COMPONENTS
import PlayCanvas from './PlayCanvas'
import Rules from './Rules'

// REDUX IMPORTS
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { handleBackToMainMenu } from '../../redux/slices/gameModeSlice'
import { selectPlayModeState } from '../../redux/slices/playModeSlice'

const Playboard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const playMode = useAppSelector(selectPlayModeState)
  const { isDisplayRules } = playMode

  const backToMainMenu = (): void => {
    dispatch(handleBackToMainMenu())
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-[url('../assets/image/bg1.png')] bg-cover">
      <div className="relative h-full w-full">
        {/* rules */}
        {isDisplayRules && (
          <>
            <button className="absolute p-2 w-[150px] border z-[10]" onClick={backToMainMenu}>
              Back
            </button>
            <Rules />
          </>
        )}

        {/* game */}
        {!isDisplayRules && <PlayCanvas />}
      </div>
    </div>
  )
}

export default Playboard
