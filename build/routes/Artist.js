"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Artist_1 = __importDefault(require("../controllers/Artist"));
const router = express_1.default.Router();
router.post('/', Artist_1.default.signupArtist);
router.post('/login', Artist_1.default.loginArtist);
router.get('/nfts', Artist_1.default.readAllNfts);
router.get('/:artistId', Artist_1.default.readArtist);
router.get('/', Artist_1.default.readAll);
router.patch('/:artistId', Artist_1.default.updateArtist);
router.delete('/:artistId', Artist_1.default.deleteArtist);
module.exports = router;
