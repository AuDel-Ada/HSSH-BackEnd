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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const logging_1 = __importDefault(require("./library/logging"));
const Artist_1 = __importDefault(require("./routes/Artist"));
const router = (0, express_1.default)();
// Connect to MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.config.mongo.url, {
            retryWrites: true,
            w: 'majority',
        });
        logging_1.default.info('Connected to mongoDB');
        StartServer();
    }
    catch (error) {
        logging_1.default.error('Unable to connect:');
        logging_1.default.error(error);
    }
});
connectDB();
// Only start the server if Mongo Connects
const StartServer = () => {
    router.use((req, res, next) => {
        //Log the request
        logging_1.default.info(`Incomming -> Method: [${req.method}] - Url:[${req.url}] - IP: [${req.socket.remoteAddress}] `);
        res.on('finish', () => {
            var _a;
            //Log the response
            logging_1.default.info(`Incomming -> Method: [${req.method}] - Url:[${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${(_a = req.res) === null || _a === void 0 ? void 0 : _a.statusCode}]  `);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.sendStatus(200).json({});
        }
        next();
    });
    //Routes
    router.use('/artists', Artist_1.default);
    //Error Handling
    router.use((req, res) => {
        const error = new Error('not found');
        logging_1.default.error(error);
        return res.sendStatus(404);
    });
    http_1.default
        .createServer(router)
        .listen(config_1.config.server.port, () => logging_1.default.info(`Server is running on port ${config_1.config.server.port}.`));
};
