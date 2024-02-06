import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PicksState {
  activeButton: string
  picksMade: string[]
}

const initialState: PicksState = {
  activeButton: "makePicks",
  picksMade: []
}

const picksSlice = createSlice({
  name: "picksSlice",
  initialState,
  reducers: {
    setActiveButton: (state, action: PayloadAction<string>) => {
      state.activeButton = action.payload
    },
    setPicksMade: (state, action: PayloadAction<string>) => {
      state.picksMade = [...state.picksMade, action.payload]
    }
  }
})

export const { setActiveButton, setPicksMade } = picksSlice.actions
export default picksSlice.reducer
