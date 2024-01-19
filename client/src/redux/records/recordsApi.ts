// REDO THIS MULTIPLE TIMES!!!!
// REDO THIS MULTIPLE TIMES!!!!
// REDO THIS MULTIPLE TIMES!!!!
// REDO THIS MULTIPLE TIMES!!!!

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


// initialize api
const recordsApi = createApi({
  // (1)reducerPath, (2)baseQuery, (3)endpoints
  reducerPath: "records",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  endpoints: (builder) => ({
    // builder.query<ReturnValueHere, ArgumentTypeHere>
    fetchRecords: builder.query<any, void>({
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
