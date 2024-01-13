import mongoose, { Schema } from "mongoose"

// Bonus Stats
const bonusStatsSchema = new Schema(
  {
    luckyWins: Number,
    unluckyLosses: Number,
    mostWinsOneSeason: Number,
    mostLossesOneSeason: Number,
    avgFinishPlace: Number,
    championships: Number,
    skirts: Number,
    everyTeamEveryWeek: {
      wins: { type: Number },
      losses: { type: Number },
      ties: { type: Number },
      winPct: { type: Number }
    },
    playoffRate: Number
  },
  { _id: false }
)

// SCHEDULE SWAP (NOT WORKING)
const YearlySwap = new Schema({
  scheduleSwapWins: {type: Number},
  scheduleSwapLosses: {type: Number},
  scheduleSwapTies: {type: Number},
  scheduleSwapWinPct: {type: Number}
})

const AllTimeSwap = new Schema({
  scheduleSwapWins: {type: Number},
  scheduleSwapLosses: {type: Number},
  scheduleSwapTies: {type: Number},
  scheduleSwapWinPct: {type: Number}
})

const finalSchema = new Schema({
  ownerName: {
    yearly: {type: Map, of: YearlySwap},
    allTime: AllTimeSwap
  }
})

// Yearly Helpers
const combinedStatsSchema = new Schema({
  avgPA: Number,
  avgPF: Number,
  gamesPlayed: Number,
  losses: Number,
  pointsAgainst: Number,
  pointsFor: Number,
  ties: Number,
  winningPct: Number,
  wins: Number,
  bestWeek: Number,
  worstWeek: Number,
  finishPlace: Number
})
const everyTeamEveryWeekSchema = new Schema({
  ETEWLosses: Number,
  ETEWTies: Number,
  ETEWWinPct: Number,
  ETEWWins: Number
})
const playoffStatsSchema = new Schema({
  POByes: Number,
  POGamesPlayed: Number,
  avgPA: Number,
  avgPF: Number,
  losses: Number,
  participated: Boolean,
  pointsAgainst: Number,
  pointsFor: Number,
  ties: Number,
  winningPct: Number,
  wins: Number,
  bestWeek: Number,
  worstWeek: Number
})
const regSznStatsSchema = new Schema({
  RSGamesPlayed: Number,
  avgPA: Number,
  avgPF: Number,
  losses: Number,
  pointsAgainst: Number,
  pointsFor: Number,
  ties: Number,
  winningPct: Number,
  wins: Number,
  bestWeek: Number,
  worstWeek: Number,
  finishPlace: Number
})

// allTime Helpers
const combinedATStatsSchema = new Schema({
  avgPA: Number,
  avgPF: Number,
  gamesPlayed: Number,
  losses: Number,
  pointsAgainst: Number,
  pointsFor: Number,
  ties: Number,
  winningPct: Number,
  wins: Number,
  bestWeek: Number,
  worstWeek: Number
})
const playoffATStatsSchema = new Schema({
  POavgPA: Number,
  POavgPF: Number,
  POgamesPlayed: Number,
  POlosses: Number,
  POpointsAgainst: Number,
  POpointsFor: Number,
  POwinningPct: Number,
  POwins: Number,
  bestWeek: Number,
  worstWeek: Number
})
const regSznATStatsSchema = new Schema({
  RSavgPA: Number,
  RSavgPF: Number,
  RSgamesPlayed: Number,
  RSlosses: Number,
  RSPA: Number,
  RSPF: Number,
  RSwinningPct: Number,
  RSties: Number,
  RSwins: Number,
  bestWeek: Number,
  worstWeek: Number
})

// h2h Helpers
const h2hCombinedObjectSchema = new Schema({
  gamesPlayed: Number,
  losses: Number,
  ties: Number,
  avgPF: Number,
  totalPointsAgainst: Number,
  totalPointsFor: Number,
  winningPct: Number,
  wins: Number,
  bestWeek: Number,
  worstWeek: Number
})
const h2hPlayoffObjectSchema = new Schema({
  POgamesPlayed: Number,
  losses: Number,
  ties: Number,
  avgPF: Number,
  totalPointsAgainst: Number,
  totalPointsFor: Number,
  winningPct: Number,
  wins: Number,
  bestWeek: Number,
  worstWeek: Number
})
const h2hRegSznObjectSchema = new Schema({
  RSgamesPlayed: Number,
  losses: Number,
  ties: Number,
  avgPF: Number,
  totalPointsAgainst: Number,
  totalPointsFor: Number,
  winningPct: Number,
  wins: Number,
  bestWeek: Number,
  worstWeek: Number
})

// MAIN SCHEMAS **********************************************************
const yearlyStatsSchema = new Schema({
  year: Number,
  combinedStats: combinedStatsSchema,
  everyTeamEveryWeekStats: everyTeamEveryWeekSchema,
  playoffStats: playoffStatsSchema,
  regSznStats: regSznStatsSchema,
  participated: Boolean
})

const allTimeStatsSchema = new Schema({
  combined: combinedATStatsSchema,
  playoffs: playoffATStatsSchema,
  regSzn: regSznATStatsSchema
})

const h2hStatsSchema = new Schema({
  combined: { type: Map, of: h2hCombinedObjectSchema },
  playoffs: { type: Map, of: h2hPlayoffObjectSchema },
  regSzn: { type: Map, of: h2hRegSznObjectSchema }
})

export const staticOwnerSchema = new Schema({
  ownerName: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  yearly: { type: Map, of: yearlyStatsSchema },
  allTime: allTimeStatsSchema,
  h2h: h2hStatsSchema,
  bonusStats: bonusStatsSchema,
  scheduleSwap: { type: Map, of: { yearly: {type: Map, of: YearlySwap}, allTime: AllTimeSwap } }
  // scheduleSwap: { type: Schema.Types.Mixed }
})

const ComputedOwners = mongoose.model("computedOwners", staticOwnerSchema)

export default ComputedOwners