import { Request, Response } from "express";
import * as playersService from "../services/players-services";
import DataResponseModel from "../models/data-response-model";
import ClubsPlayersModel from "../models/clubs-players-model";
import PlayerModel from "../models/player-model";

export const checkApiStatus = async (req: Request, res: Response) => {
    res.send('API online');
};

export const getAllPlayers = async (req: Request, res: Response) => {
    const data: DataResponseModel<ClubsPlayersModel[]> = await playersService.getAllPlayersService();

    res.status(data.statusCode).json(data.body);
};

export const getPlayerById = async (req: Request, res: Response) => {
    const playerId: number = parseInt(req.params.id);
    const data: DataResponseModel<PlayerModel> = await playersService.getPlayerByIdService(playerId);

    res.status(data.statusCode).json(data.body);
};

export const getPlayersByRole = async (req: Request, res: Response) => {
    const players: string = req.params.role;
    const data: DataResponseModel<ClubsPlayersModel[]> = await playersService.getPlayerbyRoleService(players);

    res.status(data.statusCode).json(data.body);
};

export const postPlayer = async (req: Request, res: Response) => {
    const { teamId, players } = req.body;
    const data: DataResponseModel<PlayerModel> = await playersService.postPlayerService(teamId, players);

    res.status(data.statusCode).json(data.body);
}

export const deletePlayer = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data: DataResponseModel<PlayerModel> = await playersService.deletePlayerService(parseInt(id));
    res.status(data.statusCode).json(data.body);
};

export const patchPlayer = async (req: Request, res: Response) => { 
    const id: number = parseInt(req.params.id);
    const player: Partial<PlayerModel> = req.body;

    const data: DataResponseModel<PlayerModel> = await playersService.patchPlayerService(id, player);
    res.status(data.statusCode).json(data.body);
};