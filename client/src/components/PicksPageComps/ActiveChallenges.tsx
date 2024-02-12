import ChallengeCard from "./ChallengeCard";

interface Challenge {
  challengerId: string;
  acceptorId: string;
  challengerName: string;
  acceptorName: string;
  challengerSelection: string; // "over" | "under" | "away" | "home"
  acceptorSelection: string; // "over" | "under" | "away" | "home"
  wagerAmount: number;
  gameId: string;
  propId: string;
  dateProposed: string;
  dateAccepted: string;
  type: string;
  _id: string;

  voided: boolean;
}

interface ActiveChallengesProps {
  activeChallenges: Challenge[];
}

export default function ActiveChallenges({
  activeChallenges,
}: ActiveChallengesProps) {
  return (
    <div>
      {activeChallenges &&
        activeChallenges.map((challenge) => {
          return <ChallengeCard key={challenge._id} challenge={challenge} />;
        })}
    </div>
  );
}
