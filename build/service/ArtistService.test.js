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
const Artist_1 = __importDefault(require("../model/Artist"));
const ArtistService_1 = require("./ArtistService");
const bcrypt_1 = __importDefault(require("bcrypt"));
describe('Artist Service', () => {
    const artistExample = [
        {
            id: '0',
            name: 'Alain',
            email: 'aa@bb.com',
            password: '1234',
            pronouns: undefined,
            bio: undefined,
            country: undefined,
            smartContractNumber: ['0xdeadbeef1'],
        },
        {
            id: '1',
            name: 'Chaima',
            email: 'cc@dd.com',
            password: '5678',
            pronouns: 'Male',
            bio: 'foo',
            country: 'usa',
            smartContractNumber: ['0xdeadbeef2', '0xdeadbeef3'],
        },
    ];
    test('Find all artists', () => __awaiter(void 0, void 0, void 0, function* () {
        //given
        jest.spyOn(Artist_1.default, 'find').mockReturnValue(artistExample);
        //when
        const res = yield (0, ArtistService_1.readAllArtists)();
        //then
        expect(res.length).toEqual(2);
    }));
    test('Find one artist', () => __awaiter(void 0, void 0, void 0, function* () {
        //given
        jest.spyOn(Artist_1.default, 'findById').mockReturnValue(artistExample[0]);
        //when
        const res = yield (0, ArtistService_1.readOneArtist)('id');
        //then
        expect(res).toEqual(artistExample[0]);
    }));
    test('Update one artist email', () => __awaiter(void 0, void 0, void 0, function* () {
        //given
        jest.spyOn(Artist_1.default, 'findById').mockReturnValue(artistExample[0]);
        jest.spyOn(Artist_1.default, 'updateOne').mockReturnValue({});
        //when
        const res = yield (0, ArtistService_1.updateOneArtist)('id', { email: 'abc@abc.com' });
        //then
        expect(res === null || res === void 0 ? void 0 : res.name).toEqual(artistExample[0].name);
        expect(res === null || res === void 0 ? void 0 : res.email).toEqual('abc@abc.com');
        expect(res === null || res === void 0 ? void 0 : res.password).toEqual(artistExample[0].password);
        expect(res === null || res === void 0 ? void 0 : res.pronouns).toEqual(artistExample[0].pronouns);
        expect(res === null || res === void 0 ? void 0 : res.bio).toEqual(artistExample[0].bio);
        expect(res === null || res === void 0 ? void 0 : res.country).toEqual(artistExample[0].country);
        expect(res === null || res === void 0 ? void 0 : res.smartContractNumber).toEqual(artistExample[0].smartContractNumber);
    }));
    test('Update one artist name but not password', () => __awaiter(void 0, void 0, void 0, function* () {
        //given
        jest.spyOn(Artist_1.default, 'findById').mockReturnValue(artistExample[0]);
        jest.spyOn(Artist_1.default, 'updateOne').mockReturnValue({});
        //when
        const res = yield (0, ArtistService_1.updateOneArtist)('id', {
            name: 'a',
            password: 'pass',
        });
        //then
        expect(res === null || res === void 0 ? void 0 : res.name).toEqual('a');
        expect(res === null || res === void 0 ? void 0 : res.email).toEqual(artistExample[0].email);
        expect(res === null || res === void 0 ? void 0 : res.password).toEqual(artistExample[0].password);
        expect(res === null || res === void 0 ? void 0 : res.pronouns).toEqual(artistExample[0].pronouns);
        expect(res === null || res === void 0 ? void 0 : res.bio).toEqual(artistExample[0].bio);
        expect(res === null || res === void 0 ? void 0 : res.country).toEqual(artistExample[0].country);
        expect(res === null || res === void 0 ? void 0 : res.smartContractNumber).toEqual(artistExample[0].smartContractNumber);
    }));
    test('Update one artist gender and nationality', () => __awaiter(void 0, void 0, void 0, function* () {
        //given
        jest.spyOn(Artist_1.default, 'findById').mockReturnValue(artistExample[1]);
        jest.spyOn(Artist_1.default, 'updateOne').mockReturnValue({});
        //when
        const res = yield (0, ArtistService_1.updateOneArtist)('id', {
            gender: undefined, nationality: 'fr'
        });
        //then
        expect(res === null || res === void 0 ? void 0 : res.name).toEqual(artistExample[1].name);
        expect(res === null || res === void 0 ? void 0 : res.email).toEqual(artistExample[1].email);
        expect(res === null || res === void 0 ? void 0 : res.password).toEqual(artistExample[1].password);
        expect(res === null || res === void 0 ? void 0 : res.pronouns).toEqual(artistExample[1].pronouns);
        expect(res === null || res === void 0 ? void 0 : res.bio).toEqual(artistExample[1].bio);
        expect(res === null || res === void 0 ? void 0 : res.country).toEqual('fr');
        expect(res === null || res === void 0 ? void 0 : res.smartContractNumber).toEqual(artistExample[1].smartContractNumber);
    }));
    test('Add a smart contract number', () => __awaiter(void 0, void 0, void 0, function* () {
        //given
        jest.spyOn(Artist_1.default, 'findById').mockReturnValue(artistExample[1]);
        jest.spyOn(Artist_1.default, 'updateOne').mockReturnValue({});
        //when
        const res = yield (0, ArtistService_1.updateOneArtist)('id', {
            smartContractNumber: ['0xdeadbeef4']
        });
        //then
        expect(res === null || res === void 0 ? void 0 : res.name).toEqual(artistExample[1].name);
        expect(res === null || res === void 0 ? void 0 : res.email).toEqual(artistExample[1].email);
        expect(res === null || res === void 0 ? void 0 : res.password).toEqual(artistExample[1].password);
        expect(res === null || res === void 0 ? void 0 : res.pronouns).toEqual(artistExample[1].pronouns);
        expect(res === null || res === void 0 ? void 0 : res.bio).toEqual(artistExample[1].bio);
        expect(res === null || res === void 0 ? void 0 : res.country).toEqual(artistExample[1].country);
        expect(res === null || res === void 0 ? void 0 : res.smartContractNumber).toEqual([
            '0xdeadbeef2',
            '0xdeadbeef3',
            '0xdeadbeef4',
        ]);
    }));
    test('Update bio', () => __awaiter(void 0, void 0, void 0, function* () {
        //given
        jest.spyOn(Artist_1.default, 'findById').mockReturnValue(artistExample[1]);
        jest.spyOn(Artist_1.default, 'updateOne').mockReturnValue({});
        //when
        const res = yield (0, ArtistService_1.updateOneArtist)('id', {
            bio: 'blablabla',
        });
        //then
        expect(res === null || res === void 0 ? void 0 : res.name).toEqual(artistExample[1].name);
        expect(res === null || res === void 0 ? void 0 : res.email).toEqual(artistExample[1].email);
        expect(res === null || res === void 0 ? void 0 : res.password).toEqual(artistExample[1].password);
        expect(res === null || res === void 0 ? void 0 : res.pronouns).toEqual(artistExample[1].pronouns);
        expect(res === null || res === void 0 ? void 0 : res.bio).toEqual('blablabla');
        expect(res === null || res === void 0 ? void 0 : res.country).toEqual(artistExample[1].country);
        expect(res === null || res === void 0 ? void 0 : res.smartContractNumber).toEqual(artistExample[1].smartContractNumber);
    }));
    test('Create Artist', () => __awaiter(void 0, void 0, void 0, function* () {
        //given
        jest.spyOn(bcrypt_1.default, 'hash').mockReturnValue(artistExample[0].password);
        // jest.spyOn(Artist, 'save').mockReturnValue({} as any);
        //when
        const res = yield (0, ArtistService_1.createArtist)({
            name: 'aurelie',
            email: 'qwerty@gm.com',
            password: '0987',
            pronouns: 'female',
            bio: 'blablabla',
            country: 'fr',
            smartContractNumber: ['0xdeadbeef6'],
        });
        //then
        expect(res === null || res === void 0 ? void 0 : res.name).toEqual('aurelie');
        expect(res === null || res === void 0 ? void 0 : res.email).toEqual('qwerty@gm.com');
        expect(res === null || res === void 0 ? void 0 : res.password).toEqual('0987');
        expect(res === null || res === void 0 ? void 0 : res.pronouns).toEqual('female');
        expect(res === null || res === void 0 ? void 0 : res.bio).toEqual('blablabla');
        expect(res === null || res === void 0 ? void 0 : res.country).toEqual('fr');
        expect(res === null || res === void 0 ? void 0 : res.smartContractNumber).toEqual(['0xdeadbeef6']);
    }));
    test('Artist is logging in', () => __awaiter(void 0, void 0, void 0, function* () {
        //given
        jest
            .spyOn(Artist_1.default, 'findOne')
            .mockReturnValue(artistExample[0]);
        jest.spyOn(bcrypt_1.default, 'compare').mockReturnValue({});
        //when
        const res = yield (0, ArtistService_1.artistConnection)({
            email: 'aa@bb.com',
            password: '1234',
        });
        //then
        expect(res).toEqual({
            artistId: '0',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzU3OTIxMzksImV4cCI6MTY3NTg3ODUzOX0.Nlv_vBlWpkWbyYrMD6rPa89b5ykyAum9YzLg9wbOHRY',
        });
    }));
});
