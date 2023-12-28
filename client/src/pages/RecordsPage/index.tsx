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
    </div>
  )
}
