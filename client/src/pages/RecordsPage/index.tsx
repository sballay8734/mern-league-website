import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  setRecords,
  setRecordKeys,
  setActiveButton
} from "../../redux/records/recordsSlice"
import { FaAward } from "react-icons/fa"
import { useFetchRecordsQuery } from "../../redux/records/recordsApi"
import { RootState } from "../../redux/store"
import { recordKeyConversion, IRecord } from "./types"
import { formatRecordName } from "./helpers"
import "./RecordsPage.scss"

export default function RecordsPage() {
  const dispatch = useDispatch()
  const { data } = useFetchRecordsQuery()
  const activeButton = useSelector(
    (state: RootState) => state.recordsSlice.activeButton
  )
  const recordKeys = useSelector(
    (state: RootState) => state.recordsSlice.recordKeys
  )
  const records = useSelector((state: RootState) => state.recordsSlice.records)

  useEffect(() => {
    if (data) {
      if (data[0].records) {
        dispatch(setRecords(data[0].records))
        if (data[0].records !== null) {
          dispatch(setRecordKeys(Object.keys(data[0].records)))
        }
      }
    }
  }, [data])

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
                onClick={() => dispatch(setActiveButton("allTime"))}
              >
                All-Time
              </button>
            </li>
            <li className="spacer"></li>
            <li>
              <button
                className={`${activeButton === "yearly" ? "active" : ""}`}
                onClick={() => dispatch(setActiveButton("yearly"))}
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
            {recordKeys &&
              recordKeys.map((record, index) => {
                const currentRecord = records && Object.values(records[record])
                return (
                  <div key={index} className="recordCard">
                    <div className="recordTitle">
                      {recordKeyConversion[record]}
                    </div>
                    <div className="recordRankings">
                      {currentRecord &&
                        currentRecord.map((owner: IRecord, index: number) => {
                          if (owner.opponent === null) {
                            return (
                              <div key={index} className="recordHolder">
                                <div className="recordHolderName">
                                  {index === 0 && (
                                    <img src="/gold.png" alt="medal" />
                                  )}
                                  {index === 1 && (
                                    <img src="/silver.png" alt="medal" />
                                  )}
                                  {index === 2 && (
                                    <img src="/bronze.png" alt="medal" />
                                  )}
                                  {index > 2 && (
                                    <img
                                      className="honor"
                                      src="/honor.png"
                                      alt="medal"
                                    />
                                  )}
                                  {owner.recordHolder}
                                </div>
                                <div className="recordValue">
                                  {owner.statValue}
                                  {owner.type.toLocaleLowerCase()}
                                </div>
                                {owner.year !== null ? (
                                  <div className="recordYear small">
                                    {owner.year}
                                  </div>
                                ) : (
                                  <div className="recordYear small">N/A</div>
                                )}
                              </div>
                            )
                          } else {
                            return (
                              <div key={index} className="recordHolder small">
                                <div className="recordHolderName small">
                                  {index === 0 && (
                                    <img src="/gold.png" alt="medal" />
                                  )}
                                  {index === 1 && (
                                    <img src="/silver.png" alt="medal" />
                                  )}
                                  {index === 2 && (
                                    <img src="/bronze.png" alt="medal" />
                                  )}
                                  {index > 2 && (
                                    <img
                                      className="honor"
                                      src="/honor.png"
                                      alt="medal"
                                    />
                                  )}
                                  {formatRecordName(owner.recordHolder)}. (
                                  {owner.matchup?.pointsFor}) &{" "}
                                  {formatRecordName(owner.opponent)}. (
                                  {owner.matchup?.pointsAgainst})
                                </div>
                                <div className="recordValue small">
                                  {owner.statValue}
                                  {owner.type.toLocaleLowerCase()}
                                </div>
                                {owner.year !== null ? (
                                  <div className="recordYear small">
                                    {owner.year}
                                  </div>
                                ) : (
                                  <div className="recordYear small">N/A</div>
                                )}
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
