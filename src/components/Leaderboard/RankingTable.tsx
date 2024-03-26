// REACT IMPORT
import React from 'react'

// TYPES IMPORTS
import type { RankRecordType } from '../../types/rankRecordTypes'

// DATA IMPORTS
import { ranking } from '../../data/ranking'

const RankingTable = (): JSX.Element => {
  const sortedRanking = ranking.sort((a, b) => b.score - a.score)

  return (
    <table id="ranking-table" className="min-w-full sm:min-w-[550px]">
      <thead className="bg-sky-800 text-left text-white py-3">
        <tr>
          <th className="py-3 text-center w-[80px]">Rank</th>
          <th className="py-3 pl-2">Player</th>
          <th className="py-3 pl-2">Score</th>
        </tr>
      </thead>
      <tbody className="text-black bg-white overflow-y-scroll">
        {sortedRanking.map(
          (rank: RankRecordType, index: number): JSX.Element => (
            <tr
              key={index}
              className="odd:bg-white even:bg-blue-100 hover:bg-cyan-600 hover:text-white">
              <td className="border-y border-[#ddd] py-2 text-center">{index + 1}</td>
              <td className="border-y border-[#ddd] py-2 pl-2">{rank.playerName}</td>
              <td className="border-y border-[#ddd] py-2 pl-2">{rank.score}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export default RankingTable
