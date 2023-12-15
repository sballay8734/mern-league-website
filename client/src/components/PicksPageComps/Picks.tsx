import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react"

import { RootState } from "../../redux/store"
import { FaCaretDown } from "react-icons/fa"
import { FaCaretUp } from "react-icons/fa"

interface Item {
  gameID: number
  type: "ouPlayer" | "ouTeam" | "spread"
  team1?: string
  team2?: string
  player?: string
  stat?: string | null
  line: number
  favorite?: string
  nonFavorite?: string
  startDate: string
  endDate: string
  result: number | string | null
}

const testItems: Item[] = [
  {
    gameID: 54870298374,
    type: "ouPlayer",
    player: "Jalen Hurts",
    stat: "rushing yards",
    line: 38.5,
    startDate: "12/16/2023",
    endDate: "12/17/2023",
    result: null // this will be a number
  },
  {
    gameID: 1928719824,
    type: "ouTeam",
    team1: "GB",
    team2: "PHI",
    line: 42.5,
    startDate: "12/16/2023",
    endDate: "12/17/2023",
    result: null // this will be a number
  },
  {
    gameID: 23984729387,
    type: "spread",
    team1: "GB",
    team2: "PHI",
    line: 3.5,
    favorite: "PHI",
    nonFavorite: "GB",
    startDate: "12/16/2023",
    endDate: "12/17/2023",
    result: null // this will be a string
  }
]

export default function Picks() {
  const { user } = useSelector((state: RootState) => state.user)
  const [OverOrUnder, setOverOrUnder] = useState<string | null>(null)

  // WILL NEED TO MOVE LOGIC TO IT'S OWN COMPONENT TO HANDLE MORE THAN ONE SELECTION

  return (
    <>
      {user ? (
        // Move to own component
        <div className="picks-section">
          <div className="picks-header"></div>
          <div className="picks">
            {testItems.map((item) => {
              if (item.type === "ouPlayer") {
                return (
                  <div className="pick-wrapper">
                    <div className="pick-header">
                      <h2 className="pick-type">OVER OR UNDER</h2>
                    </div>
                    <div className="pick ouPlayer">
                      <button
                        onClick={() => setOverOrUnder("under")}
                        className={`ouLeft ${
                          OverOrUnder === "under" ? "active" : ""
                        }`}
                      >
                        Under{" "}
                        <span className="ou-icon down">
                          <FaCaretDown />
                        </span>
                      </button>
                      <div className="ouCenter">
                        <span className="player-name">{item.player}</span> over
                        or under{" "}
                        <span className="stat-and-line">
                          {item.line} {item.stat}
                        </span>
                        ?
                      </div>
                      <button
                        onClick={() => setOverOrUnder("over")}
                        className={`ouRight ${
                          OverOrUnder === "over" ? "active" : ""
                        }`}
                      >
                        <span className="ou-icon up">
                          <FaCaretUp />
                        </span>
                        Over
                      </button>
                    </div>
                  </div>
                )
              } else if (item.type === "ouTeam") {
                return (
                  <div className="pick-wrapper">
                    <div className="pick-header">
                      <h2 className="pick-type">OVER OR UNDER</h2>
                    </div>
                    <div className="pick ouTeam">
                      <button
                        onClick={() => setOverOrUnder("under")}
                        className={`ouLeft ${
                          OverOrUnder === "under" ? "active" : ""
                        }`}
                      >
                        Under{" "}
                        <span className="ou-icon down">
                          <FaCaretDown />
                        </span>
                      </button>
                      <div className="ouCenter">
                        <span className="team-name">
                          {item.team1} <span className="vs">vs.</span>{" "}
                          {item.team2}
                        </span>{" "}
                        over or under{" "}
                        <span className="stat-and-line">
                          {item.line} total points
                        </span>
                        ?
                      </div>
                      <button
                        onClick={() => setOverOrUnder("over")}
                        className={`ouRight ${
                          OverOrUnder === "over" ? "active" : ""
                        }`}
                      >
                        <span className="ou-icon up">
                          <FaCaretUp />
                        </span>
                        Over
                      </button>
                    </div>
                  </div>
                )
              } else if (item.type === "spread") {
                return (
                  <div className="pick-wrapper">
                    <div className="pick-header">
                      <h2 className="pick-type">SPREAD</h2>
                    </div>
                    <div className="pick spread">
                      <button
                        onClick={() => setOverOrUnder("under")}
                        className={`ouLeft ${
                          OverOrUnder === "under" ? "active" : ""
                        }`}
                      >
                        {item.favorite}{" "}
                        <span className="spread-line">-{item.line}</span>
                      </button>
                      <div className="ouCenter">
                        <span className="team-name">
                          {item.team1} <span className="vs">vs.</span>{" "}
                          {item.team2}
                        </span>
                      </div>
                      <button
                        onClick={() => setOverOrUnder("over")}
                        className={`ouRight ${
                          OverOrUnder === "over" ? "active" : ""
                        }`}
                      >
                        {item.nonFavorite}{" "}
                        <span className="spread-line">+{item.line}</span>
                      </button>
                    </div>
                  </div>
                )
              } else {
                return <div className="pick wrong">Incorrect Format</div>
              }
            })}
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
