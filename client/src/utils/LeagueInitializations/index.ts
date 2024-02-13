import { getNBAFetchParams } from "./nba";
import { getNFLFetchParams } from "./nfl-ncaa";
import { getNHLFetchParams } from "./nhl";

const ODDS_API_KEY = "2eed7073c0bc886d436863fc3a1844db"; // shawnyahoo
const BAILEE_SHAW = "7149a4ecd5269194832435e5755990ea"; // baileeshaw
const SB_API_KEY = "0f397ef8e40fda92307241c433993cd7"; // shawnballay1

export function handleFetchParams(league: string) {
  if (league === "nfl") {
    const fetchParams = getNFLFetchParams();
    return fetchParams;
  } else if (league === "nhl") {
    const fetchParams = getNHLFetchParams();
    return fetchParams;
  } else if (league === "nba") {
    const fetchParams = getNBAFetchParams();
    return fetchParams;
  } else {
    console.error("ERROR");
    return;
  }
}
