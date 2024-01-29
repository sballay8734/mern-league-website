import { FaCaretLeft, FaCaretRight } from "react-icons/fa6"
import {
  propKeyConversion,
  calculatePayout,
  Markets,
  BettingProp
} from "../utils"
import { useState } from "react"
import { PropToDbInterface } from "../BettingPropSpreads"
import { weekToNumConversion } from "../utils"

export default function PlayerProp({
  item,
  player,
  overStats,
  underStats,
  uniquePropKey,
  prop,
  handlePropCounter,
  propsSelected,
  setPropsSelected,
  currentWeek,
  currentYear
}: {
  item: Markets
  player: string
  overStats: {
    name: string
    description?: string
    price: number
    point: number
  }
  underStats: {
    name: string
    description?: string
    price: number
    point: number
  }
  uniquePropKey: string
  prop: BettingProp
  handlePropCounter: (propId: string) => void
  propsSelected: PropToDbInterface[]
  setPropsSelected: (obj: PropToDbInterface[]) => void
  currentWeek: string
  currentYear: number
}) {
  const [selected, setSelected] = useState<boolean>(false)

  function handlePropSelection(key: string) {
    const uniqueId = uniquePropKey

    // setSelected(!selected)
    handlePropCounter(key)

    const propExists = propsSelected.find((item) => item.uniqueId === uniqueId)

    if (propExists) {
      // remove prop
      const updatedProps = propsSelected.filter(
        (item) => item.uniqueId !== uniqueId
      )
      setPropsSelected(updatedProps)
      return
    }

    const propToSend = formatPlayerProp()
    setPropsSelected([...propsSelected, propToSend] as PropToDbInterface[])
    // send Prop
  }

  function formatPlayerProp() {
    return {
      type: `playerProp`,
      subType: item.key,
      player: `${player}`,
      gameId: prop.id, // you MIGHT be able to use this for automatic updates
      expiration: prop.commence_time,
      uniqueId: uniquePropKey, // JUST for filtering

      // update these right before sending to DB
      week: weekToNumConversion[currentWeek],
      nflYear: currentYear,

      // updated here
      overData: {
        overLine: overStats.point,
        overPayout: overStats.price,
        calcOverPayout: calculatePayout(overStats.price)
      },
      underData: {
        underLine: underStats.point,
        underPayout: underStats.price,
        calcUnderPayout: calculatePayout(underStats.price)
      },

      // these are updated as users make selections
      overSelections: [],
      underSelections: [],

      // update these after game to calc results
      result: 0,

      // if voided, don't count prop
      void: false,

      challenges: [],
      weekYear: `${currentWeek}${currentYear.toString()}`
    }
  }

  const propAlreadySelected = !!propsSelected.find(
    (item) => item.uniqueId === uniquePropKey
  )

  return (
    <div
      onClick={() => handlePropSelection(uniquePropKey)}
      className="playerProp"
    >
      <div className="statCategory">{propKeyConversion[item.key]}</div>
      <div className="propDetails">
        <div className="underPrice priceWrapper">
          <span className="under">under</span>
          <span className="price">
            {underStats.price < 0 ? underStats.price : `+${underStats.price}`}
          </span>
        </div>
        <div className="playerAndLine">
          <div className="playerName">{player}</div>
          <div className="lineAndPayout">
            <div className="underPayout payout">
              <FaCaretRight /> {calculatePayout(underStats.price).toFixed(2)}
            </div>
            <div className="propLine">{overStats.point}</div>
            <div className="overPayout payout">
              {calculatePayout(overStats.price).toFixed(2)} <FaCaretLeft />
            </div>
          </div>
        </div>
        <div className="overPrice priceWrapper">
          <span className="over">over</span>
          <span className="price">
            {overStats.price < 0 ? overStats.price : `+${overStats.price}`}
          </span>
        </div>
      </div>
      {propAlreadySelected && (
        <div className="playerPropOverlay">
          <span className="selected">Selected</span>
          <span className="details">
            {player} OU {overStats.point} {propKeyConversion[item.key]}
          </span>
        </div>
      )}
    </div>
  )
}
