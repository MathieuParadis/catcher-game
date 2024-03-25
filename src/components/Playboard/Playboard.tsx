// REACT IMPORT
import React from 'react'

// COMPONENTS
import Rules from './Rules'

// REDUX IMPORTS
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { handleBackToMainMenu, selectGameModeState } from '../../redux/slices/gameModeSlice'

const Playboard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const gameMode = useAppSelector(selectGameModeState)
  const { showRules } = gameMode

  const backToMainMenu = (): void => {
    dispatch(handleBackToMainMenu())
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-[url('../assets/image/bg1.png')] bg-cover">
      <div className="relative h-full w-full">
        <button className="absolute p-2 w-[150px] border z-[10]" onClick={backToMainMenu}>
          Back
        </button>

        {/* rules */}
        {showRules && <Rules />}

        {/* game */}
        {!showRules && (
          <div className="h-full w-full flex justify-center items-center">GAAMEEEEE</div>
        )}
      </div>
    </div>
  )
}

export default Playboard
