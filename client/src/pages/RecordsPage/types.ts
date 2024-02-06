export interface IRecord {
  recordHolder: string
  opponent: string | null
  statValue: number
  bonusStat: number | null
  year: number | null
  during: "Playoffs" | "Season" | null

  matchup: {
    pointsFor: number
    pointsAgainst: number
    opponent: string
    during: string
  } | null
  type: string
}

export interface FullRecordObject {
  [recordName: string]: IRecord
}

interface Conversion {
  [key: string]: string
}

export const recordKeyConversion: Conversion = {
  bestWeeks: "Best Weeks",
  worstWeeks: "Worst Weeks",
  longestWinningStreaks: "Longest Winning Streaks",
  longestLosingStreaks: "Longest Losing Streaks",
  biggestBlowouts: "Biggest Blowouts",
  closestGames: "Closest Games",
  highestCombinedScores: "Highest Combined Scores",
  lowestCombinedScores: "Worst Combined Scores",
  lowWinPct: "Worst All-Time Win Percentage",
  highWinPct: "Best All-Time Win Percentage",
  highAvgPF: "Best Average Points For",
  lowAvgPF: "Worst Average Points For",
  highPlayoffRateAndApps: "Best Playoff Participation Rate",
  lowPlayoffRateAndApps: "Worst Playoff Participation Rate",
  highestAvgFinishingPlace: "Best Average Finishing Place",
  lowestAvgFinishingPlace: "Worst Average Finishing Place"
}
