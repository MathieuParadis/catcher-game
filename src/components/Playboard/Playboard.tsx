// REACT IMPORT
import React from 'react'

// MUI ICONS IMPORTS
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined'

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
              className="absolute z-10 top-2 md:top-4 lg:top-6 left-2 md:left-4 lg:left-6 text-2xl md:text-3xl lg:text-4xl font1 w-[70px] md:w-[100px] lg:w-[110px] aspect-[379/200] text-white bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
              onClick={backToMainMenu}>
              <UndoOutlinedIcon fontSize="inherit" />
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
