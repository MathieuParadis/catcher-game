// REACT IMPORT
import React from 'react'

// MUI ICONS IMPORTS
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined'

// COMPONENTS IMPORTS
import RankingTable from './RankingTable'

// REDUX IMPORTS
import { useAppDispatch } from '../../redux/hooks'
import { handleBackToMainMenu } from '../../redux/slices/gameModeSlice'

const Leaderboard = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const backToMainMenu = (): void => {
    dispatch(handleBackToMainMenu())
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-[url('../assets/image/bg2.png')] bg-cover">
      <div className="h-full w-full">
        <div className="relative h-full w-full">
          {/* overlay */}
          <div className="absolute top-0 left-0 h-full w-full bg-gray-700 opacity-90"></div>
          <button
            className="absolute z-10 top-2 md:top-4 lg:top-6 left-2 md:left-4 lg:left-6 text-2xl md:text-3xl lg:text-4xl font1 w-[70px] md:w-[100px] lg:w-[110px] aspect-[379/200] text-white bg-[url('../assets/image/woodboard.png')] bg-cover hover:scale-110"
            onClick={backToMainMenu}>
            <UndoOutlinedIcon fontSize="inherit" />
          </button>

          {/* content */}
          <div className="absolute top-0 left-0 h-full w-full flex flex-col items-center p-2 md:p-4 lg:p-6 overflow-hidden">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-yellow-500 font1 my-2 md:my-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Ranking
            </h1>
            <div className="w-full md:flex md:flex-col md: justify-center md:items-center overflow-auto no-scrollbar pt-1">
              <p className="text-xl md:text-2xl lg:text-3xl font2 text-white text-center mb-8">
                Ready to see where you stand?<br></br>Check out the top players below.
              </p>
              <RankingTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
