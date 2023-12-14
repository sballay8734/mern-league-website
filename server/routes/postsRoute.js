"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsController_1 = require("../controllers/postsController");
const verifyUser_1 = require("../utils/verifyUser");
const router = express_1.default.Router();
router.get("/proposals", postsController_1.getProposals);
router.post("/proposals", verifyUser_1.verifyUser, postsController_1.createProposal);
router.post("/proposals/:id", verifyUser_1.verifyUser, postsController_1.voteOnProposal);
router.post("/proposals/:id/comment", verifyUser_1.verifyUser, postsController_1.commentOnProposal);
router.post("/proposals/:id/reject", verifyUser_1.verifyUser, postsController_1.commishOverride);
router.post("/proposals/:id/reset", verifyUser_1.verifyUser, postsController_1.adminReset);
exports.default = router;
