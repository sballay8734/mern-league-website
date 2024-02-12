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
  _id: string;

  voided: boolean;
}

interface completedChallengesProps {
  completedChallenges: Challenge[];
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
