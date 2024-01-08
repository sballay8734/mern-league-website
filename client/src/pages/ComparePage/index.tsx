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

import "./ComparePage.scss"

export default function ComparePage() {
  const { user } = useSelector((state: RootState) => state.user)
  const { data } = useFetchStaticDataQuery()
  const [activeButton, setActiveButton] = useState<string>("h2h")
  const [activeFilterButton, setActiveFilterButton] =
    useState<string>("combined")
  const [showYearDropdown, setShowYearDropdown] = useState<boolean>(false)
  const [selectedYear, setSelectedYear] = useState<string>("2023")
  const [ownerOne, setOwnerOne] = useState(null)
  const [ownerTwo, setOwnerTwo] = useState(null)
  // below is just to remove error
  console.log(data)

  function handleYearSelect(year: string) {
    setShowYearDropdown(false)
    setSelectedYear(year)
  }

  // useEffect(() => {
  //   if (data && user) {
  //     const user = data.filter((owner) => user.id === owner.id)
  //   }
  // })

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
        {/* <div className="placeholder">Coming Soon</div> */}
        <div className="owner-one-selector-wrapper selector-wrapper">
          <div className="selector-header">
            <button className="arrow arrow-left">
              <span>
                <FaAngleDoubleLeft />
              </span>
              Prev{" "}
            </button>
            <div className="spacer"></div>
            <h2 className="owner-one-name owner-name">Shawn B.</h2>
            <div className="spacer"></div>
            <button className="arrow arrow-right">
              Next{" "}
              <span>
                <FaAngleDoubleRight />
              </span>
            </button>
          </div>
          <div className="selector-body">
            <img src="/profileImg.png" alt="profile" />
            <div className="main-stats-wrapper">
              <div className="main-stats main-stats-left">
                <h2 className="stat stat1">
                  Championships:{" "}
                  <span className="icons">
                    <FaTrophy /> <FaTrophy /> <FaTrophy />
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
                    <GiLargeDress />
                  </span>
                </h2>
                <h2 className="stat stat4">
                  Avg. Finish: <span className="icons">3.2</span>
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
              ) : activeFilterButton === "regszn" ? (
                <div className="regszn-content h2h-content-wrapper-temp">
                  Regular Season
                </div>
              ) : activeFilterButton === "playoffs" ? (
                <div className="playoff-content h2h-content-wrapper-temp">
                  Playoffs
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
            <button className="arrow arrow-left">
              <span>
                <FaAngleDoubleLeft />
              </span>
              Prev{" "}
            </button>
            <div className="spacer"></div>
            <h2 className="owner-one-name owner-name">Don I.</h2>
            <div className="spacer"></div>
            <button className="arrow arrow-right">
              Next{" "}
              <span>
                <FaAngleDoubleRight />
              </span>
            </button>
          </div>
          <div className="selector-body">
            <img src="/profileImg.png" alt="profile" />
            <div className="main-stats-wrapper">
              <div className="main-stats main-stats-left">
                <h2 className="stat stat1">
                  Championships:{" "}
                  <span className="icons">
                    <FaTrophy />
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
                    <GiLargeDress />
                  </span>
                </h2>
                <h2 className="stat stat4">
                  Avg. Finish: <span className="icons">5.1</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
