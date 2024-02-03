"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const kingController_1 = require("../controllers/kingController");
const verifyAdmin_1 = require("../utils/verifyAdmin");
const router = express_1.default.Router();
router.get("/data", kingController_1.getData);
router.post("/data", verifyAdmin_1.verifyAdmin, kingController_1.updateData);
exports.default = router;
