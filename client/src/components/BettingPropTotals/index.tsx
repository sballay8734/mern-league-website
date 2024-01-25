import { useState } from "react";

import TestCountdownTimer from "../TestCountDown/TestCountDown"
import { BettingProp, Markets, Outcomes } from "../../pages/AdminPage";
import { MdCompareArrows } from "react-icons/md";


export default function BettingPropTotals({ outcomes, type, time, homeTeam, awayTeam, handlePropCounter, prop }: {outcomes: Outcomes[]; type: Markets, time: string, homeTeam: string, awayTeam: string, handlePropCounter: (propId: string) => void, prop: BettingProp }) {
  const [selected, setSelected] = useState<boolean>(false)

  const gameLine = outcomes[0].point
  const overPayout = outcomes.find((item) => item.name === "Over")?.price
  const underPayout = outcomes.find((item) => item.name === "Under")?.price

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
  
  return (
        <div onClick={() => handleSelectedProp(prop.id + type.key)}  className="prop">
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
  )
}