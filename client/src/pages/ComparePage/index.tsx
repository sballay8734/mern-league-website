import { useState } from "react"

import { useFetchOwnersQuery } from "../../redux/owners/ownersApi"
import { MdCompareArrows } from "react-icons/md"

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
        <div className="placeholder">Coming Soon</div>
      </div>
    </div>
  )
}
