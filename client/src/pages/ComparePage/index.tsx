import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { useFetchStaticDataQuery } from "../../redux/owners/ownersApi"
import { MdCompareArrows } from "react-icons/md"
import { IoMdSwap } from "react-icons/io";
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
  // SET YEAR TO CURRENT WHEN YOU ADD THE STATS
  const [selectedYear, setSelectedYear] = useState<string>("2022")
  const [ownerOne, setOwnerOne] = useState<StaticOwner | null>(null)
  const [ownerTwo, setOwnerTwo] = useState<StaticOwner | null>(null)

  function handleYearSelect(year: string) {
    setShowYearDropdown(false)
    setSelectedYear(year)
  }

  // console.log(ownerOne, ownerTwo)

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

  const owner1Participated = ownerOne?.yearly[selectedYear].participated
  const owner2Participated = ownerTwo?.yearly[selectedYear].participated
  
  const owner1ParticipatedPlayoffs = (ownerOne?.yearly[selectedYear].participated && ownerOne?.yearly[selectedYear].playoffStats.participated === true) ? true : false
  const owner2ParticipatedPlayoffs = (ownerTwo?.yearly[selectedYear].participated && ownerTwo?.yearly[selectedYear].playoffStats.participated === true) ? true : false

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
                className={`h2h-button ${activeButton === "h2h" ? "active" : ""}`}
                onClick={() => setActiveButton("h2h")}
              >
                <img src="/vsIcon.png" alt="" />
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
                       {ownerOne?.ownerName &&
                        (() => {
                          const [firstName, lastName] = ownerOne.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
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
                        {ownerTwo?.ownerName &&
                (() => {
                  const [firstName, lastName] = ownerTwo.ownerName.split(" ");
                  const lastInitial = lastName ? lastName.charAt(0) : "";
                  return `${firstName} ${lastInitial}.`;
                })()}
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
                       {ownerOne?.ownerName &&
                          (() => {
                            const [firstName, lastName] = ownerOne.ownerName.split(" ");
                            const lastInitial = lastName ? lastName.charAt(0) : "";
                            return `${firstName} ${lastInitial}.`;
                          })()}
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
                        {ownerTwo?.ownerName &&
                (() => {
                  const [firstName, lastName] = ownerTwo.ownerName.split(" ");
                  const lastInitial = lastName ? lastName.charAt(0) : "";
                  return `${firstName} ${lastInitial}.`;
                })()}
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
                       {ownerOne?.ownerName &&
                        (() => {
                          const [firstName, lastName] = ownerOne.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
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
                        {ownerTwo?.ownerName &&
                          (() => {
                            const [firstName, lastName] = ownerTwo.ownerName.split(" ");
                            const lastInitial = lastName ? lastName.charAt(0) : "";
                            return `${firstName} ${lastInitial}.`;
                          })()}
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
              <nav className="compare-nav-secondary">
                <div className="filter-buttons">
                  <button onClick={() => setActiveFilterButton("combined")}
                      className={`${
                        activeFilterButton === "combined" ? "active" : ""
                      }`}>C</button>
                  <button onClick={() => setActiveFilterButton("regszn")}
                      className={`${
                        activeFilterButton === "regszn" ? "active" : ""
                      }`}>RS</button>
                  <button onClick={() => setActiveFilterButton("playoffs")}
                      className={`${
                        activeFilterButton === "playoffs" ? "active" : ""
                      } last`}>P</button>
                </div>
                <div
                  onClick={() => setShowYearDropdown(!showYearDropdown)}
                  className={`year-selector`}
                >
                  {selectedYear}{" "}
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
                </span>
                </div>
                <div onClick={() => setShowYearDropdown(!showYearDropdown)} className="year-selector-arrow">
                    {showYearDropdown ? (
                      <FaAngleDoubleDown />
                    ) : (
                      <FaAngleDoubleLeft />
                    )}
                  </div>
                {/* <span
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
                </span> */}
              </nav>
              {activeFilterButton === "combined" ? 
              <div className="h2h-content-wrapper disable-scrollbars">
                <div className="h2h-content h2h-content-wrapper">
                  <div className="owner-stats owner-one-stats">
                    <div className="main-cell owner-name owner-one-name">
                      {ownerOne?.ownerName &&
                        (() => {
                          const [firstName, lastName] = ownerOne.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
                    </div>
                    <div className="cell record owner-one-record">
                      {ownerOne && owner1Participated === true ? (
                        <>
                          {ownerOne.yearly[selectedYear].combinedStats.wins} -{" "}
                          {ownerOne.yearly[selectedYear].combinedStats.losses} - {" "}
                          {ownerOne.yearly[selectedYear].combinedStats.ties}
                        </>
                      ) : "DNP"}
                    </div>
                    <div className="cell win-pct">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].combinedStats.winningPct.toFixed(1)}%</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].combinedStats.winningPct > ownerTwo?.yearly[selectedYear].combinedStats.winningPct) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].combinedStats.winningPct - ownerTwo?.yearly[selectedYear].combinedStats.winningPct).toFixed(1)}%
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell finished">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].combinedStats.finishPlace}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].combinedStats.finishPlace < ownerTwo?.yearly[selectedYear].combinedStats.finishPlace) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].combinedStats.finishPlace - ownerOne?.yearly[selectedYear].combinedStats.finishPlace)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPf">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].combinedStats.avgPF.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].combinedStats.avgPF > ownerTwo?.yearly[selectedYear].combinedStats.avgPF) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].combinedStats.avgPF - ownerTwo?.yearly[selectedYear].combinedStats.avgPF).toFixed(2)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPa">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].combinedStats.avgPA.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].combinedStats.avgPA > ownerTwo?.yearly[selectedYear].combinedStats.avgPA) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].combinedStats.avgPA - ownerTwo?.yearly[selectedYear].combinedStats.avgPA).toFixed(2)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].combinedStats.bestWeek.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].combinedStats.bestWeek > ownerTwo?.yearly[selectedYear].combinedStats.bestWeek) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].combinedStats.bestWeek - ownerTwo?.yearly[selectedYear].combinedStats.bestWeek).toFixed(2)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell worst-week">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].combinedStats.worstWeek.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].combinedStats.worstWeek > ownerTwo?.yearly[selectedYear].combinedStats.worstWeek) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].combinedStats.worstWeek - ownerTwo?.yearly[selectedYear].combinedStats.worstWeek).toFixed(2)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-for">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].combinedStats.pointsFor.toFixed(1)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].combinedStats.pointsFor > ownerTwo?.yearly[selectedYear].combinedStats.pointsFor) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].combinedStats.pointsFor - ownerTwo?.yearly[selectedYear].combinedStats.pointsFor).toFixed(1)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-against">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].combinedStats.pointsAgainst.toFixed(1)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].combinedStats.pointsAgainst > ownerTwo?.yearly[selectedYear].combinedStats.pointsAgainst) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].combinedStats.pointsAgainst - ownerTwo?.yearly[selectedYear].combinedStats.pointsAgainst).toFixed(1)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                  </div>
                  <div className="stat-names">
                    <div className="main-cell cell stat stat-title">Stat</div>
                    <div className="cell stat stat-one">Record</div>
                    <div className="cell stat stat-one">Win %</div>
                    <div className="cell stat stat-one">Finished</div>              
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
                          const [firstName, lastName] = ownerTwo.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
                    </div>
                    <div className="cell record owner-one-record">
                      {ownerTwo && ownerOne && ownerTwo.yearly[selectedYear].participated === true ? (
                        <>
                          {ownerTwo.yearly[selectedYear].combinedStats.wins} -{" "}
                          {ownerTwo.yearly[selectedYear].combinedStats.losses} - {" "}
                          {ownerTwo.yearly[selectedYear].combinedStats.ties}
                        </>
                      ) : "DNP"}
                    </div>
                    <div className="cell win-pct">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].combinedStats.winningPct.toFixed(1)}%</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].combinedStats.winningPct > ownerOne?.yearly[selectedYear].combinedStats.winningPct) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].combinedStats.winningPct - ownerOne?.yearly[selectedYear].combinedStats.winningPct).toFixed(1)}%
                        </span>
                      </div>}
                    </div>
                    <div className="cell finished">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].combinedStats.finishPlace}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].combinedStats.finishPlace < ownerOne?.yearly[selectedYear].combinedStats.finishPlace) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].combinedStats.finishPlace - ownerTwo?.yearly[selectedYear].combinedStats.finishPlace)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPf">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].combinedStats.avgPF.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].combinedStats.avgPF > ownerOne?.yearly[selectedYear].combinedStats.avgPF) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].combinedStats.avgPF - ownerOne?.yearly[selectedYear].combinedStats.avgPF).toFixed(2)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPa">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].combinedStats.avgPA.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].combinedStats.avgPA > ownerOne?.yearly[selectedYear].combinedStats.avgPA) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].combinedStats.avgPA - ownerOne?.yearly[selectedYear].combinedStats.avgPA).toFixed(2)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].combinedStats.bestWeek.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].combinedStats.bestWeek > ownerOne?.yearly[selectedYear].combinedStats.bestWeek) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].combinedStats.bestWeek - ownerOne?.yearly[selectedYear].combinedStats.bestWeek).toFixed(2)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell worst-week">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].combinedStats.worstWeek.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].combinedStats.worstWeek > ownerOne?.yearly[selectedYear].combinedStats.worstWeek) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].combinedStats.worstWeek - ownerOne?.yearly[selectedYear].combinedStats.worstWeek).toFixed(2)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-for">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].combinedStats.pointsFor.toFixed(1)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].combinedStats.pointsFor > ownerOne?.yearly[selectedYear].combinedStats.pointsFor) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].combinedStats.pointsFor - ownerOne?.yearly[selectedYear].combinedStats.pointsFor).toFixed(1)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-against">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].combinedStats.pointsAgainst.toFixed(1)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].combinedStats.pointsAgainst > ownerOne?.yearly[selectedYear].combinedStats.pointsAgainst) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].combinedStats.pointsAgainst - ownerOne?.yearly[selectedYear].combinedStats.pointsAgainst).toFixed(1)}
                        </span>
                      </div>}
                    </div>
                  </div>
                </div>
              </div> : activeFilterButton === "regszn" ? <div className="h2h-content-wrapper disable-scrollbars">
                <div className="h2h-content h2h-content-wrapper">
                  <div className="owner-stats owner-one-stats">
                    <div className="main-cell owner-name owner-one-name">
                      {ownerOne?.ownerName &&
                        (() => {
                          const [firstName, lastName] = ownerOne.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
                    </div>
                    <div className="cell record owner-one-record">
                      {ownerOne && owner1Participated === true ? (
                        <>
                          {ownerOne.yearly[selectedYear].regSznStats.wins} -{" "}
                          {ownerOne.yearly[selectedYear].regSznStats.losses} - {" "}
                          {ownerOne.yearly[selectedYear].regSznStats.ties}
                        </>
                      ) : "DNP"}
                    </div>
                    <div className="cell win-pct">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].regSznStats.winningPct.toFixed(1)}%</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].regSznStats.winningPct > ownerTwo?.yearly[selectedYear].regSznStats.winningPct) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].regSznStats.winningPct - ownerTwo?.yearly[selectedYear].regSznStats.winningPct).toFixed(1)}%
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    {/* NEED TO COMPARE WINPCT TO YOURSELF */}
                    <div className="cell ss-record">
                        <span className="stat-value">
                          {ownerOne &&
                            ownerTwo &&
                            (ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[selectedYear] && ownerTwo.yearly[selectedYear].participated === true) ? (
                              <>
                                {ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[selectedYear].scheduleSwapWins}{" - "}{ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[selectedYear].scheduleSwapLosses}{" - "}{ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[selectedYear].scheduleSwapTies}
                              </>
                            ) : "-"}
                        </span>
                    </div>
                    <div className="cell ss-winPct">
                        <span className="stat-value">
                          {ownerOne &&
                            ownerTwo &&
                            (ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[selectedYear] && ownerTwo.yearly[selectedYear].participated === true) ? (
                              <>
                                {ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[selectedYear].scheduleSwapWinPct.toFixed(1)}%
                              </>
                            ) : "-"}
                        </span>
                        <div className="plus-minus-and-icon">
                          {ownerOne &&
                            ownerTwo &&
                            ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[selectedYear] && (
                              <>
                                {ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[selectedYear].scheduleSwapWinPct > ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[selectedYear].scheduleSwapWinPct && (
                                  <>
                                    {/* <span className="plus-minus green">
                                      {(ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[selectedYear].scheduleSwapWinPct - ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[selectedYear].scheduleSwapWinPct).toFixed(1)}%
                                    </span> */}
                                    <span className="arrow-icon green">
                                      change{/* <FaCaretUp /> */}
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                        </div>
                    </div>
                    <div className="cell finished">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].regSznStats.finishPlace}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].regSznStats.finishPlace < ownerTwo?.yearly[selectedYear].regSznStats.finishPlace) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].regSznStats.finishPlace - ownerOne?.yearly[selectedYear].regSznStats.finishPlace)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPf">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].regSznStats.avgPF.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].regSznStats.avgPF > ownerTwo?.yearly[selectedYear].regSznStats.avgPF) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].regSznStats.avgPF - ownerTwo?.yearly[selectedYear].regSznStats.avgPF).toFixed(2)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPa">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].regSznStats.avgPA.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].regSznStats.avgPA > ownerTwo?.yearly[selectedYear].regSznStats.avgPA) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].regSznStats.avgPA - ownerTwo?.yearly[selectedYear].regSznStats.avgPA).toFixed(2)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].regSznStats.bestWeek.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].regSznStats.bestWeek > ownerTwo?.yearly[selectedYear].regSznStats.bestWeek) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].regSznStats.bestWeek - ownerTwo?.yearly[selectedYear].regSznStats.bestWeek).toFixed(2)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell worst-week">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].regSznStats.worstWeek.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].regSznStats.worstWeek > ownerTwo?.yearly[selectedYear].regSznStats.worstWeek) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].regSznStats.worstWeek - ownerTwo?.yearly[selectedYear].regSznStats.worstWeek).toFixed(2)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-for">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].regSznStats.pointsFor.toFixed(1)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].regSznStats.pointsFor > ownerTwo?.yearly[selectedYear].regSznStats.pointsFor) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].regSznStats.pointsFor - ownerTwo?.yearly[selectedYear].regSznStats.pointsFor).toFixed(1)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-against">
                      <span className="stat-value">
                        {ownerOne && owner1Participated === true ? <div>{ownerOne?.yearly[selectedYear].regSznStats.pointsAgainst.toFixed(1)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1Participated === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].regSznStats.pointsAgainst > ownerTwo?.yearly[selectedYear].regSznStats.pointsAgainst) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].regSznStats.pointsAgainst - ownerTwo?.yearly[selectedYear].regSznStats.pointsAgainst).toFixed(1)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                  </div>
                  <div className="stat-names">
                    <div className="main-cell cell stat stat-title">Stat</div>
                    <div className="cell stat stat-one">Record</div>
                    <div className="cell stat stat-one">Win %</div>
                    <div className="cell stat stat-one special">
                      <IoMdSwap /><span>Schedule</span>
                    </div>
                    <div className="cell stat stat-one special">
                      <IoMdSwap /><span>Win %</span>
                    </div>    
                    <div className="cell stat stat-one">Finished</div>
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
                          const [firstName, lastName] = ownerTwo.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
                    </div>
                    <div className="cell record owner-one-record">
                      {ownerTwo && ownerOne && ownerTwo.yearly[selectedYear].participated === true ? (
                        <>
                          {ownerTwo.yearly[selectedYear].regSznStats.wins} -{" "}
                          {ownerTwo.yearly[selectedYear].regSznStats.losses} - {" "}
                          {ownerTwo.yearly[selectedYear].regSznStats.ties}
                        </>
                      ) : "DNP"}
                    </div>
                    <div className="cell win-pct">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].regSznStats.winningPct.toFixed(1)}%</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].regSznStats.winningPct > ownerOne?.yearly[selectedYear].regSznStats.winningPct) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].regSznStats.winningPct - ownerOne?.yearly[selectedYear].regSznStats.winningPct).toFixed(1)}%
                        </span>
                      </div>}
                    </div>
                    <div className="cell ss-record">
                        <span className="stat-value">
                          {ownerOne &&
                            ownerTwo &&
                            (ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[selectedYear] && ownerOne.yearly[selectedYear].participated === true) ? (
                              <>
                                {ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[selectedYear].scheduleSwapWins}{" - "}{ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[selectedYear].scheduleSwapLosses}{" - "}{ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[selectedYear].scheduleSwapTies}
                              </>
                            ) : "-"}
                        </span>
                    </div>
                    <div className="cell ss-winPct">
                        <span className="stat-value">
                          {ownerTwo &&
                            ownerOne &&
                            (ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[selectedYear] && ownerOne.yearly[selectedYear].participated === true) ? (
                              <>
                                {ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[selectedYear].scheduleSwapWinPct.toFixed(1)}%
                              </>
                            ) : "-"}
                        </span>
                        <div className="plus-minus-and-icon">
                          {ownerTwo &&
                            ownerOne &&
                            ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[selectedYear] && (
                              <>
                                {ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[selectedYear].scheduleSwapWinPct > ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[selectedYear].scheduleSwapWinPct && (
                                  <>
                                    {/* <span className="plus-minus green">
                                      {(ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[selectedYear].scheduleSwapWinPct - ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[selectedYear].scheduleSwapWinPct).toFixed(1)}%
                                    </span> */}
                                    <span className="arrow-icon green">
                                      change{/* <FaCaretUp /> */}
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                        </div>
                    </div>
                    <div className="cell finished">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].regSznStats.finishPlace}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].regSznStats.finishPlace < ownerOne?.yearly[selectedYear].regSznStats.finishPlace) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].regSznStats.finishPlace - ownerTwo?.yearly[selectedYear].regSznStats.finishPlace)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPf">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].regSznStats.avgPF.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].regSznStats.avgPF > ownerOne?.yearly[selectedYear].regSznStats.avgPF) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].regSznStats.avgPF - ownerOne?.yearly[selectedYear].regSznStats.avgPF).toFixed(2)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPa">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].regSznStats.avgPA.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].regSznStats.avgPA > ownerOne?.yearly[selectedYear].regSznStats.avgPA) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].regSznStats.avgPA - ownerOne?.yearly[selectedYear].regSznStats.avgPA).toFixed(2)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].regSznStats.bestWeek.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].regSznStats.bestWeek > ownerOne?.yearly[selectedYear].regSznStats.bestWeek) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].regSznStats.bestWeek - ownerOne?.yearly[selectedYear].regSznStats.bestWeek).toFixed(2)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell worst-week">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].regSznStats.worstWeek.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].regSznStats.worstWeek > ownerOne?.yearly[selectedYear].regSznStats.worstWeek) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].regSznStats.worstWeek - ownerOne?.yearly[selectedYear].regSznStats.worstWeek).toFixed(2)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-for">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].regSznStats.pointsFor.toFixed(1)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].regSznStats.pointsFor > ownerOne?.yearly[selectedYear].regSznStats.pointsFor) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].regSznStats.pointsFor - ownerOne?.yearly[selectedYear].regSznStats.pointsFor).toFixed(1)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-against">
                      <span className="stat-value">
                        {ownerTwo && owner2Participated === true ? <div>{ownerTwo?.yearly[selectedYear].regSznStats.pointsAgainst.toFixed(1)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2Participated === true) && (ownerTwo?.yearly[selectedYear].regSznStats.pointsAgainst > ownerOne?.yearly[selectedYear].regSznStats.pointsAgainst) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].regSznStats.pointsAgainst - ownerOne?.yearly[selectedYear].regSznStats.pointsAgainst).toFixed(1)}
                        </span>
                      </div>}
                    </div>
                  </div>
                </div>
              </div> : activeFilterButton === "playoffs" ? <div className="h2h-content-wrapper disable-scrollbars">
                <div className="h2h-content h2h-content-wrapper">
                  <div className="owner-stats owner-one-stats">
                    <div className="main-cell owner-name owner-one-name">
                      {ownerOne?.ownerName &&
                        (() => {
                          const [firstName, lastName] = ownerOne.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
                    </div>
                    <div className="cell record owner-one-record">
                      {ownerOne && owner1ParticipatedPlayoffs === true ? (
                        <>
                          {ownerOne.yearly[selectedYear].playoffStats.wins} -{" "}
                          {ownerOne.yearly[selectedYear].playoffStats.losses} - {" "}
                          {ownerOne.yearly[selectedYear].playoffStats.ties}
                        </>
                      ) : "DNP"}
                    </div>
                    <div className="cell win-pct">
                      <span className="stat-value">
                        {ownerOne && owner1ParticipatedPlayoffs === true ? <div>{ownerOne?.yearly[selectedYear].playoffStats.winningPct.toFixed(1)}%</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1ParticipatedPlayoffs === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].playoffStats.winningPct > ownerTwo?.yearly[selectedYear].playoffStats.winningPct) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].playoffStats.winningPct - ownerTwo?.yearly[selectedYear].playoffStats.winningPct).toFixed(1)}%
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell finished">
                      <span className="stat-value">
                        {ownerOne && owner1ParticipatedPlayoffs === true ? <div>{ownerOne?.yearly[selectedYear].regSznStats.finishPlace}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1ParticipatedPlayoffs === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].regSznStats.finishPlace < ownerTwo?.yearly[selectedYear].regSznStats.finishPlace) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].regSznStats.finishPlace - ownerOne?.yearly[selectedYear].regSznStats.finishPlace)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPf">
                      <span className="stat-value">
                        {ownerOne && owner1ParticipatedPlayoffs === true ? <div>{ownerOne?.yearly[selectedYear].playoffStats.avgPF.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1ParticipatedPlayoffs === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].playoffStats.avgPF > ownerTwo?.yearly[selectedYear].playoffStats.avgPF) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].playoffStats.avgPF - ownerTwo?.yearly[selectedYear].playoffStats.avgPF).toFixed(2)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPa">
                      <span className="stat-value">
                        {ownerOne && owner1ParticipatedPlayoffs === true ? <div>{ownerOne?.yearly[selectedYear].playoffStats.avgPA.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1ParticipatedPlayoffs === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].playoffStats.avgPA > ownerTwo?.yearly[selectedYear].playoffStats.avgPA) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].playoffStats.avgPA - ownerTwo?.yearly[selectedYear].playoffStats.avgPA).toFixed(2)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">
                        {ownerOne && owner1ParticipatedPlayoffs === true ? <div>{ownerOne?.yearly[selectedYear].playoffStats.bestWeek.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1ParticipatedPlayoffs === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].playoffStats.bestWeek > ownerTwo?.yearly[selectedYear].playoffStats.bestWeek) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].playoffStats.bestWeek - ownerTwo?.yearly[selectedYear].playoffStats.bestWeek).toFixed(2)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell worst-week">
                      <span className="stat-value">
                        {ownerOne && owner1ParticipatedPlayoffs === true ? <div>{ownerOne?.yearly[selectedYear].playoffStats.worstWeek.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1ParticipatedPlayoffs === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].playoffStats.worstWeek > ownerTwo?.yearly[selectedYear].playoffStats.worstWeek) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].playoffStats.worstWeek - ownerTwo?.yearly[selectedYear].playoffStats.worstWeek).toFixed(2)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-for">
                      <span className="stat-value">
                        {ownerOne && owner1ParticipatedPlayoffs === true ? <div>{ownerOne?.yearly[selectedYear].playoffStats.pointsFor.toFixed(1)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1ParticipatedPlayoffs === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].playoffStats.pointsFor > ownerTwo?.yearly[selectedYear].playoffStats.pointsFor) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].playoffStats.pointsFor - ownerTwo?.yearly[selectedYear].playoffStats.pointsFor).toFixed(1)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-against">
                      <span className="stat-value">
                        {ownerOne && owner1ParticipatedPlayoffs === true ? <div>{ownerOne?.yearly[selectedYear].playoffStats.pointsAgainst.toFixed(1)}</div> : "DNP"}
                      </span>
                      {ownerOne && ownerTwo && (owner1ParticipatedPlayoffs === true && owner2Participated === true) && (ownerOne?.yearly[selectedYear].playoffStats.pointsAgainst > ownerTwo?.yearly[selectedYear].playoffStats.pointsAgainst) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].playoffStats.pointsAgainst - ownerTwo?.yearly[selectedYear].playoffStats.pointsAgainst).toFixed(1)}
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                  </div>
                  <div className="stat-names">
                    <div className="main-cell cell stat stat-title">Stat</div>
                    <div className="cell stat stat-one">Record</div>
                    <div className="cell stat stat-one">Win %</div>
                    <div className="cell stat stat-one">Finished</div>
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
                          const [firstName, lastName] = ownerTwo.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
                    </div>
                    <div className="cell record owner-one-record">
                      {ownerTwo && ownerOne && owner2ParticipatedPlayoffs === true ? (
                        <>
                          {ownerTwo.yearly[selectedYear].playoffStats.wins} -{" "}
                          {ownerTwo.yearly[selectedYear].playoffStats.losses} - {" "}
                          {ownerTwo.yearly[selectedYear].playoffStats.ties}
                        </>
                      ) : "DNP"}
                    </div>
                    <div className="cell win-pct">
                      <span className="stat-value">
                        {ownerTwo && owner2ParticipatedPlayoffs === true ? <div>{ownerTwo?.yearly[selectedYear].playoffStats.winningPct.toFixed(1)}%</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2ParticipatedPlayoffs === true) && (ownerTwo?.yearly[selectedYear].playoffStats.winningPct > ownerOne?.yearly[selectedYear].playoffStats.winningPct) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].playoffStats.winningPct - ownerOne?.yearly[selectedYear].playoffStats.winningPct).toFixed(1)}%
                        </span>
                      </div>}
                    </div>
                    <div className="cell finished">
                      <span className="stat-value">
                        {ownerTwo && owner2ParticipatedPlayoffs === true ? <div>{ownerTwo?.yearly[selectedYear].regSznStats.finishPlace}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2ParticipatedPlayoffs === true) && (ownerTwo?.yearly[selectedYear].regSznStats.finishPlace < ownerOne?.yearly[selectedYear].regSznStats.finishPlace) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerOne?.yearly[selectedYear].regSznStats.finishPlace - ownerTwo?.yearly[selectedYear].regSznStats.finishPlace)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPf">
                      <span className="stat-value">
                        {ownerTwo && owner2ParticipatedPlayoffs === true ? <div>{ownerTwo?.yearly[selectedYear].playoffStats.avgPF.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2ParticipatedPlayoffs === true) && (ownerTwo?.yearly[selectedYear].playoffStats.avgPF > ownerOne?.yearly[selectedYear].playoffStats.avgPF) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].playoffStats.avgPF - ownerOne?.yearly[selectedYear].playoffStats.avgPF).toFixed(2)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPa">
                      <span className="stat-value">
                        {ownerTwo && owner2ParticipatedPlayoffs === true ? <div>{ownerTwo?.yearly[selectedYear].playoffStats.avgPA.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2ParticipatedPlayoffs === true) && (ownerTwo?.yearly[selectedYear].playoffStats.avgPA > ownerOne?.yearly[selectedYear].playoffStats.avgPA) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].playoffStats.avgPA - ownerOne?.yearly[selectedYear].playoffStats.avgPA).toFixed(2)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">
                        {ownerTwo && owner2ParticipatedPlayoffs === true ? <div>{ownerTwo?.yearly[selectedYear].playoffStats.bestWeek.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2ParticipatedPlayoffs === true) && (ownerTwo?.yearly[selectedYear].playoffStats.bestWeek > ownerOne?.yearly[selectedYear].playoffStats.bestWeek) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].playoffStats.bestWeek - ownerOne?.yearly[selectedYear].playoffStats.bestWeek).toFixed(2)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell worst-week">
                      <span className="stat-value">
                        {ownerTwo && owner2ParticipatedPlayoffs === true ? <div>{ownerTwo?.yearly[selectedYear].playoffStats.worstWeek.toFixed(2)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2ParticipatedPlayoffs === true) && (ownerTwo?.yearly[selectedYear].playoffStats.worstWeek > ownerOne?.yearly[selectedYear].playoffStats.worstWeek) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].playoffStats.worstWeek - ownerOne?.yearly[selectedYear].playoffStats.worstWeek).toFixed(2)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-for">
                      <span className="stat-value">
                        {ownerTwo && owner2ParticipatedPlayoffs === true ? <div>{ownerTwo?.yearly[selectedYear].playoffStats.pointsFor.toFixed(1)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2ParticipatedPlayoffs === true) && (ownerTwo?.yearly[selectedYear].playoffStats.pointsFor > ownerOne?.yearly[selectedYear].playoffStats.pointsFor) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].playoffStats.pointsFor - ownerOne?.yearly[selectedYear].playoffStats.pointsFor).toFixed(1)}
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-against">
                      <span className="stat-value">
                        {ownerTwo && owner2ParticipatedPlayoffs === true ? <div>{ownerTwo?.yearly[selectedYear].playoffStats.pointsAgainst.toFixed(1)}</div> : "DNP"}
                      </span>
                      {ownerTwo && ownerOne && (owner1Participated === true && owner2ParticipatedPlayoffs === true) && (ownerTwo?.yearly[selectedYear].playoffStats.pointsAgainst > ownerOne?.yearly[selectedYear].playoffStats.pointsAgainst) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.yearly[selectedYear].playoffStats.pointsAgainst - ownerOne?.yearly[selectedYear].playoffStats.pointsAgainst).toFixed(1)}
                        </span>
                      </div>}
                    </div>
                  </div>
                </div>
              </div> : "ERROR"}
            </div>
          ) : activeButton === "allTime" ? (
            <div className="compare-all-time">
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
              {activeFilterButton === "regszn" ? (
              <div className="h2h-content-wrapper disable-scrollbars">
                <div className="h2h-content h2h-content-wrapper">
                  {/* ALL TIME REGSZN OWNER ONE */}
                  <div className="owner-stats owner-one-stats">
                    <div className="main-cell owner-name owner-one-name">
                      {ownerOne?.ownerName &&
                        (() => {
                          const [firstName, lastName] = ownerOne.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
                    </div>
                    <div className="cell record owner-one-record">
                      {ownerOne?.allTime.regSzn.RSwins} - {ownerOne?.allTime.regSzn.RSlosses} - {ownerOne?.allTime.regSzn.RSties}
                    </div>
                    <div className="cell win-pct">
                      <span className="stat-value">{ownerOne?.allTime.regSzn.RSwinningPct.toFixed(1)}%</span>
                      {ownerOne && ownerTwo && (ownerOne?.allTime.regSzn.RSwinningPct > ownerTwo?.allTime.regSzn.RSwinningPct) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.allTime.regSzn.RSwinningPct - ownerTwo?.allTime.regSzn.RSwinningPct).toFixed(1)}%
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell etewRecord">
                      <span className="stat-value">{ownerOne?.bonusStats.     everyTeamEveryWeek.wins} - {ownerOne?.bonusStats.everyTeamEveryWeek.losses} - {ownerOne?.bonusStats.everyTeamEveryWeek.ties}
                      </span>
                    </div>
                    <div className="cell etewWinPct">
                      <span className="stat-value">{ownerOne && ownerOne?.bonusStats.everyTeamEveryWeek.winPct.toFixed(1)}%</span>

                      {ownerOne && ownerTwo && ownerOne?.bonusStats.everyTeamEveryWeek.winPct > ownerTwo?.bonusStats.everyTeamEveryWeek.winPct && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.bonusStats.everyTeamEveryWeek.winPct - ownerTwo?.bonusStats.everyTeamEveryWeek.winPct).toFixed(1)}%
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPf">
                      <span className="stat-value">{ownerOne?.allTime.regSzn.RSavgPF.toFixed(2)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.regSzn.RSavgPF > ownerTwo?.allTime.regSzn.RSavgPF && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.regSzn.RSavgPF - ownerTwo?.allTime.regSzn.RSavgPF).toFixed(2)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPa">
                      <span className="stat-value">{ownerOne?.allTime.regSzn.RSavgPA.toFixed(2)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.regSzn.RSavgPA > ownerTwo?.allTime.regSzn.RSavgPA && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.regSzn.RSavgPA - ownerTwo?.allTime.regSzn.RSavgPA).toFixed(2)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell playoff-rate">
                      <span className="stat-value">{ownerOne?.bonusStats.playoffRate.toFixed(1)}%</span>
                      {ownerOne && ownerTwo && ownerOne.bonusStats.playoffRate > ownerTwo?.bonusStats.playoffRate && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.bonusStats.playoffRate - ownerTwo?.bonusStats.playoffRate).toFixed(1)}%</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">{ownerOne?.allTime.regSzn.bestWeek.toFixed(2)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.regSzn.bestWeek > ownerTwo?.allTime.regSzn.bestWeek && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.regSzn.bestWeek - ownerTwo?.allTime.regSzn.bestWeek).toFixed(2)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell worst-week">
                      <span className="stat-value">{ownerOne?.allTime.regSzn.worstWeek.toFixed(2)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.regSzn.worstWeek > ownerTwo?.allTime.regSzn.worstWeek && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.regSzn.worstWeek - ownerTwo?.allTime.regSzn.worstWeek).toFixed(2)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell lucky-wins">
                      <span className="stat-value">{ownerOne?.bonusStats.luckyWins}</span>
                      {ownerOne && ownerTwo && ownerOne.bonusStats.luckyWins > ownerTwo?.bonusStats.luckyWins && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.bonusStats.luckyWins - ownerTwo?.bonusStats.luckyWins)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell unlucky-losses">
                      <span className="stat-value">{ownerOne?.bonusStats.unluckyLosses}</span>
                      {ownerOne && ownerTwo && ownerOne.bonusStats.unluckyLosses > ownerTwo?.bonusStats.unluckyLosses && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.bonusStats.unluckyLosses - ownerTwo?.bonusStats.unluckyLosses)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell highWSeason">
                      <span className="stat-value">{ownerOne?.bonusStats.mostWinsOneSeason}</span>
                      {ownerOne && ownerTwo && ownerOne.bonusStats.mostWinsOneSeason > ownerTwo?.bonusStats.mostWinsOneSeason && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.bonusStats.mostWinsOneSeason - ownerTwo?.bonusStats.mostWinsOneSeason)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell highLSeason">
                      <span className="stat-value">{ownerOne?.bonusStats.mostLossesOneSeason}</span>
                      {ownerOne && ownerTwo && ownerOne.bonusStats.mostLossesOneSeason > ownerTwo?.bonusStats.mostLossesOneSeason && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.bonusStats.mostLossesOneSeason - ownerTwo?.bonusStats.mostLossesOneSeason)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-for">
                      <span className="stat-value">{ownerOne?.allTime.regSzn.RSPF.toFixed(1)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.regSzn.RSPF > ownerTwo?.allTime.regSzn.RSPF && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.regSzn.RSPF - ownerTwo?.allTime.regSzn.RSPF).toFixed(1)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-against">
                      <span className="stat-value">{ownerOne?.allTime.regSzn.RSPA.toFixed(1)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.regSzn.RSPA > ownerTwo?.allTime.regSzn.RSPA && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.regSzn.RSPA - ownerTwo?.allTime.regSzn.RSPA).toFixed(1)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                  </div>
                  <div className="stat-names">
                    <div className="main-cell cell stat stat-title">Stat</div>
                    <div className="cell stat stat-one">Record</div>
                    <div className="cell stat stat-one">Win %</div>
                    <div className="cell stat stat-one">ETEW Record</div>
                    <div className="cell stat stat-one">ETEW Win %</div>
                    <div className="cell stat stat-one">Avg. PF</div>
                    <div className="cell stat stat-one">Avg. PA</div>
                    <div className="cell stat stat-one">Playoff Rate</div>
                    <div className="cell stat stat-one">Best Week</div>
                    <div className="cell stat stat-one">Worst Week</div>
                    <div className="cell stat stat-one">Lucky Ws</div>
                    <div className="cell stat stat-one">Unlucky Ls</div>
                    <div className="cell stat stat-one">High W Szn</div>
                    <div className="cell stat stat-one">High L Szn</div>
                    <div className="cell stat stat-one">Total PF</div>
                    <div className="cell stat stat-one">Total PA</div>
                  </div>
                   {/* ALL TIME REGSZN OWNER TWO */}
                  <div className="owner-stats owner-two-stats">
                    <div className="main-cell owner-name owner-two-name">
                      {ownerTwo?.ownerName &&
                        (() => {
                          const [firstName, lastName] = ownerTwo.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
                    </div>
                    <div className="cell record owner-one-record">
                      {ownerTwo?.allTime.regSzn.RSwins} - {ownerTwo?.allTime.regSzn.RSlosses} - {ownerTwo?.allTime.regSzn.RSties}
                    </div>
                    <div className="cell win-pct">
                      <span className="stat-value">{ownerTwo?.allTime.regSzn.RSwinningPct.toFixed(1)}%</span>
                      {ownerTwo && ownerOne && (ownerTwo?.allTime.regSzn.RSwinningPct > ownerOne?.allTime.regSzn.RSwinningPct) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.allTime.regSzn.RSwinningPct - ownerOne?.allTime.regSzn.RSwinningPct).toFixed(1)}%
                        </span>
                      </div>}
                    </div>
                    <div className="cell etewRecord">
                      <span className="stat-value">{ownerTwo?.bonusStats.     everyTeamEveryWeek.wins} - {ownerTwo?.bonusStats.everyTeamEveryWeek.losses} - {ownerTwo?.bonusStats.everyTeamEveryWeek.ties}
                      </span>
                    </div>
                    <div className="cell etewWinPct">
                      <span className="stat-value">{ownerTwo && ownerTwo?.bonusStats.everyTeamEveryWeek.winPct.toFixed(1)}%</span>

                      {ownerTwo && ownerOne && ownerTwo?.bonusStats.everyTeamEveryWeek.winPct > ownerOne?.bonusStats.everyTeamEveryWeek.winPct && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.bonusStats.everyTeamEveryWeek.winPct - ownerOne?.bonusStats.everyTeamEveryWeek.winPct).toFixed(1)}%
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPf">
                      <span className="stat-value">{ownerTwo?.allTime.regSzn.RSavgPF.toFixed(2)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.regSzn.RSavgPF > ownerOne?.allTime.regSzn.RSavgPF && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.regSzn.RSavgPF - ownerOne?.allTime.regSzn.RSavgPF).toFixed(2)}</span>
                      </div>}
                    </div>
                    <div className="cell avgPa">
                      <span className="stat-value">{ownerTwo?.allTime.regSzn.RSavgPA.toFixed(2)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.regSzn.RSavgPA > ownerOne?.allTime.regSzn.RSavgPA && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.regSzn.RSavgPA - ownerOne?.allTime.regSzn.RSavgPA).toFixed(2)}</span>
                      </div>}
                    </div>
                    <div className="cell playoff-rate">
                      <span className="stat-value">{ownerTwo?.bonusStats.playoffRate.toFixed(1)}%</span>
                      {ownerTwo && ownerOne && ownerTwo.bonusStats.playoffRate > ownerOne?.bonusStats.playoffRate && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.bonusStats.playoffRate - ownerOne?.bonusStats.playoffRate).toFixed(1)}%</span>
                      </div>}
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">{ownerTwo?.allTime.regSzn.bestWeek.toFixed(2)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.regSzn.bestWeek > ownerOne?.allTime.regSzn.bestWeek && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.regSzn.bestWeek - ownerOne?.allTime.regSzn.bestWeek).toFixed(2)}</span>
                      </div>}
                    </div>
                    <div className="cell worst-week">
                      <span className="stat-value">{ownerTwo?.allTime.regSzn.worstWeek.toFixed(2)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.regSzn.worstWeek > ownerOne?.allTime.regSzn.worstWeek && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.regSzn.worstWeek - ownerOne?.allTime.regSzn.worstWeek).toFixed(2)}</span>
                      </div>}
                    </div>
                    <div className="cell lucky-wins">
                      <span className="stat-value">{ownerTwo?.bonusStats.luckyWins}</span>
                      {ownerTwo && ownerOne && ownerTwo.bonusStats.luckyWins > ownerOne?.bonusStats.luckyWins && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.bonusStats.luckyWins - ownerOne?.bonusStats.luckyWins)}</span>
                        
                      </div>}
                    </div>
                    <div className="cell unlucky-losses">
                      <span className="stat-value">{ownerTwo?.bonusStats.unluckyLosses}</span>
                      {ownerTwo && ownerOne && ownerTwo.bonusStats.unluckyLosses > ownerOne?.bonusStats.unluckyLosses && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.bonusStats.unluckyLosses - ownerOne?.bonusStats.unluckyLosses)}</span>
                      </div>}
                    </div>
                    <div className="cell highWSeason">
                      <span className="stat-value">{ownerTwo?.bonusStats.mostWinsOneSeason}</span>
                      {ownerTwo && ownerOne && ownerTwo.bonusStats.mostWinsOneSeason > ownerOne?.bonusStats.mostWinsOneSeason && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.bonusStats.mostWinsOneSeason - ownerOne?.bonusStats.mostWinsOneSeason)}</span>
                      </div>}
                    </div>
                    <div className="cell highLSeason">
                      <span className="stat-value">{ownerTwo?.bonusStats.mostLossesOneSeason}</span>
                      {ownerTwo && ownerOne && ownerTwo.bonusStats.mostLossesOneSeason > ownerOne?.bonusStats.mostLossesOneSeason && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.bonusStats.mostLossesOneSeason - ownerOne?.bonusStats.mostLossesOneSeason)}</span>              
                      </div>}
                    </div>
                    <div className="cell total-points-for">
                      <span className="stat-value">{ownerTwo?.allTime.regSzn.RSPF.toFixed(1)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.regSzn.RSPF > ownerOne?.allTime.regSzn.RSPF && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.regSzn.RSPF - ownerOne?.allTime.regSzn.RSPF).toFixed(1)}</span>               
                      </div>}
                    </div>
                    <div className="cell total-points-against">
                      <span className="stat-value">{ownerTwo?.allTime.regSzn.RSPA.toFixed(1)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.regSzn.RSPA > ownerOne?.allTime.regSzn.RSPA && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.regSzn.RSPA - ownerOne?.allTime.regSzn.RSPA).toFixed(1)}</span>
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
              ) : activeFilterButton === "playoffs" ? (
              <div className="h2h-content-wrapper disable-scrollbars">
                <div className="h2h-content h2h-content-wrapper">
                  {/* ALL TIME PLAYOFFS OWNER ONE */}
                  <div className="owner-stats owner-one-stats">
                    <div className="main-cell owner-name owner-one-name">
                      {ownerOne?.ownerName &&
                        (() => {
                          const [firstName, lastName] = ownerOne.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
                    </div>
                    <div className="cell record owner-one-record">
                      {ownerOne?.allTime.playoffs.POwins} - {ownerOne?.allTime.playoffs.POlosses}
                    </div>
                    <div className="cell win-pct">
                      <span className="stat-value">{ownerOne?.allTime.playoffs.POwinningPct.toFixed(1)}%</span>
                      {ownerOne && ownerTwo && (ownerOne?.allTime.playoffs.POwinningPct > ownerTwo?.allTime.playoffs.POwinningPct) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.allTime.playoffs.POwinningPct - ownerTwo?.allTime.playoffs.POwinningPct).toFixed(1)}%
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPf">
                      <span className="stat-value">{ownerOne?.allTime.playoffs.POavgPF.toFixed(2)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.playoffs.POavgPF > ownerTwo?.allTime.playoffs.POavgPF && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.playoffs.POavgPF - ownerTwo?.allTime.playoffs.POavgPF).toFixed(2)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPa">
                      <span className="stat-value">{ownerOne?.allTime.playoffs.POavgPA.toFixed(2)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.playoffs.POavgPA > ownerTwo?.allTime.playoffs.POavgPA && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.playoffs.POavgPA - ownerTwo?.allTime.playoffs.POavgPA).toFixed(2)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">{ownerOne?.allTime.playoffs.bestWeek.toFixed(2)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.playoffs.bestWeek > ownerTwo?.allTime.playoffs.bestWeek && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.playoffs.bestWeek - ownerTwo?.allTime.playoffs.bestWeek).toFixed(2)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell worst-week">
                      <span className="stat-value">{ownerOne?.allTime.playoffs.worstWeek.toFixed(2)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.playoffs.worstWeek > ownerTwo?.allTime.playoffs.worstWeek && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.playoffs.worstWeek - ownerTwo?.allTime.playoffs.worstWeek).toFixed(2)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-for">
                      <span className="stat-value">{ownerOne?.allTime.playoffs.POpointsFor.toFixed(1)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.playoffs.POpointsFor > ownerTwo?.allTime.playoffs.POpointsFor && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.playoffs.POpointsFor - ownerTwo?.allTime.playoffs.POpointsFor).toFixed(1)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-against">
                      <span className="stat-value">{ownerOne?.allTime.playoffs.POpointsAgainst.toFixed(1)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.playoffs.POpointsAgainst > ownerTwo?.allTime.playoffs.POpointsAgainst && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.playoffs.POpointsAgainst - ownerTwo?.allTime.playoffs.POpointsAgainst).toFixed(1)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                  </div>
                  <div className="stat-names">
                    <div className="main-cell cell stat stat-title">Stat</div>
                    <div className="cell stat stat-one">Record</div>
                    <div className="cell stat stat-one">Win %</div>
                    <div className="cell stat stat-one">Avg. PF</div>
                    <div className="cell stat stat-one">Avg. PA</div>
                    <div className="cell stat stat-one">Best Week</div>
                    <div className="cell stat stat-one">Worst Week</div>
                    <div className="cell stat stat-one">Total PF</div>
                    <div className="cell stat stat-one">Total PA</div>
                  </div>
                   {/* ALL TIME PLAYOFFS OWNER TWO */}
                  <div className="owner-stats owner-two-stats">
                    <div className="main-cell owner-name owner-two-name">
                      {ownerTwo?.ownerName &&
                        (() => {
                          const [firstName, lastName] = ownerTwo.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
                    </div>
                    <div className="cell record owner-one-record">
                      {ownerTwo?.allTime.playoffs.POwins} - {ownerTwo?.allTime.playoffs.POlosses}
                    </div>
                    <div className="cell win-pct">
                      <span className="stat-value">{ownerTwo?.allTime.playoffs.POwinningPct.toFixed(1)}%</span>
                      {ownerTwo && ownerOne && (ownerTwo?.allTime.playoffs.POwinningPct > ownerOne?.allTime.playoffs.POwinningPct) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.allTime.playoffs.POwinningPct - ownerOne?.allTime.playoffs.POwinningPct).toFixed(1)}%
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPf">
                      <span className="stat-value">{ownerTwo?.allTime.playoffs.POavgPF.toFixed(2)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.playoffs.POavgPF > ownerOne?.allTime.playoffs.POavgPF && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.playoffs.POavgPF - ownerOne?.allTime.playoffs.POavgPF).toFixed(2)}</span>
                      </div>}
                    </div>
                    <div className="cell avgPa">
                      <span className="stat-value">{ownerTwo?.allTime.playoffs.POavgPA.toFixed(2)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.playoffs.POavgPA > ownerOne?.allTime.playoffs.POavgPA && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.playoffs.POavgPA - ownerOne?.allTime.playoffs.POavgPA).toFixed(2)}</span>
                      </div>}
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">{ownerTwo?.allTime.playoffs.bestWeek.toFixed(2)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.playoffs.bestWeek > ownerOne?.allTime.playoffs.bestWeek && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.playoffs.bestWeek - ownerOne?.allTime.playoffs.bestWeek).toFixed(2)}</span>
                      </div>}
                    </div>
                    <div className="cell worst-week">
                      <span className="stat-value">{ownerTwo?.allTime.playoffs.worstWeek.toFixed(2)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.playoffs.worstWeek > ownerOne?.allTime.playoffs.worstWeek && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.playoffs.worstWeek - ownerOne?.allTime.playoffs.worstWeek).toFixed(2)}</span>
                      </div>}
                    </div>
                    <div className="cell total-points-for">
                      <span className="stat-value">{ownerTwo?.allTime.playoffs.POpointsFor.toFixed(1)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.playoffs.POpointsFor > ownerOne?.allTime.playoffs.POpointsFor && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.playoffs.POpointsFor - ownerOne?.allTime.playoffs.POpointsFor).toFixed(1)}</span>               
                      </div>}
                    </div>
                    <div className="cell total-points-against">
                      <span className="stat-value">{ownerTwo?.allTime.playoffs.POpointsAgainst.toFixed(1)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.playoffs.POpointsAgainst > ownerOne?.allTime.playoffs.POpointsAgainst && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.playoffs.POpointsAgainst - ownerOne?.allTime.playoffs.POpointsAgainst).toFixed(1)}</span>
                      </div>}
                    </div>
                  </div>
                </div>
              </div>) : activeFilterButton === "combined" ? (
              <div className="h2h-content-wrapper disable-scrollbars">
                <div className="h2h-content h2h-content-wrapper">
                  <div className="owner-stats owner-one-stats">
                    <div className="main-cell owner-name owner-one-name">
                      {ownerOne?.ownerName &&
                        (() => {
                          const [firstName, lastName] = ownerOne.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
                    </div>
                    <div className="cell record owner-one-record">
                      {ownerOne?.allTime.combined.wins} - {ownerOne?.allTime.combined.losses} - {ownerOne?.allTime.combined.ties}
                    </div>
                    <div className="cell win-pct">
                      <span className="stat-value">{ownerOne?.allTime.combined.winningPct.toFixed(1)}%</span>
                      {ownerOne && ownerTwo && (ownerOne?.allTime.combined.winningPct > ownerTwo?.allTime.combined.winningPct) && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.allTime.combined.winningPct - ownerTwo?.allTime.combined.winningPct).toFixed(1)}%
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell etewRecord">
                      <span className="stat-value">{ownerOne?.bonusStats.     everyTeamEveryWeek.wins} - {ownerOne?.bonusStats.everyTeamEveryWeek.losses} - {ownerOne?.bonusStats.everyTeamEveryWeek.ties}
                      </span>
                    </div>
                    <div className="cell etewWinPct">
                      <span className="stat-value">{ownerOne && ownerOne?.bonusStats.everyTeamEveryWeek.winPct.toFixed(1)}%</span>

                      {ownerOne && ownerTwo && ownerOne?.bonusStats.everyTeamEveryWeek.winPct > ownerTwo?.bonusStats.everyTeamEveryWeek.winPct && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">
                          {(ownerOne?.bonusStats.everyTeamEveryWeek.winPct - ownerTwo?.bonusStats.everyTeamEveryWeek.winPct).toFixed(1)}%
                        </span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPf">
                      <span className="stat-value">{ownerOne?.allTime.combined.avgPF.toFixed(2)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.combined.avgPF > ownerTwo?.allTime.combined.avgPF && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.combined.avgPF - ownerTwo?.allTime.combined.avgPF).toFixed(2)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPa">
                      <span className="stat-value">{ownerOne?.allTime.combined.avgPA.toFixed(2)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.combined.avgPA > ownerTwo?.allTime.combined.avgPA && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.combined.avgPA - ownerTwo?.allTime.combined.avgPA).toFixed(2)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell playoff-rate">
                      <span className="stat-value">{ownerOne?.bonusStats.playoffRate.toFixed(1)}%</span>
                      {ownerOne && ownerTwo && ownerOne.bonusStats.playoffRate > ownerTwo?.bonusStats.playoffRate && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.bonusStats.playoffRate - ownerTwo?.bonusStats.playoffRate).toFixed(1)}%</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">{ownerOne?.allTime.combined.bestWeek.toFixed(2)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.combined.bestWeek > ownerTwo?.allTime.combined.bestWeek && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.combined.bestWeek - ownerTwo?.allTime.combined.bestWeek).toFixed(2)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell worst-week">
                      <span className="stat-value">{ownerOne?.allTime.combined.worstWeek.toFixed(2)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.combined.worstWeek > ownerTwo?.allTime.combined.worstWeek && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.combined.worstWeek - ownerTwo?.allTime.combined.worstWeek).toFixed(2)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell lucky-wins">
                      <span className="stat-value">{ownerOne?.bonusStats.luckyWins}</span>
                      {ownerOne && ownerTwo && ownerOne.bonusStats.luckyWins > ownerTwo?.bonusStats.luckyWins && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.bonusStats.luckyWins - ownerTwo?.bonusStats.luckyWins)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell unlucky-losses">
                      <span className="stat-value">{ownerOne?.bonusStats.unluckyLosses}</span>
                      {ownerOne && ownerTwo && ownerOne.bonusStats.unluckyLosses > ownerTwo?.bonusStats.unluckyLosses && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.bonusStats.unluckyLosses - ownerTwo?.bonusStats.unluckyLosses)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell highWSeason">
                      <span className="stat-value">{ownerOne?.bonusStats.mostWinsOneSeason}</span>
                      {ownerOne && ownerTwo && ownerOne.bonusStats.mostWinsOneSeason > ownerTwo?.bonusStats.mostWinsOneSeason && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.bonusStats.mostWinsOneSeason - ownerTwo?.bonusStats.mostWinsOneSeason)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell highLSeason">
                      <span className="stat-value">{ownerOne?.bonusStats.mostLossesOneSeason}</span>
                      {ownerOne && ownerTwo && ownerOne.bonusStats.mostLossesOneSeason > ownerTwo?.bonusStats.mostLossesOneSeason && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.bonusStats.mostLossesOneSeason - ownerTwo?.bonusStats.mostLossesOneSeason)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-for">
                      <span className="stat-value">{ownerOne?.allTime.combined.pointsFor.toFixed(1)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.combined.pointsFor > ownerTwo?.allTime.combined.pointsFor && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.combined.pointsFor - ownerTwo?.allTime.combined.pointsFor).toFixed(1)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                    <div className="cell total-points-against">
                      <span className="stat-value">{ownerOne?.allTime.combined.pointsAgainst.toFixed(1)}</span>
                      {ownerOne && ownerTwo && ownerOne.allTime.combined.pointsAgainst > ownerTwo?.allTime.combined.pointsAgainst && 
                      <div className="plus-minus-and-icon">
                        <span className="plus-minus green">{(ownerOne.allTime.combined.pointsAgainst - ownerTwo?.allTime.combined.pointsAgainst).toFixed(1)}</span>
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                      </div>}
                    </div>
                  </div>
                  <div className="stat-names">
                    <div className="main-cell cell stat stat-title">Stat</div>
                    <div className="cell stat stat-one">Record</div>
                    <div className="cell stat stat-one">Win %</div>
                    <div className="cell stat stat-one">ETEW Record</div>
                    <div className="cell stat stat-one">ETEW Win %</div>
                    <div className="cell stat stat-one">Avg. PF</div>
                    <div className="cell stat stat-one">Avg. PA</div>
                    <div className="cell stat stat-one">Playoff Rate</div>
                    <div className="cell stat stat-one">Best Week</div>
                    <div className="cell stat stat-one">Worst Week</div>
                    <div className="cell stat stat-one">Lucky Ws</div>
                    <div className="cell stat stat-one">Unlucky Ls</div>
                    <div className="cell stat stat-one">High W Szn</div>
                    <div className="cell stat stat-one">High L Szn</div>
                    <div className="cell stat stat-one">Total PF</div>
                    <div className="cell stat stat-one">Total PA</div>
                  </div>
                  <div className="owner-stats owner-two-stats">
                    <div className="main-cell owner-name owner-two-name">
                      {ownerTwo?.ownerName &&
                        (() => {
                          const [firstName, lastName] = ownerTwo.ownerName.split(" ");
                          const lastInitial = lastName ? lastName.charAt(0) : "";
                          return `${firstName} ${lastInitial}.`;
                        })()}
                    </div>
                    <div className="cell record owner-one-record">
                      {ownerTwo?.allTime.combined.wins} - {ownerTwo?.allTime.combined.losses} - {ownerTwo?.allTime.combined.ties}
                    </div>
                    <div className="cell win-pct">
                      <span className="stat-value">{ownerTwo?.allTime.combined.winningPct.toFixed(1)}%</span>
                      {ownerTwo && ownerOne && (ownerTwo?.allTime.combined.winningPct > ownerOne?.allTime.combined.winningPct) && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.allTime.combined.winningPct - ownerOne?.allTime.combined.winningPct).toFixed(1)}%
                        </span>
                      </div>}
                    </div>
                    <div className="cell etewRecord">
                      <span className="stat-value">{ownerTwo?.bonusStats.     everyTeamEveryWeek.wins} - {ownerTwo?.bonusStats.everyTeamEveryWeek.losses} - {ownerTwo?.bonusStats.everyTeamEveryWeek.ties}
                      </span>
                    </div>
                    <div className="cell etewWinPct">
                      <span className="stat-value">{ownerTwo && ownerTwo?.bonusStats.everyTeamEveryWeek.winPct.toFixed(1)}%</span>

                      {ownerTwo && ownerOne && ownerTwo?.bonusStats.everyTeamEveryWeek.winPct > ownerOne?.bonusStats.everyTeamEveryWeek.winPct && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">
                          {(ownerTwo?.bonusStats.everyTeamEveryWeek.winPct - ownerOne?.bonusStats.everyTeamEveryWeek.winPct).toFixed(1)}%
                        </span>
                      </div>}
                    </div>
                    <div className="cell avgPf">
                      <span className="stat-value">{ownerTwo?.allTime.combined.avgPF.toFixed(2)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.combined.avgPF > ownerOne?.allTime.combined.avgPF && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.combined.avgPF - ownerOne?.allTime.combined.avgPF).toFixed(2)}</span>
                      </div>}
                    </div>
                    <div className="cell avgPa">
                      <span className="stat-value">{ownerTwo?.allTime.combined.avgPA.toFixed(2)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.combined.avgPA > ownerOne?.allTime.combined.avgPA && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.combined.avgPA - ownerOne?.allTime.combined.avgPA).toFixed(2)}</span>
                      </div>}
                    </div>
                    <div className="cell playoff-rate">
                      <span className="stat-value">{ownerTwo?.bonusStats.playoffRate.toFixed(1)}%</span>
                      {ownerTwo && ownerOne && ownerTwo.bonusStats.playoffRate > ownerOne?.bonusStats.playoffRate && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.bonusStats.playoffRate - ownerOne?.bonusStats.playoffRate).toFixed(1)}%</span>
                      </div>}
                    </div>
                    <div className="cell best-week">
                      <span className="stat-value">{ownerTwo?.allTime.combined.bestWeek.toFixed(2)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.combined.bestWeek > ownerOne?.allTime.combined.bestWeek && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.combined.bestWeek - ownerOne?.allTime.combined.bestWeek).toFixed(2)}</span>
                      </div>}
                    </div>
                    <div className="cell worst-week">
                      <span className="stat-value">{ownerTwo?.allTime.combined.worstWeek.toFixed(2)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.combined.worstWeek > ownerOne?.allTime.combined.worstWeek && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.combined.worstWeek - ownerOne?.allTime.combined.worstWeek).toFixed(2)}</span>
                      </div>}
                    </div>
                    <div className="cell lucky-wins">
                      <span className="stat-value">{ownerTwo?.bonusStats.luckyWins}</span>
                      {ownerTwo && ownerOne && ownerTwo.bonusStats.luckyWins > ownerOne?.bonusStats.luckyWins && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.bonusStats.luckyWins - ownerOne?.bonusStats.luckyWins)}</span>
                        
                      </div>}
                    </div>
                    <div className="cell unlucky-losses">
                      <span className="stat-value">{ownerTwo?.bonusStats.unluckyLosses}</span>
                      {ownerTwo && ownerOne && ownerTwo.bonusStats.unluckyLosses > ownerOne?.bonusStats.unluckyLosses && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.bonusStats.unluckyLosses - ownerOne?.bonusStats.unluckyLosses)}</span>
                      </div>}
                    </div>
                    <div className="cell highWSeason">
                      <span className="stat-value">{ownerTwo?.bonusStats.mostWinsOneSeason}</span>
                      {ownerTwo && ownerOne && ownerTwo.bonusStats.mostWinsOneSeason > ownerOne?.bonusStats.mostWinsOneSeason && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.bonusStats.mostWinsOneSeason - ownerOne?.bonusStats.mostWinsOneSeason)}</span>
                      </div>}
                    </div>
                    <div className="cell highLSeason">
                      <span className="stat-value">{ownerTwo?.bonusStats.mostLossesOneSeason}</span>
                      {ownerTwo && ownerOne && ownerTwo.bonusStats.mostLossesOneSeason > ownerOne?.bonusStats.mostLossesOneSeason && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.bonusStats.mostLossesOneSeason - ownerOne?.bonusStats.mostLossesOneSeason)}</span>              
                      </div>}
                    </div>
                    <div className="cell total-points-for">
                      <span className="stat-value">{ownerTwo?.allTime.combined.pointsFor.toFixed(1)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.combined.pointsFor > ownerOne?.allTime.combined.pointsFor && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.combined.pointsFor - ownerOne?.allTime.combined.pointsFor).toFixed(1)}</span>               
                      </div>}
                    </div>
                    <div className="cell total-points-against">
                      <span className="stat-value">{ownerTwo?.allTime.combined.pointsAgainst.toFixed(1)}</span>
                      {ownerTwo && ownerOne && ownerTwo.allTime.combined.pointsAgainst > ownerOne?.allTime.combined.pointsAgainst && 
                      <div className="plus-minus-and-icon">
                        <span className="arrow-icon green">
                          <FaCaretUp />
                        </span>
                        <span className="plus-minus green">{(ownerTwo.allTime.combined.pointsAgainst - ownerOne?.allTime.combined.pointsAgainst).toFixed(1)}</span>
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
              ) : (<div>Error</div>)}
              
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
