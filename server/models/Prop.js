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
const mongoose_1 = __importStar(require("mongoose"));
const ChallengesSchema = new mongoose_1.Schema({
    challenger: String,
    acceptor: String,
    challengerChoice: String, // "over" | "under" | "away" | "home"
    acceptorChoice: String, // "over" | "under" | "away" | "home"
    void: { type: Boolean, default: false }
});
const propSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    subType: String,
    player: String,
    gameId: { type: String, required: true },
    expiration: { type: String, required: true },
    uniqueId: { type: String, required: true },
    week: { type: Number, required: true },
    nflYear: { type: Number, required: true },
    overData: { overLine: Number, overPayout: Number, calcOverPayout: Number },
    underData: {
        underLine: Number,
        underPayout: Number,
        calcUnderPayout: Number
    },
    overSelections: [String],
    underSelections: [String],
    homeTeam: String,
    awayTeam: String,
    homeData: {
        homeTeam: String,
        homeLine: Number,
        homePayout: Number,
        calcHomePayout: Number
    },
    awayData: {
        awayTeam: String,
        awayLine: Number,
        awayPayout: Number,
        calcAwayPayout: Number
    },
    homeLineSelections: [String],
    awayLineSelections: [String],
    awayScoreResult: Number,
    homeScoreResult: Number,
    result: Number,
    void: { type: Boolean, required: true },
    challenges: { type: [ChallengesSchema], default: [] },
    weekYear: { type: String, index: true, required: true }
});
const Prop = mongoose_1.default.model("Prop", propSchema);
exports.default = Prop;
