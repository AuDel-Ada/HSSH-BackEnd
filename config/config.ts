import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL =
  `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@houseshowcluster.ng6pn9u.mongodb.net/`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};

console.log("UserName = ", MONGO_USERNAME)
console.log("PassWord = ", MONGO_PASSWORD)
console.log("URL = ", MONGO_URL)
console.log("Port = ", SERVER_PORT)