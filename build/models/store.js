"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const constants_1 = __importDefault(require("../utils/constants"));
const mongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const store = new mongoDBStore({
    uri: constants_1.default.MONGODB_URL,
    collection: 'sessions',
});
exports.default = store;
