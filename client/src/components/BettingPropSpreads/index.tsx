import { useEffect, useState } from "react";

import TestCountdownTimer from "../TestCountDown/TestCountDown"
import { BettingProp, Markets, Outcomes } from "../../pages/AdminPage";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import PlayerProp from "../PlayerProp";
import PlayerPropFilterBtn from "../PlayerPropFilterBtn";


interface KeyConversion {
  [key: string]: string
}

interface OUStats {
  name: string,
  description?: string
  price: number
  point: number
}

interface CombinedProp {
  [playerNameAndKey: string]: {
    overStats: OUStats
    underStats: OUStats
  }
}

const propKeyConversion: KeyConversion = {
  player_pass_tds: "Pass TDs", 
  player_pass_yds: "Pass Yds", 
  player_pass_completions: "Completions", 
  player_pass_attempts: "Pass Attempts", 
  player_pass_interceptions: "Interceptions", 
  player_rush_yds: "Rush Yds", 
  player_rush_attempts: "Rush Attempts", 
  player_receptions: "Receptions", 
  player_reception_yds: "Receiving Yds"
  // player_anytime_td: "TESTING"
}

interface PlayerProp {
  uniquePropKey: string
  item: Markets
  player: string
  overStats: {name: string, description?: string, price: number, point: number}
  underStats: {name: string, description?: string, price: number, point: number}
}

const ODDS_API_KEY = "7149a4ecd5269194832435e5755990ea" // baileeshaw
const SB_API_KEY = "0f397ef8e40fda92307241c433993cd7" // shawnballay1

const BASE_URL = `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=totals,spreads&oddsFormat=american`;

const PLAYER_PROPS_URL = `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/61dcc385d9c0927b9392d04c3b944198/odds?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=player_pass_tds&oddsFormat=american`;


