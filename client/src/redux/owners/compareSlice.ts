import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Owner } from "./interfaces"
// THIS NEEDS TO BE CHANGED TO computedOwners EVENTUALLY
// ALSO, owner 1 should default to the current user if there is one
interface CompareState {
  ownerOne: null | Owner
  ownerTwo: null | Owner
}

const initialState: CompareState = {
  ownerOne: null,
  ownerTwo: null
}

const compareSlice = createSlice({
  name: "owners",
  initialState,
  reducers: {
    setOwnerOne: (state, action: PayloadAction<Owner>) => {
      state.ownerOne = action.payload
    },
    setOwnerTwo: (state, action: PayloadAction<Owner>) => {
      state.ownerTwo = action.payload
    }
  }
})

export const { setOwnerOne, setOwnerTwo } = compareSlice.actions
export default compareSlice.reducer
