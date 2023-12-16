import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react"

import { RootState } from "../../redux/store"
import PickCard from "./PickCard"

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
  selectedOU?: null | "under" | "over"
  selectedTeam?: null | string
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
    selectedOU: null,
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
    selectedOU: null,
    result: null // this will be a number
  },
  {
    gameID: 8946513213,
    type: "spread",
    team1: "WAS",
    team2: "DEN",
    line: 4.5,
    favorite: "WAS",
    nonFavorite: "DEN",
    startDate: "12/16/2023",
    endDate: "12/17/2023",
    selectedTeam: null,
    result: null // this will be a string
  },
  {
    gameID: 3479182735,
    type: "spread",
    team1: "SF",
    team2: "BAL",
    line: 7.5,
    favorite: "SF",
    nonFavorite: "BAL",
    startDate: "12/16/2023",
    endDate: "12/17/2023",
    selectedTeam: null,
    result: null // this will be a string
  },
  {
    gameID: 2649844654132,
    type: "ouPlayer",
    player: "A.J. Brown",
    stat: "receiving yards",
    line: 64.5,
    startDate: "12/16/2023",
    endDate: "12/17/2023",
    selectedOU: null,
    result: null // this will be a number
  },
  {
    gameID: 5897239847906,
    type: "spread",
    team1: "KC",
    team2: "LA",
    line: 7.5,
    favorite: "KC",
    nonFavorite: "LA",
    startDate: "12/16/2023",
    endDate: "12/17/2023",
    selectedTeam: null,
    result: null // this will be a string
  },
  {
    gameID: 875647385,
    type: "ouPlayer",
    player: "Josh Allen",
    stat: "passing touchdowns",
    line: 1.5,
    startDate: "12/16/2023",
    endDate: "12/17/2023",
    selectedOU: null,
    result: null // this will be a number
  },
  {
    gameID: 4654984321,
    type: "ouPlayer",
    player: "Tyreek Hill",
    stat: "receiving yards",
    line: 101.5,
    startDate: "12/16/2023",
    endDate: "12/17/2023",
    selectedOU: null,
    result: null // this will be a number
  },
  {
    gameID: 23984729387,
    type: "spread",
    team1: "NYG",
    team2: "NYJ",
    line: 6.5,
    favorite: "NYG",
    nonFavorite: "NYJ",
    startDate: "12/16/2023",
    endDate: "12/17/2023",
    selectedTeam: null,
    result: null // this will be a string
  },
  {
    gameID: 13415156,
    type: "ouTeam",
    team1: "MIA",
    team2: "PIT",
    line: 38.5,
    startDate: "12/16/2023",
    endDate: "12/17/2023",
    selectedOU: null,
    result: null // this will be a number
  }
]

export default function Picks() {
  const { user } = useSelector((state: RootState) => state.user)
  const [activeButton, setActiveButton] = useState<string>("makePicks")
  const [picksMade, setPicksMade] = useState<Item[]>([])

  // WILL NEED TO MOVE LOGIC TO IT'S OWN COMPONENT TO HANDLE MORE THAN ONE SELECTION

  return (
    <>
      {user ? (
        // Move to own component
        <div className="picks-section">
          <div className="picks-header">
            <h1>Picks and Dicks</h1>
            <p>NFL Week 3</p>
          </div>
          <div className="picks-nav">
            <nav className="tab">
              <ul>
                <li>
                  <button
                    className={`${activeButton === "allTime" ? "active" : ""}`}
                    onClick={() => setActiveButton("allTime")}
                  >
                    All-Time
                  </button>
                </li>
                <li>
                  <button
                    className={`${
                      activeButton === "makePicks" ? "active" : ""
                    }`}
                    onClick={() => setActiveButton("makePicks")}
                  >
                    Make Picks
                  </button>
                </li>
                <li>
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
          <div className="picks">
            {testItems.map((item) => {
              return (
                <PickCard
                  key={item.gameID}
                  item={item}
                  setPicksMade={setPicksMade}
                  picksMade={picksMade}
                />
              )
            })}
            <div
              className={`counter ${picksMade.length === 10 ? "complete" : ""}`}
            >
              Picks Made:{" "}
              <span className="pick-split">{picksMade.length}/10</span>
            </div>
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
