// REACT IMPORT
import React from 'react'

// REDUX IMPORTS
import { useAppDispatch } from '../redux/hooks'
import { handleBackToMainMenu } from '../redux/slices/gameModeSlice'

const Playboard = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const backToMainMenu = (): void => {
    dispatch(handleBackToMainMenu())
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-[url('../assets/image/bg1.png')] bg-cover">
      <button className="p-2 w-[150px] border whitespace-nowrap" onClick={backToMainMenu}>
        See ranking
      </button>
    </div>
  )
}

export default Playboard
