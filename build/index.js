"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const store_1 = __importDefault(require("./models/store"));
const routes_1 = require("./routes");
const checkAuth_1 = __importDefault(require("./utils/checkAuth"));
const constants_1 = __importDefault(require("./utils/constants"));
// constants
const PORT = 3000;
const app = (0, express_1.default)();
// session store handler
store_1.default.on('error', error => {
    console.error('MongoDB session store error:', error);
});
// middle-wares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: constants_1.default.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store_1.default,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// routes
app.use('/api/auth', routes_1.Auth);
// checks server heatlh
app.get('/api/health', checkAuth_1.default, (req, res) => {
    res.status(200).json({ success: true, data: { message: 'The server is up' } });
});
// initialize express server
app.listen(PORT, () => console.log(`🚀 🚀 🚀 App running in port ${PORT} 🚀 🚀 🚀`));
