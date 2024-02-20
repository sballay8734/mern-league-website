import { useFetchUnsubmittedPropCountQuery } from "../../redux/props/propsApi";

interface UnseenPropsProps {
  classes: string;
}

export default function UnseenProps({ classes }: UnseenPropsProps) {
  const { data: unseenPropCount, refetch: refetchPropCount } =
    useFetchUnsubmittedPropCountQuery();

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

// <div className="absolute right-1 top-1 flex h-3 w-3 items-center justify-center rounded-full border-[1px] border-red-800 bg-red-500 text-center text-[10px]">
