import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  displayName: string
  isAdmin: boolean
}

interface FormData {
  email: string
  password: string
}

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  endpoints: (builder) => ({
    googleSignIn: builder.mutation<User, { code: string }>({
      query: (user) => ({
        url: "/auth/google",
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        }
      })
    }),
    lazyStandardSignIn: builder.mutation<User, FormData>({
      query: (formData) => ({
        url: "/auth/signin",
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      })
    })
  })
})

export const { useGoogleSignInMutation } = authApi
export const { useLazyStandardSignInMutation } = authApi
export { authApi }
