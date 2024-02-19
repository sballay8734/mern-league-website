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
    setProposalUnseenCount: (state, action: PayloadAction<number>) => {
      state.unseenCount = action.payload;
    },
    reduceUnseenCount: (state) => {
      if (state.unseenCount > 0) {
        state.unseenCount -= 1;
      }
    },
    addIdToSeen: (state, action: PayloadAction<AddPayload>) => {
      const { proposalId, seen } = action.payload;

      console.log(proposalId, seen);

      if (!state.seenIds.hasOwnProperty(proposalId)) {
        state.seenIds[proposalId] = seen;
      }

      state.seenIds[proposalId] = seen;
    },
  },
});

export const { setProposalUnseenCount, addIdToSeen, reduceUnseenCount } =
  proposalsSlice.actions;
export default proposalsSlice.reducer;
