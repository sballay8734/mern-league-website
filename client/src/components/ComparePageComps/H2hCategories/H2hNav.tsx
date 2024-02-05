import { useDispatch, useSelector } from "react-redux"
import { setActiveFilter } from "../../../redux/owners/compareSlice"
import { RootState } from "../../../redux/store"

export default function H2hNav() {
  const dispatch = useDispatch()
  const activeFilter = useSelector(
    (state: RootState) => state.compare.activeFilter
  )
  return (
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
  )
}
