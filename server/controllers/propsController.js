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
exports.submitProp = void 0;
const error_1 = require("../utils/error");
const PropSubmission_1 = __importDefault(require("../models/PropSubmission"));
const submitProp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return next((0, error_1.errorHandler)(400, "Unauthorized"));
    const propID = req.params.id;
    const userID = req.user.id;
    const incomingProp = req.body;
    if (incomingProp.endDate) {
        const propEndDate = new Date(incomingProp.endDate);
        const currentDate = new Date();
        // Check if the prop's endDate is before the current date
        if (propEndDate < currentDate) {
            return next((0, error_1.errorHandler)(400, "Game has already started"));
        }
    }
    try {
        const propExists = yield PropSubmission_1.default.findOne({ propID, userID });
        if (propExists) {
            const updatedProp = yield PropSubmission_1.default.findOneAndUpdate({ propID, userID }, 
            // might need to spread the current existing prop to avoid having to write the userID also
            { $set: Object.assign(Object.assign({}, incomingProp), { userID }) }, { new: true, runValidators: true });
            res.status(200).json(updatedProp);
        }
        else {
            const newProp = new PropSubmission_1.default(Object.assign(Object.assign({}, incomingProp), { userID }));
            const savedProp = yield newProp.save();
            if (savedProp) {
                res.status(200).json(savedProp);
            }
            else {
                next((0, error_1.errorHandler)(400, "Error creating prop submission"));
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.submitProp = submitProp;
