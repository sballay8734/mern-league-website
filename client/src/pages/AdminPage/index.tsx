import { useSelector } from "react-redux"
import { useState } from "react"

import { MdAdminPanelSettings } from "react-icons/md"
import { RootState } from "../../redux/store"
import { useFetchOwnersQuery } from "../../redux/owners/ownersApi"
import {
  // allTimeStaticDataInit,
  staticDataInit
} from "./utils/staticDataFunction"
import "./AdminPage.scss"
import { recordsDataInit } from "./utils/recordFunctions"
import { KOTHInit } from "./utils/kothFunctions"

// const baseUrl = "https://api.prop-odds.com"

export default function AdminPage() {
  const { user } = useSelector((state: RootState) => state.user)
  const { data } = useFetchOwnersQuery()
  const [activeButton, setActiveButton] = useState<string>("tempAdmins")
  const [updateInProgress, setUpdateInProgress] = useState<boolean>(false)

  // console.log(data)

  // async function handleFetchProps() {
  //   console.log("Starting request...")
  //   const now = new Date()
  //   const query = new URLSearchParams({
  //     data: now.toISOString().split("T")[0],
  //     tz: "America/New_York",
  //     api_key: import.meta.env.VITE_PROP_ODDS_API_KEY
  //   })
  //   const res = await fetch(`${baseUrl}/beta/games/nfl/?${query}`, {
  //     method: "GET"
  //   })

  //   const data = await res.json()

  //   if (!data) {
  //     console.log("Something went wrong")
  //   }

  //   console.log(data)
  // }

  async function runStaticDataUpdate() {
    setUpdateInProgress(true)

    if (!data) return

    try {
      // run all update functions
      const successData = await staticDataInit(data)
      console.log(successData)
      // console.log(yearlyStaticDataInit(data[0], 2014))
    } catch (error) {
      console.log(error)
    }

    setUpdateInProgress(false)
  }

  async function runRecordsDataUpdate() {
    setUpdateInProgress(true)

    if (!data) return

    try {
      // run all update functions
      const successData = await recordsDataInit(data)
      console.log(successData)
      // console.log(yearlyStaticDataInit(data[0], 2014))
    } catch (error) {
      console.log(error)
    }

    setUpdateInProgress(false)
  }

  async function runKOTHDataUpdate() {
    setUpdateInProgress(true)
    if (!data) return

    try {
      // run all update functions
      const successData = await KOTHInit(data)
      console.log(successData)
    } catch (error) {
      console.log(error)
    }

    setUpdateInProgress(false)
  }

  return (
    <div className="page admin-page">
      {user && user.isAdmin === true ? (
        <>
          <div className="admin-page-top">
            <div className="admin-page-header">
              <h1>Admin</h1>
              <div className="award">
                <MdAdminPanelSettings />
              </div>
            </div>
            <nav className="admin-nav">
              <ul>
                <li>
                  <button
                    className={`${activeButton === "shawn" ? "active" : ""}`}
                    onClick={() => setActiveButton("shawn")}
                  >
                    Shawn
                  </button>
                </li>
                <li className="spacer"></li>
                <li>
                  <button
                    className={`${
                      activeButton === "tempAdmins" ? "active" : ""
                    }`}
                    onClick={() => setActiveButton("tempAdmins")}
                  >
                    Temp Admins
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="admin-page-bottom">
            {activeButton === "shawn" ? (
              <div className="placeholder">
                <div className="actions admin-actions">
                  <ul>
                    <li>
                      <button
                        disabled={updateInProgress}
                        onClick={runStaticDataUpdate}
                      >
                        Update Static Data
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={runRecordsDataUpdate}
                        disabled={updateInProgress}
                      >
                        Update Records
                      </button>
                    </li>
                    <li>
                      <button
                      onClick={runKOTHDataUpdate}
                      disabled={updateInProgress}>
                        Update KOTH
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="placeholder">
                <div className="actions tempAdmin-actions">
                  <ul>
                    <li>
                      <button>Fetch Props</button>
                    </li>
                    <li>
                      <button>Submit Props</button>
                    </li>
                  </ul>
                  <div className="props">Select Button & Remove Button</div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>You are not an Admin</div>
      )}
    </div>
  )
}
