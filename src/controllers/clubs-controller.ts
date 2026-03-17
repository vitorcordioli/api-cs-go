import { Request, Response, NextFunction } from "express";
import * as clubsService from "../services/clubs-services";
import DataResponseModel from "../models/data-response-model";
import ClubModel from "../models/club-model";
import ClubsPlayersModel from "../models/clubs-players-model";

export const getAllClubs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: DataResponseModel<ClubModel[]> = await clubsService.getAllClubsService();
    res.status(data.statusCode).json(data.body);
  } catch (err) {
    next(err);
  }
};

export const getClubById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clubId: number = parseInt(req.params.teamId);
    const data = await clubsService.getClubById(clubId);

    res.status(data.statusCode).json(data.body);
  } catch (err) {
    next(err);
  }
};

export const postClub = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const club: Omit<ClubsPlayersModel, "teamId"> = req.body;
    const data: DataResponseModel<ClubModel> = await clubsService.postClubService(club);
    res.status(data.statusCode).json(data.body);
  } catch (err) {
    next(err);
  }
};

export const deleteClub = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clubId: number = parseInt(req.params.teamId);
    const data: DataResponseModel<ClubModel> = await clubsService.deleteClubService(clubId);
    res.status(data.statusCode).json(data.body);
  } catch (err) {
    next(err);
  }
};

export const patchClubByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clubId: number = parseInt(req.params.teamId);
    const clubData: Partial<Omit<ClubModel, "teamId">> = req.body;
    const data: DataResponseModel<ClubModel> = await clubsService.patchClubService(clubId, clubData);
    res.status(data.statusCode).json(data.body);
  } catch (err) {
    next(err);
  }
};