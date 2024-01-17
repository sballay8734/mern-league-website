import { LuCrown } from "react-icons/lu"
import {
  useFetchKingStandingsQuery
} from "../../redux/king/kingApi"
import "./KothPage.scss"
import { useState } from "react"

interface OwnerObject {
  [ownerName: string]: OwnerObjectAttr
}

interface OwnerObjectAttr {
  totalPointsFor: number
  totalPointsAgainst: number
  strikes: number
  weeklyScores: WeeklyScores
}

interface WeeklyScores {
  [week: string]: {
    points: number,
    strike: boolean
  }
}

interface FullObject {
  yearCompleted: boolean
  year: string
  standingsData: OwnerObject
}

export default function KothPage() {
  const {
    data: kingData
  } = useFetchKingStandingsQuery()

  const [activeButton, setActiveButton] = useState<string>("standings")

  // LOG IS WORKING
  // console.log(kingData)
  // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************

  // NEED TO ALSO TRACK ELIMINATION WEEK FOR EACH OWNER IN ORDER TO PROPERLY RANK !!!!!!!!!

  // SORT BY elimination week -> strikes -> pointsFor ( I THINK? )

    // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************
  // ***********************************************************************
  // JUST FOR TESTING (AUTOMATE THIS)
  const currentYear = "2022"

  if (kingData) {
    const standingsData = kingData.find((obj) => obj.year.toString() === currentYear)

    if (standingsData) {
      const sortedOwners = Object.keys(standingsData.standingsData).sort((a, b) => {
        const dataA = standingsData.standingsData[a]
        const dataB = standingsData.standingsData[b]

        if (dataA.strikes !== dataB.strikes) {
          return dataA.strikes - dataB.strikes
        }

        return dataB.totalPointsFor - dataA.totalPointsFor
      }).map(owner => ({ [owner]: standingsData.standingsData[owner] }))

      console.log(sortedOwners)
    }

    // LOOP THROUGH AND SORT STANDINGS HERE TO CALCULATE 
  }

  // console.log(standingsError, standingsLoading)

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
