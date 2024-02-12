import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Challenge {
  challengerId: string
  acceptorId: string
  challengerName: string
  acceptorName: string
  challengerSelection: string // "over" | "under" | "away" | "home"
  acceptorSelection: string // "over" | "under" | "away" | "home"
  wagerAmount: number
  gameId: string
  propId: string
  dateProposed: string
  dateAccepted: string
  _id: string

  voided: boolean
}

interface FullPicksObject {
  [uniqueId: string]: Pick
}

interface Pick {
  uniqueId: string
  over: string | null
  under: string | null
  awayTeam: string | null
  homeTeam: string | null
}

interface PicksState {
  activeButton: string
  pickIds: string[]
  picksMade: FullPicksObject
  challenges: {
    [propId: string]: Challenge[]
  }
}

interface RemoveChallenge {
  acceptorName: string
  acceptorId: string
  challengeId: string
  propId: string
}

const initialState: PicksState = {
  activeButton: "makePicks",
  pickIds: [],
  picksMade: {},
  challenges: {}
}

const picksSlice = createSlice({
  name: "picksSlice",
  initialState,
  reducers: {
    setActiveButton: (state, action: PayloadAction<string>) => {
      state.activeButton = action.payload
    },
    setPickIds: (state, action: PayloadAction<string>) => {
      if (state.pickIds.includes(action.payload)) return

      state.pickIds = [...state.pickIds, action.payload]
    },
    setPicksMade: (state, action: PayloadAction<Pick>) => {
      const { uniqueId, awayTeam, homeTeam, over, under } = action.payload

      // check if pick was already made
      if (!state.picksMade[uniqueId]) {
        state.picksMade[uniqueId] = {
          uniqueId: uniqueId,
          over: null,
          under: null,
          awayTeam: null,
          homeTeam: null
        }
      }
      state.picksMade[uniqueId].uniqueId = uniqueId
      state.picksMade[uniqueId].over = over
      state.picksMade[uniqueId].under = under
      state.picksMade[uniqueId].awayTeam = awayTeam
      state.picksMade[uniqueId].homeTeam = homeTeam
    },
    addChallenge: (state, action: PayloadAction<Challenge>) => {
      const {
        challengerId,
        acceptorId,
        challengerName,
        acceptorName,
        challengerSelection,
        acceptorSelection,
        wagerAmount,
        gameId,
        propId,
        dateProposed,
        dateAccepted,
        _id,
        voided
      } = action.payload

      const challengeToAdd = {
        challengerId: challengerId,
        acceptorId: acceptorId,
        challengerName: challengerName,
        acceptorName: acceptorName,
        challengerSelection: challengerSelection,
        acceptorSelection: acceptorSelection,
        wagerAmount: wagerAmount,
        gameId: gameId,
        propId: propId,
        dateProposed: dateProposed,
        dateAccepted: dateAccepted,
        _id: _id,
        voided: voided
      }

      if (!state.challenges[propId]) {
        state.challenges[propId] = []
        state.challenges[propId].push(challengeToAdd)
        return
      }

      const challengeExists = state.challenges[propId].find((challenge) => {
        return challenge._id === _id
      })

      if (challengeExists) return

      state.challenges[propId].push(challengeToAdd)
    },

    // This doesn't actually remove the challenge from state, it just adds the acceptor so that the filtered challenges will update!
    removeChallenge: (state, action: PayloadAction<RemoveChallenge>) => {
      const { acceptorName, challengeId, propId, acceptorId } = action.payload

      const challengeToUpdate = state.challenges[propId].find((challenge) => {
        return challenge._id === challengeId
      })

      if (!challengeToUpdate) return

      challengeToUpdate.acceptorName = acceptorName
      challengeToUpdate.acceptorId = acceptorId
    }
  }
})

export const {
  setActiveButton,
  setPickIds,
  setPicksMade,
  addChallenge,
  removeChallenge
} = picksSlice.actions
export default picksSlice.reducer
