import { StatusCode } from "../utils/http-helper";
import * as playersRepository from "../repositories/players-repository";
import ClubsPlayersModel from "../models/clubs-players-model";
import DataResponseModel from "../models/data-response-model";
import PlayerModel from "../models/player-model";

export const getAllPlayersService = async () => {
    const data: ClubsPlayersModel[] = await playersRepository.findAllPlayers();

    if (!data || Object.keys(data).length == 0) {
        return { statusCode: StatusCode.NOT_FOUND, body: 'No players found' };
    } else {
        return { statusCode: StatusCode.OK, body: data };
    }
};

export const getPlayerByIdService = async (id: number) => {
    const playerId = await playersRepository.findPlayerById(id);

    if (!playerId || Object.keys(playerId).length == 0) {
        return { statusCode: StatusCode.NOT_FOUND, body: 'Player not found' };
    } else {
        return { statusCode: StatusCode.OK, body: playerId };
    }
};

export const getPlayerbyRoleService = async (role: string) => {
    const data: ClubsPlayersModel[] = await playersRepository.findPlayerByRole(role)

    if (!data || Object.keys(data).length == 0) {
        return { statusCode: StatusCode.NOT_FOUND, body: 'Player not found' };
    } else {
        return { statusCode: StatusCode.OK, body: data };
    }
};

export const postPlayerService = async (teamId: number, players: Omit<PlayerModel, "id">) => {
    const data: PlayerModel = await playersRepository.createPlayer(teamId, players);

    if (!data || Object.keys(data).length == 0) {
        return { statusCode: StatusCode.NOT_FOUND, body: 'Player not found' };
    } else {
        return { statusCode: StatusCode.CREATED, body: data };
    }
};

export const deletePlayerService = async (playerId: number) => {
    const player = await playersRepository.deletePlayerById(playerId);

    if (!player) {
        return { statusCode: StatusCode.NOT_FOUND, body: 'Player not found' };
    } else {
        return { statusCode: StatusCode.OK, body: player };
    };
};

export const patchPlayerService = async (id: number, player: Partial<PlayerModel>) => {
    const updatedPlayer = await playersRepository.patchPlayerById(id, player);

    if (!updatedPlayer) {
        return { statusCode: StatusCode.NOT_FOUND, body: 'Player not found' };
    } else {
        return { statusCode: StatusCode.OK, body: updatedPlayer };
    };
};

export const removePlayerFromClubService = async (id: number) => {
    const data: ClubsPlayersModel = await playersRepository.removePlayerFromClub(id)

    if (!data) {
        return { statusCode: StatusCode.NOT_FOUND, body: 'Player not found' }
    } else {
        return { statusCode: StatusCode.OK, body: data }
    }
};

export const transferPlayerService = async (id: number, newIdTeam: number) => {
    const data: ClubsPlayersModel = await playersRepository.transferPlayer(id, newIdTeam)

    if (!data) {
        return { statusCode: StatusCode.NOT_FOUND, body: 'Player not found' }
    } else {
        return { statusCode: StatusCode.OK, body: data }
    }
};