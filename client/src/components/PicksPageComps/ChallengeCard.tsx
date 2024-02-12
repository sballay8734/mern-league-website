import { IChallenge } from "../../types/challenges";

interface ChallengeCardProps {
  challenge: IChallenge;
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
