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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.google = exports.signin = exports.signup = void 0;
const error_1 = require("../utils/error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailConfig_1 = require("../emailConfig");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastInitial } = req.body;
    if (!emailConfig_1.whitelistedEmails.includes(email)) {
        next((0, error_1.errorHandler)(400, "That email has not been whitelisted"));
        return;
    }
    if (!email || !password || !firstName || !lastInitial) {
        next((0, error_1.errorHandler)(400, "All fields are required"));
        return;
    }
    const hashedPassword = bcrypt_1.default.hashSync(password, 12);
    const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const capitalizedInitial = lastInitial.toUpperCase();
    try {
        const newUser = new User_1.default({
            email,
            password: hashedPassword,
            firstName: capitalizedName,
            lastInitial: capitalizedInitial
        });
        yield newUser.save();
        const userObject = newUser.toObject();
        const { password } = userObject, rest = __rest(userObject, ["password"]);
        res.status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const validUser = yield User_1.default.findOne({ email });
        if (!validUser)
            return next((0, error_1.errorHandler)(400, "User not found"));
        const validPassword = bcrypt_1.default.compareSync(password, validUser.password);
        if (!validPassword)
            return next((0, error_1.errorHandler)(401, "Invalid credentials"));
        const token = jsonwebtoken_1.default.sign({ id: validUser._id }, process.env.JWT_SECRET);
        // typescript thing
        const userObject = validUser.toObject();
        // take off password
        const { password: pass } = userObject, rest = __rest(userObject, ["password"]);
        res.cookie("access_token", token, { httpOnly: true }).status(201).json(rest);
    }
    catch (error) {
        next(error);
    }
});
exports.signin = signin;
const google = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { displayName, email } = req.body;
    if (!emailConfig_1.whitelistedEmails.includes(email)) {
        next((0, error_1.errorHandler)(401, "That email has not been whitelisted"));
        return;
    }
    // check if user exists
    try {
        const user = yield User_1.default.findOne({ email });
        if (user) {
            // sign in user if they do
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
            const userObject = user.toObject();
            const { password: pass } = userObject, rest = __rest(userObject, ["password"]);
            res
                .cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
        else {
            // if not, generate a random password and create a newUser
            const randomPassword = Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt_1.default.hashSync(randomPassword, 12);
            // then create them and sign them in
            const firstName = displayName.split(" ")[0].charAt(0).toUpperCase() +
                displayName.split(" ")[0].slice(1);
            let lastInitial = "";
            if (displayName.split(" ")[1]) {
                lastInitial = displayName.split(" ")[1].charAt(0).toUpperCase();
            }
            const newUser = new User_1.default({
                email,
                password: hashedPassword,
                firstName,
                lastInitial
            });
            yield newUser.save();
            const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const newUserObject = newUser.toObject();
            const { password: pass } = newUserObject, rest = __rest(newUserObject, ["password"]);
            res
                .cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.google = google;
