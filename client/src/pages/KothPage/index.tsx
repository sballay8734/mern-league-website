import { LuCrown } from "react-icons/lu"
import {
  useFetchKingStandingsQuery,
  useFetchWeeklyResultsQuery
} from "../../redux/king/kingApi"
import "./KothPage.scss"
import { useState } from "react"

export default function KothPage() {
  const {
    data: standingsData,
    error: standingsError,
    isLoading: standingsLoading
  } = useFetchKingStandingsQuery()

  const {
    data: resultsData,
    error: resultsError,
    isLoading: resultsLoading
  } = useFetchWeeklyResultsQuery()

  const [activeButton, setActiveButton] = useState<string>("standings")

  // LOG IS WORKING
  console.log(standingsData, resultsData)

  // Just to remove errors
  console.log(standingsError, standingsLoading, resultsError, resultsLoading)

  return (
    <div className="page koth-page">
      <div className="king-page-top">
        <div className="king-page-header">
          <h1>King of the Hill</h1>
          <div className="crown">
            <LuCrown />
          </div>
        </div>
        <nav className="king-nav">
          <ul>
            <li>
              <button
                className={`${activeButton === "standings" ? "active" : ""}`}
                onClick={() => setActiveButton("standings")}
              >
                Standings
              </button>
            </li>
            <li className="spacer"></li>
            <li>
              <button
                className={`${activeButton === "history" ? "active" : ""}`}
                onClick={() => setActiveButton("history")}
              >
                History
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="king-page-bottom">
        {activeButton === "standings" ? (
          <div className="placeholder">Standings</div>
        ) : (
          <div className="placeholder">History</div>
        )}
      </div>
      {/* {standingsData?.map((item) => {
        return <div key={item.year}>{item.year}</div>
      })} */}
    </div>
  )
}
