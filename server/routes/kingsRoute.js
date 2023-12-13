"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const kingController_1 = require("../controllers/kingController");
const router = express_1.default.Router();
router.get("/results", kingController_1.results);
router.get("/standings", kingController_1.standings);
exports.default = router;
