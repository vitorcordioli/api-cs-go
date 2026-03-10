import { Router } from "express";
import * as playersController from "../controllers/players-controller";
import * as clubsController from "../controllers/clubs-controller";
import * as playersMiddleware from "../middlewares/players-middleware";
import * as clubsMiddleware from "../middlewares/clubs-middleware";

const router = Router();

router.get('/', playersController.checkApiStatus);
router.get('/players', playersController.getAllPlayers);
router.get('/players/:id', playersController.getPlayerById);
router.post('/players', playersMiddleware.validatePostPlayer, playersController.postPlayer);
router.delete('/players/:id', playersController.deletePlayer);
router.delete('/players/:id/release', playersController.removePlayerFromClub);
router.patch('/players/:id', playersMiddleware.validatePatchPlayer, playersController.patchPlayer);
router.patch('/players/:id/transfer', playersMiddleware.validateTransferPlayer,playersController.transferPlayer);

router.get('/clubs', clubsController.getAllClubs);
router.get('/clubs/:teamId', clubsController.getClubById);
router.post('/clubs', clubsMiddleware.validatePostClub, clubsController.postClub);
router.delete('/clubs/:teamId', clubsController.deleteClub);
router.patch('/clubs/:teamId', clubsMiddleware.validatePatchClub, clubsController.patchClubByName);

export default router;