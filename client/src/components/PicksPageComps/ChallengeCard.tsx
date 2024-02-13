import { useSelector } from "react-redux";

import { IChallenge } from "../../types/challenges";
import { RootState } from "../../redux/store";

interface ChallengeCardProps {
  challenge: IChallenge;
}

// YOU CAN REMOVE THIS INTERFACE, IT IS JUST FOR REFERENCE
export interface ZChallenge {
  challengerId: string;
  acceptorId: string;
  challengerName: string;
  acceptorName: string;
  challengerSelection: string;
  acceptorSelection: string;
  wagerAmount: number;
  gameId: string;
  propId: string;
  dateProposed: string;
  dateAccepted: string;
  type: string;
  result: string;
  homeData?: {
    homeTeam: string;
    homeLine: number;
    homePayout: number;
    calcHomePayout: number;
  };
  awayData?: {
    awayTeam: string;
    awayLine: number;
    awayPayout: number;
    calcAwayPayout: number;
  };
  overData?: {
    overLine: number;
    overPayout: number;
    calcOverPayout: number;
  };
  underData?: {
    underLine: number;
    underPayout: number;
    calcUnderPayout: number;
  };
  _id: string;
  // Still need playerName?, homeTeam, awayTeam, line, payout(MAYBE?)

  voided: boolean;
}

// Opponent Name
// Your Selection
// Wager Amount
// Prop details (Patrick Mahomes Passing Yards)
// Line

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const user = useSelector((state: RootState) => state.user.user);

  function handleOpponentName() {
    if (challenge.acceptorName === "") return <>Not Accepted</>;

    if (user && challenge.acceptorName === user.fullName) {
      return <>{challenge.challengerName}</>;
    }

    if (user && challenge.challengerName === user.fullName) {
      return <>{challenge.acceptorName}</>;
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
          Patrick Mahomes Passing Yards
        </h2>
        <div className="flex w-full">
          <div className="flex w-full flex-col">
            <h2 className="bg-slate-800 py-1 text-center text-xs">Opponent</h2>
            <p className="justify-center py-2 text-center text-xs">
              {opponentName}
            </p>
          </div>
          <div className="flex w-full flex-col">
            <h2 className="bg-slate-800 py-1 text-center text-xs">Wager</h2>
            <p className="justify-center py-2 text-center text-xs font-semibold text-green-500">
              ${challenge.wagerAmount}
            </p>
          </div>
          <div className="flex w-full flex-col">
            <h2 className="bg-slate-800 py-1 text-center text-xs">Line</h2>
            <p className="justify-center py-2 text-center text-xs font-semibold text-yellow-500">
              313
            </p>
          </div>
          <div className="flex w-full flex-col">
            <h2 className="bg-slate-800 py-1 text-center text-xs">You Chose</h2>
            <p
              className={`justify-center py-2 text-center text-xs ${yourSelection === "over" ? "bg-green-950 text-green-500" : yourSelection === "under" ? "bg-red-950 text-red-500" : "text-blue-500"}`}
            >
              {yourSelection?.toLocaleUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </article>

    // else ...
  );
}
