import { StatusCode } from "../utils/http-helper";
import * as playersRepository from "../repositories/players-repository";
import ClubsPlayersModel from "../models/clubs-players-model";
import DataResponseModel from "../models/data-response-model";

export const getAllPlayersService = async () => {
    const data: ClubsPlayersModel[] = await playersRepository.findAllPlayers();
    
    if (!data || Object.keys(data).length == 0) {
        return {statusCode: StatusCode.NOT_FOUND, body: 'No players found'};
    } else {
        return {statusCode: StatusCode.OK, body: data};
    }
};

export const getPlayerByIdService = async (id: number) => {
    const playerId = await playersRepository.findPlayerById(id);

    if (!playerId || Object.keys(playerId).length == 0) {
        return {statusCode: StatusCode.NOT_FOUND, body: 'Player not found'};
    } else {
        return {statusCode: StatusCode.OK, body: playerId};
    }
};

export const getPlayerbyRoleService = async (role: string) => {
    const data = await playersRepository.findPlayerByRole(role)

    if (!data || Object.keys(data).length == 0) {
        return {statusCode: StatusCode.NOT_FOUND, body: 'Player not found'};
    } else {
        return {statusCode: StatusCode.OK, body: data};
    }
};