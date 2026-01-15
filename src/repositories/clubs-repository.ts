import ClubsPlayersModel from "../models/clubs-players-model";
import fs from 'fs/promises';
import ClubModel from "../models/club-model";

const data: ClubsPlayersModel[] = JSON.parse(await fs.readFile('src/data/players.json', 'utf-8'));
const teams: ClubModel[] = data.map(d => ({team: d.team}));

export const findAllClubs = async (): Promise<ClubModel[] | null> => {
    return teams;
};

export const findClubById = async (teamId: number): Promise<ClubModel | null> => {
    const team = data.find(d => d.teamId === teamId);
    if (team) return team
    else return null
};