// REACT IMPORT
import React from 'react'

// COMPONENTS IMPORTS
import GameCanvas from './components/GameCanvas'

function App(): JSX.Element {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-red-300 p-4 md:p-10 overflow-hidden">
      <GameCanvas />
    </div>
  )
}

export default App
