import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useFetchProposalsQuery } from "../../redux/proposalsApi/proposalsApi"
// import { BiUpvote, BiDownvote } from "react-icons/bi"
import ViewProposalModal from "../../components/ViewProposalModal"
import CreateProposalModal from "../../components/CreateProposalModal"

import { FaPlus } from "react-icons/fa6"
import { IProposal } from "../../redux/proposalsApi/proposalsApi"
import { useEffect, useState } from "react"
import "./ProposalsPage.scss"

// NEED CREATE PROPOSAL MODAL &&&&& VIEW PROPOSAL MODAL

export default function ProposalsPage() {
  const { user } = useSelector((state: RootState) => state.user)
  const { refetch, data } = useFetchProposalsQuery()
  const [viewModalIsShown, setViewModalIsShown] = useState<boolean>(false)
  const [createModalIsShown, setCreateModalIsShown] = useState<boolean>(false)
  const [proposal, setProposal] = useState<IProposal | null>(null)
  const [activeButton, setActiveButton] = useState<string>("pending")

  useEffect(() => {
    refetch()
  }, [refetch])

  function handleShowCreateProposal() {
    setCreateModalIsShown(true)
  }

  function handleProposalClick(proposal: IProposal) {
    setProposal(proposal)
    setViewModalIsShown(!viewModalIsShown)
  }

  function closeModal() {
    setViewModalIsShown(false)
    setCreateModalIsShown(false)
  }

  let filteredProposals
  if (data) {
    filteredProposals = data.filter((item) => item.status === activeButton)
  }

  return (
    <div className="page proposals-page">
      {user === null ? (
        <div>You must be logged in to view this page</div>
      ) : (
        <>
          <div className="proposal-page-top">
            <div className="proposals-header">
              <h1>Proposals</h1>
              <button
                onClick={handleShowCreateProposal}
                className="create-proposal-btn"
              >
                Create new proposal{" "}
                {
                  <span>
                    <FaPlus />
                  </span>
                }
              </button>
            </div>
            <nav className="proposals-nav">
              <ul>
                <li>
                  <button
                    className={`${activeButton === "rejected" ? "active" : ""}`}
                    onClick={() => setActiveButton("rejected")}
                  >
                    Rejected
                  </button>
                </li>
                <li className="spacer"></li>
                <li>
                  <button
                    className={`${activeButton === "pending" ? "active" : ""}`}
                    onClick={() => setActiveButton("pending")}
                  >
                    Pending
                  </button>
                </li>
                <li className="spacer"></li>
                <li>
                  <button
                    className={`${activeButton === "approved" ? "active" : ""}`}
                    onClick={() => setActiveButton("approved")}
                  >
                    Approved
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="table-section-wrapper">
            {filteredProposals && filteredProposals.length > 0 ? (
              <div className="table-wrapper disable-scrollbars">
                <table className="proposals-table disable-scrollbars">
                  <thead>
                    <tr>
                      <th className="wider">Proposal</th>
                      <th className="date header">Date Proposed</th>
                      <th className="vote-tally"># of Votes</th>
                      <th className="center-text">Proposer</th>
                      <th className="center-text">Status</th>
                      <th className="center-text">Your Vote</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProposals &&
                      filteredProposals.map((item) => {
                        return (
                          <tr
                            onClick={() => handleProposalClick(item)}
                            key={item._id}
                            className="row"
                          >
                            <td className="wider cell">
                              {item.title.length < 25
                                ? item.title
                                : item.title.slice(0, 23) + "..."}
                            </td>
                            <td className="date cell">{item.dateProposed}</td>
                            <td className="vote-tally cell">
                              {item.voteInfo.upVotes + item.voteInfo.downVotes}{" "}
                              / 12
                            </td>
                            <td
                              className={`proposer cell ${
                                item.userId === user._id && "color"
                              }`}
                            >
                              {item.userId === user._id ? "You" : item.userName}
                            </td>
                            <td className={`${item.status} cell`}>
                              {item.commishVeto === true
                                ? "Rejected"
                                : item.commishVeto === false
                                ? "Approved"
                                : item.status.charAt(0).toLocaleUpperCase() +
                                  item.status.slice(1)}
                            </td>
                            <td
                              className={`your-vote cell ${
                                item.upVoters.includes(user._id)
                                  ? "approved"
                                  : item.downVoters.includes(user._id)
                                  ? "rejected"
                                  : "none"
                              }`}
                            >
                              {item.upVoters.includes(user._id)
                                ? "Approve"
                                : item.downVoters.includes(user._id)
                                ? "Reject"
                                : "None"}
                            </td>
                          </tr>
                        )
                      })}
                    <tr className="row-spacer">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={6} className="footer-cell"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="no-content">No Content</div>
            )}
          </div>
        </>
      )}
      {viewModalIsShown && proposal !== null && (
        <ViewProposalModal
          proposal={proposal}
          closeModal={closeModal}
          refetch={refetch}
        />
      )}
      {createModalIsShown && (
        <CreateProposalModal closeModal={closeModal} refetch={refetch} />
      )}
    </div>
  )
}

// BUGS ********************
// 1. Row spacer screws up layout when there are more than 5 columns
// 2.
