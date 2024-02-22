import { useFetchChallengesByUserQuery } from "../../redux/props/propsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";

import { IoMdFlame } from "react-icons/io";

interface UnseenChallengesProps {
  classes: string;
  action: "accepted" | "unaccepted";
}

export default function UnseenChallenges({
  classes,
  action,
}: UnseenChallengesProps) {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) return null;

  const { data: challenges, refetch } = useFetchChallengesByUserQuery(
    user?._id,
  );

  let filteredChallenges;

  if (action === "accepted") {
    filteredChallenges =
      challenges &&
      challenges.filter((challenge) => {
        return challenge.acceptorId !== "";
      });
  } else if (action === "unaccepted") {
    filteredChallenges =
      challenges &&
      challenges.filter((challenge) => {
        return challenge.acceptorId === "";
      });
  }

  // **************************************************
  // **************************************************
  // **************************************************
  // STYLE THE ACTIVE AND INACTIVE COUNTERS!!
  // **************************************************
  // **************************************************
  // **************************************************

  useEffect(() => {
    refetch();
  }, [challenges]);

  if (filteredChallenges && filteredChallenges.length > 0) {
    return (
      <div className={classes}>
        {action === "accepted" ? (
          <IoMdFlame className={"absolute text-lg text-orange-600"} />
        ) : (
          ""
        )}
        <span className="z-2 absolute top-[4px] text-center align-middle font-bold text-blue-950">
          {filteredChallenges.length}
        </span>
      </div>
    );
  } else {
    return null;
  }
}
