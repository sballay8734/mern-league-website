import { useEffect, useState } from "react"

import TestCountdownTimer from "../TestCountDown/TestCountDown"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import PlayerPropFilterBtn from "../PlayerPropFilterBtn"
import { weekToNumConversion } from "../utils"
import {
  Outcomes,
  Markets,
  BettingProp,
  FullMatchupProps,
  PlayerPropInterface,
  ODDS_API_KEY,
  testPropData,
  CombinedProp,
  propKeyConversion,
  capitalizeAndRemoveLast,
  calculatePayout,
  createPlayerPropUrl
} from "../utils"
import PlayerProp from "../PlayerProp"

interface Challenges {
  challenger: string
  acceptor: string | null
  challengerChoice: string // "over" | "under" | "away" | "home"
  acceptorChoice: string // "over" | "under" | "away" | "home"

  void: boolean
}

export interface PropToDbInterface {
  type: string
  subType?: string
  player?: string
  gameId: string
  expiration: string
  uniqueId: string
  week: number
  nflYear: number

  overData?: { overLine: number; overPayout: number; calcOverPayout: number }
  underData?: {
    underLine: number
    underPayout: number
    calcUnderPayout: number
  }
  overSelections?: string[]
  underSelections?: string[]

  homeTeam?: string
  awayTeam?: string

  homeData?: {
    homeTeam: string
    homeLine: number
    homePayout: number
    calcHomePayout: number
  }
  awayData?: {
    awayTeam: string
    awayLine: number
    awayPayout: number
    calcAwayPayout: number
  }
  homeLineSelections?: string[]
  awayLineSelections?: string[]

  awayScoreResult?: number
  homeScoreResult?: number

  result?: number

  void: boolean

  challenges: Challenges[] | []

  weekYear: "weekOne2024"
}

