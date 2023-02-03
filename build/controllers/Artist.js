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
const mongoose_1 = __importDefault(require("mongoose"));
const Artist_1 = __importDefault(require("../model/Artist"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
    const artist = new Artist_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender,
        bio: req.body.bio,
        nationality: req.body.nationality,
        smartContractNumber: req.body.smartContractNumber,
    });
    try {
        yield artist.save();
        return res.status(201).json({ message: 'Artist created' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Artist not created' });
    }
});
const loginArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artist = yield Artist_1.default.findOne({ email: req.body.email });
        if (!artist) {
            return res.status(401).json({ message: 'Login/Password incorrect' });
        }
        else {
            try {
                const valid = yield bcrypt_1.default.compare(req.body.password, artist.password);
                if (!valid) {
                    return res.status(401).json({ message: 'Login/Password incorrect' });
                }
                return res.status(200).json({
                    artistId: artist._id,
                    token: jsonwebtoken_1.default.sign({ artistId: artist._id }, 'RANDOM_TOKEN_SECRET', {
                        expiresIn: '24h',
                    }),
                });
            }
            catch (error) {
                return res.status(500).json({ error });
            }
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const readArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artistId = req.params.artistId;
    try {
        const artist = yield Artist_1.default.findById(artistId);
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
        const artists = yield Artist_1.default.find();
        return res.status(200).json({ artists: artists });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const readAllNfts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artists = yield Artist_1.default.find();
    const nfts = [];
    try {
        for (const artist of artists) {
            const currentNfts = artist.smartContractNumber;
            nfts.push(...currentNfts);
        }
        return res.status(200).json({ nfts });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const updateArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artistId = req.params.artistId;
    try {
        const artistUpdated = yield Artist_1.default.findById(artistId);
        if (artistUpdated) {
            try {
                artistUpdated.set(req.body);
                yield artistUpdated.save();
                return res.status(201).json({ artistUpdated });
            }
            catch (error) {
                return res.status(500).json({ error });
            }
        }
        else {
            return res.status(404).json({ message: 'not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const deleteArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artistId = req.params.artistId;
    try {
        const artistDeleted = yield Artist_1.default.findByIdAndDelete(artistId);
        if (!artistDeleted) {
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
