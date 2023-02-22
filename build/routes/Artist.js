"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const ArtistController_1 = __importDefault(require("../controllers/ArtistController"));
const router = express_1.default.Router();
router.post('/', ArtistController_1.default.signupArtist);
router.post('/login', ArtistController_1.default.loginArtist);
router.get('/nfts', ArtistController_1.default.readAllNfts);
router.get('/:artistId', ArtistController_1.default.readArtist);
router.get('/', ArtistController_1.default.readAll);
router.patch('/:artistId', ArtistController_1.default.updateArtist);
router.delete('/:artistId', ArtistController_1.default.deleteArtist);
module.exports = router;
