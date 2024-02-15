import ChallengeCard from "./ChallengeCard";
import { IChallenge } from "../../types/challenges";

interface ActiveChallengesProps {
  activeChallenges: IChallenge[];
}

export default function ActiveChallenges({
  activeChallenges,
}: ActiveChallengesProps) {
  console.log(activeChallenges);
  return (
    <div className="flex flex-col gap-2">
      {activeChallenges &&
        activeChallenges.map((challenge) => {
          return <ChallengeCard key={challenge._id} challenge={challenge} />;
        })}
    </div>
  );
}
