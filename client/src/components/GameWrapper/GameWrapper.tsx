import { useState } from "react";

import BettingPropSpreads from "../BettingPropSpreads";
import BettingPropTotals from "../BettingPropTotals";
import { BettingProp, FullMatchupProps } from "../utils";
import { PropToDbInterface } from "../BettingPropSpreads";
import { PlayerPropInterface } from "../utils";
import PlayerProp from "../PlayerProp";
import { Markets, CombinedProp } from "../utils";
import TestCountdownTimer from "../TestCountDown/TestCountDown";
import PlayerPropFilterBtn from "../PlayerPropFilterBtn";
import { ImSpinner10 } from "react-icons/im";
import { generatePlayerPropURL } from "../../utils/LeagueInitializations";
import { handleKeyConversion } from "../../utils/keyConversion";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export default function GameWrapper({
  handlePropCounter,
  prop,
  time,
  gameIdsFetched,
  setGameIdsFetched,
  globalPropsToRender,
  setGlobalPropsToRender,
  propsSelected,
  setPropsSelected,
  currentWeek,
  currentYear,
  sport,
}: {
  time: string;
  homeTeam: string;
  awayTeam: string;
  handlePropCounter: (propId: string) => void;
  prop: BettingProp;
  gameIdsFetched: string[];
  setGameIdsFetched: (str: string[]) => void;
  globalPropsToRender: FullMatchupProps;
  setGlobalPropsToRender: (obj: FullMatchupProps) => void;
  propsSelected: PropToDbInterface[];
  setPropsSelected: (obj: PropToDbInterface[]) => void;
  currentWeek: string;
  currentYear: number;
  sport: string;
}) {
  const [showPlayerProps, setShowPlayerProps] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [gamePropsToRender, setGamePropsToRender] = useState<FullMatchupProps>(
    {},
  );

  // ********************************************************************
  // ********************************************************************
  // ********************************************************************
  // IF YOU TRY TO EXPAND TWO AT A TIME and filter things RIGHT NOW YOU GET AN ERROR BECAUSE YOU HAVE CONFLICT and each card doesn't have its own state!!!

  // ISSUE: Fetch props for one game & setFilter -> Then, trying to open another games player props will throw an error

  // Cannot read properties of undefined (reading 'filter') LINE 182
  // ********************************************************************
  // ********************************************************************
  // ********************************************************************

  async function handleFetchPlayerProps(gameId: string, sport: string) {
    setShowPlayerProps(true);
    setLoading(true);
    setActiveFilter("");
    if (globalPropsToRender[gameId]) {
      console.log("Data exists");
      setShowPlayerProps(!showPlayerProps);
      setLoading(false);
      return;
    }

    let finalPlayerProps: PlayerPropInterface[] = [];
    let playerProps = [];

    const URL = generatePlayerPropURL(gameId, sport);

    const res = await fetch(URL);
    const data = await res.json();
    if (!data) {
      console.log("ERROR");
      setLoading(false);
      return;
    }
    setLoading(false);

    playerProps.push(data);
    setGameIdsFetched([...gameIdsFetched, gameId]);

    if (playerProps.length === 1) {
      const markets = playerProps[0].bookmakers[0].markets;

      markets.map((item: Markets) => {
        if (item.key === "player_anytime_td") {
          return null;
        } else {
          let combinedOutcomes: CombinedProp = {};

          for (let i = 0; i < item.outcomes.length; i++) {
            const current = item.outcomes[i];
            const player = current.description;
            const combinedKey = player?.split(" ").join("") + item.key;
            const statTemplate = {
              name: current.name,
              description: current.description,
              price: current.price,
              point: current.point,
            };

            if (!combinedOutcomes[combinedKey]) {
              combinedOutcomes[combinedKey] = {
                overStats: { name: "", description: "", price: 0, point: 0 },
                underStats: { name: "", description: "", price: 0, point: 0 },
              };

              if (current.name === "Over") {
                combinedOutcomes[combinedKey].overStats = statTemplate;
              }
              if (current.name === "Under") {
                combinedOutcomes[combinedKey].underStats = statTemplate;
              }
            } else {
              if (current.name === "Over") {
                combinedOutcomes[combinedKey].overStats = statTemplate;
              }
              if (current.name === "Under") {
                combinedOutcomes[combinedKey].underStats = statTemplate;
              }
            }
          }

          for (const uniqueKey in combinedOutcomes) {
            const player = combinedOutcomes[uniqueKey].overStats.description
              ?.split(" ")
              .slice(0, 2)
              .join(" ")!;
            const overStats = combinedOutcomes[uniqueKey].overStats;
            const underStats = combinedOutcomes[uniqueKey].underStats;

            // removed item
            finalPlayerProps.push({
              uniquePropKey: uniqueKey,
              gameId: gameId,
              item,
              player,
              overStats,
              underStats,
            });
          }
        }
      });
      setGlobalPropsToRender({ [gameId]: finalPlayerProps });
      console.log(globalPropsToRender);
    }

    setLoading(false);
  }

  function handleFilterBtns(filter: string) {
    setActiveFilter(filter);
  }

  // THIS LOGIC NEEDS TO BE MOVED (BUTTON KEYS CAN BE DETERMINED WHEN PROPS ARE FETCHED)
  function renderButtons() {
    const buttonKeys = [];
    const keyMap = handleKeyConversion(sport);
    for (const key in keyMap) {
      buttonKeys.push(
        <PlayerPropFilterBtn
          key={key}
          handleFilterBtns={handleFilterBtns}
          type={keyMap[key]}
          filterKey={key}
          activeFilter={activeFilter}
        />,
      );
    }

    return buttonKeys;
  }

  const markets = prop.bookmakers[0].markets;

  const filteredPlayerProps =
    activeFilter === ""
      ? globalPropsToRender[prop.id]
      : globalPropsToRender[prop.id].filter((prop) => {
          return activeFilter === prop.item.key;
        });

  return (
    <div key={prop.id} className="gameWrapper">
      <div className="propHeader">
        <span className="propType totals">
          {prop.away_team} <span className="atWord">@</span> {prop.home_team}
        </span>
        <span className="countdownTimer">
          <TestCountdownTimer endDate={time} />
        </span>
      </div>
      <>
        {markets.map((type, index) => {
          if (type.key === "spreads") {
            return (
              <BettingPropSpreads
                key={index}
                outcomes={type.outcomes}
                type={type}
                time={prop.commence_time}
                homeTeam={prop.home_team}
                awayTeam={prop.away_team}
                handlePropCounter={handlePropCounter}
                prop={prop}
                gameIdsFetched={gameIdsFetched}
                setGameIdsFetched={setGameIdsFetched}
                globalPropsToRender={globalPropsToRender}
                setGlobalPropsToRender={setGlobalPropsToRender}
                propsSelected={propsSelected}
                setPropsSelected={setPropsSelected}
                currentWeek={currentWeek}
                currentYear={currentYear}
              />
            );
          } else if (type.key === "totals") {
            return (
              <BettingPropTotals
                key={index}
                outcomes={type.outcomes}
                type={type}
                time={prop.commence_time}
                homeTeam={prop.home_team}
                awayTeam={prop.away_team}
                handlePropCounter={handlePropCounter}
                prop={prop}
                gameIdsFetched={gameIdsFetched}
                setGameIdsFetched={setGameIdsFetched}
                globalPropsToRender={globalPropsToRender}
                setGlobalPropsToRender={setGlobalPropsToRender}
                propsSelected={propsSelected}
                setPropsSelected={setPropsSelected}
                currentWeek={currentWeek}
                currentYear={currentYear}
              />
            );
          }
        })}
        <button
          onClick={() => handleFetchPlayerProps(prop.id, sport)}
          className="loadPlayerProps"
        >
          Load Player Props For This Matchup{" "}
          <span>{showPlayerProps ? <FaCaretUp /> : <FaCaretDown />}</span>
        </button>
        <div
          className={`playerPropFilterBtnsWrapper ${
            showPlayerProps === true ? "" : "hide"
          }`}
        >
          {renderButtons()}
        </div>
        {loading && (
          <div className="spinnerWrapper">
            <span className="spinner">
              <ImSpinner10 />
            </span>
          </div>
        )}
        <div
          className={`playerPropsWrapper ${
            showPlayerProps === true ? "" : "hide"
          }`}
        >
          {!loading &&
            filteredPlayerProps &&
            filteredPlayerProps.map((item: PlayerPropInterface) => {
              if (item.gameId === prop.id) {
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
                    currentWeek={currentWeek}
                    currentYear={currentYear}
                  />
                );
              }
            })}
        </div>
      </>
    </div>
  );
}
