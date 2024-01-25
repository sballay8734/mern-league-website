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
import BettingPropSpreads from "../../components/BettingPropSpreads"
import BettingPropTotals from "../../components/BettingPropTotals"

const ODDS_API_KEY = "0f397ef8e40fda92307241c433993cd7"
const BASE_URL = `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=totals,spreads&oddsFormat=american`

// PROPS ROUTE `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/{EVENT_ID}/odds?apiKey=${ODDS_API_KEY}&regions=us&markets={markets}&oddsFormat=american`

// const baseUrl = "https://api.prop-odds.com"

export interface Outcomes {
  name: string
  point: number
  price: number
}

export interface Markets {
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

export interface BettingProp {
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
  const [propsSelected, setPropsSelected] = useState<string[]>([])

  const picksToMake = 3

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

  // push prop.id && key
  function handlePropCounter(propId: string) {
    if (propsSelected.includes(propId)) {
      const filteredProps = propsSelected.filter((item) => item !== propId)

      setPropsSelected(filteredProps)
    } else {
      setPropsSelected([...propsSelected, propId])
    }
  }

  console.log(bettingData)

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
                      <button disabled>Submit Props</button>
                    </li>
                  </ul>
                  Click on a prop to select it. Press "Submit Props" when you have made all of your selections.
                </div>
                <div className="props">
                    {bettingData && bettingData.map((prop: BettingProp) => {
                      if (prop.bookmakers.length === 0) return null
                      if (prop.bookmakers.length > 1) return "Too Many BMs"

                      const markets = prop.bookmakers[0].markets

                      return markets.map((type, index) => {
                        if (type.key === "spreads") {

                          return <BettingPropSpreads key={index} outcomes={type.outcomes} type={type} time={prop.commence_time} homeTeam={prop.home_team} awayTeam={prop.away_team} handlePropCounter={handlePropCounter} prop={prop} />
                        } else if (type.key === "totals") {
                          return <BettingPropTotals key={index} outcomes={type.outcomes} type={type} time={prop.commence_time} homeTeam={prop.home_team} awayTeam={prop.away_team} handlePropCounter={handlePropCounter} prop={prop} />
                        }
                      })
                    })}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>You are not an Admin</div>
      )}
      <span className={`propCounter ${propsSelected.length === picksToMake ? "done" : propsSelected.length > picksToMake ? "tooMany" : ""}`}>
        {propsSelected.length === picksToMake ? "Submit Props" : propsSelected.length > picksToMake ? "That's Too Many!" : `Picks Made: ${propsSelected.length} / ${picksToMake}`}
        </span>
    </div>
  )
}
