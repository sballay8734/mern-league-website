import { useState } from "react";

import TestCountdownTimer from "../TestCountDown/TestCountDown"
import { BettingProp, Markets, Outcomes } from "../../pages/AdminPage";

export default function BettingPropSpreads({ outcomes, type, time, homeTeam, awayTeam, handlePropCounter, prop }: {outcomes: Outcomes[]; type: Markets, time: string, homeTeam: string, awayTeam: string, handlePropCounter: (propId: string) => void, prop: BettingProp }) {
  const [selected, setSelected] = useState<boolean>(false)

  const homeLine = outcomes.find((item) => item.name === homeTeam)
  const awayLine = outcomes.find((item) => item.name === awayTeam)

  function capitalizeAndRemoveLast(string: string): string {
    if (string.length <= 1) return ""

    return (string.charAt(0).toUpperCase() + string.slice(1, -1)).toLocaleUpperCase()
  }

  function handleSelectedProp(propId: string) {
    setSelected(!selected)
    handlePropCounter(propId)
  }
  
  
  return (
        <div onClick={() => handleSelectedProp(prop.id + type.key)} className="prop">
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
                  <span className={`line awayLine ${awayLine && awayLine.point > 0 && "green"} ${awayLine && awayLine.point < 0 && "red"}`}>
                                        {awayLine && awayLine.point > 0 ? `+${awayLine.point}` : awayLine?.point}
                  </span>
                  <span className="teamName">
                    {awayTeam.split(" ").slice(-1)[0]}
                  </span>
                </div>
                <span className="atSign">at</span>
                <div className="home team">
                  <span className="teamName">
                    {homeTeam.split(" ").slice(-1)[0]}
                  </span>
                  <span className={`line homeLine ${homeLine && homeLine.point > 0 && "green"} ${homeLine && homeLine.point < 0 && "red"}`}>
                                        {homeLine && homeLine.point > 0 ? `+${homeLine.point}` : homeLine?.point}
                  </span>
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
  )
}