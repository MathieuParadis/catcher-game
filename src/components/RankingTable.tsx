import * as React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import type { RankRecordType } from '../types/rankRecordTypes'
import { ranking } from '../data/ranking'

const RankingTable = (): JSX.Element => {
  const sortedRanking = ranking.sort((a, b) => b.score - a.score)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="sticky top-0 z-10">
          <TableRow className="border border-b bg-red-200">
            <TableCell align="right">
              <Typography variant="h6" fontWeight="bold">
                Rank
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" fontWeight="bold">
                Score
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" fontWeight="bold">
                Player
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRanking.map(
            (rank: RankRecordType, index: number): JSX.Element => (
              <TableRow key={rank.id}>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">{rank.score}</TableCell>
                <TableCell align="right">{rank.playerName}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RankingTable
