import { useEffect, useState } from "react"

import TestCountdownTimer from "../TestCountDown/TestCountDown"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import { MdCompareArrows } from "react-icons/md"
import PlayerProp from "../PlayerProp"
import PlayerPropFilterBtn from "../PlayerPropFilterBtn"
import { PropToDbInterface } from "../BettingPropSpreads"

import {
  Outcomes,
  Markets,
  BettingProp,
  FullMatchupProps,
  PlayerPropInterface,
  createPlayerPropUrl,
  propKeyConversion,
  CombinedProp,
  calculatePayout
} from "../utils"

export default function BettingPropTotals({
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
  setPropsSelected
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
}) {
  const [selected, setSelected] = useState<boolean>(false)
  const [showPlayerProps, setShowPlayerProps] = useState<boolean>(false)
  const [plyrPropdata, setPlyrPropData] = useState<BettingProp[]>([])
  const [filteredButtons, setFilteredButtons] = useState<string[]>([])
  const [propsToRender, setPropsToRender] = useState<PlayerPropInterface[]>([])

  useEffect(() => {
    handleDataRender()
  }, [plyrPropdata])

  const gameLine = outcomes[0].point
  const overData = outcomes.find((item) => item.name === "Over")
  const underData = outcomes.find((item) => item.name === "Under")

  const testPropData: string[] = [
    "player_pass_tds",
    "player_pass_yds",
    "player_pass_completions",
    "player_pass_attempts",
    "player_pass_interceptions",
    "player_rush_yds",
    "player_rush_attempts",
    "player_receptions",
    "player_reception_yds",
    "player_anytime_td"
  ]

  function handleSelectedProp(propId: string) {
    const uniqueId = propId

    setSelected(!selected)
    handlePropCounter(propId)

    const propExists = propsSelected.find((item) => item.uniqueId === uniqueId)

    if (propExists) {
      // remove prop
      const updatedProps = propsSelected.filter(
        (item) => item.uniqueId !== uniqueId
      )
      setPropsSelected(updatedProps)
      return
    }

    const propToSend = formatTeamProp(propId)
    setPropsSelected([...propsSelected, propToSend] as PropToDbInterface[])
  }

  function formatTeamProp(uniqueId: string) {
    if (gameLine && overData && underData) {
      return {
        type: `team${
          type.key.charAt(0).toLocaleUpperCase() + type.key.slice(1)
        }`,
        gameId: prop.id, // you MIGHT be able to use this for automatic updates
        expiration: prop.commence_time,
        uniqueId,

        // update these right before sending to DB
        week: 0,
        nflYear: 0,

        // updated here
        homeTeam: prop.home_team,
        awayTeam: prop.away_team,

        underData: {
          underLine: underData?.point,
          underPayout: underData?.price,
          calcUnderPayout: calculatePayout(underData?.price)
        },
        overData: {
          overLine: overData?.point,
          overPayout: overData?.price,
          calcOverPayout: calculatePayout(overData?.price)
        },

        // these are updated as users make selections
        underSelections: [],
        overSelections: [],

        // update these after game to calc results
        result: 0
      }
    }
  }

  async function fetchPlayerProps() {
    if (dataExists()) {
      setShowPlayerProps(!showPlayerProps)
      setPropsToRender(globalPropsToRender[prop.id])
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

  function dataExists() {
    if (globalPropsToRender[prop.id]) {
      return true
    } else {
      return false
    }
  }

  function handleDataRender() {
    // FIRST CHECK IF globalPropsToRender[prop.id] exists
    // if it does, just render those props
    const playerProps: PlayerPropInterface[] = []

    if (dataExists()) {
      setPropsToRender(globalPropsToRender[prop.id])
      return
    }

    if (plyrPropdata.length === 1) {
      const markets = plyrPropdata[0].bookmakers[0].markets

      markets.map((item) => {
        if (item.key === "player_anytime_td") {
          return null
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

  // return null

  const filteredPlayerProps =
    filteredButtons.length === 0
      ? propsToRender
      : propsToRender.filter((item) => {
          return filteredButtons.includes(item.item.key)
        })

  return (
    <div key={prop.id + type.key} className="prop">
      <div
        onClick={() => handleSelectedProp(prop.id + type.key)}
        className="propWrapper"
      >
        <div className="propHeader">
          <span className="propType totals">OVER / UNDER</span>
          <span className="countdownTimer">
            <TestCountdownTimer endDate={time} />
          </span>
        </div>
        <div className="propBody">
          <div className="teamLineWrapper">
            <div className="teams">
              <div className="away team">
                <div className="teamAndLine">
                  <span className={`line awayLine red`}>
                    Under {underData?.price}
                  </span>
                  <span className="teamName">
                    {awayTeam.split(" ").slice(-1)[0]}
                  </span>
                </div>
                <div className="payout">
                  <span className="payoutText">Payout</span>
                  <span className="payoutValue">
                    {underData && calculatePayout(underData?.price).toFixed(2)}
                  </span>
                </div>
              </div>
              <span className="atSign">at</span>
              <div className="home team">
                <div className="teamAndLine">
                  <span className="teamName">
                    {homeTeam.split(" ").slice(-1)[0]}
                  </span>
                  <span className={`line homeLine green`}>
                    Over {overData?.price}
                  </span>
                </div>
                <div className="payout">
                  <span className="payoutText">Payout</span>
                  <span className="payoutValue">
                    {overData && calculatePayout(overData.price).toFixed(2)}
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
              <span className="selected-away">
                {awayTeam.split(" ").slice(-1)[0]}
              </span>
              <span className="selected-at">at</span>
              <span className="selected-away">
                {homeTeam.split(" ").slice(-1)[0]}
              </span>
            </div>
            <span className="selected-line">
              <span className="arrows">
                <MdCompareArrows />
              </span>{" "}
              {gameLine} Total Points
            </span>
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
            />
          )
        })}
      </div>
    </div>
  )
}
