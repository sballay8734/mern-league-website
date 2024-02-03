// Need locks to appear when successful database write
// Lock pick when timer is up

import { useEffect, useState } from "react"

import { FaCaretDown } from "react-icons/fa"
import { FaCaretUp } from "react-icons/fa"
import { FaLock } from "react-icons/fa"
import CountdownTimer from "../CountDownTimer/CountDownTimer"
import { propKeyConversion } from "../utils"
// import { PropToDbInterface } from "../BettingPropSpreads"
interface User {
  _id: string
  email: string
  firstName: string
  lastInitial: string
  avatar: string
  preferredTheme: string
  isAdmin: boolean
  isCommissioner: boolean
  fullName: string
}

interface Challenge {
  challengerName: string
  acceptorName: string
  challengerSelection: string // "over" | "under" | "away" | "home"
  acceptorSelection: string // "over" | "under" | "away" | "home"
  wagerAmount: number
  _id: string

  void: boolean
}

interface PickCardProps {
  item: PropToDbInterface
  picksMade: string[]
  user: User
  setPicksMade: React.Dispatch<React.SetStateAction<string[]>>
  setTriggerRefetch: (type: boolean) => void
  triggerRefetch: boolean
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
  _id: string

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

  challenges: Challenge[] | []
}

export default function PickCard({
  item,
  picksMade,
  user,
  setPicksMade,
  setTriggerRefetch,
  triggerRefetch
}: PickCardProps) {
  const [overOrUnder, setOverOrUnder] = useState<string | null>(null)
  const [spreadPick, setSpreadPick] = useState<string | null>(null)
  const [lockIcon, setLockIcon] = useState<boolean>(false)
  const [lockPick, setLockPick] = useState<boolean>(false)
  const [showChallenges, setShowChallenges] = useState<boolean>(false)
  const [showCreate, setShowCreate] = useState<boolean>(false)

  const [challengeSelection, setChallengeSelection] = useState<string>("")
  const [wager, setWager] = useState<string>("")
  const [formValid, setFormValid] = useState<boolean>(false)
  const [verifyAcceptance, setVerifyAcceptance] = useState<boolean>(false)

  async function handleUnderClick(item: PropToDbInterface) {
    // if under is already selected or pick is locked
    if (overOrUnder === "under") return
    if (lockPick) return

    // remove lock icon in case update fails
    setLockIcon(false)

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

    setOverOrUnder("under")
    setLockIcon(true)

    // HERE (Below)
    if (picksMade.includes(item.uniqueId)) {
      setTriggerRefetch(!triggerRefetch)
      return
    }
    setPicksMade((prevPicksMade) => [...prevPicksMade, item.uniqueId])
  }

  async function handleOverClick(item: PropToDbInterface) {
    // if over is already selected or pick is locked
    if (overOrUnder === "over") return
    if (lockPick) return

    // remove lock icon in case update fails
    setLockIcon(false)

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

    setOverOrUnder("over")
    setLockIcon(true)

    if (picksMade.includes(item.uniqueId)) {
      setTriggerRefetch(!triggerRefetch)
      return
    }
    setPicksMade((prevPicksMade) => [...prevPicksMade, item.uniqueId])
  }

  async function handleSpreadPick(team: string, item: PropToDbInterface) {
    // if you already selected that team or the pick is locked

    if (spreadPick === team) return
    if (lockPick) return

    setLockIcon(false)

    const res = await fetch("/api/props/update-prop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prop: item, action: team })
    })

    const data = await res.json()

    if (!data) {
      console.log("no data")
      return
    }

    setSpreadPick(team)
    setLockIcon(true)

    if (picksMade.includes(item.uniqueId)) {
      setTriggerRefetch(!triggerRefetch)
      return
    }
    setPicksMade((prevPicksMade) => [...prevPicksMade, item.uniqueId])
  }

  function formatTeamName(teamName: string) {
    return teamName.split(" ")[0].charAt(0) + teamName.split(" ")[1].charAt(0)
  }

  function initializePick() {
    setLockIcon(false)
    setOverOrUnder(null)
    setSpreadPick(null)

    if (item.type === "playerProp" || item.type === "teamTotals") {
      if (item.overSelections?.includes(user.fullName)) {
        setOverOrUnder("over")
        setLockIcon(true)
        return
      } else if (item.underSelections?.includes(user.fullName)) {
        setOverOrUnder("under")
        setLockIcon(true)
        return
      } else {
        return
      }
    } else if (item.type === "teamSpreads") {
      if (!item.homeData?.homeTeam || !item.awayData?.awayTeam) return

      if (item.homeLineSelections?.includes(user.fullName)) {
        setSpreadPick(item.homeData?.homeTeam)
        setLockIcon(true)
        return
      } else if (item.awayLineSelections?.includes(user.fullName)) {
        setSpreadPick(item.awayData?.awayTeam)
        setLockIcon(true)
        return
      } else {
        return
      }
    } else {
      console.log("SOMETHING WENT WRONG")
      return
    }
  }

  function handleShowCreateChallenge() {
    if (showChallenges === true) {
      setShowChallenges(false)
    }
    setShowCreate(!showCreate)
  }

  function handleShowChallenges() {
    if (showCreate === true) {
      setShowCreate(false)
    }
    setShowChallenges(!showChallenges)
  }

  function handleChallengeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.toString().length === 5) return

    const isValidInput = /^(?!0\d*$)\d{0,5}$/.test(e.target.value)

    if (!isValidInput) {
      // If the input does not match the pattern, ignore the change
      return
    }

    setWager(e.target.value)

    if (
      (challengeSelection === "over" || challengeSelection === "under") &&
      e.target.value.length > 0
    ) {
      setFormValid(true)
      return
    }
    setFormValid(false)
  }

  function handleChallengeSelection(str: string) {
    setChallengeSelection(() => {
      if ((str === "over" || str === "under") && wager.toString().length > 0) {
        setFormValid(true)
      } else {
        setFormValid(false)
      }

      return str
    })
  }

  function handleClearChallenge() {
    setChallengeSelection("")
    setWager("")
    setFormValid(false)
    setShowCreate(false)
  }

  async function submitChallenge() {
    const challenge = {
      challengerName: user.fullName,
      challengerSelection: challengeSelection,
      acceptorName: "",
      acceptorSelection: challengeSelection === "under" ? "over" : "under",
      wagerAmount: Number(wager),
      void: false
    }

    const gameId = item.gameId
    const uniqueId = item.uniqueId
    console.log(uniqueId)

    const res = await fetch("/api/props/add-challenge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameId: gameId,
        uniqueId: uniqueId,
        challenge: challenge
      })
    })

    const data = await res.json()

    if (!data) {
      console.log("ERROR")
      return
    }

    console.log("Triggering Refetch")
    setTriggerRefetch(!triggerRefetch)
    handleClearChallenge()
  }

  function formatOwnerName(str: string) {
    return (
      str.split(" ")[0] +
      " " +
      str.split(" ")[1].charAt(0).toLocaleUpperCase() +
      "."
    )
  }

  async function handleAcceptChallenge(challenge: Challenge) {
    const gameId = item.gameId
    const uniqueId = item.uniqueId
    const acceptorName = user.fullName
    const challengeId = challenge._id
    const challengerName = challenge.challengerName

    if (acceptorName === challengerName) {
      return
    }

    const res = await fetch("/api/props/accept-challenge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameId: gameId,
        uniqueId: uniqueId,
        acceptorName: acceptorName,
        challengeId: challengeId,
        challengerName: challengerName
      })
    })

    const data = await res.json()

    if (!data) {
      console.log("ERROR")
      return
    }

    setTriggerRefetch(!triggerRefetch)
  }

  const filteredChallenges = item.challenges.filter((challenge) => {
    return challenge.acceptorName === ""
  })

  useEffect(() => {
    initializePick()
  }, [])

  if (item.type === "playerProp") {
    return (
      <div className="pick-wrapper">
        <div className="pick-header">
          <h2 className="pick-type">OVER OR UNDER</h2>
        </div>
        <div className="pick ouPlayer">
          <button
            onClick={() => handleUnderClick(item)}
            className={`ouLeft ${overOrUnder === "under" ? "active" : ""}`}
          >
            Under
            <span
              className={`lock-icon ${
                lockIcon && overOrUnder === "under" ? "show" : ""
              }`}
            >
              <FaLock />
            </span>
            <span className="ou-icon down">
              <FaCaretDown />
            </span>
            <span className="payoutAndCalc">
              <span className="payout">{item.underData?.underPayout}</span>{" "}
              <span className="calcPayout">
                {item.underData?.calcUnderPayout.toFixed(2)}
              </span>
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
            className={`ouRight ${overOrUnder === "over" ? "active" : ""}`}
          >
            <span className="ou-icon up">
              <FaCaretUp />
            </span>
            Over{" "}
            <span className="payoutAndCalc">
              <span className="payout">{item.overData?.overPayout}</span>
              <span className="calcPayout">
                {item.overData?.calcOverPayout.toFixed(2)}
              </span>
            </span>
            <span
              className={`lock-icon ${
                lockIcon && overOrUnder === "over" ? "show" : ""
              }`}
            >
              <FaLock />
            </span>
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
            className={`ouLeft ${overOrUnder === "under" ? "active" : ""}`}
          >
            <span className="overText">Under</span>{" "}
            <span className="ou-icon down">
              <FaCaretDown />
            </span>
            <div className="payoutAndCalc">
              <span className="payout">{item.underData?.underPayout}</span>
              <span className="calcPayout">
                {item.underData?.calcUnderPayout.toFixed(2)}
              </span>
            </div>
            <span
              className={`lock-icon ${
                lockIcon && overOrUnder === "under" ? "show" : ""
              }`}
            >
              <FaLock />
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
            className={`ouRight ${overOrUnder === "over" ? "active" : ""}`}
          >
            <span className="ou-icon up">
              <FaCaretUp />
            </span>
            <span className="overText">Over</span>{" "}
            <div className="payoutAndCalc">
              <span className="payout">{item.overData?.overPayout}</span>
              <span className="calcPayout">
                {item.overData?.calcOverPayout.toFixed(2)}
              </span>
            </div>
            <span
              className={`lock-icon ${
                lockIcon && overOrUnder === "over" ? "show" : ""
              }`}
            >
              <FaLock />
            </span>
          </button>
          {lockPick ? <div className="locked-overlay">Pick is Locked</div> : ""}
        </div>
        <div className="challenges">
          <div className="challenge-btn-wrapper">
            <button
              className={`expand-challenges-btn ${
                filteredChallenges.length === 0 && "disabled"
              }`}
              onClick={handleShowChallenges}
            >
              View Challenges ({filteredChallenges.length})
            </button>
            <button
              className={`create-challenge-btn`}
              onClick={handleShowCreateChallenge}
            >
              Create A Challenge +
            </button>
          </div>
          <div
            className={`challenges-list-and-setter ${
              (showChallenges || showCreate) && "show"
            }`}
          >
            {showCreate && (
              <div className="create-challenge-wrapper">
                <div className="challenges-setter">
                  <div className="selection">
                    <span className="your-selection">Your selection</span>
                    <div className="over-selector selector">
                      <button
                        onClick={() => handleChallengeSelection("over")}
                        className={`button ${
                          challengeSelection === "over" && "active"
                        }`}
                      >
                        Over
                      </button>
                    </div>
                    <div className="under-selector selector">
                      <button
                        onClick={() => handleChallengeSelection("under")}
                        className={`button ${
                          challengeSelection === "under" && "active"
                        }`}
                      >
                        Under
                      </button>
                    </div>
                  </div>
                  <div className="bet">
                    <label htmlFor="wager-amount">
                      Wager<span className="money-sign">$</span>
                    </label>
                    <input
                      value={wager}
                      onChange={handleChallengeChange}
                      type="number"
                      name="wager-amount"
                      id="wager-amount"
                    />
                  </div>
                </div>
                <div className="challenge-action">
                  <button
                    onClick={handleClearChallenge}
                    className="cancel-challenge"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitChallenge}
                    disabled={!formValid}
                    className="submit-challenge"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {showChallenges && (
              <div className="challenges-list">
                {item.challenges &&
                  item.challenges.map((challenge) => {
                    if (challenge.acceptorName !== "") {
                      return null
                    }

                    return (
                      <div className="challenge-wrapper" key={challenge._id}>
                        <p className="challenge-details">
                          <span className="challengerName">
                            {formatOwnerName(challenge.challengerName)}
                          </span>{" "}
                          <span className="challenge-word">bet</span>
                          <span className="challengerWager">
                            ${challenge.wagerAmount}
                          </span>
                          <span className="challenge-word">on</span>{" "}
                          <span className="challenge-word">the</span>
                          <span className="challengerSelection">
                            {challenge.challengerSelection}
                          </span>
                        </p>
                        <div className="accept-btn-wrapper">
                          {!verifyAcceptance ? (
                            <button
                              onClick={() => setVerifyAcceptance(true)}
                              className="accept-challenge-btn"
                            >
                              Accept wager and{" "}
                              <span className="acceptSelection">
                                take the{" "}
                                {challenge.challengerSelection === "under"
                                  ? "over"
                                  : "under"}
                              </span>
                            </button>
                          ) : (
                            <div className="confirm-buttons">
                              <button
                                className="confirm"
                                onClick={() => handleAcceptChallenge(challenge)}
                              >
                                Yes I'm Sure
                              </button>
                              <button
                                className="deny"
                                onClick={() => setVerifyAcceptance(false)}
                              >
                                Just Kidding
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
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
                  spreadPick === `${awayTeam}` ? "active" : ""
                }`}
              >
                <span className="teamName">{formatTeamName(awayTeam)}</span>
                <span
                  className={`lock-icon ${
                    lockIcon && spreadPick === awayTeam ? "show" : ""
                  }`}
                >
                  <FaLock />
                </span>
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
                  spreadPick === `${homeTeam}` ? "active" : ""
                }`}
              >
                {formatTeamName(homeTeam)}
                <span
                  className={`lock-icon ${
                    lockIcon && spreadPick === homeTeam ? "show" : ""
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
