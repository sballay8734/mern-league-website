"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const proposalSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true, unique: true },
    status: {
        type: String,
        enum: ["approved", "rejected", "pending"],
        default: "pending"
    },
    voteInfo: { type: Object, default: { upVotes: 1, downVotes: 0 } },
    comments: { type: Array, default: [] },
    upVoters: { type: Array, default: [] },
    downVoters: { type: Array, default: [] },
    yearProposed: { type: Number, default: new Date().getFullYear() },
    dateProposed: {
        type: String,
        default: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        })
    },
    commishVeto: { type: Boolean, default: null }
});
const Proposal = mongoose_1.default.model("Proposal", proposalSchema);
exports.default = Proposal;
