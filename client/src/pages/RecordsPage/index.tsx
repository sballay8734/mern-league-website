import { useEffect, useState } from "react"

import { FaAward } from "react-icons/fa"
import "./RecordsPage.scss"
import { useFetchRecordsQuery } from "../../redux/records/recordsApi"

interface IRecord {
  recordHolder: string,
  opponent: string | null,
  statValue: number,
  bonusStat: number | null
  year: number | null
  during: "Playoffs" | "Season" | null,

  matchup: {pointsFor: number, pointsAgainst: number, opponent: string, during: string} | null
  type: string
}

interface FullRecordObject {
  [recordName: string]: IRecord
}

interface Conversion {
  [key: string]: string
}

const keyConversion: Conversion = {
  bestWeeks: "Best Weeks",
  worstWeeks: "Worst Weeks",
  longestWinningStreaks: "Longest Winning Streaks",
  longestLosingStreaks: "Longest Losing Streaks",
  biggestBlowouts: "Biggest Blowouts",
  closestGames: "Closest Games",
  highestCombinedScores: "Highest Combined Scores",
  lowestCombinedScores: "Worst Combined Scores",
  lowWinPct: "Worst All-Time Win Percentage",
  highWinPct: "Best All-Time Win Percentage",
  highAvgPF: "Best Average Points For",
  lowAvgPF: "Worst Average Points For",
  highPlayoffRateAndApps: "Best Playoff Participation Rate",
  lowPlayoffRateAndApps: "Worst Playoff Participation Rate",
  highestAvgFinishingPlace: "Best Average Finishing Place",
  lowestAvgFinishingPlace: "Worst Average Finishing Place"
}

export default function RecordsPage() {
  const [activeButton, setActiveButton] = useState<string>("allTime")
  const [records, setRecords] = useState<FullRecordObject | null>(null)
  const [recordKeys, setRecordKeys] = useState<string[]>([])
  const { data } = useFetchRecordsQuery()

  useEffect(() => {
    if (data) {
      if (data[0].records) {
        setRecords(data[0].records);
        if (data[0].records !== null) {
          setRecordKeys(Object.keys(data[0].records));
        }
      }
    }
  }, [data]);

  function formatName(name: string) {
    if (name.includes(" ")) {
      return name.split(" ")[0] + " " + name.split(" ")[1].charAt(0)
    }

    return name
  }

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
          <div className="allTimeWrapper">
            {recordKeys.map((record, index) => {
              const currentRecord = records && Object.values(records[record])
              return (
                <div key={index} className="recordCard">
                  <div className="recordTitle">{keyConversion[record]}</div>
                  <div className="recordRankings">
                  {currentRecord && currentRecord.map((owner: IRecord, index) => {
                    // ****************************************************
                    // ****************************************************
                    // ****************************************************

                    // JUST NEED TO MAKE THIS ALL LOOK PRETTY

                    // ****************************************************
                    // ****************************************************
                    // ****************************************************
                    if (owner.opponent === null) {
                      return (
                         <div key={index} className="recordHolder">
                           <div className="recordHolderName">
                           {index === 0 && <img src="/gold.png" alt="medal" /> }
                           {index === 1 && <img src="/silver.png" alt="medal" /> }
                           {index === 2 && <img src="/bronze.png" alt="medal" /> }
                           {index > 2 && <img className="honor" src="/honor.png" alt="medal" /> }
                            {owner.recordHolder}
                            </div>
                           <div className="recordValue">{owner.statValue}{owner.type.toLocaleLowerCase()}</div>
                           {owner.year !== null ? <div className="recordYear small">{owner.year}</div> : <div className="recordYear small">N/A</div> }
                         </div>
                      )
                    } else {
                      return (
                        <div key={index} className="recordHolder small">
                           <div className="recordHolderName small">
                           {index === 0 && <img src="/gold.png" alt="medal" /> }
                           {index === 1 && <img src="/silver.png" alt="medal" /> }
                           {index === 2 && <img src="/bronze.png" alt="medal" /> }
                           {index > 2 && <img className="honor" src="/honor.png" alt="medal" /> }
                            {formatName(owner.recordHolder)}. ({owner.matchup?.pointsFor}) & {formatName(owner.opponent)}. ({owner.matchup?.pointsAgainst})
                            </div>
                           <div className="recordValue small">{owner.statValue}{owner.type.toLocaleLowerCase()}</div>
                           {owner.year !== null ? <div className="recordYear small">{owner.year}</div> : <div className="recordYear small">N/A</div> }
                         </div>
                      )
                    }
                  })}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="placeholder">In development</div>
        )}
      </div>
    </div>
  )
}
