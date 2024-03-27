// REACT IMPORTS
import React, { useEffect, useRef, useState } from 'react'

// LODASH IMPORTSs
import { noop } from 'lodash'

// MUI ICONS IMPORTS
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined'
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined'

// COMPONENTS
import Timer from './Timer'

// REDUX IMPORTS
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { handleBackToMainMenu } from '../../redux/slices/gameModeSlice'
import {
  selectPlayModeState,
  handleTurnOffStartTimer,
  handleSetGameInProgress,
  handlePauseGame,
  handleResumeGame,
  handleTurnMusicOn,
  handleTurnMusicOff,
  handleStopGame,
  handlePlayAgainWithRules,
  handleResetPlayModeSettings
} from '../../redux/slices/playModeSlice'

// ASSETS IMPORTS
import boat from '../../assets/image/boat.png'
import music from '../../assets/audio/treasure_hunter.mp3'

const PlayCanvas = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const playMode = useAppSelector(selectPlayModeState)
  const { isStartResumeTimerActive, isGameInProgress, isGamePaused, isMusicOn } = playMode
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [boatX, setBoatX] = useState(0)
  const [tempBoatX, setTempBoatX] = useState(0)
  const [score, setScore] = useState(0)
  const [tempMusicCurrentTime, setTempMusicCurrentTime] = useState(0)

  console.log(setScore)

  const turnOffStartTimer = (): void => {
    dispatch(handleTurnOffStartTimer())
    dispatch(handleSetGameInProgress())
  }

  const turnMusicOnOff = (): void => {
    isMusicOn ? dispatch(handleTurnMusicOff()) : dispatch(handleTurnMusicOn())
  }

  const stopGame = (): void => {
    dispatch(handleStopGame())
  }

  const restartGame = (): void => {
    dispatch(handlePlayAgainWithRules())
  }

  const pauseGame = (): void => {
    dispatch(handlePauseGame())
    setTempBoatX(boatX)

    if (audioRef.current != null) {
      audioRef.current?.pause()
      setTempMusicCurrentTime(audioRef.current?.currentTime)
    }
  }

  const resumeGame = (): void => {
    dispatch(handleResumeGame())
  }

  const backToMainMenu = (): void => {
    dispatch(handleBackToMainMenu())
    dispatch(handleResetPlayModeSettings())
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
          if (isStartResumeTimerActive && !isGameInProgress) {
            setBoatX(initialBoatX)
          } else if (isStartResumeTimerActive && isGameInProgress && isGamePaused) {
            setBoatX(tempBoatX)
          }

          ctx.clearRect(0, 0, canvasWidth, canvasHeight)
          ctx.drawImage(img, boatX, initialBoatY, boatWidth, boatHeight)
        }
      }
    }
  }, [canvasRef, isStartResumeTimerActive, boatX, isGamePaused, isGameInProgress, tempBoatX])

  useEffect(() => {
    if (!isStartResumeTimerActive) {
      if (audioRef.current != null) {
        audioRef.current.currentTime = tempMusicCurrentTime
      }

      void audioRef.current?.play().catch((error) => {
        console.error('Failed to play audio:', error)
      })
    }
  }, [isStartResumeTimerActive, tempMusicCurrentTime])

  // Pause & resume game on Space
  useEffect((): (() => void) => {
    const pauseResumeGame = (e: KeyboardEvent): void => {
      if (e.key === ' ' && !isStartResumeTimerActive) {
        isGamePaused ? resumeGame() : pauseGame()
      }
    }

    window.addEventListener('keydown', pauseResumeGame)
    return (): void => {
      window.removeEventListener('keydown', pauseResumeGame)
    }
  })

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <div className="absolute flex gap-4 md:gap-8 lg:gap-20 top-2 md:top-4 lg:top-6 right-2 md:right-4 lg:right-6">
        <p className="text-3xl md:text-4xl lg:text-5xl font2 text-white">
          Score: <span className="">{score}</span>
        </p>
        <Timer
          className="flex justify-center items-center font1 w-[50px] md:w-[80px] lg:w-[110px] text-xl md:text-2xl lg:text-3xl aspect-[379/200] text-white bg-[url('../assets/image/woodboard.png')] bg-cover"
          textClassName="w-[35px] md:w-[40px] lg:w-[45px]"
          countdownSeconds={60}
          onExpire={stopGame}
          isPause={isGamePaused || isStartResumeTimerActive || !isGameInProgress}
          displayIcon={true}
        />
      </div>
      {/* Start & resume timer */}
      {isStartResumeTimerActive && (
        <>
          {/* Overlay */}
          <div className="absolute top-0 left-0 h-full w-full bg-gray-700 opacity-70"></div>

          {/* Content */}
          <Timer
            className="z-10 mb-[60px] md:mb-[80px] lg:mb-[100px]"
            textClassName="text-[80px] md:text-[140px] lg:text-[200px] mb-[40px] md:mb-[60px] lg:mb-[60px] text-white"
            countdownSeconds={3}
            onExpire={turnOffStartTimer}
            isPause={isGamePaused}
          />
          <canvas
            className="absolute w-full h-full p-0 m-0"
            ref={canvasRef}
            onMouseMove={noop}></canvas>
        </>
      )}

      {/* Game is active ... */}
      {!isStartResumeTimerActive && isGameInProgress && (
        <>
          {/* ... and in progress */}
          {!isGamePaused && (
            <>
              <div className="absolute flex gap-2 md:gap-4 lg:gap-8 z-10 top-2 md:top-4 lg:top-6 left-2 md:left-4 lg:left-6">
                <button
                  className="font1 w-[50px] md:w-[80px] lg:w-[110px] text-xl md:text-2xl lg:text-4xl aspect-[379/200] text-white bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
                  onClick={turnMusicOnOff}>
                  {isMusicOn ? (
                    <VolumeUpOutlinedIcon fontSize="inherit" />
                  ) : (
                    <VolumeOffOutlinedIcon fontSize="inherit" />
                  )}
                </button>
                <button
                  className="font1 w-[50px] md:w-[80px] lg:w-[110px] text-xl md:text-2xl lg:text-4xl aspect-[379/200] text-white bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
                  onClick={pauseGame}>
                  <PauseOutlinedIcon fontSize="inherit" />
                </button>
              </div>
              <canvas
                className="w-full h-full p-0 m-0"
                ref={canvasRef}
                onMouseMove={handleMouseMove}></canvas>
              <audio className="hidden" ref={audioRef} muted={!isMusicOn}>
                <source src={music} type="audio/mpeg" />
              </audio>
            </>
          )}

          {/* ... and in pause */}
          {isGamePaused && (
            <>
              {/* Overlay */}
              <div className="absolute top-0 left-0 h-full w-full bg-gray-700 opacity-70"></div>

              {/* Content */}
              <canvas className="w-full h-full p-0 m-0" ref={canvasRef} onMouseMove={noop}></canvas>
              <div className="absolute top-0 left-0 h-full w-full overflow-auto flex flex-col justify-center items-center p-2 md:p-4 lg:p-6">
                <h1 className="text-5xl md:text-7xl lg:text-9xl text-center text-yellow-500 font1 my-2 md:my-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  Paused
                </h1>
                <div className="flex justify-center items-center font1 mt-10 sm:mt-14 md:m-0 gap-6 md:gap-7 lg:gap-8">
                  <button
                    className="text-3xl md:text-4xl lg:text-5xl font1 w-[90px] md:w-[110px] lg:w-[130px] aspect-[379/200] text-white bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
                    onClick={restartGame}>
                    <RestartAltOutlinedIcon fontSize="inherit" />
                  </button>
                  <button
                    className="text-3xl md:text-4xl lg:text-5xl font1 w-[90px] md:w-[110px] lg:w-[130px] aspect-[379/200] text-white bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
                    onClick={resumeGame}>
                    <PlayArrowIcon fontSize="inherit" />
                  </button>
                  <button
                    className="text-3xl md:text-4xl lg:text-5xl font1 w-[90px] md:w-[110px] lg:w-[130px] aspect-[379/200] text-white bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
                    onClick={backToMainMenu}>
                    <HomeOutlinedIcon fontSize="inherit" />
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default PlayCanvas
