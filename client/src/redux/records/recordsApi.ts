// REDO THIS MULTIPLE TIMES!!!!
// REDO THIS MULTIPLE TIMES!!!!
// REDO THIS MULTIPLE TIMES!!!!
// REDO THIS MULTIPLE TIMES!!!!

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Record {
  _id: string
  name: string
  displayName: string
  description: string
  value: number
  holder: string
  year: number
  wasPlayoffs: boolean
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
        method: "GET"
      })
    }),
    updateRecord: builder.query<Record, string>({
      query: (id) => ({
        url: `/records/${id}`,
        method: "PUT"
      })
    })
  })
})

export const { useFetchRecordsQuery, useUpdateRecordQuery } = recordsApi
export { recordsApi }
