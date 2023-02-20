import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
import artistRoutes from './routes/Artist';
import dotenv from 'dotenv';

const router = express();

// Connect to MongoDB using Fixie Socks
dotenv.config();

const host: string = process.env.FIXIE_SOCKS_HOST || '';
const fixieData = host.split(new RegExp('[/(:\\/@/]+'));

const connectDBwithFixie = async () => {
  try {
    await mongoose.connect(config.mongo.url, {
      retryWrites: true,
      w: 'majority',
      proxyUsername: fixieData[0],
      proxyPassword: fixieData[1],
      proxyHost: fixieData[2],
      proxyPort: Number(fixieData[3]),
    });
    Logging.info('Connected to mongoDB');
    StartServer();
  } catch (error) {
    Logging.error('Unable to connect:');
    Logging.error(error);
  }
};

connectDBwithFixie();

console.log('UserName = ', fixieData[0]);
console.log('PassWord = ', fixieData[1]);
console.log('Host = ', fixieData[2]);
console.log('Port = ', fixieData[3]);

// Only start the server if Mongo Connects
const StartServer = () => {
  router.use((req, res, next) => {
    //Log the request
    Logging.info(
      `Incomming -> Method: [${req.method}] - Url:[${req.url}] - IP: [${req.socket.remoteAddress}] `
    );

    res.on('finish', () => {
      //Log the response
      Logging.info(
        `Incomming -> Method: [${req.method}] - Url:[${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${req.statusCode}]  `
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** Rules of our API */
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method == 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      );
      return res.sendStatus(200).json({});
    }

    next();
  });

  //Routes
  router.use('/artists', artistRoutes);

  //Error Handling
  router.use((req, res) => {
    const error = new Error('not found');
    Logging.error(error);
    return res.sendStatus(404);
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}.`)
    );
};
