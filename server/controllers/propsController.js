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
exports.acceptChallenge = exports.getChallengesToUpdate = exports.getChallenges = exports.createChallenge = exports.getProps = exports.updateProp = exports.createProps = void 0;
const error_1 = require("../utils/error");
const Prop_1 = __importDefault(require("../models/Prop"));
const User_1 = __importDefault(require("../models/User"));
const Challenge_1 = __importDefault(require("../models/Challenge"));
const weekToNumConversion = {
    // Tuesday Morning (12:00am) ---> Monday Night (11:59pm)
    weekOne: 1,
    weekTwo: 2,
    weekThree: 3,
    weekFour: 4,
    weekFive: 5,
    weekSix: 6,
    weekSeven: 7,
    weekEight: 8,
    weekNine: 9,
    weekTen: 10,
    weekEleven: 11,
    weekTwelve: 12,
    weekThirteen: 13,
    weekFourteen: 14,
    weekFifteen: 15,
    weekSixteen: 16,
    weekSeventeen: 17,
    weekEighteen: 18,
    weekNineteen: 19,
    weekTwenty: 20,
    weekTwentyOne: 21,
    weekTwentyTwo: 22,
    weekTwentyThree: 23,
    testWeek: 53
};
const createProps = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const props = req.body.props;
    const weekYear = req.body.weekYear;
    const user = req.user;
    if (!user)
        return next((0, error_1.errorHandler)(400, "Unauthorized"));
    if (props.length < 1 || !weekYear)
        return next((0, error_1.errorHandler)(400, "ERROR!"));
    const propsAlreadyExistForWeek = yield Prop_1.default.findOne({ weekYear: weekYear });
    if (propsAlreadyExistForWeek) {
        res.status(400).json("Props have already been set for this week");
        return;
    }
    else {
        try {
            const newProps = yield Prop_1.default.insertMany(props);
            if (newProps) {
                res.status(200).json(newProps);
            }
            else {
                next((0, error_1.errorHandler)(500, "Whoops!"));
                return;
            }
        }
        catch (error) {
            next(error);
        }
    }
});
exports.createProps = createProps;
const updateProp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const action = req.body.action;
    const prop = req.body.prop;
    const userId = req.user.id;
    // get users name
    const currentUser = yield User_1.default.findById(userId);
    if (!currentUser)
        return next((0, error_1.errorHandler)(400, "Unauthorized"));
    const userObject = currentUser.toObject();
    const userName = userObject.fullName;
    // get prop
    const propExists = yield Prop_1.default.findOne({
        gameId: prop.gameId,
        uniqueId: prop.uniqueId
    });
    if (!propExists)
        return next((0, error_1.errorHandler)(400, "Could not find prop"));
    try {
        if (prop.type === "playerProp" || prop.type === "teamTotals") {
            if (action === "under") {
                // Might need to reword the line below
                if (!propExists.underSelections || !propExists.overSelections) {
                    return res.status(400).json("One of them doesn't exist!");
                }
                if ((_a = propExists.underSelections) === null || _a === void 0 ? void 0 : _a.includes(userName)) {
                    return res.status(400).json("You already voted the under!");
                }
                if ((_b = propExists.overSelections) === null || _b === void 0 ? void 0 : _b.includes(userName)) {
                    // remove from overSelections and add to underSelections
                    const index = propExists.overSelections.indexOf(userName);
                    propExists.overSelections.splice(index, 1);
                    if (!propExists.underSelections)
                        return next((0, error_1.errorHandler)(400, "NUS"));
                    propExists.set({
                        underSelections: [...propExists.underSelections, userName]
                    });
                    propExists.save();
                    return res.status(200).json("You have been SWITCHED to the under!");
                }
                propExists.set({
                    underSelections: [...propExists.underSelections, userName]
                });
                propExists.save();
                return res.status(200).json("You have been ADDED to under!");
            }
            else if (action === "over") {
                if (!propExists.underSelections || !propExists.overSelections) {
                    return res.status(400).json("One of them doesn't exist!");
                }
                if ((_c = propExists.overSelections) === null || _c === void 0 ? void 0 : _c.includes(userName)) {
                    return res.status(400).json("You already voted the over!");
                }
                if ((_d = propExists.underSelections) === null || _d === void 0 ? void 0 : _d.includes(userName)) {
                    // remove from underSelections and add to overSelections
                    const index = propExists.underSelections.indexOf(userName);
                    propExists.underSelections.splice(index, 1);
                    if (!propExists.overSelections)
                        return next((0, error_1.errorHandler)(400, "NUS"));
                    propExists.set({
                        overSelections: [...propExists.overSelections, userName]
                    });
                    propExists.save();
                    return res.status(200).json("You have been SWITCHED to the over!");
                    //
                }
                propExists.set({
                    overSelections: [...propExists.overSelections, userName]
                });
                propExists.save();
                res.status(200).json("You have been ADDED to the over!");
            }
        }
        else if (prop.type === "teamSpreads") {
            if (!propExists.homeLineSelections || !propExists.awayLineSelections) {
                return res.status(400).json("One of them doesn't exist!");
            }
            if (action === ((_e = prop.homeData) === null || _e === void 0 ? void 0 : _e.homeTeam)) {
                // if they voted for home, but were already in the home list
                if ((_f = propExists.homeLineSelections) === null || _f === void 0 ? void 0 : _f.includes(userName)) {
                    return res.status(400).json("You already bet on the HomeTeam!");
                }
                // if they voted for home but were in the away list
                if (propExists.awayLineSelections.includes(userName)) {
                    // remove them from the away list
                    const index = propExists.awayLineSelections.indexOf(userName);
                    propExists.awayLineSelections.splice(index, 1);
                    if (!propExists.awayLineSelections)
                        return next((0, error_1.errorHandler)(400, "NUS"));
                    // add them to the home list
                    propExists.set({
                        homeLineSelections: [...propExists.homeLineSelections, userName]
                    });
                    propExists.save();
                    return res.status(200).json("You have been SWITCHED to the HomeTeam!");
                }
                // add if name wasn't found in either list
                propExists.set({
                    homeLineSelections: [...propExists.homeLineSelections, userName]
                });
                propExists.save();
                return res.status(200).json("You have been ADDED to the AwayTeam!");
            }
            else if (action === ((_g = prop.awayData) === null || _g === void 0 ? void 0 : _g.awayTeam)) {
                // if they voted for away, but were already in the away list
                if ((_h = propExists.awayLineSelections) === null || _h === void 0 ? void 0 : _h.includes(userName)) {
                    return res.status(400).json("You already bet on the AwayTeam!");
                }
                if (propExists.homeLineSelections.includes(userName)) {
                    const index = propExists.homeLineSelections.indexOf(userName);
                    propExists.homeLineSelections.splice(index, 1);
                    if (!propExists.homeLineSelections)
                        return next((0, error_1.errorHandler)(400, "NUS"));
                    propExists.set({
                        awayLineSelections: [...propExists.awayLineSelections, userName]
                    });
                    propExists.save();
                    return res.status(200).json("You have been SWITCHED to the AwayTeam!");
                }
                propExists.set({
                    awayLineSelections: [...propExists.awayLineSelections, userName]
                });
                propExists.save();
                return res.status(200).json("You have been ADDED to the AwayTeam!");
            }
        }
        else {
            console.log("ERROR");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateProp = updateProp;
const getProps = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const week = req.params.week;
    const year = req.params.year;
    // add validation here
    try {
        const propsForThisWeek = yield Prop_1.default.find({
            week: weekToNumConversion[week],
            nflYear: Number(year)
        });
        // this needs to handle what happens if people visit the page when props havne't been submitted yet or if they have expired
        if (!propsForThisWeek || propsForThisWeek.length === 0) {
            res.status(404).json("No props found for this week");
            console.log("NO PROPS FOUND!");
            return;
        }
        res.status(200).json(propsForThisWeek);
    }
    catch (error) {
        next(error);
    }
});
exports.getProps = getProps;
const createChallenge = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return next((0, error_1.errorHandler)(400, "Unauthorized"));
    const challengerId = req.user.id;
    const gameId = req.body.gameId;
    const propId = req.body.uniqueId;
    const challenge = req.body.challenge;
    const formattedChallenge = {
        challengerId: challengerId,
        acceptorId: "",
        challengerName: challenge.challengerName,
        acceptorName: "",
        challengerSelection: challenge.challengerSelection,
        acceptorSelection: challenge.acceptorSelection,
        wagerAmount: challenge.wagerAmount,
        gameId: gameId,
        propId: propId,
        dateProposed: new Date().toISOString(),
        dateAccepted: "",
        voided: false
    };
    try {
        // try to create the challenge
        const newChallenge = yield Challenge_1.default.create(formattedChallenge);
        if (newChallenge) {
            return res.status(200).json(newChallenge);
        }
        return next((0, error_1.errorHandler)(500, "Could not create challenge"));
    }
    catch (error) {
        next(error);
    }
});
exports.createChallenge = createChallenge;
const getChallenges = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params.gameId;
    const propId = req.params.propId;
    const challenges = yield Challenge_1.default.find({ gameId: gameId, propId: propId });
    if (challenges)
        return res.status(200).json(challenges);
    return;
});
exports.getChallenges = getChallenges;
const getChallengesToUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const challenges = yield Challenge_1.default.find({ result: "" });
    if (challenges)
        return res.status(200).json(challenges);
    return;
});
exports.getChallengesToUpdate = getChallengesToUpdate;
const acceptChallenge = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const acceptorId = req.user.id;
    const acceptorName = req.body.acceptorName;
    const challengeId = req.body.challengeId;
    const challengerName = req.body.challengerName;
    const dateAccepted = new Date().toISOString();
    if (acceptorName === challengerName)
        return next((0, error_1.errorHandler)(400, "You cannot accept your own challenge!"));
    try {
        const challengeToUpdate = yield Challenge_1.default.findById(challengeId);
        if (!challengeToUpdate)
            return next((0, error_1.errorHandler)(404, "Prop not found!"));
        if (challengeToUpdate.acceptorName !== "")
            return next((0, error_1.errorHandler)(400, "Someone already accepted this!"));
        // Update the acceptorName if the challengeIndex is valid
        challengeToUpdate.acceptorName = acceptorName;
        challengeToUpdate.acceptorId = acceptorId;
        challengeToUpdate.dateAccepted = dateAccepted;
        // Save the updated document
        const updatedChallenge = yield challengeToUpdate.save();
        return res.status(200).json(updatedChallenge);
    }
    catch (error) {
        next(error);
    }
});
exports.acceptChallenge = acceptChallenge;
