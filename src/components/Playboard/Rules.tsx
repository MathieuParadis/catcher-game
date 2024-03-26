// REACT IMPORT
import React from 'react'

// REDUX IMPORTS
import { useAppDispatch } from '../../redux/hooks'
import { handleHideRules } from '../../redux/slices/playModeSlice'

const Rules = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const startGame = (): void => {
    dispatch(handleHideRules())
  }

  return (
    <>
      {/* overlay */}
      <div className="absolute top-0 left-0 h-full w-full bg-gray-700 opacity-90"></div>
      <div className="absolute top-0 left-0 h-full w-full overflow-auto flex flex-col items-center p-2 md:p-4 lg:p-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font1 my-2 md:my-4 lg:my-6 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Rules
        </h1>
        <p className="text-2xl text-white text-center mb-8">Rules here</p>
        <button
          className="font1 p-1 md:p-2 pt-2 md:pt-4 w-[100px] md:w-[120px] lg:w-[140px] aspect-[379/200] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
          onClick={startGame}>
          Start
        </button>
      </div>
    </>
  )
}

export default Rules
