import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setActiveTimeFrame } from "../../redux/owners/compareSlice"
import { RootState } from "../../redux/store"

export default function ComparePageTopNav() {
  const dispatch = useDispatch()
  const activeTimeFrame = useSelector(
    (state: RootState) => state.compare.activeTimeFrame
  )

  return (
    <nav className="compare-nav">
      <ul>
        <li>
          <button
            className={`${activeTimeFrame === "allTime" ? "active" : ""}`}
            onClick={() => dispatch(setActiveTimeFrame("allTime"))}
          >
            All-Time
          </button>
        </li>
        <li className="spacer"></li>
        <li>
          <button
            className={`h2h-button ${
              activeTimeFrame === "h2h" ? "active" : ""
            }`}
            onClick={() => dispatch(setActiveTimeFrame("h2h"))}
          >
            <img className="profileImg" src="/vsIcon.png" alt="" />
          </button>
        </li>
        <li className="spacer"></li>
        <li>
          <button
            className={`${activeTimeFrame === "yearly" ? "active" : ""}`}
            onClick={() => dispatch(setActiveTimeFrame("yearly"))}
          >
            Yearly
          </button>
        </li>
      </ul>
    </nav>
  )
}
