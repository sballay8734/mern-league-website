"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticOwnerSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Bonus Stats
const bonusStatsSchema = new mongoose_1.Schema({
    luckyWins: Number,
    unluckyLosses: Number,
    mostWinsOneSeason: Number,
    mostLossesOneSeason: Number,
    avgFinishPlace: Number,
    championships: Number,
    skirts: Number,
    playoffRate: Number,
    kothWins: Number,
    everyTeamEveryWeek: {
        wins: Number,
        losses: Number,
        ties: Number,
        winPct: Number
    }
});
const YearlySwap = new mongoose_1.Schema({
    scheduleSwapWins: { type: Number },
    scheduleSwapLosses: { type: Number },
    scheduleSwapTies: { type: Number },
    scheduleSwapWinPct: { type: Number }
});
const AllTimeSwap = new mongoose_1.Schema({
    scheduleSwapWins: { type: Number },
    scheduleSwapLosses: { type: Number },
    scheduleSwapTies: { type: Number },
    scheduleSwapWinPct: { type: Number }
});
// Yearly Helpers
const combinedStatsSchema = new mongoose_1.Schema({
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
});
const everyTeamEveryWeekSchema = new mongoose_1.Schema({
    ETEWLosses: Number,
    ETEWTies: Number,
    ETEWWinPct: Number,
    ETEWWins: Number
});
const playoffStatsSchema = new mongoose_1.Schema({
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
});
const regSznStatsSchema = new mongoose_1.Schema({
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
});
// allTime Helpers
const combinedATStatsSchema = new mongoose_1.Schema({
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
});
const playoffATStatsSchema = new mongoose_1.Schema({
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
});
const regSznATStatsSchema = new mongoose_1.Schema({
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
});
// h2h Helpers
const h2hCombinedObjectSchema = new mongoose_1.Schema({
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
});
const h2hPlayoffObjectSchema = new mongoose_1.Schema({
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
});
const h2hRegSznObjectSchema = new mongoose_1.Schema({
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
});
// MAIN SCHEMAS **********************************************************
const yearlyStatsSchema = new mongoose_1.Schema({
    year: Number,
    combinedStats: combinedStatsSchema,
    everyTeamEveryWeekStats: everyTeamEveryWeekSchema,
    playoffStats: playoffStatsSchema,
    regSznStats: regSznStatsSchema,
    participated: Boolean
});
const allTimeStatsSchema = new mongoose_1.Schema({
    combined: combinedATStatsSchema,
    playoffs: playoffATStatsSchema,
    regSzn: regSznATStatsSchema
});
const h2hStatsSchema = new mongoose_1.Schema({
    combined: { type: Map, of: h2hCombinedObjectSchema },
    playoffs: { type: Map, of: h2hPlayoffObjectSchema },
    regSzn: { type: Map, of: h2hRegSznObjectSchema }
});
exports.staticOwnerSchema = new mongoose_1.Schema({
    ownerName: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    yearly: { type: Map, of: yearlyStatsSchema },
    allTime: allTimeStatsSchema,
    h2h: h2hStatsSchema,
    bonusStats: bonusStatsSchema,
    scheduleSwap: {
        type: Map,
        of: { yearly: { type: Map, of: YearlySwap }, allTime: AllTimeSwap }
    }
    // scheduleSwap: { type: Schema.Types.Mixed }
});
const ComputedOwners = mongoose_1.default.model("computedOwners", exports.staticOwnerSchema);
exports.default = ComputedOwners;
