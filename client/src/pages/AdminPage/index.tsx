import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { MdAdminPanelSettings } from "react-icons/md";
import { RootState } from "../../redux/store";
import { useFetchOwnersQuery } from "../../redux/owners/ownersApi";
import { staticDataInit } from "./utils/staticDataFunction";
import { recordsDataInit } from "./utils/recordFunctions";
import { KOTHInit } from "./utils/kothFunctions";
import { PropToDbInterface } from "../../components/BettingPropSpreads";
import { handleFetchParams } from "../../utils/LeagueInitializations";
import { setActiveLeague } from "../../redux/props/picksSlice";
import { ImSpinner2 } from "react-icons/im";

import {
  WeekRanges,
  BettingProp,
  handleShowRequestModal,
} from "../../components/utils";
import GameWrapper from "../../components/GameWrapper/GameWrapper";
import "./AdminPage.scss";

const picksToMake = 12;

const nfl2024WeekRanges: WeekRanges = {
  // Tuesday Morning (12:00am) ---> Monday Night (11:59pm)
  weekOne: {
    key: "weekOne",
    start: "2024-09-03T05:00:00Z",
    end: "2024-09-09T04:59:59Z",
  },
  weekTwo: { key: "weekTwo", start: "", end: "" },
  weekThree: { key: "weekThree", start: "", end: "" },
  weekFour: { key: "weekFour", start: "", end: "" },
  weekFive: { key: "weekFive", start: "", end: "" },
  weekSix: { key: "weekSix", start: "", end: "" },
  weekSeven: { key: "weekSeven", start: "", end: "" },
  weekEight: { key: "weekEight", start: "", end: "" },
  weekNine: { key: "weekNine", start: "", end: "" },
  weekTen: { key: "weekTen", start: "", end: "" },
  weekEleven: { key: "weekEleven", start: "", end: "" },
  weekTwelve: { key: "weekTwelve", start: "", end: "" },
  weekThirteen: { key: "weekThirteen", start: "", end: "" },
  weekFourteen: { key: "weekFourteen", start: "", end: "" },
  weekFifteen: { key: "weekFifteen", start: "", end: "" },
  weekSixteen: { key: "weekSixteen", start: "", end: "" },
  weekSeventeen: { key: "weekSeventeen", start: "", end: "" },
  weekEighteen: {
    key: "weekEighteen",
    start: "2024-01-02T06:00:00Z",
    end: "2024-01-09T06:00:00Z",
  },
  testWeek2: {
    key: "testWeek2",
    start: "2024-02-12T06:00:00Z",
    end: "2024-02-29T18:30:00Z",
  },
};

