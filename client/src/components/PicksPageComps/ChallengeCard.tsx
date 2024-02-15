import { useSelector } from "react-redux";

import { IChallenge } from "../../types/challenges";
import { RootState } from "../../redux/store";
import { formatTeamName, formatOwnerName } from "../../utils/Formatting";
import CountdownTimerNoLock from "../CountDownTimer/CountDownTimerNoLock";

interface ChallengeCardProps {
  challenge: IChallenge;
  index: number;
}

export default function ChallengeCard({
  challenge,
  index,
}: ChallengeCardProps) {
  const user = useSelector((state: RootState) => state.user.user);

  function handleOpponentName() {
    if (challenge.acceptorName === "") {
      return "Unaccepted";
    }

    if (user && challenge.acceptorName === user.fullName) {
      return challenge.challengerName;
    }

    if (user && challenge.challengerName === user.fullName) {
      return challenge.acceptorName;
    }
  }
  function handlePropSelection() {
    if (user && challenge.acceptorName === user.fullName) {
      return challenge.acceptorSelection;
    }

    if (user && challenge.challengerName === user.fullName) {
      return challenge.challengerSelection;
    }
  }

  const unacceptedChallengeExpired =
    new Date(challenge.gameStart) <= new Date() &&
    challenge.acceptorName === "";
  const challengeWithdrawable = new Date(challenge.gameStart) >= new Date();
  const opponentName = handleOpponentName();
  const yourSelection = handlePropSelection();

  console.log(challengeWithdrawable, challenge.gameStart);

  return (
    // if (challenge.type === "playerProp" || challenge.type === "teamTotals")

    <article
      className={`w-full ${challenge.acceptorName === "" ? "rounded-sm border-[1px] border-[#2a2a2a]" : "rounded-sm border-[1px] border-[#b1b1b1]"} ${unacceptedChallengeExpired ? "hidden" : ""}`}
    >
      <div
        className={`flex w-full flex-col items-center ${challenge.acceptorName === "" ? "opacity-40" : ""}`}
      >
        <h2 className="flex w-full items-center justify-between bg-[#0b0b0b] px-[5px] py-[5px] text-xs font-semibold text-[#f03ff9]">
          <span className="ml-1 text-slate-600">{index + 1}</span>
          <span
            className={`ml-2 mr-auto rounded-sm border-[1px] border-gray-600 px-1 py-[1px] text-[10px] font-bold ${challenge.league === "nhl" && "bg-blue-950 text-blue-500"} ${challenge.league === "nfl" && "bg-green-950 text-green-500"} ${challenge.league === "nba" && "bg-orange-950 text-orange-500"}`}
          >
            {challenge.league.toLocaleUpperCase()}
          </span>
          <span
            className={`rounded-sm border-[1px] border-gray-600 px-1 py-[1px] text-xs font-bold ${challenge.league === "nhl" && "bg-blue-950 text-blue-500"} ${challenge.league === "nfl" && "bg-green-950 text-green-500"} ${challenge.league === "nba" && "bg-orange-950 text-orange-500"}`}
          >
            {challenge.propTitle}
          </span>
        </h2>
        <div className="flex w-full">
          <div className="flex w-full flex-col">
            <h2 className="bg-slate-800 py-1 text-center text-xs">Opponent</h2>
            <p
              className={`justify-center bg-black py-2 text-center text-xs ${challenge.acceptorName === "" ? "text-gray-500" : "font-semibold text-green-500"}`}
            >
              {challenge.acceptorName === ""
                ? opponentName
                : opponentName && formatOwnerName(opponentName)}
            </p>
          </div>
          <div className="flex w-full max-w-16 flex-col">
            <h2 className="bg-slate-800 py-1 text-center text-xs">Wager</h2>
            <p className="justify-center bg-[#051d06] py-2 text-center text-xs font-semibold text-green-500">
              ${challenge.wagerAmount}
            </p>
          </div>
          <div className="flex w-full max-w-14 flex-col">
            <h2 className="bg-slate-800 py-1 text-center text-xs">Line</h2>
            <p className="justify-center bg-[#1b1c05] py-2 text-center text-xs font-semibold text-yellow-500">
              {challenge.line}
            </p>
          </div>
          <div className="flex w-full flex-col">
            <h2 className="bg-slate-800 py-1 text-center text-xs">
              Your Choice
            </h2>
            <p
              className={`justify-center bg-black py-2 text-center text-xs font-semibold ${yourSelection === "over" ? " text-green-500" : yourSelection === "under" ? " text-red-500" : "text-blue-500"}`}
            >
              {yourSelection &&
                formatTeamName(yourSelection).toLocaleUpperCase()}
            </p>
          </div>
        </div>
      </div>
      <button
        className={`relative flex w-full items-center justify-center bg-[#1f1010] py-2 text-center text-red-500`}
      >
        {challengeWithdrawable ? (
          <span className="font-semibold">Withdraw</span>
        ) : (
          ""
        )}
        <span className="text-[12px]">
          <CountdownTimerNoLock endDate={challenge.gameStart} />
        </span>
      </button>
    </article>
  );
}
