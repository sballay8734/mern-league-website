import { useSelector } from "react-redux";
import { useState } from "react";

import { RootState } from "../../redux/store";
import { useFetchChallengesByUserQuery } from "../../redux/props/propsApi";
import ActiveChallenges from "./ActiveChallenges";
import CompletedChallenges from "./CompletedChallenges";
import ChallengeSummary from "./ChallengeSummary";

export default function ChallengeHistory() {
  // Need to pass userId here and add separate query here:
  const user = useSelector((state: RootState) => state.user.user);
  const [activeFilter, setActiveFilter] = useState<string>("active");

  if (!user) {
    return <div>No user</div>;
  }
  const { data: challenges } = useFetchChallengesByUserQuery(user._id);

  const activeChallenges = challenges
    ? challenges.filter((challenge) => {
        return challenge.result === "";
      })
    : [];

  const completedChallenges = challenges
    ? challenges.filter((challenge) => {
        return challenge.result !== "";
      })
    : [];

  console.log("ACTIVE:", activeChallenges);
  console.log("COMPLETE:", completedChallenges);

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
      <section className="h-full w-full text-white">
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
