import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function NotificationCounter() {
  const unseenProposalCount = useSelector(
    (state: RootState) => state.proposlasSlice.unseenCount,
  );

  if (unseenProposalCount > 0) {
    return (
      <div className="absolute right-0 mr-7 flex h-6 w-6 items-center justify-center rounded-full border-[1px] border-red-600 bg-red-800 p-1 text-sm">
        <span className="text-center align-middle font-bold">
          {unseenProposalCount}
        </span>
      </div>
    );
  } else {
    return null;
  }
}
