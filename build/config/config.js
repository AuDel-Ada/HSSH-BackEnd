"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@houseshowcluster.ng6pn9u.mongodb.net/`;
const SERVER_PORT = process.env.PORT
    ? Number(process.env.PORT)
    : 8000;
exports.config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
};
console.log("UserName = ", MONGO_USERNAME);
console.log("PassWord = ", MONGO_PASSWORD);
console.log("URL = ", MONGO_URL);
console.log("Port = ", SERVER_PORT);
