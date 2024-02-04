"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recordsController_1 = require("../controllers/recordsController");
const verifyAdmin_1 = require("../utils/verifyAdmin");
const router = express_1.default.Router();
router.get("/", recordsController_1.getRecords);
router.post("/", verifyAdmin_1.verifyAdmin, recordsController_1.setRecords);
exports.default = router;
