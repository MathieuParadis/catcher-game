// REACT IMPORTS
import React, { useState } from 'react'

// COMPONENTS
import Timer from './Timer'

const PlayCanvas = (): JSX.Element => {
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
        <div className="h-full w-full flex justify-center items-center">GAAMEEEEE</div>
      )}
    </>
  )
}

export default PlayCanvas
