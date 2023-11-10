import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface User {
  email: string
  password: string
  displayName: string
  isAdmin: boolean
}

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  endpoints: (builder) => ({
    signInUser: builder.mutation<User, { code: string }>({
      query: (user) => ({
        url: "/auth/google",
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        }
      })
    })
  })
})

export const { useSignInUserMutation } = authApi
export { authApi }
