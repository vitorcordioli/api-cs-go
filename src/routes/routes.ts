import { Router } from "express";
import * as playersController from "../controllers/players-controller";
import * as clubsController from "../controllers/clubs-controller";
import * as playersMiddleware from "../middlewares/players-middleware";
import * as clubsMiddleware from "../middlewares/clubs-middleware";

const router = Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: API health check
 *     tags:
 *       - Health Check
 *     responses:
 *       200:
 *         description: API is online
 */
router.get('/', playersController.checkApiStatus);

/**
 * @openapi
 * /players:
 *   get:
 *     summary: List all players
 *     tags:
 *       - Players
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter players by role (e.g. IGL, AWPer, Rifler)
 *     responses:
 *       200:
 *         description: List of players returned successfully
 *       500:
 *         description: Internal server error
 */
router.get('/players', playersController.getAllPlayers);

/**
 * @openapi
 * /players/{id}:
 *   get:
 *     summary: Get player by ID
 *     tags:
 *       - Players
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Player returned successfully
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.get('/players/:id', playersController.getPlayerById);

/**
 * @openapi
 * /players:
 *   post:
 *     summary: Create a new player
 *     tags:
 *       - Players
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamId:
 *                 type: integer
 *                 example: 4
 *               player:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: fallen
 *                   age:
 *                     type: integer
 *                     example: 32
 *                   role:
 *                     type: string
 *                     example: IGL
 *     responses:
 *       201:
 *         description: Player created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/players', playersMiddleware.validatePostPlayer, playersController.postPlayer);

/**
 * @openapi
 * /players/{id}:
 *   delete:
 *     summary: Delete a player
 *     tags:
 *       - Players
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Player deleted successfully
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.delete('/players/:id', playersController.deletePlayer);

/**
 * @openapi
 * /players/{id}/release:
 *   delete:
 *     summary: Release player to Free Agents
 *     tags:
 *       - Players
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Player released successfully
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.delete('/players/:id/release', playersController.removePlayerFromClub);

/**
 * @openapi
 * /players/{id}:
 *   patch:
 *     summary: Update player info
 *     tags:
 *       - Players
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               player:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: fallen
 *                   age:
 *                     type: integer
 *                     example: 32
 *                   role:
 *                     type: string
 *                     example: AWPer
 *     responses:
 *       200:
 *         description: Player updated successfully
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.patch('/players/:id', playersMiddleware.validatePatchPlayer, playersController.patchPlayer);

/**
 * @openapi
 * /players/{id}/transfer:
 *   patch:
 *     summary: Transfer player to another club
 *     tags:
 *       - Players
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Player transferred successfully
 *       404:
 *         description: Player or club not found
 *       500:
 *         description: Internal server error
 */
router.patch('/players/:id/transfer', playersMiddleware.validateTransferPlayer, playersController.transferPlayer);


/**
 * @openapi
 * /clubs:
 *   get:
 *     summary: List all clubs
 *     tags:
 *       - Clubs
 *     responses:
 *       200:
 *         description: List of clubs returned successfully
 *       500:
 *         description: Internal server error
 */
router.get('/clubs', clubsController.getAllClubs);

/**
 * @openapi
 * /clubs/{teamId}:
 *   get:
 *     summary: Get club by ID
 *     tags:
 *       - Clubs
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Club returned successfully
 *       404:
 *         description: Club not found
 *       500:
 *         description: Internal server error
 */
router.get('/clubs/:teamId', clubsController.getClubById);

/**
 * @openapi
 * /clubs:
 *   post:
 *     summary: Create a new club
 *     tags:
 *       - Clubs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team:
 *                 type: string
 *                 example: FURIA Esports
 *               players:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: fallen
 *                     age:
 *                       type: integer
 *                       example: 32
 *                     role:
 *                       type: string
 *                       example: IGL
 *     responses:
 *       201:
 *         description: Club created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/clubs', clubsMiddleware.validatePostClub, clubsController.postClub);

/**
 * @openapi
 * /clubs/{teamId}:
 *   delete:
 *     summary: Delete a club
 *     tags:
 *       - Clubs
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Club deleted successfully
 *       404:
 *         description: Club not found
 *       500:
 *         description: Internal server error
 */
router.delete('/clubs/:teamId', clubsController.deleteClub);

/**
 * @openapi
 * /clubs/{teamId}:
 *   patch:
 *     summary: Update club name
 *     tags:
 *       - Clubs
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team:
 *                 type: string
 *                 example: Team Liquid
 *     responses:
 *       200:
 *         description: Club updated successfully
 *       404:
 *         description: Club not found
 *       500:
 *         description: Internal server error
 */
router.patch('/clubs/:teamId', clubsMiddleware.validatePatchClub, clubsController.patchClubByName);

export default router;