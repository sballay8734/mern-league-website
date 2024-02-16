import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  setActiveButton,
  setNumChallenges,
} from "../../redux/props/picksSlice";
import { RootState } from "../../redux/store";
import PickCard from "./PickCard";
import { PropToDbInterface } from "../BettingPropSpreads";
import PickCounter from "./PickCounter";
import ChallengeHistory from "./ChallengeHistory";

interface PicksProps {
  propData: PropToDbInterface[] | undefined;
}

export default function Picks({ propData }: PicksProps): JSX.Element {
  const dispatch = useDispatch();
  const numChallenges = useSelector(
    (state: RootState) => state.picksSlice.numChallenges,
  );
  const user = useSelector((state: RootState) => state.user.user);
  const activeButton = useSelector(
    (state: RootState) => state.picksSlice.activeButton,
  );

  return (
    <>
      {user ? (
        // Move to own component
        <div className="picks-section">
          <div className="picks-header-wrapper">
            <div className="picks-header">
              <h1>Picks and Dicks</h1>
              <p>
                Week{" "}
                {propData && propData?.length > 0 ? propData[0].week : "N/A"}
              </p>
            </div>
            <div className="picks-nav">
              <nav className="tab">
                <ul>
                  <li
                    className={`${activeButton === "history" ? "active" : ""}`}
                  >
                    <button
                      className={`${
                        activeButton === "history" ? "active" : ""
                      }`}
                      onClick={() => dispatch(setActiveButton("history"))}
                    >
                      History
                    </button>
                  </li>
                  <li className="spacer"></li>
                  <li
                    className={`${
                      activeButton === "makePicks" ? "active" : ""
                    }`}
                  >
                    <button
                      className={`picks-button ${
                        activeButton === "makePicks" ? "active" : ""
                      }`}
                      onClick={() => dispatch(setActiveButton("makePicks"))}
                    >
                      Make Picks <img src="/picks.png" alt="picks" />
                    </button>
                  </li>
                  <li className="spacer"></li>
                  <li
                    className={`${activeButton === "challenges" ? "active" : ""}`}
                  >
                    <button
                      className={`${
                        activeButton === "challenges" ? "active" : ""
                      }`}
                      onClick={() => dispatch(setActiveButton("challenges"))}
                    >
                      {/* ACCEPTED CHALLENGES - SHOULDN'T SHOW IF NONE EXIST */}
                      <span className="w-4 rounded-full border bg-[#28f235] text-[10px] font-bold text-green-950">
                        1
                      </span>
                      Challenges
                      {/* UNACCEPTED CHALLENGES */}
                      <span className="w-4 rounded-full border bg-[#fb2c2c] text-[10px] font-bold text-red-950">
                        {numChallenges}
                      </span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className={`picks ${activeButton}`}>
            {activeButton === "makePicks" ? (
              <>
                <div className="picks-wrapper disable-scrollbars">
                  {propData && propData.length > 0 ? (
                    propData.map((prop) => {
                      return (
                        <PickCard key={prop._id} user={user} item={prop} />
                      );
                    })
                  ) : (
                    <div className="picks no-picks">No picks available</div>
                  )}
                </div>
                <PickCounter propData={propData} />
              </>
            ) : activeButton === "history" ? (
              <div className="standings">Coming Soon</div>
            ) : (
              <div className="challenges flex flex-col">
                <ChallengeHistory />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="picks-section-unauth">
          You must be signed in to make picks
          <Link to={"/signin"}>Sign in</Link>
        </div>
      )}
    </>
  );
}
