"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyUser_1 = require("./../utils/verifyUser");
const propsController_1 = require("../controllers/propsController");
const router = express_1.default.Router();
router.post("/create-props", verifyUser_1.verifyUser, propsController_1.createProps);
router.get("/get-props/:week/:year", propsController_1.getProps);
router.post("/update-prop", verifyUser_1.verifyUser, propsController_1.updateProp);
router.post("/accept-challenge", verifyUser_1.verifyUser, propsController_1.acceptChallenge);
router.post("/create-challenge", verifyUser_1.verifyUser, propsController_1.createChallenge);
router.get("/get-challenges/:gameId/:propId", propsController_1.getChallenges);
router.get("/get-challenges-to-update", propsController_1.getChallengesToUpdate);
exports.default = router;
