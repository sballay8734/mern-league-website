export interface bestWorstWeek {
  recordHolder: string,
  opponent: string | null,
  statValue: number,
  bonusStat: number | null
  year: number | null
  during: "Playoffs" | "Season" | null,

  matchup: {pointsFor: number, pointsAgainst: number, opponent: string, during: string} | null
  type: string
}

export interface streaks {
  recordHolder: string,
  opponent: string | null,
  statValue: number,
  bonusStat: number | null
  year: number | null
  during: "Playoffs" | "Season" | null,

  matchup: {pointsFor: number, pointsAgainst: number, opponent: string, during: string} | null
  type: string
}

export interface Matchups {
  recordHolder: string,
  opponent: string | null,
  statValue: number,
  bonusStat: number | null
  year: number | null
  during: "Playoffs" | "Season" | null,

  matchup: {pointsFor: number, pointsAgainst: number, opponent: string, during: string} | null
  type: string
}

interface MatchUpObject {
  pointsFor: number | null
  pointsAgainst: number | null
  opponent: string | null
  during: string
}

export interface HighestCombinedScore {
  recordHolder: string,
  opponent: string | null,
  statValue: number,
  bonusStat: number | null
  year: number | null
  during: "Playoffs" | "Season" | null,

  matchup: {pointsFor: number, pointsAgainst: number, opponent: string, during: string} | null
  type: string
}

export interface BaseRecord {
  recordHolder: string,
  opponent: string | null,
  statValue: number,
  bonusStat: number | null
  year: number | null
  during: "Playoffs" | "Season" | null,

  matchup: {pointsFor: number, pointsAgainst: number, opponent: string, during: string} | null
  type: string
}

export interface BaseRecordMod {
  recordHolder: string,
  opponent: string | null,
  statValue: number,
  bonusStat: number | null
  year: number | null
  during: "Playoffs" | "Season" | null,

  matchup: {pointsFor: number, pointsAgainst: number, opponent: string, during: string} | null
  type: string
}
