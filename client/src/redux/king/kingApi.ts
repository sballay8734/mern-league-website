import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { FullObject } from "../../pages/AdminPage/utils/kothFunctions"

const kingApi = createApi({
  reducerPath: "king",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/kings"
  }),
  endpoints: (builder) => ({
    fetchKingStandings: builder.query<FullObject[], void>({
      query: () => ({
        url: "/data",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
    })
  })
})

export const { useFetchKingStandingsQuery } =
  kingApi

export { kingApi }
