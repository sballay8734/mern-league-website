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
exports.updateData = exports.getData = void 0;
const KingStanding_1 = __importDefault(require("../models/KingStanding"));
const error_1 = require("../utils/error");
const getData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const standings = yield KingStanding_1.default.find();
        res.status(200).json(standings);
    }
    catch (error) {
        console.log("ERROR GETTING STANDINGS");
        next(error);
    }
});
exports.getData = getData;
const updateData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const data = req.body.data;
    const updateObject = req.body;
    if (!user || user.isAdmin === false)
        next((0, error_1.errorHandler)(400, "Unauthorized"));
    try {
        const dataToUpdate = yield KingStanding_1.default.findOne({ year: updateObject.year });
        // if there is no data, just write to the db
        if (!dataToUpdate) {
            const newData = yield KingStanding_1.default.create(data);
            if (!newData)
                return next((0, error_1.errorHandler)(400, "Something went wrong"));
            return res.status(200).json(newData);
        }
        // if there is, delete it, then replace it
        const deleteData = yield KingStanding_1.default.deleteOne({ year: updateObject.year });
        if (deleteData) {
            const newData = yield KingStanding_1.default.create(data);
            if (!newData)
                return next((0, error_1.errorHandler)(400, "Something went wrong"));
            return res.status(200).json(newData);
        }
        return next((0, error_1.errorHandler)(400, "Something went wrong"));
    }
    catch (error) {
        next(error);
    }
});
exports.updateData = updateData;
// need to add updateResults & updateStandings
