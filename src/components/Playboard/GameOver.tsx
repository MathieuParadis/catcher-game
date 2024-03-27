// REACT IMPORT
import React from 'react'

const GameOver = (): JSX.Element => {
  return (
    <>
      {/* Overlay */}
      <div className="absolute top-0 left-0 h-full w-full bg-gray-700 opacity-90"></div>

      {/* Content */}
      <div className="absolute top-0 left-0 h-full w-full overflow-auto flex flex-col justify-center items-center p-2 md:p-4 lg:p-6">
        <h1 className="text-5xl md:text-7xl lg:text-9xl text-center text-yellow-500 font1 my-2 md:my-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Game Over
        </h1>
        <p className="text-3xl font2 text-white text-center mb-8">Congratulations!</p>

        <div className="flex justify-center items-center font1 mt-10 sm:mt-14 md:m-0 gap-6 md:gap-7 lg:gap-8">
          <button
            className="p-1 md:p-2 w-[120px] md:w-[160px] lg:w-[200px] aspect-[379/200] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
            onClick={() => {}}>
            Play<br></br>again
          </button>
          <button
            className="p-1 md:p-2 w-[120px] md:w-[160px] lg:w-[200px] aspect-[379/200] text-white text-xl md:text-2xl lg:text-3xl bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
            onClick={() => {}}>
            Main<br></br>menu
          </button>
        </div>
      </div>
    </>
  )
}

export default GameOver
