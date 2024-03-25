// REACT IMPORTS
import React, { useRef, useState } from 'react'

// COMPONENTS
import Timer from './Timer'

const PlayCanvas = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStartTimerActive, setIsStartTimerActive] = useState(true)
  const [isGameOver, setIsGameOver] = useState(false)

  return (
    <>
      {isStartTimerActive && (
        <Timer
          countdownSeconds={3}
          onExpire={() => {
            setIsStartTimerActive(false)
          }}
        />
      )}
      {!isStartTimerActive && (
        <div className="relative w-full h-full flex justify-center items-center">
          {!isGameOver && (
            <>
              <button className="absolute top-0 right-0 p-2 w-[150px] border z-[10]">Back</button>
              <Timer
                countdownSeconds={60}
                onExpire={() => {
                  setIsGameOver(true)
                }}
              />
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
