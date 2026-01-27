import { Router } from "express";
import * as playersController from "../controllers/players-controller";
import * as clubsController from "../controllers/clubs-controller";

const router = Router();

router.get('/', playersController.checkApiStatus);
router.get('/players', playersController.getAllPlayers);
router.get('/players/:id', playersController.getPlayerById);
router.get('/players/role/:role', playersController.getPlayersByRole);
router.post('/players', playersController.postPlayer);
router.delete('/players/:id', playersController.deletePlayer);
router.patch('/players/:id', playersController.patchPlayer);

router.get('/clubs', clubsController.getAllClubs);
router.get('/clubs/:teamId', clubsController.getClubById);
router.post('/clubs', clubsController.postClub);

export default router;