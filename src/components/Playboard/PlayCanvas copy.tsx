// REACT IMPORTS
import React, { useEffect, useRef, useState } from 'react'

// MUI ICONS IMPORTS
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined'
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined'

// COMPONENTS
import Timer from './Timer'

// REDUX IMPORTS
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  selectPlayModeState,
  handleTurnOffStartTimer,
  handleTurnMusicOn,
  handleTurnMusicOff,
  handleStopGame
} from '../../redux/slices/playModeSlice'

// ASSETS IMPORTS
import boat from '../../assets/image/boat.png'
import music from '../../assets/audio/treasure_hunter.mp3'

const PlayCanvas = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const playMode = useAppSelector(selectPlayModeState)
  const { isStartTimerActive, isGameOver, isMusicOn } = playMode
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const [boatX, setBoatX] = useState(0)

  const turnOffStartTimer = (): void => {
    dispatch(handleTurnOffStartTimer())
  }

  const turnMusicOnOff = (): void => {
    isMusicOn ? dispatch(handleTurnMusicOff()) : dispatch(handleTurnMusicOn())
  }

  const stopGame = (): void => {
    dispatch(handleStopGame())
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    if (canvasRef.current != null) {
      const rect = canvasRef.current.getBoundingClientRect()
      const canvasWidth = canvasRef.current.width
      const boatWidth = canvasWidth * 0.2 // Assuming boat width is 20% of canvas width

      // Calculate the mouse position relative to the canvas
      const mouseX = (event.clientX - rect.left) * (canvasWidth / rect.width)
      let newBoatX = mouseX - boatWidth / 2

      // Ensure the boat stays within the edges of the canvas
      newBoatX = Math.max(0, newBoatX)
      newBoatX = Math.min(canvasWidth - boatWidth, newBoatX)

      // Update the boat's X position
      setBoatX(newBoatX)
    }
  }

  useEffect(() => {
    if (canvasRef.current != null) {
      const ctx = canvasRef.current.getContext('2d')

      // Adjust canvas size for Retina displays
      const scaleFactor = window.devicePixelRatio
      canvasRef.current.width = canvasRef.current.clientWidth * scaleFactor
      canvasRef.current.height = canvasRef.current.clientHeight * scaleFactor

      if (ctx != null) {
        const img = new Image()
        img.src = boat

        // Calculate the width of the boat (20% of canvas width)
        const canvasWidth = canvasRef.current.width
        const canvasHeight = canvasRef.current.height
        const boatWidth = canvasWidth * 0.2
        const boatHeight = boatWidth * 1.23

        // Initial positon of the boat
        // Calculate the position to draw the boat in the middle
        const initialBoatX = (canvasWidth - boatWidth) / 2
        const initialBoatY = canvasHeight - boatHeight - 50

        // Draw the boat
        img.onload = () => {
          if (isStartTimerActive) {
            setBoatX(initialBoatX)
          }

          ctx.clearRect(0, 0, canvasWidth, canvasHeight)
          ctx.drawImage(img, boatX, initialBoatY, boatWidth, boatHeight)
        }
      }
    }
  }, [canvasRef, isStartTimerActive, isGameOver, boatX])

  useEffect(() => {
    if (!isStartTimerActive && !isGameOver) {
      void audioRef.current?.play().catch((error) => {
        console.error('Failed to play audio:', error)
      })
    }
  }, [isStartTimerActive, isGameOver])

  return (
    <>
      {/* Start timer */}
      {isStartTimerActive && (
        <div className="relative w-full h-full flex justify-center items-center">
          {/* overlay */}
          <div className="absolute top-0 left-0 h-full w-full bg-gray-700 opacity-70"></div>
          <Timer
            className="z-10 mb-[60px] md:mb-[80px] lg:mb-[100px]"
            textClassName="text-[80px] md:text-[140px] lg:text-[200px] mb-[40px] md:mb-[60px] lg:mb-[60px] text-white"
            countdownSeconds={3}
            onExpire={turnOffStartTimer}
          />
          <canvas
            className="absolute w-full h-full p-0 m-0"
            ref={canvasRef}
            onMouseMove={handleMouseMove}></canvas>
        </div>
      )}

      {/* Game is active */}
      {!isStartTimerActive && !isGameOver && (
        <div className="relative w-full h-full flex justify-center items-center">
          <div className="absolute top-0 right-0 flex gap-8">
            <Timer countdownSeconds={60} onExpire={stopGame} />
            <button className="p-2 w-[150px] border z-[10]">Pause</button>
          </div>
          <button
            className="absolute z-10 top-2 md:top-4 lg:top-6 left-2 md:left-4 lg:left-6 text-2xl md:text-3xl lg:text-4xl font1 w-[70px] md:w-[100px] lg:w-[110px] aspect-[379/200] text-white bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
            onClick={turnMusicOnOff}>
            {isMusicOn ? (
              <VolumeUpOutlinedIcon fontSize="inherit" />
            ) : (
              <VolumeOffOutlinedIcon fontSize="inherit" />
            )}
          </button>
          <canvas
            className="w-full h-full p-0 m-0"
            ref={canvasRef}
            onMouseMove={handleMouseMove}></canvas>
          <audio className="hidden" ref={audioRef} muted={!isMusicOn}>
            <source src={music} type="audio/mpeg" />
          </audio>
        </div>
      )}

      {!isStartTimerActive && isGameOver && (
        <div className="relative w-full h-full flex justify-center items-center">game over</div>
      )}
    </>
  )
}

export default PlayCanvas
