import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import { RootState } from "../../redux/store"
import { setActiveFilter } from "../../redux/owners/compareSlice"
import AllTimeCombined from "./AllTimeCategories/AllTimeCombined"
import AllTimePlayoffs from "./AllTimeCategories/AllTimePlayoffs"
import AllTimeRegSzn from "./AllTimeCategories/AllTimeRegSzn"

export default function AllTimeContent() {
  const dispatch = useDispatch()

  // EXTRACT THESE INTO OWN COMPONENT
  const activeFilter = useSelector(
    (state: RootState) => state.compare.activeFilter
  )

  console.log("Rendering All-Time Content...")

  return (
    <div className="compare-all-time">
      <nav className="h2h-nav">
        <ul>
          <li>
            <button
              onClick={() => dispatch(setActiveFilter("combined"))}
              className={`${activeFilter === "combined" ? "active" : ""}`}
            >
              Combined
            </button>
          </li>
          <li>
            <button
              onClick={() => dispatch(setActiveFilter("regszn"))}
              className={`${activeFilter === "regszn" ? "active" : ""}`}
            >
              RegSzn
            </button>
          </li>
          <li>
            <button
              onClick={() => dispatch(setActiveFilter("playoffs"))}
              className={`${activeFilter === "playoffs" ? "active" : ""}`}
            >
              Playoffs
            </button>
          </li>
        </ul>
      </nav>
      {activeFilter === "regszn" ? (
        <AllTimeRegSzn />
      ) : activeFilter === "playoffs" ? (
        <AllTimePlayoffs />
      ) : activeFilter === "combined" ? (
        <AllTimeCombined />
      ) : (
        <div>Error</div>
      )}
    </div>
  )
}
