import { useEffect } from "react";
import { useFetchUnsubmittedPropCountQuery } from "../../redux/props/propsApi";

interface UnseenPropsProps {
  classes: string;
}

export default function UnseenProps({ classes }: UnseenPropsProps) {
  const { data: unseenPropCount, refetch: refetchPropCount } =
    useFetchUnsubmittedPropCountQuery();

  useEffect(() => {
    refetchPropCount();
  }, []);

  if (unseenPropCount && unseenPropCount > 0) {
    return (
      <div className={classes}>
        <span className="text-center align-middle font-bold">
          {unseenPropCount}
        </span>
      </div>
    );
  } else {
    return null;
  }
}
