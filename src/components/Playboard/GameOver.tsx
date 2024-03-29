// REACT IMPORTS
import React, { useState } from 'react'

import type { AddScoreRecordRequestType } from '../../types/scoreRecordTypes'

// REDUX IMPORTS
import { useAppDispatch } from '../../redux/hooks'
import { handleBackToMainMenu } from '../../redux/slices/gameModeSlice'
import {
  handlePlayAgainWithoutRules,
  handleResetPlayModeSettings
} from '../../redux/slices/playModeSlice'

// API CALLS IMPORTS
import { useCreateScoreRecordMutation } from '../../redux/services/score'

interface Props {
  score: number
  setScore: (value: number) => void
}

const GameOver = ({ score, setScore }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const [playerName, setPlayerName] = useState('')
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false)
  const [isErrorForm, setIsErrorForm] = useState(false)
  const [fieldError, setFieldError] = useState('')
  const [createScoreRecordTrigger] = useCreateScoreRecordMutation()

  const handleSubmit = async (e: { preventDefault: () => void }): Promise<void> => {
    e.preventDefault()

    if (playerName == null || playerName === '') {
      setIsErrorForm(true)
      setFieldError('Player name is missing')
      return
    } else if (playerName.length === 1) {
      setIsErrorForm(true)
      setFieldError('Player name is too short. 2 characters min')
      return
    } else if (playerName.length > 40) {
      setIsErrorForm(true)
      setFieldError('Player name is too long. 40 characters max')
      return
    }

    const body: AddScoreRecordRequestType = {
      playerName,
      score
    }

    try {
      await createScoreRecordTrigger(body).unwrap()
      setIsScoreSubmitted(true)
      setScore(0)
    } catch (error: any) {
      console.error('An error occured:', error)
    }
  }

  const submitForm = (e: { preventDefault: () => void }): void => {
    void handleSubmit(e)
  }

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
        <div className="h-full w-full flex flex-col justify-center items-center gap-3 md:gap-10 lg:gap-16 p-2 md:p-4 lg:p-6">
          <h1 className="text-5xl md:text-7xl lg:text-9xl text-center bg-gradient-to-b from-yellow-500 to-red-500 inline-block text-transparent bg-clip-text font1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Game Over
          </h1>

          {/* Form */}
          {!isScoreSubmitted && (
            <div className="w-full flex flex-col justify-center items-center gap-2 md:gap-8 lg:gap-12">
              <p className="text-2xl md:text-4xl lg:text-6xl font2 text-white text-center font-bold">
                Your score: {score}
              </p>
              <form className="relative flex flex-col justify-center items-center gap-1 md:gap-4 lg:gap-6 w-full md:w-2/3">
                <label id="player-name-label">{fieldError}</label>
                <input
                  type="text"
                  name="player_name"
                  className={`w-full p-2 md:p-4 lg:p-6 border-2 md:border-4 focus:outline-none bg-transparent rounded-2xl text-white placeholder:text-white text-2xl
                  ${isErrorForm ? 'border-red-500' : 'border-white'}`}
                  placeholder="Your name"
                  required={true}
                  minLength={2}
                  maxLength={40}
                  value={playerName}
                  onChange={(e) => {
                    setPlayerName(e.target.value)
                  }}
                />
                <button
                  className="p-1 md:p-2 w-[120px] md:w-[160px] lg:w-[200px] font1 aspect-[379/200] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
                  onClick={submitForm}>
                  Submit
                </button>
              </form>
            </div>
          )}

          {/* Buttons */}
          {isScoreSubmitted && (
            <div className="w-full flex flex-col justify-center items-center">
              <p className="text-2xl md:text-4xl lg:text-6xl font2 text-white text-center font-bold mb-2 md:mb-4 lg:mb-6">
                Your score has been submitted!
              </p>
              <p className="text-lg md:text-2xl lg:text-3xl font2 text-white text-center mb-4 md:mb-8 lg:mb-12">
                Check the ranking on the main menu to see if you belong in the top players.
              </p>
              <div className="flex justify-center items-center font1 gap-6 md:gap-8 lg:gap-12">
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
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default GameOver
