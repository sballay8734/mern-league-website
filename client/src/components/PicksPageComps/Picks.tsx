import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { setActiveButton } from "../../redux/props/picksSlice"
import { RootState } from "../../redux/store"
import PickCard from "./PickCard"
import { PropToDbInterface } from "../BettingPropSpreads"
import PickCounter from "./PickCounter"

interface PicksProps {
  propData: PropToDbInterface[]
}

export default function Picks({ propData }: PicksProps): JSX.Element {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)
  const activeButton = useSelector(
    (state: RootState) => state.picksSlice.activeButton
  )

  console.log("Rendering Parent WHYYYY...")

  return (
    <>
      {user ? (
        // Move to own component
        <div className="picks-section">
          <div className="picks-header-wrapper">
            <div className="picks-header">
              <h1>Picks and Dicks</h1>
              <p>Week {propData[0].week}</p>
            </div>
            <div className="picks-nav">
              <nav className="tab">
                <ul>
                  <li
                    className={`${
                      activeButton === "standings" ? "active" : ""
                    }`}
                  >
                    <button
                      className={`${
                        activeButton === "standings" ? "active" : ""
                      }`}
                      onClick={() => dispatch(setActiveButton("standings"))}
                    >
                      Standings
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
                </ul>
              </nav>
            </div>
          </div>

          <div className={`picks ${activeButton}`}>
            {activeButton === "makePicks" ? (
              <>
                <div className="picks-wrapper disable-scrollbars">
                  {propData &&
                    propData.map((prop) => {
                      // handlePicksMadeUpdate(prop)
                      return <PickCard key={prop._id} user={user} item={prop} />
                    })}
                </div>
                <PickCounter propData={propData} />
              </>
            ) : activeButton === "standings" ? (
              <div className="standings">Coming Soon</div>
            ) : (
              <div className="history">Coming Soon</div>
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
  )
}
