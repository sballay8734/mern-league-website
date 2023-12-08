import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { FaCheck } from "react-icons/fa"
import { IoClose } from "react-icons/io5"

import "./ProposalModal.scss"

import { IProposal } from "../../redux/proposalsApi/proposalsApi"

interface ViewProposalModalProps {
  proposal: IProposal
  closeModal: () => void
}

export default function ViewProposalModal({
  proposal,
  closeModal
}: ViewProposalModalProps) {
  const { user } = useSelector((state: RootState) => state.user)

  // onClick () => Are you sure you want to vote to approve this rule? => Then fetch the api

  const children = (
    <div className="proposal-modal-wrapper">
      <div className="modal-content">
        <div className="modal-top">
          <div className="top-left">
            <p>Date Submitted: {proposal.yearProposed}</p>
            <p>Status: {proposal.status}</p>
            <p>
              Votes: {proposal.voteInfo.upVotes + proposal.voteInfo.downVotes} /
              12
            </p>
          </div>
          <div className="top-right">
            <p>Proposer: {proposal.userName}</p>
          </div>
        </div>
        <div className="modal-middle">
          <div>
            <label htmlFor="">Title</label>
            <h1>{proposal.title}</h1>
          </div>
          <div>
            <label htmlFor="">Details</label>
            <p>{proposal.content}</p>
          </div>
        </div>
        <div className="modal-vote">
          <button className="reject">
            Vote to Reject{" "}
            <span>
              <IoClose />
            </span>
          </button>
          <button className="approve">
            Vote to Approve{" "}
            <span>
              <FaCheck />
            </span>
          </button>
        </div>
      </div>
      <div onClick={closeModal} className="modal-background"></div>
    </div>
  )
  const portalRoot = document.getElementById("modal-container")!

  return createPortal(children, portalRoot)
}
