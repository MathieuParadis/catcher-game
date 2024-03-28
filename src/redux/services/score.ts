
// SLICE IMPORT
import { apiSlice } from '../slices/apiSlice'

// TYPES IMPORTS
import { type ScoreRecordType} from '../../types/ScoreRecordTypes'

export const scoreExtendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getScores: builder.query<ScoreRecordType[], null>({
      query: () => ({
        url: '/api/scores',
        method: 'GET'
      }),
      providesTags: ['score']
    })
  })
})

export const { useGetScoresQuery } = scoreExtendedApiSlice