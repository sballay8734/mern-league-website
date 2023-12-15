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
exports.editProposal = exports.adminReset = exports.commishOverride = exports.getProposals = exports.commentOnProposal = exports.voteOnProposal = exports.createProposal = void 0;
const Suggestion_1 = __importDefault(require("../models/Suggestion"));
const User_1 = __importDefault(require("../models/User"));
const error_1 = require("../utils/error");
const createProposal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return next((0, error_1.errorHandler)(400, "Unauthorized"));
    const userId = req.user.id;
    const user = yield User_1.default.findById(userId);
    if (user) {
        const userName = `${user.firstName} ${user.lastInitial}`;
        const proposalData = Object.assign(Object.assign({}, req.body), { userId: userId, userName: userName, upVoters: [userId] });
        try {
            const proposal = yield Suggestion_1.default.create(proposalData);
            if (proposal) {
                const proposalObject = proposal.toObject();
                res.status(200).json(proposalObject);
            }
            else {
                next((0, error_1.errorHandler)(400, "Something went wrong"));
            }
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next((0, error_1.errorHandler)(500, "Something went wrong"));
    }
});
exports.createProposal = createProposal;
// you could make a separate route to allow the creator to update the actual text and content. But for now, just stick with voting
// proposalId = 656f5932d2cf9d68ebe072cd
// userId = 656cda768f1c1f8685b2aa54
// action = "upvote"
const voteOnProposal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const proposalId = req.params.id;
        const proposal = yield Suggestion_1.default.findById(proposalId);
        if (!proposal) {
            next((0, error_1.errorHandler)(404, "Proposal not found"));
            return;
        }
        if (req.body.action === "upvote") {
            if (proposal.upVoters.includes(userId))
                return next((0, error_1.errorHandler)(400, "You already voted to approve"));
            if (proposal.downVoters.includes(userId)) {
                // remove userId from downvoters and decrement count
                const index = proposal.downVoters.indexOf(userId);
                proposal.downVoters.splice(index, 1);
                proposal.set({
                    "voteInfo.downVotes": proposal.voteInfo.downVotes - 1,
                    "voteInfo.upVotes": proposal.voteInfo.upVotes + 1,
                    upVoters: [...proposal.upVoters, userId]
                });
            }
            else {
                proposal.set({
                    "voteInfo.upVotes": proposal.voteInfo.upVotes + 1,
                    upVoters: [...proposal.upVoters, userId]
                });
            }
        }
        else if (req.body.action === "downvote") {
            if (proposal.downVoters.includes(userId))
                return next((0, error_1.errorHandler)(400, "You already voted to reject"));
            if (proposal.upVoters.includes(userId)) {
                // remove userId from upvoters and decrement count
                const index = proposal.upVoters.indexOf(userId);
                proposal.upVoters.splice(index, 1);
                proposal.set({
                    "voteInfo.upVotes": proposal.voteInfo.upVotes - 1,
                    "voteInfo.downVotes": proposal.voteInfo.downVotes + 1,
                    downVoters: [...proposal.downVoters, userId]
                });
            }
            else {
                proposal.set({
                    "voteInfo.downVotes": proposal.voteInfo.downVotes + 1,
                    downVoters: [...proposal.downVoters, userId]
                });
            }
        }
        else {
            next((0, error_1.errorHandler)(400, "Something went wrong"));
            return;
        }
        const updatedProposal = yield proposal.save();
        const proposalObject = updatedProposal.toObject();
        res.status(200).json(proposalObject);
    }
    catch (error) {
        next(error);
    }
});
exports.voteOnProposal = voteOnProposal;
// proposalId = 656f5932d2cf9d68ebe072cd
// userId = 656cda768f1c1f8685b2aa54
// content = "lakjsdflkajsdlkfjas"
const commentOnProposal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const proposalId = req.params.id;
    const content = req.body.content;
    const userId = req.user.id;
    const proposal = yield Suggestion_1.default.findById(proposalId);
    if (!proposal) {
        next((0, error_1.errorHandler)(400, "Proposal not found"));
        return;
    }
    if (proposal.comments.length >= 10) {
        next((0, error_1.errorHandler)(400, "There are too many comments on this post"));
        return;
    }
    try {
        const user = yield User_1.default.findById(userId);
        if (user) {
            const userObject = user.toObject();
            const userName = `${userObject.firstName} ${userObject.lastInitial}`;
            proposal.set({
                comments: [...proposal.comments, { user: userName, comment: content }]
            });
        }
        else {
            next((0, error_1.errorHandler)(400, "User not found"));
        }
        const updatedProposal = yield proposal.save();
        if (updatedProposal) {
            const proposalObject = updatedProposal.toObject();
            res.status(200).json(proposalObject);
        }
        else {
            next((0, error_1.errorHandler)(400, "Error updating proposal comments"));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.commentOnProposal = commentOnProposal;
const getProposals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proposals = yield Suggestion_1.default.find();
        const proposalObjects = proposals.map((item) => item.toObject());
        res.status(200).json(proposalObjects);
    }
    catch (error) {
        next(error);
    }
});
exports.getProposals = getProposals;
const commishOverride = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return next((0, error_1.errorHandler)(401, "Unauthorized"));
    const action = req.body.action;
    if (action === "reject") {
        try {
            const proposalId = req.params.id;
            const userId = req.user.id;
            const proposal = yield Suggestion_1.default.findById(proposalId);
            const user = yield User_1.default.findById(userId);
            if (!proposal || !user)
                return next((0, error_1.errorHandler)(401, "Not found"));
            const userObject = user.toObject();
            if (userObject.isCommissioner === false) {
                return next((0, error_1.errorHandler)(400, "Only the commissioner can do that!"));
            }
            proposal.set({ commishVeto: true, status: "rejected" });
            const updatedProposal = yield proposal.save();
            if (updatedProposal) {
                const updatedProposalObject = updatedProposal.toObject();
                res.status(200).json(updatedProposalObject);
            }
            else {
                next((0, error_1.errorHandler)(400, "Error updating proposal"));
            }
        }
        catch (error) {
            next(error);
        }
    }
    else if (action === "approve") {
        try {
            const proposalId = req.params.id;
            const userId = req.user.id;
            const proposal = yield Suggestion_1.default.findById(proposalId);
            const user = yield User_1.default.findById(userId);
            if (!proposal || !user)
                return next((0, error_1.errorHandler)(401, "Not found"));
            const userObject = user.toObject();
            if (userObject.isCommissioner === false) {
                return next((0, error_1.errorHandler)(400, "Only the commissioner can do that!"));
            }
            proposal.set({ commishVeto: false, status: "approved" });
            const updatedProposal = yield proposal.save();
            if (updatedProposal) {
                const updatedProposalObject = updatedProposal.toObject();
                res.status(200).json(updatedProposalObject);
            }
            else {
                next((0, error_1.errorHandler)(400, "Error updating proposal"));
            }
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next((0, error_1.errorHandler)(500, "Something went wrong"));
    }
});
exports.commishOverride = commishOverride;
const adminReset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proposalId = req.params.id;
        const user = yield User_1.default.findById(req.user.id);
        if (!user || user.isAdmin === false) {
            return next((0, error_1.errorHandler)(400, "Unauthorized"));
        }
        const proposal = yield Suggestion_1.default.findById(proposalId);
        if (!proposal)
            return next((0, error_1.errorHandler)(400, "Proposal not found"));
        proposal.set({
            commishVeto: null,
            status: "pending"
        });
        const updatedProposal = yield proposal.save();
        if (!updatedProposal)
            return next((0, error_1.errorHandler)(400, "Error updating proposal"));
        const proposalObject = updatedProposal.toObject();
        res.status(200).json(proposalObject);
    }
    catch (error) {
        next(error);
    }
});
exports.adminReset = adminReset;
const editProposal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const proposalId = req.params.id;
        const newTitle = req.body.title;
        const newContent = req.body.content;
        const proposal = yield Suggestion_1.default.findById(proposalId);
        if (!proposal)
            return next((0, error_1.errorHandler)(400, "Proposal not found"));
        if (!req.user || userId !== proposal.userId)
            return next((0, error_1.errorHandler)(400, "Only the creator of the proposal may update it"));
        proposal.set({
            title: newTitle,
            content: newContent,
            status: "pending",
            voteInfo: { upVotes: 1, downVotes: 0 },
            upVoters: [userId],
            downVoters: [],
            dateProposed: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            })
        });
        const updatedProposal = yield proposal.save();
        if (!updatedProposal)
            return next((0, error_1.errorHandler)(400, "Could not update proposal"));
        const proposalObject = updatedProposal.toObject();
        res.status(200).json(proposalObject);
    }
    catch (error) {
        next(error);
    }
});
exports.editProposal = editProposal;
