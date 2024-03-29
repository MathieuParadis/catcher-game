// REACT IMPORTS
import React, { useState } from 'react'

// TYPES IMPORTS
import type { AddScoreRecordRequestType } from '../../types/scoreRecordTypes'

// API CALLS IMPORTS
import { useCreateScoreRecordMutation } from '../../redux/services/score'

interface Props {
  score: number
  setScore: (value: number) => void
  setIsScoreSubmitted: (value: boolean) => void
}

const Form = ({ score, setScore, setIsScoreSubmitted }: Props): JSX.Element => {
  const [playerName, setPlayerName] = useState('')
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

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 md:gap-8 lg:gap-12">
      <p className="text-2xl md:text-4xl lg:text-6xl font2 text-white text-center font-bold">
        Your score: {score}
      </p>
      <form className="relative flex flex-col justify-center items-center gap-1 md:gap-4 lg:gap-6 w-full md:w-2/3">
        <label
          className={`absolute top-[17px] md:top-[25px] lg:top-[32px] right-[10px] md:right-[20px] lg:right-[28px] text-red-500 animate-bounce
        ${isErrorForm ? 'block' : 'hidden'}`}>
          {fieldError}
        </label>
        <input
          type="text"
          name="player_name"
          className={`w-full p-2 md:p-4 lg:p-6 border-2 md:border-4 focus:outline-none bg-transparent rounded-2xl text-white placeholder:text-white text-2xl md:text-3xl lg:text-4xl
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
  )
}

export default Form
