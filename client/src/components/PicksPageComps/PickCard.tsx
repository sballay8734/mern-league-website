// Need locks to appear when successful database write
// Lock pick when timer is up

import { useState } from "react"

import { FaCaretDown } from "react-icons/fa"
import { FaCaretUp } from "react-icons/fa"
import { FaLock } from "react-icons/fa"
import CountdownTimer from "../CountDownTimer/CountDownTimer"
import { propKeyConversion } from "../utils"
// import { PropToDbInterface } from "../BettingPropSpreads"

interface Challenges {
  challenger: string
  acceptor: string | null
  challengerChoice: string // "over" | "under" | "away" | "home"
  acceptorChoice: string // "over" | "under" | "away" | "home"

  void: boolean
}

interface PickCardProps {
  item: PropToDbInterface
  picksMade: PropToDbInterface[]
  setPicksMade: React.Dispatch<React.SetStateAction<PropToDbInterface[]>>
}

interface PropToDbInterface {
  type: string
  subType?: string
  player?: string
  gameId: string
  expiration: string
  uniqueId: string
  week: number
  nflYear: number

  overData?: { overLine: number; overPayout: number; calcOverPayout: number }
  underData?: {
    underLine: number
    underPayout: number
    calcUnderPayout: number
  }
  overSelections?: string[]
  underSelections?: string[]

  homeTeam?: string
  awayTeam?: string

  homeData?: {
    homeTeam: string
    homeLine: number
    homePayout: number
    calcHomePayout: number
  }
  awayData?: {
    awayTeam: string
    awayLine: number
    awayPayout: number
    calcAwayPayout: number
  }
  homeLineSelections?: string[]
  awayLineSelections?: string[]

  awayScoreResult?: number
  homeScoreResult?: number

  result?: number

  void: boolean

  challenges: Challenges[] | []
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

  // async function handleUnderClick(item: PropToDbInterface) {
  //   if (item.selectedOU === "under") return
  //   if (lockPick) return

  //   setLockIcon(false)

  //   const res = await fetch(`/api/props/${item.propID}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ ...item, selectedOU: "under" })
  //   })

  //   const data = await res.json()

  //   if (data.success === false) {
  //     console.log("ERROR")
  //     setLockIcon(false)
  //     return
  //   }
  //   console.log(data)

  //   setOverOrUnder("under")
  //   item.selectedOU = "under"
  //   setLockIcon(true)
  //   const filteredPicks = picksMade.filter(
  //     (pick) => pick.propID !== item.propID
  //   )
  //   setPicksMade([...filteredPicks, item])
  // }

  // async function handleOverClick(item: PropToDbInterface) {
  //   if (item.selectedOU === "over") return
  //   if (lockPick) return

  //   setLockIcon(false)

  //   const res = await fetch(`/api/props/${item.propID}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ ...item, selectedOU: "over" })
  //   })

  //   const data = await res.json()

  //   if (data.success === false) {
  //     console.log("ERROR")
  //     setLockIcon(false)
  //     return
  //   }
  //   console.log(data)

  //   setOverOrUnder("over")
  //   setLockIcon(true)
  //   item.selectedOU = "over"

  //   const filteredPicks = picksMade.filter(
  //     (pick) => pick.propID !== item.propID
  //   )
  //   setPicksMade([...filteredPicks, item])
  // }

  // async function handleSpreadPick(team: string, item: PropToDbInterface) {
  //   if (lockPick) return
  //   if (item.selectedTeam === team) return

  //   setLockIcon(false)

  //   if (team === item.favorite) {
  //     const res = await fetch(`/api/props/${item.propID}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ ...item, selectedTeam: team })
  //     })

  //     const data = await res.json()

  //     if (data.success === false) {
  //       console.log("ERROR")
  //       setLockIcon(false)
  //       return
  //     }
  //     console.log(data)

  //     setSpreadPick("favorite")
  //     setLockIcon(true)
  //     item.selectedTeam = team

  //     const filteredPicks = picksMade.filter(
  //       (pick) => pick.propID !== item.propID
  //     )
  //     setPicksMade([...filteredPicks, item])
  //   } else if (team === item.nonFavorite) {
  //     const res = await fetch(`/api/props/${item.propID}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ ...item, selectedTeam: team })
  //     })

  //     const data = await res.json()

  //     if (data.success === false) {
  //       console.log("ERROR")
  //       setLockIcon(false)
  //       return
  //     }
  //     console.log(data)

  //     setSpreadPick("nonFavorite")
  //     setLockIcon(true)
  //     item.selectedTeam = team

  //     const filteredPicks = picksMade.filter(
  //       (pick) => pick.propID !== item.propID
  //     )

  //     setPicksMade([...filteredPicks, item])
  //   }
  // }

  // console.log(picksMade)
  // WHY IS THIS LOGGING 10 TIMES?

  async function handleUnderClick(item: PropToDbInterface) {
    const res = await fetch("/api/props/update-prop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prop: item, action: "under" })
    })

    const data = await res.json()

    if (!data) {
      console.log("no data")
      return
    }

