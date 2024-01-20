import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react"

import { RootState } from "../../redux/store"
import PickCard from "./PickCard"

interface Item {
  propID: number
  type: "ouPlayer" | "ouTeam" | "spread"
  team1?: string
  team2?: string
  player?: string
  stat?: string | null
  line: number
  favorite?: string
  nonFavorite?: string
  selectedOU?: null | "under" | "over"
  selectedTeam?: null | string
  startDate: string
  endDate: string
  result: number | string | null
  nflYear: number
  week: number
}

const testItems: Item[] = [
  {
    propID: 54870298374,
    type: "ouPlayer",
    player: "Jalen Hurts",
    stat: "rushing yards",
    line: 38.5,
    startDate: "12/21/2023",
    endDate: "2024-12-30T17:00:00Z",
    selectedOU: null,
    result: null, // this will be a number
    nflYear: 2023,
    week: 1
  },
  {
    propID: 1928719824,
    type: "ouTeam",
    team1: "GB",
    team2: "PHI",
    line: 42.5,
    startDate: "12/21/2023",
    endDate: "2024-12-30T18:00:00Z",
    selectedOU: null,
    result: null,
    nflYear: 2023,
    week: 1
  },
  {
    propID: 8946513213,
    type: "spread",
    team1: "WAS",
    team2: "DEN",
    line: 4.5,
    favorite: "WAS",
    nonFavorite: "DEN",
    startDate: "12/21/2023",
    endDate: "2024-12-30T18:00:00Z",
    selectedTeam: null,
    result: null,
    nflYear: 2023,
    week: 1
  },
  {
    propID: 3479182735,
    type: "spread",
    team1: "SF",
    team2: "BAL",
    line: 7.5,
    favorite: "SF",
    nonFavorite: "BAL",
    startDate: "12/21/2023",
    endDate: "2024-12-30T21:00:00Z",
    selectedTeam: null,
    result: null,
    nflYear: 2023,
    week: 1
  },
  {
    propID: 2649844654132,
    type: "ouPlayer",
    player: "A.J. Brown",
    stat: "receiving yards",
    line: 64.5,
    startDate: "12/21/2023",
    endDate: "2024-12-30T16:00:00Z",
    selectedOU: null,
    result: null,
    nflYear: 2023,
    week: 1
  },
  {
    propID: 5897239847906,
    type: "spread",
    team1: "KC",
    team2: "LA",
    line: 7.5,
    favorite: "KC",
    nonFavorite: "LA",
    startDate: "12/21/2023",
    endDate: "2024-12-30T13:00:00Z",
    selectedTeam: null,
    result: null,
    nflYear: 2023,
    week: 1
  },
  {
    propID: 875647385,
    type: "ouPlayer",
    player: "Josh Allen",
    stat: "passing touchdowns",
    line: 1.5,
    startDate: "12/21/2023",
    endDate: "2024-12-30T13:00:00Z",
    selectedOU: null,
    result: null,
    nflYear: 2023,
    week: 1
  },
  {
    propID: 4654984321,
    type: "ouPlayer",
    player: "Tyreek Hill",
    stat: "receiving yards",
    line: 101.5,
    startDate: "12/21/2023",
    endDate: "2024-12-30T13:00:00Z",
    selectedOU: null,
    result: null,
    nflYear: 2023,
    week: 1
  },
  {
    propID: 23984729387,
    type: "spread",
    team1: "NYG",
    team2: "NYJ",
    line: 6.5,
    favorite: "NYG",
    nonFavorite: "NYJ",
    startDate: "12/21/2023",
    endDate: "2024-12-30T16:20:00Z",
    selectedTeam: null,
    result: null,
    nflYear: 2023,
    week: 1
  },
  {
    propID: 13415156,
    type: "ouTeam",
    team1: "MIA",
    team2: "PIT",
    line: 38.5,
    startDate: "12/21/2023",
    endDate: "2024-12-30T13:00:00Z",
    selectedOU: null,
    result: null,
    nflYear: 2023,
    week: 1
  }
]

export default function Picks() {
  const { user } = useSelector((state: RootState) => state.user)
  const [activeButton, setActiveButton] = useState<string>("makePicks")
  const [picksMade, setPicksMade] = useState<Item[]>([])

  // NEED TO USE EFFECT TO GRAB CURRENT NFL WEEK AND YEAR FROM 3rd PARTY API
  // THEN USE THAT INFO TO GRAB THE PICKS FROM YOUR DB TO MATCH

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
                    className={`${activeButton === "allTime" ? "active" : ""}`}
                  >
                    <button
                      className={`${
                        activeButton === "allTime" ? "active" : ""
                      }`}
                      onClick={() => setActiveButton("allTime")}
                    >
                      All-Time
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
                    className={`${activeButton === "yearly" ? "active" : ""}`}
                  >
                    <button
                      className={`${activeButton === "yearly" ? "active" : ""}`}
                      onClick={() => setActiveButton("yearly")}
                    >
                      Yearly
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
                  {testItems.map((item) => {
                    return (
                      <PickCard
                        key={item.propID}
                        item={item}
                        setPicksMade={setPicksMade}
                        picksMade={picksMade}
                      />
                    )
                  })}
                </div>
                <div
                  className={`counter ${
                    picksMade.length === 10 ? "complete" : ""
                  }`}
                >
                  Picks Made:{" "}
                  <span className="pick-split">{picksMade.length}/10</span>
                </div>
              </>
            ) : activeButton === "allTime" ? (
              <div className="allTime">All-Time</div>
            ) : (
              <div className="yearly">Yearly</div>
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
