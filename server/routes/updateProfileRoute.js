"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const updateProfileController_1 = require("../controllers/updateProfileController");
const verifyUser_1 = require("../utils/verifyUser");
const router = express_1.default.Router();
router.post("/update/:id", verifyUser_1.verifyUser, updateProfileController_1.updateProfile);
exports.default = router;