    console.log(data)
  }

  async function handleOverClick(item: PropToDbInterface) {
    const res = await fetch("/api/props/update-prop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prop: item, action: "over" })
    })

    const data = await res.json()

    if (!data) {
      console.log("no data")
      return
    }

    console.log(data)
  }

  async function handleSpreadPick(selection: string, item: PropToDbInterface) {
    const res = await fetch("/api/props/update-prop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prop: item, action: selection })
    })

    const data = await res.json()

    if (!data) {
      console.log("no data")
      return
    }

    console.log(data)
  }

  function formatTeamName(teamName: string) {
    return teamName.split(" ")[0].charAt(0) + teamName.split(" ")[1].charAt(0)
  }

  // *****************************************************************
  // *****************************************************************
  // *****************************************************************
  // *****************************************************************
  // NEED TO HANDLE LOCK ICONS!!!
  // Lock icons should be handled inside Api calls if successful
  // *****************************************************************
  // *****************************************************************
  // *****************************************************************
  // *****************************************************************

  if (item.type === "playerProp") {
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
            <span className="payoutAndCalc">
              <span className="payout">{item.underData?.underPayout}</span>{" "}
              <span className="calcPayout">
                {item.underData?.calcUnderPayout}
              </span>
            </span>
            Under
            {/* <span
              className={`lock-icon ${
                lockIcon && item.selectedOU === "under" ? "show" : ""
              }`}
            >
              <FaLock />
            </span> */}
            <span className="ou-icon down">
              <FaCaretDown />
            </span>
          </button>
          <div className="ouCenter">
            <span className="player-name">{item.player}</span> over or under{" "}
            <span className="stat-and-line">
              {item.underData?.underLine}{" "}
              {propKeyConversion[item.subType!].toLocaleLowerCase()}
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
            <span className="payoutAndCalc">
              <span className="payout">{item.overData?.overPayout}</span>
              <span className="calcPayout">
                {item.overData?.calcOverPayout}
              </span>
            </span>
            {/* <span
              className={`lock-icon ${
                lockIcon && item.selectedOU === "over" ? "show" : ""
              }`}
            >
              <FaLock />
            </span> */}
          </button>
          {lockPick ? <div className="locked-overlay">Pick is Locked</div> : ""}
        </div>
        <CountdownTimer endDate={item.expiration} setLockPick={setLockPick} />
      </div>
    )
  } else if (item.type === "teamTotals") {
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
            <div className="payoutAndCalc">
              <span className="payout">{item.underData?.underPayout}</span>
              <span className="calcPayout">
                {item.underData?.calcUnderPayout}
              </span>
            </div>
            <span className="overText">Under</span>{" "}
            {/* <span
              className={`lock-icon ${
                lockIcon && item.selectedOU === "under" ? "show" : ""
              }`}
            >
              <FaLock />
            </span> */}
            <span className="ou-icon down">
              <FaCaretDown />
            </span>
          </button>
          <div className="ouCenter">
            <span className="team-name">
              {item.awayTeam} <span className="vs">+</span> {item.homeTeam}
            </span>{" "}
            over or under{" "}
            <span className="stat-and-line">
              {item.overData?.overLine} total points
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
            <span className="overText">Over</span>{" "}
            <div className="payoutAndCalc">
              <span className="payout">{item.overData?.overPayout}</span>
              <span className="calcPayout">
                {item.overData?.calcOverPayout}
              </span>
            </div>
            {/* <span
              className={`lock-icon ${
                lockIcon && item.selectedOU === "over" ? "show" : ""
              }`}
            >
              <FaLock />
            </span> */}
          </button>
          {lockPick ? <div className="locked-overlay">Pick is Locked</div> : ""}
        </div>
        <CountdownTimer endDate={item.expiration} setLockPick={setLockPick} />
      </div>
    )
  } else if (item.type === "teamSpreads") {
    const awayTeam = item.awayData?.awayTeam
    const homeTeam = item.homeData?.homeTeam
    return (
      <>
        {awayTeam && homeTeam && (
          <div className="pick-wrapper">
            <div className="pick-header spread">
              <h2 className="pick-type">SPREAD</h2>
            </div>
            <div className="pick spread">
              <button
                onClick={() => handleSpreadPick(awayTeam, item)}
                className={`ouLeft ${
                  spreadPick === "favorite" ? "active" : ""
                }`}
              >
                <span className="teamName">{formatTeamName(awayTeam)}</span>
                {/* <span
                  className={`lock-icon ${
                    lockIcon && item.awayData?.awayTeam === awayTeam
                      ? "show"
                      : ""
                  }`}
                >
                  <FaLock />
                </span> */}
                <span className="spread-line minus">
                  <span className="payout">{item.awayData?.awayPayout}</span>
                  <span className="spread">
                    {item.awayData?.awayLine && item.awayData.awayLine > 0
                      ? `+${item.awayData?.awayLine}`
                      : item.awayData?.awayLine}
                  </span>
                  <span className="calcPayout">
                    {item.awayData?.calcAwayPayout}
                  </span>
                </span>
              </button>
              <div className="ouCenter">
                <span className="team-name">
                  {awayTeam} <span className="vs">@</span> {homeTeam}
                </span>
              </div>
              <button
                onClick={() => handleSpreadPick(homeTeam, item)}
                className={`ouRight ${
                  spreadPick === "nonFavorite" ? "active" : ""
                }`}
              >
                {formatTeamName(homeTeam)}
                <span
                  className={`lock-icon ${
                    lockIcon && item.homeData?.homeTeam === homeTeam
                      ? "show"
                      : ""
                  }`}
                >
                  <FaLock />
                </span>
                <span className="spread-line plus">
                  <span className="payout">{item.homeData?.homePayout}</span>
                  <span className="spread">
                    {item.homeData?.homeLine && item.homeData.homeLine > 0
                      ? `+${item.homeData?.homeLine}`
                      : item.homeData?.homeLine}
                  </span>
                  <span className="calcPayout">
                    {item.homeData?.calcHomePayout}
                  </span>
                </span>
              </button>
              {lockPick ? (
                <div className="locked-overlay">Pick is Locked</div>
              ) : (
                ""
              )}
            </div>
            <CountdownTimer
              endDate={item.expiration}
              setLockPick={setLockPick}
            />
          </div>
        )}
      </>
    )
  } else {
    return <div className="pick wrong">Incorrect Format</div>
  }
}
