// SLICE IMPORT
import { apiSlice } from '../slices/apiSlice'

// TYPES IMPORTS
import type { ScoreRecordType, AddScoreRecordRequestType } from '../../types/scoreRecordTypes'

export const scoreExtendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getScoreRecords: builder.query<ScoreRecordType[], null>({
      query: () => ({
        url: '/api/scores',
        method: 'GET'
      }),
      providesTags: ['score']
    }),

    createScoreRecord: builder.mutation<ScoreRecordType, AddScoreRecordRequestType>({
      query: (body) => ({
        url: '/api/scores',
        method: 'POST',
        body
      }),
      invalidatesTags: ['score']
    })
  })
})

export const { useGetScoreRecordsQuery, useCreateScoreRecordMutation } = scoreExtendedApiSlice