export default function BettingPropSpreads({
  outcomes,
  type,
  time,
  homeTeam,
  awayTeam,
  handlePropCounter,
  prop,
  gameIdsFetched,
  setGameIdsFetched,
  globalPropsToRender,
  setGlobalPropsToRender,
  propsSelected,
  setPropsSelected,
  currentWeek,
  currentYear
}: {
  outcomes: Outcomes[]
  type: Markets
  time: string
  homeTeam: string
  awayTeam: string
  handlePropCounter: (propId: string) => void
  prop: BettingProp
  gameIdsFetched: string[]
  setGameIdsFetched: (str: string[]) => void
  globalPropsToRender: FullMatchupProps
  setGlobalPropsToRender: (obj: FullMatchupProps) => void
  propsSelected: PropToDbInterface[]
  setPropsSelected: (obj: PropToDbInterface[]) => void
  currentWeek: string
  currentYear: number
}) {
  const [selected, setSelected] = useState<boolean>(false)
  const [plyrPropdata, setPlyrPropData] = useState<BettingProp[]>([])
  const [showPlayerProps, setShowPlayerProps] = useState<boolean>(false)
  const [filteredButtons, setFilteredButtons] = useState<string[]>([])
  const [propsToRender, setPropsToRender] = useState<PlayerPropInterface[]>([])

  const homeLine = outcomes.find((item) => item.name === homeTeam)
  const awayLine = outcomes.find((item) => item.name === awayTeam)

  useEffect(() => {
    handleDataRender()
  }, [plyrPropdata])

  function handleSelectedProp(propId: string, type: string) {
    const uniqueId = prop.id + type

    setSelected(!selected)
    handlePropCounter(propId + type)

    const propExists = propsSelected.find((item) => item.uniqueId === uniqueId)

    if (propExists) {
      // remove prop
      const updatedProps = propsSelected.filter(
        (item) => item.uniqueId !== uniqueId
      )
      setPropsSelected(updatedProps)
      return
    }

    const propToSend = formatTeamProp(type)
    setPropsSelected([...propsSelected, propToSend] as PropToDbInterface[])
  }

  function formatTeamProp(type: string) {
    if (homeLine && awayLine) {
      return {
        type: `team${type.charAt(0).toLocaleUpperCase() + type.slice(1)}`,
        gameId: prop.id, // you MIGHT be able to use this for automatic updates
        expiration: prop.commence_time,
        uniqueId: `${prop.id + type}`, // JUST for filtering

        // update these right before sending to DB
        week: weekToNumConversion[currentWeek],
        nflYear: currentYear,

        // updated here
        homeData: {
          homeTeam: homeLine.name,
          homeLine: homeLine.point,
          homePayout: homeLine.price,
          calcHomePayout: calculatePayout(homeLine.price)
        },

        awayData: {
          awayTeam: awayLine.name,
          awayLine: awayLine.point,
          awayPayout: awayLine.price,
          calcAwayPayout: calculatePayout(awayLine.price)
        },

        // these are updated as users make selections
        homeLineSelections: [],
        awayLineSelections: [],

        // update these after game to calc results
        awayScoreResult: 0,
        homeScoreResult: 0,

        // if voided, don't count prop
        void: false,

        challenges: [],

        // NEED TO GENERATE THIS
        weekYear: `${currentWeek}${currentYear.toString()}`
      }
    }
  }

  function dataExists() {
    if (globalPropsToRender[prop.id]) {
      return true
    } else {
      return false
    }
  }

  async function fetchPlayerProps() {
    if (dataExists()) {
      setPropsToRender(globalPropsToRender[prop.id])
      setShowPlayerProps(!showPlayerProps)
      return
    }

    if (gameIdsFetched?.includes(prop.id)) {
      setShowPlayerProps(!showPlayerProps)
      return
    }

    let playerProps = []

    const propListToString = testPropData.join(",")

    const URL = createPlayerPropUrl(propListToString, prop.id)

    const res = await fetch(URL)
    const data = await res.json()
    if (!data) {
      console.log("ERROR")
      return
    }
    playerProps.push(data)
    setGameIdsFetched([...gameIdsFetched, prop.id])

    setPlyrPropData(playerProps)
    setShowPlayerProps(true)
  }

  function handleDataRender() {
    const playerProps: PlayerPropInterface[] = []

    if (dataExists()) {
      setPropsToRender(globalPropsToRender[prop.id])
      return
    }

    if (plyrPropdata.length === 1) {
      const markets = plyrPropdata[0].bookmakers[0].markets

      markets.map((item) => {
        if (item.key === "player_anytime_td") {
          return null // JUST FOR NOW (NOT SURE THIS MAKE SENSE FOR FORMAT)

          // return item.outcomes.map((outcome) => {
          //   const propKey = item.key + outcome.description + outcome.name + outcome.price

          //   return <div className="playerProp" key={propKey}>{item.key} {outcome.description} {outcome.price}</div>
          // })
        } else {
          let combinedOutcomes: CombinedProp = {}

          for (let i = 0; i < item.outcomes.length; i++) {
            const current = item.outcomes[i]
            const player = current.description
            const combinedKey = player?.split(" ").join("") + item.key
            const statTemplate = {
              name: current.name,
              description: current.description,
              price: current.price,
              point: current.point
            }

            if (!combinedOutcomes[combinedKey]) {
              combinedOutcomes[combinedKey] = {
                overStats: { name: "", description: "", price: 0, point: 0 },
                underStats: { name: "", description: "", price: 0, point: 0 }
              }

              if (current.name === "Over") {
                combinedOutcomes[combinedKey].overStats = statTemplate
              }
              if (current.name === "Under") {
                combinedOutcomes[combinedKey].underStats = statTemplate
              }
            } else {
              if (current.name === "Over") {
                combinedOutcomes[combinedKey].overStats = statTemplate
              }
              if (current.name === "Under") {
                combinedOutcomes[combinedKey].underStats = statTemplate
              }
            }
          }

          for (const uniqueKey in combinedOutcomes) {
            const player = combinedOutcomes[uniqueKey].overStats.description
              ?.split(" ")
              .slice(0, 2)
              .join(" ")!
            const overStats = combinedOutcomes[uniqueKey].overStats
            const underStats = combinedOutcomes[uniqueKey].underStats

            // removed item
            playerProps.push({
              uniquePropKey: uniqueKey,
              item,
              player,
              overStats,
              underStats
            })
          }
        }
      })

      setPropsToRender(playerProps)
      setGlobalPropsToRender({ [prop.id]: playerProps })
    }

    return ""
  }

  function handleFilterBtns(filter: string) {
    if (filteredButtons.includes(filter)) {
      setFilteredButtons(
        filteredButtons.filter((item) => {
          return item !== filter
        })
      )
    } else {
      setFilteredButtons((prevFilters) => [...prevFilters, filter])
    }
  }

  function renderButtons() {
    const buttonKeys = []
    for (const key in propKeyConversion) {
      buttonKeys.push(
        <PlayerPropFilterBtn
          key={key}
          handleFilterBtns={handleFilterBtns}
          type={key}
        />
      )
    }

    return buttonKeys
  }

  const filteredPlayerProps =
    filteredButtons.length === 0
      ? propsToRender
      : propsToRender.filter((item) => {
          return filteredButtons.includes(item.item.key)
        })

  return (
    <div key={prop.id + type.key} className="prop">
      <div
        onClick={() => handleSelectedProp(prop.id, type.key)}
        className="propWrapper"
      >
        <div className="propHeader">
          <span className="propType">{capitalizeAndRemoveLast(type.key)}</span>
          <span className="countdownTimer">
            <TestCountdownTimer endDate={time} />
          </span>
        </div>
        <div className="propBody">
          <div className="teamLineWrapper">
            <div className="teams">
              <div className="away team">
                <div className="teamAndLine">
                  <span
                    className={`line awayLine ${
                      awayLine && awayLine.point > 0 && "green"
                    } ${awayLine && awayLine.point < 0 && "red"}`}
                  >
                    {awayLine && awayLine.point > 0
                      ? `+${awayLine.point}`
                      : awayLine?.point}
                  </span>
                  <span className="teamName">
                    {awayTeam.split(" ").slice(-1)[0]}
                  </span>
                </div>
                <div className="payout">
                  <span className="payoutText">Payout</span>
                  <span className="payoutValue">
                    {awayLine && calculatePayout(awayLine.price).toFixed(2)}
                  </span>
                </div>
              </div>
              <span className="atSign">at</span>
              <div className="home team">
                <div className="teamAndLine">
                  <span className="teamName">
                    {homeTeam.split(" ").slice(-1)[0]}
                  </span>
                  <span
                    className={`line homeLine ${
                      homeLine && homeLine.point > 0 && "green"
                    } ${homeLine && homeLine.point < 0 && "red"}`}
                  >
                    {homeLine && homeLine.point > 0
                      ? `+${homeLine.point}`
                      : homeLine?.point}
                  </span>
                </div>
                <div className="payout">
                  <span className="payoutText">Payout</span>
                  <span className="payoutValue">
                    {homeLine && calculatePayout(homeLine.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {selected && (
          <div onClick={() => setSelected(!selected)} className="overlay">
            <span className="selected-text"></span>
            <div className="selected-matchup">
              <span
                className={`selected-away line ${
                  awayLine && awayLine.point > 0 && "green"
                } ${awayLine && awayLine.point < 0 && "red"}`}
              >
                <span className="team">
                  {awayTeam.split(" ").slice(-1)[0]}{" "}
                </span>
                (
                {awayLine && awayLine.point > 0
                  ? `+${awayLine.point}`
                  : awayLine?.point}
                )
              </span>
              <span className="selected-at">at</span>
              <span
                className={`selected-home line ${
                  homeLine && homeLine.point > 0 && "green"
                } ${homeLine && homeLine.point < 0 && "red"}`}
              >
                <span className="team">
                  {homeTeam.split(" ").slice(-1)[0]}{" "}
                </span>
                (
                {homeLine && homeLine.point > 0
                  ? `+${homeLine.point}`
                  : homeLine?.point}
                )
              </span>
            </div>
          </div>
        )}
      </div>
      <button onClick={fetchPlayerProps} className="loadPlayerProps">
        Load Player Props For This Matchup{" "}
        <span>
          {showPlayerProps === true ? <FaCaretUp /> : <FaCaretDown />}
        </span>
      </button>
      <div
        className={`playerPropFilterBtnsWrapper ${
          showPlayerProps === true ? "" : "hide"
        }`}
      >
        {renderButtons()}
      </div>
      <div
        className={`playerPropsWrapper ${
          showPlayerProps === true ? "" : "hide"
        }`}
      >
        {filteredPlayerProps.map((item) => {
          return (
            <PlayerProp
              key={item.uniquePropKey}
              uniquePropKey={item.uniquePropKey}
              item={item.item}
              player={item.player}
              overStats={item.overStats}
              underStats={item.underStats}
              prop={prop}
              handlePropCounter={handlePropCounter}
              propsSelected={propsSelected}
              setPropsSelected={setPropsSelected}
              currentWeek={currentWeek}
              currentYear={currentYear}
            />
          )
        })}
      </div>
    </div>
  )
}
