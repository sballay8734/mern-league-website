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
const singleRecordData = new mongoose_1.Schema({
    recordHolder: { type: String, required: true },
    opponent: { type: String },
    statValue: { type: Number, required: true },
    bonusStat: { type: Number },
    year: { type: Number },
    during: { type: String },
    matchup: { pointsFor: Number, pointsAgainst: Number, opponent: String, during: String }
});
const singleRecordSchema = new mongoose_1.Schema({
    recordName: { type: Array, of: singleRecordData }
});
const fullRecordsSchema = new mongoose_1.Schema({
    records: { type: Object, of: singleRecordSchema }
});
// const RecordsSchema = new Schema({
//   records: {type: Schema.Types.Mixed}
// });
const Records = mongoose_1.default.model("Record", fullRecordsSchema);
exports.default = Records;
/*
   records: {
    recordOne: {
      recordHolder: {type: String, required: true},
      opponent: {type: String},
      statValue: {type: Number, required: true},
      bonusStat: {type: Number},
      year: {type: Number},
      during: {type: String},
      matchup: {pointsFor: Number, pointsAgainst: Number, opponent: String, during: String}
    },
    recordTwo: {
      recordHolder: {type: String, required: true},
      opponent: {type: String},
      statValue: {type: Number, required: true},
      bonusStat: {type: Number},
      year: {type: Number},
      during: {type: String},
      matchup: {pointsFor: Number, pointsAgainst: Number, opponent: String, during: String}
    },
   }
*/ 
