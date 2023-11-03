// NOT SURE *******************************************************
// get records (this is async so might go in api)

// FOR SURE *******************************************************
// filter records

import { createSlice } from "@reduxjs/toolkit"

interface Record {
  name: string
  displayName: string
  description: string
  value: number
  holder: string
  year: number
  wasPlayoffs: boolean
}

interface RecordsState {
  records: Record[]
}

const initialState: RecordsState = {
  records: []
}

const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {}
})

export default recordsSlice.reducer
