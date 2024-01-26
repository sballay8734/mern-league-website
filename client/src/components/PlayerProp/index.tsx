import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { Markets } from "../../pages/AdminPage";
import { useState } from "react";

interface KeyConversion {
  [key: string]: string
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
  player_reception_yds: "Receiving Yds", 
  player_anytime_td: "TESTING"
}

interface PlayerPropInterface {
  item: Markets
  player: string
  uniqueKeyProp: string
  overStats: {name: string, description?: string, price: number, point: number}
  underStats: {name: string, description?: string, price: number, point: number}
  handlePropCounter: (propId: string) => void
}

function calculatePayout(odds: number) {
    if (odds > 0) {
      return 1 + (odds / 100)
    } else {
      return Number(((1 + (100 / Math.abs(odds))).toFixed(2)))
    }
}

export default function PlayerProp({item, player, overStats, underStats, uniqueKeyProp, handlePropCounter}: PlayerPropInterface) {
  const [selected, setSelected] = useState<boolean>(false)

  function handlePropSelection(key: string) {
    setSelected(!selected)
    handlePropCounter(key)
    console.log(key)
  }

  return (
    <div onClick={() => handlePropSelection(uniqueKeyProp)} className="playerProp">
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
          <span className="price">{overStats.price < 0 ? overStats.price : `+${overStats.price}`}</span>
        </div>
      </div>
      {selected && <div className="overlay">Selected</div>}
    </div>
  )
}