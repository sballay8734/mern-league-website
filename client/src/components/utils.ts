export const ODDS_API_KEY = "2eed7073c0bc886d436863fc3a1844db"; // shawnyahoo
export const BAILEE_SHAW = "7149a4ecd5269194832435e5755990ea"; // baileeshaw
export const SB_API_KEY = "0f397ef8e40fda92307241c433993cd7"; // shawnballay1

export const TEST_BASE_URL = `https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=totals,spreads&oddsFormat=american`;

export const NBA_PLAYER_PROPS_URL = `https://api.the-odds-api.com/v4/sports/basketball_nba/events/61dcc385d9c0927b9392d04c3b944198/odds?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=player_pass_tds&oddsFormat=american`;

export const BASE_URL = `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=totals,spreads&oddsFormat=american`;

export const PLAYER_PROPS_URL = `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/61dcc385d9c0927b9392d04c3b944198/odds?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=player_pass_tds&oddsFormat=american`;

export function capitalizeAndRemoveLast(string: string): string {
  if (string.length <= 1) return "";

  return (
    string.charAt(0).toUpperCase() + string.slice(1, -1)
  ).toLocaleUpperCase();
}

export function calculatePayout(odds: number) {
  if (odds > 0) {
    return odds / 100;
  } else {
    return Number((100 / Math.abs(odds)).toFixed(2));
  }
}

export const testPropData: string[] = [
  "player_pass_tds",
  "player_pass_yds",
  "player_pass_completions",
  "player_pass_attempts",
  "player_pass_interceptions",
  "player_rush_yds",
  "player_rush_attempts",
  "player_receptions",
  "player_reception_yds",
  "player_anytime_td",
];

export const NBA_PROP_DATA: string[] = [
  "player_points",
  "player_rebounds",
  "player_assists",
  "player_threes",
  "player_blocks",
  "player_steals",
];

// export function createPlayerPropUrl(string: string, propId: string) {
//   return `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/${propId}/odds?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=${string}&oddsFormat=american`;
// }
// TEST FUNCTION NBA
export function createPlayerPropUrl(string: string, propId: string) {
  return `https://api.the-odds-api.com/v4/sports/basketball_nba/events/${propId}/odds?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=${string}&oddsFormat=american`;
}

export interface KeyConversion {
  [key: string]: string;
}

export interface OUStats {
  name: string;
  description?: string;
  price: number;
  point: number;
}

interface WeekToNum {
  [week: string]: number;
}
export const weekToNumConversion: WeekToNum = {
  // Tuesday Morning (12:00am) ---> Monday Night (11:59pm)
  weekOne: 1,
  weekTwo: 2,
  weekThree: 3,
  weekFour: 4,
  weekFive: 5,
  weekSix: 6,
  weekSeven: 7,
  weekEight: 8,
  weekNine: 9,
  weekTen: 10,
  weekEleven: 11,
  weekTwelve: 12,
  weekThirteen: 13,
  weekFourteen: 14,
  weekFifteen: 15,
  weekSixteen: 16,
  weekSeventeen: 17,
  weekEighteen: 18,
  weekNineteen: 19,
  weekTwenty: 20,
  weekTwentyOne: 21,
  weekTwentyTwo: 22,
  weekTwentyThree: 23,
  testWeek2: 54,
};

export interface CombinedProp {
  [playerNameAndKey: string]: {
    overStats: OUStats;
    underStats: OUStats;
  };
}

export const propKeyConversion: KeyConversion = {
  player_pass_tds: "Pass TDs",
  player_pass_yds: "Pass Yds",
  player_pass_completions: "Completions",
  player_pass_attempts: "Pass Attempts",
  player_pass_interceptions: "Interceptions",
  player_rush_yds: "Rush Yds",
  player_rush_attempts: "Rush Attempts",
  player_receptions: "Receptions",
  player_reception_yds: "Receiving Yds",
  teamTotals: "Total Points",
  // player_anytime_td: "TESTING"
};

export interface PlayerPropInterface {
  uniquePropKey: string;
  item: Markets;
  player: string;
  gameId: string;
  overStats: {
    name: string;
    description?: string;
    price: number;
    point: number;
  };
  underStats: {
    name: string;
    description?: string;
    price: number;
    point: number;
  };
}

export interface Outcomes {
  name: string;
  point: number;
  price: number;
  description?: string;
}

export interface Markets {
  key: string;
  last_update: string;
  outcomes: Outcomes[];
}

export interface Bookmakers {
  key: string;
  last_update: string;
  title: string;
  markets: Markets[];
}

export interface BettingProp {
  home_team: string;
  away_team: string;
  commence_time: string;
  id: string;
  sports_key: string;
  sports_title: string;
  bookmakers: Bookmakers[];
}

export interface WeekRanges {
  [week: string]: {
    key: string;
    start: string;
    end: string;
  };
}

export interface SubmittedProps {
  propID: string;
  year: string; // 2024
  week: string; // weekOne
  type: string; // spread | totals
  homeTeam: string | null;
  awayTeam: string | null;
  player: string | null;
}

export interface FullMatchupProps {
  [id: string]: PlayerPropInterface[];
}

export interface OUStats {
  name: string;
  description?: string;
  price: number;
  point: number;
}

export interface gameIdObjects {
  id: string;
  type: string;
}
