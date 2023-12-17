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
const propSubmissionSchema = new mongoose_1.Schema({
    propID: { type: Number, required: true },
    userID: { type: String, required: true },
    type: {
        type: String,
        enum: ["ouPlayer", "ouTeam", "spread"],
        required: true
    },
    team1: { type: String },
    team2: { type: String },
    player: { type: String },
    stat: { type: String, default: null },
    line: { type: Number, required: true },
    favorite: { type: String },
    nonFavorite: { type: String },
    selectedOU: { type: String, enum: [null, "under", "over"], default: null },
    selectedTeam: { type: String, default: null },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    result: { type: mongoose_1.Schema.Types.Mixed, default: null },
    nflYear: { type: Number, required: true },
    week: { type: Number, required: true }
});
const PropSubmission = mongoose_1.default.model("PropSubmission", propSubmissionSchema);
exports.default = PropSubmission;
