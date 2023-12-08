import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type ProposalStatus = "approved" | "rejected" | "pending"

interface Comment {
  userId: string
  content: string
}

interface VoteInfo {
  upVotes: number
  downVotes: number
}

export interface IProposal {
  _id: string
  userId: string
  userName: string
  title: string
  content: string
  status: ProposalStatus
  voteInfo: VoteInfo
  comments: Comment[]
  upVoters: string[]
  downVoters: string[]
  yearProposed: number
}

const proposalsApi = createApi({
  reducerPath: "proposals",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/posts"
  }),
  endpoints: (builder) => ({
    fetchProposals: builder.query<IProposal[], void>({
      query: () => ({
        url: "/proposals",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
    })
  })
})

export const { useFetchProposalsQuery } = proposalsApi
export { proposalsApi }
