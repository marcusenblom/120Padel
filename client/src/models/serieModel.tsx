import UserModel from "./userModel";

class PlayersModel{
    gamesPlayed: number;
    points: number;
    setWon: number;
    setLost: number;
    user: UserModel;
}

class PlayedMatchesModel{
    winners: [];
    losers: [];
    matchId: number;
}

class SerieModel{
    serieId: number;
    serieName: string;
    players: PlayersModel[];
    playedMatches: PlayedMatchesModel[];

    constructor(serieId: number, serieName: string, players: PlayersModel[], playedMatches: PlayedMatchesModel[]){
        this.serieId = serieId;
        this.serieName = serieName;
        this.players = players;
        this.playedMatches = playedMatches;
    }
}

export default SerieModel;