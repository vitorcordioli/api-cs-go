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