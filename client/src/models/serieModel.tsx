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

export class MatchPlayersModel{
    players: UserModel[];
    setWon: number;

    constructor(players: UserModel[], setWon: number){
        this.players = players;
        this.setWon = setWon;
    }
}

export class PlayedMatchModel{
    winners: MatchPlayersModel;
    losers: MatchPlayersModel;
    serie: number;
    matchId: number;

    constructor(winners: MatchPlayersModel, losers: MatchPlayersModel, serie: number, matchId: number){
        this.winners = winners;
        this.losers = losers;
        this.serie = serie;
        this.matchId = matchId;
    }
}

export class SerieModel{
    serieId: number;
    serieName: string;
    players: PlayersModel[];
    playedMatches: PlayedMatchModel[];

    constructor(serieId: number, serieName: string, players: PlayersModel[], playedMatches: PlayedMatchModel[]){
        this.serieId = serieId;
        this.serieName = serieName;
        this.players = players;
        this.playedMatches = playedMatches;
    }
}