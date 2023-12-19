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
        <div className="main-content-wrapper">Main Content</div>
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
