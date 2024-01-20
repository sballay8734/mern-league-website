// event ID comes from fetching event

/* 
endpoint for player props 

https://api.the-odds-api.com/v4/sports/{sport}/events/{eventId}/odds?apiKey={apiKey}&regions={regions}&markets={markets}&dateFormat={dateFormat}&oddsFormat={oddsFormat}
*/

/* 
endpoint for team props 

https://api.the-odds-api.com/v4/sports/{sport}/odds/?apiKey=${ODDS_API_KEY}&regions=us&markets={markets}Format=american
*/

// more sports here: https://the-odds-api.com/sports-odds-data/sports-apis.html
const sports = ["americanfootball_ncaaf", "americanfootball_nfl", "baseball_mlb", "basketball_nba", "baseball_ncaa", "icehockey_nhl"]

const region = "us"
const format = "american"

const teamPropMarkets = ["spreads", "totals"]

// NFL, NCAA
const NflNcaaPlayerPropMarkets = ["player_pass_tds", "player_pass-yds", "player_pass_completions", "player_pass_attempts", "player_pass_interceptions", "player_rush_yds", "player_rush_attempts", "player_receptions", "player_reception_yds"]

// NBA, NCAAB also exist here
// https://the-odds-api.com/sports-odds-data/betting-markets.html

// MLB AND NHL ALSO EXIST HERE
// https://the-odds-api.com/sports-odds-data/betting-markets.html