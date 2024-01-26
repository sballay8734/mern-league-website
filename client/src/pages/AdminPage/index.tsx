import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

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

const PLAYER_PROPS_URL = `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/61dcc385d9c0927b9392d04c3b944198/odds?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=player_pass_tds&oddsFormat=american`

// PROPS ROUTE `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/61dcc385d9c0927b9392d04c3b944198/odds?apiKey=${ODDS_API_KEY}&regions=us&markets={markets}&oddsFormat=american`

// const baseUrl = "https://api.prop-odds.com"

export interface Outcomes {
  name: string
  point: number
  price: number
  description?: string
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

interface WeekRanges {
  [week: string]: {
    key: string
    start: string
    end: string
  }
}

interface SubmittedProps {
  propID: string
  year: string // 2024
  week: string // weekOne
  type: string // spread | totals
  homeTeam: string | null
  awayTeam: string | null
  player: string | null
}

const picksToMake = 12

const nfl2024WeekRanges: WeekRanges = {
    weekOne: {key: "weekOne", start: "2024-09-05T06:00:00Z", end: "2024-09-12T06:00:00Z" },
    weekTwo: {key: "weekTwo", start: "", end: "" },
    weekThree: {key: "weekThree", start: "", end: "" },
    weekFour: {key: "weekFour", start: "", end: "" },
    weekFive: {key: "weekFive", start: "", end: "" },
    weekSix: {key: "weekSix", start: "", end: "" },
    weekSeven: {key: "weekSeven", start: "", end: "" },
    weekEight: {key: "weekEight", start: "", end: "" },
    weekNine: {key: "weekNine", start: "", end: "" },
    weekTen: {key: "weekTen", start: "", end: "" },
    weekEleven: {key: "weekEleven", start: "", end: "" },
    weekTwelve: {key: "weekTwelve", start: "", end: "" },
    weekThirteen: {key: "weekThirteen", start: "", end: "" },
    weekFourteen: {key: "weekFourteen", start: "", end: "" },
    weekFifteen: {key: "weekFifteen", start: "", end: "" },
    weekSixteen: {key: "weekSixteen", start: "", end: "" },
    weekSeventeen: {key: "weekSeventeen", start: "", end: "" },
    weekEighteen: {key: "weekEighteen", start: "2024-01-02T06:00:00Z", end: "2024-01-09T06:00:00Z" },
    testWeek: {key: "testWeek", start: "2024-01-24T06:00:00Z", end: "2024-01-27T06:00:00Z" },
}

export default function AdminPage() {
  const { user } = useSelector((state: RootState) => state.user)
  const { data } = useFetchOwnersQuery()
  const [activeButton, setActiveButton] = useState<string>("tempAdmins")
  const [updateInProgress, setUpdateInProgress] = useState<boolean>(false)
  const [bettingData, setBettingData] = useState<BettingProp[] | null>(null)
  const [numPropsSelected, setNumPropsSelected] = useState<string[]>([])
  const [propsSelected, setPropsSelected] = useState<SubmittedProps[]>([])


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
    if (numPropsSelected.includes(propId)) {
      const filteredProps = numPropsSelected.filter((item) => item !== propId)

      setNumPropsSelected(filteredProps)
    } else {
      setNumPropsSelected([...numPropsSelected, propId])
    }
  }

  function getCurrentWeek() {
    const currentDate = new Date()
    let currentWeek = null

    for (const weekKey in nfl2024WeekRanges) {
      const week = nfl2024WeekRanges[weekKey]

      const startDate = new Date(week.start)
      const endDate = new Date(week.end)

      if (currentDate >= startDate && currentDate <= endDate) {
        currentWeek = week
        break
      }
    }

    return currentWeek
  }

  useEffect(() => {
    const week = getCurrentWeek()
    // console.log(week)
  }, [])

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
                  </ul>
                  Click on a prop to select it. Press "Submit Props" when you have made all of your selections.
                </div>
                <div className="props">
                    {bettingData && bettingData.map((prop: BettingProp) => {
                      if (prop.bookmakers.length === 0) return null
                      if (prop.bookmakers.length > 1) return "Too Many BMs"

                      // console.log(prop)

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
      <span className={`propCounter ${numPropsSelected.length === picksToMake ? "done" : numPropsSelected.length > picksToMake ? "tooMany" : ""}`}>
        {numPropsSelected.length === picksToMake ? "Submit Props" : numPropsSelected.length > picksToMake ? "That's Too Many!" : `Picks Made: ${numPropsSelected.length} / ${picksToMake}`}
        </span>
    </div>
  )
}
