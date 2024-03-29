// REACT IMPORTS
import React, { useEffect, useState } from 'react'

// // REACT LOADING IMPORT
// import ReactLoading from 'react-loading'

// TYPES IMPORTS
import type { ScoreRecordType } from '../../types/scoreRecordTypes'

// API CALLS IMPORTS
import { useGetScoresQuery } from '../../redux/services/score'

const RankingTable = (): JSX.Element => {
  const [scores, setScores] = useState<ScoreRecordType[]>()

  // const { data, isLoading, isFetching, isError } = useGetScoresQuery(null)
  const { data } = useGetScoresQuery(null)

  useEffect(() => {
    if (data != null) {
      setScores(data)
    }
  }, [data])

  return (
    <table className="min-w-full border-separate border-spacing-y-1.5">
      <thead className="bg-sky-800 text-left text-white text-xl sticky top-[-4px] font2">
        <tr>
          <th className="py-2 md:py-3 lg:py-4 pl-2 md:pl-3 lg:pl-4 w-[80px]">Rank</th>
          <th className="py-2 md:py-3 lg:py-4 pl-2 md:pl-3 lg:pl-4">Player</th>
          <th className="py-2 md:py-3 lg:py-4 pl-2 md:pl-3 lg:pl-4">Score</th>
        </tr>
      </thead>
      <tbody className="text-black overflow-y-scroll bg-gradient-to-b from-[var(--sky1-color)] to-[var(--sand-color)] font-medium">
        {scores?.map(
          (rank: ScoreRecordType, index: number): JSX.Element => (
            <tr key={index} className="">
              <td className="py-2 md:py-3 lg:py-4 pl-2 md:pl-3 lg:pl-4 rounded-l-md">
                {index + 1 === 1 && (
                  <p className="text-center bg-[var(--gold-color)] p-1.5 rounded-full w-[35px] h-[35px]">
                    {index + 1}
                  </p>
                )}
                {index + 1 === 2 && (
                  <p className="text-center bg-[var(--silver-color)] p-1.5 rounded-full w-[35px] h-[35px]">
                    {index + 1}
                  </p>
                )}
                {index + 1 === 3 && (
                  <p className="text-center text-white bg-[var(--bronze-color)] p-1.5 rounded-full w-[35px] h-[35px]">
                    {index + 1}
                  </p>
                )}
                {index + 1 > 3 && (
                  <p className="text-center bg-white p-1.5 rounded-full w-[35px] h-[35px]">
                    {index + 1}
                  </p>
                )}
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
