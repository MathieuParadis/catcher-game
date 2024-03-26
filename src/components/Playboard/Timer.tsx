// REACT IMPORT
import React from 'react'

// REACT-TIMER-HOOK IMPORTS
import { useTimer } from 'react-timer-hook'

interface Props {
  countdownSeconds: number
  onExpire: () => void
  className?: string
  textClassName?: string
  displayBtns?: boolean
}

const Timer = ({
  countdownSeconds,
  onExpire,
  className,
  textClassName,
  displayBtns = false
}: Props): JSX.Element => {
  const currentDate = new Date()
  const updatedDate = new Date(currentDate.getTime() + countdownSeconds * 1000)

  const { seconds, start, pause, resume } = useTimer({
    autoStart: true,
    expiryTimestamp: updatedDate,
    onExpire
  })

  return (
    <div className={className}>
      <p className={textClassName}>{seconds}</p>
      {displayBtns && (
        <>
          <button onClick={start}>Start</button>
          <button onClick={pause}>Pause</button>
          <button onClick={resume}>Resume</button>
        </>
      )}
    </div>
  )
}

export default Timer
