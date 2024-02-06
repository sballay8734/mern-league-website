import { useEffect, useState } from "react"

import { LuCrown } from "react-icons/lu"
import KingNav from "./KingNav"
import { OwnerObject } from "../../pages/KothPage/types"
import { useFetchKingStandingsQuery } from "../../redux/king/kingApi"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { IoMdClose, IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { weekKeysConversion } from "../../pages/KothPage/types"

export default function KingMainTable() {
  const [sortedData, setSortedData] = useState<OwnerObject[] | null>(null)
  const [showBreakDown, setShowBreakdown] = useState<boolean>(false)
  const [dataError, setDataError] = useState<boolean>(false)
  const { data: kingData } = useFetchKingStandingsQuery()

  const activeYear = useSelector(
    (state: RootState) => state.kingSlice.activeYear
  )

  function handleShowBreakdown() {
    if (showBreakDown === false) {
      setShowBreakdown(!showBreakDown)
      console.log("SCROLLING")
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }

    setShowBreakdown(!showBreakDown)
  }

  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth" // You can change this to 'auto' for instant scrolling
    })
  }

  useEffect(() => {
    if (kingData) {
      const standingsData = kingData.find(
        (obj) => obj.year.toString() === activeYear
      )
      if (standingsData) {
        setDataError(false)
        console.log("Running Standings Data")
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
      } else {
        setDataError(true)
      }
    }
  }, [activeYear, kingData])

  return (
    <>
      <div className="alwaysShownContent">
        <div className="king-page-top">
          <div className="king-page-header">
            <h1>King of the Hill</h1>
            <div className="crown">
              <LuCrown />
            </div>
          </div>
          <KingNav />
        </div>
        {!dataError ? (
          <div className="king-page-bottom">
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
                  onClick={handleShowBreakdown}
                  className={`viewBreakdown-btn`}
                >
                  View Breakdown
                  <span>
                    {showBreakDown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="error">No data for {activeYear} exists</div>
        )}
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
    </>
  )
}
