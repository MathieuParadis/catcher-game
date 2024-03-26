// REACT IMPORT
import React from 'react'

// REDUX IMPORTS
import { useAppDispatch } from '../../redux/hooks'
import { handleHideRules } from '../../redux/slices/playModeSlice'

// ASSETS IMPORTS
// import boat from '../../assets/image/boat.png'
// import e1 from '../../assets/image/e1.png'
// import e2 from '../../assets/image/e2.png'
// import p1 from '../../assets/image/p1.png'
// import p2 from '../../assets/image/p2.png'
// import p3 from '../../assets/image/p3.png'
// import p4 from '../../assets/image/p4.png'

const Rules = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const startGame = (): void => {
    dispatch(handleHideRules())
  }

  return (
    <>
      {/* overlay */}
      <div className="absolute top-0 left-0 h-full w-full bg-gray-700 opacity-90"></div>
      <div className="absolute top-0 left-0 h-full w-full overflow-auto flex flex-col items-center p-2 md:p-4 lg:p-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-yellow-500 font1 my-2 md:my-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Rules
        </h1>
        <div>
          <p className="text-3xl font2 text-white text-center mb-8">Ahoy matey!</p>
          <button
            className="font1 p-1 md:p-2 pt-2 md:pt-4 w-[100px] md:w-[120px] lg:w-[140px] aspect-[379/200] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
            onClick={startGame}>
            Start
          </button>
        </div>
      </div>
    </>
  )
}

export default Rules
