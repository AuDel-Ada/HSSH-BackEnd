import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Artist from '../model/Artist';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signupArtist = async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const artist = new Artist({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    gender: req.body.gender,
    bio: req.body.bio,
    nationality: req.body.nationality,
    smartContractNumber: req.body.smartContractNumber,
  });

  try {
    await artist.save();
    return res.status(201).json({ message: 'Artist created' });
  } catch (error) {
    return res.status(500).json({ message: 'Artist not created' });
  }
};

const loginArtist = async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findOne({ email: req.body.email });
    if (!artist) {
      return res.status(401).json({ message: 'Login/Password incorrect' });
    } else {
      try {
        const valid = await bcrypt.compare(req.body.password, artist.password);
        if (!valid) {
          return res.status(401).json({ message: 'Login/Password incorrect' });
        }
        return res.status(200).json({
          artistId: artist._id,
          token: jwt.sign({ artistId: artist._id }, 'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h',
          }),
        });
      } catch (error) {
        return res.status(500).json({ error });
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readArtist = async (req: Request, res: Response) => {
  const artistId = req.params.artistId;
  try {
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: 'not found' });
    }
    return res.status(200).json({ artist: artist });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response) => {
  try {
    const artists = await Artist.find();
    return res.status(200).json({ artists: artists });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAllNfts = async (req: Request, res: Response) => {
  const artists = await Artist.find();
  const nfts = [];

  try {
    for (const artist of artists) {
      const currentNfts = artist.smartContractNumber;
      nfts.push(...currentNfts);
    }
    return res.status(200).json({ nfts });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateArtist = async (req: Request, res: Response) => {
  const artistId = req.params.artistId;

  try {
    const artistUpdated = await Artist.findById(artistId);
    if (artistUpdated) {
      try {
        artistUpdated.set(req.body);
        await artistUpdated.save();
        return res.status(201).json({ artistUpdated });
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      return res.status(404).json({ message: 'not found' });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteArtist = async (req: Request, res: Response) => {
  const artistId = req.params.artistId;
  try {
    const artistDeleted = await Artist.findByIdAndDelete(artistId);
    if (!artistDeleted) {
      return res.status(404).json({ message: 'not found' });
    }
    return res.status(201).json({ message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  signupArtist: signupArtist,
  loginArtist: loginArtist,
  readArtist: readArtist,
  readAllNfts: readAllNfts,
  readAll,
  updateArtist: updateArtist,
  deleteArtist: deleteArtist,
};
