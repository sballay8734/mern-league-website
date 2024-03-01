import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useFetchProposalsQuery } from "../../redux/proposalsApi/proposalsApi";
// import { BiUpvote, BiDownvote } from "react-icons/bi"
import ViewProposalModal from "../../components/ViewProposalModal";
import CreateProposalModal from "../../components/CreateProposalModal";
import { Link } from "react-router-dom";

import { FaPlus } from "react-icons/fa6";
import { IProposal } from "../../redux/proposalsApi/proposalsApi";

import { useEffect, useState } from "react";
import "./ProposalsPage.scss";
import ProposalWrapper from "../../components/ProposalWrapper/ProposalWrapper";
import { handleShowRequestModal } from "../../components/utils";

// NEED CREATE PROPOSAL MODAL &&&&& VIEW PROPOSAL MODAL

export default function ProposalsPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { refetch, data } = useFetchProposalsQuery();
  const [viewModalIsShown, setViewModalIsShown] = useState<boolean>(false);
  const [createModalIsShown, setCreateModalIsShown] = useState<boolean>(false);
  const [proposal, setProposal] = useState<IProposal | null>(null);
  const [activeButton, setActiveButton] = useState<string>("pending");

  useEffect(() => {
    if (user?.isGuest) {
      handleShowRequestModal(dispatch, {
        result: "warning",
        message: "Non-members have limited permissions!",
      });
    }
    refetch();
  }, [refetch, user]);

  function handleShowCreateProposal() {
    setCreateModalIsShown(true);
  }

  function handleProposalClick(proposal: IProposal) {
    setProposal(proposal);
    setViewModalIsShown(!viewModalIsShown);
  }

  function closeModal() {
    setViewModalIsShown(false);
    setCreateModalIsShown(false);
  }

  let filteredProposals;
  if (data) {
    filteredProposals = data.filter((item) => item.status === activeButton);
  }

  let shownProposals;
  if (user?.isGuest) {
    shownProposals = filteredProposals;
  } else if (!user?.isGuest) {
    shownProposals =
      filteredProposals &&
      filteredProposals.filter((proposal) => {
        return proposal.guestCreated === false;
      });
  }

  return (
    <div className="page proposals-page">
      {user === null ? (
        <div className="picks-section-unauth">
          You must be signed in to view this page
          <Link to={"/signin"}>Sign in</Link>
        </div>
      ) : (
        <>
          <div className="proposal-page-top">
            <div className="proposals-header">
              <h1>Proposals</h1>
              <p className="instructions">
                To <span className="voteText">vote</span>, expand the proposal
                and click the description!
              </p>
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
          <div className="proposals-page-bottom disable-scrollbars">
            {shownProposals && shownProposals.length > 0 ? (
              shownProposals.map((item) => {
                return (
                  <ProposalWrapper
                    key={item._id}
                    item={item}
                    user={user}
                    handleProposalClick={handleProposalClick}
                  />
                );
              })
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
  );
}

// BUGS ********************
// 1. Row spacer screws up layout when there are more than 5 columns
// 2.
