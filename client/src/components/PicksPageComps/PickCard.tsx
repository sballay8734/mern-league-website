// Need locks to appear when successful database write
// Lock pick when timer is up

import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setPicksMade,
  setPickIds,
  addChallenge,
} from "../../redux/props/picksSlice";
import { PropChallenge } from "./types";
import { FaCaretDown, FaCaretUp, FaLock } from "react-icons/fa";
import CountdownTimer from "../CountDownTimer/CountDownTimer";
import ChallengeAccept from "./ChallengeAccept";
import { RootState } from "../../redux/store";
import { formatTeamName } from "./helpers";
import { PickCardProps, PropToDbInterface } from "./types";
import { IChallenge } from "../../types/challenges";
import { handleKeyConversion } from "../../utils/keyConversion";

// export at bottom
function PickCard({ item, user }: PickCardProps) {
  const dispatch = useDispatch();
  const [overOrUnder, setOverOrUnder] = useState<string | null>(null);
  const [spreadPick, setSpreadPick] = useState<string | null>(null);
  const [lockIcon, setLockIcon] = useState<boolean>(false);
  const [lockPick, setLockPick] = useState<boolean>(false);
  const [showChallenges, setShowChallenges] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);

  const [challengeSelection, setChallengeSelection] = useState<string>("");
  const [wager, setWager] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);

  const thisProp = useSelector(
    (state: RootState) => state.picksSlice.picksMade[item.uniqueId],
  );
  const thisPropChallenges = useSelector(
    (state: RootState) => state.picksSlice.challenges[item.uniqueId],
  );

  const keyConversion = handleKeyConversion(item.league);

  async function handleOUClick(item: PropToDbInterface, action: string) {
    // if over is already selected or pick is locked
    if (overOrUnder === action || lockPick) return;

    // remove lock icon in case update fails
    setLockIcon(false);

    const res = await fetch("/api/props/update-prop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prop: item, action: action }),
    });

    const data = await res.json();

    if (!data) {
      console.log("no data");
      return;
    }

    setOverOrUnder(action);
    setLockIcon(true);

    const pickMade = {
      uniqueId: item.uniqueId,
      over: action === "over" ? action : null,
      under: action === "under" ? action : null,
      awayTeam: null,
      homeTeam: null,
    };

    dispatch(setPicksMade(pickMade));
    dispatch(setPickIds(item.uniqueId));
  }

  async function handleSpreadPick(item: PropToDbInterface, action: string) {
    // if you already selected that team or the pick is locked

    if (spreadPick === action) return;
    if (lockPick) return;

    setLockIcon(false);

    const res = await fetch("/api/props/update-prop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prop: item, action: action }),
    });

    const data = await res.json();

    if (!data) {
      console.log("no data");
      return;
    }

    setSpreadPick(action);
    setLockIcon(true);

    const pickMade = {
      uniqueId: item.uniqueId,
      over: null,
      under: null,
      awayTeam:
        action === item.awayData?.awayTeam
          ? item.awayData?.awayTeam
          : null ?? null,
      homeTeam:
        action === item.homeData?.homeTeam
          ? item.homeData?.homeTeam
          : null ?? null,
    };

    dispatch(setPicksMade(pickMade));
    dispatch(setPickIds(item.uniqueId));
  }

  async function populateState() {
    const homeTeam = item.homeData?.homeTeam || null;
    const awayTeam = item.awayData?.awayTeam || null;

    // if there IS persisted state for this prop, derive UI with it
    if (thisProp) {
      if (thisProp.over === "over") setOverOrUnder("over");
      if (thisProp.under === "under") setOverOrUnder("under");
      if (thisProp.homeTeam === homeTeam) setSpreadPick(homeTeam);
      if (thisProp.awayTeam === awayTeam) setSpreadPick(awayTeam);

      dispatch(setPickIds(item.uniqueId));
      setLockIcon(true);
      populateChallenges();
      return;
    }

    setLockIcon(false);
    setOverOrUnder(null);
    setSpreadPick(null);

    // if there is NOT persisted state for this prop, use the fetched data
    if (item.type === "playerProp" || item.type === "teamTotals") {
      if (item.overSelections?.includes(user.fullName)) {
        setPicksMade({
          uniqueId: item.uniqueId,
          over: "over",
          under: null,
          awayTeam: null,
          homeTeam: null,
        });
        setOverOrUnder("over");
        dispatch(setPickIds(item.uniqueId));
        setLockIcon(true);
        populateChallenges();
        return;
      } else if (item.underSelections?.includes(user.fullName)) {
        setPicksMade({
          uniqueId: item.uniqueId,
          over: null,
          under: "under",
          awayTeam: null,
          homeTeam: null,
        });
        setOverOrUnder("under");
        dispatch(setPickIds(item.uniqueId));
        setLockIcon(true);
        populateChallenges();
        return;
      }
    } else if (item.type === "teamSpreads") {
      if (!item.homeData?.homeTeam || !item.awayData?.awayTeam) return;

      if (item.homeLineSelections?.includes(user.fullName)) {
        setPicksMade({
          uniqueId: item.uniqueId,
          over: null,
          under: null,
          awayTeam: null,
          homeTeam: item.homeData.homeTeam,
        });
        setSpreadPick(item.homeData?.homeTeam);
        dispatch(setPickIds(item.uniqueId));
        populateChallenges();
        setLockIcon(true);
        return;
      } else if (item.awayLineSelections?.includes(user.fullName)) {
        setPicksMade({
          uniqueId: item.uniqueId,
          over: null,
          under: null,
          awayTeam: item.awayData.awayTeam,
          homeTeam: null,
        });
        setSpreadPick(item.awayData?.awayTeam);
        dispatch(setPickIds(item.uniqueId));
        populateChallenges();
        setLockIcon(true);
        return;
      }
    } else {
      console.log("SOMETHING WENT WRONG");
      return;
    }
  }

  async function populateChallenges() {
    const gameId = item.gameId;
    const uniqueId = item.uniqueId;
    const res = await fetch(`/api/props/get-challenges/${gameId}/${uniqueId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const challenges = await res.json();

    if (!challenges) return;

    challenges.forEach((challenge: PropChallenge) => {
      if (challenge.acceptorName !== "") return null;

      // if challenge already exists in state return null
      // if (challenge._id) dispatch(addChallenge(challenge))
    });
  }

  function handleShowCreateChallenge() {
    if (showChallenges === true) {
      setShowChallenges(false);
    }
    setShowCreate(!showCreate);
  }

  function handleShowChallenges() {
    if (showCreate === true || showChallenges === true) {
      setShowCreate(false);
    }
    setShowChallenges(!showChallenges);
  }

  function handleChallengeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.toString().length === 5) return;

    const isValidInput = /^(?!0\d*$)\d{0,5}$/.test(e.target.value);

    if (!isValidInput) {
      // If the input does not match the pattern, ignore the change
      return;
    }

    setWager(e.target.value);

    if (
      (challengeSelection === "over" || challengeSelection === "under") &&
      e.target.value.length > 0
    ) {
      setFormValid(true);
      return;
    } else if (
      (challengeSelection === "away" || challengeSelection === "home") &&
      e.target.value.length > 0
    ) {
      setFormValid(true);
      return;
    }
    setFormValid(false);
  }

  function handleChallengeSelection(str: string) {
    setChallengeSelection(() => {
      if ((str === "over" || str === "under") && wager.toString().length > 0) {
        setFormValid(true);
      } else if (
        (str === "away" || str === "home") &&
        wager.toString().length > 0
      ) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
      return str;
    });
  }

  function handleClearChallenge() {
    setChallengeSelection("");
    setWager("");
    setFormValid(false);
    setShowCreate(false);
  }

  function createPropTitle() {
    if (item.type === "playerProp") {
      return `${item.player} ${item.subType && keyConversion[item.subType]}`;
    } else if (item.type === "teamTotals") {
      return `${item.awayTeam} & ${item.homeTeam} ${keyConversion[item.type]}`;
    } else {
      return `${item.awayTeam}(${item.awayData?.awayLine}) @ ${item.homeTeam}(${item.homeData?.homeLine})`;
    }
  }

  async function submitChallenge() {
    // ********************************************************************
    // ********************************************************************
    // ********************************************************************
    // CHALLENGE IS STILL MISSING MOST OF THE DATA NEEDED? NOT SURE WHY YET DIDN'T HAVE A CHANCE TO DEBUG
    // ********************************************************************
    // ********************************************************************
    // ********************************************************************
    let challenge = {};
    if (item.type === "playerProp" || item.type === "teamTotals") {
      challenge = {
        type: item.type,
        challengerName: user.fullName,
        challengerSelection: challengeSelection,
        acceptorName: "",
        acceptorSelection: challengeSelection === "under" ? "over" : "under",
        wagerAmount: Number(wager),
        result: "",
        line: item.line,
        propTitle: createPropTitle(),
        homeData: item.homeData,
        awayData: item.awayData,
        overData: item.overData,
        underData: item.underData,
        voided: false,
      };
    } else {
      challenge = {
        type: item.type,
        challengerName: user.fullName,
        challengerSelection: challengeSelection,
        acceptorName: "",
        acceptorSelection: challengeSelection === "away" ? "home" : "away",
        wagerAmount: Number(wager),
        result: "",
        line: item.line,
        propTitle: createPropTitle(),
        homeData: item.homeData,
        awayData: item.awayData,
        overData: item.overData,
        underData: item.underData,
        voided: false,
      };
    }

    const gameId = item.gameId;
    const uniqueId = item.uniqueId;

    const res = await fetch("/api/props/create-challenge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameId: gameId,
        uniqueId: uniqueId,
        challenge: challenge,
      }),
    });

    const data: IChallenge = await res.json();

    if (!data) {
      console.log("ERROR");
      return;
    }

    const reformattedForState: IChallenge = {
      challengerId: data.challengerId,
      acceptorId: data.acceptorId,
      challengerName: data.challengerName,
      acceptorName: data.acceptorName,
      challengerSelection: data.challengerSelection,
      acceptorSelection: data.acceptorSelection,
      wagerAmount: data.wagerAmount,
      gameId: data.gameId,
      propId: data.propId,
      dateProposed: data.dateProposed,
      dateAccepted: data.dateAccepted,
      type: data.type,
      result: "",
      line: data.line,
      propTitle: "",
      homeData: data.homeData,
      awayData: data.awayData,
      overData: data.overData,
      underData: data.underData,
      _id: data._id,

      voided: data.voided,
    };
    dispatch(addChallenge(reformattedForState));
    handleClearChallenge();
  }

  const filteredPropChallenges = thisPropChallenges
    ? thisPropChallenges.filter((challenge) => {
        return challenge.acceptorId === "";
      })
    : [];

  useEffect(() => {
    populateState();
  }, []);

  console.log(item);

  if (item.type === "playerProp") {
    console.log(item);
    return (
      <div className="pick-wrapper">
        <div className="pick-header">
          <h2 className="pick-type">
            <span
              className={`mr-2 rounded-sm border-[1px] border-gray-600 px-1 py-0.5 ${item.league === "nhl" && "bg-blue-950 text-blue-500"} ${item.league === "nfl" && "bg-green-950 text-green-500"} ${item.league === "nba" && "bg-orange-950 text-orange-500"}`}
            >
              {item.league.toLocaleUpperCase()}
            </span>
            OVER OR UNDER
          </h2>
        </div>
        <div className="pick ouPlayer">
          <button
            onClick={() => handleOUClick(item, "under")}
            className={`ouLeft ${overOrUnder === "under" ? "active" : ""}`}
          >
            Under
            <span
              className={`lock-icon ${
                lockIcon && overOrUnder === "under" ? "show" : ""
              }`}
            >
              <FaLock />
            </span>
            <span className="ou-icon down">
              <FaCaretDown />
            </span>
            <span className="payoutAndCalc">
              <span className="payout">{item.underData?.underPayout}</span>{" "}
              <span className="calcPayout">
                {item.underData?.calcUnderPayout.toFixed(2)}
              </span>
            </span>
          </button>
          <div className="ouCenter">
            <span className="player-name">{item.player}</span> over or under{" "}
            <span className="stat-and-line">
              {item.underData?.underLine}{" "}
              {keyConversion[item.subType!].toLocaleLowerCase()}
            </span>
            ?
          </div>
          <button
            onClick={() => handleOUClick(item, "over")}
            className={`ouRight ${overOrUnder === "over" ? "active" : ""}`}
          >
            <span className="ou-icon up">
              <FaCaretUp />
            </span>
            Over{" "}
            <span className="payoutAndCalc">
              <span className="payout">{item.overData?.overPayout}</span>
              <span className="calcPayout">
                {item.overData?.calcOverPayout.toFixed(2)}
              </span>
            </span>
            <span
              className={`lock-icon ${
                lockIcon && overOrUnder === "over" ? "show" : ""
              }`}
            >
              <FaLock />
            </span>
          </button>
          {lockPick ? <div className="locked-overlay">Pick is Locked</div> : ""}
        </div>
        <div className="challenges">
          <div
            className={`challenge-btn-wrapper ${showCreate === true || showChallenges === true ? "hide" : ""}`}
          >
            <button
              className={`expand-challenges-btn ${
                filteredPropChallenges.length === 0 && "disabled"
              }`}
              onClick={handleShowChallenges}
            >
              View Challenges ({filteredPropChallenges.length})
            </button>
            <button
              className={`create-challenge-btn`}
              onClick={handleShowCreateChallenge}
            >
              Create A Challenge +
            </button>
          </div>
          <div
            className={`challenges-list-and-setter ${
              (showChallenges || showCreate) && "show"
            }`}
          >
            {showCreate && (
              <div className="create-challenge-wrapper">
                <div className="challenges-setter">
                  <div className="selection">
                    <span className="your-selection">Your selection</span>
                    <div className="under-selector selector">
                      <button
                        onClick={() => handleChallengeSelection("under")}
                        className={`button ${
                          challengeSelection === "under" && "active"
                        }`}
                      >
                        Under
                      </button>
                    </div>
                    <div className="over-selector selector">
                      <button
                        onClick={() => handleChallengeSelection("over")}
                        className={`button ${
                          challengeSelection === "over" && "active"
                        }`}
                      >
                        Over
                      </button>
                    </div>
                  </div>
                  <div className="bet">
                    <label htmlFor="wager-amount">
                      Wager<span className="money-sign">$</span>
                    </label>
                    <input
                      value={wager}
                      onChange={handleChallengeChange}
                      type="number"
                      name="wager-amount"
                      id="wager-amount"
                    />
                  </div>
                </div>
                <div className="challenge-action">
                  <button
                    onClick={handleClearChallenge}
                    className="cancel-challenge"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitChallenge}
                    disabled={!formValid}
                    className="submit-challenge"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {showChallenges && (
              <div className="challenges-list">
                {filteredPropChallenges &&
                  filteredPropChallenges.map((challenge) => {
                    if (challenge.acceptorName !== "") {
                      return null;
                    }

                    return (
                      <ChallengeAccept
                        key={challenge._id}
                        challenge={challenge}
                        item={item}
                        user={user}
                        handleShowChallenges={handleShowChallenges}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        <CountdownTimer endDate={item.expiration} setLockPick={setLockPick} />
      </div>
    );
  } else if (item.type === "teamTotals") {
    return (
      <div className="pick-wrapper">
        <div className="pick-header">
          <h2 className="pick-type">
            <span
              className={`mr-2 rounded-sm border-[1px] border-gray-600 px-1 py-0.5 ${item.league === "nhl" && "bg-blue-950 text-blue-500"} ${item.league === "nfl" && "bg-green-950 text-green-500"} ${item.league === "nba" && "bg-orange-950 text-orange-500"}`}
            >
              {item.league.toLocaleUpperCase()}
            </span>
            OVER OR UNDER
          </h2>
        </div>
        <div className="pick ouTeam">
          <button
            onClick={() => handleOUClick(item, "under")}
            className={`ouLeft ${overOrUnder === "under" ? "active" : ""}`}
          >
            <span className="overText">Under</span>{" "}
            <span className="ou-icon down">
              <FaCaretDown />
            </span>
            <div className="payoutAndCalc">
              <span className="payout">{item.underData?.underPayout}</span>
              <span className="calcPayout">
                {item.underData?.calcUnderPayout.toFixed(2)}
              </span>
            </div>
            <span
              className={`lock-icon ${
                lockIcon && overOrUnder === "under" ? "show" : ""
              }`}
            >
              <FaLock />
            </span>
          </button>
          <div className="ouCenter">
            <span className="team-name">
              {item.awayTeam} <span className="vs">+</span> {item.homeTeam}
            </span>{" "}
            over or under{" "}
            <span className="stat-and-line">
              {item.overData?.overLine} total{" "}
              {item.league === "nhl" || item.league === "epl"
                ? "goals"
                : "points"}
            </span>
            ?
          </div>
          <button
            onClick={() => handleOUClick(item, "over")}
            className={`ouRight ${overOrUnder === "over" ? "active" : ""}`}
          >
            <span className="ou-icon up">
              <FaCaretUp />
            </span>
            <span className="overText">Over</span>{" "}
            <div className="payoutAndCalc">
              <span className="payout">{item.overData?.overPayout}</span>
              <span className="calcPayout">
                {item.overData?.calcOverPayout.toFixed(2)}
              </span>
            </div>
            <span
              className={`lock-icon ${
                lockIcon && overOrUnder === "over" ? "show" : ""
              }`}
            >
              <FaLock />
            </span>
          </button>
          {lockPick ? <div className="locked-overlay">Pick is Locked</div> : ""}
        </div>
        <div className="challenges">
          <div
            className={`challenge-btn-wrapper ${showCreate === true || showChallenges === true ? "hide" : ""}`}
          >
            <button
              className={`expand-challenges-btn ${
                filteredPropChallenges.length === 0 && "disabled"
              }`}
              onClick={handleShowChallenges}
            >
              View Challenges ({filteredPropChallenges.length})
            </button>
            <button
              className={`create-challenge-btn`}
              onClick={handleShowCreateChallenge}
            >
              Create A Challenge +
            </button>
          </div>
          <div
            className={`challenges-list-and-setter ${
              (showChallenges || showCreate) && "show"
            }`}
          >
            {showCreate && (
              <div className="create-challenge-wrapper">
                <div className="challenges-setter">
                  <div className="selection">
                    <span className="your-selection">Your selection</span>
                    <div className="under-selector selector">
                      <button
                        onClick={() => handleChallengeSelection("under")}
                        className={`button ${
                          challengeSelection === "under" && "active"
                        }`}
                      >
                        Under
                      </button>
                    </div>
                    <div className="over-selector selector">
                      <button
                        onClick={() => handleChallengeSelection("over")}
                        className={`button ${
                          challengeSelection === "over" && "active"
                        }`}
                      >
                        Over
                      </button>
                    </div>
                  </div>
                  <div className="bet">
                    <label htmlFor="wager-amount">
                      Wager<span className="money-sign">$</span>
                    </label>
                    <input
                      value={wager}
                      onChange={handleChallengeChange}
                      type="number"
                      name="wager-amount"
                      id="wager-amount"
                    />
                  </div>
                </div>
                <div className="challenge-action">
                  <button
                    onClick={handleClearChallenge}
                    className="cancel-challenge"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitChallenge}
                    disabled={!formValid}
                    className="submit-challenge"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {showChallenges && (
              <div className="challenges-list">
                {filteredPropChallenges &&
                  filteredPropChallenges.map((challenge) => {
                    if (challenge.acceptorName !== "") {
                      return null;
                    }

                    return (
                      <ChallengeAccept
                        key={challenge._id}
                        challenge={challenge}
                        item={item}
                        user={user}
                        handleShowChallenges={handleShowChallenges}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        <CountdownTimer endDate={item.expiration} setLockPick={setLockPick} />
      </div>
    );
  } else if (item.type === "teamSpreads") {
    const awayTeam = item.awayData?.awayTeam;
    const homeTeam = item.homeData?.homeTeam;
    return (
      <>
        {awayTeam && homeTeam && (
          <div className="pick-wrapper">
            <div className="pick-header spread">
              <h2 className="pick-type">
                <span
                  className={`mr-2 rounded-sm border-[1px] border-gray-600 px-1 py-0.5 ${item.league === "nhl" && "bg-blue-950 text-blue-500"} ${item.league === "nfl" && "bg-green-950 text-green-500"} ${item.league === "nba" && "bg-orange-950 text-orange-500"}`}
                >
                  {item.league.toLocaleUpperCase()}
                </span>
                SPREAD
              </h2>
            </div>
            <div className="pick spread">
              <button
                onClick={() => handleSpreadPick(item, awayTeam)}
                className={`ouLeft ${
                  spreadPick === `${awayTeam}` ? "active" : ""
                }`}
              >
                <span className="teamName">{formatTeamName(awayTeam)}</span>
                <span
                  className={`lock-icon ${
                    lockIcon && spreadPick === awayTeam ? "show" : ""
                  }`}
                >
                  <FaLock />
                </span>
                <span className="spread-line minus">
                  <span className="payout">{item.awayData?.awayPayout}</span>
                  <span className="spread">
                    {item.awayData?.awayLine && item.awayData.awayLine > 0
                      ? `+${item.awayData?.awayLine}`
                      : item.awayData?.awayLine}
                  </span>
                  <span className="calcPayout">
                    {item.awayData?.calcAwayPayout}
                  </span>
                </span>
              </button>
              <div className="ouCenter">
                <span className="team-name">
                  {awayTeam} <span className="vs">@</span> {homeTeam}
                </span>
              </div>
              <button
                onClick={() => handleSpreadPick(item, homeTeam)}
                className={`ouRight ${
                  spreadPick === `${homeTeam}` ? "active" : ""
                }`}
              >
                {formatTeamName(homeTeam)}
                <span
                  className={`lock-icon ${
                    lockIcon && spreadPick === homeTeam ? "show" : ""
                  }`}
                >
                  <FaLock />
                </span>
                <span className="spread-line plus">
                  <span className="payout">{item.homeData?.homePayout}</span>
                  <span className="spread">
                    {item.homeData?.homeLine && item.homeData.homeLine > 0
                      ? `+${item.homeData?.homeLine}`
                      : item.homeData?.homeLine}
                  </span>
                  <span className="calcPayout">
                    {item.homeData?.calcHomePayout}
                  </span>
                </span>
              </button>
              {lockPick ? (
                <div className="locked-overlay">Pick is Locked</div>
              ) : (
                ""
              )}
            </div>
            <div className="challenges">
              <div
                className={`challenge-btn-wrapper ${showCreate === true || showChallenges === true ? "hide" : ""}`}
              >
                <button
                  className={`expand-challenges-btn ${
                    filteredPropChallenges.length === 0 && "disabled"
                  }`}
                  onClick={handleShowChallenges}
                >
                  View Challenges ({filteredPropChallenges.length})
                </button>
                <button
                  className={`create-challenge-btn`}
                  onClick={handleShowCreateChallenge}
                >
                  Create A Challenge +
                </button>
              </div>
              <div
                className={`challenges-list-and-setter ${
                  (showChallenges || showCreate) && "show"
                }`}
              >
                {showCreate && (
                  <div className="create-challenge-wrapper">
                    <div className="challenges-setter">
                      {/* HOME TEAM SELECTION */}
                      <div className="selection">
                        <span className="your-selection">Your selection</span>
                        <div className="under-selector selector">
                          <button
                            onClick={() => handleChallengeSelection("away")}
                            className={`button ${
                              challengeSelection === "away" && "active"
                            }`}
                          >
                            {formatTeamName(awayTeam)}
                          </button>
                        </div>
                        <div className="over-selector selector">
                          <button
                            onClick={() => handleChallengeSelection("home")}
                            className={`button ${
                              challengeSelection === "home" && "active"
                            }`}
                          >
                            {formatTeamName(homeTeam)}
                          </button>
                        </div>
                      </div>
                      <div className="bet">
                        <label htmlFor="wager-amount">
                          Wager<span className="money-sign">$</span>
                        </label>
                        <input
                          value={wager}
                          onChange={handleChallengeChange}
                          type="number"
                          name="wager-amount"
                          id="wager-amount"
                        />
                      </div>
                    </div>
                    <div className="challenge-action">
                      <button
                        onClick={handleClearChallenge}
                        className="cancel-challenge"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={submitChallenge}
                        disabled={!formValid}
                        className="submit-challenge"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}

                {showChallenges && (
                  <div className="challenges-list">
                    {filteredPropChallenges &&
                      filteredPropChallenges.map((challenge) => {
                        if (challenge.acceptorName !== "") {
                          return null;
                        }

                        return (
                          <ChallengeAccept
                            key={challenge._id}
                            challenge={challenge}
                            item={item}
                            user={user}
                            handleShowChallenges={handleShowChallenges}
                          />
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
            <CountdownTimer
              endDate={item.expiration}
              setLockPick={setLockPick}
            />
          </div>
        )}
      </>
    );
  } else {
    return <div className="pick wrong">Incorrect Format</div>;
  }
}

export default memo(PickCard);
