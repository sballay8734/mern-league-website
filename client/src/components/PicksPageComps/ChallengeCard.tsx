interface Challenge {
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
  _id: string;

  voided: boolean;
}

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  console.log(challenge);
  return (
    // if (challenge.type === "playerProp" || challenge.type === "teamTotals")
    <article>
      {challenge.challengerName} vs. {challenge.acceptorName}
    </article>

    // else ...
  );
}
