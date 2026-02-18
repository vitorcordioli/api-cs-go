import { Request, Response } from "express";
import * as playersService from "../services/players-services";
import DataResponseModel from "../models/data-response-model";
import ClubsPlayersModel from "../models/clubs-players-model";
import PlayerModel from "../models/player-model";

export const checkApiStatus = async (req: Request, res: Response) => {
    res.send('API online');
};

export const getAllPlayers = async (req: Request, res: Response) => {
    const role = req.query.role as string | undefined;

    if (role) {
        const data: DataResponseModel<ClubsPlayersModel[]> = await playersService.getPlayerbyRoleService(role);
        return res.status(data.statusCode).json(data.body);
    }

    const data: DataResponseModel<ClubsPlayersModel[]> = await playersService.getAllPlayersService();
    res.status(data.statusCode).json(data.body);
};

export const getPlayerById = async (req: Request, res: Response) => {
    const playerId: number = parseInt(req.params.id);
    const data: DataResponseModel<PlayerModel> = await playersService.getPlayerByIdService(playerId);

    res.status(data.statusCode).json(data.body);
};

export const postPlayer = async (req: Request, res: Response) => {
    const { teamId, player } = req.body;
    const data: DataResponseModel<PlayerModel> = await playersService.postPlayerService(teamId, player);

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