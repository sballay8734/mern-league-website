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
const RoundObjectSchema = new mongoose_1.Schema({
    participated: { type: Boolean, required: true },
    pointsFor: { type: Number, default: null },
    pointsAgainst: { type: Number, default: null },
    opponent: { type: String, default: null }
});
const RoundOneObjectSchema = new mongoose_1.Schema({
    bye: { type: Boolean, default: false }
}).add(RoundObjectSchema);
const PlayoffWeekObjectSchema = new mongoose_1.Schema({
    roundOne: { type: RoundOneObjectSchema, required: true },
    rounds: { type: Map, of: RoundObjectSchema }
});
const RegSznWeekObjectSchema = new mongoose_1.Schema({
    pointsFor: { type: Number, required: true },
    pointsAgainst: { type: Number, required: true },
    opponent: { type: String, required: true }
});
const RegSznObjectSchema = new mongoose_1.Schema({
    // The weeks are dynamic
    weeks: { type: Map, of: RegSznWeekObjectSchema }
});
const YearObjectSchema = new mongoose_1.Schema({
    participated: { type: Boolean, required: true },
    wins: { type: Number, required: true },
    losses: { type: Number, required: true },
    ties: { type: Number, required: true },
    last: { type: Boolean, required: true },
    finished: { type: Number, required: true },
    regularSeason: { type: RegSznObjectSchema, required: true },
    playoffs: { type: PlayoffWeekObjectSchema, required: true }
});
const ownerSchema = new mongoose_1.Schema({
    // type: Schema.Types.Mixed
    ownerName: { type: String, required: true },
    id: { type: Number, required: true, unique: true },
    years: { type: Map, of: YearObjectSchema }
});
const Owner = mongoose_1.default.model("testOwner", ownerSchema);
exports.default = Owner;
