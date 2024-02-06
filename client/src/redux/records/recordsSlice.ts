import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FullRecordObject } from "../../pages/RecordsPage/types"

interface RecordsState {
  activeButton: string
  records: FullRecordObject | null
  recordKeys: string[]
}

const initialState: RecordsState = {
  activeButton: "allTime",
  records: null,
  recordKeys: []
}

const recordsSlice = createSlice({
  name: "recordsSlice",
  initialState,
  reducers: {
    setActiveButton: (state, action: PayloadAction<string>) => {
      state.activeButton = action.payload
    },
    setRecords: (state, action: PayloadAction<FullRecordObject>) => {
      state.records = action.payload
    },
    setRecordKeys: (state, action: PayloadAction<string[]>) => {
      state.recordKeys = action.payload
    }
  }
})

export const { setActiveButton, setRecords, setRecordKeys } =
  recordsSlice.actions
export default recordsSlice.reducer
