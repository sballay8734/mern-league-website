import { useState } from "react"

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
  selectedOU?: null | "under" | "over"
  selectedTeam?: null | string
  startDate: string
  endDate: string
  result: number | string | null
}

interface PickCardProps {
  item: Item
  picksMade: Item[]
  setPicksMade: React.Dispatch<React.SetStateAction<Item[]>>
}

export default function PickCard({
  item,
  picksMade,
  setPicksMade
}: PickCardProps) {
  const [OverOrUnder, setOverOrUnder] = useState<string | null>(null)
  const [spreadPick, setSpreadPick] = useState<string | null>(null)

  function handleUnderClick(item: Item) {
    setOverOrUnder("under")
    item.selectedOU = "under"
    const filteredPicks = picksMade.filter(
      (pick) => pick.gameID !== item.gameID
    )

    setPicksMade([...filteredPicks, item])
  }

  function handleOverClick(item: Item) {
    setOverOrUnder("over")
    item.selectedOU = "over"

    const filteredPicks = picksMade.filter(
      (pick) => pick.gameID !== item.gameID
    )

    setPicksMade([...filteredPicks, item])
  }

  function handleSpreadPick(team: string, item: Item) {
    if (team === item.favorite) {
      setSpreadPick("favorite")
      item.selectedTeam = team

      const filteredPicks = picksMade.filter(
        (pick) => pick.gameID !== item.gameID
      )

      setPicksMade([...filteredPicks, item])
    } else if (team === item.nonFavorite) {
      setSpreadPick("nonFavorite")
      item.selectedTeam = team

      const filteredPicks = picksMade.filter(
        (pick) => pick.gameID !== item.gameID
      )

      setPicksMade([...filteredPicks, item])
    }
  }

  console.log(picksMade)

  if (item.type === "ouPlayer") {
    return (
      <div className="pick-wrapper">
        <div className="pick-header">
          <h2 className="pick-type">OVER OR UNDER</h2>
        </div>
        <div className="pick ouPlayer">
          <button
            onClick={() => handleUnderClick(item)}
            className={`ouLeft ${OverOrUnder === "under" ? "active" : ""}`}
          >
            Under{" "}
            <span className="ou-icon down">
              <FaCaretDown />
            </span>
          </button>
          <div className="ouCenter">
            <span className="player-name">{item.player}</span> over or under{" "}
            <span className="stat-and-line">
              {item.line} {item.stat}
            </span>
            ?
          </div>
          <button
            onClick={() => handleOverClick(item)}
            className={`ouRight ${OverOrUnder === "over" ? "active" : ""}`}
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
            onClick={() => handleUnderClick(item)}
            className={`ouLeft ${OverOrUnder === "under" ? "active" : ""}`}
          >
            Under{" "}
            <span className="ou-icon down">
              <FaCaretDown />
            </span>
          </button>
          <div className="ouCenter">
            <span className="team-name">
              {item.team1} <span className="vs">vs.</span> {item.team2}
            </span>{" "}
            over or under{" "}
            <span className="stat-and-line">{item.line} total points</span>?
          </div>
          <button
            onClick={() => handleOverClick(item)}
            className={`ouRight ${OverOrUnder === "over" ? "active" : ""}`}
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
            onClick={() => handleSpreadPick(item.favorite!, item)}
            className={`ouLeft ${spreadPick === "favorite" ? "active" : ""}`}
          >
            {item.favorite} <span className="spread-line">-{item.line}</span>
          </button>
          <div className="ouCenter">
            <span className="team-name">
              {item.team1} <span className="vs">vs.</span> {item.team2}
            </span>
          </div>
          <button
            onClick={() => handleSpreadPick(item.nonFavorite!, item)}
            className={`ouRight ${
              spreadPick === "nonFavorite" ? "active" : ""
            }`}
          >
            {item.nonFavorite} <span className="spread-line">+{item.line}</span>
          </button>
        </div>
      </div>
    )
  } else {
    return <div className="pick wrong">Incorrect Format</div>
  }
}
