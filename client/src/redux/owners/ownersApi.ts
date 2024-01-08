import { staticOwnerSchema } from "./../../../../server/models/staticOwnerData"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Owner } from "./interfaces"

interface User {
  email: string
  firstName: string
  lastInitial: string
  preferredTheme: string
  avatar: string
}

import { StaticOwner } from "../../types/StaticOwner"

const ownersApi = createApi({
  reducerPath: "owners",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  endpoints: (builder) => ({
    fetchOwners: builder.query<Owner[], void>({
      query: () => ({
        url: "/owners",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
    }),
    fetchUserImages: builder.query<User[], void>({
      query: () => ({
        url: "/owners/users",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
    }),
    fetchStaticData: builder.query<(StaticOwner)[], void>({
      query: () => ({
        url: "/owners/static",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
    })
  })
})

export const {
  useFetchOwnersQuery,
  useFetchUserImagesQuery,
  useFetchStaticDataQuery
} = ownersApi
export { ownersApi }
