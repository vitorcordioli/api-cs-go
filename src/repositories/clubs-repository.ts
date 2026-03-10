import ClubsPlayersModel from "../models/clubs-players-model";
import ClubModel from "../models/club-model";
import { prisma } from "../lib/prisma-client";

export const findAllClubs = async () => {
    const clubs = await prisma.club.findMany({
        select: {
            id: true,
            name: true,
        }
    })

    return clubs.map(club => ({
        teamId: club.id,
        team: club.name
    }));
};

export const findClubById = async (teamId: number) => {
    const club = await prisma.club.findUnique({
        where: { id: teamId },
        select: {
            id: true,
            name: true,
        }
    });

    return club ? {
        teamId: club.id,
        team: club.name
    } : null;
};

export const createClub = async (club: Omit<ClubsPlayersModel, "teamId">): Promise<ClubsPlayersModel> => {
    const createdClub = await prisma.club.create({
        data: {
            name: club.team,
            players: {
                create: club.players.map(player => ({
                    name: player.name,
                    age: player.age,
                    role: player.role
                }))
            }
        },
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

    return {
        teamId: createdClub.id,
        team: createdClub.name,
        players: createdClub.players
    };
};

export const deleteClub = async (teamId: number): Promise<ClubModel> => {
    const freeAgents = await prisma.club.findFirst({
        where: { name: "Free Agents" }
    });

    if (teamId === freeAgents!.id) {
        throw new Error("Não é possível deletar o clube Free Agents");
    }

    await prisma.player.updateMany({
        where: { clubId: teamId },
        data: { clubId: freeAgents?.id }
    });

    const deletedClub = await prisma.club.delete({
        where: { id: teamId },
        select: {
            id: true,
            name: true,
        }
    });

    return {
        teamId: deletedClub.id,
        team: deletedClub.name,
    };
};

export const patchClub = async (teamId: number, clubData: Partial<Omit<ClubModel, "teamId">>): Promise<ClubModel> => {
    const updatedClub = await prisma.club.update({
        where: { id: teamId },
        data: {
            name: clubData.team
        },
        select: {
            id: true,
            name: true
        }
    });

    return {
        teamId: updatedClub.id,
        team: updatedClub.name
    };
};