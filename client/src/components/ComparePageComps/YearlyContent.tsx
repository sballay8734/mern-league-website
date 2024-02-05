import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import { RootState } from "../../redux/store"
import { setActiveFilter, setActiveYear } from "../../redux/owners/compareSlice"
import { StaticOwner } from "../../types/StaticOwner"
import { FaAngleDoubleDown, FaAngleDoubleLeft } from "react-icons/fa"
import YearlyCombined from "./YearlyCategories/YearlyCombined"
import YearlyRegSzn from "./YearlyCategories/YearlyRegSzn"
import YearlyPlayoffs from "./YearlyCategories/YearlyPlayoffs"

interface YearlyContentProps {
  data: StaticOwner[]
}

export default function YearlyContent({ data }: YearlyContentProps) {
  const dispatch = useDispatch()
  const { ownerOne, ownerTwo } = useSelector(
    (state: RootState) => state.compare
  )
  const activeYear = useSelector((state: RootState) => state.compare.activeYear)
  const activeFilter = useSelector(
    (state: RootState) => state.compare.activeFilter
  )
  const [showYearDropdown, setShowYearDropdown] = useState<boolean>(false)

  console.log("Rendering Yearly Content...")

  function handleYearSelect(year: string) {
    setShowYearDropdown(false)
    dispatch(setActiveYear(year))
  }

  useEffect(() => {}, [ownerOne, ownerTwo])

  return (
    <div className="compare-yearly">
      <nav className="compare-nav-secondary">
        <div className="filter-buttons">
          <button
            onClick={() => dispatch(setActiveFilter("combined"))}
            className={`${activeFilter === "combined" ? "active" : ""}`}
          >
            C
          </button>
          <button
            onClick={() => dispatch(setActiveFilter("regszn"))}
            className={`${activeFilter === "regszn" ? "active" : ""}`}
          >
            RS
          </button>
          <button
            onClick={() => dispatch(setActiveFilter("playoffs"))}
            className={`${activeFilter === "playoffs" ? "active" : ""} last`}
          >
            P
          </button>
        </div>
        <div
          onClick={() => setShowYearDropdown(!showYearDropdown)}
          className={`year-selector`}
        >
          {activeYear}{" "}
          <span
            className={`year-dropdown disable-scrollbars ${
              showYearDropdown ? "show" : ""
            }`}
          >
            <ul className="dropdown-list disable-scrollbars">
              {data &&
                Object.keys(data[0].yearly).map((key) => {
                  if (isNaN(Number(key))) return null
                  return (
                    <li key={key}>
                      <button
                        className={`dropdown-button ${
                          activeYear === key ? "selected" : ""
                        }`}
                        onClick={() => handleYearSelect(key)}
                      >
                        {key}
                      </button>
                    </li>
                  )
                })}
            </ul>
          </span>
        </div>
        <div
          onClick={() => setShowYearDropdown(!showYearDropdown)}
          className="year-selector-arrow"
        >
          {showYearDropdown ? <FaAngleDoubleDown /> : <FaAngleDoubleLeft />}
        </div>
      </nav>
      {activeFilter === "combined" ? (
        <YearlyCombined />
      ) : activeFilter === "regszn" ? (
        <YearlyRegSzn />
      ) : activeFilter === "playoffs" ? (
        <YearlyPlayoffs />
      ) : (
        "ERROR"
      )}
    </div>
  )
}
