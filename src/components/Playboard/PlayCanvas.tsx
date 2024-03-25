// REACT IMPORTS
import React, { useEffect, useRef, useState } from 'react'

// COMPONENTS
import Timer from './Timer'

// REDUX IMPORTS
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  selectPlayModeState,
  handleTurnOffStartTimer,
  handleStopGame
} from '../../redux/slices/playModeSlice'

// ASSETS IMPORTS
import boat from '../../assets/image/boat.png'

const PlayCanvas = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const playMode = useAppSelector(selectPlayModeState)
  const { isStartTimerActive, isGameOver } = playMode
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [boatX, setBoatX] = useState(0)

  const turnOffStartTimer = (): void => {
    dispatch(handleTurnOffStartTimer())
  }

  const stopGame = (): void => {
    dispatch(handleStopGame())
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    if (canvasRef.current != null) {
      const rect = canvasRef.current.getBoundingClientRect()
      setBoatX(event.clientX - rect.left)
    }
  }

  useEffect(() => {
    if (canvasRef.current != null) {
      const ctx = canvasRef.current.getContext('2d')

      // Adjust canvas size for Retina displays
      const scaleFactor = window.devicePixelRatio
      canvasRef.current.width = canvasRef.current.clientWidth * scaleFactor
      canvasRef.current.height = canvasRef.current.clientHeight * scaleFactor

      if (ctx != null) {
        const img = new Image()
        img.src = boat

        // Calculate the width of the boat (20% of canvas width)
        const canvasWidth = canvasRef.current.width
        const canvasHeight = canvasRef.current.height
        const boatWidth = canvasWidth * 0.2
        const boatHeight = boatWidth * 1.23

        // Initial positon of the boat
        // Calculate the position to draw the boat in the middle
        // const initialBoatX = (canvasWidth - boatWidth) / 2
        const initialBoatY = canvasHeight - boatHeight - 50

        // Draw the boat
        img.onload = () => {
          // ctx.drawImage(img, boatX, boatY, boatWidth, boatHeight)
          ctx.clearRect(0, 0, canvasWidth, canvasHeight)
          ctx.drawImage(img, boatX, initialBoatY, boatWidth, boatHeight)
        }
      }
    }
  }, [canvasRef, isStartTimerActive, isGameOver, boatX])

  return (
    <>
      {/* Start timer */}
      {isStartTimerActive && <Timer countdownSeconds={3} onExpire={turnOffStartTimer} />}

      {/* Game is active */}
      {!isStartTimerActive && (
        <div className="relative w-full h-full flex justify-center items-center">
          {!isGameOver && (
            <>
              <div className="absolute top-0 right-0 flex gap-8">
                <Timer countdownSeconds={60} onExpire={stopGame} />
                <button className="p-2 w-[150px] border z-[10]">Pause</button>
              </div>
              <canvas
                className="w-full h-full p-0 m-0"
                ref={canvasRef}
                onMouseMove={handleMouseMove}></canvas>
            </>
          )}

          {isGameOver && <>game over</>}
        </div>
      )}
    </>
  )
}

export default PlayCanvas
