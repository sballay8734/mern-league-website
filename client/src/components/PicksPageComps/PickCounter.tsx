import { useSelector } from "react-redux"

import { RootState } from "../../redux/store"
import { PropToDbInterface } from "../BettingPropSpreads"

interface PicksProps {
  propData: PropToDbInterface[] | undefined
}

export default function PickCounter({ propData }: PicksProps): JSX.Element {
  const pickIds = useSelector((state: RootState) => state.picksSlice.pickIds)
  const picksToMake = propData ? propData.length : 0

  return (
    <div
      className={`counter ${pickIds.length === picksToMake ? "complete" : ""}`}
    >
      Picks Made:{" "}
      <span className="pick-split">
        {pickIds.length}/{picksToMake}
      </span>
    </div>
  )
}
