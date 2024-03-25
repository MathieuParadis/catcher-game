// REACT IMPORTS
import React, { useRef, useState } from 'react'

// COMPONENTS
import Timer from './Timer'

const PlayCanvas = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStartTimerActive, setIsStartTimerActive] = useState(true)

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
        <div className="w-full h-full flex justify-center items-center">
          <canvas className="w-full h-full" ref={canvasRef}></canvas>
        </div>
      )}
    </>
  )
}

export default PlayCanvas
