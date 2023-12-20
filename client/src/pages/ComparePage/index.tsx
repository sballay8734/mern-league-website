import { useState } from "react"

import { useFetchOwnersQuery } from "../../redux/owners/ownersApi"
import { MdCompareArrows } from "react-icons/md"
import { FaTrophy } from "react-icons/fa6"
import { GiLargeDress } from "react-icons/gi"
import { FaCrown } from "react-icons/fa6"
import { FaAngleDoubleRight } from "react-icons/fa"
import { FaAngleDoubleLeft } from "react-icons/fa"

import "./ComparePage.scss"

export default function ComparePage() {
  const { data, error, isLoading } = useFetchOwnersQuery()
  const [activeButton, setActiveButton] = useState<string>("h2h")
  const [activeFilterButton, setActiveFilterButton] = useState<string>("regszn")
  // below is just to remove error
  console.log(error, isLoading, data)

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
                </ul>
              </nav>
              <div className="h2h-content-wrapper disable-scrollbars">
                <div className="h2h-content">
                  <div className="owner-stats owner-one-stats">
                    <div className="cell owner-name owner-one-name">
                      Shawn B.
                    </div>
                    <div className="cell record owner-one-record">2-10</div>
                    <div className="cell avgPts">118.2</div>
                    <div className="cell avtPtsVField">125.2</div>
                    <div className="cell playoff-rate">72%</div>
                    <div className="cell best-week">163</div>
                    <div className="cell worst-week">74</div>
                    <div className="cell total-points">1272.3</div>
                    <div className="cell another">145-123</div>
                    <div className="cell one-more">1272.3</div>
                    <div className="cell not-copied">145-123</div>
                  </div>
                  <div className="stat-names">
                    <div className="cell stat stat-title">Stat</div>
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
                    <div className="cell owner-name owner-two-name">Don I.</div>
                    <div className="cell record owner-two-record">10-2</div>
                    <div className="cell avgPts">127.8</div>
                    <div className="cell avtPtsVField">120.3</div>
                    <div className="cell playoff-rate">52%</div>
                    <div className="cell best-week">187</div>
                    <div className="cell worst-week">82</div>
                    <div className="cell total-points">1432.8</div>
                    <div className="cell another">165-101</div>
                    <div className="cell one-more">1272.3</div>
                    <div className="cell not-copied">145-123</div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeButton === "yearly" ? (
            <div className="compare-yearly">Yearly</div>
          ) : activeButton === "allTime" ? (
            <div className="compare-all-time">All-Time</div>
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
