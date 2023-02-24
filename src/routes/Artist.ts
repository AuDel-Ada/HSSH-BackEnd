import express from 'express';
import controller from '../controllers/ArtistController';
import { authorizationMiddleware } from '../service/auth';

const router = express.Router();

router.post('/', controller.signupArtist);
router.post('/login', controller.loginArtist);
router.get('/nfts', controller.readAllNfts);
router.get('/:artistId', controller.readArtist);
router.get('/', controller.readAll);
router.patch(
  '/:artistId',
  authorizationMiddleware('RANDOM_TOKEN_SECRET'),
  controller.updateArtist
);
router.delete(
  '/:artistId',
  authorizationMiddleware('RANDOM_TOKEN_SECRET'),
  controller.deleteArtist
);

export = router;
