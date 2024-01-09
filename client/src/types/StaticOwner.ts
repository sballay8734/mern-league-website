interface BonusStats {
  luckyWins: number
  unluckyLosses: number
  mostWinsOneSeason: number
  mostLossesOneSeason: number
  avgFinishPlace: number
  championships: number
  skirts: number
  everyTeamEveryWeek: {
    wins: number
    losses: number
    ties: number
    winPct: number
  }
}

interface CombinedStats {
  avgPA: number
  avgPF: number
  gamesPlayed: number
  losses: number
  pointsAgainst: number
  pointsFor: number
  ties: number
  winningPct: number
  wins: number
}

interface ETEW {
  ETEWLosses: number
  ETEWTies: number
  ETEWWinPct: number
  ETEWWins: number
}

interface PlayoffStats {
  POByes: number
  POGamesPlayed: number
  avgPA: number
  avgPF: number
  losses: number
  participated: boolean
  pointsAgainst: number
  pointsFor: number
  ties: number
  winningPct: number
  wins: number
}

interface RegSznStats {
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

interface CombinedATStats {
  avgPA: number
  avgPF: number
  gamesPlayed: number
  losses: number
  pointsAgainst: number
  pointsFor: number
  ties: number
  winningPct: number
  wins: number
}

interface PlayoffAtStats {
  POavgPA: number
  POavgPF: number
  POgamesPlayed: number
  POlosses: number
  POpointsAgainst: number
  POpointsFor: number
  POwinningPct: number
  POwins: number
}

interface RegSznAtStats {
  RSavgPA: number
  RSavgPF: number
  RSgamesPlayed: number
  RSlosses: number
  RSpointsAgainst: number
  RSpointsFor: number
  RSwinningPct: number
  RSties: number
  RSwins: number
}

export interface H2hCombined {
  gamesPlayed: number
  losses: number
  ties: number
  avgPF: number
  totalPointsAgainst: number
  totalPointsFor: number
  winningPct: number
  wins: number
  bestWeek: number
  worstWeek: number
}

export interface H2hPlayoffs {
  POgamesPlayed: number
  losses: number
  ties: number
  avgPF: number
  totalPointsAgainst: number
  totalPointsFor: number
  winningPct: number
  wins: number
  bestWeek: number
  worstWeek: number
}

export interface H2hRegSzn {
  RSgamesPlayed: number
  losses: number
  ties: number
  avgPF: number
  totalPointsAgainst: number
  totalPointsFor: number
  winningPct: number
  wins: number
  bestWeek: number
  worstWeek: number  
}

interface YearlyStats {
  year: number
  combinedStats: CombinedStats,
  everyTeamEveryWeekStats: ETEW,
  playoffStats: PlayoffStats,
  regSznStats: RegSznStats,
  participated: Boolean
}

interface AllTimeStats {
  combined: CombinedATStats,
  playoffs: PlayoffAtStats,
  regSzn: RegSznAtStats
}

interface H2hStats {
  combined: Record<string, H2hCombined>
  playoffs: Record<string, H2hPlayoffs>
  regSzn: Record<string, H2hRegSzn>
}

export interface StaticOwner {
  ownerName: string
  id: string
  _id: string
  yearly: Record<string, YearlyStats>
  allTime: AllTimeStats
  h2h: H2hStats
  bonusStats: BonusStats
}