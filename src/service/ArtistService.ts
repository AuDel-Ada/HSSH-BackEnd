import mongoose from 'mongoose';
import Artist, { IArtist } from '../model/Artist';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const readAllArtists = () => {
  return Artist.find();
};

export const readOneArtist = (artistId: string) => {
  return Artist.findById(artistId);
};

export const updateOneArtist = async (artistId: string, update: IArtist) => {
  const currentArtist = await Artist.findById(artistId);
  if (currentArtist) {
    const newArtist = {
      name: update.name || currentArtist.name,
      email: update.email || currentArtist.email,
      password: currentArtist.password,
      pronouns: update.pronouns || currentArtist.pronouns,
      bio: update.bio || currentArtist.bio,
      country: update.country || currentArtist.country,
      smartContractNumber: update.smartContractNumber
        ? [...currentArtist.smartContractNumber, ...update.smartContractNumber]
        : currentArtist.smartContractNumber,
    };
    await Artist.updateOne({ _id: currentArtist.id }, newArtist);
    return newArtist;
  }
};

export const createArtist = async (newArtist: IArtist) => {
  const hashedPassword = await bcrypt.hash(newArtist.password, 10);

  const artistCreated = new Artist({
    _id: new mongoose.Types.ObjectId(),
    name: newArtist.name,
    email: newArtist.email,
    password: hashedPassword,
    pronouns: newArtist.pronouns,
    bio: newArtist.bio,
    country: newArtist.country,
    smartContractNumber: newArtist.smartContractNumber,
  });

  return artistCreated.save();
};

export const artistConnection = async (artistInfo: IArtist) => {
  const artist = await Artist.findOne({ email: artistInfo.email });
  if (
    !artist ||
    !(await bcrypt.compare(artistInfo.password, artist.password))
  ) {
    return false;
  } else {
    return {
      artistId: artist._id,
      token: jwt.sign({ artistId: artist._id }, 'RANDOM_TOKEN_SECRET', {
        expiresIn: '24h',
      }),
    };
  }
};

export const allNfts = async () => {
  const artists = await Artist.find();
  const nfts = [];

  for (const artist of artists) {
    const currentNfts = artist.smartContractNumber;
    nfts.push(...currentNfts);
  }
  return nfts;
};

export const deleteOneArtist = async (artistId: string) => {
  return await Artist.findByIdAndDelete(artistId);
};
