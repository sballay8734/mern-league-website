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
exports.updateRecord = exports.getRecords = void 0;
const Record_1 = __importDefault(require("../models/Record"));
const error_1 = require("../utils/error");
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
const updateRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newRecord = req.body;
    try {
        const updatedRecord = yield Record_1.default.findByIdAndUpdate(id, newRecord, {
            new: true,
            runValidators: true
        });
        if (!updatedRecord) {
            next((0, error_1.errorHandler)(404, "Record not found"));
        }
        res.status(200).json(updatedRecord);
    }
    catch (error) {
        next(error);
    }
});
exports.updateRecord = updateRecord;
