import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import { RootState } from "../../redux/store"
import PickCard from "./PickCard"
import { PropToDbInterface } from "../BettingPropSpreads"
import { useFetchPropsQuery } from "../../redux/props/propsApi"

interface PicksProps {
  propData: PropToDbInterface[]
}

export default function Picks({ propData }: PicksProps): JSX.Element {
  const { user } = useSelector((state: RootState) => state.user)
  const [activeButton, setActiveButton] = useState<string>("makePicks")
  const [picksMade, setPicksMade] = useState<string[]>([])
  const [triggerRefetch, setTriggerRefetch] = useState<boolean>(false)
  const { refetch } = useFetchPropsQuery()

  const picksToMake = propData.length

  useEffect(() => {
    refetch()
  }, [picksMade, triggerRefetch])

  function handlePicksMadeUpdate(prop: PropToDbInterface) {
    if (!user) return

    if (prop.type === "playerProp" || prop.type === "teamTotals") {
      if (
        prop.overSelections?.includes(user.fullName) ||
        prop.underSelections?.includes(user.fullName)
      ) {
        if (picksMade.includes(prop.uniqueId)) return

        setPicksMade((prevPicksMade) => [...prevPicksMade, prop.uniqueId])
      }
    } else if (prop.type === "teamSpreads") {
      if (
        prop.homeLineSelections?.includes(user.fullName) ||
        prop.awayLineSelections?.includes(user.fullName)
      ) {
        if (picksMade.includes(prop.uniqueId)) return

        setPicksMade((prevPicksMade) => [...prevPicksMade, prop.uniqueId])
      }
    }
  }

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
                      handlePicksMadeUpdate(prop)
                      return (
                        <PickCard
                          key={prop.uniqueId}
                          user={user}
                          item={prop}
                          setPicksMade={setPicksMade}
                          picksMade={picksMade}
                          setTriggerRefetch={setTriggerRefetch}
                          triggerRefetch={triggerRefetch}
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
