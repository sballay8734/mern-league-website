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
import TestCountdownTimer from "../../components/TestCountDown/TestCountDown"

const ODDS_API_KEY = "0f397ef8e40fda92307241c433993cd7"
const BASE_URL = `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=fanduel&markets=totals,spreads&oddsFormat=american`

// PROPS ROUTE `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/{EVENT_ID}/odds?apiKey=${ODDS_API_KEY}&regions=us&markets={markets}&oddsFormat=american`

// const baseUrl = "https://api.prop-odds.com"

interface Outcomes {
  name: string
  point: number
  price: number
}

interface Markets {
  key: string
  last_update: string
  outcomes: Outcomes[]
}

interface Bookmakers {
  key: string
  last_update: string
  title: string
  markets: Markets[]
}

interface BettingProp {
  home_team: string
  away_team: string
  commence_time: string
  id: string
  sports_key: string
  sports_title: string
  bookmakers: Bookmakers[]
}

export default function AdminPage() {
  const { user } = useSelector((state: RootState) => state.user)
  const { data } = useFetchOwnersQuery()
  const [activeButton, setActiveButton] = useState<string>("tempAdmins")
  const [updateInProgress, setUpdateInProgress] = useState<boolean>(false)
  const [bettingData, setBettingData] = useState<BettingProp[] | null>(null)

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

  async function fetchProps() {
    // fetch this optionally. Button says "Fetch player props for this game"
    let fanduelPlayerProps = []

    const res = await fetch(BASE_URL)
    const data = await res.json()
    if (!data) {
      console.log("ERROR")
      return
    }

    setBettingData(data)
    
  }

  function capitalizeAndRemoveLast(string: string): string {
    if (string.length <= 1) return ""

    return string.charAt(0).toUpperCase() + string.slice(1, -1)
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
                      <button onClick={fetchProps}>Fetch Props</button>
                    </li>
                    <li>
                      <button>Submit Props</button>
                    </li>
                  </ul>
                </div>
                <div className="props">
                    {bettingData && bettingData.map((prop: BettingProp) => {
                      // NEED TO CONDITIONALLY RENDER HERE DEPENDING ON WHAT TYPE OF PROP IT IS (spread, player prop, etc.)
                      const markets = prop.bookmakers[0].markets

                      const spreads = markets.find((item) => item.key === "spreads")

                      // const totals = markets.find((item) => item.key === "totals")
                      if (spreads) {
                        return (
                          <div key={prop.id} className="prop">
                            <div className="propHeader">
                              <span className="propType">{capitalizeAndRemoveLast(spreads.key)}
                              </span>
                              <span className="countdownTimer">
                                <TestCountdownTimer endDate={prop.commence_time}/>
                              </span>
                            </div>
                            <div className="propBody"></div>
                          </div>
                        )
                      }

                    })}
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
