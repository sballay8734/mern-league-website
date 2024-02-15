import { useSelector } from "react-redux";

import { IChallenge } from "../../types/challenges";
import { RootState } from "../../redux/store";
import { formatTeamName, formatOwnerName } from "../../utils/Formatting";

interface ChallengeCardProps {
  challenge: IChallenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const user = useSelector((state: RootState) => state.user.user);

  function handleOpponentName() {
    if (challenge.acceptorName === "") {
      return "Not Accepted";
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

  const opponentName = handleOpponentName();
  const yourSelection = handlePropSelection();

  return (
    // if (challenge.type === "playerProp" || challenge.type === "teamTotals")

    <article className="w-full rounded-sm border-[1px] border-sky-500">
      <div className="flex w-full flex-col items-center">
        <h2 className="w-full bg-[#101010] py-1 text-center text-sm text-[#f03ff9]">
          {challenge.propTitle}
        </h2>
        <div className="flex w-full">
          <div className="flex w-full flex-col">
            <h2 className="bg-slate-800 py-1 text-center text-xs">Opponent</h2>
            <p className="justify-center py-2 text-center text-xs">
              {challenge.acceptorName === ""
                ? opponentName
                : opponentName && formatOwnerName(opponentName)}
            </p>
          </div>
          <div className="flex w-full max-w-16 flex-col">
            <h2 className="bg-slate-800 py-1 text-center text-xs">Wager</h2>
            <p className="justify-center py-2 text-center text-xs font-semibold text-green-500">
              ${challenge.wagerAmount}
            </p>
          </div>
          <div className="flex w-full max-w-14 flex-col">
            <h2 className="bg-slate-800 py-1 text-center text-xs">Line</h2>
            <p className="justify-center py-2 text-center text-xs font-semibold text-yellow-500">
              {challenge.line}
            </p>
          </div>
          <div className="flex w-full flex-col">
            <h2 className="bg-slate-800 py-1 text-center text-xs">You Chose</h2>
            <p
              className={`justify-center py-2 text-center text-xs ${yourSelection === "over" ? "bg-green-950 text-green-500" : yourSelection === "under" ? "bg-red-950 text-red-500" : "text-blue-500"}`}
            >
              {yourSelection && formatTeamName(yourSelection)}
            </p>
          </div>
        </div>
      </div>
    </article>

    // else ...
  );
}
