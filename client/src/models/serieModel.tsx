import UserModel from "./userModel";

export class PlayersModel{
    gamesPlayed: number;
    gamesWon: number;
    points: number;
    setWon: number;
    setLost: number;
    user: UserModel;

    constructor(gamesPlayed: number, gamesWon: number, points: number, setWon: number, setLost: number, user: UserModel){
        this.gamesPlayed = gamesPlayed;
        this.gamesWon = gamesWon;
        this.points = points;
        this.setWon = setWon;
        this.setLost = setLost;
        this.user = user;
    }
}

export class PlayedMatchesModel{
    winners: [];
    losers: [];
    matchId: number;

    constructor(winners: [], losers: [], matchId: number){
        this.winners = winners;
        this.losers = losers;
        this.matchId = matchId;
    }
}

export class SerieModel{
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