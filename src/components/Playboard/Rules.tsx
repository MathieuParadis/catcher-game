// REACT IMPORT
import React from 'react'

// REDUX IMPORTS
import { useAppDispatch } from '../../redux/hooks'
import { handleHideRules } from '../../redux/slices/gameModeSlice'

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
      </div>
    </>
  )
}

export default Rules
