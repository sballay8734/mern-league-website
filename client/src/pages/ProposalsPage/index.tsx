import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useFetchProposalsQuery } from "../../redux/proposalsApi/proposalsApi"
// import { BiUpvote, BiDownvote } from "react-icons/bi"
import ViewProposalModal from "../../components/ProposalModal"

import { FaPlus } from "react-icons/fa6"
import "./ProposalsPage.scss"
import { IProposal } from "../../redux/proposalsApi/proposalsApi"
import { useState } from "react"

// NEED CREATE PROPOSAL MODAL &&&&& VIEW PROPOSAL MODAL

export default function ProposalsPage() {
  const { user } = useSelector((state: RootState) => state.user)
  const { data } = useFetchProposalsQuery()
  const [modalIsShown, setModalIsShown] = useState<boolean>(false)
  const [proposal, setProposal] = useState<IProposal | null>(null)

  function handleProposalClick(proposal: IProposal) {
    setProposal(proposal)
    setModalIsShown(!modalIsShown)
  }

  function closeModal() {
    setModalIsShown(false)
  }

  return (
    <div className="page proposals-page">
      {user === null ? (
        <div>You must be logged in to view this page</div>
      ) : (
        <>
          <div className="proposal-page-top">
            <button className="create-proposal-btn">
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
                  <th>Status</th>
                  <th>Proposer</th>
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
                        <td className="wider">{item.title}</td>
                        <td className={item.status}>
                          {item.status.charAt(0).toLocaleUpperCase() +
                            item.status.slice(1)}
                        </td>
                        <td className="proposer">{item.userName}</td>
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
      {modalIsShown && proposal !== null && (
        <ViewProposalModal proposal={proposal} closeModal={closeModal} />
      )}
    </div>
  )
}
