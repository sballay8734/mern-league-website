import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";

import { RootState } from "../../redux/store";
import { useFetchUserImagesQuery } from "../../redux/owners/ownersApi";
import { useFetchChallengesByUserQuery } from "../../redux/props/propsApi";
import { IChallenge } from "../../types/challenges";
import { useFetchProposalsQuery } from "../../redux/proposalsApi/proposalsApi";
import {
  addIdToSeen,
  setProposalUnseenCount,
} from "../../redux/proposalsApi/proposalsSlice";
import "./HomePage.scss";

interface UseFetchChallengesResult {
  data: IChallenge[];
  refetch: () => void;
}

export default function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { unseenCount, seenIds } = useSelector(
    (state: RootState) => state.proposlasSlice,
  );

  const { data, refetch } = useFetchUserImagesQuery();

  const { data: challenges, refetch: fetchChallenges } =
    useFetchChallengesByUserQuery(user?._id ?? "");

  const { data: proposals, refetch: fetchProposals } = useFetchProposalsQuery();

  useEffect(() => {
    const proposalsUnseenCount =
      proposals && user
        ? proposals.reduce((count, proposal) => {
            if (
              proposal.status === "pending" &&
              !proposal.seen.includes(user?._id ?? "")
            ) {
              dispatch(addIdToSeen({ proposalId: proposal._id, seen: false }));
              return count + 1;
            }
            return count;
          }, 0)
        : 0;
    dispatch(setProposalUnseenCount(proposalsUnseenCount));
  }, [dispatch, proposals, user]);

  useEffect(() => {
    refetch();
  }, [user, dispatch]);

  console.log(unseenCount, seenIds);

  // ***************************************************************************
  // ***************************************************************************
  // ***************************************************************************
  // ***************************************************************************
  // NEED TO LOAD CHALLENGES AND PROPOSALS HERE SOMEHOW TO DISPLAY WIDGETS
  // THEN REMOVE ONCE THEY'VE BEEN SEEN
  // ***************************************************************************
  // ***************************************************************************
  // ***************************************************************************
  // ***************************************************************************

  return (
    <div className="page hero__image">
      {/* <div className="overlay"></div> */}
      <div className="established">EST. 2014</div>
      <div className="title-circle-wrapper">
        <div className="title-text-wrapper">
          <h1 className="hero__text absolute">
            Welcome to the Legendary League of Ex-Athletes
          </h1>
        </div>
        <div className="circle__center animate-rotate">
          {data &&
            data.map((account, index) => (
              <div
                key={account.email}
                className={`icon__wrapper icon__wrapper-${index}`}
              >
                <div className={`relative icon__${index} icon`}>
                  <img src={account.avatar} alt="profile"></img>
                  <span className="icon__name">
                    {account.firstName} {account.lastInitial}.
                  </span>
                </div>
                <div className="icon__pole"></div>
              </div>
            ))}
        </div>
      </div>
      {user !== null ? (
        <div className="greeting">
          <span className="welcome">Welcome</span>{" "}
          <span className="name">{user.firstName}!</span>{" "}
          {/* <span className="insult">Ya bitchhhhh</span> */}
        </div>
      ) : (
        <div className="auth-buttons">
          <Link className="signin" to="/signin">
            Sign In
          </Link>
          <Link className="signup" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
