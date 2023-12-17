// Need locks to appear when successful database write
// Lock pick when timer is up

import { useState } from "react"

import { FaCaretDown } from "react-icons/fa"
import { FaCaretUp } from "react-icons/fa"
import CountdownTimer from "../CountDownTimer/CountDownTimer"

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

  async function handleUnderClick(item: Item) {
    const res = await fetch(`/api/props/${item.propID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...item, selectedOU: "under" })
    })

    const data = await res.json()

    if (data.success === false) {
      console.log("ERROR")
      return
    }
    console.log(data)

    setOverOrUnder("under")
    item.selectedOU = "under"
    const filteredPicks = picksMade.filter(
      (pick) => pick.propID !== item.propID
    )
    setPicksMade([...filteredPicks, item])
  }

  async function handleOverClick(item: Item) {
    const res = await fetch(`/api/props/${item.propID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...item, selectedOU: "over" })
    })

    const data = await res.json()

    if (data.success === false) {
      console.log("ERROR")
      return
    }
    console.log(data)

    setOverOrUnder("over")
    item.selectedOU = "over"

    const filteredPicks = picksMade.filter(
      (pick) => pick.propID !== item.propID
    )
    setPicksMade([...filteredPicks, item])
  }

  async function handleSpreadPick(team: string, item: Item) {
    if (team === item.favorite) {
      const res = await fetch(`/api/props/${item.propID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...item, selectedTeam: team })
      })

      const data = await res.json()

      if (data.success === false) {
        console.log("ERROR")
        return
      }
      console.log(data)

      setSpreadPick("favorite")
      item.selectedTeam = team

      const filteredPicks = picksMade.filter(
        (pick) => pick.propID !== item.propID
      )
      setPicksMade([...filteredPicks, item])
    } else if (team === item.nonFavorite) {
      const res = await fetch(`/api/props/${item.propID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...item, selectedTeam: team })
      })

      const data = await res.json()

      if (data.success === false) {
        console.log("ERROR")
        return
      }
      console.log(data)

      setSpreadPick("nonFavorite")
      item.selectedTeam = team

      const filteredPicks = picksMade.filter(
        (pick) => pick.propID !== item.propID
      )

      setPicksMade([...filteredPicks, item])
    }
  }

  // console.log(picksMade)
  // WHY IS THIS LOGGING 10 TIMES?

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
        <CountdownTimer endDate={item.endDate} />
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
        <CountdownTimer endDate={item.endDate} />
      </div>
    )
  } else if (item.type === "spread") {
    return (
      <div className="pick-wrapper">
        <div className="pick-header spread">
          <h2 className="pick-type">SPREAD</h2>
        </div>
        <div className="pick spread">
          <button
            onClick={() => handleSpreadPick(item.favorite!, item)}
            className={`ouLeft ${spreadPick === "favorite" ? "active" : ""}`}
          >
            {item.favorite}{" "}
            <span className="spread-line minus">-{item.line}</span>
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
            {item.nonFavorite}{" "}
            <span className="spread-line plus">+{item.line}</span>
          </button>
        </div>
        <CountdownTimer endDate={item.endDate} />
      </div>
    )
  } else {
    return <div className="pick wrong">Incorrect Format</div>
  }
}
