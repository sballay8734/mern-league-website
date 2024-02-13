// more sports here: https://the-odds-api.com/sports-odds-data/sports-apis.html
// const sports = [
//   "americanfootball_ncaaf",
//   "americanfootball_nfl",
//   "baseball_mlb",
//   "basketball_nba",
//   "baseball_ncaa",
//   "icehockey_nhl",
// ];
import { ODDS_API_KEY } from "../../components/utils";

const sport = "icehockey_nhl";
const region = "us";
const format = "american";
const teamPropMarkets = ["spreads", "totals"];

const PROP_DATA: string[] = [
  "player_points",
  "player_power_play_points",
  "player_assists",
  "player_blocked_shots",
  "player_shots_on_goal",
  "player_total_saves",
];

const propListToString = PROP_DATA.join(",");

const BASE_URL = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=totals,spreads&oddsFormat=american`;

const PLAYER_PROPS_URL = `https://api.the-odds-api.com/v4/sports/${sport}/events/61dcc385d9c0927b9392d04c3b944198/odds?apiKey=${ODDS_API_KEY}&regions=us&bookmakers=draftkings&markets=${propListToString}&oddsFormat=american`;

export function getNHLFetchParams() {
  return {
    baseUrl: BASE_URL,
    playerPropUrl: PLAYER_PROPS_URL,
  };
}
