import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const recordsApi = createApi({
  // (1)reducerPath, (2)baseQuery, (3)endpoints
  reducerPath: "records",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api"
  }),
  endpoints: (builder) => ({
    fetchRecords: builder.query({
      // recordsApi.useFetchRecordsQuery()
      query: () => ({
        url: "/records",
        method: "GET"
      })
    })
  })
})

// /api/records             GET
// /api/records             POST

export const { useFetchRecordsQuery } = recordsApi
export { recordsApi }