export default function AdminPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const activeLeague = useSelector(
    (state: RootState) => state.picksSlice.activeLeague,
  );
  const { data } = useFetchOwnersQuery();
  const [activeButton, setActiveButton] = useState<string>("tempAdmins");
  const [updateInProgress, setUpdateInProgress] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [bettingData, setBettingData] = useState<BettingProp[] | null>(null);
  const [numPropsSelected, setNumPropsSelected] = useState<string[]>([]);
  const [gameIdsFetched, setGameIdsFetched] = useState<string[]>([]);
  const [propsSelected, setPropsSelected] = useState<PropToDbInterface[]>([]);
  const [currentWeek, setCurrentWeek] = useState<string>("");
  const [currentYear, setCurrentYear] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);

  async function runStaticDataUpdate() {
    if (user && user.isAdmin === false) return;

    setUpdateInProgress(true);

    if (!data) return;

    try {
      // run all update functions
      const successData = await staticDataInit(data);
      console.log(successData);
    } catch (error) {
      console.log(error);
    }

    setUpdateInProgress(false);
  }

  async function runRecordsDataUpdate() {
    if (user && user.isAdmin === false) return;
    setUpdateInProgress(true);

    if (!data) return;

    try {
      // run all update functions
      const successData = await recordsDataInit(data);
      console.log(successData);
    } catch (error) {
      console.log(error);
    }

    setUpdateInProgress(false);
  }

  async function runKOTHDataUpdate() {
    if (user && user.isAdmin === false) return;
    setUpdateInProgress(true);
    if (!data) return;

    try {
      // run all update functions
      const successData = await KOTHInit(data);
      console.log(successData);
    } catch (error) {
      console.log(error);
    }

    setUpdateInProgress(false);
  }

  async function fetchProps(league: string) {
    if (user && user.isAdmin === false) return;
    if (user && user.requestsRemaining === 0) {
      handleShowRequestModal(dispatch, {
        result: "fail",
        message: "You have no requests remaining",
      });

      return;
    }

    // EACH FETCH TAKES 2 CREDITS (spreads & totals)
    const fetchURL = handleFetchParams(league);

    if (!fetchURL || fetchURL === null) return;

    setLoading(true);

    const res = await fetch(fetchURL);

    const data = await res.json();
    if (!data) {
      console.log("ERROR");
      setLoading(false);
      return;
    }

    if (data.length < 1) {
      handleShowRequestModal(dispatch, {
        result: "fail",
        message: "No props found",
      });
      setLoading(false);
      return;
    }

    if (data.length > 0) {
      const res = await fetch("/api/auth/reduce", {
        method: "POST",
      });

      const data = await res.json();

      if (!data) {
        console.log("ERROR");
        return;
      }

      console.log(data);
    }

    setBettingData(data);
    setLoading(false);
  }

  function handlePropCounter(propId: string) {
    if (numPropsSelected.includes(propId)) {
      const filteredProps = numPropsSelected.filter((item) => item !== propId);

      setNumPropsSelected(filteredProps);
    } else {
      setNumPropsSelected([...numPropsSelected, propId]);
    }
  }

  function getCurrentWeek() {
    const currentDate = new Date();
    let currentWeek = null;

    for (const weekKey in nfl2024WeekRanges) {
      const week = nfl2024WeekRanges[weekKey];

      const startDate = new Date(week.start);
      const endDate = new Date(week.end);

      if (currentDate >= startDate && currentDate <= endDate) {
        currentWeek = week;
        break;
      }
    }

    return currentWeek?.key || "Not Found";
  }

  function getCurrentYear() {
    let currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    if (currentMonth === 0 || currentMonth === 1) {
      currentYear -= 1;
    }

    return currentYear;
  }

  async function handlePropSubmission() {
    setSubmitting(true);
    if (propsSelected.length !== picksToMake) {
      console.log("NOT ENOUGH PICKS!");
      setSubmitting(false);
      return;
    } else {
      try {
        console.log(currentWeek, currentYear);
        const res = await fetch("/api/props/create-props", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            props: propsSelected,
            weekYear: `${currentWeek}${currentYear}`,
          }),
        });

        const data = await res.json();

        if (!data) {
          console.log("Something went wrong");
          return;
        }
        setSubmitting(false);
        console.log(data);
        // TODO: Clear page, navigate away, and refetch PICKS...
      } catch (error) {
        setSubmitting(false);
        console.log(error);
      }
    }
  }

  function handleAdminNav() {
    if (user && user.isAdmin === true) {
      setActiveButton("shawn");
    } else {
      alert("Only guys with unalive girlfriends can go there!");
    }
  }

  async function updateChallenges() {
    console.log("Updating Challenges...");
    // grab challenges whose result === ""
    const res = await fetch("/api/props/get-challenges-to-update", {
      method: "GET",
    });

    const data = await res.json();

    console.log(data);

    // fetch results from API
    // update challenges with API data
    // send challenges back to db with result field
  }

  async function deletedUnusedChallenges() {
    try {
      const res = await fetch("/api/props/delete-challenges", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!data) throw new Error("No challenges found");

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const week = getCurrentWeek();
    const year = getCurrentYear();

    setCurrentWeek(week);
    setCurrentYear(year);
  }, []);

  return (
    <div className="page admin-page">
      {user && user.isAdmin === true ? (
        <>
          <div className="admin-page-top">
            <div className="admin-page-header">
              <h1>Admin</h1>
              <div className="award">
                <MdAdminPanelSettings />
              </div>
            </div>
            <nav className="admin-nav">
              <ul>
                <li>
                  <button
                    className={`${activeButton === "shawn" ? "active" : ""}`}
                    onClick={handleAdminNav}
                  >
                    Shawn
                  </button>
                </li>
                <li className="spacer"></li>
                <li>
                  <button
                    className={`${
                      activeButton === "tempAdmins" ? "active" : ""
                    }`}
                    onClick={() => setActiveButton("tempAdmins")}
                  >
                    Temp Admins
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="admin-page-bottom">
            {activeButton === "shawn" ? (
              <div className="placeholder">
                <div className="actions admin-actions">
                  <ul>
                    <li>
                      <button
                        disabled={updateInProgress}
                        onClick={runStaticDataUpdate}
                      >
                        Update Static Data
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={runRecordsDataUpdate}
                        disabled={updateInProgress}
                      >
                        Update Records
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={runKOTHDataUpdate}
                        disabled={updateInProgress}
                      >
                        Update KOTH
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={updateChallenges}
                        disabled={updateInProgress}
                      >
                        Update Challenges
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={deletedUnusedChallenges}
                        disabled={updateInProgress}
                      >
                        Delete Unused Challenges
                      </button>
                    </li>
                    <li>
                      <button disabled={updateInProgress}>
                        Clear Guest Users
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="placeholder">
                <div className="actions tempAdmin-actions">
                  <div className="flex items-center justify-center gap-2 pb-2">
                    <button
                      className={`${activeLeague === "nfl" ? "font-bold text-red-500" : ""}`}
                      onClick={() => dispatch(setActiveLeague("nfl"))}
                    >
                      NFL
                    </button>
                    <button
                      className={`${activeLeague === "nhl" ? "font-bold text-red-500" : ""}`}
                      onClick={() => dispatch(setActiveLeague("nhl"))}
                    >
                      NHL
                    </button>
                    <button
                      className={`${activeLeague === "nba" ? "font-bold text-red-500" : ""}`}
                      onClick={() => dispatch(setActiveLeague("nba"))}
                    >
                      NBA
                    </button>
                  </div>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <div className="flex w-full items-center justify-center gap-1">
                        Requests Remaining:{" "}
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border-[1px] border-red-500 bg-red-950 p-1 text-xs">
                          {user.requestsRemaining}
                        </span>
                      </div>
                    </li>
                    <li>
                      <button
                        className="flex h-16 items-center justify-center"
                        onClick={() => fetchProps(activeLeague)}
                      >
                        {loading ? (
                          <span className="animate-spin">
                            <ImSpinner2 className={"text-sm"} />
                          </span>
                        ) : (
                          "Fetch Props"
                        )}
                      </button>
                    </li>
                  </ul>
                  <span className="instructions">
                    Click on a prop to select it. Press "Submit Props" when you
                    have made all of your selections.
                  </span>
                </div>
                <div className="props">
                  {bettingData &&
                    bettingData.map((prop: BettingProp) => {
                      if (prop.bookmakers.length === 0) return null;
                      if (prop.bookmakers.length > 1) return "Too Many BMs";

                      return (
                        <GameWrapper
                          key={prop.id}
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
                    })}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>You are not an Admin</div>
      )}
      <span
        className={`propCounter ${
          propsSelected.length === picksToMake
            ? "done"
            : propsSelected.length > picksToMake
              ? "tooMany"
              : ""
        }`}
      >
        {propsSelected.length === picksToMake ? (
          <button
            disabled={submitting}
            className="submitProps"
            onClick={handlePropSubmission}
          >
            {submitting ? "Submitting..." : "Submit Props"}
          </button>
        ) : propsSelected.length > picksToMake ? (
          `That's Too Many! Remove ${propsSelected.length - picksToMake}`
        ) : (
          `Picks Made: ${propsSelected.length} / ${picksToMake}`
        )}
      </span>
    </div>
  );
}
