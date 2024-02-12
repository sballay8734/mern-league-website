import { IChallenge } from "../../types/challenges";

interface completedChallengesProps {
  completedChallenges: IChallenge[];
}

export default function CompletedChallenges({
  completedChallenges,
}: completedChallengesProps) {
  return (
    <div>
      {completedChallenges &&
        completedChallenges.map((challenge) => {
          return (
            <div key={challenge._id}>
              {challenge.challengerName} vs. {challenge.acceptorName}
            </div>
          );
        })}
    </div>
  );
}
