export interface Owner {
  ownerName: string
  id: number
  [year: number]: YearObject
}

interface YearObject {
  participated: boolean
  wins: number
  losses: number
  ties: number
  last: boolean
  finished: number
  regularSeason: RegSznObject
  playoffs: PlayoffsObject
}

interface RegSznObject {
  [week: string]: RegSznWeekObject
}

interface PlayoffsObject {
  [round: string]: PlayoffWeekObject
}

interface RegSznWeekObject {
  pointsFor: number
  pointsAgainst: number
  opponent: string
}

interface PlayoffWeekObject extends RoundObject {
  bye?: boolean
}

interface RoundObject {
  participated: boolean
  pointsFor: number | null
  pointsAgainst: number | null
  opponent: string | null
}

// TO DB @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export interface GenericOwnerData {
  ownerName: string
  id: number
}

export interface YearlyOwnerData {
  [year: string]: YearDataObject
}

export interface YearDataObject {
  participated: boolean
  // combined: CombinedData | null
  playoffStats: PlayoffData | null
  regSznStats: RegSznData | null
}

export interface PlayoffData {
  POByes?: number
  POGamesPlayed?: number
  avgPA?: number
  avgPF?: number
  losses?: number
  participated: boolean
  pointsAgainst?: number
  pointsFor?: number
  ties?: number
  winningPct?: number
  wins?: number
}

export interface RegSznData {
  RSGamesPlayed: number
  avgPA: number
  avgPF: number
  losses: number
  pointsAgainst: number
  pointsFor: number
  ties: number
  winningPct: number
  wins: number
}

export interface CombinedData {
  gamesPlayed: number
  avgPA: number
  avgPF: number
  wins: number
  losses: number
  pointsAgainst: number
  pointsFor: number
  ties: number
  winningPct: number
}

export interface allTimePlayoffData {
  POGamesPlayed: number
  POlosses: number
  POpointsAgainst: number
  POpointsFor: number
  POwins: number
  POavgPA: number
  POavgPF: number
  POwinningPct: number
}

export interface allTimeRegSznData {
  RSGamesPlayed: number
  RSlosses: number
  RSpointsAgainst: number
  RSpointsFor: number
  RSwins: number
  RSavgPA: number
  RSavgPF: number
  RSwinningPct: number
  RSties: number
}

export interface H2HType {
  [ownerName: string]: H2HStats
}

export interface H2HStats {
  wins: number
  losses: number
  ties: number
  totalPointsFor: number
  totalPointsAgainst: number
  winningPct: number
}

export interface PlayoffType {
  [ownerName: string]: PlayoffStats
}

export interface PlayoffStats {
  wins: number
  losses: number
  ties: number
  totalPointsFor: number
  totalPointsAgainst: number
  winningPct: number
}
