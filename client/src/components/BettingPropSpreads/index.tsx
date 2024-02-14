import { useState } from "react";

import { weekToNumConversion } from "../utils";
import { Outcomes, Markets, BettingProp, calculatePayout } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export interface PropToDbInterface {
  type: string;
  subType?: string;
  player?: string;
  gameId: string;
  expiration: string;
  uniqueId: string;
  week: number;
  year: number;
  line: number;
  _id: string;

  overData?: { overLine: number; overPayout: number; calcOverPayout: number };
  underData?: {
    underLine: number;
    underPayout: number;
    calcUnderPayout: number;
  };
  overSelections?: string[];
  underSelections?: string[];

  homeTeam?: string;
  awayTeam?: string;

  homeData?: {
    homeTeam: string;
    homeLine: number;
    homePayout: number;
    calcHomePayout: number;
  };
  awayData?: {
    awayTeam: string;
    awayLine: number;
    awayPayout: number;
    calcAwayPayout: number;
  };
  homeLineSelections?: string[];
  awayLineSelections?: string[];

  awayScoreResult?: number;
  homeScoreResult?: number;

  result?: number;

  voided: boolean;
}

export default function BettingPropSpreads({
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
  const activeLeague = useSelector(
    (state: RootState) => state.picksSlice.activeLeague,
  );

  const homeLine = outcomes.find((item) => item.name === homeTeam);
  const awayLine = outcomes.find((item) => item.name === awayTeam);

  function handleSelectedProp(propId: string, type: string) {
    const uniqueId = prop.id + type;

    setSelected(!selected);
    handlePropCounter(propId + type);

    const propExists = propsSelected.find((item) => item.uniqueId === uniqueId);

    if (propExists) {
      // remove prop
      const updatedProps = propsSelected.filter(
        (item) => item.uniqueId !== uniqueId,
      );
      setPropsSelected(updatedProps);
      return;
    }

    const propToSend = formatTeamProp(type);
    setPropsSelected([...propsSelected, propToSend] as PropToDbInterface[]);
  }

  function formatTeamProp(type: string) {
    if (homeLine && awayLine) {
      console.log(prop.id, type);
      return {
        type: `team${type.charAt(0).toLocaleUpperCase() + type.slice(1)}`,
        league: activeLeague,
        gameId: prop.id,
        expiration: prop.commence_time,
        uniqueId: `${prop.id + type}`,

        // update these right before sending to DB
        week: weekToNumConversion[currentWeek],
        line: homeLine.point,
        year: currentYear,

        // updated here
        homeData: {
          homeTeam: homeLine.name,
          homeLine: homeLine.point,
          homePayout: homeLine.price,
          calcHomePayout: calculatePayout(homeLine.price),
        },

        awayData: {
          awayTeam: awayLine.name,
          awayLine: awayLine.point,
          awayPayout: awayLine.price,
          calcAwayPayout: calculatePayout(awayLine.price),
        },

        // these are updated as users make selections
        homeLineSelections: [],
        awayLineSelections: [],

        // update these after game to calc results
        awayScoreResult: 0,
        homeScoreResult: 0,

        // if voided, don't count prop
        voided: false,

        // NEED TO GENERATE THIS
        weekYear: `${currentWeek}${currentYear.toString()}`,
      };
    }
  }

  return (
    <div key={prop.id + type.key} className="prop spread">
      <div
        onClick={() => handleSelectedProp(prop.id, type.key)}
        className="propWrapper"
      >
        <div className="propBody">
          <div className="teamLineWrapper">
            <div className="teams">
              <div className="away team">
                <div className="teamAndLine">
                  <span
                    className={`line awayLine ${
                      awayLine && awayLine.point > 0 && "green"
                    } ${awayLine && awayLine.point < 0 && "red"}`}
                  >
                    {awayLine && awayLine.point > 0
                      ? `+${awayLine.point}`
                      : awayLine?.point}
                  </span>
                  <span className="teamName">
                    {awayTeam.split(" ").slice(-1)[0]}
                  </span>
                </div>
                <div className="payout">
                  <span className="payoutText">Payout</span>
                  <span className="payoutValue">
                    {awayLine && calculatePayout(awayLine.price).toFixed(2)}
                  </span>
                </div>
              </div>
              <span className="atSign">spread</span>
              <div className="home team">
                <div className="teamAndLine">
                  <span className="teamName">
                    {homeTeam.split(" ").slice(-1)[0]}
                  </span>
                  <span
                    className={`line homeLine ${
                      homeLine && homeLine.point > 0 && "green"
                    } ${homeLine && homeLine.point < 0 && "red"}`}
                  >
                    {homeLine && homeLine.point > 0
                      ? `+${homeLine.point}`
                      : homeLine?.point}
                  </span>
                </div>
                <div className="payout">
                  <span className="payoutText">Payout</span>
                  <span className="payoutValue">
                    {homeLine && calculatePayout(homeLine.price).toFixed(2)}
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
              <span
                className={`selected-away line ${
                  awayLine && awayLine.point > 0 && "green"
                } ${awayLine && awayLine.point < 0 && "red"}`}
              >
                <span className="team">
                  {awayTeam.split(" ").slice(-1)[0]}{" "}
                </span>
                (
                {awayLine && awayLine.point > 0
                  ? `+${awayLine.point}`
                  : awayLine?.point}
                )
              </span>
              <span className="selected-at">at</span>
              <span
                className={`selected-home line ${
                  homeLine && homeLine.point > 0 && "green"
                } ${homeLine && homeLine.point < 0 && "red"}`}
              >
                <span className="team">
                  {homeTeam.split(" ").slice(-1)[0]}{" "}
                </span>
                (
                {homeLine && homeLine.point > 0
                  ? `+${homeLine.point}`
                  : homeLine?.point}
                )
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
