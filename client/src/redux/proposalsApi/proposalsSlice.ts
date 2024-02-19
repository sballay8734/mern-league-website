import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddPayload {
  proposalId: string;
  seen: boolean;
}

interface seenObject {
  [proposalId: string]: boolean;
}

interface ProposalsState {
  unseenCount: number;
  seenIds: seenObject;
}

const initialState: ProposalsState = {
  unseenCount: 0,
  seenIds: {},
};

const proposalsSlice = createSlice({
  name: "proposalsSlice",
  initialState,
  reducers: {
    setInitialUnseenCount: (state, action: PayloadAction<number>) => {
      state.unseenCount = action.payload;
    },
    // separate reducer to handle showing notifications
    setProposalUnseenCount: (state, action: PayloadAction<string>) => {
      // it should always exist I THINK so no need to test for undefined
      if (state.seenIds[action.payload] === false) {
        state.seenIds[action.payload] = true;
        state.unseenCount--;
      }
    },
    addIdToSeen: (state, action: PayloadAction<AddPayload>) => {
      const { proposalId, seen } = action.payload;

      if (!state.seenIds.hasOwnProperty(proposalId)) {
        state.seenIds[proposalId] = seen;
        return;
      } else if (state.seenIds[proposalId] === false) {
        state.seenIds[proposalId] = seen;
      }
    },
  },
});

export const { setProposalUnseenCount, setInitialUnseenCount, addIdToSeen } =
  proposalsSlice.actions;
export default proposalsSlice.reducer;
