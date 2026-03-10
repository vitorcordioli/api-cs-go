import { create } from "domain";
import { prisma } from "../lib/prisma-client";
import ClubsPlayersModel from "../models/clubs-players-model";
import PlayerModel from "../models/player-model";
import { data } from "../utils/data";

export const findAllPlayers = async () => {
  const players = await prisma.club.findMany({
    select: {
      id: true,
      name: true,
      players: {
        select: {
          id: true,
          name: true,
          age: true,
          role: true
        }
      }
    }
  });

  return players.map(club => ({
    teamId: club.id,
    team: club.name,
    players: club.players.map(player => ({
      id: player.id,
      name: player.name,
      age: player.age,
      role: player.role
    }))
  }));
};

export const findPlayerById = async (id: number) => {
  const player = await prisma.player.findUnique({
    where: { id },
    select: {
      club: {
        select: {
          id: true,
          name: true
        }
      },
      id: true,
      name: true,
      age: true,
      role: true
    }
  });

  if (!player) return null;

  return {
    teamId: player.club.id,
    team: player.club.name,
    players: [
      {
        id: player.id,
        name: player.name,
        age: player.age,
        role: player.role
      }
    ]
  };

};

export const findPlayerByRole = async (role: string) => {
  const players = await prisma.player.findMany({
    where: {
      role: {
        equals: role,
        mode: "insensitive"
      }
    },
    select: {
      club: {
        select: {
          id: true,
          name: true
        }
      },
      id: true,
      name: true,
      age: true,
      role: true
    }
  });

  type ClubWithPlayers = {
    teamId: number;
    team: string;
    players: {
      id: number;
      name: string;
      age: number;
      role: string;
    }[];
  };

  const grouped: ClubWithPlayers[] = [];

  const map = new Map<number, typeof players>();
  for (const player of players) {
    const clubId = player.club.id;
    if (!map.has(clubId)) {
      map.set(clubId, []);
    }
    map.get(clubId)!.push(player);
  }

  for (const [clubId, clubPlayers] of map) {
    grouped.push({
      teamId: clubId,
      team: clubPlayers[0].club.name,
      players: clubPlayers.map(p => ({
        id: p.id,
        name: p.name,
        age: p.age,
        role: p.role
      }))
    });
  }

  return grouped;
};

export const createPlayer = async (teamId: number, players: Omit<PlayerModel, "id">): Promise<PlayerModel> => {
  const createdPlayer = await prisma.player.create({
    data: {
      name: players.name,
      age: players.age,
      role: players.role,
      club: {
        connect: { id: teamId }
      }
    }
  });

  return {
    id: createdPlayer.id,
    name: createdPlayer.name,
    age: createdPlayer.age,
    role: createdPlayer.role
  };
};

export const deletePlayerById = async (playerId: number): Promise<PlayerModel | null> => {
  const deletedPlayer = await prisma.player.delete({
    where: { id: playerId },
    select: {
      id: true,
      name: true,
      age: true,
      role: true
    }
  });

  return {
    id: deletedPlayer.id,
    name: deletedPlayer.name,
    age: deletedPlayer.age,
    role: deletedPlayer.role
  }
};

export const patchPlayerById = async (id: number, player: Partial<PlayerModel>): Promise<PlayerModel | null> => {
  const updatedPlayer = await prisma.player.update({
    where: { id },
    data: {
      name: player.name,
      age: player.age,
      role: player.role
    },
    select: {
      id: true,
      name: true,
      age: true,
      role: true
    }
  });

  return {
    id: updatedPlayer.id,
    name: updatedPlayer.name,
    age: updatedPlayer.age,
    role: updatedPlayer.role
  };
};

export const removePlayerFromClub = async (id: number): Promise<ClubsPlayersModel> => {
  const freeAgents = await prisma.club.findFirst({
    where: { name: "Free Agents" }
  });

  if (!freeAgents) {
    throw new Error('Clube "Free Agents" não encontrado');
  }

  const removePlayer = await prisma.player.update({
    where: { id: id },
    data: { clubId: freeAgents?.id }
  });

  return {
    teamId: freeAgents?.id,
    team: freeAgents?.name,
    players: [{
      id: removePlayer.id,
      name: removePlayer.name,
      age: removePlayer.age,
      role: removePlayer.role
    }]
  }
};

export const transferPlayer = async (id: number, newIdTeam: number): Promise<ClubsPlayersModel> => {
  const nextClub = await prisma.club.findFirst({
    where: { id: newIdTeam }
  })

  if (!nextClub) {
    throw new Error('Clube com este ID não encontrado');
  }

  const finalPlayer = await prisma.player.update({
    where: { id: id },
    data: {
      clubId: nextClub?.id
    }
  });

  return {
    teamId: nextClub.id,
    team: nextClub.name,
    players: [{
      id: finalPlayer.id,
      name: finalPlayer.name,
      age: finalPlayer.age,
      role: finalPlayer.role
    }]
  };
};