import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StaticOwner } from "../../types/StaticOwner"
// THIS NEEDS TO BE CHANGED TO computedOwners EVENTUALLY
// ALSO, owner 1 should default to the current user if there is one
interface CompareState {
  ownerOne: null | StaticOwner
  ownerTwo: null | StaticOwner
  activeTimeFrame: string
  activeFilter: string
  activeYear: string
}

const initialState: CompareState = {
  ownerOne: null,
  ownerTwo: null,
  activeTimeFrame: "h2h",
  activeFilter: "regszn",

  // use util function for below (don't hardcode year)
  activeYear: "2023"
}

const compareSlice = createSlice({
  name: "owners",
  initialState,
  reducers: {
    setOwnerOne: (state, action: PayloadAction<StaticOwner>) => {
      state.ownerOne = action.payload
    },
    setOwnerTwo: (state, action: PayloadAction<StaticOwner>) => {
      state.ownerTwo = action.payload
    },
    setActiveTimeFrame: (state, action: PayloadAction<string>) => {
      state.activeTimeFrame = action.payload
    },
    setActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload
    },
    setActiveYear: (state, action: PayloadAction<string>) => {
      state.activeYear = action.payload
    }
  }
})

export const {
  setOwnerOne,
  setOwnerTwo,
  setActiveTimeFrame,
  setActiveFilter,
  setActiveYear
} = compareSlice.actions
export default compareSlice.reducer
