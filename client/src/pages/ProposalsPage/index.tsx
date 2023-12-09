import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useFetchProposalsQuery } from "../../redux/proposalsApi/proposalsApi"
// import { BiUpvote, BiDownvote } from "react-icons/bi"
import ViewProposalModal from "../../components/ViewProposalModal"
import CreateProposalModal from "../../components/CreateProposalModal"

import { FaPlus } from "react-icons/fa6"
import "./ProposalsPage.scss"
import { IProposal } from "../../redux/proposalsApi/proposalsApi"
import { useEffect, useState } from "react"

// NEED CREATE PROPOSAL MODAL &&&&& VIEW PROPOSAL MODAL

export default function ProposalsPage() {
  const { user } = useSelector((state: RootState) => state.user)
  const { refetch, data } = useFetchProposalsQuery()
  const [viewModalIsShown, setViewModalIsShown] = useState<boolean>(false)
  const [createModalIsShown, setCreateModalIsShown] = useState<boolean>(false)
  const [proposal, setProposal] = useState<IProposal | null>(null)

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

  return (
    <div className="page proposals-page">
      {user === null ? (
        <div>You must be logged in to view this page</div>
      ) : (
        <>
          <div className="proposal-page-top">
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
            <p className="instructions">
              Click on proposal to view more details and vote
            </p>
          </div>
          <div className="table-section-wrapper">
            <table className="proposals-table">
              <thead>
                <tr>
                  <th className="wider">Proposal</th>
                  <th className="center-text">Status</th>
                  <th className="center-text">Proposer</th>
                  <th className="center-text">Your Vote</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item) => {
                    return (
                      <tr
                        onClick={() => handleProposalClick(item)}
                        key={item._id}
                        className="row"
                      >
                        <td className="wider">
                          {item.title.length < 25
                            ? item.title
                            : item.title.slice(0, 23) + "..."}
                        </td>
                        <td className={item.status}>
                          {item.status.charAt(0).toLocaleUpperCase() +
                            item.status.slice(1)}
                        </td>
                        <td
                          className={`proposer ${
                            item.userId === user._id && "color"
                          }`}
                        >
                          {item.userId === user._id ? "You" : item.userName}
                        </td>
                        <td
                          className={`your-vote ${
                            item.upVoters.includes(user._id)
                              ? "approved"
                              : item.downVoters.includes(user._id)
                              ? "rejected"
                              : "none"
                          }`}
                        >
                          {item.upVoters.includes(user._id)
                            ? "Approved"
                            : item.downVoters.includes(user._id)
                            ? "Rejected"
                            : "None"}
                        </td>
                        {/* <td className="vote">
                          <span>
                            <BiUpvote />
                          </span>
                          <span>
                            <BiDownvote />
                          </span>
                        </td> */}
                      </tr>
                    )
                  })}
              </tbody>
            </table>
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
