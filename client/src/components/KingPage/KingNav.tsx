import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setActiveYear } from "../../redux/king/kingSlice"
import { RootState } from "../../redux/store"
import { FaCaretDown } from "react-icons/fa"

const kingYears: string[] = ["2022", "2023", "2024"]

export default function KingNav() {
  const dispatch = useDispatch()
  const activeYear = useSelector(
    (state: RootState) => state.kingSlice.activeYear
  )
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  function handleYearSelect(year: string) {
    dispatch(setActiveYear(year))
    setShowDropdown(!showDropdown)
  }

  return (
    <nav className="king-nav">
      <ul>
        <li>
          <div className={`dropdown-header`}>
            <div className="standings">
              <div className="standings-text">Standings</div>
              <div className="dropdown-wrapper">
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="year-selector"
                >
                  {activeYear} <FaCaretDown />
                </div>
                <div className={`year-dropdown ${showDropdown ? "show" : ""}`}>
                  {kingYears.map((year) => {
                    return (
                      <button
                        key={year}
                        className="year-button"
                        onClick={() => handleYearSelect(year)}
                      >
                        {year}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  )
}