export default function BettingPropSpreads({ outcomes, type, time, homeTeam, awayTeam, handlePropCounter, prop, gameIdsFetched, setGameIdsFetched }: {outcomes: Outcomes[]; type: Markets, time: string, homeTeam: string, awayTeam: string, handlePropCounter: (propId: string) => void, prop: BettingProp, gameIdsFetched: string[], setGameIdsFetched: (str: string[]) => void }) {
  const [selected, setSelected] = useState<boolean>(false)
  const [plyrPropdata, setPlyrPropData] = useState<BettingProp[]>([])
  const [showPlayerProps, setShowPlayerProps] = useState<boolean>(false)
  const [filteredButtons, setFilteredButtons] = useState<string[]>([])
  const [propsToRender, setPropsToRender] = useState<PlayerProp[]>([])

  const homeLine = outcomes.find((item) => item.name === homeTeam)
  const awayLine = outcomes.find((item) => item.name === awayTeam)

  useEffect(() => {
    handleDataRender()
  }, [plyrPropdata])

  function capitalizeAndRemoveLast(string: string): string {
    if (string.length <= 1) return ""

    return (string.charAt(0).toUpperCase() + string.slice(1, -1)).toLocaleUpperCase()
  }

  function handleSelectedProp(propId: string) {
    setSelected(!selected)
    handlePropCounter(propId)
  }

  function calculatePayout(odds: number) {
    if (odds > 0) {
      return 1 + (odds / 100)
    } else {
      return Number(((1 + (100 / Math.abs(odds))).toFixed(2)))
    }
  }

  function createPlayerPropUrl(string: string) {
    return `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/${prop.id}/odds?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=${string}&oddsFormat=american`
  }

  const testPropData: string[] = ["player_pass_tds", "player_pass_yds", "player_pass_completions", "player_pass_attempts", "player_pass_interceptions", "player_rush_yds", "player_rush_attempts", "player_receptions", "player_reception_yds", "player_anytime_td"]

  async function fetchPlayerProps() {
    if (gameIdsFetched?.includes(prop.id)) {
      setShowPlayerProps(!showPlayerProps)
      return
    } 

    let playerProps = []

    const propListToString = testPropData.join(",")

    const URL = createPlayerPropUrl(propListToString)

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

  console.log(plyrPropdata)

  function handleDataRender() {
    const playerProps: PlayerProp[] = []

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
            const statTemplate = {name: current.name, description: current.description, price: current.price, point: current.point}
            
            if (!combinedOutcomes[combinedKey]) {
              combinedOutcomes[combinedKey] = {
                overStats: {name: "", description: "", price: 0, point: 0},
                underStats: {name: "", description: "", price: 0, point: 0}
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

          // console.log(combinedOutcomes)

          // const renderedComponents = []
          for (const uniqueKey in combinedOutcomes) {
            const player = combinedOutcomes[uniqueKey].overStats.description?.split(" ").slice(0, 2).join(" ")!
            const overStats = combinedOutcomes[uniqueKey].overStats
            const underStats = combinedOutcomes[uniqueKey].underStats


            // removed item
            playerProps.push({uniquePropKey: uniqueKey, item, player, overStats, underStats})

            // renderedComponents.push(<PlayerProp key={uniqueKey} uniqueKeyProp={uniqueKey} item={item} player={player} overStats={overStats} underStats={underStats} handlePropCounter={handlePropCounter} />)
          }
        }
      })
      setPropsToRender(playerProps)
    }

    return ""
  }

  function handleFilterBtns(filter: string) {
    if (filteredButtons.includes(filter)) {
      setFilteredButtons(filteredButtons.filter((item) => {
        return item !== filter
      }))
    } else {
      setFilteredButtons(prevFilters => [...prevFilters, filter])
    }
  }

  function renderButtons() {
    const buttonKeys = []
    for (const key in propKeyConversion) {
      buttonKeys.push(<PlayerPropFilterBtn key={key} handleFilterBtns={handleFilterBtns} type={key} />)
    }

    return buttonKeys
  }

  const filteredPlayerProps = filteredButtons.length === 0 ? propsToRender :  propsToRender.filter((item) => {
        return filteredButtons.includes(item.item.key)
    })
  
  return (
    <div key={prop.id + type.key} className="prop">
      <div onClick={() => handleSelectedProp(prop.id + type.key)}  className="propWrapper">
        <div className="propHeader">
          <span className="propType">{capitalizeAndRemoveLast(type.key)}
          </span>
          <span className="countdownTimer">
            <TestCountdownTimer endDate={time}/>
          </span>
        </div>
        <div className="propBody">
          <div className="teamLineWrapper">
            <div className="teams">
              <div className="away team">
                <div className="teamAndLine">
                  <span className={`line awayLine ${awayLine && awayLine.point > 0 && "green"} ${awayLine && awayLine.point < 0 && "red"}`}>
                                        {awayLine && awayLine.point > 0 ? `+${awayLine.point}` : awayLine?.point}
                  </span>
                  <span className="teamName">
                    {awayTeam.split(" ").slice(-1)[0]}
                  </span>
                </div>
                <div className="payout">
                  <span className="payoutText">Payout</span>
                  <span className="payoutValue">{awayLine && calculatePayout(awayLine.price)}</span>
                </div>
              </div>
              <span className="atSign">at</span>
              <div className="home team">
                <div className="teamAndLine">
                  <span className="teamName">
                    {homeTeam.split(" ").slice(-1)[0]}
                  </span>
                  <span className={`line homeLine ${homeLine && homeLine.point > 0 && "green"} ${homeLine && homeLine.point < 0 && "red"}`}>
                                        {homeLine && homeLine.point > 0 ? `+${homeLine.point}` : homeLine?.point}
                  </span>
                </div>
                <div className="payout">
                  <span className="payoutText">Payout</span>
                  <span className="payoutValue">{homeLine && calculatePayout(homeLine.price)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {selected && <div onClick={() => setSelected(!selected)} className="overlay">
          <span className="selected-text"></span>
          <div className="selected-matchup">
            <span className={`selected-away line ${awayLine && awayLine.point > 0 && "green"} ${awayLine && awayLine.point < 0 && "red"}`}><span className="team">{awayTeam.split(" ").slice(-1)[0]}{" "}</span>
                                    ({awayLine && awayLine.point > 0 ? `+${awayLine.point}` : awayLine?.point})
              </span>
            <span className="selected-at">at</span>
            <span className={`selected-home line ${homeLine && homeLine.point > 0 && "green"} ${homeLine && homeLine.point < 0 && "red"}`}><span className="team">{homeTeam.split(" ").slice(-1)[0]}{" "}</span>
                                    ({homeLine && homeLine.point > 0 ? `+${homeLine.point}` : homeLine?.point})
              </span>
          </div>
      </div>}
      </div>
      <button onClick={fetchPlayerProps} className="loadPlayerProps">Load Player Props For This Matchup <span>{showPlayerProps === true ? <FaCaretUp /> : <FaCaretDown />}</span></button>
      <div className={`playerPropFilterBtnsWrapper ${showPlayerProps === true ? "" : "hide" }`}>
        {renderButtons()}
      </div>
      <div className={`playerPropsWrapper ${showPlayerProps === true ? "" : "hide" }`}>
        {filteredPlayerProps.map((item) => {
          return <PlayerProp key={item.uniquePropKey} uniqueKeyProp={item.uniquePropKey} item={item.item} player={item.player} overStats={item.overStats} underStats={item.underStats} handlePropCounter={handlePropCounter} />
        })}
      </div>
    </div>
  )
}