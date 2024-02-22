import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const baseString = "Are you sure you want to ";

// TODO: propId and itemId are temporary. System needs a full refactor. This modal should only take a message and showModal as props

interface ConfirmRequestState {
  message: string;
  showModal: boolean;
  itemId: string;
  propId: string;
}

interface PayloadProps {
  modalAction: "show" | "hide";
  message: string;
  itemId: string;
  propId: string;
}

const initialState: ConfirmRequestState = {
  message: "",
  showModal: false,
  itemId: "",
  propId: "",
};

const confirmRequestSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    setShowModal: (state, action: PayloadAction<PayloadProps>) => {
      const { modalAction, message, itemId, propId } = action.payload;
      if (modalAction === "show") {
        state.message = message;
        state.showModal = true;
        state.itemId = itemId;
        state.propId = propId;
      } else if (modalAction === "hide") {
        (state.message = ""),
          (state.showModal = false),
          (state.itemId = ""),
          (state.propId = "");
      } else {
        console.log("SOMETHING WENT WRONG");
      }
    },
  },
});

export const { setShowModal } = confirmRequestSlice.actions;
export default confirmRequestSlice.reducer;
