import { useState } from "react"

interface PlayerPropFilterBtnInterface {
  handleFilterBtns: (str: string) => void
  type: string
}

export default function PlayerPropFilterBtn({handleFilterBtns, type}: PlayerPropFilterBtnInterface) {
  const [active, setActive] = useState<boolean>(false)

  function handleClick(type: string) {
    setActive(!active)

    handleFilterBtns(type)
  }

  return <button className={`${active && "active"}`} key={type} onClick={() => handleClick(type)}>{type}</button>
}