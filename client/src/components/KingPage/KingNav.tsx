import { useSelector, useDispatch } from "react-redux"
import { setActiveButton, setCurrentYear } from "../../redux/king/kingSlice"
import { RootState } from "../../redux/store"
import { getCurrentYear } from "../../pages/KothPage/helpers"
import { useEffect } from "react"

export default function KingNav() {
  const dispatch = useDispatch()
  const activeButton = useSelector(
    (state: RootState) => state.kingSlice.activeButton
  )

  function handleShowStandings() {
    dispatch(setActiveButton("standings"))
    dispatch(setCurrentYear(getCurrentYear()))
  }

  useEffect(() => {
    if (activeButton === "standings") {
      const newCurrentYear = getCurrentYear()
      setCurrentYear(newCurrentYear)
    }
  }, [])

  return (
    <nav className="king-nav">
      <ul>
        <li>
          <button
            className={`${activeButton === "standings" ? "active" : ""}`}
            onClick={handleShowStandings}
          >
            Standings (Cur. Year)
          </button>
        </li>
        <li className="spacer"></li>
        <li>
          <button
            className={`${activeButton === "history" ? "active" : ""}`}
            onClick={() => dispatch(setActiveButton("history"))}
          >
            History
          </button>
        </li>
      </ul>
    </nav>
  )
}
