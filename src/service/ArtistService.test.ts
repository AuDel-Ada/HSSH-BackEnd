import { Query } from 'mongoose';
import Artist from '../model/Artist';
import {
  artistConnection,
  createArtist,
  readAllArtists,
  readOneArtist,
  updateOneArtist,
} from './ArtistService';
import bcrypt from 'bcrypt';

describe('Artist Service', () => {
  const artistExample = [
    {
      id: '0',
      name: 'Alain',
      email: 'aa@bb.com',
      password: '1234',
      gender: undefined,
      bio: undefined,
      nationality: undefined,
      smartContractNumber: ['0xdeadbeef1'],
    },
    {
      id: '1',
      name: 'Chaima',
      email: 'cc@dd.com',
      password: '5678',
      gender: 'Male',
      bio: 'foo',
      nationality: 'usa',
      smartContractNumber: ['0xdeadbeef2', '0xdeadbeef3'],
    },
  ];

  test('Find all artists', async () => {
    //given
    jest.spyOn(Artist, 'find').mockReturnValue(artistExample as any);
    //when
    const res = await readAllArtists();
    //then
    expect(res.length).toEqual(2);
  });

  test('Find one artist', async () => {
    //given
    jest.spyOn(Artist, 'findById').mockReturnValue(artistExample[0] as any);
    //when
    const res = await readOneArtist('id');
    //then
    expect(res).toEqual(artistExample[0]);
  });

  test('Update one artist email', async () => {
    //given
    jest.spyOn(Artist, 'findById').mockReturnValue(artistExample[0] as any);
    jest.spyOn(Artist, 'updateOne').mockReturnValue({} as any);
    //when
    const res = await updateOneArtist('id', { email: 'abc@abc.com' } as any);
    //then
    expect(res?.name).toEqual(artistExample[0].name);
    expect(res?.email).toEqual('abc@abc.com');
    expect(res?.password).toEqual(artistExample[0].password);
    expect(res?.gender).toEqual(artistExample[0].gender);
    expect(res?.bio).toEqual(artistExample[0].bio);
    expect(res?.nationality).toEqual(artistExample[0].nationality);
    expect(res?.smartContractNumber).toEqual(
      artistExample[0].smartContractNumber
    );
  });

  test('Update one artist name but not password', async () => {
    //given
    jest.spyOn(Artist, 'findById').mockReturnValue(artistExample[0] as any);
    jest.spyOn(Artist, 'updateOne').mockReturnValue({} as any);
    //when
    const res = await updateOneArtist('id', {
      name: 'a',
      password: 'pass',
    } as any);
    //then
    expect(res?.name).toEqual('a');
    expect(res?.email).toEqual(artistExample[0].email);
    expect(res?.password).toEqual(artistExample[0].password);
    expect(res?.gender).toEqual(artistExample[0].gender);
    expect(res?.bio).toEqual(artistExample[0].bio);
    expect(res?.nationality).toEqual(artistExample[0].nationality);
    expect(res?.smartContractNumber).toEqual(
      artistExample[0].smartContractNumber
    );
  });

  test('Update one artist gender and nationality', async () => {
    //given
    jest.spyOn(Artist, 'findById').mockReturnValue(artistExample[1] as any);
    jest.spyOn(Artist, 'updateOne').mockReturnValue({} as any);
    //when
    const res = await updateOneArtist('id', {
      gender: undefined, nationality: 'fr'
    } as any);
    //then
    expect(res?.name).toEqual(artistExample[1].name);
    expect(res?.email).toEqual(artistExample[1].email);
    expect(res?.password).toEqual(artistExample[1].password);
    expect(res?.gender).toEqual(artistExample[1].gender);
    expect(res?.bio).toEqual(artistExample[1].bio);
    expect(res?.nationality).toEqual('fr');
    expect(res?.smartContractNumber).toEqual(
      artistExample[1].smartContractNumber
    );
  });

  test('Add a smart contract number', async () => {
    //given
    jest.spyOn(Artist, 'findById').mockReturnValue(artistExample[1] as any);
    jest.spyOn(Artist, 'updateOne').mockReturnValue({} as any);
    //when
    const res = await updateOneArtist('id', {
      smartContractNumber:['0xdeadbeef4']
    } as any);
    //then
    expect(res?.name).toEqual(artistExample[1].name);
    expect(res?.email).toEqual(artistExample[1].email);
    expect(res?.password).toEqual(artistExample[1].password);
    expect(res?.gender).toEqual(artistExample[1].gender);
    expect(res?.bio).toEqual(artistExample[1].bio);
    expect(res?.nationality).toEqual(artistExample[1].nationality);
    expect(res?.smartContractNumber).toEqual([
      '0xdeadbeef2',
      '0xdeadbeef3',
      '0xdeadbeef4',
    ]);
  });

  test('Update bio', async () => {
    //given
    jest.spyOn(Artist, 'findById').mockReturnValue(artistExample[1] as any);
    jest.spyOn(Artist, 'updateOne').mockReturnValue({} as any);
    //when
    const res = await updateOneArtist('id', {
      bio: 'blablabla',
    } as any);
    //then
    expect(res?.name).toEqual(artistExample[1].name);
    expect(res?.email).toEqual(artistExample[1].email);
    expect(res?.password).toEqual(artistExample[1].password);
    expect(res?.gender).toEqual(artistExample[1].gender);
    expect(res?.bio).toEqual('blablabla');
    expect(res?.nationality).toEqual(artistExample[1].nationality);
    expect(res?.smartContractNumber).toEqual(artistExample[1].smartContractNumber);
  });

  test('Create Artist', async () => {
    //given
    jest.spyOn(bcrypt, 'hash').mockReturnValue(artistExample[0].password as any);
    // jest.spyOn(Artist, 'save').mockReturnValue({} as any);
    //when
    const res = await createArtist({
    name: 'aurelie',
    email: 'qwerty@gm.com',
    password: '0987',
    gender: 'female',
    bio: 'blablabla',
    nationality: 'fr',
    smartContractNumber: ['0xdeadbeef6']
    } as any);
    //then
    expect(res?.name).toEqual('aurelie');
    expect(res?.email).toEqual('qwerty@gm.com');
    expect(res?.password).toEqual('0987');
    expect(res?.gender).toEqual('female');
    expect(res?.bio).toEqual('blablabla');
    expect(res?.nationality).toEqual('fr');
    expect(res?.smartContractNumber).toEqual(['0xdeadbeef6']);
  });

  test('Artist is logging in', async () => {
    //given
    jest
      .spyOn(Artist, 'findOne')
      .mockReturnValue(artistExample[0] as any);
    jest.spyOn(bcrypt, 'compare').mockReturnValue({} as any);
    //when
    const res = await artistConnection({
      email: 'aa@bb.com',
      password: '1234',
    } as any);
    //then
    expect(res).toEqual({
      artistId: '0',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzU3OTIxMzksImV4cCI6MTY3NTg3ODUzOX0.Nlv_vBlWpkWbyYrMD6rPa89b5ykyAum9YzLg9wbOHRY',
    });
  });
});
