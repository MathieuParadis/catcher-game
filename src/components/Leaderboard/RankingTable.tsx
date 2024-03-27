// REACT IMPORT
import React from 'react'

// TYPES IMPORTS
import type { RankRecordType } from '../../types/rankRecordTypes'

// DATA IMPORTS
import { ranking } from '../../data/ranking'

const RankingTable = (): JSX.Element => {
  const sortedRanking = ranking.sort((a, b) => b.score - a.score)

  return (
    <table className="min-w-full sm:min-w-[550px] overflow-hidden border-separate border-spacing-y-1.5">
      <thead className="bg-sky-800 text-left text-white text-xl sticky top-[-4px] font2">
        <tr>
          <th className="py-2 md:py-3 lg:py-4 pl-2 md:pl-3 lg:pl-4 rounded-l-md w-[80px]">Rank</th>
          <th className="py-2 md:py-3 lg:py-4 pl-2 md:pl-3 lg:pl-4">Player</th>
          <th className="py-2 md:py-3 lg:py-4 pl-2 md:pl-3 lg:pl-4 rounded-r-md">Score</th>
        </tr>
      </thead>
      <tbody className="text-black overflow-y-scroll bg-gradient-to-b from-[var(--sky1-color)] to-[var(--sand-color)] font-medium">
        {sortedRanking.map(
          (rank: RankRecordType, index: number): JSX.Element => (
            <tr key={index} className="">
              <td className="py-2 md:py-3 lg:py-4 pl-2 md:pl-3 lg:pl-4 rounded-l-md">
                <p className="text-center bg-white p-1.5 rounded-full w-[35px] h-[35px]">
                  {index + 1}
                </p>
              </td>
              <td className="py-2 md:py-3 lg:py-4 pl-2 md:pl-3 lg:pl-4">{rank.playerName}</td>
              <td className="py-2 md:py-3 lg:py-4 pl-2 md:pl-3 lg:pl-4 rounded-r-md">
                {rank.score}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export default RankingTable
