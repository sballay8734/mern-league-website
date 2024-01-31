"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ownersController_1 = require("../controllers/ownersController");
const router = express_1.default.Router();
router.get("/", ownersController_1.getOwners);
router.get("/users", ownersController_1.getUsers);
router.get("/static", ownersController_1.getStaticData);
exports.default = router;
