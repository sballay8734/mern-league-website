import { useState } from "react";

import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";
import { IProposal } from "../../redux/proposalsApi/proposalsApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setProposalUnseenCount } from "../../redux/proposalsApi/proposalsSlice";
import { setRequestResponse } from "../../redux/requests/requestSlice";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastInitial: string;
  avatar: string;
  preferredTheme: string;
  isAdmin: boolean;
  isCommissioner: boolean;
  isGuest: boolean;
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

  async function handleSetSeenTrue() {
    if (thisProposalSeenStatus === true) return;

    try {
      const res = await fetch(`/api/posts/proposals/${item._id}/seen`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      console.log(data);

      if (!data) {
        throw new Error("No data in response!");
      }

      const { message, result } = data;

      //TODO: Temporary fix (see postsController)
      if (result === "temp") return;

      dispatch(
        setRequestResponse({
          message: message,
          result: result,
          showStatus: true,
        }),
      );

      setTimeout(() => {
        dispatch(
          setRequestResponse({
            message: message,
            result: "",
            showStatus: false,
          }),
        );
      }, 2000);
    } catch (error) {
      console.log(error);
    }
    // IF userID is already in seen list, DO NOT FETCH
    // fetch proposal and add name to list

    // if it is successful, THEN dispatch below
    dispatch(setProposalUnseenCount(item._id));
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
          {item.downVoters.includes(user._id) ||
          item.guestDownVoters.includes(user._id) ? (
            <span className="reject">You rejected this</span>
          ) : item.upVoters.includes(user._id) ||
            item.guestUpVoters.includes(user._id) ? (
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
