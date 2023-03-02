import express from 'express';
import controller from '../controllers/ArtistController';
import { authorizationMiddleware } from '../service/auth';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const AUTH_SECRET = process.env.AUTH_SECRET;


router.post('/', controller.signupArtist);
router.post('/login', controller.loginArtist);
router.get('/nfts', controller.readAllNfts);
router.get('/:artistId', controller.readArtist);
router.get('/', controller.readAll);

router.patch(
  '/:artistId',
  authorizationMiddleware(AUTH_SECRET as string),
  controller.updateArtist
);
router.delete(
  '/:artistId',
  authorizationMiddleware(AUTH_SECRET as string),
  controller.deleteArtist
);

export = router;
