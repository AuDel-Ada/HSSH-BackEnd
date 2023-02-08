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
exports.deleteOneArtist = exports.allNfts = exports.artistConnection = exports.createArtist = exports.updateOneArtist = exports.readOneArtist = exports.readAllArtists = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Artist_1 = __importDefault(require("../model/Artist"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const readAllArtists = () => {
    return Artist_1.default.find();
};
exports.readAllArtists = readAllArtists;
const readOneArtist = (artistId) => {
    return Artist_1.default.findById(artistId);
};
exports.readOneArtist = readOneArtist;
const updateOneArtist = (artistId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const currentArtist = yield Artist_1.default.findById(artistId);
    if (currentArtist) {
        const newArtist = {
            name: update.name || currentArtist.name,
            email: update.email || currentArtist.email,
            password: currentArtist.password,
            gender: update.gender || currentArtist.gender,
            bio: update.bio || currentArtist.bio,
            nationality: update.nationality || currentArtist.nationality,
            smartContractNumber: update.smartContractNumber
                ? [...currentArtist.smartContractNumber, ...update.smartContractNumber]
                : currentArtist.smartContractNumber,
        };
        yield Artist_1.default.updateOne({ id: currentArtist.id }, newArtist);
        return newArtist;
    }
});
exports.updateOneArtist = updateOneArtist;
const createArtist = (newArtist) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(newArtist.password, 10);
    const artistCreated = new Artist_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: newArtist.name,
        email: newArtist.email,
        password: hashedPassword,
        gender: newArtist.gender,
        bio: newArtist.bio,
        nationality: newArtist.nationality,
        smartContractNumber: newArtist.smartContractNumber,
    });
    return artistCreated.save();
});
exports.createArtist = createArtist;
const artistConnection = (artistInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const artist = yield Artist_1.default.findOne({ email: artistInfo.email });
    if (!artist ||
        !(yield bcrypt_1.default.compare(artistInfo.password, artist.password))) {
        return false;
    }
    else {
        return {
            artistId: artist._id,
            token: jsonwebtoken_1.default.sign({ artistId: artist._id }, 'RANDOM_TOKEN_SECRET', {
                expiresIn: '24h',
            }),
        };
    }
});
exports.artistConnection = artistConnection;
const allNfts = () => __awaiter(void 0, void 0, void 0, function* () {
    const artists = yield Artist_1.default.find();
    const nfts = [];
    for (const artist of artists) {
        const currentNfts = artist.smartContractNumber;
        nfts.push(...currentNfts);
    }
    return nfts;
});
exports.allNfts = allNfts;
const deleteOneArtist = (artistId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Artist_1.default.findByIdAndDelete(artistId);
});
exports.deleteOneArtist = deleteOneArtist;
