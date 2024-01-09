import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { useFetchStaticDataQuery } from "../../redux/owners/ownersApi"
import { MdCompareArrows } from "react-icons/md"
import { FaTrophy } from "react-icons/fa6"
import { GiLargeDress } from "react-icons/gi"
import { FaCrown } from "react-icons/fa6"
import { FaAngleDoubleRight } from "react-icons/fa"
import { FaAngleDoubleLeft } from "react-icons/fa"
import { FaAngleDoubleDown } from "react-icons/fa"
import { FaCaretUp } from "react-icons/fa"
import { StaticOwner } from "../../types/StaticOwner"

import "./ComparePage.scss"

export default function ComparePage() {
  const { user } = useSelector((state: RootState) => state.user)
  const { data } = useFetchStaticDataQuery()
  const [activeButton, setActiveButton] = useState<string>("h2h")
  const [activeFilterButton, setActiveFilterButton] =
    useState<string>("combined")
  const [showYearDropdown, setShowYearDropdown] = useState<boolean>(false)
  const [selectedYear, setSelectedYear] = useState<string>("2023")
  const [ownerOne, setOwnerOne] = useState<StaticOwner | null>(null)
  const [ownerTwo, setOwnerTwo] = useState<StaticOwner | null>(null)

  function handleYearSelect(year: string) {
    setShowYearDropdown(false)
    setSelectedYear(year)
  }

  function handleOwnerSwitch(ownerSwitched: StaticOwner, direction: string) {
    if (data && ownerOne && ownerTwo) {
      const ownerOneIndex = data?.indexOf(ownerOne) // 0
      const ownerTwoIndex = data?.indexOf(ownerTwo) // 11
      // console.log(ownerOneIndex, ownerTwoIndex)

      const index = data?.indexOf(ownerSwitched) // 0
      let nextIndex = calcNextIndex(index, direction) // 11

      if (index === ownerOneIndex) {
        if (data[nextIndex].ownerName === ownerTwo.ownerName && direction === "forward") {
          nextIndex = calcNextIndex(nextIndex, direction)
          setOwnerOne(data[nextIndex])
        } else if (data[nextIndex].ownerName === ownerTwo.ownerName && direction === "back") {
          nextIndex = calcNextIndex(nextIndex, direction)
          setOwnerOne(data[nextIndex])
        } else {
          setOwnerOne(data[nextIndex])
        }
      }
      if (index === ownerTwoIndex) {
        if (data[nextIndex].ownerName === ownerOne.ownerName && direction === "forward") {
          nextIndex = calcNextIndex(nextIndex, direction)
          setOwnerTwo(data[nextIndex])
        } else if (data[nextIndex].ownerName === ownerOne.ownerName && direction === "back") {
          nextIndex = calcNextIndex(nextIndex, direction)
          setOwnerTwo(data[nextIndex])
        } else {
          setOwnerTwo(data[nextIndex])
        }
      }
    }
  }
  function calcNextIndex(index: number, direction: string) {
    if (index === 0 && direction === "back") {
      return 11
    } else if (index === 11 && direction === "forward") {
      return 0
    } else {
      if (direction === "forward") {
        return index + 1
      } else if (direction === "back") {
        return index - 1
      }
    }
    return 0
  }

  // *********
  // MOVE ON TO All-Time and YEARLY!!! (DO ALL-TIME FIRST)
  // *********
  useEffect(() => {
    if (data && user) {
      const tempOwner = data.find((owner: StaticOwner) => user.firstName === owner.ownerName.split(" ")[0])

      if (tempOwner) {
        setOwnerOne(tempOwner)
        setOwnerTwo(data[11])
      } else {
        setOwnerOne(data[0])
      }
    }
  }, [data, user])

  return (
    <div className="page compare-page">
      <div className="compare-page-top">
        <div className="compare-page-header">
          <h1>Compare Owners</h1>
          <div className="compare">
            <MdCompareArrows />
          </div>
        </div>
        <nav className="compare-nav">
          <ul>
            <li>
              <button
                className={`${activeButton === "allTime" ? "active" : ""}`}
                onClick={() => setActiveButton("allTime")}
              >
                All-Time
              </button>
            </li>
            <li className="spacer"></li>
            <li>
              <button
                className={`${activeButton === "h2h" ? "active" : ""}`}
                onClick={() => setActiveButton("h2h")}
              >
                H2H
              </button>
            </li>
            <li className="spacer"></li>
            <li>
              <button
                className={`${activeButton === "yearly" ? "active" : ""}`}
                onClick={() => setActiveButton("yearly")}
              >
                Yearly
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="compare-page-bottom">
        <div className="owner-one-selector-wrapper selector-wrapper">
          <div className="selector-header">
            {ownerOne && 
            <button onClick={() => handleOwnerSwitch(ownerOne, "back")} className="arrow arrow-left">
              <span>
                <FaAngleDoubleLeft />
              </span>
              Prev{" "}
            </button>}
            <div className="spacer"></div>
            <h2 className="owner-one-name owner-name">
              {ownerOne?.ownerName &&
                (() => {
                  const [firstName, lastName] = ownerOne.ownerName.split(" ");
                  const lastInitial = lastName ? lastName.charAt(0) : "";
                  return `${firstName} ${lastInitial}.`;
                })()}
            </h2>
            <div className="spacer"></div>
            {ownerOne && 
            <button onClick={() => handleOwnerSwitch(ownerOne, "forward")} className="arrow arrow-right">
              Next{" "}
              <span>
                <FaAngleDoubleRight />
              </span>
            </button>}
          </div>
          <div className="selector-body">
            <img src="/profileImg.png" alt="profile" />
            <div className="main-stats-wrapper">
              <div className="main-stats main-stats-left">
                <h2 className="stat stat1">
                  Championships:{" "}
                  <span className="icons">
                    {ownerOne && ownerOne?.bonusStats.championships! > 0 ? new Array(ownerOne?.bonusStats.championships).fill(null).map((_, index) => <FaTrophy key={index}/>) : "-"}
                  </span>
                </h2>
                <h2 className="stat stat2">
                  KOTH Wins:{" "}
                  <span className="icons">
                    <FaCrown /> <FaCrown />
                  </span>
                </h2>
              </div>
              <div className="main-stats main-stats-right">
                <h2 className="stat stat3">
                  Skirts:{" "}
                  <span className="icons">
                    {ownerOne && ownerOne?.bonusStats.skirts! > 0 ? new Array(ownerOne?.bonusStats.skirts).fill(null).map((_, index) => <GiLargeDress key={index}/>) : "-"}
                  </span>
                </h2>
                <h2 className="stat stat4">
                  Avg. Finish: <span className="icons">
                    {ownerOne && ownerOne.bonusStats.avgFinishPlace}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="main-content-wrapper">
          {activeButton === "h2h" ? (
            <div className="compare-h2h">
              <nav className="h2h-nav">
                <ul>
                  <li>
                    <button
                      onClick={() => setActiveFilterButton("combined")}
                      className={`${
                        activeFilterButton === "combined" ? "active" : ""
                      }`}
                    >
                      Combined
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveFilterButton("regszn")}
                      className={`${
                        activeFilterButton === "regszn" ? "active" : ""
                      }`}
                    >
                      RegSzn
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveFilterButton("playoffs")}
                      className={`${
                        activeFilterButton === "playoffs" ? "active" : ""
                      }`}
                    >
                      Playoffs
                    </button>
                  </li>
                </ul>
              </nav>
              {activeFilterButton === "combined" ? (
                <div className="h2h-content-wrapper disable-scrollbars">
                  <div className="h2h-content h2h-content-wrapper">
                    {/* OWNER ONE */}
                    <div className="owner-stats owner-one-stats">
                      <div className="main-cell owner-name owner-one-name">
                       {ownerOne?.ownerName.split(" ")[0]}
                      </div>
                      <div className="cell record owner-one-record">
                        {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.combined[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.combined[ownerTwo.ownerName].wins} - {ownerOne.h2h.combined[ownerTwo.ownerName].losses} - {ownerOne.h2h.combined[ownerTwo.ownerName].ties}
                            </>
                          )}
                      </div>
                      <div className="cell win-pct">
                        <span className="stat-value">
                          {ownerOne &&
                            ownerTwo &&
                            ownerOne.h2h.combined[ownerTwo.ownerName] && (
                              <>
                                {((ownerOne.h2h.combined[ownerTwo.ownerName].wins / ownerOne.h2h.combined[ownerTwo.ownerName].gamesPlayed) * 100).toFixed(1)}%
                              </>
                            )}
                        </span>
                        <div className="plus-minus-and-icon">
                          {ownerOne &&
                            ownerTwo &&
                            ownerOne.h2h.combined[ownerTwo.ownerName] && (
                              <>
                                {ownerOne.h2h.combined[ownerTwo.ownerName].winningPct > ownerTwo.h2h.combined[ownerOne.ownerName].winningPct && (
                                  <>
                                    <span className="plus-minus green">
                                      {((ownerOne.h2h.combined[ownerTwo.ownerName].winningPct - ownerTwo.h2h.combined[ownerOne.ownerName].winningPct).toFixed(1))}%
                                    </span>
                                    <span className="arrow-icon green">
                                      <FaCaretUp />
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                        </div>
                      </div>
                      <div className="cell avgPts">
                        <span className="stat-value">
                        {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.combined[ownerTwo.ownerName] && (
                            <>
                              {Number((ownerOne.h2h.combined[ownerTwo.ownerName].totalPointsFor / ownerOne.h2h.combined[ownerTwo.ownerName].gamesPlayed).toFixed(2))}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerOne.h2h.combined[ownerTwo.ownerName].avgPF > ownerTwo.h2h.combined[ownerOne.ownerName].avgPF &&
                        <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.combined[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.h2h.combined[ownerTwo.ownerName].avgPF > ownerTwo.h2h.combined[ownerOne.ownerName].avgPF && `${((ownerOne.h2h.combined[ownerTwo.ownerName].avgPF - ownerTwo.h2h.combined[ownerOne.ownerName].avgPF)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                      <div className="cell avgPtsVField">
                        <span className="stat-value">{ownerOne && ownerOne.allTime.combined.avgPF}</span>
                        {ownerOne && ownerTwo && ownerOne.allTime.combined.avgPF > ownerTwo.allTime.combined.avgPF &&
                        <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.combined[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.allTime.combined.avgPF > ownerTwo.allTime.combined.avgPF && `${((ownerOne.allTime.combined.avgPF - ownerTwo.allTime.combined.avgPF)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                      <div className="cell best-week">
                        <span className="stat-value">
                          {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.combined[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek > ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek &&
                        <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.combined[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek > ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek && `${((ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek - ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                      <div className="cell worst-week">
                        <span className="stat-value">
                          {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.combined[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek > ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek && 
                        <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.combined[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek > ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek && `${((ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek - ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                      <div className="cell total-points">
                        <span className="stat-value">
                          {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.combined[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.combined[ownerTwo.ownerName].totalPointsFor}
                            </>
                          )}
                          </span>
                          {ownerOne && ownerTwo && ownerOne.h2h.combined[ownerTwo.ownerName].totalPointsFor > ownerTwo.h2h.combined[ownerOne.ownerName].totalPointsFor &&
                          <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.combined[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.h2h.combined[ownerTwo.ownerName].totalPointsFor > ownerTwo.h2h.combined[ownerOne.ownerName].totalPointsFor && `${((ownerOne.h2h.combined[ownerTwo.ownerName].totalPointsFor - ownerTwo.h2h.combined[ownerOne.ownerName].totalPointsFor)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                    </div>
                    {/* MIDDLE SECTION */}
                    <div className="stat-names">
                      <div className="main-cell cell stat stat-title">Stat</div>
                      <div className="cell stat stat-one">Record</div>
                      <div className="cell stat stat-one">Win %</div>
                      <div className="cell stat stat-one">Avg. Pts</div>
                      <div className="cell stat stat-one">Avg. Pts v Field</div>
                      <div className="cell stat stat-one">Best Week</div>
                      <div className="cell stat stat-one">Worst Week</div>
                      <div className="cell stat stat-one">Total Points</div>
                    </div>
                    {/* OWNER TWO */}
                    <div className="owner-stats owner-two-stats">
                      <div className="main-cell owner-name owner-two-name">
                        {ownerTwo?.ownerName.split(" ")[0]}
                      </div>
                      <div className="cell record owner-two-record">
                          {ownerOne &&
                          ownerTwo &&
                          ownerTwo.h2h.combined[ownerOne.ownerName] && (
                            <>
                              {ownerTwo.h2h.combined[ownerOne.ownerName].wins} - {ownerTwo.h2h.combined[ownerOne.ownerName].losses} - {ownerTwo.h2h.combined[ownerOne.ownerName].ties}
                            </>
                          )}
                      </div>
                      <div className="cell win-pct">
                        <span className="stat-value">
                          {ownerOne &&
                            ownerTwo &&
                            ownerTwo.h2h.combined[ownerOne.ownerName] && (
                              <>
                                {((ownerTwo.h2h.combined[ownerOne.ownerName].wins / ownerTwo.h2h.combined[ownerOne.ownerName].gamesPlayed) * 100).toFixed(1)}%
                              </>
                            )}
                        </span>
                        <div className="plus-minus-and-icon">
                          {ownerTwo &&
                            ownerOne &&
                            ownerTwo.h2h.combined[ownerOne.ownerName] && (
                              <>
                                {ownerTwo.h2h.combined[ownerOne.ownerName].winningPct > ownerOne.h2h.combined[ownerTwo.ownerName].winningPct && (
                                  <>
                                  <span className="arrow-icon green">
                                      <FaCaretUp />
                                    </span>
                                    <span className="plus-minus green">
                                      {((ownerTwo.h2h.combined[ownerOne.ownerName].winningPct - ownerOne.h2h.combined[ownerTwo.ownerName].winningPct)).toFixed(2)}
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                        </div>
                      </div>
                      <div className="cell avgPts">
                        <span className="stat-value">
                        {ownerTwo &&
                          ownerOne &&
                          ownerTwo.h2h.combined[ownerOne.ownerName] && (
                            <>
                              {Number((ownerTwo.h2h.combined[ownerOne.ownerName].totalPointsFor / ownerTwo.h2h.combined[ownerOne.ownerName].gamesPlayed).toFixed(2))}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerTwo.h2h.combined[ownerOne.ownerName].avgPF > ownerOne.h2h.combined[ownerTwo.ownerName].avgPF &&
                        <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.combined[ownerOne.ownerName] && (
                                <>
                                  {ownerTwo.h2h.combined[ownerOne.ownerName].avgPF > ownerOne.h2h.combined[ownerTwo.ownerName].avgPF && `${((ownerTwo.h2h.combined[ownerOne.ownerName].avgPF - ownerOne.h2h.combined[ownerTwo.ownerName].avgPF)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                      <div className="cell avgPtsVField">
                        <span className="stat-value">{ownerTwo && ownerTwo.allTime.combined.avgPF}</span>
                        {ownerOne && ownerTwo && ownerTwo.allTime.combined.avgPF > ownerOne.allTime.combined.avgPF &&
                        <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.combined[ownerOne.ownerName] && (
                                <>
                                  {ownerTwo.allTime.combined.avgPF > ownerOne.allTime.combined.avgPF && `${((ownerTwo.allTime.combined.avgPF - ownerOne.allTime.combined.avgPF)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                      <div className="cell best-week">
                        <span className="stat-value">
                          {ownerTwo &&
                          ownerOne &&
                          ownerTwo.h2h.combined[ownerOne.ownerName] && (
                            <>
                              {ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek > ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek && 
                        <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.combined[ownerOne.ownerName] && (
                                <>
                                  {ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek > ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek && `${((ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek - ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                      <div className="cell worst-week">
                          <span className="stat-value">
                          {ownerTwo &&
                          ownerOne &&
                          ownerTwo.h2h.combined[ownerOne.ownerName] && (
                            <>
                              {ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek}
                            </>
                          )}
                        </span>
                        {(ownerOne && ownerTwo && ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek > ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek) &&
                        <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.combined[ownerOne.ownerName] && (
                                <>
                                  {(ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek > ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek) && `${((ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek - ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek).toFixed(2))}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                      <div className="cell total-points">
                        <span className="stat-value">
                          {ownerTwo &&
                          ownerOne &&
                          ownerTwo.h2h.combined[ownerOne.ownerName] && (
                            <>
                              {ownerTwo.h2h.combined[ownerOne.ownerName].totalPointsFor}
                            </>
                          )}
                          </span>
                          {ownerOne && ownerTwo && ownerTwo.h2h.combined[ownerOne.ownerName].totalPointsFor > ownerOne.h2h.combined[ownerTwo.ownerName].totalPointsFor &&
                          <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.combined[ownerOne.ownerName] && (
                                <>
                                  {ownerTwo.h2h.combined[ownerOne.ownerName].totalPointsFor > ownerOne.h2h.combined[ownerTwo.ownerName].totalPointsFor && `${((ownerTwo.h2h.combined[ownerOne.ownerName].totalPointsFor - ownerOne.h2h.combined[ownerTwo.ownerName].totalPointsFor)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeFilterButton === "regszn" ? (
                <div className="regszn-content h2h-content-wrapper-temp">
                  <div className="h2h-content h2h-content-wrapper">
                    {/* OWNER ONE */}
                    <div className="owner-stats owner-one-stats">
                      <div className="main-cell owner-name owner-one-name">
                       {ownerOne?.ownerName.split(" ")[0]}
                      </div>
                      <div className="cell record owner-one-record">
                        {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.regSzn[ownerTwo.ownerName].wins} - {ownerOne.h2h.regSzn[ownerTwo.ownerName].losses} - {ownerOne.h2h.regSzn[ownerTwo.ownerName].ties}
                            </>
                          )}
                      </div>
                      <div className="cell win-pct">
                        <span className="stat-value">
                          {ownerOne &&
                            ownerTwo &&
                            ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                              <>
                                {((ownerOne.h2h.regSzn[ownerTwo.ownerName].wins / ownerOne.h2h.regSzn[ownerTwo.ownerName].RSgamesPlayed) * 100).toFixed(1)}%
                              </>
                            )}
                        </span>
                        <div className="plus-minus-and-icon">
                          {ownerOne &&
                            ownerTwo &&
                            ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                              <>
                                {ownerOne.h2h.regSzn[ownerTwo.ownerName].winningPct > ownerTwo.h2h.regSzn[ownerOne.ownerName].winningPct && (
                                  <>
                                    <span className="plus-minus green">
                                      {((ownerOne.h2h.regSzn[ownerTwo.ownerName].winningPct - ownerTwo.h2h.regSzn[ownerOne.ownerName].winningPct).toFixed(1))}%
                                    </span>
                                    <span className="arrow-icon green">
                                      <FaCaretUp />
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                        </div>
                      </div>
                      <div className="cell avgPts">
                        <span className="stat-value">
                        {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                            <>
                              {Number((ownerOne.h2h.regSzn[ownerTwo.ownerName].totalPointsFor / ownerOne.h2h.regSzn[ownerTwo.ownerName].RSgamesPlayed).toFixed(2))}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerOne.h2h.regSzn[ownerTwo.ownerName].avgPF > ownerTwo.h2h.regSzn[ownerOne.ownerName].avgPF &&
                        <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.h2h.regSzn[ownerTwo.ownerName].avgPF > ownerTwo.h2h.regSzn[ownerOne.ownerName].avgPF && `${((ownerOne.h2h.regSzn[ownerTwo.ownerName].avgPF - ownerTwo.h2h.regSzn[ownerOne.ownerName].avgPF)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                      <div className="cell avgPtsVField">
                        <span className="stat-value">{ownerOne && ownerOne.allTime.regSzn.RSavgPF}</span>
                        {ownerOne && ownerTwo && ownerOne.allTime.regSzn.RSavgPF > ownerTwo.allTime.regSzn.RSavgPF &&
                        <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.allTime.regSzn.RSavgPF > ownerTwo.allTime.regSzn.RSavgPF && `${((ownerOne.allTime.regSzn.RSavgPF - ownerTwo.allTime.regSzn.RSavgPF)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                      <div className="cell best-week">
                        <span className="stat-value">
                          {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.regSzn[ownerTwo.ownerName].bestWeek}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerOne.h2h.regSzn[ownerTwo.ownerName].bestWeek > ownerTwo.h2h.regSzn[ownerOne.ownerName].bestWeek &&
                        <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.h2h.regSzn[ownerTwo.ownerName].bestWeek > ownerTwo.h2h.regSzn[ownerOne.ownerName].bestWeek && `${((ownerOne.h2h.regSzn[ownerTwo.ownerName].bestWeek - ownerTwo.h2h.regSzn[ownerOne.ownerName].bestWeek)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                      <div className="cell worst-week">
                        <span className="stat-value">
                          {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.regSzn[ownerTwo.ownerName].worstWeek}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerOne.h2h.regSzn[ownerTwo.ownerName].worstWeek > ownerTwo.h2h.regSzn[ownerOne.ownerName].worstWeek && 
                        <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.h2h.regSzn[ownerTwo.ownerName].worstWeek > ownerTwo.h2h.regSzn[ownerOne.ownerName].worstWeek && `${((ownerOne.h2h.regSzn[ownerTwo.ownerName].worstWeek - ownerTwo.h2h.regSzn[ownerOne.ownerName].worstWeek)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                      <div className="cell total-points">
                        <span className="stat-value">
                          {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.regSzn[ownerTwo.ownerName].totalPointsFor}
                            </>
                          )}
                          </span>
                          {ownerOne && ownerTwo && ownerOne.h2h.regSzn[ownerTwo.ownerName].totalPointsFor > ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor &&
                          <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.h2h.regSzn[ownerTwo.ownerName].totalPointsFor > ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor && `${((ownerOne.h2h.regSzn[ownerTwo.ownerName].totalPointsFor - ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                    </div>
                    {/* MIDDLE SECTION */}
                    <div className="stat-names">
                      <div className="main-cell cell stat stat-title">Stat</div>
                      <div className="cell stat stat-one">Record</div>
                      <div className="cell stat stat-one">Win %</div>
                      <div className="cell stat stat-one">Avg. Pts</div>
                      <div className="cell stat stat-one">Avg. Pts v Field</div>
                      <div className="cell stat stat-one">Best Week</div>
                      <div className="cell stat stat-one">Worst Week</div>
                      <div className="cell stat stat-one">Total Points</div>
                    </div>
                    {/* OWNER TWO */}
                    <div className="owner-stats owner-two-stats">
                      <div className="main-cell owner-name owner-two-name">
                        {ownerTwo?.ownerName.split(" ")[0]}
                      </div>
                      <div className="cell record owner-two-record">
                          {ownerOne &&
                          ownerTwo &&
                          ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                            <>
                              {ownerTwo.h2h.regSzn[ownerOne.ownerName].wins} - {ownerTwo.h2h.regSzn[ownerOne.ownerName].losses} - {ownerTwo.h2h.regSzn[ownerOne.ownerName].ties}
                            </>
                          )}
                      </div>
                      <div className="cell win-pct">
                        <span className="stat-value">
                          {ownerOne &&
                            ownerTwo &&
                            ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                              <>
                                {((ownerTwo.h2h.regSzn[ownerOne.ownerName].wins / ownerTwo.h2h.regSzn[ownerOne.ownerName].RSgamesPlayed) * 100).toFixed(1)}%
                              </>
                            )}
                        </span>
                        <div className="plus-minus-and-icon">
                          {ownerTwo &&
                            ownerOne &&
                            ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                              <>
                                {ownerTwo.h2h.regSzn[ownerOne.ownerName].winningPct > ownerOne.h2h.regSzn[ownerTwo.ownerName].winningPct && (
                                  <>
                                  <span className="arrow-icon green">
                                      <FaCaretUp />
                                    </span>
                                    <span className="plus-minus green">
                                      {((ownerTwo.h2h.regSzn[ownerOne.ownerName].winningPct - ownerOne.h2h.regSzn[ownerTwo.ownerName].winningPct)).toFixed(2)}
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                        </div>
                      </div>
                      <div className="cell avgPts">
                        <span className="stat-value">
                        {ownerTwo &&
                          ownerOne &&
                          ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                            <>
                              {Number((ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor / ownerTwo.h2h.regSzn[ownerOne.ownerName].RSgamesPlayed).toFixed(2))}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerTwo.h2h.regSzn[ownerOne.ownerName].avgPF > ownerOne.h2h.regSzn[ownerTwo.ownerName].avgPF &&
                        <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                                <>
                                  {ownerTwo.h2h.regSzn[ownerOne.ownerName].avgPF > ownerOne.h2h.regSzn[ownerTwo.ownerName].avgPF && `${((ownerTwo.h2h.regSzn[ownerOne.ownerName].avgPF - ownerOne.h2h.regSzn[ownerTwo.ownerName].avgPF)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                      <div className="cell avgPtsVField">
                        <span className="stat-value">{ownerTwo && ownerTwo.allTime.regSzn.RSavgPF}</span>
                        {ownerOne && ownerTwo && ownerTwo.allTime.regSzn.RSavgPF > ownerOne.allTime.regSzn.RSavgPF &&
                        <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                                <>
                                  {ownerTwo.allTime.regSzn.RSavgPF > ownerOne.allTime.regSzn.RSavgPF && `${((ownerTwo.allTime.regSzn.RSavgPF - ownerOne.allTime.regSzn.RSavgPF)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                      <div className="cell best-week">
                        <span className="stat-value">
                          {ownerTwo &&
                          ownerOne &&
                          ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                            <>
                              {ownerTwo.h2h.regSzn[ownerOne.ownerName].bestWeek}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerTwo.h2h.regSzn[ownerOne.ownerName].bestWeek > ownerOne.h2h.regSzn[ownerTwo.ownerName].bestWeek && 
                        <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                                <>
                                  {ownerTwo.h2h.regSzn[ownerOne.ownerName].bestWeek > ownerOne.h2h.regSzn[ownerTwo.ownerName].bestWeek && `${((ownerTwo.h2h.regSzn[ownerOne.ownerName].bestWeek - ownerOne.h2h.regSzn[ownerTwo.ownerName].bestWeek)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                      <div className="cell worst-week">
                          <span className="stat-value">
                          {ownerTwo &&
                          ownerOne &&
                          ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                            <>
                              {ownerTwo.h2h.regSzn[ownerOne.ownerName].worstWeek}
                            </>
                          )}
                        </span>
                        {(ownerOne && ownerTwo && ownerTwo.h2h.regSzn[ownerOne.ownerName].worstWeek > ownerOne.h2h.regSzn[ownerTwo.ownerName].worstWeek) &&
                        <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                                <>
                                  {(ownerTwo.h2h.regSzn[ownerOne.ownerName].worstWeek > ownerOne.h2h.regSzn[ownerTwo.ownerName].worstWeek) && `${((ownerTwo.h2h.regSzn[ownerOne.ownerName].worstWeek - ownerOne.h2h.regSzn[ownerTwo.ownerName].worstWeek).toFixed(2))}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                      <div className="cell total-points">
                        <span className="stat-value">
                          {ownerTwo &&
                          ownerOne &&
                          ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                            <>
                              {ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor}
                            </>
                          )}
                          </span>
                          {ownerOne && ownerTwo && ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor > ownerOne.h2h.regSzn[ownerTwo.ownerName].totalPointsFor &&
                          <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                                <>
                                  {ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor > ownerOne.h2h.regSzn[ownerTwo.ownerName].totalPointsFor && `${((ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor - ownerOne.h2h.regSzn[ownerTwo.ownerName].totalPointsFor)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeFilterButton === "playoffs" ? (
                <div className="playoff-content h2h-content-wrapper-temp">
                  <div className="h2h-content h2h-content-wrapper">
                    {/* OWNER ONE */}
                    <div className="owner-stats owner-one-stats">
                      <div className="main-cell owner-name owner-one-name">
                       {ownerOne?.ownerName.split(" ")[0]}
                      </div>
                      <div className="cell record owner-one-record">
                        {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.playoffs[ownerTwo.ownerName].wins} - {ownerOne.h2h.playoffs[ownerTwo.ownerName].losses} - {ownerOne.h2h.playoffs[ownerTwo.ownerName].ties}
                            </>
                          )}
                      </div>
                      <div className="cell win-pct">
                        <span className="stat-value">
                          {ownerOne &&
                            ownerTwo &&
                            ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                              <>
                                {isNaN(((ownerOne.h2h.playoffs[ownerTwo.ownerName].wins / ownerOne.h2h.playoffs[ownerTwo.ownerName].POgamesPlayed) * 100)) ? "-" : (((ownerOne.h2h.playoffs[ownerTwo.ownerName].wins / ownerOne.h2h.playoffs[ownerTwo.ownerName].POgamesPlayed) * 100).toFixed(1)) + "%"}
                              </>
                            )}
                        </span>
                        <div className="plus-minus-and-icon">
                          {ownerOne &&
                            ownerTwo &&
                            ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                              <>
                                {ownerOne.h2h.playoffs[ownerTwo.ownerName].winningPct > ownerTwo.h2h.playoffs[ownerOne.ownerName].winningPct && (
                                  <>
                                    <span className="plus-minus green">
                                      {Number(((ownerOne.h2h.playoffs[ownerTwo.ownerName].winningPct - ownerTwo.h2h.playoffs[ownerOne.ownerName].winningPct).toFixed(1)))}%
                                    </span>
                                    <span className="arrow-icon green">
                                      <FaCaretUp />
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                        </div>
                      </div>
                      <div className="cell avgPts">
                        <span className="stat-value">
                        {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                            <>
                              {isNaN(Number((ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor / ownerOne.h2h.playoffs[ownerTwo.ownerName].POgamesPlayed))) ? "-" : Number(((ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor / ownerOne.h2h.playoffs[ownerTwo.ownerName].POgamesPlayed)).toFixed(2)) }
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerOne.h2h.playoffs[ownerTwo.ownerName].avgPF > ownerTwo.h2h.playoffs[ownerOne.ownerName].avgPF &&
                        <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.h2h.playoffs[ownerTwo.ownerName].avgPF > ownerTwo.h2h.playoffs[ownerOne.ownerName].avgPF && `${((ownerOne.h2h.playoffs[ownerTwo.ownerName].avgPF - ownerTwo.h2h.playoffs[ownerOne.ownerName].avgPF)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                      <div className="cell avgPtsVField">
                        <span className="stat-value">{ownerOne && (ownerOne.allTime.playoffs.POavgPF === 0 ? "-" : ownerOne.allTime.playoffs.POavgPF )}</span>
                        {ownerOne && ownerTwo && ownerOne.allTime.playoffs.POavgPF > ownerTwo.allTime.playoffs.POavgPF &&
                        <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.allTime.playoffs.POavgPF > ownerTwo.allTime.playoffs.POavgPF && `${((ownerOne.allTime.playoffs.POavgPF - ownerTwo.allTime.playoffs.POavgPF)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                      <div className="cell best-week">
                        <span className="stat-value">
                          {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek === 0 ? "-" : ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek > ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek &&
                        <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek > ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek && `${((ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek - ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                      <div className="cell worst-week">
                        <span className="stat-value">
                          {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek === 0 ? "-" : ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek > ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek && 
                        <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek > ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek && `${((ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek - ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                      <div className="cell total-points">
                        <span className="stat-value">
                          {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor === 0 ? "-" : ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor}
                            </>
                          )}
                          </span>
                          {ownerOne && ownerTwo && ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor > ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor &&
                          <div className="plus-minus-and-icon">
                          <span className="plus-minus green">
                            {ownerOne &&
                              ownerTwo &&
                              ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                                <>
                                  {ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor > ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor && `${((ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor - ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                        </div>}
                      </div>
                    </div>
                    {/* MIDDLE SECTION */}
                    <div className="stat-names">
                      <div className="main-cell cell stat stat-title">Stat</div>
                      <div className="cell stat stat-one">Record</div>
                      <div className="cell stat stat-one">Win %</div>
                      <div className="cell stat stat-one">Avg. Pts</div>
                      <div className="cell stat stat-one">Avg. Pts v Field</div>
                      <div className="cell stat stat-one">Best Week</div>
                      <div className="cell stat stat-one">Worst Week</div>
                      <div className="cell stat stat-one">Total Points</div>
                    </div>
                    {/* OWNER TWO */}
                    <div className="owner-stats owner-two-stats">
                      <div className="main-cell owner-name owner-two-name">
                        {ownerTwo?.ownerName.split(" ")[0]}
                      </div>
                      <div className="cell record owner-two-record">
                          {ownerOne &&
                          ownerTwo &&
                          ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                            <>
                              {ownerTwo.h2h.playoffs[ownerOne.ownerName].wins} - {ownerTwo.h2h.playoffs[ownerOne.ownerName].losses} - {ownerTwo.h2h.playoffs[ownerOne.ownerName].ties}
                            </>
                          )}
                      </div>
                      <div className="cell win-pct">
                        <span className="stat-value">
                          {ownerOne &&
                            ownerTwo &&
                            ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                              <>
                                {isNaN(((ownerTwo.h2h.playoffs[ownerOne.ownerName].wins / ownerTwo.h2h.playoffs[ownerOne.ownerName].POgamesPlayed) * 100)) ? "-" : Number((((ownerTwo.h2h.playoffs[ownerOne.ownerName].wins / ownerTwo.h2h.playoffs[ownerOne.ownerName].POgamesPlayed) * 100)).toFixed(2)) + "%"}
                              </>
                            )}
                        </span>
                        <div className="plus-minus-and-icon">
                          {ownerTwo &&
                            ownerOne &&
                            ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                              <>
                                {ownerTwo.h2h.playoffs[ownerOne.ownerName].winningPct > ownerOne.h2h.playoffs[ownerTwo.ownerName].winningPct && (
                                  <>
                                  <span className="arrow-icon green">
                                      <FaCaretUp />
                                    </span>
                                    <span className="plus-minus green">
                                      {((ownerTwo.h2h.playoffs[ownerOne.ownerName].winningPct - ownerOne.h2h.playoffs[ownerTwo.ownerName].winningPct)).toFixed(2)}
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                        </div>
                      </div>
                      <div className="cell avgPts">
                        <span className="stat-value">
                        {ownerTwo &&
                          ownerOne &&
                          ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                            <>
                              {isNaN(Number((ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor / ownerTwo.h2h.playoffs[ownerOne.ownerName].POgamesPlayed))) ? "-" : (Number(((ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor / ownerTwo.h2h.playoffs[ownerOne.ownerName].POgamesPlayed))).toFixed(2))}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerTwo.h2h.playoffs[ownerOne.ownerName].avgPF > ownerOne.h2h.playoffs[ownerTwo.ownerName].avgPF &&
                        <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                                <>
                                  {ownerTwo.h2h.playoffs[ownerOne.ownerName].avgPF > ownerOne.h2h.playoffs[ownerTwo.ownerName].avgPF && `${((ownerTwo.h2h.playoffs[ownerOne.ownerName].avgPF - ownerOne.h2h.playoffs[ownerTwo.ownerName].avgPF)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                      <div className="cell avgPtsVField">
                        <span className="stat-value">{ownerTwo && (ownerTwo.allTime.playoffs.POavgPF === 0 ? "-" : ownerTwo.allTime.playoffs.POavgPF) }</span>
                        {ownerOne && ownerTwo && ownerTwo.allTime.playoffs.POavgPF > ownerOne.allTime.playoffs.POavgPF &&
                        <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                                <>
                                  {ownerTwo.allTime.playoffs.POavgPF > ownerOne.allTime.playoffs.POavgPF && `${((ownerTwo.allTime.playoffs.POavgPF - ownerOne.allTime.playoffs.POavgPF)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                      <div className="cell best-week">
                        <span className="stat-value">
                          {ownerTwo &&
                          ownerOne &&
                          ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                            <>
                              {ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek === 0 ? "-" : ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek}
                            </>
                          )}
                        </span>
                        {ownerOne && ownerTwo && ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek > ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek && 
                        <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                                <>
                                  {ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek > ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek && `${((ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek - ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                      <div className="cell worst-week">
                          <span className="stat-value">
                          {ownerTwo &&
                          ownerOne &&
                          ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                            <>
                              {ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek === 0 ? "-" : ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek}
                            </>
                          )}
                        </span>
                        {(ownerOne && ownerTwo && ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek > ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek) &&
                        <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                                <>
                                  {(ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek > ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek) && `${((ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek - ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek).toFixed(2))}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                      <div className="cell total-points">
                        <span className="stat-value">
                          {ownerTwo &&
                          ownerOne &&
                          ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                            <>
                              {ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor === 0 ? "-" : ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor}
                            </>
                          )}
                          </span>
                          {ownerOne && ownerTwo && ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor > ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor &&
                          <div className="plus-minus-and-icon">
                          <span className="arrow-icon green">
                            <FaCaretUp />
                          </span>
                          <span className="plus-minus green">
                            {ownerTwo &&
                              ownerOne &&
                              ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                                <>
                                  {ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor > ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor && `${((ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor - ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor)).toFixed(2)}`}
                                </>
                              )}
                          </span>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>ERROR</div>
              )}
            </div>
          ) : activeButton === "yearly" ? (
            <div className="compare-yearly">
              <nav className="compare-nav">
                <button
                  onClick={() => setShowYearDropdown(!showYearDropdown)}
                  className={`year-selector`}
                >
                  {selectedYear}{" "}
                  <span className="year-selector-arrow">
                    {showYearDropdown ? (
                      <FaAngleDoubleDown />
                    ) : (
                      <FaAngleDoubleLeft />
                    )}
                  </span>
                </button>
                <div
                  className={`year-dropdown disable-scrollbars ${
                    showYearDropdown ? "show" : ""
                  }`}
                >
                  <ul className="dropdown-list disable-scrollbars">
                    {data &&
                      Object.keys(data[0]).map((key) => {
                        if (isNaN(Number(key))) return null
                        return (
                          <li key={key}>
                            <button
                              className={`dropdown-button ${
                                selectedYear === key ? "selected" : ""
                              }`}
                              onClick={() => handleYearSelect(key)}
                            >
                              {key}
                            </button>
                          </li>
                        )
                      })}
                  </ul>
                </div>
              </nav>
              <div className="h2h-content-wrapper disable-scrollbars">
                <div className="h2h-content h2h-content-wrapper">
                  <div className="owner-stats owner-one-stats">
                    <div className="main-cell owner-name owner-one-name">
                      Shawn B.
                    </div>
                    <div className="cell record owner-one-record">2-10</div>
                    <div className="cell avgPts">
                      <span className="stat-value">118.2</span>
                      {/* <div className="plus-minus-and-icon">
                        <span className="plus-minus red">-9.2</span>
                        <span className="arrow-icon red">
                          <FaCaretDown />
                        </span>
                      </div> */}
                    </div>
                    <div className="cell avtPtsVField">
                      <span className="stat-value">125.2 </span>
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">+5.1</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>
                    </div>
                    <div className="cell playoff-rate">
                      <span className="stat-value">72.3%</span>
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">+20.3</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">163.2</span>
                      {/* <div className="plus-minus-and-icon">
                        <span className="plus-minus red">-24.1</span>
                        <span className="arrow-icon red">
                          <FaCaretDown />
                        </span>
                      </div> */}
                    </div>
                    <div className="cell worst-week red">
                      <span className="stat-value">74.7</span>
                      {/* <div className="plus-minus-and-icon">
                        <span className="plus-minus red">-8.5</span>
                        <span className="arrow-icon red">
                          <FaCaretDown />
                        </span>
                      </div> */}
                    </div>
                    <div className="cell total-points">
                      <span className="stat-value">1272.3</span>
                      {/* <div className="plus-minus-and-icon">
                        <span className="plus-minus red">-157.2</span>
                        <span className="arrow-icon red">
                          <FaCaretDown />
                        </span>
                      </div> */}
                    </div>
                    <div className="cell another">145-123</div>
                    <div className="cell one-more">1272.3</div>
                    <div className="cell not-copied">145-123</div>
                  </div>
                  <div className="stat-names">
                    <div className="main-cell cell stat stat-title">Stat</div>
                    <div className="cell stat stat-one">Record</div>
                    <div className="cell stat stat-one">Avg. Pts</div>
                    <div className="cell stat stat-one">Avg. Pts v Field</div>
                    <div className="cell stat stat-one">Playoff Rate</div>
                    <div className="cell stat stat-one">Best Week</div>
                    <div className="cell stat stat-one">Worst Week</div>
                    <div className="cell stat stat-one">Total Points</div>
                    <div className="cell stat stat-one">Stat</div>
                    <div className="cell stat stat-one">Another</div>
                    <div className="cell stat stat-one">One More</div>
                    <div className="cell stat stat-one">Not Copied</div>
                    <div className="cell stat stat-one">Brand New</div>
                    <div className="cell stat stat-one">Worst Week</div>
                  </div>
                  <div className="owner-stats owner-two-stats">
                    <div className="main-cell owner-name owner-two-name">
                      Don I.
                    </div>
                    <div className="cell record owner-two-record">10-2</div>
                    <div className="cell avgPts">
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">+9.2</span>
                      </div>
                      <div className="stat-value">127.8</div>
                    </div>
                    <div className="cell avtPtsVField">
                      {/* <div className="plus-minus-and-icon">
                        <span className="arrow-icon red">
                          <FaCaretDown />
                        </span>
                        <span className="plus-minus red">-5.1</span>
                      </div> */}
                      <span className="stat-value">120.3</span>
                    </div>
                    <div className="cell playoff-rate">
                      {/* <div className="plus-minus-and-icon">
                        <span className="arrow-icon red">
                          <FaCaretDown />
                        </span>
                        <span className="plus-minus red">-20.3</span>
                      </div> */}
                      <span className="stat-value">52.1%</span>
                    </div>
                    <div className="cell best-week">
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">+24.1</span>
                      </div>
                      <span className="stat-value">187.9</span>
                    </div>
                    <div className="cell worst-week green">
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">+8.5</span>
                      </div>
                      <span className="stat-value">82.7</span>
                    </div>
                    <div className="cell total-points">
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">+157.2</span>
                      </div>
                      <span className="stat-value">1432.8</span>
                    </div>
                    <div className="cell another">123-153</div>
                    <div className="cell one-more">1272.3</div>
                    <div className="cell not-copied">123-152</div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeButton === "allTime" ? (
            <div className="compare-all-time">
              <h2 className="all-time-header">All-Time Performance</h2>
              <div className="h2h-content-wrapper disable-scrollbars">
                <div className="h2h-content h2h-content-wrapper">
                  <div className="owner-stats owner-one-stats">
                    <div className="main-cell owner-name owner-one-name">
                      Shawn B.
                    </div>
                    <div className="cell record owner-one-record">2-10</div>
                    <div className="cell avgPts">
                      <span className="stat-value">118.2</span>
                      {/* <div className="plus-minus-and-icon">
                        <span className="plus-minus red">-9.2</span>
                        <span className="arrow-icon red">
                          <FaCaretDown />
                        </span>
                      </div> */}
                    </div>
                    <div className="cell avtPtsVField">
                      <span className="stat-value">125.2 </span>
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">+5.1</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>
                    </div>
                    <div className="cell playoff-rate">
                      <span className="stat-value">72.3%</span>
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">+20.3</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">163.2</span>
                      {/* <div className="plus-minus-and-icon">
                        <span className="plus-minus red">-24.1</span>
                        <span className="arrow-icon red">
                          <FaCaretDown />
                        </span>
                      </div> */}
                    </div>
                    <div className="cell worst-week red">
                      <span className="stat-value">74.7</span>
                      {/* <div className="plus-minus-and-icon">
                        <span className="plus-minus red">-8.5</span>
                        <span className="arrow-icon red">
                          <FaCaretDown />
                        </span>
                      </div> */}
                    </div>
                    <div className="cell total-points">
                      <span className="stat-value">1272.3</span>
                      {/* <div className="plus-minus-and-icon">
                        <span className="plus-minus red">-157.2</span>
                        <span className="arrow-icon red">
                          <FaCaretDown />
                        </span>
                      </div> */}
                    </div>
                    <div className="cell another">145-123</div>
                    <div className="cell one-more">1272.3</div>
                    <div className="cell not-copied">145-123</div>
                  </div>
                  <div className="stat-names">
                    <div className="main-cell cell stat stat-title">Stat</div>
                    <div className="cell stat stat-one">Record</div>
                    <div className="cell stat stat-one">Avg. Pts</div>
                    <div className="cell stat stat-one">Avg. Pts v Field</div>
                    <div className="cell stat stat-one">Playoff Rate</div>
                    <div className="cell stat stat-one">Best Week</div>
                    <div className="cell stat stat-one">Worst Week</div>
                    <div className="cell stat stat-one">Total Points</div>
                    <div className="cell stat stat-one">Stat</div>
                    <div className="cell stat stat-one">Another</div>
                    <div className="cell stat stat-one">One More</div>
                    <div className="cell stat stat-one">Not Copied</div>
                    <div className="cell stat stat-one">Brand New</div>
                    <div className="cell stat stat-one">Worst Week</div>
                  </div>
                  <div className="owner-stats owner-two-stats">
                    <div className="main-cell owner-name owner-two-name">
                      Don I.
                    </div>
                    <div className="cell record owner-two-record">10-2</div>
                    <div className="cell avgPts">
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">+9.2</span>
                      </div>
                      <div className="stat-value">127.8</div>
                    </div>
                    <div className="cell avtPtsVField">
                      {/* <div className="plus-minus-and-icon">
                        <span className="arrow-icon red">
                          <FaCaretDown />
                        </span>
                        <span className="plus-minus red">-5.1</span>
                      </div> */}
                      <span className="stat-value">120.3</span>
                    </div>
                    <div className="cell playoff-rate">
                      {/* <div className="plus-minus-and-icon">
                        <span className="arrow-icon red">
                          <FaCaretDown />
                        </span>
                        <span className="plus-minus red">-20.3</span>
                      </div> */}
                      <span className="stat-value">52.1%</span>
                    </div>
                    <div className="cell best-week">
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">+24.1</span>
                      </div>
                      <span className="stat-value">187.9</span>
                    </div>
                    <div className="cell worst-week green">
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">+8.5</span>
                      </div>
                      <span className="stat-value">82.7</span>
                    </div>
                    <div className="cell total-points">
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">+157.2</span>
                      </div>
                      <span className="stat-value">1432.8</span>
                    </div>
                    <div className="cell another">123-153</div>
                    <div className="cell one-more">1272.3</div>
                    <div className="cell not-copied">123-152</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "Error"
          )}
        </div>
        <div className="owner-two-selector-wrapper selector-wrapper">
          <div className="selector-header">
            {ownerTwo &&
            <button onClick={() => handleOwnerSwitch(ownerTwo, "back")} className="arrow arrow-left">
              <span>
                <FaAngleDoubleLeft />
              </span>
              Prev{" "}
            </button>}
            <div className="spacer"></div>
            <h2 className="owner-one-name owner-name">
              {ownerTwo?.ownerName &&
                (() => {
                  const [firstName, lastName] = ownerTwo.ownerName.split(" ");
                  const lastInitial = lastName ? lastName.charAt(0) : "";
                  return `${firstName} ${lastInitial}.`;
                })()}
            </h2>
            <div className="spacer"></div>
            {ownerTwo && 
            <button onClick={() => handleOwnerSwitch(ownerTwo, "forward")} className="arrow arrow-right">
              Next{" "}
              <span>
                <FaAngleDoubleRight />
              </span>
            </button>}
          </div>
          <div className="selector-body">
            <img src="/profileImg.png" alt="profile" />
            <div className="main-stats-wrapper">
              <div className="main-stats main-stats-left">
                <h2 className="stat stat1">
                  Championships:{" "}
                  <span className="icons">
                    {ownerTwo && ownerTwo?.bonusStats.championships! > 0 ? new Array(ownerTwo?.bonusStats.championships).fill(null).map((_, index) => <FaTrophy key={index}/>) : "-"}
                  </span>
                </h2>
                <h2 className="stat stat2">
                  KOTH Wins:{" "}
                  <span className="icons">
                    <FaCrown /> <FaCrown /> <FaCrown />
                  </span>
                </h2>
              </div>
              <div className="main-stats main-stats-right">
                <h2 className="stat stat3">
                  Skirts:{" "}
                  <span className="icons">
                    {ownerTwo && ownerTwo?.bonusStats.skirts! > 0 ? new Array(ownerTwo?.bonusStats.skirts).fill(null).map((_, index) => <GiLargeDress key={index}/>) : "-"}
                  </span>
                </h2>
                <h2 className="stat stat4">
                  Avg. Finish: <span className="icons">{ownerTwo && ownerTwo.bonusStats.avgFinishPlace}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
