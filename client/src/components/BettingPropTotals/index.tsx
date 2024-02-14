import { useState } from "react";

import { MdCompareArrows } from "react-icons/md";
import { PropToDbInterface } from "../BettingPropSpreads";
import { weekToNumConversion } from "../utils";

import {
  Outcomes,
  Markets,
  BettingProp,
  FullMatchupProps,
  calculatePayout,
} from "../utils";

export default function BettingPropTotals({
  outcomes,
  type,
  homeTeam,
  awayTeam,
  handlePropCounter,
  prop,
  propsSelected,
  setPropsSelected,
  currentWeek,
  currentYear,
}: {
  outcomes: Outcomes[];
  type: Markets;
  time: string;
  homeTeam: string;
  awayTeam: string;
  handlePropCounter: (propId: string) => void;
  prop: BettingProp;
  gameIdsFetched: string[];
  setGameIdsFetched: (str: string[]) => void;
  propsSelected: PropToDbInterface[];
  setPropsSelected: (obj: PropToDbInterface[]) => void;
  currentWeek: string;
  currentYear: number;
}) {
  const [selected, setSelected] = useState<boolean>(false);

  const gameLine = outcomes[0].point;
  const overData = outcomes.find((item) => item.name === "Over");
  const underData = outcomes.find((item) => item.name === "Under");

  function handleSelectedProp(propId: string) {
    const uniqueId = propId;

    setSelected(!selected);
    handlePropCounter(propId);

    const propExists = propsSelected.find((item) => item.uniqueId === uniqueId);

    if (propExists) {
      // remove prop
      const updatedProps = propsSelected.filter(
        (item) => item.uniqueId !== uniqueId,
      );
      setPropsSelected(updatedProps);
      return;
    }

    const propToSend = formatTeamProp(propId);
    setPropsSelected([...propsSelected, propToSend] as PropToDbInterface[]);
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
        week: weekToNumConversion[currentWeek],
        nflYear: currentYear,

        // updated here
        homeTeam: prop.home_team,
        awayTeam: prop.away_team,

        underData: {
          underLine: underData?.point,
          underPayout: underData?.price,
          calcUnderPayout: calculatePayout(underData?.price),
        },
        overData: {
          overLine: overData?.point,
          overPayout: overData?.price,
          calcOverPayout: calculatePayout(overData?.price),
        },

        // these are updated as users make selections
        underSelections: [],
        overSelections: [],

        // update these after game to calc results
        result: 0,

        // if voided, don't count prop
        void: false,

        challenges: [],

        weekYear: `${currentWeek}${currentYear.toString()}`,
      };
    }
  }

  return (
    <div key={prop.id + type.key} className="prop total">
      <div
        onClick={() => handleSelectedProp(prop.id + type.key)}
        className="propWrapper"
      >
        <div className="propBody">
          <div className="teamLineWrapper">
            <div className="teams">
              <div className="away team">
                <div className="teamAndLine">
                  <span className={`line awayLine red`}>
                    Under {underData?.price}
                  </span>
                </div>
                <div className="payoutWrapper">
                  <span className="payoutText">Payout</span>
                  <span className="payoutValue">
                    {underData && calculatePayout(underData?.price).toFixed(2)}
                  </span>
                </div>
              </div>
              <span className="atSign points">OU {underData?.point}</span>
              <div className="home team">
                <div className="teamAndLine">
                  <span className={`line homeLine green`}>
                    Over {overData?.price}
                  </span>
                </div>
                <div className="payoutWrapper">
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
    </div>
  );
}
