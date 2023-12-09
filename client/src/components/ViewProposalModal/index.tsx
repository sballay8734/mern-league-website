import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { IProposal } from "../../redux/proposalsApi/proposalsApi"
import { RootState } from "../../redux/store"
import { FaCheck } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import "./ProposalModal.scss"

interface ViewProposalModalProps {
  proposal: IProposal
  closeModal: () => void
  refetch: () => void
}

export default function ViewProposalModal({
  proposal,
  closeModal,
  refetch
}: ViewProposalModalProps) {
  const { user } = useSelector((state: RootState) => state.user)
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [updatedProposal, setUpdatedProposal] = useState<IProposal>(proposal)

  useEffect(() => {}, [updatedProposal])

  async function handleApproveClick() {
    setLoading(true)
    try {
      const res = await fetch(`/api/posts/proposals/${proposal._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ action: "upvote" })
      })

      const data = await res.json()

      if (data.success === false) {
        setError("Action failed")
        setLoading(false)
        return
      }

      setUpdatedProposal(data)
      // show success
      // close modal
      setLoading(false)
      refetch()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  async function handleRejectClick() {
    setLoading(true)
    try {
      const res = await fetch(`/api/posts/proposals/${proposal._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ action: "downvote" })
      })

      const data = await res.json()

      if (data.success === false) {
        setError("Action failed")
        setLoading(false)
        return
      }

      setUpdatedProposal(data)
      // show success
      // close modal
      refetch()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // onClick () => Are you sure you want to vote to approve this rule? => Then fetch the api

  const children = (
    <div
      className={`proposal-modal-wrapper modal ${user && user?.preferredTheme}`}
    >
      <div className="modal-content">
        <div className="modal-top">
          <div className="top-left">
            <p className="date-submitted">
              Date Submitted: <span>{updatedProposal.dateProposed}</span>
            </p>
            <p className="status">
              Status:{" "}
              <span>
                {updatedProposal.status.charAt(0).toLocaleUpperCase() +
                  updatedProposal.status.slice(1)}
              </span>
            </p>
            <p className="votes">
              Votes:{" "}
              <span>
                {updatedProposal.voteInfo.upVotes +
                  updatedProposal.voteInfo.downVotes}
                /12
              </span>
            </p>
            <p className="proposer">
              Proposed by: <span>{updatedProposal.userName}</span>
            </p>
          </div>
          <div className="top-right">
            <button onClick={closeModal}>close</button>
          </div>
        </div>
        <div className="modal-middle">
          <div>
            <p className="header">Title</p>
            <h1>{updatedProposal.title}</h1>
          </div>
          <div>
            <p className="header">Details</p>
            <p>{updatedProposal.content}</p>
          </div>
        </div>
        <div className="modal-vote">
          <button
            disabled={loading}
            onClick={handleRejectClick}
            className={`reject ${
              user && updatedProposal.downVoters.includes(user._id)
                ? "disable"
                : ""
            }`}
          >
            {user && updatedProposal.downVoters.includes(user._id)
              ? "You Rejected This"
              : "Vote to Reject"}
            <span>
              <IoClose />
            </span>
          </button>
          <button
            disabled={loading}
            onClick={handleApproveClick}
            className={`approve ${
              user && updatedProposal.upVoters.includes(user._id)
                ? "disable"
                : ""
            }`}
          >
            {user && updatedProposal.upVoters.includes(user._id)
              ? "You Approved This"
              : "Vote to Approve"}
            <span>
              <FaCheck />
            </span>
          </button>
        </div>
        {error && <div>{error}</div>}
      </div>
      <div onClick={closeModal} className="modal-background"></div>
    </div>
  )
  const portalRoot = document.getElementById("modal-container")!

  return createPortal(children, portalRoot)
}
