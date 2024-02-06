import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getCurrentYear } from "../../pages/KothPage/helpers"

const currentYear = getCurrentYear()

interface KingState {
  activeButton: string | null
  showStandings: boolean
  activeYear: string
}

const initialState: KingState = {
  activeButton: "standings",
  showStandings: false,
  activeYear: currentYear
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
    setActiveYear: (state, action: PayloadAction<string>) => {
      state.activeYear = action.payload
    }
  }
})

export const { setActiveButton, setShowStandings, setActiveYear } =
  kingSlice.actions

export default kingSlice.reducer
