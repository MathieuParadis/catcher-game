// REACT IMPORTS
import React, { useRef } from 'react'

// COMPONENTS
import Timer from './Timer'

// REDUX IMPORTS
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  selectPlayModeState,
  handleTurnOffStartTimer,
  handleStopGame
} from '../../redux/slices/playModeSlice'

const PlayCanvas = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const playMode = useAppSelector(selectPlayModeState)
  const { isStartTimerActive, isGameOver } = playMode
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const turnOffStartTimer = (): void => {
    dispatch(handleTurnOffStartTimer())
  }

  const stopGame = (): void => {
    dispatch(handleStopGame())
  }

  return (
    <>
      {isStartTimerActive && <Timer countdownSeconds={3} onExpire={turnOffStartTimer} />}
      {!isStartTimerActive && (
        <div className="relative w-full h-full flex justify-center items-center">
          {!isGameOver && (
            <>
              <button className="absolute top-0 right-0 p-2 w-[150px] border z-[10]">Pause</button>
              <Timer countdownSeconds={60} onExpire={stopGame} />
              <canvas className="w-full h-full" ref={canvasRef}></canvas>
            </>
          )}

          {isGameOver && <>game over</>}
        </div>
      )}
    </>
  )
}

export default PlayCanvas
