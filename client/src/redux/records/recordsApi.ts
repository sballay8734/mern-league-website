import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface IRecord {
  recordHolder: string,
  opponent: string | null,
  statValue: number,
  bonusStat: number | null
  year: number | null
  during: "Playoffs" | "Season" | null,

  matchup: {pointsFor: number, pointsAgainst: number, opponent: string, during: string} | null
  type: string
}

interface FullRecordObject {
  [recordName: string]: IRecord
}

interface Record {
  records: FullRecordObject
}

// initialize api
const recordsApi = createApi({
  // (1)reducerPath, (2)baseQuery, (3)endpoints
  reducerPath: "records",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  endpoints: (builder) => ({
    // builder.query<ReturnValueHere, ArgumentTypeHere>
    fetchRecords: builder.query<Record[], void>({
      query: () => ({
        url: "/records",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
    })
  })
})

export const { useFetchRecordsQuery } = recordsApi
export { recordsApi }
