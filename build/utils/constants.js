"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const constants = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    BASE_URL: process.env.BASE_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};
exports.default = constants;
