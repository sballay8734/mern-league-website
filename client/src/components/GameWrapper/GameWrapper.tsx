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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function GameWrapper({
  handlePropCounter,
  prop,
  time,
  gameIdsFetched,
  setGameIdsFetched,
  propsSelected,
  setPropsSelected,
  currentWeek,
  currentYear,
}: {
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
  const activeLeague = useSelector(
    (state: RootState) => state.picksSlice.activeLeague,
  );
  const [showPlayerProps, setShowPlayerProps] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [gamePropsToRender, setGamePropsToRender] = useState<FullMatchupProps>(
    {},
  );

  async function handleFetchPlayerProps(gameId: string, activeLeague: string) {
    setShowPlayerProps(true);
    setLoading(true);
    // setActiveFilter("");
    if (gamePropsToRender[gameId]) {
      console.log("Data exists");
      setShowPlayerProps(!showPlayerProps);
      setLoading(false);
      return;
    }

    let finalPlayerProps: PlayerPropInterface[] = [];
    let playerProps = [];

    const URL = generatePlayerPropURL(gameId, activeLeague);

    const res = await fetch(URL);
    const data = await res.json();
    if (!data) {
      console.log("ERROR");
      setLoading(false);
      return;
    }
    setLoading(false);

    // Prevents errors if bookmaker doesn't have player props for this matchup
    if (data.bookmakers.length === 0) {
      console.log("Draftkings does not have player props for this matchup");
      return;
    }

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
      setGamePropsToRender({ [gameId]: finalPlayerProps });
      console.log(gamePropsToRender);
    }

    setLoading(false);
  }

  function handleFilterBtns(filter: string) {
    setActiveFilter(filter);
  }

  // THIS LOGIC NEEDS TO BE MOVED (BUTTON KEYS CAN BE DETERMINED WHEN PROPS ARE FETCHED)
  function renderButtons() {
    const buttonKeys = [];
    const keyMap = handleKeyConversion(activeLeague);
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

  const filteredPlayerProps = !gamePropsToRender[prop.id]
    ? []
    : activeFilter === ""
      ? gamePropsToRender[prop.id]
      : gamePropsToRender[prop.id].filter((prop) => {
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
                propsSelected={propsSelected}
                setPropsSelected={setPropsSelected}
                currentWeek={currentWeek}
                currentYear={currentYear}
              />
            );
          }
        })}
        <button
          onClick={() => handleFetchPlayerProps(prop.id, activeLeague)}
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
            filteredPlayerProps.length > 0 &&
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
        {!loading && showPlayerProps && filteredPlayerProps.length < 1 && (
          <div className="flex w-full items-center justify-center bg-red-950 py-2 text-center text-red-500">
            Draftkings has no props for this matchup
          </div>
        )}
      </>
    </div>
  );
}
