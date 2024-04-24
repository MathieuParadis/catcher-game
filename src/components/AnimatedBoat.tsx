// REACT IMPORT
import React from 'react'

const AnimatedBoat = (): JSX.Element => {
  return (
    <div className="absolute h-full w-full bg-gradient-to-b from-[var(--sky1-color)] to-[var(--sky2-color)]">
      <div className="waves-back">
        <div className="wave-back"></div>
        <div className="wave-back"></div>
        <div className="wave-back"></div>
        <div className="wave-back"></div>
        <div className="wave-back"></div>
      </div>

      <div className="boat hidden md:block">
        <div className="mast">
          <div className="sail"></div>
          <div className="flag">
            <div className="skull">
              <div className="eyes">
                <div className="eye"></div>
                <div className="eye"></div>
              </div>
              <div className="teeth">
                <div className="tooth"></div>
                <div className="tooth"></div>
                <div className="tooth"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hull"></div>
      </div>

      <div className="waves">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  )
}

export default AnimatedBoat
