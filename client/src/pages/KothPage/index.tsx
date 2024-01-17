import { LuCrown } from "react-icons/lu"
import {
  useFetchKingStandingsQuery
} from "../../redux/king/kingApi"
import "./KothPage.scss"
import { useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io";


interface OwnerObject {
  [ownerName: string]: OwnerObjectAttr
}

interface OwnerObjectAttr {
  totalPointsFor: number
  totalPointsAgainst: number
  strikes: number
  weekEliminated: number | string
  weeklyScores: WeeklyScores
}

interface WeeklyScores {
  [week: string]: {
    points: number,
    strike: boolean
  }
}

export default function KothPage() {
  const {
    data: kingData
  } = useFetchKingStandingsQuery()

  const [activeButton, setActiveButton] = useState<string>("standings")
  const [sortedData, setSortedData] = useState<OwnerObject[] | null>(null)

  // JUST FOR TESTING (AUTOMATE THIS)
  const currentYear = "2022"

  useEffect(() => {
    if (kingData) {
      const standingsData = kingData.find((obj) => obj.year.toString() === currentYear)
  
      if (standingsData) {
        const sortedOwners = Object.keys(standingsData.standingsData).sort((a, b) => {
          const dataA = standingsData.standingsData[a]
          const dataB = standingsData.standingsData[b]
  
          if (dataA.weekEliminated !== dataB.weekEliminated) {
            return dataB.weekEliminated - dataA.weekEliminated
          }
  
          if (dataA.strikes !== dataB.strikes) {
            return dataA.strikes - dataB.strikes
          }
  
          return dataB.totalPointsFor - dataA.totalPointsFor
        }).map(owner => ({ [owner]: standingsData.standingsData[owner] }))
  
        setSortedData(sortedOwners)
      }
    }
  }, [])

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
        {activeButton === "standings" ? 
          <div className="standings">
            <div className="columnHeaders">
                <div>OWNER</div>
                <div>TOTAL PF</div>
                <div>STRIKES</div>
                <div>WK ELIM.</div>
              </div>
            <div className="standings-wrapper">
              {sortedData && sortedData.map((ownerObj, index) => {
                const ownerName = Object.keys(ownerObj)[0]
                const formattedName = Object.keys(ownerObj)[0].split(" ")[0] + " " + Object.keys(ownerObj)[0].split(" ")[1].slice(0, 1) + "."
                const totalPF = ownerObj[ownerName].totalPointsFor.toFixed(2)
                // const totalPA = ownerObj[ownerName].totalPointsAgainst.toFixed(2)
                const strikes = ownerObj[ownerName].strikes
                let weekEliminated = ownerObj[ownerName].weekEliminated
                const scoresObj = ownerObj[ownerName].weeklyScores
                if (weekEliminated === 100) weekEliminated = "-"

                return <div className="ownerWrapper" key={ownerName}>
                  <div className="ownerName">{formattedName}</div>
                  <div className="pointsFor">{totalPF}</div>
                  <div className={`strikes ${strikes === 0 ? "zero" : strikes === 1 ? "one" : strikes === 2 ? "two" : "three"}` }>
                    <span className="circle">
                      <span className={`strikesIcon ${strikes > 0 ? "show" : ""}`}>
                        <IoMdClose />
                      </span>
                    </span>
                    <span className="circle">
                      <span className={`strikesIcon ${strikes > 1 ? "show" : ""}`}>
                        <IoMdClose />
                      </span>
                    </span>
                    <span className="circle">
                      <span className={`strikesIcon ${strikes > 2 ? "show" : ""}`}>
                        <IoMdClose />
                      </span>
                    </span>
                    {index === 0 ? <img className="medal" src="/public/gold.png" alt="medal" /> : index === 1 ? <img className="medal" src="/public/silver.png" alt="medal" /> : index === 2 ? <img className="medal" src="/public/bronze.png" alt="medal" /> : ""}
                  </div>
                  <div className="weekEliminated">{weekEliminated}</div>
                </div>
              })}
            </div>
          </div>
        
        : 
        
        <div className="placeholder">History</div>}
      </div>
    </div>
  )
}
