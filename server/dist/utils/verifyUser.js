"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const verifyUser = (req, res, next) => {
    // check for token
    const token = req.cookies.access_token;
    if (!token)
        return next((0, error_1.errorHandler)(401, "Unauthorized"));
    // verify user using jwt
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return next((0, error_1.errorHandler)(403, "Forbidden"));
        req.user = user;
        next();
    });
};
exports.verifyUser = verifyUser;
