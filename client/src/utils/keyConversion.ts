interface KeyConversion {
  [key: string]: string;
}

const NFLKeyConversion: KeyConversion = {
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
};

const NBAKeyConversion: KeyConversion = {
  player_points: "Points",
  player_rebounds: "Rebounds",
  player_assists: "Assists",
  player_threes: "3pt Made",
  player_blocks: "Blocks",
  player_steals: "Steals",
};

const NHLKeyConversion: KeyConversion = {
  player_points: "Points",
  player_power_play_points: "PP Points",
  player_assists: "Assists",
  player_blocked_shots: "Blocked Shots",
  player_shots_on_goal: "SOG",
  player_total_saves: "Saves",
};

export function handleKeyConversion(sport: string) {
  if (sport === "nfl") return NFLKeyConversion;
  if (sport === "nba") return NBAKeyConversion;
  if (sport === "nhl") return NHLKeyConversion;

  throw new Error("Something went wrong generating key conversion");
}
