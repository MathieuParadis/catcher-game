// REACT IMPORTS
import React, { useEffect, useState } from 'react'

// COMPONENTS IMPORTS
import Game from './components/Game'

function App(): JSX.Element {
  const [bgColor, setBgColor] = useState('')

  useEffect(() => {
    const updateTimeBasedBackgroundColor = (): void => {
      const currentTime = new Date().getHours()
      let newBgColor = ''

      if (currentTime >= 6 && currentTime < 9) {
        newBgColor = '#ccf3ff'
      } else if (currentTime >= 9 && currentTime < 18) {
        newBgColor = '#00bfff'
      } else if (currentTime >= 18 && currentTime < 21) {
        newBgColor = '#6388d4'
      } else {
        newBgColor = '#020035'
      }
      setBgColor(newBgColor)
    }

    updateTimeBasedBackgroundColor()
    const interval = setInterval(updateTimeBasedBackgroundColor, 60 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      // className="h-screen w-screen flex justify-center items-center p-4 md:p-10 overflow-hidden"
      className={`h-screen w-screen flex justify-center items-center p-4 md:p-10 overflow-hidden bg-${bgColor}`}
      // style={{ backgroundColor: bgColor }}
    >
      <Game />
    </div>
  )
}

export default App
