import ChallengeCard from "./ChallengeCard";
import { IChallenge } from "../../types/challenges";

interface ActiveChallengesProps {
  activeChallenges: IChallenge[];
  refetch: () => void;
}

export default function ActiveChallenges({
  activeChallenges,
  refetch,
}: ActiveChallengesProps) {
  // TODO: Needs to be refactored to use IDs and NOT names
  const sortedChallenges = activeChallenges.sort((a, b) => {
    // Compare the acceptor names
    const acceptorAId = a.acceptorId;
    const acceptorBId = b.acceptorId;

    // Non-empty acceptor names should come first
    if (acceptorAId !== "" && acceptorBId === "") {
      return -1;
    } else if (acceptorAId === "" && acceptorBId !== "") {
      return 1;
    }

    // If both acceptor names are empty or non-empty, use default sorting
    return acceptorAId.localeCompare(acceptorBId);
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
              refetch={refetch}
            />
          );
        })}
    </div>
  );
}
