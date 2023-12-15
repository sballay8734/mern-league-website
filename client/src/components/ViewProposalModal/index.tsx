import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { IProposal } from "../../redux/proposalsApi/proposalsApi"
import { RootState } from "../../redux/store"
import { FaCheck } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { AiOutlineCloseSquare } from "react-icons/ai"
import { FaAngleDoubleDown } from "react-icons/fa"
import { FaAngleDoubleUp } from "react-icons/fa"
import { FaEdit } from "react-icons/fa"

import "./ProposalModal.scss"

interface ViewProposalModalProps {
  proposal: IProposal
  closeModal: () => void
  refetch: () => void
}

interface FormData {
  title: string
  content: string
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
  const [verifyVeto, setVerifyVeto] = useState<boolean>(false)
  const [commishStatus, setCommishStatus] = useState<null | string>(null)
  const [showActions, setShowActions] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    title: updatedProposal.title || "",
    content: updatedProposal.content || ""
  })

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

  function handleCommishVeto(status: string) {
    setVerifyVeto(!verifyVeto)
    setCommishStatus(status)
  }

  async function handleCommishOverride() {
    if (user && user.isCommissioner === false) {
      setError("Only the commissioner can do that!")
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`/api/posts/proposals/${proposal._id}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ action: commishStatus })
      })

      const data = await res.json()

      if (data.success === false) {
        setError("Action Failed")
        return
      }
      // show success
      // close modal
      setUpdatedProposal(data)
      refetch()
      setLoading(false)
      closeModal()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        console.log(error)
      }
      setLoading(false)
    }
  }

  function handleShowCommishActions() {
    setShowActions(!showActions)
  }

  async function handleProposalReset() {
    if (!user || user.isAdmin === false) {
      setError("Only and Admin can do that!")
      return
    }

    try {
      const res = await fetch(`/api/posts/proposals/${proposal._id}/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json()

      if (data.success === false) {
        setError("Error resetting proposal")
      }

      // show success
      // close modal
      setUpdatedProposal(data)
      refetch()
      setLoading(false)
      closeModal()
    } catch (error) {
      if (error instanceof Error) {
        setError("Something went wrong")
      }
    }
  }

  function toggleEditMode() {
    setEditMode(!editMode)
    setError(null)
  }

  async function handleEditRequest() {
    if (proposal.commishVeto === true || proposal.commishVeto === false) {
      setError(
        "Sorry but our fearless leader has already sealed this proposals fate"
      )
      return
    }

    try {
      const res = await fetch(`/api/posts/proposals/${proposal._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content
        })
      })

      const data = await res.json()

      if (data.success === false) {
        setError("Something went wrong")
        return
      }
      setUpdatedProposal(data)
      // show success
      // close modal
      setEditMode(false)
      refetch()
      setError(null)
      setLoading(false)
    } catch (error) {
      if (error instanceof Error) {
        setError("Could not update proposal")
      }
    }
  }

  function handleEditCancel() {
    setEditMode(false)
    setFormData({
      ...formData,
      title: updatedProposal.title,
      content: updatedProposal.content
    })
    setError(null)
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  console.log(formData)

  const children = (
    <div
      className={`proposal-modal-wrapper modal ${user && user?.preferredTheme}`}
    >
      <div className="modal-content">
        <div className="modal-top">
          <div className="top-left">
            <p className="date-submitted">
              Date Submitted:{" "}
              <span className="info">{updatedProposal.dateProposed}</span>
            </p>
            <p className="status">
              Status:{" "}
              <span className={`info ${updatedProposal.status}`}>
                {updatedProposal.commishVeto === true
                  ? "Rejected by KJD"
                  : updatedProposal.commishVeto === false
                  ? "Approved by KJD"
                  : updatedProposal.status.charAt(0).toLocaleUpperCase() +
                    updatedProposal.status.slice(1)}
              </span>
            </p>
            <p className="votes">
              Votes:{" "}
              <span className="info">
                {updatedProposal.voteInfo.upVotes +
                  updatedProposal.voteInfo.downVotes}
                /12
              </span>
            </p>
            <p className="proposer">
              Proposed by:{" "}
              <span className="info">{updatedProposal.userName}</span>
            </p>
          </div>
          {/* {user && user.isAdmin && updatedProposal.commishVeto !== null && (
            <div className="top-middle">
              <button onClick={handleProposalReset}>Reset</button>
            </div>
          )} */}
          <div className="top-right">
            <div className="close-and-reset">
              {user && user.isAdmin && updatedProposal.commishVeto !== null && (
                <button className="reset" onClick={handleProposalReset}>
                  Reset
                </button>
              )}
              <button className="close" onMouseUp={closeModal}>
                <AiOutlineCloseSquare />
              </button>
            </div>
            {user && user._id === updatedProposal.userId && (
              <div>
                {editMode === false ? (
                  <button onClick={toggleEditMode} className="edit">
                    Edit Proposal
                    <span className="edit-icon">
                      <FaEdit />
                    </span>
                  </button>
                ) : (
                  <div className="edit-confirm">
                    <button onClick={handleEditRequest} className="edit-save">
                      Save Changes
                    </button>
                    <button onClick={handleEditCancel} className="edit-cancel">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="modal-middle">
          <div className={`title-wrapper ${editMode ? "hide" : ""}`}>
            {editMode === false ? (
              <h1>{updatedProposal.title}</h1>
            ) : (
              <h1>
                <input
                  className="edit-title-input"
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  maxLength={35}
                  minLength={5}
                />
              </h1>
            )}
          </div>
          <div className={`details-wrapper ${editMode ? "hide" : ""}`}>
            {editMode === false ? (
              <p>
                <span className="details-prefix">Proposal: </span>
                {updatedProposal.content}
              </p>
            ) : (
              <p className="edit-content-input">
                <textarea
                  className="edit-title-input"
                  id="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  maxLength={350}
                  rows={6}
                />
              </p>
            )}
            {user && user.isCommissioner && editMode === false ? (
              <span className="vote-tally">
                For:{" "}
                <span className="for-votes">
                  {updatedProposal.upVoters.length}
                </span>{" "}
                | Against:{" "}
                <span className="against-votes">
                  {updatedProposal.downVoters.length}
                </span>
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="modal-vote">
          {updatedProposal.commishVeto === true ? (
            <div className="commish-override-message-reject">
              Our fearless leader has rejected this proposal
            </div>
          ) : updatedProposal.commishVeto === false ? (
            <div className="commish-override-message-approve">
              Our fearless leader has approved this proposal
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
        {verifyVeto ? (
          <div className={`override-verify`}>
            <p className="question">
              Are you sure you want to {commishStatus?.toLocaleUpperCase()}?
            </p>
            <div className="override-verify-buttons">
              <button onClick={handleCommishOverride} className="confirm-veto">
                YES {commishStatus && commishStatus?.toLocaleUpperCase()}
              </button>
              <button
                onClick={() => setVerifyVeto(false)}
                className="deny-veto"
              >
                NO
              </button>
            </div>
          </div>
        ) : (
          user &&
          user.isCommissioner && (
            <div className={`commish-content-wrapper`}>
              <button
                onClick={handleShowCommishActions}
                className={`content-toggle`}
              >
                Commissioner Actions{" "}
                <span>
                  {showActions ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
                </span>
              </button>
              <div className={`commish-content ${showActions ? "show" : ""}`}>
                <div className="commish-buttons">
                  <button
                    onClick={() => handleCommishVeto("reject")}
                    className={`commish-override-veto`}
                  >
                    KJD VETO
                  </button>
                  <button
                    onClick={() => handleCommishVeto("approve")}
                    className={`commish-override-approve`}
                  >
                    KJD APPROVE
                  </button>
                </div>
              </div>
            </div>
          )
        )}
        {error && <div className="error">{error}</div>}
      </div>
      <div onClick={closeModal} className="modal-background"></div>
    </div>
  )
  const portalRoot = document.getElementById("modal-container")!

  return createPortal(children, portalRoot)
}
