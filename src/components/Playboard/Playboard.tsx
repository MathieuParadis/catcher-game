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
            <button
              className="absolute z-10 top-2 md:top-4 left-2 md:left-4 font1 p-1 md:p-2 pt-2 md:pt-4 w-[80px] md:w-[100px] lg:w-[120px] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
              onClick={backToMainMenu}>
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
