import { useSelector } from "react-redux";
import { useState } from "react";

import { RootState } from "../../redux/store";
import { useFetchChallengesByUserQuery } from "../../redux/props/propsApi";
import ActiveChallenges from "./ActiveChallenges";
import CompletedChallenges from "./CompletedChallenges";
import ChallengeSummary from "./ChallengeSummary";
import { IChallenge } from "../../types/challenges";

export default function ChallengeHistory() {
  // Need to pass userId here and add separate query here:
  const user = useSelector((state: RootState) => state.user.user);
  const [activeFilter, setActiveFilter] = useState<string>("active");

  if (!user) {
    return <div>No user</div>;
  }
  const challengesFromState = useSelector(
    (state: RootState) => state.picksSlice.challenges,
  );
  const { data: challenges } = useFetchChallengesByUserQuery(user._id);

  const stateKeys = Object.keys(challengesFromState);
  const stateChallenges = ([] as IChallenge[]).concat(
    ...stateKeys.map((key) => challengesFromState[key]),
  );

  function combineChallenges() {
    const combinedChallenges = [];

    for (let item of stateChallenges) {
      combinedChallenges.push(item);
    }
    for (let challenge of challenges!) {
      if (!combinedChallenges.find((item) => challenge._id === item._id)) {
        combinedChallenges.push(challenge);
      }
    }

    return combinedChallenges;
  }

  const combinedChallenges = challenges && combineChallenges();

  const activeChallenges = combinedChallenges
    ? combinedChallenges.filter((challenge) => {
        return challenge.result === "";
      })
    : [];

  const completedChallenges = combinedChallenges
    ? combinedChallenges.filter((challenge) => {
        return challenge.result !== "";
      })
    : [];

  // console.log(activeChallenges, completedChallenges);

  return (
    <>
      <nav className="flex w-full items-start justify-center pb-4 pt-2">
        <ul className="flex gap-6">
          <li
            className={`font-bold ${activeFilter === "active" ? "text-red-500 transition-colors duration-300" : "text-blue-500 transition-colors duration-300"}`}
          >
            <button onClick={() => setActiveFilter("active")}>Active</button>
          </li>
          <li
            className={`font-bold ${activeFilter === "completed" ? "text-red-500 transition-colors duration-300" : "text-blue-500 transition-colors duration-300"}`}
          >
            <button onClick={() => setActiveFilter("completed")}>
              Completed
            </button>
          </li>
          <li
            className={`font-bold ${activeFilter === "summary" ? "text-red-500 transition-colors duration-300" : "text-blue-500 transition-colors duration-300"}`}
          >
            <button onClick={() => setActiveFilter("summary")}>Summary</button>
          </li>
        </ul>
      </nav>
      <section className="h-full w-full overflow-auto text-white">
        {activeFilter === "active" ? (
          <ActiveChallenges activeChallenges={activeChallenges} />
        ) : activeFilter === "completed" ? (
          <CompletedChallenges completedChallenges={completedChallenges} />
        ) : (
          <ChallengeSummary />
        )}
      </section>
    </>
  );
}
