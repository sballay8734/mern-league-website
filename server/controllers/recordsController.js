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
exports.setRecords = exports.getRecords = void 0;
const error_1 = require("../utils/error");
const User_1 = __importDefault(require("../models/User"));
const Record_1 = __importDefault(require("../models/Record"));
const getRecords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield Record_1.default.find();
        res.status(200).json(records);
    }
    catch (error) {
        next(error);
    }
});
exports.getRecords = getRecords;
const setRecords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newRecords = req.body;
    console.log(newRecords);
    try {
        if (!req.user)
            return next((0, error_1.errorHandler)(400, "Unauthorized"));
        const userId = req.user.id;
        const user = yield User_1.default.findById(userId);
        if (!user)
            return next((0, error_1.errorHandler)(400, "User not found"));
        if (user.isAdmin === false)
            return next((0, error_1.errorHandler)(400, "Unauthorized"));
        // delete old records
        yield Record_1.default.deleteMany({});
        // write new data to Records using insertMany
        const updatedRecords = yield Record_1.default.create({ records: newRecords });
        if (!updatedRecords)
            return next((0, error_1.errorHandler)(500, "Something went wrong"));
        res.status(200).json(updatedRecords);
    }
    catch (error) {
        next(error);
    }
});
exports.setRecords = setRecords;
