import { Request, Response } from 'express';
import {
  allNfts,
  artistConnection,
  createArtist,
  deleteOneArtist,
  readAllArtists,
  readOneArtist,
  updateOneArtist,
} from '../service/ArtistService';

const signupArtist = async (req: Request, res: Response) => {
  try {
    await createArtist(req.body);
    return res.status(201).json({ message: 'Artist created' });
  } catch (error) {
    return res.status(500).json({ message: 'Artist not created' });
  }
};

const loginArtist = async (req: Request, res: Response) => {
  try {
    const result = await artistConnection(req.body);
    if (!result) {
      return res.status(401).json({ message: 'Login/Password not correct' });
    }
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readArtist = async (req: Request, res: Response) => {
  const artistId = req.params.artistId;
  try {
    const artist = await readOneArtist(artistId);
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
    const artists = await readAllArtists();
    return res.status(200).json({ artists: artists });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAllNfts = async (req: Request, res: Response) => {
  try {
    const nfts = await allNfts();
    return res.status(200).json({ nfts });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateArtist = async (req: Request, res: Response) => {
  const artistId = req.params.artistId;

  try {
    try {
      const newArtist = await updateOneArtist(artistId, req.body);
      return res.status(201).json({ artist: newArtist });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteArtist = async (req: Request, res: Response) => {
  try {
    if (!deleteOneArtist(req.params.artistId)) {
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
