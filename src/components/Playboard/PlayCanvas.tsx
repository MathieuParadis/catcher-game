// REACT IMPORTS
import React, { useEffect, useRef, useState } from 'react'

// LODASH IMPORTSs
import { noop, random } from 'lodash'

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

// UTILS IMPORTS
import checkCatch from '../../utils/checkCatch'

// ASSETS IMPORTS
import boat from '../../assets/image/boat.png'
import p1 from '../../assets/image/p1.png'
import music from '../../assets/audio/treasure_hunter.mp3'

const PlayCanvas = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const playMode = useAppSelector(selectPlayModeState)
  const { isStartResumeTimerActive, isGameInProgress, isGamePaused, isMusicOn } = playMode
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [boatX, setBoatX] = useState(5000)
  const [boatY, setBoatY] = useState(5000)
  const [tempBoatX, setTempBoatX] = useState(0)
  const [score, setScore] = useState(0)
  const [tempMusicCurrentTime, setTempMusicCurrentTime] = useState(0)
  const [itemX, setItemX] = useState(0)
  const [itemY, setItemY] = useState(0)

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

  // Draw boat on canvas
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
            setBoatY(initialBoatY)
          } else if (isStartResumeTimerActive && isGameInProgress && isGamePaused) {
            setBoatX(tempBoatX)
          }

          ctx.drawImage(img, boatX, boatY, boatWidth, boatHeight)
        }
      }
    }
  }, [canvasRef, isStartResumeTimerActive, isGamePaused, isGameInProgress, boatX, boatY, tempBoatX])

  // Draw items on canvas
  useEffect(() => {
    if (canvasRef.current != null) {
      const ctx = canvasRef.current.getContext('2d')
      const animation = animationRef.current

      const animate = (): void => {
        if (canvasRef.current != null && ctx != null && animation != null) {
          const img = new Image()
          img.src = p1

          // Calculate the width of the item (12.5% of canvas width)
          const canvasWidth = canvasRef.current.width
          const canvasHeight = canvasRef.current.height
          const itemWidth = canvasWidth * 0.125
          const itemHeight = itemWidth * 1
          const boatWidth = canvasWidth * 0.2
          const boatHeight = boatWidth * 1.23

          // Random initial positon of the item
          const initialItemX = random(0, canvasWidth - itemWidth)
          const initialItemY = 0

          // Draw the item
          img.onload = () => {
            if (isStartResumeTimerActive && !isGameInProgress && itemX === 0 && itemY === 0) {
              setItemX(initialItemX)
              setItemY(initialItemY)
            } else if (!isStartResumeTimerActive && isGameInProgress && !isGamePaused) {
              setItemY(itemY + 0.09)
            }
            ctx.clearRect(itemX, itemY, itemWidth, itemHeight)
            ctx.drawImage(img, itemX, itemY, itemWidth, itemHeight)

            // Check for collision
            if (
              checkCatch({
                obj1: { x: boatX, y: boatY, w: boatWidth, h: boatHeight },
                obj2: { x: itemX, y: itemY, w: itemWidth, h: itemHeight }
              })
            ) {
              // Stop animation if needed
              ctx.clearRect(itemX, itemY, itemWidth, itemHeight)
              setItemX(-canvasWidth)
              setItemY(canvasHeight)
              setScore(score + 50)
            }
          }
        }
      }

      // Start animation loop
      animate()

      // Clean up function
      return () => {
        if (animation != null) {
          cancelAnimationFrame(animation)
        }
      }
    }
  }, [
    canvasRef,
    isStartResumeTimerActive,
    isGamePaused,
    isGameInProgress,
    boatX,
    boatY,
    tempBoatX,
    itemX,
    itemY,
    score
  ])

  // control of the audio
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
      {/* Top buttons */}
      <div className="absolute z-20 flex gap-2 md:gap-4 lg:gap-8 top-2 md:top-4 lg:top-6 left-2 md:left-4 lg:left-6">
        <button
          className="font1 w-[60px] md:w-[80px] lg:w-[110px] text-xl md:text-2xl lg:text-4xl aspect-[379/200] text-white bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
          onClick={turnMusicOnOff}>
          {isMusicOn ? (
            <VolumeUpOutlinedIcon fontSize="inherit" />
          ) : (
            <VolumeOffOutlinedIcon fontSize="inherit" />
          )}
        </button>
        {!(isGamePaused || isStartResumeTimerActive) && (
          <button
            className="font1 w-[60px] md:w-[80px] lg:w-[110px] text-xl md:text-2xl lg:text-4xl aspect-[379/200] text-white bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
            onClick={pauseGame}>
            <PauseOutlinedIcon fontSize="inherit" />
          </button>
        )}
      </div>

      {/* Score and timer */}
      <div className="absolute z-20 flex gap-2 md:gap-4 lg:gap-8 top-2 md:top-4 lg:top-6 right-2 md:right-4 lg:right-6">
        <p className="flex justify-center items-center font1 text-2xl md:text-3xl lg:text-4xl text-white">
          Score: {score}
        </p>
        <Timer
          className="flex justify-center items-center font1 w-[70px] md:w-[90px] lg:w-[110px] text-xl md:text-2xl lg:text-3xl aspect-[379/200] text-white bg-[url('../assets/image/woodboard.png')] bg-cover"
          textClassName="w-[25px] md:w-[30px] lg:w-[35px]"
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
          <div className="absolute top-0 left-0 h-full w-full bg-gray-700 opacity-70 z-10"></div>

          {/* Content */}
          <Timer
            className="z-20 mb-[60px] md:mb-[80px] lg:mb-[100px]"
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
