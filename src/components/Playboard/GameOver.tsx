// REACT IMPORTS
import React, { useState } from 'react'

// REDUX IMPORTS
import { useAppDispatch } from '../../redux/hooks'
import { handleBackToMainMenu } from '../../redux/slices/gameModeSlice'
import {
  handlePlayAgainWithoutRules,
  handleResetPlayModeSettings
} from '../../redux/slices/playModeSlice'

interface Props {
  score: number
}

const GameOver = ({ score }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const [playerName, setPlayerName] = useState('')
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false)

  console.log(setIsScoreSubmitted)

  const backToMainMenu = (): void => {
    dispatch(handleBackToMainMenu())
    dispatch(handleResetPlayModeSettings())
  }

  const playAgain = (): void => {
    dispatch(handlePlayAgainWithoutRules())
  }

  return (
    <>
      {/* Overlay */}
      <div className="absolute top-0 left-0 h-full w-full bg-gray-700 opacity-90"></div>

      {/* Content */}
      <div className="absolute top-0 left-0 h-full w-full overflow-auto">
        <div className="h-full w-full flex flex-col justify-center items-center gap-3 md:gap-16 lg:gap-20 p-2 md:p-4 lg:p-6">
          <h1 className="text-5xl md:text-7xl lg:text-9xl text-center bg-gradient-to-b from-yellow-500 to-red-500 inline-block text-transparent bg-clip-text font1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Game Over
          </h1>

          {/* Form */}
          {!isScoreSubmitted && (
            <div className="w-full flex flex-col justify-center items-center gap-2 md:gap-8 lg:gap-12">
              <p className="text-2xl md:text-4xl lg:text-6xl font2 text-white text-center font-bold">
                Your score: {score}
              </p>
              <form className="flex flex-col justify-center items-center gap-1 md:gap-4 lg:gap-6 w-full md:w-2/3 ">
                <input
                  type="text"
                  name="player_name"
                  className="w-full p-2 md:p-4 lg:p-6 border-2 md:border-4 focus:outline-none border-white bg-transparent rounded-2xl text-white placeholder:text-white text-2xl"
                  placeholder="Your name"
                  required={true}
                  value={playerName}
                  onChange={(e) => {
                    setPlayerName(e.target.value)
                  }}
                />
                <button
                  className="p-1 md:p-2 w-[120px] md:w-[160px] lg:w-[200px] font1 aspect-[379/200] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
                  onClick={() => {}}>
                  Submit
                </button>
              </form>
            </div>
          )}

          {/* Buttons */}
          {isScoreSubmitted && (
            <div className="flex justify-center items-center font1 gap-6 md:gap-8 lg:gap-12 pt-2">
              <button
                className="p-1 md:p-2 w-[120px] md:w-[160px] lg:w-[200px] aspect-[379/200] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
                onClick={playAgain}>
                Play<br></br>again
              </button>
              <button
                className="p-1 md:p-2 w-[120px] md:w-[160px] lg:w-[200px] aspect-[379/200] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
                onClick={backToMainMenu}>
                Main<br></br>menu
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default GameOver
