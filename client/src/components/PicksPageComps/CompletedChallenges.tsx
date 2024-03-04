import { IChallenge } from "../../types/challenges";

interface completedChallengesProps {
  completedChallenges: IChallenge[];
}

export default function CompletedChallenges({
  completedChallenges,
}: completedChallengesProps) {
  return (
    <div className="flex h-full items-center justify-center">
      You have no completed challenges
      {/* {completedChallenges &&
        completedChallenges.map((challenge) => {
          return (
            <div key={challenge._id}>
              {challenge.challengerName} vs. {challenge.acceptorName}
            </div>
          );
        })} */}
    </div>
  );
}
