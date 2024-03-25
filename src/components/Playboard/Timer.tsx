import React from 'react'
import { useTimer } from 'react-timer-hook'

interface Props {
  countdownSeconds: number
}

const Timer = ({ countdownSeconds }: Props): JSX.Element => {
  const currentDate = new Date()
  const updatedDate = new Date(currentDate.getTime() + countdownSeconds * 1000)

  const { seconds, start, pause, resume } = useTimer({
    autoStart: true,
    expiryTimestamp: updatedDate
  })

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '100px' }}>
        <span>{seconds}</span>
      </div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
    </div>
  )
}

export default Timer
