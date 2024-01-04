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
