import { Request, Response } from "express";
import * as clubsService from "../services/clubs-services";
import DataResponseModel from "../models/data-response-model";
import ClubModel from "../models/club-model";

export const getAllClubs = async (req: Request, res: Response) => {
  const data: DataResponseModel<ClubModel[]> = await clubsService.getAllClubsService();
  res.status(data.statusCode).json(data.body);
};

export const getClubById = async (req: Request, res:Response) => {
  const clubId: number = parseInt(req.params.teamId);
  const data = await clubsService.getClubById(clubId)

  res.status(data.statusCode).json(data.body)
};