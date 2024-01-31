import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react"

import { RootState } from "../../redux/store"
import PickCard from "./PickCard"
import { PropToDbInterface } from "../BettingPropSpreads"

interface PicksProps {
  propData: PropToDbInterface[]
}

export default function Picks({ propData }: PicksProps): JSX.Element {
  const { user } = useSelector((state: RootState) => state.user)
  const [activeButton, setActiveButton] = useState<string>("makePicks")
  const [picksMade, setPicksMade] = useState<string[]>([])

  const picksToMake = propData.length

  return (
    <>
      {user ? (
        // Move to own component
        <div className="picks-section">
          <div className="picks-header-wrapper">
            <div className="picks-header">
              <h1>Picks and Dicks</h1>
              <p>Week 3</p>
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
                      onClick={() => setActiveButton("standings")}
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
                      onClick={() => setActiveButton("makePicks")}
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
                      onClick={() => setActiveButton("history")}
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
                      return (
                        <PickCard
                          key={prop.uniqueId}
                          user={user}
                          item={prop}
                          setPicksMade={setPicksMade}
                          picksMade={picksMade}
                        />
                      )
                    })}
                </div>
                <div
                  className={`counter ${
                    picksMade.length === picksToMake ? "complete" : ""
                  }`}
                >
                  Picks Made:{" "}
                  <span className="pick-split">
                    {picksMade.length}/{picksToMake}
                  </span>
                </div>
              </>
            ) : activeButton === "standings" ? (
              <div className="standings">Standings</div>
            ) : (
              <div className="yearly">History</div>
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
