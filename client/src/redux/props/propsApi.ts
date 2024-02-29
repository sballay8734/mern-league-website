import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WeekRanges } from "../../components/utils";
import { IChallenge, PropChallenge } from "../../types/challenges";
import { UpdateProp } from "../../components/PicksPageComps/types";

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
    start: "2024-02-11T06:00:00Z",
    end: "2024-02-30T18:30:00Z",
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
  league: string;
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

  challenges: PropChallenge[] | [];
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
  tagTypes: ["Prop"],
  endpoints: (builder) => ({
    fetchProps: builder.query<PropToDbInterface[], void>({
      query: () => ({
        url: `/get-props/${currentWeek}/${currentYear}`,
        providesTags: (result: PropToDbInterface[] | undefined) =>
          result
            ? [
                ...result.map(({ _id }: { _id: string }) => ({
                  type: "Prop" as const,
                  _id,
                })),
                "Prop",
              ]
            : ["Prop"],
      }),
    }),
    fetchUnsubmittedPropCount: builder.query<number, void>({
      query: () => ({
        url: `/get-prop-count/${currentWeek}/${currentYear}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Prop"],
      // onQueryStarted: () => {
      //   console.log("FetchCount query started...", new Date());
      // },
    }),
    // TODO: invalidates tags needs to be more specific when updating because the array does not change. Therefore, no need to invalidate the entire array. This should only be done if adding or removing from an array.
    updateProp: builder.mutation<PropToDbInterface, UpdateProp>({
      query: (body) => ({
        url: "/update-prop",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Prop"],
      onQueryStarted: () => {
        console.log("Update query started...", new Date());
      },
    }),

    // CHALLENGES STUFF (TODO: MOVE TO OWN API) *******************************
    fetchChallenges: builder.query<
      IChallenge[],
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
    fetchChallengesToUpdate: builder.query<IChallenge[], void>({
      query: () => ({
        url: `/get-challenges-to-update`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // CAN be used to get BOTH active challenges and history (just filter on FE)
    fetchChallengesByUser: builder.query<IChallenge[], string>({
      query: (userId) => ({
        url: `/get-challenges/${userId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useFetchPropsQuery,
  useFetchChallengesQuery,
  useFetchChallengesToUpdateQuery,
  useFetchChallengesByUserQuery,
  useFetchUnsubmittedPropCountQuery,
  useUpdatePropMutation,
} = propsApi;
export { propsApi };
