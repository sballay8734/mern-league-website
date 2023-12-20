import { useState } from "react"

import { FaAngleDoubleRight } from "react-icons/fa"
import { FaAngleDoubleDown } from "react-icons/fa"
import { IProposal } from "../../redux/proposalsApi/proposalsApi"

interface User {
  _id: string
  email: string
  firstName: string
  lastInitial: string
  avatar: string
  preferredTheme: string
  isAdmin: boolean
  isCommissioner: boolean
}

interface ProposalWrapperProps {
  item: IProposal
  user: User
  handleProposalClick: (item: IProposal) => void
}

export default function ProposalWrapper({
  item,
  user,
  handleProposalClick
}: ProposalWrapperProps) {
  const [expandProposal, setExpandProposal] = useState<boolean>(false)

  return (
    <div className="proposal-wrapper" key={item._id}>
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
    </div>
  )
}
