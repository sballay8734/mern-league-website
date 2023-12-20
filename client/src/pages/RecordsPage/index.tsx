import { useState } from "react"

import { FaAward } from "react-icons/fa"
import "./RecordsPage.scss"

export default function RecordsPage() {
  const [activeButton, setActiveButton] = useState<string>("allTime")
  return (
    <div className="page records-page">
      <div className="records-page-top">
        <div className="records-page-header">
          <h1>Hall of Records</h1>
          <div className="award">
            <FaAward />
          </div>
        </div>
        <nav className="records-nav">
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
                className={`${activeButton === "yearly" ? "active" : ""}`}
                onClick={() => setActiveButton("yearly")}
              >
                Yearly
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="records-page-bottom">
        {activeButton === "allTime" ? (
          <div className="placeholder">All-Time</div>
        ) : (
          <div className="placeholder">Yearly</div>
        )}
      </div>
      {/* <h1>Hall of Records</h1>
      <div className="records-header">
        <div className="searchWrapper">
          <input
            type="text"
            name="recordsSearch"
            id="recordsSearch"
            maxLength={25}
            placeholder="Search archives..."
          />
          <span className="searchIcon">
            <CiSearch />
          </span>
        </div>
        <div className="filterButtons">
          <button className="filterButton">Matchup</button>
          <button className="filterButton">Placement</button>
          <button className="filterButton">Record</button>
          <button className="filterButton">Points</button>
          <button className="filterButton">Playoffs</button>
          <button className="filterButton">RegSzn</button>
          <button className="filterButton">Streaks</button>
          <button className="filterButton">Koth</button>
          <button className="filterButton">Misc</button>
        </div>
      </div>
      <div className="records">
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
      </div> */}
    </div>
  )
}
