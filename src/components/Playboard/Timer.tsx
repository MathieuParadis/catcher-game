// REACT IMPORTS
import React, { useEffect } from 'react'

// MUI ICONS IMPORS
import TimerSharpIcon from '@mui/icons-material/TimerSharp'

// REACT-TIMER-HOOK IMPORTS
import { useTimer } from 'react-timer-hook'

interface Props {
  countdownSeconds: number
  onExpire: () => void
  className?: string
  textClassName?: string
  displayIcon?: boolean
  isPause?: boolean
}

const Timer = ({
  countdownSeconds,
  onExpire,
  className,
  textClassName,
  displayIcon = false,
  isPause = false
}: Props): JSX.Element => {
  const currentDate = new Date()
  const updatedDate = new Date(currentDate.getTime() + countdownSeconds * 1000)

  const { seconds, totalSeconds, pause, resume } = useTimer({
    autoStart: true,
    expiryTimestamp: updatedDate,
    onExpire
  })

  useEffect(() => {
    isPause ? pause() : resume()
  }, [isPause, pause, resume])

  return (
    <div className={className}>
      {displayIcon ? (
        <p className="flex items-start gap-1">
          <TimerSharpIcon fontSize="inherit" />
          <span className={textClassName}>{totalSeconds}</span>
        </p>
      ) : (
        <p className={textClassName}>{seconds}</p>
      )}
    </div>
  )
}

export default Timer
