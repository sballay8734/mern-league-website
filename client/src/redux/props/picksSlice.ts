import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
}

const initialState: PicksState = {
  activeButton: "makePicks",
  pickIds: [],
  picksMade: {}
}

const picksSlice = createSlice({
  name: "picksSlice",
  initialState,
  reducers: {
    setActiveButton: (state, action: PayloadAction<string>) => {
      state.activeButton = action.payload
    },
    setPickIds: (state, action: PayloadAction<string>) => {
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
    }
  }
})

export const { setActiveButton, setPickIds, setPicksMade } = picksSlice.actions
export default picksSlice.reducer
