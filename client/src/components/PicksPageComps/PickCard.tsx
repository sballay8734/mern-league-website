// Need locks to appear when successful database write
// Lock pick when timer is up

import { useState } from "react"

import { FaCaretDown } from "react-icons/fa"
import { FaCaretUp } from "react-icons/fa"
import { FaLock } from "react-icons/fa"
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
  nflYear: number
  week: number
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
  const [lockIcon, setLockIcon] = useState<boolean>(false)
  const [lockPick, setLockPick] = useState<boolean>(false)

  async function handleUnderClick(item: Item) {
    if (item.selectedOU === "under") return
    if (lockPick) return

    setLockIcon(false)

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
      setLockIcon(false)
      return
    }
    console.log(data)

    setOverOrUnder("under")
    item.selectedOU = "under"
    setLockIcon(true)
    const filteredPicks = picksMade.filter(
      (pick) => pick.propID !== item.propID
    )
    setPicksMade([...filteredPicks, item])
  }

  async function handleOverClick(item: Item) {
    if (item.selectedOU === "over") return
    if (lockPick) return

    setLockIcon(false)

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
      setLockIcon(false)
      return
    }
    console.log(data)

    setOverOrUnder("over")
    setLockIcon(true)
    item.selectedOU = "over"

    const filteredPicks = picksMade.filter(
      (pick) => pick.propID !== item.propID
    )
    setPicksMade([...filteredPicks, item])
  }

  async function handleSpreadPick(team: string, item: Item) {
    if (lockPick) return
    if (item.selectedTeam === team) return

    setLockIcon(false)

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
        setLockIcon(false)
        return
      }
      console.log(data)

      setSpreadPick("favorite")
      setLockIcon(true)
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
        setLockIcon(false)
        return
      }
      console.log(data)

      setSpreadPick("nonFavorite")
      setLockIcon(true)
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
            <span
              className={`lock-icon ${
                lockIcon && item.selectedOU === "under" ? "show" : ""
              }`}
            >
              <FaLock />
            </span>
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
            Over{" "}
            <span
              className={`lock-icon ${
                lockIcon && item.selectedOU === "over" ? "show" : ""
              }`}
            >
              <FaLock />
            </span>
          </button>
          {lockPick ? <div className="locked-overlay">Pick is Locked</div> : ""}
        </div>
        <CountdownTimer endDate={item.endDate} setLockPick={setLockPick} />
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
            <span
              className={`lock-icon ${
                lockIcon && item.selectedOU === "under" ? "show" : ""
              }`}
            >
              <FaLock />
            </span>
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
            Over{" "}
            <span
              className={`lock-icon ${
                lockIcon && item.selectedOU === "over" ? "show" : ""
              }`}
            >
              <FaLock />
            </span>
          </button>
          {lockPick ? <div className="locked-overlay">Pick is Locked</div> : ""}
        </div>
        <CountdownTimer endDate={item.endDate} setLockPick={setLockPick} />
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
            <span
              className={`lock-icon ${
                lockIcon && item.selectedTeam === item.favorite ? "show" : ""
              }`}
            >
              <FaLock />
            </span>
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
            <span
              className={`lock-icon ${
                lockIcon && item.selectedTeam === item.nonFavorite ? "show" : ""
              }`}
            >
              <FaLock />
            </span>
            <span className="spread-line plus">+{item.line}</span>
          </button>
          {lockPick ? <div className="locked-overlay">Pick is Locked</div> : ""}
        </div>
        <CountdownTimer endDate={item.endDate} setLockPick={setLockPick} />
      </div>
    )
  } else {
    return <div className="pick wrong">Incorrect Format</div>
  }
}
