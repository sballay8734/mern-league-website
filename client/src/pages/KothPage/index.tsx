import { LuCrown } from "react-icons/lu"
import { useFetchKingStandingsQuery } from "../../redux/king/kingApi"
import "./KothPage.scss"
import { useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

interface OwnerObject {
  [ownerName: string]: OwnerObjectAttr
}

interface OwnerObjectAttr {
  totalPointsFor: number
  totalPointsAgainst: number
  strikes: number
  topScorer: number
  weekEliminated: number | string
  weeklyScores: WeeklyScores
}

interface WeeklyScores {
  [week: string]: {
    points: number
    totalStrikes: number
    strike: boolean
    topScorer: boolean
  }
}

interface Conversion {
  [week: string]: number
}

const weekKeysConversion: Conversion = {
  weekOne: 1,
  weekTwo: 2,
  weekThree: 3,
  weekFour: 4,
  weekFive: 5,
  weekSix: 6,
  weekSeven: 7,
  weekEight: 8,
  weekNine: 9,
  weekTen: 10,
  weekEleven: 11,
  weekTwelve: 12,
  weekThirteen: 13,
  weekFourteen: 14
}

export default function KothPage() {
  const { data: kingData } = useFetchKingStandingsQuery()

  const [activeButton, setActiveButton] = useState<string>("standings")
  const [sortedData, setSortedData] = useState<OwnerObject[] | null>(null)
  const [showBreakDown, setShowBreakdown] = useState<boolean>(false)
  const [currentYear, setCurrentYear] = useState<string | null>(null)

  // JUST FOR TESTING (AUTOMATE THIS)

  function getCurrentYear() {
    let currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()

    if (currentMonth === 0 || currentMonth === 1) {
      currentYear -= 1
    }

    return currentYear.toString()
  }

  useEffect(() => {
    if (activeButton === "standings") {
      const newCurrentYear = getCurrentYear()
      setCurrentYear(newCurrentYear)
    }

    if (kingData) {
      const standingsData = kingData.find(
        (obj) => obj.year.toString() === currentYear
      )

      if (standingsData) {
        const sortedOwners = Object.keys(standingsData.standingsData)
          .sort((a, b) => {
            const dataA = standingsData.standingsData[a]
            const dataB = standingsData.standingsData[b]

            if (dataA.weekEliminated !== dataB.weekEliminated) {
              return dataB.weekEliminated - dataA.weekEliminated
            }

            if (dataA.strikes !== dataB.strikes) {
              return dataA.strikes - dataB.strikes
            }

            return dataB.totalPointsFor - dataA.totalPointsFor
          })
          .map((owner) => ({ [owner]: standingsData.standingsData[owner] }))

        // console.log(sortedOwners)
        setSortedData(sortedOwners)
      }
    }
  }, [currentYear, kingData])

  return (
    <div className="page koth-page">
      <div className="alwaysShownContent">
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
                  Standings (Cur. Year)
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
            <div className="fullBottomWrapper">
              <div className="standings">
                <div className="columnHeaders">
                  <div>OWNER</div>
                  <div>TOP SCORER</div>
                  <div>STRIKES</div>
                  <div>WK ELIM.</div>
                </div>
                <div className="standings-wrapper">
                  {sortedData &&
                    sortedData.map((ownerObj, index) => {
                      const ownerName = Object.keys(ownerObj)[0]

                      const formattedName =
                        Object.keys(ownerObj)[0].split(" ")[0] +
                        " " +
                        Object.keys(ownerObj)[0].split(" ")[1].slice(0, 1) +
                        "."

                      const timesTopScorer = ownerObj[ownerName].topScorer
                      const strikes = ownerObj[ownerName].strikes
                      let weekEliminated = ownerObj[ownerName].weekEliminated

                      if (weekEliminated === 100) weekEliminated = "-"
                      return (
                        <div className="ownerWrapper" key={ownerName}>
                          <div className="ownerName">{formattedName}</div>
                          <div className="topScorer">{timesTopScorer}</div>
                          <div
                            className={`strikes ${
                              strikes === 0
                                ? "zero"
                                : strikes === 1
                                ? "one"
                                : strikes === 2
                                ? "two"
                                : "three"
                            }`}
                          >
                            <span className="circle">
                              <span
                                className={`strikesIcon ${
                                  strikes > 0 ? "show" : ""
                                }`}
                              >
                                <IoMdClose />
                              </span>
                            </span>
                            <span className="circle">
                              <span
                                className={`strikesIcon ${
                                  strikes > 1 ? "show" : ""
                                }`}
                              >
                                <IoMdClose />
                              </span>
                            </span>
                            <span className="circle">
                              <span
                                className={`strikesIcon ${
                                  strikes > 2 ? "show" : ""
                                }`}
                              >
                                <IoMdClose />
                              </span>
                            </span>
                            {index === 0 ? (
                              <img
                                className="medal"
                                src="/gold.png"
                                alt="medal"
                              />
                            ) : index === 1 ? (
                              <img
                                className="medal"
                                src="/silver.png"
                                alt="medal"
                              />
                            ) : index === 2 ? (
                              <img
                                className="medal"
                                src="/bronze.png"
                                alt="medal"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="weekEliminated">{weekEliminated}</div>
                        </div>
                      )
                    })}
                </div>
                <button
                  onClick={() => setShowBreakdown(!showBreakDown)}
                  className={`viewBreakdown-btn`}
                >
                  View Breakdown
                  <span>
                    {showBreakDown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="fullBottomWrapper">
              <div className="buttons-wrapper">
                <button
                  className={`${currentYear === "2022" && "active"}`}
                  onClick={() => setCurrentYear("2022")}
                >
                  2022
                </button>
                <button
                  className={`${currentYear === "2023" && "active"}`}
                  onClick={() => setCurrentYear("2023")}
                >
                  2023
                </button>
              </div>
              <div className="standings">
                <div className="columnHeaders">
                  <div>OWNER</div>
                  <div>TOP SCORER</div>
                  <div>STRIKES</div>
                  <div>WK ELIM.</div>
                </div>
                <div className="standings-wrapper">
                  {sortedData &&
                    sortedData.map((ownerObj, index) => {
                      const ownerName = Object.keys(ownerObj)[0]

                      const formattedName =
                        Object.keys(ownerObj)[0].split(" ")[0] +
                        " " +
                        Object.keys(ownerObj)[0].split(" ")[1].slice(0, 1) +
                        "."

                      const timesTopScorer = ownerObj[ownerName].topScorer
                      const strikes = ownerObj[ownerName].strikes
                      let weekEliminated = ownerObj[ownerName].weekEliminated

                      if (weekEliminated === 100) weekEliminated = "-"
                      return (
                        <div className="ownerWrapper" key={ownerName}>
                          <div className="ownerName">{formattedName}</div>
                          <div className="topScorer">{timesTopScorer}</div>
                          <div
                            className={`strikes ${
                              strikes === 0
                                ? "zero"
                                : strikes === 1
                                ? "one"
                                : strikes === 2
                                ? "two"
                                : "three"
                            }`}
                          >
                            <span className="circle">
                              <span
                                className={`strikesIcon ${
                                  strikes > 0 ? "show" : ""
                                }`}
                              >
                                <IoMdClose />
                              </span>
                            </span>
                            <span className="circle">
                              <span
                                className={`strikesIcon ${
                                  strikes > 1 ? "show" : ""
                                }`}
                              >
                                <IoMdClose />
                              </span>
                            </span>
                            <span className="circle">
                              <span
                                className={`strikesIcon ${
                                  strikes > 2 ? "show" : ""
                                }`}
                              >
                                <IoMdClose />
                              </span>
                            </span>
                            {index === 0 ? (
                              <img
                                className="medal"
                                src="/gold.png"
                                alt="medal"
                              />
                            ) : index === 1 ? (
                              <img
                                className="medal"
                                src="/silver.png"
                                alt="medal"
                              />
                            ) : index === 2 ? (
                              <img
                                className="medal"
                                src="/bronze.png"
                                alt="medal"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="weekEliminated">{weekEliminated}</div>
                        </div>
                      )
                    })}
                </div>
                <button
                  onClick={() => setShowBreakdown(!showBreakDown)}
                  className={`viewBreakdown-btn`}
                >
                  View Breakdown
                  <span>
                    {showBreakDown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`king-page-extra-content ${showBreakDown && "show"}`}>
        <div className={`paddingFixWrapper ${showBreakDown && "show"}`}>
          <div className={`breakdownWrapper`}>
            <div className="weekHeaders">
              <div className="weekHeader"></div>
              <div className="week">
                Wk 1<span className="strikes">(4 strikes)</span>
              </div>
              <div className="week">
                Wk 2<span className="strikes">(4 strikes)</span>
              </div>
              <div className="week">
                Wk 3<span className="strikes">(4 strikes)</span>
              </div>
              <div className="week">
                Wk 4<span className="strikes">(3 strikes)</span>
              </div>
              <div className="week">
                Wk 5<span className="strikes">(3 strikes)</span>
              </div>
              <div className="week">
                Wk 6<span className="strikes">(3 strikes)</span>
              </div>
              <div className="week">
                Wk 7<span className="strikes">(3 strikes)</span>
              </div>
              <div className="week">
                Wk 8<span className="strikes">(3 strikes)</span>
              </div>
              <div className="week">
                Wk 9<span className="strikes">(2 strikes)</span>
              </div>
              <div className="week">
                Wk 10<span className="strikes">(2 strikes)</span>
              </div>
              <div className="week">
                Wk 11<span className="strikes">(1 strikes)</span>
              </div>
              <div className="week">
                Wk 12<span className="strikes">(1 strikes)</span>
              </div>
              <div className="week">
                Wk 13<span className="strikes">(1 strikes)</span>
              </div>
              <div className="week">
                Wk 14<span className="strikes">(1 strikes)</span>
              </div>
            </div>
            {sortedData &&
              sortedData.map((ownerObj, index) => {
                const ownerName = Object.keys(ownerObj)[0]
                const formattedName =
                  Object.keys(ownerObj)[0].split(" ")[0] +
                  " " +
                  Object.keys(ownerObj)[0].split(" ")[1].slice(0, 1) +
                  "."
                const weekKeys = Object.keys(ownerObj[ownerName].weeklyScores)
                return (
                  <div key={index} className="ownerByWeekWrapper">
                    <div className={`ownerName index${index}`}>
                      {formattedName}
                    </div>
                    {weekKeys.map((week) => {
                      return (
                        <div
                          key={week}
                          className={`weekCell index${index} ${
                            ownerObj[ownerName].weeklyScores[week].strike &&
                            "striked"
                          } ${
                            Number(ownerObj[ownerName].weekEliminated) <
                              weekKeysConversion[week] && "eliminated"
                          } ${
                            ownerObj[ownerName].weeklyScores[week].topScorer ===
                              true && "topScore"
                          }`}
                        >
                          {ownerObj[ownerName].weeklyScores[
                            week
                          ].points.toFixed(2)}

                          {Number(ownerObj[ownerName].weekEliminated) <
                            weekKeysConversion[week] && (
                            <span className="overlay"></span>
                          )}

                          {ownerObj[ownerName].weeklyScores[week].strike ===
                            true && (
                            <div className="insetStrikesWrapper">
                              {Array.from({
                                length:
                                  ownerObj[ownerName]?.weeklyScores[week]
                                    ?.totalStrikes || 0
                              })
                                .fill(null)
                                .map((_, index) => {
                                  return (
                                    <div className="insetStrikes" key={index}>
                                      <IoMdClose />
                                    </div>
                                  )
                                })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
