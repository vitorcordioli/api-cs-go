import ClubsPlayersModel from "../models/clubs-players-model";
import PlayerModel from "../models/player-model";
import { data } from "../utils/data";

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

export const createPlayer = async (teamId: number, players: Omit<PlayerModel, "id">): Promise<PlayerModel> => {
  const team = data.find(t => t.teamId === teamId);
  if (!team) throw new Error("Time não encontrado");

  let newId: number = 0;
  const lastPlayer = data[data.length - 1].players[data[data.length - 1].players.length - 1];

  if (lastPlayer) {
    newId = lastPlayer.id + 1;
  } else {
    newId = 1;
  }

  const newPlayer: PlayerModel = { id: newId, ...players };

  team.players.push(newPlayer);
  return newPlayer;
};

export const deletePlayerById = async (playerId: number): Promise<PlayerModel | null> => {
  for (const team of data) {
    const player = team?.players.find(p => p.id === playerId);
    if (player) {
      return team?.players.splice(team?.players.findIndex(p => p.id === player?.id), 1)[0];
    }
  };
  return null;
};

export const patchPlayerById = async (id: number, player: Partial<PlayerModel>): Promise<PlayerModel | null> => {
  for (const team of data) {
    const playerIndex = team.players.findIndex(p => p.id === id);
    if (playerIndex !== -1) {
      team.players[playerIndex] = { ...team.players[playerIndex], ...player };
      return team.players[playerIndex];
    };
  };
  return null;
};