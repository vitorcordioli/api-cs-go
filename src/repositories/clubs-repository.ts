import ClubsPlayersModel from "../models/clubs-players-model";
import ClubModel from "../models/club-model";
import { data } from "../utils/data";

export const findAllClubs = async (): Promise<ClubModel[] | null> => {
    return data.map(d => ({
        teamId: d.teamId,
        team: d.team
    }));
};

export const findClubById = async (teamId: number): Promise<ClubModel | null> => {
    const team = data.find(d => d.teamId === teamId);
    if (team) return team
    else return null
};

export const createClub = async (club: Omit<ClubsPlayersModel, "teamId">): Promise<ClubsPlayersModel> => {
    let newTeamId: number = 0;
    const lastTeam = data[data.length - 1];

    let newId: number = 0;
    const lastPlayer = lastTeam.players [lastTeam.players.length - 1];

    if (lastPlayer) {
        newId = lastPlayer.id + 1;
    } else {
        newId = 1;
    }

    if (lastTeam) {
        newTeamId = (lastTeam.teamId ?? 0) + 1;
    } else {
        newTeamId = 1;
    }

    const newClub: ClubsPlayersModel = {
        teamId: newTeamId, team: club.team,
        players: club.players.map(player => ({
            id: newId++,
            name: player.name,
            age: player.age,
            role: player.role
        }))
    };
    data.push(newClub);
    return newClub;
};