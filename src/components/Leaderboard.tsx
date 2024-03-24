// REACT IMPORT
import React from 'react'

// COMPONENTS IMPORTS
import RankingTable from './RankingTable'

const Leaderboard = (): JSX.Element => {
  return (
    <div className="absolute top-0 left-0 h-full w-full bg-[url('../assets/image/bg2.png')] bg-cover">
      <div className="h-full w-full p-6">
        <div className="relative h-full w-full">
          {/* overlay */}
          <div className="absolute top-0 left-0 h-full w-full bg-gray-700 opacity-90"></div>

          {/* content */}
          <div className="absolute top-0 left-0 h-full w-full overflow-auto flex flex-col items-center p-4">
            <h1 className="text-6xl text-green-400 mb-5">Ranking</h1>
            <p className="text-2xl text-white text-center mb-8">
              Ready to see where you stand?<br></br>Check out the top players below.
            </p>
            <RankingTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
