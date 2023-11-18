import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  displayName: string
  avatar: string
  isAdmin: boolean
}

interface FormData {
  email: string
  password: string
  displayName?: string
}

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  endpoints: (builder) => ({
    lazyStandardSignIn: builder.mutation<User, FormData>({
      query: (formData) => ({
        url: "/auth/signin",
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      })
    }),
    lazyStandardSignup: builder.mutation<User, FormData>({
      query: (formData) => ({
        url: "/auth/signup",
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      })
    })
  })
})

export const { useLazyStandardSignInMutation, useLazyStandardSignupMutation } =
  authApi
export { authApi }
