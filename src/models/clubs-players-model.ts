export default interface ClubsPlayersModel {
    teamId: number;
    team: string;
    players: 
        {
            id: number,
            name: string,
            age: number,
            role: string,
        }[];
}