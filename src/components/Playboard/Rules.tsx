// REACT IMPORTS
import React, { useState } from 'react'

// MUI ICONS IMPORTS
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined'

// REDUX IMPORTS
import { useAppDispatch } from '../../redux/hooks'
import { handleBackToMainMenu } from '../../redux/slices/gameModeSlice'
import { handleHideRules } from '../../redux/slices/playModeSlice'

// ASSETS IMPORTS
import boat from '../../assets/image/boat.png'
// import e1 from '../../assets/image/e1.png'
// import e2 from '../../assets/image/e2.png'
// import p1 from '../../assets/image/p1.png'
// import p2 from '../../assets/image/p2.png'
// import p3 from '../../assets/image/p3.png'
// import p4 from '../../assets/image/p4.png'

const Rules = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [step, setStep] = useState(1)

  const nextStep = (): void => {
    setStep(step + 1)
  }

  const backToMainMenu = (): void => {
    dispatch(handleBackToMainMenu())
  }

  const startGame = (): void => {
    dispatch(handleHideRules())
  }

  return (
    <>
      <button
        className="absolute z-10 top-2 md:top-4 lg:top-6 left-2 md:left-4 lg:left-6 text-2xl md:text-3xl lg:text-4xl font1 w-[70px] md:w-[100px] lg:w-[110px] aspect-[379/200] text-white bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
        onClick={backToMainMenu}>
        <UndoOutlinedIcon fontSize="inherit" />
      </button>

      {/* Overlay */}
      <div className="absolute top-0 left-0 h-full w-full bg-gray-700 opacity-90"></div>

      {/* Content */}
      <div className="absolute top-0 left-0 h-full w-full overflow-auto flex flex-col items-center p-2 md:p-4 lg:p-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center text-yellow-500 font1 my-2 md:my-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Rules
        </h1>

        {/* Step 1 */}
        {step === 1 && (
          <div className="flex flex-col justify-between items-center h-full w-full">
            <div className="flex flex-col justify-center items-center gap-8">
              <p className="text-4xl font2 text-white text-center font-bold">Ahoy matey!</p>
              <p className="text-4xl font2 text-white text-center">
                Set sail and test your skills as a seafarer!<br></br>Guide your vessel and aim for
                the highest score possible.
              </p>
              <img className="w-[15%]" src={boat} alt="boat controlled by player" />
              <p className="text-3xl font2 text-white text-center">
                Navigate your ship using the mouse.
              </p>
            </div>
            <button
              className="font1 p-1 md:p-2 pt-2 md:pt-4 w-[100px] md:w-[120px] lg:w-[140px] aspect-[379/200] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
              onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex flex-col justify-center items-center w-full">
            <p className="text-3xl font2 text-white text-center mb-8">step 2</p>
            <button
              className="font1 p-1 md:p-2 pt-2 md:pt-4 w-[100px] md:w-[120px] lg:w-[140px] aspect-[379/200] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
              onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="flex flex-col justify-center items-center w-full">
            <p className="text-3xl font2 text-white text-center mb-8">Step 3</p>
            <button
              className="font1 p-1 md:p-2 pt-2 md:pt-4 w-[100px] md:w-[120px] lg:w-[140px] aspect-[379/200] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
              onClick={startGame}>
              Start
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Rules
