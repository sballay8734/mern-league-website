import { useState } from "react";

import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";
import { IProposal } from "../../redux/proposalsApi/proposalsApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  addIdToSeen,
  reduceUnseenCount,
} from "../../redux/proposalsApi/proposalsSlice";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastInitial: string;
  avatar: string;
  preferredTheme: string;
  isAdmin: boolean;
  isCommissioner: boolean;
}

interface ProposalWrapperProps {
  item: IProposal;
  user: User;
  handleProposalClick: (item: IProposal) => void;
}

export default function ProposalWrapper({
  item,
  user,
  handleProposalClick,
}: ProposalWrapperProps) {
  const dispatch = useDispatch();
  const [expandProposal, setExpandProposal] = useState<boolean>(false);

  const thisProposalSeenStatus = useSelector(
    (state: RootState) => state.proposlasSlice.seenIds[item._id],
  );

  function handleSetSeenTrue() {
    // need to update state && send DB request

    // *********************************************************
    // *********************************************************
    // *********************************************************
    // *********************************************************
    // update State (THIS IS NOT QUITE RIGHT - IT IS DOING THIS ON EVERY CLICK WHEN IT SHOULD REALLY ONLY DO IT ONCE!!!)
    // *********************************************************
    // *********************************************************
    // *********************************************************
    // *********************************************************

    dispatch(addIdToSeen({ proposalId: item._id, seen: true }));
    dispatch(reduceUnseenCount());
  }

  return (
    <div
      onClick={handleSetSeenTrue}
      className="proposal-wrapper relative"
      key={item._id}
    >
      <div
        onClick={() => setExpandProposal(!expandProposal)}
        className="proposal-header"
      >
        <div className="proposal-header-left-wrapper">
          <button className="expand-btn">
            {expandProposal ? <FaAngleDoubleDown /> : <FaAngleDoubleRight />}
          </button>
          <h2>
            Re: <span className="proposal-title">{item.title}</span>
          </h2>
        </div>
        <h2 className="you-voted">
          {item.downVoters.includes(user._id) ? (
            <span className="reject">You rejected this</span>
          ) : item.upVoters.includes(user._id) ? (
            <span className="approve">You approved this</span>
          ) : (
            <span className="no-vote">You did not vote</span>
          )}
        </h2>
      </div>
      <div
        className={`proposal-body ${expandProposal ? "expanded" : ""}`}
        onClick={() => handleProposalClick(item)}
      >
        <div className="proposal-body-main">
          <p>
            Proposal: <span className="proposal-content">{item.content}</span>
          </p>
        </div>
        {/* Footer needs to have status, your vote, total voted */}
        <div className="proposal-body-footer">
          <h2 className="proposed-by">
            Proposed by: <span className="proposer-name">{item.userName}.</span>
          </h2>
          <h2 className={`status ${item.status}`}>
            {item.status.charAt(0).toLocaleUpperCase() + item.status.slice(1)}{" "}
            {item.status !== "pending" ? "by KJD" : ""}
          </h2>
          <h2 className="total-voted">
            Total Votes:{" "}
            <span>{item.upVoters.length + item.downVoters.length}/12</span>
          </h2>
        </div>
      </div>
      {thisProposalSeenStatus === false && (
        <div className="absolute right-1 top-1 h-1 w-1 rounded-full bg-red-500 text-red-500"></div>
      )}
    </div>
  );
}
