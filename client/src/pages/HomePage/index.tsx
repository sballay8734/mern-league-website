import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { RootState } from "../../redux/store";
import { useFetchUserImagesQuery } from "../../redux/owners/ownersApi";
import { useFetchUnsubmittedPropCountQuery } from "../../redux/props/propsApi";
import { useFetchProposalsQuery } from "../../redux/proposalsApi/proposalsApi";
import {
  addIdToSeen,
  setInitialUnseenCount,
} from "../../redux/proposalsApi/proposalsSlice";
import "./HomePage.scss";

export default function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const { data, refetch: refetchImages } = useFetchUserImagesQuery();
  const { data: proposals } = useFetchProposalsQuery();
  const { data: propCount, refetch: refetchPropCount } =
    useFetchUnsubmittedPropCountQuery();

  // handle intitialization of push notifications for proposals
  useEffect(() => {
    const proposalsUnseenCount =
      proposals && user
        ? proposals.reduce((count, proposal) => {
            if (proposal.guestCreated === true) return count;
            // if status is pending && user has not seen proposal
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
    dispatch(setInitialUnseenCount(proposalsUnseenCount));
  }, [dispatch, proposals, user]);

  // handle initialization of push notifications for props
  useEffect(() => {
    refetchPropCount();
  }, [propCount, user]);

  useEffect(() => {
    refetchImages();
  }, [user, dispatch]);

  // ***************************************************************************

  return (
    <div className="page hero__image">
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
