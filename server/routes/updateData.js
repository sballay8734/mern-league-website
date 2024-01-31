"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const staticDataController_1 = require("../controllers/staticDataController");
const verifyAdmin_1 = require("../utils/verifyAdmin");
const router = express_1.default.Router();
router.post("/static", verifyAdmin_1.verifyAdmin, staticDataController_1.updateStatic);
exports.default = router;
