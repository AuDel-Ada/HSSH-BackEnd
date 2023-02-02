"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
const logging_1 = __importDefault(require("../library/logging"));
const router = (0, express_1.default)();
// Connect to the Mongo DDB
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    logging_1.default.info('Connected to mongoDB');
    StartServer();
})
    .catch((error) => {
    logging_1.default.error('Unable to connect:');
    logging_1.default.error(error);
});
// Only start the server if Mongo Connnects
const StartServer = () => {
    router.use((req, res, next) => {
        //Log the request
        logging_1.default.info(`Incomming -> Method: [${req.method}] - Url:[${req.url}] - IP: [${req.socket.remoteAddress}] `);
        res.on('finish', () => {
            //Log the response
            logging_1.default.info(`Incomming -> Method: [${req.method}] - Url:[${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${req.statusCode}]  `);
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
    //Healthcheck
    router.get('/ping', (req, res) => {
        res.status(200).json({ message: 'pong' });
    });
    //Error Handlingß
    router.use((req, res) => {
        const error = new Error('not found');
        logging_1.default.error(error);
        return res.sendStatus(404);
    });
    http_1.default
        .createServer(router)
        .listen(config_1.config.server.port, () => logging_1.default.info(`Server is running on port ${config_1.config.server.port}.`));
};
