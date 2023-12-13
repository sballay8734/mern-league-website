"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const recordsRoute_1 = __importDefault(require("./routes/recordsRoute"));
const ownersRoute_1 = __importDefault(require("./routes/ownersRoute"));
const kingsRoute_1 = __importDefault(require("./routes/kingsRoute"));
const updateProfileRoute_1 = __importDefault(require("./routes/updateProfileRoute"));
const postsRoute_1 = __importDefault(require("./routes/postsRoute"));
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.mongoURI)
    .then(() => {
    console.log("Connected to DB!");
})
    .catch((err) => console.log(err));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Running on port ${port}`));
app.use("/api/auth", authRoute_1.default);
app.use("/api/records", recordsRoute_1.default);
app.use("/api/owners", ownersRoute_1.default);
app.use("/api/kings", kingsRoute_1.default);
app.use("/api/profile", updateProfileRoute_1.default);
app.use("/api/posts", postsRoute_1.default);
const clientDistPath = path_1.default.join(__dirname, "../client/dist");
app.use(express_1.default.static(clientDistPath));
// Adjusted path for sending the index.html file
const indexPath = path_1.default.join(__dirname, "../client/dist/index.html");
app.get("*", (req, res) => {
    res.sendFile(indexPath);
});
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
