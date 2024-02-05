import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import { RootState } from "../../redux/store"
import { setActiveFilter, setActiveYear } from "../../redux/owners/compareSlice"
import { StaticOwner } from "../../types/StaticOwner"
import { FaCaretUp, FaAngleDoubleDown, FaAngleDoubleLeft } from "react-icons/fa"
import { FaCaretDown } from "react-icons/fa"
import { IoMdSwap } from "react-icons/io"

interface YearlyContentProps {
  data: StaticOwner[]
}

export default function YearlyContent({ data }: YearlyContentProps) {
  const dispatch = useDispatch()
  const { ownerOne, ownerTwo, activeYear, activeFilter } = useSelector(
    (state: RootState) => state.compare
  )
  const [showYearDropdown, setShowYearDropdown] = useState<boolean>(false)

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
        <div className="h2h-content-wrapper disable-scrollbars">
          <div className="h2h-content h2h-content-wrapper">
            <div className="owner-stats owner-one-stats">
              <div className="main-cell owner-name owner-one-name">
                {ownerOne?.ownerName &&
                  (() => {
                    const [firstName, lastName] = ownerOne.ownerName.split(" ")
                    const lastInitial = lastName ? lastName.charAt(0) : ""
                    return `${firstName} ${lastInitial}.`
                  })()}
              </div>
              <div className="cell finished">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[activeYear].combinedStats.finishPlace}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].combinedStats.finishPlace <
                    ownerTwo?.yearly[activeYear].combinedStats.finishPlace && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerTwo?.yearly[activeYear].combinedStats
                          .finishPlace -
                          ownerOne?.yearly[activeYear].combinedStats
                            .finishPlace}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell record owner-one-record">
                {ownerOne &&
                ownerOne.yearly[activeYear].participated === true ? (
                  <>
                    {ownerOne.yearly[activeYear].combinedStats.wins} -{" "}
                    {ownerOne.yearly[activeYear].combinedStats.losses} -{" "}
                    {ownerOne.yearly[activeYear].combinedStats.ties}
                  </>
                ) : (
                  "DNP"
                )}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].combinedStats.winningPct.toFixed(1)}
                      %
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].combinedStats.winningPct >
                    ownerTwo?.yearly[activeYear].combinedStats.winningPct && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].combinedStats
                            .winningPct -
                          ownerTwo?.yearly[activeYear].combinedStats.winningPct
                        ).toFixed(1)}
                        %
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPf">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[activeYear].combinedStats.avgPF.toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].combinedStats.avgPF >
                    ownerTwo?.yearly[activeYear].combinedStats.avgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].combinedStats.avgPF -
                          ownerTwo?.yearly[activeYear].combinedStats.avgPF
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPa">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[activeYear].combinedStats.avgPA.toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].combinedStats.avgPA >
                    ownerTwo?.yearly[activeYear].combinedStats.avgPA && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].combinedStats.avgPA -
                          ownerTwo?.yearly[activeYear].combinedStats.avgPA
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell best-week">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].combinedStats.bestWeek.toFixed(2)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].combinedStats.bestWeek >
                    ownerTwo?.yearly[activeYear].combinedStats.bestWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].combinedStats.bestWeek -
                          ownerTwo?.yearly[activeYear].combinedStats.bestWeek
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell worst-week">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].combinedStats.worstWeek.toFixed(2)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].combinedStats.worstWeek >
                    ownerTwo?.yearly[activeYear].combinedStats.worstWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].combinedStats.worstWeek -
                          ownerTwo?.yearly[activeYear].combinedStats.worstWeek
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-for">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].combinedStats.pointsFor.toFixed(1)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].combinedStats.pointsFor >
                    ownerTwo?.yearly[activeYear].combinedStats.pointsFor && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].combinedStats.pointsFor -
                          ownerTwo?.yearly[activeYear].combinedStats.pointsFor
                        ).toFixed(1)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-against">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].combinedStats.pointsAgainst.toFixed(1)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].combinedStats.pointsAgainst >
                    ownerTwo?.yearly[activeYear].combinedStats
                      .pointsAgainst && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].combinedStats
                            .pointsAgainst -
                          ownerTwo?.yearly[activeYear].combinedStats
                            .pointsAgainst
                        ).toFixed(1)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
            </div>
            <div className="stat-names">
              <div className="main-cell cell stat stat-title">Stat</div>
              <div className="cell stat stat-one">Finished</div>
              <div className="cell stat stat-one">Record</div>
              <div className="cell stat stat-one">Win %</div>
              <div className="cell stat stat-one">Avg. PF</div>
              <div className="cell stat stat-one">Avg. PA</div>
              <div className="cell stat stat-one">Best Week</div>
              <div className="cell stat stat-one">Worst Week</div>
              <div className="cell stat stat-one">Total PF</div>
              <div className="cell stat stat-one">Total PA</div>
            </div>
            <div className="owner-stats owner-two-stats">
              <div className="main-cell owner-name owner-two-name">
                {ownerTwo?.ownerName &&
                  (() => {
                    const [firstName, lastName] = ownerTwo.ownerName.split(" ")
                    const lastInitial = lastName ? lastName.charAt(0) : ""
                    return `${firstName} ${lastInitial}.`
                  })()}
              </div>
              <div className="cell finished">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[activeYear].combinedStats.finishPlace}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  (ownerTwo.yearly[activeYear].participated === true) ===
                    true &&
                  ownerTwo?.yearly[activeYear].combinedStats.finishPlace <
                    ownerOne?.yearly[activeYear].combinedStats.finishPlace && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {ownerOne?.yearly[activeYear].combinedStats
                          .finishPlace -
                          ownerTwo?.yearly[activeYear].combinedStats
                            .finishPlace}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell record owner-one-record">
                {ownerTwo &&
                ownerOne &&
                ownerTwo.yearly[activeYear].participated === true ? (
                  <>
                    {ownerTwo.yearly[activeYear].combinedStats.wins} -{" "}
                    {ownerTwo.yearly[activeYear].combinedStats.losses} -{" "}
                    {ownerTwo.yearly[activeYear].combinedStats.ties}
                  </>
                ) : (
                  "DNP"
                )}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].combinedStats.winningPct.toFixed(1)}
                      %
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].combinedStats.winningPct >
                    ownerOne?.yearly[activeYear].combinedStats.winningPct && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].combinedStats
                            .winningPct -
                          ownerOne?.yearly[activeYear].combinedStats.winningPct
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPf">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[activeYear].combinedStats.avgPF.toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].combinedStats.avgPF >
                    ownerOne?.yearly[activeYear].combinedStats.avgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].combinedStats.avgPF -
                          ownerOne?.yearly[activeYear].combinedStats.avgPF
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPa">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[activeYear].combinedStats.avgPA.toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].combinedStats.avgPA >
                    ownerOne?.yearly[activeYear].combinedStats.avgPA && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].combinedStats.avgPA -
                          ownerOne?.yearly[activeYear].combinedStats.avgPA
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell best-week">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].combinedStats.bestWeek.toFixed(2)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].combinedStats.bestWeek >
                    ownerOne?.yearly[activeYear].combinedStats.bestWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].combinedStats.bestWeek -
                          ownerOne?.yearly[activeYear].combinedStats.bestWeek
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell worst-week">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].combinedStats.worstWeek.toFixed(2)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].combinedStats.worstWeek >
                    ownerOne?.yearly[activeYear].combinedStats.worstWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].combinedStats.worstWeek -
                          ownerOne?.yearly[activeYear].combinedStats.worstWeek
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-for">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].combinedStats.pointsFor.toFixed(1)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].combinedStats.pointsFor >
                    ownerOne?.yearly[activeYear].combinedStats.pointsFor && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].combinedStats.pointsFor -
                          ownerOne?.yearly[activeYear].combinedStats.pointsFor
                        ).toFixed(1)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-against">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].combinedStats.pointsAgainst.toFixed(1)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].combinedStats.pointsAgainst >
                    ownerOne?.yearly[activeYear].combinedStats
                      .pointsAgainst && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].combinedStats
                            .pointsAgainst -
                          ownerOne?.yearly[activeYear].combinedStats
                            .pointsAgainst
                        ).toFixed(1)}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : activeFilter === "regszn" ? (
        <div className="h2h-content-wrapper disable-scrollbars">
          <div className="h2h-content h2h-content-wrapper">
            <div className="owner-stats owner-one-stats">
              <div className="main-cell owner-name owner-one-name">
                {ownerOne?.ownerName &&
                  (() => {
                    const [firstName, lastName] = ownerOne.ownerName.split(" ")
                    const lastInitial = lastName ? lastName.charAt(0) : ""
                    return `${firstName} ${lastInitial}.`
                  })()}
              </div>
              <div className="cell finished">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[activeYear].regSznStats.finishPlace}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].regSznStats.finishPlace <
                    ownerTwo?.yearly[activeYear].regSznStats.finishPlace && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerTwo?.yearly[activeYear].regSznStats.finishPlace -
                          ownerOne?.yearly[activeYear].regSznStats.finishPlace}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell record owner-one-record">
                {ownerOne &&
                ownerOne.yearly[activeYear].participated === true ? (
                  <>
                    {ownerOne.yearly[activeYear].regSznStats.wins} -{" "}
                    {ownerOne.yearly[activeYear].regSznStats.losses} -{" "}
                    {ownerOne.yearly[activeYear].regSznStats.ties}
                  </>
                ) : (
                  "DNP"
                )}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].regSznStats.winningPct.toFixed(1)}
                      %
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].regSznStats.winningPct >
                    ownerTwo?.yearly[activeYear].regSznStats.winningPct && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].regSznStats.winningPct -
                          ownerTwo?.yearly[activeYear].regSznStats.winningPct
                        ).toFixed(1)}
                        %
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              {/* NEED TO COMPARE WINPCT TO YOURSELF */}
              <div className="cell ss-record">
                <span className="stat-value">
                  {ownerOne &&
                  ownerTwo &&
                  ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                    activeYear
                  ] &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <>
                      {
                        ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                          activeYear
                        ].scheduleSwapWins
                      }
                      {" - "}
                      {
                        ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                          activeYear
                        ].scheduleSwapLosses
                      }
                      {" - "}
                      {
                        ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                          activeYear
                        ].scheduleSwapTies
                      }
                    </>
                  ) : (
                    "-"
                  )}
                </span>
              </div>
              <div className="cell ss-winPct">
                <span className="stat-value">
                  {ownerOne &&
                  ownerTwo &&
                  ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                    activeYear
                  ] &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <>
                      {ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                        activeYear
                      ].scheduleSwapWinPct.toFixed(1)}
                      %
                    </>
                  ) : (
                    "-"
                  )}
                </span>
                <div className="plus-minus-and-icon">
                  {ownerOne &&
                    ownerTwo &&
                    ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                      activeYear
                    ] && (
                      <>
                        {ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                          activeYear
                        ].scheduleSwapWinPct >
                          ownerOne.yearly[activeYear].regSznStats.winningPct &&
                        ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                          activeYear
                        ].scheduleSwapWinPct -
                          ownerOne.yearly[activeYear].regSznStats.winningPct >
                          0.1 ? (
                          <>
                            <span className="plus-minus green">
                              *
                              {(
                                ownerOne.scheduleSwap[ownerTwo.ownerName]
                                  .yearly[activeYear].scheduleSwapWinPct -
                                ownerOne.yearly[activeYear].regSznStats
                                  .winningPct
                              ).toFixed(1)}
                              %
                            </span>
                            <span className="arrow-icon green">
                              <FaCaretUp />
                            </span>
                          </>
                        ) : ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                            activeYear
                          ].scheduleSwapWinPct <
                            ownerOne.yearly[activeYear].regSznStats
                              .winningPct &&
                          Math.abs(
                            ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                              activeYear
                            ].scheduleSwapWinPct -
                              ownerOne.yearly[activeYear].regSznStats.winningPct
                          ) > 0.1 ? (
                          <>
                            <span className="plus-minus red">
                              *
                              {(
                                ownerOne.yearly[activeYear].regSznStats
                                  .winningPct -
                                ownerOne.scheduleSwap[ownerTwo.ownerName]
                                  .yearly[activeYear].scheduleSwapWinPct
                              ).toFixed(1)}
                              %
                            </span>
                            <span className="arrow-icon red">
                              <FaCaretDown />
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                </div>
              </div>
              <div className="cell etew-record stat-value">
                {ownerOne &&
                ownerOne.yearly[activeYear].participated === true ? (
                  <>
                    {
                      ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                        .ETEWWins
                    }{" "}
                    -{" "}
                    {
                      ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                        .ETEWLosses
                    }{" "}
                    -{" "}
                    {
                      ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                        .ETEWTies
                    }
                  </>
                ) : (
                  "DNP"
                )}
              </div>
              <div className="cell etew-winPct">
                <span className="stat-value">
                  {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <>
                      {
                        ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct
                      }
                      %
                    </>
                  ) : (
                    "-"
                  )}
                </span>
                <div className="plus-minus-and-icon">
                  {ownerOne &&
                    ownerTwo &&
                    ownerOne.yearly[activeYear].participated === true && (
                      <>
                        {ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct >
                          ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                            .ETEWWinPct &&
                        ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct -
                          ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                            .ETEWWinPct >
                          0.1 ? (
                          <>
                            <span className="plus-minus green">
                              {(
                                ownerOne.yearly[activeYear]
                                  .everyTeamEveryWeekStats.ETEWWinPct -
                                ownerTwo.yearly[activeYear]
                                  .everyTeamEveryWeekStats.ETEWWinPct
                              ).toFixed(1)}
                              %
                            </span>
                            <span className="arrow-icon green">
                              <FaCaretUp />
                            </span>
                          </>
                        ) : ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                            .ETEWWinPct <
                            ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                              .ETEWWinPct &&
                          ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                            .ETEWWinPct -
                            ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                              .ETEWWinPct >
                            0 ? (
                          <>
                            <span className="plus-minus red">
                              {(
                                ownerOne.yearly[activeYear]
                                  .everyTeamEveryWeekStats.ETEWWinPct -
                                ownerTwo.yearly[activeYear]
                                  .everyTeamEveryWeekStats.ETEWWinPct
                              ).toFixed(1)}
                              %
                            </span>
                            <span className="arrow-icon red">
                              <FaCaretDown />
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                </div>
              </div>
              <div className="cell avgPf">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[activeYear].regSznStats.avgPF.toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].regSznStats.avgPF >
                    ownerTwo?.yearly[activeYear].regSznStats.avgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].regSznStats.avgPF -
                          ownerTwo?.yearly[activeYear].regSznStats.avgPF
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPa">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[activeYear].regSznStats.avgPA.toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].regSznStats.avgPA >
                    ownerTwo?.yearly[activeYear].regSznStats.avgPA && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].regSznStats.avgPA -
                          ownerTwo?.yearly[activeYear].regSznStats.avgPA
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell best-week">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].regSznStats.bestWeek.toFixed(2)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].regSznStats.bestWeek >
                    ownerTwo?.yearly[activeYear].regSznStats.bestWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].regSznStats.bestWeek -
                          ownerTwo?.yearly[activeYear].regSznStats.bestWeek
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell worst-week">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].regSznStats.worstWeek.toFixed(2)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].regSznStats.worstWeek >
                    ownerTwo?.yearly[activeYear].regSznStats.worstWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].regSznStats.worstWeek -
                          ownerTwo?.yearly[activeYear].regSznStats.worstWeek
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-for">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].regSznStats.pointsFor.toFixed(1)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].regSznStats.pointsFor >
                    ownerTwo?.yearly[activeYear].regSznStats.pointsFor && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].regSznStats.pointsFor -
                          ownerTwo?.yearly[activeYear].regSznStats.pointsFor
                        ).toFixed(1)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-against">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].regSznStats.pointsAgainst.toFixed(1)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].regSznStats.pointsAgainst >
                    ownerTwo?.yearly[activeYear].regSznStats.pointsAgainst && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].regSznStats
                            .pointsAgainst -
                          ownerTwo?.yearly[activeYear].regSznStats.pointsAgainst
                        ).toFixed(1)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
            </div>
            <div className="stat-names">
              <div className="main-cell cell stat stat-title">Stat</div>
              <div className="cell stat stat-one">Finished</div>
              <div className="cell stat stat-one">Record</div>
              <div className="cell stat stat-one">Win %</div>
              <div className="cell stat stat-one special">
                <IoMdSwap />
                Schedule
              </div>
              <div className="cell stat stat-one special">
                <IoMdSwap />
                Win %
              </div>
              <div className="cell stat stat-one special">ETEW Record</div>
              <div className="cell stat stat-one special">ETEW Win %</div>
              <div className="cell stat stat-one">Avg. PF</div>
              <div className="cell stat stat-one">Avg. PA</div>
              <div className="cell stat stat-one">Best Week</div>
              <div className="cell stat stat-one">Worst Week</div>
              <div className="cell stat stat-one">Total PF</div>
              <div className="cell stat stat-one">Total PA</div>
            </div>
            <div className="owner-stats owner-two-stats">
              <div className="main-cell owner-name owner-two-name">
                {ownerTwo?.ownerName &&
                  (() => {
                    const [firstName, lastName] = ownerTwo.ownerName.split(" ")
                    const lastInitial = lastName ? lastName.charAt(0) : ""
                    return `${firstName} ${lastInitial}.`
                  })()}
              </div>
              <div className="cell finished">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[activeYear].regSznStats.finishPlace}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].regSznStats.finishPlace <
                    ownerOne?.yearly[activeYear].regSznStats.finishPlace && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {ownerOne?.yearly[activeYear].regSznStats.finishPlace -
                          ownerTwo?.yearly[activeYear].regSznStats.finishPlace}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell record owner-one-record">
                {ownerTwo &&
                ownerOne &&
                ownerTwo.yearly[activeYear].participated === true ? (
                  <>
                    {ownerTwo.yearly[activeYear].regSznStats.wins} -{" "}
                    {ownerTwo.yearly[activeYear].regSznStats.losses} -{" "}
                    {ownerTwo.yearly[activeYear].regSznStats.ties}
                  </>
                ) : (
                  "DNP"
                )}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].regSznStats.winningPct.toFixed(1)}
                      %
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].regSznStats.winningPct >
                    ownerOne?.yearly[activeYear].regSznStats.winningPct && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].regSznStats.winningPct -
                          ownerOne?.yearly[activeYear].regSznStats.winningPct
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell ss-record">
                <span className="stat-value">
                  {ownerOne &&
                  ownerTwo &&
                  ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                    activeYear
                  ] &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <>
                      {
                        ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                          activeYear
                        ].scheduleSwapWins
                      }
                      {" - "}
                      {
                        ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                          activeYear
                        ].scheduleSwapLosses
                      }
                      {" - "}
                      {
                        ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                          activeYear
                        ].scheduleSwapTies
                      }
                    </>
                  ) : (
                    "-"
                  )}
                </span>
              </div>
              <div className="cell ss-winPct">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerOne &&
                  ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                    activeYear
                  ] &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <>
                      {ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                        activeYear
                      ].scheduleSwapWinPct.toFixed(1)}
                      %
                    </>
                  ) : (
                    "-"
                  )}
                </span>
                <div className="plus-minus-and-icon">
                  {ownerTwo &&
                    ownerOne &&
                    ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                      activeYear
                    ] && (
                      <>
                        {ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                          activeYear
                        ].scheduleSwapWinPct >
                          ownerTwo.yearly[activeYear].regSznStats.winningPct &&
                        ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                          activeYear
                        ].scheduleSwapWinPct -
                          ownerTwo.yearly[activeYear].regSznStats.winningPct >
                          0.1 ? (
                          <>
                            <span className="arrow-icon green">
                              <FaCaretUp />
                            </span>
                            <span className="plus-minus green">
                              *
                              {(
                                ownerTwo.scheduleSwap[ownerOne.ownerName]
                                  .yearly[activeYear].scheduleSwapWinPct -
                                ownerTwo.yearly[activeYear].regSznStats
                                  .winningPct
                              ).toFixed(1)}
                              %
                            </span>
                          </>
                        ) : ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                            activeYear
                          ].scheduleSwapWinPct <
                            ownerTwo.yearly[activeYear].regSznStats
                              .winningPct &&
                          Math.abs(
                            ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                              activeYear
                            ].scheduleSwapWinPct -
                              ownerTwo.yearly[activeYear].regSznStats.winningPct
                          ) > 0.1 ? (
                          <>
                            <span className="arrow-icon red">
                              <FaCaretDown />
                            </span>
                            <span className="plus-minus red">
                              *
                              {(
                                ownerTwo.yearly[activeYear].regSznStats
                                  .winningPct -
                                ownerTwo.scheduleSwap[ownerOne.ownerName]
                                  .yearly[activeYear].scheduleSwapWinPct
                              ).toFixed(1)}
                              %
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                </div>
              </div>
              <div className="cell etew-record stat-value">
                {ownerTwo &&
                ownerOne &&
                ownerTwo.yearly[activeYear].participated === true ? (
                  <>
                    {
                      ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                        .ETEWWins
                    }{" "}
                    -{" "}
                    {
                      ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                        .ETEWLosses
                    }{" "}
                    -{" "}
                    {
                      ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                        .ETEWTies
                    }
                  </>
                ) : (
                  "DNP"
                )}
              </div>
              <div className="cell etew-winPct">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerOne &&
                  ownerTwo.yearly[activeYear] &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <>
                      {
                        ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct
                      }
                      %
                    </>
                  ) : (
                    "-"
                  )}
                </span>
                <div className="plus-minus-and-icon">
                  {ownerTwo &&
                    ownerOne &&
                    ownerTwo.yearly[activeYear].participated === true &&
                    ownerOne.yearly[activeYear].participated === true && (
                      <>
                        {ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct >
                          ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                            .ETEWWinPct &&
                        ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct -
                          ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                            .ETEWWinPct >
                          0.1 ? (
                          <>
                            <span className="arrow-icon green">
                              <FaCaretUp />
                            </span>
                            <span className="plus-minus green">
                              {(
                                ownerTwo.yearly[activeYear]
                                  .everyTeamEveryWeekStats.ETEWWinPct -
                                ownerOne.yearly[activeYear]
                                  .everyTeamEveryWeekStats.ETEWWinPct
                              ).toFixed(1)}
                              %
                            </span>
                          </>
                        ) : ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                            .ETEWWinPct <
                            ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                              .ETEWWinPct &&
                          ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                            .ETEWWinPct -
                            ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                              .ETEWWinPct >
                            0 ? (
                          <>
                            <span className="arrow-icon red">
                              <FaCaretDown />
                            </span>
                            <span className="plus-minus red">
                              {(
                                ownerTwo.yearly[activeYear]
                                  .everyTeamEveryWeekStats.ETEWWinPct -
                                ownerOne.yearly[activeYear]
                                  .everyTeamEveryWeekStats.ETEWWinPct
                              ).toFixed(1)}
                              %
                            </span>
                          </>
                        ) : (
                          "-"
                        )}
                      </>
                    )}
                </div>
              </div>
              <div className="cell avgPf">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[activeYear].regSznStats.avgPF.toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].regSznStats.avgPF >
                    ownerOne?.yearly[activeYear].regSznStats.avgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].regSznStats.avgPF -
                          ownerOne?.yearly[activeYear].regSznStats.avgPF
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPa">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[activeYear].regSznStats.avgPA.toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].regSznStats.avgPA >
                    ownerOne?.yearly[activeYear].regSznStats.avgPA && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].regSznStats.avgPA -
                          ownerOne?.yearly[activeYear].regSznStats.avgPA
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell best-week">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].regSznStats.bestWeek.toFixed(2)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].regSznStats.bestWeek >
                    ownerOne?.yearly[activeYear].regSznStats.bestWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].regSznStats.bestWeek -
                          ownerOne?.yearly[activeYear].regSznStats.bestWeek
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell worst-week">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].regSznStats.worstWeek.toFixed(2)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].regSznStats.worstWeek >
                    ownerOne?.yearly[activeYear].regSznStats.worstWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].regSznStats.worstWeek -
                          ownerOne?.yearly[activeYear].regSznStats.worstWeek
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-for">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].regSznStats.pointsFor.toFixed(1)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].regSznStats.pointsFor >
                    ownerOne?.yearly[activeYear].regSznStats.pointsFor && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].regSznStats.pointsFor -
                          ownerOne?.yearly[activeYear].regSznStats.pointsFor
                        ).toFixed(1)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-against">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].regSznStats.pointsAgainst.toFixed(1)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerTwo?.yearly[activeYear].regSznStats.pointsAgainst >
                    ownerOne?.yearly[activeYear].regSznStats.pointsAgainst && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].regSznStats
                            .pointsAgainst -
                          ownerOne?.yearly[activeYear].regSznStats.pointsAgainst
                        ).toFixed(1)}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : activeFilter === "playoffs" ? (
        <div className="h2h-content-wrapper disable-scrollbars">
          <div className="h2h-content h2h-content-wrapper">
            <div className="owner-stats owner-one-stats">
              <div className="main-cell owner-name owner-one-name">
                {ownerOne?.ownerName &&
                  (() => {
                    const [firstName, lastName] = ownerOne.ownerName.split(" ")
                    const lastInitial = lastName ? lastName.charAt(0) : ""
                    return `${firstName} ${lastInitial}.`
                  })()}
              </div>
              <div className="cell finished">
                <span className="stat-value">
                  {ownerOne &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerOne?.yearly[activeYear].regSznStats.finishPlace}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].regSznStats.finishPlace <
                    ownerTwo?.yearly[activeYear].regSznStats.finishPlace && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerTwo?.yearly[activeYear].regSznStats.finishPlace -
                          ownerOne?.yearly[activeYear].regSznStats.finishPlace}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell record owner-one-record">
                {ownerOne &&
                (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                  true) ===
                  true ? (
                  <>
                    {ownerOne.yearly[activeYear].playoffStats.wins} -{" "}
                    {ownerOne.yearly[activeYear].playoffStats.losses} -{" "}
                    {ownerOne.yearly[activeYear].playoffStats.ties}
                  </>
                ) : (
                  "DNP"
                )}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerOne &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].playoffStats.winningPct.toFixed(1)}
                      %
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].playoffStats.winningPct >
                    ownerTwo?.yearly[activeYear].playoffStats.winningPct && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].playoffStats.winningPct -
                          ownerTwo?.yearly[activeYear].playoffStats.winningPct
                        ).toFixed(1)}
                        %
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPf">
                <span className="stat-value">
                  {ownerOne &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true ? (
                    <div>
                      {ownerOne?.yearly[activeYear].playoffStats.avgPF.toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].playoffStats.avgPF >
                    ownerTwo?.yearly[activeYear].playoffStats.avgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].playoffStats.avgPF -
                          ownerTwo?.yearly[activeYear].playoffStats.avgPF
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPa">
                <span className="stat-value">
                  {ownerOne &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true ? (
                    <div>
                      {ownerOne?.yearly[activeYear].playoffStats.avgPA.toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].playoffStats.avgPA >
                    ownerTwo?.yearly[activeYear].playoffStats.avgPA && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].playoffStats.avgPA -
                          ownerTwo?.yearly[activeYear].playoffStats.avgPA
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell best-week">
                <span className="stat-value">
                  {ownerOne &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].playoffStats.bestWeek.toFixed(2)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].playoffStats.bestWeek >
                    ownerTwo?.yearly[activeYear].playoffStats.bestWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].playoffStats.bestWeek -
                          ownerTwo?.yearly[activeYear].playoffStats.bestWeek
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell worst-week">
                <span className="stat-value">
                  {ownerOne &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].playoffStats.worstWeek.toFixed(2)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].playoffStats.worstWeek >
                    ownerTwo?.yearly[activeYear].playoffStats.worstWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].playoffStats.worstWeek -
                          ownerTwo?.yearly[activeYear].playoffStats.worstWeek
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-for">
                <span className="stat-value">
                  {ownerOne &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].playoffStats.pointsFor.toFixed(1)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].playoffStats.pointsFor >
                    ownerTwo?.yearly[activeYear].playoffStats.pointsFor && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].playoffStats.pointsFor -
                          ownerTwo?.yearly[activeYear].playoffStats.pointsFor
                        ).toFixed(1)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-against">
                <span className="stat-value">
                  {ownerOne &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true ? (
                    <div>
                      {ownerOne?.yearly[
                        activeYear
                      ].playoffStats.pointsAgainst.toFixed(1)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
                    true) ===
                    true &&
                  ownerTwo.yearly[activeYear].participated === true &&
                  ownerOne?.yearly[activeYear].playoffStats.pointsAgainst >
                    ownerTwo?.yearly[activeYear].playoffStats.pointsAgainst && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.yearly[activeYear].playoffStats
                            .pointsAgainst -
                          ownerTwo?.yearly[activeYear].playoffStats
                            .pointsAgainst
                        ).toFixed(1)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
            </div>
            <div className="stat-names">
              <div className="main-cell cell stat stat-title">Stat</div>
              <div className="cell stat stat-one">Finished</div>
              <div className="cell stat stat-one">Record</div>
              <div className="cell stat stat-one">Win %</div>
              <div className="cell stat stat-one">Avg. PF</div>
              <div className="cell stat stat-one">Avg. PA</div>
              <div className="cell stat stat-one">Best Week</div>
              <div className="cell stat stat-one">Worst Week</div>
              <div className="cell stat stat-one">Total PF</div>
              <div className="cell stat stat-one">Total PA</div>
            </div>
            <div className="owner-stats owner-two-stats">
              <div className="main-cell owner-name owner-two-name">
                {ownerTwo?.ownerName &&
                  (() => {
                    const [firstName, lastName] = ownerTwo.ownerName.split(" ")
                    const lastInitial = lastName ? lastName.charAt(0) : ""
                    return `${firstName} ${lastInitial}.`
                  })()}
              </div>
              <div className="cell finished">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <div>
                      {ownerTwo?.yearly[activeYear].regSznStats.finishPlace}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true &&
                  ownerTwo?.yearly[activeYear].regSznStats.finishPlace <
                    ownerOne?.yearly[activeYear].regSznStats.finishPlace && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {ownerOne?.yearly[activeYear].regSznStats.finishPlace -
                          ownerTwo?.yearly[activeYear].regSznStats.finishPlace}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell record owner-one-record">
                {ownerTwo &&
                ownerOne &&
                ownerTwo.yearly[activeYear].playoffStats.participated ===
                  true ? (
                  <>
                    {ownerTwo.yearly[activeYear].playoffStats.wins} -{" "}
                    {ownerTwo.yearly[activeYear].playoffStats.losses} -{" "}
                    {ownerTwo.yearly[activeYear].playoffStats.ties}
                  </>
                ) : (
                  "DNP"
                )}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].playoffStats.winningPct.toFixed(1)}
                      %
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true &&
                  ownerTwo?.yearly[activeYear].playoffStats.winningPct >
                    ownerOne?.yearly[activeYear].playoffStats.winningPct && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].playoffStats.winningPct -
                          ownerOne?.yearly[activeYear].playoffStats.winningPct
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPf">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true ? (
                    <div>
                      {ownerTwo?.yearly[activeYear].playoffStats.avgPF.toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true &&
                  ownerTwo?.yearly[activeYear].playoffStats.avgPF >
                    ownerOne?.yearly[activeYear].playoffStats.avgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].playoffStats.avgPF -
                          ownerOne?.yearly[activeYear].playoffStats.avgPF
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPa">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true ? (
                    <div>
                      {ownerTwo?.yearly[activeYear].playoffStats.avgPA.toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true &&
                  ownerTwo?.yearly[activeYear].playoffStats.avgPA >
                    ownerOne?.yearly[activeYear].playoffStats.avgPA && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].playoffStats.avgPA -
                          ownerOne?.yearly[activeYear].playoffStats.avgPA
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell best-week">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].playoffStats.bestWeek.toFixed(2)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true &&
                  ownerTwo?.yearly[activeYear].playoffStats.bestWeek >
                    ownerOne?.yearly[activeYear].playoffStats.bestWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].playoffStats.bestWeek -
                          ownerOne?.yearly[activeYear].playoffStats.bestWeek
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell worst-week">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].playoffStats.worstWeek.toFixed(2)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true &&
                  ownerTwo?.yearly[activeYear].playoffStats.worstWeek >
                    ownerOne?.yearly[activeYear].playoffStats.worstWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].playoffStats.worstWeek -
                          ownerOne?.yearly[activeYear].playoffStats.worstWeek
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-for">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].playoffStats.pointsFor.toFixed(1)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true &&
                  ownerTwo?.yearly[activeYear].playoffStats.pointsFor >
                    ownerOne?.yearly[activeYear].playoffStats.pointsFor && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].playoffStats.pointsFor -
                          ownerOne?.yearly[activeYear].playoffStats.pointsFor
                        ).toFixed(1)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-against">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true ? (
                    <div>
                      {ownerTwo?.yearly[
                        activeYear
                      ].playoffStats.pointsAgainst.toFixed(1)}
                    </div>
                  ) : (
                    "DNP"
                  )}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerOne.yearly[activeYear].participated === true &&
                  ownerTwo.yearly[activeYear].playoffStats.participated ===
                    true &&
                  ownerTwo?.yearly[activeYear].playoffStats.pointsAgainst >
                    ownerOne?.yearly[activeYear].playoffStats.pointsAgainst && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.yearly[activeYear].playoffStats
                            .pointsAgainst -
                          ownerOne?.yearly[activeYear].playoffStats
                            .pointsAgainst
                        ).toFixed(1)}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        "ERROR"
      )}
    </div>
  )
}
