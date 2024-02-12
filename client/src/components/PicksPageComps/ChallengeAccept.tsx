import { useState } from "react"
import { PropToDbInterface } from "../BettingPropSpreads"
import { Challenge, removeChallenge } from "../../redux/props/picksSlice"
import { useDispatch } from "react-redux"

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

interface ChallengeAcceptProps {
  challenge: Challenge
  item: PropToDbInterface
  user: User
  handleShowChallenges: () => void
}

export default function ChallengeAccept({
  challenge,
  item,
  user,
  handleShowChallenges
}: ChallengeAcceptProps) {
  const dispatch = useDispatch()
  const [verifyAcceptance, setVerifyAcceptance] = useState<boolean>(false)

  function formatOwnerName(str: string) {
    return (
      str.split(" ")[0] +
      " " +
      str.split(" ")[1].charAt(0).toLocaleUpperCase() +
      "."
    )
  }

  function formatTeamName(teamName: string) {
    const splitTeam = teamName.split(" ")
    const formattedTeam = splitTeam[splitTeam.length - 1]

    return formattedTeam
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

    const challengeToRemove = {
      acceptorName: acceptorName,
      challengeId: challengeId,
      propId: uniqueId,
      acceptorId: user._id
    }

    dispatch(removeChallenge(challengeToRemove))

    handleShowChallenges()

    // Might need this?
    // refetch()
  }

  return (
    <div className="challenge-wrapper" key={challenge._id}>
      <p className="challenge-details">
        <span className="challengerName">
          {formatOwnerName(challenge.challengerName)}
        </span>{" "}
        <span className="challenge-word">bet</span>
        <span className="challengerWager">${challenge.wagerAmount}</span>
        <span className="challenge-word">on</span>{" "}
        <span className="challenge-word">the</span>
        <span className="challengerSelection">
          {item.homeData && challenge.challengerSelection === "home"
            ? formatTeamName(item.homeData.homeTeam)
            : item.awayData && challenge.challengerSelection === "away"
            ? formatTeamName(item.awayData.awayTeam)
            : challenge.challengerSelection}
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
              {item.awayData && challenge.challengerSelection === "home"
                ? formatTeamName(item.awayData?.awayTeam)
                : item.homeData && challenge.challengerSelection === "away"
                ? formatTeamName(item.homeData.homeTeam)
                : challenge.challengerSelection === "under"
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
            <button className="deny" onClick={() => setVerifyAcceptance(false)}>
              Just Kidding
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
