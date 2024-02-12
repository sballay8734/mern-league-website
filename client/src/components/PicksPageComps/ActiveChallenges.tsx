import ChallengeCard from "./ChallengeCard";
import { IChallenge } from "../../types/challenges";

interface ActiveChallengesProps {
  activeChallenges: IChallenge[];
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
