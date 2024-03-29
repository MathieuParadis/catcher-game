export interface ScoreRecordType {
  id: string | number
  score: number
  playerName: string
}

export interface AddScoreRecordRequestType {
  score: number
  playerName: string
}
