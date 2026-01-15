import { StatusCode } from "../utils/http-helper";
import * as clubsRepository from "../repositories/clubs-repository";
import ClubModel from "../models/club-model";

export const getAllClubsService = async () => {
    const data: ClubModel[] | null= await clubsRepository.findAllClubs();
    
    if (!data || Object.keys(data).length == 0) {
        return {statusCode: StatusCode.NOT_FOUND, body: 'No clubs found'};
    } else {
        return {statusCode: StatusCode.OK, body: data};
    }
};

export const getClubById = async (teamId: number) => {
    const data: ClubModel | null = await clubsRepository.findClubById(teamId);

    if (!data) {
        return {statusCode: StatusCode.NOT_FOUND, body: 'No clubs found'};
    } else {
        return {statusCode: StatusCode.OK, body: data};
    }
};