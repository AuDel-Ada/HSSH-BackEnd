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
Object.defineProperty(exports, "__esModule", { value: true });
const ArtistService_1 = require("../service/ArtistService");
const signupArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, ArtistService_1.createArtist)(req.body);
        return res.status(201).json({ message: 'Artist created' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Artist not created' });
    }
});
const loginArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, ArtistService_1.artistConnection)(req.body);
        if (!result) {
            return res.status(401).json({ message: 'Login/Password not correct' });
        }
        return res.status(200).json({ result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const readArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artistId = req.params.artistId;
    try {
        const artist = yield (0, ArtistService_1.readOneArtist)(artistId);
        if (!artist) {
            return res.status(404).json({ message: 'not found' });
        }
        return res.status(200).json({ artist: artist });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const readAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artists = yield (0, ArtistService_1.readAllArtists)();
        return res.status(200).json({ artists: artists });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const readAllNfts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nfts = yield (0, ArtistService_1.allNfts)();
        return res.status(200).json({ nfts });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const updateArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artistId = req.params.artistId;
    try {
        try {
            const newArtist = yield (0, ArtistService_1.updateOneArtist)(artistId, req.body);
            return res.status(201).json({ artist: newArtist });
        }
        catch (error) {
            return res.status(500).json({ error });
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const deleteArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, ArtistService_1.deleteOneArtist)(req.params.artistId)) {
            return res.status(404).json({ message: 'not found' });
        }
        return res.status(201).json({ message: 'Deleted' });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.default = {
    signupArtist: signupArtist,
    loginArtist: loginArtist,
    readArtist: readArtist,
    readAllNfts: readAllNfts,
    readAll,
    updateArtist: updateArtist,
    deleteArtist: deleteArtist,
};
