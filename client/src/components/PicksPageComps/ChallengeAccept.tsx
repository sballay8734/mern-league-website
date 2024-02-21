import { useState } from "react";
import { useDispatch } from "react-redux";

import { PropToDbInterface } from "../BettingPropSpreads";
import { removeChallenge } from "../../redux/props/picksSlice";
import { PropChallenge } from "../../types/challenges";
import { formatOwnerName, formatTeamName } from "../../utils/Formatting";
import { setRequest } from "../../redux/requests/requestSlice";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastInitial: string;
  avatar: string;
  preferredTheme: string;
  isAdmin: boolean;
  isCommissioner: boolean;
  fullName: string;
}

interface ChallengeAcceptProps {
  challenge: PropChallenge;
  item: PropToDbInterface;
  user: User;
  handleShowChallenges: () => void;
}

export default function ChallengeAccept({
  challenge,
  item,
  user,
  handleShowChallenges,
}: ChallengeAcceptProps) {
  const dispatch = useDispatch();
  const [verifyAcceptance, setVerifyAcceptance] = useState<boolean>(false);

  async function handleAcceptChallenge(challenge: PropChallenge) {
    const gameId = item.gameId;
    const uniqueId = item.uniqueId;
    const acceptorName = user.fullName;
    const challengeId = challenge._id;
    const challengerName = challenge.challengerName;

    if (acceptorName === challengerName) {
      dispatch(
        setRequest({
          result: "fail",
          message: "You cannot accept your own challenge",
          showStatus: true,
        }),
      );
      setTimeout(() => {
        dispatch(
          setRequest({
            message: "You cannot accept your own challenge",
            result: "fail",
            showStatus: false,
          }),
        );
      }, 2000);
      return;
    }

    const res = await fetch("/api/props/accept-challenge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameId: gameId,
        uniqueId: uniqueId,
        acceptorName: acceptorName,
        challengeId: challengeId,
        challengerName: challengerName,
      }),
    });

    const data = await res.json();

    if (!data) {
      console.log("ERROR");
      return;
    }

    const challengeToRemove = {
      acceptorName: acceptorName,
      challengeId: challengeId,
      propId: uniqueId,
      acceptorId: user._id,
    };

    dispatch(removeChallenge(challengeToRemove));

    handleShowChallenges();

    // Might need this?
    // refetch()
  }

  console.log(item.homeData?.homeTeam, challenge.challengerSelection);

  return (
    <>
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
            {item.homeData &&
            challenge.challengerSelection === item.homeData.homeTeam
              ? formatTeamName(item.homeData.homeTeam)
              : item.awayData &&
                  challenge.challengerSelection === item.awayData.awayTeam
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
      <div className="challenge-action">
        <button onClick={handleShowChallenges} className="cancel-challenge">
          Cancel
        </button>
      </div>
    </>
  );
}
