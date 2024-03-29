// REDUX TOOLKIT IMPORTS
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000'
  }),
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),

  tagTypes: ['score']
})

export { apiSlice }
