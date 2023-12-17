"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyUser_1 = require("./../utils/verifyUser");
const propsController_1 = require("../controllers/propsController");
const router = express_1.default.Router();
router.post("/:id", verifyUser_1.verifyUser, propsController_1.submitProp);
exports.default = router;
