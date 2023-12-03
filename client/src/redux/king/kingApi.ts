import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { IKothStanding, IWeeklyResult } from "./interfaces"

const kingApi = createApi({
  reducerPath: "king",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mern-league-website-server.onrender.com/api/kings"
  }),
  endpoints: (builder) => ({
    fetchKingStandings: builder.query<IKothStanding[], void>({
      query: () => ({
        url: "/standings",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
    }),
    fetchWeeklyResults: builder.query<IWeeklyResult[], void>({
      query: () => ({
        url: "/results",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
    })
  })
})

export const { useFetchKingStandingsQuery, useFetchWeeklyResultsQuery } =
  kingApi

export { kingApi }
