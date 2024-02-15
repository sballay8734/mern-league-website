import ChallengeCard from "./ChallengeCard";
import { IChallenge } from "../../types/challenges";

interface ActiveChallengesProps {
  activeChallenges: IChallenge[];
}

export default function ActiveChallenges({
  activeChallenges,
}: ActiveChallengesProps) {
  const sortedChallenges = activeChallenges.sort((a, b) => {
    // Compare the acceptor names
    const acceptorNameA = a.acceptorName.toLowerCase();
    const acceptorNameB = b.acceptorName.toLowerCase();

    // Non-empty acceptor names should come first
    if (acceptorNameA !== "" && acceptorNameB === "") {
      return -1;
    } else if (acceptorNameA === "" && acceptorNameB !== "") {
      return 1;
    }

    // If both acceptor names are empty or non-empty, use default sorting
    return acceptorNameA.localeCompare(acceptorNameB);
  });

  return (
    <div className="flex flex-col gap-2">
      {sortedChallenges &&
        sortedChallenges.map((challenge, index) => {
          return (
            <ChallengeCard
              key={challenge._id}
              challenge={challenge}
              index={index}
            />
          );
        })}
    </div>
  );
}
