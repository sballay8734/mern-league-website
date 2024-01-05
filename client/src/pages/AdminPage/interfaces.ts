export interface bestWorstWeek {
  ownerName: string
  points: number
  year: number
  during: string
}

export interface streaks {
  ownerName: string
  streak: number
  year: number // needs to be string because it could carry over to next year
  testString: string
}

export interface Matchups {
  winner: string
  opponent: string
  differential: number
  year: number // needs to be string because it could carry over to next year
  matchUp: MatchUpObject
}

interface MatchUpObject {
  pointsFor: number | null
  pointsAgainst: number | null
  opponent: string | null
  during: string
}

export interface HighestCombinedScore {
  winner: string
  opponent: string
  sum: number
  year: number
  matchUp: MatchUpObject
}

export interface BaseRecord {
  ownerName: string
  statName: string
  statValue: number
}

export interface BaseRecordMod {
  ownerName: string
  statName: string
  statValue: number
  playoffApps: number
}
