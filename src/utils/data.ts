import ClubsPlayersModel from "../models/clubs-players-model";
import fs from 'fs/promises';

export const data: ClubsPlayersModel[] = JSON.parse(await fs.readFile('src/data/players.json', 'utf-8'));