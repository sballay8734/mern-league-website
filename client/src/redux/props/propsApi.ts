import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WeekRanges } from "../../components/utils";

interface Challenge {
  challengerName: string;
  acceptorName: string;
  challengerSelection: string; // "over" | "under" | "away" | "home"
  acceptorSelection: string; // "over" | "under" | "away" | "home"
  wagerAmount: number;
  _id: string;

  void: boolean;
}

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
  testWeek: {
    key: "testWeek",
    start: "2024-01-29T06:00:00Z",
    end: "2024-02-11T18:30:00Z",
  },
};

export interface PropToDbInterface {
  type: string;
  subType?: string;
  player?: string;
  gameId: string;
  expiration: string;
  uniqueId: string;
  week: number;
  nflYear: number;
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

  void: boolean;

  challenges: Challenge[] | [];
}

interface Challenge {
  challengerId: string;
  acceptorId: string;
  challengerName: string;
  acceptorName: string;
  challengerSelection: string; // "over" | "under" | "away" | "home"
  acceptorSelection: string; // "over" | "under" | "away" | "home"
  wagerAmount: number;
  gameId: string;
  propId: string;
  dateProposed: string;
  dateAccepted: string;
  result: string;

  voided: boolean;
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

const currentWeek = getCurrentWeek();
const currentYear = getCurrentYear();

const propsApi = createApi({
  reducerPath: "props",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/props",
  }),
  endpoints: (builder) => ({
    fetchProps: builder.query<PropToDbInterface[], void>({
      query: () => ({
        url: `/get-props/${currentWeek}/${currentYear}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    fetchChallenges: builder.query<
      Challenge[],
      { gameId: string; uniqueId: string }
    >({
      query: ({ gameId, uniqueId }) => ({
        url: `/get-challenges/${gameId}/${uniqueId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    fetchChallengesToUpdate: builder.query<Challenge[], void>({
      query: () => ({
        url: `/get-challenges-to-update`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useFetchPropsQuery, useFetchChallengesQuery } = propsApi;
export { propsApi };
