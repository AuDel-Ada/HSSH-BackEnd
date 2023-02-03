import express from 'express';
import controller from '../controllers/Artist';

const router = express.Router();

router.post('/', controller.signupArtist);
router.post('/login', controller.loginArtist);
router.get('/nfts', controller.readAllNfts);
router.get('/:artistId', controller.readArtist);
router.get('/', controller.readAll);
router.patch('/:artistId', controller.updateArtist);
router.delete('/:artistId', controller.deleteArtist);

export = router;
