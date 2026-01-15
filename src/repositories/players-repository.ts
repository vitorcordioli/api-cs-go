import ClubsPlayersModel from "../models/clubs-players-model";
import fs from 'fs/promises';
import PlayerModel from "../models/player-model";
import ClubModel from "../models/club-model";

const data: ClubsPlayersModel[] = JSON.parse(await fs.readFile('src/data/players.json', 'utf-8'));

export const findAllPlayers = async (): Promise<ClubsPlayersModel[]> => {
    return data;
};

export const findPlayerById = async (id: number): Promise<PlayerModel | null> => {
    for (const team of data) {
        const player = team.players.find(p => p.id === id)
        if (player) return player
    }
    return null
};

export const findPlayerByRole = async (role: string): Promise<ClubsPlayersModel[] | null> => {
    return data.map(team => {
      const players = team.players.filter(p => p.role.toLowerCase() === role.toLowerCase());
      if (players.length) {
        return { teamId: team.teamId, team: team.team, players };
      } else {
        return null;
      }
    })
    .filter(Boolean) as ClubsPlayersModel[];
};