import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Challenge } from "../../components/PicksPageComps/types"

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
    [challengeId: string]: Challenge
  }
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
    setChallenge: (state, action: PayloadAction<Challenge>) => {
      const {
        challengerName,
        acceptorName,
        challengerSelection,
        acceptorSelection,
        wagerAmount,
        _id
      } = action.payload
      const { void: voided } = action.payload

      if (!state.challenges[_id]) {
        state.challenges[_id] = {
          challengerName: challengerName,
          acceptorName: acceptorName,
          challengerSelection: challengerSelection,
          acceptorSelection: acceptorSelection,
          wagerAmount: wagerAmount,
          _id: _id,
          void: voided
        }
      }
      state.challenges[_id]._id = _id
      state.challenges[_id].challengerName = challengerName
      state.challenges[_id].acceptorName = acceptorName
      state.challenges[_id].challengerSelection = challengerSelection
      state.challenges[_id].acceptorSelection = acceptorSelection
      state.challenges[_id].wagerAmount = wagerAmount
      state.challenges[_id].void = voided
    }
  }
})

export const { setActiveButton, setPickIds, setPicksMade, setChallenge } =
  picksSlice.actions
export default picksSlice.reducer
