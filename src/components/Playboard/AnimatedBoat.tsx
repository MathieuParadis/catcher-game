// REACT IMPORT
import React from 'react'

const AnimatedMenu = (): JSX.Element => {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#a5e1dd] to-[#d3ede2]">
      <div className="waves-back w-full">
        <div className="wave-back"></div>
        <div className="wave-back"></div>
        <div className="wave-back"></div>
        <div className="wave-back"></div>
        <div className="wave-back"></div>
      </div>

      <div className="boat">
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

      <div className="waves w-full">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  )
}

export default AnimatedMenu
