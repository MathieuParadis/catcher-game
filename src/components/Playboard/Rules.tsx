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
      <div className="absolute top-0 left-0 h-full w-full overflow-auto flex flex-col items-center p-4">
        <h1 className="text-6xl text-green-400 mb-5">Rules</h1>
        <p className="text-2xl text-white text-center mb-8">Rules here</p>
        <button className="p-2 w-[150px] border bg-red-800" onClick={startGame}>
          ok start
        </button>
        <button
          className="md:top-4 left-2 md:left-4 font1 p-1 md:p-2 w-[120px] md:w-[160px] lg:w-[200px] aspect-[379/200] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
          onClick={startGame}>
          Start
        </button>
      </div>
    </>
  )
}

export default Rules
