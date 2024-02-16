import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestState {
  result: "success" | "fail" | "";
  message: string;
  showStatus: boolean;
}

const initialState: RequestState = {
  result: "",
  message: "Successfully deleted challenge!",
  showStatus: false,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setRequest: (state, action: PayloadAction<RequestState>) => {
      const { result, message, showStatus } = action.payload;

      state.result = result;
      state.message = message;
      state.showStatus = showStatus;

      // use setTimeout in the front end
    },
  },
});

export const { setRequest } = requestSlice.actions;
export default requestSlice.reducer;
