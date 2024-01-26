import { useEffect, useState } from "react";

import TestCountdownTimer from "../TestCountDown/TestCountDown"
import { BettingProp, Markets, Outcomes } from "../../pages/AdminPage";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import PlayerProp from "../PlayerProp";
import PlayerPropFilterBtn from "../PlayerPropFilterBtn";

const ODDS_API_KEY = "7149a4ecd5269194832435e5755990ea" // baileeshaw
const SB_API_KEY = "0f397ef8e40fda92307241c433993cd7" // shawnballay1

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

interface gameIdObjects {
  id: string
  type: string
}

export default function BettingPropTotals({ outcomes, type, time, homeTeam, awayTeam, handlePropCounter, prop, gameIdsFetched, setGameIdsFetched }: {outcomes: Outcomes[]; type: Markets, time: string, homeTeam: string, awayTeam: string, handlePropCounter: (propId: string) => void, prop: BettingProp, gameIdsFetched: string[], setGameIdsFetched: (str: string[]) => void }) {
  const [selected, setSelected] = useState<boolean>(false)
  const [showPlayerProps, setShowPlayerProps] = useState<boolean>(false)
  const [plyrPropdata, setPlyrPropData] = useState<BettingProp[]>([])
  const [filteredButtons, setFilteredButtons] = useState<string[]>([])
  const [propsToRender, setPropsToRender] = useState<PlayerProp[]>([])

  const gameLine = outcomes[0].point
  const overPayout = outcomes.find((item) => item.name === "Over")?.price
  const underPayout = outcomes.find((item) => item.name === "Under")?.price

  const testPropData: string[] = ["player_pass_tds", "player_pass_yds", "player_pass_completions", "player_pass_attempts", "player_pass_interceptions", "player_rush_yds", "player_rush_attempts", "player_receptions", "player_reception_yds", "player_anytime_td"]

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

  function createPlayerPropUrl(string: string) {
    return `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/${prop.id}/odds?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=${string}&oddsFormat=american`
  }

  function renderButtons() {
    const buttonKeys = []
    for (const key in propKeyConversion) {
      buttonKeys.push(<PlayerPropFilterBtn key={key} handleFilterBtns={handleFilterBtns} type={key} />)
    }

    return buttonKeys
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

  

  const filteredPlayerProps = filteredButtons.length === 0 ? propsToRender :  propsToRender.filter((item) => {
        return filteredButtons.includes(item.item.key)
    })
  
  return (
        <div key={prop.id + type.key} className="prop">
          <div onClick={() => handleSelectedProp(prop.id + type.key)}  className="propWrapper">
            <div className="propHeader">
              <span className="propType totals">OVER / UNDER
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
                      <span className={`line awayLine red`}>
                        Under {gameLine}
                      </span>
                      <span className="teamName">
                        {awayTeam.split(" ").slice(-1)[0]}
                      </span>
                    </div>
                    <div className="payout">
                      <span className="payoutText">Payout</span>
                      <span className="payoutValue">{underPayout && calculatePayout(underPayout)}</span>
                    </div>
                  </div>
                  <span className="atSign">at</span>
                  <div className="home team">
                    <div className="teamAndLine">
                      <span className="teamName">
                        {homeTeam.split(" ").slice(-1)[0]}
                      </span>
                      <span className={`line homeLine green`}>
                        Over {gameLine}
                      </span>
                    </div>
                    <div className="payout">
                      <span className="payoutText">Payout</span>
                      <span className="payoutValue">{overPayout && calculatePayout(overPayout)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              {selected && <div onClick={() => setSelected(!selected)} className="overlay">
                <span className="selected-text"></span>
                <div className="selected-matchup">
                  <span className="selected-away">{awayTeam.split(' ').slice(-1)[0]}</span>
                  <span className="selected-at">at</span>
                  <span className="selected-away">{homeTeam.split(" ").slice(-1)[0]}</span>
                </div>
                <span className="selected-line"><span className="arrows"><MdCompareArrows /></span> {gameLine} Total Points</span>
            </div>}
          </div>
          <button onClick={fetchPlayerProps} className="loadPlayerProps">Load Player Props For This Matchup <span>{showPlayerProps === true ? <FaCaretUp /> : <FaCaretDown />}</span></button>
          <div className={`playerPropFilterBtnsWrapper ${showPlayerProps ===  true ? "" : "hide" }`}>
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