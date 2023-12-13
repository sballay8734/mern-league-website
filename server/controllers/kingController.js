"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.standings = exports.results = void 0;
const WeeklyResult_1 = __importDefault(require("../models/WeeklyResult"));
const KingStanding_1 = __importDefault(require("../models/KingStanding"));
const results = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield WeeklyResult_1.default.find();
        res.status(200).json(results);
    }
    catch (error) {
        next(error);
    }
});
exports.results = results;
const standings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running Standings");
    try {
        const standings = yield KingStanding_1.default.find();
        res.status(200).json(standings);
    }
    catch (error) {
        console.log("ERROR GETTING STANDINGS");
        next(error);
    }
});
exports.standings = standings;
// need to add updateResults & updateStandings
