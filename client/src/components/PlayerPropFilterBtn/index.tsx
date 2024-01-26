import { useState } from "react"

interface PlayerPropFilterBtnInterface {
  handleFilterBtns: (str: string) => void
  type: string
}

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

export default function PlayerPropFilterBtn({handleFilterBtns, type}: PlayerPropFilterBtnInterface) {
  const [active, setActive] = useState<boolean>(false)

  function handleClick(type: string) {
    setActive(!active)

    handleFilterBtns(type)
  }

  return <button className={`${active && "active"}`} key={type} onClick={() => handleClick(type)}>{propKeyConversion[type]}</button>
}