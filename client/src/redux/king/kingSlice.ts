import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getCurrentYear } from "../../pages/KothPage/helpers"

interface KingState {
  activeButton: string | null
  showStandings: boolean
  currentYear: string
}

const initialState: KingState = {
  activeButton: "standings",
  showStandings: false,
  currentYear: getCurrentYear()
}

const kingSlice = createSlice({
  name: "kingSlice",
  initialState,
  reducers: {
    setActiveButton: (state, action: PayloadAction<string>) => {
      state.activeButton = action.payload
    },
    setShowStandings: (state, action: PayloadAction<boolean>) => {
      state.showStandings = action.payload
    },
    setCurrentYear: (state, action: PayloadAction<string>) => {
      state.currentYear = action.payload
    }
  }
})

export const { setActiveButton, setShowStandings, setCurrentYear } =
  kingSlice.actions

export default kingSlice.reducer
