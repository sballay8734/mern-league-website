import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Owner } from "./interfaces"

const ownersApi = createApi({
  reducerPath: "owners",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  endpoints: (builder) => ({
    fetchOwners: builder.query<Owner[], void>({
      query: () => ({
        url: "/owners",
        method: "GET"
      })
    })
    // update computed owners here
  })
})

export const { useFetchOwnersQuery } = ownersApi
export { ownersApi }
