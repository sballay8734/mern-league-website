import { RootState } from "../../redux/store"
import { middleColumnMap } from "./helpers"
import { useSelector } from "react-redux"

export default function MiddleColumn() {
  const activeTimeFrame = useSelector(
    (state: RootState) => state.compare.activeTimeFrame
  )

  return middleColumnMap[activeTimeFrame].map((category) => {
    return (
      <div key={category} className="cell stat stat-one">
        {category}
      </div>
    )
  })
}
